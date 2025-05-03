<?php


$host = 'localhost';
$dbname = 'test';
$user = 'root';
$password = '';

try {

    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);


    $createTableSQL = "
        CREATE TABLE IF NOT EXISTS request_logs (
            id INT AUTO_INCREMENT PRIMARY KEY,
            request TEXT NOT NULL,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    ";


    $pdo->exec($createTableSQL);


} catch (PDOException $e) {

    echo "Erro ao conectar ao banco de dados ou criar tabela: " . $e->getMessage();
}