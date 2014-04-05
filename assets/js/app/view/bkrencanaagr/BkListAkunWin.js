/**
 * @author Isht Ae
 **/
Ext.define('GlApp.view.bkrencanaagr.BkListAkunWin', {
    extend: 'Ext.window.Window',
    alias: 'widget.bkrencanaagr.bklistakunwin',
    itemId: 'bklistakunwin',
    ui: 'orange-window',
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
//                            store: 'gdtxterima.TtLotStore',
                    tbar: [
                        {
                            text: 'ADD',
                            ui: 'orange-button'
                        },
                        '-',
                        {
                            text: 'SET AKUN',
                            ui: 'orange-button'
                        }
                    ],
                    columns: [
                        Ext.create('Ext.grid.RowNumberer'),
                        {
                            flex: 1,
                            text: 'NAMA AKUN',
                            renderer: 'uppercase',
                            dataIndex: 'stl_qtylast'
                        }
                    ]
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