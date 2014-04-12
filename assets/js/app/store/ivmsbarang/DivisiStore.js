var divisi = Ext.define('GlApp.model.DivisiModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
//        {name: 'divisiId', type: 'int'},
        {name: 'divisi_name', type: 'string'},
        {name: 'is_active', type: 'int'}
    ],
    idProperty: 'id'
});
Ext.define('GlApp.store.ivmsbarang.DivisiStore', {
    extend: 'Ext.data.Store',
    alias: 'store.ivmsbarang.divisistore',
    model: divisi,
    autoLoad: false,
    storeId: 'IvMsDivisiStore',
    remoteFilter: true,
    proxy: {
        success: true,
        type: 'ajax',
        url: BASE_PATH + 'iv_msbarang/list_divisi',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});