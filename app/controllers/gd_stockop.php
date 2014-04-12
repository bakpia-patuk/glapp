<?php

if (!defined('BASEPATH')) {
    exit('No direct script access allowed');
}

/**
 * Description of data_model
 *
 * @author Isht.Ae
 */
class Gd_stockop extends Auth_Controller {

    function __construct() {
        parent::__construct();
        $this->load->model('Gdstockop_model');
        $this->Gdtxfaktur_model->cms_db = $this->load->database('outgoing', TRUE);
    }

    public function list_all_stok() {
        $records = $this->input->get('filter');
        $params = array();

        if ($records) {
            $raw_record = json_decode($records, true);
            $params = $this->generate_db_query($raw_record);
        }

        $params[] = array('field' => 'stk_cabangid', 'param' => 'where', 'operator' => '', 'value' => $this->user->cabang_id);
        $params[] = array('field' => 'stk_trxreftype', 'param' => 'where', 'operator' => '', 'value' => 'opnamegudang');

        $opt['sortBy'] = 'id';
        $opt['sortDirection'] = 'ASC';

        $result = $this->Gdtt_model->gets($params, $opt, 'trx_stock');
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

    public function list_all_lot() {
        $records = $this->input->get('filter');
        $params = array();

        if ($records) {
            $raw_record = json_decode($records, true);
            $params = $this->generate_db_query($raw_record);
        }

        $params[] = array('field' => 'stl_cabangid', 'param' => 'where', 'operator' => '', 'value' => $this->user->cabang_id);
        $params[] = array('field' => 'stk_trxreftype', 'param' => 'where', 'operator' => '', 'value' => 'opnamegudang');

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
                'tt_qty_kirim' => 0,
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

}
