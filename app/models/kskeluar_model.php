<?php

defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Description of data_model
 *
 * @author Coepoe
 */
class Kskeluar_model extends MY_Model {

    function __construct() {
        parent::__construct();
    }
    
    function get_divisi($id) {
        switch ($id) {
            case 1:
                return "PELAYANAN";
            case 2:
                return "MARKETING";
            case 3:
                return "KEUANGAN";
            case 4:
                return "LAB";
            case 5:
                return "SDM";
            case 6:
                return "IT";
            case 7:
                return "RUMAH TANGGA";
            default: 
                break;
        }
    }
    
    public function kastrx_list($record, $options) {
        $tablename = 'trx_kas';
        $datestring = "%Y-%m-%d";
        $listkm = array();
        $options['sortBy'] = 'id';
        $options['sortDirection'] = 'ASC';
        $results = $this->gets($record, $options, $tablename);

        if ($results != NULL) {
            foreach ($results as $row) {
                $datatgl = explode(' ', $row->kas_tgltrx);

                $listkm[] = array(
                    'id' => $row->id,
                    'kas_type' => $row->kas_type,
                    'no_ref_trx' => $row->no_ref_trx,
                    'kas_tgltrx_full' => $row->kas_tgltrx,
                    'kas_tgltrx' => mdate($datestring, strtotime($datatgl[0])),
                    'jam' => $datatgl[1],
                    'kas_bank' => $row->kas_bank,
                    'kas_grpkeperluan' => $row->kas_grpkeperluan,
                    'kas_dtlkeperluan' => $row->kas_dtlkeperluan,
//                    'keteranganKd' => $row->kas_grpkeperluan == 6 ? $this->get_detail('no_ref_trx', $row->no_ref_trx, 'trx_harian')->keterangan_trx : $this->get_detail('id', $row->kas_dtlkeperluan, 'master_keperluan_detail')->kd_name,
                    'kas_jumlah' => $row->kas_jumlah,
                    'kas_bayartype' => $row->kas_bayartype,
//                    'noBg' => $row->kas_bayartype == 0 ? $row->kas_nobayar : 0,
//                    'noRek' => $row->kas_bayartype == 1 ? $row->kas_nobayar : 0,
//                    'tglBgEd' => $row->kas_bged,
//                    'bankBg' => $row->kas_bankbg,
                    'kas_namabayar' => $row->kas_namabayar,
//                    'penerimaBgTtd' => $row->user_createsign,
                    'kas_kbapproval' => $row->kas_kbapproval,
                    'simpan_status' => $row->simpan_status,
                );
            }
            return $listkm;
        } else {
            return $listkm;
        }
    }
    
    public function get_minta_kas($record) {
        $tablename = 'trx_minta_kas';
        $list = array();
        $opt['sortBy'] = 'tgl_trx';
        $opt['sortDirection'] = 'DESC';
        $results = $this->gets($record, $opt, $tablename);

        if ($results != NULL) {
            foreach ($results as $key) {
                $list[] = array(
                    'id' => $key->id,
                    'tgl_trx' => explode(" ", $key->tgl_trx)[0],
                    'trx_divisi' => $key->trx_divisi,
                    'nama_divisi' => $this->get_divisi($key->trx_divisi),
                    'mk_keperluan' => $key->mk_keperluan,
                    'mk_detail' => $key->mk_detail,
//                    'kdDetail' => $key->mb_detailext,
//                    'refTrx' => $key->mb_exttable,
                    'mkr_pemeriksaan' => $key->mkr_pemeriksaan,
                    'mkr_namapasien' => $key->mkr_namapasien,
                    'mkr_rujukanke' => $key->mkr_rujukanke,
                    'trx_desc' => $key->trx_desc,
                    'trx_value' => $key->trx_value,
                    'trx_realisasi' => $key->trx_realisasi,
                    'trx_realstatus' => $key->trx_realstatus,
                    'trx_penerima' => $key->trx_penerima,
                    'trx_appr_status' => $key->trx_appr_status,
                    'trx_appr_peg' => $key->trx_appr_peg,
                    'cabang_id' => $key->cabang_id,
                    'status_simpan' => $key->status_simpan
                );
            }
            return $list;
        } else {
            return FALSE;
        }
    }
    
