/**
 * @author Isht Ae
 **/
Ext.define('GlApp.view.ivtxbrterima.IvTxBrTerimaGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.ivtxbrterima.ivtxbrterimagrid',
    itemId: 'ivtxbrterimagrid',
    autoScroll: true,
    forceFit: true,
//    store: 'PenginvStore',
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
                emptyText: 'Tidak ada data Kiriman barang',
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
                    itemId: 'dateBmInvFilter',
                    format: 'd/M/Y',
                    submitFormat: 'Y-m-d',
//                    listeners: {
//                        change: function () {
//                            this.up('grid').getSelectionModel().clearSelections();
//                            var store = this.up('grid').getStore(),
//                                filterCollection = [],
//                                combo = this.up('grid').down('#divisiBmInvFilter').getValue(),
//                                combo2 = this.up('grid').down('#dateBmInvFilter2').getValue();;
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
//                            var filter2 = new Ext.util.Filter({
//                                property: 'penginv_cabang',
//                                value: userCabang
//                            });
//                            filterCollection.push(filter2);
//
//                            var filter2 = new Ext.util.Filter({
//                                property: 'penginv_divisi',
//                                value: combo === null ? userDivisi  : combo
//                            });
//                            filterCollection.push(filter2);
//
//                            var statusFilter2 = new Ext.util.Filter({
//                                property: 'kirim_status',
//                                value: '1'
//                            });
//                            filterCollection.push(statusFilter2);
//
//                            var statusFilter2 = new Ext.util.Filter({
//                                property: 'terima_status',
//                                value: '1NE'
//                            });
//                            filterCollection.push(statusFilter2);
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
                    itemId: 'dateBmInvFilter2',
                    format: 'd/M/Y',
                    submitFormat: 'Y-m-d',
//                    listeners: {
//                        change: function () {
//                            this.up('grid').getSelectionModel().clearSelections();
//                            var store = this.up('grid').getStore(),
//                                filterCollection = [],
//                                combo = this.up('grid').down('#divisiBmInvFilter').getValue(),
//                                combo2 = this.up('grid').down('#dateBmInvFilter').getValue();
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
//                            var filter2 = new Ext.util.Filter({
//                                property: 'penginv_cabang',
//                                value: userCabang
//                            });
//                            filterCollection.push(filter2);
//
//                            var filter2 = new Ext.util.Filter({
//                                property: 'penginv_divisi',
//                                value: combo === null ? userDivisi  : combo
//                            });
//                            filterCollection.push(filter2);
//
//                            var statusFilter2 = new Ext.util.Filter({
//                                property: 'kirim_status',
//                                value: '1'
//                            });
//                            filterCollection.push(statusFilter2);
//
//                            var statusFilter2 = new Ext.util.Filter({
//                                property: 'terima_status',
//                                value: '1NE'
//                            });
//                            filterCollection.push(statusFilter2);
//
//                            store.clearFilter(true);
//                            store.filter(filterCollection);
//                        }
//                    }
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Cabang ',
                    itemId: 'divisiBmInvFilter',
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
//                        select: function () {
//                            this.up('grid').getSelectionModel().clearSelections();
//                            var store = this.up('grid').getStore(),
//                                filterCollection = [],
//                                combo = this.up('grid').down('#datePengDivFilter').getValue(),
//                                combo2 = this.up('grid').down('#datePengDivFilter2').getValue();
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
//                            if(this.getValue() != 14){
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
                    xtype: 'button',
                    iconCls: 'icon-btn-refresh',
//                    handler: function() {
//                        this.up('grid').getSelectionModel().clearSelections();
//                        this.up('grid').getStore().load();
//                    }
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
                    dataIndex: 'tglTransaksi',
                    renderer: function (value, meta, record) {
                        return Ext.util.Format.date(value, 'd/M/Y');
                    }
                },
                {
                    xtype: 'gridcolumn',
                    flex: 0.4,
                    text: 'DIVISI PENGIRIM',
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