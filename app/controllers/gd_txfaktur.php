<?php

if (!defined('BASEPATH')) {
    exit('No direct script access allowed');
}

/**
 * Description of data_model
 *
 * @author Coepoe
 */
class Gd_txfaktur extends Auth_Controller {

    function __construct() {
        parent::__construct();
        $this->load->model('Gdtxfaktur_model');
        $this->Gdtxfaktur_model->cms_db = $this->load->database('outgoing', TRUE);
    }

    public function tt_list() {
        $records = isset($_GET['filter']);
        $record = array();
        $listpo = array();

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

        $result = $this->Gdtxfaktur_model->gets($record, NULL, 'trx_tt');

        if ($result != NULL) {
            foreach ($result as $row) {
//                $sup_detail = $this->Gdtxfaktur_model->get_detail('id', $row->tt_supp_id, 'ms_supplier');

                $listpo[] = array(
                    'id' => $row->id,
                    'tt_tgltrx' => explode(' ', $row->tt_tgltrx)[0],
                    'tt_cabang' => $row->tt_cabang,
                    'tt_no' => $row->tt_no,
                    'tt_supp_id' => $row->tt_supp_id,
//                    'ms_name' => $sup_detail->ms_name,
                    'tt_petugas' => $row->tt_petugas,
                    'tt_urlsign' => $row->tt_urlsign,
                    'simpan_status' => $row->simpan_status,
                    'tt_penerima' => $row->tt_penerima,
                    'tt_urlsign2' => $row->tt_urlsign2,
                    'tt_desc' => $row->tt_desc,
                    'tt_fkstatus' => $row->tt_fkstatus
                );
            }
        }

        if ($result) {
            echo json_encode(array('success' => 'true', 'data' => $listpo, 'message' => 'Daftar semua TT'));
        } else {
            echo json_encode(array('success' => 'true', 'data' => $listpo, 'message' => 'Tidak ada data TT'));
        }
    }

    public function tt_detail_list() {
        $records = isset($_GET['filter']);
        $record = array();
        $listpo = array();

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

        $result = $this->Gdtxfaktur_model->gets($record, NULL, 'trx_tt_detail');

        if ($result != NULL) {
            foreach ($result as $row) {
//                $item_id = $row->tt_barang_id;
//                $detail_item = $this->Gdtxfaktur_model->get_detail('id', $item_id, 'master_item_' . $this->ion_auth->user()->row()->cabang_id);

                $listpo[] = array(
                    'id' => $row->id,
                    'tt_id' => $row->tt_id,
//                    'ttNo' => $this->Gdtxfaktur_model->get_detail('id', $row->tt_id, 'trx_tt')->tt_no,
                    'ttPoId' => $row->tt_po_id,
//                    'ttPoNo' => $this->Gdtxfaktur_model->get_detail('id', $row->tt_po_id, 'trx_po')->po_no,
//                    'ttPoExp' => $this->Gdtxfaktur_model->get_detail('id', $row->tt_po_id, 'trx_po')->po_ed,
                    'tt_peng_id' => $row->tt_peng_id,
                    'tt_barang_id' => $row->tt_barang_id,
//                    'ttBarangName' => $detail_item->mi_name,
                    'tt_supp_id' => $row->tt_supp_id,
                    'tt_qty_pesan' => $row->tt_qty_pesan,
                    'tt_qty_kirim' => $row->tt_qty_kirim,
                    'tt_qty_sisa' => $row->tt_qty_sisa,
                    'tt_harga' => $row->tt_harga,
                    'tt_disc' => $row->tt_disc,
                    'tt_ppn' => $row->tt_ppn,
                    'tt_faktur_status' => $row->tt_faktur_status,
                    'simpan_status' => $row->simpan_status
                );
            }
        }

        if ($result) {
            echo json_encode(array('success' => 'true', 'data' => $listpo, 'message' => 'Daftar semua Detail PO'));
        } else {
            echo json_encode(array('success' => 'true', 'data' => $listpo, 'message' => 'Tidak ada data Detail PO'));
        }
    }

