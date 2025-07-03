<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;
use Illuminate\Http\Client\Pool;
use Illuminate\Support\Facades\Log;

class SwapiController extends Controller
{
    public function people()
    {
        $page = request()->query('page', 1);
        $cacheKey = "swapi_people_{$page}";

        $json = Cache::remember($cacheKey, 3600, function () use ($page) {
            return Http::get("https://swapi.py4e.com/api/people?page={$page}")
                ->throw()
                ->json();
        }
        );

        return [
            'results' => collect($json['results'])->map(function ($p) {
                return [
                    'id' => (int)collect(explode('/', $p['url']))->filter()->last(),
                    'name' => $p['name'],
                ];
            }),
            'next_page_url' => $json['next'],
            'previous_page_url' => $json['previous'],
        ];
    }

    public function personDetails($id)
    {
        return Cache::remember("swapi_person_{$id}", 3600, function () use ($id) {
            $json = Http::get("https://swapi.py4e.com/api/people/{$id}/")
                ->throw()
                ->json();

            $extractIds = function (array $urls) {
                return collect($urls)
                    ->map(function ($url) {
                        return (int)collect(explode('/', $url))->filter()->last();
                    })
                    ->values()
                    ->all();
            };

            $filmIds = $extractIds($json['films']);
            $speciesIds = $extractIds($json['species']);
            $starshipIds = $extractIds($json['starships']);
            $vehicleIds = $extractIds($json['vehicles']);

            $allPools = array_merge(
                array_map(function ($filmId) {
                    return ['type' => 'films', 'id' => $filmId];
                }, $filmIds),
                array_map(function ($id) {
                    return ['type' => 'species', 'id' => $id];
                }, $speciesIds),
                array_map(function ($id) {
                    return ['type' => 'starships', 'id' => $id];
                }, $starshipIds),
                array_map(function ($id) {
                    return ['type' => 'vehicles', 'id' => $id];
                }, $vehicleIds),
            );

            $responses = Http::pool(function (Pool $pool) use ($allPools) {
                return array_map(
                    function ($item) use ($pool) {
                        return $pool->get("https://swapi.py4e.com/api/{$item['type']}/{$item['id']}/");
                    },
                    $allPools
                );
            });

            $format = function ($index, $field) use ($responses) {
                return $responses[$index]->ok()
                    ? $responses[$index]->json()[$field]
                    : 'Unknown';
            };

            $index = 0;
            $films = [];
            foreach ($filmIds as $fId) {
                $films[] = ['id' => $fId, 'title' => $format($index++, 'title')];
            }
            $species = [];
            foreach ($speciesIds as $sId) {
                $species[] = ['id' => $sId, 'name' => $format($index++, 'name')];
            }
            $starships = [];
            foreach ($starshipIds as $sId) {
                $starships[] = ['id' => $sId, 'name' => $format($index++, 'name')];
            }
            $vehicles = [];
            foreach ($vehicleIds as $vId) {
                $vehicles[] = ['id' => $vId, 'name' => $format($index++, 'name')];
            }

            return [
                'id'          => $id,
                'name'        => $json['name'],
                'height'      => $json['height'],
                'mass'        => $json['mass'],
                'hair_color'  => $json['hair_color'],
                'skin_color'  => $json['skin_color'],
                'eye_color'   => $json['eye_color'],
                'birth_year'  => $json['birth_year'],
                'gender'      => $json['gender'],
                'homeworld'   => $json['homeworld'],
                'films'       => $films,
                'species'     => $species,
                'starships'   => $starships,
                'vehicles'    => $vehicles,
            ];
        });
    }

    public function films()
    {
        $json = Cache::remember('swapi_films', 3600, function () {
            return Http::get('https://swapi.py4e.com/api/films')->throw()->json();
        }
        );
        return collect($json['results'])
            ->map(function ($f) {
                return [
                    'id' => (int)collect(explode('/', $f['url']))->filter()->last(),
                    'episode_id' => $f['episode_id'],
                    'title' => $f['title'],
                ];
            })
            ->values();
    }

    public function filmDetails($id)
    {
        return Cache::remember("swapi_film_{$id}", 3600, function () use ($id) {
            $json = Http::get("https://swapi.py4e.com/api/films/{$id}/")
                ->throw()
                ->json();

            $charUrls = collect($json['characters'])
                ->map(function ($url) {
                    return (int)collect(explode('/', $url))->filter()->last();
                })
                ->values();


            $responses = Http::pool(function (Pool $pool) use ($charUrls) {
                return $charUrls->map(function ($charId) use ($pool) {
                    return $pool->get("https://swapi.py4e.com/api/people/{$charId}/");
                }
                )->toArray();
            }
            );


            $characters = collect($responses)
                ->map(function ($resp, $idx) use ($charUrls) {
                    return [
                        'id' => $charUrls[$idx],
                        'name' => $resp->ok() ? $resp->json()['name'] : 'Unknown'
                    ];
                });

            return [
                'id' => $id,
                'title' => $json['title'],
                'episode_id' => $json['episode_id'],
                'opening_crawl' => $json['opening_crawl'],
                'director' => $json['director'],
                'producer' => $json['producer'],
                'release_date' => $json['release_date'],
                'characters' => $characters,
            ];
        });
    }

}
