<?php

defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Description of data_model
 *
 * @author Coepoe
 */
class Dv_txpengadaan_model extends MY_Model {

    function __construct() {
        parent::__construct();
    }

    public function get_item($record, $options, $tablename) {
        $listitem = array();
        $results = $this->gets($record, $options, $tablename);

        if ($results != NULL) {
            foreach ($results as $row) {

                $item_dtl = $this->get_detail($param = 'id', $row->mi_parent_id, $tablename);

                $listitem[] = array(
                    'id' => $row->id,
                    'itemCode' => $this->format_item_titik($row->mi_kode),
                    'itemRender' => $row->mi_kode . ' - ' . $row->mi_name,
                    'itemCodeOld' => $row->mi_kode,
                    'itemName' => $row->mi_name,
                    'itemParent' => $row->mi_parent_id == 0 ? '' : $row->mi_parent_id,
                    'itemParentName' => '-',
                    'itemMerk' => $row->mi_merk,
                    'itemMerkName' => $this->get_detail('id', $row->mi_merk, 'dt_merk') != NULL ? ($this->get_detail('id', $row->mi_merk, 'dt_merk')->merk_name) : 'Tidak Ada Merk',
                    'itemCatalog' => $row->mi_katalog,
                    'itemKemDef' => '-',
                    'isChild' => $row->mi_child_stat,
                    'isPpn' => $row->mi_ppn,
                   
                    'hargaItem' => $row->mi_item_price,
                    'itemCurr' => $row->mi_curr,
                    'itemBarcode' => $row->mi_barcode,
                    'itemDisc' => $row->mi_diskon,
                    'isNoLot' => $row->mi_nolot,
                    'itemStatus' => $row->mi_inv_stat,
                    'persediaanStatus' => $row->mi_pengstat,
                    'itemPosition' => $row->mi_loc,
                    'itemAktif' => $row->mi_active,
                    'itemNetto' => $row->mi_hpp,
                );
            }
            return $listitem;
        } else {
            return FALSE;
        }
    }
    function format_item_titik($kode_akun) {
        //AKUN TITIK TITIK
        $a = "0";
        $b = "";
        $c = strlen($kode_akun);

        for ($z = $c; $z < 17; $z++) {
            $b .= $a;
        }

        $newKode = $kode_akun . $b;

        $first = substr($newKode, 0, 3);
        $titik_satu = str_split($first, 1);
        $result1 = implode('.', $titik_satu);

        $second = substr($newKode, -14);
        $titik_dua = str_split($second, 2);
        $result2 = implode('.', $titik_dua);

        return $result1 . '.' . $result2;
        //return $newKode;
    }
    public function approve_peng($param, $id) {
        $data = array($param => 1);
        
        $params1[] = array('field' => 'id', 'param' => 'where', 'operator' => '', 'value' => $id);
        $result = $this->update($data, $params1, NULL, 'trx_pengadaan_div');
        if($param=='peng_statusmgr'){
            $data_pengadaan = $this->get($params1,NULL,'trx_pengadaan_div');
            $id_lama = $data_pengadaan->id;
            unset($data_pengadaan->no);
            unset($data_pengadaan->id);
            $data_pengadaan->peng_type=1;
            $no = $this->insert($data_pengadaan,'trx_pengadaan');

            $detail_cabang = $this->get_detail('id', $data_pengadaan->cabang_id, 'dt_cabang');
            $no_peng = sprintf('%06d', $no) . '/' . $detail_cabang->cabang_code . '/' . mdate('%Y%m%d', now());
            $id = $no.'.'.$data_pengadaan->cabang_id;
            
            $data_ref = array(
                'no_pengadaan' => $no_peng
            );
            

            $params3[] = array('field' => 'id', 'param' => 'where', 'operator' => '', 'value' => $id);
            $this->update($data_ref, $params3, NULL, 'trx_pengadaan');

            $params4[] = array('field' => 'id', 'param' => 'where', 'operator' => '', 'value' => $id_lama);
            $data_ref = array(
                'peng_id' => $id
            );
            $this->update($data_ref, $params2, NULL, 'trx_pengadaan_div');
            $params2[] = array('field' => 'pengadaan_id', 'param' => 'where', 'operator' => '', 'value' => $id_lama);
            $data_detail = $this->gets($params2, NULL, 'pengadaan_detail');
            if($data_detail){
                foreach ($data_detail as $key) {
                    unset($key->id);
                    unset($key->no);
                    $key->pengadaan_id = $id;
                    $this->insert($key,'trx_pengadaan_detail');
                }
            }

        }
        
        
        return TRUE;
    }
}