/**
 * @author coepoe
 **/

// untuk penyimpanan dan pembatalan detail kas bon belum fix

Ext.define('GlApp.controller.GetKsHitungBon', {
    extend: 'GlApp.controller.Base',
    models: [
    ],
    stores: [
        'kshitungbon.TrxKasStore',
        'kshitungbon.DetailKbStore'
    ],
    views: [
        'kshitungbon.GetKsHitungBon',
        'kshitungbon.KsHitungBonGrid',
        'kshitungbon.KsHitungBonDetailGrid',
        'kshitungbon.ItemKasbonWin'
    ],
    refs: [
        {ref: 'KsHitungBonGrid', selector: '#kshitungbongrid'},
        {ref: 'KsHitungBonDetailGrid', selector: '#kshitungbondetailgrid'},
        {ref: 'ItemKasbonWin', selector: '#itemkasbonwin'},
        {ref: 'KasbonForm', selector: '#kasbonform'},
        {ref: 'KasbonGrid', selector: '#kasbongrid'},
    ],
    init: function () {
        this.control({
            '#kshitungbongrid': {
                afterrender: function () {
                    var grid = this.getKsHitungBonGrid();
                    grid.getStore().clearFilter(true);
                    grid.getStore().filter('kas_akun', 5);
                },
                itemclick: function () {
                    var grid = this.getKsHitungBonGrid();
                    var grid2 = this.getKsHitungBonDetailGrid();
                    var sel = grid.getSelectionModel().getSelection();

                    var id = sel[0].get('id');
                    grid2.getStore().removeAll();
                    grid2.getStore().clearFilter(true);
                    grid2.getStore().filter('kasbon_id', id);
                    
                    
                }
            },
            '#HitungBonRefresh':{
                click: function(){
                    var grid = this.getKsHitungBonGrid();
                    var grid2 = this.getKsHitungBonDetailGrid();
                    
                    grid.getStore().load();
                    grid.getStore().clearFilter(true);
                    grid.getStore().filter('kas_akun', 5);
                    grid2.getStore().removeAll();
                }
            },
            '#RincianKasBon':{
                click: function(){
                    var grid = this.getKsHitungBonGrid();

                    if (grid) {
                        var sm = grid.getSelectionModel();
                        var rs = sm.getSelection();
                        if (!rs.length) {
                            Ext.Msg.alert('Info', 'Pilih dahulu Kasbon');
                            return;
                        }
                        var sel = grid.getSelectionModel().getSelection();

                        var id = sel[0].get('id');
                        var jumlah = sel[0].get('kas_jumlah');
//                        if (sel[0].get('kas_kbapproval') === 1) {
//                            Ext.Msg.alert('Warning', 'Transaksi ini telah di otorisasi, tidak bisa di ubah');
//                            return;
//                        } else {
                            this.itemkasbon(id, jumlah);
//                        }
                    }
//                    var win = Ext.widget('kshitungbon.itemkasbonwin');
                }
            },
            '#windowNewForm': {
                click: function(btn) {
//                    var itemkasbonwin = Ext.widget('kshitungbon.itemkasbonwin');
                    var form = this.getKasbonForm(),
                        grid = this.getKasbonGrid(),
                        kasbon_id = form.getForm().findField('kasbon_id').getValue(),
                        kas_jumlah = form.getForm().findField('kas_jumlah').getValue();
                
                    form.getForm().findField('kasbon_id').setValue(kasbon_id);
                    form.getForm().findField('kas_jumlah').setValue(kas_jumlah);
                    grid.getStore().load();
                    grid.getSelectionModel().clearSelections();
                }
            },
            '#windowSaveDetailKasbon':{
                click: function(){
                    var itemkasbonwin = Ext.widget('kshitungbon.itemkasbonwin');
                    var form = this.getKasbonForm(),
                        grid = this.getKasbonGrid(),
                        store = grid.getStore();
                
                    Ext.Ajax.request({
                        url: BASE_PATH + 'ks_hitungbon/add_detailkasbon',
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

                                store.clearFilter(true);
                                store.filter('kasbon_id', resp.kasbon_id);
                                grid.getSelectionModel().clearSelections();
                                form.getForm().reset();
                                form.getForm().findField('kasbon_id').setValue(resp.kasbon_id);
                                form.getForm().findField('kas_jumlah').setValue(resp.kas_jumlah);
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
            '#savePrintKbDetail':{
                click: function(){
                    var itemkasbonwin = Ext.widget('kshitungbon.itemkasbonwin');
                    var form = this.getKasbonForm(),
                        grid = this.getKasbonGrid(),
                        store = grid.getStore(),
                        kasbon_id = form.getForm().findField('kasbon_id').getValue(),
                        kbGrid = this.getKsHitungBonGrid(),
                        kbdGrid = this.getKsHitungBonDetailGrid();

                    Ext.Ajax.request({
                        url: BASE_PATH + 'ks_hitungbon/approve_kasbon',
                        method: 'POST',
                        params: {kasbon_id : kasbon_id},
                        callback: function (options, success, response) {
                            var resp = Ext.decode(response.responseText);

                            if (resp.success === 'true') {
                                itemkasbonwin.close();
                                kbGrid.getStore().load();
                                kbGrid.getSelectionModel().clearSelections();
                                kbdGrid.getStore().removeAll();
                                window.open(BASE_PATH + 'print_data/print_kas/' + resp.kasbon_id, "Print Preview", "height=530,width=500,modal=yes,alwaysRaised=yes");
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
            '#saveKbDetail':{
                click: function(){
                    var itemkasbonwin = Ext.widget('kshitungbon.itemkasbonwin');
                    var form = this.getKasbonForm(),
                        grid = this.getKasbonGrid(),
                        store = grid.getStore(),
                        kasbon_id = form.getForm().findField('kasbon_id').getValue(),
                        kbGrid = this.getKsHitungBonGrid(),
                        kbdGrid = this.getKsHitungBonDetailGrid();

                    Ext.Ajax.request({
                        url: BASE_PATH + 'ks_hitungbon/approve_kasbon',
                        method: 'POST',
                        params: {idKb : id},
                        callback: function (options, success, response) {
                            var resp = Ext.decode(response.responseText);

                            if (resp.success === 'true') {
                                itemkasbonwin.close();
                                kbGrid.getStore().load();
                                kbGrid.getSelectionModel().clearSelections();
                                kbdGrid.getStore().removeAll();
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
            '#batalKbDetail':{
                click: function(){
                    var itemkasbonwin = Ext.widget('kshitungbon.itemkasbonwin');
                    var form = this.getKasbonForm(),
                        grid = this.getKasbonGrid(),
                        kasbon_id = form.getForm().findField('kasbon_id').getValue(),
                        store = this.getKsHitungBonDetailGrid().getStore();

                    Ext.Ajax.request({
                        url: BASE_PATH + 'ks_hitungbon/reset_kasbon',
                        method: 'POST',
                        params: form.getValues(),
                        scope: this,
                        callback: function (options, success, response) {
                            var resp = Ext.decode(response.responseText);

                            if (resp.success === 'true') {
                                store.removeAll();
                                itemkasbonwin.up('window').close();
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
    },
    'itemkasbon': function(id, jumlah){
        var itemkasbonwin = Ext.widget('kshitungbon.itemkasbonwin');
        var form = itemkasbonwin.down('#kasbonpanel').down('#kasbonform'),
            grid = itemkasbonwin.down('#kasbonpanel').down('#kasbongrid'),
            store = grid.getStore();

        form.getForm().findField('kasbon_id').setValue(id);
        form.getForm().findField('kas_jumlah').setValue(jumlah);
        store.clearFilter(true);
        store.filter('kasbon_id', id);
    }
});

/* End of file SystemMenu.js */
/* Location: ./assets/js/app/controller/SystemMenu.js */