package cz.zcu.kiv.neuroinformatics.antplus;

import android.app.Activity;
import org.apache.cordova.*;
import org.json.JSONArray;
import org.json.JSONException;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;

import com.dsi.ant.plugins.antplus.pcc.MultiDeviceSearch;
import com.dsi.ant.plugins.antplus.pcc.MultiDeviceSearch.RssiSupport;
import com.dsi.ant.plugins.antplus.pcc.defines.DeviceType;
import com.dsi.ant.plugins.antplus.pcc.defines.RequestAccessResult;
import com.dsi.ant.plugins.antplus.pccbase.MultiDeviceSearch.MultiDeviceSearchResult;

import java.util.ArrayList;
import java.util.EnumSet;
import org.json.JSONObject;

public class Antplus extends CordovaPlugin {

    private CallbackContext callbackContext;              // Keeps track of the JS callback context.

    private Handler mainHandler = null;
    private Runnable mainRunnable = new Runnable() {
        public void run() {
            Antplus.this.start();
        }
    };

    private void stopTimeout() {
        if (mainHandler != null) {
            mainHandler.removeCallbacks(mainRunnable);
        }
    }
    
    private void win(final MultiDeviceSearchResult deviceFound) {
            // Success return object
        JSONObject r = new JSONObject();
        try {
            r.put("resultID", deviceFound.resultID);
            r.put("describeContents", deviceFound.describeContents());
            r.put("antDeviceNumber", deviceFound.getAntDeviceNumber());
            r.put("antDeviceType", deviceFound.getAntDeviceType());
            r.put("deviceDisplayName", deviceFound.getDeviceDisplayName());
            r.put("isAlreadyConnected", deviceFound.isAlreadyConnected());
            r.put("isPreferredDevice", deviceFound.isPreferredDevice());
            r.put("isUserRecognizedDevice", deviceFound.isUserRecognizedDevice());
        } catch (JSONException e) {
            e.printStackTrace();
        }
        
            PluginResult result = new PluginResult(PluginResult.Status.OK, r);
            result.setKeepCallback(true);
            callbackContext.sendPluginResult(result);
        }

    //public EnumSet<DeviceType> devices = EnumSet.of(DeviceType.HEARTRATE);
    public class MultiDeviceSearchResultWithRSSI {

        public MultiDeviceSearchResult mDevice;
        public int mRSSI = Integer.MIN_VALUE;
    }

    public String deviceName;

    public MultiDeviceSearch mSearch;

    public void start() {
        Activity context = cordova.getActivity();
        /*Intent i = context.getIntent();
         Bundle args = i.getBundleExtra(BUNDLE_KEY);*/
        @SuppressWarnings("unchecked")
        EnumSet<DeviceType> devices = EnumSet.of(DeviceType.HEARTRATE);

        // start the multi-device search
        mSearch = new MultiDeviceSearch(context, devices, mCallback, mRssiCallback);
    }

    public void destroy() {

        // close and clean-up the multi-device search
        mSearch.close();
    }

    public String launchConnection(MultiDeviceSearchResult result) {
        //TODO
        return result.getDeviceDisplayName();
    }

    /**
     * Callbacks from the multi-device search interface
     */
    private com.dsi.ant.plugins.antplus.pcc.MultiDeviceSearch.SearchCallbacks mCallback = new com.dsi.ant.plugins.antplus.pcc.MultiDeviceSearch.SearchCallbacks() {

        

        /**
         * Called when a device is found. Display found devices in connected and
         * found lists
         */
        public void onDeviceFound(final MultiDeviceSearchResult deviceFound) {

            // We split up devices already connected to the plugin from
            // un-connected devices to make this information more visible to the
            // user, since the user most likely wants to be aware of which
            // device they are already using in another app
            if (deviceFound.isAlreadyConnected()) {
                deviceName = deviceFound.getDeviceDisplayName() + " - already connected";
            } else {
                deviceName = deviceFound.getDeviceDisplayName();
            }

            Antplus.this.win(deviceFound);
            Antplus.this.stopTimeout();
            Antplus.this.destroy();
        }

        /**
         * The search has been stopped unexpectedly
         */
        public void onSearchStopped(RequestAccessResult reason) {

        }

        @Override
        public void onSearchStarted(RssiSupport supportsRssi) {
            if (supportsRssi == RssiSupport.UNAVAILABLE) {
                //Toast.makeText(mContext, "Rssi information not available.", Toast.LENGTH_SHORT).show();
            } else if (supportsRssi == RssiSupport.UNKNOWN_OLDSERVICE) {
                //Toast.makeText(mContext, "Rssi might be supported. Please upgrade the plugin service.", Toast.LENGTH_SHORT).show();
            }
        }
    };

    /**
     * Callback for RSSI data of previously found devices
     */
    private MultiDeviceSearch.RssiCallback mRssiCallback = new MultiDeviceSearch.RssiCallback() {
        /**
         * Receive an RSSI data update from a specific found device
         */
        @Override
        public void onRssiUpdate(final int resultId, final int rssi) {
            /*runOnUiThread(new Runnable() {
             @Override
             public void run() {
             for (MultiDeviceSearchResultWithRSSI result : mFoundDevices) {
             if (result.mDevice.resultID == resultId) {
             result.mRSSI = rssi;
             mFoundAdapter.notifyDataSetChanged();

             break;
             }
             }
             }
             });*/
        }
    };

    @Override
    public void initialize(CordovaInterface cordova, CordovaWebView webView) {
        super.initialize(cordova, webView);
        // your init code here
        //this.start();
    }

    @Override
    public boolean execute(String action, JSONArray data, CallbackContext callbackContext) throws JSONException {

        if (action.equals("greet")) {
            //callbackContext.success(deviceName);
            this.callbackContext = callbackContext;

            stopTimeout();
            mainHandler = new Handler(Looper.getMainLooper());
            mainHandler.postDelayed(mainRunnable, 2000);
        } else {

            return false;

        }

        PluginResult result = new PluginResult(PluginResult.Status.NO_RESULT, "");
        result.setKeepCallback(true);
        callbackContext.sendPluginResult(result);
        return true;

    }
}
