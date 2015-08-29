package cz.zcu.kiv.neuroinformatics.antplus;

import android.app.Activity;
import org.apache.cordova.*;
import org.json.JSONArray;
import org.json.JSONException;

import com.dsi.ant.plugins.antplus.pcc.MultiDeviceSearch;
import com.dsi.ant.plugins.antplus.pcc.MultiDeviceSearch.RssiSupport;
import com.dsi.ant.plugins.antplus.pcc.defines.DeviceType;
import com.dsi.ant.plugins.antplus.pcc.defines.RequestAccessResult;
import com.dsi.ant.plugins.antplus.pccbase.MultiDeviceSearch.MultiDeviceSearchResult;

import com.dsi.ant.plugins.antplus.pcc.AntPlusHeartRatePcc;
import com.dsi.ant.plugins.antplus.pcc.defines.DeviceState;
import com.dsi.ant.plugins.antplus.pcc.defines.EventFlag;
import com.dsi.ant.plugins.antplus.pccbase.AntPluginPcc;
import com.dsi.ant.plugins.antplus.pccbase.AntPlusLegacyCommonPcc;
import com.dsi.ant.plugins.antplus.pccbase.PccReleaseHandle;

import java.math.BigDecimal;

import java.util.EnumSet;
import org.json.JSONObject;

public class Antplus extends CordovaPlugin {

    private static final String DISCOVER = "discover";
    private static final String SUBSCRIBE_HR = "subscribeHR";
    private static final String UNSUBSCRIBE_HR = "unsubscribeHR";

    private CordovaInterface cordova;
    private CallbackContext callbackContext;              // Keeps track of the JS callback context.
    private AntPlusHeartRatePcc hrPcc = null;
    protected PccReleaseHandle<AntPlusHeartRatePcc> releaseHandle = null;

