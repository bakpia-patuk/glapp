/**
 * @author coepoe
 **/
Ext.define('GlApp.view.bkmasuk.BkMasukGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.bkmasuk.bkmasukgrid',
    itemId: 'bkmasukgrid',
    autoScroll: true,
    title: 'DAFTAR BANK MASUK',
    forceFit: true,
    ui: 'orange-panel',
    store: 'bkmasuk.TrxBankStore',
    columnLines: true,
    flex: 1,
    border: false,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            viewConfig: {
                autoScroll: true,
                emptyText: 'Tidak ada data Transaksi Bank Keluar',
                deferEmptyText: false
            },
            tbar: [
                {
                    xtype: 'tbtext',
                    text: '<strong>Filter :&nbsp;&nbsp;</strong>'
                },
                {
                    xtype: 'datefield',
                    width: 100,
                    fieldLabel: 'Tgl. Awal',
                    emptyText: 'Tgl Awal',
                    hideLabel: true,
                    name: 'dateStart',
                    itemId: 'dateStartBmk',
                    format: 'd/M/Y',
                    submitFormat: 'Y-m-d',
                },
                {
                    xtype: 'tbtext',
                    text: '<small>s/d</small>'
                },
                {
                    xtype: 'datefield',
                    width: 100,
                    fieldLabel: 'Tgl. Akhir',
                    emptyText: 'Tgl Akhir',
                    hideLabel: true,
                    name: 'dateEnd',
                    itemId: 'dateEndBmk',
                    format: 'd/M/Y',
                    submitFormat: 'Y-m-d',
                },
                {
                    xtype: 'combobox',
                    itemId: 'cabangBmkFilter',
                    width: 150,
                    emptyText: 'Pilih cabang',
                    displayField: 'cabang_alias',
                    valueField: 'id',
                    queryMode: 'remote',
                    allowBlank: true,
                    triggerAction: 'all',
//                    hidden: userCabang == 1 ? false : true,
                    valueNotFoundText: 'Tidak ada Data',
                    store: 'bkmasuk.CabangStore',
                },
                {
                    xtype: 'combobox',
                    itemId: 'filterBankMasuk',
                    width: 150,
                    emptyText: 'Pilih Bank',
                    displayField: 'bank_alias',
                    valueField: 'id',
                    queryMode: 'remote',
                    name: 'filterCbPusat1',
                    allowBlank: true,
                    triggerAction: 'all',
                    valueNotFoundText: 'Tidak ada Data',
                    store: 'bkmasuk.BankStore',
                    listeners: {
                        afterrender: function() {
                            var store = this.getStore();

                            store.clearFilter(true);
                            store.filter('bank_cabang', CABANG_ID);
                        },
                    }
                },
                {
                    xtype: 'button',
                    ui: 'orange-button',
                    iconCls: 'icon-btn-refresh',
                    text: 'Search',
                    itemId: 'BankMasukSearch'
                },
                '->',
                {
                    xtype: 'button',
                    ui: 'orange-button',
                    iconCls: 'icon-btn-refresh',
                    text: 'Refresh',
                    handler: function() {
                        this.up('grid').getStore().load();
                        this.up('grid').getSelectionModel().clearSelections();
                    }
                },
                '-',
                {
                    xtype: 'button',
                    ui: 'orange-button',
                    text: 'Clear',
                    itemId: 'BankMasukClear',
                    iconCls: 'icon-btn-clear',
                }
            ],
            columns: [
                Ext.create('Ext.grid.RowNumberer'),
                {
                    xtype: 'datecolumn',
                    width: 100,
                    text: 'TGL. TRANS',
                    dataIndex: 'tglTransaksi',
                    renderer: Ext.util.Format.dateRenderer('d/M/Y')
                },
                {
                    xtype: 'gridcolumn',
                    width: 300,
                    hidden: false,
                    text: 'KEPERLUAN',
                    dataIndex: 'keteranganKd'
                },
                {
                    width: 150,
                    align: 'right',
                    header: 'JUMLAH',
                    dataIndex: 'kas_jumlah',
                    renderer: function(value, meta, record) {
                        return Ext.util.Format.number(value, '0.000,00/i');
                    }
                }
            ]
        });

        me.callParent(arguments);
    }
});
/* End of file reservasiGrid.js */
/* Location: ./assets/js/app/view/reservasi/reservasiGrid.js */