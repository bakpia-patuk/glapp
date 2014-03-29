/**
 * @author Isht Ae
 **/
Ext.define('GlApp.view.dvtxbrminta.DvTxBrMintaGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.dvtxbrminta.dvtxbrmintagrid',
    itemId: 'dvtxbrmintagrid',
    autoScroll: true,
    forceFit: true,
//    store: 'PengdivStore',
    columnLines: true,
    flex: 1,
    border: false,

    initComponent: function() {
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
                    itemId: 'dateMbDivFilter',
                    format: 'd/M/Y',
                    submitFormat: 'Y-m-d',
//                    listeners: {
//                        afterrender: function() {
//                            this.setValue(new Date());
//                        },
//                        change: function() {
//                            this.up('grid').getSelectionModel().clearSelections();
//                            var store = this.up('grid').getStore(),
//                                    filterCollection = [],
//                                    combo = this.up('grid').down('#divisiMbDivFilter').getValue(),
//                                    combo2 = this.up('grid').down('#dateMbDivFilter2').getValue();
//                            ;
//
//                            var statusFilter = new Ext.util.Filter({
//                                property: 'tgl_trx',
//                                value: Ext.Date.format(this.getValue(), 'Y-m-d 00:00:00') + 'GT'
//                            });
//                            filterCollection.push(statusFilter);
//
//                            if (combo2 !== null) {
//                                var statusFilter = new Ext.util.Filter({
//                                    property: 'tgl_trx',
//                                    value: Ext.Date.format(combo2, 'Y-m-d 23:59:59') + 'LT'
//                                });
//                                filterCollection.push(statusFilter);
//                            }
//
//                            var filter2 = new Ext.util.Filter({
//                                property: 'pengdiv_cabang',
//                                value: userCabang
//                            });
//                            filterCollection.push(filter2);
//
//                            var filter2 = new Ext.util.Filter({
//                                property: 'pengdiv_divisi',
//                                value: combo === null ? userDivisi : combo
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
                    width: 160,
                    labelWidth: 22,
                    margins: '0 0 0 5',
                    fieldLabel: 's.d ',
                    emptyText: 'Tanggal',
                    itemId: 'dateMbDivFilter2',
                    format: 'd/M/Y',
                    submitFormat: 'Y-m-d',
//                    listeners: {
//                        afterrender: function() {
//                            this.setValue(new Date());
//                        },
//                        change: function() {
//                            this.up('grid').getSelectionModel().clearSelections();
//                            var store = this.up('grid').getStore(),
//                                    filterCollection = [],
//                                    combo = this.up('grid').down('#divisiMbDivFilter').getValue(),
//                                    combo2 = this.up('grid').down('#dateMbDivFilter').getValue();
//
//                            if (combo2 !== null) {
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
//                            var filter2 = new Ext.util.Filter({
//                                property: 'pengdiv_cabang',
//                                value: userCabang
//                            });
//                            filterCollection.push(filter2);
//
//                            var filter2 = new Ext.util.Filter({
//                                property: 'pengdiv_divisi',
//                                value: combo === null ? userDivisi : combo
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
                    fieldLabel: 'Cabang ',
                    itemId: 'divisiMbDivFilter',
                    width: 220,
                    margins: '0 0 0 5',
                    emptyText: 'Pilih',
                    labelWidth: 50,
                    displayField: 'cabangName',
                    valueField: 'id',
                    queryMode: 'remote',
                    allowBlank: true,
                    triggerAction: 'all',
                    hidden: true, //userCabang == 14 ? false : true,
                    valueNotFoundText: 'Tidak ada Data',
//                    store: 'CabangStore',
//                    listeners: {
//                        select: function() {
//                            var store = this.up('grid').getStore(),
//                                    filterCollection = [],
//                                    combo = this.up('grid').down('#datePengDivFilter').getValue(),
//                                    combo2 = this.up('grid').down('#datePengDivFilter2').getValue();
//
//                            var statusFilter = new Ext.util.Filter({
//                                property: 'cabang_id',
//                                value: this.getValue()
//                            });
//                            filterCollection.push(statusFilter);
//
//                            var filter2 = new Ext.util.Filter({
//                                property: 'divisi',
//                                value: '0NE'
//                            });
//                            filterCollection.push(filter2);
//
//                            if (combo !== null) {
//                                var statusFilter = new Ext.util.Filter({
//                                    property: 'tgl_trx',
//                                    value: Ext.Date.format(combo, 'Y-m-d 00:00:00') + 'GT'
//                                });
//                                filterCollection.push(statusFilter);
//                            }
//
//                            if (combo2 !== null) {
//                                var statusFilter = new Ext.util.Filter({
//                                    property: 'tgl_trx',
//                                    value: Ext.Date.format(combo2, 'Y-m-d 23:59:59') + 'LT'
//                                });
//                                filterCollection.push(statusFilter);
//                            }
//
//                            if (this.getValue() !== 14) {
//                                var statusFilter = new Ext.util.Filter({
//                                    property: 'peng_statusdiv',
//                                    value: 1
//                                });
//                                filterCollection.push(statusFilter);
//                            }
//
//                            store.clearFilter(true);
//                            store.filter(filterCollection);
//                        }
//                    }
                },
                '->',
                {
                    tooltip: 'Approval Permintaan',
                    ui: 'blue-button',
                    iconCls: 'icon-btn-appr',
//                    action: 'apprDivMb',
                    id: 'apprDivMb'
                },
                '-',
                {
                    xtype: 'button',
                    ui: 'blue-button',
                    iconCls: 'icon-btn-refresh',
//                    handler: function() {
//                        this.up('grid').getSelectionModel().clearSelections();
//                        this.up('grid').getStore().load();
//                    }
                }
            ],
            columns: [
                Ext.create('Ext.grid.RowNumberer'),
                {
                    xtype: 'gridcolumn',
                    flex: 0.3,
                    text: 'TGL. PERMINTAAN',
                    dataIndex: 'tglTransaksi',
                    renderer: function(value, meta, record) {
                        return Ext.util.Format.date(value, 'd/M/Y');
                    }
                },
                {
                    xtype: 'gridcolumn',
                    flex: 0.3,
                    text: 'NO. PERMINTAAN',
                    dataIndex: 'pengNo',
                    renderer: Ext.util.Format.uppercase
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
                    renderer: function(value, meta, record) {
                        if (value === null) {
                            return 'Tidak ada data';
                        } else {
                            return value;
                        }
                    }
                }
            ]
        });

        me.callParent(arguments);
    }
});
/* End of file reservasiGrid.js */
/* Location: ./assets/js/app/view/reservasi/reservasiGrid.js */