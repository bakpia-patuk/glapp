<?php

/**
 * Description of data_model
 *
 * @author Azelia
 */
if (!defined('BASEPATH')) {
    exit('No direct script access allowed');
}

class Dv_txbrkeluar extends Auth_Controller {

    function __construct() {
        parent::__construct();
        $this->load->model('Dv_txbrkeluar_model');
        $this->Dv_txbrkeluar_model->cms_db = $this->load->database('outgoing', TRUE);
    }
    public function pengdiv_bk() {
        $user = $this->ion_auth->user()->row();
        $id_barang = $this->input->post('pengBarang');
        $qty_kirim = $this->input->post('jumlah');
        $ruang_keluar = $this->input->post('idRuang');
        $record[] = array('field' => 'mi_id', 'param' => 'where', 'operator' => '', 'value' => $id_barang);
        $record[] = array('field' => 'cabang_id', 'param' => 'where', 'operator' => '', 'value' => $user->cabang_id);
        
        $det_barang = $this->Dv_txbrkeluar_model->get($record, null, 'dt_item_cabang' );
        $checking_stok = $this->Dv_txbrkeluar_model->get_last_stockdiv($det_barang->id, $ruang_keluar);

        if ($checking_stok > 0) {
            if ($qty_kirim > $checking_stok) {
                echo json_encode(array('success' => 'false', 'title' => 'Error', 'msg' => 'Jumlah yang anda keluarkan melebihi jumlah stock'));
                return;
            } else {
                $stok_max_min = $this->Dv_txbrkeluar_model->get_detail('id', $det_barang->id, 'dt_item_cabang'); //CEK STOK MAX MIN

                if ($checking_stok < $stok_max_min->stock_min) {
                    echo json_encode(array('success' => 'false', 'title' => 'Error', 'msg' => 'Barang stock anda di bawah stok minimal'));
                    return;
                } else {
                    echo json_encode(array('success' => 'true', 'title' => 'Info', 'msg' => 'Barang Ada'));
                }
            }
        } else {
            echo json_encode(array('success' => 'false', 'title' => 'Error', 'msg' => 'Anda tidak mempunyai stock untuk dikeluarkan'));
        }
    }
    public function getsdiv_lot() {
        $user = $this->ion_auth->user()->row();
        $records = isset($_GET['filter']);
        $record = array();
        $listpo = array();

        if ($records) {
            $raw_record = json_decode($_GET['filter'], true);
            foreach ($raw_record as $key) {
                $field = $this->property_reader($key['property']);
                $param = $this->param_reader($key['property']);
                $op = $this->operator_reader($key['value']);
                $val = $this->value_reader($key['value']);

                $record[] = array('field' => $field, 'param' => $param, 'operator' => $op, 'value' => $val);
            }
        }

        $result = $this->Dv_txbrkeluar_model->getsdiv_lot($record, NULL, 'trx_stock_lotdiv',$user->cabang_id);

        if ($result != NULL) {
            foreach ($result as $row) {
            	$param_barang = $this->Dv_txbrkeluar_model->get_detail('id', $row->stl_barangid, 'dt_item_cabang');
            	$param_barang = $this->Dv_txbrkeluar_model->get_detail('id', $param_barang->mi_id, 'dt_item');
                $listpo[] = array(
                    'id' => $row->id,
                    'noLot' => $row->stl_nolot,
                    'idRuang' => $row->stl_ruangid,
                    'idBarang' => $row->stl_barangid,
                    'namaBarang' => $param_barang->mi_name,
                    'qtyLot' => $row->stl_barangqty,
                    'qtyKeluar' => $row->stl_barangqty,
                    'qtyOld' => $row->stl_barangqty,
                    'tglEd' => $row->stl_baranged,
                    'noBarcode' => $row->stl_barcode,
                    'simpanStatus' => $row->simpan_status
                );
            }
        }

        if ($result) {
            echo json_encode(array('success' => 'true', 'data' => $listpo, 'msg' => 'Daftar semua No Lot'));
        } else {
            echo json_encode(array('success' => 'true', 'data' => $listpo, 'msg' => 'Tidak ada data No LOT'));
        }
    }
    public function save() {
        $id_minta = $this->input->post('id');
        $id_ruang = $this->input->post('idRuang');
        $id_barang = $this->input->post('barangCabangId');
        $total_jumlah = $this->input->post('jumlah');

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
        $data['jenis_trx']=0;
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
            $data['stk_trxtype']=0 ;
            $data['stk_trxreftype']='mintadiv';
            $data['stk_trxref']=$id_minta;
            $data['stk_barangid']=$id_barang;
            $data['stk_qty']=$total_jumlah;
            $data['stk_qtylast']=$jumlah_barang-$total_jumlah;
            
            $data['simpan_status']=1;
            $this->Dv_txbrkeluar_model->insert($data, 'trx_stock');
            $opts = array();
            $opts[] = array('field' => 'id', 'param' => 'where', 'operator' => '', 'value' => $id_barang);

            $data_item_cabang = $this->Dv_txbrkeluar_model->get($opts,NULL,'dt_item_cabang');
            $data_item = array(
                'stock_last'=>$data_item_cabang->stock_last-$total_jumlah
            );
            $this->Dv_txbrkeluar_model->update($data_item, $opts, NULL, 'dt_item_cabang');
        }

