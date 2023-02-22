<?php
$eMsg = "";
if(isset($_GET["e"])) {
    $e = $_GET["e"];
    if($e == "wrong_data") {
        $eMsg = "<p role='alert' class='text-danger m-3'>Zadejte platné uživatelské jméno a heslo.</p>";
    } elseif($e == "data_miss") {
        $eMsg = "<p role='alert' class='text-danger m-3'>Vyplňte prosím všechna povinná pole.</p>";
    }
}
?>
<div class="container">
    <div id="reservation_form" class="m-auto w-25 col-sn">
         <form action="/includes/php/login.php" method="post">
             <legend class="mt-4 h4 text-center"><b>Přihlašovací formulář</b></legend>
             <div class="mb-2">
                 <input type="text" placeholder="Jméno" name="username" class="form-control"/>
             </div>
             <div class="mb-2">
                 <input type="text" placeholder="Heslo" name="password" class="form-control"/>
             </div>
             <input type="submit" class="btn btn-dark w-100" value="Odeslat"/>
             <?php echo $eMsg; ?>
         </form>
        <?php
            if (isset($_SESSION["user"])) {
                echo "<a href='/includes/php/unset.php' class='btn btn-link w-100 text-decoration-none'>Jste přihlášen - odhlásit se</a>";
            }
        ?>
    </div>
</div>