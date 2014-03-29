/**
 * @author Isht Ae
 **/

Ext.define('GlApp.controller.GetDvTxBrMinta', {
    extend: 'GlApp.controller.Base',
    models: [
    ],
    stores: [
    ],
    views: [
        'dvtxbrminta.GetDvTxBrMinta',
        'dvtxbrminta.DvTxBrMintaForm',
        'dvtxbrminta.DvTxBrMintaGrid',
        'dvtxbrminta.DvTxBrMintaDetailGrid'
    ],
    refs: [
        {ref: 'DvTxBrMintaForm', selector: '#dvtxbrmintaform'},
        {ref: 'DvTxBrMintaGrid', selector: '#dvtxbrmintagrid'},
        {ref: 'DvTxBrMintaDetailGrid', selector: '#dvtxbrmintadetailgrid'}
    ],
    init: function () {
        this.control({
            
        });
    }
});

/* End of file SystemMenu.js */
/* Location: ./assets/js/app/controller/SystemMenu.js */