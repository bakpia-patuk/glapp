var agrsupp = Ext.define('GlApp.model.AgrSuppModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'idCabang', type: 'int'},
        {name: 'faktur_cabang', type: 'int'},
        {name: 'kotaCabang', type: 'string'},
        {name: 'namaCabang', type: 'string'},
        {name: 'isCabang', type: 'int'},
        {name: 'isJenis', type: 'int'},
        {name: 'isData', type: 'int'},
        {name: 'jenisBayar', type: 'int'},
        {name: 'faktur_suppid', type: 'int'},
        {name: 'displayName', type: 'string'},
        {name: 'faktur_no', type: 'string'},
        {name: 'noPo', type: 'string'},
        {name: 'noTt', type: 'string'},
        {name: 'fakturEd', type: 'date'},
        {name: 'jadwalBayar', type: 'string'},
        {name: 'noRekBg', type: 'string'},
        {name: 'bgEd`', type: 'date'},
        {name: 'faktur_nototal', type: 'float'},
        {name: 'fakturRealisasi', type: 'float'}
    ],
    idProperty: 'idCabang'
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