angular.module('mobio.controllers')

        .controller('ExperimentListCtrl', function ($scope, $rootScope, $state, $ionicPopup, experimentService, experimentCache) {

            $rootScope.global.experimentList = experimentCache.getExperiments().experiments;
            $rootScope.$on('experiment-added', function (event, args) {
                $rootScope.global.experimentList = experimentCache.getExperiments().experiments;
            });
            $scope.$on('$ionicView.enter', function(e) {
                $rootScope.global.experimentList = experimentCache.getExperiments().experiments;
            });  
            
            $scope.setSelectedExperiment = function (experiment) {
                experimentCache.setSelectedExperiment(experiment);
                $rootScope.$emit('experiment-changed');
            };
            
            $scope.getSelectedExperiment = function () {
                return experimentCache.getSelectedExperiment();
            };
            
            $scope.syncExperiments = function() {
                experimentService.getMyExperiments().then(function(response) {                    
                    experimentCache.setExperiments(response.data.experimentDataList.experiments);
                    $rootScope.global.experimentList = experimentCache.getExperiments().experiments;
                    $rootScope.$emit('experiment-added');
                });
            };
        });


