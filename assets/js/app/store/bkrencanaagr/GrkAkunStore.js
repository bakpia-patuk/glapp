var GroupPerlu = Ext.define('GlApp.model.GrkModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'kp_id', type: 'int'},
        {name: 'form_id', type: 'int'},
        {name: 'akun_header', type: 'int'},
        {name: 'simpan_status', type: 'int'},
        {name: 'akun_name', type: 'string'}
    ],
    idProperty: 'id'
});

Ext.define('GlApp.store.bkrencanaagr.GrkAkunStore', {
    extend: 'Ext.data.Store',
    alias: 'store.bkrencanaagr.grkakunstore',
    model: GroupPerlu,
    storeId: 'GrkAkunStore',
    autoLoad: false,
    remoteFilter: true,
    proxy: {
        success: true,
        type: 'ajax',
        url: BASE_PATH + 'shared/list_akun_gr',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});