// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
	production: false,

	APIEndpoint: 'http://localhost:8080',
	APIEndpoint1: 'http://localhost:8081',

	add_upd_del_user: 'http://localhost:8080/api/users/',
	list_users: 'http://localhost:8080/api/users/all',

	authApi: 'http://localhost:8080/auth',
	permissionApi: 'http://localhost:8080/api/permissions',
	userApi: 'http://localhost:8080/api/users',

	kontnaGrupaApi: 'http://localhost:8080/api/konto',
	brutoBilansApi: 'http://localhost:8080/api/bilans',
  izvestajiApi: 'http://localhost:8080/api/izvestaji',
  analitkceKarticeApi: 'http://localhost:8080/api/knjizenje/analitickeKartice',

  bilans_stanja: 'http://localhost:8080/api/izvestaji/stanje',
  bilans_uspeha: 'http://localhost:8080/api/izvestaji/uspeh',

  profitniCentriApi: 'http://localhost:8080/api/profitni-centri',

  troskovni_centar: 'http://localhost:8080/api/troskovni-centri',

  lokacijeApi: 'http://localhost:8080/api/lokacije',
  zaposleniApi: 'http://localhost:8080/api/zaposleni'

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
