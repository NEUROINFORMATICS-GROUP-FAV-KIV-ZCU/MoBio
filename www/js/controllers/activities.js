angular.module('mobio.controllers')

        .controller('ActivitiesCtrl', function ($scope) {
            $scope.activities = [
                {title: 'BP Monitor FORA', desc: 'sample description', id: 'bp', protocol: 'bts'},
                {title: 'Heart Rate', desc: 'sample description', id: 'hr', protocol: 'antplus'},
//                {title: 'Blood Pressure', desc: 'sample description', id: 'bpant', protocol: 'antplus'},
                {title: 'Weight Scale', desc: 'sample description', id: 'wgtant', protocol: 'antplus'}
            ];
        });


