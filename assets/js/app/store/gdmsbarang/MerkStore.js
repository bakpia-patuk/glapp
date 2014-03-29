var merkModel = Ext.define('GlApp.model.MerkModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'merk_name', type: 'string'},
        {name: 'simpan_status', type: 'int'}
    ],
    idProperty: 'id'
});

Ext.define('GlApp.store.gdmsbarang.MerkStore', {
    extend: 'Ext.data.Store',
    alias: 'store.gdmsbarang.merkstore',
    model: merkModel,
    storeId: 'MsBarangMerkStore',
    autoLoad: true,
    remoteFilter: true,
    proxy: {
        success: true,
        type: 'ajax',
        url: BASE_PATH + 'shared/list_merk',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});