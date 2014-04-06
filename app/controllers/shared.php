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
        $this->Shared_model->cms_db = $this->load->database('outgoing', TRUE);
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
                $data_json = json_encode($input);

                $data = array();

                $data['jumlah'] = 1;
                if ($this->user->cabang_id == 1)
                    $data['tujuan'] = $input['mt_cabang'];
                else
                    $data['tujuan'] = 1;
                $data['id_cabang'] = $this->user->cabang_id;

                $no = $this->Shared_model->insert_outgoing($data, 'head');

                $data = array();
                $data['data'] = $data_json;
                $data['head_id '] = $no . '.' . $this->user->cabang_id;
                $data['primary_key'] = $input['id'];
                $data['table_name'] = 'ms_telisa';

                $this->Shared_model->insert_outgoing($data, 'detail');

                echo json_encode(array('success' => 'true', 'data' => NULL, 'title' => 'Info', 'msg' => 'Update Success'));
            }
        } else {
            unset($input['id']);
            $input['mt_nama'] = strtoupper($input['mt_nama']);
            $no_insert = $this->Shared_model->insert($input, 'ms_telisa');
            if (!$no_insert) {
                echo json_encode(array('success' => 'false', 'data' => NULL, 'title' => 'ERROR', 'msg' => $this->catch_db_err()));
            } else {

                $input['id'] = $no_insert . '.' . $input['mt_cabang'];
                $data_json = json_encode($input);

                $data = array();

                $data['jumlah'] = 1;
                if ($this->user->cabang_id == 1)
                    $data['tujuan'] = $input['mt_cabang'];
                else
                    $data['tujuan'] = 1;
                $data['id_cabang'] = $this->user->cabang_id;

                $no = $this->Shared_model->insert_outgoing($data, 'head');

                $data = array();
                $data['data'] = $data_json;
                $data['head_id '] = $no . '.' . $this->user->cabang_id;
                $data['primary_key'] = $no_insert . '.' . $input['mt_cabang'];
                $data['table_name'] = 'ms_telisa';

                $this->Shared_model->insert_outgoing($data, 'detail');
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
            $data2 = array();
            // $data2['id'] = $id;
            $data2['jumlah'] = 1;
            if ($this->user->cabang_id == 1)
                $data2['tujuan'] = $input['mt_cabang'];
            else
                $data2['tujuan'] = 1;
            $data2['id_cabang'] = $this->user->cabang_id;

            $no = $this->Shared_model->insert_outgoing($data2, 'head');

            $data2 = array();
            $data2['data'] = '{}';

            $data2['head_id '] = $no . '.' . $this->user->cabang_id;
            $data2['primary_key'] = $input['id'];
            $data2['table_name'] = 'ms_telisa';
            $data2['nama_column'] = 'id';
            $data2['hapus'] = 1;

            $this->Gdpengadaan_model->insert_outgoing($data2, 'detail');
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

    public function add_group_keperluan() {
        $input = $this->input->post(NULL, TRUE);

        if ($input['id'] != 0) {
            $input['grk_name'] = strtoupper($input['grk_name']);
            $opt[] = array('field' => 'id', 'param' => 'where', 'operator' => '', 'value' => $input['id']);
            if (!$this->Shared_model->update($input, $opt, NULL, 'ms_group_keperluan')) {
                echo json_encode(array('success' => 'false', 'data' => NULL, 'title' => 'ERROR', 'msg' => $this->catch_db_err()));
            } else {
                echo json_encode(array('success' => 'true', 'data' => NULL, 'title' => 'Info', 'msg' => 'Update Success'));
            }
        } else {
            unset($input['id']);
            $input['grk_name'] = strtoupper($input['grk_name']);
            if (!$this->Shared_model->insert($input, 'ms_group_keperluan')) {
                echo json_encode(array('success' => 'false', 'data' => NULL, 'title' => 'ERROR', 'msg' => $this->catch_db_err()));
            } else {
                echo json_encode(array('success' => 'true', 'data' => NULL, 'title' => 'Info', 'msg' => 'Insert Success'));
            }
        }
    }

    public function del_group_keperluan() {
        $input = $this->input->post(NULL, TRUE);

        $opt[] = array('field' => 'id', 'param' => 'where', 'operator' => '', 'value' => $input['id']);
        $this->Shared_model->delete($opt, NULL, 'ms_group_keperluan');
        $rec[] = array('field' => 'kp_id', 'param' => 'where', 'operator' => '', 'value' => $input['id']);
        $this->Shared_model->delete($rec, NULL, 'ms_keperluan_akun');
        echo json_encode(array('success' => 'true', 'msg' => 'Delete Data Success'));
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

        $tablename = 'ms_keperluan_akun';
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

    //AKUN

    public function get_groups_akun() {
        $result = $this->Shared_model->get_group_akun();

        if ($result) {
            echo json_encode(array('success' => 'true', 'data' => $result, 'message' => 'Group Listed'));
        } else {
            echo json_encode(array('success' => 'false', 'data' => $result, 'message' => 'Tidak ada data Group Akun'));
        }
    }

    public function akun_tree() {
        $is_cabang = isset($_POST['cabang']);
        $akun_list = Array();
        if ($is_cabang) {
            $cabang = $_POST['cabang'];
        } else {
            $cabang = $this->ion_auth->user()->row()->cabang_id == 0 ? 14 : $this->ion_auth->user()->row()->cabang_id;
        }
        $tablename = "list_akun";

        if ($_POST['node'] == 0) {
            $parent = '0';
            $params[] = array('field' => 'akun_parent', 'param' => 'where', 'operator' => '', 'value' => $parent);
            $options['sortBy'] = 'akun_head_status';
            $options['sortBy'] = 'id';
            $options['sortDirection'] = 'ASC';
            $result = $this->Shared_model->gets($params, $options, $tablename);

            if ($result != NULL) {
                foreach ($result as $row) {
                    $akun_dtl = $this->Shared_model->get_detail('id', $row->akun_parent, $tablename);
                    if ($akun_dtl)
                        $param1 = $akun_dtl->akun_code;
                    else
                        $param1 = NULL;
                    $format = $this->format_generate_akun($param1, $row->akun_code);

                    if ($row->akun_child_status == 0) {
                        $akun_list[] = Array(
                            'id' => $row->id,
                            'statusCabang' => 1,
                            //'lokasiCabang' => (int) $cabang,
                            'namaTabel' => $tablename,
                            'codeAkun' => $this->format_akun_titik($row->akun_code),
                            'codeAkunchild' => $row->akun_parent,
                            'codeAkunPure' => $format[1],
                            'akunCodeOld' => $this->format_akun_titik($row->akun_code),
                            'groupAkun' => $row->akun_group,
                            'namaAkun' => $row->akun_name,
                            'parentAkun' => $format[0],
                            'isBiaya' => 'T',
                            'debetKredit' => $row->akun_d_k,
                            'aktifStatus' => $row->akun_active,
                            'akunCurr' => $row->akun_curr,
                            //'isBerangkat' => $row->akun_pb_code,
                            'akunBall' => $row->akun_bal_init,
                            'akunHead' => $row->akun_head_status,
//                            'akunPosition' => $row->akun_pos_status,
                            'akunStatusTampil' => $row->akun_status_tampil,
                            'hasChild' => $row->akun_child_status = 1 ? TRUE : FALSE,
                            'leaf' => false,
                            'expanded' => true,
                            'akunDesc' => $row->akun_note,
                            'fungsiAkun' => $row->akun_fungsi,
                            'isAkunKas' => $row->akun_fungsi != 9 ? 1 : 0
                        );
                    } else {
                        $akun_list[] = Array(
                            'id' => $row->id,
                            'statusCabang' => 1,
                            //'lokasiCabang' => (int) $cabang,
                            'namaTabel' => $tablename,
                            'codeAkun' => $this->format_akun_titik($row->akun_code),
                            'codeAkunchild' => $row->akun_parent,
                            'codeAkunPure' => $format[1],
                            'akunCodeOld' => $this->format_akun_titik($row->akun_code),
                            'groupAkun' => $row->akun_group,
                            'namaAkun' => $row->akun_name,
                            'parentAkun' => $format[0],
                            'isBiaya' => 'T',
                            'debetKredit' => $row->akun_d_k,
                            'aktifStatus' => $row->akun_active,
                            'akunCurr' => $row->akun_curr,
                            //'isBerangkat' => $row->akun_pb_code,
                            'akunBall' => $row->akun_bal_init,
                            'akunHead' => $row->akun_head_status,
//                            'akunPosition' => $row->akun_pos_status,
                            'akunStatusTampil' => $row->akun_status_tampil,
                            'hasChild' => $row->akun_child_status = 1 ? TRUE : FALSE,
                            'leaf' => true,
                            'expanded' => true,
                            'akunDesc' => $row->akun_note,
                            'fungsiAkun' => $row->akun_fungsi,
                            'isAkunKas' => $row->akun_fungsi != 9 ? 1 : 0
                        );
                    }
                }
            }
        } else {
            $parent = $_POST['node'];
            $params[] = array('field' => 'akun_parent', 'param' => 'where', 'operator' => '', 'value' => $parent);
            $options['sortBy'] = 'akun_head_status';
            $options['sortBy'] = 'akun_alias';
            $options['sortDirection'] = 'ASC';
            $result = $this->Shared_model->gets($params, $options, $tablename);

            if ($result != NULL) {
                foreach ($result as $row) {
                    $akun_dtl = $this->Shared_model->get_detail('id', $row->akun_parent, $tablename);
                    if ($akun_dtl)
                        $param1 = $akun_dtl->akun_code;
                    else
                        $param1 = NULL;
                    $format = $this->format_generate_akun($param1, $row->akun_code);

                    if ($row->akun_child_status == 0) {
                        $akun_list[] = Array(
                            'id' => $row->id,
                            'statusCabang' => 1,
                            'namaTabel' => $tablename,
                            //'lokasiCabang' => (int) $cabang,
                            'codeAkun' => $this->format_akun_titik($row->akun_code),
                            'codeAkunchild' => $row->akun_parent,
                            'codeAkunPure' => $format[1],
                            'akunCodeOld' => $this->format_akun_titik($row->akun_code),
                            'groupAkun' => $row->akun_group,
                            'namaAkun' => $row->akun_name,
                            'parentAkun' => $format[0],
                            'isBiaya' => 'T',
                            'debetKredit' => $row->akun_d_k,
                            'aktifStatus' => $row->akun_active,
                            'akunCurr' => $row->akun_curr,
                            //'isBerangkat' => $row->akun_pb_code,
                            'akunBall' => $row->akun_bal_init,
                            'akunHead' => $row->akun_head_status,
//                            'akunPosition' => $row->akun_pos_status,
                            'akunStatusTampil' => $row->akun_status_tampil,
                            'hasChild' => $row->akun_child_status = 1 ? TRUE : FALSE,
                            'leaf' => false,
                            'expanded' => false,
                            'akunDesc' => $row->akun_note,
                            'fungsiAkun' => $row->akun_fungsi,
                            'isAkunKas' => $row->akun_fungsi != 9 ? 1 : 0
                        );
                    } else {
                        $akun_list[] = Array(
                            'id' => $row->id,
                            'statusCabang' => 1,
                            //'lokasiCabang' => (int) $cabang,
                            'namaTabel' => $tablename,
                            'codeAkun' => $this->format_akun_titik($row->akun_code),
                            'codeAkunchild' => $row->akun_parent,
                            'codeAkunPure' => $format[1],
                            'akunCodeOld' => $this->format_akun_titik($row->akun_code),
                            'groupAkun' => $row->akun_group,
                            'namaAkun' => $row->akun_name,
                            'parentAkun' => $format[0],
                            'isBiaya' => 'T',
                            'debetKredit' => $row->akun_d_k,
                            'aktifStatus' => $row->akun_active,
                            'akunCurr' => $row->akun_curr,
                            //'isBerangkat' => $row->akun_pb_code,
                            'akunBall' => $row->akun_bal_init,
                            'akunHead' => $row->akun_head_status,
//                            'akunPosition' => $row->akun_pos_status,
                            'akunStatusTampil' => $row->akun_status_tampil,
                            'hasChild' => $row->akun_child_status = 1 ? TRUE : FALSE,
                            'leaf' => true,
                            'expanded' => true,
                            'akunDesc' => $row->akun_note,
                            'fungsiAkun' => $row->akun_fungsi,
                            'isAkunKas' => $row->akun_fungsi != 9 ? 1 : 0
                        );
                    }
                }
            }
        }

        echo json_encode($akun_list);
    }

    function format_generate_akun($parent_code, $kode_akun) {
        //PARENT PROCESS
        $x = strlen($parent_code);
        $sisa = 11 - $x;

        if ($x > 3) {
            $st = substr($parent_code, 0, 3);
            $dot1 = str_split($st, 1);
            $pr1 = implode('.', $dot1);

            $nd = substr($parent_code, -($x - 3));
            $dot2 = str_split($nd, 2);
            $pr2 = implode('.', $dot2);

            $result1 = $pr1 . '.' . $pr2;
        } else {
            $dot1 = str_split($parent_code, 1);
            $result1 = implode('.', $dot1);
        }
        //AKUN TITIK TITIK
        $a = "0";
        $b = "";
        $akun_pure = substr($kode_akun, $x);
        $c = strlen($akun_pure);

        for ($z = $c; $z < $sisa; $z++) {
            $b .= $a;
        }

        $newKode = $akun_pure . $b;
        if ($x > 2) {
//            $second = substr($newKode, $x);
            $titik_dua = str_split($newKode, 2);
            $ch2 = implode('.', $titik_dua);

            $result2 = $ch2;
        } else {
            $first = substr($newKode, 0, $x == 1 ? 2 : 1);
            $titik_satu = str_split($first, 1);
            $ch1 = implode('.', $titik_satu);

            $second = substr($newKode, $x == 1 ? 2 : 1);
            $titik_dua = str_split($second, 2);
            $ch2 = implode('.', $titik_dua);

            $result2 = $ch1 . '.' . $ch2;
        }


        return array($result1, $result2);
        //return $newKode;
    }

    function format_akun_titik($kode_akun) {
        //AKUN TITIK TITIK
//        $a = "0";
//        $b = "";
//        $c = strlen($kode_akun);
//
//        for ($z = $c; $z < 11; $z++) {
//            $b .= $a;
//        }
//
        $newKode = $kode_akun;

        $first = substr($newKode, 0, 2);
        $titik_satu = str_split($first, 1);
        $result1 = implode('.', $titik_satu);

//        $second = substr($newKode, -8);
//        $titik_dua = str_split($second, 2);
//        $result2 = implode('.', $titik_dua);
        $second = substr($newKode, 2);
//        $titik_dua = str_split($second, 2);
//        $result2 = implode('.', $titik_dua);
        // if (strlen($newKode) > 2) {
        //     return $result1 . '.' . $second;
        // } else {
        return $kode_akun;
        // }
    }

    public function get_akun_list() {
        $records = isset($_GET['filter']);
        $query = isset($_GET['query']);
        $cabang = isset($_GET['cabang']);
        $record = array();

        if ($records) {
            $raw_record = json_decode($_GET['filter'], true);
            foreach ($raw_record as $key) {
                $field = $this->property_reader($key['property']);
                $param = $this->param_reader($key['property']);
                $op = $this->operator_reader($key['value']);
                $val = $this->property_reader($key['value']);

                $record[] = array('field' => $field, 'param' => $param, 'operator' => $op, 'value' => $val);
            }
        }

        if ($query && $_GET['query'] != "") {
            $record[] = array('field' => 'akun_name', 'param' => 'like', 'operator' => '', 'value' => $_GET['query']);
        }

        if ($cabang && $_GET['cabang'] != "") {
            $table = 'list_akun';
        } else {
            $table = 'list_akun';
        }

        $result = $this->Shared_model->get_akun($record, NULL, $table);

        if ($result) {
            echo json_encode(array('success' => 'true', 'data' => $result, 'message' => 'Daftar semua akun'));
        } else {
            echo json_encode(array('success' => 'true', 'data' => $result, 'message' => 'Tidak ada data akun'));
        }
    }

    public function get_mata_uang() {
        $result = $this->Shared_model->get_mata_uang();

        if ($result) {
            echo json_encode(array('success' => 'true', 'data' => $result, 'message' => 'Mata Uang Listed'));
        } else {
            echo json_encode(array('success' => 'false', 'data' => $result, 'message' => 'Tidak ada data Mata Uang'));
        }
    }

    function akun_add() {

        if ($this->ion_auth->user()->row()->cabang_id != 1) {
            echo json_encode(array('success' => 'false', 'data' => NULL, 'message' => 'Anda tidak mempunyai hak untuk membuat Akun', 'title' => 'Error'));
        } else {
            $data = $this->Shared_model->akun_process();
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
    }

    function akun_del() {
        $id = $this->input->post('id');
        //$table_name = $this->input->post('table_name');

        $delete = $this->Shared_model->akun_process_del($id, 'list_akun');
        if ($delete) {
            echo json_encode(array('success' => 'true', 'data' => NULL, 'message' => $delete, 'title' => 'Info'));
        } else {
            echo json_encode(array('success' => 'false', 'data' => NULL, 'message' => 'Akun sudah digunakan untuk transaksi', 'title' => 'Error'));
        }
    }

    public function upload_ttd_trx($field, $params) {
        if ($_FILES[$field]['name'] != "signNull.png") {
            echo '{success:false, message: "Upload tanda tangan sesuai yang ditentukan"}';
            return FALSE;
        }

        $config['upload_path'] = './assets/ttd_tx/';
        $config['allowed_types'] = 'png';
        $config['file_name'] = $field . $params . 'NULL.png';
        $config['max_size'] = '20';
        $config['max_width'] = '300';
        $config['max_height'] = '150';
        $config['overwrite'] = TRUE;
        $config['remove_spaces'] = TRUE;

        $this->load->library('upload', $config);

        if ($this->upload->do_upload($field)) {
            $data_apl = $this->upload->data();
            echo '{success:true, message: "Verifikasi Selesai", url: "assets/ttdtx/' . $field . $params . 'NULL' . $data_apl['file_ext'] . '"}';
        } else {
            $msg = json_encode($this->upload->display_errors('<p>', '</p>'));
            echo '{success:false, message: ' . $msg . '}';
        }
    }

    public function list_akun() {
        $records = $this->input->get('filter');
        $query = $this->input->get('query');
        $params = array();

        if ($records) {
            $raw_record = json_decode($records, true);
            $params = $this->generate_db_query($raw_record);
        }

        if ($query) {
            if ($query != "") {
                $params[] = array('field' => 'akun_name', 'param' => 'like', 'operator' => '', 'value' => $query);
            }
        }

        $tablename = 'dt_akun';
        $params[] = array('field' => 'akun_child_status', 'param' => 'where', 'operator' => '', 'value' => 1);
        $opt['sortBy'] = 'akun_code';
        $opt['sortDirection'] = 'ASC';

        $result = $this->Shared_model->gets($params, $opt, $tablename);

        if ($result != NULL) {
            echo json_encode(array('success' => 'true', 'data' => $result, 'title' => 'Info', 'msg' => 'List All Akun'));
        } else {
            echo json_encode(array('success' => 'true', 'data' => NULL, 'title' => 'Info', 'msg' => 'Tidak ada data'));
        }
    }

    public function list_akun_cabang() {
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
                $params[] = array('field' => 'akun_name', 'param' => 'like', 'operator' => '', 'value' => $query);
            }
        }

        $params[] = array('field' => 'akun_child_status', 'param' => 'where', 'operator' => '', 'value' => 1);
        $opt['sortBy'] = 'no';
        $opt['sortDirection'] = 'ASC';

        $result = $this->Shared_model->get_akun_cabang($params, $opt);

        if ($result != NULL) {
            echo json_encode(array('success' => 'true', 'data' => $result, 'title' => 'Info', 'msg' => 'List All Barang Cabang'));
        } else {
            echo json_encode(array('success' => 'true', 'data' => NULL, 'title' => 'Info', 'msg' => 'Tidak ada data'));
        }
    }

    public function list_header_akun_cabang() {
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
                $params[] = array('field' => 'akun_name', 'param' => 'like', 'operator' => '', 'value' => $query);
            }
        }

        $params[] = array('field' => 'akun_child_status', 'param' => 'where', 'operator' => '', 'value' => 0);
        $opt['sortBy'] = 'no';
        $opt['sortDirection'] = 'ASC';

        $result = $this->Shared_model->get_akun_cabang($params, $opt);

        if ($result != NULL) {
            echo json_encode(array('success' => 'true', 'data' => $result, 'title' => 'Info', 'msg' => 'List All Barang Cabang'));
        } else {
            echo json_encode(array('success' => 'true', 'data' => NULL, 'title' => 'Info', 'msg' => 'Tidak ada data'));
        }
    }

    public function copy_akun($cabang) {
        $akun_all = $this->Shared_model->gets(NULL, NULL, 'dt_akun');

        foreach ($akun_all as $value) {
            $this->Shared_model->set_akun($value->id, $cabang);
        }

        echo 'Copy Akun Success';
    }

    public function copy_item($cabang) {
        $akun_all = $this->Shared_model->gets(NULL, NULL, 'dt_item');

        foreach ($akun_all as $value) {
            $this->Shared_model->set_item($value->id, $cabang);
        }

        echo 'Copy Akun Success';
    }

    public function kemasan_all() {
        $records = isset($_GET['filter']);
        $query = isset($_GET['query']);
        $record = array();

        if ($records) {
            $raw_record = json_decode($_GET['filter'], true);
            foreach ($raw_record as $key) {
                $field = $this->property_reader($key['property']);
                $param = $this->param_reader($key['property']);
                $op = $this->operator_reader($key['value']);
                $val = $this->property_reader($key['value']);

                $record[] = array('field' => $field, 'param' => $param, 'operator' => $op, 'value' => $val);
            }
        }

        if ($query && $_GET['query'] != "") {
            $record[] = array('field' => 'id', 'param' => 'where', 'operator' => '', 'value' => $_GET['query']);
        }

        $opt['sortBy'] = 'msi_satkecil';
        $opt['sortDirection'] = 'ASC';
        $data_dokter = $this->Dmodel->gets($record, $opt, 'item_kemasan');
        $list_dokter = array();

        if ($data_dokter != NULL) {
            foreach ($data_dokter as $key) {
                $list_dokter[] = array(
                    'id' => $key->id,
                    'msi_idbarang' => $key->msi_idbarang,
                    'msi_satbesar' => $key->msi_satbesar,
                    'nama_satbesar' => $key->msi_satbesar != 0 ? $this->Dmodel->get_detail('id', $key->msi_satbesar, 'master_satuan')->sat_name : '',
                    'msi_konversi' => $key->msi_konversi,
                    'msi_satkecil' => $key->msi_satkecil,
                    'nama_satkecil' => '',
                    'is_active' => $key->is_active,
                );
            }
        }
        echo json_encode(array('success' => 'true', 'data' => $list_dokter, 'message' => 'Daftar semua Pengeluaran Inventaris'));
    }

}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */