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
    //componentCls: 'border-right',
    rootVisible: false,
    multiSelect: false,
    singleExpand: true,
    stripeRows: true,
    columnLines: false,
    cls: 'akunGrid',
    /*flex: 1,
     forceFit: true,*/

    initComponent: function () {
        var me = this;

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
//                    hidden: userCabang === '1' ? false : true,
//                    valueNotFoundText: 'Tidak ada Data',
                    store: 'bkrencanaagr.CabangStore',
                    listeners: {
                        afterrender: function() {
                            this.setValue(parseInt(CABANG_ID));
                        },
                        change: function() {
                            this.up('treepanel').store.setRootNode({idCabang: this.getValue()});
                        }
                    }
                },
                '->',
                {
                    xtype: 'button',
                    ui: 'orange-button',
                    iconCls: 'icon-btn-refresh',
                    text: 'Refresh',
                    handler: function () {
                        this.up('treepanel').store.setRootNode({idCabang: this.up('treepanel').down('#filterCbPusat1').getValue()});
                    }
                }
            ],
            columns: [
                {
                    xtype: 'treecolumn',
                    width: 300,
                    text: '',
                    dataIndex: 'displayName'
                },
                {
                    width: 150,
                    text: 'NO FAKTUR',
                    dataIndex: 'faktur_no'
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
                    xtype: 'datecolumn',
                    width: 120,
                    text: 'JTH TEMPO',
                    dataIndex: 'faktur_ed',
                    format: 'd/M/Y',
                    hidden: true
                },
                {
                    text: 'JADWAL BYR',
                    width: 200,
                    dataIndex: 'tgldari'
                },
                {
                    text: 'NO REK/BG',
                    width: 150,
                    dataIndex: 'no_rekbg'
                },
                {
                    width: 120,
                    text: 'JTH TEMPO BG',
                    dataIndex: 'faktur_bgstatus'
                },
                 {
                 text: 'JUMLAH',
                 xtype: 'numbercolumn',
                 width: 150,
                 align: 'right',
                 dataIndex: 'hp_cicilan_amt',
                 format: '0.000,00/i'
                 }/*,
                 {
                 text: 'Sisa Bayar',
                 xtype: 'numbercolumn',
                 width: 100,
                 align: 'right',
                 dataIndex: 'fakturSisaBayar',
                 format: '0.000,00/i',
                 hidden: true
                 }*/
            ]
        });

        me.callParent(arguments);
    }
});
/* End of file reservasiGrid.js */
/* Location: ./assets/js/app/view/reservasi/reservasiGrid.js */
