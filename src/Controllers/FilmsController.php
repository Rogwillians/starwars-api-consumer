<?php

require dirname(__DIR__)."/Services/FilmsService.php";
require_once dirname(__DIR__)."/log_request.php";


class FilmsController
{

    private $filmsService;


    public function __construct()
    {
        $url = 'https://swapi.py4e.com/api/films/';
        $response = file_get_contents($url);
        $data = json_decode($response, true);

        $this->filmsService = new FilmsService($data);
    }

    public function filmTreat()
    {

        return $this->filmsService->filmTreat();

    }

    public function getFilmDetails($filmUrl){

        return $this->filmsService->getFilmDetails($filmUrl);
    }
}