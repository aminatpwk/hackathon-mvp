<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-type, Authorization");
header("Content-type: application/;json");

require_once "../config.php";

$method = $_SERVER["REQUEST_METHOD"];
$connection = getConnection();

switch ($method) {
    case "GET":
        //pjesa e kodit me poshte do shtohet kur te behet lidhja me loginin e fermerit
//        $farmer_id = isset($_GET['farmer_id']) ? $_GET['farmer_id'] : null;
//        if(!$farmer_id){
//            echo json_encode(["error" => "Farmer ID is required"]);
//            break;
//        }

        $query = "SELECT * FROM products WHERE farmer_id = 1"; //id 1 per arsye se nuk eshte bere akoma lidhja me loginin
        $statement = $connection -> prepare($query);
        $statement -> execute();
        $result = $statement -> get_result();

        $products = [];
        while($row = $result->fetch_assoc()) {
            $products[] = $row;
        }

        echo json_encode($products);
        $statement -> close();
        break;

    case "POST":
        $data = json_decode(file_get_contents("php://input"));
        $query = "INSERT INTO products (farmer_id, emri, pershkrim, cmimi, sasia, kategoria, origjina) VALUES (?,?,?,?,?,?,?)";
        $statement = $connection->prepare($query);
        $statement->bind_param("isdsiis", $data->farmer_id, $data->emri, $data->pershkrim, $data->cmimi, $data->sasia, $data->kategoria, $data->origjina);

        if ($statement->execute()) {
            $product_id = $connection->insert_id;
            echo json_encode([
                "message" => "Product created!",
                "product_id" => $product_id
            ]);
        } else {
            echo json_encode(["error" => $statement->error]);
        }
        $statement->close();
        break;

    case "PUT":
        $data = json_decode(file_get_contents("php://input"));
        if (!isset($data->product_id)) {
            echo json_encode(["error" => "Product ID is required"]);
            break;
        }

        $query = "UPDATE products SET emri = ?, pershkrim = ?, cmimi = ?, sasia = ?, kategoria = ?, origjina = ? WHERE product_id = ? AND farmer_id = ?";

        $statement = $connection -> prepare($query);
        $statement->bind_param("sdiissii", $data->emri, $data->pershkrim, $data->cmimi, $data->sasia, $data->kategoria, $data->origjina, $data->product_id, $data->farmer_id);
        if($statement -> execute()) {
            echo json_encode([
                "message" => "Product updated!",
            ]);
        }else{
            echo json_encode(["error" => $statement -> error]);
        }
        $statement -> close();
        break;

    case "DELETE":
        $data = json_decode(file_get_contents("php://input"));
        if (!isset($data->product_id)) {
            echo json_encode(["error" => "Product ID is required"]);
            break;
        }
        $query = "DELETE FROM products WHERE product_id = ? AND farmer_id = ?";
        $statement = $connection->prepare($query);
        $statement->bind_param("ii", $data->product_id, $data->farmer_id);

        if ($statement->execute()) {
            echo json_encode(["message" => "Product deleted successfully"]);
        } else {
            echo json_encode(["error" => $statement->error]);
        }
        $statement->close();
        break;

}

$connection->close();
?>