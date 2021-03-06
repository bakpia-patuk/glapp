/**
 * @author Isht Ae
 **/
Ext.define('GlApp.view.gdtxpo.TxPoListGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.gdtxpo.txpolistgrid',
    itemId: 'txpolistgrid',
    id:'txpolistgrid',
    border: false,
    store: 'gdtxpo.PoStore',
    autoScroll: true,
    forceFit: true,
    columnLines: true,
    initComponent: function() {
        var me = this;
        
        var grid = me;
        Ext.applyIf(me, {
            viewConfig: {
                autoScroll: true,
                emptyText: 'Tidak ada data Pengadaan',
                deferEmptyText: false
            },
            tbar: [
                {
                    text: 'PRINT_PO',
                    ui: 'orange-button',
                    action: 'printPoCopy'
                },
                {
                    text: 'SEND_PDF',
                    ui: 'orange-button',
                    action: 'sentPoPdf'
                },
                '->',
                {
                    xtype: 'datefield',
                    fieldLabel: 'Filter ',
                    labelWidth: 40,
                    labelAlign: 'right',
                    emptyText: 'Tgl. Awal',
                    format: 'd/M/Y',
                    submitFormat: 'Y-m-d',
                    itemId: 'poListTgl1',
                    value: new Date()
                },
                {
                    xtype: 'datefield',
                    fieldLabel: ' s.d ',
                    labelWidth: 30,
                    labelAlign: 'right',
                    emptyText: 'Tgl. Akhir',
                    format: 'd/M/Y',
                    submitFormat: 'Y-m-d',
                    itemId: 'poListTgl2',
                    value: new Date()
                },
                {
                    xtype: 'combobox',
                    emptyText: 'Cabang',
                    width: 150,
                    itemId: 'poListCabang',
                    triggerAction: 'all',
                    hideTrigger: false,
                    mode: 'remote',
                    minChars: 2,
                    store: 'gdtxpo.CabangStore',
                    displayField: 'cabang_alias',
                    valueField: 'id'
                },
                {
                    text: 'SEARCH',
                    ui: 'orange-button',
                    action: 'searchPo'
                },
                '-',
                {
                    text: 'REFRESH',
                    ui: 'orange-button',
                    handler: function() {
                        grid.getStore().load();
                    }
                },
                '-',
                {
                    text: 'ALL',
                    ui: 'orange-button',
                    action: 'allPo'
                }

            ],
            columns: [
                Ext.create('Ext.grid.RowNumberer'),
                {
                    xtype: 'gridcolumn',
                    flex: 0.25,
                    text: 'NO. PO',
                    dataIndex: 'po_no'
                },
                {
                    xtype: 'gridcolumn',
                    flex: 0.5,
                    text: 'SUPPLIER',
                    dataIndex: 'supp_name',
                    renderer: 'uppercase',
                    editor: {
                        xtype: 'combobox',
                        triggerAction: 'all',
                        queryMode: 'remote',
                        minChars: 2,
                        store: 'gdtxpo.SupplierStore',
                        displayField: 'ms_name',
                        valueField: 'id',
                        matchFieldWidth: false,
                        emptyText: 'pilih supplier',
                        allowBlank: false
                    }
                },
                {
                    xtype: 'datecolumn',
                    flex: 0.2,
                    text: 'TGL. PO',
                    dataIndex: 'tgl_trx',
                    renderer: Ext.util.Format.dateRenderer('d/M/Y')
                },
                {
                    xtype: 'datecolumn',
                    flex: 0.2,
                    text: 'JTH. TEMPO PO',
                    dataIndex: 'po_ed',
                    renderer: Ext.util.Format.dateRenderer('d/M/Y'),
                    editor: {
                        xtype: 'datefield',
                        format: 'd/M/Y',
                        submitFormat: 'Y-m-d',
                        allowBlank: false
                    }
                },
                {
                    xtype: 'numbercolumn',
                    flex: 0.3,
                    text: 'NILAI PO',
                    align: 'right',
                    dataIndex: 'po_value'
                }
            ],
            plugins: [
                {
                    ptype: 'cellediting',
                    clicksToEdit: 2,
                    pluginId: 'poEdit',
                    listeners: {
                        'edit': function(editor, e, opt) {
                            if (e.record.dirty) {
                                e.record.commit();
                                Ext.Ajax.request({
                                    url: BASE_PATH + 'gd_po/edit_po',
                                    method: 'POST',
                                    params: e.record.data,
                                    scope: this,
                                    callback: function(options, success, response) {
                                        var resp = Ext.decode(response.responseText);

                                        if (resp.success === 'true') {
                                            e.grid.getStore().load();
                                            Ext.MessageBox.show({
                                                title: 'INFO',
                                                msg: resp.msg,
                                                buttons: Ext.MessageBox.OK,
                                                icon: Ext.MessageBox.INFO
                                            });
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
                },
                {
                    ptype: 'bufferedrenderer'
                }
            ]
        });

        me.callParent(arguments);
    }
});
/* End of file reservasiGrid.js */
/* Location: ./assets/js/app/view/reservasi/reservasiGrid.js */