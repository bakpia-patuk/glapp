/**
 * @author Isht Ae
 **/

Ext.define('GlApp.controller.GetAkMsAkun', {
    extend: 'GlApp.controller.Base',
    models: [
    ],
    stores: ['akmsakun.GroupAkunStore','akmsakun.AkunStoreTree',
    'akmsakun.AkunStore','akmsakun.MataUangStore'
    ],
    views: [
        'akmsakun.GetAkMsAkun',
        'akmsakun.AkMsAkunForm',
//        'akmsakun.akunCustomForm',
        'akmsakun.AkMsAkunGrid',
       'akmsakun.newWindow',
       'akmsakun.listAkun',
//        'akmsakun.listAkunTujuan',
//        'akmsakun.listAkunCustom',
       'akmsakun.blankForm'
    ],
    refs: [
        {ref: 'AkMsAkunForm', selector: '#akmsakunform'},
        {ref: 'AkMsAkunGrid', selector: '#akmsakungrid'},
//        {ref: 'listAkunGrid', selector: '#listakungrid'},
//        {ref: 'formCustomAkun', selector: '#akuncustomform'},
//        {ref: 'gridCustomAkun', selector: '#listakuncustom'}
    ],
    init: function() {
        this.control({
            '#akmsakunform button[action=akunSave]': {
                click: this.saveAkun
            },
            '#akmsakungrid': {
                itemclick: this.clickRow
            },
             '#akmsakunform button[action=akunNew]': {
                click: this.newAkun
            },
            '#akmsakunform button[action=akunDelete]': {
                click: this.deleteAkun
            },
            '#akmsakunform button[action=akunRefresh]': {
                click: this.refreshAkun
            },
        });
    },
    clickRow: function() {
        console.log('Edit Akun Disabled temporary');
        var tg = this.getAkMsAkunGrid(),
                form = this.getAkMsAkunForm().getForm(),
                forem = this.getAkMsAkunForm(),
                sm = tg.getSelectionModel(),
                node;

        if (sm.hasSelection()) {
            node = sm.getSelection()[0];
        }
        form.findField('groupAkun').getStore().load();
        form.findField('akunCurr').getStore().load();

        if (node) {
            form.loadRecord(node);
            form.findField('lokasiCabang').setReadOnly(true);
            forem.down('#statusAkunBerlaku').disable();
            if (node.get('fungsiAkun') === 9) {
                form.findField('fungsiAkun').setValue('');
            }
        }
    },
    saveAkun: function(button, e, options) {

        var form = this.getAkMsAkunForm().getForm(),
                 tree = this.getAkMsAkunGrid(),
                parent = form.findField('parentAkun').getValue(),
                akunOld = form.findField('akunCodeOld').getValue().replace(/0*$/, ''),
                val = form.findField('codeAkunPure').getValue().replace(/0*$/, '');

        if (form.isValid()) {
//            if (akunOld !== val) {
//                Ext.Ajax.request({
//                    url: BASE_PATH + 'data/check_akun_code',
//                    method: 'POST',
//                    params: {value: parent + val},
//                    scope: this,
//                    callback: function (options, success, response) {
//                        if (Ext.decode(response.responseText).success === 'true') {
//                            form.findField('codeAkunPure').clearInvalid();
//                            form.findField('codeAkunPure').textValid = true;
//                            console.log('Ajax execute True');
//                            this.saveFinal(opt, form, tree);
////                        } else {
////                            form.findField('codeAkunPure').markInvalid(Ext.decode(response.responseText).message);
////                            form.findField('codeAkunPure').textValid = false;
////                            console.log('Ajax execute False');
////                            return false;
////                        }
////                    }
//                });
//            } else {
            this.saveFinal( form, tree);
//            }
        }
    },
    saveFinal: function( form, tree) {
        var forem = this.getAkMsAkunForm();
        var myMask = new Ext.LoadMask(Ext.getBody(), {msg:"Mohon menunggu..."});
        myMask.show();
        Ext.Ajax.request({
            url: BASE_PATH +'shared/akun_add/',
            method: 'POST',
            params: form.getValues(),
            timeout: 60000000,
            callback: function(options, success, response) {
                myMask.destroy();
                var resp = Ext.decode(response.responseText);

                if (resp.success === 'true') {
                    Ext.MessageBox.show({
                        title: resp.title,
                        msg: resp.message,
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.INFO
                    });

                    form.reset();
                    form.findField('codeAkunchild').disable();
                    form.findField('lokasiCabang').setReadOnly(false);
                    forem.down('#statusAkunBerlaku').enable();
                    tree.setRootNode({id: 0});
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
    },
    newAkun: function(button, e, options) {
        var form = this.getAkMsAkunForm().getForm(),
                forem = this.getAkMsAkunForm();
        form.reset();
        form.findField('codeAkunchild').disable();
        form.findField('lokasiCabang').setReadOnly(false);
        forem.down('#statusAkunBerlaku').enable();
    },
    deleteAkun: function(button, e, options) {
        var grid = this.getAkMsAkunGrid();
        var me = this;
        if (grid) {
            var sm = grid.getSelectionModel();
            var rs = sm.getSelection();
            if (!rs.length) {
                Ext.MessageBox.show({
                    title: 'Peringatan',
                    msg: 'Pilih akun yang akan dihapus',
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.WARNING
                });
                return;
            }
            var sel = rs[0];
            me.deleteConfirm(sel, me);
        }
    },
    deleteConfirm: function(sel, me) {
        var data = sel;
        if (data.get('parentAkun') !== "") {
            var msg = '';
            if (sel.get('akunHead') === 0) {
                msg = 'Anda akan mengapus Header, Akun dibawahnya akan terhapus. Apakah anda yakin?';
            }
            else {
                msg = 'Anda akan menghapus Akun. Apakah anda yakin?';
            }
            Ext.Msg.show({
                title: 'Konfirmasi',
                msg: msg,
                buttons: Ext.Msg.YESNO,
                icon: Ext.MessageBox.WARNING,
                fn: function(btn) {
                    if (btn === 'yes') {
                        me.delFinal(data);
                    }
                }
            });
        } else {
            Ext.Msg.show({
                title: 'Error',
                msg: 'Anda tidak bisa menghapus Group Akun',
                buttons: Ext.Msg.YES,
                icon: Ext.MessageBox.WARNING
            });
        }
    },
    delFinal: function(data) {
        var params = data.get('id'),
                opt = "master", tree = this.getAkMsAkunGrid(), form = this.getAkMsAkunForm().getForm(),
                forem = this.getAkMsAkunForm();
        Ext.Ajax.request({
            url: BASE_PATH + 'shared/akun_del/' ,
            method: 'POST',
            params: {id: params, table_name: data.get('namaTabel')},
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
                    form.findField('codeAkunchild').disable();
                    form.findField('lokasiCabang').setReadOnly(false);
                    forem.down('#statusAkunBerlaku').enable();
                    tree.setRootNode({id: 0});
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
    },
    refreshAkun: function(button, e, options) {
        var tree = this.getAkMsAkunForm();

        tree.setRootNode({id: 0});
    },
});

/* End of file SystemMenu.js */
/* Location: ./assets/js/app/controller/SystemMenu.js */