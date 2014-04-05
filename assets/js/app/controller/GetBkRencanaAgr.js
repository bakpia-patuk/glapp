/**
 * @author Isht Ae, Coepoe
 **/

Ext.define('GlApp.controller.GetBkRencanaAgr', {
    extend: 'GlApp.controller.Base',
    models: [
    ],
    stores: [
        'bkrencanaagr.MaStoreTree',
        'bkrencanaagr.MaNonStoreTree',
        'bkrencanaagr.CabangStore',
        'bkrencanaagr.SupplierStore',
        'bkrencanaagr.GrkBkStore'
    ],
    views: [
        'bkrencanaagr.GetBkRencanaAgr',
        'bkrencanaagr.BkRencanaAgrForm',
        'bkrencanaagr.BkRencanaAgrGrid',
        'bkrencanaagr.BkRencanaAgrNonGrid',
        'bkrencanaagr.BkGroupKpWin',
        'bkrencanaagr.BkListAkunWin'
    ],
    refs: [
        {ref: 'BkRencanaAgrTab', selector: '#bkrencanaagrtab'},
        {ref: 'BkRencanaAgrForm', selector: '#bkrencanaagrform'},
        {ref: 'BkRencanaAgrGrid', selector: '#bkrencanaagrgrid'},
        {ref: 'BkRencanaAgrNonGrid', selector: '#bkrencanaagrnongrid'},
    ],
    init: function() {
        this.control({
            '#BkRaSave':{
                click: function(){
                    var form = this.getBkRencanaAgrForm().getForm(), 
                            store;
                    
                    if (this.getBkRencanaAgrGrid()) {
                        store = this.getBkRencanaAgrGrid().store;
                    } else {
                        store = this.getBkRencanaAgrNonGrid().store;
                    }

                    Ext.Ajax.request({
                        url: BASE_PATH + 'bk_rencanaagr/add_rencanaanggaran',
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

                                form.findField('tglDari').setValue(resp.data.tgl_dari);
                                form.findField('tglSampai').setValue(resp.data.tgl_ke);
                                form.findField('divisi').setValue(parseInt(resp.data.divisi));

                                form.findField('bg_no').hide();
                                form.findField('rek_no').hide();
                                form.findField('bg_ed').hide();

                                form.findField('mkr_pemeriksaan').disable();
                                form.findField('mkr_pemeriksaan').hide();

                                form.findField('mkr_namapasien').disable();
                                form.findField('mkr_namapasien').hide();

                                form.findField('mkr_rujukanke').disable();
                                form.findField('mkr_rujukanke').hide();

                                //store.removeAll();
                                store.setRootNode({idCabang: '0'});
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
            '#BkRaNew':{
                click: function(){
                    var form = this.getBkRencanaAgrForm().getForm();
//
                    form.reset();
                    form.findField('namaSup').setReadOnly(false);
                    form.findField('trx_fakturno').setReadOnly(false);
                    form.findField('divisi').setReadOnly(false);
                    form.findField('cara_bayar').setReadOnly(false);
                    form.findField('bg_no').hide();
                    form.findField('rek_no').hide();
                    form.findField('bg_ed').hide();
                }
            },
            '#BkRaDelete':{
                click: function(){
                    var form = this.getBkRencanaAgrForm(),
                        grid = this.getBkRencanaAgrNonGrid();
            //            store = this.getBkRencanaAgrDetailGrid().getStore();

                    if (form.getForm().findField('id').getValue() === "") {
                        Ext.Msg.alert('Info', 'Pilih Anggaran Non Supplier yang akan di hapus');
                        return;
                    }

                    if (form.getForm().findField('app_status').getValue() === "1") {
                        Ext.Msg.alert('Info', 'Anda tidak bisa menghapus anggaran yang sudah di Approve');
                        return;
                    }

                    Ext.Ajax.request({
                        url: BASE_PATH + 'bk_rencanaagr/delete_rencanaagr',
                        method: 'POST',
                        params: form.getValues(),
                        scope: this,
                        callback: function(options, success, response) {
                            var resp = Ext.decode(response.responseText);

                            if (resp.success === 'true') {
                                form.getForm().reset();
                                grid.store.setRootNode({idCabang: parseInt(CABANG_ID)});
                            }
                        }
                    });
                }
            },
            '#bkrencanaagrnongrid':{
                itemclick: function(){
                    var tree = this.getBkRencanaAgrNonGrid(),
                            sel = tree.getSelectionModel().getSelection();

                    var form = this.getBkRencanaAgrForm().getForm(),
                            rec = sel[0];

            //        if (sel) {
            //            form.loadRecord(rec);
                    form.findField('id').setValue(rec.get('cabang_city'));
                    form.findField('app_status').setValue(rec.get('list_tt'));
            //            form.findField('trx_fakturno').setReadOnly(true);
            //            if (rec.get('jenisSup') === 1) {
            //                form.findField('divisi').setValue(rec.get('idSup'));
            //                form.findField('divisi').setReadOnly(true);
            //
            //                form.findField('caraBayar').setReadOnly(true);
            //                form.findField('caraBayar').setValue(rec.get('caraBayar'));
            //                if (rec.get('caraBayar') === 1) {
            //                    form.findField('rekNo').setValue(rec.get('noDoc'));
            //                } else if (rec.get('caraBayar') === 2) {
            //                    form.findField('bgNo').setValue(rec.get('noDoc'));
            //                    form.findField('bgEd').setValue(rec.get('bgEd'));
            //                }
            //
            //            }
            //        }
                }
            },
            '#setAkunGk': {
                click: function(){
                    var win = Ext.widget('bkrencanaagr.bklistakunwin');
                }
            }
        });
    }
});

/* End of file SystemMenu.js */
/* Location: ./assets/js/app/controller/SystemMenu.js */