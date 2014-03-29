<?php

/**
 * Description of MY_Controller
 *
 * @author Isht.Ae
 */
if (!defined('BASEPATH')) {
    exit('No direct script access allowed');
}

class MY_Controller extends CI_Controller {

    public function is_post() {
        return $_SERVER['REQUEST_METHOD'] == 'POST' ? TRUE : FALSE;
    }

}