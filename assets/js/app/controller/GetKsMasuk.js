/**
 * @author Isht Ae
 **/

Ext.define('GlApp.controller.GetKsMasuk', {
    extend: 'GlApp.controller.Base',
    models: [
    ],
    stores: [
    ],
    views: [
        'ksmasuk.GetKsMasuk',
        'ksmasuk.KsMasukForm',
        'ksmasuk.KsMasukGrid',
//        'kasmasuk.app2Form',
//        'shared.newWindow',
//        //shared Window
//        'shared.newWindow',
//        'shared.GkMasterGrid',
//        'shared.GkMasterAkunGrid',
//        'shared.GkMasterDetailGrid'
    ],
    refs: [
        {ref: 'KsMasukForm', selector: '#kasmasukform'},
        {ref: 'KsMasukGrid', selector: '#kasmasukgrid'},
//        {ref: 'GridKeperluan', selector: '#gkmastergrid'},
//        {ref: 'GridAkunKeperluan', selector: '#gkmasterakungrid'},
//        {ref: 'GridAkunDetail', selector: '#gkmasterdetailgrid'}
    ],
    init: function () {
        this.control({
        });
    },
});

/* End of file SystemMenu.js */
/* Location: ./assets/js/app/controller/SystemMenu.js */