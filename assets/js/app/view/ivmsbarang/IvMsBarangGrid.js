/**
 * @author Isht Ae
 **/
Ext.define('GlApp.view.ivmsbarang.IvMsBarangGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.ivmsbarang.ivmsbaranggrid',
    itemId: 'ivmsbaranggrid',
    autoScroll: true,
    forceFit: true,
//    store: 'InvDataBarangStore',
    columnLines: true,
    flex: 1,
    border: false,

    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            viewConfig: {
                autoScroll: true,
                emptyText: 'Tidak Ada Data Barang',
                deferEmptyText: false
            },
            tbar: [
                {
                    xtype: 'combobox',
                    fieldLabel: 'Cabang ',
                    itemId: 'db_cabang',
                    width: 200,
                    margins: '0 0 0 5',
                    emptyText: 'Pilih',
                    labelWidth: 48,
                    displayField: 'cabangName',
                    valueField: 'id',
                    queryMode: 'remote',
                    allowBlank: true,
                    triggerAction: 'all',
//                    hidden: userCabang === "14" ? false : true,
                    valueNotFoundText: 'Tidak ada Data',
//                    store: 'CabangStore',
//                    listeners: {
//                        select: function () {
//                            var store = this.up('grid').getStore(),
//                                filterCollection = [],
//                                combo = this.up('grid').down('#db_divisi').getValue(),
//                                combo2 = this.up('grid').down('#db_ruang').getValue();
//
//                            var statusFilter = new Ext.util.Filter({
//                                property: 'db_cabang',
//                                value: this.getValue()
//                            });
//                            filterCollection.push(statusFilter);
//
//
//                            if(combo !== null) {
//                                var filter2 = new Ext.util.Filter({
//                                    property: 'db_divisi',
//                                    value: combo
//                                });
//                                filterCollection.push(filter2);
//                            }
//
//                            if(combo2 !== null) {
//                                var statusFilter = new Ext.util.Filter({
//                                    property: 'db_ruang',
//                                    value: combo2
//                                });
//                                filterCollection.push(statusFilter);
//                            }
//
//                            store.clearFilter(true);
//                            store.filter(filterCollection);
//                        }
//                    }
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Divisi ',
                    itemId: 'db_divisi',
                    triggerAction: 'all',
                    hideTrigger: false,
                    queryMode: 'remote',
                    minChars: 2,
//                    store: 'DivisiStore',
                    displayField: 'divisiName',
                    valueField: 'divisiId',
                    width: 188,
                    margins: '0 0 0 5',
                    emptyText: 'Pilih',
                    labelWidth: 36,
                    allowBlank: false,
                    matchFieldWidth: false,
                    listConfig: {
                        minWidth: 185
                    },
//                    listeners: {
//                        select: function (cmb, rec, opt) {
//                            var myVal = cmb.getValue(),
//                                ruanganStore = this.up('grid').down('#db_ruang').getStore(), 
//                                filterCollections = [];
//
//                            this.up('grid').down('#db_ruang').setReadOnly(false);
//                            
//                            var statusFilter = new Ext.util.Filter({
//                                property: 'cabang_id',
//                                value: userCabang
//                            });
//                            filterCollections.push(statusFilter);
//
//                            var statusFilter = new Ext.util.Filter({
//                                property: 'divisi_code',
//                                value: myVal
//                            });
//                            filterCollections.push(statusFilter);
//                    
//                            ruanganStore.clearFilter(true);
//                            ruanganStore.filter(filterCollections);
//                            ///DATA SLELCR
//                            var store = this.up('grid').getStore(),
//                                filterCollection = [],
//                                combo = this.up('grid').down('#db_cabang').getValue(),
//                                combo2 = this.up('grid').down('#db_ruang').getValue();
//
//                            var statusFilter = new Ext.util.Filter({
//                                property: 'db_cabang',
//                                value: combo === null ? userCabang : combo
//                            });
//                            filterCollection.push(statusFilter);
//
//
//                            var filter2 = new Ext.util.Filter({
//                                property: 'db_divisi',
//                                value: this.getValue()
//                            });
//                            filterCollection.push(filter2);
//
//                            if(combo2 !== null) {
//                                var statusFilter = new Ext.util.Filter({
//                                    property: 'db_ruang',
//                                    value: combo2
//                                });
//                                filterCollection.push(statusFilter);
//                            }
//
//                            store.clearFilter(true);
//                            store.filter(filterCollection);
//                        }
//                    }
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Ruangan ',
                    itemId: 'db_ruang',
                    triggerAction: 'all',
                    hideTrigger: false,
                    queryMode: 'remote',
                    minChars: 2,
                    hidden: false,
//                    store: 'DivisiRuanganStore',
                    displayField: 'ruangName',
                    valueField: 'id',
                    width: 200,
                    margins: '0 0 0 5',
                    emptyText: 'Pilih',
                    labelWidth: 55,
                    allowBlank: false,
                    readOnly: true,
                    matchFieldWidth: false,
                    listConfig: {
                        minWidth: 185
                    },
//                    listeners: {
//                        select: function () {
//                            var store = this.up('grid').getStore(),
//                                filterCollection = [],
//                                combo = this.up('grid').down('#db_cabang').getValue(),
//                                combo2 = this.up('grid').down('#db_divisi').getValue();
//
//                            var statusFilter = new Ext.util.Filter({
//                                property: 'db_cabang',
//                                value: combo === null ? userCabang : combo
//                            });
//                            filterCollection.push(statusFilter);
//
//
//                            if(combo2 !== null) {
//                                var filter2 = new Ext.util.Filter({
//                                    property: 'db_divisi',
//                                    value: combo2
//                                });
//                                filterCollection.push(filter2);
//                            }
//
//                            var statusFilter = new Ext.util.Filter({
//                                property: 'db_ruang',
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
                    text: 'NAMA BARANG',
                    dataIndex: 'barang_name',
                    renderer: Ext.util.Format.uppercase
                },
                {
                    xtype: 'gridcolumn',
                    flex: 0.4,
                    text: 'DIVISI',
                    dataIndex: 'divisi_name',
                    renderer: Ext.util.Format.uppercase
                },
                {
                    xtype: 'gridcolumn',
                    text: 'RUANGAN',
                    flex: 0.4,
                    dataIndex: 'ruang_name',
                    renderer: Ext.util.Format.uppercase
                },
                {
                    xtype: 'gridcolumn',
                    text: 'SERI',
                    flex: 0.4,
                    dataIndex: 'db_barangseri',
                    renderer: Ext.util.Format.uppercase
                }
            ]
        });

        me.callParent(arguments);
    }
});
/* End of file reservasiGrid.js */
/* Location: ./assets/js/app/view/reservasi/reservasiGrid.js */