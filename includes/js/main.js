
function PutImgsTogether() {
    const containerLenght = document.getElementsByClassName("imgs_container").length;
    let container = document.getElementsByClassName("imgs_container");

    for (let i = 0; i < containerLenght; i++) {
        container[i].querySelectorAll(":scope > div").forEach(function (image_cont, index, div_image_conts) {
            let image = image_cont.childNodes[0].childNodes[0];
            if (index === 0) {
                // This is the first image
                image_cont.style.top = "0";
                image_cont.style.left = "0";
                image_cont.style.position = "absolute";
                image_cont.style.width =  image.width + "px";
                image_cont.style.height = image.height + "px";
            } else {
                if (image_cont.childNodes[0].childNodes[0].alt.includes("lower")) {
                    let image = image_cont.childNodes[0].childNodes[0];
                    let leftPos = 0;
                    for (let j = 0; j < index; j++) {
                        // Setting image left position by going through images before him on his half
                        if ((div_image_conts.item(j).childNodes[0].childNodes[0].alt.includes("lower") ||
                            div_image_conts.item(j).childNodes[0].childNodes[0].alt.includes("both")) &&
                            (!div_image_conts.item(j).childNodes[0].childNodes[0].alt.includes("skip") ||
                                div_image_conts.item(j).childNodes[0].childNodes[0].classList.contains("noskip"))) {
                            // This is image which is in half or in both halfes and can't be skipped.
                            leftPos = leftPos + div_image_conts.item(j).childNodes[0].childNodes[0].width;
                        } else if (div_image_conts.item(j).childNodes[0].childNodes[0].alt.includes("lower") &&
                                   div_image_conts.item(j).childNodes[0].childNodes[0].alt.includes("skip") &&
                                  !div_image_conts.item(j).childNodes[0].childNodes[0].classList.contains("noskip") &&
                                  !div_image_conts.item(j).childNodes[0].childNodes[0].alt.includes("both") ||
                                  (div_image_conts.item(j).childNodes[0].childNodes[0].alt.includes("both") &&
                                  !div_image_conts.item(j).childNodes[0].childNodes[0].alt.includes("noskip") &&
                                   div_image_conts.item(j).childNodes[0].childNodes[0].alt.includes("skip"))) {
                            // This is image which is in lower half and can be skipped or it is in both and can be skipped.
                            leftPos = leftPos + 80;
                        }
                    }


                    image_cont.style.top = div_image_conts.item(index - 1).childNodes[0].childNodes[0].height + "px";
                    image_cont.style.left = leftPos + "px";
                    image_cont.style.position = "absolute";
                } else {
                    let leftPos = 0;
                    for (let j = 0; j < index; j++) {
                        // Setting image left position by going through images before him on his half
                        if ((!div_image_conts.item(j).childNodes[0].childNodes[0].alt.includes("lower") ||
                            div_image_conts.item(j).childNodes[0].childNodes[0].alt.includes("both")) &&
                            (!div_image_conts.item(j).childNodes[0].childNodes[0].alt.includes("skip") ||
                                div_image_conts.item(j).childNodes[0].childNodes[0].classList.contains("noskip"))) {
                            // This is image which is in half or in both halfes and can't be skipped.
                            leftPos = leftPos + div_image_conts.item(j).childNodes[0].childNodes[0].width;
                        }  else if (!div_image_conts.item(j).childNodes[0].childNodes[0].alt.includes("lower") &&
                            div_image_conts.item(j).childNodes[0].childNodes[0].alt.includes("skip") &&
                            !div_image_conts.item(j).childNodes[0].childNodes[0].classList.contains("noskip") &&
                            !div_image_conts.item(j).childNodes[0].childNodes[0].alt.includes("both") ||
                            (div_image_conts.item(j).childNodes[0].childNodes[0].alt.includes("both") &&
                            !div_image_conts.item(j).childNodes[0].childNodes[0].alt.includes("noskip") &&
                            div_image_conts.item(j).childNodes[0].childNodes[0].alt.includes("skip")))  {
                            // This is image which is in higher half and can be skipped or it is in both and can be skipped.
                            leftPos = leftPos + 80;
                        }
                    }

                    image_cont.style.position = "absolute";
                    image_cont.style.left = leftPos + "px";
                }

                if (image.alt.includes("skip") && !image.classList.contains("noskip")) {
                    // Defining image which is supposed to be skipped
                    if (!image.alt.includes("lower")) {
                        image_cont.style.top = "0";
                    } else if (image.alt.includes("lower")) {
                        image_cont.style.top = "50%";
                    }
                    image_cont.style.height = "50%";
                    image_cont.style.width =  "50px";
                    image_cont.style.marginLeft = "25px";
                    image_cont.style.marginTop = "100px";
                } else {
                    image_cont.style.width =  image.width + "px";
                    image_cont.style.height = image.height + "px";
                    image_cont.style.marginLeft = "0";
                    image_cont.style.marginTop = "0";
                }
            }
        });
    }
}

