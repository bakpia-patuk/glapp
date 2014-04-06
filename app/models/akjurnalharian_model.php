<?php

defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Description of data_model
 *
 * @author Coepoe
 */
class Akjurnalharian_model extends MY_Model {

    function __construct() {
        parent::__construct();
    }

    public function jurnal_list($record, $options) {
        $tablename = 'trx_jurnal_harian';
        $listjurnal = array();
        $options['sortBy'] = 'no_ref_trx';
        $options['sortDirection'] = 'ASC';
        $results = $this->gets($record, $options, $tablename);
        $user = $this->user;

        if ($results != NULL) {
            foreach ($results as $row) {
                $rowtglJurnal = explode(' ', $row->tgl_trx);
//                $akun_dtl = $this->get_detail('id', $row->id_akun, 'dt_akun');
                $debet = $row->trx_debet;
                $kredit = $row->trx_kredit;
                $detail_trx = $this->get_detail('no_ref_trx', $row->no_ref_trx, 'trx_harian');
                if ($detail_trx != NULL) {
                    $detail_trx = $detail_trx;
                } else {
                    $detail_trx = NULL;
                }

                $listjurnal[] = array(
                    //TRX KAS
                    'id' => $detail_trx != NULL ? $detail_trx->id : 0,
//                    'noBk' => $detail_trx != NULL ? explode('-nobk-', $detail_trx->keterangan_trx)[1] : 0,
                    'jenis_trx' => $detail_trx->jenis_trx,
                    'jumlah_trx' => $detail_trx->jumlah_trx,
                    //JURNAL HARIAN
                    'idJurnal' => $row->id,
                    'tgl_trx' => $row->tgl_trx,
                    'tglJurnal' => $rowtglJurnal[0],
                    'jamJurnal' => $rowtglJurnal[1],
                    'id_akun' => (int) $row->id_akun,
//                    'codeAkun' => $this->format_akun_titik($akun_dtl->akun_code),
//                    'akun_name' => $akun_dtl->akun_name,
//                    'akun_group' => $akun_dtl->akun_group,
                    'kredit' => $kredit,
                    'debet' => $debet,
                    'status_db' => $debet != 0 ? 1 : 0,
                    'jumlahTrx' => $kredit == 0 ? $debet : $kredit,
                    'uraian' => strtoupper($row->uraian),
                    'no_ref_trx' => $row->no_ref_trx,
                    'jurnal_type' => $row->jurnal_type,
                    'status_app' => $row->status_app,
                    'cabang' => $row->cabang,
                    'cabangName' => $this->get_detail('id', $row->cabang, 'dt_cabang')->cabang_alias,
                    'peg_id' => $row->peg_id,
                    'user_create' => $row->user_create
                );
            }
            return $listjurnal;
        } else {
            return FALSE;
        }
    }
    
    function format_akun_titik($kode_akun) {
        //AKUN TITIK TITIK
        $a = "0";
        $b = "";
        $c = strlen($kode_akun);

        for ($z = $c; $z < 11; $z++) {
            $b .= $a;
        }

        $newKode = $kode_akun . $b;

        $first = substr($newKode, 0, 3);
        $titik_satu = str_split($first, 1);
        $result1 = implode('.', $titik_satu);

        $second = substr($newKode, -8);
        $titik_dua = str_split($second, 2);
        $result2 = implode('.', $titik_dua);

        return $result1 . '.' . $result2;
        //return $newKode;
    }
    
    function return_jurnal_data($id) {
        $return_data = $this->Akjurnalharian_model->get_detail('id', $id, 'trx_harian');
        $detail_jurnal = $this->Akjurnalharian_model->get_detail('no_ref_trx', $return_data->no_ref_trx, 'trx_jurnal_harian');
        $no_bk = explode('-nobk-', $return_data->keterangan_trx);
        $tgl = explode(' ', $return_data->tgl_trx);

        if ($return_data->jenis_trx == 2 || $return_data->jenis_trx == 3) {
            $bank_akun = $detail_jurnal->id_akun;
        } else {
            $bank_akun = 0;
        }

        $ret_array = array(
            'id' => $return_data->id,
            'typeTrx' => $return_data->jenis_trx,
            'bankAkun' => $bank_akun,
            'noBk' => $no_bk[1],
            'tglJurnal' => $tgl[0],
            'jumlahTrxKas' => $detail_jurnal->trx_kredit == 0 ? $detail_jurnal->trx_debet : $detail_jurnal->trx_kredit,
            'keterangan' => $no_bk[0]
        );

        return $ret_array;
    }
    
    function jm_process($data) {
        $id_trx = $data;
        if ($id_trx == 0) {
            if ($this->new_jurnal($data)) {
                return TRUE;
            } else {
                return FALSE;
            }
        } else {
            $trx_detail = $this->get_detail('id', $id_trx, 'trx_harian');
            $check[] = array('field' => 'no_ref_trx', 'param' => 'where', 'operator' => '', 'value' => $trx_detail->no_ref_trx);
            if ($this->gets($check, NULL, 'trx_jurnal_harian') == NULL) {
                return FALSE;
            } else {
                $set_status = array(
                    'simpan_status' => 1
                );
                $upd[] = array('field' => 'no_ref_trx', 'param' => 'where', 'operator' => '', 'value' => $trx_detail->no_ref_trx);
                if ($this->update($set_status, $upd, NULL, 'trx_jurnal_harian')) {
                    return TRUE;
                }
            }
        }
    }
}
