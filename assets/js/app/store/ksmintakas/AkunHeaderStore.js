var AkunHeaderModel = Ext.define('GlApp.model.AkunHeaderModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'no', type: 'int'},
        {name: 'id', type: 'string'},
        {name: 'akun_id', type: 'int'},
        {name: 'akun_name', type: 'string'},
        {name: 'akun_code', type: 'string'},
        {name: 'akun_bal_init', type: 'float'},
        {name: 'akun_bal_last', type: 'float'},
        {name: 'akun_form', type: 'string'},
        {name: 'akun_parent', type: 'int'},
        {name: 'akun_d_k', type: 'int'},
        {name: 'akun_curr', type: 'int'},
        {name: 'akun_child_status', type: 'int'},
        {name: 'akun_fungsi', type: 'int'}
    ],
    idProperty: 'id'
});


Ext.define('GlApp.store.ksmintakas.AkunHeaderStore', {
    extend: 'Ext.data.Store',
    alias: 'store.ksmintakas.akunheaderstore',
    model: AkunHeaderModel,
    storeId: 'KsMkAkunHeaderStore',
    autoLoad: true,
    remoteFilter: true,
    proxy: {
        success: true,
        type: 'ajax',
        url: BASE_PATH + 'shared/list_header_akun_cabang',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});