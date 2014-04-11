/**
 * @author coepoe
 **/

Ext.define('GlApp.controller.GetIvTxBrTerima', {
    extend: 'GlApp.controller.Base',
    models: [
    ],
    stores: [
    ],
    views: [
        'ivtxbrterima.GetIvTxBrTerima',
        'ivtxbrterima.IvTxBrTerimaForm',
        'ivtxbrterima.IvTxBrTerimaGrid',
        'ivtxbrterima.IvTxBrTerimaDetailGrid'
    ],
    refs: [
        {ref: 'IvTxBrTerimaForm', selector: '#ivtxbrterimaform'},
        {ref: 'IvTxBrTerimaGrid', selector: '#ivtxbrterimagrid'},
        {ref: 'IvTxBrTerimaDetailGrid', selector: '#ivtxbrterimadetailgrid'}
    ],
    init: function () {
        this.control({
        });
    }
});

/* End of file SystemMenu.js */
/* Location: ./assets/js/app/controller/SystemMenu.js */