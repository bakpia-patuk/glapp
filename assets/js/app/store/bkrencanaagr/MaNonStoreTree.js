var MaStore = Ext.define('GlApp.model.MaStoreModel', {
    extend: 'Ext.data.Model',
    fields: [
        //
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
        {name: 'faktur_ed', type: 'date'},
        {name: 'tgldari', type: 'string'},
        {name: 'no_rekbg', type: 'string'},
        {name: 'faktur_bgstatus`', type: 'date'},
        {name: 'fakturNominal', type: 'float'},
        {name: 'hp_cicilan_amt', type: 'float'},
        {name: 'iconCls', type: 'string'},
        {name: 'leaf', type: 'boolean'},
        {name: 'expanded', type: 'boolean', defaultValue: true}
    ],
    idProperty: 'idCabang'
});

Ext.define('GlApp.store.bkrencanaagr.MaNonStoreTree', {
    extend: 'Ext.data.TreeStore',
    model: MaStore,
    root: {
        idCabang: '0',
        displayName: 'root',
        expanded: true
    },
    proxy: {
        type: 'ajax',
        url: BASE_PATH + 'bk_rencanaagr/minta_anggaran_tree/2',
        actionMethods: 'POST',
        reader: {
            type: 'json'
        }
    },
    clearOnLoad: false
});