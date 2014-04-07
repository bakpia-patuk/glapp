var MaStore = Ext.define('GlApp.model.MaStoreModel', {
    extend: 'Ext.data.Model',
    fields: [
        //
        {name: 'id', type: 'string'},
        {name: 'id_trx', type: 'string'},
        {name: 'name', type: 'string'},
        {name: 'keterangan', type: 'string'},
        {name: 'jadwal_bayar', type: 'string'},
        {name: 'no_rekbg', type: 'string'},
        {name: 'bg_ed', type: 'string'},
        {name: 'ma_value', type: 'float'},
        {name: 'app_status', type: 'int'},
        {name: 'test', type: 'boolean'},
        {name: 'leaf', type: 'boolean'},
        {name: 'expanded', type: 'boolean', defaultValue: true}
    ],
    idProperty: 'id'
});

Ext.define('GlApp.store.bkanggaran.MaNonStoreTree', {
    extend: 'Ext.data.TreeStore',
    model: MaStore,
    root: {
        id: '0',
        displayName: 'root',
        expanded: true
    },
    proxy: {
        type: 'ajax',
        url: BASE_PATH + 'bk_anggaran/ma_non_tree',
        actionMethods: 'POST',
        reader: {
            type: 'json'
        }
    },
    clearOnLoad: false
});