<!DOCTYPE HTML>
<?php
    session_start();
    ?>
<html lang="cs">
    <head>
        <title>Nájemníci</title>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="/includes/css/main.css">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-wEmeIV1mKuiNpC+IOBjI7aAzPcEZeedi5yW5f2yOq55WWLwNGmvvx4Um1vskeMj0" crossorigin="anonymous">
        <meta name="viewport"
              content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <script src="includes/js/main.js"></script>
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-p34f1UUtsS3wqzfto5wAAmdvj+osOnFyQFpp4Ua3gs/ZVWx6oOypYoCJhGGScy+8" crossorigin="anonymous"></script>
    </head>
    <body>
        <nav class="navbar navbar-expand-sm navbar-default navbar-dark bg-dark sticky-top">
            <div class="container-fluid">
                    <a class="navbar-brand">Nájemníci</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToCollapse" aria-controls="#navbarToCollapse">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse justify-content-end" id="navbarToCollapse">
                        <ul class="navbar-nav nav navbar-right">
                            <li class="nav-item">
                                <a href="index.php?p=rooms" class="nav-link">Místnosti</a>
                            </li>
                            <li class="nav-item">
                                <a href="index.php?p=login" class="nav-link">Login</a>
                            </li>
                        </ul>
                    </div>
            </div>
        </nav>

        <?php

        if(!isset($_GET["p"]) == "p") {
            $p = "rooms";
        } else {
            $p = $_GET["p"];
        }

        if(preg_match('/^[a-zA-Z0-9]+$/', $p)) {
            $file = include("./includes/pages/".$p. ".php");
            if(!$file) {
                $p = "rooms";
                include("./includes/pages/".$p. ".php");
            }
        } else {
            $p = "rooms";
            include("./includes/pages/".$p. ".php");
        }
        ?>
    </body>
</html>