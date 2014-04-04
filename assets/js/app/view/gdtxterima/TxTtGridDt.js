/**
 * @author Isht Ae
 **/
Ext.define('GlApp.view.gdtxterima.TxTtGridDt', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.gdtxterima.txttgriddt',
    itemId: 'txttgriddt',
    border: false,
//    store: 'ItemStore',
    autoScroll: true,
    forceFit: false,
    columnLines: true,

    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            viewConfig: {
                autoScroll: true,
                emptyText: 'Tidak ada data Pengadaan',
                deferEmptyText: false
            },
            tbar: [
                {
                    text: 'TAMBAH',
                    ui: 'orange-button',
                    action: 'ttLotAdd'
                }
            ],
            columns: [
                Ext.create('Ext.grid.RowNumberer'),
                {
                    xtype: 'gridcolumn',
                    flex: 0.5,
                    text: 'NO LOT',
                    dataIndex: 'noLot'
                },
                {
                    xtype: 'datecolumn',
                    flex: 0.3,
                    text: 'TGL. EXPIRED',
                    dataIndex: 'tglEd'
                },
                {
                    xtype: 'numbercolumn',
                    flex: 0.15,
                    text: 'JUMLAH',
                    dataIndex: 'qtyLot'
                }
            ]
        });

        me.callParent(arguments);
    }
});
/* End of file reservasiGrid.js */
/* Location: ./assets/js/app/view/reservasi/reservasiGrid.js */