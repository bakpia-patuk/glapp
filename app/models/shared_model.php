<?php

defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Description of data_model
 *
 * @author Azelia
 */
class Shared_model extends MY_Model {

    function __construct() {
        parent::__construct();
        $this->load->dbforge();
    }

    public function get_barang_cabang($params, $options) {
        $result = $this->__barang_cabang($params, $options);
        $rtrn = array();

        if ($result != NULL) {
            foreach ($result as $row) {
                $rtrn[] = array(
                    'no' => $row->no,
                    'id' => $row->id,
                    'id_barang' => $row->mi_id,
                    'mi_name' => $row->mi_name,
                    'stock_last' => $row->stock_last,
                    'stock_min' => $row->stock_min,
                    'stock_max' => $row->stock_max,
                    'mi_parent_id' => $row->mi_parent_id,
                    'mi_parent_name' => $this->get_parent_id($row->mi_parent_id),
                    'mi_merk' => $row->mi_merk,
                    'mi_merk_name' => $row->mi_merk != 0 ? $this->get_detail('id', $row->mi_merk, 'dt_merk')->merk_name : "",
                    'mi_item_price' => $row->mi_item_price,
                    'mi_barcode' => $row->mi_barcode,
                    'mi_inv_stat' => $row->mi_inv_stat,
                    'mi_katalog' => $row->mi_katalog,
                    'mi_diskon' => $row->mi_diskon,
                    'mi_ppn' => $row->mi_ppn,
                    'mi_hpp' => $row->mi_hpp
                );
            }
        }
        
        return $rtrn;
    }

    private function __barang_cabang($params, $options) {
        $this->db->select('no, dt_item_cabang.id AS id, mi_id, stock_last, stock_min, stock_max, mi_name, mi_parent_id, mi_merk,'
                . ' mi_barcode, mi_inv_stat, mi_katalog, mi_diskon, mi_ppn, mi_hpp, mi_item_price');
        $this->db->from('dt_item_cabang');
        $this->db->join('dt_item', 'dt_item_cabang.mi_id = dt_item.id');
        if ($params != NULL) {
            foreach ($params as $data) {
                $this->db->$data['param']($data['field'] . $data['operator'], $data['value']);
            }
        }
        // If limit / offset are declared (usually for pagination) then we need to take them into account
        if (isset($options['limit']) && isset($options['offset'])) {
            $this->db->limit($options['limit'], $options['offset']);
        } else if (isset($options['limit'])) {
            $this->db->limit($options['limit']);
        }

        // sort
        if (isset($options['sortBy'])) {
            $this->db->order_by($options['sortBy'], $options['sortDirection']);
        }

        // group
        if (isset($options['groupBy'])) {
            $this->db->group_by($options['groupBy']);
        }

        $query = $this->db->get();

        if ($query->num_rows() > 0) {
            return $query->result();
        } else {
            return false;
        }
    }
    
    public function get_parent_id($param) {
        $params[] = array('field' => 'id', 'param' => 'where', 'operator' => '', 'value' => $param);
        $result = $this->get($params, NULL, 'dt_item');
        
        if($result != NULL) {
            return $result->mi_name;
        } else {
            return "TIDAK ADA GOLONGAN";
        }
    }

    public function barang_add($input) {
        
    }

    public function barang_edit($input) {
        
    }

