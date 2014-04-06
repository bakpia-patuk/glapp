/**
 * @author Isht Ae
 **/

Ext.define('GlApp.controller.GetDvTxBrKeluar', {
    extend: 'GlApp.controller.Base',
    models: [
    ],
    stores: [
        'dvtxbrkeluar.DivisiStore', 'dvtxbrkeluar.DivisiStore1', 'dvtxbrkeluar.DivisiRuanganStore', 'dvtxbrkeluar.DivisiRuanganStore1',
        'dvtxbrkeluar.ItemStore','dvtxbrkeluar.PengdivStore', 'dvtxbrkeluar.PengdivDetailStore', 'dvtxbrkeluar.LotDivStore'
    ],
    views: [
        'dvtxbrkeluar.GetDvTxBrKeluar',
        'dvtxbrkeluar.DvTxBrKeluarForm',
        'dvtxbrkeluar.DvTxBrKeluarGrid',
        'dvtxbrkeluar.DvTxBrKeluarDetailGrid',
//        'dvtxbrkeluar.divBkEdGrid',
//        'dvtxbrkeluar.newWindow'
    ],
    refs: [
        {ref: 'DvTxBrKeluarForm', selector: '#dvtxbrkeluarform'},
        {ref: 'DvTxBrKeluarGrid', selector: '#dvtxbrkeluargrid'},
        {ref: 'DvTxBrKeluarDetailGrid', selector: '#dvtxbrkeluardetailgrid'}
    ],
    init: function() {
        this.control({
            '#dvtxbrkeluarform button[action=pengDivbarangKeluar]': {
                click: function(btn, e, opt) {
                    var grid = this.getDvTxBrKeluarDetailGrid(),
                            store = grid.getStore(),
                            form = this.getDvTxBrKeluarForm().getForm(),
                            id = form.findField('id'),
                            divisi = form.findField('divisi'),
                            jumlah = form.findField('jumlah').getValue(),
                            jumlahOld = form.findField('jumlahOld').getValue();


                    if (jumlah > jumlahOld) {
                        Ext.Msg.alert('Info', 'Jumlah Barang Keluar tidak bisa lebih besar dari barang diminta');
                        return;
                    }

                    Ext.Ajax.request({
                        url: BASE_PATH + 'dv_txbrkeluar/pengdiv_bk',
                        method: 'POST',
                        params: form.getValues(),
                        scope: this,
                        callback: function(options, success, response) {
                            var resp = Ext.decode(response.responseText);

                            if (resp.success === 'true') {
                                //Select ED
                                Ext.Msg.show({
                                    title: 'Konfirmasi',
                                    msg: 'Barang ini memiliki ED. Apakah anda akan memilih ED ',
                                    buttons: Ext.Msg.YESNOCANCEL,
                                    icon: Ext.MessageBox.WARNING,
                                    scope: this,
                                    fn: function(btn) {
                                        if (btn === 'yes') {
                                            this.showEdWindow();
                                        } else if (btn === 'no') {
                                            this.completeRandomBk();
                                        } else {
                                            return;
                                        }
                                    }
                                });

//                                form.reset();
//                                id.setValue(resp.data.idPeng);
//                                divisi.setValue(parseInt(resp.data.divisi));
//                                store.clearFilter(true);
//                                store.filter('pengdiv_id', resp.data.idPeng);
                            } else {
                                Ext.MessageBox.show({
                                    title: resp.title,
                                    msg: resp.msg,
                                    buttons: Ext.MessageBox.OK,
                                    icon: Ext.MessageBox.ERROR
                                });
                            }
                        }
                    });
                }
            },
            '#dvtxbrkeluargrid': {
                selectionchange: function(model, records) {
                    var grid = this.getDvTxBrKeluarDetailGrid(),
                            store = grid.getStore(),
                            id = records[0].get('id'),
                            ruangId = records[0].get('tujuan'),
                            form = this.getDvTxBrKeluarForm().getForm();

                    store.clearFilter(true);
                    store.filter('pengdiv_id', id);
                    form.findField('id').setValue(id);
                    form.findField('idRuang').setValue(ruangId);
                    form.findField('ruangan').setValue(parseInt(ruangId));
                }
            },
            '#dvtxbrkeluardetailgrid': {
                selectionchange: function(model, records) {
                    var form = this.getDvTxBrKeluarForm().getForm();
                    form.findField('pengBarang').getStore().load();
                    if (records[0]) {
                        form.findField('pengBarang').setValue(records[0].get('barangId'));
                        form.findField('jumlah').setValue(records[0].get('qtyMinta'));
                        form.findField('jumlahOld').setValue(records[0].get('qtyMinta'));
                    }
                }
            }
        });
    },
    showEdWindow: function() {
        var form = this.getDivBkForm().getForm(),
                grid2 = this.getDivBkDetailGrid(),
                id = form.findField('id').getValue(),
                idRuang = form.findField('idRuang').getValue(),
                divisi = form.findField('divisi').getValue(),
                ruangan = form.findField('ruangan').getValue(),
                pengBarang = form.findField('pengBarang').getValue(),
                jumlah = form.findField('jumlah').getValue(),
                jumlahOld = form.findField('jumlahOld').getValue(),
                grid = new Ext.widget('divbarangkeluar.divbkedgrid', {
                    height: 267
                }),
        store = grid.getStore(),
                filterCollection = [];

        var win = new Ext.widget('divbarangkeluar.newwindow', {
            layout: 'hbox',
            align: 'stretch',
            border: false,
            width: 500,
            height: 330,
            title: 'Daftar Barang by ED',
            items: [
                grid
            ],
            buttons: [
                {
                    text: 'Batal',
                    iconCls: 'icon-btn-cross',
                    ui: 'blue-button',
                    handler: function(btn, e, opt) {
                        var formGrid = grid.down('#lotFormBk').getForm(),
                                ruang = formGrid.findField('idRuang').getValue(),
                                barang = formGrid.findField('pengBarang').getValue();

                        Ext.Ajax.request({
                            url: BASE_PATH + 'persediaan/reset_itemdivbk',
                            method: 'POST',
                            params: {
                                id_ruang: ruang,
                                id_barang: barang
                            },
                            scope: this,
                            callback: function(options, success, response) {
                                var resp = Ext.decode(response.responseText);

                                if (resp.success === 'true') {
                                    btn.up('window').destroy();
                                }
                            }
                        });
                    }
                },
                {
                    text: 'Simpan',
                    iconCls: 'icon-btn-save',
                    ui: 'blue-button',
                    handler: function(btn, e, opt) {
                        var formGrid = grid.down('#lotFormBk').getForm(),
                                id = formGrid.findField('id').getValue(),
                                ruang = formGrid.findField('idRuang').getValue(),
                                barang = formGrid.findField('pengBarang').getValue();

                        Ext.Ajax.request({
                            url: BASE_PATH + 'persediaan/set_itemdivbk',
                            method: 'POST',
                            params: {
                                id_minta: id,
                                id_ruang: ruang,
                                id_barang: barang
                            },
                            scope: this,
                            callback: function(options, success, response) {
                                var resp = Ext.decode(response.responseText);

                                if (resp.success === 'true') {
                                    btn.up('window').destroy();
                                    grid2.getStore().load();
                                    Ext.MessageBox.show({
                                        title: 'INFO',
                                        msg: resp.msg,
                                        buttons: Ext.MessageBox.OK,
                                        icon: Ext.MessageBox.INFO
                                    });
                                }
                            }
                        });
                    }
                }
            ]
        });

        win.show();
        var formGrid = grid.down('#lotFormBk').getForm();
        formGrid.findField('id').setValue(id);
        formGrid.findField('idRuang').setValue(idRuang);
        formGrid.findField('divisi').setValue(divisi);
        formGrid.findField('ruangan').setValue(ruangan);
        formGrid.findField('pengBarang').setValue(pengBarang);
        formGrid.findField('jumlah').setValue(jumlah);
        formGrid.findField('jumlahOld').setValue(jumlahOld);

        var statusFilter = new Ext.util.Filter({
            property: 'stl_ruang_id',
            value: idRuang
        });
        filterCollection.push(statusFilter);

        var statusFilter = new Ext.util.Filter({
            property: 'stl_barangid',
            value: pengBarang
        });
        filterCollection.push(statusFilter);

        store.clearFilter(true);
        store.filter(filterCollection);
    },
    completeRandomBk: function() {
        var form = this.getDivBkForm().getForm();

        Ext.Ajax.request({
            url: BASE_PATH + 'persediaan/divbk_random',
            method: 'POST',
            params: form.getValues(),
            scope: this,
            callback: function(options, success, response) {
                var resp = Ext.decode(response.responseText);

                if (resp.success === 'true') {
                    Ext.MessageBox.show({
                        title: 'INFO',
                        msg: resp.msg,
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.INFO
                    });
                }
            }
        });
    }
});

/* End of file SystemMenu.js */
/* Location: ./assets/js/app/controller/SystemMenu.js */