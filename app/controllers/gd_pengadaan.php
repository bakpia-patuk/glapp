<?php

if (!defined('BASEPATH')) {
    exit('No direct script access allowed');
}

/**
 * Description of data_model
 *
 * @author Coepoe
 */
class Gd_pengadaan extends Auth_Controller {

    function __construct() {
        parent::__construct();
        $this->load->model('Gdpengadaan_model');
        $this->page = 'Master';
    }
    
}