/**
 * @author Isht Ae
 **/
Ext.define('GlApp.view.jurnalharian.jurnalForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.jurnalform',
    itemId: 'jurnalform',
    id: 'jurnalform',
    border: false,
    bodyStyle: bg,
    bodyPadding: '10 10 5 10',
    layout: 'auto',
    fieldDefaults: {
        labelAlign: 'right',
        labelWidth: 110,
        msgTarget: 'side'
    },
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'textfield',
                    width: 350,
                    padding: '0 0 5 0',
                    fieldLabel: 'No Ref. Trx ',
                    name: 'noRefTrx',
                    readOnly: true
                },
                {
                    xtype: 'combobox',
                    width: 350,
                    displayField: 'type',
                    valueField: 'typeCode',
                    queryMode: 'local',
                    allowBlank: false,
                    name: 'type',
                    itemId: 'type',
                    store: new Ext.data.SimpleStore({
                        id: 0, fields: [
                            'typeCode', //numeric value is the key
                            'type' //the text value is the value
                        ], data: [
                            [0, 'Debet'],
                            [1, 'Kredit']
                        ]
                    }),
                    fieldLabel: 'Debet/ Kredit ',
                    emptyText: 'Pilih'
                },
                {
                    xtype: 'combobox',
                    width: 350,
                    fieldLabel: 'Group Akun ',
                    emptyText: '',
                    displayField: 'namaGroupAkun',
                    valueField: 'kodeGroupAkun',
                    queryMode: 'remote',
                    name: 'groupAkun',
                    store: 'GroupAkunStore',
                    triggerAction: 'all',
                    forceSelection: true,
                    typeAhead: true,
                    allowBlank: false,
                    valueNotFoundText: 'Tidak ada Data'
                },
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Akun Detail',
                    labelStyle: 'font-weight:bold;padding-bottom:10px;',
                    bodyStyle: 'margin:15px 0px 25px 0px',
                    labelAlign: 'top',
                    items: [
                        {
                            xtype: 'triggerfield',
                            width: 350,
                            fieldLabel: 'Kode Akun ',
                            name: 'codeAkunPure',
                            itemId: 'codeAkunPure',
                            triggerCls: 'x-form-search-trigger',
                            allowBlank: false,
                            onTriggerClick: function (event) {
                                this.fireEvent("ontriggerclick", this, event);
                            }
                        },
                        {
                            xtype: 'textfield',
                            width: 350,
                            fieldLabel: 'Nama Akun ',
                            name: 'namaAkun',
                            hidden: false,
                            readOnly: true
                        },
                        {
                            xtype: 'textfield',
                            width: 350,
                            fieldLabel: 'Mata Uang',
                            name: 'akunCurr',
                            hidden: true,
                            readOnly: true
                        }
                    ]
                },
                Ext.create('Ext.ux.form.NumericField',
                    {
                        fieldLabel: 'Jumlah ',
                        name: 'jumlahTrx',
                        width: 350,
                        decimalPrecision: 2,
                        decimalSeparator: ',',
                        alwaysDisplayDecimals: true,
                        allowNegative: false,
                        minValue: 0, //prevents negative numbers
                        // Remove spinner buttons, and arrow key and mouse wheel listeners
                        hideTrigger: true,
                        keyNavEnabled: false,
                        mouseWheelEnabled: false,
                        allowBlank: false
                    }),
                {
                    xtype: 'textareafield',
                    width: 350,
                    fieldLabel: 'Keterangan ',
                    name: 'keterangan',
                    itemId: 'keterangan',
                    allowBlank: false
                },
                {
                    xtype: 'textfield',
                    width: 350,
                    fieldLabel: 'ID',
                    name: 'idJurnal',
                    itemId: 'id',
                    hidden: true
                }

            ]
        });

        me.callParent(arguments);
    }
});

/* End of file groupForm.js */
/* Location: ./assets/js/app/view/group/groupForm.js */