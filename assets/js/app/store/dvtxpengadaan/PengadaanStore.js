var modelku = Ext.define('eTrav.model.PengadaanModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'idPengadaan', type: 'int'},
        {name: 'tglTransaksi', type: 'date'},
        {name: 'noPeng', type: 'string'},
        {name: 'idCabang', type: 'int'},
        {name: 'cabangName', type: 'string'},
        {name: 'divisi', type: 'int'},
        {name: 'divisiName', type: 'string'},
        {name: 'tglKebutuhan', type: 'date'},
        {name: 'pengDesc', type: 'string'},
        {name: 'pengStatus', type: 'int'},
        {name: 'pengStatusDiv', type: 'int'},
        {name: 'poStatus', type: 'int'},
        {name: 'pengPetugas', type: 'int'},
        {name: 'simpanStatus', type: 'int'}
    ],
    idProperty: 'idPengadaan'
});

Ext.define('GlApp.store.dvtxpengadaan.PengadaanStore', {
    extend: 'Ext.data.Store',
    alias: 'store.dvtxpengadaan.pengadaanstore',
    model: modelku,
   
    autoLoad: false,
    storeId: 'PengadaanStore',
    remoteFilter: true,
    proxy: {
        success: true,
        type: 'ajax',
        url: BASE_PATH + 'dv_txpengadaan/list_pengadaan',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});