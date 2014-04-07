var agrsupp = Ext.define('GlApp.model.AgrSuppModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'id_trx', type: 'string'},
        {name: 'name', type: 'string'},
        {name: 'name_id', type: 'int'},
        {name: 'keterangan', type: 'string'},
        {name: 'list_po', type: 'string'},
        {name: 'list_tt', type: 'string'},
        {name: 'jadwal_bayar', type: 'string'},
        {name: 'no_rekbg', type: 'string'},
        {name: 'bg_ed', type: 'string'},
        {name: 'cara_bayar', type: 'int'},
        {name: 'ma_value', type: 'flaot'},
        {name: 'test', type: 'boolean'}
    ],
    idProperty: 'id'
});

Ext.define('GlApp.store.bkanggaran.AgrSuppStore', {
    extend: 'Ext.data.Store',
    alias: 'store.agrsuppstore',
    model: agrsupp,
    autoLoad: true,
    storeId: 'AgrSuppStore',
    remoteFilter: true,
    proxy: {
        success: true,
        type: 'ajax',
        url: BASE_PATH + 'bk_anggaran/anggaran_supp1',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});