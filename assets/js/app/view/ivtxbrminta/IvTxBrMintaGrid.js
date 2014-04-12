/**
 * @author Isht Ae
 **/
Ext.define('GlApp.view.ivtxbrminta.IvTxBrMintaGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.ivtxbrminta.ivtxbrmintagrid',
    itemId: 'ivtxbrmintagrid',
    autoScroll: true,
    forceFit: true,
    store: 'ivtxbrminta.IvTxBrMintaStore',
    columnLines: true,
    flex: 1,
    border: false,
//    selModel: Ext.create('Ext.selection.CheckboxModel', {
//    }),

    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            viewConfig: {
                autoScroll: true,
                emptyText: 'Tidak ada data Permintaan barang',
                deferEmptyText: false
            },
            tbar: [
                {
                    xtype: 'tbtext',
                    text: '<strong>Filter :</strong>'
                },
                {
                    xtype: 'datefield',
                    width: 130,
                    fieldLabel: 'Tanggal',
                    emptyText: 'Tanggal',
                    hideLabel: true,
                    itemId: 'dateMbInvFilter',
                    format: 'd/M/Y',
                    submitFormat: 'Y-m-d',
                },
                {
                    xtype: 'datefield',
                    width: 160,
                    labelWidth: 22,
                    margins: '0 0 0 5',
                    fieldLabel: 's.d ',
                    emptyText: 'Tanggal',
                    itemId: 'dateMbInvFilter2',
                    format: 'd/M/Y',
                    submitFormat: 'Y-m-d',
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Cabang ',
                    itemId: 'cabangMbInvFilter',
                    width: 220,
                    margins: '0 0 0 5',
                    emptyText: 'Pilih',
                    labelWidth: 50,
                    displayField: 'cabang_alias',
                    valueField: 'id',
                    queryMode: 'remote',
                    allowBlank: true,
                    triggerAction: 'all',
//                    hidden: CABANG_ID == 1 ? false : true,
                    valueNotFoundText: 'Tidak ada Data',
                    store: 'ivtxbrminta.CabangStore',
                    listeners: {
                        afterrender: function() {
                            this.setValue(parseInt(CABANG_ID));
                        },
                    }
                },
                {
                    tooltip: 'Search',
                    ui: 'blue-button',
                    iconCls: 'icon-btn-appr',
                    itemId: 'TxBrMintaSearch',
                    text: 'Search'
                },
                '->',
                {
                    tooltip: 'Approval Permintaan',
                    ui: 'blue-button',
                    iconCls: 'icon-btn-appr',
                    itemId: 'TxBrMintaApp',
                    text: 'Approval'
                },
                {
                    ui: 'blue-button',
                    text: 'Refresh',
                    iconCls: 'icon-btn-refresh',
                    handler: function() {
                        this.up('grid').getSelectionModel().clearSelections();
                        this.up('grid').getStore().load();
                    }
                }
            ],
//            features: [
//                {
//                    startCollapsed: true,
//                    id: 'kmSummary',
//                    ftype: 'groupingsummary',
//                    groupHeaderTpl: 'Mata Uang {name}',
//                    hideGroupedHeader: false,
//                    //remoteRoot: 'summaryData',
//                    enableGroupingMenu: true
//                }
//            ],
            columns: [
                Ext.create('Ext.grid.RowNumberer'),
                {
                    xtype: 'gridcolumn',
                    flex: 0.3,
                    text: 'TGL. PERMINTAAN',
                    dataIndex: 'tgl_trx',
                    renderer: function (value, meta, record) {
                        return Ext.util.Format.date(value, 'd/M/Y');
                    }
                },
                {
                    xtype: 'gridcolumn',
                    flex: 0.4,
                    text: 'DIVISI TUJUAN',
                    dataIndex: 'divTujuanName',
                    renderer: Ext.util.Format.uppercase
                },
                {
                    xtype: 'gridcolumn',
                    text: 'RUANGAN',
                    flex: 0.4,
                    dataIndex: 'divRuangName',
                    renderer: Ext.util.Format.uppercase
                }
            ]
        });

        me.callParent(arguments);
    }
});
/* End of file reservasiGrid.js */
/* Location: ./assets/js/app/view/reservasi/reservasiGrid.js */