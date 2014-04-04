<?php
header("Expires: Mon, 26 Jul 1997 05:00:00 GMT"); // Date in the past 
header('Last-Modified: ' . gmdate('D, d M Y H:i:s') . ' GMT');
header('Cache-Control: no-store, no-cache, must-revalidate'); // HTTP/1.1 
header('Cache-Control: post-check=0, pre-check=0', false);
header('Pragma: no-cache');
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">
    <head>
        <title>tanda Terima Barang Parahita</title>
        <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
        <link rel="stylesheet" type="text/css" href="<?php echo base_url('assets/css/invoice/base.css'); ?>" media="screen" />
        <!-- Base Stylesheet do not change or remove -->
        <link rel="stylesheet" type="text/css" href="<?php echo base_url('assets/css/invoice/tranquility_print.css'); ?>" media="print" />
        <link rel="stylesheet" type="text/css" href="<?php echo base_url('assets/css/invoice/tranquility.css'); ?>" />
        <!-- Remove this and add your own invoice styles -->
        <script type="text/javascript">
            function printIt() {
                window.print();
                window.onfocus = function() {
                    window.close();
                };
            }
        </script>
    </head>
    <body> 
        <div class="section_footer">
            <button class="button invoice_btn" onClick="printIt();">Print</button>
        </div>
        <div id="invoice"> 
            <div id="invoice-header">
                <img alt="Mainlogo_large" class="logo screen" src="<?php echo base_url('assets/img/app/logo_invoice.jpg'); ?>" /> 
                <!-- hCard microformat --> 
                <div class="vcard" id="company-address"> 
                    <div class="fn org" style="font-size: 13pt"><strong><?php echo $type; ?></strong></div> 
                </div> 
                <!-- company-address vcard --> 
            </div> 
            <!-- #invoice-header --> 
            <div id="invoice-title" class="tt"> 
                <br/>
                <h2>Tanda Terima Barang</h2> 
                <br/>
            </div> 
            <div id="invoice-info"> 
                <h2><strong><?php echo $tt_no; ?></strong></h2> 
            </div> 
            <!-- #invoice-info --> 
            <div class="vcard" id="client-details"> 
                <div class="org">Tanggal : <?php echo $tt_tgl; ?></div> 
                <div class="org">Supplier :<?php echo $tt_company; ?></div> 
            </div> 
            <!-- #client-details vcard --> 
            <table id="invoice-amount"> 
                <thead> 
                    <tr id="header_row"> 
                        <th class="no_th">No</th> 
                        <th class="details_th">Nama Barang</th> 
                        <th class="merk_th">Merk</th> 
                        <th class="katalog_th">Katalog</th> 
                        <th class="merk_th">Kems.</th> 
                        <th class="quantity_th">Qty</th> 
                        <th class="unitprice_th">Harga</th> 
                        <th class="disc_th">Disc.</th> 
                        <th class="ppn_th">PPN</th> 
                        <th class="subtotal_th">Sub Total</th> 
                        <th class="desc_th">Keterangan</th> 
                    </tr> 
                </thead> 
                <tbody>
                    <?php
                    foreach ($detail_po['data'] as $value) {
                        ?>
                        <tr class="item"> 
                            <td class="item_l"><?php echo $value['no']; ?></td> 
                            <td class="item_l"><?php echo $value['barang_name']; ?></td> 
                            <td class="item_l"><?php echo $value['barang_merk']; ?></td> 
                            <td class="item_l"><?php echo $value['barang_katalog']; ?></td> 
                            <td class="item_l"><?php echo $value['barang_kemasan']; ?></td> 
                            <td class="item_c"><?php echo $value['barang_qty']; ?></td> 
                            <td class="item_r"><?php echo number_format($value['barang_harga'], 2); ?></td> 
                            <td class="item_c"><?php echo $value['barang_disc'].' %'; ?></td> 
                            <td class="item_c"><?php echo $value['barang_ppn'].' %'; ?></td> 
                            <td class="item_r"><?php echo number_format($value['barang_sub'], 2); ?></td> 
                            <td class="item_l"><?php echo $value['barang_desc']; ?></td> 
                        </tr> 
                        <?php
                    }
                    ?>
                </tbody> 
            </table> 
            <!-- invoice-amount --> 
            <table id="invoice-sign" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                    <td align="center" width="25%">
                        <span style="float: left;padding-left: 50px">Hormat kami,</span><br/>
                        <span style="float: left;padding-left: 50px">PARAHITA DIAGNOSTIC CENTER</span> <br/><br/>
                        Penerima,<br/><br/>
                        <div class="sign"><img width="60%" src="<?php echo base_url($create_ttd); ?>"><br /><strong><?php echo $create_name; ?></strong></div>
                        <div class="hr"></div>
                        BAGIAN PEMBELIAN
                    </td>
                    <td align="center" width="25%">
                        <span style="float: left;padding-left: 30px">&nbsp;</span><br/><br/><br/>
                        Pengirim,<br/><br/>
                        <div class="sign"><img width="60%" src="<?php echo base_url($app_ttd); ?>"><br /><strong><?php echo $app_name; ?></strong></div>
                        <div class="hr"></div>
                        MANAGER
                    </td>
                </tr>
            </table>
        </div> 
    </body>
</html>
