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
Ext.define('GlApp.store.dvtxbrkeluar.DivisiRuanganStore1', {
    extend: 'Ext.data.Store',
    alias: 'store.dvtxbrkeluar.divisiruanganstore1',
    model: modelku,
    
    autoLoad: false,
    storeId: 'DivisiRuanganStore1',
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