<?php

if (!defined('BASEPATH')) {
    exit('No direct script access allowed');
}

/**
 * Description of data_model
 *
 * @author Coepoe
 */
class Ks_masuk extends Auth_Controller {

    function __construct() {
        parent::__construct();
        $this->load->model('Ksmasuk_model');
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

        $result = $this->Ksmasuk_model->kastrx_list($params, NULL);

        if ($result) {
            echo json_encode(array('success' => 'true', 'data' => $result, 'message' => 'Daftar semua Kas Masuk'));
        } else {
            echo json_encode(array('success' => 'true', 'data' => NULL, 'message' => 'Tidak ada data Kas Masuk'));
        }
    }
    
    
    //akun belum ada -> detail keperluan belum dimasukkan
    //ttd belum ada
    function add_kasmasuk(){
        $input = $this->input->post(NULL, TRUE);
        $datestring = "%Y-%m-%d %H:%i:%s";
        $time = date('H:i:s');
        $input['kas_tgltrx'] = mdate($datestring, strtotime($input['kas_tgltrx'] . ' ' . $time));
        $input['kas_jumlah'] = $this->Ksmasuk_model->money_formatter($input['kas_jumlah']);
        $input['kas_bayartype'] = 1;
        $input['user_create'] = 1;
        $input['cabang_id'] = $this->user->username;
        $input['cabang_id'] = $this->user->cabang_id;
        $input['created'] = date('Y-m-d H:i:s', now());
        $input['modified'] = date('Y-m-d H:i:s', now());
        $input['simpan_status'] = 1;
        
        //sementara tidak digunakan
        unset($input['kas_dtlkeperluanext']);
        unset($input['kas_dtlkeperluan']);
        unset($input['petugas']);
        
        if ($input['id'] != 0) {
            unset($input['created']);
            $no_ref_trx = $this->get_detail('id', $input['id'], 'trx_kas')->no_ref_trx;
            $opt[] = array('field' => 'id', 'param' => 'where', 'operator' => '', 'value' => $input['id']);
            $trx_kasmasuk = $this->Ksmasuk_model->update($input, $opt, NULL, 'trx_kas');
            if (!$trx_kasmasuk) {
                echo json_encode(array('success' => 'false', 'data' => NULL, 'title' => 'ERROR', 'msg' => $this->catch_db_err()));
            } else {
                $data_trx_harian = array(
                    'jumlah_trx' => $input['kas_jumlah'],
                    'keterangan_trx' => 'KAS MASUK DARI ',// . $this->get_detail('id', $dtil_keperluan, 'master_keperluan_detail')->kd_name,
                    'modified' => date('Y-m-d H:i:s', now())
                );
                $opts[] = array('field' => 'no_ref_trx', 'param' => 'where', 'operator' => '', 'value' => $no_ref_trx);
                if (!$this->Ksmasuk_model->update($data_trx_harian, $opts, NULL, 'trx_harian')) {
                    return FALSE;
                }
                
                echo json_encode(array('success' => 'true', 'data' => NULL, 'title' => 'Info', 'msg' => 'Update Success'));
            }
        } else {
            unset($input['id']);
            $trx_kasmasuk = $this->Ksmasuk_model->insert($input, 'trx_kas');
            if (!$trx_kasmasuk) {
                echo json_encode(array('success' => 'false', 'data' => NULL, 'title' => 'ERROR', 'msg' => $this->catch_db_err()));
            } else {
                $invoiceNo = sprintf('%06d', $trx_kasmasuk);
                $invoice = 'KM-' . $invoiceNo . '-13';
                $keterangan_string = 'KAS MASUK DARI ';
                $data_trx_harian = array(
                    'tgl_trx' => $input['kas_tgltrx'],
                    'jumlah_trx' => $input['kas_jumlah'],
                    'no_ref_trx' => $invoice,
                    'keterangan_trx' => $keterangan_string,// . $this->get_detail('id', $dtil_keperluan, 'master_keperluan_detail')->kd_name,
                    'jenis_trx' => $input['kas_type'],
                    'created' => date('Y-m-d H:i:s', now()),
                    'modified' => date('Y-m-d H:i:s', now()),
                );
                if (!$this->Ksmasuk_model->insert($data_trx_harian, 'trx_harian')) {
                    return FALSE;
                }
                
                $generate = array(
                    'no_ref_trx' => $invoice,
//                    'user_createsign' => $newfile,
                );
                $optxx[] = array('field' => 'id', 'param' => 'where', 'operator' => '', 'value' => $trx_kasmasuk);
                $this->Ksmasuk_model->update($generate, $optxx, NULL, 'trx_kas');
                
                echo json_encode(array('success' => 'true', 'data' => $data_trx_harian, 'title' => 'Info', 'msg' => 'Insert Success'));
            }
        }
    }
    
    function delete_kasmasuk() {
        $id = $this->input->post('id');
        $ref_trx = $this->Ksmasuk_model->get_detail('id', $id, 'trx_kas')->no_ref_trx;
        $opt_del[] = array('field' => 'id', 'param' => 'where', 'operator' => '', 'value' => $id);
        $this->Ksmasuk_model->delete($opt_del, NULL, 'trx_kas');

//        $ref_trx = $this->Ksmasuk_model->get_detail('id', $id, 'trx_kas')->no_ref_trx;
        $opt[] = array('field' => 'no_ref_trx', 'param' => 'where', 'operator' => '', 'value' => $ref_trx);
        $this->Ksmasuk_model->delete($opt, NULL, 'trx_harian');

        echo json_encode(array('success' => 'true', 'data' => NULL, 'message' => 'Data berhasil di hapus', 'title' => 'Info'));
    }
}