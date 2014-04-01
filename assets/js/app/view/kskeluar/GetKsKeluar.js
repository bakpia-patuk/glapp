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
                            border: false,
                            bodyPadding: '2 0 0 0',
                            defaults: {
                                border: true,
                                ui: 'blue-panel',
                                split: true
                            },
                            tbar: [

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
                            bodyPadding: '2 0 0 0',
                            defaults: {
                                border: true,
                                ui: 'blue-panel',
                                split: true
                            },
                            tbar: [

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
                            border: false,
                            bodyPadding: '2 0 0 0',
                            defaults: {
                                border: true,
                                ui: 'blue-panel',
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
                                    itemId: 'dateStartKk',
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
                                    itemId: 'dateEndKk',
                                    format: 'd/M/Y',
                                    submitFormat: 'Y-m-d',
                                },
                                {
                                    xtype: 'combobox',
                                    itemId: 'cabangKkFilter',
                                    width: 150,
                                    emptyText: 'Pilih cabang',
                                    displayField: 'cabangName',
                                    valueField: 'id',
                                    queryMode: 'remote',
                                    allowBlank: true,
                                    triggerAction: 'all',
                //                    hidden: userCabang == 14 ? false : true,
                //                    valueNotFoundText: 'Tidak ada Data',
                //                    store: 'CabangStore',
                                },
                                '->',
                                {
                                    xtype: 'button',
                                    ui: 'blue-button',
                                    iconCls: 'icon-btn-refresh',
                                },
                                {
                                    xtype: 'button',
                                    ui: 'blue-button',
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
                            border: false,
                            bodyPadding: '2 0 0 0',
                            defaults: {
                                border: true,
                                ui: 'blue-panel',
                                split: true
                            },
                            tbar: [

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