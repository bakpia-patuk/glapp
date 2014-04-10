/**
 * @author Isht Ae
 **/

Ext.define('GlApp.controller.GetKsKeluar', {
    extend: 'GlApp.controller.Base',
    models: [
    ],
    stores: [
        'kskeluar.TrxKasStore',
        'kskeluar.FakturStore',
        'kskeluar.MintaKasRujukanStore',
        'kskeluar.MintaKasStore',
        'kskeluar.CabangStore',
        'kskeluar.MasterSupplierStore'
    ],
    views: [
        'kskeluar.GetKsKeluar',
        'kskeluar.KsKeluarForm',
        'kskeluar.KsKeluarGrid',
        'kskeluar.DataRujukanGrid',
        'kskeluar.ListMintaBayar',
        'kskeluar.ListFaktur',
        'kskeluar.KkSignWin'
    ],
    refs: [
        {ref: 'KsKeluarForm', selector: '#kskeluarform'},
        {ref: 'KsKeluarGrid', selector: '#kskeluargrid'},
        {ref: 'KsKeluarTab', selector: '#kskeluartab'},
        // panel button kas keluar grid
        {ref: 'StartKk', selector: '#datestarkk'},
        {ref: 'EndKk', selector: '#dateendkk'},
        {ref: 'CabangKk', selector: '#cabangkk'},
        // panel button data rujukan grid
        {ref: 'StartDr', selector: '#datestartdr'},
        {ref: 'EndDr', selector: '#dateenddr'},
        {ref: 'PeriksaDr', selector: '#drperiksa'},
        //daftar Grid selain KK
        {ref: 'ListFaktur', selector: '#listfaktur'},
        {ref: 'ListMintaBayar', selector: '#listmintabayar'},
        {ref: 'DataRujukanGrid', selector: '#datarujukangrid'}
    ],
    init: function() {
        this.control({
            '#kskeluarform': {
                afterrender: function() {
                    this.initKey(this.getKsKeluarForm(), '#random_string');
                }
            },
            '#kskeluartab': {
                beforetabchange: function(tabPanelThis, componentNew, componentCurrent) {
                    var bReturn = true;
                    var form = this.getKsKeluarForm();
                    if (form.saved === false) {
                        bReturn = confirm('Anda sedang melakukan transaksi. Pindah tab?');
                    }
                    return bReturn;
                },
                tabchange: function(tabPanel, tab) {
                    var id = tab.itemId;
                    var faktur = 'listfaktur',
                            mintabayar = 'listmintabayar',
                            kk = 'kskeluargrid',
                            rujukan = 'datarujukangrid';

                    switch (id) {
                        case faktur:
                            this.loadFormFaktur(id);
                            break;
                        case mintabayar:
                            this.loadFormPermintaan(id);
                            break;
                        case kk:
                            this.disableFormKk(id);
                            break;
                        case rujukan:
                            this.loadFormRujukan(id);
                            break;
                        default:
                            console.log('tab lain');
                            break;
                    }
                }
            },
            '#KasKeluarNew': {
                click: function() {
                    this.ajaxReq('ks_keluar/reset', this.getKsKeluarForm().getForm().getValues(), 1);
                }
            },
            '#KasKeluarSave': {
                click: function() {
                    this.saveKk();
                }
            },
            '#KasKeluarSavePrint': {
                click: function() {
                    this.savePrintKk();
                }
            },
            '#fakturCheck': {
                checkchange: function(cl, rI, checked) {
                    var grid = this.getListFaktur(),
                            form = this.getKsKeluarForm(),
                            data = grid.getStore().getAt(rI);
                    var idfk = data.get('id'),
                            total = data.get('faktur_nototal'),
                            supplier = data.get('faktur_suppid');

                    var idfield = form.down('#faktur_id'),
                            totalfield = form.down('#faktur_nototal'),
                            suppform = form.down('#faktur_suppid');
                    if (checked) {
                        suppform.setValue(parseInt(supplier));
                        idfield.setValue(idfield.getValue() + idfk + ';');
                        totalfield.setValue(totalfield.getValue() + total);
                        form.getForm().findField('kk_type').setValue(1);
                        form.saved = false;
                    } else {
                        idfield.setValue(idfield.getValue().replace(idfk + ';', ''));
                        totalfield.setValue(totalfield.getValue() - total);
                        if (idfield.getValue() === "") {
                            form.saved = true;
                        }
                    }
                }
            },
            '#listmintabayar': {
                selectionchange: function(model, records) {
                    var form = this.getKsKeluarForm().getForm();

                    if (records[0]) {
                        form.findField('ma_id').setValue(records[0].get('id'));
                        form.findField('divisi_name').setValue(records[0].get('divisi_name'));
                        form.findField('kas_jumlah').setValue(records[0].get('trx_value'));
                        form.findField('trx_desc').setValue(records[0].get('trx_desc'));
                    }
                }
            },
            '#datarujukangrid': {
                selectionchange: function(model, records) {
                    var form = this.getKsKeluarForm().getForm();

                    if (records[0]) {
                        form.findField('ma_id').setValue(records[0].get('id'));
                        form.findField('divisi_name').setValue(records[0].get('divisi_name'));
                        form.findField('kas_jumlah').setValue(records[0].get('trx_value'));

                        form.findField('agrplan_periksa').setValue(records[0].get('mkr_pemeriksaan'));
                        form.findField('agrplan_pasien').setValue(records[0].get('mkr_namapasien'));
                        form.findField('agrplan_rujuk').setValue(records[0].get('mkr_rujukanke'));
                    }
                }
            },
            '#kkSignSave': {
                click: function(btn) {
                    var form = this.getKsKeluarForm(),
                            id = form.down('#random_string').getValue();

                    form.down('#imageTtdKk1').setSrc('assets/ttd_tx/kkSign' + id + 'NULL.png');
                    btn.up('window').close();
                }
            }
        });
    },
    loadFormFaktur: function(id) {
        var form = this.getKsKeluarForm();
        form.body.unmask();
        form.saved = true;
        this.ajaxReq('ks_keluar/reset', form.getForm().getValues(), 1);
        form.getForm().reset();
        this.initKey(form, '#random_string');

        form.down('#KasKeluarNew').enable();
        form.down('#KasKeluarSave').enable();
        form.down('#KasKeluarSavePrint').enable();
        form.down('#KasKeluarDelete').enable();

        form.getForm().findField('faktur_suppid').show();
        form.getForm().findField('faktur_nototal').show();
        form.getForm().findField('jumlahSupLebihBayar').show();

        form.getForm().findField('divisi_name').hide();
        form.getForm().findField('trx_desc').hide();
        form.getForm().findField('kas_akun').hide();
        form.getForm().findField('kas_akun').disable();
        form.getForm().findField('agrplan_periksa').hide();
        form.getForm().findField('agrplan_pasien').hide();
        form.getForm().findField('agrplan_rujuk').hide();

        form.getForm().findField('kk_type').setValue(1);

        var grid = this.getListFaktur(),
                store = grid.getStore();

        store.removeAll();
        grid.down('#fkSupplier').reset();
    },
    loadFormPermintaan: function(id) {
        var form = this.getKsKeluarForm();
        form.body.unmask();
        form.saved = true;
        this.ajaxReq('ks_keluar/reset', form.getForm().getValues(), 1);
        form.getForm().reset();
        this.initKey(form, '#random_string');

        form.down('#KasKeluarNew').enable();
        form.down('#KasKeluarSave').enable();
        form.down('#KasKeluarSavePrint').enable();
        form.down('#KasKeluarDelete').enable();

        form.getForm().findField('faktur_suppid').hide();
        form.getForm().findField('faktur_nototal').hide();
        form.getForm().findField('jumlahSupLebihBayar').hide();

        form.getForm().findField('agrplan_periksa').hide();
        form.getForm().findField('agrplan_pasien').hide();
        form.getForm().findField('agrplan_rujuk').hide();

        form.getForm().findField('divisi_name').show();
        form.getForm().findField('trx_desc').show();
        form.getForm().findField('kas_akun').show();
        form.getForm().findField('kas_akun').enable();

        form.getForm().findField('kk_type').setValue(2);

        var grid = this.getListMintaBayar(),
                store = grid.getStore();

        store.load();
    },
    disableFormKk: function(id) {
        var form = this.getKsKeluarForm();
        form.body.mask();
        form.saved = true;
        this.ajaxReq('ks_keluar/reset', form.getForm().getValues(), 1);
        form.getForm().reset();
        this.initKey(form, '#random_string');

        form.down('#KasKeluarNew').disable();
        form.down('#KasKeluarSave').disable();
        form.down('#KasKeluarSavePrint').disable();
        form.down('#KasKeluarDelete').disable();

        var grid = this.getKsKeluarGrid(),
                store = grid.getStore();

        store.load();
    },
    loadFormRujukan: function(id) {
        var form = this.getKsKeluarForm();
        form.body.unmask();
        form.saved = true;
        this.ajaxReq('ks_keluar/reset', form.getForm().getValues(), 1);
        form.getForm().reset();
        this.initKey(form, '#random_string');

        form.down('#KasKeluarNew').enable();
        form.down('#KasKeluarSave').enable();
        form.down('#KasKeluarSavePrint').enable();
        form.down('#KasKeluarDelete').enable();

        form.getForm().findField('faktur_suppid').hide();
        form.getForm().findField('faktur_nototal').hide();
        form.getForm().findField('jumlahSupLebihBayar').hide();
        form.getForm().findField('trx_desc').hide();

        form.getForm().findField('agrplan_periksa').show();
        form.getForm().findField('agrplan_pasien').show();
        form.getForm().findField('agrplan_rujuk').show();

        form.getForm().findField('divisi_name').show();
        form.getForm().findField('kas_akun').show();
        form.getForm().findField('kas_akun').enable();

        form.getForm().findField('kk_type').setValue(3);

        var grid = this.getDataRujukanGrid(),
                store = grid.getStore();

        store.load();
    },
    saveKk: function(button, e, options) {
        var form = this.getKsKeluarForm().getForm();

        if (form.isValid()) {
            this.ajaxReq('ks_keluar/add_kaskeluar', form.getValues(), 2);
        }
    },
    // untuk save print belum bisa
    savePrintKk: function(button, e, options) {
        var form = this.getKsKeluarForm().getForm();

        if (form.isValid()) {
            this.ajaxReq('ks_keluar/add_kaskeluar', form.getValues(), 3);
        }
    },
    onSuccess: function(resp, idForm) {
        var form = this.getKsKeluarForm(),
                tabs = this.getKsKeluarTab();

        form.getForm().reset();
        form.saved = true;
        if (idForm === 2) {
            tabs.setActiveTab(2);
        }
        if (idForm === 3) {
            tabs.setActiveTab(2);
            this.printBkk(resp.data);
        }
    },
    onFailure: function(resp, idForm) {
        Ext.MessageBox.show({
            title: resp.title,
            msg: resp.msg,
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.ERROR
        });
    },
    printBkk: function(id) {
        window.open(BASE_PATH + 'ks_keluar/print_bkk/' + id, "Print Preview", "height=" + screen.height + ",width=950,modal=yes,alwaysRaised=yes,scrollbars=yes");
    }
});

/* End of file SystemMenu.js */
/* Location: ./assets/js/app/controller/SystemMenu.js */