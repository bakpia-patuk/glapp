var Anggaran = Ext.define('GlApp.model.DaModelTree', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'idCabang', type: 'int'},
        {name: 'cabang_code', type: 'string'},
        {name: 'cabang_city', type: 'string'},
        {name: 'cabang_name', type: 'string'},
        {name: 'isCabang', type: 'int'},
        {name: 'isJenis', type: 'int'},
        {name: 'isData', type: 'int'},
        {name: 'jenisBayar', type: 'int'},
        {name: 'suppId', type: 'int'},
        {name: 'displayName', type: 'string'},
        {name: 'faktur_no', type: 'string'},
        {name: 'list_po', type: 'string'},
        {name: 'list_tt', type: 'string'},
        {name: 'fakturEd', type: 'date'},
        {name: 'tgldari', type: 'string'},
        {name: 'no_rekbg', type: 'string'},
        {name: 'faktur_bgstatus`', type: 'date'},
        {name: 'faktur_nominal', type: 'float'},
        {name: 'faktur_byrrealisasi', type: 'float'},
        {name: 'iconCls', type: 'string'},
        {name: 'leaf', type: 'boolean'},
        {name: 'expanded', type: 'boolean', defaultValue: true}
    ],
    idProperty: 'idCabang'
});

Ext.define('GlApp.store.bkanggaran.DaStoreTree', {
    extend: 'Ext.data.TreeStore',
    model: Anggaran,
    root: {
        idCabang: '0',
        displayName: 'root',
        expanded: true
    },
    proxy: {
        type: 'ajax',
        url: BASE_PATH + 'bk_anggaran/anggaran_tree/1',
        actionMethods: 'POST',
        reader: {
            type: 'json'
        }
    },
    clearOnLoad: false
});