/**
 * @author Isht Ae
 **/
Ext.define('GlApp.view.gdtxpo.PoEmailWin', {
    extend: 'Ext.window.Window',
    alias: 'widget.gdtxpo.poemailwin',
    itemId: 'poemailwin',
    title: 'MASTER EMAIL',
    width: 335,
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
                    itemId: 'formEmail',
                    bodyPadding: '0 10 10 10',
                    layout: 'auto',
                    fieldDefaults: {
                        labelAlign: 'right',
                        labelWidth: 110,
                        msgTarget: 'side',
                        width: 300
                    },
                    items: [
                        {
                            html: '<div style="color: red;margin: 10px 0px">Masukkan Email pada list di Bawah,bila lebih dari satu, pisahkan dengan tanda koma</div>',
                            border: false,
                            width: 300
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Id Supp ',
                            name: 'id_supp',
                            itemId: 'id_supp',
                            hidden: false
                        },
                        {
                            xtype: 'textareafield',
                            fieldLabel: 'Daftar Email ',
                            name: 'list_email',
                            itemId: 'list_email',
                            height: 70
                        }
                    ]
                }
            ],
            buttons: [
                {
                    text: 'Save',
                    scope: this,
                    action: 'saveSuppEmail'
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