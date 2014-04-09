<?php

/**
 * Description of data_model
 *
 * @author Azelia
 */
if (!defined('BASEPATH')) {
    exit('No direct script access allowed');
}

class Gd_po extends Auth_Controller {

    function __construct() {
        parent::__construct();
        $this->load->model('Gdpo_model');
        $this->Gdpo_model->cms_db = $this->load->database('outgoing', TRUE);
    }

    public function reset() {
        $insert = $this->input->post(NULL, TRUE);

        if ($insert['id'] != 0) {
            $params[] = array('field' => 'id', 'param' => 'where', 'operator' => '', 'value' => $insert['id']);
            if (!$this->Gdpo_model->delete($params, NULL, 'trx_po')) {
                echo json_encode(array('success' => 'false', 'data' => NULL, 'title' => 'Info', 'msg' => $this->catch_db_err()));
                return;
            }

            $data = array(
                'po_status' => 0,
                'po_id' => 0
            );

            $param[] = array('field' => 'po_id', 'param' => 'where', 'operator' => '', 'value' => $insert['id']);
            if (!$this->Gdpo_model->update($data, $param, NULL, 'trx_pengadaan_detail')) {
                echo json_encode(array('success' => 'false', 'data' => NULL, 'title' => 'Info', 'msg' => $this->catch_db_err()));
                return;
            }
        }

        echo json_encode(array('success' => 'true', 'data' => NULL, 'title' => 'Info', 'msg' => 'Reset All Data'));
    }

    public function save() {
        $insert = $this->input->post(NULL, TRUE);

        if ($insert['id'] == 0) {
            echo json_encode(array('success' => 'false', 'data' => NULL, 'title' => 'ERROR', 'msg' => 'Anda belum melakukan transaksi'));
            return;
        }

        $data = array(
            'po_ed' => mdate('%Y-%m-%d', strtotime($insert['po_ed'])),
            'po_suppid' => $insert['po_suppid'],
            'po_supp_email' => $insert['po_supp_email'],
            'po_value' => $this->Gdpo_model->standard_money($insert['po_value']),
            'po_isangsuran' => $insert['po_isangsuran'],
            'po_angdp' => 0,
            'po_angqty' => 0,
            'po_angvalue' => 0,
            'po_usersign' => $this->user->ttd_url,
            'po_ttstatus' => 0,
            'po_tfstatus' => 0,
            'po_simpanstatus' => 1
        );

        $params1[] = array('field' => 'id', 'param' => 'where', 'operator' => '', 'value' => $insert['id']);
        if (!$this->Gdpo_model->update($data, $params1, NULL, 'trx_po')) {
            echo json_encode(array('success' => 'false', 'data' => NULL, 'title' => 'Info', 'msg' => $this->catch_db_err()));
            return;
        }

        //Insert Data PO on Outgoing
        $data_po = $this->Gdpo_model->get($params1, NULL, 'trx_po');

        $data_json = json_encode($data_po);
                
        $data_outgoing = array();
        
        $data_outgoing['jumlah'] = 1;
        
        $data_outgoing['tujuan'] = $data_po->po_cabangid;
        
        $data_outgoing['id_cabang'] = $this->user->cabang_id;

        $no=$this->Gdpo_model->insert_outgoing($data_outgoing, 'head');

        $data_outgoing = array();
        $data_outgoing['data'] = $data_json;
        $data_outgoing['head_id '] = $no.'.'.$this->user->cabang_id;
        $data_outgoing['primary_key'] = $insert['id'];
        $data_outgoing['table_name'] = 'trx_po';

        $this->Gdpo_model->insert_outgoing($data_outgoing, 'detail');
        ///////////////////////////////////////////////////////////////

        if (!$this->__set_po($insert['id'])) {
            echo json_encode(array('success' => 'false', 'data' => NULL, 'title' => 'Info', 'msg' => $this->catch_db_err()));
            return;
        }

        //Insert pengadaan detail on outgoing
        $params = array();
        $params[] = array('field' => 'po_id', 'param' => 'where', 'operator' => '', 'value' => $insert['id']);
        $data_pengadaan = $this->Gdpo_model->gets($params, NULL, 'trx_pengadaan_detail');
        $jumlah=0;
        $data_detail_outgoing=array();
        foreach ($data_pengadaan as $row) {
            $data_outgoing = array();
            $data_json = json_encode($row);
            $data_outgoing['data'] = $data_json;
            
            $data_outgoing['primary_key'] = $row->id;
            $data_outgoing['table_name'] = 'trx_pengadaan_detail';

            $data_detail_outgoing[] = $data_outgoing;
            $jumlah++;
        }

        $data_outgoing = array();
        
        $data_outgoing['jumlah'] = $jumlah;
        
        $data_outgoing['tujuan'] = $data_po->po_cabangid;
        
        $data_outgoing['id_cabang'] = $this->user->cabang_id;

        $no=$this->Gdpo_model->insert_outgoing($data_outgoing, 'head');
        foreach ($data_detail_outgoing as $key) {
            $key['head_id '] = $no.'.'.$this->user->cabang_id;
            $this->Gdpo_model->insert_outgoing($key, 'detail');
        }


        //Insert po detail on outgoing
        $params = array();
        $params[] = array('field' => 'po_id', 'param' => 'where', 'operator' => '', 'value' => $insert['id']);
        $data_pengadaan = $this->Gdpo_model->gets($params, NULL, 'trx_po_detail');
        $jumlah=0;
        $data_detail_outgoing=array();
        foreach ($data_pengadaan as $row) {
            $data_outgoing = array();
            $data_json = json_encode($row);
            $data_outgoing['data'] = $data_json;
            
            $data_outgoing['primary_key'] = $row->id;
            $data_outgoing['table_name'] = 'trx_po_detail';

            $data_detail_outgoing[] = $data_outgoing;
            $jumlah++;
        }

        $data_outgoing = array();
        
        $data_outgoing['jumlah'] = $jumlah;
        
        $data_outgoing['tujuan'] = $data_po->po_cabangid;
        
        $data_outgoing['id_cabang'] = $this->user->cabang_id;

        $no=$this->Gdpo_model->insert_outgoing($data_outgoing, 'head');
        foreach ($data_detail_outgoing as $key) {
            $key['head_id '] = $no.'.'.$this->user->cabang_id;
            $this->Gdpo_model->insert_outgoing($key, 'detail');
        }
        $this->Gdpo_model->generate_user_log($this->user->id, $this->user->cabang_id, 'INSERT', 'TRX_P0');
        echo json_encode(array('success' => 'true', 'data' => $insert['id'], 'title' => 'Info', 'msg' => 'Insert PO Success'));
    }

