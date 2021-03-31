// in live change
// export const IS_LIVE = '#IS_LIVE#';
// export const APPLICATION_NAME = '#APPLICATION-NAME#';

/* Live/production deployment configuration variables */
export const environment = {
  production: true,
  GATEWAY_URL: '#GATEWAY_URL#',
  GLOBAL_GATEWAY_URL: '#GLOBAL_GATEWAY_URL#',
  NOTIFICATION_URL: '#NOTIFICATION_URL#',
  LOG_IN_API_Endpoint: '#LOG_IN_API_ENDPOINT#',
  SERVICE_CONTEXT: '#PRJ_SERVICE_CONTEXT#',
  FILE_SERVICE_CONTEXT: '#FILE_SERVICE_CONTEXT#',
  IS_MODAL_OPEN: false
};

/**
 * Live and production deployment configuration variables.
 *
 */
// export const environment = {
//   production: true,
//   GATEWAY_URL: '#GATEWAY_URL#',
//   GLOBAL_GATEWAY_URL: '#GLOBAL_GATEWAY_URL#',
//   NOTIFICATION_URL: '#NOTIFICATION_URL#',
//   LOG_IN_API_Endpoint: '#LOG_IN_API_ENDPOINT#',
//   SERVICE_CONTEXT: '#PRJ_SERVICE_CONTEXT#',
//   FILE_SERVICE_CONTEXT: '#FILE_SERVICE_CONTEXT#',
//   IS_MODAL_OPEN: false
// };



/*
export const environment.ts = {
  production: true,
  GATEWAY_URL: 'http://'+window.location.hostname+':8080',
  GLOBAL_GATEWAY_URL: 'http://dev-hscm.grp.gov.bd/global/api',
  NOTIFICATION_URL: 'http://dev-hscm.grp.gov.bd/bcc/notification',
  LOG_IN_API_Endpoint: 'http://dev-hscm.grp.gov.bd/global/web',
  SERVICE_CONTEXT: 'grp-prj-service',
  FILE_SERVICE_CONTEXT: 'cmn-service-file-management/cmn-service-file-management',
  IS_MODAL_OPEN: false
};
*/
