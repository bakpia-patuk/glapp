/**
 * @author coepoe
 **/

Ext.define('GlApp.controller.GetBkMasuk', {
    extend: 'GlApp.controller.Base',
    models: [
    ],
    stores: [
        'bkmasuk.TrxBankStore',
        'bkmasuk.BankStore',
        'bkmasuk.CabangStore',
        'bkmasuk.BankFormStore',
        'bkmasuk.GrkBmStore',
        'bkmasuk.AkunHeaderStore',
        'bkmasuk.GrkAkunStore',
        'bkmasuk.ListAkunGkStore'
    ],
    views: [
        'bkmasuk.GetBkMasuk',
        'bkmasuk.BkMasukForm',
        'bkmasuk.BkMasukGrid',
        'bkmasuk.BkListAkunWin',
        'bkmasuk.BkGroupKpWin'
    ],
    refs: [
        {ref: 'BkMasukForm', selector: '#bkmasukform'},
        {ref: 'BkMasukGrid', selector: '#bkmasukgrid'},
        {ref: 'BkGkGrid', selector: '#gridGk'},
        {ref: 'BkGkAkunGrid', selector: '#gridGkAkun'},
        {ref: 'BkheaderAkunGrid', selector: '#gridHeaderAkun'}
    ],
    init: function() {
        this.control({
            '#bkmasukgrid':{
                afterrender: function(){
                    var grid = this.getBkMasukGrid(),
                            store = grid.getStore(),
                            filterCollection = [];
                    
                    var filter2 = new Ext.util.Filter({
                        property: 'kas_type',
                        value: 'bankmasuk'
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
                    var form = this.getBkMasukForm().getForm();

                    if (records[0]) {
//                        form.findField('namaKd').getStore().load();
                        form.loadRecord(records[0]);
//                        form.findField('namaKd').setReadOnly(false);
//                        Ext.getCmp('imageTtdBmk').setSrc(BASE_URL + records[0].get('penerimaBgTtd'));
                    }
                }
            },
            '#BankMasukSearch':{
                click: function(){
                    var grid = this.getBkMasukGrid(),
                            store = grid.getStore(),
                            date1 = grid.down('#dateStartBmk').getValue(),
                            date2 = grid.down('#dateEndBmk').getValue(),
                            cabang = grid.down('#cabangBmkFilter').getValue(),
                            bank = grid.down('#filterBankMasuk').getValue(),                            
                            filterCollection = [];
                    
                    if(cabang === null && date1 === null && date2 === null && bank === null){
                        Ext.Msg.alert('Perhatian', 'Mohon isi salah satu filter.');
                        return;
                    } else {
                        var filter2 = new Ext.util.Filter({
                            property: 'kas_type',
                            value: 'bankmasuk'
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
                                value: Ext.Date.format(date2, 'Y-m-d 23:59:59') + 'LT'
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
            '#BankMasukClear':{
                click: function(){
                    var grid = this.getBkMasukGrid(),
                            store = grid.getStore(),
                            filterCollection = [];
                    
                    grid.down('#dateStartBmk').setValue('');
                    grid.down('#dateEndBmk').setValue('');
                    grid.down('#cabangBmkFilter').setValue('');
                    grid.down('#filterBankMasuk').setValue('');
                    
                    var filter2 = new Ext.util.Filter({
                        property: 'kas_type',
                        value: 'bankmasuk'
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
            '#BankMasukSave':{
                click: function(){
                    this.checkTtd(1);
                }
            },
            '#BankMasukPrint':{
                click: function(){
                    this.checkTtd(2);
                }
            },
            '#BankMasukNew':{
                click: function(){
                    var form = this.getBkMasukForm().getForm(),
                            forem = this.getBkMasukForm(),
                            grid = this.getBkMasukGrid(),
                            store = grid.getStore(),
                            filterCollection = [];

                    var filter2 = new Ext.util.Filter({
                        property: 'kas_type',
                        value: 'bankmasuk'
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
            '#BankMasukDelete':{
                click: function(){
                    var grid = this.getBkMasukGrid();
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
            },
            '#setAkunGk': {
                click: function() {
                    var grid = this.getBkGkGrid(),
                            sel = grid.getSelectionModel().getSelection();
                    if (!sel.length) {
                        Ext.Msg.alert('Warning', 'Select Group Keperluan First');
                        return;
                    }
                    var win = Ext.widget('bkmasuk.bklistakunwin');
                }
            },
            '#setAkunKp': {
                click: function() {
                    var grid = this.getBkheaderAkunGrid(),
                            sel = grid.getSelectionModel().getSelection();
                    if (!sel.length) {
                        Ext.Msg.alert('Warning', 'Pilih Header Akun Group');
                        return;
                    }

                    var data = '';
                    for (i = 0; i < sel.length; i++) {
                        data = data + sel[i].get('akun_id') + '-';
                    }

                    var gd = this.getBkGkGrid(),
                            sel = gd.getSelectionModel().getSelection();

                    var params = {
                        idForm: 'bankmasuk',
                        idPerlu: sel[0].get('id'),
                        data: data
                    };
                    this.ajaxReq('bk_masuk/set_akungr', params, 2);
                }
            },
            '#gridGk': {
                selectionchange: function(m, r) {
                    var grid = this.getBkGkAkunGrid();

                    if (r[0]) {
                        grid.getStore().clearFilter(true);
                        grid.getStore().filter('kp_id', r[0].get('id'));
                    }
                }
            }
        });
    },
    checkTtd: function($type) {
//        var form = this.getBkMasukForm().getForm();
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
//                            this.saveBkMasuk();
//                        } else {
//                            this.savePrintBkMasuk();
//                        }
//                    } else {
//                        Ext.MessageBox.alert('Error', 'Belum ada tanda tangan');
//                    }
//                }
//            });
//        } else {
        if ($type === 1)
        {
            this.saveBkMasuk();
        } else {
            this.printBkMasuk();
        }
//        }
    },
    saveBkMasuk: function(){
        var form = this.getBkMasukForm().getForm(),
                forem = this.getBkMasukForm(),
                id = form.findField('id').getValue(),
                grid = this.getBkMasukGrid(),
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
                url: BASE_PATH + 'bk_masuk/add_bankmasuk',
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
                            value: 'bankmasuk'
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
    printBkMasuk: function(){
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
                url: BASE_PATH + 'bk_masuk/add_bankmasuk',
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
                            value: 'bankmasuk'
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
        var form = this.getBkMasukForm().getForm(),
                forem = this.getBkMasukForm(),
                grid = this.getBkMasukGrid(),
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
                        url: BASE_PATH + 'bk_masuk/delete_bankmasuk',
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
                                    value: 'bankmasuk'
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
        });
    }
});

/* End of file SystemMenu.js */
/* Location: ./assets/js/app/controller/SystemMenu.js */