import Foundation
import Capacitor

/**
 * Please read the Capacitor iOS Plugin Development Guide
 * here: https://capacitorjs.com/docs/plugins/ios
 */
@objc(FileServer)
public class FileServer: CAPPlugin {

    @objc func start(_ call: CAPPluginCall) {
        let value = call.getString("path") ?? ""
        call.success([
            "ip": value
        ])
    }

    @objc func stop(_ call: CAPPluginCall) {
        call.success()
    }
}
