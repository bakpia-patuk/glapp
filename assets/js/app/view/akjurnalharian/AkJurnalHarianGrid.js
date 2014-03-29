/**
 * @author Isht Ae
 **/
Ext.define('GlApp.view.akjurnalharian.AkJurnalHarianGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.akjurnalharian.akjurnalhariangrid',
    title: 'DAFTAR JURNAL',
    itemId: 'akjurnalhariangrid',
    autoScroll: true,
    forceFit: false,
    ui: 'red-panel',
//    store: 'JurnalHarianStore',
    columnLines: true,
    stripeRows: true,
    flex: 1,
    border: false,
    plugins: 'bufferedrenderer',
    selModel: Ext.create('Ext.selection.CheckboxModel', {
    }),

    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            viewConfig: {
                autoScroll: true,
                emptyText: 'Tidak ada data Jurnal',
                deferEmptyText: false
            },
            features: [
                {
                    collapsible: false,
                    id: 'jhAkun',
                    ftype: 'groupingsummary',
                    groupHeaderTpl: 'Data Jurnal',
                    hideGroupedHeader: true,
                    //remoteRoot: 'summaryData',
                    enableGroupingMenu: true
                }
            ],
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
                    itemId: 'dateJmFilter',
                    format: 'd/M/Y',
                    submitFormat: 'Y-m-d',
//                    listeners: {
//                        change: function () {
//                            var store = this.up('grid').getStore(),
//                                filterCollection = [],
//                                combo = this.up('grid').down('#cabangJmFilter').getValue(),
//                                combo2 = this.up('grid').down('#dateJmFilter2').getValue();;
//
//                            var statusFilter = new Ext.util.Filter({
//                                property: 'tgl_trx',
//                                value: Ext.Date.format(this.getValue(), 'Y-m-d 00:00:00') + 'GT'
//                            });
//                            filterCollection.push(statusFilter);
//
//                            if(combo2 !== null) {
//                                var statusFilter = new Ext.util.Filter({
//                                    property: 'tgl_trx',
//                                    value: Ext.Date.format(combo2, 'Y-m-d 23:59:59') + 'LT'
//                                });
//                                filterCollection.push(statusFilter);
//                            }
//
//                            var statusFilter = new Ext.util.Filter({
//                                property: 'cabang',
//                                value: combo !== null ? combo : userCabang
//                            });
//                            filterCollection.push(statusFilter);
//
//                            var filter2 = new Ext.util.Filter({
//                                property: 'jurnal_type',
//                                value: 0
//                            });
//                            filterCollection.push(filter2);
//
//                            store.clearFilter(true);
//                            store.filter(filterCollection);
//                        }
//                    }
                },
                {
                    xtype: 'datefield',
                    margins: '0 0 0 10',
                    width: 160,
                    labelWidth: 20,
                    fieldLabel: 's.d',
                    emptyText: 'Tanggal',
                    itemId: 'dateJmFilter2',
                    format: 'd/M/Y',
                    submitFormat: 'Y-m-d',
//                    listeners: {
//                        change: function () {
//                            var store = this.up('grid').getStore(),
//                                filterCollection = [],
//                                combo = this.up('grid').down('#cabangJmFilter').getValue(),
//                                combo2 = this.up('grid').down('#dateJmFilter').getValue();
//
//                            if(combo2 !== null) {
//                                var statusFilter = new Ext.util.Filter({
//                                    property: 'tgl_trx',
//                                    value: Ext.Date.format(combo2, 'Y-m-d 00:00:00') + 'GT'
//                                });
//                                filterCollection.push(statusFilter);
//                            }
//
//                            var statusFilter = new Ext.util.Filter({
//                                property: 'tgl_trx',
//                                value: Ext.Date.format(this.getValue(), 'Y-m-d 23:59:59') + 'LT'
//                            });
//                            filterCollection.push(statusFilter);
//
//                            var statusFilter = new Ext.util.Filter({
//                                property: 'cabang',
//                                value: combo !== null ? combo : userCabang
//                            });
//                            filterCollection.push(statusFilter);
//
//                            var filter2 = new Ext.util.Filter({
//                                property: 'jurnal_type',
//                                value: 0
//                            });
//                            filterCollection.push(filter2);
//
//                            store.clearFilter(true);
//                            store.filter(filterCollection);
//                        }
//                    }
                },
                {
                    xtype: 'combobox',
                    margins: '0 0 0 10',
                    fieldLabel: 'Cabang ',
                    itemId: 'cabangJmFilter',
                    width: 220,
                    emptyText: 'Pilih',
                    labelWidth: 50,
                    displayField: 'cabangName',
                    valueField: 'id',
                    queryMode: 'remote',
                    allowBlank: true,
                    triggerAction: 'all',
//                    hidden: userCabang === '14' ? false : true,
//                    valueNotFoundText: 'Tidak ada Data',
//                    store: 'CabangStore',
//                    listeners: {
//                        select: function () {
//                            var store = this.up('grid').getStore(),
//                                filterCollection = [],
//                                combo = this.up('grid').down('#dateJmFilter').getValue(),
//                                combo2 = this.up('grid').down('#dateJmFilter2').getValue();
//
//                            if(combo !== null) {
//                                var statusFilter = new Ext.util.Filter({
//                                    property: 'tgl_trx',
//                                    value: Ext.Date.format(combo, 'Y-m-d 00:00:00') + 'GT'
//                                });
//                                filterCollection.push(statusFilter);
//                            }
//
//                            if(combo2 !== null) {
//                                var statusFilter = new Ext.util.Filter({
//                                    property: 'tgl_trx',
//                                    value: Ext.Date.format(combo2, 'Y-m-d 23:59:59') + 'LT'
//                                });
//                                filterCollection.push(statusFilter);
//                            }
//
//                            var statusFilter = new Ext.util.Filter({
//                                property: 'cabang',
//                                value: this.getValue()
//                            });
//                            filterCollection.push(statusFilter);
//
//                            var filter2 = new Ext.util.Filter({
//                                property: 'jurnal_type',
//                                value: 0
//                            });
//                            filterCollection.push(filter2);
//
//                            store.clearFilter(true);
//                            store.filter(filterCollection);
//                        }
//                    }
                },
                '->',
                {
                    xtype: 'button',
                    ui: 'blue-button',
                    text: 'Jrn. Balik',
//                    iconCls: 'icon-btn-check',
//                    action: 'jmPembalik'
                },
                {
                    xtype: 'button',
                    ui: 'blue-button',
                    tooltip: 'Otorisasi Jurnal',
                    iconCls: 'icon-btn-check',
//                    action: 'jmSync'
                },
                {
                    xtype: 'button',
                    ui: 'blue-button',
                    tooltip: 'Refresh Data',
                    iconCls: 'icon-btn-refresh',
//                    action: 'jmRefresh'
                },
                {
                    xtype: 'button',
                    ui: 'blue-button',
                    tooltip: 'Clear Filter',
                    iconCls: 'icon-btn-clear',
//                    action: 'jmToday'
                }
            ],
            columns: [
                Ext.create('Ext.grid.RowNumberer',{width: 35}),
                {
                    xtype: 'datecolumn',
                    width: 100,
                    text: 'TGL. JURNAL',
                    dataIndex: 'tglJurnal',
                    renderer: function (value, meta, record) {
                        var status = record.get('apprStat');
                        if (status !== false) {
                            return Ext.util.Format.date(value, 'd/M/Y');
                        } else {
                            return '<span style="color:red;">' + Ext.util.Format.date(value, 'd/M/Y') + '</span>';
                        }
                    }
                },
                {
                    xtype: 'gridcolumn',
                    width: 275,
                    hidden: false,
                    text: 'URAIAN',
                    dataIndex: 'keterangan',
                    renderer: function (value, meta, record) {
                        var status = record.get('apprStat');
                        if (status !== false) {
                            return '<span style="text-transform:uppercase;">' + value + '</span>';
                        } else {
                            return '<span style="color:red;text-transform:uppercase;">' + value + '</span>';
                        }
                    }
                },
                {
                    xtype: 'gridcolumn',
                    width: 110,
                    text: 'KODE AKUN',
                    dataIndex: 'codeAkun',
                    renderer: function (value, meta, record) {
                        var status = record.get('apprStat');
                        if (status !== false) {
                            return value;
                        } else {
                            return '<span style="color:red;">' + value + '</span>';
                        }
                    }
                },
                {
                    xtype: 'gridcolumn',
                    width: 275,
                    text: 'AKUN',
                    dataIndex: 'namaAkun',
                    renderer: function (value, meta, record) {
                        var status = record.get('apprStat');
                        if (status !== false) {
                            return value;
                        } else {
                            return '<span style="color:red;text-transform:uppercase">' + value + '</span>';
                        }
                    },
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
                        if (value === 0) {
                            return '<span style="font-weight:bold;font-size:12px;"> Selisih : ' + Ext.util.Format.number(value, '0.000,00/i') + '</span>';
                        } else {
                            return '<span style="font-weight:bold;color:red;font-size:12px;"> Selisih : <i>( ' + Ext.util.Format.number(Math.abs(value), '0.000,00/i') + ' )</i></span>';
                        }
                        return value;
                    }
                },
                {
                    xtype: 'numbercolumn',
                    width: 100,
                    header: 'DEBET',
                    dataIndex: 'debet',
                    align: 'right',
                    summaryType: 'sum',
                    renderer: function (value, meta, record) {
                        var status = record.get('apprStat');
                        if (status !== false) {
                            return Ext.util.Format.number(value, '0.000,00/i');
                        } else {
                            return '<span style="color:red;">' + Ext.util.Format.number(value, '0.000,00/i') + '</span>';
                        }
                    },
                    summaryRenderer: function (value, summaryData, dataIndex) {
                        return '<span style="font-weight:bold;font-size:12px;">' + Ext.util.Format.number(value, '0.000,00/i') + '</span>';
                    }
                },
                {
                    xtype: 'numbercolumn',
                    width: 100,
                    header: 'KREDIT',
                    dataIndex: 'kredit',
                    align: 'right',
                    summaryType: 'sum',
                    renderer: function (value, meta, record) {
                        var status = record.get('apprStat');
                        if (status !== false) {
                            return Ext.util.Format.number(value, '0.000,00/i');
                        } else {
                            return '<span style="color:red;">' + Ext.util.Format.number(value, '0.000,00/i') + '</span>';
                        }
                    },
                    summaryRenderer: function (value, summaryData, dataIndex) {
                        return '<span style="font-weight:bold;font-size:12px;">' + Ext.util.Format.number(value, '0.000,00/i') + '</span>';
                    }
                }
            ]
        });

        me.callParent(arguments);
    }
});
/* End of file reservasiGrid.js */
/* Location: ./assets/js/app/view/reservasi/reservasiGrid.js */