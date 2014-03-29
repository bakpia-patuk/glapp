/**
 * @author Isht Ae
 **/
Ext.define('eTrav.view.akun.blankForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.blankform',
    itemId: 'blankform',
    border: false,
    bodyStyle: bg,
    bodyPadding: 10,
    buttonAlign: 'right',
    fieldDefaults: {
        labelAlign: 'right',
        labelWidth: 110,
        msgTarget: 'side'
    },
    autoScroll: true,
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
        });

        me.callParent(arguments);
    }
});

/* End of file reservasiForm.js */
/* Location: ./assets/js/app/view/reservasi/reservasiForm.js */