    function kk_process() {
        $datestring = "%Y-%m-%d %H:%i:%s";
        $time = date('H:i:s');

        $form = $this->input->post('formId');
        $id = $this->input->post('id');
        $type = $this->input->post('kkType');
        $id_minta_bayar = $this->input->post('idMintaBayar');
        $date = strtotime($this->input->post('kas_tgltrx') . ' ' . $time);
        $bank_name = 0;
        if ($type == 1) {
            $grp_keperluan = 9;
            $dtil_keperluan = 23;
        } else {
            $detail_mb = $this->get_detail('id', $id_minta_bayar, 'trx_minta_kas');
            $grp_keperluan = $detail_mb->mk_keperluan;
            $dtil_keperluan = $detail_mb->mk_detail;
        }
        $jumlah = $this->money_formatter($this->input->post('trx_value'));
        $bayar_type = 1;
        $bg_no = 0;
        $bg_ed = 0;
        $bg_nama = $this->input->post('kas_namabayar');
        $bg_bank = 0;

        if ($type != 1) {
            if ($id == "") {
                $data_trx_kas = array(
                    'kas_type' => $form,
                    'kas_tgltrx' => mdate($datestring, $date),
                    'no_ref_trx' => '',
                    'kas_anggaranid' => 0,
                    'kas_bank' => $bank_name,
                    'kas_grpkeperluan' => $grp_keperluan,
                    'kas_dtlkeperluan' => $dtil_keperluan,
                    'kas_jumlah' => $jumlah,
                    'kas_bayartype' => $bayar_type,
                    'kas_nobayar' => $bg_no,
                    'kas_namabayar' => $bg_nama,
                    'kas_bged' => $bg_ed,
                    'kas_bankbg' => $bg_bank,
                    'kas_akun' => $this->input->post('statusKas'),
                    'user_create' => $this->user->username,
                    'cabang_id' => $this->user->cabang_id,
                    'created' => date('Y-m-d H:i:s', now()),
                    'modified' => date('Y-m-d H:i:s', now()),
                    'simpan_status' => 1
                );

                $trx_ref = $this->insert_kas($data_trx_kas, $form);

                if ($trx_ref != FALSE) {
                    $data_trx_harian = array(
                        'tgl_trx' => mdate($datestring, $date),
                        'jumlah_trx' => $jumlah,
                        'no_ref_trx' => $trx_ref,
                        'keterangan_trx' => $detail_mb->trx_desc,
                        'jenis_trx' => $form,
                        'created' => date('Y-m-d H:i:s', now()),
                        'modified' => date('Y-m-d H:i:s', now()),
                    );

                    if (!$this->insert($data_trx_harian, 'trx_harian')) {
                        return FALSE;
                    } else {
                        $update_mb = array(
                            'trx_realisasi' => $detail_mb->trx_value,
                            'trx_realstatus' => $this->get_detail('no_ref_trx', $trx_ref, 'trx_kas')->id,
                            'modified' => date('Y-m-d H:i:s', now())
                        );

                        $optsx[] = array('field' => 'id', 'param' => 'where', 'operator' => '', 'value' => $id_minta_bayar);
                        if (!$this->update($update_mb, $optsx, NULL, 'trx_minta_kas')) {
                            return FALSE;
                        }
                    }
                } else {
                    return FALSE;
                }
            } else {
                $trx_ref = $this->get_detail('id', $id, 'trx_kas')->no_ref_trx;

                $data_trx_update = array(
                    'kas_grpkeperluan' => $grp_keperluan,
                    'kas_dtlkeperluan' => $dtil_keperluan,
                    'kas_jumlah' => $jumlah,
                    'modified' => date('Y-m-d H:i:s', now())
                );
                $opt[] = array('field' => 'id', 'param' => 'where', 'operator' => '', 'value' => $id);
                if ($this->update($data_trx_update, $opt, NULL, 'trx_kas')) {
                    $data_trx_harian = array(
                        'jumlah_trx' => $jumlah,
                        'keterangan_trx' => $detail_mb->trx_desc,
                        'modified' => date('Y-m-d H:i:s', now())
                    );
                    $opts[] = array('field' => 'no_ref_trx', 'param' => 'where', 'operator' => '', 'value' => $trx_ref);
                    if (!$this->update($data_trx_update, $opts, NULL, 'trx_harian')) {
                        return FALSE;
                    }
                } else {
                    return FALSE;
                }
            }
        } else {
            $invoiceNo = sprintf('%06d', $id);
            $list_faktur = explode(';', $this->input->post('noFaktur'));

            $invoice = 'KK-' . $invoiceNo . '-13';
            $trx_ref = $invoice;
//            $filename = 'assets/img_data/signNullKk.png';
//            $newfile = 'assets/ttd_trx/KK_' . $id . "_sign.png";

            $update_kas_faktur = array(
                'no_ref_trx' => $invoice,
                'kas_grpkeperluan' => $grp_keperluan,
                'kas_dtlkeperluan' => $dtil_keperluan,
                'kas_jumlah' => $jumlah,
                'kas_namabayar' => $bg_nama,
                'kas_akun' => 4,
//                'user_createsign' => $newfile,
                'simpan_status' => 1
            );

            $optf[] = array('field' => 'id', 'param' => 'where', 'operator' => '', 'value' => $id);
            if (!$this->update($update_kas_faktur, $optf, NULL, 'trx_kas')) {
                return FALSE;
            }

            $insert_trx_harian = array(
                'tgl_trx' => mdate($datestring, $date),
                'jumlah_trx' => $jumlah,
                'no_ref_trx' => $invoice,
                'keterangan_trx' => 'Kas Keluar untuk ',// . $this->get_detail('id', $dtil_keperluan, 'master_keperluan_detail')->kd_name,
                'jenis_trx' => $form,
                'created' => date('Y-m-d H:i:s', now()),
                'modified' => date('Y-m-d H:i:s', now()),
            );

            if (!$this->insert($insert_trx_harian, 'trx_harian')) {
                return FALSE;
            }

            for ($i = 0; $i < count($list_faktur) - 1; $i++) {
                $detail_fkt = $this->get_detail("id", $list_faktur[$i], "trx_faktur");

                $update_fkt = array(
                    'faktur_realisasi' => $detail_fkt->faktur_nototal,
                    'faktur_realstatus' => $id
                );

                $optk[$i][] = array('field' => 'id', 'param' => 'where', 'operator' => '', 'value' => $list_faktur[$i]);
                if (!$this->update($update_fkt, $optk[$i], NULL, 'trx_faktur')) {
                    return FALSE;
                }
            }
            //Jika menggunakan ttd digunakan
//            if (file_exists($filename)) {
//                if (!copy($filename, $newfile)) {
//                    return FALSE;
//                }
//            }
//
//            if (file_exists($filename)) {
//                if (!unlink($filename)) {
//                    return FALSE;
//                }
//            }
        }

        $noID = $this->get_detail('no_ref_trx', $trx_ref, 'trx_kas')->id;

        return $noID;
    }
    
