var trxbank = Ext.define('GlApp.model.TrxBankModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'formId', type: 'string'},
        {name: 'no_ref_trx', type: 'string'},
        {name: 'tglTransaksiFull', type: 'datetime'},
        {name: 'tglTransaksi', type: 'date'},
        {name: 'jam', type: 'time'},
        {name: 'kas_bank', type: 'int'},
        {name: 'kas_grpkeperluan', type: 'int'},
        {name: 'kas_dtlkeperluan', type: 'int'},
        {name: 'keteranganKd', type: 'string'},
        {name: 'kas_jumlah', type: 'double'},
        {name: 'kas_bayartype', type: 'int'},
        {name: 'noBg', type: 'string'},
        {name: 'noRek', type: 'string'},
        {name: 'kas_bged', type: 'date'},
        {name: 'kas_bankbg', type: 'string'},
        {name: 'kas_namabayar', type: 'string'},
        {name: 'user_createsign', type: 'string'},
        {name: 'kas_kbapproval', type: 'int'},
        {name: 'simpan_status', type: 'int'}
    ],
    idProperty: 'id'
});

Ext.define('GlApp.store.bkmasuk.TrxBankStore', {
    extend: 'Ext.data.Store',
    alias: 'store.bkmasuk.trxbankstore',
    autoLoad: true,
    storeId: 'BkMasukTrxBankStore',
    model: trxbank,
    remoteFilter: true,
    proxy: {
        success: true,
        type: 'ajax',
        url: BASE_PATH + 'bk_masuk/trx_bank_list',
        reader: {
            type: 'json',
            root: 'data'
        }
    },
    groupField: 'symbol'
});

