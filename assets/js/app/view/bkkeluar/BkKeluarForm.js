/**
 * @author Isht Ae
 **/
Ext.define('GlApp.view.bkkeluar.BkKeluarForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.bkkeluar.bkkeluarform',
    itemId: 'bkkeluarform',
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
                    ui: 'orange-button',
                    text: 'Simpan',
                    iconCls: 'icon-btn-save',
                    itemId: 'BankKeluarSave'
                },
                '-',
                {
                    ui: 'orange-button',
                    text: 'Cetak',
                    iconCls: 'icon-btn-print',
//                    itemId: 'BankKeluarPrint'
                },
                '-',
                {
                    ui: 'orange-button',
                    text: 'Baru',
                    iconCls: 'icon-btn-add',
                    itemId: 'BankKeluarNew'
                },
                '-',
                {
                    ui: 'orange-button',
                    text: 'Hapus',
                    iconCls: 'icon-btn-delete',
                    itemId: 'BankKeluarDelete'
                }
            ],
            items: [
                {
                    xtype: 'textfield',
                    fieldLabel: 'Form ID ',
                    name: 'formId',
                    value: 'bankkeluar',
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
                    store: 'bkkeluar.BankFormStore',
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
                    itemId: 'namaGrk',
                    hidden: false,
                    triggerAction: 'all',
                    minChars: 2,
                    store: 'bkkeluar.GrkBkStore',
                    readOnly: false,
                    displayField: 'grk_name',
                    valueField: 'id',
                    emptyText: 'Pilih...',
                    listeners: {
                        afterrender: function(combo, rec, eOpt) {
                            var store = combo.getStore();

                            store.clearFilter(true);
                            store.filter("form_id", "bankkeluar");
                        },
//                        select: function(combo, rec, eOpt) {
//                            var store = this.up('form').getForm().findField('namaKd').getStore();
//                            this.up('form').getForm().findField('namaKd').show();
//                            this.up('form').getForm().findField('namaKd').setReadOnly(false);
//                            this.up('form').getForm().findField('namaKd').reset();
//                            store.clearFilter(true);
//                            store.filter('kp_id', combo.getValue());
//                            store.load();
//                        }
                    },
//                    onTrigger2Click: function() {
//                        var mbkGrid = new Ext.widget('shared.gkmastergrid', {
//                            border: true,
//                            region: 'center'
//                        }),
//                        mbkDtGrid = new Ext.widget('shared.gkmasterdetailgrid', {
//                            region: 'east',
//                            border: true,
//                            width: 290,
//                            split: true
//                        }),
//                        store = mbkGrid.getStore();
//                        var win = new Ext.widget('shared.newwindow', {
//                            title: 'DAFTAR KEPERLUAN',
//                            width: 700,
//                            height: 300,
//                            border: false,
//                            layout: 'border',
//                            items: [
//                                mbkGrid, mbkDtGrid
//                            ],
//                            buttons: [
//                                {
//                                    text: 'Simpan',
//                                    itemId: 'dtKeperluanSave'
//                                }
//                            ]
//                        });
//
//                        var store = mbkGrid.getStore();
//
//
//                        store.clearFilter(true);
//                        store.filter('form_id', 'bankkeluar');
//                        mbkGrid.down('#keperluanForm').setValue('bankkeluar');
//                        win.show();
//                    }
                },
//                {
//                    xtype: 'combobox',
//                    fieldLabel: 'Detail Keperluan ',
//                    name: 'namaKd',
//                    itemId: 'cmbDetKep',
//                    readOnly: true,
//                    triggerAction: 'all',
//                    minChars: 2,
//                    store: 'DetailKpStore',
//                    displayField: 'namaAkun',
//                    valueField: 'id',
//                    emptyText: 'Pilih....'
//                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Detail Keperluan ',
                    name: 'namaKd',
                    readOnly: true,
                    itemId: 'cmbDetKep',
                    disabled: false,
                    hideTrigger: false,
                    triggerAction: 'all',
                    queryMode: 'remote',
                    minChars: 2,
//                    store: 'DetailKpStore',
                    displayField: 'namaAkun',
                    valueField: 'id',
                    emptyText: 'Pilih...',
                    matchFieldWidth: false,
                    listConfig: {
                        minWidth: 185
                    },
//                    listeners: {
//                        select: function() {
//                            var val = this.getValue();
//                            if (val === 771 || val === 772 || val === 773) {
//                                this.up('form').getForm().findField('noDetilKpr').show();
//                                var jenis = this.getValue(),
//                                        jenis_val = jenis === 771 ? 1 : (jenis === 772 ? 2 : 3),
//                                        store = this.up('form').getForm().findField('noDetilKpr').getStore(),
//                                        filterCollection = [];
//
//                                var statusFilter = new Ext.util.Filter({
//                                    property: 'mt_cabang',
//                                    value: userCabang
//                                });
//                                filterCollection.push(statusFilter);
//
//                                var statusFilter = new Ext.util.Filter({
//                                    property: 'mt_jenis',
//                                    value: jenis_val
//                                });
//                                filterCollection.push(statusFilter);
//
//                                store.clearFilter(true);
//                                store.filter(filterCollection);
//                            } else {
//                                this.up('form').getForm().findField('noDetilKpr').hide();
//
//                            }
//                        }
//                    }
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'No Dtl. Keperluan ',
                    name: 'noDetilKpr',
                    hidden: true,
                    hideTrigger: false,
                    triggerAction: 'all',
                    queryMode: 'remote',
                    minChars: 2,
//                    store: 'MasterTelisaStore',
                    readOnly: false,
                    displayField: 'mt_namarek',
                    valueField: 'id',
                    emptyText: 'Pilih No',
                    matchFieldWidth: false,
                    listConfig: {
                        itemTpl: '<b>{mt_nama}</b> / <span style="color:blue">{mt_rek}</span>',
                        minWidth: 185
                    }
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
                    xtype: 'fieldcontainer',
                    itemId: 'BayarFkt',
                    hidden: true,
                    disabled: true,
                    margin: '0 0 0 0',
                    width: 300,
                    items: [
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
                        }
                    ]
                },
                //Field TTD
                {
                    xtype: 'fieldcontainer',
                    width: 300,
                    layout: 'hbox',
                    hidden:true,
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
                            iconCls: 'icon-btn-search',
                            text: 'Ambil TTD',
                            ui: 'blue-button',
                            margins: '0 0 0 3',
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
//                                                    url: BASE_PATH + 'data/clear_data_sign_img/signNullBkr',
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
//                                                Ext.getCmp('imageTtdBkr').setSrc(BASE_URL + 'assets/img_data/signNullBkr.png');
//                                                console.log('Simpan upload untuk bank keluar');
//                                            }
//                                        }
//                                    ]
//                                });
//
//                                var form = new Ext.widget('app2formbkr');
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
                            width: 116,
                            bodyStyle: FORM_BG,
                            padding: '3 0 0 60',
                            align: 'right'
                        },
                        Ext.create('Ext.Img', {
                            baseCls: 'imagefieldthumb',
//                            src: BASE_PATH + 'assets/img_data/signBlank.png',
                            id: 'imageTtdBkr',
                            itemId: 'imageTtdBkr'
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