<?php

if (!defined('BASEPATH')) {
    exit('No direct script access allowed');
}

/**
 * Description of data_model
 *
 * @author coepoe
 */
class Iv_msbarang extends Auth_Controller {

    function __construct() {
        parent::__construct();
        $this->load->model('Ivmsbarang_model');
    }
    
    public function gets_ivmsbarang() {
        $records = $this->input->get('filter');
        $query = $this->input->get('query');
        $params = array();

        if ($records) {
            $raw_record = json_decode($records, true);
            $params = $this->generate_db_query($raw_record);
        }

//        if ($query) {
//            if ($query != "") {
//                $params[] = array('field' => 'bank_alias', 'param' => 'where', 'operator' => '', 'value' => $query);
//            }
//        }

        $data = $this->Ivmsbarang_model->gets($params, NULL, 'dt_invdatabarang');
        $no = 0;

        if ($data != NULL) {
            foreach ($data as $value) {
                $data[$no]->barang_name = $this->Ivmsbarang_model->get_detail('id', $value->db_barangid, 'dt_item')->mi_name;
                $data[$no]->divisi_name = $this->Ivmsbarang_model->get_detail('id', $value->db_divisi, 'dt_divisi')->divisi_name;
                $data[$no]->ruang_name = $value->db_ruang == 0 ? 'Tidak Ada Ruangan' : $this->Ivmsbarang_model->get_detail('id', $value->db_ruang, 'dt_ruang')->ruang_nama;
                $no++;
            }

            echo json_encode(array('success' => 'true', 'data' => $data, 'message' => 'Daftar semua Mobil'));
        } else {
            echo json_encode(array('success' => 'true', 'data' => $data, 'message' => 'Tidak ada data barang'));
        }
        
    }
    
    public function list_divisi() {
        $records = $this->input->get('filter');
        $query = $this->input->get('query');
        $params = array();

        if ($records) {
            $raw_record = json_decode($records, true);
            $params = $this->generate_db_query($raw_record);
        }

//        if ($query) {
//            if ($query != "") {
//                $params[] = array('field' => 'bank_alias', 'param' => 'where', 'operator' => '', 'value' => $query);
//            }
//        }

        $data_divisi = $this->Ivmsbarang_model->gets($params, NULL, 'dt_divisi');
        $list_divisi = array();

        if ($data_divisi != NULL) {
            foreach ($data_divisi as $key) {
                $list_divisi[] = array(
                    'id' => $key->id,
//                    'divisiId' => $key->id,
                    'divisi_name' => $key->divisi_name,
                    'is_active' => $key->is_active
                );
            }
        } else {
            $list_divisi[] = array(
                'id' => 0,
//                'divisiId' => 99,
                'divisi_name' => 'Tidak Ada Divisi',
                'is_active' => 1
            );
        }

        echo json_encode(array('success' => 'true', 'data' => $list_divisi));
    }
    
    public function list_ruang() {
        $records = $this->input->get('filter');
        $query = $this->input->get('query');
        $params = array();

        if ($records) {
            $raw_record = json_decode($records, true);
            $params = $this->generate_db_query($raw_record);
        }

//        if ($query) {
//            if ($query != "") {
//                $params[] = array('field' => 'bank_alias', 'param' => 'where', 'operator' => '', 'value' => $query);
//            }
//        }

        $result = $this->Ivmsbarang_model->gets($params, NULL, 'dt_ruang');
        $list = array();

        if ($result != NULL) {
            foreach ($result as $key) {
                $list[] = array(
                    'id' => $key->id,
                    'divisiCode' => $key->divisi_id,
                    'cabangId' => $key->cabang_id,
                    'ruangId' => $key->ruang_id,
                    'ruangName' => $key->ruang_nama,
                    'isActive' => $key->is_active
                );
            }
        } else {
            $list[] = array(
                'id' => 0,
                'divisiCode' => 99,
                'cabangId' => 99,
                'ruangId' => 0,
                'ruangName' => "Tidak ada ruangan",
                'isActive' => 1
            );
        }

        echo json_encode(array('success' => 'true', 'data' => $list));
    }
    
    public function add_ivmsbarang() {
        $data = $this->input->post(NULL, TRUE);
        $data['db_value'] = $this->Ivmsbarang_model->money_formatter($data['db_value']);
        if ($data['id'] != "") {
            $opt[] = array('field' => 'id', 'param' => 'where', 'operator' => '', 'value' => $data['id']);

            if (!$this->Ivmsbarang_model->update($data, $opt, NULL, 'dt_invdatabarang')) {
                echo json_encode(array('success' => 'false', 'message' => $this->catch_db_err()));
            } else {
                echo json_encode(array('success' => 'true', 'message' => 'Update Data Success'));
            }
        } else {
            unset($data['id']);
            if (!$this->Ivmsbarang_model->insert($data, 'dt_invdatabarang')) {
                echo json_encode(array('success' => 'false', 'message' => $this->catch_db_err()));
            } else {
                echo json_encode(array('success' => 'true', 'message' => 'Insert Data Success'));
            }
        }
    }
}