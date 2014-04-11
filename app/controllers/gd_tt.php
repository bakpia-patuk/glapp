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
        $this->Gdtt_model->cms_db = $this->load->database('outgoing', TRUE);
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

            $param_del[] = array('field' => 'stk_trxreftype', 'param' => 'where', 'operator' => '', 'value' => 'ttgudang');
            $param_del[] = array('field' => 'stk_trxref', 'param' => 'where', 'operator' => '', 'value' => $insert['id']);
            $this->Gdtt_model->delete($param_del, NULL, 'trx_stock_lot');

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
        $params = array();
        $params[] = array('field' => 'tt_id', 'param' => 'where', 'operator' => '', 'value' => $insert['id']);
        $data_po = $this->Gdtt_model->gets($params, NULL, 'trx_po_detail');
        foreach ($data_po as $row) {
            if ($row->tt_qty_kirim == 0) {
                echo json_encode(array('success' => 'false', 'data' => NULL, 'title' => 'ERROR', 'msg' => 'Anda belum memasukan jumlah barang'));
                return;
            }
            $params = array();
            $params[] = array('field' => 'tt_po_id', 'param' => 'where', 'operator' => '', 'value' => $row->po_id);
            $result = $this->Gdtt_model->gets($params, NULL, 'trx_tt_detail');
            $barang_terkirim = 0;
            if ($result) {
                foreach ($result as $key) {

                    $barang_terkirim+=$key->tt_qty_kirim;
                }

                if (($barang_terkirim + $row->tt_qty_kirim) > $row->barang_qty) {
                    echo json_encode(array('success' => 'false', 'data' => NULL, 'title' => 'ERROR', 'msg' => 'Anda jumlah barang lebih dari permintaan'));
                    return;
                }
            }
        }
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
        if (!$this->__final_tt($insert)) {
            echo json_encode(array('success' => 'false', 'data' => NULL, 'title' => 'Info', 'msg' => $this->catch_db_err()));
            return;
        }

        if (!$this->__set_tt($insert['id'])) {
            echo json_encode(array('success' => 'false', 'data' => NULL, 'title' => 'Info', 'msg' => $this->catch_db_err()));
            return;
        }

        //Masuk ke trx stock div
        $params = array();
        $params[] = array('field' => 'cabang_id', 'param' => 'where', 'operator' => '', 'value' => $this->user->cabang_id);
        $params[] = array('field' => 'ruang_nama', 'param' => 'where', 'operator' => '', 'value' => 'R. GUDANG');
        $data_ruang = $this->Gdtt_model->get($params, NULL, 'dt_ruang');


        $params = array();
        $params[] = array('field' => 'stk_trxref', 'param' => 'where', 'operator' => '', 'value' => $insert['id']);
        $params[] = array('field' => 'stk_trxreftype', 'param' => 'where', 'operator' => '', 'value' => 'ttgudang');
        $data_stok_detail = $this->Gdtt_model->gets($params, NULL, 'trx_stock');

        $data_stok_syn = array();
        $data_stok_div_syn = array();
        foreach ($data_stok_detail as $key) {

            $data_stok_syn[] = array('data' => $key, 'id' => $key->id);
            $data = array();
            $data['id_ruang'] = $key->stk_ruangid;
            $data['trxreftype'] = 'ttgudang';
            $data['id_cabang '] = $key->stk_cabangid;
            $data['id_barang'] = $key->stk_barangid;
            $data['jmlh_stok'] = $key->stk_qty;
            $data['jenis_trx'] = 1;
            $data['trx_stok'] = $key->id;
            $data['simpan_status'] = 1;
            $id_stok_div = $this->Gdtt_model->insert($data, 'trx_stok_div');
            $id_stok_div = $id_stok_div . '.' . $this->user->cabang_id;
            $data_stok_div_syn[] = array('data' => $data, 'id' => $id_stok_div);
        }


        $params = array();
        $params[] = array('field' => 'tt_id', 'param' => 'where', 'operator' => '', 'value' => $insert['id']);
        $data_po = $this->Gdtt_model->gets($params, NULL, 'trx_po_detail');
        foreach ($data_po as $key) {
            $data_json = json_encode($key);

            $data = array();

            $data['jumlah'] = 1;

            $data['tujuan'] = 1;
            $data['id_cabang'] = $this->user->cabang_id;

            $no = $this->Gdtt_model->insert_outgoing($data, 'head');

            $data = array();
            $data['data'] = $data_json;
            $data['head_id '] = $no . '.' . $this->user->cabang_id;
            $data['primary_key'] = $key->id;
            $data['table_name'] = 'trx_po_detail';

            $this->Gdtt_model->insert_outgoing($data, 'detail');
        }


        $params = array();
        $params[] = array('field' => 'id', 'param' => 'where', 'operator' => '', 'value' => $insert['id']);
        $data_po = $this->Gdtt_model->gets($params, NULL, 'trx_tt');
        foreach ($data_po as $key) {
            $data_json = json_encode($key);

            $data = array();

            $data['jumlah'] = 1;

            $data['tujuan'] = 1;
            $data['id_cabang'] = $this->user->cabang_id;

            $no = $this->Gdtt_model->insert_outgoing($data, 'head');

            $data = array();
            $data['data'] = $data_json;
            $data['head_id '] = $no . '.' . $this->user->cabang_id;
            $data['primary_key'] = $key->id;
            $data['table_name'] = 'trx_tt';

            $this->Gdtt_model->insert_outgoing($data, 'detail');
        }

        $params = array();
        $params[] = array('field' => 'tt_id', 'param' => 'where', 'operator' => '', 'value' => $insert['id']);
        $data_po = $this->Gdtt_model->gets($params, NULL, 'trx_tt_detail');
        foreach ($data_po as $key) {
            $data_json = json_encode($key);

            $data = array();

            $data['jumlah'] = 1;

            $data['tujuan'] = 1;
            $data['id_cabang'] = $this->user->cabang_id;

            $no = $this->Gdtt_model->insert_outgoing($data, 'head');

            $data = array();
            $data['data'] = $data_json;
            $data['head_id '] = $no . '.' . $this->user->cabang_id;
            $data['primary_key'] = $key->id;
            $data['table_name'] = 'trx_tt_detail';

            $this->Gdtt_model->insert_outgoing($data, 'detail');
        }

        $params = array();
        $params[] = array('field' => 'stk_trxref', 'param' => 'where', 'operator' => '', 'value' => $insert['id']);
        $data_po = $this->Gdtt_model->gets($params, NULL, 'trx_stock_lot');
        foreach ($data_po as $key) {


            $data_json = json_encode($key);

            $data = array();

            $data['jumlah'] = 1;

            $data['tujuan'] = 1;
            $data['id_cabang'] = $this->user->cabang_id;

            $no = $this->Gdtt_model->insert_outgoing($data, 'head');

            $data = array();
            $data['data'] = $data_json;
            $data['head_id '] = $no . '.' . $this->user->cabang_id;
            $data['primary_key'] = $key->id;
            $data['table_name'] = 'trx_stock_lot';

            $this->Gdtt_model->insert_outgoing($data, 'detail');

            unset($key->no);
            unset($key->id);
            $this->Gdtt_model->insert($key, 'trx_stock_lotdiv');
        }

        foreach ($data_stok_syn as $key) {
            $data_json = json_encode($key['data']);

            $data = array();

            $data['jumlah'] = 1;

            $data['tujuan'] = 1;
            $data['id_cabang'] = $this->user->cabang_id;

            $no = $this->Gdtt_model->insert_outgoing($data, 'head');

            $data = array();
            $data['data'] = $data_json;
            $data['head_id '] = $no . '.' . $this->user->cabang_id;
            $data['primary_key'] = $key['id'];
            $data['table_name'] = 'trx_stock';

            $this->Gdtt_model->insert_outgoing($data, 'detail');
        }

        foreach ($data_stok_div_syn as $key) {
            $data_json = json_encode($key['data']);

            $data = array();

            $data['jumlah'] = 1;

            $data['tujuan'] = 1;
            $data['id_cabang'] = $this->user->cabang_id;

            $no = $this->Gdtt_model->insert_outgoing($data, 'head');

            $data = array();
            $data['data'] = $data_json;
            $data['head_id '] = $no . '.' . $this->user->cabang_id;
            $data['primary_key'] = $key['id'];
            $data['table_name'] = 'trx_stok_div';

            $this->Gdtt_model->insert_outgoing($data, 'detail');
        }

        $this->Gdtt_model->generate_user_log($this->user->id, $this->user->cabang_id, 'INSERT', 'TRX_TT');


        echo json_encode(array('success' => 'true', 'data' => $insert['id'], 'title' => 'Info', 'msg' => 'Insert Tt Success'));
    }

    private function __set_tt($id_tt) {
        $params[] = array('field' => 'tt_id', 'param' => 'where', 'operator' => '', 'value' => $id_tt);
        $data_po = $this->Gdtt_model->gets($params, NULL, 'trx_po_detail');

        foreach ($data_po as $row) {
            $this->Gdtt_model->insert_tt_item($row->id);
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

    private function __final_tt($insert) {
        $filename = 'assets/ttd_tx/ttSign' . $insert['id'] . 'NULL_.png';
        $newfile2 = 'assets/ttd_tx/tt/tt_' . $insert['id'] . "_sign.png";

        $data = array(
            'tt_penerima' => $insert['tt_penerima'],
            'tt_urlsign2' => $newfile2,
            'tt_desc' => $insert['tt_desc'],
            'simpan_status' => 1
        );

        $params[] = array('field' => 'id', 'param' => 'where', 'operator' => '', 'value' => $insert['id']);
        if (!$this->Gdtt_model->update($data, $params, NULL, 'trx_tt')) {
            return FALSE;
        }

        if (!copy($filename, $newfile2)) {
            return FALSE;
        }

        if (file_exists($filename)) {
            unlink($filename);
        }

        return TRUE;
    }

    public function edit_peng_tt() {
        $insert = $this->input->post(NULL, TRUE);

        if ($insert['tt_id'] != 0) {
            //$this->Gdtt_model->get_detail('id',$insert['id'],'trx_po_detail');
            $data = array(
                'tt_qty_kirim' => $insert['tt_qty_kirim']
            );

            $opt[] = array('field' => 'id', 'param' => 'where', 'operator' => '', 'value' => $insert['id']);
            $this->Gdtt_model->update($data, $opt, NULL, 'trx_po_detail');

            $param_del[] = array('field' => 'stk_trxreftype', 'param' => 'where', 'operator' => '', 'value' => 'ttgudang');
            $param_del[] = array('field' => 'stk_trxref', 'param' => 'where', 'operator' => '', 'value' => $insert['tt_id']);
            $this->Gdtt_model->delete($param_del, NULL, 'trx_stock_lot');
        }

        echo json_encode(array('success' => 'true', 'data' => $insert['id']));
    }

    public function save_lot() {
        $insert = $this->input->post(NULL, TRUE);
        $last_no = $this->Gdtt_model->get_last('trx_stock_lot');

        $data = array(
            'id' => $last_no . '.' . $this->user->cabang_id,
            'stl_date' => mdate("%Y-%m-%d %H:%i:%s", time()),
            'stl_cabangid' => $this->user->cabang_id,
            'stl_divisiid' => $this->user->divisi_id,
            'stl_ruangid' => $this->Gdtt_model->__gudang_pusat($this->user->cabang_id),
            'stl_usercreate' => $this->user->id,
            'stl_barangid' => $insert['stl_barangid'],
            'stl_nolot' => $insert['stl_nolot'],
            'stl_qty' => $insert['stl_qty'],
            'stl_qtylast' => $insert['stl_qty'],
            'stl_type' => 1,
            'stl_baranged' => mdate("%Y-%m-%d", strtotime($insert['stl_baranged'])),
            'stk_trxreftype' => $insert['stk_trxreftype'],
            'stk_trxref' => $insert['stk_trxref'],
            'stl_barcode' => $insert['stl_barcode'],
            'simpan_status' => 0
        );

        if (!$this->Gdtt_model->insert($data, 'trx_stock_lot')) {
            echo json_encode(array('success' => 'false', 'data' => NULL, 'title' => 'Info', 'msg' => $this->catch_db_err()));
            return;
        }

        $return = array(
            'barang_id' => $insert['stl_barangid'],
            'stk_trxref' => $insert['stk_trxref'],
            'barang_name' => $insert['stl_barangname'],
            'qty_tt' => $insert['qty_tt'],
        );
        echo json_encode(array('success' => 'true', 'data' => $return, 'title' => 'Info', 'msg' => 'Insert Lot Success'));
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
        $params[] = array('field' => 'tt_set', 'param' => 'where', 'operator' => ' !=', 'value' => 1);
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
                $result[$no]->merk_name = $barang->mi_merk != 0 ? $this->Gdtt_model->get_detail('id', $barang->mi_merk, 'dt_merk')->merk_name : '-';
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
            $params[] = array('field' => 'tt_tgltrx', 'param' => 'where', 'operator' => ' >=', 'value' => mdate("%Y-%m-%d 00:00:00", time()));
            $params[] = array('field' => 'tt_tgltrx', 'param' => 'where', 'operator' => ' <=', 'value' => mdate("%Y-%m-%d 23:59:59", time()));
        }

        $opt['sortBy'] = 'id';
        $opt['sortDirection'] = 'ASC';

        $result = $this->Gdtt_model->gets_all_tt($params, $opt);

        if ($result != NULL) {
            echo json_encode(array('success' => 'true', 'data' => $result, 'title' => 'Info', 'msg' => 'List All Pengadaan'));
        } else {
            echo json_encode(array('success' => 'true', 'data' => NULL, 'title' => 'Info', 'msg' => 'Tidak ada data'));
        }
    }

    public function list_tt_lot() {
        $records = $this->input->get('filter');
        $params = array();

        if ($records) {
            $raw_record = json_decode($records, true);
            $params = $this->generate_db_query($raw_record);
        }

        $tablename = 'trx_stock_lot';
        $opt['sortBy'] = 'id';
        $opt['sortDirection'] = 'ASC';

        $result = $this->Gdtt_model->gets($params, $opt, $tablename);

        if ($result != NULL) {
            echo json_encode(array('success' => 'true', 'data' => $result, 'title' => 'Info', 'msg' => 'List All Pengadaan Detail'));
        } else {
            echo json_encode(array('success' => 'true', 'data' => NULL, 'title' => 'Info', 'msg' => 'Tidak ada data'));
        }
    }

    public function print_tt($type, $id) {
        $tt = $this->Gdtt_model->get_detail('id', $id, 'trx_tt');
        $data['type'] = $type == 0 ? 'ASLI' : 'COPY';
        $data['tt_no'] = $tt->tt_no;
        $data['tt_tgl'] = mdate('%d %F %Y', strtotime($tt->tt_tgltrx));
        $data['tt_company'] = $this->Gdtt_model->get_detail('id', $tt->tt_supp_id, 'dt_supplier')->ms_name;
        $user_create = $this->Gdtt_model->get_detail('id', $tt->tt_petugas, 'users');

        $data['create_ttd'] = $user_create->ttd_url;
        $data['create_name'] = strtoupper($user_create->first_name . ' ' . $user_create->last_name);
        $data['app_ttd'] = $tt->tt_urlsign2;
        $data['app_name'] = strtoupper($tt->tt_penerima);
        $data['detail_tt'] = $this->Gdtt_model->get_tt_detail($id);

        $this->load->view('tt_invoice', $data);
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
            return TRUE;
        }

        return FALSE;
    }

    private function __check_lot($id) {
        $params[] = array('field' => 'tt_id', 'param' => 'where', 'operator' => '', 'value' => $id);
        $po_all = $this->Gdtt_model->gets($params, NULL, 'trx_po_detail');
        $penampung = array();

        foreach ($po_all as $row) {
            $barang_lot = $this->Gdtt_model->get_item_detail($row->barang_id)->mi_nolot;

            if ($barang_lot == 0) {
                array_push($penampung, 1);
            } else {
                $data = $this->Gdtt_model->check_trx_lot($this->user, $row->barang_id, $id, NULL, NULL, 'ttgudang');
                array_push($penampung, $data);
            }
        }

        if (!in_array(0, $penampung)) {
            return TRUE;
        }

        return FALSE;
    }

}
