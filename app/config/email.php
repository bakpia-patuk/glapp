<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

$config['protocol'] = 'smtp';
$config['smtp_host']= 'ssl://smtp.gmail.com';
$config['smtp_user']= 'parahita.apotek';
$config['smtp_pass']= 'Pwd4apotekparahita';
$config['smtp_port']= '465';
$config['smtp_timeout'] = '7';
#$config['mailpath'] = '/usr/bin/msmtp';
#$config['mailpath'] = '/usr/bin/msmtp';
$config['charset'] = 'iso-8859-1';
$config['wordwrap'] = TRUE;
//$this->email->initialize($config);
