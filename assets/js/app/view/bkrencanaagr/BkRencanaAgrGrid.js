/**
 * @author Isht Ae
 **/
Ext.define('GlApp.view.bkrencanaagr.BkRencanaAgrGrid', {
    extend: 'Ext.tree.Panel',
    xtype: 'check-tree',
    alias: 'widget.bkrencanaagr.bkrencanaagrgrid',
    itemId: 'bkrencanaagrgrid',
    id: 'bkrencanaagrgrid',
    title: 'SUPPLIER',
    ui: 'orange-panel',
    store: 'bkrencanaagr.MaStoreTree',
    useArrows: true,
    border: false,
    rootVisible: false,
    multiSelect: false,
    singleExpand: true,
    stripeRows: true,
    columnLines: false,
    cls: 'akunGrid',
    initComponent: function() {
        var me = this;

        var tree = me;
        Ext.applyIf(me, {
            tbar: [
                {
                    xtype: 'combobox',
                    fieldLabel: 'Cabang ',
                    width: 250,
                    emptyText: 'Pilih',
                    labelWidth: 60,
                    displayField: 'cabang_alias',
                    valueField: 'id',
                    queryMode: 'remote',
                    name: 'filterCbPusat1',
                    itemId: 'filterCbPusat1',
                    allowBlank: true,
                    triggerAction: 'all',
                    hidden: CABANG_ID === 1 ? false : true,
                    valueNotFoundText: 'Tidak ada Data',
                    store: 'bkrencanaagr.CabangStore',
                    listeners: {
                        afterrender: function() {
                            this.setValue(parseInt(CABANG_ID));
                        },
                        change: function() {
                            this.up('treepanel').store.setRootNode({id: this.getValue()});
                        }
                    }
                },
                '->',
                {
                    xtype: 'button',
                    ui: 'orange-button',
                    iconCls: 'icon-btn-refresh',
                    text: 'REFRESH',
                    handler: function() {
                        tree.store.setRootNode({id: tree.down('#filterCbPusat1').getValue()});
                    }
                }
            ],
            columns: [
                {
                    xtype: 'treecolumn',
                    width: 300,
                    text: '',
                    dataIndex: 'name'
                },
                {
                    width: 150,
                    text: 'NO FAKTUR',
                    dataIndex: 'keterangan'
                },
                {
                    width: 150,
                    text: 'NO PO',
                    dataIndex: 'list_po'
                },
                {
                    width: 150,
                    text: 'NO TT',
                    dataIndex: 'list_tt'
                },
                {
                    text: 'JADWAL BYR',
                    width: 200,
                    dataIndex: 'jadwal_bayar'
                },
                {
                    text: 'NO REK/BG',
                    width: 100,
                    dataIndex: 'no_rekbg'
                },
                {
                    width: 100,
                    text: 'JTH TEMPO BG',
                    dataIndex: 'bg_ed'
                },
                {
                    text: 'JUMLAH',
                    xtype: 'numbercolumn',
                    width: 120,
                    align: 'right',
                    dataIndex: 'ma_value'
                }
            ]
        });

        me.callParent(arguments);
    }
});
/* End of file reservasiGrid.js */
/* Location: ./assets/js/app/view/reservasi/reservasiGrid.js */
