/**
 * @author Isht Ae
 **/
Ext.define('GlApp.view.akjurnalumum.AkJurnalUmumGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.akjurnalumum.akjurnalumumgrid',
    itemId: 'akjurnalumumgrid',
    autoScroll: true,
    forceFit: true,
    ui: 'blue-panel',
    title: 'DAFTAR JURNAL UMUM',
    store: 'akjurnalumum.JurnalAllStore',
    columnLines: true,
    flex: 1,
    border: false,

    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            viewConfig: {
                autoScroll: true,
                emptyText: 'Tidak ada data Jurnal Umum',
                deferEmptyText: false,
                loadMask: true
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
                    itemId: 'dateJuFilter',
                    format: 'd/M/Y',
                    submitFormat: 'Y-m-d',
                },
                {
                    xtype: 'datefield',
                    margins: '0 0 0 10',
                    width: 160,
                    labelWidth: 20,
                    fieldLabel: 's.d',
                    emptyText: 'Tanggal',
                    itemId: 'dateJuFilter2',
                    format: 'd/M/Y',
                    submitFormat: 'Y-m-d',
                },
                {
                    xtype: 'combobox',
                    margins: '0 0 0 10',
                    fieldLabel: 'Cabang ',
                    itemId: 'cabangJuFilter',
                    width: 220,
                    emptyText: 'Pilih',
                    labelWidth: 50,
                    displayField: 'cabang_alias',
                    valueField: 'id',
                    queryMode: 'remote',
                    allowBlank: true,
                    triggerAction: 'all',
//                    hidden: userCabang == 14 ? false : true,
                    valueNotFoundText: 'Tidak ada Data',
                    store: 'akjurnalumum.CabangStore',
                },
                {
                    xtype: 'button',
                    iconCls: 'icon-btn-search',
                    ui: 'blue-button',
                    text: 'Search',
                    itemId: 'JurnalUmumSearch'
                },
                '->',
//                {
//                    xtype: 'button',
//                    iconCls: 'icon-btn-print',
//                    action: 'juPrint'
//                },
                {
                    xtype: 'button',
                    text: 'Refresh',
                    iconCls: 'icon-btn-refresh',
                    ui: 'blue-button',
                    itemId: 'JurnalUmumRefresh'
                },
                {
                    xtype: 'button',
                    iconCls: 'icon-btn-clear',
                    ui: 'blue-button',
                    text: 'Clear',
                    itemId: 'JurnalUmumClear'
                },
                {
                    xtype: 'button',
                    text: 'All',
                    ui: 'blue-button',
                    iconCls: 'icon-filter',
//                    hidden: userCabang == 1 ? false : true,
                    action: 'JurnalUmumAll'
                }
            ],
            features: [
                {
                    //startCollapsed: true,
                    collapsible: false,
                    id: 'juGridSum',
                    ftype: 'groupingsummary',
                    groupHeaderTpl: 'Jurnal Umum',
                    hideGroupedHeader: true,
                    //remoteRoot: 'summaryData',
                    enableGroupingMenu: true
                }
            ],
            columns: [
                Ext.create('Ext.grid.RowNumberer'),
                {
                    xtype: 'datecolumn',
                    flex: 0.1,
                    text: 'TGL. JURNAL',
                    dataIndex: 'tglJurnal',
                    renderer: Ext.util.Format.dateRenderer('d-M-Y')
                },
                {
                    xtype: 'gridcolumn',
                    flex: 0.1,
                    text: 'NO. REF.',
                    dataIndex: 'no_ref_trx'
                },
                {
                    xtype: 'gridcolumn',
                    flex: 0.3,
                    text: 'URAIAN',
                    dataIndex: 'uraian',
                    cellCls: 'valign-top',
                    renderer: 'uppercase'
                },
                {
                    xtype: 'gridcolumn',
                    flex: 0.1,
                    text: 'KODE AKUN',
                    dataIndex: 'codeAkun',
                    cellCls: 'valign-top',
                    renderer: 'uppercase'
                },
                {
                    xtype: 'gridcolumn',
                    flex: 0.2,
                    text: 'AKUN',
                    dataIndex: 'namaAkun',
                    summaryType: function (records) {
                        var i = 0,
                            length = records.length,
                            kredit = 0,
                            debet = 0,
                            selisih = 0,
                            record;

                        for (; i < length; ++i) {
                            record = records[i];
                            debet += record.get('debet');
                            kredit += record.get('kredit');
                        }

                        selisih = debet - kredit;
                        return selisih;
                    },
                    summaryRenderer: function (value, summaryData, dataIndex) {
                        if (value == 0) {
                            return '<span style="font-weight:bold;font-size:12px;"> Selisih : ' + Ext.util.Format.number(value, '0.000,00/i') + '</span>';
                        } else {
                            return '<span style="font-weight:bold;color:red;font-size:12px;"> Selisih : <i>( ' + Ext.util.Format.number(Math.abs(value), '0.000,00/i') + ' )</i></span>';
                        }
                        return value;
                    },
                    cellCls: 'valign-top'
                },
                {
                    xtype: 'numbercolumn',
                    flex: 0.1,
                    header: 'DEBET',
                    dataIndex: 'debet',
                    renderer: function (value, meta, record) {
                        return Ext.util.Format.number(value, '0.000,00/i');
                    },
                    align: 'right',
                    summaryType: 'sum',
                    renderer: function (value, meta, record) {
                        var status = record.get('status');
                        if (status != 0) {
                            return Ext.util.Format.number(value, '0.000,00/i');
                        } else {
                            return '<span style="color:red;">' + Ext.util.Format.number(value, '0.000,00/i') + '</span>';
                        }
                    },
                    summaryRenderer: function (value, summaryData, dataIndex) {
                        return '<span style="font-weight:bold;font-size:12px;">' + Ext.util.Format.number(value, '0.000,00/i') + '</span>';
                    },
                    cellCls: 'valign-top'
                },
                {
                    xtype: 'numbercolumn',
                    flex: 0.1,
                    header: 'KREDIT',
                    dataIndex: 'kredit',
                    renderer: function (value, meta, record) {
                        return Ext.util.Format.number(value, '0.000,00/i');
                    },
                    align: 'right',
                    summaryType: 'sum',
                    renderer: function (value, meta, record) {
                        var status = record.get('status');
                        if (status != 0) {
                            return Ext.util.Format.number(value, '0.000,00/i');
                        } else {
                            return '<span style="color:red;">' + Ext.util.Format.number(value, '0.000,00/i') + '</span>';
                        }
                    },
                    summaryRenderer: function (value, summaryData, dataIndex) {
                        return '<span style="font-weight:bold;font-size:12px;">' + Ext.util.Format.number(value, '0.000,00/i') + '</span>';
                    },
                    cellCls: 'valign-top'
                },
                {
                    xtype: 'gridcolumn',
                    flex: 0.1,
                    hidden: true,
                    text: 'CABANG',
                    dataIndex: 'cabangName',
                    renderer: 'uppercase',
                    cellCls: 'valign-top'
                }
            ]
        });

        me.callParent(arguments);
    },
    listeners: {
        afterRender: function () {
            //var store = Ext.StoreMgr.lookup('KasMasukStore').load();
        }
    }
});
/* End of file reservasiGrid.js */
/* Location: ./assets/js/app/view/reservasi/reservasiGrid.js */