/**
 * @author Isht Ae
 **/
Ext.define('GlApp.view.bkanggaran.BkAnggaran1Grid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.bkanggaran.bkanggaran1grid',
    itemId: 'bkanggaran1grid',
    id: 'bkanggaran1grid',
    title: 'SUPPLIER ACCOUNT 1',
    autoScroll: true,
    forceFit: true,
    ui: 'orange-panel',
    store: 'bkanggaran.AgrSuppStore',
    columnLines: true,
    flex: 1,
    border: false,
    selModel: Ext.create('Ext.ux.selection.CheckboxModel', {
        header: false,
        checkOnly: true
    }),

    initComponent: function() {
        var me = this;

        var grid = me;

        Ext.applyIf(me, {
            viewConfig: {
                autoScroll: true,
                emptyText: 'Tidak ada data Supplier Account',
                deferEmptyText: false
            },
            tbar: [
                '->',
                {
                    ui: 'blue-button',
                    text: 'Daftar Terbayar',
                    iconCls: 'icon-btn-report',
                    hidden: true
                },
                {
                    ui: 'blue-button',
                    text: 'Gagal Bayar',
                    iconCls: 'icon-btn-listdel',
                    hidden: true
                },
                {
                    ui: 'blue-button',
                    xtype: 'button',
                    text: 'REFRESH',
                    iconCls: 'icon-btn-refresh',
                    handler: function() {
                        grid.getStore().load();
                    }
                }
            ],
            features: [
                {
                    startCollapsed: false,
                    id: 'agr1gridsum',
                    ftype: 'groupingsummary',
                    groupHeaderTpl: 'Nama Supplier : {name}',
                    hideGroupedHeader: false,
                    //remoteRoot: 'summaryData',
                    enableGroupingMenu: true
                }
            ],
            columns: [
                {
                    width: 200,
                    text: 'NO FAKTUR',
                    dataIndex: 'faktur_no'
                },
                {
                    text: 'CABANG',
                    width: 150,
                    dataIndex: 'kotaCabang',
                    summaryRenderer: function (value, summaryData, dataIndex) {
                        return '<span style="font-weight:bold;font-size:12px"> Total</span>';
                    }
                },
                {
                    text: 'NOMINAL',
                    xtype: 'numbercolumn',
                    width: 150,
                    align: 'right',
                    dataIndex: 'faktur_nototal',
                    summaryType: 'sum',
                    renderer: function (value, meta, record) {
                        return Ext.util.Format.number(value, '0,000.00/i');
                    },
                    summaryRenderer: function (value, summaryData, dataIndex) {
                        return '<span style="font-weight:bold;font-size:12px">' + Ext.util.Format.number(value, '0,000.00/i') + '</span>';
                    }
                }
            ]
        });

        me.callParent(arguments);
    }
});
/* End of file reservasiGrid.js */
/* Location: ./assets/js/app/view/reservasi/reservasiGrid.js */