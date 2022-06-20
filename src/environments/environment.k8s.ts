const userServiceApi = 'http://racunovodstvo.k8s.elab.rs:32264/user-service';
const nabavkaServiceApi = 'http://racunovodstvo.k8s.elab.rs:32264/nabavka-service';
const knjizenjeServiceApi = 'http://racunovodstvo.k8s.elab.rs:32264/knjizenje-service';
const preduzeceServiceApi = 'http://racunovodstvo.k8s.elab.rs:32264/preduzece-service';

export const environment = {
  production: true,

  userServiceApi: userServiceApi,
  nabavkaServiceApi: nabavkaServiceApi,
  knjizenjeServiceApi: knjizenjeServiceApi,
  preduzeceServiceApi: preduzeceServiceApi,

  add_upd_del_user: userServiceApi + '/api/users/',
  list_users: userServiceApi + '/api/users/all',

  authApi: userServiceApi + '/auth',
  permissionApi: userServiceApi + '/api/permissions',
  userApi: userServiceApi + '/api/users',

  kontnaGrupaApi: knjizenjeServiceApi + '/api/konto',
  brutoBilansApi: knjizenjeServiceApi + '/api/bilans',
  izvestajiApi: knjizenjeServiceApi + '/api/izvestaji',
  analitkceKarticeApi: knjizenjeServiceApi + '/api/knjizenje/analitickeKartice',

  bilans_stanja: knjizenjeServiceApi + '/api/izvestaji/stanje',
  bilans_uspeha: knjizenjeServiceApi + '/api/izvestaji/uspeh',

  profitniCentriApi: knjizenjeServiceApi + '/api/profitni-centri',

  troskovni_centar: knjizenjeServiceApi + '/api/troskovni-centri',

  lokacijeApi: nabavkaServiceApi + '/api/lokacije',
  zaposleniApi: preduzeceServiceApi + '/api/zaposleni'

};
