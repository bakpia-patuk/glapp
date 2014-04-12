/**
 * @author Isht Ae
 **/
Ext.define('GlApp.view.ivmsbarang.IvMsBarangGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.ivmsbarang.ivmsbaranggrid',
    itemId: 'ivmsbaranggrid',
    autoScroll: true,
    forceFit: true,
    store: 'ivmsbarang.IvMsBarangStore',
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
                    displayField: 'cabang_alias',
                    valueField: 'id',
                    queryMode: 'remote',
                    allowBlank: true,
                    triggerAction: 'all',
//                    hidden: userCabang === "1" ? false : true,
                    valueNotFoundText: 'Tidak ada Data',
                    store: 'ivmsbarang.CabangStore',
                    listeners: {
                        afterrender: function() {
                            this.setValue(parseInt(CABANG_ID));
                        },
                    }
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Divisi ',
                    itemId: 'db_divisi',
                    triggerAction: 'all',
                    hideTrigger: false,
                    queryMode: 'remote',
                    minChars: 2,
                    store: 'ivmsbarang.DivisiStore',
                    displayField: 'divisi_name',
                    valueField: 'id',
                    width: 188,
                    margins: '0 0 0 5',
                    emptyText: 'Pilih',
                    labelWidth: 36,
                    allowBlank: false,
                    matchFieldWidth: false,
                    listConfig: {
                        minWidth: 185
                    },
                    listeners: {
                        select: function (cmb, rec, opt) {
                            var myVal = cmb.getValue(),
                                ruanganStore = this.up('grid').down('#db_ruang').getStore(), 
                                filterCollections = [];

                            this.up('grid').down('#db_ruang').setReadOnly(false);
                            
                            var statusFilter = new Ext.util.Filter({
                                property: 'cabang_id',
                                value: CABANG_ID
                            });
                            filterCollections.push(statusFilter);

                            var statusFilter = new Ext.util.Filter({
                                property: 'divisi_id',
                                value: myVal
                            });
                            filterCollections.push(statusFilter);
                    
                            ruanganStore.clearFilter(true);
                            ruanganStore.filter(filterCollections);
                        }
                    }
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
                    store: 'ivmsbarang.RuangStore',
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
                },
                {
                    xtype: 'button',
                    ui: 'blue-button',
                    text: 'Search',
                    iconCls: 'icon-btn-refresh',
                    itemId: 'IvMbSearch'
                },
                '->',
                {
                    xtype: 'button',
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