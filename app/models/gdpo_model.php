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
                if($row->po_ppn==1){
                    $ppn=10;
                }
                else{
                    $ppn=0;
                }
                $rtrn[] = array(
                    'no' => $row->no,
                    'id' => $row->id,
                    'pengadaan_id' => $row->pengadaan_id,
                    'no_pengadaan' => $row->no_pengadaan,
                    'barang_id' => $row->barang_id,
                    'barang_name' => $this->get_item_detail($row->barang_id)->mi_name,
                    'po_merk' => $row->po_merk!=0?$this->get_detail('id', $row->po_merk, 'dt_merk')->merk_name:'-',
                    'po_katalog' => $row->po_katalog,
                    'po_kemasan' => $row->po_kemasan == 0 ? "-" : $row->po_kemasan,
                    'po_qty' => $row->po_qty,
                    'po_harga' => $row->po_harga,
                    'po_disc' => $row->po_disc,
                    'po_ppn' => $ppn,
                    'po_netto' => $this->__calc_netto($row->po_qty, $row->po_harga, $row->po_disc, $row->po_ppn),
                    'barang_desc' => $row->barang_desc,
                    'po_id' => $row->po_id,
                    'po_status' => $row->po_status,
                    'po_class_row' => 'peng_po'
                );
            }
        }

        return $rtrn;
    }

    private function __po_cabang($params, $options) {
        $this->db->select('trx_pengadaan_detail.no AS no, trx_pengadaan_detail.id AS id, pengadaan_id, no_pengadaan, barang_id, po_merk, po_katalog, po_kemasan, po_qty, po_harga,'
                . ' po_disc, po_ppn, trx_pengadaan_detail.po_status AS po_status, barang_desc, po_id');
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

    public function total_po($id) {
        $params[] = array('field' => 'po_id', 'param' => 'where', 'operator' => '', 'value' => $id);
        $data = $this->gets($params, NULL, 'trx_pengadaan_detail');
        $total = 0;

        if ($data != NULL) {
            foreach ($data as $val) {
                $total += $this->__calc_netto($val->po_qty, $val->po_harga, $val->po_disc, $val->po_ppn);
            }
        }

        return $total;
    }

    public function total_po_complete($id) {
        $params[] = array('field' => 'po_id', 'param' => 'where', 'operator' => '', 'value' => $id);
        $data = $this->gets($params, NULL, 'trx_po_detail');
        $total = 0;

        if ($data != NULL) {
            foreach ($data as $val) {
                $total += $this->__calc_netto($val->barang_qty, $val->barang_harga, $val->barang_disc, $val->barang_ppn);
            }
        }

        return $total;
    }

    public function po_item_netto($qty, $harga, $disc, $ppn) {
        return $this->__calc_netto($qty, $harga, $disc, $ppn);
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

    public function insert_po_item($id) {
        $dpeng = $this->get_detail('id', $id, 'trx_pengadaan_detail');
        $dpo = $this->get_detail('id', $dpeng->po_id, 'trx_po');

        $data = array(
            'id' => $this->get_last('trx_po_detail') . '.' . $dpo->po_cabangid,
            'po_id' => $dpeng->po_id,
            'po_no' => $dpo->po_no,
            'po_ed' => mdate('%Y-%m-%d', strtotime($dpo->po_ed)),
            'po_cabang_id' => $dpo->po_cabangid,
            'po_divisi' => $dpeng->divisi,
            'po_supp_id' => $dpo->po_suppid,
            'peng_id' => $dpeng->pengadaan_id,
            'barang_id' => $dpeng->barang_id,
            'barang_qty' => $dpeng->po_qty,
            'barang_harga' => $dpeng->po_harga,
            'barang_disc' => $dpeng->po_disc,
            'barang_ppn' => $dpeng->po_ppn,
            'barang_merk' => $dpeng->po_merk,
            'barang_ket' => $dpeng->barang_desc,
            'barang_katalog' => $dpeng->po_katalog,
            'tt_status' => 0,
            'tt_id' => 0,
            'tt_qty_kirim' => 0,
            'simpan_status' => 1
        );

        $this->insert($data, 'trx_po_detail');

        $set_true = array('po_set' => 1);
        $params1[] = array('field' => 'id', 'param' => 'where', 'operator' => '', 'value' => $id);
        $this->update($set_true, $params1, NULL, 'trx_pengadaan_detail');

        return TRUE;
    }

    public function get_po_detail($id) {
        $params[] = array('field' => 'po_id', 'param' => 'where', 'operator' => '', 'value' => $id);
        $data = $this->gets($params, NULL, 'trx_po_detail');
        $no = 1;
        $total = 0;
        foreach ($data as $row) {
            $netto = $this->__calc_netto($row->barang_qty, $row->barang_harga, $row->barang_disc, $row->barang_ppn);
            $return[]= array(
                'no' => $no,
                'barang_name' => $this->get_item_detail($row->barang_id)->mi_name,
                'barang_merk' => '-',
                'barang_kemasan' => '-',
                'barang_katalog' => $row->barang_katalog,
                'barang_qty' => $row->barang_qty,
                'barang_harga' => $row->barang_harga,
                'barang_disc' => $row->barang_disc,
                'barang_ppn' => $row->barang_ppn,
                'barang_sub' => $netto,
                'barang_desc' => $row->barang_ket
            );
            
            $total += $netto;
            $no++;
        }
        
        $return = array(
            'data' => $return,
            'total' => $total
        );
        
        return $return;
    }

}
