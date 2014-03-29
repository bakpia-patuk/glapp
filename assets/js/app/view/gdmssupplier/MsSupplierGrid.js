/**
 * @author Isht Ae
 **/
Ext.define('GlApp.view.gdmssupplier.MsSupplierGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.gdmssupplier.mssuppliergrid',
    itemId: 'mssuppliergrid',
    border: false,
//    store: 'ItemStore',
    autoScroll: true,
    forceFit: false,
    columnLines: true,

    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            viewConfig: {
                autoScroll: true,
                emptyText: 'Tidak ada data Supplier',
                deferEmptyText: false
            },
            tbar: [
                {
                    xtype: 'combobox',
                    fieldLabel: 'Filter ',
                    labelWidth: 40,
                    labelAlign: 'right',
                    emptyText: 'Kota',
                    displayField: 'type',
                    valueField: 'typeCode',
                    queryMode: 'local',
                    forceSelection: true,
                    typeAhead: true,
                    valueNotFoundText: 'Tidak ada Data'
                },
                {
                    xtype: 'textfield',
                    emptyText: 'Ketik Nama Supp.',
                    allowBlank: false
                },
                {
                    text: 'Search'
                },
                '->',
                {
                    text: 'Refresh'
                },
                {
                    text: 'All'
                }
                
            ],
            features: [
                {
                    startCollapsed: true,
                    id: 'msGrouping',
                    ftype: 'grouping',
                    groupHeaderTpl: '{name}',
                    hideGroupedHeader: false,
                    //remoteRoot: 'summaryData',
                    enableGroupingMenu: true
                }
            ],
            columns: [
                {
                    xtype: 'gridcolumn',
                    width: 220,
                    text: 'NAMA',
                    dataIndex: 'namams'
                },
                {
                    xtype: 'gridcolumn',
                    width: 220,
                    text: 'ALAMAT',
                    dataIndex: 'alamatms'
                },
                {
                    xtype: 'gridcolumn',
                    width: 220,
                    text: 'KOTA',
                    dataIndex: 'namakotams'
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    text: 'TELEPON',
                    dataIndex: 'tlpms'
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    text: 'TELEPON (ALT)',
                    dataIndex: 'tlp2ms'
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    text: 'HP',
                    dataIndex: 'hpms'
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    text: 'FAX',
                    dataIndex: 'faxms'
                }
            ]
        });

        me.callParent(arguments);
    }
});
/* End of file reservasiGrid.js */
/* Location: ./assets/js/app/view/reservasi/reservasiGrid.js */