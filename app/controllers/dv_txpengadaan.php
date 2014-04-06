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

        $opt['sortBy'] = 'msi_satkecil';
        $opt['sortDirection'] = 'ASC';
        $data_dokter = $this->Dmodel->gets($record, $opt, 'item_kemasan');
        $list_dokter = array();

        if ($data_dokter != NULL) {
            foreach ($data_dokter as $key) {
                $list_dokter[] = array(
                    'id' => $key->id,
                    'msi_idbarang' => $key->msi_idbarang,
                    'msi_satbesar' => $key->msi_satbesar,
                    'nama_satbesar' => $key->msi_satbesar != 0 ? $this->Dmodel->get_detail('id', $key->msi_satbesar, 'master_satuan')->sat_name : '',
                    'msi_konversi' => $key->msi_konversi,
                    'msi_satkecil' => $key->msi_satkecil,
                    'nama_satkecil' => '',
                    'is_active' => $key->is_active,
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

        $result = $this->pmodel->gets($record, NULL, 'trx_pengadaan');

        foreach ($result as $row) {
            $listpb[] = array(
                'idPengadaan' => $row->id,
                'tglTransaksi' => explode(' ', $row->tgl_trx)[0],
                'noPeng' => $row->no_pengadaan,
                'idCabang' => $row->cabang_id,
                'cabangName' => strtoupper($this->pmodel->get_detail('id', $row->cabang_id, 'master_cabang')->cabang_name),
                'divisi' => $row->divisi,
                'divisiName' => $row->divisi == 0 ? "-" : strtoupper($this->pmodel->get_detail('id', $row->divisi, 'master_divisi')->divisi_name),
                'tglKebutuhan' => $row->tgl_butuh,
                'pengDesc' => $row->keterangan,
                'pengStatus' => $row->peng_status,
                'pengStatusDiv' => $row->peng_statusdiv,
                'poStatus' => $this->checking_postatus($row->id),
                'pengPetugas' => $row->petugas_id,
                'simpanStatus' => $row->simpan_status
            );
        }

        if ($result) {
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


}