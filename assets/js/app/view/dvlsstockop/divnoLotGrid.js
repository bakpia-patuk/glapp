/**
 * @author Isht Ae
 **/
Ext.define('eTrav.view.divstockopname.divnoLotGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.divstockopname.divnolotgrid',
    id: 'divnolotgrid',
    autoScroll: true,
    forceFit: true,
    width: 400,
    height: 250,
    store: 'LotDivStore',
    columnLines: true,
    flex: 1,
    border: true,

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
                    width: 75,
                    xtype: 'numbercolumn',
                    align: 'center',
                    header: 'No Lot',
                    dataIndex: 'noLot',
                    format: '0000'
                },
                {
                    width: 70,
                    header: 'Tanggal Expired',
                    dataIndex: 'tglEd',
                    renderer: Ext.util.Format.dateRenderer('d/M/Y')
                },
                {
                    width: 75,
                    xtype: 'numbercolumn',
                    align: 'center',
                    header: 'Jumlah',
                    dataIndex: 'qtyLot',
                    format: '0000'
                }
            ]
        });

        me.callParent(arguments);
    }
});
/* End of file reservasiGrid.js */
/* Location: ./assets/js/app/view/reservasi/reservasiGrid.js */