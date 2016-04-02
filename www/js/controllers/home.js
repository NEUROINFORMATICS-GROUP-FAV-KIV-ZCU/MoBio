angular.module('mobio.controllers')

        .controller('HomeCtrl', function ($scope, $ionicPopup, userService, settingsCache) {

            $scope.data = {
                userInfo: settingsCache.getSettings().userInfo,
                username: settingsCache.getSettings().username,
                password: settingsCache.getSettings().password
            };

            $scope.login = function () {

                $ionicPopup.show({
                    template: 'Username:<input type="text" ng-model="data.username">Password:<input type="password" ng-model="data.password">',
                    title: 'EEGBase Login',
                    subTitle: 'Please enter username and password',
                    scope: $scope,
                    buttons: [
                        {text: 'Cancel'},
                        {
                            text: '<b>Login</b>',
                            type: 'button-calm',
                            onTap: function (e) {
                                if (!$scope.data.username || !$scope.data.password) {
                                    //don't allow the user to close unless he enters username and password
                                    e.preventDefault();
                                } else {
                                    userService.login($scope.data.username, $scope.data.password).then(
                                            function (response) {
                                                $scope.data.userInfo = response.data.userInfo;
                                                settingsCache.updateSettings("userInfo", $scope.data.userInfo);
                                                settingsCache.updateSettings("username", $scope.data.username);
                                                settingsCache.updateSettings("password", $scope.data.password);
                                            },
                                            function (err) {
                                                settingsCache.updateSettings("userInfo", null);
                                                settingsCache.updateSettings("password", "");
                                                $scope.data.userInfo = null;
                                                $scope.data.password = "";
                                                $ionicPopup.show({
                                                    template: '',
                                                    title: 'Login Failed. Try again.',
                                                    scope: $scope,
                                                    buttons: [
                                                        {
                                                            text: 'OK',
                                                            type: 'button-assertive'
                                                        }
                                                    ]
                                                });
                                            });
                                    return true;
                                }
                            }
                        }
                    ]
                });






            };
        });

