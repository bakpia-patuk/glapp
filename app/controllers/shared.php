<?php

if (!defined('BASEPATH')) {
    exit('No direct script access allowed');
}

/**
 * Description of data_model
 *
 * @author Azelia
 */
class Shared extends Auth_Controller {

    function __construct() {
        parent::__construct();
        $this->load->model('Shared_model');
        $this->page = 'Master';
    }

    public function check_ttd() {
        if ($this->user->ttd_status == 1) {
            echo json_encode(array('success' => 'true', 'url' => $this->user->ttd_url));
        } else {
            echo json_encode(array('success' => 'false'));
        }
    }

    //LIST, ADD, EDIT, DELETE BARANG START
    public function list_gol_barang() {
        $records = $this->input->get('filter');
        $query = $this->input->get('query');
        $params = array();

        if ($records) {
            $raw_record = json_decode($records, true);
            $params = $this->generate_db_query($raw_record);
        }

        if ($query) {
            if ($query != "") {
                $params[] = array('field' => 'mi_name', 'param' => 'like', 'operator' => '', 'value' => $query);
            }
        }

        $tablename = 'dt_item';
        $params[] = array('field' => 'mi_child_stat', 'param' => 'where', 'operator' => '', 'value' => 0);
        $opt['sortBy'] = 'id';
        $opt['sortDirection'] = 'ASC';

        $result = $this->Shared_model->gets($params, $opt, $tablename);

        if ($result != NULL) {
            echo json_encode(array('success' => 'true', 'data' => $result, 'title' => 'Info', 'msg' => 'List All Golongan'));
        } else {
            echo json_encode(array('success' => 'true', 'data' => NULL, 'title' => 'Info', 'msg' => 'Tidak ada data'));
        }
    }

    public function list_barang() {
        $records = $this->input->get('filter');
        $query = $this->input->get('query');
        $params = array();

        if ($records) {
            $raw_record = json_decode($records, true);
            $params = $this->generate_db_query($raw_record);
        }

        if ($query) {
            if ($query != "") {
                $params[] = array('field' => 'mi_name', 'param' => 'like', 'operator' => '', 'value' => $query);
            }
        }

        $tablename = 'dt_item';
        $params[] = array('field' => 'mi_child_stat', 'param' => 'where', 'operator' => '', 'value' => 1);
        $opt['sortBy'] = 'mi_kode';
        $opt['sortDirection'] = 'ASC';

        $result = $this->Shared_model->gets($params, $opt, $tablename);

        if ($result != NULL) {
            echo json_encode(array('success' => 'true', 'data' => $result, 'title' => 'Info', 'msg' => 'List All Barang'));
        } else {
            echo json_encode(array('success' => 'true', 'data' => NULL, 'title' => 'Info', 'msg' => 'Tidak ada data'));
        }
    }

    public function list_barang_tree() {
        $node = $this->input->post('node');
        $tablename = 'dt_item';
        $params[] = array('field' => 'mi_parent_id', 'param' => 'where', 'operator' => '', 'value' => $node);
        $opt['sortBy'] = 'id';
        $opt['sortDirection'] = 'ASC';

        $result = $this->Shared_model->gets($params, $opt, $tablename);
        $no = 0;

        if ($result != NULL) {
            foreach ($result as $row) {
                if ($row->mi_child_stat == 0) {
                    $result[$no]->leaf = false;
                    $result[$no]->expanded = false;
                } else {
                    $result[$no]->leaf = true;
                    $result[$no]->expanded = false;
                }
                $no++;
            }
            echo json_encode($result);
        }
    }

    public function list_barang_cabang() {
        $records = $this->input->get('filter');
        $cabang = $this->input->get('cabang');
        $query = $this->input->get('query');
        $params = array();

        if ($cabang) {
            $params[] = array('field' => 'cabang_id', 'param' => 'where', 'operator' => '', 'value' => $cabang);
        } else {
            $params[] = array('field' => 'cabang_id', 'param' => 'where', 'operator' => '', 'value' => $this->user->cabang_id);
        }

        if ($records) {
            $raw_record = json_decode($records, true);
            $params = $this->generate_db_query($raw_record);
        }

        if ($query) {
            if ($query != "") {
                $params[] = array('field' => 'mi_name', 'param' => 'like', 'operator' => '', 'value' => $query);
            }
        }

        $params[] = array('field' => 'mi_child_stat', 'param' => 'where', 'operator' => '', 'value' => 1);
        $opt['sortBy'] = 'no';
        $opt['sortDirection'] = 'ASC';

        $result = $this->Shared_model->get_barang_cabang($params, $opt);

        if ($result != NULL) {
            echo json_encode(array('success' => 'true', 'data' => $result, 'title' => 'Info', 'msg' => 'List All Barang Cabang'));
        } else {
            echo json_encode(array('success' => 'true', 'data' => NULL, 'title' => 'Info', 'msg' => 'Tidak ada data'));
        }
    }

