<?php


function logApiRequest($request, $method, $requestData = null) {
    $host = 'localhost';
    $dbname = 'test';
    $user = 'root';
    $password = '';

    // Conexão com o banco
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $user, $password);

    // Preparar a query
    $query = "INSERT INTO request_logs (request) VALUES (:request)";
    $stmt = $pdo->prepare($query);

    // Executar a query
    $stmt->execute([
        ':request' => $method . " / " .$request,
    ]);
}
