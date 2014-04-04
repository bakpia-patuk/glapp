<?php

if (!defined('BASEPATH')) {
    exit('No direct script access allowed');
}

class Apps extends Auth_Controller {

    public $the_user;

    function __construct() {
        parent::__construct();
        $this->load->model('Apps_model');
        $this->page = 'Dahsboard';
        $this->the_user = $this->user;
    }

    public function index() {
        $cabang = $this->the_user->cabang_id;
        $detail_cabang = $cabang == 1 ? "PUSAT" : $this->Apps_model->get_detail('id', $cabang, 'dt_cabang');

        $data['title'] = 'General Ledger - ' . $this->page;
        $data['app'] = 'app';
        $data['css_theme'] = "azzurra/azzurra-core";
        $data['varian'] = "azzurra/azzurra-ui-all";
        $data['azr'] = "azzurra";
        $data['page_css'] = "main_css";
        $data['icon_css'] = "main_icon";
        $data['logged_user'] = strtoupper($this->the_user->first_name . ' ' . $this->the_user->last_name);
        $data['cabang_name'] = $cabang == 1 ? $detail_cabang : 'CABANG ' . $detail_cabang->cabang_city . ', ' . $detail_cabang->cabang_alias;
        $data['cabang_id'] = $cabang;
        $data['ttd_string'] = $this->the_user->ttd_status == 0 ? 'TANDA TANGAN BELUM ADA. GUNAKAN MENU UBAH PROFILE UNTUK UPLOAD TTD' : '';
        $this->load->view('app_page', $data);
    }

    public function dashboard() {
        $data['logged_user'] = strtoupper($this->the_user->first_name . ' ' . $this->the_user->last_name);
        $this->load->view('welcome_page', $data);
    }

    public function app_menu($group) {
        $parent = $this->input->post('node');
        $menu_list = $this->__get_menu($parent, $group);
        echo json_encode($menu_list);
    }
    
    public function user_check() {
        echo json_encode(array('success' => 'true'));
    }

    private function __get_menu($parent, $group) {
        $menu_list = array();

        $params[] = array('field' => 'parent_id', 'param' => 'where', 'operator' => '', 'value' => $parent);
        $params[] = array('field' => 'status', 'param' => 'where', 'operator' => '', 'value' => '1');
        $params[] = array('field' => 'group_id', 'param' => 'where', 'operator' => '', 'value' => $group);
        
        $options['sortBy'] = 'sorter';
        $options['sortDirection'] = 'ASC';
        
        $result = $this->Apps_model->gets($params, $options, "app_menu");

        foreach ($result as $row) {
            if ($row->type == 0) {
                $menu_list[] = array(
                    'id' => $row->id,
                    'text' => strtoupper($row->menu_name),
                    'leaf' => FALSE,
                    'iconCls' => $row->menu_icon,
                    'panel' => $row->action,
                    'expanded' => TRUE
                );
            } else {
                $menu_list[] = array(
                    'id' => $row->id,
                    'text' => strtoupper($row->menu_name),
                    'leaf' => TRUE,
                    'iconCls' => $row->menu_icon,
                    'panel' => $row->action,
                    'expanded' => FALSE
                );
            }
        }

        return $menu_list;
    }

}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */