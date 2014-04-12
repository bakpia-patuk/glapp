<?php

if (!defined('BASEPATH')) {
    exit('No direct script access allowed');
}

/**
 * Description of data_model
 *
 * @author coepoe
 */
class Iv_txbrminta extends Auth_Controller {

    function __construct() {
        parent::__construct();
        $this->load->model('Ivtxbrminta_model');
    }
    
    public function list_mintainv() {
        $records = isset($_GET['filter']);
        $record = array();
        $listpb = array();

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

        $result = $this->Ivtxbrminta_model->gets($record, NULL, 'trx_penginv');

        if ($result != NULL) {
            foreach ($result as $row) {
                $listpb[] = array(
                    'id' => $row->id,
                    'tgl_trx' => explode(' ', $row->tgl_trx)[0],
                    'penginv_no' => $row->penginv_no,
                    'penginv_cabang' => $row->penginv_cabang,
                    'penginv_divisi' => $row->penginv_divisi,
                    'divisiName' => $row->penginv_divisi != NULL ? $this->Ivtxbrminta_model->get_detail('id', $row->penginv_divisi, 'dt_divisi')->divisi_name : 'Tidak ada divisi.',
                    'penginv_divruang' => $row->penginv_divruang,
                    'ruangName' => $row->penginv_divruang != NULL ? $this->Ivtxbrminta_model->get_detail('id', $row->penginv_divruang, 'dt_ruang')->ruang_nama : 'Tidak ada ruangan.',
                    'divisiTujuan' => $row->penginv_tujuan,
                    'divTujuanName' => $row->penginv_tujuan != NULL ? $this->Ivtxbrminta_model->get_detail('id', $row->penginv_tujuan, 'dt_divisi')->divisi_name : 'Tidak ada divisi tujuan.',
                    'penginv_drtujuan' => $row->penginv_drtujuan,
                    'divRuangName' => $row->penginv_drtujuan != NULL ? $this->Ivtxbrminta_model->get_detail('id', $row->penginv_drtujuan, 'dt_ruang')->ruang_nama : 'Tidak ada ruangan tujuan.',
                    'user_create' => $row->user_create,
                    'simpan_status' => $row->simpan_status
                );
            }
        }

        echo json_encode(array('success' => 'true', 'data' => $listpb, 'message' => 'Daftar semua Pengadaan Barang'));
    }
    
    public function list_mintainv_detail() {
        $records = isset($_GET['filter']);
        $record = array();
        $listpbd = array();

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

        $result = $this->Ivtxbrminta_model->gets($record, NULL, 'trx_penginv_detail');

        if ($result != NULL) {
            foreach ($result as $row) {
                $det_barang = $this->Ivtxbrminta_model->get_detail('id', $row->barang_id, 'dt_item');

                $listpbd[] = array(
                    'id' => $row->id,
                    'penginv_id' => $row->id,
                    'penginv_no' => $this->Ivtxbrminta_model->get_detail('id', $row->penginv_id, 'trx_penginv')->penginv_no,
                    'barang_id' => $row->barang_id,
                    'barangName' => $det_barang->mi_name,
                    'barang_qty_minta' => $row->barang_qty_minta,
                    'barang_qty_kirim' => $row->barang_qty_kirim,
                    'barang_qty_terima' => $row->barang_qty_terima,
                    'minta_status' => $row->minta_status,
                    'kirim_status' => $row->kirim_status,
                    'terima_status' => $row->terima_status,
                    'tgl_kirim' => $row->tgl_kirim,
                    'tgl_terima' => $row->tgl_terima,
                    'user_kirim' => $row->user_kirim,
                    'user_terima' => $row->user_terima,
                    'brg_klr_stat' => $row->brg_klr_stat,
                    'no_brg_msk' => $row->no_brg_msk
                );
            }
        }

        echo json_encode(array('success' => 'true', 'data' => $listpbd, 'message' => 'Daftar semua Detail Pengadaan Barang'));
    }
    
    public function approve_ivtxbrminta() {
        $id = $this->input->post('data');
//        $group = array('admin', 'supervisor');

        if ($this->user->id != 1) {
            echo json_encode(array('success' => 'false', 'message' => 'Anda tidak mempunyai hak melakukan Approval', 'data' => '2'));
            return;
        }

//        $app = array(
//            'appr_status' => 1,
//        );
//
//        $opta[] = array('field' => 'pengdiv_id', 'param' => 'where', 'operator' => '', 'value' => $id);
//        $this->pmodel->update($app, $opta, NULL, 'trx_penginv_detail');
//
//        $optb[] = array('field' => 'id', 'param' => 'where', 'operator' => '', 'value' => $id);
//        $this->pmodel->update($app, $optb, NULL, 'trx_penginv');

        echo json_encode(array('success' => 'true', 'message' => 'Data Telah di Approve', 'data' => '1'));
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
}