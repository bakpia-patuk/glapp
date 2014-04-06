<?php

if (!defined('BASEPATH')) {
    exit('No direct script access allowed');
}

/**
 * Description of data_model
 *
 * @author Coepoe
 */
class Bk_rencanaagr extends Auth_Controller {

    function __construct() {
        parent::__construct();
        $this->load->model('Bkrencanaagr_model');
    }

    public function ma_non_tree() {
        $detail_anggaran = array();

        /* $options['sortBy'] = 'akun_head_status';
          $options['sortBy'] = 'akun_code';
          $options['sortDirection'] = 'ASC';
          $result = $this->Bkrencanaagr_model->gets($params, $options, $tablename); */
        $cabang = $this->user->cabang_id;
        $node = $this->input->post('node');


        echo json_encode($detail_anggaran);
    }

    function all_cabang($id) {
        $result = $this->Bkrencanaagr_model->gets(NULL, NULL, 'dt_cabang');
        $data = array();

        if ($result != NULL) {
            foreach ($result as $row) {
                $data[] = $row->id;
            }
        }

        if (in_array($id, $data)) {
            return TRUE;
        } else {
            return FALSE;
        }
    }

    public function jbt($id) {
        $data[] = array('type' => 1002, 'nama' => "TRANSFER", 'id' => $id);
        $data[] = array('type' => 1001, 'nama' => "TUNAI", 'id' => $id);
        $data[] = array('type' => 1000, 'nama' => "BG", 'id' => $id);

        return $data;
    }

    function get_minta_anggaran($pd, $type) {
        $jenis_faktur = substr($pd, 0, 4);
        if (strlen($pd) == 5) {
            $cabang_id = substr($pd, -1);
        } else {
            $cabang_id = substr($pd, -2);
        }

        if ($type == 1) {
            $tablename = 'trx_faktur';
            $record[] = array('field' => 'faktur_cabang', 'param' => 'where', 'operator' => '', 'value' => $cabang_id);
            $record[] = array('field' => 'faktur_bayar', 'param' => 'where', 'operator' => '', 'value' => substr($jenis_faktur, -1));
            if (substr($jenis_faktur, -1) == 0) {
                $record[] = array('field' => 'faktur_bgstatus', 'param' => 'where', 'operator' => '', 'value' => 1);
            }
            $record[] = array('field' => 'faktur_agrstat', 'param' => 'where', 'operator' => '', 'value' => 0);
            $opt['sortBy'] = 'faktur_suppid';
            $opt['sortDirection'] = 'ASC';
            $data = $this->Bkrencanaagr_model->gets($record, $opt, $tablename);

            return $data;
        } else {
            $tablename = 'trx_data_nonfaktur';
            $rec[] = array('field' => 'cabang_id', 'param' => 'where', 'operator' => '', 'value' => $cabang_id);
            $rec[] = array('field' => 'agr_status', 'param' => 'where', 'operator' => '', 'value' => 0);
            $rec[] = array('field' => 'cara_bayar', 'param' => 'where', 'operator' => '', 'value' => substr($jenis_faktur, -1));
            $opt['sortBy'] = 'divisi';
            $opt['sortDirection'] = 'ASC';
            $data = $this->Bkrencanaagr_model->gets($rec, $opt, $tablename);

            return $data;
        }
    }

    function list_po($id, $type) {
        $tablename = 'trx_faktur_detail';
        $record[] = array('field' => 'trx_fakturid', 'param' => 'where', 'operator' => '', 'value' => $id);
        //id po di data dummy tidak ada
        $opt['groupBy'] = 'trx_poid';
        $data = $this->Bkrencanaagr_model->gets($record, $opt, $tablename);
        return $data;
//        if ($type == 0) {
//            return $data;
//        } else {
//            $po = "";
//            foreach ($data as $row) {
//                $po_no = $this->Bkrencanaagr_model->get_detail('id', $row->trx_poid, 'trx_po')->po_no;
//
//                $po .= $po_no . ', ';
//            }
//
//            return $po;
//        }
    }

    function list_tt($id, $type) {
        $tablename = 'trx_faktur_detail';
        $record[] = array('field' => 'trx_fakturid', 'param' => 'where', 'operator' => '', 'value' => $id);
        $opt['groupBy'] = 'trx_ttid';
        $data = $this->Bkrencanaagr_model->gets($record, $opt, $tablename);

        if ($type == 0) {
            return $data;
        } else {
            $tt = "";
            foreach ($data as $row) {
                $tt_no = $this->Bkrencanaagr_model->get_detail('id', $row->trx_ttid, 'trx_tt')->tt_no;

                $tt .= $tt_no . ', ';
            }

            return $tt;
        }
    }

    function no_rekbg($id, $type_bayar) {
        $det_fkt = $this->Bkrencanaagr_model->get_detail('id', $id, 'trx_faktur');
        if ($type_bayar == 0 && $det_fkt->faktur_bgstatus == 1) {
            return $this->Bkrencanaagr_model->get_detail('faktur_id', $id, 'trx_faktur_bayar')->faktur_no;
        } else if ($type_bayar == 2) {
            $data = $this->Bkrencanaagr_model->get_detail('faktur_id', $id, 'trx_faktur_bayar');
            if ($data != NULL) {
                return $data->faktur_no;
            } else {
                return '-';
            }
        } else {
            return '-';
        }
    }

