<?php

defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Description of data_model
 *
 * @author Coepoe
 */
class Bkkeluar_model extends MY_Model {

    function __construct() {
        parent::__construct();
    }

    public function banktrx_list($record, $options) {
        $tablename = 'trx_kas';
        $datestring = "%Y-%m-%d";
        $listkm = array();
        $options['sortBy'] = 'id';
        $options['sortDirection'] = 'ASC';
        $results = $this->gets($record, $options, $tablename);
//        $user = $this->ion_auth-user;

        if ($results != NULL) {
            foreach ($results as $row) {
                $datatgl = explode(' ', $row->kas_tgltrx);
//                if ($row->kas_dtlkeperluan == 19 || $row->kas_dtlkeperluan == 4) {
//                    $keterangan = $this->get_detail('id', $row->kas_dtlkeperluan, 'master_keperluan_detail')->kd_name;
//                } else {
//                    $keterangan = $this->get_detail('id', $row->kas_dtlkeperluan, 'list_akun_' . $user->cabang_id)->akun_name;
//                }

                $listkm[] = array(
                    'id' => $row->id,
                    'formId' => $row->kas_type,
                    'no_ref_trx' => $row->no_ref_trx,
                    'tglTransaksiFull' => $row->kas_tgltrx,
                    'tglTransaksi' => mdate($datestring, strtotime($datatgl[0])),
                    'jam' => $datatgl[1],
                    'kas_bank' => $row->kas_bank,
                    'kas_grpkeperluan' => $row->kas_grpkeperluan,
//                    'namaKd' => $row->kas_dtlkeperluan,
                    'keteranganKd' => '',//$keterangan,
                    'kas_jumlah' => $row->kas_jumlah,
                    'kas_bayartype' => $row->kas_bayartype,
                    'noBg' => $row->kas_bayartype == 0 ? $row->kas_nobayar : 0,
                    'noRek' => $row->kas_bayartype == 1 ? $row->kas_nobayar : 0,
                    'kas_bged' => $row->kas_bged,
                    'kas_bankbg' => $row->kas_bankbg,
                    'kas_namabayar' => $row->kas_namabayar,
                    'user_createsign' => $row->user_createsign,
                    'statusKb' => $row->kas_kbapproval,
                    'simpan_status' => $row->simpan_status,
                );
            }
            return $listkm;
        } else {
            return $listkm;
        }
    }
    
    function bank_process() {
        $datestring = "%Y-%m-%d %H:%i:%s";
        $time = date('H:i:s');

        $form = $this->input->post('formId');
        $id = $this->input->post('id');
        $date = strtotime($this->input->post('tglTransaksi') . ' ' . $time);
        $bank_name = $this->input->post('kas_bank');
        $grp_keperluan = $this->input->post('kas_grpkeperluan');
//        $dtil_keperluan = $this->input->post('namaKd');
        $jumlah = $this->money_formatter($this->input->post('kas_jumlah'));
        $bayar_type = 0;
        $bg_no = $this->input->post('noBg');
        $bg_ed = $this->input->post('kas_bged');
        $bg_nama = $this->input->post('kas_namabayar');
        $bg_bank = $this->input->post('kas_bankbg');
        $keterangan_string = 'Bank keluar dari ';

        if ($id == "") {
            $data_trx_kas = array(
                'kas_type' => $form,
                'kas_tgltrx' => mdate($datestring, $date),
                'no_ref_trx' => '',
                'kas_anggaranid' => 0,
                'kas_bank' => $bank_name,
                'kas_grpkeperluan' => $grp_keperluan,
                'kas_dtlkeperluan' => 0,//$dtil_keperluan,
                'kas_jumlah' => $jumlah,
                'kas_bayartype' => $bayar_type,
                'kas_nobayar' => $bg_no,
                'kas_namabayar' => $bg_nama,
                'kas_bged' => $bg_ed,
                'kas_bankbg' => $bg_bank,
                'kas_akun' => 0,
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
                    'keterangan_trx' => $keterangan_string,// . $this->get_detail('id', $dtil_keperluan, 'master_keperluan_detail')->kd_name,
                    'jenis_trx' => $form,
                    'created' => date('Y-m-d H:i:s', now()),
                    'modified' => date('Y-m-d H:i:s', now()),
                );

                if (!$this->insert($data_trx_harian, 'trx_harian')) {
                    return FALSE;
                }
            } else {
                return FALSE;
            }
        } else {
            $trx_ref = $this->get_detail('id', $id, 'trx_kas')->no_ref_trx;

            $data_trx_update = array(
                'kas_bank' => $bank_name,
                'kas_grpkeperluan' => $grp_keperluan,
                'kas_dtlkeperluan' => 0,//$dtil_keperluan,
                'kas_jumlah' => $jumlah,
                'kas_nobayar' => $bg_no,
                'kas_namabayar' => $bg_nama,
                'kas_bged' => $bg_ed,
                'kas_bankbg' => $bg_bank,
                'modified' => date('Y-m-d H:i:s', now())
            );
            $opt[] = array('field' => 'id', 'param' => 'where', 'operator' => '', 'value' => $id);
            if ($this->update($data_trx_update, $opt, NULL, 'trx_kas')) {
                $data_trx_harian = array(
                    'jumlah_trx' => $jumlah,
                    'keterangan_trx' => $keterangan_string,// . $this->get_detail('id', $dtil_keperluan, 'master_keperluan_detail')->kd_name,
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

        $noID = $this->get_detail('no_ref_trx', $trx_ref, 'trx_kas')->id;

        return $noID;
    }
    
    public function insert_kas($data) {
        $id = $this->insert($data, 'trx_kas');

        $invoiceNo = sprintf('%06d', $id);
        $invoice = 'BK-' . $invoiceNo . '-13';
//        $filename = 'assets/img_data/signNullBmk.png';
//        $newfile = $this->ion_auth->user()->row()->ttd_url;


        $generate = array(
            'no_ref_trx' => $invoice,
            'user_createsign' => ''//$newfile,
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
