/**
 * @author Isht Ae
 **/

Ext.define('GlApp.controller.GetDvLsBrKeluar', {
    extend: 'GlApp.controller.Base',
    models: [
    ],
    stores: [
    ],
    views: [
        'dvlsbrkeluar.GetDvLsBrKeluar',
        'dvlsbrkeluar.DvLsBrKeluarGrid'
    ],
    refs: [
        {ref: 'DvLsBrKeluarGrid', selector: '#dvlsbrkeluargrid'}
    ],
    init: function() {
        this.control({
        });
    }
});

/* End of file SystemMenu.js */
/* Location: ./assets/js/app/controller/SystemMenu.js */