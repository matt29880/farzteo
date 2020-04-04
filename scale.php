<?php
require 'SimpleImage.php';

function getDirContents(){
    $files = scandir(".");

    foreach($files as $key => $value){
        $path = realpath($value);
        if(is_dir($path) && $value != "." && $value != ".." && $value != "thumbnails") {
            echo "<p>$path</p>";
            getSubDirContents("$value", $results);
            echo "<p>create folder thumbnails/300x300/$value</p>";
            mkdir( "thumbnails/300x300/$value", 0777, true );
            echo "<p>create folder thumbnails/450x450/$value</p>";
            mkdir( "thumbnails/450x450/$value", 0777, true );
            echo "<p>create folder thumbnails/600x600/$value</p>";
            mkdir( "thumbnails/600x600/$value", 0777, true );
            echo "<p>create folder thumbnails/panoramas/$value</p>";
            mkdir( "thumbnails/panoramas/$value", 0777, true );
        }
    }

    return $results;
}

function getSubDirContents($dir, &$results = array()){
    $files = scandir($dir);

    foreach($files as $key => $value){
        $path = realpath($dir.DIRECTORY_SEPARATOR.$value);
        if(!is_dir($path)) {
            $results[] = "$dir/$value";
        } else if($value != "." && $value != "..") {
            getSubDirContents("$dir/$value", $results);
            //$results[] = "$dir/$value";
            echo "create folder thumbnails/300x300/$dir/$value";
            mkdir( "thumbnails/300x300/$dir/$value", 0777, true );
            mkdir( "thumbnails/450x450/$dir/$value", 0777, true );
            mkdir( "thumbnails/600x600/$dir/$value", 0777, true );
            mkdir( "thumbnails/panoramas/$dir/$value", 0777, true );
        }
    }

    return $results;
}

function scale($src, $width, $height) {
    $dest = "thumbnails/$width" . "x" . "$height/$src";
    echo "<p>Source = $src </p>";
    echo "<p>Destination = $dest </p>";

    try {
      if(file_exists($dest)){
        echo '<p>$dest already exists</p>'; 
        return;
      }
      // Create a new SimpleImage object
      $image = new \claviska\SimpleImage();

      // Magic
      $image
        ->fromFile($src)                     // load image.jpg
        ->autoOrient()                              // adjust orientation based on exif data
        ->thumbnail($width, $height, 'center')                          // resize to 320x200 pixels
        ->toFile($dest, 'image/jpeg');      // convert to PNG and save a copy to new-image.png
        //->toScreen();                               // output to the screen

      // And much more!
    } catch(Exception $err) {
      // Handle errors
      echo $err->getMessage();
    }

    echo '<p>Done !</p>'; 
}

function scalePano($src, $width) {
    $dest = "thumbnails/panoramas/$src";
    echo "<p>Source pano = $src </p>";
    echo "<p>Destination pano = $dest </p>";

    try {
      if(file_exists($dest)){
        echo '<p>$dest pano already exists</p>'; 
        return;
      }
      // Create a new SimpleImage object
      $image = new \claviska\SimpleImage();

      // Magic
      $image
        ->fromFile($src)                     // load image.jpg
        ->autoOrient()                              // adjust orientation based on exif data
        ->resize($width, null)                          // resize to 320x200 pixels
        ->toFile($dest, 'image/jpeg');      // convert to PNG and save a copy to new-image.png

      // And much more!
    } catch(Exception $err) {
      // Handle errors
      echo $err->getMessage();
    }

    echo '<p>Done !</p>'; 
}

$images = getDirContents();
var_dump($images);


foreach($images as $image){
    scale($image, 300, 300);
    scale($image, 450, 450);
    scale($image, 600, 600);
    $image_info = getimagesize($image); 
    if (stripos($image, "panorama") !== false) {
      scalePano($image, 1000);
    }
}


