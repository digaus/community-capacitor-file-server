package com.digaus.capacitor.fileserver;

import android.Manifest;
import android.content.pm.PackageManager;
import android.os.Build;

import com.getcapacitor.JSObject;
import com.getcapacitor.NativePlugin;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;

@NativePlugin(
    requestCodes={FileServer.REQUEST_ACCESS_FINE_LOCATION}
)
public class FileServer extends Plugin {

    private static final int API_VERSION = Build.VERSION.SDK_INT;

    static final int REQUEST_ACCESS_FINE_LOCATION = 8001;

    FileServerService fileServerService;

    @Override
    public void load() {
        super.load();
        this.fileServerService = new FileServerService();
        this.fileServerService.load(this.bridge);
    }


    @PluginMethod
    public void start(PluginCall call) {
        if (API_VERSION >= 23 && !hasPermission(Manifest.permission.ACCESS_FINE_LOCATION)) {
            saveCall(call);
            pluginRequestPermission(Manifest.permission.ACCESS_FINE_LOCATION, REQUEST_ACCESS_FINE_LOCATION);
        } else {
            this.fileServerService.startServer(call);
        }

    }

    @PluginMethod
    public void stop(PluginCall call) {
        this.fileServerService.stopServer(call);
    }

    
    @Override
    protected void handleRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {

        super.handleRequestPermissionsResult(requestCode, permissions, grantResults);

        PluginCall savedCall = getSavedCall();
        if (savedCall == null) {
            return;
        }

        for(int result : grantResults) {
            if (result == PackageManager.PERMISSION_DENIED) {
                savedCall.error("User denied permission");
                return;
            }
        }
        if (savedCall.getMethodName().equals("start")) {
            this.fileServerService.startServer(savedCall);
        }

    }

}
