<?php

function ShowReservation($r, $conn, $folder) {
    echo "<div class='img_res_container'>";
    $availableRoom = False;

    if (!isset($_SESSION["user"]) || strpos($r, "nonactiv") !== false) {
        if (strpos($r, "skip") !== false) {
            $img = "<img class='img_skip' onclick='ShowHiddenImgs(&quot;$folder&quot;)' src='https://img.icons8.com/small/32/000000/hide.png/' alt='$r'/>";
        } elseif (strpos($r, "nonactiv") == false) {
            $availableRoom = True;
            $img = "<img src='/img/pudorys/$folder/$r' alt='$r'/>";
        }  else {
            $img = "<img src='/img/pudorys/$folder/$r' alt='$r'/>";
        }
    } else {
        if (strpos($r, "skip") !== false) {
            $img = "<img class='img_skip' onclick='ShowHiddenImgs(&quot;$folder&quot;)' src='https://img.icons8.com/small/32/000000/hide.png/' alt='$r'/>";
        } else {
            $availableRoom = True;
            $img = "<img src='/img/pudorys/$folder/$r' alt='$r'/>";
        }
    }

    if (!GetReservations($r, $conn, $folder) == "") {
        echo $img;
        echo "<div class='reservations_container text-center occupied_room'>";
        $res = GetReservations($r, $conn, $folder);
        $loggedResDiv = "<div class='border-top text-center p-1 flex'
        onclick='ShowReservationChangeForm(&quot;reservation_form&quot;, &quot;".$res['name']."&quot;, &quot;".$res['ico']."&quot;, &quot;".$res['dph']."&quot;, &quot;".$res['date_from']."&quot;, &quot;".$res['expir_date']."&quot;, &quot;" . $folder . "&quot;, &quot;".$res['id']."&quot;);
        HighlightRoom(this.parentElement.parentElement.childNodes[0], &quot;reservation_form&quot;, this.parentElement.parentElement);
        ShowRoomInfo(this.parentElement.parentElement.childNodes[0], &quot;" . $folder . "&quot;);'>";

        $resDiv = "<div class='border-top text-center p-1 flex'
        onclick='ShowRes(&quot;reservation_form&quot;, &quot;".$res['name']."&quot;, &quot;".$res['ico']."&quot;, &quot;".$res['dph']."&quot;, &quot;".$res['date_from']."&quot;, &quot;".$res['expir_date']."&quot;, &quot;" . $folder . "&quot;, &quot;".$res['id']."&quot;);
        HighlightRoom(this.parentElement.parentElement.childNodes[0], &quot;reservation_form&quot;, this.parentElement.parentElement);
        ShowRoomInfo(this.parentElement.parentElement.childNodes[0], &quot;" . $folder . "&quot;);'>";

        echo !isset($_SESSION["user"]) ? $resDiv : $loggedResDiv;
        echo "<div class='reservations_content'>";
        echo "<b class='res-title'>".$res["name"]."</b>";
        echo (!empty($res["ico"])) ? "<p/><b>IČO:</b> ".$res["ico"] : "";
        echo ($res["dph"] == 1) ? "<br/>Je plátce DPH" : "<br/>Není plátce DPH";
        echo "<br/><b>Výpovědní lhůta:</b></br> ".$res["expir_date"];
        echo "<br/><b>Od: </b>". $res["date_from"]."</p>";
        echo "</div>";
        echo "</div>";
        
        echo "</div>";
    } else {
        echo $img;
        if ($availableRoom && isset($_SESSION["user"])) {
            if (isset($_POST["searchParam"])) {
                echo "<div class='reservations_container available-room-disabled' onclick='ShowReservationForm(&quot;" . $r . "&quot;, &quot;" . $folder . "&quot;, &quot;reservation_form&quot;);
                HighlightRoom(this, &quot;reservation_form&quot;, this.parentElement); ShowRoomInfo(this.parentElement.childNodes[0], &quot;" . $folder . "&quot;);'></div>";
            } else {
                echo "<div class='reservations_container available-room' onclick='ShowReservationForm(&quot;" . $r . "&quot;, &quot;" . $folder . "&quot;, &quot;reservation_form&quot;);
                HighlightRoom(this, &quot;reservation_form&quot;, this.parentElement); ShowRoomInfo(this.parentElement.childNodes[0], &quot;" . $folder . "&quot;);'></div>";
            }
        } elseif ($availableRoom && !isset($_SESSION["user"])) {
            if (isset($_POST["searchParam"])) {
                if (!empty($_POST["searchParam"])) {
                    echo "<div class='reservations_container available-room-disabled' onclick='ShowRoomInfo(this.parentElement.childNodes[0], &quot;" . $folder . "&quot;); HideForm(&quot;reservation_form&quot;);'></div>";
                } else {
                    echo "<div class='reservations_container available-room' onclick='ShowRoomInfo(this.parentElement.childNodes[0], &quot;" . $folder . "&quot;); HideForm(&quot;reservation_form&quot;);'></div>";
                }
            } else {
                echo "<div class='reservations_container available-room' onclick='ShowRoomInfo(this.parentElement.childNodes[0], &quot;" . $folder . "&quot;); HideForm(&quot;reservation_form&quot;);'></div>";
            }
        }
    }
}

function GetReservations($r, $conn, $floor) {
    if (isset($_POST["searchParam"])) {
        $sql = "SELECT * FROM reservations WHERE roomName=? AND floor=? AND (name LIKE ? OR  ico LIKE ?)";
    } else {
        $sql = "SELECT * FROM reservations WHERE roomName=? AND floor=?";
    }
    $stmt = mysqli_stmt_init($conn);
    if(!mysqli_stmt_prepare($stmt, $sql)) {
        echo "Rezervace selhala, sql error";
    } else {
        if (isset($_POST["searchParam"])) {
            $search = "%".$_POST["searchParam"]."%";
            mysqli_stmt_bind_param($stmt, "ssss", $r, $floor, $search, $search);
        } else {
            mysqli_stmt_bind_param($stmt, "ss", $r, $floor);
        }
        
    // Changing to object-oriented is plain wrong, but using this old php too
    $stmt->execute();
    $stmt->store_result();
    $result = fetchAssocStatement($stmt);

    return $result;
    }
    return "";
}

function fetchAssocStatement($stmt) {
    if($stmt->num_rows>0) {
        $result = array();
        $md = $stmt->result_metadata();
        $params = array();
        while ($field = $md->fetch_field()) {
            $params[] = &$result[$field->name];
        }
        call_user_func_array(array($stmt, 'bind_result'), $params);
        if($stmt->fetch()) {
            return $result;
	}
    }

    return "";
}
