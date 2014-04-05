/**
 * @author Isht Ae
 **/
Ext.define('GlApp.view.bkrencanaagr.BkGroupKpWin', {
    extend: 'Ext.window.Window',
    alias: 'widget.bkrencanaagr.bkgroupkpwin',
    itemId: 'bkgroupkpwin',
    ui: 'orange-window',
    title: 'DAFTAR KEPERLUAN',
    width: 700,
    height: 330,
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
                    xtype: 'panel',
                    layout: 'border',
                    border: false,
                    bodyStyle: 'background: #F5AE45',
                    defaults: {
                        border: false,
                        ui: 'blue-panel',
                        split: true
                    },
                    items: [
                        {
                            xtype: 'grid',
                            title: 'LIST GROUP KEPERLUAN',
                            region: 'west',
                            width: 375,
                            itemId: 'gridGk',
                            forceFit: true,
//                            store: 'gdtxterima.TtLotStore',
                            tbar: [
                                {
                                    text:'ADD',
                                    ui: 'orange-button'
                                },
                                '-',
                                {
                                    text:'DELETE',
                                    ui: 'orange-button'
                                },
                                '-',
                                {
                                    text:'SET AKUN',
                                    ui: 'orange-button',
                                    itemId: 'setAkunGk'
                                }
                            ],
                            columns: [
                                Ext.create('Ext.grid.RowNumberer'),
                                {
                                    flex: 1,
                                    text: 'ALIAS KEPERLUAN',
                                    renderer: 'uppercase',
                                    dataIndex: 'stl_qtylast'
                                }
                            ]
                        },
                        {
                            xtype: 'grid',
                            title: 'LIST GROUP AKUN',
                            region: 'center',
                            itemId: 'gridGkAkun',
                            forceFit: true,
//                            store: 'gdtxterima.TtLotStore',
                            tbar: [
                                {
                                    text:'DELETE',
                                    ui: 'orange-button'
                                },
                                '-',
                                {
                                    text:'REFRESH',
                                    ui: 'orange-button'
                                }
                            ],
                            columns: [
                                Ext.create('Ext.grid.RowNumberer'),
                                {
                                    xtype: 'gridcolumn',
                                    flex: 1,
                                    text: 'NAMA AKUN',
                                    dataIndex: 'stl_nolot'
                                }
                            ]
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