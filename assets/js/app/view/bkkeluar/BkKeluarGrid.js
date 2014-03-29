/**
 * @author Isht Ae
 **/
Ext.define('GlApp.view.bkkeluar.BkKeluarGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.bkkeluar.bkkeluargrid',
    itemId: 'bkkeluargrid',
    ui: 'orange-panel',
    autoScroll: true,
    title: 'DAFTAR BANK KELUAR',
    forceFit: true,
//    store: 'TrxBankStore',
    columnLines: true,
    flex: 1,
    border: false,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            viewConfig: {
                autoScroll: true,
                emptyText: 'Tidak ada data Transaksi Bank Keluar',
                deferEmptyText: false
            },
            tbar: [
                {
                    xtype: 'tbtext',
                    text: '<strong>Filter :&nbsp;&nbsp;</strong>'
                },
                {
                    xtype: 'datefield',
                    width: 100,
                    fieldLabel: 'Tgl. Awal',
                    emptyText: 'Tgl Awal',
                    hideLabel: true,
                    name: 'dateStart',
                    itemId: 'dateStartBkr',
                    format: 'd/M/Y',
                    submitFormat: 'Y-m-d',
//                    listeners: {
//                        change: function () {
//                            var store = this.up('grid').getStore(),
//                                filterCollection = [],
//                                combo = this.up('grid').down('#filterBankKeluar').getValue(),
//                                combo2 = this.up('grid').down('#dateEndBkr').getValue(),
//                                combo3 = this.up('grid').down('#cabangBkrFilter').getValue();
// 
//                            var filter2 = new Ext.util.Filter({
//                                property: 'kas_type',
//                                value: 'bankkeluar'
//                            });
//                            filterCollection.push(filter2);
//        
//                            var statusFilter = new Ext.util.Filter({
//                                property: 'kas_tgltrx',
//                                value: Ext.Date.format(this.getValue(), 'Y-m-d 00:00:00') + 'GT'
//                            });
//                            filterCollection.push(statusFilter);
//
//                            if(combo2 !== null) {
//                                var statusFilter = new Ext.util.Filter({
//                                    property: 'kas_tgltrx',
//                                    value: Ext.Date.format(combo2, 'Y-m-d 23:59:59') + 'LT'
//                                });
//                                filterCollection.push(statusFilter);
//                            }
//
//                            if(combo !== null) {
//                                var statusFilter = new Ext.util.Filter({
//                                    property: 'kas_bank',
//                                    value: combo
//                                });
//                                filterCollection.push(statusFilter);
//                            }
//                            
//                            var statusFilter = new Ext.util.Filter({
//                                property: 'cabang_id',
//                                value: combo3 !== null ? combo3: userCabang
//                            });
//                            filterCollection.push(statusFilter);
//
//                            store.clearFilter(true);
//                            store.filter(filterCollection);
//                        }
//                    }
                },
                {
                    xtype: 'tbtext',
                    text: '<small>s/d</small>'
                },
                {
                    xtype: 'datefield',
                    width: 100,
                    fieldLabel: 'Tgl. Akhir',
                    emptyText: 'Tgl Akhir',
                    hideLabel: true,
                    name: 'dateEnd',
                    itemId: 'dateEndBkr',
                    format: 'd/M/Y',
                    submitFormat: 'Y-m-d',
//                    listeners: {
//                        change: function () {
//                            var store = this.up('grid').getStore(),
//                                filterCollection = [],
//                                combo = this.up('grid').down('#filterBankKeluar').getValue(),
//                                combo2 = this.up('grid').down('#dateStartBkr').getValue(),
//                                combo3 = this.up('grid').down('#cabangBkrFilter').getValue();
// 
//                            var filter2 = new Ext.util.Filter({
//                                property: 'kas_type',
//                                value: 'bankkeluar'
//                            });
//                            filterCollection.push(filter2);
//        
//                            if(combo2 !== null) {
//                                var statusFilter = new Ext.util.Filter({
//                                    property: 'kas_tgltrx',
//                                    value: Ext.Date.format(combo2, 'Y-m-d 00:00:00') + 'GT'
//                                });
//                                filterCollection.push(statusFilter);
//                            }
//
//                            var statusFilter = new Ext.util.Filter({
//                                property: 'kas_tgltrx',
//                                value: Ext.Date.format(this.getValue(), 'Y-m-d 23:59:59') + 'LT'
//                            });
//                            filterCollection.push(statusFilter);
//
//                            if(combo !== null) {
//                                var statusFilter = new Ext.util.Filter({
//                                    property: 'kas_bank',
//                                    value: combo
//                                });
//                                filterCollection.push(statusFilter);
//                            }
//                            
//                            var statusFilter = new Ext.util.Filter({
//                                property: 'cabang_id',
//                                value: combo3 !== null ? combo3: userCabang
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
                    itemId: 'cabangBkrFilter',
                    width: 150,
                    emptyText: 'Pilih cabang',
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
//                                combo = this.up('grid').down('#dateStartBkr').getValue(),
//                                combo2 = this.up('grid').down('#dateEndBkr').getValue(),
//                                combo3 = this.up('grid').down('#filterBankKeluar').getValue();
//
//                            var filter2 = new Ext.util.Filter({
//                                property: 'kas_type',
//                                value: 'bankkeluar'
//                            });
//                            filterCollection.push(filter2);
//
//                            if(combo !== null) {
//                                var statusFilter = new Ext.util.Filter({
//                                    property: 'kas_tgltrx',
//                                    value: Ext.Date.format(combo, 'Y-m-d 00:00:00') + 'GT'
//                                });
//                                filterCollection.push(statusFilter);
//                            }
//
//                            if(combo2 !== null) {
//                                var statusFilter = new Ext.util.Filter({
//                                    property: 'kas_tgltrx',
//                                    value: Ext.Date.format(combo2, 'Y-m-d 23:59:59') + 'LT'
//                                });
//                                filterCollection.push(statusFilter);
//                            }
//
//                            if(combo3 !== null) {
//                                var statusFilter = new Ext.util.Filter({
//                                    property: 'kas_bank',
//                                    value: combo3
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
                {
                    xtype: 'combobox',
                    itemId: 'filterBankKeluar',
                    width: 150,
                    emptyText: 'Pilih Bank',
                    displayField: 'bankAlias',
                    valueField: 'id',
                    queryMode: 'remote',
                    name: 'filterCbPusat1',
                    allowBlank: true,
                    triggerAction: 'all',
                    valueNotFoundText: 'Tidak ada Data',
//                    store: 'BankStore',
//                    listeners: {
//                        afterrender: function() {
//                            var store = this.getStore();
//
//                            store.clearFilter(true);
//                            store.filter('bank_cabang', userCabang);
//                        },
//                        change: function () {
//                            var store = this.up('grid').getStore(),
//                                filterCollection = [],
//                                combo = this.up('grid').down('#dateStartBkr').getValue(),
//                                combo2 = this.up('grid').down('#dateEndBkr').getValue(),
//                                combo3 = this.up('grid').down('#cabangBkrFilter').getValue();
// 
//                            var filter2 = new Ext.util.Filter({
//                                property: 'kas_type',
//                                value: 'bankkeluar'
//                            });
//                            filterCollection.push(filter2);
//        
//                            if(combo !== null) {
//                                var statusFilter = new Ext.util.Filter({
//                                    property: 'kas_tgltrx',
//                                    value: Ext.Date.format(combo2, 'Y-m-d 00:00:00') + 'GT'
//                                });
//                                filterCollection.push(statusFilter);
//                            }
//                            
//                            if(combo2 !== null) {
//                                var statusFilter = new Ext.util.Filter({
//                                    property: 'kas_tgltrx',
//                                    value: Ext.Date.format(combo2, 'Y-m-d 23:59:59') + 'LT'
//                                });
//                                filterCollection.push(statusFilter);
//                            }
//
//                            var statusFilter = new Ext.util.Filter({
//                                property: 'kas_bank',
//                                value: this.getValue()
//                            });
//                            filterCollection.push(statusFilter);
//
//                            var statusFilter = new Ext.util.Filter({
//                                property: 'cabang_id',
//                                value: combo3 !== null ? combo3 : userCabang
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
                    iconCls: 'icon-btn-refresh',
//                    handler: function() {
//                        this.up('grid').getStore().load();
//                        this.up('grid').getSelectionModel().clearSelections();
//                    }
                },
                '-',
                {
                    xtype: 'button',
                    iconCls: 'icon-btn-clear',
//                    handler: function() {
//                        this.up('grid').down('#dateStartBkr').setValue('');
//                        this.up('grid').down('#dateEndBkr').setValue('');
//                        this.up('grid').down('#cabangBkrFilter').setValue('');
//                        this.up('grid').down('#filterBankKeluar').setValue('');
//                        
//                        var store = this.up('grid').getStore(),
//                            filterCollection = [];
//
//                        var filter2 = new Ext.util.Filter({
//                            property: 'kas_type',
//                            value: 'bankkeluar'
//                        });
//                        filterCollection.push(filter2);
//
//                        var statusFilter = new Ext.util.Filter({
//                            property: 'cabang_id',
//                            value: userCabang
//                        });
//                        filterCollection.push(statusFilter);
//
//                        store.clearFilter(true);
//                        store.filter(filterCollection);
//                    }
                }
            ],
            columns: [
                Ext.create('Ext.grid.RowNumberer'),
                {
                    xtype: 'datecolumn',
                    width: 100,
                    text: 'TGL. TRANS',
                    dataIndex: 'tglTransaksi',
                    renderer: Ext.util.Format.dateRenderer('d/M/Y')
                },
                {
                    xtype: 'gridcolumn',
                    width: 300,
                    hidden: false,
                    text: 'KEPERLUAN',
                    dataIndex: 'keteranganKd'
                },
                {
                    width: 150,
                    align: 'right',
                    header: 'JUMLAH',
                    dataIndex: 'jumlahTrx',
                    renderer: function(value, meta, record) {
                        return Ext.util.Format.number(value, '0.000,00/i');
                    }
                }
            ]
        });

        me.callParent(arguments);
    }
});
/* End of file reservasiGrid.js */
/* Location: ./assets/js/app/view/reservasi/reservasiGrid.js */