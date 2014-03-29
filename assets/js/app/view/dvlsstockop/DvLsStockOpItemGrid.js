/**
 * @author Isht Ae
 **/
Ext.define('GlApp.view.dvlsstockop.DvLsStockOpItemGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.dvlsstockop.dvlsstockopitemgrid',
    itemId: 'dvlsstockopitemgrid',
    autoScroll: true,
    forceFit: true,
//    store: 'ItemStockDivStore',
    columnLines: true,
    flex: 1,

    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            viewConfig: {
                autoScroll: true,
                emptyText: 'Tidak ada data Daftar Barang',
                deferEmptyText: false
            },
            tbar: [
                
                {
                    xtype: 'tbtext',
                    text: 'Filter : '
                },
                {
                    xtype: 'combobox',
                    name: 'divPilih',
                    triggerAction: 'all',
                    hideTrigger: false,
                    queryMode: 'remote',
                    minChars: 2,
//                    store: 'DivisiStore',
                    displayField: 'divisiName',
                    valueField: 'divisiId',
                    emptyText: 'Pilih Divisi',
                    allowBlank: false,
                    matchFieldWidth: false,
                    listConfig: {
                        minWidth: 100
                    },
//                    listeners: {
//                        'afterrender': function(cmb, rec, opt) {
//                            cmb.getStore().load();
//                            cmb.setValue(parseInt(userDivisi));
//                            cmb.setReadOnly(true);
//                        },
//                        'change': function(cmb, rec, opt){
//                            var myVal = cmb.getValue(),
//                                ruanganStore = this.up('panel').down('#ruangDiv').getStore(), 
//                                filterCollection = [];
//
//                            this.up('panel').down('#ruangDiv').setReadOnly(false);
//
//                            var statusFilter = new Ext.util.Filter({
//                                property: 'cabang_id',
//                                value: userCabang
//                            });
//                            filterCollection.push(statusFilter);
//
//                            var statusFilter = new Ext.util.Filter({
//                                property: 'divisi_code',
//                                value: myVal
//                            });
//                            filterCollection.push(statusFilter);
//
//                            ruanganStore.clearFilter(true);
//                            ruanganStore.filter(filterCollection);
//                        }
//                    }
                },
                {
                    xtype: 'combobox',
                    name: 'pilihRuang',
                    itemId: 'ruangDiv',
                    triggerAction: 'all',
                    hideTrigger: false,
                    queryMode: 'remote',
                    minChars: 2,
//                    store: 'DivisiRuanganStore',
                    displayField: 'ruangName',
                    valueField: 'id',
                    emptyText: 'Pilih Ruangan',
                    allowBlank: true,
                    readOnly: true,
                    matchFieldWidth: false,
                    listConfig: {
                        minWidth: 125
                    }
                },
                {
                    xtype: 'triggerfield',
                    width: 190,
                    itemId: 'divSoNamaItem',
                    triggerCls: 'x-form-clear-trigger',
                    emptyText: 'Nama Barang',
                    hidden: true,
//                    store: 'ItemStore'
                },
                {
                    text: 'Daftar No Lot',
                    hidden: true,
                    action: 'divSoListLot'
                },
                {
                    text: 'Stock Opname',
                    hidden: true,
                    action: 'divSoList'
                },
                '->',
                {
                    xtype: 'button',
                    ui: 'blue-button',
                    iconCls: 'icon-btn-refresh',
//                    action: 'divSoRefresh'
                },
                {
                    xtype: 'button',
                    ui: 'blue-button',
                    iconCls: 'icon-btn-clear',
//                    action: 'divSoReset'
                }
            ],
            columns: [
                Ext.create('Ext.grid.RowNumberer'),
                {
                    width: 250,
                    header: 'NAMA BARANG',
                    dataIndex: 'barangName'
                },
                {
                    width: 100,
                    xtype: 'numbercolumn',
                    align: 'center',
                    header: 'STOCK AKHIR',
                    dataIndex: 'stockAkhir',
                    format: '000'
                }
            ]
        });

        me.callParent(arguments);
    }
});
/* End of file reservasiGrid.js */
/* Location: ./assets/js/app/view/reservasi/reservasiGrid.js */