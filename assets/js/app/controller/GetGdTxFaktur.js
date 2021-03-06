/**
 * @author Isht Ae
 **/

Ext.define('GlApp.controller.GetGdTxFaktur', {
    extend: 'GlApp.controller.Base',
    models: [
    ],
    stores: [
        'gdtxfaktur.TtStore',
        'gdtxfaktur.TtDetailStore',
        'gdtxfaktur.FakturStore',
        'gdtxfaktur.FakturStore2',
        'gdtxfaktur.ListFakturStore',
        'gdtxfaktur.MasterSupplierStore',
        'gdtxfaktur.BankStore',
        'gdtxfaktur.CabangStore'
    ],
    views: [
        'gdtxfaktur.GetGdTxFaktur',
        'gdtxfaktur.TxFakturForm',
        'gdtxfaktur.TxFakturGrid',
        'gdtxfaktur.TxFakturGridDt',
        'gdtxfaktur.TxBgFakturForm',
        'gdtxfaktur.TxBgFakturGrid',
      'gdtxfaktur.TxListFakturGrid',
        'gdtxfaktur.TxFakturPrintWin',
        'gdtxfaktur.tfPrintGrid',
        'gdtxfaktur.app2Form',
        'gdtxfaktur.newWindow',

    ],
    refs: [
        {ref: 'Txfakturform', selector: '#txfakturform'},
        {ref: 'Txbgfakturgrid', selector: '#txbgfakturgrid'},
        {ref: 'Txbgfakturform', selector: '#txbgfakturform'},
        {ref: 'Txfakturgrid', selector: '#txfakturgrid'},
        {ref: 'Txfakturgriddt', selector: '#txfakturgriddt'},
        {ref: 'Txlistfakturgrid', selector: '#txlistfakturgrid'},
        {ref: 'tfListFkt', selector: '#tfprintgrid'},
        {ref: 'tfTtdForm', selector: '#app2formtf'},
    ],
    init: function() {
        this.listen({
            controller: {
            },
            component: {
               
                '#txfakturform button[action=tfNew]': {
                    click: this.resetTf
                },
                '#txfakturform button[action=tfSave]': {
                    click: this.saveTf
                },
                '#txfakturform button[action=tfFakturPrint]': {
                    click: this.showPrintTf
                },
                '#txbgfakturform button[action=fktBgSave]': {
                    click: this.saveTfBg
                },
                '#txbgfakturgrid': {
                    afterrender: function() {
                        var store = this.getTxbgfakturgrid().getStore(),
                                filterCollection = [];

                        var statusFilter2 = new Ext.util.Filter({
                            property: 'faktur_bayar',
                            value: 1
                        });
                        filterCollection.push(statusFilter2);

                        var statusFilter2 = new Ext.util.Filter({
                            property: 'faktur_bgstatus',
                            value: 0
                        });
                        filterCollection.push(statusFilter2);

                        var statusFilter2 = new Ext.util.Filter({
                            property: 'simpan_status',
                            value: 1
                        });
                        filterCollection.push(statusFilter2);

                        var statusFilter2 = new Ext.util.Filter({
                            property: 'faktur_cabang',
                            value: CABANG_ID
                        });
                        filterCollection.push(statusFilter2);

                        store.clearFilter(true);
                        store.filter(filterCollection);
                        store.group('fktSuppNama');
                    },
                    beforeselect: function(record, index, eOpts) {
                        var form = this.getTxbgfakturform().getForm(),
                                idSupp = index.get('fktSuppId'),
                                fieldSupp = form.findField('suppId');

                        if (fieldSupp.getValue() === "" || parseInt(fieldSupp.getValue()) === idSupp) {
                            fieldSupp.setValue(idSupp);
                        } else {
                            Ext.Msg.alert('Info', 'Anda harus memilih data satu Supplier');
                            return false;
                        }
                    },
                    select: function(record, index, eOpts) {

                        var form = this.getTxbgfakturform().getForm(),
                                idFkt = index.get('id'),
                                nomFkt = index.get('fktTotal'),
                                fieldFkt = form.findField('fakturList'),
                                fieldJumlah = form.findField('jumlahBg');

                        fieldFkt.setValue(fieldFkt.getValue() + idFkt + ';');
                        fieldJumlah.setValue(fieldJumlah.getValue() + nomFkt);
                    },
                    deselect: function(record, index, eOpts) {
                        var form = this.getTxbgfakturform().getForm(),
                                idFkt = index.get('id'),
                                nomFkt = index.get('fktTotal'),
                                grid = this.getTxbgfakturgrid(),
                                sel = grid.getSelectionModel().getSelection(),
                                fieldSupp = form.findField('suppId'),
                                fieldFkt = form.findField('fakturList'),
                                fieldJumlah = form.findField('jumlahBg');

                        fieldFkt.setValue(fieldFkt.getValue().replace(idFkt + ";", ""));
                        fieldJumlah.setValue(fieldJumlah.getValue() - nomFkt);

                        if (!sel.length) {
                            fieldSupp.setValue("");
                        }
                    }
                },
                '#app2formtf': {
                afterrender: function() {
                    var form = this.getTfTtdForm();
                    Ext.Ajax.request({
                        url: BASE_PATH + 'gd_txfaktur/check_ttd',
                        method: 'POST',
                        scope: this,
                        callback: function(options, success, response) {
                            var resp = Ext.decode(response.responseText);

                            if (resp.success === 'false') {
                                form.body.mask();
                                Ext.MessageBox.show({
                                    title: 'WARNING',
                                    msg: TTD_STRING,
                                    buttons: Ext.MessageBox.OK,
                                    icon: Ext.MessageBox.WARNING
                                });
                            } else {
                                form.down('#imageTtdTf1').setSrc(BASE_URL + resp.url);
                            }
                        }
                    });
                }
            },
            '#tfprintgrid button[action=cetakFkt]': {
                click: function(btn, e, opt) {
                    var data = Ext.getCmp('idFakturCetak').getValue();

                    if (data === "") {
                        Ext.Msg.alert('Info', 'Pilih Faktur yang Akan di Cetak');
                        return;
                    }

                    var win = new Ext.widget('gdtxfaktur.newwindow', {
                        layout: 'fit',
                        modal: true,
                        title: 'Tanda Tangan',
                        autoScroll: false,
                        width: 335,
                        height: 505,
                        border: true,
                        items: [
                            {
                                xtype: 'gdtxfaktur.app2formtf'
                            }
                        ],
                        buttons: [
                            {
                                text: 'Cetak',
                                itemId: 'printThisFkt'
                            }
                        ]
                    });
                    win.show();

                    this.getTfTtdForm().getForm().findField('fktList').setValue(data);
                }
            },
            '#printThisFkt': {
                click: function(btn, e, opt) {
//                    Ext.Ajax.request({
//                        url: BASE_PATH + 'data/check_ttd/signNullTf1',
//                        scope: this,
//                        callback: function(options, success, response) {
//                            var resp = Ext.decode(response.responseText);
//
//                            if (resp.success === 'true') {
                                Ext.Ajax.request({
                                    url: BASE_PATH + 'gd_txfaktur/check_ttd_pengirim/signNullTf2',
                                    scope: this,
                                    callback: function(options, success, response) {
                                        var resp = Ext.decode(response.responseText);

                                        if (resp.success === 'true') {
                                            this.printTf(btn, e, opt);
                                        } else {
                                            Ext.MessageBox.alert('Error', 'Belum ada tanda tangan PENGIRIM');
                                        }
                                    }
                                });
//                            } else {
//                                Ext.MessageBox.alert('Error', 'Belum ada tanda tangan PETUGAS');
//                            }
//                        }
//                    });
                }
            },
//                'tfbgform button[action=fktBgSave]': {
//                    click: this.saveTfBg
//                },
                //'#txttgriddt button[action=ttLotAdd]': {
                //    click: this.showLotForm
                //},
               // '#mssupplierform button[action=suppDelete]': {
               //     click: this.showSatuan
               // },
                '#suppName': {
                    select: function(cmb, rec, eOpt) {
                        var suppId = cmb.getValue(),
                                form = this.getTxfakturform().getForm(),
                                id = form.findField('id'),
                                grid = this.getTxfakturgrid(),
                                store = grid.getStore(),
                                filterCollection = [];

                        Ext.Ajax.request({
                            url: BASE_PATH + 'gd_txfaktur/generate_tf',
                            method: 'POST',
                            params: {idSupp: suppId},
                            scope: this,
                            callback: function(options, success, response) {
                                var resp = Ext.decode(response.responseText);

                                if (resp.success === 'true') {
                                    id.setValue(resp.data.idTf+'.'+CABANG_ID);
                                    cmb.setReadOnly(true);

                                    var statusFilter = new Ext.util.Filter({
                                        property: 'tt_supp_id',
                                        value: suppId
                                    });
                                    filterCollection.push(statusFilter);

                                    var statusFilter = new Ext.util.Filter({
                                        property: 'tt_fkstatus',
                                        value: 0
                                    });
                                    filterCollection.push(statusFilter);

                                    var statusFilter = new Ext.util.Filter({
                                        property: 'tt_cabang',
                                        value: CABANG_ID
                                    });
                                    filterCollection.push(statusFilter);

                                    store.clearFilter(true);
                                    store.filter(filterCollection);

                                } else {
                                    Ext.MessageBox.show({
                                        title: resp.data,
                                        msg: resp.message,
                                        buttons: Ext.MessageBox.OK,
                                        icon: Ext.MessageBox.ERROR
                                    });
                                }
                            }
                        });
                    }
                },
                '#txlistfakturgrid button[action="cetakUlangTf"]': {
                click: function() {
                    var grid = this.getTxlistfakturgrid(),
                            sm = grid.getSelectionModel(),
                            sel = sm.getSelection();
                    
                    if(!sel.length) {
                        Ext.Msg.alert('Info', 'Pilih Faktur yang akan di cetak');
                        return;
                    }

                    if(sel[0].get('fktCetakStatus') == 0) {
                        Ext.Msg.alert('Info', 'Faktur asli belum di cetak. Gunakan tombol cetak di form Tanda Terima Faktur');
                        return;
                    }
                    
                    window.open(BASE_PATH + 'gd_txfaktur/printTf/1/' + sel[0].get('id'), "Print Preview", "height=" + screen.height + ",width=950,scrollbars=true");

                }
            },
                '#txfakturgrid': {
                    select: function(record, index, eOpts) {
                     //   alert('ff');
                        var form = this.getTxfakturform().getForm(),
                                idTt = index.get('id'),
                                idTf = form.findField('id').getValue(),
                                idSupp = form.findField('suppName').getValue(),
                                total = form.findField('jumlahTrx'),
                                grid = this.getTxfakturgrid(),
                                store = grid.getStore(),
                                grid2 = this.getTxfakturgriddt(),
                                store2 = grid2.getStore(),
                                filterCollection = [],
                                filteran = [];

                        var statusFilter2 = new Ext.util.Filter({
                            property: 'tt_id',
                            value: idTt
                        });
                        filteran.push(statusFilter2);

                        store2.clearFilter(true);
                        store2.filter(filteran);
                        store2.group('ttPoNo');

                        if (idTf != "") {
                            Ext.Ajax.request({
                                url: BASE_PATH + 'gd_txfaktur/add_item_tf',
                                method: 'POST',
                                params: {
                                    tfId: idTf,
                                    ttId: idTt,
                                    suppId: idSupp
                                },
                                scope: this,
                                callback: function(options, success, response) {
                                    var resp = Ext.decode(response.responseText);

                                    if (resp.success === 'true') {
                                        var statusFilter = new Ext.util.Filter({
                                            property: 'tt_supp_id',
                                            value: idSupp
                                        });
                                        filterCollection.push(statusFilter);

                                        var statusFilter = new Ext.util.Filter({
                                            property: 'tt_faktur_show',
                                            value: 1
                                        });
                                        filterCollection.push(statusFilter);

                                        var statusFilter = new Ext.util.Filter({
                                            property: 'tt_cabang',
                                            value: CABANG_ID
                                        });
                                        filterCollection.push(statusFilter);

                                        store.clearFilter(true);
                                        store.filter(filterCollection);
                                        store.each(function(rec) {
                                            if (rec.get('ttFakturStatus') === 1) {
                                                grid.getSelectionModel().select(rec, true, false);
                                            }
                                        });
                                        total.setValue(total.getValue() + resp.data.total);
                                    } else {
                                        Ext.MessageBox.show({
                                            title: "ERROR",
                                            msg: resp.message,
                                            buttons: Ext.MessageBox.OK,
                                            icon: Ext.MessageBox.ERROR
                                        });
                                    }
                                }
                            });
                        }
                    },
                    deselect: function(record, index, eOpts) {
                        var form = this.getTxfakturform().getForm(),
                                idTt = index.get('id'),
                                idTf = form.findField('id').getValue(),
                                idSupp = form.findField('suppName').getValue(),
                                total = form.findField('jumlahTrx'),
                                grid = this.getTxfakturgrid(),
                                store = grid.getStore(),
                                grid2 = this.getTxfakturgriddt(),
                                store2 = grid2.getStore(),
                                filterCollection = [],
                                filteran = [];

                        var statusFilter2 = new Ext.util.Filter({
                            property: 'tt_id',
                            value: idTt
                        });
                        filteran.push(statusFilter2);

                        store2.clearFilter(true);
                        store2.filter(filteran);
                        store2.group('ttPoNo');


                        if (idTf != "") {
                            Ext.Ajax.request({
                                url: BASE_PATH + 'gd_txfaktur/remove_item_tf',
                                method: 'POST',
                                params: {
                                    tfId: idTf,
                                    ttId: idTt,
                                    suppId: idSupp
                                },
                                scope: this,
                                callback: function(options, success, response) {
                                    var resp = Ext.decode(response.responseText);

                                    if (resp.success === 'true') {
                                        var statusFilter = new Ext.util.Filter({
                                            property: 'tt_supp_id',
                                            value: idSupp
                                        });
                                        filterCollection.push(statusFilter);

                                        var statusFilter = new Ext.util.Filter({
                                            property: 'tt_faktur_show',
                                            value: 1
                                        });
                                        filterCollection.push(statusFilter);

                                        var statusFilter = new Ext.util.Filter({
                                            property: 'tt_cabang',
                                            value: CABANG_ID
                                        });
                                        filterCollection.push(statusFilter);

                                        store.clearFilter(true);
                                        store.filter(filterCollection);
                                        total.setValue(total.getValue() - resp.data.total);
                                    } else {
                                        Ext.MessageBox.show({
                                            title: "ERROR",
                                            msg: resp.message,
                                            buttons: Ext.MessageBox.OK,
                                            icon: Ext.MessageBox.ERROR
                                        });
                                    }
                                }
                            });
                        }
                    }
                }
            },
            global: {
            },
            store: {
            }
        });
    },
    showPrintGrid: function(btn) {
        var win = Ext.widget('gdtxfaktur.txfakturprintwin');
    },
    showLotForm: function(btn) {
       // var win = Ext.widget('gdtxterima.txttlotwin');
    },
    showSatuan: function(btn) {
        var win = Ext.widget('gdmsbarang.msbarangsatuanwin');
    },
    saveTf: function(btn, e, opt) {
        var form = this.getTxfakturform().getForm(),
                forem = this.getTxfakturform(),
                cmb = form.findField('suppName'),
                total = form.findField('jumlahTrx'),
                grid = this.getTxfakturgrid(),
                store = grid.getStore(),
                store2 = this.getTxfakturgriddt().getStore(),
                store3 = Ext.StoreMgr.lookup('FakturStore');

        if (form.isValid()) {
            if (total === 0 || total === '') {
                Ext.MessageBox.show({
                    title: 'Error',
                    msg: 'Anda Belum Melakukan Transaksi',
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR
                });
            } else {
                Ext.Ajax.request({
                    url: BASE_PATH + 'gd_txfaktur/tf_complete',
                    method: 'POST',
                    params: form.getValues(),
                    callback: function(options, success, response) {
                        var resp = Ext.decode(response.responseText);

                        if (resp.success === 'true') {
                            Ext.MessageBox.show({
                                title: "INFO",
                                msg: resp.message,
                                buttons: Ext.MessageBox.OK,
                                icon: Ext.MessageBox.INFO
                            });

                            form.reset();
                            store.removeAll();
                            store2.removeAll();
                          
                            cmb.setReadOnly(false);
                            forem.saved = true;
                        } else {
                            Ext.MessageBox.show({
                                title: "ERROR",
                                msg: resp.message,
                                buttons: Ext.MessageBox.OK,
                                icon: Ext.MessageBox.ERROR
                            });
                        }
                    }
                });
            }
        }
    },
    resetTf: function(button, e, options) {
        var form = this.getTxfakturform().getForm(),
                forem = this.getTxfakturform(),
                cmb = form.findField('suppName'),
                id = form.findField('id').getValue(),
                grid = this.getTxfakturgrid(),
                store = grid.getStore(),
                store2 = this.getTxfakturgriddt().getStore();

        Ext.Ajax.request({
            url: BASE_PATH + 'gd_txfaktur/reset_tf',
            method: 'POST',
            params: {id: id},
            scope: this,
            callback: function(options, success, response) {
                var resp = Ext.decode(response.responseText);

                if (resp.success === 'true') {
                    form.reset();
                    store.removeAll();
                    store2.removeAll();
                    cmb.setReadOnly(false);
                    forem.saved = true;
                }
            }
        });
    },
    saveTfBg: function(btn, e, opt) {
        var form = this.getTxbgfakturform().getForm(),
                total = form.findField('jumlahBg').getValue(),
                store2 = this.getTxbgfakturgrid().getStore();

        if (form.isValid()) {
            if (total === 0 || total === "") {
                Ext.MessageBox.show({
                    title: 'Error',
                    msg: 'Anda Belum Melakukan Transaksi',
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR
                });
            } else {
                Ext.Ajax.request({
                    url: BASE_PATH + 'gd_txfaktur/tf_bg_complete',
                    method: 'POST',
                    params: form.getValues(),
                    scope: this,
                    callback: function(options, success, response) {
                        var resp = Ext.decode(response.responseText);

                        if (resp.success === 'true') {
                            Ext.MessageBox.show({
                                title: resp.title,
                                msg: resp.message,
                                buttons: Ext.MessageBox.OK,
                                icon: Ext.MessageBox.INFO
                            });

                            form.reset();
                            store2.load();
                        } else {
                            Ext.MessageBox.show({
                                title: resp.title,
                                msg: resp.message,
                                buttons: Ext.MessageBox.OK,
                                icon: Ext.MessageBox.ERROR
                            });
                        }
                    }
                });
            }
        }
    },
    showPrintTf: function(btn, e, opt) {

         var win = new Ext.widget('gdtxfaktur.newwindow', {
            layout: 'fit',
            modal: true,
            title: 'Data Faktur',
            autoScroll: false,
            width: 600,
            height: 300,
            border: true,
            items: [
                {
                    xtype: 'gdtxfaktur.tfprintgrid',
                    layout: 'fit',
                    region: 'center'
                }
            ],
            buttons: [
                {
                    text: 'Tutup',
                    handler: function() {
                        this.up('window').destroy();
                    }
                }
            ]
        });
        win.show();
    },
    printTf: function(btn, e, opt) {
        var form = this.getTfTtdForm().getForm(),
                fkt = form.findField('fktList').getValue(),
                pengirim = form.findField('pengirim').getValue();

        if (form.isValid()) {
            Ext.Ajax.request({
                url: BASE_PATH + 'gd_txfaktur/set_cetak_tf',
                method: 'POST',
                params: form.getValues(),
                scope: this,
                callback: function(options, success, response) {
                    var resp = Ext.decode(response.responseText);

                    if (resp.success === 'true') {
                        window.open(BASE_PATH + 'gd_txfaktur/printTf/0/' + resp.data, "Print Preview", "scrollbars=1,height=" + screen.height + ",width=950");
                        btn.up('window').destroy();
                        this.getTfListFkt().getStore().load();
                    }
                }
            });
        }
    },

});

/* End of file Base.js */
/* Location: ./assets/js/app/controller/Base.js */