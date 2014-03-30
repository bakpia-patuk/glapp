/**
 * @author Isht Ae
 **/
Ext.define('GlApp.view.gdtxpengadaan.TxPengadaanForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.gdtxpengadaan.txpengadaanform',
    itemId: 'txpengadaanform',
    border: false,
    bodyStyle: FORM_BG,
    bodyPadding: 10,
    buttonAlign: 'right',
    fieldDefaults: {
        width: 300,
        labelAlign: 'right',
        labelWidth: 110,
        msgTarget: 'side'
    },
    autoScroll: true,
    initComponent: function() {
        var me = this;

        var form = me;

        Ext.applyIf(me, {
//            tbar: [
//                {
//                    xtype: 'button',
//                    text: 'SIMPAN',
//                    ui: 'blue-button',
//                    iconCls: 'icon-btn-save',
//                    action: 'suppSave'
//                },
//                {
//                    xtype: 'button',
//                    disabled: false,
//                    text: 'BARU',
//                    ui: 'blue-button',
//                    iconCls: 'icon-btn-add',
//                    action: 'suppNew'
//                },
//                {
//                    xtype: 'button',
//                    disabled: false,
//                    text: 'HAPUS',
//                    ui: 'blue-button',
//                    iconCls: 'icon-btn-delete',
//                    action: 'suppDelete'
//                }
//            ],
            items: [
                {
                    xtype: 'numberfield',
                    fieldLabel: 'Id ',
                    hidden: true,
                    fieldCls: 'x-item-readonly',
                    value: 0,
                    name: 'id'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'No Pengadaan ',
                    readOnly: true,
                    name: 'no_pengadaan',
                    fieldCls: 'x-item-readonly',
                    allowBlank: false
                },
                {
                    xtype: 'datefield',
                    fieldLabel: 'Tanggal ',
                    name: 'tgl_trx',
                    format: 'd/M/Y',
                    submitFormat: 'Y-m-d',
                    value: new Date(),
                    allowBlank: false
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Barang ',
                    name: 'pengBarang',
                    allowBlank: true,
                    triggerAction: 'query',
                    hideTrigger: true,
                    mode: 'remote',
                    minChars: 2,
//                    store: 'ItemStore',
                    displayField: 'itemName',
                    valueField: 'id',
                    forceSelection: true,
                    valueNotFoundText: 'Tidak ada barang',
                    emptyText: 'ketik nama barang',
                    matchFieldWidth: false,
                    listConfig: {
                        shadow: 'side',
                        minWidth: 185
                    },
                    listeners: {
                        afterrender: function(cmb, rec, opt) {
//                            cmb.getStore().clearFilter(true);
//                            cmb.getStore().filter('mi_child_stat', 1);
                        },
                        select: function(cmb, rec, opt) {
                            var pengGolongan = this.up('form').getForm().findField('golName');
                            var pengMerk = this.up('form').getForm().findField('pengMerk');
                            var pengKatalog = this.up('form').getForm().findField('pengKatalog');
                            var pengKemasan = this.up('form').getForm().findField('pengKemasan'),
                                    store = pengKemasan.getStore();

                            var val = cmb.getValue(),
                                    data = cmb.findRecordByValue(val);

                            pengGolongan.setValue(data.get('itemParentName'));
                            pengMerk.setValue(data.get('itemMerkName'));
                            pengKatalog.setValue(data.get('itemCatalog'));

                            pengKemasan.clearValue();
                            var filterCollection = [];

                            var statusFilter = new Ext.util.Filter({
                                property: 'item_id',
                                value: this.getValue()
                            });
                            filterCollection.push(statusFilter);

                            var statusPo = new Ext.util.Filter({
                                property: 'set_use',
                                value: 1
                            });
                            filterCollection.push(statusPo);

                            store.clearFilter(true);
                            store.filter(filterCollection);

                            this.up('form').down('#pengNewItem').enable();

                            this.up('form').getForm().findField('golName').show();
                            this.up('form').getForm().findField('pengMerk').show();
                            this.up('form').getForm().findField('pengKatalog').show();
                            this.up('form').getForm().findField('pengKemasan').show();
                            this.up('form').getForm().findField('qtyBarang').show();
                            this.up('form').getForm().findField('tglKebutuhan').show();
                        }
                    }
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Golongan ',
                    name: 'golName',
                    hidden: false,
                    readOnly: true,
                    fieldCls: 'x-item-readonly'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Merk ',
                    name: 'pengMerk',
                    hidden: false,
                    readOnly: true,
                    fieldCls: 'x-item-readonly'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'No Katalog ',
                    name: 'pengKatalog',
                    hidden: false,
                    readOnly: true,
                    fieldCls: 'x-item-readonly'
                },
                {
                    xtype: 'fieldcontainer',
                    width: 300,
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'numberfield',
                            width: 160,
                            name: 'qtyBarang',
                            hidden: false,
                            fieldLabel: 'Qty ',
                            allowNegative: false,
                            minValue: 0,
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
                            allowBlank: true
                        },
                        {
                            xtype: 'combobox',
                            name: 'pengKemasan',
                            hidden: false,
                            margin: '0 0 0 5',
                            width: 135,
                            triggerAction: 'all',
                            mode: 'remote',
//                    store: 'KemasanStore',
                            displayField: 'kemasan_nama',
                            valueField: 'id',
                            forceSelection: true,
                            matchFieldWidth: false,
                            emptyText: 'pilih kemasan',
                            listConfig: {
                                shadow: 'side',
                                minWidth: 180
                            }
                        }
                    ]
                },
                {
                    xtype: 'datefield',
                    fieldLabel: 'Tgl Kebutuhan ',
                    name: 'tglKebutuhan',
                    hidden: true,
                    format: 'd/M/Y',
                    submitFormat: 'Y-m-d',
                    allowBlank: true
                },
                {
                    xtype: 'fieldcontainer',
                    width: 300,
                    layout: 'hbox',
                    items: [
                        {
                            html: '',
                            border: false,
                            width: 110,
                            bodyStyle: FORM_BG,
                            padding: '3 0 0 23',
                            align: 'right'
                        },
                        {
                            xtype: 'button',
                            iconCls: 'icon-btn-add',
                            ui: 'orange-button',
                            itemId: 'pengNewItem',
                            disabled: true,
                            text: 'Tambah',
                            margins: '0 0 0 5',
                            action: 'pengNewItem'
                        }
                    ]
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Petugas ',
                    name: 'petugas',
                    value: USER_NAME,
                    emptyText: 'auto generate',
                    readOnly: true,
                    fieldCls: 'x-item-readonly'
                },
                {
                    xtype: 'fieldset',
                    margin: '40 0 0 0',
//                    padding: '10 5',
                    width: 300,
                    title: 'Keterangan Warna',
                    itemId: 'rekapAnggaran',
                    layout: 'anchor',
                    fieldDefaults: {
                        anchor: '100%'
                    },
                    collapsed: false,
                    items: [
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            width: 280,
                            items: [
                                {
                                    xtype: 'tbtext',
//                                    text: '<img src='+ BASE_PATH +'assets/img/ket_warna/0000FF.PNG'+'>',
                                    width: 100,
                                    padding: '0 0 0 80',
                                    margin: '2 0 0 0',
                                },
                                {
                                    xtype: 'tbtext',
                                    text: ':',
                                    width: 5,
                                },
                                {
                                    xtype: 'tbtext',
                                    text: 'keterangan',
                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            width: 280,
                            items: [
                                {
                                    xtype: 'tbtext',
//                                    text: '<img src='+ BASE_PATH +'assets/img/ket_warna/48ff00.PNG'+'>',
                                    width: 100,
                                    padding: '0 0 0 80',
                                    margin: '2 0 0 0',
                                },
                                {
                                    xtype: 'tbtext',
                                    text: ':',
                                    width: 5,
                                },
                                {
                                    xtype: 'tbtext',
                                    text: 'keterangan',
                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            width: 280,
                            items: [
                                {
                                    xtype: 'tbtext',
//                                    text: '<img src='+ BASE_PATH +'assets/img/ket_warna/808080.PNG'+'>',
                                    width: 100,
                                    padding: '0 0 0 80',
                                    margin: '2 0 0 0',
                                },
                                {
                                    xtype: 'tbtext',
                                    text: ':',
                                    width: 5,
                                },
                                {
                                    xtype: 'tbtext',
                                    text: 'keterangan',
                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            width: 280,
                            items: [
                                {
                                    xtype: 'tbtext',
//                                    text: '<img src='+ BASE_PATH +'assets/img/ket_warna/be03c1.PNG'+'>',
                                    width: 100,
                                    padding: '0 0 0 80',
                                    margin: '2 0 0 0',
                                },
                                {
                                    xtype: 'tbtext',
                                    text: ':',
                                    width: 5,
                                },
                                {
                                    xtype: 'tbtext',
                                    text: 'keterangan',
                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            width: 280,
                            items: [
                                {
                                    xtype: 'tbtext',
//                                    text: '<img src='+ BASE_PATH +'assets/img/ket_warna/ce7f00.PNG'+'>',
                                    width: 100,
                                    padding: '0 0 0 80',
                                    margin: '2 0 0 0',
                                },
                                {
                                    xtype: 'tbtext',
                                    text: ':',
                                    width: 5,
                                },
                                {
                                    xtype: 'tbtext',
                                    text: 'keterangan',
                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            width: 280,
                            items: [
                                {
                                    xtype: 'tbtext',
//                                    text: '<img src='+ BASE_PATH +'assets/img/ket_warna/ff0000.PNG'+'>',
                                    width: 100,
                                    padding: '0 0 0 80',
                                    margin: '2 0 0 0',
                                },
                                {
                                    xtype: 'tbtext',
                                    text: ':',
                                    width: 5,
                                },
                                {
                                    xtype: 'tbtext',
                                    text: 'keterangan',
                                }
                            ]
                        }
                    ]
                }
            ]
        });
        me.callParent(arguments);
    }
});

/* End of file reservasiForm.js */
/* Location: ./assets/js/app/view/reservasi/reservasiForm.js */