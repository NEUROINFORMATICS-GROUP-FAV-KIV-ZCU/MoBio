
angular.module('mobio', ['ionic', 'mobio.controllers', 'mobio.config', 'mobio.directives', 'mobio.odML', 'mobio.cache', 'mobio.eegbase', 'pascalprecht.translate'])

        .run(function ($ionicPlatform, localCache) {
            $ionicPlatform.ready(function () {
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                if (window.cordova && window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                    cordova.plugins.Keyboard.disableScroll(true);
                }

                setTimeout(function () {
                    if (navigator.splashscreen) {
                        navigator.splashscreen.hide();
                    }
                }, 1000);
                if (window.StatusBar) {
                    // org.apache.cordova.statusbar required
                    StatusBar.styleDefault();
                }

                localCache.initialize();

            });
        })

        .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider, $translateProvider, i18n_en, i18n_cs, $httpProvider) {

            $ionicConfigProvider.tabs.position('bottom');
            $ionicConfigProvider.backButton.text('').icon('ion-ios-arrow-back');
            $ionicConfigProvider.backButton.previousTitleText(false);
            $ionicConfigProvider.views.forwardCache(true);
            $ionicConfigProvider.views.swipeBackEnabled(false);
            $translateProvider.useSanitizeValueStrategy('escape');
            $translateProvider.translations('en', i18n_en);
            $translateProvider.translations('cs', i18n_cs);
            $translateProvider.preferredLanguage('en');
            $translateProvider.fallbackLanguage("en");
            $stateProvider

                    .state('home', {
                        url: '/home',
                        templateUrl: 'templates/home.html',
                        controller: 'HomeCtrl'
                    })

                    .state('settings', {
                        url: '/settings',
                        templateUrl: 'templates/settings.html',
                        controller: 'SettingsCtrl'
                    })
                    
                    .state('demoTour', {
                        url: '/demo-tour',
                        templateUrl: 'templates/demoTour.html'
                    })

                    .state('app', {
                        url: '/app',
                        abstract: true,
                        templateUrl: 'templates/menu.html',
                        controller: 'AppCtrl'
                    })

                    .state('app.activities', {
                        url: '/activities',
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/activities.html',
                                controller: 'ActivitiesCtrl'
                            }
                        }
                    })

                    .state('app.bp', {
                        url: '/activity/bp',
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/bloodPressure/bp.html',
                                controller: 'BloodPressureCtrl'
                            }
                        }
                    })

                    .state('app.hr', {
                        url: '/activity/hr',
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/heartRate/hr.html',
                                controller: 'HeartRateCtrl'
                            }
                        }
                    })

                    .state('app.wgtant', {
                        url: '/activity/wgtant',
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/weightScale/wgtant.html',
                                controller: 'WeightScaleCtrl'
                            }
                        }
                    })

                    .state('app.sdmant', {
                        url: '/activity/sdmant',
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/strideSDM/sdmant.html',
                                controller: 'StrideSDMCtrl'
                            }
                        }
                    })

                    .state('app.bikeant', {
                        url: '/activity/bikeant',
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/bikeSD/bikeant.html',
                                controller: 'BikeSDCtrl'
                            }
                        }
                    })

                    .state('profiles', {
                        url: "/profiles",
                        abstract: true,
                        templateUrl: "templates/menu.html",
                        controller: 'AppCtrl'
                    })

                    .state('profiles.new', {
                        url: '/new',
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/profiles/new.html',
                                controller: 'ProfilesNewCtrl'
                            }
                        }
                    })
                    
                    .state('profiles.edit', {
                        url: '/edit/:id',
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/profiles/edit.html',
                                controller: 'ProfilesEditCtrl'
                            }
                        }
                    })

                    .state('profiles.list', {
                        url: '/list',
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/profiles/list.html',
                                controller: 'ProfilesListCtrl'
                            }
                        }
                    })
                    
                    .state('experiments', {
                        url: "/experiments",
                        abstract: true,
                        templateUrl: "templates/menu.html",
                        controller: 'AppCtrl'
                    })
                    
                    .state('experiments.list', {
                        url: '/list',
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/experiments.html',
                                controller: 'ExperimentListCtrl'
                            }
                        }
                    })



                    ;

            // if none of the above states are matched, use this as the fallback
            $urlRouterProvider.otherwise('/home');
        });

angular.module('mobio.controllers', []);
angular.module('mobio.odML', []);
angular.module('mobio.cache', []);
angular.module('mobio.eegbase', []);