/**
 * @author Isht Ae
 **/

Ext.define('GlApp.controller.GetGdTxPengadaan', {
    extend: 'GlApp.controller.Base',
    models: [
    ],
    stores: [
        'gdtxpengadaan.BarangStore'
    ],
    views: [
        'gdtxpengadaan.GetGdTxPengadaan',
        'gdtxpengadaan.TxPengadaanForm',
        'gdtxpengadaan.TxPengadaanGrid',
        'gdtxpengadaan.TxPengadaanGridDt'
    ],
    refs: [
        {ref: 'PanelPeng', selector: '#getgdtxpengadaan'},
        {ref: 'PengForm', selector: '#txpengadaanform'},
        {ref: 'PengGrid', selector: '#txpengadaangrid'},
        {ref: 'PengDetailGrid', selector: '#txpengadaangriddt'}
    ],
    init: function() {
        this.listen({
            controller: {
            },
            component: {
                '#pengNew': {
                    click: this.resetForm
                },
                '#pengSave': {
                    click: this.saveTrx
                },
                '#getgdtxpengadaan button[action=pengDelete]': {
                    click: this.deletePeng
                },
                '#pengNewItem': {
                    click: this.insertItem
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
            form.getForm().reset();
            form.down('#pengNewItem').disable();
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
    },
    onSuccess: function(resp, idForm) {
        var form = this.getPengForm(),
                grid1 = this.getPengGrid(),
                grid2 = this.getPengDetailGrid();

        Ext.MessageBox.show({
            title: resp.title,
            msg: resp.msg,
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.INFO
        });

        if (idForm === 1) {
            form.getForm().reset();
            form.down('#pengNewItem').disable();
            form.saved = true;

            grid1.getSelectionModel().clearSelections();
            grid1.getStore().load();
            grid2.getStore().removeAll();
        } else if(idForm === 2){
            form.getForm().reset();
            form.down('#pengNewItem').disable();
            form.saved = false;
            
            form.down('#id').setValue(resp.data.id);
            form.down('#no_pengadaan').setValue(resp.data.no_peng);
        } else {
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