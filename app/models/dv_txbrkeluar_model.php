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
}