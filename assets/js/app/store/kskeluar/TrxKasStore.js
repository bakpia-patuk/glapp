var TrxKas = Ext.define('GlApp.model.TrxKasModel', {
    extend: 'Ext.data.Model',
    fields: [
        //kas_anggaranid        kas_nobayar  kas_namabayar  kas_bged    kas_bankbg  kas_akun  kas_kbapproval  user_create     user_createsign                 cabang_id  created              modified
        {name: 'id', type: 'int'},
        {name: 'kas_type', type: 'string'},
        {name: 'no_ref_trx', type: 'string'},
        {name: 'kas_tgltrx_full', type: 'datetime'},
        {name: 'kas_tgltrx', type: 'date'},
        {name: 'jam', type: 'time'},
        {name: 'kas_bank', type: 'int'},
        {name: 'kas_grpkeperluan', type: 'int'},
        {name: 'kas_dtlkeperluan', type: 'int'},
//        {name: 'keteranganKd', type: 'string'},
        {name: 'kas_jumlah', type: 'double'},
        {name: 'kas_bayartype', type: 'int'},
//        {name: 'noBg', type: 'string'},
//        {name: 'noRek', type: 'string'},
//        {name: 'tglBgEd', type: 'date'},
//        {name: 'bankBg', type: 'string'},
        {name: 'kas_namabayar', type: 'string'},
//        {name: 'penerimaBgTtd', type: 'string'},
        {name: 'kas_kbapproval', type: 'int'},
        {name: 'simpan_status', type: 'int'}
    ],
    idProperty: 'id'
});

Ext.define('GlApp.store.kskeluar.TrxKasStore', {
    extend: 'Ext.data.Store',
    alias: 'store.kskeluar.trxkasstore',
    model: TrxKas,
    storeId: 'KsKkTrxKasStore',
    autoLoad: false,
    remoteFilter: true,
    proxy: {
        success: true,
        type: 'ajax',
        url: BASE_PATH + 'ks_keluar/trx_kas_list',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});