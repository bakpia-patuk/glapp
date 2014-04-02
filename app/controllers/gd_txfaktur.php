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
//                $detail_item = $this->pmodel->get_detail('id', $item_id, 'master_item_' . $this->ion_auth->user()->row()->cabang_id);

                $listpo[] = array(
                    'id' => $row->id,
                    'tt_id' => $row->tt_id,
//                    'ttNo' => $this->pmodel->get_detail('id', $row->tt_id, 'trx_tt')->tt_no,
                    'ttPoId' => $row->tt_po_id,
//                    'ttPoNo' => $this->pmodel->get_detail('id', $row->tt_po_id, 'trx_po')->po_no,
//                    'ttPoExp' => $this->pmodel->get_detail('id', $row->tt_po_id, 'trx_po')->po_ed,
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

        if ($result != NULL) {
            foreach ($result as $row) {
                $tgl = explode(' ', $row->faktur_tgl);

                $listpo[] = array(
                    'id' => $row->id,
                    'faktur_tgl' => $tgl[0],
                    'faktur_suppid' => $row->faktur_suppid,
//                    'fktSuppNama' => $this->pmodel->get_detail('id', $row->faktur_suppid, 'master_supplier')->ms_name,
                    'faktur_no' => $row->faktur_no,
                    'faktur_nototal' => $row->faktur_nototal,
                    'faktur_bayar' => $row->faktur_bayar,
                    'faktur_bgstatus' => $row->faktur_bgstatus,
                    'faktur_cabang' => $row->faktur_cabang,
//                    'fktCabangName' => $this->pmodel->get_detail('id', $row->faktur_cabang, 'master_cabang')->cabang_name,
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
}