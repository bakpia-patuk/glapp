<?php

defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Description of data_model
 *
 * @author Coepoe
 */
class Bkrencanaagr_model extends MY_Model {

    function __construct() {
        parent::__construct();
    }

    function ma_process($insert) {
        $last_no = $this->get_last('trx_agrplan');
        $user = $this->ion_auth->user()->row();
        $cara_bayar = $insert['trx_carabayar'];

        // FIX
        $general_ma = array(
            'id' => $last_no . '.' . $user->cabang_id,
            'tgl_trx' => mdate('%Y-%m-%d %H:%i:%s', time()),
            'trx_cabangid' => $user->cabang_id,
            'trx_type' => 2,
            'trx_typeref' => $last_no . '.' . $user->cabang_id,
            'trx_nilai' => $this->standard_money($insert['trx_nilai']),
            'trx_carabayar' => $cara_bayar,
            'trx_no' => $cara_bayar != 2 ? $insert['trx_no'] : 0,
            'trx_bged' => $cara_bayar == 1 ? $insert['trx_bged'] : 0,
            'trx_trfbank' => $cara_bayar == 3 ? $insert['trx_trfbank'] : 0,
            'trx_trfnama' => $cara_bayar == 3 ? $insert['trx_trfnama'] : 0,
            'app_status' => 0,
            'ma_status' => 1
        );


        if ($insert['id'] == 0) {
            $id = $this->insert($general_ma, 'trx_agrplan');
            if (!$id) {
                return FALSE;
            }

            $insert['id'] = $last_no . '.' . $user->cabang_id;
        } else {
            $unset = array($general_ma['app_status'], $general_ma['ma_status']);
            unset($unset);
            $upd[] = array('field' => 'id', 'param' => 'where', 'operator' => '', 'value' => $insert['id']);
            if (!$this->update($general_ma, $upd, NULL, 'trx_agrplan')) {
                return FALSE;
            }
        }

        if (!$this->__insert_detail_ma($insert, $user)) {
            return FALSE;
        }

        $data_ret = array(
            'tgl_dari' => $insert['agrplan_from'],
            'tgl_ke' => $insert['agrplan_to'],
            'divisi' => $insert['agrplan_divisi']
        );

        return $data_ret;
    }

    private function __insert_detail_ma($insert, $user) {
        $last_no = $this->get_last('trx_agrplan_detail');

        if ($insert['agrplan_kprdetail'] == 877) {
            $is_rujukan = 1;
            $mkr_namapasien = $insert['agrplan_periksa'];
            $mkr_pemeriksaan = $insert['agrplan_pasien'];
            $mkr_rujukanke = $insert['agrplan_rujuk'];
        } else {
            $is_rujukan = 0;
            $mkr_namapasien = 0;
            $mkr_pemeriksaan = 0;
            $mkr_rujukanke = 0;
        }

        if ($insert['agrplan_kprdetail'] == 980 || $insert['agrplan_kprdetail'] == 981 || $insert['agrplan_kprdetail'] == 982) {
            $is_telisa = 1;
            $telisa_id = $insert['agrplan_idtelisa'];
        } else {
            $is_telisa = 0;
            $telisa_id = 0;
        }

        $general_mad = array(
            'id' => $last_no . '.' . $user->cabang_id,
            'agrplan_id' => $insert['id'],
            'agrplan_from' => mdate('%Y-%m-%d', strtotime($insert['agrplan_from'])),
            'agrplan_to' => mdate('%Y-%m-%d', strtotime($insert['agrplan_to'])),
            'agrplan_created' => $user->id,
            'agrplan_divisi' => $insert['agrplan_divisi'],
            'agrplan_kpr' => $insert['agrplan_kpr'],
            'agrplan_kprdetail' => $insert['agrplan_kprdetail'],
            'agrplan_desc' => $insert['agrplan_desc'],
            'agrplan_istelisa' => $is_telisa,
            'agrplan_idtelisa' => $telisa_id,
            'agrplan_isrujukan' => $is_rujukan,
            'agrplan_periksa' => $mkr_namapasien,
            'agrplan_pasien' => $mkr_pemeriksaan,
            'agrplan_rujuk' => $mkr_rujukanke,
            'simpan_status' => 1
        );
        if ($this->get_detail('agrplan_id', $general_mad['agrplan_id'], 'trx_agrplan_detail') == NULL) {
            $this->insert($general_mad, 'trx_agrplan_detail');
        } else {
            $upd[] = array('field' => 'agrplan_id', 'param' => 'where', 'operator' => '', 'value' => $insert['agrplan_id']);
            if (!$this->update($general_mad, $upd, NULL, 'trx_agrplan')) {
                return FALSE;
            }
        }
        return TRUE;
    }

    public function get_last($table) {
        $opt['sortBy'] = 'no';
        $opt['sortDirection'] = 'DESC';

        $result = $this->get(NULL, $opt, $table);
        if ($result != NULL) {
            return $result->no + 1;
        } else {
            return 1;
        }
    }

