/**
 * @author Isht Ae
 **/
Ext.define('GlApp.view.dvtxbrterima.DvTxBrTerimaForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.dvtxbrterima.dvtxbrterimaform',
    itemId: 'dvtxbrterimaform',
    border: false,
    preventHeader: false,
    bodyStyle: FORM_BG,
    bodyPadding: 10,
    buttonAlign: 'right',
    fieldDefaults: {
        width: 300,
        labelAlign: 'right',
        labelWidth: 110,
        msgTarget: 'side'
    },
    autoScroll: true,
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            tbar: [
                {
                    xtype: 'button',
                    ui: 'blue-button',
                    text: 'Simpan',
                    iconCls: 'icon-btn-save',
                   action: 'dmbSave'
                },
                {
                    xtype: 'button',
                    ui: 'blue-button',
                    text: 'Baru',
                    hidden: true,
                    iconCls: 'icon-btn-add',
                   action: 'dmbNew'
                }
            ],
            items: [
                {
                    xtype: 'textfield',
                    fieldLabel: 'Id ',
                    name: 'id',
                    hidden: true
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Id Ruang ',
                    name: 'idRuang',
                    hidden: true
                },
                 {
                    xtype: 'textfield',
                    fieldLabel: 'Id ',
                    name: 'barangCabangId',
                    hidden: true
                },
                {
                    xtype: 'datefield',
                    fieldLabel: 'Tanggal ',
                    name: 'tglTransaksi',
                    format: 'd/M/Y',
                    submitFormat: 'Y-m-d',
                    value: new Date(),
                    allowBlank: false
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Divisi ',
                    name: 'divisi',
                    triggerAction: 'all',
                    hideTrigger: false,
                    queryMode: 'remote',
                    minChars: 2,
                   store: 'dvtxbrterima.DivisiStore',
                    displayField: 'divisiName',
                    valueField: 'divisiId',
                    emptyText: 'Pilih Divisi',
                    allowBlank: false,
                    matchFieldWidth: false,
                    listConfig: {
                        minWidth: 185
                    },
                   listeners: {
                       'afterrender': function(cmb, rec, opt) {
                           cmb.getStore().load();
                           cmb.setValue(parseInt(USER_DIVISI));
                           cmb.setReadOnly(true);
                       },
                       'change': function(cmb, rec, opt){
                           var myVal = cmb.getValue(),
                               ruanganStore = this.up('form').getForm().findField('ruangan').getStore(), 
                               filterCollection = [];

                           this.up('form').getForm().findField('ruangan').setReadOnly(false);
                           
                           var statusFilter = new Ext.util.Filter({
                               property: 'cabang_id',
                               value: CABANG_ID
                           });
                           filterCollection.push(statusFilter);

                           var statusFilter = new Ext.util.Filter({
                               property: 'divisi_id',
                               value: myVal
                           });
                           filterCollection.push(statusFilter);
                   
                           ruanganStore.clearFilter(true);
                           ruanganStore.filter(filterCollection);
                       }
                   }
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Ruangan ',
                    name: 'ruangan',
                    triggerAction: 'all',
                    hideTrigger: false,
                    queryMode: 'remote',
                    minChars: 2,
                    
                    store: 'dvtxbrterima.DivisiRuanganStore',
                    displayField: 'ruangName',
                    valueField: 'id',
                    emptyText: 'Pilih Ruangan',
                    allowBlank: true,
                    readOnly: true,
                    matchFieldWidth: false,
                    listConfig: {
                        minWidth: 185
                    },
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Barang ',
                    name: 'pengBarang',
                    allowBlank: false,
                    readOnly: true,
                    triggerAction: 'query',
                    hideTrigger: true,
                    mode: 'remote',
                    minChars: 2,
                    store: 'dvtxbrterima.ItemStore',
                    displayField: 'itemName',
                    valueField: 'id',
                    forceSelection: true,
                    valueNotFoundText: 'Tidak ada barang',
                    emptyText: 'ketik nama barang',
                    matchFieldWidth: false,
                    listConfig: {
                        shadow: 'side',
                        minWidth: 185
                    }
                },
                {
                    xtype: 'numberfield',
                    fieldLabel: 'Qty. ',
                    hideTrigger: true,
                    readOnly: true,
                    name: 'jumlah',
                    allowBlank: false,
                   listeners:{
                       'change' : function() {
                           if(this.getValue() !== 0) {
                               this.up('form').down('#pengDivBarangMasuk').enable();
                           }
                       }
                   }
                },
                {
                    xtype: 'numberfield',
                    fieldLabel: 'Qty. Old ',
                    hideTrigger: true,
                    name: 'jumlahOld',
                    allowBlank: false,
                    hidden: true
                },
               
            ]
        });

        me.callParent(arguments);
    }
});

/* End of file reservasiForm.js */
/* Location: ./assets/js/app/view/reservasi/reservasiForm.js */