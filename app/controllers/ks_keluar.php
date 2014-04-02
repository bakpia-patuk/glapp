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

        $result = $this->Kskeluar_model->gets($params, NULL, 'trx_faktur');

        if ($result != NULL) {
            foreach ($result as $row) {
                $tgl = explode(' ', $row->faktur_tgl);

                $listpo[] = array(
                    'id' => $row->id,
                    'faktur_tgl' => $tgl[0],
                    'faktur_suppid' => $row->faktur_suppid,
//                    'fktSuppNama' => $this->pmodel->get_detail('id', $row->faktur_suppid, 'master_supplier')->ms_name,
                    'faktur_no' => $row->faktur_no,
                    'faktur_nototal' => $row->faktur_nototal,
                    'faktur_bayar' => $row->faktur_bayar,
                    'faktur_bgstatus' => $row->faktur_bgstatus,
                    'faktur_cabang' => $row->faktur_cabang,
//                    'fktCabangName' => $this->pmodel->get_detail('id', $row->faktur_cabang, 'master_cabang')->cabang_name,
                    'faktur_usercreate' => $row->faktur_usercreate,
                    'faktur_ctkstatus' => $row->faktur_ctkstatus,
                    'simpan_status' => $row->simpan_status
                );
            }
        }

        if ($result) {
            echo json_encode(array('success' => 'true', 'data' => $listpo, 'message' => 'Daftar semua Detail PO'));
        } else {
            echo json_encode(array('success' => 'true', 'data' => $listpo, 'message' => 'Tidak ada data Detail PO'));
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
}