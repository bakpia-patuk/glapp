var mintabarang = Ext.define('GlApp.model.IvTxBrMintaModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'tgl_trx', type: 'date'},
        {name: 'penginv_no', type: 'string'},
        {name: 'penginv_cabang', type: 'int'},
        {name: 'penginv_divisi', type: 'string'},
        {name: 'penginv_divruang', type: 'int'},
        {name: 'divisiTujuan', type: 'string'},
        {name: 'penginv_tujuan', type: 'int'},
        {name: 'divisiName', type: 'string'},
        {name: 'ruangName', type: 'string'},
        {name: 'divTujuanName', type: 'string'},
        {name: 'divRuangName', type: 'string'},
        {name: 'user_create', type: 'int'},
        {name: 'simpan_status', type: 'int'}
    ],
    idProperty: 'idPengadaan'
});

Ext.define('GlApp.store.ivtxbrminta.IvTxBrMintaStore', {
    extend: 'Ext.data.Store',
    alias: 'store.ivtxbrminta.ivtxbrmintastore',
    model: mintabarang,
    autoLoad: false,
    storeId: 'ivtxbrmintastore',
    remoteFilter: true,
    proxy: {
        success: true,
        type: 'ajax',
        url: BASE_PATH + 'iv_txbrminta/list_mintainv',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});