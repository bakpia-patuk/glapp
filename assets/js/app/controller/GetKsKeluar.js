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
//        //daftar Grid selain KK
        {ref: 'ListFaktur', selector: '#listfaktur'},
        {ref: 'ListMintaBayar', selector: '#listmintabayar'},
        {ref: 'DataRujukanGrid', selector: '#datarujukangrid'},
        //panel
        {ref: 'TesPanel1', selector: '#tespanel1'},
        {ref: 'TesPanel2', selector: '#tespanel2'},
        {ref: 'TesPanel3', selector: '#tespanel3'},
        {ref: 'TesPanel4', selector: '#tespanel4'},
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
//                    // add back to ignore activeTab call
//                    //if (null != componentCurrent)  { 
//                    //}
                    var form = this.getKsKeluarForm();
                    if (form.saved === false) {
                        bReturn = confirm('Anda sedang melakukan transaksi. Pindah tab?');
//                        Ext.Msg.show({
//                            title: 'Konfirmasi',
//                            msg: 'Anda sedang melakukan transaksi. Lanjutakan transaksi ?',
//                            buttons: Ext.Msg.YESNO,
//                            scope: this,
//                            fn: function(btn) {
//                                bReturn = btn;
//                            }
//                        });

                    }
                    return bReturn;
                },
                tabchange: function(tabPanel, tab) {
                    var id = tab.itemId;
                    var faktur = 'listfaktur',
                            mintabayar = 'tespanel2',
                            kk = 'tespanel3',
                            rujukan = 'tespanel4';

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
            '#listmintabayar': {
                selectionchange: function(model, records) {
                    var form = this.getKsKeluarForm().getForm();

                    if (records[0]) {
                        form.findField('idMintaBayar').setValue(records[0].get('id'));
                        form.findField('nama_divisi').setValue(records[0].get('nama_divisi'));
                        form.findField('trx_value').setValue(records[0].get('trx_value'));
                        form.findField('trx_desc').setValue(records[0].get('trx_desc'));
                    }
                }
            },
            '#datarujukangrid': {
                selectionchange: function(model, records) {
                    var form = this.getKsKeluarForm().getForm();

                    if (records[0]) {
                        form.findField('idMintaBayar').setValue(records[0].get('id'));
                        form.findField('nama_divisi').setValue(records[0].get('nama_divisi'));
                        form.findField('trx_value').setValue(records[0].get('trx_value'));

                        form.findField('mkr_pemeriksaan').setValue(records[0].get('mkr_pemeriksaan'));
                        form.findField('mkr_namapasien').setValue(records[0].get('mkr_namapasien'));
                        form.findField('mkr_rujukanke').setValue(records[0].get('mkr_rujukanke'));
                    }
                }
            },
            '#KasKeluarSearch': {
                click: function() {
                    var grid = this.getKsKeluarGrid(),
                            store = grid.getStore(),
                            filterCollection = [],
                            date1 = this.getStartKk().getValue(),
                            date2 = this.getEndKk().getValue(),
                            cabang = this.getCabangKk().getValue();

                    if (cabang === null && date1 === null && date2 === null) {
                        Ext.Msg.alert('Perhatian', 'Mohon isi salah satu filter.');
                        return;
                    } else {
                        var statusFilter = new Ext.util.Filter({
                            property: 'kas_type',
                            value: 'kaskeluar'
                        });
                        filterCollection.push(statusFilter);

                        if (cabang !== null && date1 === null && date2 === null) {
                            var statusFilter = new Ext.util.Filter({
                                property: 'cabang_id',
                                value: cabang
                            });
                            filterCollection.push(statusFilter);

                            store.clearFilter(true);
                            store.filter(filterCollection);
                        } else if (cabang === null && date1 !== null && date2 === null) {
                            var statusFilter = new Ext.util.Filter({
                                property: 'kas_tgltrx',
                                value: Ext.Date.format(date1, 'Y-m-d 00:00:00') + 'GT'
                            });
                            filterCollection.push(statusFilter);

                            store.clearFilter(true);
                            store.filter(filterCollection);
                        } else if (cabang === null && date1 === null && date2 !== null) {
                            var statusFilter = new Ext.util.Filter({
                                property: 'kas_tgltrx',
                                value: Ext.Date.format(date2, 'Y-m-d 23:59:59') + 'LT'
                            });
                            filterCollection.push(statusFilter);

                            store.clearFilter(true);
                            store.filter(filterCollection);
                        } else if (cabang === null && date1 !== null && date2 !== null) {
                            var statusFilter = new Ext.util.Filter({
                                property: 'kas_tgltrx',
                                value: Ext.Date.format(date1, 'Y-m-d 00:00:00') + 'GT'
                            });
                            filterCollection.push(statusFilter);

                            var statusFilter = new Ext.util.Filter({
                                property: 'kas_tgltrx',
                                value: Ext.Date.format(date2, 'Y-m-d 23:59:59') + 'LT'
                            });
                            filterCollection.push(statusFilter);

                            store.clearFilter(true);
                            store.filter(filterCollection);
                        } else if (cabang !== null && date1 === null && date2 !== null) {
                            var statusFilter = new Ext.util.Filter({
                                property: 'cabang_id',
                                value: cabang
                            });
                            filterCollection.push(statusFilter);

                            var statusFilter = new Ext.util.Filter({
                                property: 'kas_tgltrx',
                                value: Ext.Date.format(date2, 'Y-m-d 23:59:59') + 'LT'
                            });
                            filterCollection.push(statusFilter);

                            store.clearFilter(true);
                            store.filter(filterCollection);
                        } else if (cabang !== null && date1 !== null && date2 === null) {
                            var statusFilter = new Ext.util.Filter({
                                property: 'kas_tgltrx',
                                value: Ext.Date.format(date1, 'Y-m-d 00:00:00') + 'GT'
                            });
                            filterCollection.push(statusFilter);

                            var statusFilter = new Ext.util.Filter({
                                property: 'cabang_id',
                                value: cabang
                            });
                            filterCollection.push(statusFilter);

                            store.clearFilter(true);
                            store.filter(filterCollection);
                        } else if (cabang !== null && date1 !== null && date2 !== null) {
                            var statusFilter = new Ext.util.Filter({
                                property: 'kas_tgltrx',
                                value: Ext.Date.format(date1, 'Y-m-d 00:00:00') + 'GT'
                            });
                            filterCollection.push(statusFilter);

                            var statusFilter = new Ext.util.Filter({
                                property: 'cabang_id',
                                value: cabang
                            });
                            filterCollection.push(statusFilter);

                            var statusFilter = new Ext.util.Filter({
                                property: 'kas_tgltrx',
                                value: Ext.Date.format(date2, 'Y-m-d 23:59:59') + 'LT'
                            });
                            filterCollection.push(statusFilter);

                            store.clearFilter(true);
                            store.filter(filterCollection);
                        }
                    }
                }
            },
            '#KasKeluarRefresh': {
                click: function() {
                    var grid = this.getKsKeluarGrid(),
                            store = grid.getStore();

                    store.clearFilter(true);
                    store.filter('kas_type', 'kaskeluar');
                    this.getStartKk().reset(),
                            this.getEndKk().reset(),
                            this.getCabangKk().reset();
                }
            },
            '#ListMkRefresh': {
                click: function() {
                    var grid = this.getListMintaBayar(),
                            store = grid.getStore(),
                            filterCollection = [];

                    var filter2 = new Ext.util.Filter({
                        property: 'mk_keperluan',
                        value: '6NE'
                    });
                    filterCollection.push(filter2);

                    var filter2 = new Ext.util.Filter({
                        property: 'trx_realstatus',
                        value: 0
                    });
                    filterCollection.push(filter2);

                    var filter2 = new Ext.util.Filter({
                        property: 'trx_appr_status',
                        value: 1
                    });
                    filterCollection.push(filter2);

                    var filter2 = new Ext.util.Filter({
                        property: 'cabang_id',
                        value: CABANG_ID
                    });
                    filterCollection.push(filter2);

                    store.clearFilter(true);
                    store.filter(filterCollection);
                }
            },
            '#DataRujukanRefresh': {
                click: function() {
                    var grid = this.getDataRujukanGrid(),
                            store = grid.getStore(),
                            filterCollection = [];

                    var filter2 = new Ext.util.Filter({
                        property: 'mk_keperluan',
                        value: '6'
                    });
                    filterCollection.push(filter2);

                    var filter2 = new Ext.util.Filter({
                        property: 'trx_realstatus',
                        value: 0
                    });
                    filterCollection.push(filter2);

                    var filter2 = new Ext.util.Filter({
                        property: 'trx_appr_status',
                        value: 1
                    });
                    filterCollection.push(filter2);

                    var filter2 = new Ext.util.Filter({
                        property: 'cabang_id',
                        value: CABANG_ID
                    });
                    filterCollection.push(filter2);

                    store.clearFilter(true);
                    store.filter(filterCollection);
                }
            },
            '#DataRujukanSearch': {
                click: function() {
                    var grid = this.getDataRujukanGrid(),
                            store = grid.getStore(),
                            filterCollection = [],
                            date1 = this.getStartDr().getValue(),
                            date2 = this.getEndDr().getValue(),
                            periksa = this.getPeriksaDr().getValue();

                    if (periksa === '' && date1 === null && date2 === null) {
                        Ext.Msg.alert('Perhatian', 'Mohon isi salah satu filter.');
                        return;
                    } else {
                        var grid = this.getDataRujukanGrid(),
                                store = grid.getStore(),
                                filterCollection = [];

                        var filter2 = new Ext.util.Filter({
                            property: 'mk_keperluan',
                            value: '6'
                        });
                        filterCollection.push(filter2);

                        var filter2 = new Ext.util.Filter({
                            property: 'trx_realstatus',
                            value: 0
                        });
                        filterCollection.push(filter2);

                        var filter2 = new Ext.util.Filter({
                            property: 'trx_appr_status',
                            value: 1
                        });
                        filterCollection.push(filter2);

                        var filter2 = new Ext.util.Filter({
                            property: 'cabang_id',
                            value: CABANG_ID
                        });
                        filterCollection.push(filter2);

                        if (periksa !== '' && date1 === null && date2 === null) {
                            var statusFilter = new Ext.util.Filter({
                                property: 'mkr_pemeriksaan=ll',
                                value: periksa
                            });
                            filterCollection.push(statusFilter);

                            store.clearFilter(true);
                            store.filter(filterCollection);
                        } else if (periksa === '' && date1 !== null && date2 === null) {
                            var statusFilter = new Ext.util.Filter({
                                property: 'tgl_trx',
                                value: Ext.Date.format(date1, 'Y-m-d 00:00:00') + 'GT'
                            });
                            filterCollection.push(statusFilter);

                            store.clearFilter(true);
                            store.filter(filterCollection);
                        } else if (periksa === '' && date1 === null && date2 !== null) {
                            var statusFilter = new Ext.util.Filter({
                                property: 'tgl_trx',
                                value: Ext.Date.format(date2, 'Y-m-d 23:59:59') + 'LT'
                            });
                            filterCollection.push(statusFilter);

                            store.clearFilter(true);
                            store.filter(filterCollection);
                        } else if (periksa === '' && date1 !== null && date2 !== null) {
                            var statusFilter = new Ext.util.Filter({
                                property: 'tgl_trx',
                                value: Ext.Date.format(date1, 'Y-m-d 00:00:00') + 'GT'
                            });
                            filterCollection.push(statusFilter);

                            var statusFilter = new Ext.util.Filter({
                                property: 'tgl_trx',
                                value: Ext.Date.format(date2, 'Y-m-d 23:59:59') + 'LT'
                            });
                            filterCollection.push(statusFilter);

                            store.clearFilter(true);
                            store.filter(filterCollection);
                        } else if (periksa !== '' && date1 === null && date2 !== null) {
                            var statusFilter = new Ext.util.Filter({
                                property: 'mkr_pemeriksaan=ll',
                                value: periksa
                            });
                            filterCollection.push(statusFilter);

                            var statusFilter = new Ext.util.Filter({
                                property: 'tgl_trx',
                                value: Ext.Date.format(date2, 'Y-m-d 23:59:59') + 'LT'
                            });
                            filterCollection.push(statusFilter);

                            store.clearFilter(true);
                            store.filter(filterCollection);
                        } else if (periksa !== '' && date1 !== null && date2 === null) {
                            var statusFilter = new Ext.util.Filter({
                                property: 'tgl_trx',
                                value: Ext.Date.format(date1, 'Y-m-d 00:00:00') + 'GT'
                            });
                            filterCollection.push(statusFilter);

                            var statusFilter = new Ext.util.Filter({
                                property: 'mkr_pemeriksaan=ll',
                                value: periksa
                            });
                            filterCollection.push(statusFilter);

                            store.clearFilter(true);
                            store.filter(filterCollection);
                        } else if (periksa !== '' && date1 !== null && date2 !== null) {
                            var statusFilter = new Ext.util.Filter({
                                property: 'tgl_trx',
                                value: Ext.Date.format(date1, 'Y-m-d 00:00:00') + 'GT'
                            });
                            filterCollection.push(statusFilter);

                            var statusFilter = new Ext.util.Filter({
                                property: 'mkr_pemeriksaan=ll',
                                value: periksa
                            });
                            filterCollection.push(statusFilter);

                            var statusFilter = new Ext.util.Filter({
                                property: 'tgl_trx',
                                value: Ext.Date.format(date2, 'Y-m-d 23:59:59') + 'LT'
                            });
                            filterCollection.push(statusFilter);

                            store.clearFilter(true);
                            store.filter(filterCollection);
                        }
                    }
                }
            },
            '#KasKeluarSave': {
                click: function() {
                    this.checkTtd(1);
                }
            },
            '#KasKeluarSavePrint': {
                click: function() {
                    this.checkTtd(2);
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
        Ext.getCmp('kkSave').enable();
        Ext.getCmp('kkSavePrint').enable();
        Ext.getCmp('kkNew').enable();
        Ext.getCmp('kkDelete').enable();

        this.getKsKeluarForm().body.unmask();
        var form = this.getKsKeluarForm().getForm();
//        form.reset();

        form.findField('namaSup').hide();
        form.findField('jumlahTagihan').hide();
        form.findField('jumlahSupLebihBayar').hide();
        form.findField('mkr_pemeriksaan').hide();
        form.findField('mkr_namapasien').hide();
        form.findField('mkr_rujukanke').hide();

        form.findField('nama_divisi').show();
        form.findField('trx_desc').show();
        form.findField('statusKas').show();
        form.findField('statusKas').enable();

        form.findField('kkType').setValue(2);

        var grid = this.getListMintaBayar(),
                store = grid.getStore(),
                filterCollection = [];

        var filter2 = new Ext.util.Filter({
            property: 'mk_keperluan',
            value: '6NE'
        });
        filterCollection.push(filter2);

        var filter2 = new Ext.util.Filter({
            property: 'trx_realstatus',
            value: 0
        });
        filterCollection.push(filter2);

        var filter2 = new Ext.util.Filter({
            property: 'trx_appr_status',
            value: 1
        });
        filterCollection.push(filter2);

        var filter2 = new Ext.util.Filter({
            property: 'cabang_id',
            value: CABANG_ID
        });
        filterCollection.push(filter2);

        store.clearFilter(true);
        store.filter(filterCollection);
    },
    disableFormKk: function(id) {
        this.getKsKeluarForm().body.mask();

        Ext.getCmp('kkSave').disable();
        Ext.getCmp('kkSavePrint').disable();
        Ext.getCmp('kkNew').disable();
        Ext.getCmp('kkDelete').disable();

        var grid = this.getKsKeluarGrid(),
                store = grid.getStore(),
                filterCollection = [];

        var filter2 = new Ext.util.Filter({
            property: 'kas_type',
            value: 'kaskeluar'
        });
        filterCollection.push(filter2);

        store.clearFilter(true);
        store.filter(filterCollection);
    },
    loadFormRujukan: function(id) {
        Ext.getCmp('kkSave').enable();
        Ext.getCmp('kkSavePrint').enable();
        Ext.getCmp('kkNew').enable();
        Ext.getCmp('kkDelete').enable();

        this.getKsKeluarForm().body.unmask();
        var form = this.getKsKeluarForm().getForm();
//        form.reset();

        form.findField('namaSup').hide();
        form.findField('jumlahTagihan').hide();
        form.findField('jumlahSupLebihBayar').hide();

        form.findField('nama_divisi').show();
        form.findField('trx_desc').hide();
        form.findField('statusKas').show();
        form.findField('statusKas').enable();
        form.findField('mkr_pemeriksaan').show();
        form.findField('mkr_namapasien').show();
        form.findField('mkr_rujukanke').show();

        form.findField('kkType').setValue(3);

        var grid = this.getDataRujukanGrid(),
                store = grid.getStore(),
                filterCollection = [];

        var filter2 = new Ext.util.Filter({
            property: 'mk_keperluan',
            value: '6'
        });
        filterCollection.push(filter2);

        var filter2 = new Ext.util.Filter({
            property: 'trx_realstatus',
            value: 0
        });
        filterCollection.push(filter2);

        var filter2 = new Ext.util.Filter({
            property: 'trx_appr_status',
            value: 1
        });
        filterCollection.push(filter2);

        var filter2 = new Ext.util.Filter({
            property: 'cabang_id',
            value: CABANG_ID
        });
        filterCollection.push(filter2);

        store.clearFilter(true);
        store.filter(filterCollection);
    },
    checkTtd: function(type) {
//        Ext.Ajax.request({
//            url: BASE_PATH + 'data/check_ttd/signNullKk',
//            scope: this,
//            callback: function(options, success, response) {
//                var resp = Ext.decode(response.responseText);
//
//                if (resp.success === 'true') {
        if (type === 1) {
            this.saveKk();
        } else {
            this.savePrintKk();
        }
//                } else {
//                    Ext.MessageBox.alert('Error', 'Belum ada tanda tangan');
//                }
//            }
//        });
    },
    saveKk: function(button, e, options) {
        var form = this.getKsKeluarForm().getForm(),
                forem = this.getKsKeluarForm(),
                id = form.findField('id').getValue(),
                tabs = this.getKsKeluarTab(),
                typeKas = form.findField('kkType').getValue(),
                cmb = form.findField('namaSup'), store, filterCollection = [];

//        if (form.isValid()) {
        Ext.Ajax.request({
            url: BASE_PATH + 'ks_keluar/add_kaskeluar',
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

                    form.reset();
                    forem.saved = true;
                    form.findField('kkType').setValue(typeKas);
                    cmb.setReadOnly(false);

//                        Ext.getCmp('imageTtdKk').setSrc(BASE_URL + 'assets/img_data/signBlank.png');

//                        Ext.Ajax.request({
//                            url: BASE_PATH + 'data/clear_data_sign_img/signNullKk',
//                            scope: this,
//                            callback: function(options, success, response) {
//                                var resp = Ext.decode(response.responseText);
//
//                                if (resp.success === 'true') {
//                                    console.log('Kk Saved');
//                                }
//                            }
//                        });
                    tabs.setActiveTab(2);
                    store = this.getKsKeluarGrid().getStore();

                    var filter2 = new Ext.util.Filter({
                        property: 'kas_type',
                        value: 'kaskeluar'
                    });
                    filterCollection.push(filter2);

                    var filter2 = new Ext.util.Filter({
                        property: 'kas_tgltrx',
                        value: Ext.Date.format(new Date(), 'Y-m-d 00:00:00') + 'GT'
                    });
                    filterCollection.push(filter2);

                    var filter2 = new Ext.util.Filter({
                        property: 'kas_tgltrx',
                        value: Ext.Date.format(new Date(), 'Y-m-d 23:59:29') + 'LT'
                    });
                    filterCollection.push(filter2);

                    var filter2 = new Ext.util.Filter({
                        property: 'cabang_id',
                        value: CABANG_ID
                    });
                    filterCollection.push(filter2);

                    store.clearFilter(true);
                    store.filter(filterCollection);
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
//        }
    },
    // untuk save print belum bisa
    savePrintKk: function(button, e, options) {
        var form = this.getKkForm().getForm(),
                forem = this.getKkForm(),
                id = form.findField('id').getValue(),
                tabs = this.getTabKk(),
                typeKas = form.findField('kkType').getValue(),
                cmb = form.findField('namaSup'), store, filterCollection = [];

        if (form.isValid()) {
            Ext.Ajax.request({
                url: BASE_PATH + 'ks_keluar/add_kaskeluar',
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

                        form.reset();
                        forem.saved = true;
                        form.findField('kkType').setValue(typeKas);
                        cmb.setReadOnly(false);

//                        Ext.getCmp('imageTtdKk').setSrc(BASE_URL + 'assets/img_data/signBlank.png');
//
//                        Ext.Ajax.request({
//                            url: BASE_PATH + 'data/clear_data_sign_img/signNullKk',
//                            scope: this,
//                            callback: function(options, success, response) {
//                                var resp = Ext.decode(response.responseText);
//
//                                if (resp.success === 'true') {
//                                    console.log('Kk Saved');
//                                }
//                            }
//                        });
                        tabs.setActiveTab(2);
                        store = this.getKkGrid().getStore();

                        var filter2 = new Ext.util.Filter({
                            property: 'kas_type',
                            value: 'kaskeluar'
                        });
                        filterCollection.push(filter2);

                        var filter2 = new Ext.util.Filter({
                            property: 'kas_tgltrx',
                            value: Ext.Date.format(new Date(), 'Y-m-d 00:00:00') + 'GT'
                        });
                        filterCollection.push(filter2);

                        var filter2 = new Ext.util.Filter({
                            property: 'kas_tgltrx',
                            value: Ext.Date.format(new Date(), 'Y-m-d 23:59:29') + 'LT'
                        });
                        filterCollection.push(filter2);

                        var filter2 = new Ext.util.Filter({
                            property: 'cabang_id',
                            value: userCabang
                        });
                        filterCollection.push(filter2);

                        store.clearFilter(true);
                        store.filter(filterCollection);
//                        window.open(BASE_PATH + 'print_data/printKas/' + resp.data, "Print Preview", "height=550,width=950,modal=yes,alwaysRaised=yes");
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
        } else {
            alert('form ada yang belum di isi');
        }
    },
    // untuk new, tidak me reset ke database, cuma reset form saja
    newKk: function(button, e, options) {
        var form = this.getKsKeluarForm().getForm(),
                forem = this.getKsKeluarForm(),
                id = form.findField('id'),
                typeKas = form.findField('kkType').getValue(),
                cmb = form.findField('namaSup'), store2;
        if (typeKas == 1) {
            store2 = this.getListFaktur().getStore();
        } else if (typeKas == 2) {
            store2 = this.getListMintaBayar().getStore();
        } else {
            store2 = this.getListRujukan().getStore();
        }

//        Ext.Ajax.request({
//            url: BASE_PATH + 'akun/reset_kk',
//            method: 'POST',
//            params: {
//                kkId: id.getValue(),
//                type: typeKas
//            },
//            scope: this,
//            callback: function(options, success, response) {
//                var resp = Ext.decode(response.responseText);
//
//                if (resp.success === 'true') {
        form.reset();
//                    forem.saved = true;
//                    form.findField('kkType').setValue(typeKas);
//                    if (typeKas == 1) {
//                        store2.removeAll();
//                        cmb.setReadOnly(false);
//                    } else {
//                        store2.load();
//                    }
//
////                    Ext.getCmp('imageTtdKk').setSrc(BASE_URL + 'assets/img_data/signBlank.png');
////
////                    Ext.Ajax.request({
////                        url: BASE_PATH + 'data/clear_data_sign_img/signNullKk',
////                        scope: this,
////                        callback: function(options, success, response) {
////                            var resp = Ext.decode(response.responseText);
////
////                            if (resp.success === 'true') {
////                                console.log('Kk Reset');
////                            }
////                        }
////                    });
//                } else {
//                    console.log(resp.data);
//                }
//            }
//        });
    },
    onSuccess: function(resp, idForm) {

    },
    onFailure: function(resp, idForm) {
        Ext.MessageBox.show({
            title: resp.title,
            msg: resp.msg,
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.ERROR
        });
    },
    printTt: function(type, id) {
        window.open(BASE_PATH + 'gd_tt/print_tt/' + type + '/' + id, "Print Preview", "height=" + screen.height + ",width=950,modal=yes,alwaysRaised=yes,scrollbars=yes");
    }
});

/* End of file SystemMenu.js */
/* Location: ./assets/js/app/controller/SystemMenu.js */