    public function add_barang() {
        $input = $this->input->post(NULL, TRUE);

        if ($input['id'] == 0) {
            $process = $this->Shared_model->barang_add($input);
        } else {
            $process = $this->Shared_model->barang_edit($input);
        }

        if ($data == 'jurnal_group') {
            echo json_encode(array('success' => 'false', 'data' => NULL, 'message' => 'Anda tidak bisa mengganti Jurnal Group', 'title' => 'Info'));
        } else if ($data) {
            if ($data == 'headChild') {
                echo json_encode(array('success' => 'false', 'data' => NULL, 'message' => 'Anda tidak bisa mengganti type Header ke type Detail', 'title' => 'Info'));
            } else {
                echo json_encode(array('success' => 'true', 'data' => NULL, 'message' => $data, 'title' => 'Info'));
            }
        } else {
            echo json_encode(array('success' => 'false', 'data' => NULL, 'message' => $this->catch_db_err(), 'title' => 'Database Error'));
        }
    }

    public function del_barang() {
        
    }

    //LIST, ADD, EDIT, DELETE BARANG END
    //LIST, ADD, EDIT, DELETE MERK START
    public function list_merk() {
        $records = $this->input->get('filter');
        $query = $this->input->get('query');
        $params = array();

        if ($records) {
            $raw_record = json_decode($records, true);
            $params = $this->generate_db_query($raw_record);
        }

        if ($query) {
            if ($query != "") {
                $params[] = array('field' => 'merk_name', 'param' => 'like', 'operator' => '', 'value' => $query);
            }
        }

        $tablename = 'dt_merk';
        $opt['sortBy'] = 'id';
        $opt['sortDirection'] = 'ASC';

        $result = $this->Shared_model->gets($params, $opt, $tablename);

        if ($result != NULL) {
            echo json_encode(array('success' => 'true', 'data' => $result, 'title' => 'Info', 'msg' => 'List All Merk'));
        } else {
            echo json_encode(array('success' => 'true', 'data' => NULL, 'title' => 'Info', 'msg' => 'Tidak ada data'));
        }
    }

    public function add_merk() {
        $input = $this->input->post(NULL, TRUE);

        if ($input['id'] != 0) {
            $input['merk_name'] = strtoupper($input['merk_name']);
            $opt[] = array('field' => 'id', 'param' => 'where', 'operator' => '', 'value' => $input['id']);
            if (!$this->Shared_model->update($input, $opt, NULL, 'dt_merk')) {
                echo json_encode(array('success' => 'false', 'data' => NULL, 'title' => 'ERROR', 'msg' => $this->catch_db_err()));
            } else {
                echo json_encode(array('success' => 'true', 'data' => NULL, 'title' => 'Info', 'msg' => 'Update Success'));
            }
        } else {
            unset($input['id']);
            $input['merk_name'] = strtoupper($input['merk_name']);
            if (!$this->Shared_model->insert($input, 'dt_merk')) {
                echo json_encode(array('success' => 'false', 'data' => NULL, 'title' => 'ERROR', 'msg' => $this->catch_db_err()));
            } else {
                echo json_encode(array('success' => 'true', 'data' => NULL, 'title' => 'Info', 'msg' => 'Insert Success'));
            }
        }
    }

    public function del_merk() {
        $input = $this->input->post(NULL, TRUE);
        $params[] = array('field' => 'id', 'param' => 'where', 'operator' => '', 'value' => $input['id']);

        if ($this->Shared_model->delete($params, NULL, 'dt_merk')) {
            echo json_encode(array('success' => 'true', 'data' => NULL, 'title' => 'Info', 'msg' => 'Delete Success'));
        } else {
            echo json_encode(array('success' => 'false', 'data' => NULL, 'title' => 'ERROR', 'msg' => $this->catch_db_err()));
        }
    }

    //LIST, ADD, EDIT, DELETE MERK END
    //LIST CABANG START
    public function list_cabang() {
        $records = $this->input->get('filter');
        $query = $this->input->get('query');
        $params = array();

        if ($records) {
            $raw_record = json_decode($records, true);
            $params = $this->generate_db_query($raw_record);
        }

        if ($query) {
            if ($query != "") {
                $params[] = array('field' => 'cabang_alias', 'param' => 'like', 'operator' => '', 'value' => $query);
                $params[] = array('field' => 'cabang_city', 'param' => 'or_like', 'operator' => '', 'value' => $query);
            }
        }

        $tablename = 'dt_cabang';
        $opt['sortBy'] = 'id';
        $opt['sortDirection'] = 'ASC';

        $result = $this->Shared_model->gets($params, $opt, $tablename);

        if ($result != NULL) {
            echo json_encode(array('success' => 'true', 'data' => $result, 'title' => 'Info', 'msg' => 'List All Cabang'));
        } else {
            echo json_encode(array('success' => 'true', 'data' => NULL, 'title' => 'Info', 'msg' => 'Tidak ada data'));
        }
    }

