/**
 * @author Isht Ae
 **/
Ext.define('GlApp.view.dvlsstockop.DvLsStockOpTrxGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.dvlsstockop.dvlsstockoptrxgrid',
    id: 'dvlsstockoptrxgrid',
    autoScroll: true,
    forceFit: true,
//    store: 'ItemStockDetailDivStore',
    columnLines: true,
    flex: 1,
    border: false,

    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            viewConfig: {
                autoScroll: true,
                emptyText: 'Tidak ada data',
                deferEmptyText: false
            },
//            tbar: [
//                '->',
//                {
//                    xtype: 'button',
//                    iconCls: 'icon-btn-refresh',
//                    action: 'divSoTrxRefresh'
//                }
//            ],
            columns: [
                Ext.create('Ext.grid.RowNumberer'),
                {
                    xtype: 'datecolumn',
                    width: 60,
                    header: 'TGL. TRANSAKSI',
                    dataIndex : 'istCreated',
                    renderer: Ext.util.Format.dateRenderer('d/M/Y')
                },
                {
                    width: 200,
                    header: 'KETERANGAN',
                    dataIndex : 'istJnsTrx'
                },
                {
                    text: 'Jenis',
                    columns : [
                        {
                            width: 75,
                            xtype: 'numbercolumn',
                            align: 'center',
                            header: 'Keluar',
                            dataIndex: 'qtyKeluar',
                            format: '0000'
                        },
                        {
                            width: 75,
                            xtype: 'numbercolumn',
                            align: 'center',
                            header: 'Masuk',
                            dataIndex: 'qtyMasuk',
                            format: '0000'
                        }
                    ]
                },
                {
                    text: 'Stock',
                    columns : [
                        {
                            width: 75,
                            xtype: 'numbercolumn',
                            align: 'center',
                            header: 'Awal',
                            dataIndex: 'stockAwal',
                            format: '0000'
                        },
                        {
                            width: 75,
                            xtype: 'numbercolumn',
                            align: 'center',
                            header: 'Akhir',
                            dataIndex: 'stockAkhir',
                            format: '0000'
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