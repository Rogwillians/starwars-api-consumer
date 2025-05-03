<?php
require_once dirname(__DIR__)."/Controllers/FilmsController.php";


if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    if (isset($_GET['filmUrl'])) {
        $filmUrl = $_GET['filmUrl'];

        $filmsController = new FilmsController();
        try {
            header('Content-Type: application/json');
            $filmDetails = $filmsController->getFilmDetails($filmUrl);
            logApiRequest($filmUrl, 'GET');
            echo json_encode($filmDetails);

        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }

    } else {

        header('Content-Type: application/json');
        http_response_code(400);
        echo json_encode(['error' => 'Character URL not provided']);
    }
} else {
    header('Content-Type: application/json');
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
}
