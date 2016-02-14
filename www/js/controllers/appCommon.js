angular.module('mobio.controllers')

        .controller('AppCtrl', function ($scope, $rootScope, $ionicModal, $timeout, profileCache) {
            $rootScope.global = {
                selectedProfile: profileCache.getSelectedProfile(),
                profileList: []
            };
            
            $scope.getSelectedProfile = function () {
                return profileCache.getSelectedProfile();
            };
            
            $rootScope.$on('profile-changed', function (event, args) {
                $rootScope.global.selectedProfile = profileCache.getSelectedProfile();
            });
        });


