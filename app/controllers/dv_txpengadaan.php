<?php

/**
 * Description of data_model
 *
 * @author Azelia
 */
if (!defined('BASEPATH')) {
    exit('No direct script access allowed');
}

class Dv_txpengadaan extends Auth_Controller {

    function __construct() {
        parent::__construct();
        $this->load->model('Dv_txpengadaan_model');
        $this->Dv_txpengadaan_model->cms_db = $this->load->database('outgoing', TRUE);
    }
     public function list_cabang() {
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
            $record[] = array('field' => 'cabang_city', 'param' => 'like', 'operator' => '', 'value' => $_GET['query']);
            $record[] = array('field' => 'cabang_name', 'param' => 'or_like', 'operator' => '', 'value' => $_GET['query']);
        }

//        $record[] = array('field' => 'id', 'param' => 'where_not_in', 'operator' => '', 'value' => '14');

        $data_cabang = $this->Dv_txpengadaan_model->gets($record, NULL, 'dt_cabang');
        $list_cabang = array();

        foreach ($data_cabang as $key) {
            $list_cabang[] = array(
                'id' => $key->id,
                'cabangId' => $key->id,
                'cabangCity' => $key->cabang_city,
                'cabangName' => $key->cabang_alias,
                'cabangCityName' => $key->cabang_city . ' ' . $key->cabang_alias,
                'cabangAdd' => $key->cabang_address,
               /// 'cabangTelp' => $key->cabang_telp
            );
        }

