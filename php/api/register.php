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

error_log("Received request: " . file_get_contents('php://input'));

$data = json_decode(file_get_contents('php://input'), true);
if (!$data) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid input']);
    exit();
}

$errors = [];

if (empty($data['emri'])) {
    $errors['emri'] = 'Ju lutem vendosni emrin!';
} elseif (!preg_match('/^[A-Za-z]{2,}$/', $data['emri'])) {
    $errors['emri'] = 'Emri duhet te jete te pakten dy karaktere dhe te mos perfshije numra apo shenja.';
}

if (empty($data['mbiemri'])) {
    $errors['mbiemri'] = 'Surname is required';
} elseif (!preg_match('/^[A-Za-z]{2,}$/', $data['mbiemri'])) {
    $errors['mbiemri'] = 'Mbiemri duhet te jete te pakten dy karaktere dhe te mos perfshije numra apo shenja.';
}

if (empty($data['qyteti'])) {
    $errors['qyteti'] = 'City is required';
} elseif (!preg_match('/^[A-Za-z\s]{2,}$/', $data['qyteti'])) {
    $errors['qyteti'] = 'Qyteti duhet te jete te pakten dy karaktere i gjate.';
}

if (empty($data['roli']) || !in_array($data['roli'], ['fermer', 'bleres'])) {
    $errors['roli'] = 'Ju lutem specifikoni rolin tuaj!';
}

if (empty($data['email'])) {
    $errors['email'] = 'Ju lutem vendosni e-mail!';
} elseif (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
    $errors['email'] = 'E-mail nuk eshte ne formatin e duhur.';
} else {
    $conn = getConnection();
    $stmt = $conn->prepare('SELECT COUNT(*) AS count FROM users WHERE email = ?');
    $stmt->bind_param('s', $data['email']);
    $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    if ($row['count'] > 0) {
        $errors['email'] = 'Ekziston perdorues me kete email.';
    }
    $stmt->close();
}

if (empty($data['phone'])) {
    $errors['phone'] = 'Ju lutem vendosni nje numer kontakti!';
} elseif (!preg_match('/^\d{10}$/', preg_replace('/[\s-]/', '', $data['phone']))) {
    $errors['phone'] = 'Numri i telefonit duhet te jete me 10 numra.';
}

if (empty($data['password'])) {
    $errors['password'] = 'Ju lutem vendosni fjalekalimin!';
} elseif (!preg_match('/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/', $data['password'])) {
    $errors['password'] = 'Password duhet te jete te pakten 8 karaktere i gjate dhe te perfshije te pakten nje shkronje ose nje numer.';
}

if (!empty($errors)) {
    http_response_code(400);
    echo json_encode(['errors' => $errors]);
    exit();
}

$hashedPassword = password_hash($data['password'], PASSWORD_DEFAULT);

try {
    $conn = getConnection();
    $stmt = $conn->prepare(
        'INSERT INTO users (emri, mbiemri, email, qyteti, nr_tel, password, role) 
         VALUES (?, ?, ?, ?, ?, ?, ?)'
    );
    $stmt->bind_param(
        'sssssss',
        $data['emri'],
        $data['mbiemri'],
        $data['email'],
        $data['qyteti'],
        $data['phone'],
        $hashedPassword,
        $data['roli']
    );
    $stmt->execute();
    http_response_code(201);
    echo json_encode(['success' => 'Regjistrimi u krye me sukses.']);
    error_log("Success: User registered - " . $data['email']);
    $stmt->close();
    $conn->close();
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Nuk mund te behej dot regjistrimi i perdoruesit: ' . $e->getMessage()]);
    error_log("Database error: " . $e->getMessage());
    $conn->close();
    exit();
}
?>