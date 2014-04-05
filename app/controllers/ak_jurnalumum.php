<?php

if (!defined('BASEPATH')) {
    exit('No direct script access allowed');
}

/**
 * Description of data_model
 *
 * @author Coepoe
 */
class Ak_jurnalumum extends Auth_Controller {

    function __construct() {
        parent::__construct();
        $this->load->model('Akjurnalumum_model');
        $this->page = 'Master';
    }
    
    public function jurnal_all_list() {
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

        $result = $this->Akjurnalumum_model->jurnal_list($params, NULL);

        if ($result) {
            echo json_encode(array('success' => 'true', 'data' => $result, 'message' => 'Daftar semua Jurnal'));
        } else {
            echo json_encode(array('success' => 'true', 'data' => NULL, 'message' => 'Tidak ada data Jurnal'));
        }
    }
}