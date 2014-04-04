/**
 * @author Isht Ae
 **/
Ext.define('GlApp.view.gdtxterima.TxTtSignWin', {
    extend: 'Ext.window.Window',
    alias: 'widget.gdtxterima.txttsignwin',
    itemId: 'txttsignwin',
    title: 'TANDA TANGAN PENGIRIM',
    modal: true,
    resizable: false,
    border: false,
    autoScroll: true,
    layout: 'fit',
    autoShow: true,
    initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    bodyPadding: 10,
                    layout: 'auto',
                    itemId: 'formttd',
                    fieldDefaults: {
                        labelAlign: 'right',
                        labelWidth: 110,
                        msgTarget: 'side',
                        width: 300
                    },
                    items: [
                        {
                            xtype:'textfield',
                            name: 'idTt',
                            itemId: 'idTt',
                            hidden: true
                        },
                        {
                            xtype: 'fieldcontainer',
                            width: 300,
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'button',
                                    text: 'Tanda Tangan',
                                    margins: '10 0 0 0',
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
                                    margins: '10 0 0 5',
                                    itemId: 'preTtdAppr',
                                    name: 'ttSign',
                                    onChange: function(value) {
                                        var form = this.up('form'),
                                                idtt = form.down('#idTt').getValue(),
                                                name = this.getName();
                                        form.getForm().submit({
                                            url: BASE_URL + 'shared/upload_ttd_trx/' + name + '/' + idtt,
                                            waitMsg: 'Verifikasi Tanda Tangan ..',
                                            clientValidation: false,
                                            success: function(form, action) {
                                                Ext.MessageBox.alert('Success', action.result.message);
                                            },
                                            failure: function(form, action) {
                                                Ext.MessageBox.alert('Error', action.result.message);
                                            }
                                        });
                                    }
                                }
                            ]
                        },
                        {
                            html: '<div style="color: red">Mohon verifikasi di lakukan tidak lebih dari 1 menit untuk keamanan data</div>',
                            border: false,
                            width: 300
                        }
                    ]
                }
            ],
            buttons: [
                {
                    text: 'Save',
                    action: 'ttSave'
                },
                {
                    text: 'Cancel',
                    scope: this,
                    handler: this.close
                }
            ]
        });

        me.callParent(arguments);
    }
});
/* End of file memberWindow.js */
/* Location: ./assets/js/app/view/group/memberWindow.js */