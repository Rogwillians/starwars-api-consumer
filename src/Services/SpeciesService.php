<?php

Class SpeciesService{
    function getspecieName($speciesUrls) {
        $specieName = "";

        foreach ($speciesUrls as $url) {
            if (!isset($this->speciesCache[$url])) {
                $response = file_get_contents($url);
                $speciesData = json_decode($response, true);
                $this->speciesCache[$url] = $speciesData['name'];
            }
            $specieName = $this->speciesCache[$url];
        }

        return $specieName;
    }
}