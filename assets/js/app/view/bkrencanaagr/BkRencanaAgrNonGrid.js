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
    //componentCls: 'border-right',
    rootVisible: false,
    multiSelect: false,
    singleExpand: true,
    stripeRows: true,
    columnLines: false,
    cls: 'akunGrid',
    /*flex: 1,
     forceFit: true,*/

    initComponent: function() {
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
                    name: 'filterCbPusat2',
                    itemId: 'filterCbPusat2',
                    allowBlank: true,
                    triggerAction: 'all',
//                    hidden: userCabang === '14' ? false : true,
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
                    text: 'Approve',
                    ui: 'orange-button',
                    handler: function() {
                        var tree = this.up('treepanel'),
                                sel = tree.getSelectionModel().getSelection();

                        if (!sel.length) {
                            Ext.Msg.alert('Info', 'Pilih Data yang akan di Approve');
                            return;
                        }

                        if (sel[0].get('no_tt') === '1') {
                            Ext.Msg.alert('Info', 'Data sudah di Approve');
                            return;
                        }

                        Ext.Ajax.request({
                            url: BASE_PATH + 'bk_rencanaagr/app_rencanaanggaran',
                            method: 'POST',
                            params: {id: sel[0].data.cabang_city},
                            scope: this,
                            callback: function(options, success, response) {
                                var resp = Ext.decode(response.responseText);

                                if (resp.success === 'true') {
                                    Ext.Msg.alert('Info', 'Approval Sukses');
                                    tree.store.setRootNode({idCabang: tree.down('#filterCbPusat2').getValue()});
                                }
                            }
                        });

//                        this.up('treepanel').store.setRootNode({idCabang: this.up('treepanel').down('#filterCbPusat2').getValue()});
                        // this.up('treepanel').down('#filterCbPusat2').clearValue();
                    }
                },
                {
                    xtype: 'button',
                    ui: 'orange-button',
                    iconCls: 'icon-btn-refresh',
                    text: 'Refresh',
                    handler: function() {
                        this.up('treepanel').store.setRootNode({idCabang: this.up('treepanel').down('#filterCbPusat2').getValue()});
                        // this.up('treepanel').down('#filterCbPusat2').clearValue();
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
                    width: 300,
                    text: 'KEPERLUAN',
                    dataIndex: 'list_po'
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
