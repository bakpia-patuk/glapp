/**
 * @author Isht Ae
 **/
Ext.define('GlApp.view.gdtxpengadaan.TxPengadaanGridDt', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.gdtxpengadaan.txpengadaangriddt',
    itemId: 'txpengadaangriddt',
    border: false,
//    store: 'ItemStore',
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
                    ui: 'orange-button'
                },
                {
                    text: 'REFRESH',
                    ui: 'orange-button'
                }
                
            ],
            columns: [
                Ext.create('Ext.grid.RowNumberer'),
                {
                    xtype: 'gridcolumn',
                    width: 200,
                    text: 'NAMA BARANG',
                    dataIndex: 'namams'
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    text: 'UNTUK TGL.',
                    dataIndex: 'alamatms'
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    text: 'MERK',
                    dataIndex: 'namakotams'
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    text: 'NO KATALOG',
                    dataIndex: 'tlpms'
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    text: 'KEMASAN',
                    dataIndex: 'tlp2ms'
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    text: 'QTY PESANAN',
                    dataIndex: 'hpms'
                },
                {
                    xtype: 'gridcolumn',
                    width: 250,
                    hidden: true,
                    text: 'KETERANGAN',
                    dataIndex: 'faxms'
                }
            ]
        });

        me.callParent(arguments);
    }
});
/* End of file reservasiGrid.js */
/* Location: ./assets/js/app/view/reservasi/reservasiGrid.js */