    private void winDeviceFound(final MultiDeviceSearchResult deviceFound) {
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

    public class MultiDeviceSearchResultWithRSSI {

        public MultiDeviceSearchResult mDevice;
        public int mRSSI = Integer.MIN_VALUE;
    }

    public String deviceName;

    public MultiDeviceSearch mSearch;

    public void startSearchDevices() {
        Activity context = cordova.getActivity();
        @SuppressWarnings("unchecked")
        EnumSet<DeviceType> devices = EnumSet.of(DeviceType.HEARTRATE);

        // start the multi-device search
        mSearch = new MultiDeviceSearch(context, devices, mCallback, mRssiCallback);
    }

    public void stopSearchDevices() {

        // close and clean-up the multi-device search
        mSearch.close();
    }

    /**
     * Callbacks from the multi-device search interface
     */
    private com.dsi.ant.plugins.antplus.pcc.MultiDeviceSearch.SearchCallbacks mCallback = new com.dsi.ant.plugins.antplus.pcc.MultiDeviceSearch.SearchCallbacks() {

        /**
         * Called when a device is found.
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

            Antplus.this.winDeviceFound(deviceFound);
            Antplus.this.stopSearchDevices();
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

    public void subscribeToHrEvents() {
        hrPcc.subscribeHeartRateDataEvent(new AntPlusHeartRatePcc.IHeartRateDataReceiver() {
            @Override
            public void onNewHeartRateData(final long estTimestamp, EnumSet<EventFlag> eventFlags,
                    final int computedHeartRate, final long heartBeatCount,
                    final BigDecimal heartBeatEventTime, final AntPlusHeartRatePcc.DataState dataState) {

                JSONObject r = new JSONObject();
                try {
                    r.put("event", "heartRateData");
                    r.put("timestamp", System.currentTimeMillis());
                    r.put("eventFlags", eventFlags);
                    r.put("heartRate", computedHeartRate);
                    r.put("heartBeatCount", heartBeatCount);
                    r.put("heartBeatEventTime", heartBeatEventTime);
                    r.put("dataState", dataState);
                } catch (JSONException e) {
                    e.printStackTrace();
                }
                PluginResult result = new PluginResult(PluginResult.Status.OK, r);
                result.setKeepCallback(true);
                callbackContext.sendPluginResult(result);
            }
        });

        hrPcc.subscribePage4AddtDataEvent(
                new AntPlusHeartRatePcc.IPage4AddtDataReceiver() {
                    @Override
                    public void onNewPage4AddtData(long estTimestamp, EnumSet<EventFlag> eventFlags, int manufacturerSpecificByte,
                            BigDecimal previousHeartBeatEventTime) {

                        JSONObject r = new JSONObject();
                        try {
                            r.put("event", "page4AddtData");
                            r.put("timestamp", System.currentTimeMillis());
                            r.put("eventFlags", eventFlags);
                            r.put("estTimestamp", estTimestamp);
                            r.put("manufacturerSpecificByte", manufacturerSpecificByte);
                            r.put("previousHeartBeatEventTime", previousHeartBeatEventTime);
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                        PluginResult result = new PluginResult(PluginResult.Status.OK, r);
                        result.setKeepCallback(true);
                        callbackContext.sendPluginResult(result);
                    }
                });

        hrPcc.subscribeCumulativeOperatingTimeEvent(new AntPlusLegacyCommonPcc.ICumulativeOperatingTimeReceiver() {
            @Override
            public void onNewCumulativeOperatingTime(final long estTimestamp, final EnumSet<EventFlag> eventFlags, final long cumulativeOperatingTime) {
                JSONObject r = new JSONObject();
                try {
                    r.put("event", "cumulativeOperatingTime");
                    r.put("timestamp", System.currentTimeMillis());
                    r.put("eventFlags", eventFlags);
                    r.put("estTimestamp", estTimestamp);
                    r.put("cumulativeOperatingTime", cumulativeOperatingTime);
                } catch (JSONException e) {
                    e.printStackTrace();
                }
                PluginResult result = new PluginResult(PluginResult.Status.OK, r);
                result.setKeepCallback(true);
                callbackContext.sendPluginResult(result);
            }
        });

        hrPcc.subscribeManufacturerAndSerialEvent(new AntPlusLegacyCommonPcc.IManufacturerAndSerialReceiver() {
            @Override
            public void onNewManufacturerAndSerial(final long estTimestamp, final EnumSet<EventFlag> eventFlags, final int manufacturerID,
                    final int serialNumber) {
                JSONObject r = new JSONObject();
                try {
                    r.put("event", "manufacturerAndSerial");
                    r.put("timestamp", System.currentTimeMillis());
                    r.put("eventFlags", eventFlags);
                    r.put("estTimestamp", estTimestamp);
                    r.put("manufacturerID", manufacturerID);
                    r.put("serialNumber", serialNumber);
                } catch (JSONException e) {
                    e.printStackTrace();
                }
                PluginResult result = new PluginResult(PluginResult.Status.OK, r);
                result.setKeepCallback(true);
                callbackContext.sendPluginResult(result);
            }
        });

        hrPcc.subscribeVersionAndModelEvent(new AntPlusLegacyCommonPcc.IVersionAndModelReceiver() {
            @Override
            public void onNewVersionAndModel(final long estTimestamp, final EnumSet<EventFlag> eventFlags, final int hardwareVersion,
                    final int softwareVersion, final int modelNumber) {
                JSONObject r = new JSONObject();
                try {
                    r.put("event", "versionAndModelEvent");
                    r.put("timestamp", System.currentTimeMillis());
                    r.put("eventFlags", eventFlags);
                    r.put("estTimestamp", estTimestamp);
                    r.put("hardwareVersion", hardwareVersion);
                    r.put("softwareVersion", softwareVersion);
                    r.put("modelNumber", modelNumber);
                } catch (JSONException e) {
                    e.printStackTrace();
                }
                PluginResult result = new PluginResult(PluginResult.Status.OK, r);
                result.setKeepCallback(true);
                callbackContext.sendPluginResult(result);
            }
        });

        hrPcc.subscribeCalculatedRrIntervalEvent(new AntPlusHeartRatePcc.ICalculatedRrIntervalReceiver() {
            @Override
            public void onNewCalculatedRrInterval(final long estTimestamp,
                    EnumSet<EventFlag> eventFlags, final BigDecimal rrInterval, final AntPlusHeartRatePcc.RrFlag flag) {
                JSONObject r = new JSONObject();
                try {
                    r.put("event", "calculatedRrIntervalEvent");
                    r.put("timestamp", System.currentTimeMillis());
                    r.put("eventFlags", eventFlags);
                    r.put("estTimestamp", estTimestamp);
                    r.put("rrInterval", rrInterval);
                    r.put("flag", flag);
                } catch (JSONException e) {
                    e.printStackTrace();
                }
                PluginResult result = new PluginResult(PluginResult.Status.OK, r);
                result.setKeepCallback(true);
                callbackContext.sendPluginResult(result);
            }
        });
    }

    //Receives state changes and shows it on the status display line
    protected AntPluginPcc.IDeviceStateChangeReceiver base_IDeviceStateChangeReceiver
            = new AntPluginPcc.IDeviceStateChangeReceiver() {
                @Override
                public void onDeviceStateChange(final DeviceState newDeviceState) {
                    /*runOnUiThread(new Runnable()
                     {
                     @Override
                     public void run()
                     {
                     tv_status.setText(hrPcc.getDeviceName() + ": " + newDeviceState);
                     }
                     });*/

                }
            };