    private function __set_po($id_po) {
        $params[] = array('field' => 'po_id', 'param' => 'where', 'operator' => '', 'value' => $id_po);
        $data_pengadaan = $this->Gdpo_model->gets($params, NULL, 'trx_pengadaan_detail');

        foreach ($data_pengadaan as $row) {
            $this->Gdpo_model->insert_po_item($row->id);
        }

        return TRUE;
    }

    public function set_status($type) {
        $insert = $this->input->post(NULL, TRUE);

        if ($insert['id'] == 0) {
            $insert['id'] = $this->__init_po($insert);
            if ($insert['id'] == 0) {
                echo json_encode(array('success' => 'false', 'data' => NULL, 'title' => 'Error', 'msg' => $this->catch_db_err()));
                return;
            }
        }

        $data = array(
            'po_id' => $type == 1 ? $insert['id'] : 0,
            'po_status' => $type == 1 ? 1 : 0
        );

        $params[] = array('field' => 'id', 'param' => 'where', 'operator' => '', 'value' => $insert['id_peng']);
        if (!$this->Gdpo_model->update($data, $params, NULL, 'trx_pengadaan_detail')) {
            echo json_encode(array('success' => 'false', 'data' => NULL, 'title' => 'Info', 'msg' => $this->catch_db_err()));
            return;
        }

        $rtn = $this->Gdpo_model->get_detail('id', $insert['id'], 'trx_po');
        $return = array(
            'id' => $rtn->id,
            'po_no' => $rtn->po_no,
            'po_value' => $this->Gdpo_model->total_po($insert['id'])
        );

        echo json_encode(array('success' => 'true', 'data' => $return, 'title' => 'Info', 'msg' => 'Insert Po Success'));
    }

    private function __init_po($insert) {
        $last_no = $this->Gdpo_model->get_last('trx_po');
        $detail_cabang = $this->Gdpo_model->get_detail('id', $this->user->cabang_id, 'dt_cabang');

        $data = array(
            'id' => $last_no . '.' . $this->user->cabang_id,
            'trx_date' => mdate('%Y-%m-%d %H:%i:%s', now()),
            'po_no' => 'PO' . '/' . $detail_cabang->cabang_code . '/' . mdate('%d%m%y', now()) . '/' . sprintf('%06d', $last_no),
            'po_cabangid' => $insert['cabang'],
            'po_usercreate' => $this->user->id,
            'po_simpanstatus' => 0
        );

        if ($this->Gdpo_model->insert($data, 'trx_po')) {
            return $last_no . '.' . $this->user->cabang_id;
        } else {
            return '0';
        }
    }

