<?php

if (!defined('BASEPATH')) {
    exit('No direct script access allowed');
}

/**
 * Description of data_model
 *
 * @author Isht.Ae
 */
class Gd_stockop extends Auth_Controller {

    function __construct() {
        parent::__construct();
        $this->load->model('Gdstockop_model');
        $this->Gdtxfaktur_model->cms_db = $this->load->database('outgoing', TRUE);
    }


}
