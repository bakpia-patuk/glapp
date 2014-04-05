/**
 * @author Isht Ae
 **/
Ext.define('GlApp.view.gdtxfaktur.TxListFakturGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.gdtxfaktur.txlistfakturgrid',
    itemId: 'txlistfakturgrid',
    border: false,
    store: 'gdtxfaktur.ListFakturStore',
    autoScroll: true,
    forceFit: false,
    columnLines: true,
    selModel: Ext.create('Ext.selection.CheckboxModel', {
    }),

    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            viewConfig: {
                autoScroll: true,
                emptyText: 'Tidak ada data Faktur',
                deferEmptyText: false
            },
            tbar: [
                {
                    xtype: 'datefield',
                    fieldLabel: 'Filter ',
                    labelWidth: 40,
                    labelAlign: 'right',
                    emptyText: 'Tgl. Awal',
                    itemId: 'dateFakturFilter',
                    displayField: 'type',
                    valueField: 'typeCode',
                    queryMode: 'local',
                    forceSelection: true,
                    typeAhead: true,
                    listeners: {
                        afterrender: function() {
                            this.setValue(new Date());
                        },
                        change: function() {
                            var store = this.up('grid').getStore(),
                                    filterCollection = [],
                                    combo = this.up('grid').down('#cbFakturFilter').getValue(),
                                    combo2 = this.up('grid').down('#dateFakturFilter2').getValue();

                            var statusFilter = new Ext.util.Filter({
                                property: 'faktur_tgl',
                                value: Ext.Date.format(this.getValue() === null ? new Date() : this.getValue(), 'Y-m-d 00:00:00') + 'GT'
                            });
                            filterCollection.push(statusFilter);

                            var statusFilter = new Ext.util.Filter({
                                property: 'faktur_tgl',
                                value: Ext.Date.format(combo2 === null ? new Date() : combo2, 'Y-m-d 23:59:59') + 'LT'
                            });
                            filterCollection.push(statusFilter);

                            var statusFilter4 = new Ext.util.Filter({
                                property: 'faktur_cabang',
                                value: combo === null ? CABANG_ID : combo
                            });
                            filterCollection.push(statusFilter4);

                            store.clearFilter(true);
                            store.filter(filterCollection);
                            store.group('fktSuppNama');
                        }
                    }
                },
                {
                    xtype: 'datefield',
                    fieldLabel: ' s.d ',
                    labelWidth: 30,
                    labelAlign: 'right',
                    emptyText: 'Tgl. Akhir',
                    displayField: 'type',
                    valueField: 'typeCode',
                    queryMode: 'local',
                    forceSelection: true,
                    itemId: 'dateFakturFilter2',
                    typeAhead: true,
                    listeners: {
                        afterrender: function() {
                            this.setValue(new Date());
                        },
                        change: function() {
                            var store = this.up('grid').getStore(),
                                    filterCollection = [],
                                    combo = this.up('grid').down('#dateFakturFilter').getValue(),
                                    combo2 = this.up('grid').down('#cbFakturFilter').getValue();

                            var statusFilter = new Ext.util.Filter({
                                property: 'faktur_tgl',
                                value: Ext.Date.format(combo === null ? new Date() : combo, 'Y-m-d 00:00:00') + 'GT'
                            });
                            filterCollection.push(statusFilter);

                            var statusFilter = new Ext.util.Filter({
                                property: 'faktur_tgl',
                                value: Ext.Date.format(this.getValue() === null ? new Date() : this.getValue(), 'Y-m-d 23:59:59') + 'LT'
                            });
                            filterCollection.push(statusFilter);

                            var statusFilter4 = new Ext.util.Filter({
                                property: 'faktur_cabang',
                                value: combo2 === null ? CABANG_ID : combo2
                            });
                            filterCollection.push(statusFilter4);

                            store.clearFilter(true);
                            store.filter(filterCollection);
                            store.group('fktSuppNama');
                        }
                    }
                },
                {
                    xtype: 'combobox',
                    width: 150,
                    emptyText: 'Nama cabang',
                    itemId: 'cbFakturFilter',
                    displayField: 'cabang_alias',
                    allowBlank: false,
                    valueField: 'id',
                    queryMode: 'remote',
                    allowBlank: true,
                    triggerAction: 'all',
                    hidden: CABANG_ID === '1' ? true : false,
                    valueNotFoundText: 'Tidak ada Data',
                    store: 'gdtxfaktur.CabangStore',
                    listeners: {
                        afterrender: function() {
                            if (CABANG_ID !== '14') {
                                this.setValue(parseInt(CABANG_ID));
                            }
                        },
                        select: function() {
                            var store = this.up('grid').getStore(),
                                    filterCollection = [],
                                    combo = this.up('grid').down('#dateFakturFilter').getValue(),
                                    combo2 = this.up('grid').down('#dateFakturFilter2').getValue();

                            var statusFilter = new Ext.util.Filter({
                                property: 'faktur_tgl',
                                value: Ext.Date.format(combo === null ? new Date() : combo, 'Y-m-d 00:00:00') + 'GT'
                            });
                            filterCollection.push(statusFilter);

                            var statusFilter = new Ext.util.Filter({
                                property: 'faktur_tgl',
                                value: Ext.Date.format(combo2 === null ? new Date() : combo2, 'Y-m-d 23:59:59') + 'LT'
                            });
                            filterCollection.push(statusFilter);

                            var statusFilter4 = new Ext.util.Filter({
                                property: 'faktur_cabang',
                                value: this.getValue() === null ? userCabang : this.getValue()
                            });
                            filterCollection.push(statusFilter4);

                            store.clearFilter(true);
                            store.filter(filterCollection);
                            store.group('fktSuppNama');
                        }
                    }
                },
                {
                    text: 'SEARCH'
                },
                '->',
                {
                    text: 'CETAK_ULANG',
                    action : 'cetakUlangTf'
                },
                {
                    text: 'REFRESH',
                    handler: function() {
                        var grid = this.up('grid'),
                                store = grid.getStore();
                        store.load();
                        store.group('fktSuppNama');
                    }
                },
                {
                    text: 'ALL'
                }
            ],
            features: [
                {
                    startCollapsed: false,
                    id: 'poPengGroup',
                    ftype: 'grouping',
                    groupHeaderTpl: 'No Pengadaan : {name}',
                    hideGroupedHeader: false,
                    //remoteRoot: 'summaryData',
                    enableGroupingMenu: true
                }
            ],
            columns: [
                Ext.create('Ext.grid.RowNumberer'),
                {
                    xtype: 'datecolumn',
                    flex: 0.35,
                    text: 'TGL. FAKTUR',
                    dataIndex: 'faktur_tgl',
                    renderer: Ext.util.Format.dateRenderer('d/M/Y')
                },
                {
                    xtype: 'gridcolumn',
                    flex: 0.35,
                    text: 'NO FAKTUR',
                    dataIndex: 'faktur_no'
                },
                {
                    xtype: 'numbercolumn',
                    flex: 0.3,
                    align: 'right',
                    text: 'TOTAL',
                    dataIndex: 'faktur_nototal'
                },
                {
                    xtype: 'gridcolumn',
                    flex: 0.2,
                    text: 'CABANG',
                    dataIndex: 'faktur_cabang'
                }

            ]
        });

        me.callParent(arguments);
    }
});
/* End of file reservasiGrid.js */
/* Location: ./assets/js/app/view/reservasi/reservasiGrid.js */