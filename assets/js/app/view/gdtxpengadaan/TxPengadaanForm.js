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
            items: [
                {
                    xtype: 'numberfield',
                    fieldLabel: 'Id ',
                    name: 'id',
                    itemId: 'id',
                    hidden: true,
                    readOnly: true,
                    value: 0
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'No Pengadaan ',
                    readOnly: true,
                    name: 'no_pengadaan',
                    itemId: 'no_pengadaan',
                    fieldCls: 'x-item-readonly',
                    allowBlank: true
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
                    name: 'barang_id',
                    itemId: 'barang_id',
                    allowBlank: true,
                    triggerAction: 'query',
                    hideTrigger: true,
                    mode: 'remote',
                    minChars: 2,
                    store: 'gdtxpengadaan.BarangStore',
                    displayField: 'mi_name',
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
                        select: function(cmb, rec, opt) {
                            var store = form.down('#peng_kemasan').getStore();

                            var val = cmb.getValue(),
                                    data = cmb.findRecordByValue(val);

                            form.down('#barang_gol').setValue(data.get('mi_parent_name'));
                            form.down('#barang_merk').setValue(data.get('mi_merk_name'));
                            form.down('#barang_katalog').setValue(data.get('mi_katalog'));

                            form.down('#peng_kemasan').clearValue();
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
                        }
                    }
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Golongan ',
                    name: 'barang_gol',
                    itemId: 'barang_gol',
                    hidden: false,
                    readOnly: true,
                    fieldCls: 'x-item-readonly'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Merk ',
                    name: 'barang_merk',
                    itemId: 'barang_merk',
                    hidden: false,
                    readOnly: true,
                    fieldCls: 'x-item-readonly'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'No Katalog ',
                    name: 'barang_katalog',
                    itemId: 'barang_katalog',
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
                            name: 'peng_qty',
                            itemId: 'peng_qty',
                            hidden: false,
                            fieldLabel: 'Qty ',
                            allowNegative: false,
                            minValue: 1,
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
                            allowBlank: true,
                            listeners: {
                                blur: function() {
                                    if(this.getValue() > 0) {
                                        form.down('#pengNewItem').enable();
                                    }
                                }
                            }
                        },
                        {
                            xtype: 'combobox',
                            name: 'peng_kemasan',
                            itemId: 'peng_kemasan',
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
                    name: 'tgl_butuh',
                    hidden: false,
                    format: 'd/M/Y',
                    submitFormat: 'Y-m-d',
                    value: new Date(),
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
                                    margin: '2 0 0 0'
                                },
                                {
                                    xtype: 'tbtext',
                                    text: ':',
                                    width: 5
                                },
                                {
                                    xtype: 'tbtext',
                                    text: 'keterangan'
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
                                    margin: '2 0 0 0'
                                },
                                {
                                    xtype: 'tbtext',
                                    text: ':',
                                    width: 5
                                },
                                {
                                    xtype: 'tbtext',
                                    text: 'keterangan'
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
                                    margin: '2 0 0 0'
                                },
                                {
                                    xtype: 'tbtext',
                                    text: ':',
                                    width: 5
                                },
                                {
                                    xtype: 'tbtext',
                                    text: 'keterangan'
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
                                    margin: '2 0 0 0'
                                },
                                {
                                    xtype: 'tbtext',
                                    text: ':',
                                    width: 5
                                },
                                {
                                    xtype: 'tbtext',
                                    text: 'keterangan'
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
                                    margin: '2 0 0 0'
                                },
                                {
                                    xtype: 'tbtext',
                                    text: ':',
                                    width: 5
                                },
                                {
                                    xtype: 'tbtext',
                                    text: 'keterangan'
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
                                    margin: '2 0 0 0'
                                },
                                {
                                    xtype: 'tbtext',
                                    text: ':',
                                    width: 5
                                },
                                {
                                    xtype: 'tbtext',
                                    text: 'keterangan'
                                }
                            ]
                        }
                    ]
                }
            ]
        });
        me.callParent(arguments);
    },
    listeners: {
        afterrender: function() {
            this.saved = true;
        }
    }
});

/* End of file reservasiForm.js */
/* Location: ./assets/js/app/view/reservasi/reservasiForm.js */