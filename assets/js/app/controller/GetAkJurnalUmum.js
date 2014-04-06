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
            },
            '#JurnalUmumRefresh':{
                click: function(){
                    var grid = this.getAkJurnalUmumGrid();
                    grid.getStore().load();
                    grid.getSelectionModel().clearSelections();
                    grid.columns[8].hide();
                }
            },
            '#JurnalUmumSearch':{
                click: function(){
                    var grid = this.getAkJurnalUmumGrid(),
                            store = grid.getStore(),
                            filterCollection = [],
                            cabang = grid.down('#cabangJuFilter').getValue(),
                            date1 = grid.down('#dateJuFilter').getValue(),
                            date2 = grid.down('#dateJuFilter2').getValue();
                    
                    
                    if(cabang === null && date1 === null && date2 === null){
                        Ext.Msg.alert('Perhatian', 'Mohon isi salah satu filter.');
                        return;
                    } else {
                        if(cabang !== null && date1 === null && date2 === null){
                            var statusFilter = new Ext.util.Filter({
                                property: 'cabang',
                                value: cabang
                            });
                            filterCollection.push(statusFilter);

                            store.clearFilter(true);
                            store.filter(filterCollection);
                        } else if(cabang === null && date1 !== null && date2 === null){
                            var statusFilter = new Ext.util.Filter({
                                property: 'tgl_trx',
                                value: Ext.Date.format(date1, 'Y-m-d 00:00:00') + 'GT'
                            });
                            filterCollection.push(statusFilter);

                            store.clearFilter(true);
                            store.filter(filterCollection);
                        } else if(cabang === null && date1 === null && date2 !== null){
                            var statusFilter = new Ext.util.Filter({
                                property: 'tgl_trx',
                                value: Ext.Date.format(date2, 'Y-m-d 23:59:59') + 'LT'
                            });
                            filterCollection.push(statusFilter);

                            store.clearFilter(true);
                            store.filter(filterCollection);
                        } else if(cabang === null && date1 !== null && date2 !== null){
                            var statusFilter = new Ext.util.Filter({
                                property: 'tgl_trx',
                                value: Ext.Date.format(date1, 'Y-m-d 00:00:00') + 'GT'
                            });
                            filterCollection.push(statusFilter);
                            
                            var statusFilter = new Ext.util.Filter({
                                property: 'tgl_trx',
                                value: Ext.Date.format(date2, 'Y-m-d 23:59:59') + 'LT'
                            });
                            filterCollection.push(statusFilter);

                            store.clearFilter(true);
                            store.filter(filterCollection);
                        } else if(cabang !== null && date1 === null && date2 !== null){
                            var statusFilter = new Ext.util.Filter({
                                property: 'cabang',
                                value: cabang
                            });
                            filterCollection.push(statusFilter);
                            
                            var statusFilter = new Ext.util.Filter({
                                property: 'tgl_trx',
                                value: Ext.Date.format(date2, 'Y-m-d 23:59:59') + 'LT'
                            });
                            filterCollection.push(statusFilter);

                            store.clearFilter(true);
                            store.filter(filterCollection);
                        } else if(cabang !== null && date1 !== null && date2 === null){
                            var statusFilter = new Ext.util.Filter({
                                property: 'tgl_trx',
                                value: Ext.Date.format(date1, 'Y-m-d 00:00:00') + 'GT'
                            });
                            filterCollection.push(statusFilter);
                            
                            var statusFilter = new Ext.util.Filter({
                                property: 'cabang',
                                value: cabang
                            });
                            filterCollection.push(statusFilter);

                            store.clearFilter(true);
                            store.filter(filterCollection);
                        } else if(cabang !== null && date1 !== null && date2 !== null){
                            var statusFilter = new Ext.util.Filter({
                                property: 'tgl_trx',
                                value: Ext.Date.format(date1, 'Y-m-d 00:00:00') + 'GT'
                            });
                            filterCollection.push(statusFilter);
                            
                            var statusFilter = new Ext.util.Filter({
                                property: 'cabang',
                                value: cabang
                            });
                            filterCollection.push(statusFilter);
                            
                            var statusFilter = new Ext.util.Filter({
                                property: 'tgl_trx',
                                value: Ext.Date.format(date2, 'Y-m-d 23:59:59') + 'LT'
                            });
                            filterCollection.push(statusFilter);

                            store.clearFilter(true);
                            store.filter(filterCollection);
                        }
                    }
                }
            },
            '#JurnalUmumClear':{
                click: function(){
                    var grid = this.getAkJurnalUmumGrid(),
                        memberStore = grid.getStore();

                    grid.down('#dateJuFilter').reset();
                    grid.down('#dateJuFilter2').reset();
                    grid.down('#cabangJuFilter').reset();

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
                    grid.columns[8].hide();
                }
            },
            '#JurnalUmumAll':{
                click: function(){
                    var grid = this.getJuGrid(),
                        memberStore = grid.getStore();

                    grid.down('#dateJuFilter').reset();
                    grid.down('#dateJuFilter2').reset();
                    grid.down('#cabangJuFilter').reset();

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

                    memberStore.clearFilter(true);
                    memberStore.filter(filterCollection);
                    grid.columns[8].show();
                }
            }
        });
    },
});

/* End of file SystemMenu.js */
/* Location: ./assets/js/app/controller/SystemMenu.js */