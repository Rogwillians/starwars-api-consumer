<?php

require_once dirname(__DIR__)."/Services/CharacterService.php";

Class FilmsService
{
    private $data;

    public function __construct($data)
    {
        $this->data = $data;
    }

    public function filmTreat() {

        $data = $this->data;

        if (!is_array($data['results'])) {
            echo "Erro: 'results' não está definido ou não é um array.";
            return [];
        }

        if (is_array($data['results'])) {
        foreach ($data['results'] as &$film) {
            $releaseDate = $film['release_date'];
            $film['chLinks'] = $film['characters'];
            $characterService = new CharacterService();
            $film['characters'] = $characterService->getCharacterNames($film['characters']);
            try {
                $dateTime = new DateTime($releaseDate);
                $film['release_date'] = $dateTime->format('d/m/Y');
                $age = $this->filmAgeCalculator($releaseDate);
                $film['age'] = $age;
            } catch (Exception $e) {
                echo "Error Calculating film age: " . $film['title'] . ". Message: " . $e->getMessage();
            }
            logApiRequest('https://swapi.py4e.com/api/films/', 'GET');
        }
        }else {
            echo "Error: 'results' key not found in data or it's not an array.";
        }
        unset($film);
        return $data;
    }


    function getFilmsNames($moviesUrls)
    {
        $moviesNames = [];
        foreach ($moviesUrls as $url) {
            $response = file_get_contents($url);
            $movieData = json_decode($response, true);
            $moviesNames[] = $movieData['title'];
        }
        return $moviesNames;
    }

    function getFilmDetails($filmUrl){

        $ch = curl_init($filmUrl);


        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Content-Type: application/json'
        ]);

        $response = curl_exec($ch);


        curl_close($ch);

        if ($response === false) {
            throw new Exception("Erro ao obter dados do filme: {$filmUrl}");
        }
        $filmData = json_decode($response, true);
        $filmData['chLinks'] = $filmData['characters'];
        $characterService = new CharacterService();
        $filmData['characters'] = $characterService->getCharacterNames($filmData['characters']);
        $releaseDate = $filmData['release_date'];
        try {
            $dateTime = new DateTime($releaseDate);
            $filmData['release_date'] = $dateTime->format('d/m/Y');
            $age = $this->filmAgeCalculator($releaseDate);
            $filmData['age'] = $age;
        } catch (Exception $e) {
            echo "Error Calculating film age: " . $filmData['title'] . ". Message: " . $e->getMessage();
        }
        return $filmData;
    }

    private function filmAgeCalculator($releaseDate)
    {
        $currentDate = time();
        $releaseDateTimestamp = strtotime($releaseDate);
        $secondsDifference = $currentDate - $releaseDateTimestamp;
        $daysDifference = floor($secondsDifference / (60 * 60 * 24));
        $years = floor($daysDifference / 365);
        $months = floor(($daysDifference - ($years * 365)) / 30.44);
        $days = $daysDifference % 365;

        return [
            'years' => $years,
            'months' => $months,
            'days' => $days
        ];
    }

}




