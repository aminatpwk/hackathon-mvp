<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Credentials: true');
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');
require_once '../config.php';

session_start();

error_log("== New Request ==");
error_log("Request method: " . $_SERVER['REQUEST_METHOD']);

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    error_log("OPTIONS request received. Sending 200 and exiting.");
    http_response_code(200);
    exit();
}

function sanitize_input($data) {
    return htmlspecialchars(strip_tags(trim($data)));
}

$connection = getConnection();
if (!$connection) {
    error_log("Database connection failed: " . mysqli_connect_error());
    $response = array('error' => 'Gabim në lidhjen me bazën e të dhënave: ' . mysqli_connect_error());
    echo json_encode($response);
    exit();
}
error_log("Database connection established successfully.");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json_data = file_get_contents("php://input");
    error_log("Raw JSON data: " . $json_data);
    $data = json_decode($json_data, true);

    if ($data && isset($data['email']) && isset($data['password']) && isset($data['roli'])) {
        $email = sanitize_input($data['email']);
        $password = $data['password'];
        $roli = sanitize_input($data['roli']);

        error_log("Login attempt - Email: $email | Role: $roli");

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
                    error_log("User found: user_id = " . $user['user_id']);
                    if (password_verify($password, $user['password'])) {
                        $_SESSION['user_id'] = $user['user_id'];
                        $_SESSION['role'] = $user['role_name'];
                        $_SESSION['logged_in'] = true;

                        error_log("Password verified. User logged in.");

                        $redirect_url = '';
                        switch($user['role_name']) {
                            case 'fermer':
                                $redirect_url = '/farmerdashboard';
                                break;
                            case 'bleres':
                                $redirect_url = '/consumerdashboard';
                                break;
                            default:
                                $redirect_url = '/hyr';
                        }

                        error_log("Redirecting to: $redirect_url");

                        $response = array(
                            'success' => 'Hyrja u krye me sukses!',
                            'redirect' => $redirect_url,
                            'role' => $user['role_name'],
                            'user_id' => $user['user_id']
                        );
                        echo json_encode($response);
                    } else {
                        error_log("Password mismatch for user: $email");
                        $response = array('errors' => array('password' => 'Fjalëkalimi është i gabuar.'));
                        echo json_encode($response);
                    }
                } else {
                    error_log("No user found for email and role: $email | $roli");
                    $response = array('errors' => array('email' => 'Kredencialet nuk janë të vlefshme.'));
                    echo json_encode($response);
                }
            } else {
                error_log("Failed to retrieve result set: " . mysqli_error($connection));
                $response = array('error' => 'Gabim në marrjen e të dhënave nga baza.');
                echo json_encode($response);
            }
            mysqli_stmt_close($stmt);
        } else {
            error_log("Failed to prepare SQL statement: " . mysqli_error($connection));
            $response = array('error' => 'Gabim në përgatitjen e kërkesës SQL: ' . mysqli_error($connection));
            echo json_encode($response);
        }
    } else {
        error_log("Invalid POST data: " . json_encode($data));
        $response = array('error' => 'Të dhëna të pavlefshme.');
        echo json_encode($response);
    }
} else {
    error_log("Method not allowed: " . $_SERVER['REQUEST_METHOD']);
    header('HTTP/1.1 405 Method Not Allowed');
    $response = array('error' => 'Metoda e kërkuar nuk lejohet.');
    echo json_encode($response);
}

mysqli_close($connection);
error_log("== Request End ==\n");
?>
