<?php
if($_GET['cart'] ==='add'){
    $link = mysqli_connect('localhost', 'root', 'root', 'product_widge');
    if(mysqli_connect_errno()){
        $response = array(
            'statusCode' => '0',
            'textReply' => 'Ошибка подключения к базе данных');
        echo json_encode($response);
        exit();
    }
    $count = intval($_GET['col']);
    $ip  = strval($_SERVER['REMOTE_ADDR']);
    $sql = "INSERT INTO `orders`(count, ip) VALUES ($count, '$ip')";
    if(mysqli_query($link, $sql)){
        $response = array(
            'statusCode'=> 1,
            'textReply'=> 'Товар добавлен в корзину'
        );
    }else{
        $response = array(
            'statusCode'=> 0,
            'textReply'=> 'Ошибка при записи в базу данных'
        );
    };
    echo json_encode($response);
    };
?>