    public function edit_peng_po() {
        $insert = $this->input->post(NULL, TRUE);

        $data = array(
            'po_qty' => $insert['po_qty'],
            'po_harga' => $insert['po_harga'],
            'po_disc' => $insert['po_disc'],
            'po_ppn' => $insert['po_ppn'],
            'po_katalog' => $insert['po_katalog'],
            'barang_desc' => $insert['barang_desc']
        );

        $opt[] = array('field' => 'id', 'param' => 'where', 'operator' => '', 'value' => $insert['id']);
        $this->Gdpo_model->update($data, $opt, NULL, 'trx_pengadaan_detail');
        $id_po = $this->Gdpo_model->get_detail('id', $insert['id'], 'trx_pengadaan_detail')->po_id;
        echo json_encode(array('success' => 'true', 'data' => $this->Gdpo_model->total_po($id_po)));
    }

    public function edit_po() {
        $insert = $this->input->post(NULL, TRUE);

        $data['po_ed'] = $insert['po_ed'];

        if(is_numeric($insert['supp_name'])) {
            $data['po_suppid'] = $insert['supp_name'];
            $data['po_supp_email'] = "";
        }
        $opt[] = array('field' => 'id', 'param' => 'where', 'operator' => '', 'value' => $insert['id']);
        $this->Gdpo_model->update($data, $opt, NULL, 'trx_po');
        echo json_encode(array('success' => 'true', 'data' => $data, 'msg' => 'Update Success'));
    }

    public function edit_po_item() {
        $insert = $this->input->post(NULL, TRUE);
        $po_id = $insert['po_id'];

        if($insert['tt_id'] != 0) {
            echo json_encode(array('success' => 'false', 'data' => NULL, 'message' => 'barang ini sudah di kirim'));
            return;
        }

        $data = array(
            'barang_qty' => $insert['barang_qty'],
            'barang_harga' => $insert['barang_harga'],
            'barang_disc' => $insert['barang_disc'],
            'barang_ppn' => $insert['barang_ppn'],
            'tt_qty_kirim' => $insert['barang_qty']
        );

        $opt[] = array('field' => 'id', 'param' => 'where', 'operator' => '', 'value' => $insert['id']);
        $this->Gdpo_model->update($data, $opt, NULL, 'trx_po_detail');

        //UPDATE PO VALUE
        $update_po = array(
            'po_value' => $this->Gdpo_model->total_po_complete($po_id)
        );
        $optpo[] = array('field' => 'id', 'param' => 'where', 'operator' => '', 'value' => $po_id);
        $this->Gdpo_model->update($update_po, $optpo, NULL, 'trx_po');

        echo json_encode(array('success' => 'true', 'data' => $data, 'message' => 'Update Success'));
    }

    public function list_pengadaan_all() {
        $records = $this->input->get('filter');
        $params = array();

        if ($records) {
            $raw_record = json_decode($records, true);
            $params = $this->generate_db_query($raw_record);
        } else {
            $params[] = array('field' => 'trx_pengadaan.cabang_id', 'param' => 'where', 'operator' => ' <=', 'value' => $this->user->cabang_id);
        }

        $params[] = array('field' => 'trx_pengadaan.peng_statusdiv', 'param' => 'where', 'operator' => '', 'value' => 1);
        $params[] = array('field' => 'trx_pengadaan.peng_statuspst', 'param' => 'where', 'operator' => '', 'value' => 1);
        $params[] = array('field' => 'trx_pengadaan.po_status', 'param' => 'where', 'operator' => ' !=', 'value' => 1);
        $params[] = array('field' => 'trx_pengadaan_detail.po_set', 'param' => 'where', 'operator' => '', 'value' => 0);

        $opt['sortBy'] = 'trx_pengadaan.id';
        $opt['sortDirection'] = 'ASC';

        $result = $this->Gdpo_model->get_peng_list($params, $opt);

        if ($result != NULL) {
            echo json_encode(array('success' => 'true', 'data' => $result, 'title' => 'Info', 'msg' => 'List All Pengadaan'));
        } else {
            echo json_encode(array('success' => 'true', 'data' => NULL, 'title' => 'Info', 'msg' => 'Tidak ada data'));
        }
    }

