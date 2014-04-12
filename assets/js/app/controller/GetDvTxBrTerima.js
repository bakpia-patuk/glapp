/**
 * @author Isht Ae
 **/

Ext.define('GlApp.controller.GetDvTxBrTerima', {
    extend: 'GlApp.controller.Base',
    models: [
    ],
    stores: [
        'dvtxbrterima.DivisiStore', 'dvtxbrterima.DivisiStore1', 'dvtxbrterima.DivisiRuanganStore', 'dvtxbrterima.DivisiRuanganStore1',
         'dvtxbrterima.ItemStore','dvtxbrterima.PengdivStore', 'dvtxbrterima.PengdivDetailStore'
    ],
    views: [
        'dvtxbrterima.GetDvTxBrTerima',
        'dvtxbrterima.DvTxBrTerimaForm',
        'dvtxbrterima.DvTxBrTerimaGrid',
        'dvtxbrterima.DvTxBrTerimaDetailGrid'
    ],
    refs: [
        {ref: 'DvTxBrTerimaForm', selector: '#dvtxbrterimaform'},
        {ref: 'DvTxBrTerimaGrid', selector: '#dvtxbrterimagrid'},
        {ref: 'DvTxBrTerimaDetailGrid', selector: '#dvtxbrterimadetailgrid'}
    ],
    init: function () {
        this.control({
            '#dvtxbrterimaform button[action=dmbSave]': {
                click: function(btn, e, opt) {
                    var grid = this.getDvTxBrTerimaGrid(),
                        store = grid.getStore(),
                        grid2 = this.getDvTxBrTerimaDetailGrid(),
                        store2 = grid2.getStore(),
                        form = this.getDvTxBrTerimaForm().getForm(),
                        divisiField = form.findField('divisi'),
                        filterCollection = [];
                        
                    Ext.Ajax.request({
                        url: BASE_PATH + 'dv_txbrterima/save',
                        method: 'POST',
                        params: form.getValues(),
                        scope: this,
                        callback: function (options, success, response) {
                            var resp = Ext.decode(response.responseText);

                            if (resp.success === 'true') {
                                form.reset();
                                var filterCollection=[];
                                divisiField.setValue(parseInt(resp.data.divisi));
                                store2.removeAll();

                                var statusFilter1 = new Ext.util.Filter({
                                    property: 'pengdiv_tujuan',
                                    value: USER_DIVISI
                                });
                                filterCollection.push(statusFilter1);

                                var statusFilter2 = new Ext.util.Filter({
                                    property: 'kirim_status',
                                    value: '1'
                                });
                                filterCollection.push(statusFilter2);

                                var statusFilter2 = new Ext.util.Filter({
                                    property: 'terima_status',
                                    value: '1NE'
                                });
                                filterCollection.push(statusFilter2);

                                store.clearFilter(true);
                                store.filter(filterCollection);
                                this.getDivBmGrid().getSelectionModel().clearSelections();
                            }
                        }
                    });
                }
            },
            '#dvtxbrterimaform button[action=pengDivBarangMasuk]': {
                click: function(btn, e, opt) {
                    var grid= this.getDvTxBrTerimaDetailGrid(),
                        store = grid.getStore(),
                        form = this.getDvTxBrTerimaForm().getForm(),
                        id = form.findField('id'),
                        divisi = form.findField('divisi');
                    
                    Ext.Ajax.request({
                        url: BASE_PATH + 'dv_txbrterima/pengdiv_bm',
                        method: 'POST',
                        params: form.getValues(),
                        scope: this,
                        callback: function (options, success, response) {
                            var resp = Ext.decode(response.responseText);

                            if (resp.success === 'true') {
                                form.reset();
                                id.setValue(resp.data.idPeng);
                                divisi.setValue(parseInt(resp.data.divisi));
                                store.clearFilter(true);
                                store.filter('pengdiv_id', resp.data.idPeng);
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
            '#dvtxbrterimagrid': {
                afterrender: function() {
                    var grid = this.getDvTxBrTerimaGrid(),
                        store = grid.getStore(),
                        filterCollection = [];
                        
                        var statusFilter1 = new Ext.util.Filter({
                            property: 'pengdiv_cabang',
                            value: CABANG_ID
                        });
                        filterCollection.push(statusFilter1);

                        var statusFilter1 = new Ext.util.Filter({
                            property: 'pengdiv_divisi',
                            value: USER_DIVISI
                        });
                        filterCollection.push(statusFilter1);

                        var statusFilter2 = new Ext.util.Filter({
                            property: 'kirim_status',
                            value: '1'
                        });
                        filterCollection.push(statusFilter2);

                        var statusFilter2 = new Ext.util.Filter({
                            property: 'terima_status',
                            value: '1NE'
                        });
                        filterCollection.push(statusFilter2);

                        store.clearFilter(true);
                        store.filter(filterCollection);
                },
                selectionchange: function (model, records) {
                    var grid= this.getDvTxBrTerimaDetailGrid(),
                        store = grid.getStore(),
                        id = records[0].get('id'),
                        ruangId = records[0].get('ruangan'),
                        form = this.getDvTxBrTerimaForm().getForm();
                
                        store.clearFilter(true);
                        store.filter('pengdiv_id', id);
                        form.findField('id').setValue(id);
                        form.findField('idRuang').setValue(ruangId);
                        form.findField('ruangan').setValue(parseInt(ruangId));
                        form.findField('barangCabangId').setValue(records[0].get('barangCabangId'));
                }
            },
            '#dvtxbrterimadetailgrid': {
                selectionchange: function (model, records) {
                    var form = this.getDvTxBrTerimaForm().getForm();
                    form.findField('pengBarang').getStore().load();
                    if(records[0]) {
                        form.findField('pengBarang').setValue(records[0].get('barangId'));
                        form.findField('barangCabangId').setValue(records[0].get('barangCabangId'));
                        form.findField('jumlah').setValue(records[0].get('qtyKirim'));
                        form.findField('jumlahOld').setValue(records[0].get('qtyKirim'));
                    }
                }
            }
        });
    }
});

/* End of file SystemMenu.js */
/* Location: ./assets/js/app/controller/SystemMenu.js */