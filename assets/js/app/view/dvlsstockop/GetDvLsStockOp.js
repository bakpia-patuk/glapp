/**
 * @author Isht Ae
 **/

Ext.define('GlApp.view.dvlsstockop.GetDvLsStockOp', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.dvlsstockop.getdvlsstockop',
    itemId: 'getdvlsstockop',
    title: 'Stock Opname',
    bodyPadding: '2 0 0 0',
    border: false,
    layout: 'border',
    defaults: {
        split: true
    },
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    region: 'center',
                    layout: 'border',
                    border: false,
                    defaults: {
                        split: true
                    },
                    items: [
                        {
                            region: 'center',
                            layout: 'fit',
                            title: 'Daftar Barang',
                            xtype:'dvlsstockop.dvlsstockopitemgrid'
                        },
                        {
                            region: 'south',
                            height: 250,
                            minHeight: 250,
                            maxHeight: 250,
                            collapsible: true,
                            title: 'Daftar Arus Barang',
                            layout: 'fit',
                            items: [
                                {
                                    xtype: 'dvlsstockop.dvlsstockoptrxgrid'
                                }
                            ]
                        }
                    ]
                },
                {
                    region: 'west',
                    width: 325,
                    minWidth: 325,
                    maxWidth: 325,
                    title: 'Form Stock Opname',
                    border: true,
                    collapsible: true,
                    layout: 'fit',
                    items: [
                        {
                            xtype: 'dvlsstockop.dvlsstockopform'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    },
    listeners: {
        /*beforeclose : function (p) {
         Ext.MessageBox.show({
         title : 'Save changes?',
         msg : 'Do you want to save changes?',
         buttons : Ext.MessageBox.YESNOCANCEL,
         fn : function (buttonId) {
         switch (buttonId) {
         case 'no':
         this.ownerCt.remove(p); // manually removes tab from tab panel
         break;
         case 'yes':
         this.saveToFile();
         this.ownerCt.remove(p);
         break;
         case 'cancel':
         // leave blank if no action required on cancel
         break;
         }
         },
         scope : this
         });
         return false; // returning false to beforeclose cancels the close event
         }*/
    },
    saveToFile: function () {
        alert('Saved');
    }
});
/* End of file getReservasi.js */
/* Location: ./assets/js/app/view/reservasi/getResrevasi.js */