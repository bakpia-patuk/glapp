/**
 * @author Isht Ae
 **/
Ext.define('eTrav.view.dvtxpengadaan.DvTxPengadaanGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.dvtxpengadaan.dvtxpengadaangrid',
    itemId: 'dvtxpengadaangrid',
    autoScroll: true,
    forceFit: true,
   store: 'dvtxpengadaan.PengadaanStore',
    columnLines: true,
    flex: 1,
    border: false,
//    selModel: Ext.create('Ext.selection.CheckboxModel', {
//    }),

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            viewConfig: {
                autoScroll: true,
                emptyText: 'Tidak ada data Group Akun',
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
                    itemId: 'datePengDivFilter',
                    format: 'd/M/Y',
                    submitFormat: 'Y-m-d',
                   listeners: {
                       change: function() {
                           var store = this.up('grid').getStore(),
                                   filterCollection = [],
                                   combo = this.up('grid').down('#cabangPengDivFilter').getValue(),
                                   combo2 = this.up('grid').down('#datePengDivFilter2').getValue();
                           ;

                           var statusFilter = new Ext.util.Filter({
                               property: 'cabang_id',
                               value: combo !== null ? combo : CABANG_ID
                           });
                           filterCollection.push(statusFilter);

                           var filter2 = new Ext.util.Filter({
                               property: 'divisi',
                               value: USER_DIVISI
                           });
                           filterCollection.push(filter2);

                           var statusFilter = new Ext.util.Filter({
                               property: 'tgl_trx',
                               value: Ext.Date.format(this.getValue(), 'Y-m-d 00:00:00') + 'GT'
                           });
                           filterCollection.push(statusFilter);

                           if (combo2 !== null) {
                               var statusFilter = new Ext.util.Filter({
                                   property: 'tgl_trx',
                                   value: Ext.Date.format(combo2, 'Y-m-d 23:59:59') + 'LT'
                               });
                               filterCollection.push(statusFilter);
                           }

                           store.clearFilter(true);
                           store.filter(filterCollection);
                       }
                   }
                },
                {
                    xtype: 'datefield',
                    width: 160,
                    labelWidth: 30,
                    fieldLabel: 's.d',
                    emptyText: 'Tanggal',
                    itemId: 'datePengDivFilter2',
                    format: 'd/M/Y',
                    submitFormat: 'Y-m-d',
                   listeners: {
                       change: function() {
                           var store = this.up('grid').getStore(),
                                   filterCollection = [],
                                   combo = this.up('grid').down('#cabangPengDivFilter').getValue(),
                                   combo2 = this.up('grid').down('#datePengDivFilter').getValue();

                           var statusFilter = new Ext.util.Filter({
                               property: 'cabang_id',
                               value: combo !== null ? combo : CABANG_ID
                           });
                           filterCollection.push(statusFilter);

                           var filter2 = new Ext.util.Filter({
                               property: 'divisi',
                               value: USER_DIVISI
                           });
                           filterCollection.push(filter2);

                           if (combo2 !== null) {
                               var statusFilter = new Ext.util.Filter({
                                   property: 'tgl_trx',
                                   value: Ext.Date.format(combo2, 'Y-m-d 00:00:00') + 'GT'
                               });
                               filterCollection.push(statusFilter);
                           }

                           var statusFilter = new Ext.util.Filter({
                               property: 'tgl_trx',
                               value: Ext.Date.format(this.getValue(), 'Y-m-d 23:59:59') + 'LT'
                           });
                           filterCollection.push(statusFilter);



                           store.clearFilter(true);
                           store.filter(filterCollection);
                       }
                   }
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Cabang ',
                    itemId: 'cabangPengDivFilter',
                    width: 220,
                    emptyText: 'Pilih',
                    labelWidth: 60,
                    displayField: 'cabang_alias',
                    valueField: 'id',
                    queryMode: 'remote',
                    allowBlank: true,
                    triggerAction: 'all',
                   hidden: CABANG_ID === '1' ? true : false,
                    valueNotFoundText: 'Tidak ada Data',
                   store: 'dvtxpengadaan.CabangStore',
                   listeners: {
                       select: function() {
                           var store = this.up('grid').getStore(),
                                   filterCollection = [],
                                   combo = this.up('grid').down('#datePengDivFilter').getValue(),
                                   combo2 = this.up('grid').down('#datePengDivFilter2').getValue();

                           var statusFilter = new Ext.util.Filter({
                               property: 'cabang_id',
                               value: this.getValue()
                           });
                           filterCollection.push(statusFilter);

                           var filter2 = new Ext.util.Filter({
                               property: 'divisi',
                               value: USER_DIVISI
                           });
                           filterCollection.push(filter2);

                           if (combo !== null) {
                               var statusFilter = new Ext.util.Filter({
                                   property: 'tgl_trx',
                                   value: Ext.Date.format(combo, 'Y-m-d 00:00:00') + 'GT'
                               });
                               filterCollection.push(statusFilter);
                           }

                           if (combo2 !== null) {
                               var statusFilter = new Ext.util.Filter({
                                   property: 'tgl_trx',
                                   value: Ext.Date.format(combo2, 'Y-m-d 23:59:59') + 'LT'
                               });
                               filterCollection.push(statusFilter);
                           }

                           /*if (this.getValue() !== '1') {
                           var statusFilter = new Ext.util.Filter({
                               property: 'peng_type',
                               value: 1
                           });
                           filterCollection.push(statusFilter);
                           }*/

                           store.clearFilter(true);
                           store.filter(filterCollection);
                       }
                   }
                },
                '->',
                {
                    tooltip: 'Approval Pusat',
                    ui: 'blue-button',
                    iconCls: 'icon-btn-appr',
                    text : 'App Pusat',
                   action: 'approvalPs',
                    hidden: CABANG_ID === '1' ? true : false,
                },
                 {
                    tooltip: 'Approval Manager',
                    ui: 'blue-button',
                    iconCls: 'icon-btn-appr',
                    text : 'App Manager',
                   action: 'approvalMn'
                },
                {
                    tooltip: 'Approval Divisi',
                    ui: 'blue-button',
                    iconCls: 'icon-btn-appr',
                    text : 'App Divisi',
                   action: 'apprPeng'
                },
                {
                    tooltip: 'Clear Filter',
                    ui: 'blue-button',
                    iconCls: 'icon-btn-clear',
                   handler: function() {
                       this.up('grid').down('#datePengDivFilter').reset();
                       this.up('grid').down('#datePengDivFilter2').reset();
                       this.up('grid').down('#cabangPengDivFilter').reset();

                       var store = this.up('grid').getStore(),
                               filterCollection = [];

                       var filter2 = new Ext.util.Filter({
                           property: 'cabang_id',
                           value: CABANG_ID
                       });
                       filterCollection.push(filter2);

                       var filter2 = new Ext.util.Filter({
                           property: 'divisi',
                           value: USER_DIVISI
                       });
                       filterCollection.push(filter2);

                       store.clearFilter(true);
                       store.filter(filterCollection);

                   }
                }
            ],
            columns: [
                {
                    xtype: 'gridcolumn',
                    flex: 0.4,
                    text: 'NO. PENGADAAN',
                    dataIndex: 'noPeng',
                    renderer: function(value, meta, record) {
                        var status = record.get('pengStatus'),
                                statusDiv = record.get('pengStatusDiv'),
                                peng_type = record.get('peng_statusmgr');
                        if (status == 1 && statusDiv == 1 && peng_type == 1) {
                            return '<span style="color:#be03c1;">' + value + '</span>';
                        } else if (status == 0 && statusDiv == 1 && peng_type == 0) {
                            return '<span style="color:#0000FF;">' + value + '</span>';
                        } else if (status == 1 && statusDiv == 1 && peng_type == 0) {
                            return '<span style="color:#ce7f00;">' + value + '</span>';
                        } else if (status == 1 && statusDiv == 1 && peng_type == 2) {
                            return '<span style="color:#48ff00;">' + value + '</span>';
                        } else if (status == 0 && statusDiv == 0 && peng_type == 0) {
                            return '<span style="color:#FF0000;">' + value + '</span>';
                        } else {
                            return '<span style="color:gray;">' + value + '</span>';
                        }
                    }
                },
                {
                    xtype: 'datecolumn',
                    flex: 0.3,
                    text: 'TGL. PENGADAAN',
                    dataIndex: 'tglTransaksi',
                    renderer: function(value, meta, record) {
                        var status = record.get('pengStatus'),
                                statusDiv = record.get('pengStatusDiv'),
                                peng_type = record.get('peng_statusmgr');
                        if (status == 1 && statusDiv == 1 && peng_type == 1) {
                            return '<span style="color:#be03c1;">' + Ext.util.Format.date(value, 'd/M/Y') + '</span>';
                        } else if (status == 0 && statusDiv == 1 && peng_type == 0) {
                            return '<span style="color:#0000FF;">' + Ext.util.Format.date(value, 'd/M/Y') + '</span>';
                        } else if (status == 1 && statusDiv == 1 && peng_type == 0) {
                            return '<span style="color:#ce7f00;">' + Ext.util.Format.date(value, 'd/M/Y') + '</span>';
                        } else if (status == 1 && statusDiv == 1 && peng_type == 2) {
                            return '<span style="color:#48ff00;">' + Ext.util.Format.date(value, 'd/M/Y') + '</span>';
                        } else if (status == 0 && statusDiv == 0 && peng_type == 0) {
                            return '<span style="color:#FF0000;">' + Ext.util.Format.date(value, 'd/M/Y') + '</span>';
                        } else {
                            return '<span style="color:gray;">' + Ext.util.Format.date(value, 'd/M/Y') + '</span>';
                        }
                    }
                },
                {
                    xtype: 'gridcolumn',
                    flex: 0.2,
                    text: 'DIVISI',
                    dataIndex: 'divisiName',
                    renderer: function(value, meta, record) {
                        var status = record.get('pengStatus'),
                                statusDiv = record.get('pengStatusDiv'),
                                peng_type = record.get('peng_statusmgr');
                        if (status == 1 && statusDiv == 1 && peng_type == 1) {
                            return '<span style="color:#be03c1;">' + value + '</span>';
                        } else if (status == 0 && statusDiv == 1 && peng_type == 0) {
                            return '<span style="color:#0000FF;">' + value + '</span>';
                        } else if (status == 1 && statusDiv == 1 && peng_type == 0) {
                            return '<span style="color:#ce7f00;">' + value + '</span>';
                        } else if (status == 1 && statusDiv == 1 && peng_type == 2) {
                            return '<span style="color:#48ff00;">' + value + '</span>';
                        } else if (status == 0 && statusDiv == 0 && peng_type == 0) {
                            return '<span style="color:#FF0000;">' + value + '</span>';
                        } else {
                            return '<span style="color:gray;">' + value + '</span>';
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