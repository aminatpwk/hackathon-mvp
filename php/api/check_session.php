<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

session_start();

if (isset($_SESSION['user_id']) && isset($_SESSION['role'])) {
    http_response_code(200);
    echo json_encode([
        "loggedIn" => true,
        "user_id" => $_SESSION['user_id'],
    ]);
} else {
    http_response_code(200);
    echo json_encode([
        "loggedIn" => false,
        "message" => "Not authenticated"
    ]);
}
?>