/**
 * @author Isht Ae
 **/
Ext.define('GlApp.view.bkmsbank.BkMsBankGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.bkmsbank.bkmsbankgrid',
    itemId: 'bkmsbankgrid',
    autoScroll: true,
    ui: 'green-panel',
    title: 'TABEL BANK',
    forceFit: false,
//    store: 'BankStore',
    columnLines: true,
    border: false,
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            viewConfig: {
                autoScroll: true,
                emptyText: 'Tidak ada data Bank',
                deferEmptyText: false
            },
            tbar: [
                {
                    xtype: 'combobox',
                    emptyText: 'Pilih',
                    fieldLabel: 'Cabang ',
                    labelWidth: 55,
                    width: 200,
                    displayField: 'cabangName',
                    valueField: 'id',
                    queryMode: 'remote',
                    name: 'filterCbPusat1',
                    itemId: 'filterCabang',
                    allowBlank: true,
                    triggerAction: 'all',
                    valueNotFoundText: 'Tidak ada Data',
//                    store: 'CabangStore',
//                    hidden: userCabang === "14" ? false : true,
//                    listeners: {
//                        select: function(me, value, field) {
//                            var store = Ext.StoreMgr.lookup('BankStore');
//
//                            store.clearFilter(true);
//                            store.filter('bank_cabang', this.getValue());
//                        }
//                    }
                },
                '->',
                {
                    iconCls: 'icon-btn-refresh',
                    ui: 'blue-button',
//                    handler: function() {
//                        this.up('grid').getSelectionModel().clearSelections();
//                        this.up('grid').getStore().load();
//                    }
                }
            ],
            columns: [
                {
                    xtype: 'gridcolumn',
                    width: 175,
                    text: 'NAMA BANK',
                    dataIndex: 'bankGroupNama'
                },
                {
                    xtype: 'gridcolumn',
                    width: 175,
                    text: 'NAMA ALIAS',
                    dataIndex: 'bankAlias'
                },
                {
                    xtype: 'gridcolumn',
                    width: 145,
                    text: 'ATAS NAMA',
                    dataIndex: 'bankNama'
                },
                {
                    xtype: 'gridcolumn',
                    width: 130,
                    text: 'NO REKENING',
                    dataIndex: 'bankRek'
                },
                {
                    xtype: 'gridcolumn',
                    width: 175,
                    text: 'ALAMAT',
                    dataIndex: 'bankAlamat'
                }
            ]
        });
        me.callParent(arguments);
    }
});
/* End of file reservasiGrid.js */
/* Location: ./assets/js/app/view/reservasi/reservasiGrid.js */