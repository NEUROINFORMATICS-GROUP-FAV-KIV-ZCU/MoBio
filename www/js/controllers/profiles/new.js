angular.module('mobio.controllers')

        .controller('ProfilesNewCtrl', function ($scope, $rootScope, $state, $ionicPopup, profileCache) {

            $scope.data = {
                newProfile: {
                    id: null,
                    profileName: "",
                    email: "",
                    name: "",
                    surname: "",
                    age: 26,
                    gender: 1,
                    height: 185,
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
                        $scope.data.newProfile.id = new Date().getTime();
                        profileCache.addProfile($scope.data.newProfile);
                        $scope.data.newProfile = {
                            id: null,
                            profileName: "",
                            email: "",
                            name: "",
                            surname: "",
                            age: 26,
                            gender: 1,
                            height: 185,
                            activityLevel: 3,
                            lifetimeAthlete: false
                        };
                        $rootScope.$emit('profile-added');
                        $state.go('profiles.list');
                    }
                });
            };   

        });


