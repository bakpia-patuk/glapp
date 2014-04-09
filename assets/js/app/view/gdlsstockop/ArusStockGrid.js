/**
 * @author Isht Ae
 **/
Ext.define('GlApp.view.gdlsstockop.ArusStockGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.gdlsstockop.arusstockgrid',
    itemId: 'arusstockgrid',
    border: false,
//    store: 'ItemStore',
    autoScroll: true,
    forceFit: true,
    columnLines: true,
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            viewConfig: {
                autoScroll: true,
                emptyText: 'Tidak ada data Arus Barang',
                deferEmptyText: false
            },
            tbar: [
                '->',
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
                    text: 'TANGGAL',
                    dataIndex: 'namams'
                },
                {
                    xtype: 'gridcolumn',
                    width: 300,
                    text: 'KETERANGAN',
                    dataIndex: 'alamatms'
                },
                {
                    width: 100,
                    text: 'JENIS',
                    columns: [
                        {
                            xtype: 'numbercolumn',
                            align: 'center',
                            width: 60,
                            text: 'KELUAR'
                        },
                        {
                            xtype: 'numbercolumn',
                            align: 'center',
                            width: 60,
                            text: 'MASUK'
                        }
                    ]
                },
                {
                    width: 100,
                    text: 'STOCK',
                    columns: [
                        {
                            xtype: 'numbercolumn',
                            align: 'center',
                            width: 60,
                            text: 'AWAL'
                        },
                        {
                            xtype: 'numbercolumn',
                            align: 'center',
                            width: 60,
                            text: 'AKHIR'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }
});
/* End of file reservasiGrid.js */
/* Location: ./assets/js/app/view/reservasi/reservasiGrid.js */