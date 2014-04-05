/**
 * @author Isht Ae
 **/
Ext.define('GlApp.view.gdtxfaktur.tfPrintGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.gdtxfaktur.tfprintgrid',
    itemId: 'tfprintgrid',
    autoScroll: true,
    forceFit: true,
    store: 'gdtxfaktur.FakturStore2',
    columnLines: true,
    flex: 1,
    border: false,

    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            viewConfig: {
                autoScroll: true,
                emptyText: 'Tidak ada data',
                deferEmptyText: false
            },
            tbar: [
                {
                    xtype: 'combobox',
                    fieldLabel: 'Supplier ',
                    itemId: 'suppIdFilterFaktur',
                    labelWidth: 60,
                    width: 300,
                    triggerAction: 'all',
                    queryMode: 'remote',
                    minChars: 2,
                    store: 'gdtxfaktur.MasterSupplierStore',
                    displayField: 'namams',
                    valueField: 'idms',
                    emptyText: 'ketik nama supplier',
                    listeners: {
                        select: function() {
                            var store = this.up('grid').getStore(),
                                filterCollection = [];

                            var statusFilter2 = new Ext.util.Filter({
                                property: 'faktur_suppid',
                                value: this.getValue()
                            });
                            filterCollection.push(statusFilter2);

                            var statusFilter2 = new Ext.util.Filter({
                                property: 'faktur_cabang',
                                value: CABANG_ID
                            });
                            filterCollection.push(statusFilter2);

                            var statusFilter2 = new Ext.util.Filter({
                                property: 'simpan_status',
                                value: 1
                            });
                            filterCollection.push(statusFilter2);

                            var statusFilter2 = new Ext.util.Filter({
                                property: 'faktur_ctkstatus',
                                value: 0
                            });
                            filterCollection.push(statusFilter2);

                            store.clearFilter(true);
                            store.filter(filterCollection);
                        }
                    }
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Faktur ID ',
                    id: 'idFakturCetak',
                    hidden: true
                },
                '->',
                {
                    iconCls: 'icon-btn-print',
                    ui: 'blue-button',
                    action: 'cetakFkt'
                },
                '-',
                {
                    iconCls: 'icon-btn-refresh',
                    ui: 'blue-button',
                    handler: function() {
                        this.up('grid').getStore().load();
                    }
                }
            ],
            columns: [
                {
                    xtype: 'checkcolumn',
                    flex: 0.1,
                    align: 'center',
                    header: '',
                    dataIndex: '',
                    listeners: {
                        checkchange: function (column, recordIndex, checked) {
                            var fieldSelect = Ext.getCmp('idFakturCetak');
                            var grid = this.up('grid'),
                                id = grid.getStore().getAt(recordIndex).get('id');

                            if (checked === true) {
                                fieldSelect.setValue(fieldSelect.getValue() + '-' + id);
                            } else {
                                fieldSelect.setValue(fieldSelect.getValue().replace("-" + id,""));
                            }
                        }
                    }
                },
                {
                    xtype: 'gridcolumn',
                    flex: 0.7,
                    text: 'NO FAKTUR',
                    dataIndex: 'fktNo'
                },
                {
                    xtype: 'numbercolumn',
                    flex: 0.3,
                    align: 'right',
                    text: 'NOMINAL',
                    dataIndex: 'fktTotal'
                }
            ]
        });

        me.callParent(arguments);
    }
});
/* End of file reservasiGrid.js */
/* Location: ./assets/js/app/view/reservasi/reservasiGrid.js */