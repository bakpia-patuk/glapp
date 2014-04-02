/**
 * @author Isht Ae
 **/
Ext.define('GlApp.view.gdtxfaktur.TxBgFakturGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.gdtxfaktur.txbgfakturgrid',
    itemId: 'txbgfakturgrid',
    border: false,
    store: 'gdtxfaktur.FakturStore',
    autoScroll: true,
    forceFit: false,
    columnLines: true,
    selModel: Ext.create('Ext.selection.CheckboxModel', {
    }),
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            viewConfig: {
                autoScroll: true,
                emptyText: 'Tidak ada data Terima Barang',
                deferEmptyText: false
            },
            tbar: [
                {
                    xtype: 'combobox',
                    fieldLabel: 'Filter ',
                    labelWidth: 40,
                    width: 200,
                    labelAlign: 'right',
                    emptyText: 'Nama Supplier',
                    displayField: 'type',
                    valueField: 'typeCode',
                    queryMode: 'local',
                    forceSelection: true,
                    typeAhead: true,
                    valueNotFoundText: 'Tidak ada Data'
                },
                {
                    text: 'SEARCH'
                },
                '->',
                {
                    text: 'REFRESH'
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
                {
                    xtype: 'datecolumn',
                    flex: 0.7,
                    text: 'NO FAKTUR',
                    dataIndex: 'faktur_tgl',
                    renderer: function(value, meta, record) {
                        var status = record.get('ttFakturStatus');
                        if (status !== 0) {
                            return Ext.util.Format.date(value, 'd/M/Y');
                        } else {
                            return '<span style="color:red;">' + Ext.util.Format.date(value, 'd/M/Y') + '</span>';
                        }
                    }
                },
                {
                    xtype: 'gridcolumn',
                    flex: 0.2,
                    text: 'NOMINAL',
                    dataIndex: 'faktur_no',
                    renderer: function(value, meta, record) {
                        var status = record.get('ttFakturStatus');
                        if (status !== 0) {
                            return value;
                        } else {
                            return '<span style="color:red;">' + value + '</span>';
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