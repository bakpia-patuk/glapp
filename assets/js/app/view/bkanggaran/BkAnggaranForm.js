/**
 * @author Isht Ae
 **/
Ext.define('GlApp.view.bkanggaran.BkAnggaranForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.bkanggaran.bkanggaranform',
    itemId: 'bkanggaranform',
    id: 'bkanggaranform',
    border: false,
    preventHeader: false,
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
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            tbar: [
                {
                    ui: 'blue-button',
                    text: 'Simpan',
                    iconCls: 'icon-btn-save',
//                    action: 'simpanAnggaran'
                },
                '-',
                {
                    ui: 'blue-button',
                    text: 'Batal',
                    iconCls: 'icon-btn-cancel',
//                    action: 'resetAnggaran'
                }
            ],
            items: [
                {
                    xtype: 'textfield',
                    fieldLabel: 'Jenis Bayar',
                    name: 'jenisBayar',
                    hidden: true,
                    allowBlank: false
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Supplier Id',
                    name: 'suppId',
                    hidden: true,
                    allowBlank: false
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'No Faktur',
                    name: 'idFaktur',
                    hidden: true,
                    allowBlank: false
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Divisi ',
//                    width: 210,
                    emptyText: '',
                    displayField: 'type',
                    valueField: 'typeCode',
                    queryMode: 'local',
                    name: 'divisi',
                    forceSelection: true,
                    hidden: true,
                    typeAhead: true,
                    allowBlank: true,
                    readOnly: true,
                    valueNotFoundText: 'Tidak ada Data',
                    store: new Ext.data.SimpleStore({
                        id: 0,
                        fields: [
                            'typeCode', //numeric value is the key
                            'type' //the text value is the value
                        ],
                        data: [
                            [0, 'PELAYANAN'],
                            [1, 'MARKETING'],
                            [2, 'KEUANGAN'],
                            [3, 'LAB'],
                            [4, 'SDM'],
                            [5, 'IT'],
                            [6, 'RUMAH TANGGA']
                        ]
                    })
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Supplier ',
                    name: 'suppName',
                    hidden: false,
                    allowBlank: true,
                    readOnly: true,
                    fieldCls: 'x-item-readonly'
                },
                Ext.create('Ext.ux.form.NumericField', {
                    fieldLabel: 'Total Nom. Faktur ',
                    name: 'totalAnggaranTrx',
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
                    readOnly: true,
                    hidden: false,
                    fieldCls: 'x-item-readonly',
                    value: 0
                }),
                {
                    xtype: 'datefield',
                    fieldLabel: 'Tanggal Debet ',
                    name: 'tglTransaksi',
                    format: 'd/M/Y',
                    submitFormat: 'Y-m-d',
                    value: new Date(),
                    allowBlank: false
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Ke Rek. ',
                    emptyText: 'Pilih',
                    displayField: 'type',
                    valueField: 'typeCode',
                    queryMode: 'local',
                    name: 'rekType',
                    //forceSelection: true,
                    hidden: false,
                    //typeAhead: true,
                    allowBlank: true,
                    valueNotFoundText: 'Tidak ada Data',
                    store: new Ext.data.SimpleStore({
                        id: 0,
                        fields: [
                            'typeCode', //numeric value is the key
                            'type' //the text value is the value
                        ],
                        data: [
                            [0, 'Pusat'],
                            [1, 'Supplier']
                        ]
                    }),
//                    listeners: {
//                        change: function(cmb, rec, opt) {
//                            if (cmb.getValue() == 0) {
//                                this.up('form').getForm().findField('rekPusatName').show();
//                                var store = this.up('form').getForm().findField('rekPusatName').getStore();
//                                this.up('form').getForm().findField('rekSuppName').hide();
//
//                                //this.up('form').getForm().findField('tglTransfer').hide();
//
//                                this.up('form').getForm().findField('bankDebetAsal').clearValue();
//                            } else {
//                                this.up('form').getForm().findField('rekPusatName').hide();
//                                this.up('form').getForm().findField('rekSuppName').show();
//
//                                //this.up('form').getForm().findField('tglTransfer').show();
//
//                                this.up('form').getForm().findField('bankDebetAsal').clearValue();
//                            }
//                        }
//                    }
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Bank Pusat ',
                    name: 'rekPusatName',
                    editable: false,
//                    store: 'BankStore',
                    displayField: 'bankAlias',
                    valueField: 'id',
                    queryMode: 'remote',
                    hidden: true,
                    allowBlank: true,
                    matchFieldWidth: false,
                    listConfig: {
                        shadow: 'side',
                        minWidth: 185
                    },
//                    listeners: {
//                        focus: function(cmb, rec, opt) {
//                            var store = cmb.getStore();
//                            store.clearFilter(true);
//                            store.filter('bank_cabang', '14');
//                        }
//                    }
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Bank Supplier ',
                    name: 'rekSuppName',
                    emptyText: 'Nama Bank Supplier',
                    hidden: true,
                    allowBlank: true
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Id Bank Supp ',
                    name: 'rekSuppId',
                    hidden: true,
                    allowBlank: true
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Ke Rek. ',
                    name: 'bankDebetTujuan',
                    id: 'bankDebetTujuanAg',
                    editable: false,
//                    store: 'BankStore1',
                    displayField: 'bankAlias',
                    valueField: 'id',
                    queryMode: 'remote',
                    hidden: true,
                    allowBlank: true,
                    matchFieldWidth: false,
                    listConfig: {
                        shadow: 'side',
                        minWidth: 185
                    }
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Debet dari Bank ',
                    name: 'bankDebetAsal',
                    id: 'bankDebetAsalAg',
                    editable: false,
//                    store: 'BankStore2',
                    displayField: 'bankAlias',
                    valueField: 'id',
                    queryMode: 'remote',
                    hidden: false,
                    allowBlank: true,
                    matchFieldWidth: false,
                    listConfig: {
                        shadow: 'side',
                        minWidth: 185
                    }
                },
                {
                    xtype: 'datefield',
                    fieldLabel: 'Tanggal Transfer ',
                    name: 'tglTransfer',
                    format: 'd/M/Y',
                    submitFormat: 'Y-m-d',
                    value: new Date(),
                    hidden: true,
                    allowBlank: true
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Transfer dari Bank ',
                    name: 'bankTrfAsal',
                    id: 'bankTrfAsalAg',
                    editable: false,
//                    store: 'BankStore3',
                    displayField: 'bankAlias',
                    valueField: 'id',
                    queryMode: 'remote',
                    hidden: true,
                    allowBlank: true,
                    matchFieldWidth: false,
                    listConfig: {
                        shadow: 'side',
                        minWidth: 185
                    },
//                    listeners: {
//                        focus: function(cmb, rec, opt) {
//                            var store = cmb.getStore();
//                            store.clearFilter(true);
//                            store.filter('bank_cabang', 14);
//                        }
//                    }
                },
                {
                    xtype: 'fieldset',
                    margin: '40 0 10 0',
                    padding: '10 5',
                    width: 300,
                    title: '<strong>Total Anggaran</strong>',
                    itemId: 'rekapAnggaran',
                    layout: 'anchor',
                    fieldDefaults: {
                        anchor: '100%'
                    },
                    collapsed: false,
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Transfer ',
                            name: 'rekPusatName',
                            allowBlank: true,
                            readOnly: true
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Tunai ',
                            name: 'rekPusatName',
                            allowBlank: true,
                            readOnly: true
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'BG ',
                            name: 'rekPusatName',
                            allowBlank: true,
                            readOnly: true
                        }
                    ]
                }
