/**
 * @author Isht Ae
 **/
Ext.define('GlApp.view.bkanggaran.BkAnggaranGrid', {
    extend: 'Ext.tree.Panel',
    xtype: 'check-tree',
    alias: 'widget.bkanggaran.bkanggarangrid',
    itemId: 'bkanggarangrid',
    store: 'bkanggaran.MaStoreTree',
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
                    hidden: CABANG_ID === 1 ? false : true,
                    valueNotFoundText: 'Tidak ada Data',
                    store: 'bkanggaran.CabangStore',
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
                    hidden: true
                },
                {
                    ui: 'orange-button',
                    text: 'Gagal Bayar',
                    iconCls: 'icon-btn-listdel',
                    hidden: true
                },
                {
                    ui: 'orange-button',
                    text: 'REFRESH',
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
                    dataIndex: 'name'
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
                    dataIndex: 'no_rekbg'
                },
                {
                    text: 'NOMINAL',
                    xtype: 'numbercolumn',
                    width: 100,
                    align: 'right',
                    dataIndex: 'ma_value',
                    renderer: function(value, meta, record) {
//                        if (record.get('isData') == 1) {
                        return Ext.util.Format.number(value, '0.000,00/i');
//                        }
//                        else {
//                            return "";
//                        }
                    }
                },
                {
                    text: 'REALISASI',
                    xtype: 'numbercolumn',
                    width: 100,
                    align: 'right',
                    dataIndex: 'faktur_byrrealisasi',
                    renderer: function(value, meta, record) {
//                        if (record.get('isData') == 1) {
                        return Ext.util.Format.number(value, '0.000,00/i');
//                        }
//                        else {
//                            return "";
//                        }
                    }
                }
            ]
        });

        me.callParent(arguments);
    }
});
/* End of file reservasiGrid.js */
/* Location: ./assets/js/app/view/reservasi/reservasiGrid.js */