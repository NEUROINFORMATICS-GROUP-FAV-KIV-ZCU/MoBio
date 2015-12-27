package cz.zcu.kiv.neuroinformatics.antplus;

import org.apache.cordova.*;
import org.json.JSONArray;
import org.json.JSONException;

public class Antplus extends CordovaPlugin {

    private static final String SEARCH_DEVICES = "searchDevices";
    private static final String STOP_SEARCH_DEVICES = "stopSearchDevices";
    private static final String SUBSCRIBE_HR = "subscribeHR";
    private static final String UNSUBSCRIBE_HR = "unsubscribeHR";

    private static final String SUBSCRIBE_WGT = "subscribeWGT";
    private static final String REQUEST_BASIC_WGT = "requestBasicWGT";
    private static final String REQUEST_ADVANCED_WGT = "requestAdvancedWGT";

    private AntplusMultiDeviceSearch antplusMultiDeviceSearch = null;
    private AntplusHeartRateService antplusHeartRateService = null;
    private AntplusWeightScaleService antplusWeightScaleService = null;
    private AntplusBloodPressureService antplusBloodPressureService = null;

    @Override
    public void initialize(CordovaInterface cordova, CordovaWebView webView) {
        super.initialize(cordova, webView);

        if (antplusMultiDeviceSearch == null) {
            antplusMultiDeviceSearch = new AntplusMultiDeviceSearch(cordova.getActivity());
        }

        if (antplusHeartRateService == null) {
            antplusHeartRateService = new AntplusHeartRateService(cordova.getActivity().getApplicationContext());
        }

        if (antplusWeightScaleService == null) {
            antplusWeightScaleService = new AntplusWeightScaleService(cordova.getActivity().getApplicationContext());
        }
        
        if (antplusBloodPressureService == null) {
            antplusBloodPressureService = new AntplusBloodPressureService(cordova.getActivity().getApplicationContext());
        }
    }

    @Override
    public boolean execute(String action, JSONArray data, final CallbackContext callbackContext) throws JSONException {

        if (action.equals(SEARCH_DEVICES)) { 
            final String deviceType = data.getString(0);
            cordova.getActivity().runOnUiThread(new Runnable() {
                public void run() {
                    antplusMultiDeviceSearch.startSearchDevices(callbackContext, deviceType);
                }
            });
            return true;
        } else if (action.equals(STOP_SEARCH_DEVICES)) {
            cordova.getActivity().runOnUiThread(new Runnable() {
                public void run() {
                    antplusMultiDeviceSearch.stopSearchDevices(callbackContext);
                }
            });
            return true;
        } else if (action.equals(SUBSCRIBE_HR)) {
            final int antDeviceNumber = data.getInt(0);
            cordova.getActivity().runOnUiThread(new Runnable() {
                public void run() {
                    antplusHeartRateService.subscribe(antDeviceNumber, callbackContext);
                }
            });
            return true;
        } else if (action.equals(UNSUBSCRIBE_HR)) {
            cordova.getActivity().runOnUiThread(new Runnable() {
                public void run() {
                    antplusHeartRateService.unsubscribe(callbackContext);
                }
            });
            return true;
        } else if (action.equals(SUBSCRIBE_WGT)) {
            final int antDeviceNumber = data.getInt(0);
            cordova.getActivity().runOnUiThread(new Runnable() {
                public void run() {
                    antplusWeightScaleService.subscribe(antDeviceNumber, callbackContext);
                }
            });
            return true;
        } else if (action.equals(REQUEST_BASIC_WGT)) {
            cordova.getActivity().runOnUiThread(new Runnable() {
                public void run() {
                    antplusWeightScaleService.requestBasicMeasurement();
                }
            });
            return true;
        } else if (action.equals(REQUEST_ADVANCED_WGT)) {
            final int age = data.getInt(0);
            final int height = data.getInt(1);
            final int gender = data.getInt(2);
            final boolean athlete = data.getBoolean(3);
            final int activityLevel = data.getInt(4);
            cordova.getActivity().runOnUiThread(new Runnable() {                
                public void run() {
                    antplusWeightScaleService.requestAdvancedMeasurement(age, height, gender, athlete, activityLevel);
                }
            });
            return true;
        } else {
            return false;
        }

    }
}
