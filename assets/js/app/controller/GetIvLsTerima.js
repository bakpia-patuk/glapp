/**
 * @author Isht Ae
 **/

Ext.define('GlApp.controller.GetIvLsTerima', {
    extend: 'GlApp.controller.Base',
    models: [
    ],
    stores: [
    ],
    views: [
        'ivlsterima.GetIvLsTerima',
        'ivlsterima.IvLsTerimaGrid'
    ],
    refs: [
        {ref: 'IvLsTerimaGrid', selector: '#ivlsterimagrid'}
    ],
    init: function () {
        this.control({
        });
    }
});

/* End of file SystemMenu.js */
/* Location: ./assets/js/app/controller/SystemMenu.js */