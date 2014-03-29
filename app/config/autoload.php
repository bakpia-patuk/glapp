<?php

if (!defined('BASEPATH')) {
    exit('No direct script access allowed');
}

$autoload['packages'] = array();
$autoload['libraries'] = array('database', 'ion_auth', 'session', 'form_validation', 'pagination');
$autoload['helper'] = array('url', 'language');
$autoload['config'] = array();
$autoload['language'] = array();
$autoload['model'] = array();


/* End of file autoload.php */
/* Location: ./application/config/autoload.php */