    public function insert_kas($data, $type) {
        $id = $this->insert($data, 'trx_kas');

        $invoiceNo = sprintf('%06d', $id);
        $invoice = "";
        $newfile = "";
        if ($type == "bankmasuk" || $type == "3") {
            $invoice = 'BM-' . $invoiceNo . '-13';
            $filename = 'assets/img_data/signNullBmk.png';
            $newfile = $this->ion_auth->user()->row()->ttd_url;
        } else if ($type == "bankkeluar") {
            $invoice = 'BK-' . $invoiceNo . '-13';
            $filename = 'assets/img_data/signNullBkr.png';
            $newfile = $this->ion_auth->user()->row()->ttd_url;
        } else if ($type == "kasmasuk") {
            $invoice = 'KM-' . $invoiceNo . '-13';
            $filename = 'assets/img_data/signNullKm.png';
            $newfile = 'assets/ttd_trx/KM_' . $id . "_sign.png";
        } else {
            $invoice = 'KK-' . $invoiceNo . '-13';
//            $filename = 'assets/img_data/signNullKk.png';
//            $newfile = 'assets/ttd_trx/KK_' . $id . "_sign.png";
        }


        $generate = array(
            'no_ref_trx' => $invoice,
            'user_createsign' => $newfile,
        );

        //Jika menggunakan ttd digunakan
//        if (file_exists($filename)) {
//            if (!copy($filename, $newfile)) {
//                return FALSE;
//            }
//        }
//
//        if (file_exists($filename)) {
//            unlink($filename);
//        }

        $this->db->where('id', $id);
        $this->db->update('trx_kas', $generate);

        return $invoice;
    }
}
