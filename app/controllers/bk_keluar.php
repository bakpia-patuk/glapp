<?php

if (!defined('BASEPATH')) {
    exit('No direct script access allowed');
}

/**
 * Description of data_model
 *
 * @author coepoe
 */
class Bk_keluar extends Auth_Controller {

    function __construct() {
        parent::__construct();
        $this->load->model('Bkkeluar_model');
    }
    
    public function list_bank() {
        $records = $this->input->get('filter');
        $query = $this->input->get('query');
        $params = array();

        if ($records) {
            $raw_record = json_decode($records, true);
            $params = $this->generate_db_query($raw_record);
        }

        if ($query) {
            if ($query != "") {
                $params[] = array('field' => 'bank_alias', 'param' => 'where', 'operator' => '', 'value' => $query);
            }
        }

        $data_bank = $this->Bkkeluar_model->gets($params, NULL, 'ms_bank');
        $list_bank = array();

        if ($data_bank != NULL) {
            foreach ($data_bank as $key) {
                $list_bank[] = array(
                    'id' => $key->id,
                    'bank_nama' => $key->bank_nama,
//                    'bankGroupNama' => $this->Bkkeluar_model->get_detail('id', $key->bank_nama, 'ms_banknas')->banknas_name,
                    'bank_alias' => $key->bank_alias,
                    'bank_reknama' => $key->bank_reknama,
                    'bank_rekno' => $key->bank_rekno,
                    'bank_alamat' => $key->bank_alamat,
                    'bank_cabang' => $key->bank_cabang,
                    'bank_kodeakun' => $key->bank_kodeakun,
                    'bank_golakun' => $key->bank_golakun,
                    'bank_status' => $key->bank_status,
                    'bank_active' => $key->bank_active
                );
            }
        }

        echo json_encode(array('success' => 'true', 'data' => $list_bank));
    }
    
    function trx_bank_list() {
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

        $result = $this->Bkkeluar_model->banktrx_list($params, NULL);

        if ($result) {
            echo json_encode(array('success' => 'true', 'data' => $result, 'message' => 'Daftar semua Kas Masuk'));
        } else {
            echo json_encode(array('success' => 'true', 'data' => $result, 'message' => 'Tidak ada data Kas Masuk'));
        }
    }
    
    function add_bankkeluar() {
        $data = $this->Bkkeluar_model->bank_process();
        if ($data) {
            echo json_encode(array('success' => 'true', 'data' => $data, 'message' => 'Transaksi berhasil ditambahkan', 'title' => 'Info'));
        } else {
            echo json_encode(array('success' => 'false', 'data' => NULL, 'message' => $this->catch_db_err(), 'title' => 'Database Error'));
        }
    }
    
    function delete_bankkeluar() {
        $id = $this->input->post('id');
        $ref_trx = $this->Bkkeluar_model->get_detail('id', $id, 'trx_kas')->no_ref_trx;
        $opt[] = array('field' => 'no_ref_trx', 'param' => 'where', 'operator' => '', 'value' => $ref_trx);
        $this->Bkkeluar_model->delete($opt, NULL, 'trx_harian');
        
        $opt_del[] = array('field' => 'id', 'param' => 'where', 'operator' => '', 'value' => $id);
        $this->Bkkeluar_model->delete($opt_del, NULL, 'trx_kas');

        echo json_encode(array('success' => 'true', 'data' => NULL, 'message' => 'Data berhasil di hapus', 'title' => 'Info'));
    }
    
    public function set_akungr() {
        $insert = $this->input->post(NULL, TRUE);
        $data = explode('-', rtrim($insert['data'], '-'));
        foreach ($data as $row) {
            $this->Bkkeluar_model->add_to_kpakun($row, $insert['idPerlu'], $insert['idForm']);
        }
        echo json_encode(array('success' => 'true', 'msg' => 'Add Data Success'));
    }

    public function del_akun_gr() {
        $data = $this->input->post('id');

        $rec[] = array('field' => 'id', 'param' => 'where', 'operator' => '', 'value' => $data);
        $this->Bkkeluar_model->delete($rec, NULL, 'ms_keperluan_akun');
        echo json_encode(array('success' => 'true', 'msg' => 'Delete Data Success'));
    }
}