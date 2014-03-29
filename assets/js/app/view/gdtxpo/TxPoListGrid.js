/**
 * @author Isht Ae
 **/
Ext.define('GlApp.view.gdtxpo.TxPoListGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.gdtxpo.txpolistgrid',
    itemId: 'txpolistgrid',
    border: false,
//    store: 'ItemStore',
    autoScroll: true,
    forceFit: true,
    columnLines: true,
    selModel: Ext.create('Ext.selection.CheckboxModel', {
    }),

    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            viewConfig: {
                autoScroll: true,
                emptyText: 'Tidak ada data Pengadaan',
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
                    text: 'SEARCH'
                },
                '->',
                {
                    text: 'PRINT_PO'
                },
                {
                    text: 'SEND_PDF'
                },
                {
                    text: 'REFRESH'
                },
                {
                    text: 'ALL'
                }
                
            ],
            columns: [
                {
                    xtype: 'gridcolumn',
                    width: 120,
                    text: 'NO PENGADAAN',
                    dataIndex: 'namams'
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    text: 'TGL. PENGADAAN',
                    dataIndex: 'alamatms'
                },
                {
                    xtype: 'gridcolumn',
                    width: 150,
                    text: 'CABANG',
                    dataIndex: 'namakotams'
                },
                {
                    xtype: 'gridcolumn',
                    width: 150,
                    text: 'DIVISI',
                    dataIndex: 'tlpms'
                }
            ]
        });

        me.callParent(arguments);
    }
});
/* End of file reservasiGrid.js */
/* Location: ./assets/js/app/view/reservasi/reservasiGrid.js */