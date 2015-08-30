package cz.zcu.kiv.neuroinformatics.antplus;

import org.apache.cordova.*;
import org.json.JSONArray;
import org.json.JSONException;


public class Antplus extends CordovaPlugin {

    private static final String SEARCH_DEVICES = "searchDevices";
    private static final String STOP_SEARCH_DEVICES = "stopSearchDevices";
    private static final String SUBSCRIBE_HR = "subscribeHR";
    private static final String UNSUBSCRIBE_HR = "unsubscribeHR";

    private AntplusMultiDeviceSearch antplusMultiDeviceSearch = null;
    private AntplusHeartRateService antplusHeartRateService = null;

    @Override
    public void initialize(CordovaInterface cordova, CordovaWebView webView) {
        super.initialize(cordova, webView);

        if (antplusMultiDeviceSearch == null) {
            antplusMultiDeviceSearch = new AntplusMultiDeviceSearch(cordova.getActivity());
        }

        if (antplusHeartRateService == null) {
            antplusHeartRateService = new AntplusHeartRateService(cordova.getActivity().getApplicationContext());
        }
    }

    @Override
    public boolean execute(String action, JSONArray data, final CallbackContext callbackContext) throws JSONException {

        if (action.equals(SEARCH_DEVICES)) {
            cordova.getActivity().runOnUiThread(new Runnable() {
                public void run() {
                    antplusMultiDeviceSearch.startSearchDevices(callbackContext, "HEARTRATE");
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
        } else {
            return false;
        }

    }
}