    public function list_po_all() {
        $records = $this->input->get('filter');
        $params = array();

        if ($records) {
            $raw_record = json_decode($records, true);
            $params = $this->generate_db_query($raw_record);
        } else {
            $params[] = array('field' => 'trx_date', 'param' => 'where', 'operator' => ' >=', 'value' => mdate("%Y-%m-%d 00:00:00", now()));
            $params[] = array('field' => 'trx_date', 'param' => 'where', 'operator' => ' <=', 'value' => mdate("%Y-%m-%d 23:59:59", now()));
            $params[] = array('field' => 'po_cabangid', 'param' => 'where', 'operator' => ' <=', 'value' => $this->user->cabang_id);
        }

        $tablename = 'trx_po';
        $opt['sortBy'] = 'id';
        $opt['sortDirection'] = 'ASC';

        $result = $this->Gdpo_model->gets($params, $opt, $tablename);
        $no = 0;

        if ($result != NULL) {
            foreach ($result as $row) {
                $result[$no]->supp_name = $this->Gdpo_model->get_detail('id', $row->po_suppid, 'dt_supplier')->ms_name;
                $result[$no]->tgl_trx = explode(' ', $row->trx_date)[0];
                $no++;
            }
            echo json_encode(array('success' => 'true', 'data' => $result, 'title' => 'Info', 'msg' => 'List All PO'));
        } else {
            echo json_encode(array('success' => 'true', 'data' => NULL, 'title' => 'Info', 'msg' => 'Tidak ada data'));
        }
    }

    public function list_po_detail() {
        $records = $this->input->get('filter');
        $params = array();

        if ($records) {
            $raw_record = json_decode($records, true);
            $params = $this->generate_db_query($raw_record);
        }

        $tablename = 'trx_po_detail';
        $opt['sortBy'] = 'id';
        $opt['sortDirection'] = 'ASC';

        $result = $this->Gdpo_model->gets($params, $opt, $tablename);
        $no = 0;

        if ($result != NULL) {
            foreach ($result as $row) {
                $barang = $this->Gdpo_model->get_item_detail($row->barang_id);
                $result[$no]->barang_name = $barang->mi_name;
                $result[$no]->merk_name = $this->Gdpo_model->get_detail('id', $barang->mi_merk, 'dt_merk')->merk_name;
                $result[$no]->barang_netto = $this->Gdpo_model->po_item_netto($row->barang_qty, $row->barang_harga, $row->barang_disc, $row->barang_ppn);
                $no++;
            }
            echo json_encode(array('success' => 'true', 'data' => $result, 'title' => 'Info', 'msg' => 'List All Po Detail'));
        } else {
            echo json_encode(array('success' => 'true', 'data' => NULL, 'title' => 'Info', 'msg' => 'Tidak ada data'));
        }
    }

    public function print_po($type, $id) {
        $po = $this->Gdpo_model->get_detail('id', $id, 'trx_po');
        $data['type'] = $type == 0 ? 'ASLI' : 'COPY';
        $data['po_no'] = $po->po_no;
        $data['po_tgl'] = mdate('%d %F %Y', strtotime($po->trx_date));
        $data['po_ed'] = mdate('%d %F %Y', strtotime($po->po_ed));
        $data['po_cabang'] = $this->Gdpo_model->get_detail('id', $po->po_cabangid, 'dt_cabang')->cabang_alias;
        $data['po_add'] = $this->Gdpo_model->get_detail('id', $po->po_cabangid, 'dt_cabang')->cabang_address;
        $data['po_company'] = $this->Gdpo_model->get_detail('id', $po->po_suppid, 'dt_supplier')->ms_name;
        $data['po_company_add'] = $this->Gdpo_model->get_detail('id', $po->po_suppid, 'dt_supplier')->ms_alamat;
        $data['po_company_cp'] = $this->Gdpo_model->get_detail('id', $po->po_suppid, 'dt_supplier')->ms_contact1 . ', Telp. ' . $this->Gdpo_model->get_detail('id', $po->po_suppid, 'dt_supplier')->ms_telp;
        $data['pembayaran'] = $po->po_isangsuran == 0 ? 'ANGSURAN' : ($po->po_isangsuran == 1 ? '2 MINGGU' : ($po->po_isangsuran == 2 ? '3 MINGGU' : '1 BULAN'));
        $user_create = $this->Gdpo_model->get_detail('id', $po->po_usercreate, 'users');
        $user_app = $this->Gdpo_model->get_detail('id', 76, 'users');

        $data['create_ttd'] = $user_create->ttd_url;
        $data['create_name'] = strtoupper($user_create->first_name . ' ' . $user_create->last_name);

        $data['app_ttd'] = $user_app->ttd_url;
        $data['app_name'] = strtoupper($user_app->first_name . ' ' . $user_app->last_name);
        $data['detail_po'] = $this->Gdpo_model->get_po_detail($id);

        $this->load->view('po_invoice', $data);
    }

