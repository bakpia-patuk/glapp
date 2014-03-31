/**
 * @author Isht Ae
 **/

Ext.define('GlApp.controller.GetKsMintaKas', {
    extend: 'GlApp.controller.Base',
    models: [
    ],
    stores: [
        'ksmintakas.GrkBkStore',
        'ksmintakas.MasterTelisaStore',
        'ksmintakas.MintaKasStore',
        'ksmintakas.CabangStore'
    ],
    views: [
        'ksmintakas.GetKsMintaKas',
        'ksmintakas.KsMintaKasForm',
        'ksmintakas.KsMintaKasGrid',
//        'ksmintakas.newWindow',
//        'ksmintakas.appForm',
//        'ksmintakas.app2Form',
        //shared Window
//        'shared.newWindow',
        'ksmintakas.GkMasterGrid',
        'ksmintakas.GkMasterAkunGrid',
        'ksmintakas.GkMasterDetailGrid'
    ],
    refs: [
        {ref: 'GetKsMintaKas', selector: '#GetKsMintaKas'},
        {ref: 'KsMintaKasForm', selector: '#ksmintakasform'},
        {ref: 'KsMintaKasGrid', selector: '#ksmintakasgrid'},
        {ref: 'GridKeperluan', selector: '#gkmastergrid'},
        {ref: 'GridAkunKeperluan', selector: '#gkmasterakungrid'},
        {ref: 'GridAkunDetail', selector: '#gkmasterdetailgrid'}
    ],
    init: function() {
        this.control({
            '#MintaKasSave': {
                click: function(){
                    var form = this.getKsMintaKasForm().getForm(),
                            grid = this.getKsMintaKasGrid(),
                            store = grid.getStore(),
                            filterCollection = [];
                    
                    Ext.Ajax.request({
                        url: BASE_PATH + 'ks_mintakas/add_minta_kas',
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
                                form.findField('mk_detail').hide();
                                form.findField('mk_detailext').hide();
                                store.removeAll();

                                var statusFilter = new Ext.util.Filter({
                                    property: 'tgl_trx',
                                    value: Ext.Date.format(new Date(), 'Y-m-d 00:00:00') + 'GT'
                                });
                                filterCollection.push(statusFilter);

                                var statusFilter = new Ext.util.Filter({
                                    property: 'tgl_trx',
                                    value: Ext.Date.format(new Date(), 'Y-m-d 00:00:00') + 'GT'
                                });
                                filterCollection.push(statusFilter);

                                var statusFilter = new Ext.util.Filter({
                                    property: 'cabang_id',
                                    value: CABANG_ID
                                });
                                filterCollection.push(statusFilter);

                                store.clearFilter(true);
                                store.filter(filterCollection);
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
            '#MintaKasNew':{
                click: function(){
                    var form = this.getKsMintaKasForm().getForm(),
                            grid = this.getKsMintaKasGrid();

                    form.reset();
                    grid.getSelectionModel().deselectAll();
                    form.findField('tgl_trx').setReadOnly(false);
                    form.findField('trx_divisi').setReadOnly(false);
                    form.findField('mk_keperluan').setReadOnly(false);
                    form.findField('mk_detail').hide();
                    form.findField('mk_detailext').hide();
                }
            },
            '#MintaKasSearch':{
                click: function(){
                    var panel = this.getGetKsMintaKas(),
                            grid = this.getKsMintaKasGrid(),
                            store = grid.getStore(),
                            filterCollection = [],
                            date1 = panel.down('#dateMbFilter').getValue(),
                            date2 = panel.down('#dateMbFilter2').getValue(),
                            cabang = panel.down('#cabangMkFilter').getValue();
                    
                    if(cabang === null && date1 === null && date2 === null){
                        Ext.Msg.alert('Perhatian', 'Mohon isi salah satu filter.');
                        return;
                    } else {
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
                                property: 'tgl_trx',
                                value: Ext.Date.format(date1, 'Y-m-d 00:00:00') + 'GT'
                            });
                            filterCollection.push(statusFilter);

                            store.clearFilter(true);
                            store.filter(filterCollection);
                        } else if(cabang === null && date1 === null && date2 !== null){
                            var statusFilter = new Ext.util.Filter({
                                property: 'tgl_trx',
                                value: Ext.Date.format(date2, 'Y-m-d 23:59:59') + 'LT'
                            });
                            filterCollection.push(statusFilter);

                            store.clearFilter(true);
                            store.filter(filterCollection);
                        } else if(cabang === null && date1 !== null && date2 !== null){
                            var statusFilter = new Ext.util.Filter({
                                property: 'tgl_trx',
                                value: Ext.Date.format(date1, 'Y-m-d 00:00:00') + 'GT'
                            });
                            filterCollection.push(statusFilter);
                            
                            var statusFilter = new Ext.util.Filter({
                                property: 'tgl_trx',
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
                                property: 'tgl_trx',
                                value: Ext.Date.format(date2, 'Y-m-d 23:59:59') + 'LT'
                            });
                            filterCollection.push(statusFilter);

                            store.clearFilter(true);
                            store.filter(filterCollection);
                        } else if(cabang !== null && date1 !== null && date2 === null){
                            var statusFilter = new Ext.util.Filter({
                                property: 'tgl_trx',
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
                                property: 'tgl_trx',
                                value: Ext.Date.format(date1, 'Y-m-d 00:00:00') + 'GT'
                            });
                            filterCollection.push(statusFilter);
                            
                            var statusFilter = new Ext.util.Filter({
                                property: 'cabang_id',
                                value: cabang
                            });
                            filterCollection.push(statusFilter);
                            
                            var statusFilter = new Ext.util.Filter({
                                property: 'tgl_trx',
                                value: Ext.Date.format(date2, 'Y-m-d 23:59:59') + 'LT'
                            });
                            filterCollection.push(statusFilter);

                            store.clearFilter(true);
                            store.filter(filterCollection);
                        }
                    }
                }
            },
            '#MintaKasDelete':{
                click: function(){
                    var form = this.getKsMintaKasForm().getForm(),
                        grid = this.getKsMintaKasGrid(),
                        store = grid.getStore();

                    if (grid) {
                        var sm = grid.getSelectionModel();
                        var rs = sm.getSelection();
                        if (!rs.length) {
                            Ext.Msg.alert('Info', 'Pilih dahulu Transaksi yang akan di hapus');
                            return;
                        }
                        var sel = grid.getSelectionModel().getSelection();

                        Ext.Msg.show({
                            title: 'Konfirmasi',
                            msg: 'Apakah anda yakin akan menghapus data ini ?',
                            buttons: Ext.Msg.YESNO,
                            fn: function(btn) {
                                if (btn === 'yes') {
                                    var data = '';
                                    for (var i = 0; i < sel.length; i++) {
                                        data = data + sel[i].get('id') + '-';
                                    }
                                    Ext.Ajax.request({
                                        url: BASE_PATH + 'ks_mintakas/delete_mintakas',
                                        method: 'POST',
                                        params: {postdata: data},
                                        scope: this,
                                        callback: function(options, success, response) {
                                            var resp = Ext.decode(response.responseText);

                                            if (resp.success === 'true') {
                                                form.reset();
                                                form.findField('mk_detail').hide();
                                                form.findField('mk_detailext').hide();
                                                grid.getSelectionModel().deselectAll();
                                                store.load();
                                            }
                                        }
                                    });
                                }
                            }
                        });
                    }
                }
            },
            '#MintaKasRefresh':{
                click: function(){
                    var grid = this.getKsMintaKasGrid(),
                            store = grid.getStore();
                    
                    store.clearFilter();
                    store.load();
                }
            },
            '#MintaKasApproval':{
                click: function(){
                    var form = this.getKsMintaKasForm().getForm(),
                        grid = this.getKsMintaKasGrid(),
                        store = grid.getStore();
                
                    if (grid) {
                        var sm = grid.getSelectionModel();
                        var rs = sm.getSelection();
                        if (!rs.length) {
                            Ext.Msg.alert('Info', 'Pilih dahulu Transaksi yang akan di Approve');
                            return;
                        }
                        var sel = grid.getSelectionModel().getSelection();

                        var id = '';
                        for (var i = 0; i < sel.length; i++) {
                            id = id + sel[i].get('id') + '-';
                        }
                        
                        Ext.Ajax.request({
                            url: BASE_PATH + 'ks_mintakas/approve_mintakas',
                            method: 'POST',
                            params: {id:id},
                            scope: this,
                            callback: function(options, success, response) {
                                var resp = Ext.decode(response.responseText);

                                if (resp.success === 'true') {
                                    Ext.MessageBox.show({
                                        title: 'Info',
                                        msg: 'Data(s) Approved',
                                        buttons: Ext.MessageBox.OK,
                                        icon: Ext.MessageBox.INFO
                                    });

                                    form.reset();
                                    form.findField('mk_detail').hide();
                                    form.findField('mk_detailext').hide();
                                    grid.getSelectionModel().clearSelections();
                                    store.load();
                                } else {
                                }
                            }
                        });
                    }
                }
            }
        });
    },
});

/* End of file SystemMenu.js */
/* Location: ./assets/js/app/controller/SystemMenu.js */