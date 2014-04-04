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
    
    function anggaran_process() {
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
            if ($trx_jenisbayar == 1001) {
                $no_faktur = explode(';', $trx_agrdata);
                for ($i = 0; $i < count($no_faktur) - 1; $i++) {
                    $status_faktur = array(
                        'faktur_agrstat' => 1,
                        'faktur_agrid' => $id
                    );

                    $opts[$i][] = array('field' => 'faktur_no', 'param' => 'where', 'operator' => '', 'value' => $no_faktur[$i]);
                    if (!$this->update($status_faktur, $opts[$i], NULL, 'trx_faktur')) {
                        return false;
                    }
                }
            } else if ($trx_jenisbayar == 1000) {
                $no_bg = explode(';', $trx_agrdata);
                for ($j = 0; $j < count($no_bg) - 1; $j++) {
                    $status_bg = array(
                        'faktur_byrrealisasi' => 1,
                        'faktur_byragr' => $id
                    );

                    $opts[$j][] = array('field' => 'faktur_bayarno', 'param' => 'where', 'operator' => '', 'value' => $no_bg[$j]);
                    if (!$this->update($status_bg, $opts[$j], NULL, 'trx_faktur_bayar')) {
                        return false;
                    }

                    $daftar_fk = $this->gets($opts[$j], NULL, 'trx_faktur_bayar');
                    $ck = 0;

                    foreach ($daftar_fk as $row) {
                        $status_faktur = array(
                            'faktur_agrstat' => 1,
                            'faktur_agrid' => $id
                        );

                        $optn[$ck][] = array('field' => 'id', 'param' => 'where', 'operator' => '', 'value' => $row->faktur_id);
                        if (!$this->update($status_faktur, $optn[$ck], NULL, 'trx_faktur')) {
                            return false;
                        }
                        $ck++;
                    }
                }
            } else if ($trx_jenisbayar == 4) {
                $no_faktur = explode(';', $trx_agrdata);
                for ($s = 0; $s < count($no_faktur) - 1; $s++) {
                    $status_faktur = array(
                        'faktur_agrid' => $id
                    );

                    $optk[$s][] = array('field' => 'faktur_no', 'param' => 'where', 'operator' => '', 'value' => $no_faktur[$s]);
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

                    $optc[$z][] = array('field' => 'faktur_no', 'param' => 'where', 'operator' => '', 'value' => $no_faktur[$z]);
                    if (!$this->update($status_faktur, $optc[$z], NULL, 'trx_faktur')) {
                        return false;
                    }
                }
            }
        } else {
            $no_permintaan = explode(';', $trx_agrdata);
            for ($k = 0; $k < count($no_permintaan) - 1; $k++) {
                $realisasi = $this->get_detail('id', $no_permintaan[$k], 'trx_data_nonfaktur')->nilai_trans;
                $status_faktur = array(
                    'trx_realisasi' => $realisasi,
                    'agr_status' => 1,
                   'agr_id' => $id
                );

                $optd[$k][] = array('field' => 'id', 'param' => 'where', 'operator' => '', 'value' => $no_permintaan[$k]);
                if (!$this->update($status_faktur, $optd[$k], NULL, 'trx_data_nonfaktur')) {
                    return false;
                }
            }
        }

        return $id;
    }
}