    public function pdf_po($id) {
        $po = $this->Gdpo_model->get_detail('id', $id, 'trx_po');
        $data['type'] = 'ASLI';
        $data['po_no'] = $po->po_no;
        $data['po_tgl'] = mdate('%d %F %Y', strtotime($po->trx_date));
        $data['po_ed'] = mdate('%d %F %Y', strtotime($po->po_ed));
        $data['po_cabang'] = $this->Gdpo_model->get_detail('id', $po->po_cabangid, 'dt_cabang')->cabang_alias;
        $data['po_add'] = $this->Gdpo_model->get_detail('id', $po->po_cabangid, 'dt_cabang')->cabang_address;
        $data['po_company'] = $this->Gdpo_model->get_detail('id', $po->po_suppid, 'dt_supplier')->ms_name;
        $data['po_company_add'] = $this->Gdpo_model->get_detail('id', $po->po_suppid, 'dt_supplier')->ms_alamat;
        $data['po_company_cp'] = $this->Gdpo_model->get_detail('id', $po->po_suppid, 'dt_supplier')->ms_contact1 . ', Telp. ' . $this->Gdpo_model->get_detail('id', $po->po_suppid, 'dt_supplier')->ms_telp;
        $data['pembayaran'] = $po->po_isangsuran == 0 ? 'ANGSURAN' : ($po->po_isangsuran == 1 ? '2 MINGGU' : ($po->po_isangsuran == 2 ? '3 MINGGU' : '1 BULAN'));
        $user_create = $this->Gdpo_model->get_detail('id', $po->po_usercreate, 'users');
        $user_app = $this->Gdpo_model->get_detail('id', 76, 'users');

        $data['create_ttd'] = $user_create->ttd_url;
        $data['create_name'] = strtoupper($user_create->first_name . ' ' . $user_create->last_name);

        $data['app_ttd'] = $user_app->ttd_url;
        $data['app_name'] = strtoupper($user_app->first_name . ' ' . $user_app->last_name);
        $data['detail_po'] = $this->Gdpo_model->get_po_detail($id);

        //SETTING PDF
        $filename = 'PO' . $id . '_' . mdate('%d%m%Y', strtotime($po->trx_date)) . ".pdf";
        $pdfFilePath = 'assets/pdf/po/' . $filename;
        $data['page_title'] = 'PURCHASE ORDER'; // pass data to the view

        if (file_exists($pdfFilePath) == FALSE) {
            $this->__generate_pdf($pdfFilePath, $data);
        }

        //SEND EMAIL
        $res = $this->__sent_pdf($pdfFilePath, $po->po_supp_email, 'Purchase Order', NULL);
        if ($res == TRUE) {
            echo json_encode(array('success' => 'true', 'message' => 'Email Berhasil Dikirim'));
        } else {
            echo json_encode(array('success' => 'false', 'message' => $res));
        }
    }

    private function __generate_pdf($file_path, $data) {
        //boost the memory limit if it's low
        ini_set('memory_limit', '32M');
        //render the view into HTML
        $html = $this->load->view('po_pdf', $data, true);
        

        $this->load->library('pdf');
        $pdf = $this->pdf->load();
        // $pdf->SetFooter($_SERVER['HTTP_HOST'].'|{PAGENO}|'.date(DATE_RFC822));
        $pdf->WriteHTML($html); // write the HTML into the PDF
        $pdf->Output($file_path, 'F'); // D download, F file

        return;
    }
    
    private function __sent_pdf($attachment, $name, $subject, $message) {
        $this->load->library('email');

        $this->email->from('admin@parahita.com', 'Purchasing Parahita');
        $this->email->to($name);
        $this->email->cc('purchasingparahita@yahoo.co.id');
        if ($subject != NULL) {
            $this->email->subject($subject);
        } else {
            $this->email->subject('Email Subject');
        }

        if ($message != NULL) {
            $this->email->message($message);
        } else {
            $this->email->message('This is email generated by software for Purchase Order.\n For Detail see PDF attachment');
        }

        if ($attachment != NULL) {
            $this->email->attach($attachment);
        }

        if ($this->email->send()) {
            return TRUE;
        } else {
            return $this->email->print_debugger();
        }
    }

}
