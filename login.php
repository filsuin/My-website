<?php
session_start();

// Remplacez les valeurs par les informations de connexion correctes
$host = 'localhost'; // ou l'adresse de votre serveur MySQL
$username = 'user';
$password = 'motdepasse';
$database = 'database';

$mysqli = new mysqli($host, $username, $password, $database);

if ($mysqli->connect_error) {
    die('Connection failed: ' . $mysqli->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = $mysqli->real_escape_string($_POST['email']);
    $password = $_POST['password'];

    $result = $mysqli->query("SELECT * FROM users WHERE email='$email'");

    if ($result->num_rows == 1) {
        $user = $result->fetch_assoc();
        if (password_verify($password, $user['password'])) {
            $_SESSION['email'] = $user['email'];
            $_SESSION['message'] = "Connexion réussie !";
            header("location: index.html");
        } else {
            $_SESSION['message'] = "Mot de passe incorrect.";
            header("location: login.html");
        }
    } else {
        $_SESSION['message'] = "Adresse mail non trouvée.";
        header("location: login.html");
    }
    exit();
}
?>