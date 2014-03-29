/**
 * @author Isht Ae
 **/
Ext.define('eTrav.view.jurnalmemorial.jpForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.jurnalmemorial.jpform',
    itemId: 'jpform',
    id: 'jpform',
    border: false,
    bodyStyle: bg,
    bodyPadding: '10',
    layout: 'auto',
    fieldDefaults: {
        width: 275,
        labelAlign: 'right',
        labelWidth: 80,
        msgTarget: 'side'
    },
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'numberfield',
                    fieldLabel: 'Id Trx',
                    name: 'id',
                    itemId: 'id',
                    value: 0,
                    hidden: true
                },
                {
                    xtype: 'datefield',
                    fieldLabel: 'Tgl. Jurnal ',
                    name: 'tglJurnal',
                    width: 190,
                    allowBlank: false,
                    value: new Date(),
                    format: 'd/M/Y',
                    submitFormat: 'Y-m-d'
                },
                {
                    xtype: 'radiogroup',
                    fieldLabel: 'Status ',
                    hidden: false,
                    items: [
                        {
                            boxLabel: 'Debet',
                            name: 'type',
                            inputValue: 0,
                            width: 90,
                            checked: true
                        },
                        {
                            boxLabel: 'Kredit',
                            name: 'type',
                            inputValue: 1,
                            width: 90
                        }
                    ]
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Nama Akun ',
                    store: 'JhAkunStore',
                    name: 'idAkun',
                    displayField: 'namaAkun',
                    valueField: 'id',
                    queryMode: 'remote',
                    triggerCls: 'x-form-search-trigger',
                    hideTrigger: true,
                    emptyText: 'Ketik Nama Akun',
                    triggerAction: 'all',
                    minChars: 2,
                    forceSelection: true,
                    typeAhead: true,
                    allowBlank: false,
                    valueNotFoundText: 'Tidak ada Data',
                    matchFieldWidth: false,
                    listConfig: {
                        minWidth: 185
                    },
                    listeners: {
                        afterrender: function() {
                            var store = this.getStore();
                            store.clearFilter(true);
                            store.filter('akun_child_status', 1);
                        },
                        select: function() {
                            var val = this.getValue(),
                                    rec = this.findRecordByValue(val);

                            this.up('form').down('#codeAkunJp').setValue(rec.get('codeAkunPure'));
                            this.up('form').down('#groupAkunJp').getStore().load();
                            this.up('form').down('#groupAkunJp').setValue(rec.get('groupAkun'));

                        }
                    }
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Kode Akun ',
                    name: 'codeAkun',
                    itemId: 'codeAkunJp',
                    allowBlank: false,
                    hidden: false,
                    readOnly: true
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Group Akun ',
                    emptyText: '',
                    displayField: 'namaGroupAkun',
                    valueField: 'kodeGroupAkun',
                    queryMode: 'remote',
                    name: 'groupAkun',
                    itemId: 'groupAkunJp',
                    store: 'GroupAkunStore',
                    triggerAction: 'all',
                    forceSelection: true,
                    typeAhead: true,
                    allowBlank: false,
                    readOnly: true
                },
                Ext.create('Ext.ux.form.NumericField', {
                    fieldLabel: 'Jumlah ',
                    name: 'jumlahTrx',
                    decimalPrecision: 2,
                    decimalSeparator: '.',
                    alwaysDisplayDecimals: true,
                    allowNegative: false,
                    value: 0,
                    minValue: 0, //prevents negative numbers
                    // Remove spinner buttons, and arrow key and mouse wheel listeners
                    hideTrigger: true,
                    keyNavEnabled: false,
                    mouseWheelEnabled: false,
                    allowBlank: false
                })
            ]
        });

        me.callParent(arguments);
    }
});

/* End of file groupForm.js */
/* Location: ./assets/js/app/view/group/groupForm.js */