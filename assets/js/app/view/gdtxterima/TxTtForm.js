/**
 * @author Isht Ae
 **/
Ext.define('GlApp.view.gdtxterima.TxTtForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.gdtxterima.txttform',
    itemId: 'txttform',
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
                                    handler: function() {
										Ext.Msg.alert('Error', 'Syncronize Connection Error');
									}
                },
                {
                    xtype: 'button',
                    disabled: false,
                    text: 'BARU',
                    ui: 'blue-button',
                    iconCls: 'icon-btn-add',
                                    handler: function() {
										Ext.Msg.alert('Error', 'Syncronize Connection Error');
									}
                },
                {
                    xtype: 'button',
                    disabled: false,
                    text: 'CETAK TT',
                    ui: 'blue-button',
                    iconCls: 'icon-btn-delete',
                                    handler: function() {
										Ext.Msg.alert('Error', 'Syncronize Connection Error');
									}
                },
                {
                    xtype: 'button',
                    hidden: true,
                    text: 'KIRIM PDF',
                    ui: 'blue-button',
                    iconCls: 'icon-btn-delete',
                                    handler: function() {
										Ext.Msg.alert('Error', 'Syncronize Connection Error');
									}
                }
            ],
            items: [
                {
                    xtype: 'numberfield',
                    fieldLabel: 'Id Tt ',
                    name: 'id',
                    itemId: 'id',
                    readOnly: true,
                    fieldCls: 'x-item-readonly',
                    hidden: false,
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
                    name: 'idDetailTt',
                    itemId: 'idDetailTtField',
                    readOnly: true,
                    fieldCls: 'x-item-readonly',
                    hidden: true
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Supplier ',
                    name: 'ttSupId',
                    itemId: 'poSuppCmb',
                    id: 'poSuppCmb',
                    triggerAction: 'all',
                    queryMode: 'remote',
                    minChars: 2,
//                    store: 'MasterSupplierStore',
                    displayField: 'suppdisplay',
                    valueField: 'idms',
                    emptyText: 'ketik nama Supplier',
                    hideTrigger: false
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'No PO ',
                    name: 'ttPoNo',
                    emptyText: 'pilih No PO disamping',
                    hidden: true,
                    readOnly: true,
                    fieldCls: 'x-item-readonly'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'No TT ',
                    name: 'ttNo',
                    emptyText: 'auto-generate',
                    readOnly: true,
                    fieldCls: 'x-item-readonly'
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
                    layout: 'hbox',
                    margin: '0 0 5 0',
                    items: [
                        {
                            html: 'Preview : ',
                            border: false,
                            width: 110,
                            bodyStyle: FORM_BG,
                            padding: '3 0 0 63',
                            align: 'right'
                        },
                        Ext.create('Ext.Img', {
                            margin: '0 0 0 5',
                            baseCls: 'imagefieldthumb',
                            src: BASE_PATH + 'assets/appdata/user/sign1.png',
                            id: 'imageTtdTb',
                            itemId: 'imageTtdTb'
                        })
                    ]
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Pengirim ',
                    name: 'pengirim',
                    emptyText: 'Nama Pengirim',
                    allowBlank: false
                },
                {
                    xtype: 'textareafield',
                    fieldLabel: 'Keterangan ',
                    name: 'keterangan',
                    height: 50
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    margin: '-2 0 5 0',
                    items: [
                        {
                            html: 'TTD Pengirim :',
                            border: false,
                            width: 110,
                            bodyStyle: FORM_BG,
                            padding: '5 0 0 30',
                            align: 'right'
                        },
                        {
                            xtype: 'button',
                            ui: 'blue-button',
                            iconCls: 'icon-btn-search',
                            text: 'Ambil TTD',
                            margin: '2 0 0 5',
                            action: 'getClientSign'
                        }
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    margin: '0 0 0 0',
                    items: [
                        {
                            html: 'Preview : ',
                            border: false,
                            width: 110,
                            bodyStyle: FORM_BG,
                            padding: '3 0 0 62',
                            align: 'right'
                        },
                        Ext.create('Ext.Img', {
                            margin: '0 0 0 5',
                            baseCls: 'imagefieldthumb',
                            src: BASE_PATH + 'assets/appdata/user/sign1.png',
                            id: 'imageTtdTb1'
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