    public function trx_faktur() {
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

        $result = $this->Gdtxfaktur_model->gets($params, NULL, 'trx_faktur');
        $listpo = array();
        if ($result != NULL) {
            foreach ($result as $row) {
                $tgl = explode(' ', $row->faktur_tgl);

                $listpo[] = array(
                    'id' => $row->id,
                    'faktur_tgl' => $tgl[0],
                    'faktur_suppid' => $row->faktur_suppid,
//                    'fktSuppNama' => $this->Gdtxfaktur_model->get_detail('id', $row->faktur_suppid, 'master_supplier')->ms_name,
                    'faktur_no' => $row->faktur_no,
                    'faktur_nototal' => $row->faktur_nototal,
                    'faktur_bayar' => $row->faktur_bayar,
                    'faktur_bgstatus' => $row->faktur_bgstatus,
                    'faktur_cabang' => $row->faktur_cabang,
//                    'fktCabangName' => $this->Gdtxfaktur_model->get_detail('id', $row->faktur_cabang, 'master_cabang')->cabang_name,
                    'faktur_usercreate' => $row->faktur_usercreate,
                    'faktur_ctkstatus' => $row->faktur_ctkstatus,
                    'simpan_status' => $row->simpan_status
                );
            }
        }

        if ($result) {
            echo json_encode(array('success' => 'true', 'data' => $listpo, 'message' => 'Daftar semua Detail PO'));
        } else {
            echo json_encode(array('success' => 'true', 'data' => $listpo, 'message' => 'Tidak ada data Detail PO'));
        }
    }

    public function generate_tf() {
        $supp_id = $this->input->post('idSupp');
        $user_cabang = $this->ion_auth->user()->row()->cabang_id;
        $user_userid = $this->ion_auth->user()->row()->id;

        $opts[] = array('field' => 'tt_supp_id', 'param' => 'where', 'operator' => '', 'value' => $supp_id);
        $opts[] = array('field' => 'tt_fkstatus', 'param' => 'where', 'operator' => '', 'value' => 0);
        $opts[] = array('field' => 'tt_cabang', 'param' => 'where', 'operator' => '', 'value' => $user_cabang);

        if ($this->Gdtxfaktur_model->gets($opts, NULL, 'trx_tt') != NULL) {
            $data_tf = array(
                'faktur_suppid' => $supp_id,
                'faktur_no' => "",
                'faktur_nototal' => 0,
                'faktur_bayar' => 0,
                'faktur_cabang' => $user_cabang,
                'faktur_usercreate' => $user_userid,
                'simpan_status' => 0
            );

            $id_tf = $this->Gdtxfaktur_model->insert($data_tf, 'trx_faktur');

            $tampil = array(
                'tt_faktur_show' => 1
            );
            $this->Gdtxfaktur_model->update($tampil, $opts, NULL, 'trx_tt');

            $dataTF = array(
                'idTf' => $id_tf
            );
            echo json_encode(array('success' => 'true', 'data' => $dataTF, 'message' => 'Added new Faktur'));
        } else {
            echo json_encode(array('success' => 'false', 'data' => 'Info', 'message' => 'Tidak ada no TT'));
        }
    }

