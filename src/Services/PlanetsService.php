<?php

Class PlanetsService{
    function getPlanetName($planetUrl) {

                $response = file_get_contents($planetUrl);
                $planetsData = json_decode($response, true);
                $planetName =  $planetsData['name'];

        return $planetName;
    }
}
