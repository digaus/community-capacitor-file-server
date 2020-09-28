package com.digaus.capacitor.fileserver;

import com.getcapacitor.JSObject;
import com.getcapacitor.NativePlugin;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;

@NativePlugin
public class FileServer extends Plugin {

    @PluginMethod
    public void start(PluginCall call) {
        String value = call.getString("path");

        JSObject ret = new JSObject();
        ret.put("ip", value);
        call.success(ret);
    }
}
