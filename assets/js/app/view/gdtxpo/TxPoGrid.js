/**
 * @author Isht Ae
 **/
Ext.define('GlApp.view.gdtxpo.TxPoGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.gdtxpo.txpogrid',
    itemId: 'txpogrid',
    border: false,
//    store: 'ItemStore',
    autoScroll: true,
    forceFit: false,
    columnLines: true,
    selModel: Ext.create('Ext.selection.CheckboxModel', {
    }),

    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            viewConfig: {
                autoScroll: true,
                emptyText: 'Tidak ada data Pengadaan',
                deferEmptyText: false
            },
            tbar: [
                {
                    xtype: 'datefield',
                    fieldLabel: 'Filter ',
                    labelWidth: 40,
                    labelAlign: 'right',
                    emptyText: 'Tgl. Awal',
                    displayField: 'type',
                    valueField: 'typeCode',
                    queryMode: 'local',
                    forceSelection: true,
                    typeAhead: true,
                    valueNotFoundText: 'Tidak ada Data'
                },
                {
                    xtype: 'datefield',
                    fieldLabel: ' s.d ',
                    labelWidth: 30,
                    labelAlign: 'right',
                    emptyText: 'Tgl. Akhir',
                    displayField: 'type',
                    valueField: 'typeCode',
                    queryMode: 'local',
                    forceSelection: true,
                    typeAhead: true,
                    valueNotFoundText: 'Tidak ada Data'
                },
                {
                    xtype: 'combobox',
                    emptyText: 'Cabang',
                    allowBlank: false
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
                    id: 'poPengGroup',
                    ftype: 'grouping',
                    groupHeaderTpl: 'No Pengadaan : {name}',
                    hideGroupedHeader: false,
                    //remoteRoot: 'summaryData',
                    enableGroupingMenu: true
                }
            ],
            columns: [
                {
                    xtype: 'gridcolumn',
                    width: 200,
                    text: 'NAMA BARANG',
                    dataIndex: 'namams'
                },
                {
                    xtype: 'gridcolumn',
                    width: 150,
                    text: 'MERK',
                    dataIndex: 'alamatms'
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    text: 'NO KATALOG',
                    dataIndex: 'namakotams'
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    text: 'QTY',
                    dataIndex: 'tlpms'
                },
                {
                    xtype: 'gridcolumn',
                    width: 150,
                    text: 'HARGA',
                    dataIndex: 'tlpms'
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    text: 'DISC (%)',
                    dataIndex: 'tlpms'
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    text: 'PPN (%)',
                    dataIndex: 'tlpms'
                },
                {
                    xtype: 'gridcolumn',
                    width: 150,
                    text: 'NETTO',
                    dataIndex: 'tlpms'
                },
                {
                    xtype: 'gridcolumn',
                    width: 200,
                    text: 'KETERANGAN',
                    dataIndex: 'tlpms'
                }
            ]
        });

        me.callParent(arguments);
    }
});
/* End of file reservasiGrid.js */
/* Location: ./assets/js/app/view/reservasi/reservasiGrid.js */