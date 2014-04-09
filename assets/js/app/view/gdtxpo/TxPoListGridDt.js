/**
 * @author Isht Ae
 **/
Ext.define('GlApp.view.gdtxpo.TxPoListGridDt', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.gdtxpo.txpolistgriddt',
    itemId: 'txpolistgriddt',
    border: false,
    store: 'gdtxpo.PoDetailStore',
    autoScroll: true,
    forceFit: true,
    columnLines: true,
    

    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            viewConfig: {
                autoScroll: true,
                emptyText: 'Tidak ada data Barang Pengadaan',
                deferEmptyText: false
            },
            columns: [
                Ext.create('Ext.grid.RowNumberer'),
                {
                    xtype: 'gridcolumn',
                    flex: 0.5,
                    text: 'NAMA BARANG',
                    dataIndex: 'barang_name'
                },
                {
                    xtype: 'gridcolumn',
                    flex: 0.3,
                    text: 'MERK',
                    dataIndex: 'merk_name'
                },
                {
                    xtype: 'gridcolumn',
                    flex: 0.2,
                    text: 'NO KATALOG',
                    dataIndex: 'barang_katalog'
                },
                {
                    xtype: 'numbercolumn',
                    flex: 0.1,
                    text: 'QTY',
                    format: '000',
                    dataIndex: 'barang_qty',
                    editor: {
                        allowBlank: false
                    }
                },
                {
                    xtype: 'numbercolumn',
                    flex: 0.3,
                    text: 'HARGA',
                    align: 'right',
                    dataIndex: 'barang_harga',
                    editor: {
                        allowBlank: false,
                        decimalPrecision: 2,
                        decimalSeparator: ',',
                        alwaysDisplayDecimals: true,
                        allowNegative: false,
                        minValue: 0, //prevents negative numbers
                    }
                },
                {
                    xtype: 'numbercolumn',
                    flex: 0.1,
                    text: 'DISC',
                    align: 'center',
                    dataIndex: 'barang_disc',
                    editor: {
                        allowBlank: true,
                        decimalPrecision: 2,
                        decimalSeparator: ',',
                        alwaysDisplayDecimals: true,
                        allowNegative: false,
                        minValue: 0, //prevents negative numbers
                    }
                },
                {
                    xtype: 'numbercolumn',
                    flex: 0.1,
                    text: 'PPN',
                    format: '000',
                    align: 'center',
                    dataIndex: 'barang_ppn',
                    editor: {
                        allowBlank: true
                    }
                },
                {
                    xtype: 'numbercolumn',
                    flex: 0.3,
                    text: 'HRG. NETTO',
                    align: 'right',
                    dataIndex: 'barang_netto'
                }
            ],
            plugins: [
                {
                    ptype: 'cellediting',
                    clicksToEdit: 2,
                    pluginId: 'poDetailEdit',
                    listeners: {
                        'edit': function(editor, e, opt) {
                            if (e.record.dirty) {
                                console.log('edited');
                                e.record.commit();
                                Ext.Ajax.request({
                                    url: BASE_PATH + 'gd_po/edit_po_item',
                                    method: 'POST',
                                    params: e.record.data,
                                    scope: this,
                                    callback: function(options, success, response) {
                                        var resp = Ext.decode(response.responseText);

                                        if (resp.success === 'true') {
                                            e.grid.getStore().load();
                                            Ext.getCmp('txpolistgrid').getStore().load();
                                            Ext.MessageBox.show({
                                                title: 'INFO',
                                                msg: resp.message,
                                                buttons: Ext.MessageBox.OK,
                                                icon: Ext.MessageBox.INFO
                                            });
                                        } else {
                                            e.grid.getStore().load();
                                            Ext.MessageBox.show({
                                                title: 'ERROR',
                                                msg: resp.message,
                                                buttons: Ext.MessageBox.OK,
                                                icon: Ext.MessageBox.ERROR
                                            });
                                        }
                                    }
                                });
                            }
                        }
                    }
                }
            ]
        });

        me.callParent(arguments);
    }
});
/* End of file reservasiGrid.js */
/* Location: ./assets/js/app/view/reservasi/reservasiGrid.js */