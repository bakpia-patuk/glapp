Ext.define('eTrav.view.dvtxbrkeluar.DvTxBrKeluarDetailGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.dvtxbrkeluar.dvtxbrkeluardetailgrid',
    itemId: 'dvtxbrkeluardetailgrid',
    border: false,
    forceFit: true,
    columnLines: true,
    //selModel : smGrid,
    flex: 1,
   store: 'dvtxbrkeluar.PengdivDetailStore',
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
                    flex: 0.4,
                    text: 'NAMA BARANG',
                    dataIndex: 'barangName',
                    renderer: Ext.util.Format.uppercase
                },
                {
                    xtype: 'numbercolumn',
                    flex: 0.2,
                    text: 'QTY PERMINTAAN',
                    dataIndex: 'qtyMinta',
                    format: '000'
                },
                {
                    xtype: 'numbercolumn',
                    flex: 0.2,
                    text: 'QTY KIRIM',
                    dataIndex: 'qtyKirim',
                    format: '000'
                },
                {
                    flex: 0.2,
                    text: 'NO PENGELUARAN',
                    dataIndex: 'noKirim',
                    renderer: 'uppercase'
                }
            ]
        });

        me.callParent(arguments);
    }
});