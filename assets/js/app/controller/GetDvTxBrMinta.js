/**
 * @author Isht Ae
 **/

Ext.define('GlApp.controller.GetDvTxBrMinta', {
    extend: 'GlApp.controller.Base',
    models: [
    ],
    stores: [
    'dvtxbrminta.DivisiStore', 'dvtxbrminta.DivisiStore1', 'dvtxbrminta.DivisiRuanganStore', 'dvtxbrminta.DivisiRuanganStore1', 'dvtxbrminta.ItemStore',
        'dvtxbrminta.PengdivStore', 'dvtxbrminta.PengdivDetailStore'
    ],
    views: [
        'dvtxbrminta.GetDvTxBrMinta',
        'dvtxbrminta.DvTxBrMintaForm',
        'dvtxbrminta.DvTxBrMintaGrid',
        'dvtxbrminta.DvTxBrMintaDetailGrid'
    ],
    refs: [
        {ref: 'DvTxBrMintaForm', selector: '#dvtxbrmintaform'},
        {ref: 'DvTxBrMintaGrid', selector: '#dvtxbrmintagrid'},
        {ref: 'DvTxBrMintaDetailGrid', selector: '#dvtxbrmintadetailgrid'}
    ],
    init: function () {
        this.control({
            '#dvtxbrmintaform button[action=pengDivMintaBarang]': {
                click: function(btn, e, opt) {
                    var grid2 = this.getDvTxBrMintaDetailGrid(),
                        store2 = grid2.getStore(),
                        form = this.getDvTxBrMintaForm().getForm(),
                        barangField = form.findField('pengBarang'),
                        jumlahField = form.findField('jumlah'),
                        cmb = form.findField('divisi'),
                        id = form.findField('id'),
                        idDetail = form.findField('idDetail');
                
                    if(barangField.getValue() !== null && jumlahField.getValue() > 0) {
                        Ext.Ajax.request({
                            url: BASE_PATH + 'dv_txbrminta/add_pengdiv_item',
                            method: 'POST',
                            params: form.getValues(),
                            scope: this,
                            callback: function (options, success, response) {
                                var resp = Ext.decode(response.responseText);

                                if (resp.success === 'true') {
                                    if(idDetail.getValue() !== "") {
                                        store2.clearFilter(true);
                                        store2.filter('pengdiv_id', id.getValue());
                                    } else {
                                        form.reset();
                                        cmb.getStore().load();
                                        cmb.setValue(parseInt(USER_DIVISI));
                                        cmb.setReadOnly(true);
                                        form.findField('ruangan').setReadOnly(true);
                                        if(resp.data.divTujuan !== 0) {
                                            form.findField('divisiTujuan').setValue(parseInt(resp.data.divTujuan));
                                            form.findField('divisiTujuan').setReadOnly(true);
                                        }
                                        if(resp.data.ruangTujuan !== 0) {
                                            form.findField('tujuan').setValue(parseInt(resp.data.ruangTujuan));
                                            form.findField('tujuan').setReadOnly(true);
                                        }

                                        id.setValue(resp.data.pengId);
                                        store2.clearFilter(true);
                                        store2.filter('pengdiv_id', resp.data.pengId);
                                    }
                                } else {
                                    Ext.MessageBox.show({
                                        title: resp.message,
                                        msg: resp.data,
                                        buttons: Ext.MessageBox.OK,
                                        icon: Ext.MessageBox.ERROR
                                    });
                                }
                            }
                        });
                    } else {
                        Ext.Msg.alert('Warning', 'Barang atau Jumlah tidak bisa kosong');
                        return;
                    }
                }
            },
            '#dvtxbrmintaform button[action=dmbSave]': {
                click: function(btn, e, opt) {
                    var grid = this.getDvTxBrMintaGrid(),
                        store = grid.getStore(),
                        grid2 = this.getDvTxBrMintaDetailGrid(),
                        store2 = grid2.getStore(),
                        form = this.getDvTxBrMintaForm().getForm(),
                        divisiField = form.findField('divisiTujuan'),
                        tujuanField = form.findField('tujuan'),
                        cmb = form.findField('divisi'),
                        cmb1 = form.findField('ruangan'),
                        id = form.findField('id');

                    if(id.getValue() === "") {
                        Ext.Msg.alert('Warning', 'Anda harus melakukan transaksi minimal 1 barang');
                        return;
                    }

                    if(divisiField.getValue() === null || tujuanField.getValue() == null) {
                        Ext.Msg.alert('Warning', 'Divisi Tujuan dan Gudang Tujuan harus diisi');
                        return;
                    }
                    
                    Ext.Ajax.request({
                        url: BASE_PATH + 'dv_txbrminta/pengdiv_complete',
                        method: 'POST',
                        params: form.getValues(),
                        scope: this,
                        callback: function (options, success, response) {
                            var resp = Ext.decode(response.responseText);

                            if (resp.success === 'true') {
                                form.reset();
                                cmb.getStore().load();
                                cmb.setValue(parseInt(USER_DIVISI));
                                cmb.setReadOnly(true);
                                cmb1.clearValue();
                                form.findField('pengBarang').setReadOnly(false);
                                form.findField('divisiTujuan').setReadOnly(false);
                                form.findField('tujuan').setReadOnly(false);

                                store.load();
                                store2.removeAll();
                                this.getDvTxBrMintaGrid().getSelectionModel().clearSelections();
                            }
                        }
                    });
                }
            },
            '#dvtxbrmintaform button[action=dmbNew]': {
                click: function(btn, e, opt) {
                    var grid = this.getDvTxBrMintaGrid(),
                        store = grid.getStore(),
                        grid2 = this.getDvTxBrMintaDetailGrid(),
                        store2 = grid2.getStore(),
                        form = this.getDvTxBrMintaForm().getForm(),
                        cmb = form.findField('divisi'),
                        cmb1 = form.findField('ruangan');

                    Ext.Ajax.request({
                        url: BASE_PATH + 'dv_txbrminta/pengdiv_reset',
                        method: 'POST',
                        scope: this,
                        callback: function (options, success, response) {
                            var resp = Ext.decode(response.responseText);

                            if (resp.success === 'true') {
                                form.reset();
                                cmb.getStore().load();
                                cmb.setValue(parseInt(userDivisi));
                                cmb.setReadOnly(true);
                                cmb1.clearValue();
                                form.findField('pengBarang').setReadOnly(false);
                                form.findField('divisiTujuan').setReadOnly(false);
                                form.findField('tujuan').setReadOnly(false);

                                store.load();
                                store2.removeAll();
                                this.getDvTxBrMintaGrid().getSelectionModel().clearSelections();
                            }
                        }
                    });
                }
            },
            '#dvtxbrmintagrid button[action=apprDivMb]': {
                click: function(btn, e, opt) {
                    var type = 1;
                    var grid = this.getDvTxBrMintaGrid(),
                        form = this.getDvTxBrMintaForm().getForm(),
                        gridDetail = this.getDvTxBrMintaDetailGrid(),
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

                        Ext.Ajax.request({
                            url: BASE_PATH + 'dv_txbrminta/approve_mb_div',
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
                                    form.reset();
                                    cmb.getStore().load();
                                    cmb.setValue(parseInt(USER_DIVISI));
                                    cmb.setReadOnly(true);
                                    cmb1.clearValue();
                                    form.findField('pengBarang').setReadOnly(false);
                                    form.findField('divisiTujuan').setReadOnly(false);
                                    form.findField('tujuan').setReadOnly(false);

                                    gridStore.load();
                                    gridDetail.getStore().removeAll();
                                    this.getDvTxBrMintaGrid().getSelectionModel().clearSelections();
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
            },
            '#dvtxbrmintagrid': {
                afterrender: function () {
                    var grid = this.getDvTxBrMintaGrid(),
                        store = grid.getStore(),
                        filterCollection = [];

                    var filter2 = new Ext.util.Filter({
                        property: 'pengdiv_cabang',
                        value: CABANG_ID
                    });
                    filterCollection.push(filter2);

                    var filter2 = new Ext.util.Filter({
                        property: 'pengdiv_divisi',
                        value: USER_DIVISI 
                    });
                    filterCollection.push(filter2);

                    store.clearFilter(true);
                    store.filter(filterCollection);
                },
                selectionchange: function (model, records) {
                    var form = this.getDvTxBrMintaForm().getForm();
//                        form.findField('ruangan').getStore().load();

                    if(records[0]) {
                        form.loadRecord(records[0]);
                        form.findField('ruangan').setReadOnly(true);
                        form.findField('pengBarang').setReadOnly(true);
                        form.findField('divisiTujuan').setReadOnly(true);
                        form.findField('tujuan').setReadOnly(true);

                        form.findField('pengBarang').clearValue();
                        form.findField('jumlah').setValue(0);
                    }
                },
                itemclick: function () {
                    var form = this.getDvTxBrMintaForm().getForm(),
                        grid = this.getDvTxBrMintaGrid(),
                        store = this.getDvTxBrMintaDetailGrid().getStore(),
                        sel = grid.getSelectionModel().getSelection(),
                        idPeng = sel[0].get('id');

                    store.clearFilter(true);
                    store.filter('pengdiv_id', idPeng);
                }
            },
            '#dvtxbrmintadetailgrid': {
                selectionchange: function (model, records) {
                    var form = this.getDvTxBrMintaForm().getForm();

                    if(records[0]) {
                        form.findField('idDetail').setValue(records[0].get('id'));
                        form.findField('pengBarang').getStore().load();
                        form.findField('pengBarang').setValue(records[0].get('barangId'));
                        form.findField('jumlah').setValue(records[0].get('qtyMinta'));
                    }
                }
            },
            '#dvtxbrmintadetailgrid button[action=deleteItemDivMinta]': {
                click: function (model, records) {
                    var grid = this.getDvTxBrMintaDetailGrid(),
                        sm = grid.getSelectionModel(),
                        sel = sm.getSelection();

                    if(!sel.length) {
                        Ext.Msg.alert('Warning', 'Pilih dulu item yang akan di hapus');
                        return;
                    }
                    
                    if(sel[0].get('kirimStatus') == 1) {
                        Ext.Msg.alert('Warning', 'Anda tidak bisa menghapus item ini');
                        return;
                    }
                    
                    if(sel[0].get('terimaStatus') == 1) {
                        Ext.Msg.alert('Warning', 'Anda tidak bisa menghapus item ini');
                        return;
                    }
                    
                     if(sel[0].get('appr_status') == 1) {
                        Ext.Msg.alert('Warning', 'Anda tidak bisa menghapus item ini');
                        return;
                    }
                   
                    Ext.Ajax.request({
                        url: BASE_PATH + 'dv_txbrminta/delete_pengdiv_item',
                        method: 'POST',
                        params: {id: sel[0].get('id')},
                        scope: this,
                        callback: function (options, success, response) {
                            var resp = Ext.decode(response.responseText);

                            if (resp.success === 'true') {
                                grid.getStore().load();
                            } else {
                                Ext.MessageBox.show({
                                    title: resp.message,
                                    msg: resp.data,
                                    buttons: Ext.MessageBox.OK,
                                    icon: Ext.MessageBox.ERROR
                                });
                            }
                        }
                    });
                }
            }
        });
    }
});

/* End of file SystemMenu.js */
/* Location: ./assets/js/app/controller/SystemMenu.js */