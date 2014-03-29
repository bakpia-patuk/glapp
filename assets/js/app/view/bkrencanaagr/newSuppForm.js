/**
 * @author Isht Ae
 **/
Ext.define('eTrav.view.mintaanggaran.newSuppForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.newsuppform',
    itemId: 'newsuppform',
    id: 'newsuppform',
    border: false,
    bodyStyle: bg,
    bodyPadding: '10',
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
                    fieldLabel: 'Nama ',
                    name: 'namaSupp',
                    allowBlank: false
                },
                {
                    xtype: 'textareafield',
                    fieldLabel: 'Alamat ',
                    height: 50,
                    name: 'alamat'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Telepon ',
                    name: 'telp'
                }
            ]
        });

        me.callParent(arguments);
    }
});

/* End of file groupForm.js */
/* Location: ./assets/js/app/view/group/groupForm.js */