    public function add_item_tf() {
        $id_tf = $this->input->post('tfId');
        $id_tt = $this->input->post('ttId');
        $id_supp = $this->input->post('suppId');
        $total = 0;

        $opt[] = array('field' => 'tt_id', 'param' => 'where', 'operator' => '', 'value' => $id_tt);
        $res = $this->Gdtxfaktur_model->gets($opt, NULL, 'trx_tt_detail');
        if ($res) {
            foreach ($res as $row) {
                $item_price = $row->tt_harga;
                $qty = $row->tt_qty_kirim;
                $ppn = $row->tt_ppn;
                $disc = $row->tt_disc;

                $netto = $item_price - ($disc / 100 * $item_price);
                $ppn_val = ($ppn / 100 * $netto);
                $ntppn = $netto + $ppn_val;

                $total += ($ntppn * $qty);
            }
        } else {
            $total = 0;
        }

        $data_tf = array(
            'trx_fakturid' => $id_tf,
            'trx_ttid' => $id_tt,
            'trx_poid' => 0,
            'trx_supplierid' => $id_supp,
            'trx_ttpovalue' => $total,
            'trx_agrstatus' => 0,
            'trx_byrstatus' => 0,
            'trx_usercabang' => $this->ion_auth->user()->row()->cabang_id,
            'trx_usercreate' => $this->ion_auth->user()->row()->id,
            'simpan_status' => 0
        );

        if ($this->Gdtxfaktur_model->insert($data_tf, 'trx_faktur_detail')) {

            $update_status_tt = array(
                'tt_fkstatus' => 1,
                'faktur_id' => $id_tf
            );

            $optx[] = array('field' => 'id', 'param' => 'where', 'operator' => '', 'value' => $id_tt);
            if ($this->Gdtxfaktur_model->update($update_status_tt, $optx, NULL, "trx_tt")) {
                $return_data = array(
                    'id' => $id_tf,
                    'total' => $total
                );
                echo json_encode(array('success' => 'true', 'data' => $return_data));
            } else {
                echo json_encode(array('success' => 'false', 'data' => $this->catch_db_err()));
            }
        } else {
            echo json_encode(array('success' => 'false', 'data' => $this->catch_db_err()));
        }
    }

    public function remove_item_tf() {
        $id_tf = $this->input->post('tfId');
        $id_tt = $this->input->post('ttId');
        $id_supp = $this->input->post('suppId');

        $del_opt[] = array('field' => 'trx_fakturid', 'param' => 'where', 'operator' => '', 'value' => $id_tf);
        $del_opt[] = array('field' => 'trx_ttid', 'param' => 'where', 'operator' => '', 'value' => $id_tt);
        $del_opt[] = array('field' => 'trx_supplierid', 'param' => 'where', 'operator' => '', 'value' => $id_supp);
        $this->Gdtxfaktur_model->delete($del_opt, NULL, 'trx_faktur_detail');

        $update_status_po = array(
            'tt_fkstatus' => 0,
            'faktur_id' => 0
        );

        $opt[] = array('field' => 'id', 'param' => 'where', 'operator' => '', 'value' => $id_tt);
        $this->Gdtxfaktur_model->update($update_status_po, $opt, NULL, "trx_tt");

        $opts[] = array('field' => 'tt_id', 'param' => 'where', 'operator' => '', 'value' => $id_tt);
        $res = $this->Gdtxfaktur_model->gets($opts, NULL, 'trx_tt_detail');
        $total = 0;

        foreach ($res as $row) {
            $item_price = $row->tt_harga;
            $ppn = $row->tt_ppn;

            $qty = $row->tt_qty_kirim;
            if ($ppn != 0) {
                $ppn = $ppn / 100;
                $total += ($item_price * $qty) + ($item_price * $qty * $ppn);
            } else {
                $total += ($item_price * $qty);
            }
        }

        $return_data = array(
            'id' => $id_tf,
            'total' => $total
        );
        echo json_encode(array('success' => 'true', 'data' => $return_data));
    }

    public function check_ttd() {
        if ($this->user->ttd_status == 1) {
            echo json_encode(array('success' => 'true', 'url' => $this->user->ttd_url));
        } else {
            echo json_encode(array('success' => 'false'));
        }
//        $filename = 'assets/img_data/' . $img . '.png';
//
//        if (file_exists($filename)) {
//            echo json_encode(array('success' => 'true', 'url' => 'assets/img_data/' . $img . '.png'));
//        } else {
//            echo json_encode(array('success' => 'false'));
//        }
//        clearstatcache();
    }

    public function reset_tf() {
        $id = $this->input->post('id');

        $opt[] = array('field' => 'id', 'param' => 'where', 'operator' => '', 'value' => $id);
        $this->Gdtxfaktur_model->delete($opt, $par = NULL, "trx_faktur");

        $opt2[] = array('field' => 'trx_fakturid', 'param' => 'where', 'operator' => '', 'value' => $id);
        $this->Gdtxfaktur_model->delete($opt2, NULL, "trx_faktur_detail");

        $opt3[] = array('field' => 'faktur_id', 'param' => 'where', 'operator' => '', 'value' => $id);
        $this->Gdtxfaktur_model->delete($opt3, NULL, "trx_faktur_bayar");

        $update_tt = array(
            'tt_fkstatus' => 0,
            'faktur_id' => 0
        );

        $this->Gdtxfaktur_model->update($update_tt, $opt3, NULL, 'trx_tt');

        $tampil = array(
            'tt_faktur_show' => 0
        );
        $opts[] = array('field' => 'tt_faktur_show', 'param' => 'where', 'operator' => '', 'value' => 1);

        $this->Gdtxfaktur_model->update($tampil, $opts, NULL, 'trx_tt');

        echo json_encode(array('success' => 'true', 'data' => $id));
    }

