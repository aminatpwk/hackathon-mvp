<?php
session_start();
header("Access-Control-Allow-Origin: http://localhost:3000");
header('Access-Control-Allow-Credentials: true');
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["message" => "Method not allowed. Please use POST."]);
    exit;
}

$data = json_decode(file_get_contents("php://input"));

require_once '../config.php';
$connection = getConnection();
try{
    if(!isset($_SESSION['user_id'])){
        http_response_code(401);
        echo json_encode(["message" => "Not authenticated. Consumer ID missing from session."]);
        exit;
    }

    $consumer_id = $_SESSION['user_id'];

    if(empty($data-> product_id) || empty($data -> sasia)){
        http_response_code(400);
        echo json_encode(["message" => "Data is incomplete. Missing mandatory parameters!"]);
        exit;
    }

    $productQuery = "SELECT farmer_id FROM products WHERE product_id = ?";
    $productStmt = $connection->prepare($productQuery);
    $productStmt->bind_param("i", $data->product_id);
    $productStmt->execute();
    $result = $productStmt->get_result();

    if($result -> num_rows == 0){
        http_response_code(400);
        echo json_encode(["message" => "Product not found."]);
        $productStmt->close();
        $connection->close();
        exit;
    }

    $product = $result -> fetch_assoc();
    $farmer_id = $product['farmer_id'];
    $productStmt->close();

    $date = date("Y-m-d H:i:s");
    $status = "pending";
    $mesazh = !empty($data->mesazh) ? $data -> mesazh : "";

    $query = "INSERT INTO product_requests(product_id, consumer_id, farmer_id, sasia, status, data_kerkese, mesazh) VALUES (?, ?, ?, ?, ?, ?, ?)";
    $statement = $connection->prepare($query);
    $statement -> bind_param("iiiisss", $data->product_id, $consumer_id, $farmer_id, $data->sasia, $status, $date, $mesazh);
    if($statement->execute()){
        $request_id = $connection -> insert_id;
        http_response_code(201);
        echo json_encode([
            "message" => "Request was created successfully!",
            "request_id" => $request_id,
            "status" => $status
        ]);
    }else{
        http_response_code(500);
        echo json_encode([
            "message" => "Unable to create request.",
            "error" => $connection -> error
        ]);
    }
    $statement->close();
    $connection->close();
}catch(Exception $e){
    http_response_code(500);
    echo json_encode(["message" => "An error occurred.", "error" => $e->getMessage()]);
}
?>