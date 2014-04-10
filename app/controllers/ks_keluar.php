<?php

if (!defined('BASEPATH')) {
    exit('No direct script access allowed');
}

/**
 * Description of data_model
 *
 * @author Coepoe
 */
class Ks_keluar extends Auth_Controller {

    function __construct() {
        parent::__construct();
        $this->load->model('Kskeluar_model');
        $this->Kskeluar_model->cms_db = $this->load->database('outgoing', TRUE);
    }

    public function reset() {
        $insert = $this->input->post(NULL, TRUE);

        $filename = 'assets/ttd_tx/kkSign' . $insert['random_string'] . 'NULL_.png';

        if (file_exists($filename)) {
            unlink($filename);
        }

        clearstatcache();
        echo json_encode(array('success' => 'true', 'data' => NULL, 'title' => 'Info', 'msg' => 'Reset All Data'));
    }

    function trx_kas_list() {
        $records = $this->input->get('filter');
        $params = array();

        $params[] = array('field' => 'kas_type', 'param' => 'where', 'operator' => '', 'value' => 'kaskeluar');
        if ($records) {
            $raw_record = json_decode($records, true);
            $params = $this->generate_db_query($raw_record);
        }

        $result = $this->Kskeluar_model->kastrx_list($params, NULL);

        if ($result) {
            echo json_encode(array('success' => 'true', 'data' => $result, 'message' => 'Daftar semua Kas Masuk'));
        } else {
            echo json_encode(array('success' => 'true', 'data' => NULL, 'message' => 'Tidak ada data Kas Masuk'));
        }
    }

    // Faktur
    public function trx_faktur() {
        $records = $this->input->get('filter');
        $params = array();

        if ($records) {
            $raw_record = json_decode($records, true);
            $params = $this->generate_db_query($raw_record);
        }

        $params[] = array('field' => 'faktur_realstatus', 'param' => 'where', 'operator' => '', 'value' => 0);
        $params[] = array('field' => 'faktur_bayar', 'param' => 'where', 'operator' => '', 'value' => 2);
        $params[] = array('field' => 'faktur_cabang', 'param' => 'where', 'operator' => '', 'value' => $this->user->cabang_id);

        $result = $this->Kskeluar_model->gets($params, NULL, 'trx_faktur');
        $no = 0;

        if ($result != NULL) {
            echo json_encode(array('success' => 'true', 'data' => $result, 'message' => 'Daftar semua Faktur'));
        } else {
            echo json_encode(array('success' => 'true', 'data' => NULL, 'message' => 'Tidak ada data'));
        }
    }

    public function minta_kas_list() {
        $records = $this->input->get('filter');
        $params = array();

        if ($records) {
            $raw_record = json_decode($records, true);
            $params = $this->generate_db_query($raw_record);
        }

        $params[] = array('field' => 'cabang_id', 'param' => 'where', 'operator' => '', 'value' => $this->user->cabang_id);
        $params[] = array('field' => 'mkr_pemeriksaan', 'param' => 'where', 'operator' => '', 'value' => '0');
        $params[] = array('field' => 'trx_realisasi', 'param' => 'where', 'operator' => '', 'value' => 0);
        $params[] = array('field' => 'trx_realstatus', 'param' => 'where', 'operator' => '', 'value' => 0);

        $result = $this->Kskeluar_model->gets($params, NULL, 'trx_minta_kas');
        $no = 0;
        if ($result) {
            foreach ($result as $value) {
                $result[$no]->divisi_name = $this->Kskeluar_model->get_detail('id', $value->trx_divisi, 'dt_divisi')->divisi_name;
                $result[$no]->tgl_trx = explode(' ', $value->tgl_trx)[0];
                $no++;
            }
            echo json_encode(array('success' => 'true', 'data' => $result, 'message' => 'Daftar semua data'));
        } else {
            echo json_encode(array('success' => 'true', 'data' => NULL, 'message' => 'Tidak ada data'));
        }
    }

