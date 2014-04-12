<?php

/**
 * Description of data_model
 *
 * @author Azelia
 */
if (!defined('BASEPATH')) {
    exit('No direct script access allowed');
}

class Dv_txbrterima extends Auth_Controller {

    function __construct() {
        parent::__construct();
        $this->load->model('Dv_txbrkeluar_model');
        $this->Dv_txbrkeluar_model->cms_db = $this->load->database('outgoing', TRUE);
    }
    public function save() {
        $id_minta = $this->input->post('id');
        $id_ruang = $this->input->post('idRuang');
        $id_barang = $this->input->post('barangCabangId');
        $total_jumlah = $this->input->post('jumlah');

        $data_permintaan_barang = $this->Dv_txbrkeluar_model->get_detail('id',$id_minta,'trx_pengdivisi');

        $record=array();
        $record[] = array('field' => 'divisi_id', 'param' => 'where', 'operator' => '', 'value' => $this->user->divisi_id);
        $record[] = array('field' => 'cabang_id', 'param' => 'where', 'operator' => '', 'value' => $this->user->cabang_id);
        $record[] = array('field' => 'ruang_id', 'param' => 'where', 'operator' => '', 'value' => $id_ruang);
        $record[] = array('field' => 'ruang_nama', 'param' => 'where', 'operator' => '', 'value' => 'R. GUDANG');
        $is_gudang = $this->Dv_txbrkeluar_model->get($record,NULL,'dt_ruang');

        $jumlah_barang = $this->Dv_txbrkeluar_model->get_last_stockdiv($id_barang,$id_ruang);
        $data = array();
        $data['id_ruang']=$id_ruang;
        $data['id_cabang']=$this->user->cabang_id;
        $data['id_divisi']=$this->user->divisi_id;
        $data['id_barang']=$id_barang ;
        $data['jmlh_stok']=$total_jumlah;
        $data['trxreftype']='mintadiv';
        $data['jenis_trx']=1;
        $data['trx_stok']=$id_minta;
        
        $data['simpan_status']=1;
        $id_div_keluar=$this->Dv_txbrkeluar_model->insert($data, 'trx_stock_div');

        if($is_gudang){
            $jumlah_barang = $this->Dv_txbrkeluar_model->get_last_stock($id_barang,$id_ruang);
            $data = array();
            $data['stk_cabangid']=$this->user->cabang_id;
            $data['stk_divisiid']=$this->user->divisi_id;
            $data['stk_ruangid']=$id_ruang;
            $data['stk_usercreate']=$this->user->id;
            $data['stk_trxtype']=1 ;
            $data['stk_trxreftype']='mintadiv';
            $data['stk_trxref']=$id_minta;
            $data['stk_barangid']=$id_barang;
            $data['stk_qty']=$total_jumlah;
            $data['stk_qtylast']=$jumlah_barang+$total_jumlah;
            
            $data['simpan_status']=1;
            $this->Dv_txbrkeluar_model->insert($data, 'trx_stock');
            $opts = array();
            $opts[] = array('field' => 'id', 'param' => 'where', 'operator' => '', 'value' => $id_barang);

            $data_item_cabang = $this->Dv_txbrkeluar_model->get($opts,NULL,'dt_item_cabang');
            $data_item = array(
                'stock_last'=>$data_item_cabang->stock_last+$total_jumlah
            );
            $this->Dv_txbrkeluar_model->update($data_item, $opts, NULL, 'dt_item_cabang');
        }

        $opts = array();
        $opts[] = array('field' => 'pengdiv_id', 'param' => 'where', 'operator' => '', 'value' => $id_minta);
        $opts[] = array('field' => 'barang_id', 'param' => 'where', 'operator' => '', 'value' => $id_barang);
        $data_item = array(
            'barang_qty_terima' => $total_jumlah,
            'user_terima' =>$this->user->id,
            'terima_status' => 1,
            'tgl_terima' => mdate("%Y-%m-%d", now()),
            
        );
        $this->Dv_txbrkeluar_model->update($data_item, $opts, NULL, 'trx_pengdivisi_detail');

        $opts = array();
        $opts[] = array('field' => 'pengdiv_id', 'param' => 'where', 'operator' => '', 'value' => $id_minta);
        
        $opts[] = array('field' => 'terima_status', 'param' => 'where', 'operator' => '', 'value' => 0);
        $param_banyak_data = $this->Dv_txbrkeluar_model->get($opts, NULL, 'trx_pengdivisi_detail');
        if(!$param_banyak_data){
            $opts = array();
            $opts[] = array('field' => 'id', 'param' => 'where', 'operator' => '', 'value' => $id_minta);
            $data_item = array(
                'terima_status'=>1,
            );
            $this->Dv_txbrkeluar_model->update($data_item, $opts, NULL, 'trx_pengdivisi');
        }
        echo json_encode(array('success' => 'true', 'data' => NULL, 'msg' => 'Data barang berhasil tersimpan'));
        return;
        
    }
   
}