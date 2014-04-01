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
    <title>Cetak Kas</title>
    <link rel="stylesheet" href="<?php echo base_url('assets/css/invoice_print.css'); ?>" type="text/css" media="print">
    <link rel="stylesheet" href="<?php echo base_url('assets/css/invoice_screen.css'); ?>" type="text/css"
          media="screen, projection">
    <script type="text/javascript">
        function printIt() {
            window.print();
            window.onfocus = function () {
                window.close();
            };
        }
    </script>
</head>
<body>
<div class="container" style="width:470px">
    <table cellpadding="0" cellspacing="0" border="0" width="100%">
        <tr>
            <td width="30%"><img width="100%" src="<?php echo base_url('assets/img/logo.png'); ?>"></td>
            <td valign="top" colspan="2"></td>
        </tr>
        <tr>
            <td colspan="3">&nbsp;</td>
        </tr>
        <tr>
            <td align="center" colspan="3" style="padding: 10px 0px 10px 0px;font-size: 12px"><strong><?php echo $judul; ?></strong></td>
        </tr>
        <tr>
            <td colspan="3">&nbsp;</td>
        </tr>
        <tr>
            <td colspan="3">&nbsp;</td>
        </tr>
        <tr>
            <td colspan="3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<?php echo $keterangan; ?>: </td>
        </tr>
        <tr>
            <td colspan="3">&nbsp;</td>
        </tr>
        <tr>
            <td align="right">Nominal &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
            <td width="2%">:</td>
            <td><?php echo 'Rp. '.number_format($detail_trx->kas_jumlah, 2); ?></td>
        </tr>
        <tr>
            <td align="right">Keperluan &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
            <td width="2%">:</td>
            <td><?php echo $keperluan_nama; ?></td>
        </tr>
        <tr>
            <td align="right"><?php echo $kol2; ?> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
            <td width="2%">:</td>
            <td><?php echo $detail_trx->kas_namabayar; ?></td>
        </tr>
    </table>
    <br/>
    <br/>
    <br/>
    <table cellpadding="0" cellspacing="0" border="0" width="100%">
        <tr>
            <td align="center" width=50%">
                <span style="float: left;padding-left: 60px">Hormat kami,</span><br/>
            <span style="float: left;padding-left: 60px">PDC <?php echo $cabang; ?>, <?php echo mdate('%d %F %Y', now()); ?></span> <br/>
                <span style="float: left;padding-left: 30px">&nbsp;</span><br/>
                <?php echo $kol1; ?>,
                <div class="sign"><img width="100%" src="<?php echo base_url($ttd1); ?>"></div>
                <strong><?php echo $user; ?></strong>
            </td>
            <td align="center" width="50%">
                <span style="float: left;padding-left: 30px">&nbsp;</span><br/>
                <span style="float: left;padding-left: 30px">&nbsp;</span><br/>
                <span style="float: left;padding-left: 30px">&nbsp;</span><br/>
                <?php echo $kol2; ?>,
                <div class="sign"><img width="100%" src="<?php echo base_url($ttd2); ?>"></div>
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