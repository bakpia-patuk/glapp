/**
 * @author Isht Ae
 **/

Ext.define('GlApp.controller.GetAkMsTelisa', {
    extend: 'Ext.app.Controller',
    models: [
    ],
    stores: [
    ],
    views: [
        'akmstelisa.GetAkMsTelisa',
        'akmstelisa.AkMsTelisaForm',
        'akmstelisa.AkMsTelisaGrid',
//        'akmstelisa.jtGrid',
//        'mastertelisa.newWindow'
    ],
    refs: [
        {ref: 'AkMsTelisaForm', selector: '#akmstelisaform'},
        {ref: 'AkMsTelisaGrid', selector: '#akmstelisagrid'}
    ],
    init: function() {
        this.control({
        });
    }
});

/* End of file SystemMenu.js */
/* Location: ./assets/js/app/controller/SystemMenu.js */