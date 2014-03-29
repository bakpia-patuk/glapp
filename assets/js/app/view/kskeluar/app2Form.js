/**
 * @author Isht Ae
 **/
Ext.define('eTrav.view.kaskeluar.app2Form', {
    extend: 'Ext.form.Panel',
    alias: 'widget.app2formkk',
    itemId: 'app2formkk',
    fileUpload: true,
    border: false,
    bodyStyle: bg,
    bodyPadding: '0 10 10 10',
    layout: 'auto',
    fieldDefaults: {
        labelAlign: 'right',
        labelWidth: 110,
        msgTarget: 'side',
        width: 300
    },
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            items: [
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
                            name: 'fileSgn',
                            onChange: function (value) {
                                var form = this.up('form').getForm();
                                form.submit({
                                    url: BASE_URL + 'data/upload_sgnKk',
                                    waitMsg: 'Verifikasi Tanda Tangan ..',
                                    clientValidation: false,
                                    success: function (form, action) {
                                        Ext.MessageBox.alert('Success', action.result.message);
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
                    html: '<div style="color: red">Mohon verifikasi di lakukan tidak lebih dari 1 menit untuk keamanan data</div>',
                    width: 300,
                    border: false
                }
            ]
        });

        me.callParent(arguments);
    }
});

/* End of file groupForm.js */
/* Location: ./assets/js/app/view/group/groupForm.js */