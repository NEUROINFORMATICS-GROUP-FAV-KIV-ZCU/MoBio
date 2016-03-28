Mobio App - release build (Android)

1) checkout master branch
2) pull latest changes

3) install node modules (skip this step, if the modules were installed previously):
   
    npm install

4)  To quickly load in plugins and platforms, you can simply do:

    ionic state restore

5) optionally remove console plugin (add when building develop): cordova plugin rm org.apache.cordova.console
6) run command: ionic build --release android (for ios: ionic build --release ios)


more info: 
https://www.airpair.com/ionic-framework/posts/production-ready-apps-with-ionic-framework
http://www.raymondcamden.com/2015/04/20/ionic-adds-a-new-state-feature/

===========================

Mobio App Signing (Android):

1) cd platforms\android\build\outputs\apk
2) jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore mobio-release-key.keystore android-armv7-release-unsigned.apk mobio
   password: ask lubosmuller@seznam.cz
3) zipalign -v 4 android-armv7-release-unsigned.apk Mobio.apk
  The zipalign tool can be found in /path/to/Android/sdk/build-tools/VERSION/zipalign
  example: C:\Users\Lubos\AppData\Local\Android\android-sdk\build-tools\22.0.1\zipalign -v 4 android-armv7-release-unsigned.apk Mobio.apk
4) signed Mobio.apk is created
5) Enjoy :-)