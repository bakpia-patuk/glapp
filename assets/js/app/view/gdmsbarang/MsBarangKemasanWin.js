/**
 * @author Isht Ae
 **/
Ext.define('GlApp.view.gdmsbarang.MsBarangKemasanWin', {
    extend: 'Ext.window.Window',
    alias: 'widget.gdmsbarang.msbarangkemasanwin',
    itemId: 'msbarangkemasanwin',
    title: 'MASTER KEMASAN ITEM',
    width: 500,
    height: 300,
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
                    itemId: 'kemasangrid',
                    tbar: [
                        {
                            text: 'Add',
                            action: 'addKemasan'
                        },
                        {
                            text: 'Delete',
                            action: 'delKemasan'
                        },
                        {
                            text: 'Refresh',
                            action: 'refeshGrid'
                        },
                        '->',
                        {
                            text: 'Satuan',
                            action: 'showSatuan'
                        }
                    ],
                    columns: [
                        Ext.create('Ext.grid.RowNumberer', {width: 35}),
                        {
                            header: 'SATUAN BESAR',
                            dataIndex: 'nama_satbesar',
                            flex: 0.4,
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
                            header: 'KONVERSI',
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
                            header: 'TINGKATAN',
                            dataIndex: 'msi_satkecil',
                            flex: 0.2,
                            format: '000',
                            align: 'center',
                            renderer: 'uppercase',
                            editor: {
                                allowBlank: false
                            }
                        },
                        {
                            xtype: 'checkcolumn',
                            header: 'SAT. TERKECIL',
                            dataIndex: 'is_active',
                            sortable: false,
                            flex: 0.2,
                            editor: {
                                xtype: 'checkbox'
                            },
                            listeners: {
                                checkchange: function(column, recordIndex, checked) {
                                    var grid = this.up('grid'),
                                            id = grid.getStore().getAt(recordIndex).get('id'),
                                            barang = grid.getStore().getAt(recordIndex).get('msi_idbarang');
                                    if (checked === true) {
                                        Ext.Ajax.request({
                                            url: BASE_PATH + 'data/set_default_sat',
                                            method: 'POST',
                                            params: {
                                                id: id,
                                                barang: barang
                                            },
                                            scope: this,
                                            callback: function(options, success, response) {
                                                var resp = Ext.decode(response.responseText);

                                                if (resp.success === 'true') {
                                                    grid.getStore().load();
                                                }
                                            }
                                        });
                                    } else {
                                        grid.getStore().load();
                                    }
                                }
                            }

                        }
                    ]
                }
            ],
            buttons: [
                {
                    text: 'Save',
                    action: 'kemasanSave'
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