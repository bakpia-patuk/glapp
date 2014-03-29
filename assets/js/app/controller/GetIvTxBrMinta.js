/**
 * @author Isht Ae
 **/

Ext.define('GlApp.controller.GetIvTxBrMinta', {
    extend: 'GlApp.controller.Base',
    models: [
    ],
    stores: [
    ],
    views: [
        'ivtxbrminta.GetIvTxBrMinta',
        'ivtxbrminta.IvTxBrMintaForm',
        'ivtxbrminta.IvTxBrMintaGrid',
        'ivtxbrminta.IvTxBrMintaDetailGrid'
    ],
    refs: [
        {ref: 'IvTxBrMintaForm', selector: '#ivtxbrmintaform'},
        {ref: 'IvTxBrMintaGrid', selector: '#ivtxbrmintagrid'},
        {ref: 'IvTxBrMintaDetailGrid', selector: '#ivtxbrmintadetailgrid'}
    ],
    init: function () {
        this.control({
        });
    }
});

/* End of file SystemMenu.js */
/* Location: ./assets/js/app/controller/SystemMenu.js */