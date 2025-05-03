<?php

require_once dirname(__DIR__)."/Services/CharacterService.php";
require_once dirname(__DIR__)."/log_request.php";


if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['characterUrl'])) {
        $characterUrl = $_GET['characterUrl'];

        $characterService = new CharacterService();
        $characterDetails = $characterService->getCharacterDetails($characterUrl);
        logApiRequest($characterUrl, 'GET');

        header('Content-Type: application/json');
        echo json_encode($characterDetails);

    } else {

        header('Content-Type: application/json');
        http_response_code(400);
        echo json_encode(['error' => 'Film URL not provided']);
    }
} else {

    header('Content-Type: application/json');
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
}
