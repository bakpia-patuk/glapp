<?php

defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Description of data_model
 *
 * @author Coepoe
 */
class Gdpengadaan_model extends MY_Model {

    function __construct() {
        parent::__construct();
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

}
