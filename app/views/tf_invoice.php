<?php
header("Expires: Mon, 26 Jul 1997 05:00:00 GMT"); // Date in the past 
header('Last-Modified: ' . gmdate('D, d M Y H:i:s') . ' GMT');
header('Cache-Control: no-store, no-cache, must-revalidate'); // HTTP/1.1 
header('Cache-Control: post-check=0, pre-check=0', false);
header('Pragma: no-cache');
?>
<!doctype html>
<html>
    <head>
        <meta charset=utf-8>
        <title>Cetak TT</title>
        <link rel="stylesheet" href="<?php echo base_url('assets/css/invoice_print.css'); ?>" type="text/css" media="print">
        <link rel="stylesheet" href="<?php echo base_url('assets/css/invoice_screen.css'); ?>" type="text/css"
              media="screen, projection">
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
        <div class="container">
            <table cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                    <td width="50%"><img width="40%" src="<?php echo base_url('assets/img/app/logo.png'); ?>"></td>
                    <td valign="top" align="right">
                        <?php if ($type == 1) { ?>
                            <span style="font-size: 16px; font-weight: bold; border: 1px solid #333; padding: 5px 10px">COPY</span>
                        <?php } ?>
                    </td>
                </tr>
                <tr>
                    <td align="center" colspan="2" style="padding: 10px 0px 10px 0px;font-size: 12px"><strong>DAFTAR FAKTUR</strong></td>
                </tr>
                <tr>
                    <td style="padding:0px 10px" valign="top">
                        <table cellpadding="0" cellspacing="0" width="100%">
                            <tr>
                                <td>NAMA SUPPLIER</td>
                                <td> : </td>
                                <td><strong><?php echo $supplier_name; ?></strong></td>
                            </tr>
                            <tr>
                                <td width="20%">TANGGAL</td>
                                <td width="1%"> : </td>
                                <td width="55%"><strong><?php echo date('Y-m-d H:i:s'); ?></strong></td>
                            </tr>
                        </table>
                    </td>
                    <td style="padding:0px 10px;">
                        <table cellpadding="0" cellspacing="0" width="100%">
                            <tr>
                                <td width="45%" valign="top" style="text-align: right;padding-right:5px"></td>
                                <td width="2%" valign="top"> </td>
                                <td width="50%"><strong><?php //echo $tt_no; ?></strong></td>
                            </tr>
                            <tr>
                                <td width="45%" valign="top" style="text-align: right;padding-right:5px"></td>
                                <td width="2%" valign="top">  </td>
                                <td width="50%"><strong><?php // echo $po_ed; ?></td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
            <br />
            <br/>
            
            <table class="item_cont" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                    <th width='10' height='20'>NO.</th>
                    <th width='50'>NO FAKTUR</th>
                    <th width='100'>NO TT</th>
                    <th width='50'>NOMINAL</th>
                </tr>
                <tr>
                    <td class="item" style="border-bottom:1px solid #333;" align="center">
                        <div>
                            <?php
                            $i = 1;
                            foreach ($list_tt as $key) {
                                echo $i++;
                                echo '<br/>';
                            };
                            ?>
                        </div>
                    </td>
                    <td class="item" style="border-bottom:1px solid #333;">
                        <div>
                            <?php
                            foreach ($list_tt as $key) {
                                echo $key['no_fk'];
                                echo '<br/>';
                            };
                            ?>
                        </div>
                    </td>
                    <td class="item" style="border-bottom:1px solid #333;" align="left">
                        <div>
                            <?php
                            foreach ($list_tt as $key) {
                                echo $key['no_tt'];
                                echo '<br/>';
                            };
                            ?>
                        </div>
                    </td>
                    <td class="item" style="border-bottom:1px solid #333;padding: 0px 10px 0px 0px" align="right">
                        <div>
                            <?php
                            foreach ($list_tt as $key) {
                                echo number_format($key['total_fk'], 2);
                                echo '<br/>';
                            };
                            ?>
                        </div>
                    </td>
                </tr>
            </table>
            <br/>
            <table cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                    <td align="center" width="50%">
                        <span style="float: left;padding-left: 110px">Hormat kami,</span><br/>
                        <span style="float: left;padding-left: 110px">PARAHITA DIAGNOSTIC CENTER</span> <br/>
                        <span style="float: left;padding-left: 30px">&nbsp;</span><br/>
                        Penerima,
                        <div class="sign" width="40%"><img width="50%" src="<?php echo base_url($ttd1); ?>"></div>
                        <strong><?php echo $user; ?></strong>
                    </td>
                    <td align="center" width="50%">
                        <span style="float: left;padding-left: 30px">&nbsp;</span><br/>
                        <span style="float: left;padding-left: 30px">&nbsp;</span><br/>
                        <span style="float: left;padding-left: 30px">&nbsp;</span><br/>
                        Pengirim,<br/>
                        <div class="sign" width="40%"><img width="50%" src="<?php echo base_url($ttd2); ?>"></div>
                        <strong><?php echo $user1; ?></strong>
                    </td>
                </tr>
            </table>
        </div>
        <div class="section_footer">
            <button class="button invoice_btn" onClick="printIt();">Print</button>
        </div>
    </body>
</html>