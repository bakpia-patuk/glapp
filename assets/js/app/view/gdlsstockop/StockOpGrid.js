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
    plugins: [
        {
            ptype: 'bufferedrenderer'
        }
    ],
    initComponent: function() {
        var me = this,
                grid = me;

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
                    itemId: 'soType',
                    labelWidth: 40,
                    labelAlign: 'right',
                    emptyText: 'Jenis',
                    displayField: 'type',
                    valueField: 'typeCode',
                    queryMode: 'local',
                    forceSelection: true,
                    typeAhead: true,
                    valueNotFoundText: 'Tidak ada Data',
                    store: new Ext.data.SimpleStore({
                        id: 0,
                        fields: [
                            'typeCode', //numeric value is the key
                            'type' //the text value is the value
                        ],
                        data: [
                            [1, 'PERSEDIAAN'],
                            [2, 'NON PERSEDIAAN'],
                            [0, 'INVENTARIS']
                        ]
                    }),
                    listeners: {
                        select: function() {
                            var gol = grid.down('#soBarangGol');
                            gol.reset();
                            gol.getStore().clearFilter(true);
                            gol.getStore().filter('mi_inv_stat', this.getValue());
                        }
                    }
                },
                {
                    xtype: 'combobox',
                    width: 150,
                    minChars: 2,
                    triggerAction: 'all',
                    itemId: 'soBarangGol',
                    store: 'gdlsstockop.GolonganStore',
                    emptyText: 'Golongan',
                    displayField: 'mi_name',
                    valueField: 'id',
                    queryMode: 'remote',
                    matchFieldWidth: false,
                    hidden: false,
                    listConfig: {
                        minWidth: 185
                    }
                },
                {
                    xtype: 'textfield',
                    itemId: 'soBarangQuery',
                    emptyText: 'Query'
                },
                {
                    text: 'SEARCH',
                    itemId: 'barangSearch',
                    ui: 'orange-button'
                },
                '->',
                {
                    text: 'REFRESH',
                    itemId: 'barangSearch',
                    ui: 'orange-button'
                },
                {
                    text: 'ALL',
                    itemId: 'barangSearch',
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