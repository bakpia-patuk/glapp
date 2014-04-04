var modelku = Ext.define('GlApp.model.BankModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'bankGroup', type: 'int'},
        {name: 'bankGroupNama', type: 'string'},
        {name: 'bankAlias', type: 'string'},
        {name: 'bankNama', type: 'string'},
        {name: 'bankRek', type: 'string'},
        {name: 'bankAlamat', type: 'string'},
        {name: 'bankCabang', type: 'int'},
        {name: 'bankAkun', type: 'int'},
        {name: 'golAkun', type: 'int'},
        {name: 'bankStatus', type: 'int'},
        {name: 'isActive', type: 'int'}
    ],
    idProperty: 'id'
});

Ext.define('GlApp.store.gdtxfaktur.BankStore', {
    extend: 'Ext.data.Store',
    alias: 'store.gdtxfaktur.bankstore',
    model: modelku,
   
    autoLoad: false,
    storeId: 'BankStore',
    remoteFilter: true,
    proxy: {
        success: true,
        type: 'ajax',
        url: BASE_PATH + 'gd_txfaktur/list_bank',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});