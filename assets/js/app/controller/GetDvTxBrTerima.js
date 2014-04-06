/**
 * @author Isht Ae
 **/

Ext.define('GlApp.controller.GetDvTxBrTerima', {
    extend: 'GlApp.controller.Base',
    models: [
    ],
    stores: [
        'dvtxbrterima.DivisiStore', 'dvtxbrterima.DivisiStore1', 'dvtxbrterima.DivisiRuanganStore', 'dvtxbrterima.DivisiRuanganStore1',
         'dvtxbrterima.ItemStore','dvtxbrterima.PengdivStore', 'dvtxbrterima.PengdivDetailStore'
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