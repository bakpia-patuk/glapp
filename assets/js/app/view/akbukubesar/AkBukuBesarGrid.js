/**
 * @author Isht Ae
 **/
Ext.define('GlApp.view.bukubesar.AkBukuBesarGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.akbukubesar.akbukubesargrid',
    itemId: 'akbukubesargrid',
    title: 'RESUME BUKU BESAR',
    autoScroll: true,
    forceFit: true,
    ui: 'blue-panel',
//    store: 'BukuBesarStore',
    columnLines: true,
    flex: 1,
    border: false,
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            viewConfig: {
                autoScroll: true,
                emptyText: 'Tidak ada data Buku Besar',
                deferEmptyText: false
            },
            tbar: [
                {
                    xtype: 'tbtext',
                    text: '<strong>Filter :</strong>'
                },
                {
                    xtype: 'combobox',
                    emptyText: 'Pilih Bulan',
                    width: 90,
                    displayField: 'type',
                    valueField: 'typeCode',
                    queryMode: 'local',
                    itemId: 'filterBulanBb',
                    forceSelection: true,
                    hidden: false,
                    typeAhead: true,
                    allowBlank: false,
//                    valueNotFoundText: 'Tidak ada Data',
//                    store: new Ext.data.SimpleStore({
//                        id: 0,
//                        fields: [
//                            'typeCode', //numeric value is the key
//                            'type' //the text value is the value
//                        ],
//                        data: [
//                            [1, 'Januari'],
//                            [2, 'Februari'],
//                            [3, 'Maret'],
//                            [4, 'April'],
//                            [5, 'Mei'],
//                            [6, 'Juni'],
//                            [7, 'Juli'],
//                            [8, 'Agustus'],
//                            [9, 'September'],
//                            [10, 'Oktober'],
//                            [11, 'November'],
//                            [12, 'Desember']
//                        ]
//                    }),
//                    listeners: {
//                        afterrender: function(cmb, e, opt) {
//                            var d = new Date();
//                            var n = d.getMonth();
//
//                            this.setValue(n + 1);
//                        }
//                    }
                },
                {
                    xtype: 'combobox',
                    emptyText: 'Tahun',
                    width: 70,
                    displayField: 'tahun',
                    valueField: 'id',
                    queryMode: 'local',
                    itemId: 'filterTahunBb',
//                    forceSelection: true,
                    hidden: false,
                    typeAhead: true,
//                    valueNotFoundText: 'Tidak ada Data',
//                    store: 'TahunStore',
//                    listeners: {
//                        afterrender: function(cmb, e, opt) {
//                            cmb.setValue(2014);
//                        }
//                    }
                },
                {
                    xtype: 'combobox',
                    width: 140,
                    itemId: 'filterCabangBb',
                    emptyText: 'Pilih Cabang',
                    displayField: 'cabangName',
                    valueField: 'id',
                    queryMode: 'remote',
                    allowBlank: true,
                    triggerAction: 'all',
//                    hidden: userCabang === '14' ? false : true,
//                    valueNotFoundText: 'Tidak ada Data',
//                    store: 'CabangStore',
//                    listeners: {
//                        afterrender: function(cmb, e, opt) {
//                            if (userCabang === '14') {
//                                cmb.setValue(14);
//                            } else {
//                                cmb.setValue(parseInt(userCabang));
//                            }
//                        }
//                    }
                },
                {
                    ui: 'blue-button',
                    iconCls: 'icon-btn-search',
                    tooltip: 'Cari',
//                    handler: function(btn, e, opt) {
//                        var grid = this.up('grid'),
//                                store = grid.getStore(),
//                                bulan = this.up('panel').down('#filterBulanBb').getValue(),
//                                tahun = this.up('panel').down('#filterTahunBb').getValue(),
//                                cabang = this.up('panel').down('#filterCabangBb').getValue(),
//                                store2 = Ext.StoreMgr.lookup('JurnalBBStore'),
//                                filterCollection = [];
//                        
//                        store.removeAll();
//                        store2.removeAll();
//                        store.getProxy().extraParams.cabang = cabang;
//
//                        var filter2 = new Ext.util.Filter({
//                            property: 'tgl_trx',
//                            value: bulan
//                        });
//                        filterCollection.push(filter2);
//
//                        var filter2 = new Ext.util.Filter({
//                            property: 'tgl_trx',
//                            value: tahun
//                        });
//                        filterCollection.push(filter2);
//
//                        store.clearFilter(true);
//                        store.filter(filterCollection);
//                    }
                },
                {
                    text: 'Cetak',
                    hidden: true,
//                    handler: function() {
//                        var bulan = Ext.getCmp('filterBulanBb').getValue();
//                        window.open(BASE_PATH + 'kas/print_bb_all/' + bulan, "Print Preview", "autoscroll=true,height=550,width=950,modal=yes,alwaysRaised=yes");
//                    }
                },
                '->',
                {
                    xtype: 'tbtext',
                    id: 'lastMonth',
                    text: '<b>Saldo awal per tanggal :&nbsp;&nbsp;&nbsp;</b>'
                },
                {
                    xtype: 'tbtext',
                    id: 'akunSummaryTotal'
                }
            ],
            columns: [
                Ext.create('Ext.grid.RowNumberer'),
                {
                    xtype: 'gridcolumn',
                    width: 120,
                    text: 'Kode Akun',
                    dataIndex: 'kodeAkun'
                },
                {
                    xtype: 'gridcolumn',
                    width: 250,
                    text: 'Nama Akun',
                    dataIndex: 'namaAkun',
                    renderer: 'uppercase'
                },
                {
                    text: 'Saldo Awal',
                    columns: [
                        {
                            header: 'Debet',
                            width: 95,
                            dataIndex: 'saldoAwalDebet',
                            align: 'right',
                            renderer: function(val) {
                                if (val >= 0) {
                                    return Ext.util.Format.number(val, '0.000,00/i');
                                } else {
                                    return '<span style="color:red;"><i>( ' + Ext.util.Format.number(Math.abs(val), '0.000,00/i') + ' )</i></span>';
                                }
                                return val;
                            }
                        },
                        {
                            header: 'Kredit',
                            width: 95,
                            dataIndex: 'saldoAwalKredit',
                            align: 'right',
                            renderer: function(val) {
                                if (val >= 0) {
                                    return Ext.util.Format.number(val, '0.000,00/i');
                                } else {
                                    return '<span style="color:red;"><i>( ' + Ext.util.Format.number(Math.abs(val), '0.000,00/i') + ' )</i></span>';
                                }
                                return val;
                            }
                        }
                    ]
                },
                {
                    text: 'Saldo Akhir',
                    columns: [
                        {
                            header: 'Debet',
                            width: 95,
                            dataIndex: 'saldoAkhirDebet',
                            align: 'right',
                            renderer: function(val) {
                                if (val >= 0) {
                                    return Ext.util.Format.number(val, '0.000,00/i');
                                } else {
                                    return '<span style="color:red;"><i>( ' + Ext.util.Format.number(Math.abs(val), '0.000,00/i') + ' )</i></span>';
                                }
                                return val;
                            }
                        },
                        {
                            header: 'Kredit',
                            width: 95,
                            dataIndex: 'saldoAkhirKredit',
                            align: 'right',
                            renderer: function(val) {
                                if (val >= 0) {
                                    return Ext.util.Format.number(val, '0.000,00/i');
                                } else {
                                    return '<span style="color:red;"><i>( ' + Ext.util.Format.number(Math.abs(val), '0.000,00/i') + ' )</i></span>';
                                }
                                return val;
                            }
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    },
//    listeners: {
//        afterrender: function() {
//            var grid = this,
//                    store = this.getStore(),
//                    bulan = this.down('#filterBulanBb').getValue(),
//                    tahun = this.down('#filterTahunBb').getValue(),
//                    cabang = this.down('#filterCabangBb').getValue(),
//                    store2 = Ext.StoreMgr.lookup('JurnalBBStore');
//            filterCollection = [];
//
//            store.getProxy().extraParams.cabang = cabang;
//
//            var filter2 = new Ext.util.Filter({
//                property: 'tgl_trx',
//                value: bulan
//            });
//            filterCollection.push(filter2);
//
//            var filter2 = new Ext.util.Filter({
//                property: 'tgl_trx',
//                value: tahun
//            });
//            filterCollection.push(filter2);
//
//            store.clearFilter(true);
//            store.filter(filterCollection);
////                var grid = this.up('grid'),
////                        store = grid.getStore(),
////                var d = new Date();
////                var n = d.getMonth();
////
////                this.setValue(n + 1);
////                store.clearFilter(true);
////                store.filter('tgl_trx', n + 1);
////                store.load({
////                    scope: this,
////                    callback: function(records, operation, success) {
////                        var month;
////                        store.each(function(rec) {
////                            month = rec.get('lastMonth');
////                        });
////
////                        month = Ext.util.Format.date(month, 'd M Y');
////                        Ext.getCmp('lastMonth').setText('<div style="font-size:12px; font-weight: bold; padding: 5px 0px">Saldo awal per tanggal :&nbsp;&nbsp;&nbsp;' + month + '</div>');
////                    }
////                });
////
//            store2.removeAll();
//        }
//    }
});
/* End of file reservasiGrid.js */
/* Location: ./assets/js/app/view/reservasi/reservasiGrid.js */