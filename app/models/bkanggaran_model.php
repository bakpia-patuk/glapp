<?php

defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Description of data_model
 *
 * @author Coepoe
 */
class Bkanggaran_model extends MY_Model {

    function __construct() {
        parent::__construct();
    }

    public function get_bg_faktur($cabang, $type) {
        $this->db->select("*");
        $this->db->from("trx_faktur_bayar TFB");
        $this->db->join("trx_faktur TF", "TF.id = TFB.faktur_id");
        $this->db->where("TF.faktur_cabang", $cabang);
        $this->db->where("TF.faktur_bayar", $type);
        $this->db->where("TFB.faktur_byrrealisasi", 0);
        $this->db->group_by("TFB.faktur_bayarno");
        $query = $this->db->get();

        if ($query->num_rows() == 0) {
            return false;
        }

        return $query->result();
    }

    function get_divisi($id) {
        switch ($id) {
            case 0:
                return "PELAYANAN";
                break;
            case 1:
                return "MARKETING";
                break;
            case 2:
                return "KEUANGAN";
                break;
            case 3:
                return "LAB";
                break;
            case 4:
                return "SDM";
                break;
            case 5:
                return "IT";
                break;
            case 6:
                return "RUMAH TANGGA";
                break;
        }
    }

    function anggaran_process($insert) {
        $trx_jenisbayar = $this->input->post('trx_jenisbayar');
        $trx_supp_id = $this->input->post('trx_supp_id');
        $trx_agrdata = $this->input->post('trx_agrdata');
        $divisi = $this->input->post('divisi');
        $supplier = $this->input->post('supplier');
        $trx_totalagr = $this->money_formatter($this->input->post('trx_totalagr'));
        $trx_tgldebet = $this->input->post('trx_tgldebet');
        $trx_kreditketype = $this->input->post('trx_kreditketype');
        $rek_pusat = $this->input->post('rek_pusat');
        $rek_supp = $this->input->post('rek_supp');
        $id_rek_supp = $this->input->post('rekSuppId');
        $rek_no = $this->input->post('rekNo');
        $bank_debet_ke = $this->input->post('bank_debet_ke');
        $bank_debet_dari = $this->input->post('bank_debet_dari');
        $supp1_tgltrf = $this->input->post('tglTransfer');
        $supp1_asaltrf = $this->input->post('bankTrfAsal');

        $data_anggaran = array(
            'trx_tgl' => mdate('%Y-%m-%d %H:%i:%s', now()),
            'trx_ref' => "",
            'trx_jenissupp' => $supplier != "" ? 0 : 1,
            'trx_supp_id' => $supplier != "" ? $trx_supp_id : $divisi,
            'trx_jenisbayar' => $trx_jenisbayar,
            'trx_agrdata' => $trx_agrdata,
            'trx_totalagr' => $trx_totalagr,
            'trx_tgldebet' => $trx_jenisbayar != 4 ? $trx_tgldebet : $supp1_tgltrf,
            'trx_debetdari' => $trx_jenisbayar != 4 ? $bank_debet_dari : $supp1_asaltrf,
            'trx_kreditketype' => $trx_kreditketype,
            'trx_kreditke' => $trx_jenisbayar == 0 || $trx_jenisbayar == 1 ? $bank_debet_ke : ($trx_kreditketype == 0 ? $rek_pusat : $rek_supp)
        );

        $id = $this->insert($data_anggaran, 'trx_anggaran');

        $invoiceNo = sprintf('%06d', $id);
        $invoiceNo = 'DA-' . $invoiceNo;

        $opt[] = array('field' => 'id', 'param' => 'where', 'operator' => '', 'value' => $id);

        $data_ref = array(
            'trx_ref' => $invoiceNo
        );

        if (!$this->update($data_ref, $opt, NULL, 'trx_anggaran')) {
            return false;
        }

        ////UPDATE FAKTUR/MINTA ANGGARAN DATA UNTUK DATA SELAIN TRANSFER

        if ($supplier != "") {
            if ($trx_jenisbayar == 2) {
                $no_faktur = explode(';', $trx_agrdata);
                for ($i = 0; $i < count($no_faktur) - 1; $i++) {
                    $status_faktur = array(
                        'faktur_agrstat' => 1,
                        'faktur_agrid' => $id
                    );

                    $no_faktur_i = $this->get_detail('id', $no_faktur[$i], 'trx_agrplan')->trx_typeref;

                    $opts[$i][] = array('field' => 'id', 'param' => 'where', 'operator' => '', 'value' => $no_faktur_i);
                    if (!$this->update($status_faktur, $opts[$i], NULL, 'trx_faktur')) {
                        return false;
                    }
                }
            } else if ($trx_jenisbayar == 1) {
                $no_bg = explode(';', rtrim($trx_agrdata, ';'));
                for ($j = 0; $j < count($no_bg); $j++) {
                    $realisasi = $this->get_detail('id', $no_bg[$j], 'trx_agrplan');
                    $status_bg = array(
                        'faktur_byrrealisasi' => $realisasi->trx_nilai,
                        'faktur_byragr' => $id
                    );

                    $no_faktur_j = $realisasi->trx_typeref;

                    $opts[$j][] = array('field' => 'faktur_id', 'param' => 'where', 'operator' => '', 'value' => $no_faktur_j);
                    if (!$this->update($status_bg, $opts[$j], NULL, 'trx_faktur_bayar')) {
                        return false;
                    }

                    $status_faktur = array(
                        'faktur_agrstat' => 1,
                        'faktur_agrid' => $id
                    );

                    $optn[$j][] = array('field' => 'id', 'param' => 'where', 'operator' => '', 'value' => $no_faktur_j);
                    if (!$this->update($status_faktur, $optn[$j], NULL, 'trx_faktur')) {
                        return false;
                    }
                }
            } else if ($trx_jenisbayar == 4) {
                $no_faktur = explode(';', $trx_agrdata);
                for ($s = 0; $s < count($no_faktur) - 1; $s++) {
                    $status_faktur = array(
                        'faktur_agrid' => $id
                    );
                    $no_faktur_s = $this->get_detail('id', $no_faktur[$s], 'trx_agrplan')->trx_typeref;

                    $optk[$s][] = array('field' => 'id', 'param' => 'where', 'operator' => '', 'value' => $no_faktur_s);
                    if (!$this->update($status_faktur, $optk[$s], NULL, 'trx_faktur')) {
                        return false;
                    }
                }
            } else {
                $no_faktur = explode(';', $trx_agrdata);
                for ($z = 0; $z < count($no_faktur) - 1; $z++) {
                    $status_faktur = array(
                        'faktur_agrstat' => 1
                    );

                    $no_faktur_z = $this->get_detail('id', $no_faktur[$z], 'trx_agrplan')->trx_typeref;
                    $optc[$z][] = array('field' => 'id', 'param' => 'where', 'operator' => '', 'value' => $no_faktur_z);
                    if (!$this->update($status_faktur, $optc[$z], NULL, 'trx_faktur')) {
                        return false;
                    }
                }
            }
            // var_dump($divisi);
        }

        $rcn_agr = explode(';', rtrim($trx_agrdata, ';'));
        for ($k = 0; $k < count($rcn_agr); $k++) {
            $status_faktur = array(
                'app_agrstatus' => 1,
                'app_agrid' => $id
            );

            $optd[$k][] = array('field' => 'id', 'param' => 'where', 'operator' => '', 'value' => $rcn_agr[$k]);
            if (!$this->update($status_faktur, $optd[$k], NULL, 'trx_agrplan')) {
                return false;
            }
        }

        return $id;
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

    public function list_ma($id, $test) {
        $data = explode('.', $id);
        $type_bayar = $data[1];
        $cabang = $data[0];
        $data_return = array();
        $rec[] = array('field' => 'trx_cabangid', 'param' => 'where', 'operator' => '', 'value' => $cabang);
        $rec[] = array('field' => 'trx_type', 'param' => 'where', 'operator' => '', 'value' => 1);
        $rec[] = array('field' => 'trx_carabayar', 'param' => 'where', 'operator' => '', 'value' => $type_bayar);
        $rec[] = array('field' => 'app_status', 'param' => 'where', 'operator' => '', 'value' => 1);
        $rec[] = array('field' => 'app_agrstatus', 'param' => 'where', 'operator' => '', 'value' => 0);
        $opt['sortBy'] = 'faktur_suppid';
        $opt['sortDirection'] = 'ASC';
        $result = $this->__ma_all($rec, $opt);

        if ($result != NULL) {
            foreach ($result as $row) {

                $data_return[] = array(
                    'id' => $row->id . '.' . $id,
                    'id_trx' => $row->id,
                    'name_id' => $row->faktur_suppid,
                    'name' => $this->get_detail('id', $row->faktur_suppid, 'dt_supplier')->ms_name,
                    'keterangan' => $row->faktur_no,
                    'list_po' => '-',
                    'list_tt' => $this->get_tt_list($row->trx_typeref),
                    'jadwal_bayar' => mdate("%d/%M/%Y", strtotime($row->faktur_bayartgl)),
                    'no_rekbg' => $row->trx_carabayar == 1 ? $this->faktur_bg_ed($row->trx_typeref)->faktur_bayarno : '-',
                    'bg_ed' => $row->trx_carabayar == 1 ? mdate("%d/%M/%Y", strtotime($this->faktur_bg_ed($row->trx_typeref)->faktur_bayared)) : '-',
                    'cara_bayar' => $row->trx_carabayar,
                    'ma_value' => $row->trx_nilai,
                    'app_status' => 1,
                    'test' => $test,
                    'checked' => false,
                    'leaf' => true,
                    'expanded' => false
                );
            }
        } else {
            $data_return[] = $this->tree_false($id, $test);
        }
        return $data_return;
    }

    private function __ma_all($params, $options) {
        $this->db->select('trx_agrplan.no AS no, trx_agrplan.id AS id, trx_typeref, faktur_suppid, trx_nilai, trx_carabayar, faktur_no,'
                . 'faktur_bayartgl');
        $this->db->from('trx_agrplan');
        $this->db->join('trx_faktur', 'trx_faktur.id = trx_agrplan.trx_typeref');
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

    public function faktur_bg_ed($id) {
        $data = $this->get_detail('faktur_id', $id, 'trx_faktur_bayar');

        if ($data != NULL) {
            return $data;
        } else {
            return '-';
        }
    }

    public function get_tt_list($id) {
        $tablename = 'trx_faktur_detail';
        $record[] = array('field' => 'trx_fakturid', 'param' => 'where', 'operator' => '', 'value' => $id);
        $opt['groupBy'] = 'trx_ttid';
        $data = $this->gets($record, $opt, $tablename);

        $tt = "";
        if ($data != NULL) {
            foreach ($data as $row) {
                $tt_no = $this->get_detail('id', $row->trx_ttid, 'trx_tt');
                if ($tt_no != NULL) {
                    $tt .= $tt_no->tt_no . ', ';
                } else {
                    $tt .= '-';
                }
            }
        } else {
            $tt = '-';
        }

        return rtrim($tt, ',');
    }

    public function list_ma_non($id, $test) {
        $data = explode('.', $id);
        $type_bayar = $data[1];
        $cabang = $data[0];
        $data_return = array();
        $rec[] = array('field' => 'trx_cabangid', 'param' => 'where', 'operator' => '', 'value' => $cabang);
        $rec[] = array('field' => 'trx_type', 'param' => 'where', 'operator' => '', 'value' => 2);
        $rec[] = array('field' => 'trx_carabayar', 'param' => 'where', 'operator' => '', 'value' => $type_bayar);
        $rec[] = array('field' => 'app_status', 'param' => 'where', 'operator' => '', 'value' => 1);
        $rec[] = array('field' => 'app_agrstatus', 'param' => 'where', 'operator' => '', 'value' => 0);
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
                    'name_id' => $row->agrplan_divisi,
                    'keterangan' => $keperluan . ', untuk ' . $dt_perlu . ' Ket. Tambahan : ' . $row->agrplan_desc,
                    'jadwal_bayar' => mdate("%d/%M/%Y", strtotime($row->agrplan_from)) . ' s/d ' . mdate("%d/%M/%Y", strtotime($row->agrplan_to)),
                    'no_rekbg' => $row->trx_carabayar != 2 ? $row->trx_no : '-',
                    'bg_ed' => $row->trx_carabayar == 1 ? mdate("%d/%M/%Y", strtotime($row->trx_bged)) : '-',
                    'cara_bayar' => $row->trx_carabayar,
                    'ma_value' => $row->trx_nilai,
                    'app_status' => $row->app_status,
                    'test' => $test,
                    'checked' => false,
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
        $this->db->join('trx_agrplan_detail', 'trx_agrplan_detail.agrplan_id = trx_agrplan.trx_typeref');
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
