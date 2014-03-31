/**
 * @author Isht Ae
 **/
Ext.define('GlApp.view.gdtxpengadaan.TxPengadaanGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.gdtxpengadaan.txpengadaangrid',
    itemId: 'txpengadaangrid',
    border: false,
//    store: 'ItemStore',
    autoScroll: true,
    forceFit: true,
    columnLines: true,
    selModel: Ext.create('Ext.selection.CheckboxModel', {
    }),

    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            viewConfig: {
                autoScroll: true,
                emptyText: 'Tidak ada data Pengadaan',
                deferEmptyText: false
            },
            columns: [
                {
                    xtype: 'gridcolumn',
                    width: 120,
                    text: 'NO PENGADAAN',
                    dataIndex: 'namams'
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    text: 'TGL. PENGADAAN',
                    dataIndex: 'alamatms'
                },
                {
                    xtype: 'gridcolumn',
                    width: 150,
                    text: 'CABANG',
                    dataIndex: 'namakotams'
                },
                {
                    xtype: 'gridcolumn',
                    width: 150,
                    text: 'DIVISI',
                    dataIndex: 'tlpms'
                }
            ]
        });

        me.callParent(arguments);
    }
});
/* End of file reservasiGrid.js */
/* Location: ./assets/js/app/view/reservasi/reservasiGrid.js */