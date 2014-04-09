/**
 * @author Isht Ae
 **/
Ext.define('GlApp.view.gdtxfaktur.TxFakturForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.gdtxfaktur.txfakturform',
    itemId: 'txfakturform',
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
                    action: 'tfSave'
                },
                {
                    xtype: 'button',
                    disabled: false,
                    text: 'BARU',
                    ui: 'blue-button',
                    iconCls: 'icon-btn-add',
                    action: 'tfNew'
                },
                '->',
                {
                    xtype: 'button',
                    text: 'CETAK TT FAKTUR',
                    ui: 'blue-button',
                    iconCls: 'icon-btn-print',
                    action: 'tfFakturPrint'
                }
            ],
            items: [
                {
                    xtype: 'textfield',
                    fieldLabel: 'ID Faktur ',
                    name: 'id',
                    hidden: false,
                    readOnly:true,
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Supplier ',
                    name: 'suppName',
                    itemId: 'suppName',
                    triggerAction: 'all',
                    queryMode: 'remote',
                    minChars: 2,
                   store: 'gdtxfaktur.MasterSupplierStore',
                    displayField: 'suppdisplay',
                    valueField: 'idms',
                    emptyText: 'ketik nama supplier'
                },
                {
                    xtype: 'textfield',
                    readOnly: true,
                    emptyText: 'No TT',
                    fieldCls: 'x-item-readonly',
                    fieldLabel: 'No TT ',
                    name: 'ttNo',
                    hidden: true
                },
                {
                    xtype: 'textfield',
                    readOnly: true,
                    fieldCls: 'x-item-readonly',
                    emptyText: 'No PO',
                    fieldLabel: 'No PO ',
                    name: 'poNo',
                    hidden: true
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
                    value:0,
                    readOnly: true
                }),
                {
                    xtype: 'textfield',
                    fieldLabel: 'No Faktur ',
                    name: 'noFaktur',
                    hidden: false
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Cara Bayar ',
                    emptyText: 'Pilih',
                    displayField: 'type',
                    valueField: 'typeCode',
                    queryMode: 'local',
                    name: 'caraBayar',
                    forceSelection: true,
                    hidden: false,
                    typeAhead: true,
//                    allowBlank: false,
                    valueNotFoundText: 'Tidak ada Data',
                    store: new Ext.data.SimpleStore({
                        id: 0,
                        fields: [
                            'typeCode', //numeric value is the key
                            'type' //the text value is the value
                        ],
                        data: [
                            [1, 'BG'],
                            [2, 'TUNAI'],
                            [3, 'TRANSFER']
                        ]
                    }),
                    listeners: {
                        select: function(cmb, rec, opt) {
                            if (cmb.getValue() === 2) {
                                this.up('form').getForm().findField('tglBayar').show();
                            } else {
                                this.up('form').getForm().findField('tglBayar').hide();
                            }

                            if (cmb.getValue() === 3) {
                                this.up('form').getForm().findField('tglTransfer').show();
                            } else {
                                this.up('form').getForm().findField('tglTransfer').hide();
                            }
                        }
                    }
                },
                {
                    xtype: 'datefield',
                    fieldLabel: 'Kembali Tgl. ',
                    name: 'tglBayar',
                    format: 'd/M/Y',
                    submitFormat: 'Y-m-d',
                    hidden: true,
                    allowBlank: true
                },
                {
                    xtype: 'datefield',
                    fieldLabel: 'Tgl. Transfer ',
                    name: 'tglTransfer',
                    format: 'd/M/Y',
                    submitFormat: 'Y-m-d',
                    hidden: true,
                    allowBlank: true
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