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
    }
    
    function trx_kas_list() {
        $records = $this->input->get('filter');
        $query = $this->input->get('query');
        $params = array();

        if ($records) {
            $raw_record = json_decode($records, true);
            $params = $this->generate_db_query($raw_record);
        }

//        if ($query) {
//            if ($query != "") {
//                $params[] = array('field' => 'cabang_id', 'param' => 'where', 'operator' => '', 'value' => $query);
//            }
//        }

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
            echo json_encode(array('success' => 'true', 'data' => $result, 'message' => 'Daftar semua Detail PO'));
        } else {
            echo json_encode(array('success' => 'true', 'data' => NULL, 'message' => 'Tidak ada data Detail PO'));
        }
    }
    
    public function minta_kas_list() {
        $records = $this->input->get('filter');
        $query = $this->input->get('query');
        $params = array();

        if ($records) {
            $raw_record = json_decode($records, true);
            $params = $this->generate_db_query($raw_record);
        }

        if ($query) {
            if ($query != "") {
                $params[] = array('field' => 'cabang_id', 'param' => 'where', 'operator' => '', 'value' => $query);
                $params[] = array('field' => 'tgl_trx', 'param' => 'where', 'operator' => '', 'value' => $query);
                $params[] = array('field' => 'mk_keperluan', 'param' => 'where', 'operator' => '', 'value' => $query);
            }
        }

        $result = $this->Kskeluar_model->get_minta_kas($params, NULL);

        if ($result) {
            echo json_encode(array('success' => 'true', 'data' => $result, 'message' => 'Daftar semua data'));
        } else {
            echo json_encode(array('success' => 'true', 'data' => NULL, 'message' => 'Tidak ada data'));
        }
    }
    
    
    function add_kaskeluar() {
        $data = $this->Kskeluar_model->kk_process();
        if ($data) {
            echo json_encode(array('success' => 'true', 'data' => $data, 'message' => 'Transaksi berhasil ditambahkan', 'title' => 'Info'));
        } else {
            echo json_encode(array('success' => 'false', 'data' => NULL, 'message' => $this->catch_db_err(), 'title' => 'Database Error'));
        }
    }
    
    public function generate_kk($type) {
        $supp_id = $this->input->post('idSupp');
        $cabang_id = $this->user->cabang_id;
        $record[] = array('field' => 'faktur_suppid', 'param' => 'where', 'operator' => '', 'value' => $supp_id);
        $record[] = array('field' => 'faktur_realstatus', 'param' => 'where', 'operator' => '', 'value' => 0);
        $record[] = array('field' => 'faktur_bayar', 'param' => 'where', 'operator' => '', 'value' => 1);
        $record[] = array('field' => 'faktur_cabang', 'param' => 'where', 'operator' => '', 'value' => $cabang_id);
        $data = $this->Kskeluar_model->gets($record, NULL, 'trx_faktur');

        if ($data != NULL) {
            $data_kas = array(
                'kas_type' => $type,
                'kas_tgltrx' => mdate('%Y-%m-%d %H:%i:%s', now()),
                'no_ref_trx' => "",
                'kas_anggaranid' => 0,
                'kas_bank' => 0,
                'kas_grpkeperluan' => 0,
                'kas_dtlkeperluan' => 0,
                'kas_jumlah' => 0,
                'kas_bayartype' => 1,
                'kas_nobayar' => 0,
                'kas_namabayar' => 0,
                'kas_bged' => 0,
                'kas_bankbg' => 0,
                'user_create' => $this->user->username,
                'user_createsign' => "",
                'cabang_id' => $cabang_id,
                'created' => mdate('%Y-%m-%d %H:%i:%s', now()),
                'modified' => mdate('%Y-%m-%d %H:%i:%s', now()),
                'simpan_status' => 0
            );

            $id = $this->Kskeluar_model->insert($data_kas, 'trx_kas');
            if ($id != NULL) {
                echo json_encode(array('success' => 'true', 'data' => $id, 'message' => 'Process', 'title' => 'Info'));
            } else {
                echo json_encode(array('success' => 'false', 'data' => NULL, 'message' => $this->catch_db_err(), 'title' => 'Error'));
            }
        } else {
            echo json_encode(array('success' => 'false', 'data' => NULL, 'message' => 'Tidak ada data Faktur Tunai', 'title' => 'Info'));
        }
    }
}