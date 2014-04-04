/**
 * @author Isht Ae
 **/
Ext.define('GlApp.view.gdtxterima.TxTtListGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.gdtxterima.tsxttlistgrid',
    itemId: 'tsxttlistgrid',
    border: false,
    store: 'gdtxterima.TtListStore',
    autoScroll: true,
    forceFit: true,
    columnLines: true,

    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            viewConfig: {
                autoScroll: true,
                emptyText: 'Tidak ada data Penerimaan Barang',
                deferEmptyText: false
            },
            tbar: [
                {
                    xtype: 'datefield',
                    fieldLabel: 'Filter ',
                    labelWidth: 40,
                    labelAlign: 'right',
                    emptyText: 'Tgl. Awal',
                    displayField: 'type',
                    valueField: 'typeCode',
                    queryMode: 'local',
                    forceSelection: true,
                    typeAhead: true,
                    valueNotFoundText: 'Tidak ada Data'
                },
                {
                    xtype: 'datefield',
                    fieldLabel: ' s.d ',
                    labelWidth: 30,
                    labelAlign: 'right',
                    emptyText: 'Tgl. Akhir',
                    displayField: 'type',
                    valueField: 'typeCode',
                    queryMode: 'local',
                    forceSelection: true,
                    typeAhead: true,
                    valueNotFoundText: 'Tidak ada Data'
                },
                {
                    xtype: 'combobox',
                    emptyText: 'Cabang',
                    allowBlank: false
                },
                {
                    xtype: 'combobox',
                    emptyText: 'Supplier',
                    allowBlank: false
                },
                {
                    text: 'SEARCH'
                },
                '->',
                {
                    text: 'PRINT_TT'
                },
                {
                    text: 'REFRESH'
                },
                {
                    text: 'ALL'
                }
                
            ],
            columns: [
                Ext.create('Ext.grid.RowNumberer'),
                {
                    xtype: 'gridcolumn',
                    flex: 0.5,
                    text: 'Nama Barang',
                    dataIndex: 'barang_name'
                },
                {
                    xtype: 'datecolumn',
                    flex: 0.3,
                    text: 'TGL. TT',
                    dataIndex: 'tgl_trx',
                    renderer: Ext.util.Format.dateRenderer('d/M/Y')
                },
                {
                    xtype: 'numbercolumn',
                    flex: 0.2,
                    align: 'center',
                    text: 'QTY.',
                    format: '000',
                    dataIndex: 'tt_qty_kirim'

                },
                {
                    xtype: 'gridcolumn',
                    flex: 0.2,
                    text: 'CABANG',
                    dataIndex: 'cabang_name'
                }
            ]
        });

        me.callParent(arguments);
    }
});
/* End of file reservasiGrid.js */
/* Location: ./assets/js/app/view/reservasi/reservasiGrid.js */