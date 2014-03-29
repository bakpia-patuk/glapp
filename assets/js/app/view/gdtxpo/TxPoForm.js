/**
 * @author Isht Ae
 **/
Ext.define('GlApp.view.gdtxpo.TxPoForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.gdtxpo.txpoform',
    itemId: 'txpoform',
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
            tbar: [
                {
                    xtype: 'button',
                    text: 'SIMPAN',
                    ui: 'blue-button',
                    iconCls: 'icon-btn-save',
                    action: 'suppSave'
                },
                {
                    xtype: 'button',
                    disabled: false,
                    text: 'BARU',
                    ui: 'blue-button',
                    iconCls: 'icon-btn-add',
                    action: 'suppNew'
                },
                {
                    xtype: 'button',
                    disabled: false,
                    text: 'CETAK PO',
                    ui: 'blue-button',
                    iconCls: 'icon-btn-delete',
                    action: 'suppDelete'
                },
                {
                    xtype: 'button',
                    disabled: false,
                    text: 'KIRIM PDF',
                    ui: 'blue-button',
                    iconCls: 'icon-btn-delete',
                    action: 'suppDelete'
                }
            ],
            items: [
                {
                    xtype: 'textfield',
                    fieldLabel: 'Id ',
                    name: 'idPo',
                    id: 'idPoField',
                    readOnly: true,
                    fieldCls: 'x-item-readonly',
                    hidden: true,
                    listeners: {
                        change: function(field) {
                            var form = field.up('form');
                            form.saved = false;
                        }
                    }
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Id Detail',
                    name: 'idDetailPo',
                    id: 'idDetailPoField',
                    readOnly: true,
                    fieldCls: 'x-item-readonly',
                    hidden: true
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Jenis Barang ',
                    name: 'jenisBarang',
                    readOnly: true,
                    fieldCls: 'x-item-readonly',
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
                    fieldLabel: 'Cabang ',
//                    hidden: userCabang === '14' ? false : true,
//                    disabled: userCabang === '14' ? false : true,
                    name: 'poCabang',
                    id: 'poCabang',
                    triggerAction: 'query',
                    //triggerCls: 'x-form-search-trigger',
                    hideTrigger: true,
                    queryMode: 'remote',
                    minChars: 3,
//                    store: 'CabangStore',
                    displayField: 'cabangName',
                    valueField: 'id',
                    emptyText: 'ketik nama cabang',
                    matchFieldWidth: false,
                    listConfig: {
                        minWidth: 185
                    },
                    allowBlank: false
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Divisi ',
                    emptyText: 'Pilih',
                    displayField: 'type',
                    valueField: 'typeCode',
                    queryMode: 'local',
                    name: 'divisi',
                    forceSelection: true,
//                    hidden: userCabang === '14' ? true : false,
//                    disabled: userCabang === '14' ? true : false,
                    typeAhead: true,
                    allowBlank: true,
                    valueNotFoundText: 'Tidak ada Data',
                    store: new Ext.data.SimpleStore({
                        id: 0,
                        fields: [
                            'typeCode', //numeric value is the key
                            'type' //the text value is the value
                        ],
                        data: [
                            [1, 'PELAYANAN'],
                            [2, 'MARKETING'],
                            [3, 'KEUANGAN'],
                            [4, 'LAB'],
                            [5, 'SDM'],
                            [6, 'IT'],
                            [7, 'RUMAH TANGGA']
                        ]
                    })
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'No. PO ',
                    name: 'noPo',
                    emptyText: 'auto generate',
                    readOnly: true,
                    fieldCls: 'x-item-readonly',
                    allowBlank: false
                },
                {
                    xtype: 'datefield',
                    fieldLabel: 'E.D. PO ',
                    name: 'tglTempo',
                    format: 'd/M/Y',
                    submitFormat: 'Y-m-d',
                    allowBlank: false,
                    emptyText: 'Pilih Tanggal'
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Supplier ',
                    name: 'poSup',
                    triggerAction: 'all',
                    queryMode: 'remote',
                    minChars: 2,
//                    store: 'MasterSupplierStore',
                    displayField: 'suppdisplay',
                    valueField: 'idms',
                    matchFieldWidth: false,
                    emptyText: 'ketik nama supplier',
                    allowBlank: false,
                    listeners: {
                        select: function() {
                            var val = this.getValue(),
                                store = form.down('#supp_email').getStore();
                        
                            form.down('#supp_email').setReadOnly(false);
                            store.clearFilter(true);
                            store.filter('id', val);
                        }
                    }
                },
                {
                    xtype: 'comboboxedit',
                    name: 'supp_email',
                    itemId: 'supp_email',
                    fieldLabel: 'Email ',
//                    store: 'SuppEmailStore',
                    displayField: 'emailName',
                    valueField: 'email',
                    trigger2Cls: 'x-form-new-trigger',
                    triggerAction: 'all',
                    multiSelect: true,
                    minChars: 2,
                    readOnly: true,
                    onTrigger2Click: function () {
                        var win = new Ext.widget('newwindow', {
                            buttons: [
                                {
                                    text: 'Simpan',
                                    itemId: 'newEmailSuppPo'
                                }
                            ]
                        });
                        var form = Ext.widget('posuppemail');

                        win.setTitle('Tambah Email');
                        win.add(form);
                        
                        var idsupp = this.up('form').getForm().findField('poSup').getValue();
                        
                        Ext.Ajax.request({
                            url: BASE_PATH + 'data/get_email/'+idsupp,
                            callback: function (options, success, response) {
                                var resp = Ext.decode(response.responseText);

                                if (resp.success === 'true') {
                                    win.show();
                                    form.getForm().findField('idSupp').setValue(idsupp);
                                    form.getForm().findField('listEmail').setValue(resp.data);
                                }
                            }
                        });
                    },
                    listeners: {
                        select: function() {
                            var email = this.up('form').getForm().findField('emailSupp');
                            email.setValue(this.getRawValue());
                        }
                    }
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Email supp',
                    name: 'emailSupp',
                    allowBlank: true,
                    hidden: true
                },
                {
                    xtype: 'datefield',
                    fieldLabel: 'Tanggal Kirim ',
                    name: 'tglKirim',
                    format: 'd/M/Y',
                    submitFormat: 'Y-m-d',
                    allowBlank: true,
                    hidden: true
                },
                Ext.create('Ext.ux.form.NumericField', {
                    fieldLabel: 'Nilai Transaksi ',
                    name: 'jumlahTrx',
                    id: 'jumlahTrxPoForm',
                    flex: 1,
                    decimalPrecision: 2,
                    decimalSeparator: ',',
                    alwaysDisplayDecimals: true,
                    allowNegative: false,
                    minValue: 0, //prevents negative numbers
                    value: 0,
                    // Remove spinner buttons, and arrow key and mouse wheel listeners
                    hideTrigger: true,
                    keyNavEnabled: false,
                    mouseWheelEnabled: false,
                    allowBlank: false,
                    readOnly: true
                }),
                {
                    xtype: 'combobox',
                    fieldLabel: 'Waktu Bayar ',
                    emptyText: 'Pilih',
                    displayField: 'type',
                    valueField: 'typeCode',
                    queryMode: 'local',
                    name: 'wbNonAktiva',
                    forceSelection: true,
                    hidden: false,
                    typeAhead: true,
                    allowBlank: true,
                    valueNotFoundText: 'Tidak ada Data',
                    store: new Ext.data.SimpleStore({
                        id: 0,
                        fields: [
                            'typeCode', //numeric value is the key
                            'type' //the text value is the value
                        ],
                        data: [
                            [1, '2 MINGGU'],
                            [2, '3 MINGGU'],
                            [3, '1 BULAN']
                        ]
                    })
                },
                Ext.create('Ext.ux.form.NumericField', {
                    name: 'dpval',
                    fieldLabel: 'DP ',
                    decimalPrecision: 2,
                    decimalSeparator: ',',
                    alwaysDisplayDecimals: true,
                    allowNegative: false,
                    minValue: 0, //prevents negative numbers
                    value: 0,
                    // Remove spinner buttons, and arrow key and mouse wheel listeners
                    hideTrigger: true,
                    keyNavEnabled: false,
                    mouseWheelEnabled: false,
                    hidden: true

                }),
                {
                    xtype: 'fieldcontainer',
                    width: 310,
                    layout: 'hbox',
                    hidden: true,
                    itemId: 'angsuranDetail',
                    items: [
                        {
                            xtype: 'numberfield',
                            width: 140,
                            name: 'qtyAng',
                            fieldLabel: 'Jumlah Angsuran ',
                            allowNegative: false,
                            minValue: 1, //prevents negative numbers
                            // Remove spinner buttons, and arrow key and mouse wheel listeners
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
                            allowBlank: false,
                            value: 1,
                            listeners: {
                                change: function() {
                                    var total = this.up('form').getForm().findField('jumlahTrx').getValue(),
                                            dp = this.up('form').getForm().findField('dpval').getValue(),
                                            qty = this.getValue(),
                                            ang = (total - dp) / qty;

                                    this.up('form').getForm().findField('jumlahAng').setValue(ang);
                                }
                            }
                        },
                        Ext.create('Ext.ux.form.NumericField', {
                            width: 160,
                            name: 'jumlahAng',
                            fieldLabel: 'Angsuran ',
                            labelWidth: 70,
                            decimalPrecision: 2,
                            decimalSeparator: ',',
                            alwaysDisplayDecimals: true,
                            allowNegative: false,
                            minValue: 0, //prevents negative numbers
                            // Remove spinner buttons, and arrow key and mouse wheel listeners
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
                            readOnly: false

                        })
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    width: 300,
                    layout: 'hbox',
                    margin: '-5 0 5 0',
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
                            src: BASE_PATH + 'assets/appdata/user/sign1.png',
                            itemId: 'imageTtdPO'
                        })
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
                }
            ]
        });
        me.callParent(arguments);
    }
});

/* End of file reservasiForm.js */
/* Location: ./assets/js/app/view/reservasi/reservasiForm.js */