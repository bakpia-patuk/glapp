/**
 * @author Isht Ae
 **/
Ext.define('GlApp.view.gdtxfaktur.app2Form', {
    extend: 'Ext.form.Panel',
    alias: 'widget.gdtxfaktur.app2formtf',
    itemId: 'app2formtf',
    fileUpload: true,
    border: false,
    //bodyStyle: bg,
    bodyPadding: '0 10 10 10',
    layout: 'auto',
    fieldDefaults: {
        labelAlign: 'right',
        labelWidth: 110,
        msgTarget: 'side',
        width: 275
    },
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    html: '<div style="color: red;padding: 10px;border: 1px solid #FF0000;margin: 10px 0px">Mohon verifikasi di lakukan tidak lebih dari 1 menit untuk keamanan data</div>',
                    border: false,
                    width: 300
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Faktur List ',
                    name: 'fktList',
                    readOnly: true,
                    hidden: true,
                    fieldCls: 'x-item-readonly'
                },
                {
                    xtype: 'fieldset',
                    margin: '0 0 10 0',
                    bodyPadding: '10 0',
                    width: 300,
                    title: 'Petugas',
                    items: [
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
                            width: 300,
                            layout: 'hbox',
                            hidden: true,
                            items: [
                                {
                                    xtype: 'button',
                                    text: 'Tanda Tangan',
                                    margins: '3 0 0 50',
                                    itemId: 'newTtdAppr',
                                    url: BASE_URL + 'assets/applet/launch.jnlp',
                                    baseParams: {
                                        q: 'html+anchor+tag'
                                    }
                                },
                                {
                                    xtype: 'filefield',
                                    buttonOnly: true,
                                    buttonText: 'Verifikasi TTD',
                                    margins: '3 0 0 5',
                                    itemId: 'preTtdAppr',
                                    name: 'fileSgn',
                                    onChange: function (value) {
                                        var form = this.up('form').getForm();
                                        form.submit({
                                            url: BASE_URL + 'gd_txfaktur/upload_signNullTf1',
                                            waitMsg: 'Verifikasi Tanda Tangan ..',
                                            clientValidation: false,
                                            success: function (form, action) {
                                                Ext.MessageBox.alert('Success', action.result.message);
                                                Ext.getCmp('imageTtdTf1').setSrc(BASE_URL + 'assets/img_data/signNullTf1.png');
                                            },
                                            failure: function (form, action) {
                                                Ext.MessageBox.alert('Error', action.result.message);
                                            }
                                        });
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            width: 310,
                            layout: 'hbox',
                            margins: '-10 0 0 0',
                            items: [
                                {
                                    html: 'Preview : ',
                                    border: false,
                                    width: 110,
                                    //bodyStyle: bg,
                                    padding: '3 0 0 58',
                                    align: 'right'
                                },
                                Ext.create('Ext.Img', {
                                    margins: '0 0 0 5',
                                    baseCls: 'imagefieldthumb2',
                                    src: BASE_PATH + 'assets/img_data/signBlank.png',
                                    id: 'imageTtdTf1',
                                    itemId: 'imageTtdTf1'
                                })
                            ]
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    margin: '0 0 10 0',
                    bodyPadding: '10 0',
                    width: 300,
                    title: 'Pengirim',
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Pengirim ',
                            name: 'pengirim',
                            emptyText: 'Nama Pengirim',
                            allowBlank: false
                        },
                        {
                            xtype: 'fieldcontainer',
                            width: 300,
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'button',
                                    text: 'Tanda Tangan',
                                    margins: '3 0 0 50',
                                    itemId: 'newTtdAppr2',
                                    url: BASE_URL + 'assets/applet/launch.jnlp',
                                    baseParams: {
                                        q: 'html+anchor+tag'
                                    }
                                },
                                {
                                    xtype: 'filefield',
                                    buttonOnly: true,
                                    buttonText: 'Verifikasi TTD',
                                    margins: '3 0 0 5',
                                    itemId: 'preTtdAppr',
                                    name: 'fileSgn2',
                                    onChange: function (value) {
                                        var form = this.up('form').getForm();
                                        form.submit({
                                            url: BASE_URL + 'gd_txfaktur/upload_signNullTf2',
                                            waitMsg: 'Verifikasi Tanda Tangan ..',
                                            clientValidation: false,
                                            success: function (form, action) {
                                                Ext.MessageBox.alert('Success', action.result.message);
                                                Ext.getCmp('imageTtdTf2').setSrc(BASE_URL + 'assets/img_data/signNullTf2.png');
                                            },
                                            failure: function (form, action) {
                                                Ext.MessageBox.alert('Error', action.result.message);
                                            }
                                        });
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            width: 310,
                            layout: 'hbox',
                            margins: '-10 0 0 0',
                            items: [
                                {
                                    html: 'Preview : ',
                                    border: false,
                                    width: 110,
                                    //bodyStyle: bg,
                                    padding: '3 0 0 58',
                                    align: 'right'
                                },
                                Ext.create('Ext.Img', {
                                    margins: '0 0 0 5',
                                    baseCls: 'imagefieldthumb2',
                                    src: BASE_PATH + 'assets/img_data/signBlank.png',
                                    id: 'imageTtdTf2'
                                })
                            ]
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }
});

/* End of file groupForm.js */
/* Location: ./assets/js/app/view/group/groupForm.js */