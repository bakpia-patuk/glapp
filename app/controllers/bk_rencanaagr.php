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

    public function minta_anggaran_tree($type, $cabang = NULL) {
        $detail_anggaran = array();

        /* $options['sortBy'] = 'akun_head_status';
          $options['sortBy'] = 'akun_code';
          $options['sortDirection'] = 'ASC';
          $result = $this->Bkrencanaagr_model->gets($params, $options, $tablename); */
        $cabang = $this->user->cabang_id;
        $node = $this->input->post('node');

        if ($node == 0) {
//            if ($cabang == 14) {
//                $cabang = 0;
//            }
            $cabang = 0;

            $rec[] = array('field' => 'id', 'param' => 'where', 'operator' => '', 'value' => $cabang);

            $cabang_result = $this->Bkrencanaagr_model->gets($rec, NULL, 'dt_cabang');
            foreach ($cabang_result as $row) {
                $detail_anggaran[] = array(
                    'idCabang' => $row->id,
                    'cabang_code' => $row->cabang_code,
                    'cabang_city' => $row->cabang_city,
                    'cabang_name' => $row->cabang_name,
                    'isCabang' => 1,
                    'isJenis' => 0,
                    'isData' => 0,
                    'displayName' => 'Cabang ' . $row->cabang_city . ', ' . $row->cabang_name,
                    'fakturNo' => "",
                    'noPo' => "",
                    'noTt' => "",
                    'fakturEd' => "",
                    'jadwalBayar' => "",
                    'noRekBg' => "",
                    'bgEd' => "",
                    'fakturRealisasi' => "",
                    'iconCls' => 'icon-tree',
                    'leaf' => false,
                    'expanded' => false
                );
            }
        } else {
            $pd = $node;
            if ($this->all_cabang($pd)) {
                $data = $this->jbt($pd);
                foreach ($data as $row) {
                    $detail_anggaran[] = array(
                        'idCabang' => $row['type'] . $pd,
                        'kodeCabang' => $pd,
                        'kotaCabang' => "",
                        'namaCabang' => "",
                        'isCabang' => 0,
                        'isJenis' => 1,
                        'isData' => 0,
                        'displayName' => $row['nama'],
                        'faktur_no' => "",
                        'list_po' => "",
                        'list_tt' => "",
                        'faktur_ed' => "",
                        'tgldari' => "",
                        'no_rekbg' => "",
                        'faktur_bgstatus' => "",
                        'hp_cicilan_amt' => "",
                        'iconCls' => 'icon-tree',
                        'leaf' => false,
                        'expanded' => false
                    );
                }
            } else {
                $data = $this->get_minta_anggaran($pd, $type);
                if ($data != NULL) {
                    if ($type == 1) {
                        foreach ($data as $row) {
                            $detail_supp = $this->Bkrencanaagr_model->get_detail('id', $row->faktur_suppid, 'dt_supplier');
                            $get_ma = $this->Bkrencanaagr_model->get_detail('faktur_id', $row->id, 'trx_anggaran_faktur');
                            $detail_ma = $this->Bkrencanaagr_model->get_detail('id', $get_ma->minta_anggaranid, 'trx_agrplan');

                            $detail_anggaran[] = array(
                                'idCabang' => $pd . $row->id,
                                'cabang_code' => $row->faktur_no,//trx_fakturno,
                                'cabang_city' => "",
                                'cabang_name' => "",
                                'isCabang' => 0,
                                'isJenis' => 0,
                                'isData' => 1,
                                'displayName' => $detail_supp->ms_name,
                                'faktur_no' => $row->faktur_no,
                                'list_po' => $this->list_po($row->id, 1),
                                'list_tt' => $this->list_tt($row->id, 1),
//                                'faktur_ed' => $row->faktur_ed,
                                'tgldari' => mdate("%d/%M/%Y", strtotime($detail_ma->tgldari)),
                                'no_rekbg' => $this->no_rekbg($row->id, $row->faktur_bayar),
                                'faktur_bgstatus' => $row->faktur_bgstatus == 0 ? "-" : mdate("%d/%M/%Y", strtotime($this->Bkrencanaagr_model->get_detail('faktur_id', $row->id, 'trx_faktur_bayar')->faktur_bayared)),
                                'hp_cicilan_amt' => '',//$row->hp_cicilan_amt,
                                'iconCls' => 'icon-tree',
                                'leaf' => true,
                                'expanded' => false,
                            );
                        }
                    } else {
                        foreach ($data as $row) {
                            $detail_supp = $this->Bkrencanaagr_model->get_divisi($row->divisi);
                            $get_ma = $this->Bkrencanaagr_model->get_detail('faktur_id', $row->id, 'trx_anggaran_faktur');
                            $detail_ma = $this->Bkrencanaagr_model->get_detail('id', $row->ma_id, 'trx_agrplan');
                            if ($detail_ma->gr_keperluan != 0) {
                                $keperluan = $this->Bkrencanaagr_model->get_detail('id', $detail_ma->gr_keperluan, 'ms_group_keperluan')->grk_name;
                            } else {
                                $keperluan = '';
                            }
                            
                            if ($detail_ma->dtl_keperluan != 0) {
                                $dt_perlu = $this->Bkrencanaagr_model->get_detail('id', $detail_ma->dt_keperluan, 'dt_akun')->akun_name;
                            } else {
                                $dt_perlu = '';
                            }

                            if (intval($row->keterangan) == 0) {
                                $ket = $row->keterangan;
                            } else {
                                $ket = '';
                            }

                            $detail_anggaran[] = array(
                                'idCabang' => $pd . $row->id,
                                'cabang_code' => $row->id,
                                'cabang_city' => $row->ma_id,
                                'cabang_name' => "",
                                'isCabang' => 0,
                                'isJenis' => 0,
                                'isData' => 1,
                                'displayName' => $detail_supp,
                                'faktur_no' => $keperluan . ' ' . $dt_perlu . ' . Ket. Tambahan : ' . $ket,
                                'list_po' => "",
                                'list_tt' => $detail_ma->app_status,
                                'faktur_ed' => "",
                                'tgldari' => mdate("%d/%M/%Y", strtotime($detail_ma->tgldari)) . ' s.d. ' . mdate("%d/%M/%Y", strtotime($detail_ma->tglke)),
//                                'jadwalBayar' => $detail_ma->tgldari . ' s.d. ' . $detail_ma->tglke . '====='. $row->ma_id,
                                'no_rekbg' => $row->no_doc,
                                'faktur_bgstatus' => mdate("%d/%M/%Y", strtotime($detail_ma->tglke)),
                                'hp_cicilan_amt' => $row->nilai_trans,
                                'iconCls' => 'icon-tree',
                                'leaf' => true,
                                'expanded' => false,
                            );
                        }
                    }
                } else {
                    $detail_anggaran[] = array(
                        'idCabang' => $pd . "0001000",
                        'cabang_code' => $pd,
                        'cabang_city' => "",
                        'cabang_name' => "",
                        'isCabang' => 0,
                        'isJenis' => 0,
                        'isData' => 1,
                        'displayName' => "Tidak ada Data",
                        'faktur_no' => "",
                        'list_po' => "",
                        'list_tt' => "",
                        'faktur_ed' => "",
                        'tgldari' => "",
                        'no_rekbg' => "",
                        'faktur_bgstatus' => "",
                        'hp_cicilan_amt' => "",
                        'iconCls' => 'icon-tree',
                        'leaf' => true,
                        'expanded' => false
                    );
                }
            }
        }

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
        $data = $this->Bkrencanaagr_model->ma_process();
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
        if($dt_ma->mkr_pemeriksaan != 0) {
            $keterangan = "Rujukan a.n. " . $dt_ma->mkr_namapasien . " ke " . $dt_ma->mkr_rujukanke;
        } else {
            $nama_akun = $this->Bkrencanaagr_model->get_detail('id', $dt_ma->dtl_keperluan, 'dt_akun')->akun_name;
            $keterangan = $nama_akun. ', Ket. Tambahan: '.$dt_ma->keterangan;
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

        $del2[] = array('field' => 'minta_anggaranid', 'param' => 'where', 'operator' => '', 'value' => $id);
        $del2[] = array('field' => 'tipe_faktur', 'param' => 'where', 'operator' => '', 'value' => 1);
        $this->Bkrencanaagr_model->delete($del2, NULL, 'trx_anggaran_faktur');

        $del3[] = array('field' => 'ma_id', 'param' => 'where', 'operator' => '', 'value' => $id);
        $this->Bkrencanaagr_model->delete($del3, NULL, 'trx_data_nonfaktur');
        echo json_encode(array('success' => 'true', 'data' => NULL, 'message' => 'Data Berhasil Di Hapus', 'title' => 'Info'));
    }
}