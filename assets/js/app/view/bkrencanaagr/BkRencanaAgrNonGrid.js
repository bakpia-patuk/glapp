/**
 * @author Isht Ae
 **/
Ext.define('GlApp.view.bkrencanaagr.BkRencanaAgrNonGrid', {
    extend: 'Ext.tree.Panel',
    xtype: 'check-tree',
    alias: 'widget.bkrencanaagr.bkrencanaagrnongrid',
    itemId: 'bkrencanaagrnongrid',
    id: 'bkrencanaagrnongrid',
    title: 'NON SUPPLIER',
    ui: 'orange-panel',
    store: 'bkrencanaagr.MaNonStoreTree',
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
                    name: 'filterCbPusat2',
                    itemId: 'filterCbPusat2',
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
                    text: 'APPROVE',
                    ui: 'orange-button',
                    handler: function() {
                        var tree = this.up('treepanel'),
                                sel = tree.getSelectionModel().getSelection();

                        if (!sel.length) {
                            Ext.Msg.alert('Info', 'Pilih Data yang akan di Approve');
                            return;
                        }

                        if (sel[0].get('app_status') === 1) {
                            Ext.Msg.alert('Info', 'Data sudah di Approve');
                            return;
                        }

                        Ext.Ajax.request({
                            url: BASE_PATH + 'bk_rencanaagr/app_rencanaanggaran',
                            method: 'POST',
                            params: {id: sel[0].data.id_trx},
                            scope: this,
                            callback: function(options, success, response) {
                                var resp = Ext.decode(response.responseText);

                                if (resp.success === 'true') {
                                    Ext.Msg.alert('Info', 'Approval Sukses');
                                    tree.store.setRootNode({id: tree.down('#filterCbPusat2').getValue()});
                                }
                            }
                        });
                    }
                },
                {
                    xtype: 'button',
                    ui: 'orange-button',
                    iconCls: 'icon-btn-refresh',
                    text: 'REFRESH',
                    handler: function() {
                        tree.store.setRootNode({id: tree.down('#filterCbPusat2').getValue()});
                    }
                }
            ],
            columns: [
                {
                    xtype: 'treecolumn',
                    width: 180,
                    text: '',
                    dataIndex: 'name'
                },
                {
                    width: 50,
                    text: 'ID TRX',
                    hidden: false,
                    dataIndex: 'id_trx'
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
