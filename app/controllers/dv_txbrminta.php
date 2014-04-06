<?php

/**
 * Description of data_model
 *
 * @author Azelia
 */
if (!defined('BASEPATH')) {
    exit('No direct script access allowed');
}

class Dv_txbrminta extends Auth_Controller {

    function __construct() {
        parent::__construct();
        $this->load->model('Dv_txbrminta_model');
        $this->Dv_txbrminta_model->cms_db = $this->load->database('outgoing', TRUE);
    }
    public function list_divisi_ruangan() {
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
            $record[] = array('field' => 'ruang_nama', 'param' => 'like', 'operator' => '', 'value' => $_GET['query']);
        }

        $result = $this->Dv_txbrminta_model->gets($record, NULL, 'dt_ruang');
        $list = array();

        if ($result != NULL) {
            foreach ($result as $key) {
                $list[] = array(
                    'id' => $key->id,
                    'divisiCode' => $key->divisi_id,
                    'cabangId' => $key->cabang_id,
                    'ruangId' => $key->ruang_id,
                    'ruangName' => $key->ruang_nama,
                    'isActive' => $key->is_active
                );
            }
        } else {
            $list[] = array(
                'id' => 0,
                'divisiCode' => 99,
                'cabangId' => 99,
                'ruangId' => 0,
                'ruangName' => "Tidak ada ruangan",
                'isActive' => 1
            );
        }

