<?php
$db_host = "localhost";
$db_username = "root";
$db_password = "";
$db_name = "merrbio";

function getConnection(){
    global $db_host, $db_username, $db_password, $db_name;
    $connection = new mysqli($db_host, $db_username, $db_password, $db_name);
    if($connection->connect_error){
        die("Connection failed: " . $connection->connect_error);
    }

    return $connection;
}
?>