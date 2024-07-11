// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
// src/environments/environment.ts
export const environment = {
  production: false,
  azure: {
    storageAccountName: 'imagetestblob',
    containerName: 'testcontainer',
    sasToken: 'sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2024-08-08T23:13:11Z&st=2024-07-08T15:13:11Z&spr=https&sig=OQpMA9mIX1fxdrbfGSfW%2BWn2WxdeRl4mmUqJXl2f5gw%3D'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
