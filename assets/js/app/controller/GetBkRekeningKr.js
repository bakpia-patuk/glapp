/**
 * @author Isht Ae
 **/

Ext.define('GlApp.controller.GetBkRekeningKr', {
    extend: 'GlApp.controller.Base',
    models: [
    ],
    stores: [
    ],
    views: [
        'bkrekeningkr.GetBkRekeningKr',
        'bkrekeningkr.BkRekeningKrGrid',
        'bkrekeningkr.BkRekeningKrCashFlowGrid'
    ],
    refs: [
        {ref: 'BkRekeningKrGrid', selector: 'bkrekeningkrgrid'},
        {ref: 'inputTglA', selector: '#dateStartRk'},
        {ref: 'inputTglB', selector: '#dateEndRk'}
    ],
    init: function () {
        this.control({
        });
    },
});

/* End of file SystemMenu.js */
/* Location: ./assets/js/app/controller/SystemMenu.js */