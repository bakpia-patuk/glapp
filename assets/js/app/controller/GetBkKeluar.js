/**
 * @author Isht Ae
 **/

Ext.define('GlApp.controller.GetBkKeluar', {
    extend: 'GlApp.controller.Base',
    models: [
    ],
    stores: [
    ],
    views: [
        'bkkeluar.GetBkKeluar',
        'bkkeluar.BkKeluarForm',
        'bkkeluar.BkKeluarGrid',
//        'bkkeluar.newWindow',
//        'bkkeluar.app2Form',
        //shared Window
//        'shared.newWindow',
//        'shared.GkMasterGrid',
//        'shared.GkMasterAkunGrid',
//        'shared.GkMasterDetailGrid'
    ],
    refs: [
        {ref: 'BkKeluarForm', selector: '#bkkeluarform'},
        {ref: 'BkKeluarGrid', selector: '#bkkeluargrid'},
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