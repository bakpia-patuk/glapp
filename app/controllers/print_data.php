<?php

if (!defined('BASEPATH')) {
    exit('No direct script access allowed');
}

/**
 * Description of data_model
 *
 * @author Coepoe
 */
class Print_data extends Auth_Controller {

    function __construct() {
        parent::__construct();
        $this->load->model('Kshitungbon_model');
    }
    
    // ????
    public function print_kas($id) {
//        $detail_trx = $this->Amodel->get_detail('id', $id, 'trx_kas');
//        //var_dump($detail_Trx);
//        $type = $detail_trx->kas_type;
//        $kasbon = $detail_trx->kas_akun;
//        $data['detail_trx'] = $detail_trx;
//        $data['keperluan_nama'] = $this->Amodel->get_detail('id', $detail_trx->kas_dtlkeperluan, 'master_keperluan_detail')->kd_name;
//        $data['cabang'] = $this->Amodel->get_detail('id', $detail_trx->cabang_id, 'master_cabang')->cabang_name;
//        $data['user'] = strtoupper($detail_trx->user_create);
//        $data['user1'] = strtoupper($detail_trx->kas_namabayar);
//        $data['ttd1'] = $detail_trx->user_createsign;
//        $data['ttd2'] = $detail_trx->user_createsign;
//        $data['judul'] = $type == 'kasmasuk' ? 'BUKTI KAS MASUK' : ($kasbon == 5 ? "BUKTI KAS BON" : "BUKTI KAS KELUAR");
//        $data['keterangan'] = $type == 'kasmasuk' ? 'Telah terima uang' : 'Telah dikeluarkan uang ';
//        $data['kol1'] = $type == 'kasmasuk' ? 'Penerima' : 'Keuangan';
//        $data['kol2'] = $type == 'kasmasuk' ? 'Pengirim' : 'Penerima';

        $this->load->view('kas_invoice', $data);
    }
}