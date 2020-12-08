<?php
// print_r($_GET)
if($_GET['cart'] ==='add'){
    $link = mysqli_connect('localhost', 'root', 'root', 'product_widget');
    if(mysqli_connect_errno()){
        echo json_encode(array('ошибка' => 'Ошибка подключения к базе данных'));
        exit();
    }
    $data = array(
        'count'=>intval($_GET['col']),
        'ip'=>$_SERVER['REMOTE_ADDR']
    );
    $columns = implode(", ",array_keys($data));
    $values  = implode(", ", array_values($data));
    $sql = "INSERT INTO `orders`($columns) VALUES ($values)";
    mysqli_query($link, $sql);
    echo json_encode($values);
}
// $ip = $_SERVER['REMOTE_ADDR'];
// $intIp = ip2long($ip);
// echo json_encode(long2ip($intIp));
// echo json_encode(array( "name"=>"John","time"=>"2pm" ));
?>