var modelku = Ext.define('eTrav.model.MasterSupplierModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'idms', type: 'int'},
        {name: 'kodems', type: 'int'},
        {name: 'kodesubms', type: 'int'},
        {name: 'tipe', type: 'int'},
        {name: 'kotams', type: 'int'},
        {name: 'namakotams', type: 'string'},
        {name: 'namams', type: 'string'},
        {name: 'suppdisplay', type: 'string'},
        {name: 'namamsbaru', type: 'int'},
        {name: 'emailms', type: 'string'},
        {name: 'alamatms', type: 'string'},
        {name: 'tlpms', type: 'string'},
        {name: 'tlp2ms', type: 'string'},
        {name: 'kontakms1', type: 'string'},
        {name: 'kontakms2', type: 'string'},
        {name: 'hpms', type: 'string'},
        {name: 'faxms', type: 'string'},
        {name: 'bankms', type: 'string'},
        {name: 'norekms', type: 'string'},
        {name: 'grpalfabet', type: 'string'}
    ],
    idProperty: 'idms'
});

Ext.define('GlApp.store.gdtxfaktur.MasterSupplierStore', {
    extend: 'Ext.data.Store',
    alias: 'store.mastersupplierstore',
   
    autoLoad: false,
    storeId: 'gdtxfaktur.MasterSupplierStore',
    model: modelku,
    remoteFilter: true,
    proxy: {
        
        success: true,
        type: 'ajax',
        url: BASE_PATH + 'gd_txfaktur/ms_list',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});

