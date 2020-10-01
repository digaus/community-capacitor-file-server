package com.digaus.capacitor.fileserver;


import android.content.Context;
import android.net.ConnectivityManager;
import android.net.wifi.WifiInfo;
import android.net.wifi.WifiManager;

import com.getcapacitor.Bridge;
import com.getcapacitor.JSObject;
import com.getcapacitor.PluginCall;

import java.io.IOException;
import java.util.Locale;

public class FileServerService {

    WifiManager wifiManager;
    ConnectivityManager connectivityManager;
    Context context;

    Bridge bridge;

    NanoHTTPDServer nanoHTTPDServer;

    public void load(Bridge bridge) {
        this.bridge = bridge;
        this.wifiManager = (WifiManager) this.bridge.getActivity().getApplicationContext().getSystemService(Context.WIFI_SERVICE);
        this.connectivityManager = (ConnectivityManager) this.bridge.getActivity().getApplicationContext().getApplicationContext().getSystemService(Context.CONNECTIVITY_SERVICE);
        this.context = this.bridge.getContext();
    }

    public void startServer(PluginCall call) {
        String path = call.getString("path").replace("file:/", "");
        Integer port = call.getInt("port");
        if (port == null) {
            port = 8080;
        }
        if (this.nanoHTTPDServer == null) {
            this.nanoHTTPDServer = new NanoHTTPDServer(path, port);
            try {
                this.nanoHTTPDServer.start();
                this.getIP(call);
            } catch (IOException e) {
                e.printStackTrace();
                this.nanoHTTPDServer = null;
                call.reject("ERROR_STARTING_SERVER");
            }
        } else {
            call.reject("ERROR_SERVER_ALREADY_RUNNING");
        }
    }

    public void stopServer(PluginCall call) {
        if (this.nanoHTTPDServer != null) {
            this.nanoHTTPDServer.stop();
            this.nanoHTTPDServer = null;
        }
        call.success();
    }

    private void getIP(PluginCall call) {
        WifiInfo wifiInfo = wifiManager.getConnectionInfo();
        int ip = wifiInfo.getIpAddress();
        String ipString = formatIP(ip);

        if (ipString != null && !ipString.equals("0.0.0.0")) {
            JSObject result = new JSObject();
            result.put("ip", ipString);
            call.success(result);
        } else {
            call.reject("NO_VALID_IP_IDENTIFIED");
        }
    }

    private String formatIP(int ip) {
        return String.format(
                Locale.ENGLISH,
                "%d.%d.%d.%d",
                (ip & 0xff),
                (ip >> 8 & 0xff),
                (ip >> 16 & 0xff),
                (ip >> 24 & 0xff)
        );
    }

}