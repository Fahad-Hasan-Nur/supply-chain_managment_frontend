// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const IS_LIVE = true;

/* Copy this file as environment.ts.ts and modify variables as necessary - Imtiaz */
export const environment = {
  production: false,
  //GATEWAY_URL: 'http://localhost:8080/',
  GATEWAY_URL: 'https://nur-ecommerce-backend.herokuapp.com/',
  GLOBAL_GATEWAY_URL: 'http://dev-hscm.grp.gov.bd/global/api',
  NOTIFICATION_URL: 'http://dev-hscm.grp.gov.bd/bcc/notification',
  LOG_IN_API_Endpoint: 'http://localhost:4200',
  SERVICE_CONTEXT: 'grp-prj-service',
  FILE_SERVICE_CONTEXT:'cmn-service-file-management/cmn-service-file-management',
  IS_MODAL_OPEN: false
  //    // "start": "ng serve -c production --host 0.0.0.0 --disableHostCheck",

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
