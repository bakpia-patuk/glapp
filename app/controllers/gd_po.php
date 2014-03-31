<?php

/**
 * Description of data_model
 *
 * @author Azelia
 */
if (!defined('BASEPATH')) {
    exit('No direct script access allowed');
}

class Gd_po extends Auth_Controller {

    function __construct() {
        parent::__construct();
        $this->load->model('Gdpo_model');
    }

    public function reset() {
        
    }

    public function insert_item() {
        
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
            'peng_qty' => $insert['peng_qty'],
            'peng_harga' => $item->mi_item_price,
            'peng_disc' => $item->mi_diskon,
            'peng_ppn' => $item->mi_ppn,
            'qty_po' => 0,
            'po_merk' => $item->mi_merk,
            'po_katalog' => $item->mi_katalog,
            'po_kemasan' => $insert['peng_kemasan'],
            'po_qty' => $insert['peng_qty'],
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

        if ($detail->peng_statusdiv == 1) {
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
        $insert = $this->input->post(NULL, TRUE);

        if (!$this->__cek_approval_add($insert['id'])) {
            echo json_encode(array('success' => 'false', 'data' => NULL, 'title' => 'Error', 'msg' => 'Anda tidak bisa menghapus pengadaan yang sudah di approve'));
            return;
        }

        if ($insert['id'] != 0) {
            $params[] = array('field' => 'id', 'param' => 'where', 'operator' => '', 'value' => $insert['id']);
            if (!$this->Gdpengadaan_model->delete($params, NULL, 'trx_pengadaan')) {
                echo json_encode(array('success' => 'false', 'data' => NULL, 'title' => 'Info', 'msg' => $this->catch_db_err()));
                return;
            }
        }

        $this->Gdpengadaan_model->generate_user_log($this->user->id, $this->user->cabang_id, 'DELETE PENGADAAN', 'TRX_PENGADAAN');
        echo json_encode(array('success' => 'true', 'data' => NULL, 'title' => 'Info', 'msg' => 'Delete Success'));
    }

    public function delete_item() {
        $insert = $this->input->post(NULL, TRUE);

        $peng_id = $this->Gdpengadaan_model->get_detail('id', $insert['id'], 'trx_pengadaan_detail')->pengadaan_id;
        if (!$this->__cek_approval_add($peng_id)) {
            echo json_encode(array('success' => 'false', 'data' => NULL, 'title' => 'Error', 'msg' => 'Anda tidak bisa menghapus item pengadaan yang sudah di approve'));
            return;
        }

        if ($insert['id'] != 0) {
            $params[] = array('field' => 'id', 'param' => 'where', 'operator' => '', 'value' => $insert['id']);
            if (!$this->Gdpengadaan_model->delete($params, NULL, 'trx_pengadaan_detail')) {
                echo json_encode(array('success' => 'false', 'data' => NULL, 'title' => 'Info', 'msg' => $this->catch_db_err()));
                return;
            }
        }

        $this->Gdpengadaan_model->generate_user_log($this->user->id, $this->user->cabang_id, 'DELETE ITEM PENGADAAN', 'TRX_PENGADAAN');
        echo json_encode(array('success' => 'true', 'data' => NULL, 'title' => 'Info', 'msg' => 'Delete Success'));
    }

    public function approve_cabang() {
        $id = rtrim($this->input->post('id'), '-');
        $data = explode('-', $id);

        if (!$this->__check_usergr()) {
            echo json_encode(array('success' => 'false', 'data' => NULL, 'title' => 'Error', 'msg' => 'Anda tidak mempunyai hak untuk approval'));
            return;
        }

        foreach ($data as $row) {
            $this->Gdpengadaan_model->approve_peng('peng_statusdiv', $row);
        }

        $this->Gdpengadaan_model->generate_user_log($this->user->id, $this->user->cabang_id, 'APPROVE_CB', 'TRX_PENGADAAN');
        echo json_encode(array('success' => 'true', 'data' => NULL, 'title' => 'Info', 'msg' => 'Approve Pengadaan Success'));
    }

    public function approve_pusat() {
        $id = rtrim($this->input->post('id'), '-');
        $data = explode('-', $id);

        if (!$this->__check_usergr()) {
            echo json_encode(array('success' => 'false', 'data' => NULL, 'title' => 'Error', 'msg' => 'Anda tidak mempunyai hak untuk approval'));
            return;
        }

        foreach ($data as $row) {
            $this->Gdpengadaan_model->approve_peng('peng_statuspst', $row);
        }

        $this->Gdpengadaan_model->generate_user_log($this->user->id, $this->user->cabang_id, 'APPROVE_PST', 'TRX_PENGADAAN');
        echo json_encode(array('success' => 'true', 'data' => NULL, 'title' => 'Info', 'msg' => 'Approve Pengadaan Success'));
    }

    public function list_pengadaan_all() {
        $records = $this->input->get('filter');
        $params = array();
        
        if ($records) {
            $raw_record = json_decode($records, true);
            $params = $this->generate_db_query($raw_record);
        } else {
            $params[] = array('field' => 'trx_pengadaan.cabang_id', 'param' => 'where', 'operator' => ' <=', 'value' => $this->user->cabang_id);
        }

        $params[] = array('field' => 'trx_pengadaan.peng_statusdiv', 'param' => 'where', 'operator' => '', 'value' => 1);
        $params[] = array('field' => 'trx_pengadaan.peng_statuspst', 'param' => 'where', 'operator' => '', 'value' => 1);
        $params[] = array('field' => 'trx_pengadaan.po_status', 'param' => 'where', 'operator' => ' !=', 'value' => 1);

        $opt['sortBy'] = 'trx_pengadaan.id';
        $opt['sortDirection'] = 'ASC';

        $result = $this->Gdpo_model->get_peng_list($params, $opt);

        if ($result != NULL) {
            echo json_encode(array('success' => 'true', 'data' => $result, 'title' => 'Info', 'msg' => 'List All Pengadaan'));
        } else {
            echo json_encode(array('success' => 'true', 'data' => NULL, 'title' => 'Info', 'msg' => 'Tidak ada data'));
        }
    }

    public function list_po_all() {
        $records = $this->input->get('filter');
        $params = array();

        if ($records) {
            $raw_record = json_decode($records, true);
            $params = $this->generate_db_query($raw_record);
        } else {
            $params[] = array('field' => 'tgl_trx', 'param' => 'where', 'operator' => ' >=', 'value' => mdate("%Y-%m-%d 00:00:00", now()));
            $params[] = array('field' => 'tgl_trx', 'param' => 'where', 'operator' => ' <=', 'value' => mdate("%Y-%m-%d 23:59:59", now()));
            $params[] = array('field' => 'cabang_id', 'param' => 'where', 'operator' => ' <=', 'value' => $this->user->cabang_id);
        }

        $tablename = 'trx_po';
        $opt['sortBy'] = 'id';
        $opt['sortDirection'] = 'ASC';

        $result = $this->Gdpengadaan_model->gets($params, $opt, $tablename);
        $no = 0;

        if ($result != NULL) {
            foreach ($result as $row) {
                $result[$no]->tgl_trx = explode(' ', $row->tgl_trx)[0];
                $result[$no]->cabang_name = $this->Gdpengadaan_model->get_detail('id', $row->cabang_id, 'dt_cabang')->cabang_alias;
                $result[$no]->divisi_name = $this->Gdpengadaan_model->get_detail('id', $row->divisi, 'dt_divisi')->divisi_name;
                $result[$no]->peng_class_row = $this->__return_csspeng($row->id);
                $no++;
            }
            echo json_encode(array('success' => 'true', 'data' => $result, 'title' => 'Info', 'msg' => 'List All Pengadaan'));
        } else {
            echo json_encode(array('success' => 'true', 'data' => NULL, 'title' => 'Info', 'msg' => 'Tidak ada data'));
        }
    }

    public function list_po_detail() {
        $records = $this->input->get('filter');
        $params = array();

        if ($records) {
            $raw_record = json_decode($records, true);
            $params = $this->generate_db_query($raw_record);
        }

        $tablename = 'trx_pengadaan_detail';
        $opt['sortBy'] = 'id';
        $opt['sortDirection'] = 'ASC';

        $result = $this->Gdpengadaan_model->gets($params, $opt, $tablename);
        $no = 0;

        if ($result != NULL) {
            foreach ($result as $row) {
                $barang = $this->Gdpengadaan_model->get_item_detail($row->barang_id);
                $result[$no]->barang_name = $barang->mi_name;
                $result[$no]->merk_name = $this->Gdpengadaan_model->get_detail('id', $barang->mi_merk, 'dt_merk')->merk_name;
                $no++;
            }
            echo json_encode(array('success' => 'true', 'data' => $result, 'title' => 'Info', 'msg' => 'List All Pengadaan Detail'));
        } else {
            echo json_encode(array('success' => 'true', 'data' => NULL, 'title' => 'Info', 'msg' => 'Tidak ada data'));
        }
    }

    private function __return_csspeng($id) {
        $peng_detail = $this->Gdpengadaan_model->get_detail('id', $id, 'trx_pengadaan');

        if ($peng_detail->peng_type == 0) {
            $po_status = $peng_detail->po_status;
            $peng_statusdiv = $peng_detail->peng_statusdiv;
            $peng_statuspst = $peng_detail->peng_statuspst;

            if ($po_status == 0 && $peng_statusdiv == 0 && $peng_statuspst == 0) {
                return 'peng-null';
            } else if ($po_status == 0 && $peng_statusdiv == 1 && $peng_statuspst == 0) {
                return 'peng-div';
            } else if ($po_status == 0 && $peng_statusdiv == 1 && $peng_statuspst == 1) {
                return 'peng-pusat';
            } else if ($po_status == 2 && $peng_statusdiv == 1 && $peng_statuspst == 1) {
                return 'peng-pobag';
            } else if ($po_status == 1 && $peng_statusdiv == 1 && $peng_statuspst == 1) {
                return 'peng-poall';
            } else {
                return 'peng-grey';
            }
        }
    }

}