    public function add_to_kpakun($id_akun, $id_keperluan, $id_form) {
        $opt[] = array('field' => 'kp_id', 'param' => 'where', 'operator' => '', 'value' => $id_keperluan);
        $opt[] = array('field' => 'akun_header', 'param' => 'where', 'operator' => '', 'value' => $id_akun);
        $exsist = $this->gets($opt, NULL, 'ms_keperluan_akun');

        if ($exsist == NULL) {
            $data = array(
                'kp_id' => $id_keperluan,
                'form_id' => $id_form,
                'akun_header' => $id_akun
            );

            $this->insert($data, 'ms_keperluan_akun');
        }
        return TRUE;
    }

    //TREE BEGIN
    //CABANG ALL

    public function list_cabang() {
        $cabang_result = $this->gets(NULL, NULL, 'dt_cabang');
        $data = array();

        foreach ($cabang_result as $row) {
            $data[] = array(
                'id' => $row->id,
                'id_trx' => '',
                'name' => $row->cabang_alias,
                'keterangan' => '',
                'jadwal_bayar' => '',
                'no_rekbg' => '',
                'bg_ed' => '',
                'ma_value' => '',
                'app_status' => '',
                'test' => true,
                'leaf' => false,
                'expanded' => false
            );
        }

        return $data;
    }

    public function type_bayar($node, $test) {
        $type[] = array('type' => 1, 'nama' => "BG", 'id' => 1);
        $type[] = array('type' => 2, 'nama' => "TUNAI", 'id' => 2);
        $type[] = array('type' => 3, 'nama' => "TRANSFER", 'id' => 3);
        $data = array();

        foreach ($type as $row) {
            $data[] = array(
                'id' => $node . '.' . $row['id'],
                'id_trx' => '',
                'name' => $row['nama'],
                'keterangan' => '',
                'jadwal_bayar' => '',
                'no_rekbg' => '',
                'bg_ed' => '',
                'ma_value' => '',
                'app_status' => '',
                'test' => $test,
                'leaf' => false,
                'expanded' => false
            );
        }

        return $data;
    }

    public function list_ma_non($id, $test) {
        $data = explode('.', $id);
        $type_bayar = $data[1];
        $cabang = $data[0];
        $data_return = array();
        $rec[] = array('field' => 'trx_cabangid', 'param' => 'where', 'operator' => '', 'value' => $cabang);
        $rec[] = array('field' => 'trx_carabayar', 'param' => 'where', 'operator' => '', 'value' => $type_bayar);
        $rec[] = array('field' => 'app_status', 'param' => 'where', 'operator' => '', 'value' => 0);
        $opt['sortBy'] = 'trx_agrplan_detail.agrplan_divisi';
        $opt['sortDirection'] = 'ASC';
        $result = $this->__manon_all($rec, $opt);

        if ($result != NULL) {
            foreach ($result as $row) {
                $keperluan = $this->get_detail('id', $row->agrplan_kpr, 'ms_group_keperluan')->grk_name;
                $dt_perlu = $this->get_detail('id', $row->agrplan_kprdetail, 'dt_akun')->akun_name;

                $data_return[] = array(
                    'id' => $row->id . '.' . $id,
                    'id_trx' => $row->id,
                    'name' => 'DIVISI ' . $this->get_detail('id', $row->agrplan_divisi, 'dt_divisi')->divisi_name,
                    'keterangan' => $keperluan . ', untuk ' . $dt_perlu . ' Ket. Tambahan : ' . $row->agrplan_desc,
                    'jadwal_bayar' => mdate("%d/%M/%Y", strtotime($row->agrplan_from)) . ' s/d ' . mdate("%d/%M/%Y", strtotime($row->agrplan_to)),
                    'no_rekbg' => $row->trx_carabayar != 2 ? $row->trx_no : '-',
                    'bg_ed' => $row->trx_carabayar == 1 ? mdate("%d/%M/%Y", strtotime($row->trx_bged)) : '-',
                    'ma_value' => $row->trx_nilai,
                    'app_status' => $row->app_status,
                    'test' => $test,
                    'leaf' => true,
                    'expanded' => false
                );
            }
        } else {
            $data_return[] = $this->tree_false($id, $test);
        }
        return $data_return;
    }

    private function __manon_all($params, $options) {
        $this->db->select('trx_agrplan.no AS no, trx_agrplan.id AS id, agrplan_divisi, app_status, trx_nilai, trx_carabayar, trx_bged, trx_no,'
                . 'agrplan_from, agrplan_to, agrplan_desc, agrplan_kpr, agrplan_kprdetail');
        $this->db->from('trx_agrplan');
        $this->db->join('trx_agrplan_detail', 'trx_agrplan_detail.agrplan_id = trx_agrplan.id');
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

    public function tree_false($id, $test) {
        $data = array(
            'id' => $id . '01X',
            'id_trx' => '',
            'name' => 'TIDAK ADA DATA',
            'keterangan' => '',
            'jadwal_bayar' => '',
            'no_rekbg' => '',
            'bg_ed' => '',
            'ma_value' => '',
            'app_status' => '',
            'test' => $test,
            'leaf' => true,
            'expanded' => false
        );

        return $data;
    }

}
