<?php
namespace App\Services;

use Illuminate\Support\Facades\Http;

class YouTubeService
{
    protected $apiKey;

    public function __construct()
    {
        $this->apiKey = env('YOUTUBE_API_KEY');
    }

    public function getPlaylists($channelId)
    {
        $response = Http::get("https://www.googleapis.com/youtube/v3/playlists", [
            'part' => 'snippet',
            'channelId' => $channelId,
            'maxResults' => 50,
            'key' => $this->apiKey,
        ]);
//                dd($response->json());
        return $response->json()['items'] ?? [];
    }

    public function getVideos($playlistId)
    {
        $response = Http::get("https://www.googleapis.com/youtube/v3/playlistItems", [
            'part' => 'snippet',
            'playlistId' => $playlistId,
            'maxResults' => 50,
            'key' => $this->apiKey,
        ]);

        return $response->json()['items'] ?? [];
    }
}
