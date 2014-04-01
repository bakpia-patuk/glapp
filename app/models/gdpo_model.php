<?php

defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Description of data_model
 *
 * @author Coepoe
 */
class Gdpo_model extends MY_Model {

    function __construct() {
        parent::__construct();
    }

    public function get_peng_list($params, $options) {
        $result = $this->__po_cabang($params, $options);
        $rtrn = array();

        if ($result != NULL) {
            foreach ($result as $row) {
                $rtrn[] = array(
                    'no' => $row->no,
                    'id' => $row->id,
                    'pengadaan_id' => $row->pengadaan_id,
                    'no_pengadaan' => $row->no_pengadaan,
                    'barang_id' => $row->barang_id,
                    'barang_name' => $this->get_item_detail($row->barang_id)->mi_name,
                    'po_merk' => $this->get_detail('id', $row->po_merk, 'dt_merk')->merk_name,
                    'po_katalog' => $row->po_katalog,
                    'po_kemasan' => $row->po_kemasan == 0 ? "-" : $row->po_kemasan,
                    'po_qty' => $row->po_qty,
                    'po_harga' => $row->po_harga,
                    'po_disc' => $row->po_disc,
                    'po_ppn' => $row->po_ppn,
                    'po_netto' => $this->__calc_netto($row->po_qty, $row->po_harga, $row->po_disc, $row->po_ppn),
                    'barang_desc' => $row->barang_desc,
                    'po_status' => $row->po_status,
                    'po_class_row' => 'peng_po'
                );
            }
        }
        
        return $rtrn;
    }

    private function __po_cabang($params, $options) {
        $this->db->select('trx_pengadaan_detail.no AS no, trx_pengadaan_detail.id AS id, pengadaan_id, no_pengadaan, barang_id, po_merk, po_katalog, po_kemasan, po_qty, po_harga,'
                . ' po_disc, po_ppn, trx_pengadaan_detail.po_status AS po_status, barang_desc');
        $this->db->from('trx_pengadaan');
        $this->db->join('trx_pengadaan_detail', 'trx_pengadaan.id = trx_pengadaan_detail.pengadaan_id');
        if ($params != NULL) {
            foreach ($params as $data) {
                $this->db->$data['param']($data['field'] . $data['operator'], $data['value']);
            }
        }
        // If limit / offset are declared (usually for pagination) then we need to take them into account
        if (isset($options['limit']) && isset($options['offset'])) {
            $this->db->limit($options['limit'], $options['offset']);
        } else if (isset($options['limit'])) {
            $this->db->limit($options['limit']);
        }

        // sort
        if (isset($options['sortBy'])) {
            $this->db->order_by($options['sortBy'], $options['sortDirection']);
        }

        // group
        if (isset($options['groupBy'])) {
            $this->db->group_by($options['groupBy']);
        }

        $query = $this->db->get();

        if ($query->num_rows() > 0) {
            return $query->result();
        } else {
            return false;
        }
    }
    
    
    private function __calc_netto($qty, $harga, $disc, $ppn) {
        return 0;
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

    public function approve_peng($param, $id) {
        $data = array($param => 1);
        
        $params1[] = array('field' => 'id', 'param' => 'where', 'operator' => '', 'value' => $id);
        $this->Gdpengadaan_model->update($data, $params1, NULL, 'trx_pengadaan');
        
        return TRUE;
    }

}
