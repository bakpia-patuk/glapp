/**
 * @author Isht Ae
 **/
Ext.define('GlApp.view.bkanggaran.BkAnggaranNonGrid', {
    extend: 'Ext.tree.Panel',
    xtype: 'check-tree',
    alias: 'widget.bkanggaran.bkanggarannongrid',
    itemId: 'bkanggarannongrid',
    title: 'NON SUPPLIER',
    ui:'orange-panel',
//    store: 'DaStoreTree2',
    useArrows: true,
    border: false,
    //componentCls: 'border-right',
    rootVisible: false,
    multiSelect: false,
    singleExpand: true,
    stripeRows: true,
    columnLines: true,
    cls: 'akunGrid',
    /*flex: 1,
     forceFit: true,*/

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            tbar: [
                {
                    xtype: 'combobox',
                    itemId: 'filterAnggaran2',
                    id: 'filterAnggaran2',
                    fieldLabel: 'Cabang ',
                    width: 250,
                    emptyText: 'Pilih',
                    labelWidth: 60,
                    displayField: 'cabangName',
                    valueField: 'id',
                    queryMode: 'remote',
                    name: 'filterCbPusat1',
                    allowBlank: true,
                    triggerAction: 'all',
//                    hidden: userCabang == 14 ? false : true,
//                    valueNotFoundText: 'Tidak ada Data',
//                    store: 'CabangStore',
//                    listeners: {
//                        select: function() {
//                            this.up('treepanel').store.setRootNode({idCabang: this.getValue()});
//
//                            Ext.getCmp('anggaranform').getForm().reset();
//                            Ext.getCmp('anggaranform').getForm().findField('rekSuppName').hide();
//
//                            Ext.getCmp('bankDebetTujuanAg').getStore().clearFilter(true);
//                            Ext.getCmp('bankDebetTujuanAg').getStore().filter('bank_cabang', this.getValue());
//                            
//                            Ext.getCmp('bankDebetAsalAg').getStore().clearFilter(true);
//                            Ext.getCmp('bankDebetAsalAg').getStore().filter('bank_cabang', this.getValue());
//                        }
//                    }
                },
                '->',
                {
                    ui: 'blue-button',
                    text: 'Daftar Terbayar',
                    iconCls: 'icon-btn-report',
//                    action: 'detailTerbayarNon'
                },
                '-',
                {
                    ui: 'blue-button',
                    text: 'Gagal Bayar',
                    iconCls: 'icon-btn-listdel',
//                    action: 'gagalTerbayar'
                },
                '-',
                {
                    ui: 'blue-button',
                    xtype: 'button',
                    iconCls: 'icon-btn-refresh',
//                    handler: function() {
//                        this.up('treepanel').store.setRootNode({idCabang: '0'});
//                        this.up('treepanel').down('#filterAnggaran2').clearValue();
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
                    width: 300,
                    text: 'KEPERLUAN',
                    dataIndex: 'fakturNo'
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
                    xtype: 'datecolumn',
                    width: 120,
                    text: 'JTH TEMPO BG',
                    dataIndex: 'bgEd'
                },
                {
                    text: 'REALISASI',
                    xtype: 'numbercolumn',
                    width: 150,
                    align: 'right',
                    dataIndex: 'fakturRealisasi',
                    format: '0.000,00/i'
                }
                /*{
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