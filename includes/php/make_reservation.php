<?php
session_start();

include_once "dbh.php";

$floor = "floor00";
if (isset($_POST['floor'])) {
    if (!empty($_POST['floor']))
        $floor = $_POST["floor"];
}

if ($_POST["reservation"] && isset($_SESSION["user"])) {
    if ((isset($_POST["roomName"]) && isset($_POST["roomId"])) || isset($_POST["name"]) || isset($_POST["dph"]) || isset($_POST["dateFrom"])  || isset($_POST["floor"])) {
        if ((empty($_POST["roomName"]) && empty($_POST["roomId"])) || empty($_POST["name"]) || empty($_POST["dateFrom"]) || empty($_POST["floor"])) {
            if(isset($_POST["roomName"])) {
                // Some param is missing, but roomName is here
                header("Location: /index.php?p=rooms&e=data_miss&f=". $floor ."&r=".$_POST["roomName"]);
                exit();
            }
            // roomName's not here and something is missing
            header("Location: /index.php?p=rooms&f=". $floor ."&e=data_miss");
            exit();
        } else {
            // New reservation is being created
            if(!isset($_POST["roomId"])) {
                $sql = "INSERT INTO `reservations` (roomName, name, ico, dph, date_from, expir_date, floor) VALUES(?, ?, ?, ?, ?, ?, ?);";
                MakeReservation($_POST["roomName"], $_POST["name"], $_POST["ico"], $_POST["dph"], $_POST["dateFrom"], $_POST["expirDate"], $_POST["floor"], $conn, $sql);
                header("Location: /index.php?p=rooms&f=". $floor ."&s=res_maked");
                exit();
            }
            // Reservation is updating
            $sql = "UPDATE `reservations` SET name=?, ico=?, dph=?, date_from=?, expir_date=?, floor=? WHERE id=?;";
            MakeReservation($_POST["roomId"], $_POST["name"], $_POST["ico"], $_POST["dph"], $_POST["dateFrom"], $_POST["expirDate"], $_POST["floor"], $conn, $sql);
            header("Location: /index.php?p=rooms&f=". $floor ."&s=res_updated");
            exit();
        }
    } else {
        // Something's missing
        if(isset($_POST["roomName"])) {
            header("Location: /index.php?p=rooms&f=". $floor ."&e=data_miss&r=".$_POST["roomName"]);
            exit();
        } elseif(isset($_POST["roomId"])) {
            header("Location: /index.php?p=rooms&f=". $floor ."&e=data_miss&r=".$_POST["roomId"]);
            exit();
        }
        header("Location: /index.php?p=rooms&f=". $floor ."&e=data_miss");
        exit();
    }
} elseif ($_POST["delete-button"] && isset($_SESSION["user"])) {
    if (isset($_POST["roomId"])) {
        if (!empty($_POST["roomId"])) {
            // Deleting reservation
            $sql = "DELETE FROM `reservations` WHERE id=?;";
            $stmt = mysqli_stmt_init($conn);
            if(!mysqli_stmt_prepare($stmt, $sql)) {
                header("Location: /index.php?p=rooms&f=". $floor ."&e=sql_fail");
                exit();
            } else {
                mysqli_stmt_bind_param($stmt, "s", $_POST["roomId"]);
                mysqli_stmt_execute($stmt);
                header("Location: /index.php?p=rooms&f=". $floor ."&s=res_deleted");
                exit();
            }
        } else {
            header("Location: /index.php?p=rooms&f=". $floor ."&e=data_miss&r=".$_POST["roomId"]);
            exit();
        }
    } else {
        header("Location: /index.php?p=rooms&f=". $floor ."&e=data_miss&r=".$_POST["roomId"]);
        exit();
    }
} else {
    header("Location: /index.php?p=rooms&f=". $floor ."&e=nonAuth");
    exit();
}

function MakeReservation($roomName, $name, $ico, $dph, $fromDate, $expirDate, $floor, $conn, $sql) {
    // Reformatting dates to database format
    $rFromDate = strval(date("Y/m/d", strtotime($fromDate)));

    $stmt = mysqli_stmt_init($conn);
    if(!mysqli_stmt_prepare($stmt, $sql)) {
        header("Location: /index.php?p=rooms&f=". $floor ."&e=sql_fail");
        exit();
    } else {
        if (!is_numeric($roomName)) {
            // Creating new reservation
            mysqli_stmt_bind_param($stmt, "sssisss", $roomName, $name, $ico, $dph, $rFromDate, $expirDate, $floor);
        } else {
            // Reservation is only updating
            mysqli_stmt_bind_param($stmt, "ssissss", $name, $ico, $dph, $rFromDate, $expirDate, $floor, $roomName);
        }
        mysqli_stmt_execute($stmt);
    }
}
