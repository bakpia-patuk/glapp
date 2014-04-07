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
        $node = $this->input->post('node');

        if ($node == 0) {
            $detail_anggaran = $this->Bkrencanaagr_model->list_cabang();
        } else {
            if (!$this->__check_node($node)) {
                $data = $this->__check_node($node);
                $detail_anggaran = $this->Bkrencanaagr_model->type_bayar($node, $data);
            } else {
                $data = $this->__check_node($node);
                $detail_anggaran = $this->Bkrencanaagr_model->list_ma_non($node, $data);
            }
        }

        echo json_encode($detail_anggaran);
    }

    public function ma_tree() {
        $detail_anggaran = array();
        $node = $this->input->post('node');

        if ($node == 0) {
            $detail_anggaran = $this->Bkrencanaagr_model->list_cabang();
        } else {
            if (!$this->__check_node($node)) {
                $data = $this->__check_node($node);
                $detail_anggaran = $this->Bkrencanaagr_model->type_bayar($node, $data);
            } else {
                $data = $this->__check_node($node);
                $detail_anggaran = $this->Bkrencanaagr_model->list_ma($node, $data);
            }
        }

        echo json_encode($detail_anggaran);
    }

    private function __check_node($id) {
        if (strpos($id, '.') !== FALSE) {
            return TRUE;
        } else {
            return FALSE;
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

        $ma_detail = $this->Bkrencanaagr_model->get_detail('id', $id, 'trx_agrplan');

        if ($ma_detail->trx_carabayar == 2) {
            if (!$this->add_permintaan_divisi($id)) {
                echo json_encode(array('success' => 'false', 'data' => NULL, 'message' => $this->catch_db_err(), 'title' => 'Info'));
                return;
            }
        }

        echo json_encode(array('success' => 'true', 'data' => NULL, 'message' => 'Data Berhasil Di Simpan', 'title' => 'Info'));
    }

    function add_permintaan_divisi($id) {
        $ma = $this->Bkrencanaagr_model->get_detail('id', $id, 'trx_agrplan');
        $dt_ma = $this->Bkrencanaagr_model->get_detail('agrplan_id', $id, 'trx_agrplan_detail');
        $datestring = '%Y-%m-%d %H:%i:%s';
        $keterangan = "";
        $last = $this->Bkrencanaagr_model->get_last('trx_minta_kas');

        if ($dt_ma->agrplan_isrujukan != 0) {
            $keterangan = "Rujukan a.n. " . $dt_ma->agrplan_pasien . " ke " . $dt_ma->agrplan_rujuk;
        } else {
            $nama_akun = $this->Bkrencanaagr_model->get_detail('id', $dt_ma->agrplan_kprdetail, 'dt_akun')->akun_name;
            $keterangan = $nama_akun . ', Ket. Tambahan: ' . $dt_ma->agrplan_desc;
        }
        
        $new = array(
            'id' => $last . '.' . $ma->trx_cabangid,
            'tgl_trx' => mdate($datestring, now()),
            'trx_divisi' => $dt_ma->agrplan_divisi,
            'mk_keperluan' => $dt_ma->agrplan_kpr,
            'mk_detail' => $dt_ma->agrplan_kprdetail,
            'mk_detailext' => "",
            'mk_exttable' => "",
            'mkr_pemeriksaan' => $dt_ma->agrplan_periksa,
            'mkr_namapasien' => $dt_ma->agrplan_pasien,
            'mkr_rujukanke' => $dt_ma->agrplan_rujuk,
            'trx_desc' => $keterangan,
            'trx_realisasi' => 0,
            'trx_realstatus' => 0,
            'trx_appr_status' => 0,
            'trx_appr_peg' => 0,
            'created' => mdate($datestring, now()),
            'modified' => mdate($datestring, now()),
            'cabang_id' => $ma->trx_cabangid
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
