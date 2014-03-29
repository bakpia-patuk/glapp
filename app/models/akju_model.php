<?php

defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Description of data_model
 *
 * @author Coepoe
 */
class Akju_model extends MY_Model {

    function __construct() {
        parent::__construct();
    }

    public function jurnal_list($record, $options) {
        $tablename = 'trx_jurnal_harian';
        $listjurnal = array();
        $options['sortBy'] = 'no_ref_trx';
        $options['sortDirection'] = 'ASC';
        $results = $this->gets($record, $options, $tablename);
        $user = $this->ion_auth->user()->row();

        if ($results != NULL) {
            foreach ($results as $row) {
                $rowtglJurnal = explode(' ', $row->tgl_trx);
                $akun_dtl = $this->get_detail('id', $row->id_akun, 'dt_akun');
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
                    'noBk' => $detail_trx != NULL ? explode('-nobk-', $detail_trx->keterangan_trx)[1] : 0,
                    'typeTrx' => $detail_trx->jenis_trx,
                    'jumlahTrxKas' => $detail_trx->jumlah_trx,
                    //JURNAL HARIAN
                    'idJurnal' => $row->id,
                    'tglJurnalFull' => $row->tgl_trx,
                    'tglJurnal' => $rowtglJurnal[0],
                    'jamJurnal' => $rowtglJurnal[1],
                    'idAkun' => (int) $row->id_akun,
                    'codeAkun' => $this->format_akun_titik($akun_dtl->akun_code),
                    'namaAkun' => $akun_dtl->akun_name,
                    'groupAkun' => $akun_dtl->akun_group,
                    'kredit' => $kredit,
                    'debet' => $debet,
                    'status_db' => $debet != 0 ? 1 : 0,
                    'jumlahTrx' => $kredit == 0 ? $debet : $kredit,
                    'keterangan' => strtoupper($row->uraian),
                    'noRefTrx' => $row->no_ref_trx,
                    'typeJurnal' => $row->jurnal_type,
                    'apprStat' => $row->status_app,
                    'cabangId' => $row->cabang,
                    'cabangName' => $this->get_detail('id', $row->cabang, 'dt_cabang')->cabang_name,
                    'userId' => $row->peg_id,
                    'userCreate' => $row->user_create
                );
            }
            return $listjurnal;
        } else {
            return FALSE;
        }
    }
}
