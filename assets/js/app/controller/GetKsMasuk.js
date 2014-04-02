/**
 * @author Isht Ae
 **/

Ext.define('GlApp.controller.GetKsMasuk', {
    extend: 'GlApp.controller.Base',
    models: [
    ],
    stores: [
        'ksmasuk.GrkBmStore',
        'ksmasuk.KsMasukStore',
        'ksmasuk.TrxKasStore',
        'ksmasuk.CabangStore',
        'ksmasuk.MasterTelisaStore'
    ],
    views: [
        'ksmasuk.GetKsMasuk',
        'ksmasuk.KsMasukForm',
        'ksmasuk.KsMasukGrid',
//        'kasmasuk.app2Form',
//        'shared.newWindow',
//        //shared Window
//        'shared.newWindow',
        'ksmasuk.GkMasterGrid',
        'ksmasuk.GkMasterAkunGrid',
        'ksmasuk.GkMasterDetailGrid'
    ],
    refs: [
        {ref: 'GetKsMasuk', selector: '#getksmasuk'},
        {ref: 'KsMasukForm', selector: '#ksmasukform'},
        {ref: 'KsMasukGrid', selector: '#ksmasukgrid'},
        {ref: 'StartKm', selector: '#dateStartKm'},
        {ref: 'EndKm', selector: '#dateEndKm'},
        {ref: 'CabangKm', selector: '#cabangKmFilter'},
//        {ref: 'GridKeperluan', selector: '#gkmastergrid'},
//        {ref: 'GridAkunKeperluan', selector: '#gkmasterakungrid'},
//        {ref: 'GridAkunDetail', selector: '#gkmasterdetailgrid'}
    ],
    init: function () {
        this.control({
            '#kasmasukgrid': {
                click: function(){
                    var grid = this.getKsMasukGrid(),
                        store = grid.getStore(),
                        filterCollection = [];

                    var filter2 = new Ext.util.Filter({
                        property: 'kas_type',
                        value: 'kasmasuk'
                    });
                    filterCollection.push(filter2);
                    
                    store.clearFilter(true);
                    store.filter(filterCollection);
                }, 
                // masih belum berjalan
                selectionchange: function (model, records) {
                    var form = this.getKsMasukForm().getForm();
                    if(records[0]) {
                        form.loadRecord(records[0]);
                    }
                }
            },
            '#KasMasukSearch':{
                click: function(){
                    var grid = this.getKsMasukGrid(),
                            store = grid.getStore(),
                            filterCollection = [],
                            date1 = this.getStartKm().getValue(),
                            date2 = this.getEndKm().getValue(),
                            cabang = this.getCabangKm().getValue();
                    
                    if(cabang === null && date1 === null && date2 === null){
                        Ext.Msg.alert('Perhatian', 'Mohon isi salah satu filter.');
                        return;
                    } else {
                        var statusFilter = new Ext.util.Filter({
                            property: 'kas_type',
                            value: 'kasmasuk'
                        });
                        filterCollection.push(statusFilter);
                        
                        if(cabang !== null && date1 === null && date2 === null){
                            var statusFilter = new Ext.util.Filter({
                                property: 'cabang_id',
                                value: cabang
                            });
                            filterCollection.push(statusFilter);

                            store.clearFilter(true);
                            store.filter(filterCollection);
                        } else if(cabang === null && date1 !== null && date2 === null){
                            var statusFilter = new Ext.util.Filter({
                                property: 'kas_tgltrx',
                                value: Ext.Date.format(date1, 'Y-m-d 00:00:00') + 'GT'
                            });
                            filterCollection.push(statusFilter);

                            store.clearFilter(true);
                            store.filter(filterCollection);
                        } else if(cabang === null && date1 === null && date2 !== null){
                            var statusFilter = new Ext.util.Filter({
                                property: 'kas_tgltrx',
                                value: Ext.Date.format(date2, 'Y-m-d 23:59:59') + 'LT'
                            });
                            filterCollection.push(statusFilter);

                            store.clearFilter(true);
                            store.filter(filterCollection);
                        } else if(cabang === null && date1 !== null && date2 !== null){
                            var statusFilter = new Ext.util.Filter({
                                property: 'kas_tgltrx',
                                value: Ext.Date.format(date1, 'Y-m-d 00:00:00') + 'GT'
                            });
                            filterCollection.push(statusFilter);
                            
                            var statusFilter = new Ext.util.Filter({
                                property: 'kas_tgltrx',
                                value: Ext.Date.format(date2, 'Y-m-d 23:59:59') + 'LT'
                            });
                            filterCollection.push(statusFilter);

                            store.clearFilter(true);
                            store.filter(filterCollection);
                        } else if(cabang !== null && date1 === null && date2 !== null){
                            var statusFilter = new Ext.util.Filter({
                                property: 'cabang_id',
                                value: cabang
                            });
                            filterCollection.push(statusFilter);
                            
                            var statusFilter = new Ext.util.Filter({
                                property: 'kas_tgltrx',
                                value: Ext.Date.format(date2, 'Y-m-d 23:59:59') + 'LT'
                            });
                            filterCollection.push(statusFilter);

                            store.clearFilter(true);
                            store.filter(filterCollection);
                        } else if(cabang !== null && date1 !== null && date2 === null){
                            var statusFilter = new Ext.util.Filter({
                                property: 'kas_tgltrx',
                                value: Ext.Date.format(date1, 'Y-m-d 00:00:00') + 'GT'
                            });
                            filterCollection.push(statusFilter);
                            
                            var statusFilter = new Ext.util.Filter({
                                property: 'cabang_id',
                                value: cabang
                            });
                            filterCollection.push(statusFilter);

                            store.clearFilter(true);
                            store.filter(filterCollection);
                        } else if(cabang !== null && date1 !== null && date2 !== null){
                            var statusFilter = new Ext.util.Filter({
                                property: 'kas_tgltrx',
                                value: Ext.Date.format(date1, 'Y-m-d 00:00:00') + 'GT'
                            });
                            filterCollection.push(statusFilter);
                            
                            var statusFilter = new Ext.util.Filter({
                                property: 'cabang_id',
                                value: cabang
                            });
                            filterCollection.push(statusFilter);
                            
                            var statusFilter = new Ext.util.Filter({
                                property: 'kas_tgltrx',
                                value: Ext.Date.format(date2, 'Y-m-d 23:59:59') + 'LT'
                            });
                            filterCollection.push(statusFilter);

                            store.clearFilter(true);
                            store.filter(filterCollection);
                        }
                    }
                }
            },
            '#KasMasukRefresh':{
                click: function(){
                    var grid = this.getKsMasukGrid(),
                            store = grid.getStore();
                    
                    store.clearFilter();
                    store.filter('kas_type', 'kasmasuk');
                    this.getStartKm().reset(),
                    this.getEndKm().reset(),
                    this.getCabangKm().reset();
                }
            },
            '#KasMasukNew':{
                click: function(){
                    var form = this.getKsMasukForm().getForm();
                    
                    form.reset();
                    // reset ttd
//                    Ext.getCmp('imageTtdKm').setSrc(BASE_URL + 'assets/img_data/signBlank.png');
//                    Ext.Ajax.request({
//                       url: BASE_PATH + 'data/clear_data_sign_img/signNullKm',
//                       scope: this,
//                       callback: function (options, success, response) {
//                           var resp = Ext.decode(response.responseText);
//
//                           if (resp.success === 'true') {
//                               console.log('Kas Masuk Reset');
//                           }
//                       }
//                    });
                }
            },
            '#KasMasukSave':{
                click: function(){
                    var form = this.getKsMasukForm().getForm(),
                        id = form.findField('id').getValue(),
                        grid = this.getKsMasukGrid(),
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
                            url: BASE_PATH + 'ks_masuk/add_kasmasuk',
                            method: 'POST',
                            params: form.getValues(),
                            callback: function (options, success, response) {
                                var resp = Ext.decode(response.responseText);

                                if (resp.success === 'true') {
                                    Ext.MessageBox.show({
                                        title: resp.title,
                                        msg: resp.message,
                                        buttons: Ext.MessageBox.OK,
                                        icon: Ext.MessageBox.INFO
                                    });

                                    form.reset();
//                                    form.findField('namaKd').setReadOnly(true);
//                                        Ext.getCmp('imageTtdKm').setSrc(BASE_URL + 'assets/img_data/signBlank.png');

                                    var filter2 = new Ext.util.Filter({
                                        property: 'kas_type',
                                        value: 'kasmasuk'
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
            },
            '#KasMasukSavePrint':{
                click: function(){
                    var form = this.getKsMasukForm().getForm(),
                        id = form.findField('id').getValue(),
                        grid = this.getKsMasukGrid(),
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
                            url: BASE_PATH + 'ks_masuk/add_kasmasuk',
                            method: 'POST',
                            params: form.getValues(),
                            callback: function (options, success, response) {
                                var resp = Ext.decode(response.responseText);

                                if (resp.success === 'true') {
                                    Ext.MessageBox.show({
                                        title: resp.title,
                                        msg: resp.message,
                                        buttons: Ext.MessageBox.OK,
                                        icon: Ext.MessageBox.INFO
                                    });

                                    form.reset();
//                                    form.findField('namaKd').setReadOnly(true);
//                                        Ext.getCmp('imageTtdKm').setSrc(BASE_URL + 'assets/img_data/signBlank.png');

                                    var filter2 = new Ext.util.Filter({
                                        property: 'kas_type',
                                        value: 'kasmasuk'
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
                                    //belum fix
//                                    window.open(BASE_PATH + 'print_data/print_kas/' + resp.data, "Print Preview", "height=530,width=500,modal=yes,alwaysRaised=yes");
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
            '#KasMasukDelete':{
                click: function(){
                    var grid = this.getKsMasukGrid();
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
// check login dilewati
//                        Ext.Ajax.request({
//                            url: BASE_PATH + 'data/check_login_status',
//                            method: 'POST',
//                            scope: this,
//                            callback: function (options, success, response) {
//                                var resp = Ext.decode(response.responseText);
//
//                                if (resp.success == "true") {
                                    var sel = grid.getSelectionModel().getSelection()[0].get('id');
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
    delFinal: function (sel, me) {
        var form = this.getKsMasukForm().getForm(),
            grid = this.getKsMasukGrid(),
            store = grid.getStore(),
            filterCollection = [];

        Ext.Msg.show({
            title: 'Konfirmasi',
            msg: 'Apakah anda yakin akan menghapus data?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.MessageBox.WARNING,
            fn: function (btn) {
                if (btn == 'yes') {
                    Ext.Ajax.request({
                        url: BASE_PATH + 'ks_masuk/delete_kasmasuk',
                        method: 'POST',
                        params: {id:sel},
                        callback: function (options, success, response) {
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
//                                Ext.getCmp('imageTtdKm').setSrc(BASE_URL + 'assets/img_data/signBlank.png');

                                var filter2 = new Ext.util.Filter({
                                    property: 'kas_type',
                                    value: 'kasmasuk'
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