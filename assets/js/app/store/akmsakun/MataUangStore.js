var modelku = Ext.define('eTrav.model.MataUangModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'nama_mu', type: 'string'},
        {name: 'symbol_mu', type: 'string'},
        {name: 'keterangan', type: 'string'},
        {name: 'data', type: 'string'},
        {name: 'status', type: 'int'},
        {name: 'kurs', type: 'int'}
    ],
    idProperty: 'id'
});
Ext.define('GlApp.store.akmsakun.MataUangStore', {
    extend: 'Ext.data.Store',
    alias: 'store.akmsakun.matauangstore',
    
    autoLoad: false,
    storeId: 'MataUangStore',
    model: modelku,
    proxy: {
        success: true,
        type: 'ajax',
        url: BASE_PATH + 'shared/get_mata_uang',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});

