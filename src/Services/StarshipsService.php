<?php
Class StarshipsService{
    function getStarshipsNames($starshipsUrls) {
        $starshipsNames = [];
        foreach ($starshipsUrls as $url) {
            if (!isset($this->starshipsCache[$url])) {
                $response = file_get_contents($url);
                $starshipsData = json_decode($response, true);
                $this->starshipsCache[$url] = $starshipsData['name'];
            }
            $starshipsNames[] = $this->starshipsCache[$url];
        }
        return $starshipsNames;
    }
}