function ShowReservationForm(image, folder, object) {
    let roomName = document.getElementById("roomName");
    roomName.value = image;

    let inputs = document.getElementById(object).querySelectorAll(".form-control, .form-select");
    if (inputs[1].value !== "")
        inputs[1].value = "";
    if (inputs[3].value !== "")
        inputs[3].value = "";
    if (inputs[4].value !== "")
        inputs[4].value = 1;
    if (inputs[5].value !== "")
        inputs[5].value = "";
    if (inputs[6].value !== "")
        inputs[6].value = "";

    if (roomName.name === "roomId") {
        roomName.name = "roomName";
    }

    if (document.getElementById("deleteText"))
        document.getElementById("deleteText").remove();

    ShowForm(object);

    let floorInput = document.getElementById("floorInput");
    floorInput.value = folder;

}

function ShowReservationChangeForm(object, name, ico, dph, fromDate, expirDate, folder, uId) {
    let inputs = document.getElementById(object).querySelectorAll(".form-control, .form-select");
    inputs[0].value = "" + uId;
    inputs[0].name = "roomId";
    inputs[1].value = name;
    inputs[2].value = folder;
    inputs[3].value = ico;
    inputs[4].value = parseInt(dph);
    inputs[5].value = fromDate;
    inputs[6].value = expirDate;

    if (!document.getElementById("deleteText")) {
        let deleteText = document.createElement("button");
        deleteText.setAttribute("type", "submit");
        deleteText.setAttribute("id", "deleteText");
        deleteText.setAttribute("name", "delete-button");
        deleteText.setAttribute("value", "Smazat rezervaci");
        deleteText.setAttribute("class", "btn btn-link w-100 text-decoration-none");
        deleteText.innerText = "Smazat rezervaci";

        document.getElementById(object).querySelector("form").append(deleteText);
    }
    ShowForm(object);
}

function ShowRes(object, name, ico, dph, fromDate, expirDate, folder, uId) {
    // Show reservation, but only with options for viewing
    ShowReservationChangeForm(object, name, ico, dph, fromDate, expirDate, folder, uId);
    if (document.getElementById("submitReservation"))
        document.getElementById("submitReservation").remove();

    if (document.getElementById("deleteText"))
        document.getElementById("deleteText").remove();
}

function ShowForm(object) {
    let form = document.getElementById(object);
    form.classList.contains("d-none");
    form.classList.remove("d-none");
    form.classList.add("d-block");
}

function HideForm(object) {
    let form = document.getElementById(object);
    if(!form.classList.contains("d-none")) {
        form.classList.add("d-none");
        form.classList.remove("d-block");
    }
}

function SetToLS(name, data) {
    localStorage.setItem(name, data);
}

