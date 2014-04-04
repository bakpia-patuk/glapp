/**
 * @author Isht Ae
 **/
Ext.define('GlApp.view.gdtxfaktur.TxBgFakturGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.gdtxfaktur.txbgfakturgrid',
    itemId: 'txbgfakturgrid',
    border: false,
    store: 'gdtxfaktur.FakturStore',
    autoScroll: true,
    forceFit: false,
    columnLines: true,
    selModel: Ext.create('Ext.ux.selection.CheckboxModel', {
        header: false
    }),
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            viewConfig: {
                autoScroll: true,
                emptyText: 'Tidak ada data Terima Barang',
                deferEmptyText: false
            },
            tbar: [
                {
                    xtype: 'combobox',
                    fieldLabel: 'Filter ',
                    labelWidth: 40,
                    width: 200,
                    labelAlign: 'right',
                    emptyText: 'Nama Supplier',
                    displayField: 'type',
                    valueField: 'typeCode',
                    queryMode: 'local',
                    forceSelection: true,
                    typeAhead: true,
                    valueNotFoundText: 'Tidak ada Data'
                },
                {
                    text: 'SEARCH'
                },
                '->',
                {
                    text: 'REFRESH'
                }
            ],
            features: [
                {
                    startCollapsed: false,
                    id: 'tbTfBgGroup',
                    ftype: 'grouping',
                    groupHeaderTpl: 'Nama Supplier : {name}',
                    hideGroupedHeader: false,
                    //remoteRoot: 'summaryData',
                    enableGroupingMenu: true
                }
            ],
            columns: [
                {
                    xtype: 'gridcolumn',
                    flex: 0.7,
                    text: 'NO FAKTUR',
                    dataIndex: 'fktNo'
                },
                {
                    xtype: 'numbercolumn',
                    flex: 0.3,
                    align: 'right',
                    text: 'NOMINAL',
                    dataIndex: 'fktTotal'
                }
            ]
        });

        me.callParent(arguments);
    }
});
/* End of file reservasiGrid.js */
/* Location: ./assets/js/app/view/reservasi/reservasiGrid.js */