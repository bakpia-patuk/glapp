<?php

if (!defined('BASEPATH')) {
    exit('No direct script access allowed');
}

/**
 * Description of data_model
 *
 * @author Coepoe
 */
class Bk_msbank extends Auth_Controller {

    function __construct() {
        parent::__construct();
        $this->load->model('Bkmsbank_model');
        $this->Bkmsbank_model->cms_db = $this->load->database('outgoing', TRUE);
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

        $data_bank = $this->Bkmsbank_model->gets($params, NULL, 'ms_bank');
        $list_bank = array();

        if ($data_bank != NULL) {
            foreach ($data_bank as $key) {
                $list_bank[] = array(
                    'id' => $key->id,
                    'bank_nama' => $key->bank_nama,
                    'bankGroupNama' => $this->Bkmsbank_model->get_detail('id', $key->bank_nama, 'ms_banknas')->banknas_name,
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
    
    public function list_banknas() {
        $records = $this->input->get('filter');
        $query = $this->input->get('query');
        $params = array();

        if ($records) {
            $raw_record = json_decode($records, true);
            $params = $this->generate_db_query($raw_record);
        }

        if ($query) {
            if ($query != "") {
                $params[] = array('field' => 'banknas_name', 'param' => 'where', 'operator' => '', 'value' => $query);
            }
        }

        $data = $this->Bkmsbank_model->gets($params, NULL, 'ms_banknas');

        if ($data != NULL) {
            echo json_encode(array('success' => 'true', 'data' => $data, 'message' => 'Daftar semua Bank'));
        } else {
            echo json_encode(array('success' => 'true', 'data' => $data, 'message' => 'Tidak ada data Bank'));
        }
    }
    
    public function add_msbank() {
        $input = $this->input->post(NULL, TRUE);
        
        //untuk sementara tidak dimasukkan
        unset($input['bank_akun']);
        unset($input['bank_golakun']);
        unset($input['bankAkun']);
        
        if ($input['id'] != 0) {
            $opt[] = array('field' => 'id', 'param' => 'where', 'operator' => '', 'value' => $input['id']);
            if (!$this->Bkmsbank_model->update($input, $opt, NULL, 'ms_bank')) {
                echo json_encode(array('success' => 'false', 'data' => NULL, 'title' => 'ERROR', 'msg' => $this->catch_db_err()));
            } else {
                echo json_encode(array('success' => 'true', 'data' => NULL, 'title' => 'Info', 'msg' => 'Update Success'));
            }
        } else {
            unset($input['id']);
            $id=$this->Bkmsbank_model->insert($input, 'ms_bank');
            if (!$id) {
                echo json_encode(array('success' => 'false', 'data' => NULL, 'title' => 'ERROR', 'msg' => $this->catch_db_err()));
            } else {
                $params = array();
                $params[] = array('field' => 'id', 'param' => 'where', 'operator' => '', 'value' => $id);
                $data_po = $this->Bkmsbank_model->gets($params, NULL, 'ms_bank');
                foreach ($data_po as $key) {

                    $data_json = json_encode($key);

                    $data = array();

                    $data['jumlah'] = 1;
                    if($this->user->cabang_id==1)
                        $data['tujuan'] = $key->bank_cabang;
                    else
                        $data['tujuan'] = 1;
                    $data['id_cabang'] = $this->user->cabang_id;

                    $no = $this->Bkmsbank_model->insert_outgoing($data, 'head');

                    $data = array();
                    $data['data'] = $data_json;
                    $data['head_id '] = $no . '.' . $this->user->cabang_id;
                    $data['primary_key'] = $key->id;
                    $data['table_name'] = 'ms_bank';

                    $this->Bkmsbank_model->insert_outgoing($data, 'detail');
                }
                echo json_encode(array('success' => 'true', 'data' => NULL, 'title' => 'Info', 'msg' => 'Insert Success'));
            }
        }
    }
    
    function delete_msbank() {
        $id = $this->input->post('id');
        $opt_del[] = array('field' => 'id', 'param' => 'where', 'operator' => '', 'value' => $id);
        $this->Bkmsbank_model->delete($opt_del, NULL, 'ms_bank');

        echo json_encode(array('success' => 'true', 'data' => NULL, 'message' => 'Data berhasil di hapus', 'title' => 'Info'));
    }
}