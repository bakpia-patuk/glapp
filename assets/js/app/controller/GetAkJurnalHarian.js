/**
 * @author Isht Ae
 **/

Ext.define('GlApp.controller.GetAkJurnalHarian', {
    extend: 'GlApp.controller.Base',
    models: [
    ],
    stores: [
        'akjurnalharian.JurnalAllStore',
        'akjurnalharian.CabangStore'
    ],
    views: [
        'akjurnalharian.GetAkJurnalHarian',
        'akjurnalharian.AkJurnalHarianGrid',
        'akjurnalharian.AkJurnalHarianForm',
    ],
    refs: [
        {ref: 'AkJurnalHarianGrid', selector: '#akjurnalhariangrid'},
        {ref: 'AkJurnalHarianForm', selector: '#akjurnalharianform'},
    ],
    init: function() {
        this.control({
            '#akunLawan': {
                change: function(c, v){
                    var form = this.getAkJurnalHarianForm(),
                            id = form.down('#id').getValue(),
                            jStore = this.getAkJurnalHarianGrid().getStore();

                    if (v === true) {
//                        if (this.isInitRequired()) {
//                            console.log('OKE');
                            Ext.Ajax.request({
                                url: BASE_PATH + 'ak_jurnalharian/add_jurnalharian/1',
                                method: 'POST',
                                params: form.getForm().getValues(),
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
                                        form.saved = false;
                                        form.getForm().reset();
                                        c.setValue(true);
                                        form.down('#trxStatus').setReadOnly(true);
                                        jStore.load();
                                        form.getForm().setValues(resp.data);
                                        form.down('#AkunLawan').show();
                                        form.down('#AkunLawan').enable();
                                    } else {
                                        c.setValue(false);
                                        Ext.MessageBox.show({
                                            title: resp.title,
                                            msg: resp.message,
                                            buttons: Ext.MessageBox.OK,
                                            icon: Ext.MessageBox.ERROR
                                        });
                                    }
                                }
                            });
//                        } else {
//                            c.setValue(false);
//                            var fieldNames = [];
//                            var fields = this.getInvalidFields(form);
//                            for (var i = 0; i < fields.length; i++) {
//                                var field = fields[i];
//                                fieldNames.push(field.getName());
//                            }
//            //                console.debug(fieldNames);
//            //                Ext.MessageBox.alert('Invalid Fields', 'The following fields are invalid: ' + fieldNames.join(', '));
//                        }
                    } else {
                        form.down('#AkunLawan').hide();
                        form.down('#AkunLawan').disable();
                    }
                }
            },
            '#addJurnal': {
                click: function(){
                    var form = this.getAkJurnalHarianForm(),
                            id = form.down('#id').getValue(),
                            apprStat = form.down('#status_app').getValue(),
                            grid = this.getAkJurnalHarianGrid(),
                            gridStore = grid.getStore();
                    if (apprStat === 'true') {
                        Ext.MessageBox.show({
                            title: "INFO",
                            msg: "Sudah di otorisasi. Anda tidak bisa mengedit",
                            buttons: Ext.MessageBox.OK,
                            icon: Ext.MessageBox.INFO
                        });
                        return false;
                    }

//                    if (form.getForm().isValid()) {
                        Ext.Ajax.request({
                            url: BASE_PATH + 'ak_jurnalharian/add_jurnalharian/1',
                            method: 'POST',
                            params: form.getForm().getValues(),
                            scope: this,
                            callback: function(options, success, response) {
                                var resp = Ext.decode(response.responseText);

                                if (resp.success === 'true') {
                                    form.getForm().reset();
                                    gridStore.load();
                                    form.getForm().setValues(resp.data);
                                    Ext.MessageBox.show({
                                        title: resp.title,
                                        msg: resp.message,
                                        buttons: Ext.MessageBox.OK,
                                        icon: Ext.MessageBox.INFO
                                    });
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
//                    }
                }
            }
        });
    },
});

/* End of file SystemMenu.js */
/* Location: ./assets/js/app/controller/SystemMenu.js */