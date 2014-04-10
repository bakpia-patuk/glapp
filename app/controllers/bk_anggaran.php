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
        $this->Bkanggaran_model->cms_db = $this->load->database('outgoing', TRUE);
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
        $opt[] = array('field' => 'faktur_bayar', 'param' => 'where', 'operator' => '', 'value' => 3);
        $opt[] = array('field' => 'faktur_agrstat', 'param' => 'where', 'operator' => '', 'value' => 1);
        $opt[] = array('field' => 'faktur_agrid', 'param' => 'where', 'operator' => '', 'value' => 0);
        $result = $this->Bkanggaran_model->gets($opt, NULL, 'trx_faktur');

        if ($result != NULL) {
            foreach ($result as $row) {
                $list_faktur[] = array(
                    'id' => $row->id,
                    'id_trx' => $row->id,
                    'name' => $this->Bkanggaran_model->get_detail('id', $row->faktur_cabang, 'dt_cabang')->cabang_alias,
                    'name_id' => $row->faktur_suppid,
                    'keterangan' => $row->faktur_no,
                    'list_po' => $this->Bkanggaran_model->get_detail('id', $row->faktur_suppid, 'dt_supplier')->ms_name,
                    'list_tt' => $this->Bkanggaran_model->get_tt_list($row->id),
                    'jadwal_bayar' => 0,
                    'no_rekbg' => 0,
                    'bg_ed' => 0,
                    'cara_bayar' => 4,
                    'ma_value' => $row->faktur_nototal,
                    'app_status' => 1,
                    'test' => true
                );
            }
        }

        echo json_encode(array('success' => 'true', 'data' => $list_faktur, 'message' => 'List All Supplier 1'));
    }
    
    function add_anggaran() {
        $insert = $this->input->post(NULL, TRUE);

        $data = $this->Bkanggaran_model->anggaran_process($insert);
        if ($data) {
            $id=$data;
            $supplier = $this->input->post('supplier');
            $trx_jenisbayar = $this->input->post('trx_jenisbayar');
            $trx_agrdata = $this->input->post('trx_agrdata');

            if ($supplier != "") {
                $tujuan_kirim = 1;
                if ($trx_jenisbayar == 2) {
                    $no_faktur = explode(';', $trx_agrdata);
                    for ($i = 0; $i < count($no_faktur) - 1; $i++) {
                        
                        $no_faktur_i = $this->Bkanggaran_model->get_detail('id', $no_faktur[$i], 'trx_agrplan')->trx_typeref;

                        $opts=array();
                        $opts[] = array('field' => 'id', 'param' => 'where', 'operator' => '', 'value' => $no_faktur_i);
                        $data_po = $this->Bkanggaran_model->gets($opts, NULL, 'trx_faktur');
                        if($data_po){
                            foreach ($data_po as $key) {
                                $tujuan_kirim = $key->faktur_cabang;
                                $data_json = json_encode($key);

                                $data = array();

                                $data['jumlah'] = 1;

                                $data['tujuan'] = $key->faktur_cabang;
                                $data['id_cabang'] = $this->user->cabang_id;

                                $no = $this->Bkanggaran_model->insert_outgoing($data, 'head');

                                $data = array();
                                $data['data'] = $data_json;
                                $data['head_id'] = $no . '.' . $this->user->cabang_id;
                                
                                $data['primary_key'] = $no_faktur_i;
                                $data['table_name'] = 'trx_faktur';

                                $this->Bkanggaran_model->insert_outgoing($data, 'detail');
                            }
                        }
                    }

                    $opts=array();
                    $opts[] = array('field' => 'id', 'param' => 'where', 'operator' => '', 'value' => $id);
                    $data_po = $this->Bkanggaran_model->gets($opts, NULL, 'trx_anggaran');
                    if($data_po){
                        foreach ($data_po as $key) {
                            
                            $data_json = json_encode($key);

                            $data = array();

                            $data['jumlah'] = 1;

                            $data['tujuan'] = $tujuan_kirim;
                            $data['id_cabang'] = $this->user->cabang_id;

                            $no = $this->Bkanggaran_model->insert_outgoing($data, 'head');

                            $data = array();
                            $data['data'] = $data_json;
                            $data['head_id'] = $no . '.' . $this->user->cabang_id;
                            
                            $data['primary_key'] = $key->id;
                            $data['table_name'] = 'trx_anggaran';

                            $this->Bkanggaran_model->insert_outgoing($data, 'detail');
                        }
                    }

                }
                else if ($trx_jenisbayar == 1) {
                    $no_bg = explode(';', rtrim($trx_agrdata, ';'));
                    for ($j = 0; $j < count($no_bg); $j++) {
                        $realisasi = $this->Bkanggaran_model->get_detail('id', $no_bg[$j], 'trx_agrplan');
                        $no_faktur_j = $realisasi->trx_typeref;

                        

                        
                        $opts=array();
                        $opts[] = array('field' => 'faktur_id', 'param' => 'where', 'operator' => '', 'value' => $no_faktur_j);
                        $data_po = $this->Bkanggaran_model->gets($opts, NULL, 'trx_faktur_bayar');
                        if($data_po){
                            foreach ($data_po as $key) {
                                $tujuan_kirim = $key->faktur_cabang;
                                $data_json = json_encode($key);

                                $data = array();

                                $data['jumlah'] = 1;

                                $data['tujuan'] = $key->faktur_cabang;
                                $data['id_cabang'] = $this->user->cabang_id;

                                $no = $this->Bkanggaran_model->insert_outgoing($data, 'head');

                                $data = array();
                                $data['data'] = $data_json;
                                $data['head_id'] = $no . '.' . $this->user->cabang_id;
                                $data['nama_column'] = 'faktur_id';
                                $data['primary_key'] = $no_faktur_j;
                                $data['table_name'] = 'trx_faktur_bayar';

                                $this->Bkanggaran_model->insert_outgoing($data, 'detail');
                            }
                        }

                        $opts=array();
                        $opts[] = array('field' => 'id', 'param' => 'where', 'operator' => '', 'value' => $no_faktur_j);
                        $data_po = $this->Bkanggaran_model->gets($opts, NULL, 'trx_faktur');
                        if($data_po){
                            foreach ($data_po as $key) {
                                
                                $data_json = json_encode($key);

                                $data = array();

                                $data['jumlah'] = 1;

                                $data['tujuan'] = $key->faktur_cabang;
                                $data['id_cabang'] = $this->user->cabang_id;

                                $no = $this->Bkanggaran_model->insert_outgoing($data, 'head');

                                $data = array();
                                $data['data'] = $data_json;
                                $data['head_id'] = $no . '.' . $this->user->cabang_id;
                                
                                $data['primary_key'] = $no_faktur_j;
                                $data['table_name'] = 'trx_faktur';

                                $this->Bkanggaran_model->insert_outgoing($data, 'detail');
                            }
                        }
                    }

                    $opts=array();
                    $opts[] = array('field' => 'id', 'param' => 'where', 'operator' => '', 'value' => $id);
                    $data_po = $this->Bkanggaran_model->gets($opts, NULL, 'trx_anggaran');
                    if($data_po){
                        foreach ($data_po as $key) {

                            
                            $data_json = json_encode($key);

                            $data = array();

                            $data['jumlah'] = 1;

                            $data['tujuan'] = $tujuan_kirim;
                            $data['id_cabang'] = $this->user->cabang_id;

                            $no = $this->Bkanggaran_model->insert_outgoing($data, 'head');

                            $data = array();
                            $data['data'] = $data_json;
                            $data['head_id'] = $no . '.' . $this->user->cabang_id;
                            
                            $data['primary_key'] = $key->id;
                            $data['table_name'] = 'trx_anggaran';

                            $this->Bkanggaran_model->insert_outgoing($data, 'detail');
                        }
                    }
                }
                else if ($trx_jenisbayar == 4) {
                    $no_faktur = explode(';', rtrim($trx_agrdata, ';'));
                    for ($s = 0; $s < count($no_faktur); $s++) {
                        
                        
                        $no_faktur_s = $no_faktur[$s];
                        $optk = array();
                        $optk[] = array('field' => 'id', 'param' => 'where', 'operator' => '', 'value' => $no_faktur_s);
                        $data_po = $this->Bkanggaran_model->gets($optk, NULL, 'trx_faktur');
                        if($data_po){
                            foreach ($data_po as $key) {
                                $tujuan_kirim = $key->faktur_cabang;
                                $data_json = json_encode($key);

                                $data = array();

                                $data['jumlah'] = 1;

                                $data['tujuan'] = $key->faktur_cabang;
                                $data['id_cabang'] = $this->user->cabang_id;

                                $no = $this->Bkanggaran_model->insert_outgoing($data, 'head');

                                $data = array();
                                $data['data'] = $data_json;
                                $data['head_id'] = $no . '.' . $this->user->cabang_id;
                                
                                $data['primary_key'] = $no_faktur_s;
                                $data['table_name'] = 'trx_faktur';

                                $this->Bkanggaran_model->insert_outgoing($data, 'detail');
                            }
                        }
                    }
                    $opts=array();
                    $opts[] = array('field' => 'id', 'param' => 'where', 'operator' => '', 'value' => $id);
                    $data_po = $this->Bkanggaran_model->gets($opts, NULL, 'trx_anggaran');
                    if($data_po){
                        foreach ($data_po as $key) {
                            
                            $data_json = json_encode($key);

                            $data = array();

                            $data['jumlah'] = 1;

                            $data['tujuan'] = $tujuan_kirim;
                            $data['id_cabang'] = $this->user->cabang_id;

                            $no = $this->Bkanggaran_model->insert_outgoing($data, 'head');

                            $data = array();
                            $data['data'] = $data_json;
                            $data['head_id'] = $no . '.' . $this->user->cabang_id;
                            
                            $data['primary_key'] = $key->id;
                            $data['table_name'] = 'trx_anggaran';

                            $this->Bkanggaran_model->insert_outgoing($data, 'detail');
                        }
                    }
                }
                else {
                    $no_faktur = explode(';', $trx_agrdata);
                    for ($z = 0; $z < count($no_faktur) - 1; $z++) {
                        

                        $no_faktur_z = $this->Bkanggaran_model->get_detail('id', $no_faktur[$z], 'trx_agrplan')->trx_typeref;
                        $optc=array();
                        $optc[] = array('field' => 'id', 'param' => 'where', 'operator' => '', 'value' => $no_faktur_z);
                        $data_po = $this->Bkanggaran_model->gets($optk, NULL, 'trx_faktur');
                        if($data_po){
                            foreach ($data_po as $key) {
                                $tujuan_kirim = $key->faktur_cabang;
                                $data_json = json_encode($key);

                                $data = array();

                                $data['jumlah'] = 1;

                                $data['tujuan'] = $key->faktur_cabang;
                                $data['id_cabang'] = $this->user->cabang_id;

                                $no = $this->Bkanggaran_model->insert_outgoing($data, 'head');

                                $data = array();
                                $data['data'] = $data_json;
                                $data['head_id'] = $no . '.' . $this->user->cabang_id;
                                
                                $data['primary_key'] = $no_faktur_z;
                                $data['table_name'] = 'trx_faktur';

                                $this->Bkanggaran_model->insert_outgoing($data, 'detail');
                            }
                        }
                    }
                    $opts=array();
                    $opts[] = array('field' => 'id', 'param' => 'where', 'operator' => '', 'value' => $id);
                    $data_po = $this->Bkanggaran_model->gets($opts, NULL, 'trx_anggaran');
                    if($data_po){
                        foreach ($data_po as $key) {
                            
                            $data_json = json_encode($key);

                            $data = array();

                            $data['jumlah'] = 1;

                            $data['tujuan'] = $tujuan_kirim;
                            $data['id_cabang'] = $this->user->cabang_id;

                            $no = $this->Bkanggaran_model->insert_outgoing($data, 'head');

                            $data = array();
                            $data['data'] = $data_json;
                            $data['head_id'] = $no . '.' . $this->user->cabang_id;
                            
                            $data['primary_key'] = $key->id;
                            $data['table_name'] = 'trx_anggaran';

                            $this->Bkanggaran_model->insert_outgoing($data, 'detail');
                        }
                    }
                }

            }
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