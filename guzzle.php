<?php 
    require 'vendor/autoload.php';

    use GuzzleHttp\Client;
    $client = new Client();

    $response = $client->request('GET','http://omdbapi.com',[
        'query'=>[
            'apikey' =>'94ad3b67',
            's' =>'avatar'
        ]
    ]);

    //echo $response->getBody()->getContents();

    $result = json_decode($response->getBody()->getContents(),true)
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>

<body>

    <?php foreach($result['Search'] as $movie):?>
    <ul>
        <li>Title: <?php echo $movie['Title']?></li>
        <li>Year: <?php echo $movie['Year']?></li>
        <li><img width="80" src="<?php echo $movie['Poster'] ?>" alt=""></li>
    </ul>
    <?php endforeach;?>
</body>

</html>