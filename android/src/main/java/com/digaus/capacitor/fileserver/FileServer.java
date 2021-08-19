package com.digaus.capacitor.fileserver;

import android.Manifest;
import android.os.Build;

import com.getcapacitor.PermissionState;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.getcapacitor.annotation.Permission;
import com.getcapacitor.annotation.PermissionCallback;

@CapacitorPlugin(
    name = "FileServer",
    permissions = {
        @Permission(
            alias = "fineLocation",
            strings = { Manifest.permission.ACCESS_FINE_LOCATION }
        ),
    }
)
public class FileServer extends Plugin {

    private static final int API_VERSION = Build.VERSION.SDK_INT;

    FileServerService fileServerService;

    @Override
    public void load() {
        super.load();
        this.fileServerService = new FileServerService();
        this.fileServerService.load(this.bridge);
    }


    @PluginMethod
    public void start(PluginCall call) {
        if (API_VERSION >= 23 && getPermissionState("fineLocation") != PermissionState.GRANTED) {
            requestPermissionForAlias("fineLocation", call, "accessFineLocation");
        } else {
            this.fileServerService.startServer(call);
        }

    }

    @PluginMethod
    public void stop(PluginCall call) {
        this.fileServerService.stopServer(call);
    }

    @PermissionCallback
    private void accessFineLocation(PluginCall call) {
        if (getPermissionState("fineLocation") == PermissionState.GRANTED) {
            if (call.getMethodName().equals("start")) {
                this.fileServerService.startServer(call);
            }
        } else {
            call.reject("User denied permission");
        }
    }


}
