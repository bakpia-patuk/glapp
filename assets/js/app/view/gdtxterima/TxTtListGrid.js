/**
 * @author Isht Ae
 **/
Ext.define('GlApp.view.gdtxterima.TxTtListGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.gdtxterima.tsxttlistgrid',
    itemId: 'tsxttlistgrid',
    border: false,
    store: 'gdtxterima.TtListStore',
    autoScroll: true,
    forceFit: true,
    columnLines: true,

    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            viewConfig: {
                autoScroll: true,
                emptyText: 'Tidak ada data Penerimaan Barang',
                deferEmptyText: false
            },
            tbar: [
                {
                    xtype: 'datefield',
                    width: 130,
                    fieldLabel: 'Tanggal',
                    margin: '0 0 0 5',
                    emptyText: 'Tanggal Awal',
                    hideLabel: true,
                    itemId: 'dateTtFilter',
                    format: 'd/M/Y',
                    submitFormat: 'Y-m-d'
                },
                {
                    xtype: 'datefield',
                    width: 160,
                    labelWidth: 23,
                    fieldLabel: 's.d ',
                    margin: '0 5 0 5',
                    emptyText: 'Tanggal Akhir',
                    itemId: 'dateTtFilter2',
                    format: 'd/M/Y',
                    submitFormat: 'Y-m-d'
                },
                {
                    xtype: 'combobox',
                    itemId: 'cbTtFilter',
                    width: 150,
                    margin: '0 5 0 0',
                    emptyText: 'Pilih Cabang',
                    labelAlign: 'right',
                    displayField: 'cabang_alias',
                    valueField: 'id',
                    queryMode: 'remote',
                    allowBlank: true,
                    triggerAction: 'all',
                    hidden: CABANG_ID === '1' ? true : false,
                    valueNotFoundText: 'Tidak ada Data',
                    store: 'gdtxterima.CabangStore',
                    listeners: {
                        afterrender: function() {
                            if (CABANG_ID !== '1') {
                                this.setValue(parseInt(CABANG_ID));
                            }
                        }
                    }
                },
                {
                    xtype: 'combobox',
                    emptyText: 'Pilih suplier.',
                    triggerAction: 'all',
                    queryMode: 'remote',
                    minChars: 2,
                    itemId: 'pilihSup',
                    width: 150,
                    labelAlign: 'right',
                    labelWidth: 50,
                    msgTarget: 'side',
                    store: 'gdtxterima.MasterSupplierStore',
                    displayField: 'suppdisplay',
                    valueField: 'idms',
                    hideTrigger: false,
                    matchFieldWidth: false,
                    listConfig: {
                        minWidth: 185
                    }

                },
                {
                    iconCls: 'icon-btn-search',
                    text: 'SEARCH',
                    tooltip: 'Search Query',
                    ui: 'blue-button',
                    handler: function() {
                        var grid = this.up('grid'),
                                store = grid.getStore(),
                                cabang = this.up('grid').down('#cbTtFilter').getValue(),
                                supplier = this.up('grid').down('#pilihSup').getValue(),
                                tgl1 = this.up('grid').down('#dateTtFilter').getValue(),
                                tgl2 = this.up('grid').down('#dateTtFilter2').getValue(),
                                filterCollection = [];


                        var statusFilter = new Ext.util.Filter({
                            property: 'trx_tt.tt_tgltrx',
                            value: Ext.Date.format(tgl1 === null ? new Date() : tgl1, 'Y-m-d 00:00:00') + 'GT'
                        });
                        filterCollection.push(statusFilter);

                        var statusFilter = new Ext.util.Filter({
                            property: 'trx_tt.tt_tgltrx',
                            value: Ext.Date.format(tgl2 === null ? new Date() : tgl2, 'Y-m-d 23:59:59') + 'LT'
                        });
                        filterCollection.push(statusFilter);

                        if (supplier !== null) {
                            var statusFilter = new Ext.util.Filter({
                                property: 'trx_tt.tt_supp_id',
                                value: supplier
                            });
                            filterCollection.push(statusFilter);
                        }

                        var statusFilter = new Ext.util.Filter({
                            property: 'trx_tt.tt_cabang',
                            value: cabang === null ? userCabang : cabang
                        });
                        filterCollection.push(statusFilter);

                        store.clearFilter(true);
                        store.filter(filterCollection);
                        store.group('tt_no');
                    }
                },
                '->',
                {
                    text: 'PRINT_TT',
                    action: 'printListTt'
                },
                {
                    text: 'REFRESH',
                    handler: function() {
                        var cabang = this.up('grid').down('#cbTtFilter').getValue(),
                                myval = this.up('grid').down('#pilihSup').getValue();
                        if (cabang !== null && myval !== null) {
                            this.up('grid').getStore().load();
                        }
                    }
                },
                {
                    text: 'ALL',
                    handler: function() {
                        var grid = this.up('grid'),
                                store = grid.getStore(),
                                cabang = this.up('grid').down('#cbTtFilter').getValue(),
                                tgl1 = this.up('grid').down('#dateTtFilter').getValue(),
                                tgl2 = this.up('grid').down('#dateTtFilter2').getValue(),
                                filterCollection = [];


                        var statusFilter = new Ext.util.Filter({
                            property: 'trx_tt.tt_tgltrx',
                            value: Ext.Date.format(tgl1 === null ? new Date() : tgl1, 'Y-m-d 00:00:00') + 'GT'
                        });
                        filterCollection.push(statusFilter);

                        var statusFilter = new Ext.util.Filter({
                            property: 'trx_tt.tt_tgltrx',
                            value: Ext.Date.format(tgl2 === null ? new Date() : tgl2, 'Y-m-d 23:59:59') + 'LT'
                        });
                        filterCollection.push(statusFilter);

                        var statusFilter = new Ext.util.Filter({
                            property: 'trx_tt.tt_cabang',
                            value: cabang === null ? userCabang : cabang
                        });
                        filterCollection.push(statusFilter);

                        store.clearFilter(true);
                        store.filter(filterCollection);
                        store.group('tt_no');
                    }
                }
                
            ],
            features: [
                {
                    startCollapsed: false,
                    id: 'ttListGroup',
                    ftype: 'grouping',
                    groupHeaderTpl: 'No TT : {name}',
                    hideGroupedHeader: false,
                    enableGroupingMenu: true
                }
            ],
            columns: [
                Ext.create('Ext.grid.RowNumberer'),
                {
                    xtype: 'gridcolumn',
                    flex: 0.5,
                    text: 'Nama Barang',
                    dataIndex: 'barang_name'
                },
                {
                    xtype: 'datecolumn',
                    flex: 0.3,
                    text: 'TGL. TT',
                    dataIndex: 'tgl_trx',
                    renderer: Ext.util.Format.dateRenderer('d/M/Y')
                },
                {
                    xtype: 'numbercolumn',
                    flex: 0.2,
                    align: 'center',
                    text: 'QTY.',
                    format: '000',
                    dataIndex: 'tt_qty_kirim'

                },
                {
                    xtype: 'gridcolumn',
                    flex: 0.2,
                    text: 'CABANG',
                    dataIndex: 'cabang_name'
                }
            ]
        });

        me.callParent(arguments);
    }
});
/* End of file reservasiGrid.js */
/* Location: ./assets/js/app/view/reservasi/reservasiGrid.js */