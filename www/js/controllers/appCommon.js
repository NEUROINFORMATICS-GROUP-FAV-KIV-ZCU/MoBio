angular.module('mobio.controllers')

        .controller('AppCtrl', function ($scope, $rootScope, $ionicModal, $timeout, profileCache, experimentCache) {
            $rootScope.global = {
                selectedProfile: profileCache.getSelectedProfile(),
                selectedExperiment: experimentCache.getSelectedExperiment(),
                profileList: []
            };
            
            $scope.getSelectedProfile = function () {
                return profileCache.getSelectedProfile();
            };
            
            $rootScope.$on('profile-changed', function (event, args) {
                $rootScope.global.selectedProfile = profileCache.getSelectedProfile();
            });
            
            $scope.getSelectedExperiment = function () {
                return experimentCache.getSelectedExperiment();
            };
            
            $rootScope.$on('experiment-changed', function (event, args) {
                $rootScope.global.selectedExperiment = experimentCache.getSelectedExperiment();
            });
        });


