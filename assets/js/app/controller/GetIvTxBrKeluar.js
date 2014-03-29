/**
 * @author Isht Ae
 **/

Ext.define('GlApp.controller.GetIvTxBrKeluar', {
    extend: 'GlApp.controller.Base',
    models: [
    ],
    stores: [
    ],
    views: [
        'ivtxbrkeluar.GetIvTxBrKeluar',
        'ivtxbrkeluar.IvTxBrKeluarForm',
        'ivtxbrkeluar.IvTxBrKeluarGrid',
        'ivtxbrkeluar.IvTxBrKeluarDetailGrid'
    ],
    refs: [
        {ref: 'IvTxBrKeluarForm', selector: '#ivtxbrkeluarform'},
        {ref: 'IvTxBrKeluarGrid', selector: '#ivtxbrkeluargrid'},
        {ref: 'IvTxBrKeluarDetailGrid', selector: '#ivtxbrkeluardetailgrid'}
    ],
    init: function () {
        this.control({
        });
    }
});

/* End of file SystemMenu.js */
/* Location: ./assets/js/app/controller/SystemMenu.js */