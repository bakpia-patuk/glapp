/**
 * @author Isht Ae
 **/
Ext.define('GlApp.view.ksmasuk.KsListAkunWin', {
    extend: 'Ext.window.Window',
    alias: 'widget.ksmasuk.kslistakunwin',
    itemId: 'kslistakunwin',
    ui: 'green-window',
    title: 'DAFTAR AKUN HEADER',
    width: 350,
    height: 400,
    modal: true,
    resizable: false,
    border: false,
    autoScroll: true,
    layout: 'fit',
    autoShow: true,
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'grid',
                    itemId: 'gridHeaderAkun',
                    border: false,
                    forceFit: true,
                    store: 'ksmasuk.AkunHeaderStore',
                    selModel: Ext.create('Ext.ux.selection.CheckboxModel', {
                        checkOnly: false,
                        mode: 'multi'
                    }),
                    tbar: [
                        {
                            text: 'SET AKUN',
                            ui: 'green-button',
                            itemId: 'setAkunKp'
                        }
                    ],
                    columns: [
                        Ext.create('Ext.grid.RowNumberer', {width: 40}),
                        {
                            flex: 1,
                            text: 'NAMA AKUN',
                            renderer: 'uppercase',
                            dataIndex: 'akun_name'
                        }
                    ],
                    listeners: {
                        afterrender: function() {
                            me.down('#gridHeaderAkun').getSelectionModel().clearSelections();
                        }
                    }
                }
            ],
            buttons: [
                {
                    text: 'Save',
                    scope: this,
                    handler: this.close
                },
                {
                    text: 'Cancel',
                    scope: this,
                    handler: this.close
                }
            ]
        });
        me.callParent(arguments);
    }
});
/* End of file memberWindow.js */
/* Location: ./assets/js/app/view/group/memberWindow.js */