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
                    text: 'SIMPAN',
                    iconCls: 'icon-btn-save',
                   action: 'simpanAnggaran'
                },
                '-',
                {
                    ui: 'blue-button',
                    text: 'BATAL',
                    iconCls: 'icon-btn-cancel',
                   action: 'resetAnggaran'
                }
            ],
            items: [
                {
                    xtype: 'textfield',
                    fieldLabel: 'Jenis Bayar',
                    name: 'trx_jenisbayar',
                    hidden: true,
                    allowBlank: false
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Supplier Id',
                    name: 'trx_supp_id',
                    hidden: true,
                    allowBlank: false
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'No Faktur',
                    name: 'trx_agrdata',
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
                    fieldLabel: 'Supplier ',
                    name: 'supplier',
                    hidden: false,
                    allowBlank: true,
                    readOnly: true,
                    fieldCls: 'x-item-readonly'
                },
                Ext.create('Ext.ux.form.NumericField', {
                    fieldLabel: 'Total Nom. Faktur ',
                    name: 'trx_totalagr',
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
                    name: 'trx_tgldebet',
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
                    name: 'trx_kreditketype',
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
                    listeners: {
                        change: function(cmb, rec, opt) {
                            if (cmb.getValue() === 0) {
                                this.up('form').getForm().findField('rek_pusat').show();
//                                var store = this.up('form').getForm().findField('rek_pusat').getStore();
                                this.up('form').getForm().findField('rek_supp').hide();

                                //this.up('form').getForm().findField('tglTransfer').hide();

                                this.up('form').getForm().findField('bank_debet_dari').clearValue();
                            } else {
                                this.up('form').getForm().findField('rek_pusat').hide();
                                this.up('form').getForm().findField('rek_supp').show();

                                //this.up('form').getForm().findField('tglTransfer').show();

                                this.up('form').getForm().findField('bank_debet_dari').clearValue();
                            }
                        }
                    }
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Bank Pusat ',
                    name: 'rek_pusat',
                    editable: false,
                    store: 'bkanggaran.BankPusatStore',
                    displayField: 'bank_alias',
                    valueField: 'id',
                    queryMode: 'remote',
                    hidden: true,
                    allowBlank: true,
                    matchFieldWidth: false,
                    listConfig: {
                        shadow: 'side',
                        minWidth: 185
                    },
                    listeners: {
                        focus: function(cmb, rec, opt) {
                            var store = cmb.getStore();
                            store.clearFilter(true);
                            store.filter('bank_cabang', '1');
                        }
                    }
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Bank Supplier ',
                    name: 'rek_supp',
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
                    name: 'bank_debet_ke',
                    id: 'bankDebetTujuanAg',
                    editable: false,
                   store: 'bkanggaran.BankDebetKeStore',
                    displayField: 'bank_alias',
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
                    name: 'bank_debet_dari',
                    id: 'bankDebetAsalAg',
                    editable: false,
                    store: 'bkanggaran.BankDebetDariStore',
                    displayField: 'bank_alias',
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
                   store: 'bkanggaran.BankSupplier1Store',
                    displayField: 'bank_alias',
                    valueField: 'id',
                    queryMode: 'remote',
                    hidden: true,
                    allowBlank: true,
                    matchFieldWidth: false,
                    listConfig: {
                        shadow: 'side',
                        minWidth: 185
                    },
                   listeners: {
                       focus: function(cmb, rec, opt) {
                           var store = cmb.getStore();
                           store.clearFilter(true);
                           store.filter('bank_cabang', 1);
                       }
                   }
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
                            name: 'rek_pusat',
                            allowBlank: true,
                            readOnly: true
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Tunai ',
                            name: 'rek_pusat',
                            allowBlank: true,
                            readOnly: true
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'BG ',
                            name: 'rek_pusat',
                            allowBlank: true,
                            readOnly: true
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