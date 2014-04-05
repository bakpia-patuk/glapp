/**
 * @author Isht Ae, Coepoe
 **/

Ext.define('GlApp.controller.GetBkAnggaran', {
    extend: 'GlApp.controller.Base',
    models: [
    ],
    stores: [
        'bkanggaran.DaStoreTree',
        'bkanggaran.CabangStore',
        'bkanggaran.DaNonStoreTree',
        'bkanggaran.CabangNonStore',
        'bkanggaran.AgrSuppStore',
        'bkanggaran.BankPusatStore',
        'bkanggaran.BankDebetDariStore'
    ],
    views: [
        'bkanggaran.GetBkAnggaran',
        'bkanggaran.BkAnggaranForm',
        'bkanggaran.BkAnggaranGrid',
        'bkanggaran.BkAnggaranNonGrid',
        'bkanggaran.BkAnggaranDetailGrid',
//        'anggaran.newWindow',
//        'anggaran.app2Form',
//        'anggaran.akunWindow',
//        'anggaran.listAkun',
//        'anggaran.detailbayarGrid',
        'bkanggaran.BkAnggaran1Grid',
        'bkanggaran.SupplierPanel'
    ],
    refs: [
        {ref: 'BkAnggaranForm', selector: '#bkanggaranform'},
        {ref: 'BkAnggaranGrid', selector: '#bkanggarangrid'},
        {ref: 'BkAnggaranNonGrid', selector: '#bkanggarannongrid'},
        {ref: 'BkAnggaran1Grid', selector: '#bkanggaran1grid'},
//        {ref: 'tabAnggaran', selector: '#anggaranTab'},
        {ref: 'BkAnggaranDetailGrid', selector: '#bkanggarandetailgrid'}
    ],
    init: function() {
        this.control({
            '#bkanggarangrid':{
                selectionchange: function(model, records) {
                    var grid = this.getBkAnggaranGrid(),
                        btnListFkt = grid.down('#ListFakturBgAgr');

                    if (records[0]) {
                        var jenis = records[0].get('jenisBayar');
                        if (jenis == 1000) {
                            btnListFkt.enable();
                        } else {
                            btnListFkt.disable();
                        }
                    }
                },
                checkchange : function(rec, checked, eOpt) {
                    var form = this.getBkAnggaranForm().getForm(),
                        grid = this.getBkAnggaranGrid(),
                        jenisField = form.findField('trx_jenisbayar'),
                        suppField = form.findField('trx_supp_id'),
                        fakturField = form.findField('trx_agrdata'),
                        jenisBayar = rec.get('jenisBayar'),
                        suppId = rec.get('suppId'),
                        fakturNo =  rec.get('faktur_no'),
                        sm = grid.getSelectionModel(),
                        node;
                
                        if (sm.hasSelection()) {
                            node = sm.getSelection()[0];
                        }
                        
                        if(checked) {
                            if(jenisField.getValue() == "" || jenisField.getValue() == jenisBayar) {
                                jenisField.setValue(jenisBayar);
                            } else {
                                Ext.Msg.alert('Warning', 'Tipe Pembayaran harus sama');
                                rec.set('checked',!rec.get('checked'));
                                return false;
                            }
                            if(suppField.getValue() == "" || suppField.getValue() == suppId) {
                                suppField.setValue(suppId);
                            } else {
                                Ext.Msg.alert('Warning', 'Supplier harus sama');
                                rec.set('checked',!rec.get('checked'));
                                return false;
                            }
                            
                            form.findField('supplier').setValue(node.get('displayName'));
                            form.findField('trx_totalagr').setValue(form.findField('trx_totalagr').getValue() + node.get('faktur_nominal'));
                            fakturField.setValue(fakturField.getValue() + fakturNo + ';');
                            
                            if(jenisBayar == 1000 || jenisBayar == 1001) {
                                form.findField('trx_kreditketype').setValue(0);
                                form.findField('trx_kreditketype').hide();
                                form.findField('rek_pusat').hide();
                                form.findField('bank_debet_ke').show();
                            } else {
                                form.findField('trx_kreditketype').clearValue();
                                form.findField('trx_kreditketype').show();
                                form.findField('rek_supp').hide();
                                form.findField('bank_debet_ke').hide();
                            }
                        } else {
                            var jumlah = grid.getChecked().length;
                            
                            if(jumlah < 1) {
                                jenisField.setValue("");
                                suppField.setValue("");
                                form.findField('supplier').setValue("");
                            }

                            fakturField.setValue(fakturField.getValue().replace(fakturNo + ";",""));
                            form.findField('trx_totalagr').setValue(form.findField('trx_totalagr').getValue() - node.get('faktur_nominal'));
                        }
                }
            },
            '#bkanggarannongrid':{
                checkchange : function(rec, checked, eOpt) {
                    var form = this.getBkAnggaranForm().getForm(),
                        grid = this.getBkAnggaranNonGrid(),
                        jenisField = form.findField('trx_jenisbayar'),
                        suppField = form.findField('trx_supp_id'),
                        fakturField = form.findField('trx_agrdata'),
                        jenisBayar = rec.get('jenisBayar'),
                        suppId = rec.get('suppId'),
                        fakturNo =  rec.get('kodeCabang'),
                        sm = grid.getSelectionModel(),
                        node;
                
                    if (sm.hasSelection()) {
                        node = sm.getSelection()[0];
                    }

                    if(checked) {
                        if(jenisField.getValue() == "" || jenisField.getValue() == jenisBayar) {
                            jenisField.setValue(jenisBayar);
                        } else {
                            Ext.Msg.alert('Warning', 'Tipe Pembayaran harus sama');
                            rec.set('checked',!rec.get('checked'));
                            return false;
                        }
                        if(suppField.getValue() == "" || suppField.getValue() == suppId) {
                            suppField.setValue(suppId);
                        } else {
                            Ext.Msg.alert('Warning', 'Divisi harus sama');
                            rec.set('checked',!rec.get('checked'));
                            return false;
                        }

                        form.findField('divisi').setValue(node.get('suppId'));
                        form.findField('trx_totalagr').setValue(form.findField('trx_totalagr').getValue() + node.get('faktur_nominal'));
                        fakturField.setValue(fakturField.getValue() + fakturNo + ';');

                        form.findField('trx_kreditketype').setValue(0);
                        form.findField('trx_kreditketype').hide();
                        form.findField('rek_pusat').hide();
                        form.findField('bank_debet_ke').show();
                    } else {
                        var jumlah = grid.getChecked().length;

                        if(jumlah < 1) {
                            jenisField.setValue("");
                            suppField.setValue("");
                            form.findField('supplier').setValue("");
                        }

                        fakturField.setValue(fakturField.getValue().replace(fakturNo + ";",""));
                        form.findField('trx_totalagr').setValue(form.findField('trx_totalagr').getValue() - node.get('faktur_nominal'));
                    }
                }
            },
            '#bkanggaran1grid':{
                afterrender: function() {
                    var store = this.getBkAnggaran1Grid().getStore();
                    
                    store.load();
                    store.group('displayName');
                },
                beforeselect: function (record, index, eOpts) {
                    var form = this.getBkAnggaranForm().getForm(),
                        suppField = form.findField('trx_supp_id'),
                        suppId = index.get('suppId');
                
                    if(suppField.getValue() == "" || suppField.getValue() == suppId) {
                        suppField.setValue(suppId);
                    } else {
                        Ext.Msg.alert('Info', 'Anda harus memilih data satu Supplier');
                        return false;
                    }
                },
                select: function (record, index, eOpts) {
                    var form = this.getBkAnggaranForm().getForm(),
                        jenisField = form.findField('trx_jenisbayar'),
                        fakturField = form.findField('trx_agrdata'),
                        suppField = form.findField('supplier'),
                        nominalField = form.findField('trx_totalagr'),
                        jenisBayar = index.get('jenisBayar'),
                        fakturNo =  index.get('faktur_no'),
                        fakturNominal =  index.get('faktur_nominal');
                
                    jenisField.setValue(jenisBayar);
                    suppField.setValue(index.get('displayName'));
                    fakturField.setValue(fakturField.getValue() + fakturNo + ';');
                    nominalField.setValue(nominalField.getValue() + fakturNominal);
                },
                deselect: function (record, index, eOpts) {
                    var form = this.getBkAnggaranForm().getForm(),
                        suppField = form.findField('trx_supp_id'),
                        suppNameField = form.findField('supplier'),
                        jenisField = form.findField('trx_jenisbayar'),
                        fakturField = form.findField('trx_agrdata'),
                        grid = this.getBkAnggaran1Grid(),
                        sel = grid.getSelectionModel().getSelection(),
                        nominalField = form.findField('trx_totalagr'),
                        fakturNo =  index.get('faktur_no'),
                        fakturNominal =  index.get('faktur_nominal');

                    fakturField.setValue(fakturField.getValue().replace(fakturNo + ';', ""));
                    nominalField.setValue(nominalField.getValue() - fakturNominal);
                    
                    if(!sel.length){
                        jenisField.setValue("");
                        suppField.setValue("");
                        suppNameField.setValue("");
                    }
                }
            },
            '#filterAnggaran': {
                change: function(cmb, rec, opt){
                    var title = cmb.getRawValue(),
                            form = this.getBkAnggaranForm();

                    form.down('#rekapAnggaran').setTitle('<strong>Total Anggaran Cabang ' + title + '</strong>');
                }
            },
            '#anggaranTab': {
                tabchange: function(tabPanel, tab) {
                    var id = tab.itemId,
                        form = this.getBkAnggaranForm().getForm();
                    var anggaran = 'bkanggarangrid',
                        anggaranNon = 'bkanggarannongrid',
                        anggaranSupp = 'bkanggaran1grid';

                    if (id == anggaran) {
                        form.findField('supplier').show();
                        form.findField('divisi').hide();

                        form.findField('trx_totalagr').setFieldLabel('Total Nom. Faktur ');
                        form.findField('trx_tgldebet').show();
                        form.findField('trx_kreditketype').show();
                        form.findField('trx_kreditketype').clearValue();
                        form.findField('bank_debet_dari').show();
                        form.findField('bank_debet_dari').clearValue();
                        form.findField('bank_debet_ke').hide();

                        form.findField('rek_pusat').hide();
                        form.findField('rek_supp').hide();

                        form.findField('tglTransfer').hide();
                        form.findField('bankTrfAsal').hide();

                        this.getBkAnggaranForm().down('#rekapAnggaran').show();
                    } else if (id == anggaranNon) {
                        form.findField('supplier').hide();
                        form.findField('supplier').setValue('');
                        form.findField('divisi').show();

                        form.findField('trx_totalagr').setFieldLabel('Total Nominal ');
                        form.findField('trx_tgldebet').show();
                        form.findField('bank_debet_dari').show();
                        form.findField('bank_debet_dari').clearValue();

                        form.findField('trx_kreditketype').setValue(0);
                        form.findField('trx_kreditketype').hide();
                        form.findField('bank_debet_ke').show();

                        form.findField('rek_pusat').hide();
                        form.findField('rek_supp').hide();

                        form.findField('tglTransfer').hide();
                        form.findField('bankTrfAsal').hide();

                        this.getBkAnggaranForm().down('#rekapAnggaran').show();
                    } else {
                        form.findField('supplier').show();
                        form.findField('divisi').hide();

                        form.findField('trx_totalagr').setFieldLabel('Total Nom. Faktur ');
                        form.findField('trx_tgldebet').hide();
                        form.findField('trx_kreditketype').hide();
                        form.findField('bank_debet_dari').hide();
                        form.findField('bank_debet_ke').hide();

                        form.findField('rek_pusat').hide();
                        form.findField('rek_supp').hide();

                        form.findField('tglTransfer').show();
                        form.findField('bankTrfAsal').show();
                        form.findField('bankTrfAsal').clearValue();

                        this.getBkAnggaranForm().down('#rekapAnggaran').hide();
                    }
                }
            },
        });
    },
});

/* End of file SystemMenu.js */
/* Location: ./assets/js/app/controller/SystemMenu.js */