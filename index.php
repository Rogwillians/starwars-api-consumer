<?php
include_once __DIR__ . '/src/Controllers/FilmsController.php';
include_once __DIR__ . '/src/log_request.php';
include_once __DIR__ . '/src/Database/request_logs_table.php';

$filmsController = new FilmsController();
$data = $filmsController->filmTreat();


include_once __DIR__ . '/templates/index.html';
