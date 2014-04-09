<?php

/**
 * Description of data_model
 *
 * @author Azelia
 */
if (!defined('BASEPATH')) {
    exit('No direct script access allowed');
}

class Dv_txbrterima extends Auth_Controller {

    function __construct() {
        parent::__construct();
        $this->load->model('Dv_txbrterima_model');
        $this->Dv_txbrterima_model->cms_db = $this->load->database('outgoing', TRUE);
    }
    public function pengdiv_bm_complete() {
        $id = $this->input->post('id');
        $divisi = $this->input->post('divisi');

        $opts[] = array('field' => 'pengdiv_id', 'param' => 'where', 'operator' => '', 'value' => $id);
        $opts[] = array('field' => 'terima_status', 'param' => 'where', 'operator' => '', 'value' => 0);
        $data = $this->Dv_txbrterima_model->gets($opts, NULL, 'trx_pengdivisi_detail');

        if ($data != NULL) {
            $data_upd = array(
                'terima_status' => 2,
            );
        } else {
            $data_upd = array(
                'terima_status' => 1,
            );
        }

        $opt[] = array('field' => 'id', 'param' => 'where', 'operator' => '', 'value' => $id);

        if ($this->Dv_txbrterima_model->update($data_upd, $opt, NULL, 'trx_pengdivisi')) {
            $upd_stock = array(
                'simpan_status' => 1,
            );

            $optx[] = array('field' => 'id_cabang', 'param' => 'where', 'operator' => '', 'value' => $this->ion_auth->user()->row()->cabang_id);
            $optx[] = array('field' => 'id_ruang', 'param' => 'where', 'operator' => '', 'value' => $this->input->post('ruangan'));
            $optx[] = array('field' => 'simpan_status', 'param' => 'where', 'operator' => '', 'value' => 0);
            if ($this->Dv_txbrterima_model->update($upd_stock, $optx, NULL, 'trx_stok_div')) {
                $rt_data = array(
                    'divisi' => $divisi
                );

                echo json_encode(array('success' => 'true', 'data' => $rt_data, 'msg' => 'Data Berhasil di Update'));
            } else {
                echo json_encode(array('success' => 'false', 'title' => 'Error', 'msg' => $this->catch_db_err()));
            }
        } else {
            echo json_encode(array('success' => 'false', 'title' => 'Error', 'msg' => $this->catch_db_err()));
        }
    }
    public function pengdiv_bm() {
        $id = $this->input->post('id');
        $id_barang = $this->input->post('barangCabangId');
        $qty_kirim = $this->input->post('jumlah');
        $divisi = $this->input->post('divisi');

        $data = array(
            'barang_qty_terima' => $qty_kirim,
            'terima_status' => 1,
            'tgl_terima' => mdate("%Y-%m-%d", now()),
            'user_terima' => $this->ion_auth->user()->row()->id
        );

        $opts[] = array('field' => 'pengdiv_id', 'param' => 'where', 'operator' => '', 'value' => $id);
        $opts[] = array('field' => 'barang_id', 'param' => 'where', 'operator' => '', 'value' => $id_barang);

        if ($this->Dv_txbrterima_model->update($data, $opts, NULL, 'trx_pengdivisi_detail')) {
            $record[] = array('field' => 'id_cabang', 'param' => 'where', 'operator' => '', 'value' => $this->ion_auth->user()->row()->cabang_id);
            $record[] = array('field' => 'id_ruang', 'param' => 'where', 'operator' => '', 'value' => $this->input->post('ruangan'));
            $get_tambah = $this->dmodel->get_item_div($record, $id_barang, 1);
            $get_min = $this->dmodel->get_item_div($record, $id_barang, 0);

            $data_stok = array(
                'id_ruang' => $this->input->post('ruangan'),
                'id_cabang' => $this->ion_auth->user()->row()->cabang_id,
                'id_barang' => $id_barang,
                'jmlh_stok' => $get_tambah - $get_min + $qty_kirim,
                'jenis_trx' => 1,
                'trx_stok' => $qty_kirim,
                'created' => mdate("%Y-%m-%d %H:%i:%s", now()),
                'modified' => mdate("%Y-%m-%d %H:%i:%s", now()),
                'simpan_status' => 0
            );

            if ($this->Dv_txbrterima_model->insert($data_stok, 'trx_stok_div')) {
                $rt_data = array(
                    'idPeng' => $id,
                    'divisi' => $divisi
                );

                echo json_encode(array('success' => 'true', 'data' => $rt_data, 'msg' => 'Data Berhasil di Update'));
            } else {
                echo json_encode(array('success' => 'false', 'title' => 'Error', 'msg' => $this->catch_db_err()));
            }
        } else {
            echo json_encode(array('success' => 'false', 'title' => 'Error', 'msg' => $this->catch_db_err()));
        }
    }
}