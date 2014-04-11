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
Ext.define('GlApp.store.ivtxbrminta.DivisiFormStore', {
    extend: 'Ext.data.Store',
    alias: 'store.ivtxbrminta.divisiformstore',
    model: divisi,
    autoLoad: false,
    storeId: 'IvMsDivisiFormStore',
    remoteFilter: true,
    proxy: {
        success: true,
        type: 'ajax',
        url: BASE_PATH + 'iv_txbrminta/list_divisi',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});