<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include '../config.php';

$connection = getConnection();
$sql = "SELECT * FROM products";
$result = mysqli_query($connection, $sql);

$products = [];

if ($result && mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_assoc($result)) {
        $products[] = [
            "id" => $row['product_id'],
            "name" => $row['emri'],
            "description" => $row['pershkrim'],
            "price" => (float)$row['cmimi'],
            "unit" => $row['sasia'],
            "category" => $row['kategoria'],
            "city" => $row['origjina']
        ];
    }
}

echo json_encode($products);

mysqli_close($connection);
?>