    public function tf_complete() {
        $id = $this->input->post('id');
        $faktur_no = $this->input->post('noFaktur');
        $faktur_total = $this->Gdtxfaktur_model->money_formatter($this->input->post('jumlahTrx'));
        $faktur_bayar = $this->input->post('caraBayar');
        $tgl_byr = $faktur_bayar == 0 ? "" : ($faktur_bayar == 1 ? $this->input->post('tglBayar') : $this->input->post('tglTransfer'));

        $data_tf = array(
            'faktur_tgl' => mdate('%Y-%m-%d %H:%i:%s', now()),
            'faktur_no' => $faktur_no,
            'faktur_bayartgl' => $tgl_byr,
            'faktur_nototal' => $faktur_total,
            'faktur_bayar' => $faktur_bayar,
            'simpan_status' => 1
        );

        $data_tf_detail = array(
            'simpan_status' => 1
        );

        $opt[] = array('field' => 'id', 'param' => 'where', 'operator' => '', 'value' => $id);
        $this->Gdtxfaktur_model->update($data_tf, $opt, NULL, 'trx_faktur');

        $opt1[] = array('field' => 'trx_fakturid', 'param' => 'where', 'operator' => '', 'value' => $id);
        $this->Gdtxfaktur_model->update($data_tf_detail, $opt1, NULL, 'trx_faktur_detail');

        $tampil = array(
            'tt_faktur_show' => 0
        );
        $opts[] = array('field' => 'tt_faktur_show', 'param' => 'where', 'operator' => '', 'value' => 1);

        $this->Gdtxfaktur_model->update($tampil, $opts, NULL, 'trx_tt');

//SAVE TO RENCANA ANGGARAN
        $detail_faktur = $this->Gdtxfaktur_model->get_detail('id', $id, 'trx_faktur');

        $data_minta_anggaran = array(
            'id' => $detail_faktur->faktur_tgl,
            'tgl_trx' => mdate('%Y-%m-%d %H:%i:%s', now()),
            'trx_cabangid' => $this->user->cabang_id,
            'trx_type' => 1,
            'trx_typeref' => $id,
            'trx_nilai' => $faktur_total,
            'trx_carabayar' => $faktur_bayar,
            'trx_no' => 0,
            'trx_bged' => 0,
            'trx_trfbank' => 0,
            'trx_trfnama' => 0,
            'app_status' => 1,
            'ma_status' => 1
        );

        $id_ma = $this->Gdtxfaktur_model->insert($data_minta_anggaran, 'trx_agrplan');
        if($id_ma == NULL) {
            echo json_encode(array('success' => 'false', 'data' => "", 'message' => 'Faktur berhasil dibuat'));
            return FALSE;
        }
        $params = array();
        $params[] = array('field' => 'id', 'param' => 'where', 'operator' => '', 'value' => $id_ma);
        $data_po = $this->Gdtxfaktur_model->gets($params, NULL, 'trx_agrplan');
        foreach ($data_po as $key) {

            $data_json = json_encode($key);

            $data = array();

            $data['jumlah'] = 1;

            $data['tujuan'] = 1;
            $data['id_cabang'] = $this->user->cabang_id;

            $no = $this->Gdtxfaktur_model->insert_outgoing($data, 'head');

            $data = array();
            $data['data'] = $data_json;
            $data['head_id '] = $no . '.' . $this->user->cabang_id;
            $data['primary_key'] = $key->id;
            $data['table_name'] = 'trx_agrplan';

            $this->Gdtxfaktur_model->insert_outgoing($data, 'detail');
        }

        $params = array();
        $params[] = array('field' => 'trx_fakturid', 'param' => 'where', 'operator' => '', 'value' => $id);
        $data_po = $this->Gdtxfaktur_model->gets($params, NULL, 'trx_faktur_detail');
        foreach ($data_po as $key) {

            $data_json = json_encode($key);

            $data = array();

            $data['jumlah'] = 1;

            $data['tujuan'] = 1;
            $data['id_cabang'] = $this->user->cabang_id;

            $no = $this->Gdtxfaktur_model->insert_outgoing($data, 'head');

            $data = array();
            $data['data'] = $data_json;
            $data['head_id '] = $no . '.' . $this->user->cabang_id;
            $data['primary_key'] = $key->id;
            $data['table_name'] = 'trx_faktur_detail';

            $this->Gdtxfaktur_model->insert_outgoing($data, 'detail');
        }

        $params = array();
        $params[] = array('field' => 'id', 'param' => 'where', 'operator' => '', 'value' => $id);
        $data_po = $this->Gdtxfaktur_model->gets($params, NULL, 'trx_faktur');
        foreach ($data_po as $key) {

            $data_json = json_encode($key);

            $data = array();

            $data['jumlah'] = 1;

            $data['tujuan'] = 1;
            $data['id_cabang'] = $this->user->cabang_id;

            $no = $this->Gdtxfaktur_model->insert_outgoing($data, 'head');

            $data = array();
            $data['data'] = $data_json;
            $data['head_id '] = $no . '.' . $this->user->cabang_id;
            $data['primary_key'] = $key->id;
            $data['table_name'] = 'trx_faktur';

            $this->Gdtxfaktur_model->insert_outgoing($data, 'detail');
        }
        echo json_encode(array('success' => 'true', 'data' => "", 'message' => 'Faktur berhasil dibuat'));
    }

