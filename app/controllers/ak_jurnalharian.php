<?php

if (!defined('BASEPATH')) {
    exit('No direct script access allowed');
}

/**
 * Description of data_model
 *
 * @author Coepoe
 */
class Ak_jurnalharian extends Auth_Controller {

    function __construct() {
        parent::__construct();
        $this->load->model('Akjurnalharian_model');
        $this->page = 'Master';
    }
    
    public function jurnal_all_list() {
        $records = $this->input->get('filter');
        $query = $this->input->get('query');
        $params = array();

        if ($records) {
            $raw_record = json_decode($records, true);
            $params = $this->generate_db_query($raw_record);
        }

//        if ($query) {
//            if ($query != "") {
//                $params[] = array('field' => 'cabang_id', 'param' => 'where', 'operator' => '', 'value' => $query);
//            }
//        }

        $result = $this->Akjurnalharian_model->jurnal_list($params, NULL);

        if ($result) {
            echo json_encode(array('success' => 'true', 'data' => $result, 'message' => 'Daftar semua Jurnal'));
        } else {
            echo json_encode(array('success' => 'true', 'data' => NULL, 'message' => 'Tidak ada data Jurnal'));
        }
    }
    
    function add_jurnalharian($type) {
        $params = $this->input->post(NULL, TRUE);
        if ($params['id'] == 0) {
            $id_trx = $this->init_jurnal($params);
            if ($id_trx != FALSE) {
                $params['id'] = $id_trx;
                if ($params['jurnal_type'] == 0 || $params['jurnal_type'] == 1) {
                    $params['bankAkun'] = 4;
                }
                if ($this->add_jurnal($params, $type, 1)) {
                    if ($type == 0) {
                        echo json_encode(array('success' => 'true', 'data' => NULL, 'message' => 'Insert Jurnal Sukses', 'title' => 'Info'));
                    } else {
                        $return_data = $this->Akjurnalharian_model->return_jurnal_data($id_trx);
                        echo json_encode(array('success' => 'true', 'data' => $return_data, 'message' => 'Insert Jurnal Sukses', 'title' => 'Info'));
                    }
                } else {
                    echo json_encode(array('success' => 'false', 'data' => NULL, 'message' => $this->catch_db_err(), 'title' => 'Error'));
                }
            } else {
                echo json_encode(array('success' => 'false', 'data' => NULL, 'message' => $this->catch_db_err(), 'title' => 'Error'));
            }
        } else {
            $id_trx = $params['id'];
            if ($type == 2) {
                if ($this->Akjurnalharian_model->jm_process($id_trx)) {
                    echo json_encode(array('success' => 'true', 'data' => NULL, 'message' => 'Trx Jurnal Sukses', 'title' => 'Info'));
                } else {
                    echo json_encode(array('success' => 'false', 'data' => NULL, 'message' => 'Anda Belum memposting Jurnal', 'title' => 'Error'));
                }
            } else {
                if ($this->add_jurnal($params, $type, 0)) {
                    $return_data = $this->Akjurnalharian_model->return_jurnal_data($id_trx);
                    if ($params['idJurnal'] == 0) {
                        echo json_encode(array('success' => 'true', 'data' => $return_data, 'message' => 'Insert Jurnal Sukses', 'title' => 'Info'));
                    } else {
                        echo json_encode(array('success' => 'true', 'data' => $return_data, 'message' => 'Update Jurnal Sukses', 'title' => 'Info'));
                    }
                } else {
                    echo json_encode(array('success' => 'false', 'data' => NULL, 'message' => $this->catch_db_err(), 'title' => 'Error'));
                }
            }
        }
    }
    
