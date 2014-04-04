<?php

/**
 * Description of data_model
 *
 * @author Azelia
 */
if (!defined('BASEPATH')) {
    exit('No direct script access allowed');
}

class Gd_tt extends Auth_Controller {

    function __construct() {
        parent::__construct();
        $this->load->model('Gdtt_model');
    }

    public function reset() {
        $insert = $this->input->post(NULL, TRUE);

        if ($insert['id'] != 0) {
            $params[] = array('field' => 'id', 'param' => 'where', 'operator' => '', 'value' => $insert['id']);
            if (!$this->Gdtt_model->delete($params, NULL, 'trx_tt')) {
                echo json_encode(array('success' => 'false', 'data' => NULL, 'title' => 'Info', 'msg' => $this->catch_db_err()));
                return;
            }

            $data = array(
                'tt_status' => 0,
                'tt_id' => 0
            );

            $param[] = array('field' => 'tt_id', 'param' => 'where', 'operator' => '', 'value' => $insert['id']);
            if (!$this->Gdtt_model->update($data, $param, NULL, 'trx_po_detail')) {
                echo json_encode(array('success' => 'false', 'data' => NULL, 'title' => 'Info', 'msg' => $this->catch_db_err()));
                return;
            }

            $filename = 'assets/ttd_tx/ttSign' . $insert['id'] . 'NULL_.png';

            if (file_exists($filename)) {
                unlink($filename);
            }

            clearstatcache();
        }

        echo json_encode(array('success' => 'true', 'data' => NULL, 'title' => 'Info', 'msg' => 'Reset All Data'));
    }

    public function save() {
        $insert = $this->input->post(NULL, TRUE);

        if ($insert['id'] == 0) {
            echo json_encode(array('success' => 'false', 'data' => NULL, 'title' => 'ERROR', 'msg' => 'Anda belum melakukan transaksi'));
            return;
        }

        if (!$this->__check_ttd($insert['id'])) {
            echo json_encode(array('success' => 'false', 'data' => NULL, 'title' => 'ERROR', 'msg' => 'Belum ada Ttd Pengirim'));
            return;
        }

        if (!$this->__check_null($insert['id'])) {
            echo json_encode(array('success' => 'false', 'data' => NULL, 'title' => 'ERROR', 'msg' => 'Barang yang di kirim tidak boleh 0'));
            return;
        }

        if (!$this->__check_lot($insert['id'])) {
            echo json_encode(array('success' => 'false', 'data' => NULL, 'title' => 'ERROR', 'msg' => 'Jika barang mempunyai status LOT, harus di isi'));
            return;
        }
//        $params1[] = array('field' => 'id', 'param' => 'where', 'operator' => '', 'value' => $insert['id']);
//        if (!$this->Gdtt_model->update($data, $params1, NULL, 'trx_po')) {
//            echo json_encode(array('success' => 'false', 'data' => NULL, 'title' => 'Info', 'msg' => $this->catch_db_err()));
//            return;
//        }
//
//        if (!$this->__set_tt($insert['id'])) {
//            echo json_encode(array('success' => 'false', 'data' => NULL, 'title' => 'Info', 'msg' => $this->catch_db_err()));
//            return;
//        }
//
//        $this->Gdtt_model->generate_user_log($this->user->id, $this->user->cabang_id, 'INSERT', 'TRX_P0');
        echo json_encode(array('success' => 'true', 'data' => $insert['id'], 'title' => 'Info', 'msg' => 'Insert Tt Success'));
    }

    private function __set_tt($id_po) {
        $params[] = array('field' => 'po_id', 'param' => 'where', 'operator' => '', 'value' => $id_po);
        $data_pengadaan = $this->Gdtt_model->gets($params, NULL, 'trx_pengadaan_detail');

        foreach ($data_pengadaan as $row) {
            $this->Gdtt_model->insert_po_item($row->id);
        }

        return TRUE;
    }

