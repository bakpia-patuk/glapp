/**
 * @author Isht Ae
 **/
//var periodeStore = new Ext.data.SimpleStore(
//    {
//        id: 0,
//        fields: [
//            'typeCode', //numeric value is the key
//            'type' //the text value is the value
//        ],
//        data: [
//            [0, '2013']
//        ]
//    }
//);

Ext.define('GlApp.view.akbukubesar.NsForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.akbukubesar.nsform',
    itemId: 'nsform',
    title: 'NERACA SALDO',
    border: false,
    preventHeader: false,
    bodyStyle: FORM_BG,
    bodyPadding: 10,
    buttonAlign: 'right',
    fieldDefaults: {
        labelAlign: 'right',
        labelWidth: 80,
        msgTarget: 'side'
    },
    autoScroll: true,
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            bbar: [
                {
                    xtype: 'button',
                    text: 'Setting',
                    ui: 'blue-button',
                    iconCls: 'btn-setting-gear',
                    disabled: false,
//                    action: 'nsSetting'
                },
                '->',
                {
                    xtype: 'button',
                    text: 'Proses',
                    ui: 'blue-button',
                    iconCls: 'btn-save',
                    disabled: false,
//                    action: 'nsProcess'
                },
                '-',
                {
                    xtype: 'button',
                    text: 'Reset',
                    ui: 'blue-button',
                    iconCls: 'btn-cancel-toolbar',
                    disabled: false,
//                    action: 'nsReset'
                }
            ],
            items: [
                {
                    xtype: 'combobox',
                    displayField: 'type',
                    valueField: 'typeCode',
                    queryMode: 'local',
                    name: 'periode',
//                    store: periodeStore,
                    fieldLabel: 'Thn Periode ',
                    emptyText: 'Pilih Periode',
                    hidden: false,
                    allowBlank: false
                },
                {
                    xtype: 'datefield',
                    fieldLabel: 'Tanggal ',
                    name: 'tglNS',
                    hidden: false,
                    disabled: false,
                    format: 'd F Y',
                    submitFormat: 'Y-m-d',
                    allowBlank: false
                }
            ]
        });

        me.callParent(arguments);
    },
    listeners: {
        afterRender: function () {
        }
    }
});

/* End of file reservasiForm.js */
/* Location: ./assets/js/app/view/reservasi/reservasiForm.js */