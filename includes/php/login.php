<?php
session_start();

include_once "./dbh.php";
include_once("./rooms_lib.php");

if ($_POST) {
    if (!isset($_SESSION["user"])) {
        if (isset($_POST["username"]) && isset($_POST["password"])) {
            if (empty($_POST["username"]) || empty($_POST["password"])) {
                header("Location: /index.php?p=login&e=data_miss");
                exit();
            } else {
                VerifyPassword($_POST["username"], $_POST["password"], $conn);
            }
        } else {
            header("Location: /index.php?p=login&e=data_miss");
            exit();
        }
    } else {
        header("Location: /index.php?p=rooms&e=logged_bef");
        exit();
    }
} else {
    header("Location: /index.php?p=login&e=nonAuth");
    exit();
}

function VerifyPassword($user, $pwd, $conn) {
    $sql = "SELECT password FROM najem_alett.login WHERE username=? AND id=1";
    $stmt = mysqli_stmt_init($conn);
    if (!mysqli_stmt_prepare($stmt, $sql)) {
        echo "SQL error";
    } else {
        $zero = "0";
        mysqli_stmt_bind_param($stmt, "s", $user);

	// Changing to object-oriented is awful, but using this old php too
        $stmt->execute();
	$stmt->store_result();
        $result = fetchAssocStatement($stmt);		

        $hashedPwd =  $result["password"];
        if (password_verify($pwd, $hashedPwd)) {
            $_SESSION["user"] = $user;
            header("Location: /index.php?p=rooms&s=logged");
            exit();
        } else {
            header("Location: /index.php?p=login&e=wrong_data");
            exit();
        }
    }
}