function FillInputsFromLs() {
    // Setting fullscreen of pudorys by local storage
    if (localStorage.getItem("showFullscreen") !== null) {
        if (localStorage.getItem("showFullscreen") === "true") {
            document.getElementById("fullscreenEnabler").click();
        }
    }

    // Setting reservation visibility by local storage
    if (localStorage.getItem("showReservations") !== null) {
        if (localStorage.getItem("showReservations") === "false") {
            document.getElementById("checkResEnabler").click();
        }
    }

    // Setting skipped imgs visibility by local storage
    if (localStorage.getItem("showAllImgs") !== null) {
        if (localStorage.getItem("showAllImgs") === "true") {
            document.getElementById("checkImgEnabler").click();
        }
    }


}

function HighlightRoom(room, object, hlRoomParent) {
    let overlayRoom = document.getElementsByClassName("overlay-room")[0];
    if (overlayRoom)
        overlayRoom.remove();

    let overlay = document.createElement("div");
    overlay.setAttribute("class", "overlay-room");
    overlay.setAttribute("id", "overlay-" + room.alt);
    overlay.setAttribute("onclick", "HideForm('"+object+"'); RemoveDiv('overlay-" + room.alt + "'); RemoveDiv('infoDiv');   ");

    hlRoomParent.append(overlay);
}

function RemoveDiv(id) {
    if (document.getElementById(id))
        document.getElementById(id).remove();
}

