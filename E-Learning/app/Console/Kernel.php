<?php


use Illuminate\Console\Scheduling\Schedule;

function schedule(Schedule $schedule)
{
    $schedule->command('youtube:fetch-playlists')->daily(); 
}
