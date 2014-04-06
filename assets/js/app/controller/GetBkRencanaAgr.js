/**
 * @author Isht Ae, Coepoe
 **/

Ext.define('GlApp.controller.GetBkRencanaAgr', {
    extend: 'GlApp.controller.Base',
    models: [
    ],
    stores: [
        'bkrencanaagr.MaStoreTree',
        'bkrencanaagr.MaNonStoreTree',
        'bkrencanaagr.CabangStore',
        'bkrencanaagr.GrkBkStore',
        'bkrencanaagr.AkunHeaderStore',
        'bkrencanaagr.GrkAkunStore',
        'bkrencanaagr.ListAkunGkStore'
    ],
    views: [
        'bkrencanaagr.GetBkRencanaAgr',
        'bkrencanaagr.BkRencanaAgrForm',
        'bkrencanaagr.BkRencanaAgrGrid',
        'bkrencanaagr.BkRencanaAgrNonGrid',
        'bkrencanaagr.BkGroupKpWin',
        'bkrencanaagr.BkListAkunWin'
    ],
    refs: [
        {ref: 'BkRencanaAgrTab', selector: '#bkrencanagrtab'},
        {ref: 'BkRencanaAgrForm', selector: '#bkrencanaagrform'},
        {ref: 'BkRencanaAgrGrid', selector: '#bkrencanaagrgrid'},
        {ref: 'BkRencanaAgrNonGrid', selector: '#bkrencanaagrnongrid'},
        {ref: 'BkGkGrid', selector: '#gridGk'},
        {ref: 'BkGkAkunGrid', selector: '#gridGkAkun'},
        {ref: 'BkheaderAkunGrid', selector: '#gridHeaderAkun'}
    ],
    init: function() {
        this.control({
            '#BkRaSave': {
                click: function() {
                    var form = this.getBkRencanaAgrForm().getForm(),
                            store = this.getBkRencanaAgrNonGrid().getStore();
                    if (form.isValid()) {
                        var approval = this.getBkRencanaAgrForm().down('#app_status').getValue();
                        if (approval === 1) {
                            Ext.MessageBox.show({
                                title: 'INFO',
                                msg: 'Anda tidak bisa mengubah data yang sudah di approve',
                                buttons: Ext.MessageBox.OK,
                                icon: Ext.MessageBox.INFO
                            });
                            return;
                        }
                        this.ajaxReq('bk_rencanaagr/add_rencanaanggaran', form.getValues(), 1);
                    }
                }
            },
            '#BkRaNew': {
                click: function() {
                    var form = this.getBkRencanaAgrForm();
//
                    form.getForm().reset();
                    form.down('#isRujukan').disable();
                    form.down('#isRujukan').hide();
                    form.down('#agrplan_kprdetail').setReadOnly(true);
                    form.down('#agrplan_idtelisa').hide();
                }
            },
            '#BkRaDelete': {
                click: function() {
                    var form = this.getBkRencanaAgrForm();
                    if (form.down('#id').getValue() === "0") {
                        Ext.Msg.alert('Info', 'Pilih Anggaran Non Supplier yang akan di hapus');
                        return;
                    }

                    if (form.down('#app_status').getValue() === "1") {
                        Ext.Msg.alert('Info', 'Anda tidak bisa menghapus anggaran yang sudah di Approve');
                        return;
                    }

                    this.ajaxReq('bk_rencanaagr/delete_rencanaagr', form.getValues(), 2);
                }
            },
            '#bkrencanaagrnongrid': {
                itemclick: function() {
                    var tree = this.getBkRencanaAgrNonGrid(),
                            sel = tree.getSelectionModel().getSelection();
                    var form = this.getBkRencanaAgrForm().getForm(),
                            rec = sel[0];
                    if (sel) {
                        form.loadRecord(rec);
                    }
                }
            },
            '#setAkunGk': {
                click: function() {
                    var grid = this.getBkGkGrid(),
                            sel = grid.getSelectionModel().getSelection();
                    if (!sel.length) {
                        Ext.Msg.alert('Warning', 'Select Group Keperluan First');
                        return;
                    }
                    var win = Ext.widget('bkrencanaagr.bklistakunwin');
                }
            },
            '#setAkunKp': {
                click: function() {
                    var grid = this.getBkheaderAkunGrid(),
                            sel = grid.getSelectionModel().getSelection();
                    if (!sel.length) {
                        Ext.Msg.alert('Warning', 'Pilih Header Akun Group');
                        return;
                    }

                    var data = '';
                    for (i = 0; i < sel.length; i++) {
                        data = data + sel[i].get('akun_id') + '-';
                    }

                    var gd = this.getBkGkGrid(),
                            sel = gd.getSelectionModel().getSelection();

                    var params = {
                        idForm: 'mintabayar',
                        idPerlu: sel[0].get('id'),
                        data: data
                    };
                    this.ajaxReq('bk_rencanaagr/set_akungr', params, 2);
                }
            },
            '#gridGk': {
                selectionchange: function(m, r) {
                    var grid = this.getBkGkAkunGrid();

                    if (r[0]) {
                        grid.getStore().clearFilter(true);
                        grid.getStore().filter('kp_id', r[0].get('id'));
                    }
                }
            }
        });
    },
    onSuccess: function(resp, idForm) {
        var form = this.getBkRencanaAgrForm(),
                tabs = this.getBkRencanaAgrTab(),
                gridPo = this.getBkRencanaAgrNonGrid(),
                storeMa = gridPo.store;
        if (idForm === 1) {
            form.getForm().reset();
            tabs.setActiveTab(1);
            storeMa.setRootNode({idCabang: '0'});
            form.down('#isRujukan').disable();
            form.down('#isRujukan').hide();
            form.down('#agrplan_kprdetail').setReadOnly(true);
            form.down('#agrplan_idtelisa').hide();
            form.down('#agrplan_from').setValue(resp.data.tgl_dari);
            form.down('#agrplan_to').setValue(resp.data.tgl_ke);
            form.down('#agrplan_divisi').setValue(parseInt(resp.data.divisi));

            form.down('#trx_no').hide();
            form.down('#trx_no').disable();
            form.down('#trx_trfbank').disable();
            form.down('#trx_trfnama').disable();
            form.down('#trx_trfbank').hide();
            form.down('#trx_trfnama').hide();
        }
    },
    onFailure: function(resp, idForm) {
        Ext.MessageBox.show({
            title: resp.title,
            msg: resp.msg,
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.ERROR
        });
    }
});
/* End of file SystemMenu.js */
/* Location: ./assets/js/app/controller/SystemMenu.js */