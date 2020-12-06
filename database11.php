<?php
$get = $_GET('col');
echo $get;

$link = mysqli_connect('localhost', 'root', 'password', 'db_name');

if(mysqli_connect_errno()){
    echo 'Ошибка подключения к базе данных ('.mysqli_connect_errno().'): '. mysqli_connect_error();
    exit();
}