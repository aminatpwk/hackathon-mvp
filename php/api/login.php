<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-type, Authorization");
header("Content-type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once "../config.php";

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

error_log("Received login request: " . file_get_contents('php://input'));

$data = json_decode(file_get_contents('php://input'), true);
if (!$data) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid input']);
    exit();
}

$errors = [];

if (empty($data['email'])) {
    $errors['email'] = 'Ju lutem vendosni e-mail!';
} elseif (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
    $errors['email'] = 'E-mail nuk eshte ne formatin e duhur.';
}

// Validate password
if (empty($data['password'])) {
    $errors['password'] = 'Ju lutem vendosni fjalekalimin!';
}

// Validate role
if (empty($data['roli']) || !in_array($data['roli'], ['fermer', 'bleres'])) {
    $errors['roli'] = 'Ju lutem specifikoni rolin tuaj!';
}

if (!empty($errors)) {
    http_response_code(400);
    echo json_encode(['errors' => $errors]);
    exit();
}

try {
    $conn = getConnection();

    // Clean the input data
    $email = trim($data['email']);
    $password = $data['password'];
    $role = $data['roli'];

    // Log what we're searching for
    error_log("Attempting login - Email: " . $email . ", Role: " . $role);

    // Step 1: Find the user by email
    $stmt = $conn->prepare('SELECT * FROM users WHERE email = ?');
    $stmt->bind_param('s', $email);
    $stmt->execute();
    $result = $stmt->get_result();

    // Log user query result
    error_log("User lookup result count: " . $result->num_rows);

    if ($result->num_rows === 0) {
        http_response_code(401);
        echo json_encode(['error' => 'Email ose fjalekalimi i pasakte.']);
        $stmt->close();
        $conn->close();
        exit();
    }

    // Get user details
    $user = $result->fetch_assoc();
    $stmt->close();

    // Log found user (but hide password hash)
    $logUser = $user;
    $logUser['password'] = '[HIDDEN]';
    error_log("Found user: " . json_encode($logUser));

    // Step 2: Verify password
    if (!password_verify($password, $user['password'])) {
        error_log("Password verification failed for user: " . $user['user_id']);
        http_response_code(401);
        echo json_encode(['error' => 'Email ose fjalekalimi i pasakte.']);
        $conn->close();
        exit();
    }

    error_log("Password verified successfully for user: " . $user['user_id']);

    // Step 3: Check if the user has the requested role
    $stmt = $conn->prepare('
        SELECT COUNT(*) as count 
        FROM user_roles ur 
        JOIN roles r ON ur.role_id = r.role_id 
        WHERE ur.user_id = ? AND r.role_name = ?
    ');
    $stmt->bind_param('is', $user['user_id'], $role);
    $stmt->execute();
    $roleResult = $stmt->get_result();
    $roleRow = $roleResult->fetch_assoc();
    $roleCount = $roleRow['count'];
    $stmt->close();

    error_log("Role check for user " . $user['user_id'] . " and role '" . $role . "': " . $roleCount);

    // If the user doesn't have the requested role
    if ($roleCount === 0) {
        // Get all roles this user has for better error feedback
        $stmt = $conn->prepare('
            SELECT r.role_name 
            FROM user_roles ur 
            JOIN roles r ON ur.role_id = r.role_id 
            WHERE ur.user_id = ?
        ');
        $stmt->bind_param('i', $user['user_id']);
        $stmt->execute();
        $allRolesResult = $stmt->get_result();
        $userRoles = [];

        while ($roleRow = $allRolesResult->fetch_assoc()) {
            $userRoles[] = $roleRow['role_name'];
        }
        $stmt->close();

        error_log("User " . $user['user_id'] . " has roles: " . implode(", ", $userRoles));

        http_response_code(401);
        echo json_encode(['error' => 'Ju nuk keni rolin e specifikuar.']);
        $conn->close();
        exit();
    }

    // Step 4: Generate session token
    $sessionToken = bin2hex(openssl_random_pseudo_bytes(32));

    // Step 5: Create response with user data
    $responseData = [
        'success' => 'Hyrja u krye me sukses.',
        'user' => [
            'id' => $user['user_id'],
            'emri' => $user['emri'],
            'mbiemri' => $user['mbiemri'],
            'email' => $user['email'],
            'roli' => $role,
            'token' => $sessionToken
        ]
    ];

    // Return success response
    http_response_code(200);
    echo json_encode($responseData);
    error_log("Login successful - User: " . $user['user_id'] . ", Email: " . $email . ", Role: " . $role);
    $conn->close();

} catch (Exception $e) {
    // Log and return any errors
    error_log("Login error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['error' => 'Nuk mund te behej dot hyrja: ' . $e->getMessage()]);
    if (isset($conn) && $conn) {
        $conn->close();
    }
    exit();
}
?>