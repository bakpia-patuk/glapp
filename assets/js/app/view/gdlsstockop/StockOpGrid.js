/**
 * @author Isht Ae
 **/
Ext.define('GlApp.view.gdlsstockop.StockOpGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.gdlsstockop.stockopgrid',
    itemId: 'stockopgrid',
    border: false,
    store: 'gdlsstockop.BarangStore',
    autoScroll: true,
    forceFit: true,
    columnLines: true,

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
                    fieldLabel: 'Filter ',
                    labelAlign: 'right',
                    labelWidth: 40,
                    width: 160,
                    emptyText: 'Jenis'
                },
                {
                    xtype: 'combobox',
                    emptyText: 'Golongan'
                },
                {
                    xtype: 'textfield',
                    emptyText: 'Query'
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
                Ext.create('Ext.grid.RowNumberer', {width: 40}),
                {
                    xtype: 'gridcolumn',
                    width: 200,
                    text: 'NAMA BARANG',
                    dataIndex: 'mi_name'
                },
                {
                    xtype: 'gridcolumn',
                    width: 70,
                    text: 'STOCK',
                    dataIndex: 'stock_last'
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    text: 'MERK',
                    dataIndex: 'mi_merk_name'
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    text: 'KATALOG',
                    dataIndex: 'mi_katalog'
                }
            ]
        });

        me.callParent(arguments);
    }
});
/* End of file reservasiGrid.js */
/* Location: ./assets/js/app/view/reservasi/reservasiGrid.js */