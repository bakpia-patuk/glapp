var BankModel = Ext.define('GlApp.model.BankModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'bank_nama', type: 'int'},
        {name: 'bankGroupNama', type: 'string'},
        {name: 'bank_alias', type: 'string'},
        {name: 'bank_reknama', type: 'string'},
        {name: 'bank_rekno', type: 'string'},
        {name: 'bank_alamat', type: 'string'},
        {name: 'bank_cabang', type: 'int'},
        {name: 'bank_kodeakun', type: 'int'},
        {name: 'bank_golakun', type: 'int'},
        {name: 'bank_status', type: 'int'},
        {name: 'bank_active', type: 'int'}
    ],
    idProperty: 'id'
});


Ext.define('GlApp.store.bkmsbank.BankStore', {
    extend: 'Ext.data.Store',
    alias: 'store.bkmsbank.cabangstore',
    model: BankModel,
    storeId: 'BkMsBankStore',
    autoLoad: true,
    remoteFilter: true,
    proxy: {
        success: true,
        type: 'ajax',
        url: BASE_PATH + 'bk_msbank/list_bank',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});