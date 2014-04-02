<?php

/**
 * Description of data_model
 *
 * @author Azelia
 */
if (!defined('BASEPATH')) {
    exit('No direct script access allowed');
}

class Gd_po extends Auth_Controller {

    function __construct() {
        parent::__construct();
        $this->load->model('Gdpo_model');
    }

    public function reset() {
        $insert = $this->input->post(NULL, TRUE);

        if ($insert['id'] != 0) {
            $params[] = array('field' => 'id', 'param' => 'where', 'operator' => '', 'value' => $insert['id']);
            if (!$this->Gdpo_model->delete($params, NULL, 'trx_po')) {
                echo json_encode(array('success' => 'false', 'data' => NULL, 'title' => 'Info', 'msg' => $this->catch_db_err()));
                return;
            }

            $data = array(
                'po_status' => 0,
                'po_id' => 0
            );

            $param[] = array('field' => 'po_id', 'param' => 'where', 'operator' => '', 'value' => $insert['id']);
            if (!$this->Gdpo_model->update($data, $param, NULL, 'trx_pengadaan_detail')) {
                echo json_encode(array('success' => 'false', 'data' => NULL, 'title' => 'Info', 'msg' => $this->catch_db_err()));
                return;
            }
        }

        echo json_encode(array('success' => 'true', 'data' => NULL, 'title' => 'Info', 'msg' => 'Reset All Data'));
    }

    public function set_status($type) {
        $insert = $this->input->post(NULL, TRUE);

        if ($insert['id'] == 0) {
            $insert['id'] = $this->__init_po($insert);
            if ($insert['id'] == 0) {
                echo json_encode(array('success' => 'false', 'data' => NULL, 'title' => 'Error', 'msg' => $this->catch_db_err()));
                return;
            }
        }

        $data = array(
            'po_id' => $type == 1 ? $insert['id'] : 0,
            'po_status' => $type == 1 ? 1 : 0
        );

        $params[] = array('field' => 'id', 'param' => 'where', 'operator' => '', 'value' => $insert['id_peng']);
        if (!$this->Gdpo_model->update($data, $params, NULL, 'trx_pengadaan_detail')) {
            echo json_encode(array('success' => 'false', 'data' => NULL, 'title' => 'Info', 'msg' => $this->catch_db_err()));
            return;
        }

        $rtn = $this->Gdpo_model->get_detail('id', $insert['id'], 'trx_po');
        $return = array(
            'id' => $rtn->id,
            'po_no' => $rtn->po_no,
            'po_value' => $this->Gdpo_model->total_po($insert['id'])
        );

        echo json_encode(array('success' => 'true', 'data' => $return, 'title' => 'Info', 'msg' => 'Insert Po Success'));
    }

    private function __init_po($insert) {
        $last_no = $this->Gdpo_model->get_last('trx_po');
        $detail_cabang = $this->Gdpo_model->get_detail('id', $this->user->cabang_id, 'dt_cabang');

        $data = array(
            'id' => $last_no . '.' . $this->user->cabang_id,
            'trx_date' => mdate('%Y-%m-%d %H:%i:%s', now()),
            'po_no' => sprintf('%06d', $last_no) . '/' . $detail_cabang->cabang_code . '/' . mdate('%Y%m%d', now()),
            'po_cabangid' => $insert['cabang'],
            'po_usercreate' => $this->user->id,
            'po_simpanstatus' => 0
        );

        if ($this->Gdpo_model->insert($data, 'trx_po')) {
            return $last_no . '.' . $this->user->cabang_id;
        } else {
            return '0';
        }
    }

    public function list_pengadaan_all() {
        $records = $this->input->get('filter');
        $params = array();

        if ($records) {
            $raw_record = json_decode($records, true);
            $params = $this->generate_db_query($raw_record);
        } else {
            $params[] = array('field' => 'trx_pengadaan.cabang_id', 'param' => 'where', 'operator' => ' <=', 'value' => $this->user->cabang_id);
        }

        $params[] = array('field' => 'trx_pengadaan.peng_statusdiv', 'param' => 'where', 'operator' => '', 'value' => 1);
        $params[] = array('field' => 'trx_pengadaan.peng_statuspst', 'param' => 'where', 'operator' => '', 'value' => 1);
        $params[] = array('field' => 'trx_pengadaan.po_status', 'param' => 'where', 'operator' => ' !=', 'value' => 1);

        $opt['sortBy'] = 'trx_pengadaan.id';
        $opt['sortDirection'] = 'ASC';

        $result = $this->Gdpo_model->get_peng_list($params, $opt);

        if ($result != NULL) {
            echo json_encode(array('success' => 'true', 'data' => $result, 'title' => 'Info', 'msg' => 'List All Pengadaan'));
        } else {
            echo json_encode(array('success' => 'true', 'data' => NULL, 'title' => 'Info', 'msg' => 'Tidak ada data'));
        }
    }

