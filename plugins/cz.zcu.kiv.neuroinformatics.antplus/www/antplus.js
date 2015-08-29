/*global cordova, module*/

module.exports = {
    discover: function (successCallback, errorCallback) {
        cordova.exec(successCallback, errorCallback, "Antplus", "discover", []);
    },
    
    subscribeHR: function (antDeviceNumber, successCallback, errorCallback) {
        cordova.exec(successCallback, errorCallback, "Antplus", "subscribeHR", [antDeviceNumber]);
    },
    
    unsubscribeHR: function (successCallback, errorCallback) {
        cordova.exec(successCallback, errorCallback, "Antplus", "unsubscribeHR", []);
    }
};
