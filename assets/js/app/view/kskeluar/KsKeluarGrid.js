/**
 * @author Isht Ae
 **/
Ext.define('GlApp.view.kskeluar.KsKeluarGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.kskeluar.kskeluargrid',
    itemId: 'kskeluargrid',
    autoScroll: true,
    title: 'DAFTAR KAS KELUAR',
    forceFit: true,
    store: 'kskeluar.TrxKasStore',
    columnLines: true,
    flex: 1,
    border: false,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            viewConfig: {
                autoScroll: true,
                emptyText: 'Tidak ada data Kas Keluar',
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
                    store: 'kskeluar.CabangStore'
                },
                {
                    iconCls: 'icon-btn-search',
                    text: 'SEARCH',
                    tooltip: 'Search Query',
                    ui: 'blue-button',
                    handler: function() {
//                        var grid = this.up('grid'),
//                                store = grid.getStore(),
//                                cabang = this.up('grid').down('#cbTtFilter').getValue(),
//                                supplier = this.up('grid').down('#pilihSup').getValue(),
//                                tgl1 = this.up('grid').down('#dateTtFilter').getValue(),
//                                tgl2 = this.up('grid').down('#dateTtFilter2').getValue(),
//                                filterCollection = [];
//
//
//                        var statusFilter = new Ext.util.Filter({
//                            property: 'trx_tt.tt_tgltrx',
//                            value: Ext.Date.format(tgl1 === null ? new Date() : tgl1, 'Y-m-d 00:00:00') + 'GT'
//                        });
//                        filterCollection.push(statusFilter);
//
//                        var statusFilter = new Ext.util.Filter({
//                            property: 'trx_tt.tt_tgltrx',
//                            value: Ext.Date.format(tgl2 === null ? new Date() : tgl2, 'Y-m-d 23:59:59') + 'LT'
//                        });
//                        filterCollection.push(statusFilter);
//
//                        if (supplier !== null) {
//                            var statusFilter = new Ext.util.Filter({
//                                property: 'trx_tt.tt_supp_id',
//                                value: supplier
//                            });
//                            filterCollection.push(statusFilter);
//                        }
//
//                        var statusFilter = new Ext.util.Filter({
//                            property: 'trx_tt.tt_cabang',
//                            value: cabang === null ? userCabang : cabang
//                        });
//                        filterCollection.push(statusFilter);
//
//                        store.clearFilter(true);
//                        store.filter(filterCollection);
//                        store.group('tt_no');
                    }
                },
                '->',
                {
                    text: 'PRINT_BKK',
                    action: 'printListTt'
                },
                {
                    text: 'REFRESH',
                    handler: function() {
//                        var cabang = this.up('grid').down('#cbTtFilter').getValue(),
//                                myval = this.up('grid').down('#pilihSup').getValue();
//                        if (cabang !== null && myval !== null) {
//                            this.up('grid').getStore().load();
//                        }
                    }
                },
                {
                    text: 'ALL',
                    handler: function() {
//                        var grid = this.up('grid'),
//                                store = grid.getStore(),
//                                cabang = this.up('grid').down('#cbTtFilter').getValue(),
//                                tgl1 = this.up('grid').down('#dateTtFilter').getValue(),
//                                tgl2 = this.up('grid').down('#dateTtFilter2').getValue(),
//                                filterCollection = [];
//
//
//                        var statusFilter = new Ext.util.Filter({
//                            property: 'trx_tt.tt_tgltrx',
//                            value: Ext.Date.format(tgl1 === null ? new Date() : tgl1, 'Y-m-d 00:00:00') + 'GT'
//                        });
//                        filterCollection.push(statusFilter);
//
//                        var statusFilter = new Ext.util.Filter({
//                            property: 'trx_tt.tt_tgltrx',
//                            value: Ext.Date.format(tgl2 === null ? new Date() : tgl2, 'Y-m-d 23:59:59') + 'LT'
//                        });
//                        filterCollection.push(statusFilter);
//
//                        var statusFilter = new Ext.util.Filter({
//                            property: 'trx_tt.tt_cabang',
//                            value: cabang === null ? userCabang : cabang
//                        });
//                        filterCollection.push(statusFilter);
//
//                        store.clearFilter(true);
//                        store.filter(filterCollection);
//                        store.group('tt_no');
                    }
                }
            ],
            columns: [
                Ext.create('Ext.grid.RowNumberer'),
                {
                    xtype: 'datecolumn',
                    width: 100,
                    text: 'TGL. TRANS',
                    dataIndex: 'kas_tgltrx',
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
                    dataIndex: 'kas_jumlah',
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