var modelku = Ext.define('eTrav.model.DivisiRuanganModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'divisiCode', type: 'int'},
        {name: 'cabangId', type: 'int'},
        {name: 'ruangId', type: 'string'},
        {name: 'ruangName', type: 'string'},
        {name: 'isActive', type: 'int'}
    ],
    idProperty: 'id'
});
Ext.define('GlApp.store.dvtxbrminta.DivisiRuanganStore', {
    extend: 'Ext.data.Store',
    alias: 'store.dvtxpengadaan.divisiruanganstore',
    model: modelku,
    
    autoLoad: false,
    storeId: 'DivisiRuanganStore',
    remoteFilter: true,
    proxy: {
        success: true,
        type: 'ajax',
        url: BASE_PATH + 'dv_txbrminta/list_divisi_ruangan',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});