        $opts = array();
        $opts[] = array('field' => 'pengdiv_id', 'param' => 'where', 'operator' => '', 'value' => $id_minta);
        $opts[] = array('field' => 'barang_id', 'param' => 'where', 'operator' => '', 'value' => $id_barang);
        $data_item = array(
            'barang_qty_kirim' => $total_jumlah,
            'user_kirim' =>$this->user->id,
            'kirim_status' => 1,
            'tgl_kirim' => mdate("%Y-%m-%d", now()),
            
        );
        $this->Dv_txbrkeluar_model->update($data_item, $opts, NULL, 'trx_pengdivisi_detail');

        $opts = array();
        $opts[] = array('field' => 'pengdiv_id', 'param' => 'where', 'operator' => '', 'value' => $id_minta);
        
        $opts[] = array('field' => 'kirim_status', 'param' => 'where', 'operator' => '', 'value' => 0);
        $param_banyak_data = $this->Dv_txbrkeluar_model->get($opts, NULL, 'trx_pengdivisi_detail');
        if(!$param_banyak_data){
            $opts = array();
            $opts[] = array('field' => 'id', 'param' => 'where', 'operator' => '', 'value' => $id_minta);
            $data_item = array(
                'kirim_status'=>1,
            );
            $this->Dv_txbrkeluar_model->update($data_item, $opts, NULL, 'trx_pengdivisi');
        }
        echo json_encode(array('success' => 'true', 'data' => NULL, 'msg' => 'Data barang berhasil tersimpan'));
        return;
    }
    public function set_itemdivbk() {
        $id_minta = $this->input->post('id_minta');
        $id_ruang = $this->input->post('id_ruang');
        $id_barang = $this->input->post('id_barang');
        $id_lot = $this->input->post('id_lot');
        $jumlah_out = $this->input->post('jumlah_out');
        $id_lot = explode("`",$id_lot);
        $jumlah_out = explode("`",$jumlah_out);
        $total_jumlah = 0;
        for($i=0;$i<sizeof($id_lot)-1;$i++){
            
            $total_jumlah +=$jumlah_out[$i];


        }

        $record=array();
        $record[] = array('field' => 'pengdiv_id', 'param' => 'where', 'operator' => '', 'value' => $id_minta);
        $record[] = array('field' => 'barang_id', 'param' => 'where', 'operator' => '', 'value' => $id_barang);
        $data_permintaan = $this->Dv_txbrkeluar_model->get($record,NULL,'trx_pengdivisi_detail');
        $jumlah_diminta = $data_permintaan->barang_qty_minta - $data_permintaan->barang_qty_terima;
        if($total_jumlah>$jumlah_diminta){
            echo json_encode(array('success' => 'false', 'data' => NULL, 'msg' => 'Barang yang akan dikeluarkan melebihi jumlah yang diminta'));
            return;
        }

        if($total_jumlah<$jumlah_diminta){
            echo json_encode(array('success' => 'false', 'data' => NULL, 'msg' => 'Barang yang akan dikirim kurang dari jumlah yang diminta'));
            return;
        }

        $record=array();
        $record[] = array('field' => 'divisi_id', 'param' => 'where', 'operator' => '', 'value' => $this->user->divisi_id);
        $record[] = array('field' => 'cabang_id', 'param' => 'where', 'operator' => '', 'value' => $this->user->cabang_id);
        $record[] = array('field' => 'ruang_id', 'param' => 'where', 'operator' => '', 'value' => $id_ruang);
        $record[] = array('field' => 'ruang_nama', 'param' => 'where', 'operator' => '', 'value' => 'R. GUDANG');
        $is_gudang = $this->Dv_txbrkeluar_model->get($record,NULL,'dt_ruang');

        $data_permintaan_barang = $this->Dv_txbrkeluar_model->get_detail('id',$id_minta,'trx_pengdivisi');

        $record=array();
        $record[] = array('field' => 'divisi_id', 'param' => 'where', 'operator' => '', 'value' => $data_permintaan_barang->pengdiv_divisi);
        $record[] = array('field' => 'cabang_id', 'param' => 'where', 'operator' => '', 'value' => $data_permintaan_barang->pengdiv_cabang);
        $record[] = array('field' => 'ruang_id', 'param' => 'where', 'operator' => '', 'value' => $data_permintaan_barang->pengdiv_divruang);
        $record[] = array('field' => 'ruang_nama', 'param' => 'where', 'operator' => '', 'value' => 'R. GUDANG');
        $is_gudang2 = $this->Dv_txbrkeluar_model->get($record,NULL,'dt_ruang');

        for($i=0;$i<sizeof($id_lot)-1;$i++){
            
            $record=array();
            
            $record[] = array('field' => 'stl_cabangid', 'param' => 'where', 'operator' => '', 'value' => $this->user->cabang_id);
            $record[] = array('field' => 'stl_nolot', 'param' => 'where', 'operator' => '', 'value' => $id_lot[$i]);
            $data_lot = $this->Dv_txbrkeluar_model->get($record,NULL,'trx_stock_lotdiv');
            //var_dump($data_lot);
            $jumlah_barang = $this->Dv_txbrkeluar_model->get_last_stockdivlot($id_barang,$id_ruang,$id_lot[$i]);
            if($jumlah_barang<$jumlah_out[$i]){
                echo json_encode(array('success' => 'false', 'data' => NULL, 'msg' => 'Barang di lot tersebut tidak mencukupi'));
                return;
            }
            $data = array();
            $data['stl_cabangid']=$this->user->cabang_id;
            $data['stl_divisiid']=$this->user->divisi_id;
            $data['stl_ruangid']=$id_ruang;
            $data['stl_usercreate']=$this->user->id;
            $data['stl_barangid']=$id_barang ;
            $data['stl_nolot']=$id_lot[$i];
            $data['stl_qty']=$jumlah_out[$i];
            $data['stl_qtylast']=$jumlah_barang-$jumlah_out[$i];
            $data['stl_baranged']=$data_lot->stl_baranged;
            $data['stl_type']=0;
            $data['stk_trxreftype']='mintadiv';
            $data['stk_trxref']=$id_minta;
            $data['stl_barcode']=$data_lot->stl_barcode;
            $data['simpan_status']=1;
            $this->Dv_txbrkeluar_model->insert($data, 'trx_stock_lotdiv');


            if($is_gudang){
                $jumlah_barang = $this->Dv_txbrkeluar_model->get_last_stocklot($id_barang,$id_ruang,$id_lot[$i]);
                $data = array();
                $data['stl_cabangid']=$this->user->cabang_id;
                $data['stl_divisiid']=$this->user->divisi_id;
                $data['stl_ruangid']=$id_ruang;
                $data['stl_usercreate']=$this->user->id;
                $data['stl_barangid']=$id_barang ;
                $data['stl_nolot']=$id_lot[$i];
                $data['stl_qty']=$jumlah_out[$i];
                $data['stl_qtylast']=$jumlah_barang-$jumlah_out[$i];
                $data['stl_baranged']=$data_lot->stl_baranged;
                $data['stl_type']=0;
                $data['stk_trxreftype']='mintadiv';
                $data['stk_trxref']=$id_minta;
                $data['stl_barcode']=$data_lot->stl_barcode;
                $data['simpan_status']=1;
                $this->Dv_txbrkeluar_model->insert($data, 'trx_stock_lot');
            }
            
            $jumlah_barang = $this->Dv_txbrkeluar_model->get_last_stockdivlot($id_barang,$data_permintaan_barang->pengdiv_divruang,$id_lot[$i]);
            $data = array();
            $data['stl_cabangid']=$data_permintaan_barang->pengdiv_cabang;
            $data['stl_divisiid']=$data_permintaan_barang->pengdiv_divisi;
            $data['stl_ruangid']=$data_permintaan_barang->pengdiv_divruang;
            $data['stl_usercreate']=$this->user->id;
            $data['stl_barangid']=$id_barang ;
            $data['stl_nolot']=$id_lot[$i];
            $data['stl_qty']=$jumlah_out[$i];
            $data['stl_qtylast']=$jumlah_barang+$jumlah_out[$i];
            $data['stl_baranged']=$data_lot->stl_baranged;
            $data['stl_type']=1;
            $data['stk_trxreftype']='mintadiv';
            $data['stk_trxref']=$id_minta;
            $data['stl_barcode']=$data_lot->stl_barcode;
            $data['simpan_status']=1;
            $this->Dv_txbrkeluar_model->insert($data, 'trx_stock_lotdiv');

            if($is_gudang2){
                $jumlah_barang = $this->Dv_txbrkeluar_model->get_last_stocklot($id_barang,$id_ruang,$id_lot[$i]);
                $data = array();
                $data['stl_cabangid']=$data_permintaan_barang->pengdiv_cabang;
                $data['stl_divisiid']=$data_permintaan_barang->pengdiv_divisi;
                $data['stl_ruangid']=$data_permintaan_barang->pengdiv_divruang;
                $data['stl_usercreate']=$this->user->id;
                $data['stl_barangid']=$id_barang ;
                $data['stl_nolot']=$id_lot[$i];
                $data['stl_qty']=$jumlah_out[$i];
                $data['stl_qtylast']=$jumlah_barang+$jumlah_out[$i];
                $data['stl_baranged']=$data_lot->stl_baranged;
                $data['stl_type']=1;
                $data['stk_trxreftype']='mintadiv';
                $data['stk_trxref']=$id_minta;
                $data['stl_barcode']=$data_lot->stl_barcode;
                $data['simpan_status']=1;
                $this->Dv_txbrkeluar_model->insert($data, 'trx_stock_lot');
            }

        }

        $jumlah_barang = $this->Dv_txbrkeluar_model->get_last_stockdiv($id_barang,$id_ruang);
        $data = array();
        $data['id_ruang']=$id_ruang;
        $data['id_cabang']=$this->user->cabang_id;
        $data['id_divisi']=$this->user->divisi_id;
        $data['id_barang']=$id_barang ;
        $data['jmlh_stok']=$total_jumlah;
        $data['trxreftype']='mintadiv';
        $data['jenis_trx']=0;
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
            $data['stk_trxtype']=0 ;
            $data['stk_trxreftype']='mintadiv';
            $data['stk_trxref']=$id_minta;
            $data['stk_barangid']=$id_barang;
            $data['stk_qty']=$total_jumlah;
            $data['stk_qtylast']=$jumlah_barang-$total_jumlah;
            
            $data['simpan_status']=1;
            $this->Dv_txbrkeluar_model->insert($data, 'trx_stock');
            $opts = array();
            $opts[] = array('field' => 'id', 'param' => 'where', 'operator' => '', 'value' => $id_barang);

            $data_item_cabang = $this->Dv_txbrkeluar_model->get($opts,NULL,'dt_item_cabang');
            $data_item = array(
                'stock_last'=>$data_item_cabang->stock_last-$total_jumlah
            );
            $this->Dv_txbrkeluar_model->update($data_item, $opts, NULL, 'dt_item_cabang');
        }
        $opts = array();
        $opts[] = array('field' => 'pengdiv_id', 'param' => 'where', 'operator' => '', 'value' => $id_minta);
        $opts[] = array('field' => 'barang_id', 'param' => 'where', 'operator' => '', 'value' => $id_barang);
        $data_item = array(
            'barang_qty_kirim' => $total_jumlah,
            'user_kirim' =>$this->user->id,
            'kirim_status' => 1,
            'tgl_kirim' => mdate("%Y-%m-%d", now()),
            'div_no_kirim' => 'DIVBK/' . $id_ruang . '/' . mdate("%d%m%y", now()) . '/' . sprintf('%06d', $id_div_keluar),
        );
        $this->Dv_txbrkeluar_model->update($data_item, $opts, NULL, 'trx_pengdivisi_detail');

        $opts = array();
        $opts[] = array('field' => 'pengdiv_id', 'param' => 'where', 'operator' => '', 'value' => $id_minta);
        
        $opts[] = array('field' => 'kirim_status', 'param' => 'where', 'operator' => '', 'value' => 0);
        $param_banyak_data = $this->Dv_txbrkeluar_model->get($opts, NULL, 'trx_pengdivisi_detail');
        if(!$param_banyak_data){
            $opts = array();
            $opts[] = array('field' => 'id', 'param' => 'where', 'operator' => '', 'value' => $id_minta);
            $data_item = array(
                'kirim_status'=>1,
            );
            $this->Dv_txbrkeluar_model->update($data_item, $opts, NULL, 'trx_pengdivisi');
        }
        

        echo json_encode(array('success' => 'true', 'data' => NULL, 'msg' => 'Data barang berhasil tersimpan'));
        return;
    }
    public function save_random(){
        $id_minta = $this->input->post('id');
        $id_ruang = $this->input->post('idRuang');
        $id_barang = $this->input->post('barangCabangId');
        $total_jumlah = $this->input->post('jumlah');
        $id_lot = array();
        $jumlah_out = array();
        $record[] = array('field' => 'stl_ruangid', 'param' => 'where', 'operator' => '', 'value' => $id_ruang);
        $record[] = array('field' => 'stl_barangid', 'param' => 'where', 'operator' => '', 'value' => $id_barang);
        $result = $this->Dv_txbrkeluar_model->getsdiv_lot($record, NULL, 'trx_stock_lotdiv',$this->user->cabang_id);
        $sisa = $total_jumlah;
        if ($result != NULL) {
            foreach ($result as $row) {
                 
                 $param_jumlah = $row->stl_barangqty;
                 $id_lot[]=$row->stl_nolot;
                 if($param_jumlah==$sisa){
                    
                    $jumlah_out[]=$row->stl_barangqty;
                    break;
                 }
                 else if($param_jumlah<$sisa){
                    $jumlah_out[]=$row->stl_barangqty;
                    $sisa-=$row->stl_barangqty;
                 }
                 else{
                    $jumlah_out[]=$sisa;
                    break;
                 }
                 
                 
            }
        }

        $record=array();
        $record[] = array('field' => 'pengdiv_id', 'param' => 'where', 'operator' => '', 'value' => $id_minta);
        $record[] = array('field' => 'barang_id', 'param' => 'where', 'operator' => '', 'value' => $id_barang);
        $data_permintaan = $this->Dv_txbrkeluar_model->get($record,NULL,'trx_pengdivisi_detail');
        $jumlah_diminta = $data_permintaan->barang_qty_minta - $data_permintaan->barang_qty_terima;
        if($total_jumlah>$jumlah_diminta){
            echo json_encode(array('success' => 'false', 'data' => NULL, 'msg' => 'Barang yang akan dikeluarkan melebihi jumlah yang diminta'));
            return;
        }

        if($total_jumlah<$jumlah_diminta){
            echo json_encode(array('success' => 'false', 'data' => NULL, 'msg' => 'Barang yang akan dikirim kurang dari jumlah yang diminta'));
            return;
        }

        $record=array();
        $record[] = array('field' => 'divisi_id', 'param' => 'where', 'operator' => '', 'value' => $this->user->divisi_id);
        $record[] = array('field' => 'cabang_id', 'param' => 'where', 'operator' => '', 'value' => $this->user->cabang_id);
        $record[] = array('field' => 'ruang_id', 'param' => 'where', 'operator' => '', 'value' => $id_ruang);
        $record[] = array('field' => 'ruang_nama', 'param' => 'where', 'operator' => '', 'value' => 'R. GUDANG');
        $is_gudang = $this->Dv_txbrkeluar_model->get($record,NULL,'dt_ruang');

        $data_permintaan_barang = $this->Dv_txbrkeluar_model->get_detail('id',$id_minta,'trx_pengdivisi');

        $record=array();
        $record[] = array('field' => 'divisi_id', 'param' => 'where', 'operator' => '', 'value' => $data_permintaan_barang->pengdiv_divisi);
        $record[] = array('field' => 'cabang_id', 'param' => 'where', 'operator' => '', 'value' => $data_permintaan_barang->pengdiv_cabang);
        $record[] = array('field' => 'ruang_id', 'param' => 'where', 'operator' => '', 'value' => $data_permintaan_barang->pengdiv_divruang);
        $record[] = array('field' => 'ruang_nama', 'param' => 'where', 'operator' => '', 'value' => 'R. GUDANG');
        $is_gudang2 = $this->Dv_txbrkeluar_model->get($record,NULL,'dt_ruang');

        for($i=0;$i<sizeof($id_lot);$i++){
            
            $record=array();
            
            $record[] = array('field' => 'stl_cabangid', 'param' => 'where', 'operator' => '', 'value' => $this->user->cabang_id);
            $record[] = array('field' => 'stl_nolot', 'param' => 'where', 'operator' => '', 'value' => $id_lot[$i]);
            $data_lot = $this->Dv_txbrkeluar_model->get($record,NULL,'trx_stock_lotdiv');
            //var_dump($data_lot);
            $jumlah_barang = $this->Dv_txbrkeluar_model->get_last_stockdivlot($id_barang,$id_ruang,$id_lot[$i]);
            if($jumlah_barang<$jumlah_out[$i]){
                echo json_encode(array('success' => 'false', 'data' => NULL, 'msg' => 'Barang di lot tersebut tidak mencukupi'));
                return;
            }
            $data = array();
            $data['stl_cabangid']=$this->user->cabang_id;
            $data['stl_divisiid']=$this->user->divisi_id;
            $data['stl_ruangid']=$id_ruang;
            $data['stl_usercreate']=$this->user->id;
            $data['stl_barangid']=$id_barang ;
            $data['stl_nolot']=$id_lot[$i];
            $data['stl_qty']=$jumlah_out[$i];
            $data['stl_qtylast']=$jumlah_barang-$jumlah_out[$i];
            $data['stl_baranged']=$data_lot->stl_baranged;
            $data['stl_type']=0;
            $data['stk_trxreftype']='mintadiv';
            $data['stk_trxref']=$id_minta;
            $data['stl_barcode']=$data_lot->stl_barcode;
            $data['simpan_status']=1;
            $this->Dv_txbrkeluar_model->insert($data, 'trx_stock_lotdiv');


            if($is_gudang){
                $jumlah_barang = $this->Dv_txbrkeluar_model->get_last_stocklot($id_barang,$id_ruang,$id_lot[$i]);
                $data = array();
                $data['stl_cabangid']=$this->user->cabang_id;
                $data['stl_divisiid']=$this->user->divisi_id;
                $data['stl_ruangid']=$id_ruang;
                $data['stl_usercreate']=$this->user->id;
                $data['stl_barangid']=$id_barang ;
                $data['stl_nolot']=$id_lot[$i];
                $data['stl_qty']=$jumlah_out[$i];
                $data['stl_qtylast']=$jumlah_barang-$jumlah_out[$i];
                $data['stl_baranged']=$data_lot->stl_baranged;
                $data['stl_type']=0;
                $data['stk_trxreftype']='mintadiv';
                $data['stk_trxref']=$id_minta;
                $data['stl_barcode']=$data_lot->stl_barcode;
                $data['simpan_status']=1;
                $this->Dv_txbrkeluar_model->insert($data, 'trx_stock_lot');
            }
            
            $jumlah_barang = $this->Dv_txbrkeluar_model->get_last_stockdivlot($id_barang,$data_permintaan_barang->pengdiv_divruang,$id_lot[$i]);
            $data = array();
            $data['stl_cabangid']=$data_permintaan_barang->pengdiv_cabang;
            $data['stl_divisiid']=$data_permintaan_barang->pengdiv_divisi;
            $data['stl_ruangid']=$data_permintaan_barang->pengdiv_divruang;
            $data['stl_usercreate']=$this->user->id;
            $data['stl_barangid']=$id_barang ;
            $data['stl_nolot']=$id_lot[$i];
            $data['stl_qty']=$jumlah_out[$i];
            $data['stl_qtylast']=$jumlah_barang+$jumlah_out[$i];
            $data['stl_baranged']=$data_lot->stl_baranged;
            $data['stl_type']=1;
            $data['stk_trxreftype']='mintadiv';
            $data['stk_trxref']=$id_minta;
            $data['stl_barcode']=$data_lot->stl_barcode;
            $data['simpan_status']=1;
            $this->Dv_txbrkeluar_model->insert($data, 'trx_stock_lotdiv');

            if($is_gudang2){
                $jumlah_barang = $this->Dv_txbrkeluar_model->get_last_stocklot($id_barang,$id_ruang,$id_lot[$i]);
                $data = array();
                $data['stl_cabangid']=$data_permintaan_barang->pengdiv_cabang;
                $data['stl_divisiid']=$data_permintaan_barang->pengdiv_divisi;
                $data['stl_ruangid']=$data_permintaan_barang->pengdiv_divruang;
                $data['stl_usercreate']=$this->user->id;
                $data['stl_barangid']=$id_barang ;
                $data['stl_nolot']=$id_lot[$i];
                $data['stl_qty']=$jumlah_out[$i];
                $data['stl_qtylast']=$jumlah_barang+$jumlah_out[$i];
                $data['stl_baranged']=$data_lot->stl_baranged;
                $data['stl_type']=1;
                $data['stk_trxreftype']='mintadiv';
                $data['stk_trxref']=$id_minta;
                $data['stl_barcode']=$data_lot->stl_barcode;
                $data['simpan_status']=1;
                $this->Dv_txbrkeluar_model->insert($data, 'trx_stock_lot');
            }

        }

        $jumlah_barang = $this->Dv_txbrkeluar_model->get_last_stockdiv($id_barang,$id_ruang);
        $data = array();
        $data['id_ruang']=$id_ruang;
        $data['id_cabang']=$this->user->cabang_id;
        $data['id_divisi']=$this->user->divisi_id;
        $data['id_barang']=$id_barang ;
        $data['jmlh_stok']=$total_jumlah;
        $data['trxreftype']='mintadiv';
        $data['jenis_trx']=0;
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
            $data['stk_trxtype']=0 ;
            $data['stk_trxreftype']='mintadiv';
            $data['stk_trxref']=$id_minta;
            $data['stk_barangid']=$id_barang;
            $data['stk_qty']=$total_jumlah;
            $data['stk_qtylast']=$jumlah_barang-$total_jumlah;
            
            $data['simpan_status']=1;
            $this->Dv_txbrkeluar_model->insert($data, 'trx_stock');
            $opts = array();
            $opts[] = array('field' => 'id', 'param' => 'where', 'operator' => '', 'value' => $id_barang);

            $data_item_cabang = $this->Dv_txbrkeluar_model->get($opts,NULL,'dt_item_cabang');
            $data_item = array(
                'stock_last'=>$data_item_cabang->stock_last-$total_jumlah
            );
            $this->Dv_txbrkeluar_model->update($data_item, $opts, NULL, 'dt_item_cabang');
        }
        $opts = array();
        $opts[] = array('field' => 'pengdiv_id', 'param' => 'where', 'operator' => '', 'value' => $id_minta);
        $opts[] = array('field' => 'barang_id', 'param' => 'where', 'operator' => '', 'value' => $id_barang);
        $data_item = array(
            'barang_qty_kirim' => $total_jumlah,
            'user_kirim' =>$this->user->id,
            'kirim_status' => 1,
            'tgl_kirim' => mdate("%Y-%m-%d", now()),
            'div_no_kirim' => 'DIVBK/' . $id_ruang . '/' . mdate("%d%m%y", now()) . '/' . sprintf('%06d', $id_div_keluar),
        );
        $this->Dv_txbrkeluar_model->update($data_item, $opts, NULL, 'trx_pengdivisi_detail');

        $opts = array();
        $opts[] = array('field' => 'pengdiv_id', 'param' => 'where', 'operator' => '', 'value' => $id_minta);
        
        $opts[] = array('field' => 'kirim_status', 'param' => 'where', 'operator' => '', 'value' => 0);
        $param_banyak_data = $this->Dv_txbrkeluar_model->get($opts, NULL, 'trx_pengdivisi_detail');
        if(!$param_banyak_data){
            $opts = array();
            $opts[] = array('field' => 'id', 'param' => 'where', 'operator' => '', 'value' => $id_minta);
            $data_item = array(
                'kirim_status'=>1,
            );
            $this->Dv_txbrkeluar_model->update($data_item, $opts, NULL, 'trx_pengdivisi');
        }
        

        echo json_encode(array('success' => 'true', 'data' => NULL, 'msg' => 'Data barang berhasil tersimpan'));
        return;
    }

}