/**
 * @author Isht Ae
 **/

Ext.define('GlApp.controller.GetDvTxPengadaan', {
    extend: 'GlApp.controller.Base',
    models: [
    ],
    stores: [
        'dvtxpengadaan.ItemStore', 'dvtxpengadaan.PengadaanStore', 'dvtxpengadaan.ItemMerkStore', 
        'dvtxpengadaan.ItemKatalogStore', 'dvtxpengadaan.KemasanStore', 'dvtxpengadaan.PengadaanDetailStore',
        'dvtxpengadaan.CabangStore', 'dvtxpengadaan.DivisiStore'
    ],
    views: [
        'dvtxpengadaan.GetDvTxPengadaan',
        'dvtxpengadaan.DvTxPengadaanGrid',
        'dvtxpengadaan.DvTxPengadaanForm',
        'dvtxpengadaan.DvTxDetailPengadaanGrid'
    ],
    refs: [
        {ref: 'DvTxPengadaanForm', selector: '#dvtxpengadaanform'},
        {ref: 'DvTxPengadaanGrid', selector: '#dvtxpengadaangrid'},
        {ref: 'DvTxDetailPengadaanGrid', selector: '#dvtxdetailpengadaangrid'}
    ],
    init: function () {
        this.control({
            '#dvtxpengadaanform button[action=divpengNew]': {
                click: this.pengadaanReset
            },
            '#dvtxpengadaanform button[action=divpengNewItem]': {
                click: this.newdetailpengadaan
            },
            '#dvtxpengadaanform button[action=divpengSave]': {
                click: this.pengadaanSave
            },
            '#dvtxpengadaangrid button[action=apprPeng]': {
                click: this.approvalDv
            },
            '#dvtxpengadaangrid button[action=approvalMn]': {
                click: this.approvalMn
            },
            '#dvtxpengadaangrid button[action=approvalPs]': {
                click: this.approvalPs
            },
            '#dvtxpengadaangrid': {
                selectionchange: function (model, records) {
                    var form = this.getDvTxPengadaanForm().getForm();

                    if(records[0]) {
                        form.loadRecord(records[0]);
                    }
                },
                itemclick: function () {
                    var grid = this.getDvTxPengadaanGrid(),
                        store = this.getDvTxDetailPengadaanGrid().getStore(),
                        sel = grid.getSelectionModel().getSelection(),
                        idPeng = sel[0].get('idPengadaan');

                    store.clearFilter(true);
                    store.filter('pengadaan_id', idPeng);
                },
                beforeselect: function(selModel, record, index) {
                    var statusPengDiv = record.get('pengStatusDiv'),
                        statusPengs = record.get('pengStatus');

                    if (statusPengDiv !== 0 && statusPengs !== 0) {
                        Ext.MessageBox.alert('Info', 'Barang sudah di Approve');
                        return false;
                    }
                }
            },
        });
    },
    newdetailpengadaan: function (button, e, options) {
        var form = this.getDvTxPengadaanForm().getForm(),
            store = this.getDvTxDetailPengadaanGrid().getStore(),
            id = form.findField('idPengadaan'),
            noPeng = form.findField('noPeng'),
            barang = form.findField('pengBarang').getValue(),
            divisi = form.findField('divisi').getValue(),
            qty = form.findField('qtyBarang').getValue();

        if (divisi === "undefined" || divisi === null) {
            Ext.MessageBox.alert('Warning', 'Pilih Divisi dahulu');
            return;
        }

        if (barang === "undefined" || barang === null) {
            Ext.MessageBox.alert('Warning', 'Pilih barang dahulu');
            return;
        }

        if (qty < 1) {
            Ext.MessageBox.alert('Warning', 'Jumlah barang minimal 1');
            return;
        }

        Ext.Ajax.request({
            url: BASE_PATH + 'dv_txpengadaan/add_pengadaan_item',
            method: 'POST',
            params: form.getValues(),
            scope: this,
            callback: function (options, success, response) {
                var resp = Ext.decode(response.responseText);

                if (resp.success === 'true') {
                    form.reset();
                    id.setValue(resp.data.pengId);
                    noPeng.setValue(resp.data.pengNo);
                    store.clearFilter(true);
                    store.filter('pengadaan_id', resp.data.pengId);
                    form.findField('divisi').setValue(USER_DIVISI);
                    form.findField('golName').hide();
                    form.findField('pengMerk').hide();
                    form.findField('pengKatalog').hide();
                    form.findField('pengKemasan').hide();
                    form.findField('qtyBarang').hide();
                    form.findField('tglKebutuhan').hide();
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
    },
    pengadaanSave: function (btn, e, opt) {
        var form = this.getDvTxPengadaanForm().getForm(),
            store1 = this.getDvTxPengadaanGrid().getStore(),
            store2 = this.getDvTxDetailPengadaanGrid().getStore(),
            filterCollection = [];

        if (form.isValid()) {
            Ext.Ajax.request({
                url: BASE_PATH + 'dv_txpengadaan/pengadaan_complete',
                method: 'POST',
                params: form.getValues(),
                scope: this,
                callback: function (options, success, response) {
                    var resp = Ext.decode(response.responseText);

                    if (resp.success === 'true') {
                        form.reset();
                        
                        var filter2 = new Ext.util.Filter({
                            property: 'cabang_id',
                            value: CABANG_ID
                        });
                        filterCollection.push(filter2);

                        var filter2 = new Ext.util.Filter({
                            property: 'divisi',
                            value: USER_DIVISI
                        });
                        filterCollection.push(filter2);

                        store1.clearFilter(true);
                        store1.filter(filterCollection);
                        
                        this.getDvTxPengadaanGrid().getSelectionModel().clearSelections();
                        store2.removeAll();
                        form.findField('divisi').setValue(USER_DIVISI);
                        form.findField('golName').hide();
                        form.findField('pengMerk').hide();
                        form.findField('pengKatalog').hide();
                        form.findField('pengKemasan').hide();
                        form.findField('qtyBarang').hide();
                        form.findField('tglKebutuhan').hide();
                    }
                    else {
                    Ext.MessageBox.show({
                        title: resp.message,
                        msg: resp.msg,
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.ERROR
                    });
                }
                }
            });
        }
    },
    approvalDv: function(btn) {
        var grid = this.getDvTxPengadaanGrid(),
                sel = grid.getSelectionModel().getSelection();

        if (!sel.length) {
            Ext.MessageBox.alert('Warning', 'Pilih item  yang akan di approve.');
            return;
        }

        var id = '';
        for (var i = 0; i < sel.length; i++) {
            id = id + sel[i].get('idPengadaan') + '-';
        }
        var form = this.getDvTxPengadaanForm().getForm(),
            store1 = this.getDvTxPengadaanGrid().getStore(),
            store2 = this.getDvTxDetailPengadaanGrid().getStore(),
            filterCollection = [];

        if (form.isValid()) {
            Ext.Ajax.request({
                url: BASE_PATH + 'dv_txpengadaan/approve_divisi',
                method: 'POST',
                params: {id: id},
                scope: this,
                callback: function (options, success, response) {
                    var resp = Ext.decode(response.responseText);

                    if (resp.success === 'true') {
                        form.reset();
                        
                        var filter2 = new Ext.util.Filter({
                            property: 'cabang_id',
                            value: CABANG_ID
                        });
                        filterCollection.push(filter2);

                        var filter2 = new Ext.util.Filter({
                            property: 'divisi',
                            value: USER_DIVISI
                        });
                        filterCollection.push(filter2);

                        store1.clearFilter(true);
                        store1.filter(filterCollection);
                        
                        this.getDvTxPengadaanGrid().getSelectionModel().clearSelections();
                        store2.removeAll();
                        form.findField('divisi').setValue(USER_DIVISI);
                        form.findField('golName').hide();
                        form.findField('pengMerk').hide();
                        form.findField('pengKatalog').hide();
                        form.findField('pengKemasan').hide();
                        form.findField('qtyBarang').hide();
                        form.findField('tglKebutuhan').hide();
                    }
                    else {
                    Ext.MessageBox.show({
                        title: resp.message,
                        msg: resp.msg,
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.ERROR
                    });
                }
                }
            });
        }
        
    },
    approvalMn: function(btn) {
        var grid = this.getDvTxPengadaanGrid(),
                sel = grid.getSelectionModel().getSelection();

        if (!sel.length) {
            Ext.MessageBox.alert('Warning', 'Pilih item  yang akan di approve.');
            return;
        }

        var id = '';
        for (var i = 0; i < sel.length; i++) {
            id = id + sel[i].get('idPengadaan') + '-';
        }
        var form = this.getDvTxPengadaanForm().getForm(),
            store1 = this.getDvTxPengadaanGrid().getStore(),
            store2 = this.getDvTxDetailPengadaanGrid().getStore(),
            filterCollection = [];

        if (form.isValid()) {
            Ext.Ajax.request({
                url: BASE_PATH + 'dv_txpengadaan/approve_manager',
                method: 'POST',
                params: {id: id},
                scope: this,
                callback: function (options, success, response) {
                    var resp = Ext.decode(response.responseText);

                    if (resp.success === 'true') {
                        form.reset();
                        
                        var filter2 = new Ext.util.Filter({
                            property: 'cabang_id',
                            value: CABANG_ID
                        });
                        filterCollection.push(filter2);

                        var filter2 = new Ext.util.Filter({
                            property: 'divisi',
                            value: USER_DIVISI
                        });
                        filterCollection.push(filter2);

                        store1.clearFilter(true);
                        store1.filter(filterCollection);
                        
                        this.getDvTxPengadaanGrid().getSelectionModel().clearSelections();
                        store2.removeAll();
                        form.findField('divisi').setValue(USER_DIVISI);
                        form.findField('golName').hide();
                        form.findField('pengMerk').hide();
                        form.findField('pengKatalog').hide();
                        form.findField('pengKemasan').hide();
                        form.findField('qtyBarang').hide();
                        form.findField('tglKebutuhan').hide();
                    }
                    else {
                    Ext.MessageBox.show({
                        title: resp.message,
                        msg: resp.msg,
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.ERROR
                    });
                }
                }
            });
        }
        
    },
    approvalPs: function(btn) {
        var grid = this.getDvTxPengadaanGrid(),
                sel = grid.getSelectionModel().getSelection();

        if (!sel.length) {
            Ext.MessageBox.alert('Warning', 'Pilih item  yang akan di approve.');
            return;
        }

        var id = '';
        for (var i = 0; i < sel.length; i++) {
            id = id + sel[i].get('idPengadaan') + '-';
        }
         var form = this.getDvTxPengadaanForm().getForm(),
            store1 = this.getDvTxPengadaanGrid().getStore(),
            store2 = this.getDvTxDetailPengadaanGrid().getStore(),
            filterCollection = [];
        if (form.isValid()) {
            Ext.Ajax.request({
                url: BASE_PATH + 'dv_txpengadaan/approve_pusat',
                method: 'POST',
                params: {id: id},
                scope: this,
                callback: function (options, success, response) {
                    var resp = Ext.decode(response.responseText);

                    if (resp.success === 'true') {
                        form.reset();
                        
                        var filter2 = new Ext.util.Filter({
                            property: 'cabang_id',
                            value: CABANG_ID
                        });
                        filterCollection.push(filter2);

                        var filter2 = new Ext.util.Filter({
                            property: 'divisi',
                            value: USER_DIVISI
                        });
                        filterCollection.push(filter2);

                        store1.clearFilter(true);
                        store1.filter(filterCollection);
                        
                        this.getDvTxPengadaanGrid().getSelectionModel().clearSelections();
                        store2.removeAll();
                        form.findField('divisi').setValue(USER_DIVISI);
                        form.findField('golName').hide();
                        form.findField('pengMerk').hide();
                        form.findField('pengKatalog').hide();
                        form.findField('pengKemasan').hide();
                        form.findField('qtyBarang').hide();
                        form.findField('tglKebutuhan').hide();
                    }
                    else {
                    Ext.MessageBox.show({
                        title: resp.message,
                        msg: resp.msg,
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.ERROR
                    });
                }
                }
            });
        }
       
    },
});

/* End of file SystemMenu.js */
/* Location: ./assets/js/app/controller/SystemMenu.js */