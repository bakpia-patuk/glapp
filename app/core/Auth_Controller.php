<?php

/**
 * Description of Auth_Controller
 *
 * @author Isht.Ae
 */
if (!defined('BASEPATH')) {
    exit('No direct script access allowed');
}

class Auth_Controller extends MY_Controller {

    public $user;
    public $page;

    public function __construct() {
        parent::__construct();
        date_default_timezone_set('Asia/Jakarta');
        if (!$this->ion_auth->logged_in()) {
            //redirect them to the login page
            redirect('auth', 'refresh');
        } else {
            $this->user = $this->ion_auth->user()->row();
        }
    }

    public function generate_db_query($param) {
        $record = array();

        foreach ($param as $key) {
            $field = $this->__property_reader($key['property']);
            $param = $this->__param_reader($key['property']);
            $op = $this->__operator_reader($key['value']);
            $val = $this->__property_reader($key['value']);

            $record[] = array('field' => $field, 'param' => $param, 'operator' => $op, 'value' => $val);
        }

        return $record;
    }

    public function catch_db_err() {
        $message = '<b>Message</b>  : ' . $this->db->_error_message() . '<br  />';
        $message .= '<b>Error No.</b> : ' . $this->db->_error_number() . '<br  />';
        $message .= '<b>Query</b> :<br />' . $this->db->last_query();
        return $message;
    }

    public function property_reader($record) {
        $param = NULL;

        if (isset($record)) {
            $parse = substr($record, -3);
            if ($parse == "=ww" || $parse == "=ow" || $parse == "=ll" || $parse == "=ol") {
                $param = substr($record, 0, -3);
            } else {
                $param = $record;
            }

            return $param;
        } else {
            return FALSE;
        }
    }

    public function param_reader($record) {
        if (isset($record)) {
            $parse = substr($record, -3);
            switch ($parse) {
                case '=ww':
                    return 'where';
                    break;

                case '=ow':
                    return 'or_where';
                    break;

                case '=ll':
                    return 'like';
                    break;

                case '=ol':
                    return 'or_like';
                    break;

                case '=nl':
                    return 'not_like';
                    break;

                case '=hv':
                    return 'having';
                    break;

                default:
                    return 'where';
                    break;
            }
        } else {
            return FALSE;
        }
    }

    public function operator_reader($record) {
        if (isset($record)) {
            $parse = substr($record, -2);
            switch ($parse) {
                case 'LT':
                    return ' <=';
                    break;

                case 'GT':
                    return ' >=';
                    break;

                case 'EQ':
                    return '';
                    break;

                case 'NE':
                    return ' <>';
                    break;

                case 'LL':
                    return ' <';
                    break;

                case 'GG':
                    return ' >';
                    break;

                default:
                    return '';
                    break;
            }
        } else {
            return FALSE;
        }
    }

    private function __property_reader($record) {
        $param = NULL;

        if (isset($record)) {
            $parse = substr($record, -3);
            if ($parse == "=ww" || $parse == "=ow" || $parse == "=ll" || $parse == "=ol") {
                $param = substr($record, 0, -3);
            } else {
                $param = $record;
            }

            return $param;
        } else {
            return FALSE;
        }
    }

    private function __param_reader($record) {
        if (isset($record)) {
            $parse = substr($record, -3);
            switch ($parse) {
                case '=ww':
                    return 'where';

                case '=ow':
                    return 'or_where';

                case '=ll':
                    return 'like';

                case '=ol':
                    return 'or_like';

                case '=nl':
                    return 'not_like';

                case '=hv':
                    return 'having';

                default:
                    return 'where';
            }
        } else {
            return FALSE;
        }
    }

    private function __operator_reader($record) {
        if (isset($record)) {
            $parse = substr($record, -2);
            switch ($parse) {
                case 'LT':
                    return ' <=';

                case 'GT':
                    return ' >=';

                case 'EQ':
                    return '';

                case 'NE':
                    return ' <>';

                case 'LL':
                    return ' <';

                case 'GG':
                    return ' >';

                default:
                    return '';
            }
        } else {
            return FALSE;
        }
    }
    
    public function __check_usergr() {
        return TRUE;
    }

}