    public function set_cetak_tf() {
//        $filename = 'assets/img_data/signNullTf1.png';
        $filename2 = 'assets/img_data/signNullTf2.png';
        $data_fk = explode('-', $this->input->post('fktList'));
        $pengirim = str_replace(' ', '_', trim(strtolower($this->input->post('pengirim'))));
        $id_ttd = "";
        for ($i = 1; $i < count($data_fk); $i++) {
            $id_ttd .= $data_fk[$i] . '_';
        }
//        $newfile = 'assets/ttd_trx/TF_' . $id_ttd . $this->ion_auth->user()->row()->id . "_sign.png";
        $newfile2 = 'assets/ttd_trx/TF_' . $id_ttd . $pengirim . "_sign.png";
//UPDATE TRX TT TABEL
        $data_tt = array(
            'faktur_ctkstatus' => 1,
            'fkt_userapp' => $this->ion_auth->user()->row()->id,
            'fkt_userappsign' => $this->ion_auth->user()->row()->ttd_url,
            'fkt_userkirim' => $pengirim,
            'fkt_userkirimsign' => $newfile2
        );
        $id_return = "";

        for ($j = 1; $j < count($data_fk); $j++) {
            $opt[$j][] = array('field' => 'id', 'param' => 'where', 'operator' => '', 'value' => $data_fk[$j]);
            $this->Gdtxfaktur_model->update($data_tt, $opt[$j], NULL, 'trx_faktur');
            $id_return .= $data_fk[$j] . '-';
        }

//        if (file_exists($filename)) {
//            if (!copy($filename, $newfile)) {
//                return FALSE;
//            }
//        }
//
        if (file_exists($filename2)) {
            if (!copy($filename2, $newfile2)) {
                return FALSE;
            }
        }

//        if (file_exists($filename)) {
//            unlink($filename);
//        }
        if (file_exists($filename2)) {
            unlink($filename2);
        }

        echo json_encode(array('success' => 'true', 'data' => rtrim($id_return, '-'), 'title' => 'Info', 'message' => 'Set Cetak'));
    }

