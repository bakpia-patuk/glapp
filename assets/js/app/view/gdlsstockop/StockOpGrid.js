/**
 * @author Isht Ae
 **/
Ext.define('GlApp.view.gdlsstockop.StockOpGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.gdlsstockop.stockopgrid',
    itemId: 'stockopgrid',
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
                emptyText: 'Tidak ada data Barang',
                deferEmptyText: false
            },
            tbar: [
                {
                    xtype: 'combobox',
                    emptyText: 'Golongan',
                    allowBlank: false
                },
                {
                    text: 'SEARCH',
                    ui: 'orange-button'
                },
                '->',
                {
                    text: 'REFRESH',
                    ui: 'orange-button'
                },
                {
                    text: 'ALL',
                    ui: 'orange-button'
                }
                
            ],
            columns: [
                {
                    xtype: 'gridcolumn',
                    width: 120,
                    text: 'NAMA BARANG',
                    dataIndex: 'namams'
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    text: 'STOCK AKHIR',
                    dataIndex: 'alamatms'
                },
                {
                    xtype: 'gridcolumn',
                    width: 150,
                    text: 'MERK',
                    dataIndex: 'namakotams'
                },
                {
                    xtype: 'gridcolumn',
                    width: 150,
                    text: 'KATALOG',
                    dataIndex: 'tlpms'
                }
            ]
        });

        me.callParent(arguments);
    }
});
/* End of file reservasiGrid.js */
/* Location: ./assets/js/app/view/reservasi/reservasiGrid.js */