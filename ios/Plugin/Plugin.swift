import Foundation
import Capacitor
/**
 * Please read the Capacitor iOS Plugin Development Guide
 * here: https://capacitorjs.com/docs/plugins/ios
 */
@objc(FileServer)
public class FileServer: CAPPlugin {

    let webServer: GCDWebServer = GCDWebServer()
    var basePath: String = ""

    public override func load() {
        self.initHTTPRequestHandlers()
    }
   
    func initHTTPRequestHandlers() {
        self.webServer.addHandler(
            match: {
                (requestMethod, requestURL, requestHeaders, urlPath, urlQuery) -> GCDWebServerRequest? in
                    return GCDWebServerDataRequest(method: requestMethod, url: requestURL, headers: requestHeaders, path: urlPath, query: urlQuery)
            },
            asyncProcessBlock: self.processRequest
        )
    }
    func processRequest(request: GCDWebServerRequest, completionBlock: GCDWebServerCompletionBlock) {
        let dataRequest = request as! GCDWebServerDataRequest
        let path = self.basePath + dataRequest.url.path
        let response = fileRequest(request: request, path: path )
        completionBlock(response)
    }

    func fileRequest(request: GCDWebServerRequest, path: String) -> GCDWebServerResponse {
        // Check if file exists, given its path
        if !(FileManager.default.fileExists(atPath: path)) {
            return GCDWebServerResponse(statusCode: 404);
        }

        if (request.hasByteRange()) {
            return GCDWebServerFileResponse(file: path, byteRange: request.byteRange)!
        }

        return GCDWebServerFileResponse(file: path)!
    }

    @objc func start(_ call: CAPPluginCall) {
        self.basePath = call.getString("path") ?? "/"
        self.basePath = self.basePath.replacingOccurrences(of: "file://", with: "")
        self.basePath.remove(at: self.basePath.index(before: self.basePath.endIndex))
        let port = call.getInt("port") ?? 8080

        if self.webServer.isRunning{
            let address = getWiFiAddress()
            guard let myString = address, !myString.isEmpty else {
                call.reject("ERROR_NO_WIFI_IP_AVAILABLE");
                return
            } 
            call.success([
                "ip": address!
            ])
            return
        }

        do {
            try self.webServer.start(options:[GCDWebServerOption_AutomaticallySuspendInBackground : false, GCDWebServerOption_Port: UInt(port)])
        } catch let error {
            call.reject(error.localizedDescription)
            return
        }
        let address = getWiFiAddress()
        guard let myString = address, !myString.isEmpty else {
            call.reject("ERROR_NO_WIFI_IP_AVAILABLE");
            return
        } 
        call.success([
            "ip": address!
        ])
    }

    @objc func stop(_ call: CAPPluginCall) {
        if self.webServer.isRunning {
            self.webServer.stop()
        }
        call.success()
    }


    @objc func getWiFiAddress() -> String? {
        var address : String?

        // Get list of all interfaces on the local machine:
        var ifaddr : UnsafeMutablePointer<ifaddrs>?
        guard getifaddrs(&ifaddr) == 0 else { return nil }
        guard let firstAddr = ifaddr else { return nil }

        // For each interface ...
        for ifptr in sequence(first: firstAddr, next: { $0.pointee.ifa_next }) {
            let interface = ifptr.pointee

            // Check for IPv4:
            let addrFamily = interface.ifa_addr.pointee.sa_family
            // addrFamily == UInt8(AF_INET6)
            if addrFamily == UInt8(AF_INET) {
                // Check interface name:
                let name = String(cString: interface.ifa_name)
                if  name == "en0" || name.starts(with: "tap") || name.starts(with: "ppp") || name.starts(with: "ipsec") || name.starts(with: "utun") {
                    // Convert interface address to a human readable string:
                    var hostname = [CChar](repeating: 0, count: Int(NI_MAXHOST))
                    getnameinfo(interface.ifa_addr, socklen_t(interface.ifa_addr.pointee.sa_len),
                                &hostname, socklen_t(hostname.count),
                                nil, socklen_t(0), NI_NUMERICHOST)
                    address = String(cString: hostname)
                }
            }
        }
        freeifaddrs(ifaddr)

        return address
    }
    
}
