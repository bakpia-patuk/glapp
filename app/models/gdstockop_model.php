<?php

defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Description of data_model
 *
 * @author Isht.Ae
 */
class Gdstockop_model extends MY_Model {

    function __construct() {
        parent::__construct();
    }

    public function __gudang_pusat($id) {
        $params[] = array('field' => 'divisi_id', 'param' => 'where', 'operator' => '', 'value' => 3);
        $params[] = array('field' => 'cabang_id', 'param' => 'where', 'operator' => '', 'value' => $id);
        $params[] = array('field' => 'ruang_nama', 'param' => 'where', 'operator' => '', 'value' => 'R. GUDANG');
        $result = $this->get($params, NULL, 'dt_ruang');
        return $result->id;
    }


}
