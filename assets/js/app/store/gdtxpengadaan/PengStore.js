var PengModel = Ext.define('GlApp.model.BarangModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'no', type: 'int'},
        {name: 'id', type: 'string'},
        {name: 'tgl_trx', type: 'date'},
        {name: 'no_pengadaan', type: 'string'},
        {name: 'tgl_butuh', type: 'date'},
        {name: 'peng_type', type: 'int'},
        {name: 'cabang_id', type: 'int'},
        {name: 'cabang_name', type: 'string'},
        {name: 'divisi', type: 'int'},
        {name: 'divisi_name', type: 'string'},
        {name: 'keterangan', type: 'string'},
        {name: 'petugas_id', type: 'int'},
        {name: 'peng_statusdiv', type: 'int'},
        {name: 'peng_statuspst', type: 'int'},
        {name: 'peng_statusmgr', type: 'int'},
        {name: 'peng_status', type: 'int'},
        {name: 'po_status', type: 'int'},
        {name: 'peng_class_row', type: 'string'},
        {name: 'simpan_status', type: 'int'}
    ],
    idProperty: 'id'
});

Ext.define('GlApp.store.gdtxpengadaan.PengStore', {
    extend: 'Ext.data.Store',
    alias: 'store.gdtxpengadaan.pengstore',
    model: PengModel,
    storeId: 'PengStore',
    autoLoad: true,
    remoteFilter: true,
    proxy: {
        success: true,
        type: 'ajax',
        url: BASE_PATH + 'gd_pengadaan/list_all',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});