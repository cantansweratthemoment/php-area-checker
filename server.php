<?php
session_start();
date_default_timezone_set('Europe/Moscow');
$start = microtime(true);
$x = (float)$_POST['x'];
$y = (float)$_POST['y'];
$r = (float)$_POST['r'];
function check($x, $y, $r)
{
    if ((($x >= -$r / 2) && ($x <= 0) && ($y >= 0) && ($y <= $r)) || (($x >= 0) && ($x <= $r) && ($y >= 0) && ($y <= $r) && ($x * $x + $y * $y <= $r * $r)) || (($x >= -$r / 2) && ($x <= 0) && ($y >= -$r / 2) && ($y <= 0) && (-$x - $r / 2 <= $y))) {
        return "<span style='color: #7FFF5C'>True</span>";
    } else {
        return "<span style='color: #FF47A0'>False</span>";
    }
}

$result = check($x, $y, $r);
$now = date("H:i:s");
$now .="⏰";
$answer = array($x, $y, $r, check($x, $y, $r), $now, microtime(true) - $start);
if (!isset($_SESSION['data'])) {
    $_SESSION['data'] = array();
}
array_push($_SESSION['data'], $answer);
?>
<table align="center" class="not-main-table">
    <tr>
        <th class="variable">X</th>
        <th class="variable">Y</th>
        <th class="variable">R</th>
        <th>Result</th>
        <th>Time</th>
        <th>Script time</th>
    </tr>
    <?php foreach ($_SESSION['data'] as $word) { ?>
    <tr>
        <td><?php echo $word[0] ?></td>
        <td><?php echo $word[1] ?></td>
        <td><?php echo $word[2] ?></td>
        <td><?php echo $word[3] ?></td>
        <td><?php echo $word[4] ?></td>
        <td><?php echo number_format($word[5], 10, ".", "") ?></td>
    </tr>
    <?php }?>
</table>