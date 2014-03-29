/**
 * @author Isht Ae
 **/

Ext.define('GlApp.view.bkrekeningkr.GetBkRekeningKr', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.bkrekeningkr.getbkrekeningkr',
    itemId: 'getbkrekeningkr',
    bodyPadding: '2 0 0 0',
    layout: 'border',
    border: false,
    defaults: {
        split: true
    },
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'bkrekeningkr.bkrekeningkrgrid',
                    region: 'center',
                    border: true
                },
                {
                    xtype: 'bkrekeningkr.bkrekeningkrcashflowgrid',
                    region: 'south',
                    collapsible: true,
                    height: 250,
                    minHeight: 250,
                    maxHeight: 250,
                    border: true
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
    saveToFile: function() {
        alert('Saved');
    }
});
/* End of file getReservasi.js */
/* Location: ./assets/js/app/view/reservasi/getResrevasi.js */