    public function minta_kas_rujukan() {
        $records = $this->input->get('filter');
        $params = array();

        if ($records) {
            $raw_record = json_decode($records, true);
            $params = $this->generate_db_query($raw_record);
        }

        $params[] = array('field' => 'cabang_id', 'param' => 'where', 'operator' => '', 'value' => $this->user->cabang_id);
        $params[] = array('field' => 'mkr_pemeriksaan', 'param' => 'where', 'operator' => ' <>', 'value' => '0');
        $params[] = array('field' => 'trx_realisasi', 'param' => 'where', 'operator' => '', 'value' => 0);
        $params[] = array('field' => 'trx_realstatus', 'param' => 'where', 'operator' => '', 'value' => 0);

        $result = $this->Kskeluar_model->gets($params, NULL, 'trx_minta_kas');
        $no = 0;
        if ($result) {
            foreach ($result as $value) {
                $result[$no]->divisi_name = $this->Kskeluar_model->get_detail('id', $value->trx_divisi, 'dt_divisi')->divisi_name;
                $result[$no]->tgl_trx = explode(' ', $value->tgl_trx)[0];
                $no++;
            }
            echo json_encode(array('success' => 'true', 'data' => $result, 'message' => 'Daftar semua data'));
        } else {
            echo json_encode(array('success' => 'true', 'data' => NULL, 'message' => 'Tidak ada data'));
        }
    }

