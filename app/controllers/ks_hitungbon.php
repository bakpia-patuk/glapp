<?php

if (!defined('BASEPATH')) {
    exit('No direct script access allowed');
}

/**
 * Description of data_model
 *
 * @author Coepoe
 */
class Ks_hitungbon extends Auth_Controller {

    function __construct() {
        parent::__construct();
        $this->load->model('Kshitungbon_model');
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

        $result = $this->Kshitungbon_model->kastrx_list($params, NULL);

        if ($result) {
            echo json_encode(array('success' => 'true', 'data' => $result, 'message' => 'Daftar semua Kas Masuk'));
        } else {
            echo json_encode(array('success' => 'true', 'data' => NULL, 'message' => 'Tidak ada data Kas Masuk'));
        }
    }
    
    
    
    function detail_kb_list() {
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

        $result = $this->Kshitungbon_model->gets($params, NULL, 'trx_detail_kasbon');

        foreach ($result as $row) {
            $listkb[] = array(
                'id' => $row->id,
                'kasbon_id' => $row->kasbon_id,
                'tgl_trx' => explode(' ', $row->tgl_trx)[0],
                'jumlah_trx' => $row->jumlah_trx,
                'keterangan' => $row->keterangan,
                'appr_status' => $row->appr_status
            );
        }

        if ($result) {
            echo json_encode(array('success' => 'true', 'data' => $listkb, 'message' => 'Daftar semua Kas Masuk'));
        } else {
            echo json_encode(array('success' => 'true', 'data' => $listkb, 'message' => 'Tidak ada data Kas Masuk'));
        }
    }
    
    
    
    // DETAIL KAS BON
    public function add_detailkasbon() {
        $input = $this->input->post(NULL, TRUE);
        $datestring = "%Y-%m-%d %H:%i:%s";
        $time = date('H:i:s');
        $input['tgl_trx'] = mdate($datestring, strtotime($input['tgl_trx'] . ' ' . $time));
        $input['jumlah_trx'] = $this->Kshitungbon_model->money_formatter($input['jumlah_trx']);
               
        if ($input['id'] != 0) {
            unset($input['kas_jumlah']);
            unset($input['selisih']);
            $opt[] = array('field' => 'id', 'param' => 'where', 'operator' => '', 'value' => $input['id']);
            if (!$this->Kshitungbon_model->update($input, $opt, NULL, 'trx_detail_kasbon')) {
                echo json_encode(array('success' => 'false', 'data' => NULL, 'title' => 'ERROR', 'msg' => $this->catch_db_err()));
            } else {
                echo json_encode(array('success' => 'true', 'data' => NULL, 'title' => 'Info', 'msg' => 'Update Success'));
            }
        } else {
            unset($input['id']);
            unset($input['kas_jumlah']);
            unset($input['selisih']);
            if (!$this->Kshitungbon_model->insert($input, 'trx_detail_kasbon')) {
                echo json_encode(array('success' => 'false', 'data' => NULL, 'title' => 'ERROR', 'msg' => $this->catch_db_err()));
            } else {
                echo json_encode(array('success' => 'true', 'data' => NULL, 'title' => 'Info', 'msg' => 'Insert Success'));
            }
        }
    }
    
    public function approve_kasbon() {
        $kasbon_id = $this->input->post('kasbon_id');
        $jumlahKb = $this->input->post('jumlahKb'); // ambil data dr mana????
        $totalKb = $this->Kshitungbon_model->cek_allkb($kasbon_id);
        $sisa = $jumlahKb - $totalKb;
        $type = $sisa < 0 ? 'kaskeluar' : 'kasmasuk';

        $data_detail_kab = array(
            'appr_status' => 1
        );

        $opt[] = array('field' => 'kasbon_id', 'param' => 'where', 'operator' => '', 'value' => $kasbon_id);
        if ($this->Kshitungbon_model->update($data_detail_kab, $opt, NULL, 'detail_kas_bon')) {
            $data_kas = array(
                'kas_kbapproval' => 1
            );
            $opts[] = array('field' => 'id', 'param' => 'where', 'operator' => '', 'value' => $kasbon_id);
            if ($this->Kshitungbon_model->update($data_kas, $opts, NULL, 'trx_kas')) {
                $detail_kb = $this->Kshitungbon_model->get_detail('id', $kasbon_id, 'trx_kas');

                $data_kas = array(
                    'kas_type' => $type,
                    'kas_tgltrx' => mdate('%Y-%m-%d %H:%i:%s', now()),
                    'no_ref_trx' => $detail_kb->no_ref_trx,
                    'kas_anggaranid' => 0,
                    'kas_bank' => 0,
                    'kas_grpkeperluan' => 10,
                    'kas_dtlkeperluan' => $type == "kaskeluar" ? 25 : 24,
                    'kas_jumlah' => abs($sisa),
                    'kas_bayartype' => 1,
                    'kas_nobayar' => 0,
                    'kas_namabayar' => $detail_kb->kas_namabayar,
                    'kas_bged' => 0,
                    'kas_bankbg' => 0,
                    'kas_akun' => 4,
                    'user_create' => $this->ion_auth->user()->row()->username,
                    'user_createsign' => "",
                    'cabang_id' => $this->ion_auth->user()->row()->cabang_id,
                    'created' => mdate('%Y-%m-%d %H:%i:%s', now()),
                    'modified' => mdate('%Y-%m-%d %H:%i:%s', now()),
                    'simpan_status' => 1
                );

                $id = $this->Kshitungbon_model->insert($data_kas, 'trx_kas');
                if ($id != NULL) {
                    echo json_encode(array('success' => 'true', 'idKb' => $id, 'title' => 'Info', 'message' => "SUKSES"));
                } else {
                    echo json_encode(array('success' => 'true', 'idKb' => 0, 'title' => 'Info', 'message' => $this->catch_db_err()));
                }
            } else {
                echo json_encode(array('success' => 'false', 'idKb' => $kasbon_id, 'title' => 'Info', 'message' => $this->catch_db_err()));
            }
        } else {
            echo json_encode(array('success' => 'false', 'idKb' => $kasbon_id, 'title' => 'Info', 'message' => $this->catch_db_err()));
        }
    }
    
    public function reset_kasbon() {
        $idKb = $this->input->post('kasbon_id');

        $opt[] = array('field' => 'kasbon_id', 'param' => 'where', 'operator' => '', 'value' => $idKb);
        $opt[] = array('field' => 'appr_status', 'param' => 'where', 'operator' => '', 'value' => 0);
        $this->Kshitungbon_model->delete($opt, NULL, 'trx_detail_kasbon');
        echo json_encode(array('success' => 'true', 'title' => 'Info', 'message' => 'Transaksi Batal'));
    }
}