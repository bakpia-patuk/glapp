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
                    'qtyKeluar' => $row->stl_qtylast,
                    'qtyOld' => $row->stl_barangqty,
                    'tglEd' => $row->stl_baranged,
                    'noBarcode' => $row->stl_barcode,
                    'simpanStatus' => $row->simpan_status
                );
            }
        }

        if ($result) {
            echo json_encode(array('success' => 'true', 'data' => $listpo, 'message' => 'Daftar semua No Lot'));
        } else {
            echo json_encode(array('success' => 'true', 'data' => $listpo, 'message' => 'Tidak ada data No LOT'));
        }
    }

    public function set_itemdivbk() {
        $id_minta = $this->input->post('id_minta');
        $id_ruang = $this->input->post('id_ruang');
        $id_barang = $this->input->post('id_barang');
        $id_lot = $this->input->post('id_lot');
        $jumlah_out = $this->input->post('jumlah_out');
        $id_lot = explode("`",$id_lot);
        $jumlah_out = explode("`",$jumlah_out);
        for($i=0;$i<sizeof($id_lot);$i++){
            $jumlah_barang = $this->Dv_txbrkeluar_model->get_last_stockdivlot($id_barang,$id_ruang,$id_lot[$i]);
            if($jumlah_barang<$jumlah_out[$i]){
                echo json_encode(array('success' => 'false', 'data' => NULL, 'message' => 'Barang di lot tersebut tidak mencukupi'));
                return;
            }


        }

        $record=array();
        $record[] = array('field' => 'pengdiv_id', 'param' => 'where', 'operator' => '', 'value' => $id_minta);
        $record[] = array('field' => 'barang_id', 'param' => 'where', 'operator' => '', 'value' => $id_barang);
        $data_permintaan = $this->Dv_txbrkeluar_model->get($record,NULL,'trx_pengdivisi_detail');

    }

}