/**
 * @author Isht Ae
 **/
Ext.define('GlApp.view.ivlsterima.IvLsTerimaGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.ivlsterima.ivlsterimagrid',
    itemId: 'ivlsterimagrid',
    id: 'invlisttrmgrid',
    border: true,
//    store: 'ListInvMasukStore',
    autoScroll: true,
    ui: 'orange-panel',
    forceFit: true,
    columnLines: true,
    flex: 1,
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            viewConfig: {
                autoScroll: true,
                emptyText: 'Tidak ada data Daftar Barang',
                deferEmptyText: false
            },
            tbar: [
                {
                    xtype: 'combobox',
                    fieldLabel: 'Divisi ',
                    labelAlign: 'right',
                    labelWidth: 45,
                    width: 180,
                    itemId: 'invListBmCmb',
                    triggerAction: 'all',
                    hideTrigger: false,
                    queryMode: 'remote',
                    minChars: 2,
//                    store: 'DivisiStore',
                    displayField: 'divisiName',
                    valueField: 'divisiId',
                    emptyText: 'Pilih Divisi',
                    matchFieldWidth: false,
                    listConfig: {
                        minWidth: 155
                    },
//                    listeners: {
//                        'select': function(cmb, rec, opt) {
//                            var myVal = cmb.getValue(),
//                                    ruanganStore = this.up('grid').down('#invRuangListBmCmb').getStore(),
//                                    filterCollection = [];
//                            this.up('grid').down('#invRuangListBmCmb').clearValue();
//                            this.up('grid').down('#invRuangListBmCmb').setReadOnly(false);
//
//                            var statusFilter = new Ext.util.Filter({
//                                property: 'cabang_id',
//                                value: userCabang
//                            });
//                            filterCollection.push(statusFilter);
//
//                            var statusFilter = new Ext.util.Filter({
//                                property: 'divisi_code',
//                                value: myVal
//                            });
//                            filterCollection.push(statusFilter);
//
//                            ruanganStore.clearFilter(true);
//                            ruanganStore.filter(filterCollection);
//                        }
//                    }
                },
                {
                    xtype: 'combobox',
                    itemId: 'invRuangListBmCmb',
                    margins: '0 3',
                    triggerAction: 'all',
                    hideTrigger: false,
                    queryMode: 'remote',
                    minChars: 2,
                    hidden: false,
//                    store: 'DivisiRuanganStore',
                    displayField: 'ruangName',
                    valueField: 'id',
                    emptyText: 'Pilih Ruangan',
                    allowBlank: true,
                    readOnly: true,
                    matchFieldWidth: false,
                    listConfig: {
                        minWidth: 155
                    }
                },
                {
                    xtype: 'datefield',
                    width: 130,
                    emptyText: 'Tanggal Awal',
                    hideLabel: true,
                    itemId: 'dateListInvPm',
                    format: 'd/M/Y',
                    submitFormat: 'Y-m-d'
                },
                {
                    xtype: 'datefield',
                    width: 160,
                    margins: '0 3 0 7',
                    labelWidth: 27,
                    fieldLabel: 's.d ',
                    emptyText: 'Tanggal Akhir',
                    itemId: 'dateListInvPm2',
                    format: 'd/M/Y',
                    submitFormat: 'Y-m-d'
                },
                {
                    iconCls: 'icon-btn-search',
                    tooltip: 'Cari Data',
                    ui: 'blue-button',
//                    action: 'scPengInvListBm'
                },
                '->',
                {
                    iconCls: 'icon-btn-print',
                    tooltip: 'Print data',
                    ui: 'blue-button',
//                    action: 'printPengInvListBm'
                },
                '-',
                {
                    iconCls: 'icon-btn-refresh',
                    tooltip: 'Refresh data dari server',
                    ui: 'blue-button',
//                    action: 'rfPengInvListBm'
                }
            ],
            columns: [
                Ext.create('Ext.grid.RowNumberer'),
                {
                    xtype: 'datecolumn',
                    text: 'TGL. MASUK',
                    width: 50,
                    dataIndex: 'tgl_trx',
                    renderer: function(value, meta, record) {
                        return Ext.util.Format.date(value, 'd/M/Y');
                    }
                },
                {
                    width: 200,
                    header: 'NAMA BARANG',
                    dataIndex: 'item_name',
                    renderer: 'uppercase'
                },
                {
                    xtype: 'numbercolumn',
                    width: 50,
                    align: 'center',
                    header: 'JUMLAH',
                    dataIndex: 'qty',
                    format: '000'
                },
                {
                    width: 100,
                    header: 'CABANG ASAL',
                    dataIndex: 'divisi_cbname',
                    renderer: 'uppercase'
                },
                {
                    width: 100,
                    header: 'DIVISI ASAL',
                    dataIndex: 'divisi_asalname',
                    renderer: 'uppercase'
                },
                {
                    width: 100,
                    header: 'DIVISI RUANG',
                    dataIndex: 'ruang_asalname',
                    renderer: 'uppercase'
                }
            ]
        });

        me.callParent(arguments);
    }
});
/* End of file reservasiGrid.js */
/* Location: ./assets/js/app/view/reservasi/reservasiGrid.js */