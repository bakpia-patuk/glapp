<?php

defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Description of data_model
 *
 * @author Coepoe
 */
class Dv_txbrkeluar_model extends MY_Model {

    function __construct() {
        parent::__construct();
    }
    public function get_last_stockdiv($barang, $ruang) {
//        GET IN
        $this->db->select_sum('trx_stok')
                ->from('trx_stock_div')
                ->where('id_ruang', $ruang)
                ->where('id_barang', $barang)
                ->where('jenis_trx', 1);
        $query_in = $this->db->get();

        if ($query_in->num_rows() > 0) {
            $in = $query_in->row()->trx_stok;
        } else {
            $in = 0;
        }

//        GET OUT
        $this->db->select_sum('trx_stok')
                ->from('trx_stock_div')
                ->where('id_ruang', $ruang)
                ->where('id_barang', $barang)
                ->where('jenis_trx', 0);
        $query_out = $this->db->get();

        if ($query_out->num_rows() > 0) {
            $out = $query_out->row()->trx_stok;
        } else {
            $out = 0;
        }

        return $in + -($out);
    }

    public function get_last_stock($barang, $ruang) {
//        GET IN
        $this->db->select_sum('stk_qty')
                ->from('trx_stock')
                ->where('stk_ruangid', $ruang)
                ->where('stk_barangid', $barang)
                ->where('stk_trxtype', 1);
        $query_in = $this->db->get();

        if ($query_in->num_rows() > 0) {
            $in = $query_in->row()->stk_qty;
        } else {
            $in = 0;
        }

//        GET OUT
        $this->db->select_sum('stk_qty')
                ->from('trx_stock')
                ->where('stk_ruangid', $ruang)
                ->where('stk_barangid', $barang)
                ->where('stk_trxtype', 0);
        $query_out = $this->db->get();

        if ($query_out->num_rows() > 0) {
            $out = $query_out->row()->stk_qty;
        } else {
            $out = 0;
        }

        return $in + -($out);
    }
    public function get_last_stockdivlot($barang, $ruang ,$lot) {
//        GET IN
        $this->db->select_sum('stl_qty')
                ->from('trx_stock_lotdiv')
                ->where('stl_nolot', $lot)
                ->where('stl_ruangid', $ruang)
                ->where('stl_barangid', $barang)
                ->where('stl_type', 1);
        $query_in = $this->db->get();

        if ($query_in->num_rows() > 0) {
            $in = $query_in->row()->stl_qty;
        } else {
            $in = 0;
        }

//        GET OUT
        $this->db->select_sum('stl_qty')
                ->from('trx_stock_lotdiv')
                ->where('stl_nolot', $lot)
                ->where('stl_ruangid', $ruang)
                ->where('stl_barangid', $barang)
                ->where('stl_type', 0);
        $query_out = $this->db->get();

        if ($query_out->num_rows() > 0) {
            $out = $query_out->row()->stl_qty;
        } else {
            $out = 0;
        }

        return $in + -($out);
    }
    public function getsdiv_lot($params, $opt, $table,$cabang) {
        $this->db->select('id, stl_nolot, stl_barangid, SUM(stl_qty) as stl_barangqty, stl_baranged, stl_barcode, simpan_status, stl_ruangid, stl_qtylast');
        $this->db->from($table);
        if ($params != NULL) {
            foreach ($params as $data) {
                
                    $this->db->$data['param']($data['field'] . $data['operator'], $data['value']);
              

            }
            
        }
        $query =$this->db->group_by('stl_nolot');
        $data_lot = $this->db->get(); 
        
        if ($data_lot->num_rows() > 0) {
            $data_lot = $data_lot->result();
            
            for($i=0 ; $i<sizeof($data_lot);$i++){
                $param_lot = $data_lot[$i];
                $jumlah_stok = $this->get_last_stockdivlot($param_lot->stl_barangid,$param_lot->stl_ruangid,$param_lot->stl_nolot);
                $data_lot[$i]->stl_barangqty = $jumlah_stok;
            }
            return $data_lot;
        }
        else{
            return false;
        }
        

        
    }

     public function get_item_div($record, $id_barang, $type) {
        $tablename = 'trx_stok_div';

        $this->db->select_sum('trx_stok');
        $this->db->from($tablename);
        if ($record != NULL) {
            foreach ($record as $data) {
                $this->db->$data['param']($data['field'] . $data['operator'], $data['value']);
            }
        }
        $this->db->where('id_barang', $id_barang);
        $this->db->where('jenis_trx', $type);
        $query = $this->db->get();
        if ($query->num_rows() > 0) {
            return $query->row()->trx_stok;
        }
    }

}