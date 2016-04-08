angular.module('mobio.cache')

        .factory('profileCache', function () {
//            var basicObj = {
//                profiles: [],
//                selectedProfile: null
//            };

            return {
                cacheAvailable: function () {
                    return (typeof (Storage) === 'undefined' ? false : true);
                },
                getProfiles: function () {
                    if (!this.cacheAvailable()) {
                        return false;
                    }
                    return JSON.parse(window.localStorage.getItem("profileCache"));
                },
                getProfileById: function (id) {
                    var profileCache = this.getProfiles();
                    
                    for(var i = 0; i < profileCache.profiles.length; i++) {
                        if(profileCache.profiles[i].id == id) {
                            return profileCache.profiles[i];
                        }
                    }                    
                    return null;
                },
                getProfileByName: function (profileName) {
                    var profileCache = this.getProfiles();
                    
                    if (!profileCache.profiles) {
                        return null;
                    }
                    
                    for(var i = 0; i < profileCache.profiles.length; i++) {
                        if(profileCache.profiles[i].profileName == profileName) {
                            return profileCache.profiles[i];
                        }
                    }                    
                    return null;
                },
                updateProfile: function (updatedProfile) {
                    if (!this.cacheAvailable()) {
                        return false;
                    }
                    var profileCache = this.getProfiles();
                    
                    for(var i = 0; i < profileCache.profiles.length; i++) {
                        if(profileCache.profiles[i].id == updatedProfile.id) {
                            profileCache.profiles[i] = updatedProfile;
                            window.localStorage.setItem("profileCache", JSON.stringify(profileCache));
                            return true;
                        }
                    }                                        
                    return false;
                },
                addProfile: function (newProfile) {
                    if (!this.cacheAvailable()) {
                        return false;
                    }
                    var profileCache = this.getProfiles();
                    
                    if (!profileCache.profiles) {
                        profileCache.profiles = [];
                    }
                    
                    profileCache.profiles.push(newProfile);
                    window.localStorage.setItem("profileCache", JSON.stringify(profileCache));
                    return profileCache.profiles.indexOf(newProfile);
                },  
                getSelectedProfile: function () {
                    var profileCache = this.getProfiles();
                    if (typeof profileCache.selectedProfile == 'undefined') {
                        return false;
                    }
                    return profileCache.selectedProfile;
                },
                setSelectedProfile: function (selectedProfile) {
                    if (!this.cacheAvailable()) {
                        return false;
                    }
                    var profileCache = this.getProfiles();

                    profileCache.selectedProfile = selectedProfile;
                    window.localStorage.setItem("profileCache", JSON.stringify(profileCache));
                    return true;
                }
            };
        });