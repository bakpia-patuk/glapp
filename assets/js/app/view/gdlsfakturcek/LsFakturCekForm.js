/**
 * @author Isht Ae
 **/
Ext.define('GlApp.view.gdlsfakturcek.LsFakturCekForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.gdlsfakturcek.lsfakturcekform',
    itemId: 'lsfakturcekform',
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
                    xtype: 'triggerfield',
                    fieldLabel: 'No Faktur ',
                    triggerCls: Ext.baseCSSPrefix + 'form-search-trigger',
                    onTriggerClick: function() {
                        var forem = form.getForm();
                        var supplier = forem.findField('supplier'),
                                fakturTotal = forem.findField('fakturValue'),
                                statusBayar = forem.findField('status'),
                                caraBayar = forem.findField('caraBayar'),
                                tglTrx = forem.findField('tglTransaksi'),
                                tglDebet = forem.findField('tglDebet'),
                                trfValue = forem.findField('trfValue'),
                                bank = forem.findField('bankName');

                        if (this.getValue() === "") {
                            Ext.Msg.alert('Error', 'Masukkan nomer Faktur yang akan di cari');
                            return;
                        }

                        Ext.Ajax.request({
                            url: BASE_PATH + 'gd_txfaktur/check_faktur',
                            method: 'POST',
                            params: {
                                faktur: this.getValue()
                            },
                            scope: this,
                            callback: function(options, success, response) {
                                var resp = Ext.decode(response.responseText);

                                if (resp.success === 'true') {
                                    supplier.setValue(resp.data.supplier);
                                    fakturTotal.setValue(resp.data.fakturTotal);
                                    statusBayar.setValue(resp.data.statusBayar);
                                    caraBayar.setValue(resp.data.caraBayar);
                                    tglTrx.setValue(resp.data.tglTrx);
                                    tglDebet.setValue(resp.data.tglDebet);
                                    trfValue.setValue(resp.data.trfValue);
                                    bank.setValue(resp.data.bank);
                                } else {
                                    Ext.MessageBox.show({
                                        title: "Info",
                                        msg: resp.message,
                                        buttons: Ext.MessageBox.OK,
                                        icon: Ext.MessageBox.ERROR
                                    });
                                }
                            }
                        });
                    }
                },
                {
                    xtype: 'textfield',
                    name: 'supplier',
                    fieldLabel: 'Supplier ',
                    readOnly: true,
                    fieldCls: 'x-item-readonly'
                },
                Ext.create('Ext.ux.form.NumericField', {
                    hidden: false,
                    fieldLabel: 'Nominal Faktur ',
                    name: 'fakturValue',
                    decimalPrecision: 2,
                    decimalSeparator: ',',
                    alwaysDisplayDecimals: true,
                    allowNegative: false,
                    minValue: 0, //prevents negative numbers
                    // Remove spinner buttons, and arrow key and mouse wheel listeners
                    hideTrigger: true,
                    keyNavEnabled: false,
                    mouseWheelEnabled: false,
                    allowBlank: true,
                    readOnly: true,
                    itemCls: 'x-item-readonly',
                    value: 0
                }),
                {
                    xtype: 'textfield',
                    fieldLabel: 'Status ',
                    name: 'status',
                    readOnly: true,
                    fieldCls: 'x-item-readonly'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Cara Bayar ',
                    name: 'caraBayar',
                    readOnly: true,
                    fieldCls: 'x-item-readonly'
                },
                {
                    xtype: 'datefield',
                    hidden: true,
                    fieldLabel: 'Tanggal ',
                    name: 'tglTransaksi',
                    format: 'd/M/Y',
                    submitFormat: 'Y-m-d',
                    readOnly: true,
                    fieldCls: 'x-item-readonly'
                },
                {
                    xtype: 'datefield',
                    fieldLabel: 'Tanggal Bayar ',
                    name: 'tglBayar',
                    format: 'd/M/Y',
                    submitFormat: 'Y-m-d',
                    readOnly: true,
                    fieldCls: 'x-item-readonly'
                },
                Ext.create('Ext.ux.form.NumericField', {
                    fieldLabel: 'Total Bayar ',
                    name: 'totalValue',
                    decimalPrecision: 2,
                    decimalSeparator: '.',
                    alwaysDisplayDecimals: true,
                    allowNegative: false,
                    minValue: 0, //prevents negative numbers
                    // Remove spinner buttons, and arrow key and mouse wheel listeners
                    hideTrigger: true,
                    keyNavEnabled: false,
                    mouseWheelEnabled: false,
                    allowBlank: true,
                    readOnly: true,
                    itemCls: 'x-item-readonly',
                    value: 0
                }),
                {
                    xtype: 'datefield',
                    fieldLabel: 'Tgl. Debet ',
                    name: 'tglDebet',
                    format: 'd/M/Y',
                    submitFormat: 'Y-m-d',
                    readOnly: true,
                    hidden: true,
                    fieldCls: 'x-item-readonly'
                },
                Ext.create('Ext.ux.form.NumericField', {
                    hidden: true,
                    fieldLabel: 'Nominal Transfer ',
                    name: 'trfValue',
                    decimalPrecision: 2,
                    decimalSeparator: ',',
                    alwaysDisplayDecimals: true,
                    allowNegative: false,
                    minValue: 0, //prevents negative numbers
                    // Remove spinner buttons, and arrow key and mouse wheel listeners
                    hideTrigger: true,
                    keyNavEnabled: false,
                    mouseWheelEnabled: false,
                    allowBlank: true,
                    readOnly: true,
                    itemCls: 'x-item-readonly',
                    value: 0
                }),
                {
                    xtype: 'combobox',
                    fieldLabel: 'Bank ',
                    name: 'bankName',
                    readOnly: true,
                    hidden: true,
                    fieldCls: 'x-item-readonly'
                }
            ]
        });
        me.callParent(arguments);
    }
});

/* End of file reservasiForm.js */
/* Location: ./assets/js/app/view/reservasi/reservasiForm.js */