    public function printTf($type, $id) {
        $id_faktur = explode('-', $id);
        $list_tf = array();

        for ($j = 0; $j < count($id_faktur); $j++) {
            $idfaktur = $id_faktur[$j];
            $optk[$j][] = array('field' => 'trx_fakturid', 'param' => 'where', 'operator' => '', 'value' => $id_faktur[$j]);
            $data_tt = $this->Gdtxfaktur_model->gets($optk[$j], NULL, 'trx_faktur_detail');
            $list_tt = "";
            foreach ($data_tt as $row) {
                $list_tt .= $this->Gdtxfaktur_model->get_detail('id', $row->trx_ttid, 'trx_tt')->tt_no . ', ';
            }
            $list_tf[] = array(
                'id' => $id_faktur[$j],
                'no_fk' => $this->Gdtxfaktur_model->get_detail('id', $id_faktur[$j], 'trx_faktur')->faktur_no,
                'no_tt' => rtrim($list_tt, ', '),
                'total_fk' => $this->Gdtxfaktur_model->get_detail('id', $id_faktur[$j], 'trx_faktur')->faktur_nototal
            );
        }
        $detail_faktur = $this->Gdtxfaktur_model->get_detail('id', $idfaktur, 'trx_faktur');
        $detail_supplier = $this->Gdtxfaktur_model->get_detail('id', $detail_faktur->faktur_suppid, 'dt_supplier');

        $data['supplier_name'] = $detail_supplier->ms_name;
        $data['po_tgl'] = null;
        $data['ttd1'] = $detail_faktur->fkt_userappsign;
        $data['ttd2'] = $detail_faktur->fkt_userkirimsign;
        $data['user'] = strtoupper($this->ion_auth->user($detail_faktur->fkt_userapp)->row()->first_name . ' ' . $this->ion_auth->user($detail_faktur->fkt_userapp)->row()->last_name);
        $data['user1'] = strtoupper($detail_faktur->fkt_userkirim);
        $data['list_tt'] = $list_tf;
        $data['type'] = $type;

        $this->load->view('tf_invoice', $data);
    }

    public function tf_bg_complete() {
        $bg_no = $this->input->post('bgNo');
        $bg_ed = $this->input->post('tglEd');
        $bank_id = $this->input->post('bankName');
        $nominal = $this->Gdtxfaktur_model->money_formatter($this->input->post('jumlahBg'));
        $faktur = explode(';', $this->input->post('fakturList'));

        for ($i = 0; $i < count($faktur) - 1; $i++) {
            $data_fkbayar = array(
                'faktur_id' => $faktur[$i],
                'faktur_bayar' => 0,
                'faktur_nominal' => $nominal,
                'faktur_bayarno' => $bg_no,
                'faktur_bayared' => mdate("%Y-%m-%d", strtotime($bg_ed)),
                'faktur_bank' => $bank_id,
                'simpan_status' => 1,
                'faktur_cabang' => $this->user->cabang_id
            );

            $this->Gdtxfaktur_model->insert($data_fkbayar, 'trx_faktur_bayar');

            $update_fkt = array(
                'faktur_bgstatus' => 1,
            );

            $opt[$i][] = array('field' => 'id', 'param' => 'where', 'operator' => '', 'value' => $faktur[$i]);
            $this->Gdtxfaktur_model->update($update_fkt, $opt[$i], NULL, 'trx_faktur');

            $data_minta_anggaran = array(
                'tgldari' => $bg_ed,
            );

            $faktur_no = $this->Gdtxfaktur_model->get_detail('id', $faktur[$i], 'trx_faktur')->faktur_no;
            $opts[$i][] = array('field' => 'trx_fakturno', 'param' => 'where', 'operator' => '', 'value' => $faktur_no);
            $this->Gdtxfaktur_model->update($data_minta_anggaran, $opts[$i], NULL, 'kas_minta_anggaran');

            $params = array();
            $params[] = array('field' => 'faktur_id', 'param' => 'where', 'operator' => '', 'value' => $faktur[$i]);
            $data_po = $this->Gdtxfaktur_model->gets($params, NULL, 'trx_faktur_bayar');
            foreach ($data_po as $key) {

                $data_json = json_encode($key);

                $data = array();

                $data['jumlah'] = 1;

                $data['tujuan'] = 1;
                $data['id_cabang'] = $this->user->cabang_id;

                $no = $this->Gdtxfaktur_model->insert_outgoing($data, 'head');

                $data = array();
                $data['data'] = $data_json;
                $data['head_id '] = $no . '.' . $this->user->cabang_id;
                $data['primary_key'] = $key->id;
                $data['table_name'] = 'trx_faktur_bayar';

                $this->Gdtxfaktur_model->insert_outgoing($data, 'detail');
            }

            $params = array();
            $params[] = array('field' => 'trx_fakturno', 'param' => 'where', 'operator' => '', 'value' => $faktur_no);
            $data_po = $this->Gdtxfaktur_model->gets($params, NULL, 'kas_minta_anggaran');
            foreach ($data_po as $key) {

                $data_json = json_encode($key);

                $data = array();

                $data['jumlah'] = 1;

                $data['tujuan'] = 1;
                $data['id_cabang'] = $this->user->cabang_id;

                $no = $this->Gdtxfaktur_model->insert_outgoing($data, 'head');

                $data = array();
                $data['data'] = $data_json;
                $data['head_id '] = $no . '.' . $this->user->cabang_id;
                $data['primary_key'] = $key->id;
                $data['table_name'] = 'kas_minta_anggaran';

                $this->Gdtxfaktur_model->insert_outgoing($data, 'detail');
            }
        }

        echo json_encode(array('success' => 'true', 'data' => "", 'message' => 'BG Berhasil disimpan'));
    }

