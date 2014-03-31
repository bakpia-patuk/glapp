<?php

defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Description of data_model
 *
 * @author Coepoe
 */
class Ksmintakas_model extends MY_Model {

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
    
    function del_mintakas($id) {
        $opt2[] = array('field' => 'id', 'param' => 'where', 'operator' => '', 'value' => $id);
        $this->delete($opt2, NULL, 'trx_minta_kas');
        return TRUE;
    }
    
    function approve_mintakas($id) {
        $data = array(
            'trx_appr_status' => 1,
            'trx_appr_peg' => 1
        );

        $opt2[] = array('field' => 'id', 'param' => 'where', 'operator' => '', 'value' => $id);
        $this->update($data, $opt2, NULL, 'trx_minta_kas');

        return TRUE;
    }
}
