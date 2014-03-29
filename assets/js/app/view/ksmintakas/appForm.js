/**
 * @author Isht Ae
 **/
Ext.define('eTrav.view.mintabayar.appForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.appform',
    itemId: 'appform',
    border: false,
    bodyStyle: bg,
    bodyPadding: '10 10 0 10',
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
                    xtype: 'textfield',
                    fieldLabel: 'ID ',
                    name: 'idApp',
                    hidden: true
                },
                {
                    xtype: 'textfield',
                    name: 'namaPetugas',
                    fieldLabel: 'Nama Petugas ',
                    readOnly: true,
                    fieldCls: 'x-item-readonly'
                },
                {
                    xtype: 'textfield',
                    name: 'jabatan',
                    fieldLabel: 'Jabatan ',
                    readOnly: true,
                    fieldCls: 'x-item-readonly'
                }
            ]
        });

        me.callParent(arguments);
    }
});

/* End of file groupForm.js */
/* Location: ./assets/js/app/view/group/groupForm.js */