    function add_kaskeluar() {
//        $insert = $this->input->post(NULL, TRUE);
//        $data = $this->Kskeluar_model->kk_process($insert);
//        if ($data) {
//            $id = $this->input->post('id');
//            $type = $this->input->post('kkType');
//            $id_minta_bayar = $this->input->post('idMintaBayar');
//            $data_kas = $this->Kskeluar_model->get_detail('id',$data,'trx_kas');
//            
//            $id_kk=$data;
//            if ($type != 1) {
//                $no_ref_trx = $data_kas ->no_ref_trx;
//                $params = array();
//                $params[] = array('field' => 'id', 'param' => 'where', 'operator' => '', 'value' => $id_kk);
//                $data_po = $this->Kskeluar_model->gets($params, NULL, 'trx_kas');
//                foreach ($data_po as $key) {
//
//                    $data_json = json_encode($key);
//
//                    $data = array();
//
//                    $data['jumlah'] = 1;
//
//                    $data['tujuan'] = 1;
//                    $data['id_cabang'] = $this->user->cabang_id;
//
//                    $no = $this->Kskeluar_model->insert_outgoing($data, 'head');
//
//                    $data = array();
//                    $data['data'] = $data_json;
//                    $data['head_id '] = $no . '.' . $this->user->cabang_id;
//                    $data['primary_key'] = $key->id;
//                    $data['table_name'] = 'trx_kas';
//
//                    $this->Kskeluar_model->insert_outgoing($data, 'detail');
//                }
//
//                $params = array();
//                $params[] = array('field' => 'no_ref_trx', 'param' => 'where', 'operator' => '', 'value' => $no_ref_trx);
//                $data_po = $this->Kskeluar_model->gets($params, NULL, 'trx_harian');
//                foreach ($data_po as $key) {
//
//                    $data_json = json_encode($key);
//
//                    $data = array();
//
//                    $data['jumlah'] = 1;
//
//                    $data['tujuan'] = 1;
//                    $data['id_cabang'] = $this->user->cabang_id;
//
//                    $no = $this->Kskeluar_model->insert_outgoing($data, 'head');
//
//                    $data = array();
//                    $data['data'] = $data_json;
//                    $data['head_id '] = $no . '.' . $this->user->cabang_id;
//                    $data['primary_key'] = $key->id;
//                    $data['table_name'] = 'trx_harian';
//
//                    $this->Kskeluar_model->insert_outgoing($data, 'detail');
//                }
//                
//                if($id==""){
//                    $params = array();
//                    $params[] = array('field' => 'id', 'param' => 'where', 'operator' => '', 'value' => $id_minta_bayar);
//                    $data_po = $this->Kskeluar_model->gets($params, NULL, 'trx_minta_kas');
//                    foreach ($data_po as $key) {
//
//                        $data_json = json_encode($key);
//
//                        $data = array();
//
//                        $data['jumlah'] = 1;
//
//                        $data['tujuan'] = 1;
//                        $data['id_cabang'] = $this->user->cabang_id;
//
//                        $no = $this->Kskeluar_model->insert_outgoing($data, 'head');
//
//                        $data = array();
//                        $data['data'] = $data_json;
//                        $data['head_id '] = $no . '.' . $this->user->cabang_id;
//                        $data['primary_key'] = $key->id;
//                        $data['table_name'] = 'trx_minta_kas';
//
//                        $this->Kskeluar_model->insert_outgoing($data, 'detail');
//                    }    
//                }
//                
//            }
//            else{
//                $invoiceNo = sprintf('%06d', $id);
//                $invoice = 'KK-' . $invoiceNo . '-13';
//
//                $params = array();
//                $params[] = array('field' => 'id', 'param' => 'where', 'operator' => '', 'value' => $id_kk);
//                $data_po = $this->Kskeluar_model->gets($params, NULL, 'trx_kas');
//                foreach ($data_po as $key) {
//
//                    $data_json = json_encode($key);
//
//                    $data = array();
//
//                    $data['jumlah'] = 1;
//
//                    $data['tujuan'] = 1;
//                    $data['id_cabang'] = $this->user->cabang_id;
//
//                    $no = $this->Kskeluar_model->insert_outgoing($data, 'head');
//
//                    $data = array();
//                    $data['data'] = $data_json;
//                    $data['head_id '] = $no . '.' . $this->user->cabang_id;
//                    $data['primary_key'] = $key->id;
//                    $data['table_name'] = 'trx_kas';
//
//                    $this->Kskeluar_model->insert_outgoing($data, 'detail');
//                }
//
//                $params = array();
//                $params[] = array('field' => 'no_ref_trx', 'param' => 'where', 'operator' => '', 'value' => $invoice);
//                $data_po = $this->Kskeluar_model->gets($params, NULL, 'trx_harian');
//                foreach ($data_po as $key) {
//
//                    $data_json = json_encode($key);
//
//                    $data = array();
//
//                    $data['jumlah'] = 1;
//
//                    $data['tujuan'] = 1;
//                    $data['id_cabang'] = $this->user->cabang_id;
//
//                    $no = $this->Kskeluar_model->insert_outgoing($data, 'head');
//
//                    $data = array();
//                    $data['data'] = $data_json;
//                    $data['head_id '] = $no . '.' . $this->user->cabang_id;
//                    $data['primary_key'] = $key->id;
//                    $data['table_name'] = 'trx_harian';
//
//                    $this->Kskeluar_model->insert_outgoing($data, 'detail');
//                }
//
//                $params = array();
//                $params[] = array('field' => 'faktur_realstatus', 'param' => 'where', 'operator' => '', 'value' => $id);
//                $data_po = $this->Kskeluar_model->gets($params, NULL, 'trx_faktur');
//                foreach ($data_po as $key) {
//
//                    $data_json = json_encode($key);
//
//                    $data = array();
//
//                    $data['jumlah'] = 1;
//
//                    $data['tujuan'] = 1;
//                    $data['id_cabang'] = $this->user->cabang_id;
//
//                    $no = $this->Kskeluar_model->insert_outgoing($data, 'head');
//
//                    $data = array();
//                    $data['data'] = $data_json;
//                    $data['head_id '] = $no . '.' . $this->user->cabang_id;
//                    $data['primary_key'] = $key->id;
//                    $data['table_name'] = 'trx_faktur';
//
//                    $this->Kskeluar_model->insert_outgoing($data, 'detail');
//                }
//            }
//            
//            echo json_encode(array('success' => 'true', 'data' => $data, 'message' => 'Transaksi berhasil ditambahkan', 'title' => 'Info'));
//        } else {
//            echo json_encode(array('success' => 'false', 'data' => NULL, 'message' => $this->catch_db_err(), 'title' => 'Database Error'));
//        }
        echo json_encode(array('success' => 'true', 'data' => NULL, 'message' => 'Transaksi berhasil ditambahkan', 'title' => 'Info'));
    }

}