    //AKUN
    public function get_group_akun() {
        $tablename = 'group_akun';
        $list_group_akun = array();
        $results = $this->gets($params = NULL, NULL, $tablename);

        if ($results != NULL) {
            foreach ($results as $row) {
                $list_group_akun[] = array(
                    'id' => $row->id,
                    'kodeGroupAkun' => $row->group_akun_kode,
                    'kodeGroupOld' => $row->group_akun_kode,
                    'namaGroupAkun' => $row->group_akun_nama,
                    'groupDesc' => $row->group_akun_desc,
                    'active' => $row->group_akun_active,
                );
            }
            return $list_group_akun;
        } else {
            return FALSE;
        }
    }
    public function get_akun($record, $options, $tablename) {
        $cabang = $this->ion_auth->user()->row()->cabang_id;
        $listakun = array();
        $results = $this->gets($record, $options, $tablename);

        if ($results != NULL) {
            foreach ($results as $row) {
                $item_dtl = $this->get_detail($param = 'id', $row->akun_curr, 'mata_uang');

                $listakun[] = array(
                    'id' => $row->id,
                    'codeAkun' => $this->format_akun_titik($row->akun_code),
                    'codeAkunPure' => $row->akun_code,
                    'codeAkunRender' => $this->format_akun_titik($row->akun_code) . ' ; ' . $row->akun_name,
                    'groupAkun' => $row->akun_group,
                    'namaAkun' => $row->akun_name,
                    'parentAkun' => $row->akun_parent,
                    'isBiaya' => $row->akun_biaya = "T" ? FALSE : TRUE,
                    'debetKredit' => $row->akun_d_k,
                    'aktifStatus' => $row->akun_active,
                    'akunCurr' => $row->akun_curr,
                    'symbol' => $item_dtl->mu_symbol,
                    //'groupBerangkat' => $row->akun_tujuan,
                    'akunBall' => $row->akun_bal_init,
                    'akunHead' => $row->akun_head_status,
                    'akunPosition' => $row->akun_pos_status,
                    'akunStatusTampil' => $row->akun_status_tampil,
                    'hasChild' => $row->akun_child_status = 1 ? TRUE : FALSE,
                    'akunFungsi' => $row->akun_fungsi
                );
            }
            return $listakun;
        } else {
            return FALSE;
        }
    }
    function format_akun_titik($kode_akun) {
        //AKUN TITIK TITIK
        $a = "0";
        $b = "";
        $c = strlen($kode_akun);

        for ($z = $c; $z < 11; $z++) {
            $b .= $a;
        }

        $newKode = $kode_akun . $b;

        $first = substr($newKode, 0, 3);
        $titik_satu = str_split($first, 1);
        $result1 = implode('.', $titik_satu);

        $second = substr($newKode, -8);
        $titik_dua = str_split($second, 2);
        $result2 = implode('.', $titik_dua);

        return $result1 . '.' . $result2;
        //return $newKode;
    }
    public function get_mata_uang() {
        $tablename = 'mata_uang';
        $list_mu = array();
        $results = $this->gets($params = NULL, NULL, $tablename);

        if ($results != NULL) {
            foreach ($results as $row) {
                $list_mu[] = array(
                    'id' => $row->id,
                    'nama_mu' => $row->mu_nama,
                    'symbol_mu' => $row->mu_symbol,
                    'keterangan' => $row->mu_desc,
                    'data' => 'mt_uang',
                    'status' => $row->set_default,
                    'kurs' => $row->kurs
                );
            }
            return $list_mu;
        } else {
            return FALSE;
        }
    }

