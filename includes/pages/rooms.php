<?php
include_once("./includes/php/dbh.php");
include_once("./includes/php/rooms_lib.php");

// Error Handlers
$eMsg = "";
if (isset($_GET["e"])) {
    if ($_GET["e"] == "logged_bef") {
        $eMsg = "<p role='alert' class='text-danger m-3'>Už jste přihlášen.</p>";
    } elseif ($_GET["e"] == "data_miss") {
        $eMsg = "<p role='alert' class='text-danger m-3'>Vyplňte prosím všechna povinná pole.</p>";
    }  elseif ($_GET["e"] == "sql_fail") {
        $eMsg = "<p role='alert' class='text-danger m-3'>Omlouváme se, ale nastala neočekávaná chyba. Zkuste to prosím později.</p>";
    }
}

$sMsg = "";
if (isset($_GET["s"])) {
    $s = $_GET["s"];
    if ($s == "logged") {
        $sMsg = "<p role='alert' class='text-success m-3'>Byl jste úspěšně přihlášen.</p>";
    } elseif ($s == "res_maked") {
        $sMsg = "<p role='alert' class='text-success m-3'>Nájemník úspěšně evidován.</p>";
    } elseif ($s == "res_updated") {
        $sMsg = "<p role='alert' class='text-success m-3'>Nájemník úspěšně upraven.</p>";
    } elseif ($s == "res_deleted") {
        $sMsg = "<p role='alert' class='text-success m-3'>Nájemník úspěšně smazán.</p>";
    }
}
echo $eMsg;
echo $sMsg;
?>

<div class="container" id="room-container">
    <div class="pudorys_div">
        <div class="pudorys mt-5 pudorys_bigger" id="pudorys">
            <?php
            $floor = isset($_GET["f"]) ? $_GET["f"] : "floor00" ;

            $rooms = scandir("img/pudorys/$floor/");
            array_shift($rooms);
            array_shift($rooms);

            foreach ($rooms as $r) {
                if(strpos($r, "divin") !== false) {
                    echo "<div class='imgs_container bigger_container'><div>";
                    ShowReservation($r, $conn, "$floor");
                    echo "</div></div>";
                } elseif (strpos($r, "divout") !== false) {
                    echo "<div>";
                    ShowReservation($r, $conn, "$floor");
                    echo "</div></div></div>";
                } else {
                    echo "<div>";
                    ShowReservation($r, $conn, "$floor");
                    echo "</div></div>";
                }
            }

            ?>
        </div>
    </div>
    <div id="pudorys_controls" class="mt-5 w-100 row">
        <div class="col-sn w-25" id="search_form">
            <div class="row">
                <div>
                    <select onchange="ChangeFloor(this.value);" id="floorSelect" class="form-select form-select-lg mb-2">
                        <option value="floor00" <?php echo ($floor == "floor00") ? "selected" : ""; ?>>Suterén</option>
                        <option value="floor01" <?php echo ($floor == "floor01") ? "selected" : ""; ?>>Přízemí</option>
                        <option value="floor02" <?php echo ($floor == "floor02") ? "selected" : ""; ?>>Patro 1</option>
                        <option value="floor03" <?php echo ($floor == "floor03") ? "selected" : ""; ?>>Patro 2</option>
                        <option value="floor04" <?php echo ($floor == "floor04") ? "selected" : ""; ?>>Patro 3</option>
                    </select>
                </div>
                <form action="./index.php?f=<?php echo $floor ?>" id="dateForm" method="post">
                    <input type="submit" class="btn btn-dark w-100" value="Vyhledat nájemníky">
                    <input type="text" name="searchParam" placeholder="Název/IČO..." class="form-control"/>
                </form>
                <div>
                    <div class="form-check">
                        <input class="form-check-input" id="fullscreenEnabler" type="checkbox" onclick="PudorysFullscreen(); SetToLS('showFullscreen', this.checked);"/>
                        <label for="fullscreenEnabler" class="form-check-label">Zvětšit půdorys</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" id="checkResEnabler" type="checkbox" checked onclick="HideReservations(); SetToLS('showReservations', this.checked);"/>
                        <label for="checkResEnabler" class="form-check-label">Zobrazit nájemníky</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" id="checkImgEnabler" type="checkbox" onclick="ShowHiddenImgs('<?php echo $floor; ?>'); SetToLS('showAllImgs', this.checked);"/>
                        <label for="checkImgEnabler" class="form-check-label">Zobrazit všechny místnosti</label>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-sn d-none w-25" id="reservation_form">
            <form action="/includes/php/make_reservation.php" method="post">
                <div class="mb-2 row d-none" id="room-name-div">
                    <div class="col-sm mb-2">
                        <input type="text" placeholder="Místnost" name="roomName" readonly class="form-control" id="roomName"/>
                    </div>
                </div>
                <div class="mb-2">
                    <input type="text" placeholder="Název" name="name" class="form-control"/>
                </div>
                <div class="mb-2">
                    <input type="text" name="floor" id="floorInput" placeholder="Patro" readonly class="form-control d-none"/>
                </div>
                <div class="row mb-2">
                    <div class="col-sn w-50">
                        <input type="text" placeholder="IČO" name="ico" class="form-control"/>
                    </div>
                    <div class="col-sn w-50">
                        <select class="form-select" name="dph">
                            <option value="1">Plátce DPH</option>
                            <option value="0">Neplátce DPH</option>
                        </select>
                    </div>
                </div>
                <div class="mb-2">
                    <input type="date" name="dateFrom" class="form-control smaller-text"/>
                </div>
                <div class="mb-2">
                    <input type="text" placeholder="Výpovědní lhůta" name="expirDate" class="form-control" id="expir_date"/>
                </div>
                <input id="submitReservation" type="submit" name="reservation" class="btn btn-dark w-100" value="Odeslat"/>
            </form>
        </div>
    </div>
    <script type='text/javascript'>IntervalImgsTogether(); FillInputsFromLs();</script>
</div>

<?php
if (isset($_GET["e"])) {
    $e = $_GET["e"];
    if ($e = "data_miss" && isset($_GET["r"])) {
        $getRoom = $_GET["r"];
        echo "<script>ShowReservationForm('".$getRoom.", reservation_form');</script>";
    }
}

