var BankNasModel = Ext.define('GlApp.model.BankNasModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'banknas_code', type: 'string'},
        {name: 'banknas_name', type: 'string'},
        {name: 'is_active', type: 'boolean'}
    ],
    idProperty: 'id'
});


Ext.define('GlApp.store.bkmsbank.BankNasStore', {
    extend: 'Ext.data.Store',
    alias: 'store.bkmsbank.banknasstore',
    model: BankNasModel,
    storeId: 'BkMsBankNasStore',
    autoLoad: true,
    remoteFilter: true,
    proxy: {
        success: true,
        type: 'ajax',
        url: BASE_PATH + 'bk_msbank/list_banknas',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});