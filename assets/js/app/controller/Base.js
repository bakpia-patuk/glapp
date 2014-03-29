/**
 * @author Isht Ae
 **/

Ext.define('GlApp.controller.Base', {
    extend: 'Ext.app.Controller',
    init: function() {
        this.listen({
            globals: {
                logo: 'assets/img/app/logo_header.png',
                maskingBody: new Ext.LoadMask(Ext.getBody(), {msg:"Memproses Data. Mohon Menunggu."})
            }
        });
    },
    saveData: function(url, param, id) {
        GlApp.globals.maskingBody.show();
        Ext.Ajax.request({
            url: BASE_PATH + url,
            method: 'POST',
            params: param,
            scope: this,
            callback: function(options, success, response) {
                var resp = Ext.decode(response.responseText);

                if (resp.success === 'true') {
                    GlApp.globals.maskingBody.destroy();
                    this.onSuccess(resp, id);
                } else {
                    GlApp.globals.maskingBody.destroy();
                    this.onFailure(resp, id);
                }
            }
        });
    }
});

/* End of file Base.js */
/* Location: ./assets/js/app/controller/Base.js */