    public function list_po_all() {
        $records = $this->input->get('filter');
        $params = array();

        if ($records) {
            $raw_record = json_decode($records, true);
            $params = $this->generate_db_query($raw_record);
        } else {
            $params[] = array('field' => 'tgl_trx', 'param' => 'where', 'operator' => ' >=', 'value' => mdate("%Y-%m-%d 00:00:00", now()));
            $params[] = array('field' => 'tgl_trx', 'param' => 'where', 'operator' => ' <=', 'value' => mdate("%Y-%m-%d 23:59:59", now()));
            $params[] = array('field' => 'cabang_id', 'param' => 'where', 'operator' => ' <=', 'value' => $this->user->cabang_id);
        }

        $tablename = 'trx_po';
        $opt['sortBy'] = 'id';
        $opt['sortDirection'] = 'ASC';

        $result = $this->Gdpengadaan_model->gets($params, $opt, $tablename);
        $no = 0;

        if ($result != NULL) {
            foreach ($result as $row) {
                $result[$no]->tgl_trx = explode(' ', $row->tgl_trx)[0];
                $result[$no]->cabang_name = $this->Gdpengadaan_model->get_detail('id', $row->cabang_id, 'dt_cabang')->cabang_alias;
                $result[$no]->divisi_name = $this->Gdpengadaan_model->get_detail('id', $row->divisi, 'dt_divisi')->divisi_name;
                $result[$no]->peng_class_row = $this->__return_csspeng($row->id);
                $no++;
            }
            echo json_encode(array('success' => 'true', 'data' => $result, 'title' => 'Info', 'msg' => 'List All Pengadaan'));
        } else {
            echo json_encode(array('success' => 'true', 'data' => NULL, 'title' => 'Info', 'msg' => 'Tidak ada data'));
        }
    }

    public function list_po_detail() {
        $records = $this->input->get('filter');
        $params = array();

        if ($records) {
            $raw_record = json_decode($records, true);
            $params = $this->generate_db_query($raw_record);
        }

        $tablename = 'trx_pengadaan_detail';
        $opt['sortBy'] = 'id';
        $opt['sortDirection'] = 'ASC';

        $result = $this->Gdpengadaan_model->gets($params, $opt, $tablename);
        $no = 0;

        if ($result != NULL) {
            foreach ($result as $row) {
                $barang = $this->Gdpengadaan_model->get_item_detail($row->barang_id);
                $result[$no]->barang_name = $barang->mi_name;
                $result[$no]->merk_name = $this->Gdpengadaan_model->get_detail('id', $barang->mi_merk, 'dt_merk')->merk_name;
                $no++;
            }
            echo json_encode(array('success' => 'true', 'data' => $result, 'title' => 'Info', 'msg' => 'List All Pengadaan Detail'));
        } else {
            echo json_encode(array('success' => 'true', 'data' => NULL, 'title' => 'Info', 'msg' => 'Tidak ada data'));
        }
    }

    private function __return_csspeng($id) {
        $peng_detail = $this->Gdpengadaan_model->get_detail('id', $id, 'trx_pengadaan');

        if ($peng_detail->peng_type == 0) {
            $po_status = $peng_detail->po_status;
            $peng_statusdiv = $peng_detail->peng_statusdiv;
            $peng_statuspst = $peng_detail->peng_statuspst;

            if ($po_status == 0 && $peng_statusdiv == 0 && $peng_statuspst == 0) {
                return 'peng-null';
            } else if ($po_status == 0 && $peng_statusdiv == 1 && $peng_statuspst == 0) {
                return 'peng-div';
            } else if ($po_status == 0 && $peng_statusdiv == 1 && $peng_statuspst == 1) {
                return 'peng-pusat';
            } else if ($po_status == 2 && $peng_statusdiv == 1 && $peng_statuspst == 1) {
                return 'peng-pobag';
            } else if ($po_status == 1 && $peng_statusdiv == 1 && $peng_statuspst == 1) {
                return 'peng-poall';
            } else {
                return 'peng-grey';
            }
        }
    }

}
