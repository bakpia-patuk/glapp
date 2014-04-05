/**
 * @author Isht Ae
 **/
Ext.define('GlApp.view.bkanggaran.BkAnggaranGrid', {
    extend: 'Ext.tree.Panel',
    xtype: 'check-tree',
    alias: 'widget.bkanggaran.bkanggarangrid',
    itemId: 'bkanggarangrid',
    store: 'bkanggaran.DaStoreTree',
    useArrows: true,
    ui: 'orange-panel',
    border: true,
    //componentCls: 'border-right',
    rootVisible: false,
    multiSelect: false,
    singleExpand: true,
    stripeRows: true,
    columnLines: true,
    cls: 'akunGrid',
    //flex: 1,
    //forceFit: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            tbar: [
                {
                    xtype: 'combobox',
                    itemId: 'filterAnggaran',
                    id: 'filterAnggaran',
                    fieldLabel: 'Cabang ',
                    width: 250,
                    emptyText: 'Pilih',
                    labelWidth: 60,
                    displayField: 'cabang_alias',
                    valueField: 'id',
                    queryMode: 'remote',
                    name: 'filterCbPusat1',
                    allowBlank: true,
                    triggerAction: 'all',
//                    hidden: userCabang == 1 ? false : true,
//                    valueNotFoundText: 'Tidak ada Data',
                    store: 'bkanggaran.CabangStore',
                    listeners: {
                        select: function() {
                            this.up('treepanel').store.setRootNode({idCabang: this.getValue()});
                            
//                            Ext.getCmp('bankDebetTujuanAg').getStore().clearFilter(true);
//                            Ext.getCmp('bankDebetTujuanAg').getStore().filter('bank_cabang', this.getValue());
//                            
//                            Ext.getCmp('bankDebetAsalAg').getStore().clearFilter(true);
//                            Ext.getCmp('bankDebetAsalAg').getStore().filter('bank_cabang', this.getValue());
//                            
//                            Ext.getCmp('anggaranform').getForm().reset();
//                            Ext.getCmp('anggaranform').getForm().findField('rekSuppName').hide();
                        }
                    }
                },
                '->',
                {
                    xtype: 'button',
                    ui: 'orange-button',
                    text: 'List Faktur BG',
//                    action: 'listFktBg',
                    itemId: 'ListFakturBgAgr',
                    iconCls: 'icon-btn-report',
                    hidden: true
                },
                {
                    ui: 'orange-button',
                    text: 'Daftar Terbayar',
                    iconCls: 'icon-btn-report',
//                    action: 'detailTerbayar',
                    hidden: true
                },
                {
                    ui: 'orange-button',
                    text: 'Gagal Bayar',
                    iconCls: 'icon-btn-listdel',
//                    action: 'gagalTerbayar',
                    hidden: true
                },
                {
                    ui: 'orange-button',
                    text: 'Refresh',
                    iconCls: 'icon-btn-refresh',
                    handler: function() {
                        this.up('treepanel').store.setRootNode({idCabang: '0'});
                        this.up('treepanel').down('#filterAnggaran').clearValue();
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
                    text: 'NO PO',
                    dataIndex: 'list_po'
                },
                {
                    width: 150,
                    text: 'NO TT BARANG',
                    dataIndex: 'list_tt'
                },
                {
                    width: 150,
                    text: 'NO FAKTUR/ BG',
                    dataIndex: 'faktur_no'
                },
                {
                    text: 'NOMINAL',
                    xtype: 'numbercolumn',
                    width: 100,
                    align: 'right',
                    dataIndex: 'faktur_nominal',
                    renderer: function (value, meta, record) {
                        if (record.get('isData') == 1) {
                            return Ext.util.Format.number(value, '0.000,00/i');
                        }
                        else {
                            return "";
                        }
                    }
                },
                {
                    text: 'REALISASI',
                    xtype: 'numbercolumn',
                    width: 100,
                    align: 'right',
                    dataIndex: 'faktur_byrrealisasi',
                    renderer: function (value, meta, record) {
                        if (record.get('isData') == 1) {
                            return Ext.util.Format.number(value, '0.000,00/i');
                        }
                        else {
                            return "";
                        }
                    }
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