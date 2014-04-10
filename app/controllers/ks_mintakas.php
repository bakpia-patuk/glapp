<?php

if (!defined('BASEPATH')) {
    exit('No direct script access allowed');
}

/**
 * Description of data_model
 *
 * @author Coepoe
 */
class Ks_mintakas extends Auth_Controller {

    function __construct() {
        parent::__construct();
        $this->load->model('Ksmintakas_model');
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
            }
        }

        $result = $this->Ksmintakas_model->get_minta_kas($params, NULL);

        if ($result) {
            echo json_encode(array('success' => 'true', 'data' => $result, 'message' => 'Daftar semua data'));
        } else {
            echo json_encode(array('success' => 'true', 'data' => NULL, 'message' => 'Tidak ada data'));
        }
    }
    
    public function add_minta_kas() {
        $input = $this->input->post(NULL, TRUE);
        $datestring = "%Y-%m-%d %H:%i:%s";
        $time = date('H:i:s');
        $input['tgl_trx'] = mdate($datestring, strtotime($input['tgl_trx'] . ' ' . $time));
        $input['trx_value'] = $this->Ksmintakas_model->money_formatter($input['trx_value']);
        //sementara yg rujukan tidak bisa krn belum ada akun
        if ($input['mk_keperluan'] == 6) {
            $input['trx_desc'] = "Rujukan a.n. " . $input['mkr_namapasien'] . " ke " . $input['mkr_rujukanke'];
        } else {
            $input['mkr_namapasien'] = 0;
            $input['mkr_pemeriksaan'] = 0;
            $input['mkr_rujukanke'] = 0;

            $input['trx_desc'] = "PEMBAYARAN ";
            $akun_name = $this->Ksmintakas_model->get_detail('id', $input['mk_detail'], 'dt_akun')->akun_name;
            if ($input['mk_detail'] == 771 || $input['mk_detail'] == 772 || $input['mk_detail'] == 773) {
                $desc_detkpr = $this->Ksmintakas_model->get_detail('id', $input['mk_detailext'], 'ms_telisa');
//                $detail_ext = $input['mk_detailext'];
                $ket_data = " a.n. " . $desc_detkpr->mt_nama . " no " . $desc_detkpr->mt_rek . ' d.a ' . $desc_detkpr->mt_alamat;
            } else {
                $ket_data = "";
            }
            $input['trx_desc'] = $input['trx_desc'] . $akun_name . $ket_data;
        }
        
        if ($input['id'] != 0) {
            unset($input['formId']);
            $opt[] = array('field' => 'id', 'param' => 'where', 'operator' => '', 'value' => $input['id']);
            if (!$this->Ksmintakas_model->update($input, $opt, NULL, 'trx_minta_kas')) {
                echo json_encode(array('success' => 'false', 'data' => NULL, 'title' => 'ERROR', 'msg' => $this->catch_db_err()));
            } else {
                echo json_encode(array('success' => 'true', 'data' => NULL, 'title' => 'Info', 'msg' => 'Update Success'));
            }
        } else {
            unset($input['id']);
            unset($input['formId']);
            $no = $this->Ksmintakas_model->insert($input, 'trx_minta_kas');
            if (!$no) {
                echo json_encode(array('success' => 'false', 'data' => NULL, 'title' => 'ERROR', 'msg' => $this->catch_db_err()));
            } else {
                $id = $no.'.'.$this->user->cabang_id;
                $params = array();
                $params[] = array('field' => 'id', 'param' => 'where', 'operator' => '', 'value' => $id);
                $data_po = $this->Ksmintakas_model->gets($params, NULL, 'trx_minta_kas');
                foreach ($data_po as $key) {

                    $data_json = json_encode($key);

                    $data = array();

                    $data['jumlah'] = 1;

                    $data['tujuan'] = 1;
                    $data['id_cabang'] = $this->user->cabang_id;

                    $no = $this->Ksmintakas_model->insert_outgoing($data, 'head');

                    $data = array();
                    $data['data'] = $data_json;
                    $data['head_id '] = $no . '.' . $this->user->cabang_id;
                    $data['primary_key'] = $key->id;
                    $data['table_name'] = 'trx_minta_kas';

                    $this->Ksmintakas_model->insert_outgoing($data, 'detail');
                }
                echo json_encode(array('success' => 'true', 'data' => NULL, 'title' => 'Info', 'msg' => 'Insert Success'));
            }
        }
    }
    
    public function delete_mintakas() {
        $data = explode('-', $this->input->post('postdata'));

        for ($i = 0; $i < count($data) - 1; $i++) {
            $this->Ksmintakas_model->del_mintakas($data[$i]);
        }

        echo json_encode(array('success' => 'true'));
    }
    
    public function approve_mintakas() {
        $id = explode('-', $this->input->post('id'));

        for ($i = 0; $i < count($id) - 1; $i++) {
            $this->Ksmintakas_model->approve_mintakas($id[$i]);
        }

        echo json_encode(array('success' => 'true'));
    }
    
    public function set_akungr() {
        $insert = $this->input->post(NULL, TRUE);
        $data = explode('-', rtrim($insert['data'], '-'));
        foreach ($data as $row) {
            $this->Ksmintakas_model->add_to_kpakun($row, $insert['idPerlu'], $insert['idForm']);
        }
        echo json_encode(array('success' => 'true', 'msg' => 'Add Data Success'));
    }

    public function del_akun_gr() {
        $data = $this->input->post('id');

        $rec[] = array('field' => 'id', 'param' => 'where', 'operator' => '', 'value' => $data);
        $this->Ksmintakas_model->delete($rec, NULL, 'ms_keperluan_akun');
        echo json_encode(array('success' => 'true', 'msg' => 'Delete Data Success'));
    }
}