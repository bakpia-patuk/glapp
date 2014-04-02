/**
 * @author Isht Ae
 **/

Ext.define('GlApp.view.kskeluar.GetKsKeluar', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.kskeluar.getkskeluar',
    itemId: 'getkskeluar',
    bodyPadding: '2 0 0 0',
    border: false,
    layout: 'border',
    defaults: {
        split: true
    },
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            items: [
                Ext.create(Ext.tab.Panel, {
                    region: 'center',
                    deferredRender: false,
                    plain: true,
                    ui: 'green-tab',
                    activeTab: 0,
                    itemId: 'kskeluartab',
                    items: [
                        {
                            xtype: 'panel',
                            title: 'DATA FAKTUR',
                            layout: 'border',
                            itemId: 'tespanel1',
                            name: 'TesPanel1',
                            border: false,
                            bodyPadding: '2 0 0 0',
                            defaults: {
                                border: true,
                                ui: 'green-panel',
                                split: true
                            },
                            tbar: [
                                '->',
                                {
                                    iconCls: 'icon-btn-refresh',
                                    text: 'Refresh',
                                    itemId: 'FakturRefresh'
                                }
                            ],
                            items:[
                                {
                                    region: 'center',
                                    xtype: 'kskeluar.listfaktur'
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            title: 'DATA PERMINTAAN',
                            layout: 'border',
                            border: false,
                            itemId: 'tespanel2',
                            name: 'TesPanel2',
                            bodyPadding: '2 0 0 0',
                            defaults: {
                                border: true,
                                ui: 'green-panel',
                                split: true
                            },
                            tbar: [
                                '->',
                                {
                                    iconCls: 'icon-btn-refresh',
                                    text: 'Refresh',
                                    itemId: 'ListMkRefresh',
                                }
                            ],
                            items:[
                                {
                                    region: 'center',
                                    xtype: 'kskeluar.listmintabayar'
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            title: 'DAFTAR KAS KELUAR',
                            layout: 'border',
                            itemId: 'tespanel3',
                            name: 'TesPanel4',
                            border: false,
                            bodyPadding: '2 0 0 0',
                            defaults: {
                                border: true,
                                ui: 'green-panel',
                                split: true
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
                                    itemId: 'datestarkk',
                                    format: 'd/M/Y',
                                    submitFormat: 'Y-m-d',
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
                                    itemId: 'dateendkk',
                                    format: 'd/M/Y',
                                    submitFormat: 'Y-m-d',
                                },
                                {
                                    xtype: 'combobox',
                                    itemId: 'cabangkk',
                                    width: 150,
                                    emptyText: 'Pilih cabang',
                                    displayField: 'cabang_alias',
                                    valueField: 'id',
                                    queryMode: 'remote',
                                    allowBlank: true,
                                    triggerAction: 'all',
                //                    hidden: userCabang == 14 ? false : true,
                //                    valueNotFoundText: 'Tidak ada Data',
                                    store: 'kskeluar.CabangStore',
                                },
                                {
                                    xtype: 'button',
                                    ui: 'green-button',
                                    text: 'Cari',
                                    itemId: 'KasKeluarSearch',
                                    iconCls: 'icon-btn-refresh',
                                },
                                '->',
                                {
                                    xtype: 'button',
                                    ui: 'green-button',
                                    text: 'Refresh',
                                    itemId: 'KasKeluarRefresh',
                                    iconCls: 'icon-btn-refresh',
                                },
                                {
                                    xtype: 'button',
                                    ui: 'green-button',
                                    text: 'Clear',
                                    iconCls: 'icon-btn-clear',
                //                    handler: function() {
                //                        this.up('grid').down('#dateStartKk').setValue('');
                //                        this.up('grid').down('#dateEndKk').setValue('');
                //                        this.up('grid').down('#cabangKkmFilter').setValue('');
                //                        var store = this.up('grid').getStore(),
                //                            filterCollection = [];
                //
                //                        var filter2 = new Ext.util.Filter({
                //                            property: 'kas_type',
                //                            value: 'kaskeluar'
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
                            items:[
                                {
                                    region: 'center',
                                    xtype: 'kskeluar.kskeluargrid'
                                }
                            ]
                            
                        },
                        {
                            xtype: 'panel',
                            title: 'DATA RUJUKAN',
                            layout: 'border',
                            itemId: 'tespanel4',
                            name: 'TesPanel4',
                            border: false,
                            bodyPadding: '2 0 0 0',
                            defaults: {
                                border: true,
                                ui: 'green-panel',
                                split: true
                            },
                            tbar: [
                                {
                                    xtype: 'tbtext',
                                    text: '<strong>Filter :</strong>'
                                },
                                {
                                    xtype: 'datefield',
                                    width: 130,
                                    fieldLabel: 'Tgl. Awal',
                                    emptyText: 'Tgl Awal',
                                    hideLabel: true,
                                    name: 'dateStartDr',
                                    itemId: 'datestartdr',
                                    format: 'd/M/Y',
                                    submitFormat: 'Y-m-d'
                                },
                                {
                                    xtype: 'tbtext',
                                    text: '<small>s/d</small>'
                                },
                                {
                                    xtype: 'datefield',
                                    width: 130,
                                    fieldLabel: 'Tgl. Akhir',
                                    emptyText: 'Tgl Akhir',
                                    hideLabel: true,
                                    name: 'dateEndDr',
                                    itemId: 'dateenddr',
                                    format: 'd/M/Y',
                                    submitFormat: 'Y-m-d'
                                },
                                {
                                    xtype: 'textfield',
                                    emptyText: 'Nama Pemeriksaan',
                                    itemId: 'drperiksa'
                                },
                                {
                                    xtype: 'button',
                                    cls: 'searchBtn',
                                    text: 'Cari',
                                    iconCls: 'icon-btn-search',
                                    itemId: 'DataRujukanSearch'
                                },
                                '->',
                                {
                                    xtype: 'button',
                                    cls: 'searchBtn',
                                    text: 'Refresh',
                                    iconCls: 'icon-btn-search',
                                    action: 'DataRujukanRefresh'
                                }
                            ],
                            items:[
                                {
                                    region: 'center',
                                    xtype: 'kskeluar.datarujukangrid'
                                }
                            ]
                        }
                    ]
                }),
                {
                    region: 'west',
                    width: 325,
                    minWidth: 325,
                    title: 'FORM KAS KELUAR',
                    border: true,
                    ui: 'green-panel',
                    collapsible: true,
                    layout: 'fit',
                    items: [
                        {
                            xtype: 'kskeluar.kskeluarform'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }
});
/* End of file getReservasi.js */
/* Location: ./assets/js/app/view/reservasi/getResrevasi.js */