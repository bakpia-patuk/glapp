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

    function ma_process() {
//        $user = $this->ion_auth->user()->row();

        $ma_id = $this->input->post('id');
        $trsx_suppjenis = $this->input->post('trsx_suppjenis');
        $trx_supid = $this->input->post('trx_supid');
        $keperluan = $this->input->post('keperluan');
        $dtl_keperluan = $this->input->post('dtl_keperluan');
        $divisi = $this->input->post('divisi');
        $keterangan = $this->input->post('keterangan');
        $tgl1 = $this->input->post('tglDari');
        $tgl2 = $this->input->post('tglSampai');
        $trx_fakturno = $this->input->post('trx_fakturno');
        $trx_value = $this->money_formatter($this->input->post('trx_value'));
        $cara_bayar = $this->input->post('cara_bayar');
        $bg_no = $this->input->post('bg_no');
        $rek_no = $this->input->post('rek_no');
        $atas_nama = $this->input->post('rek_no');
        $rek_bank = $this->input->post('rek_bank');
        $bg_ed = $this->input->post('bg_ed');
//        $minggutrx = $this->input->post('minggutrx');
        if ($dtl_keperluan == 877) {
            $mkr_namapasien = $this->input->post('mkr_namapasien');
            $mkr_pemeriksaan = $this->input->post('mkr_pemeriksaan');
            $mkr_rujukanke = $this->input->post('mkr_rujukanke');
        } else {
            $mkr_namapasien = 0;
            $mkr_pemeriksaan = 0;
            $mkr_rujukanke = 0;
        }

        // di tabel rencana anggaran tidak ada column gr_keperluan, dt_keperluan
        $data_minta_anggaran = array(
            'trx_supid' => $trx_supid == 0 ? $trx_supid : $divisi,
            'trx_fakturno' => $trx_fakturno,
            'trx_nilai' => $trx_value,
            'tgldari' => mdate('%Y-%m-%d', strtotime($tgl1)),
            'tglke' => mdate('%Y-%m-%d', strtotime($tgl2)),
            'gr_keperluan' => $keperluan,
            'dtl_keperluan' => $dtl_keperluan,
            'keterangan' => $keterangan
        );

        $no_faktur = explode(";", $trx_fakturno);

        if ($ma_id == "") {
            $tgl_trx = array(
                'trsx_suppjenis' => $trsx_suppjenis,
                'tgl_trx' => date("Y-m-d H:i:s"),
                'trx_ed' => date("Y-m-d"),
                'mkr_pemeriksaan' => $mkr_pemeriksaan,
                'mkr_namapasien' => $mkr_namapasien,
                'mkr_rujukanke' => $mkr_rujukanke,
                'app_status' => 0
            );

            $data_merge = array_merge($data_minta_anggaran, $tgl_trx);
            $id = $this->insert($data_merge, 'trx_rencana_anggaran');

            $invoiceNo = sprintf('%06d', $id);
            $invoiceNo = 'MA-' . $invoiceNo;

            $opt2[] = array('field' => 'id', 'param' => 'where', 'operator' => '', 'value' => $id);
            $data_ref = array(
                'ref_trx' => $invoiceNo
            );
            $this->update($data_ref, $opt2, NULL, 'trx_rencana_anggaran');

            if ($trsx_suppjenis == 0) {
                for ($i = 0; $i < count($no_faktur) - 1; $i++) {
                    $data_faktur = array(
                        'faktur_id' => $no_faktur[$i],
                        'minta_anggaranid' => $id
                    );

                    $this->insert($data_faktur, 'trx_anggaran_faktur');
                }
            } else {
                $data_nonfaktur = array(
                    'ma_id' => $id,
                    'divisi' => $divisi,
                    'nilai_trans' => $trx_value,
                    'cara_bayar' => $cara_bayar,
                    'atas_nama' => $atas_nama,
                    'no_doc' => $cara_bayar == 1 ? "" : ($cara_bayar == 2 ? $rek_no : $bg_no),
                    'doc_ext' => $cara_bayar == 2 ? $rek_bank : 0,
                    'bg_ed' => $cara_bayar == 0 ? $bg_ed : "",
                    'keterangan' => $keterangan,
                    'cabang_id' => $this->user->cabang_id
                );

                $id_nonfaktur = $this->insert($data_nonfaktur, 'trx_data_nonfaktur');

                $data_faktur = array(
                    'faktur_id' => $id_nonfaktur,
                    'minta_anggaranid' => $id,
                    'tipe_faktur' => 1,
                );
                $this->insert($data_faktur, 'trx_anggaran_faktur');
            }
        } else {
            $opt2[] = array('field' => 'id', 'param' => 'where', 'operator' => '', 'value' => $ma_id);
            $this->update($data_minta_anggaran, $opt2, NULL, 'trx_rencana_anggaran');
            $id = $ma_id;
        }

//        for ($i = 0; $i < count($no_faktur) - 1; $i++) {
//            $faktur_status = array(
//                'status_faktur' => 1,
//            );
//
//            $opt[$i][] = array('field' => 'trx_fakturno', 'param' => 'where', 'operator' => '', 'value' => $no_faktur[$i]);
//            $this->update($faktur_status, $opt[$i], NULL, 'trx_data_faktur');
//        }

        $data_ret = array(
            'tgl_dari' => $tgl1,
            'tgl_ke' => $tgl2,
            'divisi' => $divisi
        );

        return $data_ret;
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
}
