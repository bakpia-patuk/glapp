<?php

defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Description of data_model
 *
 * @author Coepoe
 */
class Ksmasuk_model extends MY_Model {

    function __construct() {
        parent::__construct();
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
//    
//    function cek_allkb($id) {
//        $this->db->select_sum('jumlah_trx');
//        $this->db->from('trx_detail_kasbon');
//        $this->db->where('kasbon_id', $id);
//        $query = $this->db->get();
//
//        return $query->row()->jumlah_trx;
//    }
}
