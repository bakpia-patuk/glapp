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
        });
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
});

/* End of file SystemMenu.js */
/* Location: ./assets/js/app/controller/SystemMenu.js */