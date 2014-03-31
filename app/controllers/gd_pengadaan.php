<?php

/**
 * Description of data_model
 *
 * @author Azelia
 */
if (!defined('BASEPATH')) {
    exit('No direct script access allowed');
}

class Gd_pengadaan extends Auth_Controller {

    function __construct() {
        parent::__construct();
        $this->load->model('Gdpengadaan_model');
    }

    public function reset() {
        $insert = $this->input->post(NULL, TRUE);
        if ($insert['id'] != 0) {
            $params[] = array('field' => 'id', 'param' => 'where', 'operator' => '', 'value' => $insert['id']);
            if (!$this->Gdpengadaan_model->delete($params, NULL, 'trx_pengadaan')) {
                echo json_encode(array('success' => 'false', 'data' => NULL, 'title' => 'Info', 'msg' => $this->catch_db_err()));
                return;
            }
        }

        echo json_encode(array('success' => 'true', 'data' => NULL, 'title' => 'Info', 'msg' => 'Reset All Data'));
    }

    public function insert_item() {
        $insert = $this->input->post(NULL, TRUE);

        if ($insert['id'] == 0) {
            $insert['id'] = $this->__init_peng($insert);
            if ($insert['id'] == NULL) {
                echo json_encode(array('success' => 'false', 'data' => NULL, 'title' => 'Error', 'msg' => $this->catch_db_err()));
                return;
            }
        }

        if (!$this->__cek_approval_add($insert['id'])) {
            echo json_encode(array('success' => 'false', 'data' => NULL, 'title' => 'Error', 'msg' => 'Anda tidak bisa menambah barang.'));
            return;
        }

        $result = $this->__set_item($insert);

        if (!$result) {
            echo json_encode(array('success' => 'false', 'data' => NULL, 'title' => 'Error', 'msg' => $this->catch_db_err()));
            return;
        }

        $detail_peng = $this->Gdpengadaan_model->get_detail('id', $insert['id'], 'trx_pengadaan');

        $data_rtr = array(
            'id' => $insert['id'],
            'no_peng' => $detail_peng->no_pengadaan
        );

        echo json_encode(array('success' => 'true', 'data' => $data_rtr, 'title' => 'Info', 'msg' => 'Insert Success'));
    }

    private function __init_peng($insert) {
        $last_no = $this->Gdpengadaan_model->get_last('trx_pengadaan');
        $detail_cabang = $this->Gdpengadaan_model->get_detail('id', $this->user->cabang_id, 'dt_cabang');

        $data = array(
            'id' => $last_no . '.' . $this->user->cabang_id,
            'tgl_trx' => mdate('%Y-%m-%d %H:%i:%s', strtotime($insert['tgl_butuh'])),
            'no_pengadaan' => sprintf('%06d', $last_no) . '/' . $detail_cabang->cabang_code . '/' . mdate('%Y%m%d', now()),
            'tgl_butuh' => mdate('%Y-%m-%d', strtotime($insert['tgl_butuh'])),
            'cabang_id' => $this->user->cabang_id,
            'divisi' => $this->user->divisi_id,
            'keterangan' => '',
            'petugas_id' => $this->user->id
        );

        if ($this->Gdpengadaan_model->insert($data, 'trx_pengadaan')) {
            return $last_no . '.' . $this->user->cabang_id;
        } else {
            return NULL;
        }
    }

    private function __set_item($insert) {
        $last_no = $this->Gdpengadaan_model->get_last('trx_pengadaan_detail');
        $item = $this->Gdpengadaan_model->get_item_detail($insert['barang_id']);
        $data = array(
            'id' => $last_no . '.' . $this->user->cabang_id,
            'cabang_id' => $this->user->cabang_id,
            'divisi' => $this->user->divisi_id,
            'pengadaan_id' => $insert['id'],
            'tgl_butuh' => mdate('%Y-%m-%d', strtotime($insert['tgl_butuh'])),
            'barang_gol' => $item->mi_parent_id,
            'barang_id' => $insert['barang_id'],
            'peng_merk' => $item->mi_merk,
            'peng_katalog' => $item->mi_katalog,
            'peng_kemasan' => $insert['peng_kemasan'],
            'peng_qty' => $insert['peng_kemasan'],
            'peng_harga' => $item->mi_item_price,
            'peng_disc' => $item->mi_diskon,
            'peng_ppn' => $item->mi_ppn,
            'qty_po' => 0,
            'po_merk' => $item->mi_merk,
            'po_katalog' => $item->mi_katalog,
            'po_kemasan' => $insert['peng_kemasan'],
            'po_qty' => $insert['peng_kemasan'],
            'po_harga' => $item->mi_item_price,
            'po_disc' => $item->mi_diskon,
            'po_ppn' => $item->mi_ppn,
            'po_status' => 0,
            'po_id' => 0,
            'barang_desc' => ""
        );

        if ($this->Gdpengadaan_model->insert($data, 'trx_pengadaan_detail')) {
            return TRUE;
        } else {
            return FALSE;
        }
    }

    private function __cek_approval_add($id) {
        $detail = $this->Gdpengadaan_model->get_detail('id', $id, 'trx_pengadaan');

        if ($detail->peng_statusmgr == 1) {
            return FALSE;
        }

        return TRUE;
    }

    public function save() {
        $insert = $this->input->post(NULL, TRUE);

        if ($insert['id'] == 0) {
            echo json_encode(array('success' => 'false', 'data' => NULL, 'title' => 'ERROR', 'msg' => 'Anda belum melakukan transaksi'));
            return;
        }

        $data = array('simpan_status' => 1);
        $params1[] = array('field' => 'id', 'param' => 'where', 'operator' => '', 'value' => $insert['id']);
        $params2[] = array('field' => 'pengadaan_id', 'param' => 'where', 'operator' => '', 'value' => $insert['id']);
        if (!$this->Gdpengadaan_model->update($data, $params1, NULL, 'trx_pengadaan')) {
            echo json_encode(array('success' => 'false', 'data' => NULL, 'title' => 'Info', 'msg' => $this->catch_db_err()));
            return;
        }
        if (!$this->Gdpengadaan_model->update($data, $params2, NULL, 'trx_pengadaan_detail')) {
            echo json_encode(array('success' => 'false', 'data' => NULL, 'title' => 'Info', 'msg' => $this->catch_db_err()));
            return;
        }
        
        $this->Gdpengadaan_model->generate_user_log($this->user->id, $this->user->cabang_id, 'INSERT', 'TRX_PENGADAAN');
        echo json_encode(array('success' => 'true', 'data' => NULL, 'title' => 'Info', 'msg' => 'Insert Pengadaan Success'));
    }

    public function delete() {
        echo json_encode(array('success' => 'true', 'data' => NULL, 'title' => 'Info', 'msg' => 'Delete Success'));
    }

    public function approve_cabang() {
        echo json_encode(array('success' => 'true', 'data' => NULL, 'title' => 'Info', 'msg' => 'Approval Success'));
    }

    public function approve_pusat() {
        echo json_encode(array('success' => 'true', 'data' => NULL, 'title' => 'Info', 'msg' => 'Approval Success'));
    }

    public function list_all() {
        echo json_encode(array('success' => 'true', 'data' => NULL, 'title' => 'Info', 'msg' => 'List All Data'));
    }

    public function list_detail() {
        echo json_encode(array('success' => 'true', 'data' => NULL, 'title' => 'Info', 'msg' => 'Lis All Data Detail'));
    }

}
