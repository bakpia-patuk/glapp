/**
 * @author Isht Ae
 **/
Ext.define('GlApp.view.gdmsbarang.MsBarangSatuanWin', {
    extend: 'Ext.window.Window',
    alias: 'widget.gdmsbarang.msbarangsatuanwin',
    itemId: 'msbarangsatuanwin',
    title: 'MASTER SATUAN',
    width: 400,
    height: 350,
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
                    xtype: 'grid',
                    tbar: [
                        {
                            text: 'Add',
                            action: 'addSatuan'
                        },
                        {
                            text: 'Delete',
                            action: 'delSatuan'
                        },
                        {
                            text: 'Refresh',
                            action: 'refeshGrid'
                        }
                    ],
                    columns: [
                        Ext.create('Ext.grid.RowNumberer', {width: 35}),
                        {
                            header: 'NAMA SATUAN',
                            dataIndex: 'nama_satbesar',
                            flex: 0.3,
                            renderer: 'uppercase',
                            editor: {
                                allowBlank: false,
                                xtype: 'combobox',
                                store: 'SatuanStore',
                                displayField: 'satName',
                                valueField: 'id'
                            }
                        },
                        {
                            xtype: 'numbercolumn',
                            header: 'SYMBOL',
                            flex: 0.2,
                            format: '000',
                            align: 'center',
                            dataIndex: 'msi_konversi',
                            editor: {
                                allowBlank: false
                            }
                        },
                        {
                            xtype: 'numbercolumn',
                            header: 'DESKRIPSI',
                            dataIndex: 'msi_satkecil',
                            flex: 0.6,
                            format: '000',
                            align: 'center',
                            renderer: 'uppercase',
                            editor: {
                                allowBlank: false
                            }
                        }
                    ]
                }
            ],
            buttons: [
                {
                    text: 'Save',
                    action: 'satuanSave'
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