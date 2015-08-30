/*global cordova, module*/

module.exports = {
    searchDevices: function (successCallback, errorCallback) {
        cordova.exec(successCallback, errorCallback, "Antplus", "searchDevices", []);
    },
    
    stopSearchDevices: function (successCallback, errorCallback) {
        cordova.exec(successCallback, errorCallback, "Antplus", "stopSearchDevices", []);
    },
    
    subscribeHR: function (antDeviceNumber, successCallback, errorCallback) {
        cordova.exec(successCallback, errorCallback, "Antplus", "subscribeHR", [antDeviceNumber]);
    },
    
    unsubscribeHR: function (successCallback, errorCallback) {
        cordova.exec(successCallback, errorCallback, "Antplus", "unsubscribeHR", []);
    }
};
