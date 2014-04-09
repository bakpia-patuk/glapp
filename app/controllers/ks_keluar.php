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
                $result[$no]->tgl_trx= explode(' ', $value->tgl_trx)[0];
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
                $result[$no]->tgl_trx= explode(' ', $value->tgl_trx)[0];
                $no++;
            }
            echo json_encode(array('success' => 'true', 'data' => $result, 'message' => 'Daftar semua data'));
        } else {
            echo json_encode(array('success' => 'true', 'data' => NULL, 'message' => 'Tidak ada data'));
        }
    }

    function add_kaskeluar() {
        $insert = $this->input->post(NULL, TRUE);
        $data = $this->Kskeluar_model->kk_process($insert);
        if ($data) {
            echo json_encode(array('success' => 'true', 'data' => $data, 'message' => 'Transaksi berhasil ditambahkan', 'title' => 'Info'));
        } else {
            echo json_encode(array('success' => 'false', 'data' => NULL, 'message' => $this->catch_db_err(), 'title' => 'Database Error'));
        }
    }
}
