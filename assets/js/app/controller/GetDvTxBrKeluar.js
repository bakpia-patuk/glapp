/**
 * @author Isht Ae
 **/

Ext.define('GlApp.controller.GetDvTxBrKeluar', {
    extend: 'GlApp.controller.Base',
    models: [
    ],
    stores: [
    ],
    views: [
        'dvtxbrkeluar.GetDvTxBrKeluar',
        'dvtxbrkeluar.DvTxBrKeluarForm',
        'dvtxbrkeluar.DvTxBrKeluarGrid',
        'dvtxbrkeluar.DvTxBrKeluarDetailGrid',
//        'dvtxbrkeluar.divBkEdGrid',
//        'dvtxbrkeluar.newWindow'
    ],
    refs: [
        {ref: 'DvTxBrKeluarForm', selector: '#dvtxbrkeluarform'},
        {ref: 'DvTxBrKeluarGrid', selector: '#dvtxbrkeluargrid'},
        {ref: 'DvTxBrKeluarDetailGrid', selector: '#dvtxbrkeluardetailgrid'}
    ],
    init: function() {
        this.control({
        });
    },
});

/* End of file SystemMenu.js */
/* Location: ./assets/js/app/controller/SystemMenu.js */