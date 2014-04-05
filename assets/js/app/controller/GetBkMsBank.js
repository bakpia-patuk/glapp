/**
 * @author Isht Ae
 **/

Ext.define('GlApp.controller.GetBkMsBank', {
    extend: 'GlApp.controller.Base',
    models: [
    ],
    stores: [
        'bkmsbank.CabangStore',
        'bkmsbank.CabangGridStore',
        'bkmsbank.BankStore',
        'bkmsbank.BankNasStore'
    ],
    views: [
        'bkmsbank.GetBkMsBank',
        'bkmsbank.BkMsBankForm',
        'bkmsbank.BkMsBankGrid'
    ],
    refs: [
        {ref: 'BkMsBankForm', selector: '#bkmsbankform'},
        {ref: 'BkMsBankGrid', selector: '#bkmsbankgrid'}
//        {ref: 'inputCabang', selector: '#filterCabang'}
    ],
    init: function() {
        this.control({
            '#bkmsbankgrid': {
                afterrender: function(){
                    var store = this.getBkMsBankGrid().getStore();

                    if (CABANG_ID !== "1") {
                        store.clearFilter(true);
                        store.filter('bank_cabang', CABANG_ID);
                    }
                }
            },
            '#MsBankSave':{
                click: function(){
                    var form = this.getBkMsBankForm().getForm(),
                            idmb = form.findField('id').getValue(),
                            store = this.getBkMsBankGrid().getStore();

                    if (idmb !== "" && CABANG_ID !== '1') {
                        Ext.MessageBox.show({
                            title: 'Error',
                            msg: 'Anda Tidak Bisa Merubah data',
                            buttons: Ext.MessageBox.OK,
                            icon: Ext.MessageBox.ERROR
                        });
                    } else {
                        Ext.Ajax.request({
                            url: BASE_PATH + 'bk_msbank/add_msbank',
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
                                    if (CABANG_ID !== '1') {
                                        form.findField('bank_cabang').setValue(parseInt(CABANG_ID));
                                    }
                                    form.reset();
                                    if (CABANG_ID !== '1') {
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
            '#MsBankNew':{
                click: function(){
                    var form = this.getBkMsBankForm().getForm(),
                            grid = this.getBkMsBankGrid();
                    form.reset();
                    if (CABANG_ID !== '1') {
                        grid.getStore().load();
                    }
                }
            },
            '#MsBankDelete':{
                click: function(){
                    var form = this.getBkMsBankForm().getForm(),
                            grid = this.getBkMsBankGrid(),
                            sm = grid.getSelectionModel(),
                            sel = sm.getSelection();

                    if (!sel.length) {
                        Ext.Msg.alert('Warning', 'Pilih Data yang Akan di hapus');
                        return;
                    }

                    Ext.Ajax.request({
                        url: BASE_PATH + 'bk_msbank/delete_msbank',
                        method: 'POST',
                        params: form.getValues(),
                        scope: this,
                        callback: function(options, success, response) {
                            var resp = Ext.decode(response.responseText);

                            if (resp.success === 'true') {
                                form.reset();
                                if (CABANG_ID !== '1') {
                                    form.findField('bank_cabang').setValue(parseInt(CABANG_ID));
                                }
                                sm.clearSelections();
                                grid.getStore().load();
                            }
                        }
                    });
                }
            }
        });
    },
    gridLoad: function() {
        
    },
});

/* End of file SystemMenu.js */
/* Location: ./assets/js/app/controller/SystemMenu.js */