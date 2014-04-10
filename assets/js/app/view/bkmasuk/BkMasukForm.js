/**
 * @author Isht Ae
 **/
Ext.define('GlApp.view.bkmasuk.BkMasukForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.bkmasuk.bkmasukform',
    itemId: 'bkmasukform',
    border: false,
    preventHeader: false,
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

        Ext.applyIf(me, {
            tbar: [
                {
                    xtype: 'button',
                    ui: 'orange-button',
                    text: 'Simpan',
                    iconCls: 'icon-btn-save',
                    itemId: 'BankMasukSave'
                },
                '-',
                {
                    xtype: 'button',
                    ui: 'orange-button',
                    text: 'Cetak',
                    iconCls: 'icon-btn-print',
//                    action: 'BankMasukPrint'
                },
                '-',
                {
                    xtype: 'button',
                    ui: 'orange-button',
                    text: 'Baru',
                    iconCls: 'icon-btn-add',
                    itemId: 'BankMasukNew'
                },
                '-',
                {
                    xtype: 'button',
                    ui: 'orange-button',
                    text: 'Hapus',
                    iconCls: 'icon-btn-delete',
                    itemId: 'BankMasukDelete'
                }
            ],
            items: [
                {
                    xtype: 'textfield',
                    fieldLabel: 'Form ID ',
                    name: 'formId',
                    value: 'bankmasuk',
                    hidden: true,
                    allowBlank: false,
                    readOnly: true
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'ID Trans ',
                    name: 'id',
                    hidden: true
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
                    fieldLabel: 'Pilih Bank ',
                    name: 'kas_bank',
                    hidden: false,
                    triggerAction: 'all',
                    minChars: 2,
                    store: 'bkmasuk.BankFormStore',
                    displayField: 'bank_alias',
                    valueField: 'id',
                    emptyText: 'Pilih Bank',
                    listeners: {
                        afterrender: function(combo, rec, eOpt) {
                            var store = combo.getStore();

                            store.clearFilter(true);
                            store.filter('bank_cabang', CABANG_ID);
                        }
                    }
                },
                {
                    xtype: 'comboboxedit',
                    fieldLabel: 'Keperluan ',
                    name: 'kas_grpkeperluan',
                    hidden: false,
                    triggerAction: 'all',
                    minChars: 2,
                    store: 'bkmasuk.GrkBmStore',
                    readOnly: false,
                    displayField: 'grk_name',
                    valueField: 'id',
                    emptyText: 'Pilih...',
                    listeners: {
                        afterrender: function(combo, rec, eOpt) {
                            var store = combo.getStore();

                            store.clearFilter(true);
                            store.filter("form_id", "bankmasuk");
                        },
                        select: function(combo, rec, eOpt) {
                            var store = this.up('form').getForm().findField('kas_dtlkeperluan').getStore();
                            this.up('form').getForm().findField('kas_dtlkeperluan').show();
                            this.up('form').getForm().findField('kas_dtlkeperluan').setReadOnly(false);
                            this.up('form').getForm().findField('kas_dtlkeperluan').reset();
                            store.clearFilter(true);
                            store.filter('kp_id', combo.getValue());
                            store.load();
                        }
                    },
                    onTrigger2Click: function() {
                        var win = Ext.widget('bkmasuk.bkgroupkpwin');
                    }
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Detail Keperluan ',
                    name: 'kas_dtlkeperluan',
                    readOnly: true,
                    triggerAction: 'all',
                    minChars: 2,
                    store: 'bkmasuk.ListAkunGkStore',
                    displayField: 'akun_name',
                    valueField: 'id',
                    emptyText: 'Pilih...',
//                    listeners: {
//                        select: function() {
//                            var val = this.getValue();
//
//                            //CREATE CUSTOM FIELD IF NEEDED
//                            var form = this.up('form').down('#containerCustomBkm');
//                            for (var i = 0; i < 10; i++) {
//                                if (Ext.getCmp('trxBkm' + i)) {
//                                    form.remove(Ext.getCmp('trxBkm' + i));
//                                    form.doLayout();
//                                }
//                            }
//                            Ext.Ajax.request({
//                                url: BASE_PATH + 'akun/kep_check',
//                                method: 'POST',
//                                params: {data: val},
//                                scope: this,
//                                callback: function(options, success, response) {
//                                    var resp = Ext.decode(response.responseText);
//
//                                    if (resp.success === 'true') {
//                                        for (var i in resp.data) {
//                                            if (resp.data[i].fieldType == 'combobox') {
//                                                var storeNya = resp.data[i].storeName;
//
//                                                var field = new Ext.ux.form.ComboGrid({
//                                                    id: 'trxBkm' + i,
//                                                    fieldLabel: resp.data[i].fieldLabel + ' ',
//                                                    name: resp.data[i].fieldName,
//                                                    matchFieldWidth: false,
//                                                    displayField: 'valueData',
//                                                    valueField: 'id',
//                                                    renderer: 'uppercase',
//                                                    queryMode: 'remote',
//                                                    store: storeNya,
//                                                    minChars: 2,
//                                                    triggerAction: 'all',
//                                                    allowBlank: false,
//                                                    disabled: false,
//                                                    listConfig: {
//                                                        width: 400,
//                                                        height: 50,
//                                                        border: true,
//                                                        viewConfig: {
//                                                            // /autoScroll: true,
//                                                            emptyText: 'Tidak ada data',
//                                                            deferEmptyText: false
//                                                        },
//                                                        columns: [
//                                                            {
//                                                                xtype: 'gridcolumn',
//                                                                width: 150,
//                                                                header: 'No ',
//                                                                dataIndex: 'valueData'
//                                                            },
//                                                            {
//                                                                xtype: 'gridcolumn',
//                                                                width: 250,
//                                                                header: 'Nama / Alamat',
//                                                                dataIndex: 'displayData'
//                                                            }
//                                                        ]
//                                                    }
//                                                });
//                                            } else {
//                                                var field = new Ext.form.TextField({
//                                                    id: 'trxBkm' + i,
//                                                    fieldLabel: resp.data[i].fieldLabel + ' ',
//                                                    name: resp.data[i].fieldName
//                                                });
//                                            }
//                                            form.add(field);
//                                            form.doLayout();
//                                        }
//                                    } else {
//                                        for (var i = 0; i < 10; i++) {
//                                            if (Ext.getCmp('trxBkm' + i)) {
//                                                form.remove(Ext.getCmp('trxBkm' + i));
//                                                form.doLayout();
//                                            }
//                                        }
//                                    }
//                                }
//                            });
//
//                            //END CUSTOM FIELD
//                        }
//                    }
                },
                //IF CUSTOM FIELD
                {
                    xtype: 'fieldcontainer',
                    layout: 'vbox',
                    width: 300,
                    hidden: false,
                    itemId: 'containerCustomBkm',
                    items: [
                    ]
                },
                Ext.create('Ext.ux.form.NumericField', {
                    fieldLabel: 'Nominal ',
                    name: 'kas_jumlah',
                    decimalPrecision: 2,
                    decimalSeparator: ',',
                    alwaysDisplayDecimals: true,
                    allowNegative: false,
                    minValue: 0, //prevents negative numbers
                    // Remove spinner buttons, and arrow key and mouse wheel listeners
                    hideTrigger: true,
                    keyNavEnabled: false,
                    mouseWheelEnabled: false,
                    allowBlank: false,
                    readOnly: false,
                    hidden: false
                }),
                //SHOW THIS IF USING BG
                {
                    xtype: 'textfield',
                    fieldLabel: 'No BG ',
                    name: 'noBg',
                    readOnly: false,
                    hidden: false,
                    allowBlank: false
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Nama Bank ',
                    name: 'kas_bankbg',
                    readOnly: false,
                    hidden: false,
                    allowBlank: false
                },
                {
                    xtype: 'datefield',
                    fieldLabel: 'Jth Tempo BG ',
                    name: 'kas_bged',
                    format: 'd/M/Y',
                    submitFormat: 'Y-m-d',
                    emptyText: 'Pilih tanggal',
                    allowBlank: false,
                    hidden: false
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Penerima ',
                    name: 'kas_namabayar',
                    readOnly: false,
                    hidden: false,
                    allowBlank: false
                },
                //Field TTD
                {
                    xtype: 'fieldcontainer',
                    width: 300,
                    layout: 'hbox',
                    hidden: true,
                    items: [
                        {
                            html: 'Tanda Tangan :',
                            border: false,
                            width: 113,
                            bodyStyle: FORM_BG,
                            padding: '3 0 0 27',
                            align: 'right'
                        },
                        {
                            xtype: 'button',
                            ui: 'orange-button',
                            iconCls: 'icon-btn-search',
                            text: 'Ambil TTD',
                            margins: '0 0 0 2',
//                            handler: function() {
//                                var win = new Ext.widget('newwindow', {
//                                    title: 'Capture TTD',
//                                    width: 332,
//                                    closable: false,
//                                    buttons: [
//                                        {
//                                            text: 'Batal',
//                                            iconCls: 'icon-btn-cross',
//                                            handler: function() {
//                                                Ext.Ajax.request({
//                                                    url: BASE_PATH + 'data/clear_data_sign_img/signNullBmk',
//                                                    scope: this,
//                                                    callback: function(options, success, response) {
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
//                                            handler: function() {
//                                                this.up('window').destroy();
//                                                Ext.getCmp('imageTtdBmk').setSrc(BASE_URL + 'assets/img_data/signNullBmk.png');
//                                                console.log('Simpan upload untuk bank keluar');
//                                            }
//                                        }
//                                    ]
//                                });
//
//                                var form = new Ext.widget('app2formbmk');
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
                    items: [
                        {
                            html: 'Preview : ',
                            border: false,
                            width: 113,
                            bodyStyle: FORM_BG,
                            padding: '3 0 0 61',
                            align: 'right'
                        },
                        Ext.create('Ext.Img', {
                            baseCls: 'imagefieldthumb',
//                            src: BASE_PATH + 'assets/img_data/signBlank.png',
                            id: 'imageTtdBmk',
//                            itemId: 'imageTtdBmk'
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