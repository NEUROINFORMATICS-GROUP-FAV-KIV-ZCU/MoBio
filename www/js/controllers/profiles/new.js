angular.module('mobio.controllers')

        .controller('ProfilesNewCtrl', function ($scope, $rootScope, $state, $ionicPopup, profileCache) {

            $scope.data = {
                newProfile: {
                    profileName: "",
                    email: "",
                    name: "",
                    surname: "",
                    birthday: "",
                    sex: 1,
                    height: 180,
                    activityLevel: 3,
                    lifetimeAthlete: false
                }
                
            };

            $scope.addProfile = function () {
                var confirmPopup = $ionicPopup.confirm({
                    title: 'Add Profile',
                    template: 'Are you sure you want add new profile?'
                });

                confirmPopup.then(function (res) {
                    if (res) {
                        profileCache.addProfile($scope.data.newProfile);
                        $scope.data.newProfile = {
                            profileName: "",
                            email: "",
                            name: "",
                            surname: "",
                            birthday: "",
                            sex: 1,
                            height: 180,
                            activityLevel: 3,
                            lifetimeAthlete: false
                        };
                        $rootScope.$emit('profile-added');
                        $state.go('profiles.list');
                    }
                });
            };   

        });


