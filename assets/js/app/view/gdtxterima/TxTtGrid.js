/**
 * @author Isht Ae
 **/
var editorCell = new Ext.grid.plugin.CellEditing({
    clicksToEdit: 2,
    listeners: {
        'edit': function(editor, e, eOpt) {
            if (e.record.dirty) {
                e.record.commit();
                Ext.Ajax.request({
                    url: BASE_PATH + 'gd_tt/edit_peng_tt',
                    method: 'POST',
                    params: e.record.data,
                    scope: this,
                    callback: function(options, success, response) {
                        var resp = Ext.decode(response.responseText);

                        if (resp.success === 'true') {
                            e.grid.getStore().load();
                            e.grid.getSelectionModel().clearSelections();
                        } else {
                            Ext.MessageBox.show({
                                title: 'Info',
                                msg: resp.msg,
                                buttons: Ext.MessageBox.OK,
                                icon: Ext.MessageBox.ERROR
                            });
                            e.grid.getStore().load();
                            e.grid.getSelectionModel().clearSelections();
                        }
                    }
                });
            }
        }
    }
});


Ext.define('GlApp.view.gdtxterima.TxTtGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.gdtxterima.txttgrid',
    itemId: 'txttgrid',
    border: false,
    store: 'gdtxterima.PoDetailStore',
    autoScroll: true,
    forceFit: false,
    columnLines: true,
    plugins: [editorCell],
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            viewConfig: {
                autoScroll: true,
                emptyText: 'Tidak ada data Po',
                deferEmptyText: false
            },
            features: [
                {
                    startCollapsed: false,
                    id: 'poPengGroup',
                    ftype: 'grouping',
                    groupHeaderTpl: 'No Po : {name}',
                    hideGroupedHeader: false,
                    //remoteRoot: 'summaryData',
                    enableGroupingMenu: true
                }
            ],
            columns: [
                {
                    xtype: 'checkcolumn',
                    flex: 0.25,
                    align: 'center',
                    dataIndex: 'tt_status',
                    itemId: 'setTt'
                },
                {
                    xtype: 'gridcolumn',
                    width: 300,
                    text: 'NAMA BARANG',
                    dataIndex: 'barang_name',
                    renderer: function(value, meta, record) {
                        var status = record.get('tt_status');
                        if (status) {
                            return value;
                        } else {
                            return '<span style="color:red;">' + value + '</span>';
                        }
                    }
                },
                {
                    xtype: 'numbercolumn',
                    width: 100,
                    align: 'center',
                    text: 'QTY PESAN',
                    format: '000',
                    dataIndex: 'barang_qty',
                    renderer: function(value, meta, record) {
                        var status = record.get('tt_status');
                        if (status) {
                            return value;
                        } else {
                            return '<span style="color:red;">' + value + '</span>';
                        }
                    }
                },
                {
                    xtype: 'numbercolumn',
                    width: 110,
                    align: 'center',
                    text: 'QTY DITERIMA',
                    format: '000',
                    dataIndex: 'tt_qty_kirim',
                    renderer: function(value, meta, record) {
                        var status = record.get('tt_status');
                        if (status) {
                            return value;
                        } else {
                            return '<span style="color:red;">' + value + '</span>';
                        }
                    },
                    editor: {
                        xtype: 'numberfield',
                        hideTrigger: true,
                        allowBlank: false
                    }
                },
                {
                    xtype: 'numbercolumn',
                    width: 110,
                    align: 'center',
                    text: 'QTY TERKIRIM',
                    format: '000',
                    dataIndex: 'tt_qty_sisa',
                    renderer: function(value, meta, record) {
                        var status = record.get('tt_status');
                        if (status) {
                            return value;
                        } else {
                            return '<span style="color:red;">' + value + '</span>';
                        }
                    }
                },
                {
                    xtype: 'gridcolumn',
                    width: 150,
                    text: 'MERK',
                    dataIndex: 'merk_name',
                    renderer: function(value, meta, record) {
                        var status = record.get('tt_status');
                        if (value === 0) {
                            if (status) {
                                return '-';
                            } else {
                                return '<span style="color:red;">-</span>';
                            }
                        } else {
                            if (status) {
                                return value;
                            } else {
                                return '<span style="color:red;">' + value + '</span>';
                            }
                        }
                    }
                },
                {
                    xtype: 'gridcolumn',
                    width: 150,
                    text: 'KATALOG',
                    dataIndex: 'barang_katalog',
                    renderer: function(value, meta, record) {
                        var status = record.get('tt_status');
                        if (value === 0) {
                            if (status) {
                                return '-';
                            } else {
                                return '<span style="color:red;">-</span>';
                            }
                        } else {
                            if (status) {
                                return value;
                            } else {
                                return '<span style="color:red;">' + value + '</span>';
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