<?php
/*

    Простой веб сервис сбора статистики о перемещениях клиента по сайту

*/


// определяем входные параметры
define('D_PAR_ID', 'id');

//TODO: перенести параметры авторизации в отдельный ini файл за пределами веб доступа
$host = '127.0.0.1';
$db   = '';
$user = '';
$pass = '';
$charset = 'utf8';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";

$opt = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

//if (!$_REQUEST[D_PAR_PAGE]) {
//    die("Sorry, nothing to process");
//}

try {
    $pdo = new PDO($dsn, $user, $pass, $opt);
} catch (PDOException $e) {
    die('Something got wrong: ' . $e->getMessage());
}

$clientId =  $_REQUEST[D_PAR_ID] ? : 0;

// определения запросов
$sqlFind = 'SELECT * FROM pages';

// проверяем наличие записи с такими параметрами. Если таковая уже есть - просто увеличиваем коэф. интереса
$stmt =$pdo->prepare($sqlFind);
$stmt->execute();
$records = $stmt->fetchAll(PDO::FETCH_ASSOC);

var_dump($records);


