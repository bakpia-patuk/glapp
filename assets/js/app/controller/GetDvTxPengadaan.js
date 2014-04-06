/**
 * @author Isht Ae
 **/

Ext.define('GlApp.controller.GetDvTxPengadaan', {
    extend: 'GlApp.controller.Base',
    models: [
    ],
    stores: [
        'dvtxpengadaan.ItemStore', 'dvtxpengadaan.PengadaanStore', 'dvtxpengadaan.ItemMerkStore', 
        'dvtxpengadaan.ItemKatalogStore', 'dvtxpengadaan.KemasanStore', 'dvtxpengadaan.PengdivDetailStore',
        'dvtxpengadaan.CabangStore', 'dvtxpengadaan.DivisiStore'
    ],
    views: [
        'dvtxpengadaan.GetDvTxPengadaan',
        'dvtxpengadaan.DvTxPengadaanGrid',
        'dvtxpengadaan.DvTxPengadaanForm',
        'dvtxpengadaan.DvTxDetailPengadaanGrid'
    ],
    refs: [
        {ref: 'DvTxPengadaanForm', selector: '#dvtxpengadaanform'},
        {ref: 'DvTxPengadaanGrid', selector: '#dvtxpengadaangrid'},
        {ref: 'DvTxDetailPengadaanGrid', selector: '#dvtxdetailpengadaangrid'}
    ],
    init: function () {
        this.control({
        });
    },
});

/* End of file SystemMenu.js */
/* Location: ./assets/js/app/controller/SystemMenu.js */