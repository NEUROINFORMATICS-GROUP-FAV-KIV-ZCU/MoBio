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
                    id: 'wgtant', protocol: 'antplus', img: 'ANT.WGT.Icon.FA.jpg'},                
                {title: 'Bike Speed', desc: 'An ANT+Bike Speed Sensor is a device mounted on a bicycle that calculates the speed the bicycle is traveling.',
                    id: 'bikeant', protocol: 'antplus', img: 'ANT.SPD.icon.bike.FA.jpg'},
                {title: 'Bike Cadence', desc: 'An ANT+ Bike Cadence Sensor measures the speed at which the user is pedaling, typically using a magnet attached to the pedal shaft and a sensor mounted on the frame.',
                    id: 'bikeant', protocol: 'antplus', img: 'ANT.CAD.icon.bike.FA.jpg'},
                {title: 'Bike Speed and Cadence', desc: 'An ANT+ Speed and Cadence combined sensor measures both speed and cadence',
                    id: 'bikeant', protocol: 'antplus', img: 'Icon.SPDCAD.FA.png'}
            ];
        });


