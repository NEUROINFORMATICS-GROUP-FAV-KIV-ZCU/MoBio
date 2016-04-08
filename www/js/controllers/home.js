angular.module('mobio.controllers')

        .controller('HomeCtrl', function ($scope, $rootScope, $ionicPopup, userService, settingsCache, profileCache) {

            $scope.data = {
                userInfo: settingsCache.getSettings().userInfo,
                username: settingsCache.getSettings().username,
                password: settingsCache.getSettings().password,
                disableLogin: false
            };

            var errorLoginCallback = function () {
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
            };

            $scope.login = function () {
                $scope.data.disableLogin = true;
                $ionicPopup.show({
                    template: 'Username:<input type="text" ng-model="data.username">Password:<input type="password" ng-model="data.password">',
                    title: 'EEGBase Login',
                    subTitle: 'Please enter username and password',
                    scope: $scope,
                    buttons: [
                        {
                            text: 'Cancel',
                            onTap: function (e) {
                                $scope.data.disableLogin = false;
                                return true;
                            }
                        },
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
                                                if (response == 'timeout') {
                                                    errorLoginCallback();
                                                } else {
                                                    $scope.data.userInfo = response.data.userInfo;
                                                    settingsCache.updateSettings("userInfo", $scope.data.userInfo);
                                                    settingsCache.updateSettings("username", $scope.data.username);
                                                    settingsCache.updateSettings("password", $scope.data.password);

                                                    if (profileCache.getProfileByName($scope.data.username) == null) {
                                                        profileCache.addProfile({
                                                            id: new Date().getTime(),
                                                            profileName: $scope.data.username,
                                                            email: "",
                                                            name: response.data.userInfo.name,
                                                            surname: response.data.userInfo.surname,
                                                            age: null,
                                                            gender: 1,
                                                            height: null,
                                                            activityLevel: 0,
                                                            lifetimeAthlete: false
                                                        });
                                                        $rootScope.$emit('profile-added');
                                                    }

                                                }
                                                $scope.data.disableLogin = false;
                                            },
                                            function (err) {
                                                errorLoginCallback();
                                                $scope.data.disableLogin = false;
                                            });
                                    return true;
                                }
                            }
                        }
                    ]
                });






            };
        });

