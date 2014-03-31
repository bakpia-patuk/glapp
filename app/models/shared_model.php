<?php

defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Description of data_model
 *
 * @author Azelia
 */
class Shared_model extends MY_Model {

    function __construct() {
        parent::__construct();
    }

    public function get_barang_cabang($params, $options) {
        $result = $this->__barang_cabang($params, $options);
        $rtrn = array();

        if ($result != NULL) {
            foreach ($result as $row) {
                $rtrn[] = array(
                    'no' => $row->no,
                    'id' => $row->id,
                    'id_barang' => $row->mi_id,
                    'mi_name' => $row->mi_name,
                    'stock_last' => $row->stock_last,
                    'stock_min' => $row->stock_min,
                    'stock_max' => $row->stock_max,
                    'mi_parent_id' => $row->mi_parent_id,
                    'mi_parent_name' => $this->get_parent_id($row->mi_parent_id),
                    'mi_merk' => $row->mi_merk,
                    'mi_merk_name' => $row->mi_merk != 0 ? $this->get_detail('id', $row->mi_merk, 'dt_merk')->merk_name : "",
                    'mi_item_price' => $row->mi_item_price,
                    'mi_barcode' => $row->mi_barcode,
                    'mi_inv_stat' => $row->mi_inv_stat,
                    'mi_katalog' => $row->mi_katalog,
                    'mi_diskon' => $row->mi_diskon,
                    'mi_ppn' => $row->mi_ppn,
                    'mi_hpp' => $row->mi_hpp
                );
            }
        }
        
        return $rtrn;
    }

    private function __barang_cabang($params, $options) {
        $this->db->select('no, dt_item_cabang.id AS id, mi_id, stock_last, stock_min, stock_max, mi_name, mi_parent_id, mi_merk,'
                . ' mi_barcode, mi_inv_stat, mi_katalog, mi_diskon, mi_ppn, mi_hpp, mi_item_price');
        $this->db->from('dt_item_cabang');
        $this->db->join('dt_item', 'dt_item_cabang.mi_id = dt_item.id');
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
    
    public function get_parent_id($param) {
        $params[] = array('field' => 'id', 'param' => 'where', 'operator' => '', 'value' => $param);
        $result = $this->get($params, NULL, 'dt_item');
        
        if($result != NULL) {
            return $result->mi_name;
        } else {
            return "TIDAK ADA GOLONGAN";
        }
    }

    public function barang_add($input) {
        
    }

    public function barang_edit($input) {
        
    }

}
