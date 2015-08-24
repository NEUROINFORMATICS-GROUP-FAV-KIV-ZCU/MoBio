angular.module('mobio.controllers')

        .controller('ActivitiesCtrl', function ($scope) {
            $scope.activities = [
                {title: 'Blood Pressure', id: 'bp'},
                {title: 'Heart Rate', id: 'hr'}
            ];
        });