    function add_rencanaanggaran() {
        $input = $this->input->post(NULL, TRUE);
        $data = $this->Bkrencanaagr_model->ma_process($input);
        if ($data) {
            echo json_encode(array('success' => 'true', 'data' => $data, 'message' => 'Data Berhasil Di Simpan', 'title' => 'Info'));
        } else {
            echo json_encode(array('success' => 'false', 'data' => NULL, 'message' => $this->catch_db_err(), 'title' => 'gagal bung'));
        }
    }

    function app_rencanaanggaran() {
        $id = $this->input->post('id');

        $update = array(
            'app_status' => 1
        );
        $upd[] = array('field' => 'id', 'param' => 'where', 'operator' => '', 'value' => $id);
        $this->Bkrencanaagr_model->update($update, $upd, NULL, 'trx_agrplan');

        $ma_detail = $this->Bkrencanaagr_model->get_detail('ma_id', $id, 'trx_data_nonfaktur');

        if ($ma_detail->cara_bayar == 1) {
            if (!$this->add_permintaan_divisi($id)) {
                echo json_encode(array('success' => 'false', 'data' => NULL, 'message' => $this->catch_db_err(), 'title' => 'Info'));
                return;
            }
        }

        echo json_encode(array('success' => 'true', 'data' => NULL, 'message' => 'Data Berhasil Di Simpan', 'title' => 'Info'));
    }

    function add_permintaan_divisi($id) {
        $dt_ma = $this->Bkrencanaagr_model->get_detail('id', $id, 'trx_agrplan');
//        var_dump($dt_ma->gr_keperluan);
        $dt_nonfkt = $this->Bkrencanaagr_model->get_detail('ma_id', $id, 'trx_data_nonfaktur');
        $datestring = '%Y-%m-%d %H:%i:%s';
        $keterangan = "";
        if ($dt_ma->mkr_pemeriksaan != 0) {
            $keterangan = "Rujukan a.n. " . $dt_ma->mkr_namapasien . " ke " . $dt_ma->mkr_rujukanke;
        } else {
            $nama_akun = $this->Bkrencanaagr_model->get_detail('id', $dt_ma->dtl_keperluan, 'dt_akun')->akun_name;
            $keterangan = $nama_akun . ', Ket. Tambahan: ' . $dt_ma->keterangan;
        }
        $new = array(
            'tgl_trx' => mdate($datestring, now()),
            'trx_divisi' => $dt_nonfkt->divisi,
            'mk_keperluan' => $dt_ma->gr_keperluan,
            'mk_detail' => $dt_ma->dtl_keperluan,
            'mk_detailext' => "",
            'mk_exttable' => "",
            'mkr_pemeriksaan' => $dt_ma->mkr_pemeriksaan,
            'mkr_namapasien' => $dt_ma->mkr_namapasien,
            'mkr_rujukanke' => $dt_ma->mkr_rujukanke,
            'trx_desc' => $keterangan,
            'trx_realisasi' => 0,
            'trx_realstatus' => 0,
            'trx_appr_status' => 0,
            'trx_appr_peg' => 0,
            'created' => mdate($datestring, now()),
            'modified' => mdate($datestring, now()),
            'cabang_id' => $this->user->cabang_id
        );

        if ($this->Bkrencanaagr_model->insert($new, 'trx_minta_kas')) {
            return TRUE;
        } else {
            return FALSE;
        }
    }

    function delete_rencanaagr() {
        $id = $this->input->post('id');

        $del1[] = array('field' => 'id', 'param' => 'where', 'operator' => '', 'value' => $id);
        $this->Bkrencanaagr_model->delete($del1, NULL, 'trx_agrplan');

        $del2[] = array('field' => 'agrplan_id', 'param' => 'where', 'operator' => '', 'value' => $id);
        $this->Bkrencanaagr_model->delete($del2, NULL, 'trx_agrplan_detail');

        echo json_encode(array('success' => 'true', 'data' => NULL, 'message' => 'Data Berhasil Di Hapus', 'title' => 'Info'));
    }

    public function set_akungr() {
        $insert = $this->input->post(NULL, TRUE);
        $data = explode('-', rtrim($insert['data'], '-'));
        foreach ($data as $row) {
            $this->Bkrencanaagr_model->add_to_kpakun($row, $insert['idPerlu'], $insert['idForm']);
        }
        echo json_encode(array('success' => 'true', 'msg' => 'Add Data Success'));
    }

    public function del_akun_gr() {
        $data = $this->input->post('id');

        $rec[] = array('field' => 'id', 'param' => 'where', 'operator' => '', 'value' => $data);
        $this->Bkrencanaagr_model->delete($rec, NULL, 'ms_keperluan_akun');
        echo json_encode(array('success' => 'true', 'msg' => 'Delete Data Success'));
    }

}
