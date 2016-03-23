angular.module('mobio.controllers')

        .controller('HomeCtrl', function ($scope, $location, auth, store) {
            $scope.auth = auth;

            $scope.login = function () {
                auth.signin({
                    authParams: {
                        scope: 'openid name email offline_access',
                        device: 'Mobile device'
                    }
                }, function (profile, token, accessToken, state, refreshToken) {
                    // Success callback
                    store.set('profile', profile);
                    store.set('token', token);
                    store.set('refreshToken', refreshToken);
                    $location.path('/home');
                }, function () {
                    // Error callback
                });
            };
        });