    public function ms_list() {
        $listitem = array();
        $records = isset($_GET['filter']);
        $query = isset($_GET['query']);
        $record = array();

        if ($records) {
            $raw_record = json_decode($_GET['filter'], true);
            foreach ($raw_record as $key) {
                $field = $this->property_reader($key['property']);
                $param = $this->param_reader($key['property']);
                $op = $this->operator_reader($key['value']);
                $val = $this->property_reader($key['value']);

                $record[] = array('field' => $field, 'param' => $param, 'operator' => $op, 'value' => $val);
            }
        }

        if ($query && $_GET['query'] != "") {
            $record[] = array('field' => 'ms_name', 'param' => 'like', 'operator' => '', 'value' => $_GET['query']);
        }
        $record[] = array('field' => 'ms_kodesub', 'param' => 'where', 'operator' => ' <>', 'value' => 0);
        $options['sortBy'] = 'ms_kode';
        $options['sortDirection'] = 'ASC';
        $datagroup = $this->Gdtxfaktur_model->gets($record, $options, 'ms_supplier');

        if ($datagroup != null) {
            foreach ($datagroup as $row) {

                $listitem[] = array(
                    'idms' => $row->id,
                    'kodems' => $row->ms_kode,
                    'kodesubms' => $row->ms_kodesub,
                    'tipe' => $row->ms_status,
                    'kotams' => $row->ms_kota == "" ? 0 : $row->ms_kota,
                    'namakotams' => $row->ms_kota == "" ? '-' : $this->Gdtxfaktur_model->get_detail('kota_id', $row->ms_kota, 'kota_kabupaten')->kota_kabupaten,
                    'namams' => $row->ms_name,
                    'namamsbaru' => $row->ms_kode,
                    'suppdisplay' => $row->ms_name . ', ' . ($row->ms_kota == "" ? '-' : $this->Gdtxfaktur_model->get_detail('kota_id', $row->ms_kota, 'kota_kabupaten')->kota_kabupaten),
                    'emailms' => $row->ms_email,
                    'alamatms' => $row->ms_alamat,
                    'tlpms' => $row->ms_telp,
                    'tlp2ms' => $row->ms_telp2,
                    'kontakms1' => $row->ms_contact1,
                    'kontakms2' => $row->ms_contact2,
                    'hpms' => $row->ms_hp,
                    'faxms' => $row->ms_fax,
                    'bankms' => $row->ms_bank,
                    'norekms' => $row->ms_rekening,
                    'grpalfabet' => strtoupper(substr($row->ms_name, 0, 1))
                );
            }
            echo json_encode(array('success' => 'true', 'data' => $listitem, 'message' => 'Daftar semua supplier.'));
        } else {
            echo json_encode(array('success' => 'true', 'data' => $listitem, 'message' => 'Tidak ada data supplier.'));
        }
    }

