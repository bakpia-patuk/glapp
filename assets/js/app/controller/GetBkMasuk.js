/**
 * @author Isht Ae
 **/

Ext.define('GlApp.controller.GetBkMasuk', {
    extend: 'GlApp.controller.Base',
    models: [
    ],
    stores: [
    ],
    views: [
        'bkmasuk.GetBkMasuk',
        'bkmasuk.BkMasukForm',
        'bkmasuk.BkMasukGrid',
//        'bankmasuk.app2Form',
//        'bankmasuk.newWindow',
        //shared Window
//        'shared.newWindow',
//        'shared.GkMasterGrid',
//        'shared.GkMasterAkunGrid',
//        'shared.GkMasterDetailGrid'
    ],
    refs: [
        {ref: 'BkMasukForm', selector: '#bkmasukform'},
        {ref: 'BkMasukGrid', selector: '#bkmasukgrid'},
//        {ref: 'GridKeperluan', selector: '#gkmastergrid'},
//        {ref: 'GridAkunKeperluan', selector: '#gkmasterakungrid'},
//        {ref: 'GridAkunDetail', selector: '#gkmasterdetailgrid'}
    ],
    init: function() {
        this.control({
        });
    },
});

/* End of file SystemMenu.js */
/* Location: ./assets/js/app/controller/SystemMenu.js */