<?php

defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Description of data_model
 *
 * @author Coepoe
 */
class Gdtt_model extends MY_Model {

    function __construct() {
        parent::__construct();
    }

    public function get_tt_sisa($id_po, $id_peng, $id_barang) {
        $params[] = array('field' => 'tt_po_id', 'param' => 'where', 'operator' => ' <=', 'value' => $id_po);
        $params[] = array('field' => 'tt_peng_id', 'param' => 'where', 'operator' => ' <=', 'value' => $id_peng);
        $params[] = array('field' => 'tt_barang_id', 'param' => 'where', 'operator' => ' <=', 'value' => $id_barang);
        $result = $this->gets($params, NULL, 'trx_tt_detail');
        $total = 0;
        if ($result != null) {
            foreach ($result as $val) {
                $total += $val->tt_qty_kirim;
            }
        }

        return $total;
    }

    public function get_last($table) {
        $opt['sortBy'] = 'no';
        $opt['sortDirection'] = 'DESC';

        $result = $this->get(NULL, $opt, $table);
        if ($result != NULL) {
            return $result->no + 1;
        } else {
            return 1;
        }
    }

    public function get_item_detail($id) {
        $id_barang = $this->get_detail('id', $id, 'dt_item_cabang')->mi_id;
        $data = $this->get_detail('id', $id_barang, 'dt_item');
        return $data;
    }

    public function check_trx_lot($user, $barang, $ref, $cabang = NULL, $ruang = NULL, $reftype = NULL) {
        $cabang = $cabang == NULL ? $user->cabang_id : $cabang;
        $ruang = $ruang != NULL ? $ruang : $this->__gudang_pusat($cabang);
        $params[] = array('field' => 'stl_ruangid', 'param' => 'where', 'operator' => '', 'value' => $ruang);
        $params[] = array('field' => 'stl_barangid', 'param' => 'where', 'operator' => '', 'value' => $barang);
        $params[] = array('field' => 'stk_trxreftype', 'param' => 'where', 'operator' => '', 'value' => $reftype);
        $params[] = array('field' => 'stk_trxref', 'param' => 'where', 'operator' => '', 'value' => $ref);
        
        $result = $this->gets($params, NULL, 'trx_stock_lot');
        
        if($result != NULL) {
            return 1;
        } else {
            return 0;
        }
    }
    
    public function __gudang_pusat($id) {
        $params[] = array('field' => 'divisi_id', 'param' => 'where', 'operator' => '', 'value' => 3);
        $params[] = array('field' => 'cabang_id', 'param' => 'where', 'operator' => '', 'value' => $id);
        $params[] = array('field' => 'ruang_nama', 'param' => 'where', 'operator' => '', 'value' => 'R. GUDANG');
        $result = $this->get($params, NULL, 'dt_ruang');
        return $result->id;
    }
    
    public function insert_tt_item($id) {
        $dtpo = $this->get_detail('id', $id, 'trx_po_detail');
        $dtt = $this->get_detail('id', $dtpo->tt_id, 'trx_tt');

        $data = array(
            'id' => $this->get_last('trx_tt_detail') . '.' . $dtt->tt_cabang,
            'tt_id' => $dtt->id,
            'tt_cabang_id' => $dtt->tt_cabang,
            'tt_po_id' => $dtpo->po_id,
            'tt_peng_id' => $dtpo->peng_id,
            'tt_barang_id' => $dtpo->barang_id,
            'tt_supp_id' => $dtt->tt_supp_id,
            'tt_qty_pesan' => $dtpo->barang_qty,
            'tt_qty_kirim' => $dtpo->tt_qty_kirim,
            'tt_qty_sisa' => $dtpo->barang_qty - $dtpo->tt_qty_kirim,
            'tt_harga' => $dtpo->barang_harga,
            'tt_disc' => $dtpo->barang_disc,
            'tt_ppn' => $dtpo->barang_ppn,
            'tt_faktur_status' =>0,
            'tt_faktur_show' => 0,
            'faktur_id' => 0,
            'tt_set' => 0,
            'simpan_status'=> 1
        );

        $this->insert($data, 'trx_tt_detail');

        $set_true = array('tt_set' => 1);
        $params1[] = array('field' => 'id', 'param' => 'where', 'operator' => '', 'value' => $id);
        $this->update($set_true, $params1, NULL, 'trx_po_detail');

        $set_true2 = array('simpan_status' => 1);
        $params2[] = array('field' => 'stk_trxreftype', 'param' => 'where', 'operator' => '', 'value' => 'ttgudang');
        $params2[] = array('field' => 'stk_trxref', 'param' => 'where', 'operator' => '', 'value' => $dtpo->tt_id);
        $this->update($set_true2, $params2, NULL, 'trx_stock_lot');

        $this->__set_stock($id);
        return TRUE;
    }
    
    private function __set_stock($id) {
        $user = $this->ion_auth->user()->row();
        $dtpo = $this->get_detail('id', $id, 'trx_po_detail');
        $get_last_item = $this->get_detail('id', $dtpo->barang_id, 'dt_item_cabang')->stock_last;
        
        $data = array(
            'id' => $this->get_last('trx_stock') . '.' . $user->cabang_id,
            'stk_date' => mdate("%Y-%m-%d %H:%i:%s", time()),
            'stk_cabangid' => $user->cabang_id,
            'stk_divisiid' => $user->divisi_id,
            'stk_ruangid' => $this->__gudang_pusat($user->cabang_id),
            'stk_usercreate' => $user->id,
            'stk_trxtype' => 1,
            'stk_trxreftype' => 'ttgudang',
            'stk_trxref' => $id,
            'stk_barangid' => $dtpo->barang_id,
            'stk_qty' => $dtpo->tt_qty_kirim,
            'stk_qtylast' => $dtpo->tt_qty_kirim + $get_last_item,
            'simpan_status' => 1
        );

        $this->insert($data, 'trx_stock');
        $set_last = array('stock_last' => $dtpo->tt_qty_kirim + $get_last_item);
        $params2[] = array('field' => 'id', 'param' => 'where', 'operator' => '', 'value' => $dtpo->barang_id);
        $this->update($set_last, $params2, NULL, 'dt_item_cabang');
        return TRUE;
    }


}
