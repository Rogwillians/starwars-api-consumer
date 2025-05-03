<?php

Class VehiclesService{
    function getVehiclesNames($vehiclesUrls) {
        $VehiclesNames = [];
        foreach ($vehiclesUrls as $url) {
            if (!isset($this->VehiclesCache[$url])) {
                $response = file_get_contents($url);
                $VehiclesData = json_decode($response, true);
                $this->VehiclesCache[$url] = $VehiclesData['name'];
            }
            $VehiclesNames[] = $this->VehiclesCache[$url];
        }
        return $VehiclesNames;
    }
}