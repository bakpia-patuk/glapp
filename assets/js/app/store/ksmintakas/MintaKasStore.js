var MintaKas = Ext.define('GlApp.model.MintaKasModel', {
    extend: 'Ext.data.Model',
    fields: [
        //   
        {name: 'id', type: 'int'},
        {name: 'tgl_trx', type: 'date'},
        {name: 'trx_divisi', type: 'int'},
        {name: 'nama_divisi', type: 'string'},
        {name: 'mk_keperluan', type: 'int'},
        {name: 'mk_detail', type: 'int'},
        {name: 'mk_detailext', type: 'int'},
        {name: 'mkr_pemeriksaan', type: 'string'},
        {name: 'mkr_namapasien', type: 'string'},
        {name: 'mkr_rujukanke', type: 'string'},
        {name: 'trx_desc', type: 'string'},
        {name: 'trx_value', type: 'double'},
        {name: 'trx_realisasi', type: 'double'},
        {name: 'trx_realstatus', type: 'int'},
        {name: 'trx_penerima', type: 'string'},
        {name: 'trx_appr_status', type: 'int'},
        {name: 'trx_appr_peg', type: 'int'},
        {name: 'cabang_id', type: 'int'},
        {name: 'status_simpan', type: 'int'}
    ],
    idProperty: 'id'
});


Ext.define('GlApp.store.ksmintakas.MintaKasStore', {
    extend: 'Ext.data.Store',
    alias: 'store.ksmintakas.mintakasstore',
    model: MintaKas,
    storeId: 'KsMkMintaKasStore',
    autoLoad: false,
    remoteFilter: true,
    proxy: {
        success: true,
        type: 'ajax',
        url: BASE_PATH + 'ks_mintakas/minta_kas_list',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});