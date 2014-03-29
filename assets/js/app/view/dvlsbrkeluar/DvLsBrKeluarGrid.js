/**
 * @author Isht Ae
 **/
Ext.define('GlApp.view.dvlsbrkeluar.DvLsBrKeluarGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.dvlsbrkeluar.dvlsbrkeluargrid',
    itemId: 'dvlsbrkeluargrid',
    id: 'dvlsbrkeluargrid',
    border: true,
//    store: 'ListDivKeluarStore',
    autoScroll: true,
    forceFit: true,
    columnLines: true,
    flex: 1,
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            viewConfig: {
                autoScroll: true,
                emptyText: 'Tidak ada data Pengeluaran Divisi',
                deferEmptyText: false
            },
            tbar: [
                {
                    xtype: 'combobox',
                    fieldLabel: 'Divisi ',
                    labelAlign: 'right',
                    labelWidth: 45,
                    width: 180,
                    itemId: 'divListBkCmb',
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
//                                    ruanganStore = this.up('grid').down('#ruangListBkCmb').getStore(),
//                                    filterCollection = [];
//                            this.up('grid').down('#ruangListBkCmb').clearValue();
//                            this.up('grid').down('#ruangListBkCmb').setReadOnly(false);
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
                    itemId: 'ruangListBkCmb',
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
                    itemId: 'dateListDevPeng',
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
                    itemId: 'dateListDevPeng2',
                    format: 'd/M/Y',
                    submitFormat: 'Y-m-d'
                },
                {
                    iconCls: 'icon-btn-search',
                    tooltip: 'Cari Data',
                    ui: 'blue-button',
//                    action: 'scPengDivList'
                },
                '->',
                {
                    iconCls: 'icon-btn-print',
                    tooltip: 'Print data',
                    ui: 'blue-button',
//                    action: 'printPengDivList'
                },
                '-',
                {
                    iconCls: 'icon-btn-refresh',
                    tooltip: 'Refresh data dari server',
                    ui: 'blue-button',
//                    action: 'rfPengDivList'
                }
            ],
            columns: [
                Ext.create('Ext.grid.RowNumberer'),
                {
                    xtype: 'datecolumn',
                    text: 'TGL. KELUAR',
                    width: 50,
                    dataIndex: 'tgl_trx',
                    renderer: function (value, meta, record) {
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
                    header: 'DIVISI TUJUAN',
                    dataIndex: 'divisi_tjname',
                    renderer: 'uppercase'
                },
                {
                    width: 100,
                    header: 'DIVISI RUANG',
                    dataIndex: 'ruang_tjname',
                    renderer: 'uppercase'
                }
            ]
        });

        me.callParent(arguments);
    }
});
/* End of file reservasiGrid.js */
/* Location: ./assets/js/app/view/reservasi/reservasiGrid.js */