/**
 * @author Isht Ae
 **/

Ext.define('GlApp.controller.GetDvTxBrTerima', {
    extend: 'GlApp.controller.Base',
    models: [
    ],
    stores: [
    ],
    views: [
        'dvtxbrterima.GetDvTxBrTerima',
        'dvtxbrterima.DvTxBrTerimaForm',
        'dvtxbrterima.DvTxBrTerimaGrid',
        'dvtxbrterima.DvTxBrTerimaDetailGrid'
    ],
    refs: [
        {ref: 'DvTxBrTerimaForm', selector: '#dvtxbrterimaform'},
        {ref: 'DvTxBrTerimaGrid', selector: '#dvtxbrterimagrid'},
        {ref: 'DvTxBrTerimaDetailGrid', selector: '#dvtxbrterimadetailgrid'}
    ],
    init: function () {
        this.control({
        });
    }
});

/* End of file SystemMenu.js */
/* Location: ./assets/js/app/controller/SystemMenu.js */