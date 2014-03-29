/**
 * @author Isht Ae
 **/

Ext.define('GlApp.controller.GetAkBukuBesar', {
    extend: 'GlApp.controller.Base',
    models: [
    ],
    stores: [
    ],
    views: [
        'akbukubesar.GetAkBukuBesar',
        'akbukubesar.AkBukuBesarGrid',
        'akbukubesar.AkBukuBesarDetailGrid',
        'akbukubesar.NsForm',
        'akbukubesar.RlForm'
    ],
    refs: [
        {ref: 'AkBukuBesarGrid', selector: '#akbukubesargrid'},
        {ref: 'AkBukuBesarDetailGrid', selector: '#akbukubesardetailgrid'},
        {ref: 'NsForm', selector: '#nsform'},
        {ref: 'RlForm', selector: '#rlform'}
    ],
    init: function () {
        this.control({
        });
    }
});

/* End of file SystemMenu.js */
/* Location: ./assets/js/app/controller/SystemMenu.js */