function ShowRoomInfo(room, folder) {
    // Room names are stored in image's alts
    let roomName = room.alt;
    let infoObject = {};

    // Choosing pre-defined list of information about rooms based on floor
    switch (folder) {
        case "floor00":
            infoObject = {
                "room02_lower.png" : ["Strojovna VZT 0.04", "51m2", "Keramick?? dla??ba"],
                "room05_lower.png" : ["Technick?? m??stnost 0.25", "21,15m2", "Keramick?? dla??ba"],
                "room07_lower.png" : ["Sklad vybaven?? 0.05", "19,84m2", "Keramick?? dla??ba"],
                "room09_lower.png" : ["Sklad vybaven?? 0.06",  "19,41m2", "Keramick?? dla??ba"],
                "room11_lower.png" : ["Sklad vybaven?? 0.07", "21,36m2", "Keramick?? dla??ba"],
                "room13_lower.png" : ["Sklad vybaven?? 0.08; Strojovna VZT 0.09", "17,92m2; 71,67m2", "Keramick?? dla??ba; Keramick?? dla??ba"],
                "room14.png" : ["Strojovna NN 0.10", "9,9m2", "Keramick?? dla??ba"],
                "room15_lower.png" : ["V??tahov?? ??achta 0.12; V??tahov?? ??achta 0.13", "3,38m2; 3,38m2", "Protipra??n?? n??t??r; Protipra??n?? n??t??r"],
                "room17_lower.png" : ["Kotelna 0.24", "19,47m2", "Keramick?? dla??ba"],
                "room18.png" : ["D??lna 0.16", "19,88m2", "Epoxidov?? st??rka"],
                "room19_lower.png" : ["Sklad d??lny 0.17", "20,36m2", "Epoxidov?? st??rka"],
                "room21_lower.png" : ["Technick?? m??stnost 0.26", "20,74m2", "Epoxidov?? st??rka"],
                "room25_lower.png" : ["V??robna FVH 0.15", "347,55m2", "Epoxidov?? st??rka"],
                "room26.png" : ["M??stnost napravo naho??e od 0.15", "?", "?"],
                "room27_lower_divout.png" : ["M??stnost napravo dole od 0.15", "?", "?"],
            }
            break;
        case "floor01":
            infoObject = {
                "room00_both_divin.png" : ["Kancel???? 1.41; Restaurace 1.32", "9,11m2; 123,83m2", "keramick?? dla??ba; keramick?? dla??ba"],
                "room04_lower.png" : ["Denn?? m??stnost 1.18", "12,3m2", "Keramick?? dla??ba"],
                "room06_lower.png" : ["M??stnost napravo od 1.18", "+-34.09m2", "?"],
                "room08_lower.png" : ["Pronaj??mateln?? jednotka 1.15", "34.09m2", "Keramick?? dla??ba"],
                "room10_lower.png" : ["Pronaj??mateln?? jednotka 1.14; Sklad 1.23", "23.96m2; 10,87m2", "Keramick?? dla??ba; keramick?? dla??ba"],
                "room14_lower.png" : ["M??stnost technologi?? 1.50", "45.19m2", "Keramick?? dla??ba"],
                "room16_lower.png" : ["Spr??va objektu 1.52", "20,47m2", "Keramick?? dla??ba"],
                "room20_lower.png" : ["Kancel???? 1.57", "18,62m2", "Z??t????ov?? koberec"],
                "room22_lower.png" : ["Kancel???? 1.58", "18,58m2", "Z??t????ov?? koberec"],
                "room24_lower.png" : ["Denn?? m??stnost 1.59", "17,17m2", "Wormoleum"],
                "room26_lower.png" : ["??atna ??eny 1.62", "10,38m2", "Keramick?? dla??ba"],
                "room28_lower.png" : ["??atna mu??i 1.66", "2,01m2", "Keramick?? dla??ba"],
                "room29.png" : ["Laborato?? 1.68", "63,81m2", "Epoxidov?? st??rka"],
                "room30_lower_divout.png" : ["Laborato?? 1.69", "83,63m2", "Epoxidov?? st??rka"],
            }
            break;
        case "floor02":
            infoObject = {
                "room00_divin.png" : ["Kancel???? 2.08", "22,61m2", "Z??t????ov?? koberec"],
                "room01_lower.png" : ["Kancel???? 2.07", "40,15m2", "Z??t????ov?? koberec"],
                "room02.png" : ["Kancel???? 2.09", "16,31m2", "Z??t????ov?? koberec"],
                "room03.png" : ["Kancel???? 2.10", "16,31m2", "Z??t????ov?? koberec"],
                "room04_lower.png" : ["Kancel???? 2.06", "23,14m2", "Z??t????ov?? koberec"],
                "room06_lower.png" : ["Kancel???? 2.05", "22,2m2", "Z??t????ov?? koberec"],
                "room10_lower.png" : ["Kancel???? 2.18", "20,14m2", "Z??t????ov?? koberec"],
                "room12_lower.png" : ["Kancel???? 2.19", "20.46m2", "Z??t????ov?? koberec"],
                "room14_lower.png" : ["Kancel???? 2.20", "38,24m2", "Z??t????ov?? koberec"],
                "room18_lower.png" : ["Kongresov?? s??l II 2.30", "80,29m2", "Z??t????ov?? koberec"],
                "room19.png" : ["Bufet 2.28", "45,76m2", "Keramick?? dla??ba"],
                "room20_lower.png" : ["Kongresov?? s??l 2.35", "247,98m2", "Z??t????ov?? koberec"],
                "room21.png" : ["Galerie 2.34", "75,15m2", "Keramick?? dla??ba"],
                "room25_lower.png" : ["Kancel???? 2.51", "38,29m2", "Z??t????ov?? koberec"],
                "room27_lower.png" : ["Kancel???? 2.52", "22,39m2", "Z??t????ov?? koberec"],
                "room29_lower.png" : ["Kancel???? 2.53", "21,42m2", "Z??t????ov?? koberec"],
                "room33_lower.png" : ["Kancel???? 2.62", "23,35m2", "Z??t????ov?? koberec"],
                "room34.png" : ["Kancel???? 2.67", "16,09m2", "Z??t????ov?? koberec"],
                "room35_lower.png" : ["Kancel???? 2.63", "21,92m2", "Z??t????ov?? koberec"],
                "room36.png" : ["Kancel???? 2.66", "16,09m2", "Z??t????ov?? koberec"],
                "room37.png" : ["Kancel???? 2.65", "22,36m2", "Z??t????ov?? koberec"],
                "room38_lower_divout.png" : ["Kancel???? 2.64", "38,38m2", "Z??t????ov?? koberec"],
            }
            break;
        case "floor03":
            infoObject = {
                "room00_divin.png" : ["Kancel???? 3.17", "22,84m2", "Z??t????ov?? koberec"],
                "room01_lower.png" : ["Kancel???? 3.18", "40,38m2", "Z??t????ov?? koberec"],
                "room02.png" : ["Kancel???? 3.16", "16,28m2", "Z??t????ov?? koberec"],
                "room03_lower.png" : ["Kancel???? 3.19", "23,40m2", "Z??t????ov?? koberec"],
                "room04.png" : ["Kancel???? 3.15", "16,28m2", "Z??t????ov?? koberec"],
                "room05_lower.png" : ["Kancel???? 3.20", "22,10m2", "Z??t????ov?? koberec"],
                "room10_lower.png" : ["Kancel???? 3.06", "20,34m2", "Z??t????ov?? koberec"],
                "room12_lower.png" : ["Kancel???? 3.05", "20,78m2", "Z??t????ov?? koberec"],
                "room14_lower.png" : ["Kancel???? 3.04", "38,64m2", "Z??t????ov?? koberec"],
                "room18_lower.png" : ["Kancel???? 3.23", "11,63m2", "Z??t????ov?? koberec"],
                "room20_lower.png" : ["Kancel???? 3.24", "22,05m2", "Z??t????ov?? koberec"],
                "room22_lower.png" : ["Kancel???? 3.25", "20,95m2", "Z??t????ov?? koberec"],
                "room24_lower.png" : ["Kancel???? 3.26", "23,21m2", "Z??t????ov?? koberec"],
                "room26_lower.png" : ["Kancel???? 3.27", "39,88m2", "Z??t????ov?? koberec"],
                "room28_lower.png" : ["Kancel???? 3.29", "39,90m2", "Z??t????ov?? koberec"],
                "room30_lower.png" : ["Kuchy??ka 3.36", "14,06m2", "Marmoleum"],
                "room34_lower.png" : ["Kancel???? 3.44", "36,28m2", "Z??t????ov?? koberec"],
                "room36_lower.png" : ["Kancel???? 3.45", "22,75m2", "Z??t????ov?? koberec"],
                "room38_lower.png" : ["Kancel???? 3.46", "21,75m2", "Z??t????ov?? koberec"],
                "room42_lower.png" : ["Kancel???? 3.55", "23,37m2", "Z??t????ov?? koberec"],
                "room43.png" : ["Kancel???? 3.60", "16,28m2", "Z??t????ov?? koberec"],
                "room44_lower.png" : ["Kancel???? 3.56", "23,37m2", "Z??t????ov?? koberec"],
                "room45.png" : ["Kancel???? 3.59", "16,28m2", "Z??t????ov?? koberec"],
                "room46.png" : ["Kancel???? 3.58", "23,23m2", "Z??t????ov?? koberec"],
                "room47_lower_divout.png" : ["Kancel???? 3.57", "38,88m2", "Z??t????ov?? koberec"],
            }
            break;
        case "floor04":
            infoObject = {
                "room00_both_divin.png" : ["Kancel???? 4.04", "177,78m2", "Z??t????ov?? koberec"],
                "room03_lower.png" : ["Kancel???? 4.12", "45,23m2", "Z??t????ov?? koberec"],
                "room05_lower.png" : ["Kancel???? 4.14", "35,85m2", "Z??t????ov?? koberec"],
                "room08_lower.png" : ["Kancel???? 4.33", "22,29m2", "Z??t????ov?? koberec"],
                "room10_lower.png" : ["Kancel???? 4.17", "20,35m2", "Z??t????ov?? koberec"],
                "room12_lower.png" : ["Kancel???? 4.18", "23,43m2", "Z??t????ov?? koberec"],
                "room14_lower.png" : ["Kancel???? 4.19", "40,58m2", "Z??t????ov?? koberec"],
                "room16_lower.png" : ["Kancel???? 4.21", "44,84m2", "Z??t????ov?? koberec"],
                "room18_lower.png" : ["Chodba 4.01", "19,09m2", "Z??t????ov?? koberec"],
                "room20_lower.png" : ["Kuchy??ka 4.28", "15,05m2", "Marmoleum"],
                "room22_lower.png" : ["Strojovna VZT 4.36", "21,83m2", "Keramick?? dla??ba"],
                "room24_lower.png" : ["Kancel???? 4.37", "32,45m2", "Z??t????ov?? koberec"],
                "room26_lower.png" : ["Kancel???? 4.38", "30,45m2", "Z??t????ov?? koberec"],
                "room28_divout.png" : ["Kancel???? 4.39", "186,33m2", "Z??t????ov?? koberec"],
            }
            break;
    }

    // If room is listed in the object show div with information
    if (infoObject[roomName]) {
        if (document.getElementById("infoDiv"))
            document.getElementById("infoDiv").remove();

        // Creating the div with information
        let pudorysControlsDiv = document.getElementById("pudorys_controls");
        let infoDiv = document.createElement("div");
        infoDiv.id = "infoDiv";
        infoDiv.classList.add("col-sn", "w-50", "info-div");

        let infoText = document.createElement("p");
        infoText.innerHTML = "<b>"+infoObject[roomName][0]+"</b><br/>" +
            "Rozloha: "+infoObject[roomName][1]+"<br/>" +
            "Podlaha: "+infoObject[roomName][2];

        infoDiv.append(infoText);
        pudorysControlsDiv.append(infoDiv);
    }
}

