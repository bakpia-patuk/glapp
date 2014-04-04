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

    private function __calc_netto($qty, $harga, $disc, $ppn) {
        $a = $qty * $harga;
        $b = 1 - ($disc / 100);
        $c = 1 + ($ppn / 100);

        return $a * $b * $c;
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

    public function check_trx_lot($user, $barang, $ref, $cabang = NULL, $ruang = NULL, $reftype = 'ttgudang') {
        $cabang = $cabang == NULL ? $user->cabang_id : $cabang;
        $ruang = $ruang != NULL ? $ruang : $this->__gudang_pisat($cabang);
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
    
    private function __gudang_pisat($id) {
        $params[] = array('field' => 'divisi_id', 'param' => 'where', 'operator' => '', 'value' => 3);
        $params[] = array('field' => 'cabang_id', 'param' => 'where', 'operator' => '', 'value' => $id);
        $params[] = array('field' => 'ruang_nama', 'param' => 'where', 'operator' => '', 'value' => 'R. GUDANG');
        $result = $this->get($params, NULL, 'dt_ruang');
        return $result->id;
    }

}
