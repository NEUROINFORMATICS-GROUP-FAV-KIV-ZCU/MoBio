angular.module('mobio.controllers')

        .controller('ProfilesListCtrl', function ($scope, $rootScope, $state, $ionicPopup, profileCache) {

            $rootScope.global.profileList = profileCache.getProfiles().profiles;
            $rootScope.$on('profile-added', function (event, args) {
                $rootScope.global.profileList = profileCache.getProfiles().profiles;
            });
            $scope.$on('$ionicView.enter', function(e) {
                $rootScope.global.profileList = profileCache.getProfiles().profiles;
            });  
            
            $scope.setSelectedProfile = function (profile) {
                profileCache.setSelectedProfile(profile);
                $rootScope.$emit('profile-changed');
            };
            
            $scope.getSelectedProfile = function () {
                return profileCache.getSelectedProfile();
            };
        });


