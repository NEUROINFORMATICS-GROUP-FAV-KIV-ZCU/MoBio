angular.module('mobio.controllers')

        .controller('ActivitiesCtrl', function ($scope) {
            $scope.activities = [
                {title: 'BP Monitor FORA', desc: 'FORA P30 Plus Bluetooth Blood Pressure Monitor measures a user’s blood pressure, stores recorded data, and forwards the information to another device.',
                    id: 'bp', protocol: 'bts', img: 'bts.png'},
                {title: 'Heart Rate', desc: 'An ANT+ Heart Rate Sensor is a body-worn device that allows the user to measure heart rate in real-time. ',
                    id: 'hr', protocol: 'antplus', img: 'ANT.HR.icon.FA.jpg'},
                {title: 'Stride SDM', desc: 'An ANT+ Stride-based Speed and Distance Monitor is personal body-worn device such as a foot pod or pedometer that allows the user to measure the number of strides taken, speed traveled and/or distance covered based on stride measurements and calculations.',
                    id: 'sdmant', protocol: 'antplus', img: 'ANT.SPD.Icon.foot.FA.jpg'},
                {title: 'Weight Scale', desc: 'An ANT+ Weight Scale is primarily used to measure the weight of the user that is placed on it.',
                    id: 'wgtant', protocol: 'antplus', img: 'ANT.WGT.Icon.FA.jpg'}
            ];
        });


