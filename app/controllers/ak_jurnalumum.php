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
        $this->load->model('Akju_model');
        $this->page = 'Master';
    }
    
    public function jurnal_all_list() {
        $records = isset($_GET['filter']);
        $record = array();

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

        $result = $this->Akju_model->jurnal_list($record, NULL);

        if ($result) {
            echo json_encode(array('success' => 'true', 'data' => $result, 'message' => 'Daftar semua Jurnal'));
        } else {
            echo json_encode(array('success' => 'true', 'data' => $result, 'message' => 'Tidak ada data Jurnal'));
        }
    }
}