/**
 * @author coepoe
 **/

Ext.define('GlApp.controller.GetIvTxBrMinta', {
    extend: 'GlApp.controller.Base',
    models: [
    ],
    stores: [
        'ivtxbrminta.IvTxBrMintaStore',
        'ivtxbrminta.IvTxBrMintaDetailStore',
        'ivtxbrminta.CabangStore',
        'ivtxbrminta.DivisiFormStore'
    ],
    views: [
        'ivtxbrminta.GetIvTxBrMinta',
        'ivtxbrminta.IvTxBrMintaForm',
        'ivtxbrminta.IvTxBrMintaGrid',
        'ivtxbrminta.IvTxBrMintaDetailGrid'
    ],
    refs: [
        {ref: 'IvTxBrMintaForm', selector: '#ivtxbrmintaform'},
        {ref: 'IvTxBrMintaGrid', selector: '#ivtxbrmintagrid'},
        {ref: 'IvTxBrMintaDetailGrid', selector: '#ivtxbrmintadetailgrid'}
    ],
    init: function () {
        this.control({
            '#ivtxbrmintagrid': {
                afterrender: function (model, records) {
                    var store = this.getIvTxBrMintaGrid().getStore(),
                        filterCollection = [];

                    var filter2 = new Ext.util.Filter({
                        property: 'penginv_cabang',
                        value: CABANG_ID
                    });
                    filterCollection.push(filter2);

                    store.clearFilter(true);
                    store.filter(filterCollection);
                },
//                selectionchange: function (model, records) {
//                    var form = this.getInvMbForm().getForm();
//
//                    if(records[0]) {
//                        form.loadRecord(records[0]);
//                        form.findField('ruangan').setReadOnly(true);
//                        form.findField('pengBarang').setReadOnly(true);
//                        form.findField('divisiTujuan').setReadOnly(true);
//                        form.findField('tujuan').setReadOnly(true);
//
//                        form.findField('pengBarang').clearValue();
//                        form.findField('jumlah').setValue(0);
//                    }
//                },
                itemclick: function () {
                    var form = this.getIvTxBrMintaForm().getForm(),
                        grid = this.getIvTxBrMintaGrid(),
                        store = this.getIvTxBrMintaDetailGrid().getStore(),
                        sel = grid.getSelectionModel().getSelection(),
                        idPeng = sel[0].get('id');

                    store.clearFilter(true);
                    store.filter('penginv_id', idPeng);
                }
            },
            '#TxBrMintaSearch':{
                click: function(){
                    var grid = this.getIvTxBrMintaGrid(),
                            grid2 = this.getIvTxBrMintaDetailGrid(),
                            store = grid.getStore(),
                            store2 = grid2.getStore(),
                            filterCollection = [],
                            date1 = grid.down('#dateMbInvFilter').getValue(),
                            date2 = grid.down('#dateMbInvFilter2').getValue(),
                            cabang = grid.down('#cabangMbInvFilter').getValue();
                    
                    if(date1 == null && date2 == null && cabang == null){
                        Ext.Msg.alert('Perhatian', 'Mohon isi salah satu filter.');
                        return;
                    } else {
                        if(date1 !== null){
                            var statusFilter = new Ext.util.Filter({
                                property: 'tgl_trx',
                                value: Ext.Date.format(date1, 'Y-m-d 00:00:00') + 'GT'
                            });
                            filterCollection.push(statusFilter);                            
                        }
                        
                        if(date2 !== null){
                            var statusFilter = new Ext.util.Filter({
                                property: 'tgl_trx',
                                value: Ext.Date.format(date2, 'Y-m-d 23:59:59') + 'LT'
                            });
                            filterCollection.push(statusFilter);                            
                        }
                        
                        if(cabang !== null){
                            var statusFilter = new Ext.util.Filter({
                                property: 'penginv_cabang',
                                value: cabang
                            });
                            filterCollection.push(statusFilter);
                        }
                        
                        store.clearFilter(true);
                        store.filter(filterCollection);
                        
                        store2.removeAll();
                    }
                }
            },
            '#TxBrMintaApp':{
                click: function(){
                    var type = 1;
                    var grid = this.getIvTxBrMintaGrid(),
                        form = this.getIvTxBrMintaForm().getForm(),
                        gridDetail = this.getIvTxBrMintaDetailGrid(),
                        gridStore = grid.getStore(),
                        cmb = form.findField('divisi'),
                        cmb1 = form.findField('ruangan');

                    if (grid) {
                        var sm = grid.getSelectionModel();
                        var rs = sm.getSelection();
                        if (!rs.length) {
                            Ext.Msg.alert('Info', 'Pilih dahulu Transaksi yang akan di Approve');
                            return;
                        }
                        var sel = grid.getSelectionModel().getSelection();

//                        var id = '';
//                        for (var i = 0; i < sel.length; i++) {
//                            id = id + sel[i].get('idPengadaan') + '-';
//                        }

                        Ext.Ajax.request({
                            url: BASE_PATH + 'iv_txbrminta/approve_ivtxbrminta',
                            method: 'POST',
                            params: {data : sel[0].get('id')},
                            scope: this,
                            callback: function (options, success, response) {
                                var resp = Ext.decode(response.responseText);

                                if (resp.success === 'true') {
                                    Ext.MessageBox.show({
                                        title: 'Info',
                                        msg: resp.message,
                                        buttons: Ext.MessageBox.OK,
                                        icon: Ext.MessageBox.INFO
                                    });

                                    form.reset();
                                    cmb.getStore().load();
                                    cmb.setValue(USER_DIVISI);
                                    cmb.setReadOnly(true);
                                    cmb1.clearValue();
                                    form.findField('pengBarang').setReadOnly(false);
                                    form.findField('divisiTujuan').setReadOnly(false);
                                    form.findField('tujuan').setReadOnly(false);

                                    gridStore.load();
                                    gridDetail.getStore().removeAll();
                                    this.getIvTxBrMintaGrid().getSelectionModel().clearSelections();
                                } else {
                                    Ext.MessageBox.show({
                                        title: 'Error',
                                        msg: resp.message,
                                        buttons: Ext.MessageBox.OK,
                                        icon: Ext.MessageBox.ERROR
                                    });
                                    return;
                                }
                            }
                        });
                    }
                }
            }
        });
    }
});

/* End of file SystemMenu.js */
/* Location: ./assets/js/app/controller/SystemMenu.js */