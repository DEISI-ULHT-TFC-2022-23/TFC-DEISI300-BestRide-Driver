// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  apiUrl: 'http://18.117.62.47:8000',
  aws_cognito_social_domain:
    'https://best-ride-driver.auth.us-east-2.amazoncognito.com/',
  aws_cognito_social_redirect_uri: 'http://localhost:8100',
  aws_client_id: '28kb4votf77aot33edbo2icbss',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
