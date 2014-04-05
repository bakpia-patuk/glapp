/**
 * @author Isht Ae
 **/

Ext.define('GlApp.controller.GetAkJurnalUmum', {
    extend: 'GlApp.controller.Base',
    models: [
    ],
    stores: [
        'akjurnalumum.CabangStore',
        'akjurnalumum.JurnalAllStore'
    ],
    views: [
        'akjurnalumum.GetAkJurnalUmum',
        'akjurnalumum.AkJurnalUmumGrid'
    ],
    refs: [
        {ref: 'AkJurnalUmumGrid', selector: '#akjurnalumumgrid'},
        {ref: 'inputTglA', selector: '#dateStartJu'},
        {ref: 'inputTglB', selector: '#dateEndJu'}
    ],
    init: function () {
        this.control({
            '#akjurnalumumgrid':{
                click: function(){
                    var grid = this.getAkJurnalUmumGrid(),
                        memberStore = grid.getStore();

                    var filterCollection = [];
                    var filter2 = new Ext.util.Filter({
                        property: 'tgl_trx',
                        value: Ext.Date.format(new Date(), 'Y-m-d 00:00:00') + 'GT'
                    });
                    filterCollection.push(filter2);

                    var filter2 = new Ext.util.Filter({
                        property: 'tgl_trx',
                        value: Ext.Date.format(new Date(), 'Y-m-d 23:59:29') + 'LT'
                    });
                    filterCollection.push(filter2);

                    var filter2 = new Ext.util.Filter({
                        property: 'status_app',
                        value: 1
                    });
                    filterCollection.push(filter2);

                    var filter2 = new Ext.util.Filter({
                        property: 'cabang',
                        value: CABANG_ID
                    });
                    filterCollection.push(filter2);

                    memberStore.clearFilter(true);
                    memberStore.filter(filterCollection);
                }
            }
        });
    },
});

/* End of file SystemMenu.js */
/* Location: ./assets/js/app/controller/SystemMenu.js */