/**
 * @author Isht Ae
 **/

Ext.define('GlApp.controller.GetDvTxKeluar', {
    extend: 'GlApp.controller.Base',
    models: [
    ],
    stores: [
    ],
    views: [
        'dvtxkeluar.GetDvTxKeluar',
        'dvtxkeluar.DvTxKeluarForm',
        'dvtxkeluar.DvTxKeluarGrid',
        'dvtxkeluar.DvTxKeluarDetailGrid',
//        'dvtxkeluar.divBkEdGrid',
    ],
    refs: [
        {ref: 'DvTxKeluarForm', selector: '#dvtxkeluarform'},
        {ref: 'DvTxKeluarGrid', selector: '#dvtxkeluargrid'},
        {ref: 'DvTxKeluarDetailGrid', selector: '#dvtxkeluardetailgrid'}
    ],
    init: function() {
        this.control({
        });
    },
});

/* End of file SystemMenu.js */
/* Location: ./assets/js/app/controller/SystemMenu.js */