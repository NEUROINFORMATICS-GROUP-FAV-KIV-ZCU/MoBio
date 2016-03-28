angular.module('mobio.controllers')

        .controller('ExperimentListCtrl', function ($scope, $rootScope, $state, $ionicPopup, experimentService, experimentCache) {

            $scope.showLoadingSpinner = false;
            $rootScope.global.experimentList = experimentCache.getExperiments().experiments;
            $rootScope.$on('experiment-added', function (event, args) {
                $rootScope.global.experimentList = experimentCache.getExperiments().experiments;
            });
            $scope.$on('$ionicView.enter', function (e) {
                $rootScope.global.experimentList = experimentCache.getExperiments().experiments;
            });

            $scope.setSelectedExperiment = function (experiment) {
                experimentCache.setSelectedExperiment(experiment);
                $rootScope.$emit('experiment-changed');
            };

            $scope.getSelectedExperiment = function () {
                return experimentCache.getSelectedExperiment();
            };

            $scope.syncExperiments = function () {
                $scope.showLoadingSpinner = true;
                experimentService.getMyExperiments().then(function (response) {
                    experimentCache.setExperiments(response.data.experimentDataList.experiments);
                    $rootScope.global.experimentList = experimentCache.getExperiments().experiments;
                    $rootScope.$emit('experiment-added');
                },
                        function (error) {
                            $scope.showLoadingSpinner = false;
                            $ionicPopup.show({
                                template: '',
                                title: 'Loading experiments failed. Try again.',
                                scope: $scope,
                                buttons: [
                                    {
                                        text: 'OK',
                                        type: 'button-calm'
                                    }
                                ]
                            });
                        });
            };
        });


