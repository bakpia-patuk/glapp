<?php


/**
 * Description of data_model
 *
 * @author coepoe
 */
class Bk_anggaran extends Auth_Controller {

    function __construct() {
        parent::__construct();
        $this->load->model('Bkanggaran_model');
    }

    public function ma_non_tree() {
        $detail_anggaran = array();
        $node = $this->input->post('node');

        if ($node == 0) {
            $detail_anggaran = $this->Bkanggaran_model->list_cabang();
        } else {
            if (!$this->__check_node($node)) {
                $data = $this->__check_node($node);
                $detail_anggaran = $this->Bkanggaran_model->type_bayar($node, $data);
            } else {
                $data = $this->__check_node($node);
                $detail_anggaran = $this->Bkanggaran_model->list_ma_non($node, $data);
            }
        }

        echo json_encode($detail_anggaran);
    }

    public function ma_tree() {
        $detail_anggaran = array();
        $node = $this->input->post('node');

        if ($node == 0) {
            $detail_anggaran = $this->Bkanggaran_model->list_cabang();
        } else {
            if (!$this->__check_node($node)) {
                $data = $this->__check_node($node);
                $detail_anggaran = $this->Bkanggaran_model->type_bayar($node, $data);
            } else {
                $data = $this->__check_node($node);
                $detail_anggaran = $this->Bkanggaran_model->list_ma($node, $data);
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

    
    function get_faktur_anggaran($pd, $type) {
        $jenis_faktur = substr($pd, 0, 4);
        if (strlen($pd) == 5) {
            $cabang_id = substr($pd, -1);
        } else {
            $cabang_id = substr($pd, -2);
        }

        if ($type == 1) {
            if (substr($jenis_faktur, -1) == 0) {
                $data = $this->Bkanggaran_model->get_bg_faktur($cabang_id, substr($jenis_faktur, -1));
            } else {
                $tablename = 'trx_faktur';
                $record[] = array('field' => 'faktur_agrstat', 'param' => 'where', 'operator' => '', 'value' => 0);
                $record[] = array('field' => 'faktur_cabang', 'param' => 'where', 'operator' => '', 'value' => $cabang_id);
                $record[] = array('field' => 'faktur_bayar', 'param' => 'where', 'operator' => '', 'value' => substr($jenis_faktur, -1));
                $opt['sortBy'] = 'faktur_suppid';
                $opt['sortDirection'] = 'ASC';
                $data = $this->Bkanggaran_model->gets($record, $opt, $tablename);
            }

            return $data;
        } else {
            $tablename = 'trx_data_nonfaktur';
            $record[] = array('field' => 'cabang_id', 'param' => 'where', 'operator' => '', 'value' => $cabang_id);
            $record[] = array('field' => 'agr_status', 'param' => 'where', 'operator' => '', 'value' => 0);
            $record[] = array('field' => 'cara_bayar', 'param' => 'where', 'operator' => '', 'value' => substr($jenis_faktur, -1));
            $opt['sortBy'] = 'divisi';
            $opt['sortDirection'] = 'ASC';
            $data = $this->Bkanggaran_model->gets($record, $opt, $tablename);

            return $data;
        }
    }
    
    function all_cabang($id) {
        $result = $this->Bkanggaran_model->gets(NULL, NULL, 'dt_cabang');
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
    
    function list_po($id, $type) {
        $tablename = 'trx_faktur_detail';
        $record[] = array('field' => 'trx_fakturid', 'param' => 'where', 'operator' => '', 'value' => $id);
        $opt['groupBy'] = 'trx_poid';
        $data = $this->Bkanggaran_model->gets($record, $opt, $tablename);

//        if ($type == 0) {
            return "";//$data;
//        } else {
//            $po = "";
//            foreach ($data as $row) {
//                $po_no = $this->Bkanggaran_model->get_detail('id', $row->trx_poid, 'trx_po')->po_no;
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
        $data = $this->Bkanggaran_model->gets($record, $opt, $tablename);

        if ($type == 0) {
            return $data;
        } else {
            $tt = "";
            foreach ($data as $row) {
                $tt_no = $this->Bkanggaran_model->get_detail('id', $row->trx_ttid, 'trx_tt')->tt_no;

                $tt .= $tt_no . ', ';
            }

            return $tt;
        }
    }

    function no_rekbg($id, $type_bayar) {
        $det_fkt = $this->Bkanggaran_model->get_detail('id', $id, 'trx_faktur');
        if ($type_bayar == 0 && $det_fkt->faktur_bgstatus == 1) {
            return $this->Bkanggaran_model->get_detail('faktur_id', $id, 'trx_faktur_bayar')->faktur_no;
        } else if ($type_bayar == 2) {
            $data = $this->Bkanggaran_model->get_detail('faktur_id', $id, 'trx_faktur_bayar');
            if ($data != NULL) {
                return $data->faktur_no;
            } else {
                return '-';
            }
        } else {
            return '-';
        }
    }
    
    public function anggaran_supp1() {
        $list_faktur = array();
        $opt[] = array('field' => 'faktur_bayar', 'param' => 'where', 'operator' => '', 'value' => 2);
        $opt[] = array('field' => 'faktur_agrstat', 'param' => 'where', 'operator' => '', 'value' => 1);
        $opt[] = array('field' => 'faktur_agrid', 'param' => 'where', 'operator' => '', 'value' => 0);
        $result = $this->Bkanggaran_model->gets($opt, NULL, 'trx_faktur');

        if ($result != NULL) {
            foreach ($result as $row) {
                $list_faktur[] = array(
                    'idCabang' => $row->id,
                    'faktur_cabang' => $row->faktur_cabang,
                    'kotaCabang' => $this->Bkanggaran_model->get_detail('id', $row->faktur_cabang, 'dt_cabang')->cabang_alias,
                    'namaCabang' => "",
                    'isCabang' => 0,
                    'isJenis' => 0,
                    'isData' => 1,
                    'jenisBayar' => 4,
                    'faktur_suppid' => $row->faktur_suppid,
                    'displayName' => $this->Bkanggaran_model->get_detail('id', $row->faktur_suppid, 'dt_supplier')->ms_name,
                    'faktur_no' => $row->faktur_no,
                    'noPo' => "",
                    'noTt' => "",
                    'fakturEd' => "",
                    'jadwalBayar' => "",
                    'noRekBg' => "",
                    'bgEd' => "",
                    'faktur_nototal' => $row->faktur_nototal,
                    'fakturRealisasi' => 0
                );
            }
        }

        echo json_encode(array('success' => 'true', 'data' => $list_faktur, 'message' => 'List All Supplier 1'));
    }
    
    function add_anggaran() {
        $data = $this->Bkanggaran_model->anggaran_process();
        if ($data) {
            echo json_encode(array('success' => 'true', 'data' => $data, 'message' => 'Data Berhasil Di Simpan', 'title' => 'Info'));
        } else {
            echo json_encode(array('success' => 'false', 'data' => NULL, 'message' => $this->catch_db_err(), 'title' => 'Error'));
        }
    }
    
    public function list_bank() {
        $records = $this->input->get('filter');
        $query = $this->input->get('query');
        $params = array();

        if ($records) {
            $raw_record = json_decode($records, true);
            $params = $this->generate_db_query($raw_record);
        }

        if ($query) {
            if ($query != "") {
                $params[] = array('field' => 'bank_alias', 'param' => 'where', 'operator' => '', 'value' => $query);
            }
        }

        $data_bank = $this->Bkanggaran_model->gets($params, NULL, 'ms_bank');
        $list_bank = array();

        if ($data_bank != NULL) {
            foreach ($data_bank as $key) {
                $list_bank[] = array(
                    'id' => $key->id,
                    'bank_nama' => $key->bank_nama,
                    'bankGroupNama' => $key->bank_nama != 0 ? $this->Bkanggaran_model->get_detail('id', $key->bank_nama, 'ms_banknas')->banknas_name : '',
                    'bank_alias' => $key->bank_alias,
                    'bank_reknama' => $key->bank_reknama,
                    'bank_rekno' => $key->bank_rekno,
                    'bank_alamat' => $key->bank_alamat,
                    'bank_cabang' => $key->bank_cabang,
                    'bank_kodeakun' => $key->bank_kodeakun,
                    'bank_golakun' => $key->bank_golakun,
                    'bank_status' => $key->bank_status,
                    'bank_active' => $key->bank_active
                );
            }
        }

        echo json_encode(array('success' => 'true', 'data' => $list_bank));
    }
}