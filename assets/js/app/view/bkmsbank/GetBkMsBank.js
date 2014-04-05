/**
 * @author Isht Ae
 **/

Ext.define('GlApp.view.bkmsbank.GetBkMsBank', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.bkmsbank.getbkmsbank',
    itemId: 'getbkmsbank',
    bodyPadding: '2 0 0 0',
    border: false,
    layout: 'border',
    defaults: {
        split: true,
        border: true,
        ui: 'orange-panel'
    },
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            tbar: [
                {
                    xtype: 'button',
                    ui: 'orange-button',
                    text: 'ADD_NEW',
                    iconCls: 'icon-btn-add',
                    itemId: 'MsBankNew'
                },
                '-',
                {
                    xtype: 'button',
                    ui: 'orange-button',
                    text: 'SAVE',
                    iconCls: 'icon-btn-save',
                    itemId: 'MsBankSave'
                },
                '-',
                {
                    xtype: 'button',
                    ui: 'orange-button',
                    text: 'DELETE',
                    iconCls: 'icon-btn-delete',
                    itemId: 'MsBankDelete'
                },
                '->',
                {
                    xtype: 'combobox',
                    emptyText: 'Pilih',
                    fieldLabel: 'Filter ',
                    labelWidth: 40,
                    width: 200,
                    displayField: 'cabang_alias',
                    valueField: 'id',
                    queryMode: 'remote',
                    name: 'filterCbPusat1',
                    itemId: 'filterCabang',
                    allowBlank: true,
                    triggerAction: 'all',
                    valueNotFoundText: 'Tidak ada Data',
                    store: 'bkmsbank.CabangGridStore',
//                    hidden: CABANG_ID === "1" ? false : true,
                    listeners: {
                        select: function(me, value, field) {
                            var store = Ext.StoreMgr.lookup('bkmsbank.BankStore');
//
                            store.clearFilter(true);
                            store.filter('bank_cabang', this.getValue());
                        }
                    }
                },
                {
                    iconCls: 'icon-btn-refresh',
                    text: 'REFRESH',
                    ui: 'orange-button',
                    handler: function() {
                        this.up('grid').getSelectionModel().clearSelections();
                        this.up('grid').getStore().load();
                    }
                }
            ],
            items: [
                {
                    region: 'center',
                    layout: 'fit',
                    xtype: 'bkmsbank.bkmsbankgrid'
                },
                {
                    region: 'west',
                    width: 275,
                    minWidth: 275,
                    title: 'FORM MASTER BANK',
                    collapsible: true,
                    layout: 'auto',
                    xtype: 'bkmsbank.bkmsbankform'
                }
            ]
        });

        me.callParent(arguments);
    }
});
/* End of file getReservasi.js */
/* Location: ./assets/js/app/view/reservasi/getResrevasi.js */