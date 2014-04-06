/**
 * @author Isht Ae
 **/
Ext.define('GlApp.view.dvtxpengadaan.DvTxPengadaanForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.dvtxpengadaan.dvtxpengadaanform',
    itemId: 'dvtxpengadaanform',
    border: false,
    bodyStyle: FORM_BG,
    bodyPadding: 10,
    buttonAlign: 'right',
    fieldDefaults: {
        width: 300,
        labelAlign: 'right',
        labelWidth: 115,
        msgTarget: 'side'
    },
    autoScroll: true,
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            tbar: [
                {
                    xtype: 'button',
                    text: 'Simpan',
                    ui: 'blue-button',
                    iconCls: 'icon-btn-save',
//                    action: 'dvtxpengSave'
                },
                {
                    xtype: 'button',
                    text: 'Baru',
                    ui: 'blue-button',
                    iconCls: 'icon-btn-add',
//                    action: 'dvtxpengNew'
                },
                {
                    xtype: 'button',
                    text: 'Hapus',
                    ui: 'blue-button',
                    iconCls: 'icon-btn-delete',
//                    action: 'dvtxDelete'
                }
            ],
            items: [
                {
                    xtype: 'textfield',
                    fieldLabel: 'Id ',
                    hidden: true,
                    fieldCls: 'x-item-readonly',
                    name: 'idPengadaan'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'No Pengadaan ',
                    readOnly: true,
                    name: 'noPeng',
                    fieldCls: 'x-item-readonly',
                    allowBlank: false
                },
                {
                    xtype: 'datefield',
                    fieldLabel: 'Tanggal ',
                    name: 'tglTransaksi',
                    format: 'd/M/Y',
                    submitFormat: 'Y-m-d',
                    value: new Date(),
                    allowBlank: false
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Divisi ',
                    name: 'divisi',
                    triggerAction: 'all',
                    hideTrigger: false,
                    queryMode: 'remote',
                    minChars: 2,
                   store: 'dvtxpengadaan.DivisiStore',
                    displayField: 'divisiName',
                    valueField: 'divisiId',
                    emptyText: 'Pilih Divisi',
                    allowBlank: false,
                    matchFieldWidth: false,
                    listConfig: {
                        minWidth: 185
                    },
//                    listeners: {
//                        'afterrender': function(cmb, rec, opt) {
//                            cmb.getStore().load();
//                            cmb.setValue(parseInt(userDivisi));
//                            cmb.setReadOnly(true);
//                            
//                            var store = cmb.up('form').getForm().findField('pengBarang').getStore(),
//                                filterCollection = [];
//
//                            var statusFilter = new Ext.util.Filter({
//                                property: 'mi_inv_stat=ww',
//                                value: 0
//                            });
//                            filterCollection.push(statusFilter);
//
//                            store.clearFilter(true);
//                            store.filter(filterCollection);
//                        }
//                    }
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
                   store: 'dvtxpengadaan.ItemStore',
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
//                    listeners: {
//                        select: function (cmb, rec, opt) {
//                            var pengGolongan = this.up('form').getForm().findField('golName');
//                            var pengMerk = this.up('form').getForm().findField('pengMerk');
//                            var pengKatalog = this.up('form').getForm().findField('pengKatalog');
//                            var pengKemasan = this.up('form').getForm().findField('pengKemasan'),
//                                store = pengKemasan.getStore();
//
//                            var val = cmb.getValue(),
//                                data = cmb.findRecordByValue(val);
//
//                            pengGolongan.setValue(data.get('itemParentName'));
//                            pengMerk.setValue(data.get('itemMerkName'));
//                            pengKatalog.setValue(data.get('itemCatalog'));
//
//                            pengKemasan.clearValue();
//                            var filterCollection = [];
//
//                            var statusFilter = new Ext.util.Filter({
//                                property: 'item_id',
//                                value: this.getValue()
//                            });
//                            filterCollection.push(statusFilter);
//
//                            var statusPo = new Ext.util.Filter({
//                                property: 'set_use',
//                                value: 1
//                            });
//                            filterCollection.push(statusPo);
//
//                            store.clearFilter(true);
//                            store.filter(filterCollection);
//
//                            this.up('form').down('#pengNewItem').enable();
//
//                            this.up('form').getForm().findField('golName').show();
//                            this.up('form').getForm().findField('pengMerk').show();
//                            this.up('form').getForm().findField('pengKatalog').show();
//                            this.up('form').getForm().findField('pengKemasan').show();
//                            this.up('form').getForm().findField('qtyBarang').show();
//                            this.up('form').getForm().findField('tglKebutuhan').show();
//                        }
//                    }
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Golongan ',
                    name: 'golName',
                    hidden: true,
                    readOnly: true,
                    fieldCls: 'x-item-readonly'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Merk ',
                    name: 'pengMerk',
                    hidden: true,
                    readOnly: true,
                    fieldCls: 'x-item-readonly'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'No Katalog ',
                    name: 'pengKatalog',
                    hidden: true,
                    readOnly: true,
                    fieldCls: 'x-item-readonly'
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Kemasan ',
                    name: 'pengKemasan',
                    hidden: true,
                    triggerAction: 'all',
                    mode: 'remote',
//                    store: 'KemasanStore',
                    displayField: 'kemasan_kecil',
                    valueField: 'id',
                    forceSelection: true,
                    matchFieldWidth: false,
                    emptyText: 'pilih kemasan',
                    listConfig: {
                        shadow: 'side',
                        minWidth: 180
                    }
                },
                {
                    xtype: 'numberfield',
                    width: 160,
                    name: 'qtyBarang',
                    hidden: true,
                    fieldLabel: 'Qty ',
                    allowNegative: false,
                    minValue: 0,
                    hideTrigger: true,
                    keyNavEnabled: false,
                    mouseWheelEnabled: false,
                    allowBlank: true
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
                    xtype: 'textareafield',
                    height: 40,
                    fieldLabel: 'Keterangan ',
                    disable: true,
                    name: 'ket_barang'
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
                            itemId: 'pengNewItem',
                            ui: 'blue-button',
                            disabled: true,
                            text: 'Tambah',
                            margins: '0 0 0 10',
//                            action: 'divpengNewItem'
                        }
                    ]
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Jenis Pengadaan ',
                    emptyText: 'Pilih',
                    displayField: 'type',
                    valueField: 'typeCode',
                    queryMode: 'local',
                    name: 'jenisPeng',
                    forceSelection: true,
                    hidden: true,
                    typeAhead: true,
                    allowBlank: false,
                    valueNotFoundText: 'Tidak ada Data',
                    store: new Ext.data.SimpleStore({
                        id: 0,
                        fields: [
                            'typeCode', //numeric value is the key
                            'type' //the text value is the value
                        ],
                        data: [
                            ['0', 'Pusat'],
                            ['1', 'Cabang']
                        ]
                    }),
                    value: '0'
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
                    xtype: 'fieldcontainer',
                    width: 300,
                    layout: 'hbox',
                    hidden: true,
                    items: [
                        {
                            html: 'Tanda Tangan :',
                            border: false,
                            width: 110,
                            bodyStyle: FORM_BG,
                            padding: '3 0 0 23',
                            align: 'right'
                        },
                        {
                            xtype: 'button',
                            iconCls: 'icon-btn-search',
                            text: 'Ambil TTD',
                            margins: '0 0 0 5',
//                            handler: function () {
//                                var win = new Ext.widget('newwindow', {
//                                    title: 'Capture TTD',
//                                    width: 332,
//                                    closable: false,
//                                    buttons: [
//                                        {
//                                            text: 'Batal',
//                                            iconCls: 'icon-btn-cross',
//                                            handler: function () {
//                                                Ext.Ajax.request({
//                                                    url: BASE_PATH + 'data/clear_data_sign_img/signNullPO',
//                                                    scope: this,
//                                                    callback: function (options, success, response) {
//                                                        var resp = Ext.decode(response.responseText);
//
//                                                        if (resp.success === 'true') {
//                                                            this.up('window').destroy();
//                                                        }
//                                                    }
//                                                });
//                                            }
//                                        },
//                                        {
//                                            text: 'Simpan',
//                                            handler: function () {
//                                                this.up('window').destroy();
//                                                Ext.getCmp('imageTtdPO').setSrc(BASE_URL + 'assets/img_data/signNullPO.png');
//                                                console.log('Simpan upload untuk kas keluar');
//                                            }
//                                        }
//                                    ]
//                                });
//
//                                var form = new Ext.widget('app2formpo');
//                                win.add(form);
//                                win.show();
//                            }
                        }
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    width: 300,
                    layout: 'hbox',
                    hidden: true,
                    margins: '-10 0 0 0',
                    items: [
                        {
                            html: 'Preview : ',
                            border: false,
                            width: 110,
                            bodyStyle: FORM_BG,
                            padding: '3 0 0 57',
                            align: 'right'
                        },
                        Ext.create('Ext.Img', {
                            margins: '0 0 0 5',
                            baseCls: 'imagefieldthumb',
//                            src: BASE_PATH + 'assets/img_data/signBlank.png'
//                            id: 'imageTtdPO'
                        })
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }
});

/* End of file reservasiForm.js */
/* Location: ./assets/js/app/view/reservasi/reservasiForm.js */