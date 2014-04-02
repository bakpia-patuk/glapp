/**
 * @author Isht Ae
 **/
Ext.define('GlApp.view.akakmsakunun.akunCustomForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.akmsakun.akuncustomform',
    itemId: 'akuncustomform',
    border: false,
    bodyStyle: bg,
    bodyPadding: 10,
    buttonAlign: 'right',
    fieldDefaults: {
        labelAlign: 'right',
        labelWidth: 110,
        msgTarget: 'side'
    },
    autoScroll: true,
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            tbar: [
                {
                    xtype: 'button',
                    text: 'Baru',
                    iconCls: 'icon-btn-save',
                    action: 'newCustomAkun'
                },
                {
                    xtype: 'button',
                    text: 'Hapus',
                    iconCls: 'icon-btn-delete',
                    action: 'delCustomAkun'
                },
                {
                    xtype: 'button',
                    text: 'Isi Data',
                    iconCls: 'icon-btn-detail',
                    action: 'detailCustomAkun'
                }
            ],
            bbar: [
                '->',
                {
                    xtype: 'button',
                    text: 'Tambah',
                    iconCls: 'icon-btn-add',
                    action: 'addCustomAkun'
                }
            ],
            items: [
                {
                    xtype: 'textfield',
                    width: 300,
                    name: 'customName',
                    fieldLabel: 'Nama Parameter ',
                    allowBlank: true,
                    hidden: true,
                    emptyText: 'tidak boleh spasi'
                },
                {
                    xtype: 'textfield',
                    width: 300,
                    name: 'customLabel',
                    fieldLabel: 'Label Parameter ',
                    allowBlank: false,
                    emptyText: 'label untuk field'
                },
                {
                    xtype: 'textareafield',
                    width: 300,
                    height: 50,
                    name: 'customDesc',
                    fieldLabel: 'Keterangan '
                },
                {
                    xtype: 'textfield',
                    width: 300,
                    hidden: true,
                    name: 'id',
                    fieldLabel: 'Id Custom '
                },
                {
                    xtype: 'textfield',
                    width: 300,
                    hidden: false,
                    name: 'akunId',
                    fieldLabel: 'Id Akun '
                },
                {
                    xtype: 'checkbox',
                    fieldLabel: 'Set Default ',
                    boxLabel: '',
                    name: 'status',
                    inputValue: '1',
                    uncheckedValues: '0'
                }
            ]
        });
        me.callParent(arguments);
    },
    listeners: {
        afterrender: function () {
            var id = Ext.getCmp('akunform').getForm().findField('id').getValue();
            this.getForm().findField('akunId').setValue(id == "" ? "0" : id);
        }
    }
});

/* End of file reservasiForm.js */
/* Location: ./assets/js/app/view/reservasi/reservasiForm.js */