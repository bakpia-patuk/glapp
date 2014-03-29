/**
 * @author Isht Ae
 **/
Ext.define('eTrav.view.divstockopname.divlistSoGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.divstockopname.divlistsogrid',
    id: 'divlistsogrid',
    autoScroll: true,
    forceFit: true,
    width: 400,
    height: 250,
    //store: 'MataUangStore',
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
            tbar: [
                '->',
                {
                    xtype: 'button',
                    iconCls: 'icon-btn-refresh',
                    action: 'soTrxRefresh'
                }
            ],
            columns: [
                Ext.create('Ext.grid.RowNumberer'),
                {
                    width: 70,
                    header: 'Tanggal',
                    dataIndex: 'tglTransaksi',
                    renderer: Ext.util.Format.dateRenderer('d M Y')
                },
                {
                    width: 100,
                    header: 'Jenis Penyesuaian',
                    dataIndex: 'itemqty',
                    format: '0000'
                },
                {
                    width: 75,
                    xtype: 'numbercolumn',
                    align: 'center',
                    header: 'Jumlah',
                    dataIndex: 'itemqty',
                    format: '0000'
                }
            ]
        });

        me.callParent(arguments);
    }
});
/* End of file reservasiGrid.js */
/* Location: ./assets/js/app/view/reservasi/reservasiGrid.js */