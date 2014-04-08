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
        <title>Tanda Terima Barang</title>
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
                    <div class="fn org" style="font-size: 13pt"><strong><?php if ($type == 1) { ?>
                            <span style="font-size: 16px; font-weight: bold; border: 1px solid #333; padding: 5px 10px">COPY</span>
                        <?php } ?></strong></div> 
                </div> 
                <!-- company-address vcard --> 
            </div> 
            <!-- #invoice-header --> 
            <div id="invoice-title" class="tt"> 
                <br/>
                <h2>DAFTAR FAKTUR</h2> 
                <br/>
            </div> 
            <div id="invoice-info"> 
                <h2>&nbsp;</h2> 
            </div> 
            <!-- #invoice-info --> 
            <div class="vcard" id="client-details"> 
                <div class="org">Tanggal : <?php echo date('Y-m-d H:i:s'); ?></div> 
                <div class="org">Supplier : <?php echo $supplier_name; ?></div> 
            </div> 
            <!-- #client-details vcard --> 
            <table id="invoice-amount"> 
                <thead> 
                    <tr id="header_row"> 
                        <th class="no_th">NO</th> 
                        <th class="quantity_th">NO FAKTUR</th> 
                        <th class="details_th">NO TT</th> 
                        <th class="desc_th">NOMINAL</th> 
                    </tr> 
                </thead> 
                <tbody>
                    <?php
                    $i = 1;
                    foreach ($list_tt as $key) {
                        ?>
                        <tr class="item"> 
                            <td class="item_l"><?php echo $i++;?></td> 
                            <td class="item_c">
                                <?php echo $key['no_fk']; ?>
                            </td> 
                            <td class="item_l"><?php echo $key['no_tt']; ?></td> 
                            <td class="item_l"><?php echo number_format($key['total_fk'], 2); ?></td> 
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
                        <div class="sign"><img width="40%" src="<?php echo base_url($ttd1); ?>"><br /></div>
                        <div class="hr2"></div>
                        <strong><?php echo $user; ?></strong>
                    </td>
                    <td align="center" width="25%">
                        <span style="float: left;padding-left: 30px">&nbsp;</span><br/><br/><br/>
                        Pengirim,<br/><br/>
                        <div class="sign"><img width="40%" src="<?php echo base_url($ttd2); ?>"><br /></div>
                        <div class="hr2"></div>
                        <strong><?php echo $user1; ?></strong>
                    </td>
                </tr>
            </table>
        </div> 
    </body>
</html>
