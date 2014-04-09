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
                ->from('trx_stok_div')
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
                ->from('trx_stok_div')
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

    public function getsdiv_lot($params, $opt, $table,$cabang) {
        $this->db->select('id, stl_nolot, stl_barangid, SUM(stl_qty) as stl_barangqty, stl_baranged, stl_barcode, simpan_status, stl_ruangid, stl_qtylast');
        $this->db->from($table);
        if ($params != NULL) {
            foreach ($params as $data) {
                
                    $this->db->$data['param']($data['field'] . $data['operator'], $data['value']);
                // else{
                //     $record=array();
                //     $record[] = array('field' => 'mi_id', 'param' => 'where', 'operator' => '', 'value' => $data['value']);
                //     $record[] = array('field' => 'cabang_id', 'param' => 'where', 'operator' => '', 'value' => $cabang);
        
                //     $det_barang = $this->get($record, null, 'dt_item_cabang' );
                //     var_dump($det_barang->id);
                //     $this->db->$data['param']($data['field'] . $data['operator'], $det_barang->id);
                // }

            }
        }
        $query =$this->db->group_by('stl_nolot');
        $query = $this->db->get(); 

        if ($query->num_rows() > 0) {
            return $query->result();
        } else {
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