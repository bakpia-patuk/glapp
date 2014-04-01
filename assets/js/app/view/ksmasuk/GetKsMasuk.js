/**
 * @author Isht Ae
 **/

Ext.define('GlApp.view.ksmasuk.GetKsMasuk', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.ksmasuk.getksmasuk',
    itemId: 'getksmasuk',
    bodyPadding: '2 0 0 0',
    border: false,
    layout: 'border',
    defaults: {
        split: true
    },
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            tbar: [
                {
                    xtype: 'button',
                    text: 'Simpan',
                    iconCls: 'icon-btn-save',
                    itemId: 'KasMasukSave'
                },
                {
                    xtype: 'button',
                    text: 'Cetak',
                    iconCls: 'icon-btn-print',
                    action: 'KasMasukSavePrint'
                },
                {
                    xtype: 'button',
                    text: 'Baru',
                    iconCls: 'icon-btn-add',
                    itemId: 'KasMasukNew'
                },
                {
                    xtype: 'button',
                    text: 'Hapus',
                    iconCls: 'icon-btn-delete',
                    itemId: 'KasMasukDelete'
                },
                '->',
                {
                    xtype: 'tbtext',
                    text: '<strong>Filter :&nbsp;&nbsp;</strong>'
                },
                {
                    xtype: 'datefield',
                    width: 100,
                    fieldLabel: 'Tgl. Awal',
                    emptyText: 'Tgl Awal',
                    hideLabel: true,
                    name: 'dateStart',
                    itemId: 'dateStartKm',
                    format: 'd/M/Y',
                    submitFormat: 'Y-m-d',
                },
                {
                    xtype: 'tbtext',
                    text: '<small>s/d</small>'
                },
                {
                    xtype: 'datefield',
                    width: 100,
                    fieldLabel: 'Tgl. Akhir',
                    emptyText: 'Tgl Akhir',
                    hideLabel: true,
                    name: 'dateEnd',
                    itemId: 'dateEndKm',
                    format: 'd/M/Y',
                    submitFormat: 'Y-m-d',
                },
                {
                    xtype: 'combobox',
                    itemId: 'cabangKmFilter',
                    width: 150,
                    emptyText: 'Pilih cabang',
                    displayField: 'cabang_alias',
                    valueField: 'id',
                    queryMode: 'remote',
                    allowBlank: true,
                    triggerAction: 'all',
//                    hidden: userCabang == 14 ? false : true,
//                    valueNotFoundText: 'Tidak ada Data',
                    store: 'ksmasuk.CabangStore',
                },
                {
                    xtype: 'button',
                    text: 'Seacrh',
                    itemId: 'KasMasukSearch',
                    ui: 'blue-button',
                    iconCls: 'icon-btn-search',
                },
                '-',
                {
                    xtype: 'button',
                    text: 'Refresh',
                    ui: 'blue-button',
                    iconCls: 'icon-btn-refresh',
                    itemId: 'KasMasukRefresh'
                },
                {
                    xtype: 'button',
                    text: 'Clear',
                    ui: 'blue-button',
                    iconCls: 'icon-btn-clear',
//                    handler: function() {
//                        this.up('grid').down('#dateStartKm').setValue('');
//                        this.up('grid').down('#dateEndKm').setValue('');
//                        this.up('grid').down('#cabangKmFilter').setValue('');
//                        var store = this.up('grid').getStore(),
//                            filterCollection = [];
//
//                        var filter2 = new Ext.util.Filter({
//                            property: 'kas_type',
//                            value: 'kasmasuk'
//                        });
//                        filterCollection.push(filter2);
//
//                        var statusFilter = new Ext.util.Filter({
//                            property: 'cabang_id',
//                            value: userCabang
//                        });
//                        filterCollection.push(statusFilter);
//
//                        store.clearFilter(true);
//                        store.filter(filterCollection);
//                    }
                }
            ],
            items: [
                {
                    region: 'center',
                    layout: 'fit',
                    items: [
                        {
                            xtype: 'ksmasuk.ksmasukgrid'
                        }
                    ]
                },
                {
                    region: 'west',
                    width: 325,
                    minWidth: 325,
                    title: 'FORM KAS MASUK',
                    border: true,
                    ui: 'green-panel',
                    collapsible: true,
                    layout: 'fit',
                    items: [
                        {
                            xtype: 'ksmasuk.ksmasukform'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }
});
/* End of file getReservasi.js */
/* Location: ./assets/js/app/view/reservasi/getResrevasi.js */