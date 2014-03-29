/**
 * @author Isht Ae
 **/
Ext.define('GlApp.view.ksmintakas.KsMintaKasGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.ksmintakas.ksmintakasgrid',
    title: 'DAFTAR PERMINTAAN KAS DIVISI',
    itemId: 'ksmintakasgrid',
    autoScroll: true,
    forceFit: true,
    ui: 'green-panel',
//    store: 'MintaBayarStore',
    columnLines: true,
//    flex: 1,
    border: false,
    selModel: Ext.create('Ext.ux.selection.CheckboxModel', {
        header: false
    }),

    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            viewConfig: {
                autoScroll: true,
                emptyText: 'Tidak ada data Permintaan',
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
                    itemId: 'dateMbFilter',
                    format: 'd/M/Y',
                    submitFormat: 'Y-m-d',
//                    listeners: {
//                        change: function () {
//                            var store = this.up('grid').getStore(),
//                                filterCollection = [],
//                                combo = this.up('grid').down('#cabangMbFilter').getValue(),
//                                combo2 = this.up('grid').down('#dateMbFilter2').getValue();;
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
//                                property: 'cabang_id',
//                                value: combo !== null ? combo : userCabang
//                            });
//                            filterCollection.push(statusFilter);
//
//                            store.clearFilter(true);
//                            store.filter(filterCollection);
//                        }
//                    }
                },
                {
                    xtype: 'datefield',
                    width: 160,
                    labelWidth: 25,
                    fieldLabel: 's.d',
                    emptyText: 'Tanggal',
                    itemId: 'dateMbFilter2',
                    format: 'd/M/Y',
                    submitFormat: 'Y-m-d',
//                    listeners: {
//                        change: function () {
//                            var store = this.up('grid').getStore(),
//                                filterCollection = [],
//                                combo = this.up('grid').down('#cabangMbFilter').getValue(),
//                                combo2 = this.up('grid').down('#dateMbFilter').getValue();
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
//                                property: 'cabang_id',
//                                value: combo !== null ? combo : userCabang
//                            });
//                            filterCollection.push(statusFilter);
//
//                            store.clearFilter(true);
//                            store.filter(filterCollection);
//                        }
//                    }
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Cabang ',
                    itemId: 'cabangMbFilter',
                    width: 220,
                    emptyText: 'Pilih',
                    labelWidth: 55,
                    displayField: 'cabangName',
                    valueField: 'id',
                    queryMode: 'remote',
                    allowBlank: true,
                    triggerAction: 'all',
//                    hidden: userCabang == 14 ? false : true,
//                    valueNotFoundText: 'Tidak ada Data',
//                    store: 'CabangStore',
//                    listeners: {
//                        select: function () {
//                            var store = this.up('grid').getStore(),
//                                filterCollection = [],
//                                combo = this.up('grid').down('#dateMbFilter').getValue(),
//                                combo2 = this.up('grid').down('#dateMbFilter2').getValue();
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
//                                property: 'cabang_id',
//                                value: this.getValue()
//                            });
//                            filterCollection.push(statusFilter);
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
                    tooltip: 'Hapus',
                    iconCls: 'icon-btn-delete',
//                    action: 'mbDelete'
                },
                '-',
                {
                    xtype: 'button',
                    ui: 'blue-button',
                    tooltip: 'Approval',
                    iconCls: 'icon-btn-accept',
//                    action: 'mbApproval'
                },
                '-',
                {
                    xtype: 'button',
                    ui: 'blue-button',
                    tooltip: 'Refresh',
                    iconCls: 'icon-btn-refresh',
//                    handler: function () {
//                        this.up('grid').getStore().load();
//                    }
                }
            ],
            columns: [
                {
                    xtype: 'datecolumn',
                    width: 100,
                    text: 'TGL. TRANS',
                    dataIndex: 'tglTrx',
                    renderer: function (value, meta, record) {
                        var status = record.get('apprStatus');
                        
                        if (status === 0) {
                            return '<span style="color:#FF0000;">' + Ext.util.Format.date(value, 'd/M/Y') + '</span>';
                        } else {
                            return Ext.util.Format.date(value, 'd/M/Y');
                        }
                    }
                },
                {
                    xtype: 'gridcolumn',
                    width: 130,
                    text: 'DIVISI',
                    dataIndex: 'divisiName',
                    renderer: function (value, meta, record) {
                        var status = record.get('apprStatus');
                        
                        if (status === 0) {
                            return '<span style="color:#FF0000;">' + value + '</span>';
                        } else {
                            return value;
                        }
                    }
                },
                {
                    xtype: 'gridcolumn',
                    hidden: false,
                    width: 300,
                    text: 'KEPERLUAN',
                    dataIndex: 'keterangan',
                    renderer: function (value, meta, record) {
                        var status = record.get('apprStatus');
                        
                        if (status === 0) {
                            return '<span style="color:#FF0000;">' + value + '</span>';
                        } else {
                            return value;
                        }
                    }
                },
                {
                    xtype: 'gridcolumn',
                    width: 60,
                    text: 'APPR.',
                    dataIndex: 'apprStatus',
                    align: 'center',
                    renderer: function (value) {
                        var returnValue = "";

                        if (value === 0) {
                            returnValue = '<span style="color:#FF0000;">T</span>';
                        } else {
                            returnValue = "Y";
                        }

                        return returnValue;
                    }
                }
            ]
        });

        me.callParent(arguments);
    }
});
/* End of file reservasiGrid.js */
/* Location: ./assets/js/app/view/reservasi/reservasiGrid.js */