    //LIST JENIS TELISA
    public function list_telisajenis() {
        $records = $this->input->get('filter');
//        $query = $this->input->get('query');
        $params = array();

        if ($records) {
            $raw_record = json_decode($records, true);
            $params = $this->generate_db_query($raw_record);
        }

//        if ($query) {
//            if ($query != "") {
//                $params[] = array('field' => 'cabang_alias', 'param' => 'like', 'operator' => '', 'value' => $query);
//                $params[] = array('field' => 'cabang_city', 'param' => 'or_like', 'operator' => '', 'value' => $query);
//            }
//        }

        $tablename = 'dt_telisajenis';
        $opt['sortBy'] = 'id';
        $opt['sortDirection'] = 'ASC';

        $result = $this->Shared_model->gets($params, $opt, $tablename);

        if ($result != NULL) {
            echo json_encode(array('success' => 'true', 'data' => $result, 'title' => 'Info', 'msg' => 'List All Cabang'));
        } else {
            echo json_encode(array('success' => 'true', 'data' => NULL, 'title' => 'Info', 'msg' => 'Tidak ada data'));
        }
    }

    //MASTER TELISA

    public function add_mstelisa() {
        $input = $this->input->post(NULL, TRUE);

        if ($input['id'] != 0) {
            $input['mt_nama'] = strtoupper($input['mt_nama']);
            $opt[] = array('field' => 'id', 'param' => 'where', 'operator' => '', 'value' => $input['id']);
            if (!$this->Shared_model->update($input, $opt, NULL, 'ms_telisa')) {
                echo json_encode(array('success' => 'false', 'data' => NULL, 'title' => 'ERROR', 'msg' => $this->catch_db_err()));
            } else {
                echo json_encode(array('success' => 'true', 'data' => NULL, 'title' => 'Info', 'msg' => 'Update Success'));
            }
        } else {
            unset($input['id']);
            $input['mt_nama'] = strtoupper($input['mt_nama']);
            if (!$this->Shared_model->insert($input, 'ms_telisa')) {
                echo json_encode(array('success' => 'false', 'data' => NULL, 'title' => 'ERROR', 'msg' => $this->catch_db_err()));
            } else {
                echo json_encode(array('success' => 'true', 'data' => NULL, 'title' => 'Info', 'msg' => 'Insert Success'));
            }
        }
    }

    public function list_mstelisa() {
        $records = $this->input->get('filter');
//        $query = $this->input->get('query');
        $params = array();

        if ($records) {
            $raw_record = json_decode($records, true);
            $params = $this->generate_db_query($raw_record);
        }

//        if ($query) {
//            if ($query != "") {
//                $params[] = array('field' => 'cabang_alias', 'param' => 'like', 'operator' => '', 'value' => $query);
//                $params[] = array('field' => 'cabang_city', 'param' => 'or_like', 'operator' => '', 'value' => $query);
//            }
//        }

        $tablename = 'ms_telisa';
        $opt['sortBy'] = 'id';
        $opt['sortDirection'] = 'ASC';

        $result = $this->Shared_model->gets($params, $opt, $tablename);

        if ($result != NULL) {
            echo json_encode(array('success' => 'true', 'data' => $result, 'title' => 'Info', 'msg' => 'List All Cabang'));
        } else {
            echo json_encode(array('success' => 'true', 'data' => NULL, 'title' => 'Info', 'msg' => 'Tidak ada data'));
        }
    }

    public function del_telisa() {
        $input = $this->input->post(NULL, TRUE);
        $params[] = array('field' => 'id', 'param' => 'where', 'operator' => '', 'value' => $input['id']);

        if ($this->Shared_model->delete($params, NULL, 'ms_telisa')) {
            echo json_encode(array('success' => 'true', 'data' => NULL, 'title' => 'Info', 'msg' => 'Delete Success'));
        } else {
            echo json_encode(array('success' => 'false', 'data' => NULL, 'title' => 'ERROR', 'msg' => $this->catch_db_err()));
        }
    }

    //GROUP KEPERLUAN

