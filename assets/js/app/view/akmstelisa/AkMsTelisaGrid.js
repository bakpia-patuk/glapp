/**
 * @author Isht Ae
 **/
Ext.define('GlApp.view.akmstelisa.AkMsTelisaGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.akmstelisa.akmstelisagrid',
    itemId: 'akmstelisagrid',
    ui: 'black-panel',
    autoScroll: true,
    title: 'DAFTAR TELISA',
    forceFit: true,
//    store: 'MasterTelisaStore',
    columnLines: true,
    flex: 1,
    border: false,

    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            viewConfig: {
                autoScroll: true,
                emptyText: 'Tidak ada data Telisa',
                deferEmptyText: false
            },
            tbar: [
                {
                    xtype: 'combobox',
                    fieldLabel: 'Cabang ',
                    itemId: 'cbTelFilter',
                    width: 220,
                    emptyText: 'Pilih',
                    labelWidth: 60,
                    displayField: 'cabangName',
                    valueField: 'id',
                    queryMode: 'remote',
                    allowBlank: true,
                    triggerAction: 'all',
//                    hidden: userCabang === '14' ? false : true,
//                    valueNotFoundText: 'Tidak ada Data',
//                    store: 'CabangStore',
//                    listeners: {
//                        select: function () {
//                            var store = this.up('grid').getStore(),
//                                filterCollection = [];
//
//                            var statusFilter = new Ext.util.Filter({
//                                property: 'mt_cabang',
//                                value: this.getValue()
//                            });
//                            filterCollection.push(statusFilter);
//
//
//                            store.clearFilter(true);
//                            store.filter(filterCollection);
//                        }
//                    }
                },
                '->',
                {
                    xtype: 'button',
                    ui: 'blue-button',
                    iconCls: 'icon-btn-refresh',
//                    handler: function() {
//                        this.up('grid').getStore().load();
//                    }
                }
            ],
            columns: [
                Ext.create('Ext.grid.RowNumberer'),
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    text: 'JENIS',
                    dataIndex: 'mt_jenis',
                    renderer: function (v, m, r) {
                        if(v === 1) {
                            return 'TELEPHON';
                        } else if (v === 2) {
                            return 'LISTRIK';
                        } else if (v === 3) {
                            return 'AIR';
                        } else {
                            return 'SURAT SEWA';
                        }
                    }
                },
                {
                    xtype: 'gridcolumn',
                    width: 200,
                    text: 'NAMA',
                    dataIndex: 'mt_nama',
                    renderer: 'uppercase'
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    text: 'NO REKENING',
                    dataIndex: 'mt_rek'
                },
                {
                    xtype: 'gridcolumn',
                    width: 300,
                    text: 'ALAMAT',
                    dataIndex: 'mt_alamat'
                }
            ]
        });

        me.callParent(arguments);
    }
});
/* End of file reservasiGrid.js */
/* Location: ./assets/js/app/view/reservasi/reservasiGrid.js */