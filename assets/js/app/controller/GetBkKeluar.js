/**
 * @author Isht Ae
 **/

Ext.define('GlApp.controller.GetBkKeluar', {
    extend: 'GlApp.controller.Base',
    models: [
    ],
    stores: [
        'bkkeluar.TrxBankStore',
        'bkkeluar.BankStore',
        'bkkeluar.CabangStore',
        'bkkeluar.BankFormStore',
        'bkkeluar.GrkBkStore'
    ],
    views: [
        'bkkeluar.GetBkKeluar',
        'bkkeluar.BkKeluarForm',
        'bkkeluar.BkKeluarGrid',
    ],
    refs: [
        {ref: 'BkKeluarForm', selector: '#bkkeluarform'},
        {ref: 'BkKeluarGrid', selector: '#bkkeluargrid'},
    ],
    init: function() {
        this.control({
            '#bkkeluargrid':{
                afterrender: function(){
                    var grid = this.getBkKeluarGrid(),
                            store = grid.getStore(),
                            filterCollection = [];
                    
                    var filter2 = new Ext.util.Filter({
                        property: 'kas_type',
                        value: 'bankkeluar'
                    });
                    filterCollection.push(filter2);

                    var filter2 = new Ext.util.Filter({
                        property: 'kas_tgltrx',
                        value: Ext.Date.format(new Date(), 'Y-m-d 00:00:00') + 'GT'
                    });
                    filterCollection.push(filter2);

                    var filter2 = new Ext.util.Filter({
                        property: 'kas_tgltrx',
                        value: Ext.Date.format(new Date(), 'Y-m-d 23:59:29') + 'LT'
                    });
                    filterCollection.push(filter2);

                    var filter2 = new Ext.util.Filter({
                        property: 'cabang_id',
                        value: CABANG_ID
                    });
                    filterCollection.push(filter2);

                    store.clearFilter(true);
                    store.filter(filterCollection);
                },
                selectionchange: function(model, records){
                    var form = this.getBkKeluarForm().getForm();

                    if (records[0]) {
//                        form.findField('namaKd').getStore().load();
                        form.loadRecord(records[0]);
//                        form.findField('namaKd').setReadOnly(false);
//                        Ext.getCmp('imageTtdBkk').setSrc(BASE_URL + records[0].get('penerimaBgTtd'));
                    }
                }
            },
            '#BankKeluarSearch':{
                click: function(){
                    var grid = this.getBkKeluarGrid(),
                            store = grid.getStore(),
                            date1 = grid.down('#dateStartBk').getValue(),
                            date2 = grid.down('#dateEndBk').getValue(),
                            cabang = grid.down('#cabangBkFilter').getValue(),
                            bank = grid.down('#filterBankKeluar').getValue(),                            
                            filterCollection = [];
                    
                    if(cabang === null && date1 === null && date2 === null && bank === null){
                        Ext.Msg.alert('Perhatian', 'Mohon isi salah satu filter.');
                        return;
                    } else {
                        var filter2 = new Ext.util.Filter({
                            property: 'kas_type',
                            value: 'bankkeluar'
                        });
                        filterCollection.push(filter2);
                        
                        var statusFilter = new Ext.util.Filter({
                            property: 'cabang_id',
                            value: cabang !== null ? cabang: CABANG_ID
                        });
                        filterCollection.push(statusFilter);
                        
                        if(date1 !== null){
                            var statusFilter = new Ext.util.Filter({
                                property: 'kas_tgltrx',
                                value: Ext.Date.format(date1, 'Y-m-d 00:00:00') + 'GT'
                            });
                            filterCollection.push(statusFilter);                            
                        }
                        
                        if(date2 !== null){
                            var statusFilter = new Ext.util.Filter({
                                property: 'kas_tgltrx',
                                value: Ext.Date.format(date2, 'Y-m-d 00:00:00') + 'LT'
                            });
                            filterCollection.push(statusFilter);                            
                        }
                        
                        if(bank !== null){
                            var statusFilter = new Ext.util.Filter({
                                property: 'kas_bank',
                                value: bank
                            });
                            filterCollection.push(statusFilter);
                        }
                        
                        store.clearFilter(true);
                        store.filter(filterCollection);
                    }
                }
            },
            '#BankKeluarClear':{
                click: function(){
                    var grid = this.getBkKeluarGrid(),
                            store = grid.getStore(),
                            filterCollection = [];
                    
                    grid.down('#dateStartBk').setValue('');
                    grid.down('#dateEndBk').setValue('');
                    grid.down('#cabangBkFilter').setValue('');
                    grid.down('#filterBankKeluar').setValue('');
                    
                    var filter2 = new Ext.util.Filter({
                        property: 'kas_type',
                        value: 'bankkeluar'
                    });
                    filterCollection.push(filter2);

                    var statusFilter = new Ext.util.Filter({
                        property: 'cabang_id',
                        value: CABANG_ID
                    });
                    filterCollection.push(statusFilter);
                    
                    store.clearFilter(true);
                    store.filter(filterCollection);
                }
            },
            '#BankKeluarSave':{
                click: function(){
                    this.checkTtd(1);
                }
            },
            '#BankKeluarPrint':{
                click: function(){
                    this.checkTtd(2);
                }
            },
            '#BankKeluarNew':{
                click: function(){
                    var form = this.getBkKeluarForm().getForm(),
                            forem = this.getBkKeluarForm(),
                            grid = this.getBkKeluarGrid(),
                            store = grid.getStore(),
                            filterCollection = [];

                    var filter2 = new Ext.util.Filter({
                        property: 'kas_type',
                        value: 'bankkeluar'
                    });
                    filterCollection.push(filter2);

                    var filter2 = new Ext.util.Filter({
                        property: 'kas_tgltrx',
                        value: Ext.Date.format(new Date(), 'Y-m-d 00:00:00') + 'GT'
                    });
                    filterCollection.push(filter2);

                    var filter2 = new Ext.util.Filter({
                        property: 'kas_tgltrx',
                        value: Ext.Date.format(new Date(), 'Y-m-d 23:59:29') + 'LT'
                    });
                    filterCollection.push(filter2);

                    var filter2 = new Ext.util.Filter({
                        property: 'cabang_id',
                        value: CABANG_ID
                    });
                    filterCollection.push(filter2);

                    store.clearFilter(true);
                    store.filter(filterCollection);
                    grid.getSelectionModel().clearSelections();

                    form.reset();
//                    form.findField('namaKd').setReadOnly(true);
//                    Ext.Ajax.request({
//                        url: BASE_PATH + 'data/check_ttd',
//                        method: 'POST',
//                        scope: this,
//                        callback: function(options, success, response) {
//                            var resp = Ext.decode(response.responseText);
//
//                            if (resp.success === 'false') {
//                                forem.body.mask();
//                                Ext.MessageBox.show({
//                                    title: 'WARNING',
//                                    msg: TTD_STRING,
//                                    buttons: Ext.MessageBox.OK,
//                                    icon: Ext.MessageBox.WARNING
//                                });
//                            } else {
//                                forem.down('#imageTtdBmk').setSrc(BASE_URL + resp.url);
//                            }
//                        }
//                    });
                }
            },
            '#BankKeluarDelete':{
                click: function(){
                    var grid = this.getBkKeluarGrid();
                    var me = this;
                    if (grid) {
                        var sm = grid.getSelectionModel();
                        var rs = sm.getSelection();
                        if (!rs.length) {
                            Ext.MessageBox.show({
                                title: 'Peringatan',
                                msg: 'Pilih Data Transaksi yang akan dihapus',
                                buttons: Ext.MessageBox.OK,
                                icon: Ext.MessageBox.WARNING
                            });
                            return;
                        }

//                        Ext.Ajax.request({
//                            url: BASE_PATH + 'data/check_login_status',
//                            method: 'POST',
//                            scope: this,
//                            callback: function(options, success, response) {
//                                var resp = Ext.decode(response.responseText);
//
//                                if (resp.success == "true") {
                                    var sel = grid.getSelectionModel().getSelection()[0];
                                    me.delFinal(sel, me);
//                                } else {
//                                    Ext.Msg.alert('Error', 'Anda tidak mempunyai hak untuk Menghapus Data Transkasi');
//                                    return;
//                                }
//                            }
//                        });
                    }
                }
            }
        });
    },
    checkTtd: function($type) {
//        var form = this.getBkKeluarForm().getForm();
//        if(form.findField('id').getValue() === "") {
//            Ext.Ajax.request({
//                url: BASE_PATH + 'data/check_ttd/signNullBmk',
//                scope: this,
//                callback: function (options, success, response) {
//                    var resp = Ext.decode(response.responseText);
//
//                    if (resp.success === 'true') {
//                        if($type === 1)
//                        {
//                            this.saveBkKeluar();
//                        } else {
//                            this.savePrintBkKeluar();
//                        }
//                    } else {
//                        Ext.MessageBox.alert('Error', 'Belum ada tanda tangan');
//                    }
//                }
//            });
//        } else {
        if ($type === 1)
        {
            this.saveBkKeluar();
        } else {
            this.printBkKeluar();
        }
//        }
    },
    saveBkKeluar: function(){
        var form = this.getBkKeluarForm().getForm(),
                forem = this.getBkKeluarForm(),
                id = form.findField('id').getValue(),
                grid = this.getBkKeluarGrid(),
                store = grid.getStore(),
                filterCollection = [];

        if (id !== "") {
            Ext.MessageBox.show({
                title: 'Error',
                msg: 'Anda Tidak Bisa Merubah data Transaksi',
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.ERROR
            });
        }
        else {
            Ext.Ajax.request({
                url: BASE_PATH + 'bk_keluar/add_bankkeluar',
                method: 'POST',
                params: form.getValues(),
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
//                        form.findField('namaKd').setReadOnly(true);
//                        Ext.Ajax.request({
//                            url: BASE_PATH + 'data/check_ttd',
//                            method: 'POST',
//                            scope: this,
//                            callback: function(options, success, response) {
//                                var resp = Ext.decode(response.responseText);
//
//                                if (resp.success === 'false') {
//                                    forem.body.mask();
//                                    Ext.MessageBox.show({
//                                        title: 'WARNING',
//                                        msg: TTD_STRING,
//                                        buttons: Ext.MessageBox.OK,
//                                        icon: Ext.MessageBox.WARNING
//                                    });
//                                } else {
//                                    forem.down('#imageTtdBmk').setSrc(BASE_URL + resp.url);
//                                }
//                            }
//                        });

                        var filter2 = new Ext.util.Filter({
                            property: 'kas_type',
                            value: 'bankkeluar'
                        });
                        filterCollection.push(filter2);

                        var filter2 = new Ext.util.Filter({
                            property: 'kas_tgltrx',
                            value: Ext.Date.format(new Date(), 'Y-m-d 00:00:00') + 'GT'
                        });
                        filterCollection.push(filter2);

                        var filter2 = new Ext.util.Filter({
                            property: 'kas_tgltrx',
                            value: Ext.Date.format(new Date(), 'Y-m-d 23:59:29') + 'LT'
                        });
                        filterCollection.push(filter2);

                        var filter2 = new Ext.util.Filter({
                            property: 'cabang_id',
                            value: CABANG_ID
                        });
                        filterCollection.push(filter2);

                        store.clearFilter(true);
                        store.filter(filterCollection);
                        grid.getSelectionModel().clearSelections();
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
    },
    printBkKeluar: function(){
        var form = this.getBkKeluarForm().getForm(),
                forem = this.getBkKeluarForm(),
                id = form.findField('id').getValue(),
                grid = this.getBkKeluarGrid(),
                store = grid.getStore(),
                filterCollection = [];

        if (id != "") {
            Ext.MessageBox.show({
                title: 'Error',
                msg: 'Anda Tidak Bisa Merubah data Transaksi',
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.ERROR
            });
        }
        else {
            Ext.Ajax.request({
                url: BASE_PATH + 'bk_keluar/add_bankkeluar',
                method: 'POST',
                params: form.getValues(),
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
//                        form.findField('namaKd').setReadOnly(true);
//                        Ext.Ajax.request({
//                            url: BASE_PATH + 'data/check_ttd',
//                            method: 'POST',
//                            scope: this,
//                            callback: function(options, success, response) {
//                                var resp = Ext.decode(response.responseText);
//
//                                if (resp.success === 'false') {
//                                    forem.body.mask();
//                                    Ext.MessageBox.show({
//                                        title: 'WARNING',
//                                        msg: TTD_STRING,
//                                        buttons: Ext.MessageBox.OK,
//                                        icon: Ext.MessageBox.WARNING
//                                    });
//                                } else {
//                                    forem.down('#imageTtdBmk').setSrc(BASE_URL + resp.url);
//                                }
//                            }
//                        });

                        var filter2 = new Ext.util.Filter({
                            property: 'kas_type',
                            value: 'bankkeluar'
                        });
                        filterCollection.push(filter2);

                        var filter2 = new Ext.util.Filter({
                            property: 'kas_tgltrx',
                            value: Ext.Date.format(new Date(), 'Y-m-d 00:00:00') + 'GT'
                        });
                        filterCollection.push(filter2);

                        var filter2 = new Ext.util.Filter({
                            property: 'kas_tgltrx',
                            value: Ext.Date.format(new Date(), 'Y-m-d 23:59:29') + 'LT'
                        });
                        filterCollection.push(filter2);

                        var filter2 = new Ext.util.Filter({
                            property: 'cabang_id',
                            value: CABANG_ID
                        });
                        filterCollection.push(filter2);

                        store.clearFilter(true);
                        store.filter(filterCollection);
                        grid.getSelectionModel().clearSelections();
//                        window.open(BASE_PATH + 'akun/printBank/' + resp.data, "Print Preview", "height=530,width=500,modal=yes,alwaysRaised=yes");
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
    },
    delFinal: function(sel, me) {
        var form = this.getBkKeluarForm().getForm(),
                forem = this.getBkKeluarForm(),
                grid = this.getBkKeluarGrid(),
                store = grid.getStore(),
                filterCollection = [];

        Ext.Msg.show({
            title: 'Konfirmasi',
            msg: 'Apakah anda yakin akan menghapus data?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.MessageBox.WARNING,
            fn: function(btn) {
                if (btn == 'yes') {
                    Ext.Ajax.request({
                        url: BASE_PATH + 'bk_keluar/delete_bankkeluar',
                        method: 'POST',
                        params: form.getValues(),
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
//                                form.findField('namaKd').setReadOnly(true);
//                                Ext.Ajax.request({
//                                    url: BASE_PATH + 'data/check_ttd',
//                                    method: 'POST',
//                                    scope: this,
//                                    callback: function(options, success, response) {
//                                        var resp = Ext.decode(response.responseText);
//
//                                        if (resp.success === 'false') {
//                                            forem.body.mask();
//                                            Ext.MessageBox.show({
//                                                title: 'WARNING',
//                                                msg: TTD_STRING,
//                                                buttons: Ext.MessageBox.OK,
//                                                icon: Ext.MessageBox.WARNING
//                                            });
//                                        } else {
//                                            forem.down('#imageTtdBmk').setSrc(BASE_URL + resp.url);
//                                        }
//                                    }
//                                });

                                var filter2 = new Ext.util.Filter({
                                    property: 'kas_type',
                                    value: 'bankkeluar'
                                });
                                filterCollection.push(filter2);

                                var filter2 = new Ext.util.Filter({
                                    property: 'kas_tgltrx',
                                    value: Ext.Date.format(new Date(), 'Y-m-d 00:00:00') + 'GT'
                                });
                                filterCollection.push(filter2);

                                var filter2 = new Ext.util.Filter({
                                    property: 'kas_tgltrx',
                                    value: Ext.Date.format(new Date(), 'Y-m-d 23:59:29') + 'LT'
                                });
                                filterCollection.push(filter2);

                                var filter2 = new Ext.util.Filter({
                                    property: 'cabang_id',
                                    value: CABANG_ID
                                });
                                filterCollection.push(filter2);

                                store.clearFilter(true);
                                store.filter(filterCollection);
                                grid.getSelectionModel().clearSelections();
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
        });
    }
});

/* End of file SystemMenu.js */
/* Location: ./assets/js/app/controller/SystemMenu.js */