    protected AntPluginPcc.IPluginAccessResultReceiver<AntPlusHeartRatePcc> base_IPluginAccessResultReceiver
            = new AntPluginPcc.IPluginAccessResultReceiver<AntPlusHeartRatePcc>() {
                //Handle the result, connecting to events on success or reporting failure to user.
                @Override
                public void onResultReceived(AntPlusHeartRatePcc result, RequestAccessResult resultCode,
                        DeviceState initialDeviceState) {
                    //showDataDisplay("Connecting...");
                    switch (resultCode) {
                        case SUCCESS:
                            hrPcc = result;
                            //tv_status.setText(result.getDeviceName() + ": " + initialDeviceState);
                            subscribeToHrEvents();
                            //if(!result.supportsRssi()) tv_rssi.setText("N/A");
                            break;
                        case CHANNEL_NOT_AVAILABLE:
                            //Toast.makeText(Activity_HeartRateDisplayBase.this, "Channel Not Available", Toast.LENGTH_SHORT).show();
                            //tv_status.setText("Error. Do Menu->Reset.");
                            break;
                        case ADAPTER_NOT_DETECTED:
                            //Toast.makeText(Activity_HeartRateDisplayBase.this, "ANT Adapter Not Available. Built-in ANT hardware or external adapter required.", Toast.LENGTH_SHORT).show();
                            //tv_status.setText("Error. Do Menu->Reset.");
                            break;
                        case BAD_PARAMS:
                            //Note: Since we compose all the params ourself, we should never see this result
                            //Toast.makeText(Activity_HeartRateDisplayBase.this, "Bad request parameters.", Toast.LENGTH_SHORT).show();
                            //tv_status.setText("Error. Do Menu->Reset.");
                            break;
                        case OTHER_FAILURE:
                            //Toast.makeText(Activity_HeartRateDisplayBase.this, "RequestAccess failed. See logcat for details.", Toast.LENGTH_SHORT).show();
                            //tv_status.setText("Error. Do Menu->Reset.");
                            break;
                        case DEPENDENCY_NOT_INSTALLED:

                            break;
                        case USER_CANCELLED:
                            //tv_status.setText("Cancelled. Do Menu->Reset.");
                            break;
                        case UNRECOGNIZED:
                            //Toast.makeText(Activity_HeartRateDisplayBase.this, "Failed: UNRECOGNIZED. PluginLib Upgrade Required?", Toast.LENGTH_SHORT).show();
                            //tv_status.setText("Error. Do Menu->Reset.");
                            break;
                        default:
                            //Toast.makeText(Activity_HeartRateDisplayBase.this, "Unrecognized result: " + resultCode, Toast.LENGTH_SHORT).show();
                            //tv_status.setText("Error. Do Menu->Reset.");
                            break;
                    }
                }
            };

    protected void destroy() {
        if (releaseHandle != null) {
            releaseHandle.close();
        }
    }

    @Override
    public void initialize(CordovaInterface cordova, CordovaWebView webView) {
        super.initialize(cordova, webView);

        this.cordova = cordova;
    }

    @Override
    public boolean execute(String action, JSONArray data, CallbackContext callbackContext) throws JSONException {

        this.callbackContext = callbackContext;

        if (action.equals(DISCOVER)) {
            startSearchDevices();
            return true;
        } else if (action.equals(SUBSCRIBE_HR)) {
            int antDeviceNumber = data.getInt(0);
            releaseHandle = AntPlusHeartRatePcc.requestAccess(this.cordova.getActivity().getApplicationContext(), antDeviceNumber, 0,
                    base_IPluginAccessResultReceiver, base_IDeviceStateChangeReceiver);
            return true;
        } else if (action.equals(UNSUBSCRIBE_HR)) {
            destroy();
            return true;
        } else {
            return false;
        }

    }
}
