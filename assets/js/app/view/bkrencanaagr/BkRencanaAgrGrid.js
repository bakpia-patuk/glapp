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
    ui: 'blue-panel',
//    store: 'MaStoreTree',
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
                    displayField: 'cabangName',
                    valueField: 'id',
                    queryMode: 'remote',
                    name: 'filterCbPusat1',
                    itemId: 'filterCbPusat1',
                    allowBlank: true,
                    triggerAction: 'all',
//                    hidden: userCabang === '14' ? false : true,
//                    valueNotFoundText: 'Tidak ada Data',
//                    store: 'CabangStore',
//                    listeners: {
//                        afterrender: function() {
//                            this.setValue(parseInt(userCabang));
//                        },
//                        change: function() {
//                            this.up('treepanel').store.setRootNode({idCabang: this.getValue()});
//                        }
//                    }
                },
                '->',
                {
                    xtype: 'button',
                    ui: 'blue-button',
                    iconCls: 'icon-btn-refresh',
//                    handler: function () {
//                        this.up('treepanel').store.setRootNode({idCabang: this.up('treepanel').down('#filterCbPusat1').getValue()});
//                    }
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
                    dataIndex: 'fakturNo'
                },
                {
                    width: 150,
                    text: 'NO PO',
                    dataIndex: 'noPo'
                },
                {
                    width: 150,
                    text: 'NO TT',
                    dataIndex: 'noTt'
                },
                {
                    xtype: 'datecolumn',
                    width: 120,
                    text: 'JTH TEMPO',
                    dataIndex: 'fakturEd',
                    format: 'd/M/Y',
                    hidden: true
                },
                {
                    text: 'JADWAL BYR',
                    width: 200,
                    dataIndex: 'jadwalBayar'
                },
                {
                    text: 'NO REK/BG',
                    width: 150,
                    dataIndex: 'noRekBg'
                },
                {
                    width: 120,
                    text: 'JTH TEMPO BG',
                    dataIndex: 'bgEd'
                },
                 {
                 text: 'JUMLAH',
                 xtype: 'numbercolumn',
                 width: 150,
                 align: 'right',
                 dataIndex: 'fakturRealisasi',
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
