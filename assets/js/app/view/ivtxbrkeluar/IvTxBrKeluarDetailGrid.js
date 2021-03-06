Ext.define('GlApp.view.ivtxbrkeluar.IvTxBrKeluarDetailGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.ivtxbrkeluar.ivtxbrkeluardetailgrid',
    itemId: 'ivtxbrkeluardetailgrid',
    border: false,
    forceFit: true,
    columnLines: true,
    //selModel : smGrid,
    flex: 1,
//    store: 'PenginvDetailStore',
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            viewConfig: {
                // /autoScroll: true,
                emptyText: 'Tidak ada daftar Detail barang',
                deferEmptyText: false
            },
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
                    text: 'QTY PERMINTAAN',
                    dataIndex: 'qtyMinta',
                    format: '000'
                }
            ]
        });

        me.callParent(arguments);
    }
});