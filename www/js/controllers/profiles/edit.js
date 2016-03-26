angular.module('mobio.controllers')

        .controller('ProfilesEditCtrl', function ($scope, $stateParams, $state, $rootScope, $ionicPopup, profileCache) {
            
            var profileId = $stateParams.id;

            $scope.data = {
                existingProfile: profileCache.getProfileById(profileId)                
            };

            $scope.updateProfile = function () {
                var confirmPopup = $ionicPopup.confirm({
                    title: 'Update Profile',
                    template: 'Are you sure you want update the profile?'
                });

                confirmPopup.then(function (res) {
                    if (res) {
                        profileCache.updateProfile($scope.data.existingProfile);                       
                        profileCache.setSelectedProfile($scope.data.existingProfile);
                        $rootScope.$emit('profile-changed');
                        $state.go('profiles.list');
                    }
                });
            };   

        });


