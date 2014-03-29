/**
 * @author Isht Ae
 **/
Ext.define('GlApp.view.ksmasuk.KsMasukForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.ksmasuk.ksmasukform',
    itemId: 'ksmasukform',
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
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            tbar: [
                {
                    xtype: 'button',
                    text: 'Simpan',
                    iconCls: 'icon-btn-save',
//                    action: 'kmSave'
                },
                {
                    xtype: 'button',
                    text: 'Cetak',
                    iconCls: 'icon-btn-print',
//                    action: 'kmSavePrint'
                },
                {
                    xtype: 'button',
                    text: 'Baru',
                    iconCls: 'icon-btn-add',
//                    action: 'kmNew'
                },
                {
                    xtype: 'button',
                    text: 'Hapus',
                    iconCls: 'icon-btn-delete',
//                    action: 'kmDelete'
                }
            ],
            items: [
                {
                    xtype: 'textfield',
                    fieldLabel: 'Form ID ',
                    name: 'formId',
                    value: 'kasmasuk',
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
                    xtype: 'comboboxedit',
                    fieldLabel: 'Keperluan ',
                    name: 'namaGrk',
                    hidden: false,
                    allowBlank: false,
                    triggerAction: 'all',
                    minChars: 2,
//                    store: 'GrkStoreBmk',
                    readOnly: false,
                    displayField: 'grkName',
                    valueField: 'id',
                    emptyText: 'Pilih...',
//                    listeners: {
//                        afterrender: function(combo, rec, eOpt) {
//                            var store = combo.getStore();
//
//                            store.clearFilter(true);
//                            store.filter("form_id", "kasmasuk");
//                        },
//                        select: function(combo, rec, eOpt) {
//                            var store = this.up('form').getForm().findField('namaKd').getStore();
//                            this.up('form').getForm().findField('namaKd').show();
//                            this.up('form').getForm().findField('namaKd').setReadOnly(false);
//                            this.up('form').getForm().findField('namaKd').reset();
//                            store.clearFilter(true);
//                            store.filter('kp_id', combo.getValue());
//                            store.load();
//                        }
//                    },
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
//                        store.filter('form_id', 'kasmasuk');
//                        mbkGrid.down('#keperluanForm').setValue('kasmasuk');
//                        win.show();
//                    }
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Detail Keperluan ',
                    name: 'namaKd',
                    readOnly: true,
                    triggerAction: 'all',
                    minChars: 2,
//                    store: 'DetailKpStore',
                    displayField: 'namaAkun',
                    valueField: 'id',
                    emptyText: 'Pilih...',
//                    listeners: {
//                        select: function() {
//                            var val = this.getValue();
//                            if (val === 980 || val === 981 || val === 982) {
//                                this.up('form').getForm().findField('noDetilKpr').show();
//                                var jenis = this.getValue(),
//                                        jenis_val = jenis === 980 ? 1 : (jenis === 981 ? 2 : 3),
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
                //IF CUSTOM FIELD
                {
                    xtype: 'fieldcontainer',
                    layout: 'vbox',
                    width: 300,
                    hidden: false,
                    itemId: 'containerCustKm',
                    items: [
                    ]
                },
                Ext.create('Ext.ux.form.NumericField', {
                    fieldLabel: 'Nominal ',
                    name: 'jumlahTrx',
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
                {
                    xtype: 'textfield',
                    fieldLabel: 'Petugas ',
                    name: 'petugas',
//                    value: petugas ,
                    hidden: false,
                    readOnly: true,
                    fieldCls: 'x-item-readonly'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Penyetor ',
                    name: 'penerimaBg',
                    readOnly: false,
                    hidden: false,
                    allowBlank: false
                },
                //Field TTD
                {
                    xtype: 'fieldcontainer',
                    width: 300,
                    layout: 'hbox',
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
                            ui: 'blue-button',
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
//                                                    url: BASE_PATH + 'data/clear_data_sign_img/signNullKm',
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
//                                                Ext.getCmp('imageTtdKm').setSrc(BASE_URL + 'assets/img_data/signNullKm.png');
//                                                console.log('Simpan upload untuk bank keluar');
//                                            }
//                                        }
//                                    ]
//                                });
//
//                                var form = new Ext.widget('app2formkm');
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
                            id: 'imageTtdKm'
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