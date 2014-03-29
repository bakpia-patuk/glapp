Ext.define('eTrav.view.dvtxbrterima.DvTxBrTerimaDetailGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.dvtxbrterima.dvtxbrterimadetailgrid',
    itemId: 'dvtxbrterimadetailgrid',
    border: false,
    forceFit: true,
    columnLines: true,
    //selModel : smGrid,
    flex: 1,
//    store: 'PengdivDetailStore',
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            viewConfig: {
                // /autoScroll: true,
                emptyText: 'Tidak ada daftar Detail barang',
                deferEmptyText: false
            },
//            tbar: [
//                {
//                    text: 'Hapus',
//                    iconCls: 'icon-btn-delete'
//                }
//            ],
            columns: [
                Ext.create('Ext.grid.RowNumberer'),
                {
                    xtype: 'gridcolumn',
                    flex: 0.3,
                    text: 'NAMA BARANG',
                    dataIndex: 'barangName',
                    renderer: Ext.util.Format.uppercase
                },
                {
                    xtype: 'numbercolumn',
                    flex: 0.3,
                    text: 'QTY KIRIM',
                    dataIndex: 'qtyKirim',
                    format: '000'
                },
                {
                    xtype: 'numbercolumn',
                    flex: 0.3,
                    text: 'QTY TERIMA',
                    dataIndex: 'qtyTerima',
                    format: '000'
                }
            ]
        });

        me.callParent(arguments);
    }
});