<?php
/*

    Простой веб сервис сбора статистики о перемещениях клиента по сайту

*/


// определяем входные параметры
define('D_PAR_PAGE', 'page');
define('D_PAR_REF', 'referrer');
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

if (!$_REQUEST[D_PAR_PAGE]) {
    die("Sorry, nothing to process");
}

try {
    $pdo = new PDO($dsn, $user, $pass, $opt);
} catch (PDOException $e) {
    die('Something got wrong: ' . $e->getMessage());
}

$clientId =  $_REQUEST[D_PAR_ID] ? : 0;
$referrer = $_REQUEST[D_PAR_REF] ? : '';
$page = $_REQUEST[D_PAR_PAGE];

// определения запросов
$sqlFind = 'SELECT * FROM visitors WHERE client_id = :id AND referrer = :ref AND page = :page';
$sqlAdd  = 'INSERT INTO visitors (client_id, referrer, page) VALUES (:id, :ref, :page)';
$sqlUpd  = 'UPDATE visitors SET interestI = interestI + 1 WHERE id = :id';

// проверяем наличие записи с такими параметрами. Если таковая уже есть - просто увеличиваем коэф. интереса
$stmt =$pdo->prepare($sqlFind);
$stmt->execute([$clientId, $referrer, $page]);
$rec = $stmt->fetch(PDO::FETCH_ASSOC);
if ($stmt->rowCount() == 0) {
    $stmt= $pdo->prepare($sqlAdd)->execute([$clientId, $referrer, $page]);
} else {
    $pdo->prepare($sqlUpd)->execute([$rec['id']]);
};