        echo json_encode(array('success' => 'true', 'data' => $list));
    }

    public function add_pengdiv_item() {
        $id = $this->input->post('id');
        $id_detail = $this->input->post('idDetail');
        $tgl_trx = $this->input->post('tglTransaksi');
        $divisi = $this->input->post('divisi');
        $ruangan = $this->input->post('ruangan');
        $barang_id = $this->input->post('pengBarang');
        $qty = $this->input->post('jumlah');
        $cabang_id = $this->ion_auth->user()->row()->cabang_id;
        $tujuan_div = $this->input->post('divisiTujuan');
        $tujuan_ruang = $this->input->post('tujuan');

        if ($id == NULL) {
            $datestring = "%Y-%m-%d %H:%i:%s";
            $now = mdate("%H:%i:%s", time());

            $tgl_trx = mdate($datestring, strtotime($tgl_trx . ' ' . $now));
            $petugas_id = $this->ion_auth->user()->row()->id;
            $detail_divisi = $this->Dv_txbrminta_model->get_detail('id', $divisi, 'dt_divisi');

            $data = array(
                'tgl_trx' => $tgl_trx,
                'pengdiv_no' => "",
                'pengdiv_cabang' => $cabang_id,
                'pengdiv_divisi' => $divisi,
                'pengdiv_divruang' => $ruangan,
                'user_create' => $petugas_id
            );

            $pengid1 = $this->Dv_txbrminta_model->insert($data, 'trx_pengdivisi');
            $pengid = $pengid1.'.'.$cabang_id ;
            $no_peng = sprintf('%06d', $pengid1) . '/' . $detail_divisi->divisi_name . '/' . $ruangan . '/' . mdate('%Y%m%d', now());

            $opt2[] = array('field' => 'id', 'param' => 'where', 'operator' => '', 'value' => $pengid);
            $data_ref = array(
                'pengdiv_no' => $no_peng
            );
            $this->Dv_txbrminta_model->update($data_ref, $opt2, NULL, 'trx_pengdivisi');
            $peng_id = $pengid;
        } else {
            $peng_id = $id;
        }

        if ($id_detail != "") {
            $data_qty = array(
                'barang_qty_minta' => $qty,
            );

            $opts[] = array('field' => 'id', 'param' => 'where', 'operator' => '', 'value' => $id_detail);
            if ($this->Dv_txbrminta_model->update($data_qty, $opts, NULL, 'trx_pengdivisi_detail')) {
                echo json_encode(array('success' => 'true', 'data' => "", 'message' => 'Update Success'));
            } else {
                echo json_encode(array('success' => 'false', 'data' => $this->catch_db_err(), 'message' => 'Error di database'));
            }
        } else {

        	$opt[] = array('field' => 'mi_id', 'param' => 'where', 'operator' => '', 'value' => $barang_id);
        	$opt[] = array('field' => 'cabang_id', 'param' => 'where', 'operator' => '', 'value' => $cabang_id);
        	$barangnya = $this->Dv_txbrminta_model->get($opt, NULL, 'dt_item_cabang');
            $data_item = array(
                'pengdiv_id' => $peng_id,
                'barang_id' => $barangnya->id,
                'barang_qty_minta' => $qty,
                'barang_qty_kirim' => 0,
                'barang_qty_terima' => 0,
                'tgl_kirim' => "",
                'tgl_terima' => "",
                'user_kirim' => 0,
                'user_terima' => 0,
                'cabang_id' => $cabang_id,
            );

            if ($this->Dv_txbrminta_model->insert($data_item, 'trx_pengdivisi_detail')) {
                $data_peng = array(
                    'pengId' => $peng_id,
                    //'pengNo' => $no_peng,
                    'ruangId' => $ruangan,
                    'divTujuan' => $tujuan_div == NULL ? 0 : $tujuan_div,
                    'ruangTujuan' => $tujuan_ruang == NULL ? 0 : $tujuan_ruang
                );
                echo json_encode(array('success' => 'true', 'data' => $data_peng, 'message' => 'Added new pengadaan'));
            } else {
                echo json_encode(array('success' => 'false', 'data' => $this->catch_db_err(), 'message' => 'Error di database'));
            }
        }
    }
    public function pengdiv_complete() {
        $id_peng = $this->input->post('id');
        $div_tujuan = $this->input->post('divisiTujuan');
        $div_ruangan = $this->input->post('tujuan');

        $data = array(
            'pengdiv_tujuan' => $div_tujuan,
            'pengdiv_drtujuan' => $div_ruangan,
            'simpan_status' => 1
        );

        $data_item = array(
            'minta_status' => 1
        );

        $opt[] = array('field' => 'id', 'param' => 'where', 'operator' => '', 'value' => $id_peng);
        $this->Dv_txbrminta_model->update($data, $opt, NULL, 'trx_pengdivisi');

        $opts[] = array('field' => 'pengdiv_id', 'param' => 'where', 'operator' => '', 'value' => $id_peng);
        $this->Dv_txbrminta_model->update($data_item, $opts, NULL, 'trx_pengdivisi_detail');

        echo json_encode(array('success' => 'true'));
    }

     public function list_mintadiv() {
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

        $result = $this->Dv_txbrminta_model->gets($record, NULL, 'trx_pengdivisi');

        if ($result != NULL) {
            foreach ($result as $row) {
                $listpb[] = array(
                    'id' => $row->id,
                    'tglTransaksi' => explode(' ', $row->tgl_trx)[0],
                    'pengNo' => $row->pengdiv_no,
                    'cabangId' => $row->pengdiv_cabang,
                    'divisi' => $row->pengdiv_divisi,
                    'divisiName' => $this->Dv_txbrminta_model->get_detail('id', $row->pengdiv_divisi, 'dt_divisi')->divisi_name,
                    'ruangan' => $row->pengdiv_divruang,
                    'ruangName' => $this->Dv_txbrminta_model->get_detail('id', $row->pengdiv_divruang, 'dt_ruang')->ruang_nama,
                    'divisiTujuan' => $row->pengdiv_tujuan,
                    'divTujuanName' => $this->Dv_txbrminta_model->get_detail('id', $row->pengdiv_tujuan, 'dt_divisi')->divisi_name,
                    'tujuan' => $row->pengdiv_drtujuan,
                    'divRuangName' => $this->Dv_txbrminta_model->get_detail('id', $row->pengdiv_drtujuan, 'dt_ruang')->ruang_nama,
                    'pengPetugas' => $row->user_create,
                    'simpanStatus' => $row->simpan_status,
                     'appr_status' => $row->appr_status
                );
            }
        }

        echo json_encode(array('success' => 'true', 'data' => $listpb, 'message' => 'Daftar semua Pengadaan Barang'));
    }
    public function list_mintadiv_detail() {
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

        $result = $this->Dv_txbrminta_model->gets($record, NULL, 'trx_pengdivisi_detail');

        if ($result != NULL) {
            foreach ($result as $row) {
                $det_barang = $this->Dv_txbrminta_model->get_detail('id', $row->barang_id, 'dt_item_cabang' );
                $det_barang = $this->Dv_txbrminta_model->get_detail('id', $det_barang->mi_id, 'dt_item' );

                $listpbd[] = array(
                    'id' => $row->id,
                    'pengadaanNo' => $row->pengdiv_id,
                    'pengadaanKode' => $this->Dv_txbrminta_model->get_detail('id', $row->pengdiv_id, 'trx_pengdivisi')->pengdiv_no,
                    'barangId' => $det_barang->id,
                    'barangName' => $det_barang->mi_name,
                    'qtyMinta' => $row->barang_qty_minta,
                    'qtyKirim' => $row->barang_qty_kirim,
                    'qtyTerima' => $row->barang_qty_terima,
                    'mintaStatus' => $row->minta_status,
                    'kirimStatus' => $row->kirim_status,
                    'terimaStatus' => $row->terima_status,
                    'tglKirim' => $row->tgl_kirim,
                    'noKirim' => $row->div_no_kirim,
                    'tglTerima' => $row->tgl_terima,
                    'userKirim' => $row->user_kirim,
                    'userTerima' => $row->user_terima,
                     'appr_status' => $row->appr_status
                );
            }
        }

        echo json_encode(array('success' => 'true', 'data' => $listpbd, 'message' => 'Daftar semua Detail Pengadaan Barang'));
    }

    public function delete_pengdiv_item() {
        $id = $this->input->post('id');

        $opt[] = array('field' => 'id', 'param' => 'where', 'operator' => '', 'value' => $id);
        $this->Dv_txbrminta_model->delete($opt, NULL, "trx_pengdivisi_detail");

        echo json_encode(array('success' => 'true'));
    }
    public function approve_mb_div() {
        $id = $this->input->post('data');
        $group = array('admin', 'supervisor');

        //if (!$this->ion_auth->in_group($group)) {
        //echo json_encode(array('success' => 'false', 'message' => 'Anda tidak mempunyai hak melakukan Approval', 'data' => '2'));
        //return;
        //}

        $app = array(
            'appr_status' => 1,
        );

        $opta[] = array('field' => 'pengdiv_id', 'param' => 'where', 'operator' => '', 'value' => $id);
        $this->Dv_txbrminta_model->update($app, $opta, NULL, 'trx_pengdivisi_detail');

        $optb[] = array('field' => 'id', 'param' => 'where', 'operator' => '', 'value' => $id);
        $this->Dv_txbrminta_model->update($app, $optb, NULL, 'trx_pengdivisi');

        echo json_encode(array('success' => 'true', 'message' => 'Data Telah di Approve', 'data' => '1'));
    }
    public function pengdiv_reset() {
        $opt[] = array('field' => 'simpan_status', 'param' => 'where', 'operator' => '', 'value' => 0);
        $this->pmodel->delete($opt, NULL, "trx_pengdivisi");

        $opts[] = array('field' => 'minta_status', 'param' => 'where', 'operator' => '', 'value' => 0);
        $this->pmodel->delete($opts, NULL, "trx_pengdivisi_detail");

        echo json_encode(array('success' => 'true'));
    }


}