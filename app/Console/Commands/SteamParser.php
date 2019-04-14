<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;

use Intervention\Image\Facades\Image;

use App\Media;

class SteamParser extends Command
{
    static $app_list = 'http://api.steampowered.com/ISteamApps/GetAppList/v0002/?key=EAE201A8DA8CA99A40640A19C51FEC6C&format=json';

    static $api = 'https://store.steampowered.com/api/appdetails?appids=%s';

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'steam:pull';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $counter = 0;
        $apps = json_decode(
                    file_get_contents(storage_path('../public/steam.json')), true);
        
        foreach($apps['applist']['apps'] as $index => $info)
        {
            $app_id = $info['appid'];
            $url = sprintf(self::$api, $app_id);

            $client = new \GuzzleHttp\Client();
            $response = $client->get($url);

            $data = json_decode($response->getBody(), true)[$app_id];

            // check if the resource is available
            if(!$data['success'] || ($data['data']['type'] != 'game'))
                continue;

            $data = $data['data'];

            // generic information about Game.
            $options = [];
            
            $options['system_requirements'] = [
                'windows' => $this->parse_specs($data['pc_requirements']['minimum'] ?? ''),
                'mac' => $this->parse_specs($data['mac_requirements']['minimum'] ?? ''),
                'linux' => $this->parse_specs($data['linux_requirements']['minimum'] ?? '')
            ];
            
            $options['description'] = $this->parse_desc($data);

            $options['languages'] = $this->parse_langs($data['supported_languages'] ?? '');

            $options['website'] = trim($data['website']);
            
            $options['release'] = [
                'timestamp' => empty($data['release_date']['date']) ? null : \Carbon\Carbon::createFromFormat('d M, Y', $data['release_date']['date'])->timestamp,
                'released' => !$data['release_date']['coming_soon']
            ];

            $options['is_free'] = $data['is_free'];
            $options['resource'] = $app_id;
                
            // sync genres
            $genres = [];
            if (isset($data['genres']))
            {
                foreach($data['genres'] as $genre)
                {
                    $genre['name'] = $genre['description'];
                    unset($genre['description']);
                    $genre = \App\Entities\Genre::firstOrNew($genre);
                    $genre->save();
                    $genres[] = $genre->id;
                } // end foreach
            } // end if

            // sync devs
            $devs = [];
            if (isset($data['developers']))
            {
                foreach($data['developers'] as $dev_name)
                {
                    $dev = \App\Entities\GameDeveloper::firstOrNew([
                        'name' => $dev_name
                    ]);
                    $dev->name = $dev_name;
                    $dev->options = $data['publishers'];
                    $dev->save();
                    $devs[] = $dev->id;
                } // end foreach
            } // end if

            // store the game
            $game = new \App\Entities\Game();                
            
            $game->name = $data['name'];
            $game->slug = str_slug($data['name']);
            $game->is_game = 1;
            $game->options = $options;
            $game->save();

            if (!empty($data['header_image']))
                $game->poster = $this->store_images($data['header_image'], $game);
            elseif (!empty($data['screenshots'][1]['path_thumbnail'])) 
                $game->poster = $this->store_images($data['screenshots'][0]['path_thumbnail'], $game);

            if (!empty($data['screenshots'][0]['path_thumbnail']))
                $game->ava = $this->store_images($data['screenshots'][0]['path_thumbnail'], $game, false);

            $game->genres()->sync($genres);
            $game->developers()->sync($devs);
            

            $game->save();

            if (isset($data['screenshots']))
            {
                // ss
                foreach($data['screenshots'] as $ss)
                {
                    $media = new Media;
                    $media->path = $ss['path_full'];
                    $media->options = [
                        'thumb' => $ss['path_thumbnail']
                    ];
                    $media->mediable()->associate($game);
                    $user = new \App\User();
                    $user->id = 1;
                    $media->user()->associate($user);
                    $media->save();
                } // end foreach
            } // end if

            if(++$counter == 100)
                break;

        } // end foreach
    }

    private function store_images(string $url, \App\Entities\Game $game, bool $poster = true)
    {
        try{
        $image = \Image::make($url);

        $name = hash('sha256', str_random() . $image) .'.jpg';
        $users_dir = "/groups/{$game->id}";

        // profile main image;
        if ($poster)
        {
            $image->fit(1110,250);
        } else {
            $image->fit(200);
        } // end if

        $image->stream();

        Storage::disk('public')
                    ->put("{$users_dir}/{$name}", $image);

        return "public{$users_dir}/{$name}";
        }catch(\Exception $e)
        {
            echo $e->getMessage();
        }

        return null;
    }

    private function parse_langs($string)
    {
        $langs = explode(',', trim($string));

        return empty(trim($string)) ? [] : array_map('strip_tags', array_map('trim', $langs));
    }

    private function parse_desc($data)
    {
        return [
            'short' => trim(strip_tags( $data['short_description'] ?? '' )),
            'full' => trim(strip_tags( $data['detailed_description'] ?? '' )),
            'about' => trim(strip_tags( $data['about_the_game'] ?? '' )),
        ];
    }

    private function parse_specs($minimum)
    {
        $req = explode(PHP_EOL, trim(strip_tags($minimum)));

        $min_specs = [];
        foreach($req as $line)
        {
            $specs = explode(':', $line);

            if(empty($specs[0]) || empty($specs[1]))
            {
                continue;
            }

            $key = trim($specs[0]);
            $val = trim($specs[1]);

            if(empty($key) || empty($val))
            {
                continue;
            }

            $min_specs[
                $key
            ] = $val;
        } // end foreach
        return ($min_specs);
    }
}
