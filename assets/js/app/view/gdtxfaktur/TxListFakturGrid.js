/**
 * @author Isht Ae
 **/
Ext.define('GlApp.view.gdtxfaktur.TxListFakturGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.gdtxfaktur.txlistfakturgrid',
    itemId: 'txlistfakturgrid',
    border: false,
    store: 'gdtxfaktur.ListFakturStore',
    autoScroll: true,
    forceFit: false,
    columnLines: true,
    selModel: Ext.create('Ext.selection.CheckboxModel', {
    }),

    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            viewConfig: {
                autoScroll: true,
                emptyText: 'Tidak ada data Faktur',
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
                    width: 150,
                    emptyText: 'Nama cabang',
                    allowBlank: false
                },
                {
                    text: 'SEARCH'
                },
                '->',
                {
                    text: 'CETAK_ULANG'
                },
                {
                    text: 'REFRESH'
                },
                {
                    text: 'ALL'
                }
            ],
            features: [
                {
                    startCollapsed: false,
                    id: 'poPengGroup',
                    ftype: 'grouping',
                    groupHeaderTpl: 'No Pengadaan : {name}',
                    hideGroupedHeader: false,
                    //remoteRoot: 'summaryData',
                    enableGroupingMenu: true
                }
            ],
            columns: [
                Ext.create('Ext.grid.RowNumberer'),
                {
                    xtype: 'datecolumn',
                    flex: 0.35,
                    text: 'TGL. FAKTUR',
                    dataIndex: 'faktur_tgl',
                    renderer: Ext.util.Format.dateRenderer('d/M/Y')
                },
                {
                    xtype: 'gridcolumn',
                    flex: 0.35,
                    text: 'NO FAKTUR',
                    dataIndex: 'faktur_no'
                },
                {
                    xtype: 'numbercolumn',
                    flex: 0.3,
                    align: 'right',
                    text: 'TOTAL',
                    dataIndex: 'faktur_nototal'
                },
                {
                    xtype: 'gridcolumn',
                    flex: 0.2,
                    text: 'CABANG',
                    dataIndex: 'faktur_cabang'
                }

            ]
        });

        me.callParent(arguments);
    }
});
/* End of file reservasiGrid.js */
/* Location: ./assets/js/app/view/reservasi/reservasiGrid.js */