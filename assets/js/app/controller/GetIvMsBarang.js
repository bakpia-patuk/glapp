/**
 * @author coepoe
 **/

Ext.define('GlApp.controller.GetIvMsBarang', {
    extend: 'GlApp.controller.Base',
    models: [
    ],
    stores: [
        'ivmsbarang.IvMsBarangStore',
        'ivmsbarang.CabangStore',
        'ivmsbarang.DivisiStore',
        'ivmsbarang.RuangStore',
        'ivmsbarang.CabangFormStore',
        'ivmsbarang.DivisiFormStore',
        'ivmsbarang.RuangFormStore',
        'ivmsbarang.BarangStore',
        'ivmsbarang.GolonganStore'
    ],
    views: [
        'ivmsbarang.GetIvMsBarang',
        'ivmsbarang.IvMsBarangForm',
        'ivmsbarang.IvMsBarangGrid'
    ],
    refs: [
        {ref: 'IvMsBarangForm', selector: '#ivmsbarangform'},
        {ref: 'IvMsBarangGrid', selector: '#ivmsbaranggrid'}
    ],
    init: function() {
        this.control({
            '#IvMbSearch':{
                click: function(){
                    var grid = this.getIvMsBarangGrid(),
                            store = grid.getStore(),
                            filterCollection = [],
                            cabang = grid.down('#db_cabang').getValue(),
                            divisi = grid.down('#db_divisi').getValue(),
                            ruang = grid.down('#db_ruang').getValue();
                    
                    if(cabang == null && divisi == null && ruang == null){
                        Ext.Msg.alert('Perhatian', 'Mohon isi salah satu filter.');
                        return;
                    } else {
                        if(cabang != null){
                            var statusFilter = new Ext.util.Filter({
                                property: 'db_cabang',
                                value: cabang !== null ? cabang : CABANG_ID
                            });
                            filterCollection.push(statusFilter);
                        }
                        
                        if(divisi != null){
                            var statusFilter = new Ext.util.Filter({
                                property: 'db_divisi',
                                value: divisi
                            });
                            filterCollection.push(statusFilter);
                        }
                        
                        if(ruang != null){
                            var statusFilter = new Ext.util.Filter({
                                property: 'db_ruang',
                                value: ruang
                            });
                            filterCollection.push(statusFilter);
                        }
                        
                        store.clearFilter(true);
                        store.filter(filterCollection);
                    }
                }
            },
            '#ivmsbaranggrid':{
                afterrender: function(){
                    var grid = this.getIvMsBarangGrid(),
                            store = grid.getStore(),
                            filterCollection = [];
                    
                    var filter2 = new Ext.util.Filter({
                        property: 'db_cabang',
                        value: CABANG_ID
                    });
                    filterCollection.push(filter2);

                    store.clearFilter(true);
                    store.filter(filterCollection);
                },
                selectionchange: function(model, records) {
                    var form = this.getIvMsBarangForm().getForm();

                    if (records[0]) {
                        form.loadRecord(records[0]);
                    }
                }
            },
            '#IvMbSave':{
                click: function(){
                    var form = this.getIvMsBarangForm().getForm(),
                            divisiCmb = form.findField('db_divisi'),
                            cabangCmb = form.findField('db_cabang'),
                            ruangCmb = form.findField('db_ruang'),
                            store = this.getIvMsBarangGrid().getStore();

                    if (form.isValid()) {
                        Ext.Ajax.request({
                            url: BASE_PATH + 'iv_msbarang/add_ivmsbarang',
                            method: 'POST',
                            params: form.getValues(),
                            scope: this,
                            callback: function(options, success, response) {
                                var resp = Ext.decode(response.responseText);

                                if (resp.success === 'true') {
                                    form.reset();
                                    if (CABANG_ID !== 1) {
                                        divisiCmb.setValue(USER_DIVISI);
                                        divisiCmb.setReadOnly(true);
                                        cabangCmb.setValue(CABANG_ID);
                                        cabangCmb.setReadOnly(true);
                                        ruangCmb.reset();
                                    } else {
                                        ruangCmb.reset();
                                        divisiCmb.setReadOnly(false);
                                    }

                                    this.getIvMsBarangGrid().getSelectionModel().clearSelections();
                                    store.load();
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
                    }
                }
            },
            '#IvMbNew':{
                click: function() {
                    var form = this.getIvMsBarangForm().getForm(),
                        divisiCmb = form.findField('db_divisi'),
                        cabangCmb = form.findField('db_cabang'),
                        ruangCmb = form.findField('db_ruang'),
                        store = this.getIvMsBarangGrid().getStore();

                    form.reset();
                    if (CABANG_ID !== 1) {
                        divisiCmb.setValue(USER_DIVISI);
                        divisiCmb.setReadOnly(true);
                        cabangCmb.setValue(CABANG_ID);
                        cabangCmb.setReadOnly(true);
                        ruangCmb.reset();
                    } else {
                        ruangCmb.reset();
                        divisiCmb.setReadOnly(false);
                    }

                    this.getIvMsBarangGrid().getSelectionModel().clearSelections();
                    store.load();
                }
            },
            
        });
    }
});

/* End of file SystemMenu.js */
/* Location: ./assets/js/app/controller/SystemMenu.js */