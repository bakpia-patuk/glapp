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
        <title>Purchase Order Parahita</title>
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
                    <div class="fn org" style="font-size: 13pt"><strong>ASLI</strong></div> 
                </div> 
                <!-- company-address vcard --> 
            </div> 
            <!-- #invoice-header --> 
            <div id="invoice-title"> 
                <br/>
                <h2>Purchase Order</h2> 
                <br/>
            </div> 
            <div id="invoice-info"> 
                <h2><strong>PO/DHR/241213/000041</strong></h2> 
                <h3>24 December 2013</h3> 
                <p id="payment-due">Payment due by 01 January 2014</p> 
                <h3>PDC CABANG DHARMAWANGSA<br/>Jl. Dharmawangsa No. 66/70 Surabaya 60286</h3> 

            </div> 
            <!-- #invoice-info --> 
            <div class="vcard" id="client-details"> 
                <div class="locality">Kepada Yth. </div> 
                <div class="fn">REKANAN SUPPLIER</div> 
                <div class="org">COMPANY NAME</div> 
                <div class="adr"> 
                    <div class="street-address">
                        JL.BERBEK INDUSTRI I NO.1 GUDANG A-C SBY, Kota Surabaya<br/> 
                    </div> 
                    <!-- street-address --> 
                    <div id="your-tax-number">-</div>
                </div> 
                <!-- adr --> 
            </div> 
            <!-- #client-details vcard --> 
            <div id="invoice-ket2"> 
                <p style="font-size: 8.5pt;padding-bottom: 10px">
                    Dengan Hormat, <br/>
                    Bersama ini kami ajukan pemesanan barang dengan perincian sebagai berikut :
                </p>
            </div> 
            <table id="invoice-amount"> 
                <thead> 
                    <tr id="header_row"> 
                        <th class="no_th">No</th> 
                        <th class="details_th">Nama Barang</th> 
                        <th class="merk_th">Merk</th> 
                        <th class="katalog_th">Katalog</th> 
                        <th class="quantity_th">Qty</th> 
                        <th class="unitprice_th">Harga</th> 
                        <th class="disc_th">Disc.</th> 
                        <th class="ppn_th">PPN</th> 
                        <th class="subtotal_th">Sub Total</th> 
                        <th class="desc_th">Keterangan</th> 
                    </tr> 
                </thead> 
                <tfoot> 
                    <tr id="total_tr"> 
                        <td colspan="6">&nbsp;</td> 
                        <td colspan="2" class="total" id="total_currency">Total</td> 
                        <td class="total">21,676,366.80</td> 
                        <td>&nbsp;</td> 
                    </tr> 
                </tfoot> 
                <tbody> 
                    <tr class="item"> 
                        <td class="item_l">1</td> 
                        <td class="item_l">HCV 100 T ARCHITECT ABBOTT</td> 
                        <td class="item_l">-</td> 
                        <td class="item_l">-</td> 
                        <td class="item_c">10</td> 
                        <td class="item_r">1,200,000.00</td> 
                        <td class="item_l">2.5 %</td> 
                        <td class="item_l">20 %</td> 
                        <td class="item_r">13,185,849.60</td> 
                        <td class="item_l">CONFIRM ED</td> 
                    </tr> 
                    <tr class="item"> 
                        <td class="item_l">2</td> 
                        <td class="item_l">HBs Ag QUALITATIVE 100T </td> 
                        <td class="item_l">-</td> 
                        <td class="item_l">-</td> 
                        <td class="item_c">10</td> 
                        <td class="item_r">1,200,000.00</td> 
                        <td class="item_l">2.5 %</td> 
                        <td class="item_l">20 %</td> 
                        <td class="item_r">7,469,431.20</td> 
                        <td class="item_l">CONFIRM ED</td> 
                    </tr> 
                    <tr class="item"> 
                        <td class="item_l">3</td> 
                        <td class="item_l">ARCHITECT ABBOTT WASH BUFFER CONCENTRATE ARCHITECT</td> 
                        <td class="item_l">-</td> 
                        <td class="item_l">-</td> 
                        <td class="item_c">10</td> 
                        <td class="item_r">1,200,000.00</td> 
                        <td class="item_l">2.5 %</td> 
                        <td class="item_l">20 %</td> 
                        <td class="item_r">1,021,086.00</td> 
                        <td class="item_l">CONFIRM ED</td> 
                    </tr> 
                </tbody> 
            </table> 
            <!-- invoice-amount --> 
            <div id="invoice-ket2"> 
                <p style="font-size: 8.5pt;padding-bottom: 10px">
                    Mohon Pesanan tersebut dapat kami terima paling lambat tanggal 04 January 2014<br/>
                    Pembayaran : 1 BULAN 
                </p>
            </div> 
            <table id="invoice-sign" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                    <td align="center" width="25%">
                        <span style="float: left;padding-left: 50px">Hormat kami,</span><br/>
                        <span style="float: left;padding-left: 50px">PARAHITA DIAGNOSTIC CENTER</span> <br/><br/>
                        <div class="sign"><img width="60%" src="<?php echo base_url('assets/appdata/user/sign1.png'); ?>"><br /><strong><?php echo 'SUPER ADMIN'; ?></strong></div>
                        <div class="hr"></div>
                        BAGIAN PEMBELIAN
                    </td>
                    <td align="center" width="25%">
                        <span style="float: left;padding-left: 30px">&nbsp;</span><br/>
                        Menyetujui,<br/><br/>
                        <div class="sign"><img width="60%" src="<?php echo base_url('assets/appdata/user/sign1.png'); ?>"><br /><strong><?php echo 'ELLI'; ?></strong></div>
                        <div class="hr"></div>
                        MANAGER
                    </td>
                    <td align="center" width="25%">
                        <span style="float: left;padding-left: 30px">&nbsp;</span><br/>
                        Mengetahui,<br/>
                        <div class="sign"><table height="111"><tr><td>&nbsp;</td></tr></table></div>
                        <div class="hr"></div>
                        <strong>&nbsp;</strong>
                    </td>
                </tr>
            </table>
            <!-- payment-details --> 
            <div id="comments">Catatan : Mohon nota dilampirkan saat pengiriman barang dan penagihan. </div> 
            <!-- comments --> 
        </div> 
    </body>
</html>
