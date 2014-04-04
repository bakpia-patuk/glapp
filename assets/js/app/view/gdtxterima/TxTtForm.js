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
            items: [
                {
                    xtype: 'textfield',
                    fieldLabel: 'Id Tt ',
                    name: 'id',
                    itemId: 'id',
                    readOnly: true,
                    value: 0,
                    fieldCls: 'x-item-readonly',
                    hidden: true
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Nama Supplier ',
                    emptyText: 'Nama Supplier',
                    name: 'tt_supp_name',
                    itemId: 'tt_supp_name',
                    readOnly: true,
                    fieldCls: 'x-item-readonly',
                    hidden: false
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'No TT ',
                    name: 'tt_no',
                    itemId: 'tt_no',
                    emptyText: 'auto-generate',
                    readOnly: true,
                    allowBlank: false,
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
                            src: BASE_PATH + 'assets/appdata/signBlank.png',
                            id: 'imageTtdTb',
                            itemId: 'imageTtdTb'
                        })
                    ]
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Pengirim ',
                    name: 'tt_penerima',
                    emptyText: 'Nama Pengirim',
                    allowBlank: false
                },
                {
                    xtype: 'textareafield',
                    fieldLabel: 'Keterangan ',
                    name: 'tt_desc',
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
                            ui: 'orange-button',
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
                            src: BASE_PATH + 'assets/appdata/signBlank.png',
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