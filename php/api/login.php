<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');
require_once '../config.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
function sanitize_input($data) {
    return htmlspecialchars(strip_tags(trim($data)));
}

$connection = getConnection();
if (!$connection) {
    $response = array('error' => 'Gabim në lidhjen me bazën e të dhënave: ' . mysqli_connect_error());
    echo json_encode($response);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json_data = file_get_contents("php://input");
    $data = json_decode($json_data, true);
    if ($data && isset($data['email']) && isset($data['password']) && isset($data['roli'])) {
        $email = sanitize_input($data['email']);
        $password = $data['password'];
        $roli = sanitize_input($data['roli']);
        $sql = "SELECT u.user_id, u.password, r.role_name
                FROM users u
                INNER JOIN user_roles ur ON u.user_id = ur.user_id
                INNER JOIN roles r ON ur.role_id = r.role_id
                WHERE u.email = ? AND r.role_name = ?";
        $stmt = mysqli_prepare($connection, $sql);

        if ($stmt) {
            mysqli_stmt_bind_param($stmt, "ss", $email, $roli);
            mysqli_stmt_execute($stmt);
            $result = mysqli_stmt_get_result($stmt);

            if ($result) {
                $user = mysqli_fetch_assoc($result);

                if ($user) {
                    if (password_verify($password, $user['password'])) {
                        $response = array('success' => 'Hyrja u krye me sukses!');
                        echo json_encode($response);
                    } else {
                        $response = array('errors' => array('password' => 'Fjalëkalimi është i gabuar.'));
                        echo json_encode($response);
                    }
                } else {
                    $response = array('errors' => array('email' => 'Kredencialet nuk janë të vlefshme.'));
                    echo json_encode($response);
                }
            } else {
                $response = array('error' => 'Gabim në marrjen e të dhënave nga baza.');
                echo json_encode($response);
            }
            mysqli_stmt_close($stmt);
        } else {
            $response = array('error' => 'Gabim në përgatitjen e kërkesës SQL: ' . mysqli_error($connection));
            echo json_encode($response);
        }
    } else {
        $response = array('error' => 'Të dhëna të pavlefshme.');
        echo json_encode($response);
    }
} else {
    header('HTTP/1.1 405 Method Not Allowed');
    $response = array('error' => 'Metoda e kërkuar nuk lejohet.');
    echo json_encode($response);
}

mysqli_close($connection);
?>
