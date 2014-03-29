/**
 * @author Isht Ae
 **/
Ext.define('eTrav.view.divbarangkeluar.divBkEdGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.divbarangkeluar.divbkedgrid',
    itemId: 'divbkedgrid',
    id: 'gridBkLot',
    autoScroll: true,
    forceFit: true,
    store: 'LotDivStore',
    columnLines: true,
    flex: 1,
    border: false,
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            viewConfig: {
                autoScroll: true,
                emptyText: 'Tidak ada data ED',
                deferEmptyText: false
            },
            tbar: [
                {
                    xtype: 'form',
                    itemId: 'lotFormBk',
                    border: false,
                    layout: 'hbox',
                    hidden: true,
                    defaults: {
                        width: 40
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            emptyText: 'Id ',
                            name: 'id'
                        },
                        {
                            xtype: 'textfield',
                            emptyText: 'Id Ruang ',
                            name: 'idRuang'
                        },
                        {
                            xtype: 'textfield',
                            emptyText: 'Id Divisi ',
                            name: 'divisi'
                        },
                        {
                            xtype: 'textfield',
                            emptyText: 'Id Ruang ',
                            name: 'ruangan'
                        },
                        {
                            xtype: 'textfield',
                            emptyText: 'Id Barang ',
                            name: 'pengBarang'
                        },
                        {
                            xtype: 'numberfield',
                            emptyText: 'Qty. Keluar ',
                            hideTrigger: true,
                            name: 'jumlah'
                        },
                        {
                            xtype: 'numberfield',
                            emptyText: 'Qty. Check ',
                            hideTrigger: true,
                            name: 'jumlahOld',
                            allowBlank: false
                        }
                    ]
                },
                '->',
                {
                    xtype: 'button',
                    ui: 'blue-button',
                    iconCls: 'icon-btn-refresh',
                    handler: function() {
                        this.up('grid').getSelectionModel().clearSelections();
                        this.up('grid').getStore().load();
                    }
                }
            ],
            columns: [
                Ext.create('Ext.grid.RowNumberer'),
                {
                    flex: 0.2,
                    text: 'NO LOT',
                    dataIndex: 'noLot'
                },
                {
                    xtype: 'datecolumn',
                    flex: 0.2,
                    text: 'TGL. ED',
                    dataIndex: 'tglEd',
                    renderer: function(value, meta, record) {
                        return Ext.util.Format.date(value, 'd/M/Y');
                    }
                },
                {
                    xtype: 'numbercolumn',
                    align: 'center',
                    flex: 0.1,
                    text: 'STOCK',
                    dataIndex: 'qtyLot',
                    format: '000'
                },
                {
                    xtype: 'numbercolumn',
                    align: 'center',
                    flex: 0.1,
                    text: 'QTY KELUAR',
                    dataIndex: 'qtyKeluar',
                    format: '000',
                    editor: {
                        xtype: 'numberfield',
                        hideTrigger: true,
                        minValue: 1,
                        allowBlank: false
                    }
                }
            ],
            plugins: [
                {
                    ptype: 'cellediting',
                    clicksToEdit: 2,
                    pluginId: 'divBkEditor',
                    listeners: {
                        'edit': function(editor, e, opt) {
                            if (e.record.dirty) {
                                var grid = Ext.getCmp('gridBkLot'),
                                        form = grid.down('#lotFormBk').getForm(),
                                        data = e.record;
                                e.record.commit();
                                Ext.Ajax.request({
                                    url: BASE_PATH + 'persediaan/div_bklot',
                                    method: 'POST',
                                    params: {
                                        id : data.get('id'),
                                        idRuang: data.get('idRuang'),
                                        idBarang: data.get('idBarang'),
                                        qtyPesanan: form.findField('jumlah').getValue(),
                                        qtyStock : data.get('qtyLot'),
                                        qtyKeluar : data.get('qtyKeluar')
                                    },
                                    scope: this,
                                    callback: function(options, success, response) {
                                        var resp = Ext.decode(response.responseText);

                                        if (resp.success === 'true') {
                                            e.grid.getStore().load();
//                                            Ext.MessageBox.show({
//                                                title: 'INFO',
//                                                msg: resp.msg,
//                                                buttons: Ext.MessageBox.OK,
//                                                icon: Ext.MessageBox.INFO
//                                            });
                                        } else {
                                            e.grid.getStore().load();
                                            Ext.MessageBox.show({
                                                title: 'ERROR',
                                                msg: resp.msg,
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