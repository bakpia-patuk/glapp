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
    store: 'bkanggaran.MaNonStoreTree',
    useArrows: true,
    border: false,
    rootVisible: false,
    multiSelect: false,
    singleExpand: true,
    stripeRows: true,
    columnLines: true,
    cls: 'akunGrid',

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
                    displayField: 'cabang_alias',
                    valueField: 'id',
                    queryMode: 'remote',
                    name: 'filterCbPusat1',
                    allowBlank: true,
                    triggerAction: 'all',
                    hidden: CABANG_ID === 1 ? false : true,
                    valueNotFoundText: 'Tidak ada Data',
                    store: 'bkanggaran.CabangNonStore',
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
                        this.up('treepanel').store.setRootNode({idCabang: '0'});
                        this.up('treepanel').down('#filterAnggaran2').clearValue();
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
                    width: 300,
                    text: 'KEPERLUAN',
                    dataIndex: 'keterangan'
                },
                {
                    text: 'JADWAL BYR',
                    width: 200,
                    dataIndex: 'jadwal_bayar'
                },
                {
                    text: 'NO REK/BG',
                    width: 150,
                    dataIndex: 'no_rekbg'
                },
                {
                    width: 120,
                    text: 'JTH TEMPO BG',
                    dataIndex: 'bg_ed'
                },
                {
                    text: 'REALISASI',
                    xtype: 'numbercolumn',
                    width: 150,
                    align: 'right',
                    dataIndex: 'faktur_byrrealisasi',
                    format: '0.000,00/i'
                }
            ]
        });

        me.callParent(arguments);
    }
});
/* End of file reservasiGrid.js */
/* Location: ./assets/js/app/view/reservasi/reservasiGrid.js */