    public function list_tf() {
        $records = isset($_GET['filter']);
        $query = isset($_GET['query']);
        $record = array();
        $listpo = array();

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

        if ($query && $_GET['query'] != "") {
            $record[] = array('field' => 'tt_po_no', 'param' => 'like', 'operator' => '', 'value' => $query);
        }
        $record[] = array('field' => 'simpan_status', 'param' => 'where', 'operator' => '', 'value' => 1);
        $result = $this->Gdtxfaktur_model->gets($record, NULL, 'trx_faktur');

        if ($result != NULL) {
            foreach ($result as $row) {
                $tgl = explode(' ', $row->faktur_tgl);

                $listpo[] = array(
                    'id' => $row->id,
                    'fktTgl' => $tgl[0],
                    'fktSuppId' => $row->faktur_suppid,
                    'fktSuppNama' => $this->Gdtxfaktur_model->get_detail('id', $row->faktur_suppid, 'ms_supplier')->ms_name,
                    'fktNo' => $row->faktur_no,
                    'fktTotal' => $row->faktur_nototal,
                    'fktByrStat' => $row->faktur_bayar,
                    'fktBgStat' => $row->faktur_bgstatus,
                    'fktCabangId' => $row->faktur_cabang,
                    'fktCabangName' => $this->Gdtxfaktur_model->get_detail('id', $row->faktur_cabang, 'dt_cabang')->cabang_alias,
                    'fktUserId' => $row->faktur_usercreate,
                    'fktCetakStatus' => $row->faktur_ctkstatus,
                    'fktSimpanStatus' => $row->simpan_status
                );
            }
        }

        if ($result) {
            echo json_encode(array('success' => 'true', 'data' => $listpo, 'message' => 'Daftar semua Detail PO'));
        } else {
            echo json_encode(array('success' => 'true', 'data' => $listpo, 'message' => 'Tidak ada data Detail PO'));
        }
    }

    public function list_bank() {
        $records = isset($_GET['filter']);
        $query = isset($_GET['query']);
        $record = array();

        if ($records) {
            $raw_record = json_decode($_GET['filter'], true);
            foreach ($raw_record as $key) {
                $field = $this->property_reader($key['property']);
                $param = $this->param_reader($key['property']);
                $op = $this->operator_reader($key['value']);
                $val = $this->property_reader($key['value']);

                $record[] = array('field' => $field, 'param' => $param, 'operator' => $op, 'value' => $val);
            }
        }

        if ($query && $_GET['query'] != "") {
            $record[] = array('field' => 'bank_alias', 'param' => 'like', 'operator' => '', 'value' => $_GET['query']);
        }

        $data_bank = $this->Gdtxfaktur_model->gets($record, NULL, 'ms_bank');
        $list_bank = array();

        if ($data_bank != NULL) {
            foreach ($data_bank as $key) {
                $list_bank[] = array(
                    'id' => $key->id,
                    'bankGroup' => $key->bank_nama,
                    'bankGroupNama' => $this->Gdtxfaktur_model->get_detail('id', $key->bank_nama, 'ms_banknas')->banknas_name,
                    'bankAlias' => $key->bank_alias,
                    'bankNama' => $key->bank_reknama,
                    'bankRek' => $key->bank_rekno,
                    'bankAlamat' => $key->bank_alamat,
                    'bankCabang' => $key->bank_cabang,
                    'bankAkun' => $key->bank_kodeakun,
                    'golAkun' => $key->bank_golakun,
                    'bankStatus' => $key->bank_status,
                    'isActive' => $key->bank_active
                );
            }
        }

        echo json_encode(array('success' => 'true', 'data' => $list_bank));
    }

    public function check_ttd_pengirim($img) {
        $filename = 'assets/img_data/' . $img . '.png';

        if (file_exists($filename)) {
            echo json_encode(array('success' => 'true', 'url' => 'assets/img_data/' . $img . '.png'));
        } else {
            echo json_encode(array('success' => 'false'));
        }
        clearstatcache();
    }

}