function HideReservations() {
    let items = document.getElementsByClassName("reservations_container");
    if (items.length > 0) {
        for (let item of items) {
            if (item.classList.contains("d-none")) {
                item.classList.remove("d-none");
            } else {
                item.classList.add("d-none");
            }
        }
    }
}

function PudorysFullscreen() {
    let pudorysDiv = document.getElementsByClassName("pudorys_div")[0];

    let pudorys = document.getElementById("pudorys");
    if (!pudorys.classList.contains("pudorys_bigger")) {
        pudorys.classList.add("pudorys_bigger");
    } else {
        pudorys.classList.remove("pudorys_bigger");
    }

    let imgs_container = pudorysDiv.getElementsByClassName("imgs_container");
    console.log(imgs_container);
    if (imgs_container.length > 0) {
        console.log(imgs_container.length);
        for (let cont of imgs_container) {
            if (cont.classList.contains("bigger_container")) {
                cont.classList.remove("bigger_container");
                cont.classList.add("smaller_container");
            } else {
                cont.classList.remove("smaller_container");
                cont.classList.add("bigger_container");
            }
        }
    }

}

function ShowHiddenImgs(folder) {
    let imgs_skip = document.getElementsByClassName("img_skip");
    let checkBox = document.getElementById("checkImgEnabler");

    for (let img of imgs_skip) {
        if (!img.classList.contains("noskip")) {
            img.src = "../img/pudorys/" + folder + "/" + img.alt;
            img.setAttribute("onclick", "");
            img.classList.add("noskip");

            // Setting checkbox checked if function was triggered by another object
            if (!checkBox.checked) {
                checkBox.checked = true;
            }
        } else {
            img.src = "https://img.icons8.com/small/32/000000/hide.png/";
            img.classList.remove("noskip");
            img.setAttribute("onclick", "ShowHiddenImgs('"+folder+"');");
        }
    }
    IntervalImgsTogether();
}

function IntervalImgsTogether() {
    // Loading function after all imgs are loaded
    Promise.all(Array.from(document.getElementById("pudorys").querySelectorAll("img")).filter(img => !img.complete).map(img => new Promise(resolve => { img.onload = img.onerror = resolve; }))).then(() => {
        PutImgsTogether();
    });
}

function ChangeFloor(floor) {
    location.replace("/index.php?p=rooms&f=" + floor);
}