    public function set_status($type) {
        $insert = $this->input->post(NULL, TRUE);

        if ($insert['id'] == 0) {
            $insert['id'] = $this->__init_tt($insert);
            if ($insert['id'] == 0) {
                echo json_encode(array('success' => 'false', 'data' => NULL, 'title' => 'Error', 'msg' => $this->catch_db_err()));
                return;
            }
        }

        $data = array(
            'tt_status' => $type == 1 ? 1 : 0,
            'tt_id' => $type == 1 ? $insert['id'] : 0
        );

        $params[] = array('field' => 'id', 'param' => 'where', 'operator' => '', 'value' => $insert['id_po']);
        if (!$this->Gdtt_model->update($data, $params, NULL, 'trx_po_detail')) {
            echo json_encode(array('success' => 'false', 'data' => NULL, 'title' => 'Info', 'msg' => $this->catch_db_err()));
            return;
        }

        $rtn = $this->Gdtt_model->get_detail('id', $insert['id'], 'trx_tt');
        $return = array(
            'id' => $rtn->id,
            'tt_no' => $rtn->tt_no
        );

        echo json_encode(array('success' => 'true', 'data' => $return, 'title' => 'Info', 'msg' => 'Insert Tt Success'));
    }

    private function __init_tt($insert) {
        $last_no = $this->Gdtt_model->get_last('trx_tt');
        $detail_cabang = $this->Gdtt_model->get_detail('id', $this->user->cabang_id, 'dt_cabang');

        $data = array(
            'id' => $last_no . '.' . $this->user->cabang_id,
            'tt_tgltrx' => mdate('%Y-%m-%d %H:%i:%s', now()),
            'tt_no' => 'TT' . '/' . $detail_cabang->cabang_code . '/' . mdate('%d%m%y', now()) . '/' . sprintf('%06d', $last_no),
            'tt_supp_id' => $insert['supplier'],
            'tt_cabang' => $this->user->cabang_id,
            'tt_petugas' => $this->user->id,
            'tt_urlsign' => $this->user->ttd_url,
            'simpan_status' => 0
        );

        if ($this->Gdtt_model->insert($data, 'trx_tt')) {
            return $last_no . '.' . $this->user->cabang_id;
        } else {
            return '0';
        }
    }

    public function edit_peng_tt() {
        $insert = $this->input->post(NULL, TRUE);

        $data = array(
            'po_qty' => $insert['po_qty'],
            'po_harga' => $insert['po_harga'],
            'po_disc' => $insert['po_disc'],
            'po_ppn' => $insert['po_ppn'],
            'po_katalog' => $insert['po_katalog'],
            'barang_desc' => $insert['barang_desc']
        );

        $opt[] = array('field' => 'id', 'param' => 'where', 'operator' => '', 'value' => $insert['id']);
        $this->Gdtt_model->update($data, $opt, NULL, 'trx_pengadaan_detail');
        $id_po = $this->Gdtt_model->get_detail('id', $insert['id'], 'trx_pengadaan_detail')->po_id;
        echo json_encode(array('success' => 'true', 'data' => $this->Gdtt_model->total_po($id_po)));
    }

    public function list_po_all() {
        $records = $this->input->get('filter');
        $params = array();

        if ($records) {
            $raw_record = json_decode($records, true);
            $params = $this->generate_db_query($raw_record);
        }

        $params[] = array('field' => 'po_ed', 'param' => 'where', 'operator' => ' >=', 'value' => mdate("%Y-%m-%d", now()));
        $params[] = array('field' => 'po_cabang_id', 'param' => 'where', 'operator' => '', 'value' => $this->user->cabang_id);
//        $params[] = array('field' => 'tt_status', 'param' => 'where', 'operator' => ' !=', 'value' => 1);
        $params[] = array('field' => 'tt_set', 'param' => 'where', 'operator' => '', 'value' => 0);
        $params[] = array('field' => 'simpan_status', 'param' => 'where', 'operator' => '', 'value' => 1);

        $opt['sortBy'] = 'po_id';
        $opt['sortDirection'] = 'ASC';

        $result = $this->Gdtt_model->gets($params, $opt, 'trx_po_detail');
        $no = 0;

        if ($result != NULL) {
            foreach ($result as $row) {
                $barang = $this->Gdtt_model->get_item_detail($row->barang_id);
                $result[$no]->barang_name = $barang->mi_name;
                $result[$no]->tt_qty_sisa = $this->Gdtt_model->get_tt_sisa($row->po_id, $row->peng_id, $row->barang_id);
                $result[$no]->merk_name = $this->Gdtt_model->get_detail('id', $barang->mi_merk, 'dt_merk')->merk_name;
                $no++;
            }
            echo json_encode(array('success' => 'true', 'data' => $result, 'title' => 'Info', 'msg' => 'List All PO Supplier'));
        } else {
            echo json_encode(array('success' => 'true', 'data' => NULL, 'title' => 'Info', 'msg' => 'Tidak ada data'));
        }
    }