    public function list_group_keperluan() {
        $records = $this->input->get('filter');
        $query = $this->input->get('query');
        $params = array();

        if ($records) {
            $raw_record = json_decode($records, true);
            $params = $this->generate_db_query($raw_record);
        }

        if ($query) {
            if ($query != "") {
                $params[] = array('field' => 'grk_name', 'param' => 'like', 'operator' => '', 'value' => $query);
            }
        }

        $tablename = 'ms_group_keperluan';
        $opt['sortBy'] = 'id';
        $opt['sortDirection'] = 'ASC';

        $result = $this->Shared_model->gets($params, $opt, $tablename);

        if ($result != NULL) {
            echo json_encode(array('success' => 'true', 'data' => $result, 'title' => 'Info', 'msg' => 'List All Cabang'));
        } else {
            echo json_encode(array('success' => 'true', 'data' => NULL, 'title' => 'Info', 'msg' => 'Tidak ada data'));
        }
    }

    //KEPERLUAN AKUN
    public function list_detailkp() {
        $records = $this->input->get('filter');
//        $query = $this->input->get('query');
        $params = array();

        if ($records) {
            $raw_record = json_decode($records, true);
            $params = $this->generate_db_query($raw_record);
        }

//        if ($query) {
//            if ($query != "") {
//                $params[] = array('field' => 'grk_name', 'param' => 'like', 'operator' => '', 'value' => $query);
//            }
//        }

        $tablename = 'master_keperluan_akun';
        $opt['sortBy'] = 'id';
        $opt['sortDirection'] = 'ASC';

        $result = $this->Shared_model->gets($params, $opt, $tablename);

        if ($result != NULL) {
            echo json_encode(array('success' => 'true', 'data' => $result, 'title' => 'Info', 'msg' => 'List All Cabang'));
        } else {
            echo json_encode(array('success' => 'true', 'data' => NULL, 'title' => 'Info', 'msg' => 'Tidak ada data'));
        }
    }

    //SUPPLIER

    public function list_supplier() {
        $records = $this->input->get('filter');
        $query = $this->input->get('query');
        $params = array();

        $params[] = array('field' => 'ms_kodesub', 'param' => 'where', 'operator' => ' <>', 'value' => 0);
        if ($records) {
            $raw_record = json_decode($records, true);
            $params = $this->generate_db_query($raw_record);
        }

        if ($query) {
            if ($query != "") {
                $params[] = array('field' => 'ms_name', 'param' => 'like', 'operator' => '', 'value' => $query);
            }
        }

        $tablename = 'dt_supplier';
        $opt['sortBy'] = 'id';
        $opt['sortDirection'] = 'ASC';

        $result = $this->Shared_model->gets($params, $opt, $tablename);

        if ($result != NULL) {
            echo json_encode(array('success' => 'true', 'data' => $result, 'title' => 'Info', 'msg' => 'List All Cabang'));
        } else {
            echo json_encode(array('success' => 'true', 'data' => NULL, 'title' => 'Info', 'msg' => 'Tidak ada data'));
        }
    }

    public function list_supplier_email() {
        $records = $this->input->get('filter');
        $params = array();

        if ($records) {
            $raw_record = json_decode($records, true);
            $params = $this->generate_db_query($raw_record);
        }

        $tablename = 'dt_supplier';
        $opt['sortBy'] = 'id';
        $opt['sortDirection'] = 'ASC';

        $result = $this->Shared_model->gets($params, $opt, $tablename);
        $list_email = array();
        $id = 1;

        foreach ($result as $key) {
            $supp_id = $key->id;
            $email = rtrim(trim($key->ms_email, " "), ',');

            if ($email != "") {
                $row_email = explode(',', $email);

                for ($i = 0; $i < count($row_email); $i++) {
                    $list_email[] = array(
                        'id' => $id,
                        'supp_id' => $supp_id,
                        'email' => strtolower($row_email[$i]),
                        'email_name' => strtolower($row_email[$i])
                    );
                    $id++;
                }
            } else {
                $list_email[] = array(
                    'id' => $id,
                    'supp_id' => $supp_id,
                    'email' => 'Belum ada Email',
                    'email_name' => 'Belum ada Email'
                );
            }
        }

        echo json_encode(array('success' => 'true', 'data' => $list_email));
    }

    public function get_email($id) {
        $email = $this->Shared_model->get_detail('id', $id, 'dt_supplier');
        echo json_encode(array('success' => 'true', 'data' => $email->ms_email));
    }

    public function add_email() {
        $insert = $this->input->post(NULL, TRUE);

        $email = rtrim(trim($insert['list_email']), ',');

        $data = array(
            'ms_email' => $email,
        );

        $opt[] = array('field' => 'id', 'param' => 'where', 'operator' => '', 'value' => $insert['id_supp']);
        $this->Shared_model->update($data, $opt, NULL, 'dt_supplier');

        echo json_encode(array('success' => 'true', 'data' => NULL, 'msg' => 'Email Berhasil disimpan'));
    }

}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */