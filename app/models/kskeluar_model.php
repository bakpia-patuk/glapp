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
}