    public function list_tt_all() {
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

        $result = $this->Gdtt_model->gets($params, $opt, $tablename);
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

    public function list_tt_detail() {
        $records = $this->input->get('filter');
        $params = array();

        if ($records) {
            $raw_record = json_decode($records, true);
            $params = $this->generate_db_query($raw_record);
        }

        $tablename = 'trx_pengadaan_detail';
        $opt['sortBy'] = 'id';
        $opt['sortDirection'] = 'ASC';

        $result = $this->Gdtt_model->gets($params, $opt, $tablename);
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

    public function print_tt($type, $id) {
        $po = $this->Gdtt_model->get_detail('id', $id, 'trx_po');
        $data['type'] = $type == 0 ? 'ASLI' : 'COPY';
        $data['po_no'] = $po->po_no;
        $data['po_tgl'] = mdate('%d %F %Y', strtotime($po->trx_date));
        $data['po_ed'] = mdate('%d %F %Y', strtotime($po->po_ed));
        $data['po_cabang'] = $this->Gdtt_model->get_detail('id', $po->po_cabangid, 'dt_cabang')->cabang_alias;
        $data['po_add'] = $this->Gdtt_model->get_detail('id', $po->po_cabangid, 'dt_cabang')->cabang_address;
        $data['po_company'] = $this->Gdtt_model->get_detail('id', $po->po_suppid, 'dt_supplier')->ms_name;
        $data['po_company_add'] = $this->Gdtt_model->get_detail('id', $po->po_suppid, 'dt_supplier')->ms_alamat;
        $data['po_company_cp'] = $this->Gdtt_model->get_detail('id', $po->po_suppid, 'dt_supplier')->ms_contact1 . ', Telp. ' . $this->Gdtt_model->get_detail('id', $po->po_suppid, 'dt_supplier')->ms_telp;
        $data['pembayaran'] = $po->po_isangsuran == 0 ? 'ANGSURAN' : ($po->po_isangsuran == 1 ? '2 MINGGU' : ($po->po_isangsuran == 2 ? '3 MINGGU' : '1 BULAN'));
        $user_create = $this->Gdtt_model->get_detail('id', $po->po_usercreate, 'users');
        $user_app = $this->Gdtt_model->get_detail('id', 76, 'users');

        $data['create_ttd'] = $user_create->ttd_url;
        $data['create_name'] = strtoupper($user_create->first_name . ' ' . $user_create->last_name);

        $data['app_ttd'] = $user_app->ttd_url;
        $data['app_name'] = strtoupper($user_app->first_name . ' ' . $user_app->last_name);
        $data['detail_po'] = $this->Gdtt_model->get_po_detail($id);

        $this->load->view('po_invoice', $data);
    }

    private function __check_ttd($id) {
        $filename = 'assets/ttd_tx/ttSign' . $id . 'NULL_.png';

        if (!file_exists($filename)) {
            return FALSE;
        }

        return TRUE;
    }

    private function __check_null($id) {
        $params[] = array('field' => 'tt_id', 'param' => 'where', 'operator' => '', 'value' => $id);
        $po_all = $this->Gdtt_model->gets($params, NULL, 'trx_po_detail');
        $penampung = array();
        foreach ($po_all as $row) {
            if ($row->tt_qty_kirim == 0) {
                array_push($penampung, 0);
            } else {
                array_push($penampung, 1);
            }
        }

        if (!in_array(0, $penampung)) {
            return FALSE;
        }
        
        return TRUE;
    }

}
