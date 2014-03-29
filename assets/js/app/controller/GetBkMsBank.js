/**
 * @author Isht Ae
 **/

Ext.define('GlApp.controller.GetBkMsBank', {
    extend: 'GlApp.controller.Base',
    models: [
    ],
    stores: [
    ],
    views: [
        'bkmsbank.GetBkMsBank',
        'bkmsbank.BkMsBankForm',
        'bkmsbank.BkMsBankGrid',
//        'masterbank.bnGrid',
//        'masterbank.newWindow'
    ],
    refs: [
        {ref: 'BkMsBankForm', selector: '#bkmsbankform'},
        {ref: 'BkMsBankGrid', selector: '#bkmsbankgrid'}
//        {ref: 'inputCabang', selector: '#filterCabang'}
    ],
    init: function() {
        this.control({
            '#mbgrid': {
                afterrender: this.gridLoad,
                selectionchange: this.loadMasterBank
            },
            '#kodeakun': {
                afterrender: function(cmb, rec, opt) {
                    var store = cmb.getStore(),
                            filterCollection = [];

                    var statusFilter = new Ext.util.Filter({
                        property: 'akun_child_status',
                        value: 1
                    });
                    filterCollection.push(statusFilter);

                    var statusFilter = new Ext.util.Filter({
                        property: 'akun_fungsi',
                        value: 0
                    });
                    filterCollection.push(statusFilter);

                    store.clearFilter(true);
                    store.filter(filterCollection);
                }
            },
            'mbform': {
                afterrender: function() {
                    var form = this.getMbForm().getForm(),
                            bankCabang = form.findField('bankCabang'),
                            golAkun = form.findField('golAkun');

                    if (userCabang !== "14") {
                        bankCabang.getStore().load();
                        bankCabang.setValue(parseInt(userCabang));
                        bankCabang.setReadOnly(true);


                        golAkun.enable();
                        var store = golAkun.getStore();
                        store.getProxy().extraParams.cabang = parseInt(userCabang);
                        var filterCollection = [];

                        var statusFilter = new Ext.util.Filter({
                            property: 'akun_group',
                            value: 1
                        });

                        filterCollection.push(statusFilter);

                        var statusFilter = new Ext.util.Filter({
                            property: 'akun_head_status',
                            value: 0
                        });

                        filterCollection.push(statusFilter);

                        store.clearFilter(true);
                        store.filter(filterCollection);
                    }
                }
            },
            'mbform button[action=mbNew]': {
                click: this.newmb
            },
            'mbform button[action=mbSave]': {
                click: this.savemb
            },
            'mbform button[action=mbDel]': {
                click: this.deletemb
            }
        });
    },
    gridLoad: function() {
        var store = this.getMbGrid().getStore();

        if (userCabang !== "14") {
            store.clearFilter(true);
            store.filter('bank_cabang', userCabang);
        }
    },
    loadMasterBank: function(model, records) {
        var form = this.getMbForm().getForm(),
                golAkun = form.findField('golAkun');

        if (records[0]) {
            form.findField('bankGroup').setValue(records[0].get('bankGroup'));
            form.findField('aliasBank').setValue(records[0].get('bankAlias'));
            form.findField('reknamaBank').setValue(records[0].get('bankNama'));
            form.findField('reknoBank').setValue(records[0].get('bankRek'));
            form.findField('idmb').setValue(records[0].get('id'));
            form.findField('alamatBank').setValue(records[0].get('bankAlamat'));
            form.findField('bankCabang').setValue(records[0].get('bankCabang'));
            form.findField('bankAkun').setValue(records[0].get('bankAkun'));
            
            golAkun.enable();
            var store = golAkun.getStore();
            store.getProxy().extraParams.cabang = parseInt(userCabang);
            var filterCollection = [];

            var statusFilter = new Ext.util.Filter({
                property: 'akun_group',
                value: 1
            });

            filterCollection.push(statusFilter);

            var statusFilter = new Ext.util.Filter({
                property: 'akun_head_status',
                value: 0
            });

            filterCollection.push(statusFilter);

            store.clearFilter(true);
            store.filter(filterCollection);
            
            golAkun.setValue(records[0].get('golAkun'));
            if(records[0].get('bankAkun') !== 0) {
                golAkun.setReadOnly(true);
            } else {
                golAkun.setReadOnly(false);
            }
        }
    },
    newmb: function() {
        var form = this.getMbForm().getForm(),
                grid = this.getMbGrid();
        form.reset();
        if (userCabang !== '14') {
            grid.getStore().load();
        }
    },
    savemb: function(button, e, options) {
        var form = this.getMbForm().getForm(),
                idmb = form.findField('idmb').getValue(),
                store = this.getMbGrid().getStore();

        if (form.isValid()) {
            if (idmb !== "" && userCabang !== '14') {
                Ext.MessageBox.show({
                    title: 'Error',
                    msg: 'Anda Tidak Bisa Merubah data',
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR
                });
            } else {
                Ext.Ajax.request({
                    url: BASE_PATH + 'master/add_mb',
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
                            if (userCabang !== '14') {
                                form.findField('bankCabang').setValue(parseInt(userCabang));
                            }
                            form.reset();
                            if (userCabang !== '14') {
                                store.load();
                            }
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
    deletemb: function() {
        var form = this.getMbForm().getForm(),
                grid = this.getMbGrid(),
                sm = grid.getSelectionModel(),
                sel = sm.getSelection();

        if (!sel.length) {
            Ext.Msg.alert('Warning', 'Pilih Data yang Akan di hapus');
            return;
        }

        Ext.Ajax.request({
            url: BASE_PATH + 'master/delete_mb',
            method: 'POST',
            params: form.getValues(),
            scope: this,
            callback: function(options, success, response) {
                var resp = Ext.decode(response.responseText);

                if (resp.success === 'true') {
                    form.reset();
                    if (userCabang !== '14') {
                        form.findField('bankCabang').setValue(parseInt(userCabang));
                    }
                    sm.clearSelections();
                    grid.getStore().load();
                }
            }
        });
    }
});

/* End of file SystemMenu.js */
/* Location: ./assets/js/app/controller/SystemMenu.js */