//                {
//                    xtype: 'fieldcontainer',
//                    width: 300,
//                    layout: 'hbox',
//                    items: [
//                        {
//                            html: 'Tanda Tangan :',
//                            border: false,
//                            width: 115,
//                            bodyStyle: bg,
//                            padding: '3 0 0 27',
//                            align: 'right'
//                        },
//                        {
//                            xtype: 'button',
//                            iconCls: 'icon-btn-search',
//                            text: 'Ambil TTD',
//                            margins: '0 0 0 5',
//                            handler: function () {
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
//                                                    url: BASE_PATH + 'data/clear_data_sign_img/signNullAnggaran',
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
//                                            handler: function () {
//                                                Ext.Ajax.request({
//                                                    url: BASE_PATH + 'data/check_ttd/signNullAnggaran',
//                                                    scope: this,
//                                                    callback: function(options, success, response) {
//                                                        var resp = Ext.decode(response.responseText);
//
//                                                        if (resp.success === 'true') {
//                                                            Ext.getCmp('imageTtdAnggaran').setSrc(BASE_URL + 'assets/img_data/signNullAnggaran.png');
//                                                            this.up('window').destroy();
//                                                        } else {
//                                                            Ext.MessageBox.alert('Error', 'Belum ada tanda tangan yang di verifikasi');
//                                                        }
//                                                    }
//                                                });
//                                                console.log('Simpan upload untuk anggaran');
//                                            }
//                                        }
//                                    ]
//                                });
//
//                                var form = new Ext.widget('app2foranggaran');
//                                win.add(form);
//                                win.show();
//                            }
//                        }
//                    ]
//                },
//                {
//                    xtype: 'fieldcontainer',
//                    width: 300,
//                    layout: 'hbox',
//                    items: [
//                        {
//                            html: 'Preview : ',
//                            border: false,
//                            width: 120,
//                            bodyStyle: bg,
//                            padding: '3 0 0 61',
//                            align: 'right'
//                        },
//                        Ext.create('Ext.Img', {
//                            baseCls: 'imagefieldthumb',
//                            src: BASE_PATH + 'assets/img_data/signBlank.png',
//                            id: 'imageTtdAnggaran'
//                        })
//                    ]
//                }
            ]
        });

        me.callParent(arguments);
    },
    listeners: {
        afterRender: function() {
            /*var jam = function(){
             Ext.getCmp('jam').setValue(Ext.Date.format(new Date(),'H:i:s'));
             }
             //Configuration object for the task
             var tugas = {
             run: jam, //the function to run
             interval: 1000 //every second
             }
             //creates a new manager
             var jalan = new Ext.util.TaskRunner();
             jalan.start(tugas); //start runing the task every one second
             //Clock funtion End*/
        }
    }
});

/* End of file reservasiForm.js */
/* Location: ./assets/js/app/view/reservasi/reservasiForm.js */