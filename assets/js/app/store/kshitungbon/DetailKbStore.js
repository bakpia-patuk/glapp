var DetailKb = Ext.define('GlApp.model.DetailKbModel', {
    extend: 'Ext.data.Model',
    fields: [
        //kas_anggaranid        kas_nobayar  kas_namabayar  kas_bged    kas_bankbg  kas_akun  kas_kbapproval  user_create     user_createsign                 cabang_id  created              modified
        {name: 'id', type: 'int'},
        {name: 'kasbon_id', type: 'int'},
        {name: 'tgl_trx', type: 'date'},
        {name: 'jumlah_trx', type: 'float'},
        {name: 'keterangan', type: 'string'}
    ],
    idProperty: 'id'
});

Ext.define('GlApp.store.kshitungbon.DetailKbStore', {
    extend: 'Ext.data.Store',
    alias: 'store.kshitungbon.trxkasstore',
    model: DetailKb,
    storeId: 'KsHbDetailKbStore',
    autoLoad: false,
    remoteFilter: true,
    proxy: {
        success: true,
        type: 'ajax',
        url: BASE_PATH + 'ks_hitungbon/detail_kb_list',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});