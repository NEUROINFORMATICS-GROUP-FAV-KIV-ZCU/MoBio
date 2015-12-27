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
    },
    
    subscribeWGT: function (antDeviceNumber, successCallback, errorCallback) {
        cordova.exec(successCallback, errorCallback, "Antplus", "subscribeWGT", [antDeviceNumber]);
    },
    
    unsubscribeWGT: function (successCallback, errorCallback) {
        cordova.exec(successCallback, errorCallback, "Antplus", "unsubscribeWGT", []);
    },
    
    requestBasicWGT: function (successCallback, errorCallback) {
        cordova.exec(successCallback, errorCallback, "Antplus", "requestBasicWGT", []);
    },
    
    requestAdvancedWGT: function (userProfile, successCallback, errorCallback) {
        cordova.exec(successCallback, errorCallback, "Antplus", "requestAdvancedWGT",
                [
                    userProfile.age,
                    userProfile.height,
                    userProfile.gender,
                    userProfile.lifetimeAthlete,
                    userProfile.activityLevel
                ]);
    }
};
