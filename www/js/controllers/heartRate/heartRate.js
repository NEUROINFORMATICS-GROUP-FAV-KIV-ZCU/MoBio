angular.module('mobio.controllers')

        .controller('HeartRateCtrl', function ($scope) {


            var success = function (result) {
                $scope.$apply(
                        function () {
                            $scope.data = result;
                        }
                );
            };
            var failure = function () {
                alert("Error calling Hello Plugin");
            };
            
            try {
                antplus.greet("World", success, failure);
            } catch (e) {
                console.log("antplus is not defined");
            }


        });


