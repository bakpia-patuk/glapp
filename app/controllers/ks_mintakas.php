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
        
        if ($input['mk_keperluan'] == 6) {
            $input['trx_desc'] = "Rujukan a.n. " . $input['mkr_namapasien'] . " ke " . $input['mkr_rujukanke'];
        } else {
            $input['mkr_namapasien'] = 0;
            $input['mkr_pemeriksaan'] = 0;
            $input['mkr_rujukanke'] = 0;

            $input['trx_desc'] = "PEMBAYARAN ";
//            $akun_name = $this->get_detail('id', $dtl_keperluan, 'list_akun_' . $user->cabang_id)->akun_name;
//            if ($dtl_keperluan == 771 || $dtl_keperluan == 772 || $dtl_keperluan == 773) {
//                $desc_detkpr = $this->get_detail('id', $dtl_keperluan_desc, 'master_telisa');
//                $detail_ext = $dtl_keperluan_desc;
//                $ket_data = " a.n. " . $desc_detkpr->mt_nama . " no " . $desc_detkpr->mt_rek . ' d.a ' . $desc_detkpr->mt_alamat;
//            } else {
//                $ket_data = "";
//            }
//            $keterangan = $ket . $akun_name . $ket_data;
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
            if (!$this->Ksmintakas_model->insert($input, 'trx_minta_kas')) {
                echo json_encode(array('success' => 'false', 'data' => NULL, 'title' => 'ERROR', 'msg' => $this->catch_db_err()));
            } else {
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
}