angular.module('mobio.controllers')

        .controller('SettingsCtrl', function ($scope, $ionicPopup, settingsCache) {

            $scope.data = {
                restUrl: settingsCache.getSettings().restUrl ? settingsCache.getSettings().restUrl : 'http://192.168.0.6:8080'
            };


            $scope.updateSettings = function () {
                settingsCache.updateSettings('restUrl', $scope.data.restUrl);

                $ionicPopup.show({
                    template: '',
                    title: 'Successfully Updated',
                    scope: $scope,
                    buttons: [
                        {
                            text: 'OK',
                            type: 'button-assertive'
                        }
                    ]
                });
            };

        });

