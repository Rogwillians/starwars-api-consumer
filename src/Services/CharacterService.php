<?php
require_once "FilmsService.php";
require_once "SpeciesService.php";
require_once "VehiclesService.php";
require_once "StarshipsService.php";
require_once "PlanetsService.php";

Class CharacterService{
    private $characterCache = [];
    function getCharacterNames($characterUrls) {
        $characterNames = [];
        foreach ($characterUrls as $url) {
            if (!isset($this->characterCache[$url])) {
                $ch = curl_init($url);

                curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
                curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
                curl_setopt($ch, CURLOPT_HTTPHEADER, [
                    'Content-Type: application/json'
                ]);

                $response = curl_exec($ch);


                curl_close($ch);
                $characterData = json_decode($response, true);
                $this->characterCache[$url] = $characterData['name'];
            }
            $characterNames[] = $this->characterCache[$url];
        }
        return $characterNames;
    }

    function getCharacterDetails($characterUrl){

        $ch = curl_init($characterUrl);


        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Content-Type: application/json'
        ]);

        $response = curl_exec($ch);


        curl_close($ch);
        $characterData = json_decode($response, true);

        $filmsService = new FilmsService([]);
        $planetsService = new PlanetsService();
        $speciesService = new SpeciesService();
        $vehiclesService = new VehiclesService();
        $starshipsService = new StarshipsService();

        $characterData['films'] = $filmsService->getFilmsNames($characterData['films']);
        $characterData['homeworld'] = $planetsService->getPlanetName($characterData['homeworld']);
        $characterData['species'] = $speciesService->getspecieName($characterData['species']);
        $characterData['vehicles'] = $vehiclesService->getVehiclesNames($characterData['vehicles']);
        $characterData['starships'] = $starshipsService->getStarshipsNames($characterData['starships']);


        return $characterData;
    }

}
