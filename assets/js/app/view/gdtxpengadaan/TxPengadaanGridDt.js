/**
 * @author Isht Ae
 **/
Ext.define('GlApp.view.gdtxpengadaan.TxPengadaanGridDt', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.gdtxpengadaan.txpengadaangriddt',
    itemId: 'txpengadaangriddt',
    border: false,
    store: 'gdtxpengadaan.PengDetailStore',
    autoScroll: true,
    forceFit: true,
    columnLines: true,

    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            viewConfig: {
                autoScroll: true,
                emptyText: 'Tidak ada data Barang Pengadaan',
                deferEmptyText: false
            },
            tbar: [
                {
                    text: 'DELETE',
                    ui: 'orange-button',
                    itemId: 'deleteItemPeng'
                }
                
            ],
            columns: [
                Ext.create('Ext.grid.RowNumberer'),
                {
                    xtype: 'gridcolumn',
                    width: 200,
                    text: 'NAMA BARANG',
                    renderer: 'uppercase',
                    dataIndex: 'barang_name'
                },
                {
                    xtype: 'datecolumn',
                    width: 100,
                    text: 'UNTUK TGL.',
                    dataIndex: 'tgl_butuh',
                    format: 'd/M/Y'
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    text: 'MERK',
                    renderer: 'uppercase',
                    dataIndex: 'merk_name'
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    text: 'NO KATALOG',
                    dataIndex: 'peng_katalog'
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    text: 'KEMASAN',
                    dataIndex: 'peng_kemasan'
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    text: 'QTY PESANAN',
                    dataIndex: 'peng_qty'
                },
                {
                    xtype: 'gridcolumn',
                    width: 250,
                    hidden: true,
                    text: 'KETERANGAN',
                    dataIndex: 'barang_desc'
                }
            ]
        });

        me.callParent(arguments);
    }
});
/* End of file reservasiGrid.js */
/* Location: ./assets/js/app/view/reservasi/reservasiGrid.js */