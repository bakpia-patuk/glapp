/**
 * @author Isht Ae
 **/

Ext.define('GlApp.controller.Base', {
    extend: 'Ext.app.Controller',
    init: function() {
        this.listen({
            globals: {
                logo: 'assets/img/app/logo_header.png'
            }
        });
    },
    initKey: function(form, field) {
        Ext.Ajax.request({
            url: BASE_PATH + 'shared/random_key',
            method: 'POST',
            scope: this,
            callback: function(options, success, response) {
                var resp = Ext.decode(response.responseText);

                if (resp.success === 'true') {
                    form.down(field).setValue(resp.data);
                }
            }
        });
    },
    initForm: function(form, signArea) {
        Ext.Ajax.request({
            url: BASE_PATH + 'shared/check_ttd',
            method: 'POST',
            scope: this,
            callback: function(options, success, response) {
                var resp = Ext.decode(response.responseText);

                if (resp.success === 'false') {
                    form.body.mask();
                    Ext.MessageBox.show({
                        title: 'WARNING',
                        msg: TTD_STRING,
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.WARNING
                    });
                } else {
                    form.down(signArea).setSrc(BASE_URL + resp.url);
                }
            }
        });
    },
    ajaxReq: function(url, param, id) {
        var maskingBody = new Ext.LoadMask(Ext.getBody(), {msg: "Memproses Data. Mohon Menunggu."});
        
        maskingBody.show();
        
        Ext.Ajax.request({
            url: BASE_PATH + url,
            method: 'POST',
            params: param,
            scope: this,
            callback: function(options, success, response) {
                var resp = Ext.decode(response.responseText);

                if (resp.success === 'true') {
                    maskingBody.destroy();
                    this.onSuccess(resp, id);
                } else {
                    maskingBody.destroy();
                    this.onFailure(resp, id);
                }
            }
        });
    }
});

/* End of file Base.js */
/* Location: ./assets/js/app/controller/Base.js */