    public function akun_process() {
        $data = $this->input->post(NULL, TRUE);
        $data_akun = $this->create_akun_array($data);
        if($data['codeAkunchild']==0){
            return 'jurnal_group';
        }
        $param_return="";
        if ($data['id'] == '') {
            if ($data['statusCabang'] == 0) {
                if ($this->process_akun_cabang($data, $data_akun)) {
                    $param_return = 'Add data successfull';
                } else {
                    $param_return = FALSE;
                }
            } else {
                
                    $last_item=0;
                    $tablename = 'list_akun';
                    $opt_parent = array();
                    $opt_parent[] = array('field' => 'id', 'param' => 'where', 'operator' => '', 'value' => $data['codeAkunchild']);
                    if ($this->update(array('akun_child_status' => 0), $opt_parent, NULL, $tablename)) {
    //=====START OF AKUN_TUJUAN IF USING IT=====//
    //                    if ($this->check_akun_tujuan() != NULL) {
    //                        $data_akun = array_merge($data_akun, $this->check_akun_tujuan());
    //                    }
    //=====END OF AKUN_TUJUAN=====//
                        $custom_akun = $this->check_akun_custom($data);
                        if ($custom_akun != NULL) {
                            $data_akun = array_merge($data_akun, $custom_akun);
                        }
                        $kode_akun_parent = $this->get_detail('id', $data['codeAkunchild'], $tablename)->akun_code;
                        $opts = array();
                        $opts[] = array('field' => 'akun_code', 'param' => 'where', 'operator' => ' !=', 'value' => 0);
                        $opts[] = array('field' => 'akun_parent', 'param' => 'where', 'operator' => '', 'value' => $data['codeAkunchild']);
                        $optx = array();
                        $optx['limit'] = 1;
                        $optx['sortBy'] = 'akun_alias';
                        $optx['sortDirection'] = 'DESC';
                        $last_item = $this->get($opts, $optx, $tablename);
                        if($last_item){
                            $akun_alias = $last_item->akun_alias+1;
                        }
                        else
                            $akun_alias = 1;
                        if(count(explode('.', $kode_akun_parent))>=3){
                            if($akun_alias<10)
                                $akun_alias='0'.$akun_alias;
                        }
                        $data_akun['akun_code']=$kode_akun_parent.'.'.$akun_alias;
                        $data_akun['akun_alias']=$akun_alias;
                        //var_dump($data_akun['akun_code']);
                        $id = $this->insert($data_akun, $tablename);
                        if ($id != NULL) {
                            if ($this->check_akun_custom($data) != NULL) {
                                if ($this->set_akun_custom($id)) {
                                    $param_return = 'Add data successfull';
                                } else {
                                    $param_return = FALSE;
                                }
                            } else {
                                $param_return = 'Add data successfull';
                            }
                        } else {
                            $param_return = FALSE;
                        }
                    } else {
                        $param_return = FALSE;
                    }
                
                
            }
        } else {

            
                
                $id = NULL; 
                $tablename = 'list_akun_' . $i;
                $opt_has_child = array();
                $opt_has_child[] = array('field' => 'akun_parent', 'param' => 'where', 'operator' => '', 'value' => $id);
                $is_get_child = $this->gets($opt_has_child, NULL, $tablename);
                $id = $data['id'];

                if ($data['akunHead'] == 1 && $is_get_child != NULL) {
                    $param_return = 'headChild';
                } else {
                    $opt_parent = array();
                    $opt_parent[] = array('field' => 'id', 'param' => 'where', 'operator' => '', 'value' => $data['codeAkunchild']);
                    if ($this->update(array('akun_child_status' => 0), $opt_parent, NULL, $tablename)) {
    //=====START OF AKUN_TUJUAN IF USING IT=====//
    //                    if ($this->check_akun_tujuan() != NULL) {
    //                        $data_akun = array_merge($data_akun, $this->check_akun_tujuan());
    //                    }
    //=====END OF AKUN_TUJUAN=====//
                        $custom_akun = $this->check_akun_custom($data);

                        if ($custom_akun != NULL) {
                            $data_akun = array_merge($data_akun, $custom_akun);
                        }

                        $akun_parent_old = $this->get_detail('id', $data['id'], $tablename)->akun_parent;

                        $kode_akun_parent = $this->get_detail('id', $data['codeAkunchild'], $tablename)->akun_code;
                        $opts = array();
                        $opts[] = array('field' => 'akun_code', 'param' => 'where', 'operator' => ' !=', 'value' => 0);
                        $opts[] = array('field' => 'akun_parent', 'param' => 'where', 'operator' => '', 'value' => $data['codeAkunchild']);
                        $optx = array();
                        $optx['limit'] = 1;
                        $optx['sortBy'] = 'akun_alias';
                        $optx['sortDirection'] = 'DESC';
                        $last_item = $this->get($opts, $optx, $tablename);
                        $akun_alias = $last_item->akun_alias+1;
                        if(count(explode('.', $kode_akun_parent))>=3){
                            if($akun_alias<10)
                                $akun_alias='0'.$akun_alias;
                        }
                        if($akun_parent_old!=$data['codeAkunchild']){
                            $data_akun['akun_code']=$kode_akun_parent.'.'.$akun_alias;
                            $data_akun['akun_alias']=$akun_alias;
                        }
                        else{
                            unset($data_akun['akun_code']);
                            unset($data_akun['akun_alias']);
                        }
                        $opt_upd = array();
                        $opt_upd[] = array('field' => 'id', 'param' => 'where', 'operator' => '', 'value' => $id);
                        if ($this->update($data_akun, $opt_upd, NULL, $tablename)) {
                            if($akun_parent_old!=$data['codeAkunchild'])
                                $this->replace_akun_child_old($akun_parent_old, $tablename);
                            if ($this->check_akun_custom($data) != NULL) {
                                if ($this->set_akun_custom($id)) {
                                    $param_return = 'Add data successfull';
                                } else {
                                    $param_return = FALSE;
                                }
                            } else {
                                if ($data['akunHead'] == 0) {
                                    if($akun_parent_old!=$data['codeAkunchild']){
                                        if ($this->replace_akun_child($id, $tablename)) {
                                            $param_return = 'Update data successfull';
                                        }
                                    }
                                    else{
                                        $param_return = 'Update data successfull';
                                    }
                                    
                                } else {
                                    $param_return = 'Update data successfull';
                                }
                            }
                        } else {
                            $param_return = FALSE;
                        }
                    } else {
                        $param_return = FALSE;
                    }
                
            }
                
        }
        return $param_return;
    }
    function create_akun_array($data) {
        if(isset($data['isAkunKas']))
            if($data['isAkunKas']==0)
                $isAkunKas = 9;
            else
                $isAkunKas = $data['fungsiAkun'];
        else
            $isAkunKas = 9;

        $data_akun = array(
            //'akun_code' => rtrim(str_replace(".", "", $data['parentAkun'] . $data['codeAkunPure']), '0'), //acc code
            'akun_name' => $data['namaAkun'], //acc name
            'akun_parent' => $data['codeAkunchild'], //parent acc
            'akun_child_status' => $data['akunHead'] == 0 ? 0 : 1, // if 0 header else child
            'akun_d_k' => $data['debetKredit'], // acc is credit or debet
            'akun_active' => $data['aktifStatus'], // is acc active
            'akun_curr' => $data['akunCurr'] == NULL ? 1 : $data['akunCurr'], // acc currency
            //'akun_bal_init' => $data['akunBall'] == NULL ? 0 : $this->money_formatter($data['akunBall']), // acc ball init 0 if id == NULL
            'akun_head_status' => $data['akunHead'], // is header
            'akun_pos_status' => 99, //set default 99 because different table for branch
            'akun_group' => $data['groupAkun'], // acc group
            'akun_status_tampil' => $data['akunStatusTampil'], //is acc show in GL
            'akun_note' => $data['akunDesc'], //acc Description
            'akun_fungsi' => $isAkunKas //acc function is bank, cash or general
        );

        return $data_akun;
    }
    function process_akun_cabang($opt, $data) {
        
            $akun_alias=0;
            $tablename = 'list_akun';
            $kode_akun_parent = $this->get_detail('id', $data['akun_parent'], $tablename)->akun_code;
            $opts1=array();
            $opts1[] = array('field' => 'akun_code', 'param' => 'where', 'operator' => ' !=', 'value' => 0);
            $opts1[] = array('field' => 'akun_parent', 'param' => 'where', 'operator' => '', 'value' => $data['akun_parent']);
            $optx=array();
            $optx['limit'] = 1;
            $optx['sortBy'] = 'akun_alias';
            $optx['sortDirection'] = 'DESC';
            $last_item = $this->get($opts1, $optx, $tablename);
            
            if($last_item ){
                $akun_alias = $last_item->akun_alias + 1;

            }
                
            else{
                $akun_alias = 1;
            }
                
            

            if(count(explode('.', $kode_akun_parent))>=3){
                    if($akun_alias<10)
                        $akun_alias='0'.$akun_alias;
            }
            $data['akun_code']=$kode_akun_parent.'.'.$akun_alias;
            $data['akun_alias']=$akun_alias;
            $opt_parent=NULL;
            $opt_parent[] = array('field' => 'id', 'param' => 'where', 'operator' => '', 'value' => $opt['codeAkunchild']);
            $this->update(array('akun_child_status' => 0), $opt_parent, NULL, $tablename);
            $this->insert($data, $tablename);
        
        return TRUE;
    }
    function check_akun_custom($params) {
        $data = array();
//        $opt[] = array('field' => 'akun_id', 'param' => 'where', 'operator' => '', 'value' => 0);
//        $cheking = $this->gets($opt, NULL, 'akun_custom_field_' . $params['lokasiCabang']);
//
//        if ($cheking != NULL) {
//            $data = array(
//                'akun_custom' => 1
//            );
//        }
//
        return $data;
    }
    function replace_akun_child_old($id, $tablename) {
        $opt[] = array('field' => 'akun_parent', 'param' => 'where', 'operator' => '', 'value' => $id);
        $data = $this->gets($opt, NULL, $tablename);
        $parent_detail = $this->get_detail('id', $id, $tablename);

        foreach ($data as $row) {
            $this->reset_akun_kode_old($row->id, $tablename);
        }

        foreach ($data as $val) {
            $this->generate_kode_akun_old($parent_detail, $val->id, $val->akun_child_status, $tablename);
        }

        return TRUE;
    }

    function replace_akun_child($id, $tablename) {
        $opt[] = array('field' => 'akun_parent', 'param' => 'where', 'operator' => '', 'value' => $id);
        $data = $this->gets($opt, NULL, $tablename);
        $parent_detail = $this->get_detail('id', $id, $tablename);

        foreach ($data as $row) {
            $this->reset_akun_kode($row->id, $tablename);
        }

        foreach ($data as $val) {
            $this->generate_kode_akun($parent_detail, $val->id, $val->akun_child_status, $tablename);
        }

        return TRUE;
    }
}
