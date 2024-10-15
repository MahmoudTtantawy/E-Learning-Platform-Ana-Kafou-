<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Playlist;
use App\Services\YouTubeService;
use Illuminate\Http\Request;

class PlaylistController extends Controller
{

    protected $youtubeService;

    public function __construct(YouTubeService $youtubeService)
    {
        $this->youtubeService = $youtubeService;
    }

    public function index()
    {
        return Playlist::all();
    }

    public function show($playlistId)
    {
        $playlist= Playlist::findorfail($playlistId);
            $playlist->videos;
        if (isset($videos['error'])) {
            return $videos['error'];
        }
        return [$playlist];
    }
}
