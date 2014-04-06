<?php

/**
 * Description of data_model
 *
 * @author Azelia
 */
if (!defined('BASEPATH')) {
    exit('No direct script access allowed');
}

class Dv_txbrkeluar extends Auth_Controller {

    function __construct() {
        parent::__construct();
        $this->load->model('Dv_txbrkeluar_model');
        $this->Dv_txbrkeluar_model->cms_db = $this->load->database('outgoing', TRUE);
    }
    public function pengdiv_bk() {
        $user = $this->ion_auth->user()->row();
        $id_barang = $this->input->post('pengBarang');
        $qty_kirim = $this->input->post('jumlah');
        $ruang_keluar = $this->input->post('idRuang');

        $checking_stok = $this->Dv_txbrkeluar_model->get_last_stockdiv($id_barang, $ruang_keluar);

        if ($checking_stok > 0) {
            if ($qty_kirim > $checking_stok) {
                echo json_encode(array('success' => 'false', 'title' => 'Error', 'msg' => 'Jumlah yang anda keluarkan melebihi jumlah stock'));
                return;
            } else {
                $stok_max_min = $this->pmodel->get_detail('id', $id_barang, 'master_item_' . $user->cabang_id); //CEK STOK MAX MIN

                if ($checking_stok < $stok_max_min->mi_minstock) {
                    echo json_encode(array('success' => 'false', 'title' => 'Error', 'msg' => 'Barang stock anda di bawah stok minimal'));
                    return;
                } else {
                    echo json_encode(array('success' => 'true', 'title' => 'Info', 'msg' => 'Barang Ada'));
                }
            }
        } else {
            echo json_encode(array('success' => 'false', 'title' => 'Error', 'msg' => 'Anda tidak mempunyai stock untuk dikeluarkan'));
        }
    }
}