<?php

/**
 * Description of auth
 *
 * @author Isht.Ae
 */
if (!defined('BASEPATH')) {
    exit('No direct script access allowed');
}

class Auth extends MY_Controller {

    function __construct() {
        parent::__construct();
    }

    public function index() {
        $data['title'] = 'General Ledger - Login';
        $data['app'] = 'login';
        $data['css_theme'] = "azzurra/azzurra-core";
        $data['varian'] = "azzurra/azzurra-ui-blue";
        $data['azr'] = "azzurra";
        $data['page_css'] = "login_css";
        $data['icon_css'] = "";
        $data['logged_user'] = "";
        $data['cabang_name'] = "";
        $data['cabang_id'] = "";
        $this->load->view('app_page', $data);
    }

    public function login() {
        $username = $this->input->post('username', TRUE);
        $password = $this->input->post('password', TRUE);
        $remember = (bool) $this->input->post('remember');

        if ($this->ion_auth->login($username, $password, $remember)) {
            echo "{success:true}";
        } else {
            $error = $this->ion_auth->errors();
            echo '{success:false,  msg: "' . $error . '"}';
        }
    }

    public function logout() {
        $this->ion_auth->logout();

        //redirect them to the login page
        redirect('auth', 'refresh');
    }

}
