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
       'dvtxbrkeluar.divBkEdGrid',
       'dvtxbrkeluar.newWindow'
    ],
    refs: [
        {ref: 'DvTxBrKeluarForm', selector: '#dvtxbrkeluarform'},
        {ref: 'DvTxBrKeluarGrid', selector: '#dvtxbrkeluargrid'},
        {ref: 'DvTxBrKeluarDetailGrid', selector: '#dvtxbrkeluardetailgrid'}
    ],
    init: function() {
        this.control({
            '#dvtxbrkeluarform button[action=dbkSave1]': {
                click: function(btn, e, opt) {
                     Ext.MessageBox.show({
                        title: 'INFO',
                        msg:  'Barang Berhasil Dikeluarkan',
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.INFO
                    });
                }
            },
            '#dvtxbrkeluarform button[action=dmbNew]': {
                click: function(btn, e, opt) {
                    var filterCollection = [];
                    
                    var form = this.getDvTxBrKeluarForm().getForm();
                    form.reset();
                    var store = this.getDvTxBrKeluarGrid().getStore();
                    var store2 = this.getDvTxBrKeluarDetailGrid().getStore();
                    //divisiField.setValue((resp.data.divisi));
                    store2.removeAll();

                    var statusFilter1 = new Ext.util.Filter({
                        property: 'pengdiv_tujuan',
                        value: USER_DIVISI
                    });
                    filterCollection.push(statusFilter1);

                    var statusFilter2 = new Ext.util.Filter({
                        property: 'appr_status',
                        value: '1'
                    });
                    filterCollection.push(statusFilter2);

                    var statusFilter2 = new Ext.util.Filter({
                        property: 'kirim_status',
                        value: '1NE'
                    });
                    filterCollection.push(statusFilter2);

                    store.clearFilter(true);
                    store.filter(filterCollection);
                    this.getDvTxBrKeluarGrid().getSelectionModel().clearSelections();
                }
            },
            '#dvtxbrkeluarform button[action=dbkSave]': {
                click: function(btn, e, opt) {
                    var grid = this.getDvTxBrKeluarDetailGrid(),
                            store = grid.getStore(),
                            form = this.getDvTxBrKeluarForm().getForm(),
                            id = form.findField('id'),
                            isNoLot = form.findField('isNoLot').getValue(),
                            divisi = form.findField('divisi'),
                            jumlah = form.findField('jumlah').getValue(),
                            jumlahOld = form.findField('jumlahOld').getValue();

                    alert(jumlahOld);
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
                                if(isNoLot=='1'){
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
                                }
                                else{
                                    Ext.Ajax.request({
                                        url: BASE_PATH + 'dv_txbrkeluar/save',
                                        method: 'POST',
                                        params: form.getValues(),
                                        scope: this,
                                        callback: function(options, success, response) {
                                            var resp = Ext.decode(response.responseText);

                                            if (resp.success == 'true') {
                                                var filterCollection = [];
                                               
                                                var form = this.getDvTxBrKeluarForm().getForm();
                                                form.reset();
                                                var store = this.getDvTxBrKeluarGrid().getStore();
                                                var store2 = this.getDvTxBrKeluarDetailGrid().getStore();
                                                //divisiField.setValue((resp.data.divisi));
                                                store2.removeAll();

                                                var statusFilter1 = new Ext.util.Filter({
                                                    property: 'pengdiv_tujuan',
                                                    value: USER_DIVISI
                                                });
                                                filterCollection.push(statusFilter1);

                                                var statusFilter2 = new Ext.util.Filter({
                                                    property: 'appr_status',
                                                    value: '1'
                                                });
                                                filterCollection.push(statusFilter2);

                                                var statusFilter2 = new Ext.util.Filter({
                                                    property: 'kirim_status',
                                                    value: '1NE'
                                                });
                                                filterCollection.push(statusFilter2);

                                                store.clearFilter(true);
                                                store.filter(filterCollection);
                                                this.getDvTxBrKeluarGrid().getSelectionModel().clearSelections();
                                                Ext.MessageBox.show({
                                                    title: 'INFO',
                                                    msg: resp.msg,
                                                    buttons: Ext.MessageBox.OK,
                                                    icon: Ext.MessageBox.INFO
                                                });
                                            }
                                            else{
                                                btn.up('window').destroy();
                                               
                                                Ext.MessageBox.show({
                                                    title: 'INFO',
                                                    msg: resp.msg,
                                                    buttons: Ext.MessageBox.OK,
                                                    icon: Ext.MessageBox.ERROR
                                                });
                                            }
                                        }
                                    });
                                }
                                

//                                
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
                afterrender: function () {
                    var filterCollection=[];
                    var store = this.getDvTxBrKeluarGrid().getStore();
                    var store2 = this.getDvTxBrKeluarDetailGrid().getStore();
                    //divisiField.setValue((resp.data.divisi));
                    store2.removeAll();

                    var statusFilter1 = new Ext.util.Filter({
                        property: 'pengdiv_tujuan',
                        value: USER_DIVISI
                    });
                    filterCollection.push(statusFilter1);

                    var statusFilter2 = new Ext.util.Filter({
                        property: 'appr_status',
                        value: '1'
                    });
                    filterCollection.push(statusFilter2);

                    var statusFilter2 = new Ext.util.Filter({
                        property: 'kirim_status',
                        value: '1NE'
                    });
                    filterCollection.push(statusFilter2);

                    store.clearFilter(true);
                    store.filter(filterCollection);
                },
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
                        form.findField('isNoLot').setValue(records[0].get('isNoLot'));
                        form.findField('barangCabangId').setValue(records[0].get('barangCabangId'));
                        form.findField('jumlah').setValue(records[0].get('qtyMinta'));
                        form.findField('jumlahOld').setValue(records[0].get('qtyMinta'));
                    }
                }
            }
        });
    },
    showEdWindow: function() {
        var form = this.getDvTxBrKeluarForm().getForm(),
                grid2 = this.getDvTxBrKeluarDetailGrid(),
                id = form.findField('id').getValue(),
                idRuang = form.findField('idRuang').getValue(),
                divisi = form.findField('divisi').getValue(),
                ruangan = form.findField('ruangan').getValue(),
                pengBarang = form.findField('barangCabangId').getValue(),
                jumlah = form.findField('jumlah').getValue(),
                jumlahOld = form.findField('jumlahOld').getValue(),
                grid = new Ext.widget('dvtxbrkeluar.divbkedgrid', {
                    height: 267
                }),
        store = grid.getStore(),
                filterCollection = [];

        var win = new Ext.widget('dvtxbrkeluar.newwindow', {
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
                       
                        btn.up('window').destroy();
                    
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
                        var id_lot = '';
                        var jumlah_out = ''; 
                       
    store.each(function(record){
       var jumlah_keluar = record.get('qtyKeluar');
       
       var noLot = record.get('noLot');
       id_lot+=noLot+'`';
       jumlah_out+=jumlah_keluar+'`';
       
    });


                       Ext.Ajax.request({
                            url: BASE_PATH + 'dv_txbrkeluar/set_itemdivbk',
                            method: 'POST',
                            params: {
                                id_minta: id,
                                id_ruang: ruang,
                                id_barang: barang,
                                id_lot: id_lot,
                                jumlah_out : jumlah_out,

                            },
                            scope: this,
                            callback: function(options, success, response) {
                                var resp = Ext.decode(response.responseText);

                                if (resp.success == 'true') {
                                    var filterCollection = [];
                                    btn.up('window').destroy();
                                    var form = this.getDvTxBrKeluarForm().getForm();
                                    form.reset();
                                    var store = this.getDvTxBrKeluarGrid().getStore();
                                    var store2 = this.getDvTxBrKeluarDetailGrid().getStore();
                                    //divisiField.setValue((resp.data.divisi));
                                    store2.removeAll();

                                    var statusFilter1 = new Ext.util.Filter({
                                        property: 'pengdiv_tujuan',
                                        value: USER_DIVISI
                                    });
                                    filterCollection.push(statusFilter1);

                                    var statusFilter2 = new Ext.util.Filter({
                                        property: 'appr_status',
                                        value: '1'
                                    });
                                    filterCollection.push(statusFilter2);

                                    var statusFilter2 = new Ext.util.Filter({
                                        property: 'kirim_status',
                                        value: '1NE'
                                    });
                                    filterCollection.push(statusFilter2);

                                    store.clearFilter(true);
                                    store.filter(filterCollection);
                                    this.getDvTxBrKeluarGrid().getSelectionModel().clearSelections();
                                    Ext.MessageBox.show({
                                        title: 'INFO',
                                        msg: resp.msg,
                                        buttons: Ext.MessageBox.OK,
                                        icon: Ext.MessageBox.INFO
                                    });
                                }
                                else{
                                    btn.up('window').destroy();
                                   
                                    Ext.MessageBox.show({
                                        title: 'INFO',
                                        msg: resp.msg,
                                        buttons: Ext.MessageBox.OK,
                                        icon: Ext.MessageBox.ERROR
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
            property: 'stl_ruangid',
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
        var form = this.getDvTxBrKeluarForm().getForm();

        Ext.Ajax.request({
            url: BASE_PATH + 'dv_txbrkeluar/save_random',
            method: 'POST',
            params: form.getValues(),
            scope: this,
            callback: function(options, success, response) {
                var resp = Ext.decode(response.responseText);

                if (resp.success == 'true') {
                    var filterCollection = [];
                   
                    var form = this.getDvTxBrKeluarForm().getForm();
                    form.reset();
                    var store = this.getDvTxBrKeluarGrid().getStore();
                    var store2 = this.getDvTxBrKeluarDetailGrid().getStore();
                    //divisiField.setValue((resp.data.divisi));
                    store2.removeAll();

                    var statusFilter1 = new Ext.util.Filter({
                        property: 'pengdiv_tujuan',
                        value: USER_DIVISI
                    });
                    filterCollection.push(statusFilter1);

                    var statusFilter2 = new Ext.util.Filter({
                        property: 'appr_status',
                        value: '1'
                    });
                    filterCollection.push(statusFilter2);

                    var statusFilter2 = new Ext.util.Filter({
                        property: 'kirim_status',
                        value: '1NE'
                    });
                    filterCollection.push(statusFilter2);

                    store.clearFilter(true);
                    store.filter(filterCollection);
                    this.getDvTxBrKeluarGrid().getSelectionModel().clearSelections();
                    Ext.MessageBox.show({
                        title: 'INFO',
                        msg: resp.msg,
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.INFO
                    });
                }
                else{
                    btn.up('window').destroy();
                   
                    Ext.MessageBox.show({
                        title: 'INFO',
                        msg: resp.msg,
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.ERROR
                    });
                }
            }
        });
    }
});

/* End of file SystemMenu.js */
/* Location: ./assets/js/app/controller/SystemMenu.js */