        echo json_encode(array('success' => 'true', 'data' => $list_cabang));
    }
    public function list_divisi() {
        $records = isset($_GET['filter']);
        $query = isset($_GET['query']);
        $record = array();

        if ($records) {
            $raw_record = json_decode($_GET['filter'], TRUE);
            foreach ($raw_record as $key) {
                $field = $this->property_reader($key['property']);
                $param = $this->param_reader($key['property']);
                $op = $this->operator_reader($key['value']);
                $val = $this->property_reader($key['value']);

                $record[] = array('field' => $field, 'param' => $param, 'operator' => $op, 'value' => $val);
            }
        }

        if ($query && $_GET['query'] != "") {
            $record[] = array('field' => 'divisi_name', 'param' => 'like', 'operator' => '', 'value' => $_GET['query']);
        }

        $data_divisi = $this->Dv_txpengadaan_model->gets($record, NULL, 'dt_divisi');
        $list_divisi = array();

        if ($data_divisi != NULL) {
            foreach ($data_divisi as $key) {
                $list_divisi[] = array(
                    'id' => $key->id,
                    'divisiId' => $key->id,
                    'divisiName' => $key->divisi_name,
                    'isActive' => $key->is_active
                );
            }
        } else {
            $list_divisi[] = array(
                'id' => 0,
                'divisiId' => 99,
                'divisiName' => 'Tidak Ada Divisi',
                'isActive' => 1
            );
        }

        echo json_encode(array('success' => 'true', 'data' => $list_divisi));
    }

    function list_item_katalog() {
        $records = isset($_GET['filter']);
        $record = array();
        $listkb = array();

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

        $result = $this->pmodel->gets($record, NULL, 'item_katalog');

        if ($result != NULL) {
            foreach ($result as $row) {
                $listkb[] = array(
                    'id_katalog' => $row->id,
                    'item_id' => $row->item_id,
                    'katalog_no' => $row->katalog_no,
                    'simpan_status' => $row->simpan_status
                );
            }
        } else {
            $listkb[] = array(
                'id_katalog' => 0,
                'item_id' => 0,
                'katalog_no' => 'Tidak ada katalog',
                'simpan_status' => 0
            );
        }

        if ($result) {
            echo json_encode(array('success' => 'true', 'data' => $listkb, 'message' => 'Daftar semua Kas Masuk'));
        } else {
            echo json_encode(array('success' => 'true', 'data' => $listkb, 'message' => 'Tidak ada data Kas Masuk'));
        }
    }
    function list_item_merk() {
        $records = isset($_GET['filter']);
        $record = array();
        $listkb = array();

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

        $result = $this->pmodel->gets($record, NULL, 'master_merk');

        if ($result != NULL) {
            foreach ($result as $row) {
                $listkb[] = array(
                    'id' => $row->id,
                    'merk_name' => $row->merk_name,
                    'simpan_status' => $row->simpan_status
                );
            }
        } else {
            $listkb[] = array(
                'id_merk' => 0,
                'merk_name' => 'Tidak ada merk',
                'simpan_status' => 0
            );
        }

        if ($result) {
            echo json_encode(array('success' => 'true', 'data' => $listkb, 'message' => 'Daftar semua Kas Masuk'));
        } else {
            echo json_encode(array('success' => 'true', 'data' => $listkb, 'message' => 'Tidak ada data Kas Masuk'));
        }
    }

    public function get_items() {
        $records = isset($_GET['filter']);
        $query = isset($_GET['query']);
        $record = array();
        $is_cabang = isset($_GET['cabang']);
        if ($is_cabang) {
            $cabang = $_GET['cabang'];
        } else {
            $cabang = $this->ion_auth->user()->row()->cabang_id;
        }
        $tablename = "dt_item" ;

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
        $record[] = array('field' => 'mi_child_stat', 'param' => 'where', 'operator' => '', 'value' => 1);

        if ($query && $_GET['query'] != "") {
            $record[] = array('field' => 'mi_name', 'param' => 'like', 'operator' => '', 'value' => $_GET['query']);
        }

        $result = $this->Dv_txpengadaan_model->get_item($record, NULL, $tablename);

        if ($result) {
            echo json_encode(array('success' => 'true', 'data' => $result, 'message' => 'Daftar semua item'));
        } else {
            echo json_encode(array('success' => 'true', 'data' => NULL, 'message' => 'Tidak ada data item'));
        }
    }

    public function kemasan_all() {
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
            $record[] = array('field' => 'id', 'param' => 'where', 'operator' => '', 'value' => $_GET['query']);
        }

        $opt['sortBy'] = 'kms_kecil';
        $opt['sortDirection'] = 'ASC';
        $data_dokter = $this->Dv_txpengadaan_model->gets($record, $opt, 'item_kemasan');
        $list_dokter = array();

        if ($data_dokter != NULL) {
            foreach ($data_dokter as $key) {
                $list_dokter[] = array(
                    'id' => $key->id,
                    'msi_idbarang' => $key->item_id,
                    'msi_satbesar' => $key->kms_besar,
                    'nama_satbesar' => $key->kms_besar != 0 ? $this->Dv_txpengadaan_model->get_detail('id', $key->kms_besar, 'master_satuan')->sat_name : '',
                    'msi_konversi' => $key->kms_konv,
                    'msi_satkecil' => $key->kms_kecil,
                    'nama_satkecil' => '',
                    'is_active' => $key->simpan_status,
                );
            }
        }
        echo json_encode(array('success' => 'true', 'data' => $list_dokter, 'message' => 'Daftar semua Pengeluaran Inventaris'));
    }
    public function list_pengadaan() {
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
        $record[] = array('field' => 'peng_type', 'param' => 'where', 'operator' => '', 'value' => '1');
        $result = $this->Dv_txpengadaan_model->gets($record, NULL, 'trx_pengadaan');
        if ($result) {
        foreach ($result as $row) {
            $listpb[] = array(
                'idPengadaan' => $row->id,
                'tglTransaksi' => explode(' ', $row->tgl_trx)[0],
                'noPeng' => $row->no_pengadaan,
                'idCabang' => $row->cabang_id,
                'cabangName' => strtoupper($this->Dv_txpengadaan_model->get_detail('id', $row->cabang_id, 'dt_cabang')->cabang_alias),
                'divisi' => $row->divisi,
                'divisiName' => $row->divisi == 0 ? "-" : strtoupper($this->Dv_txpengadaan_model->get_detail('id', $row->divisi, 'dt_divisi')->divisi_name),
                'tglKebutuhan' => $row->tgl_butuh,
                'pengDesc' => $row->keterangan,
                'pengStatus' => $row->peng_status,
                'pengStatusDiv' => $row->peng_statusdiv,
                'poStatus' => $row->po_status,
                'pengPetugas' => $row->petugas_id,
                'simpanStatus' => $row->simpan_status,
                'peng_type' => $row->peng_type,
                'peng_statusmgr' => $row->peng_statusmgr
            );
        }

       
            echo json_encode(array('success' => 'true', 'data' => $listpb, 'message' => 'Daftar semua Pengadaan Barang'));
        } else {
            echo json_encode(array('success' => 'true', 'data' => $listpb, 'message' => 'Tidak ada data Pengadaan Barang'));
        }
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

        $result = $this->pmodel->gets($record, NULL, 'trx_pengdivisi_detail');

        if ($result != NULL) {
            foreach ($result as $row) {
                $det_barang = $this->pmodel->get_detail('id', $row->barang_id, 'master_item_' . $this->ion_auth->user()->row()->cabang_id);

                $listpbd[] = array(
                    'id' => $row->id,
                    'pengadaanNo' => $row->pengdiv_id,
                    'pengadaanKode' => $this->pmodel->get_detail('id', $row->pengdiv_id, 'trx_pengdivisi')->pengdiv_no,
                    'barangId' => $row->barang_id,
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
                    'userTerima' => $row->user_terima
                );
            }
        }

        echo json_encode(array('success' => 'true', 'data' => $listpbd, 'message' => 'Daftar semua Detail Pengadaan Barang'));
    }

    public function add_pengadaan_item() {
        $id = $this->input->post('idPengadaan');
        $id_peng = $this->input->post('noPeng');
        $gol_id = $this->input->post('golName');
        $barang_id = $this->input->post('pengBarang');
        $barang_qty = $this->input->post('qtyBarang');
        $tgl_butuh = $this->input->post('tglKebutuhan');
        $barang_merk = $this->input->post('pengMerk');
        $barang_kemasan = $this->input->post('pengKemasan');
        $barang_katalog = $this->input->post('pengKatalog');
        $barang_desc = $this->input->post('ket_barang');
        $divisi = $this->input->post('divisi') != NULL ? $this->input->post('divisi') : 0;
        $peng_id = NULL;
        $no_peng = NULL;
        $cabang_id = $this->ion_auth->user()->row()->cabang_id;

        if ($id == NULL) {
            $datestring = "%Y-%m-%d %H:%i:%s";

            $tgl_trx = mdate($datestring, now());
            $petugas_id = $this->ion_auth->user()->row()->id;
            $detail_cabang = $this->Dv_txpengadaan_model->get_detail('id', $cabang_id, 'dt_cabang');

            $data = array(
                'tgl_trx' => $tgl_trx,
                'cabang_id' => $cabang_id,
                'po_status' => 0,
                'petugas_id' => $petugas_id,
                'divisi' => $divisi,
                'simpan_status' => 0,
                'peng_type' => 1
            );

            $pengid1 = $this->Dv_txpengadaan_model->insert($data, 'trx_pengadaan');
            $pengid = $pengid1.'.'.$cabang_id;
            $no_peng = sprintf('%06d', $pengid) . '/' . $detail_cabang->id . '/' . mdate('%Y%m%d', now());

            $opt2[] = array('field' => 'id', 'param' => 'where', 'operator' => '', 'value' => $pengid);
            $data_ref = array(
                'no_pengadaan' => $no_peng
            );
            $this->Dv_txpengadaan_model->update($data_ref, $opt2, NULL, 'trx_pengadaan');
            $peng_id = $pengid;
        } else {
            $peng_id = $id;
            $no_peng = $id_peng;
        }

        $detail_barang = $this->Dv_txpengadaan_model->get_detail('id', $barang_id, 'dt_item');
        $record = array();
        $record[] = array('field' => 'mi_id', 'param' => 'where', 'operator' => '', 'value' => $barang_id);
        $record[] = array('field' => 'cabang_id', 'param' => 'where', 'operator' => '', 'value' => $cabang_id);
        $barang_cabang = $this->Dv_txpengadaan_model->get($record,NULL,'dt_item_cabang');
        $data_item = array(
            'pengadaan_id' => $peng_id,
            'barang_gol' => $gol_id,
            'barang_id' => $barang_cabang->id,
            'barang_merk' => $barang_merk,
            'barang_katalog' => $barang_katalog,
            'barang_kemasan' => $barang_kemasan,
            'barang_qty' => $barang_qty,
            'barang_harga' => $detail_barang->mi_item_price,
            'barang_disc' => $detail_barang->mi_diskon,
            'barang_ppn' => $detail_barang->mi_ppn,
            'tgl_butuh' => $tgl_butuh,
            'barang_desc' => $barang_desc,
            'simpan_status' => 0,
            'po_status' => 0,
            'po_id' => 0,
            'divisi' => $divisi,
            'cabang_id' => $cabang_id
        );

        if ($this->Dv_txpengadaan_model->insert($data_item, 'pengadaan_detail')) {
            $data_peng = array(
                'pengId' => $peng_id,
                'pengNo' => $no_peng,
                'golId' => $gol_id,
                'divId' => $divisi
            );
            echo json_encode(array('success' => 'true', 'data' => $data_peng, 'message' => 'Added new pengadaan'));
        } else {
            echo json_encode(array('success' => 'false', 'data' => $this->catch_db_err(), 'message' => 'Error di database'));
        }
    }

    public function pengadaan_complete() {
        $id_peng = $this->input->post('idPengadaan');
        $peng_status = $this->Dv_txpengadaan_model->get_detail('id', $id_peng, 'trx_pengadaan')->peng_status;

        $data = array(
            'peng_status' => $peng_status,
            'simpan_status' => 1
        );

        $data_item = array(
            'peng_status' => $peng_status,
            'simpan_status' => 1
        );

        $opt[] = array('field' => 'id', 'param' => 'where', 'operator' => '', 'value' => $id_peng);
        $this->Dv_txpengadaan_model->update($data, $opt, NULL, 'trx_pengadaan');

        $opts[] = array('field' => 'pengadaan_id', 'param' => 'where', 'operator' => '', 'value' => $id_peng);
        $this->Dv_txpengadaan_model->update($data_item, $opts, NULL, 'pengadaan_detail');

        echo json_encode(array('success' => 'true'));
    }


    public function list_pengadaan_detail() {
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

        $result = $this->Dv_txpengadaan_model->gets($record, NULL, 'pengadaan_detail');

        foreach ($result as $row) {
            $det_barang = $this->Dv_txpengadaan_model->get_detail('id', $row->barang_id, 'dt_item_cabang' );
            $det_barang = $this->Dv_txpengadaan_model->get_detail('id', $det_barang->mi_id, 'dt_item' );
            $listpbd[] = array(
                'id' => $row->id,
                'pengadaanNo' => $row->pengadaan_id,
                'pengadaanKode' => $this->Dv_txpengadaan_model->get_detail('id', $row->pengadaan_id, 'trx_pengadaan')->no_pengadaan,
                'barangId' => $row->barang_id,
                'barangName' => $det_barang->mi_name,
                'barangMerk' => $det_barang->mi_merk == 0 ? ' - ' : ($this->Dv_txpengadaan_model->get_detail('id', $det_barang->mi_merk, 'dt_merk')->merk_name),
                'barangNameKode' => $det_barang->mi_name . ' / ' . $det_barang->mi_kode,
                'barangKemasan' => $row->barang_kemasan == 0 ? ' - ' : ($this->Dv_txpengadaan_model->get_detail('id', $row->barang_kemasan, 'item_kemasan')->kemasan_kecil),
                'barangKatalog' => $row->barang_katalog,
                'barangHarga' => $row->barang_harga,
                'barangDisc' => $row->barang_disc,
                'barangDesc' => $row->barang_desc,
                'tglKebutuhan' => $row->tgl_butuh,
                'barangPpn' => $row->barang_ppn,
                'barangQty' => $row->barang_qty,
                'barangNetto' => ($row->barang_qty * $row->barang_harga) * (1 - ($row->barang_disc / 100)) * 1.1,
                'barangStatus' => $det_barang->mi_inv_stat,
                'simpanStatus' => $row->simpan_status,
                'poStatus' => $row->po_status,
                'poId' => $row->po_id,
                'pengDivisi' => $row->divisi,
                'pengCabangId' => $row->cabang_id
            );
        }

        if ($result) {
            echo json_encode(array('success' => 'true', 'data' => $listpbd, 'message' => 'Daftar semua Detail Pengadaan Barang'));
        } else {
            echo json_encode(array('success' => 'true', 'data' => $listpbd, 'message' => 'Tidak ada data Detail'));
        }
    }
    public function approve_divisi() {
        $id = rtrim($this->input->post('id'), '-');
        $data = explode('-', $id);

        if (!$this->__check_usergr()) {
            echo json_encode(array('success' => 'false', 'data' => NULL, 'title' => 'Error', 'msg' => 'Anda tidak mempunyai hak untuk approval'));
            return;
        }
        
        
        foreach ($data as $row) {
            $this->Dv_txpengadaan_model->approve_peng('peng_statusdiv', $row);
            
            
        }
        
        $this->Dv_txpengadaan_model->generate_user_log($this->user->id, $this->user->cabang_id, 'APPROVE_CB', 'TRX_PENGADAAN');
        echo json_encode(array('success' => 'true', 'data' => NULL, 'title' => 'Info', 'msg' => 'Approve Pengadaan Success'));
    }
    public function approve_manager() {
        $id = rtrim($this->input->post('id'), '-');
        $data = explode('-', $id);

        if (!$this->__check_usergr()) {
            echo json_encode(array('success' => 'false', 'data' => NULL, 'title' => 'Error', 'msg' => 'Anda tidak mempunyai hak untuk approval'));
            return;
        }



        foreach ($data as $row) {
            $status_divisi = $this->Dv_txpengadaan_model->get_detail('id',$row,'trx_pengadaan')->peng_statusdiv;
            if($status_divisi==0){
                echo json_encode(array('success' => 'false', 'data' => NULL, 'title' => 'Error', 'msg' => 'Pengadaan belum diapprove oleh divisi'));
                return;
            }
            $this->Dv_txpengadaan_model->approve_peng('peng_statusmgr', $row);
           
        }


        $this->Dv_txpengadaan_model->generate_user_log($this->user->id, $this->user->cabang_id, 'APPROVE_PST', 'TRX_PENGADAAN');
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

            $this->Dv_txpengadaan_model->approve_peng('peng_statuspst', $row);
            
        }


        $this->Dv_txpengadaan_model->generate_user_log($this->user->id, $this->user->cabang_id, 'APPROVE_PST', 'TRX_PENGADAAN');
        echo json_encode(array('success' => 'true', 'data' => NULL, 'title' => 'Info', 'msg' => 'Approve Pengadaan Success'));
    }

}