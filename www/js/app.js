
angular.module('mobio', ['ionic', 'mobio.controllers', 'mobio.config', 'mobio.directives', 'mobio.odML', 'mobio.cache', 'mobio.eegbase', 'pascalprecht.translate', 'auth0', 'angular-storage', 'angular-jwt'])

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

        .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider, $translateProvider, i18n_en, i18n_cs, authProvider, $httpProvider, jwtInterceptorProvider) {

            authProvider.init({
                domain: 'mobio.eu.auth0.com',
                clientID: '1AwrQrmRrTIoD7MgzFotZOf9MNlGz22A',
                loginState: 'home' // This is the name of the state where you'll show the login, which is defined above...
            });

            jwtInterceptorProvider.tokenGetter = function (store, jwtHelper, auth) {
                var idToken = store.get('token');
                var refreshToken = store.get('refreshToken');
                // If no token return null
                if (!idToken || !refreshToken) {
                    return null;
                }
                // If token is expired, get a new one
                if (jwtHelper.isTokenExpired(idToken)) {
                    return auth.refreshIdToken(refreshToken).then(function (idToken) {
                        store.set('token', idToken);
                        return idToken;
                    });
                } else {
                    return idToken;
                }
            };

            $httpProvider.interceptors.push('jwtInterceptor');

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