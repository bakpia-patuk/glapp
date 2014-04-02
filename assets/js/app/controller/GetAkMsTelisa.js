/**
 * @author Isht Ae
 **/

Ext.define('GlApp.controller.GetAkMsTelisa', {
    extend: 'Ext.app.Controller',
    models: [
    ],
    stores: [
        'akmstelisa.CabangStore',
        'akmstelisa.TelisaJenisStore',
        'akmstelisa.MasterTelisaStore'
    ],
    views: [
        'akmstelisa.GetAkMsTelisa',
        'akmstelisa.AkMsTelisaForm',
        'akmstelisa.AkMsTelisaGrid',
        'akmstelisa.JtGrid',
//        'mastertelisa.newWindow'
    ],
    refs: [
        {ref: 'AkMsTelisaForm', selector: '#akmstelisaform'},
        {ref: 'AkMsTelisaGrid', selector: '#akmstelisagrid'}
    ],
    init: function() {
        this.control({
            '#akmstelisaform button[action=mtSave]': {
                click: function() {
                    var form = this.getAkMsTelisaForm().getForm(),
                            grid = this.getAkMsTelisaGrid();

                    if (form.isValid()) {
                        Ext.Ajax.request({
                            url: BASE_PATH + 'shared/add_mstelisa',
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
                                        form.findField('mt_cabang').setValue(parseInt(CABANG_ID));
                                    }
                                    
                                    form.reset();

                                    grid.getSelectionModel().clearSelections();

                                    if (CABANG_ID !== '1') {
                                        grid.getStore().load();
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
            '#akmstelisaform button[action=mtNew]': {
                click: function() {
                    var form = this.getAkMsTelisaForm().getForm(),
                            grid = this.getAkMsTelisaGrid();

                    form.reset();
                    grid.getSelectionModel().clearSelections();

                    if (CABANG_ID !== '1') {
                        grid.getStore().load();
                    }
                }
            },
            '#akmstelisaform button[action=mtDelete]': {
                click: function() {
                    var form = this.getAkMsTelisaForm().getForm(),
                            grid = this.getAkMsTelisaGrid(),
                            sm = grid.getSelectionModel(),
                            sel = sm.getSelection();

                    if (!sel.length) {
                        Ext.Msg.alert('Warning', 'Pilih Data yang Akan di hapus');
                        return;
                    }

                    Ext.Ajax.request({
                        url: BASE_PATH + 'shared/del_telisa',
                        method: 'POST',
                        params: form.getValues(),
                        scope: this,
                        callback: function(options, success, response) {
                            var resp = Ext.decode(response.responseText);

                            if (resp.success === 'true') {
                                form.reset();
                                if (CABANG_ID !== '1') {
                                    form.findField('mt_cabang').setValue(parseInt(CABANG_ID));
                                }
                                sm.clearSelections();
                                grid.getStore().load();
                            }
                        }
                    });
                }
            },
            '#akmstelisagrid': {
                afterrender: function() {
                    var grid = this.getAkMsTelisaGrid();
                    if(CABANG_ID !== "1") {
                        grid.getStore().clearFilter(true);
                        grid.getStore().filter('mt_cabang', CABANG_ID);
                    }
                }, 
                selectionchange: function(m, r, e) {
                    var form = this.getAkMsTelisaForm().getForm();
                    if(r[0]) {
                        form.loadRecord(r[0]);
                    }
                }
            }
        });
    }
});

/* End of file SystemMenu.js */
/* Location: ./assets/js/app/controller/SystemMenu.js */