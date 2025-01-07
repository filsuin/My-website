<?php
session_start();

// Remplacez les valeurs par les informations de connexion correctes
$host = 'serveur'; // ou l'adresse de votre serveur MySQL
$username = 'user';
$password = 'motdepasse';
$database = 'database';

$mysqli = new mysqli($host, $username, $password, $database);

if ($mysqli->connect_error) {
    die('Connection failed: ' . $mysqli->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = $mysqli->real_escape_string($_POST['email']);
    $password = password_hash($_POST['password'], PASSWORD_BCRYPT);

    $sql = "INSERT INTO users (email, password) VALUES ('$email', '$password')";

    if ($mysqli->query($sql) === true) {
        $_SESSION['message'] = "Inscription réussie !";
        header("location: login.html");
    } else {
        $_SESSION['message'] = "Erreur : " . $sql . "<br>" . $mysqli->error;
    }
}
?>