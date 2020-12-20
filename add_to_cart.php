<?php
// Данные для подключения к базе данных
$server = 'localhost';
$username = 'root';
$password = 'root';
$dbName = 'shop';
if ($_GET['cart'] === 'add') {
    mysqli_report(MYSQLI_REPORT_STRICT | MYSQLI_REPORT_ALL);
    try {
        $link = mysqli_connect($server, $username, $password, $dbName);
    } catch (Exception $e) {
        $response = array(
            'statusCode' => '0',
            'textReply' => 'Ошибка подключения к базе данных',
            'nativeErrorText' => mysqli_connect_error()
        );
        echo json_encode($response);
        exit();
    };
    if ($link) {
        $count = intval($_GET['col']);
        $ip  = strval($_SERVER['REMOTE_ADDR']);
        $sql = "INSERT INTO `orders`(count, ip) VALUES ($count, '$ip')";
        try {
            mysqli_query($link, $sql);
            $response = array(
                'statusCode' => 1,
                'textReply' => 'Товар добавлен в корзину'
            );
        } catch (Exception $e) {
            $response = array(
                'statusCode' => 0,
                'textReply' => 'Ошибка при записи в базу данных',
                'nativeErrorText' => $e->getMessage()
            );
        };
        echo json_encode($response);
    };
};