/**
 * @author Isht Ae
 **/
Ext.define('GlApp.view.gdtxfaktur.TxBgFakturForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.gdtxfaktur.txbgfakturform',
    itemId: 'txbgfakturform',
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
                }
            ],
            items: [
                {
                    xtype: 'textfield',
                    fieldLabel: 'ID ',
                    name: 'id',
                    hidden: true
                },
                {
                    xtype: 'textfield',
                    emptyText: 'No BG',
                    fieldLabel: 'No BG ',
                    name: 'bgNo',
                    allowBlank: false
                },
                {
                    xtype: 'datefield',
                    fieldLabel: 'BG E.D. ',
                    name: 'tglEd',
                    format: 'd/M/Y',
                    submitFormat: 'Y-m-d',
                    allowBlank: false
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Nama Bank ',
                    name: 'bankName',
                    triggerAction: 'all',
                    queryMode: 'remote',
                    minChars: 2,
//                    store: 'BankStore',
                    displayField: 'bankAlias',
                    valueField: 'id',
                    emptyText: 'ketik nama bank',
                    allowBlank: false,
                    listeners: {
                        afterrender: function(cmb, e, opt) {
                            var store = cmb.getStore();
                            
                            store.clearFilter(true);
//                            store.filter('bank_cabang', userCabang);
                        }
                    }
                },
                Ext.create('Ext.ux.form.NumericField', {
                    fieldLabel: 'Nominal ',
                    name: 'jumlahBg',
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
                    xtype: 'textfield',
                    fieldLabel: 'No Faktur ',
                    name: 'fakturList',
                    hidden: true
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Id Supp ',
                    name: 'suppId',
                    hidden: true
                }
            ]
        });
        me.callParent(arguments);
    }
});

/* End of file reservasiForm.js */
/* Location: ./assets/js/app/view/reservasi/reservasiForm.js */