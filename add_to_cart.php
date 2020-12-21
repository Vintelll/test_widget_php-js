<?php
// Данные для подключения к базе данных
$server = 'localhost';
$username = 'root';
$password = 'root';
$dbName = 'shop';
// функция добавления записи об ошибке в существующий файл
function appendDataToLog($error, $countToOrder)
{
    $file = fopen('log.csv', 'a');
    $time = date_format(new DateTime('NOW'), 'Y-m-d H:i');
    $ip  = strval($_SERVER['REMOTE_ADDR']);
    if ($ip === '::1') {
        $ip = 'localhost';
    }
    fputcsv($file, array($time, $ip, $countToOrder, $error));
    fclose($file);
    sendEmail(implode(' ', array($time, $ip, $countToOrder, $error)));
};
// функция добавления записи ошибок с проверкой на существование файла
function writeErrorLog($error, $countToOrder)
{
    if (file_exists('log.csv')) {
        appendDataToLog($error, $countToOrder);
    } else {
        $file = fopen('log.csv', 'wb');
        fputcsv($file, array('Time', 'ClientIP', 'CountToOrder', 'Error'));
        fclose($file);
        appendDataToLog($error, $countToOrder);
    };
};
// функция отправки ошибок по почте(требуется сконфигурировать сервер)
function sendEmail($message)
{
    $to      = 'zhavoronkov_kk@mb-i.ru';
    $subject = 'Error';
    $headers = 'From: zhavoronkov_kk@mb-i.ru' . "\r\n" .
        'Reply-To: zhavoronkov_kk@mb-i.ru' . "\r\n" .
        'X-Mailer: PHP/' . phpversion();

    mail($to, $subject, $message, $headers);
};

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
        writeErrorLog(mysqli_connect_error(), $_GET['col']);
        echo json_encode($response);
        exit();
    };
    if ($link) {
        $count = intval($_GET['col']);
        $ip  = strval($_SERVER['REMOTE_ADDR']);
        if ($ip === '::1') {
            $ip = 'localhost';
        }
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
            writeErrorLog($e->getMessage(), $count);
        };
        echo json_encode($response);
    };
};
