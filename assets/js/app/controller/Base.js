/**
 * @author Isht Ae
 **/

Ext.define('GlApp.controller.Base', {
    extend: 'Ext.app.Controller',
    init: function() {
        this.listen({
            global: {
                logo: 'assets/img/app/logo_header.png'
            }
        });
    },
    saveData: function(url, param, id) {
        Ext.Ajax.request({
            url: BASE_PATH + url,
            method: 'POST',
            params: param,
            scope: this,
            waitMsg: 'Memproses Data. Mohon Tunggu.',
            callback: function(options, success, response) {
                var resp = Ext.decode(response.responseText);

                if (resp.success === 'true') {
                    this.onSuccess(resp, id);
                } else {
                    this.onFailure(resp, id);
                }
            }
        });
    }
});

/* End of file Base.js */
/* Location: ./assets/js/app/controller/Base.js */