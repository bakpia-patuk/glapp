/**
 * @author Isht Ae
 **/

Ext.define('GlApp.controller.GetGdTxPengadaan', {
    extend: 'GlApp.controller.Base',
    models: [
    ],
    stores: [
        'gdtxpengadaan.BarangStore',
        'gdtxpengadaan.CabangStore',
        'gdtxpengadaan.PengStore',
        'gdtxpengadaan.PengDetailStore',
        'gdtxpengadaan.KemasanStore'
    ],
    views: [
        'gdtxpengadaan.GetGdTxPengadaan',
        'gdtxpengadaan.TxPengadaanForm',
        'gdtxpengadaan.TxPengadaanGrid',
        'gdtxpengadaan.TxPengadaanGridDt'
    ],
    refs: [
        {ref: 'PanelPeng', selector: '#GetGdTxPengadaan'},
        {ref: 'PengForm', selector: '#txpengadaanform'},
        {ref: 'PengGrid', selector: '#txpengadaangrid'},
        {ref: 'PengDetailGrid', selector: '#txpengadaangriddt'}
    ],
    init: function() {
        this.listen({
            controller: {
            },
            component: {
                '#GetGdTxPengadaan': {
                    afterrender: function() {
                        Ext.getDoc().dom.title = 'General Ledger - Pengadaan';
                    }
                },
                '#txpengadaangrid': {
                    selectionchange: function(m, r) {
                        var gridDt = this.getPengDetailGrid(),
                                store = gridDt.getStore(),
                                form = this.getPengForm();

                        if (r[0]) {
                            store.clearFilter(true);
                            store.filter('pengadaan_id', r[0].get('id'));

                            form.getForm().loadRecord(r[0]);
                        }
                    }
                },
                '#pengNew': {
                    click: this.resetForm
                },
                '#pengSave': {
                    click: this.saveTrx
                },
                '#pengDelete': {
                    click: this.deletePeng
                },
                '#deleteItemPeng': {
                    click: this.deletePengItem
                },
                '#pengNewItem': {
                    click: this.insertItem
                },
                '#refreshPeng': {
                    click: this.refreshGrid
                },
                '#searchPeng': {
                    click: this.searchGrid
                },
                '#allPeng': {
                    click: this.clearAllGrid
                },
                '#pengAppCb': {
                    click: this.approvalCb
                },
                '#pengAppPs': {
                    click: this.approvalPs
                }
            },
            global: {
            },
            store: {
            }
        });
    },
    resetForm: function(btn) {
        var form = this.getPengForm();

        if (form.saved) {
            this.onSuccess(1, 1);
        } else {
            Ext.Msg.show({
                title: 'Konfirmasi',
                msg: 'Anda sedang melakukan transaksi. Lanjutakan transaksi ?',
                buttons: Ext.Msg.YESNO,
                scope: this,
                fn: function(btn) {
                    if (btn === 'no') {
                        this.ajaxReq('gd_pengadaan/reset', form.getForm().getValues(), 3);
                    }
                }
            });
            return false;
        }
    },
    saveTrx: function(btn) {
        var form = this.getPengForm(),
                url = 'gd_pengadaan/save',
                params = form.getForm().getValues();

        if (form.getForm().isValid()) {
            this.ajaxReq(url, params, 1);
        }
    },
    insertItem: function(btn) {
        var form = this.getPengForm(),
                barang = form.down('#barang_id').getValue(),
                qty = form.down('#peng_qty').getValue(),
                url = 'gd_pengadaan/insert_item',
                params = form.getForm().getValues();

        if (barang === null) {
            Ext.MessageBox.alert('Warning', 'Pilih barang dahulu');
            return;
        }

        if (qty < 1) {
            Ext.MessageBox.alert('Warning', 'Jumlah barang minimal 1');
            return;
        }


        if (form.getForm().isValid()) {
            this.ajaxReq(url, params, 2);
        }
    },
    deletePeng: function(btn) {
        var form = this.getPengForm(),
                id = form.down('#id').getValue();

        if (id === 0) {
            Ext.MessageBox.alert('Warning', 'Pilih pengadaan yang akan di hapus.');
            return;
        }

        if (form.getForm().isValid()) {
            this.ajaxReq('gd_pengadaan/delete', form.getForm().getValues(), 1);
        }
    },
    deletePengItem: function(btn) {
        var grid = this.getPengDetailGrid(),
                sel = grid.getSelectionModel().getSelection();

        if (!sel.length) {
            Ext.MessageBox.alert('Warning', 'Pilih item  yang akan di hapus.');
            return;
        }

        if (sel[0]) {
            this.ajaxReq('gd_pengadaan/delete_item', {id: sel[0].get('id')}, 1);
        }
    },
    approvalCb: function(btn) {
        var grid = this.getPengGrid(),
                sel = grid.getSelectionModel().getSelection();

        if (!sel.length) {
            Ext.MessageBox.alert('Warning', 'Pilih item  yang akan di approve.');
            return;
        }

        var id = '';
        for (var i = 0; i < sel.length; i++) {
            id = id + sel[i].get('id') + '-';
        }

        this.ajaxReq('gd_pengadaan/approve_cabang', {id: id}, 1);
    },
    approvalPs: function(btn) {
        var grid = this.getPengGrid(),
                sel = grid.getSelectionModel().getSelection();

        if (!sel.length) {
            Ext.MessageBox.alert('Warning', 'Pilih item  yang akan di approve.');
            return;
        }

        var id = '';
        for (var i = 0; i < sel.length; i++) {
            id = id + sel[i].get('id') + '-';
        }

        this.ajaxReq('gd_pengadaan/approve_pusat', {id: id}, 1);
    },
    refreshGrid: function(btn) {
        var grid1 = this.getPengGrid(),
                grid2 = this.getPengDetailGrid();

        grid1.getSelectionModel().clearSelections();
        grid1.getStore().load();
        grid2.getStore().removeAll();
    },
    searchGrid: function(btn) {
        var panel = this.getPanelPeng(),
                tgl1 = panel.down('#pengTgl1').getValue(),
                tgl2 = panel.down('#pengTgl2').getValue(),
                cabang = panel.down('#pengCabang').getValue(),
                grid1 = this.getPengGrid(),
                store = grid1.getStore(),
                grid2 = this.getPengDetailGrid(),
                filterCollection = [];

        var statusFilter = new Ext.util.Filter({
            property: 'tgl_trx',
            value: Ext.Date.format(tgl1 === null ? new Date() : tgl1, 'Y-m-d 00:00:00') + 'GT'
        });
        filterCollection.push(statusFilter);

        var statusFilter = new Ext.util.Filter({
            property: 'tgl_trx',
            value: Ext.Date.format(tgl2 === null ? new Date() : tgl2, 'Y-m-d 23:59:59') + 'LT'
        });
        filterCollection.push(statusFilter);

        var statusFilter = new Ext.util.Filter({
            property: 'cabang_id',
            value: cabang
        });
        filterCollection.push(statusFilter);

        grid1.getSelectionModel().clearSelections();

        store.clearFilter(true);
        store.filter(filterCollection);
        store.sort('cabang_id', 'ASC');

        grid2.getStore().removeAll();
    },
    clearAllGrid: function(btn) {
        var panel = this.getPanelPeng(),
                tgl1 = panel.down('#pengTgl1').getValue(),
                tgl2 = panel.down('#pengTgl2').getValue(),
                grid1 = this.getPengGrid(),
                store = grid1.getStore(),
                grid2 = this.getPengDetailGrid(),
                filterCollection = [];

        var statusFilter = new Ext.util.Filter({
            property: 'tgl_trx',
            value: Ext.Date.format(tgl1 === null ? new Date() : tgl1, 'Y-m-d 00:00:00') + 'GT'
        });
        filterCollection.push(statusFilter);

        var statusFilter = new Ext.util.Filter({
            property: 'tgl_trx',
            value: Ext.Date.format(tgl2 === null ? new Date() : tgl2, 'Y-m-d 23:59:59') + 'LT'
        });
        filterCollection.push(statusFilter);

        grid1.getSelectionModel().clearSelections();

        store.clearFilter(true);
        store.filter(filterCollection);
        store.sort('cabang_id', 'ASC');

        grid2.getStore().removeAll();
    },
    onSuccess: function(resp, idForm) {
        var form = this.getPengForm(),
                grid1 = this.getPengGrid(),
                grid2 = this.getPengDetailGrid();

        if (idForm === 1) {
            form.getForm().reset();
            form.down('#pengNewItem').disable();
            form.saved = true;

            grid1.getSelectionModel().clearSelections();
            grid1.getStore().load();
            grid2.getStore().removeAll();
        } else if (idForm === 2) {
            var store = grid2.getStore();

            Ext.MessageBox.show({
                title: resp.title,
                msg: resp.msg,
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.INFO
            });

            form.getForm().reset();
            form.down('#pengNewItem').disable();
            form.saved = false;

            form.down('#id').setValue(resp.data.id);
            form.down('#no_pengadaan').setValue(resp.data.no_peng);

            store.clearFilter(true);
            store.filter('pengadaan_id', resp.data.id);
        } else {
            Ext.MessageBox.show({
                title: resp.title,
                msg: resp.msg,
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.INFO
            });

            form.getForm().reset();
            form.down('#pengNewItem').disable();
            form.saved = true;

            grid2.getStore().removeAll();
        }
    },
    onFailure: function(resp, idForm) {
        Ext.MessageBox.show({
            title: resp.title,
            msg: resp.msg,
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.ERROR
        });
    }
});

/* End of file Base.js */
/* Location: ./assets/js/app/controller/Base.js */