    function init_jurnal($input) {
        $id = $input['id'];
        $tgl = $input['tglJurnal'];
        $noBk = $input['noBk'];
        $jenisBk = $input['jurnal_type'];
        $trx_harian = $this->Akjurnalharian_model->money_formatter($input['jumlahTrxKas']);
        $keterangan = trim($input['uraian']);

        if ($keterangan == "") {
            echo json_encode(array('success' => 'false', 'data' => NULL, 'message' => 'Belum melakukan transaksi', 'title' => 'Info'));
        } else {
            $data = array(
                'keterangan_trx' => strtoupper($keterangan) . '-nobk-' . $noBk,
                'jumlah_trx' => $trx_harian,
                'jenis_trx' => $jenisBk
            );

            $tgl = array(
                'tgl_trx' => mdate('%Y-%m-%d %H:%i:%s', strtotime($tgl)),
                'created' => mdate('%Y-%m-%d %H:%i:%s', now()),
                'modified' => mdate('%Y-%m-%d %H:%i:%s', now())
            );

            if ($id == 0) {
                $id = $this->Akjurnalharian_model->insert(array_merge($data, $tgl), 'trx_harian');
                if ($id != NULL) {
                    $ref_trx = 'JH' . sprintf('%06d', $id) . mdate('%y', now());
                    $ref = array(
                        'no_ref_trx' => $ref_trx
                    );
                    $new_upd[] = array('field' => 'id', 'param' => 'where', 'operator' => '', 'value' => $id);
                    if ($this->Akjurnalharian_model->update($ref, $new_upd, NULL, 'trx_harian')) {
                        return $id;
                    } else {
                        return FALSE;
                    }
                } else {
                    return FALSE;
                }
            } else {
                return $id;
            }
        }
    }

    function add_jurnal($input, $type, $init) {
        $id_trx = $input['id'];
        $id_jurnal = $input['idJurnal'];
        $d_k = $input['type'];
        $trx_type = $input['jurnal_type'];
        if ($type == 0) {
            $kode_akun = $input['bankAkun'];
            $value = $this->Akjurnalharian_model->money_formatter($input['jumlahTrxKas']);
        } else {
            $kode_akun = $init == 1 ? $input['bankAkun'] : $input['idAkun'];
            $value = $init == 1 ? $this->Akjurnalharian_model->money_formatter($input['jumlahTrxKas']) : $this->Akjurnalharian_model->money_formatter($input['jumlahTrx']);
        }
        $keterangan = trim($input['uraian']);
//        $user = $this->ion_auth->user()->row();
        $trx_detail = $this->Akjurnalharian_model->get_detail('id', $id_trx, 'trx_harian');
        $ket_jurnal = explode('-nobk-', $trx_detail->keterangan_trx);
        $trx_detail->keterangan_trx = $ket_jurnal[0];
        $trx_detail->no_bk = $ket_jurnal[1];

        if ($type == 0) {
            if ($trx_type == 0 || $trx_type == 2) {
                $d = $value;
                $k = 0;
            } else {
                $d = 0;
                $k = $value;
            }
        } else {
            if ($init == 1) {
                if ($trx_type == 0 || $trx_type == 2) {
                    $d = $value;
                    $k = 0;
                } else {
                    $d = 0;
                    $k = $value;
                }
            } else {
                if ($d_k == 0) {
                    $d = $value;
                    $k = 0;
                } else {
                    $d = 0;
                    $k = $value;
                }
            }
        }
        $data = array(
            'tgl_trx' => mdate('%Y-%m-%d %H:%i:%s', strtotime($trx_detail->tgl_trx)),
            'no_ref_trx' => $trx_detail->no_ref_trx,
            'trx_kredit' => $k,
            'trx_debet' => $d,
            'id_akun' => $kode_akun,
            'uraian' => strtoupper($keterangan),
            'user_create' => $this->user->username,
            'cabang' => $this->user->cabang_id,
            'peg_id' => $this->user->id,
            'created' => mdate('%Y-%m-%d %H:%i:%s', now()),
            'modified' => mdate('%Y-%m-%d %H:%i:%s', now()),
            'simpan_status' => 0
        );

        if ($id_jurnal == 0) {
            $id = $this->Akjurnalharian_model->insert($data, 'trx_jurnal_harian');
            if ($id != NULL) {
                return TRUE;
            } else {
                return FALSE;
            }
        } else {
            $jurnal_detail = $this->Akjurnalharian_model->get_detail('id', $id_jurnal, 'trx_jurnal_harian');
            if ($jurnal_detail->status_app == 1) {
                return 'auth';
            } else {
                unset($data['created']);
                unset($data['tgl_trx']);
                unset($data['user_create']);
                unset($data['cabang']);
                unset($data['peg_id']);
                $upd[] = array('field' => 'id', 'param' => 'where', 'operator' => '', 'value' => $id_jurnal);
                if ($this->Akjurnalharian_model->update($data, $upd, NULL, 'trx_jurnal_harian')) {
                    return TRUE;
                } else {
                    return FALSE;
                }
            }
        }
    }
}