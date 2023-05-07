var lang = sessionStorage.getItem("lang");

document.getElementById('lang_en').addEventListener('click', () => {
    lang = "en";
    sessionStorage.setItem("lang", lang);
    console.log(lang);

});

document.getElementById('lang_sr').addEventListener('click', () => {
    lang = "sr";
    sessionStorage.setItem("lang", lang);
    console.log(lang);

});

let buy_id = 0;

const getLogo = async () => {
    const res = await fetch("http://localhost:8008/logo");
    const data = await res.json();

    return data;
}

getLogo().then(rows => {
    rows.forEach(row => {
        document.getElementById(row.html_id).setAttribute('src', "data:image/png;charset=utf-8;base64, " + row.img);
    });
});

const getBlobs = async () => {
    const res = await fetch("http://localhost:8008/blobs4html");
    const data = await res.json();

    return data;
}

getBlobs().then(rows => {
    rows.forEach(row => {
        if (row.media_type == "mp4") {
            document.getElementById(row.html_id).setAttribute('src', "data:video/mp4;charset=utf-8;base64, " + row.img);
        } else if (row.media_type == "png") {
            document.getElementById(row.html_id).setAttribute('src', "data:image/png;charset=utf-8;base64, " + row.img);
        } else if (row.media_type == "webp") {
            document.getElementById(row.html_id).setAttribute('src', "data:image/webp;charset=utf-8;base64, " + row.img);
        }
    });
});

const getItemsENLoad = async () => {
    const res = await fetch("http://localhost:8008/storeItemsENLoad");
    const data = await res.json();

    return data;
}

const getItemsSRLoad = async () => {
    const res = await fetch("http://localhost:8008/storeItemsSRLoad");
    const data = await res.json();

    return data;
}

if (lang == "en") {
    getItemsENLoad().then(items => {
        let html = "";
        items.forEach(item => {
            html += "<div class=\"store_item";
            if (item.stock <= 0) html += " out_of_stock";
            html += "\">";
            html += "<p class=\"item_name\">" + item.item_name + "</p>";
            html += "<img src=\"data:image/png;charset=utf-8;base64, " + item.img + "\">";
            html += "<p class=\"item_description\">" + item.item_description + "</p>";
            html += "<p class=\"stock_display\">Stock: " + item.stock + "</p>";
            html += "<button class=\"buy_now\">Buy now</button>";
            if (item.stock <= 0) html += "<div class=\"out_of_stock_overlay\">OUT OF STOCK</div>";
            html += "</div>";
    
            document.getElementById("store_items").innerHTML = html;
            let item_array = document.getElementsByClassName("store_item");
            for (let elem of item_array) {
                elem.getElementsByClassName("buy_now")[0].addEventListener("click", () => {
                    document.getElementById("buy_menu").style.display = "block";
                    let html2 = "";
                    html2 += "<div class=\"buy_display\">" +
                    "<img src=\"data:image/png;charset=utf-8;base64, " + item.img +"\">" +
                    "<button class=\"buy_close\" id=\"buy_close\">X</button>" +
                    "<div class=\"buy_float_right\">" +
                    "<p class=\"buy_item_name\">" + item.item_name + "</p>" +
                    "<p class=\"buy_item_description\">" + item.item_description + "</p>" +
                    "<p class=\"buy_item_price\">" + item.price + "$</p>" +
                    "<button class=\"buy_btn\">BUY NOW</button></div></div>";
                    document.getElementById("buy_menu").innerHTML = html2;
                    console.log(document.getElementById("buy_close"));
                    document.getElementById("buy_close").addEventListener("click", () => {
                        document.getElementById("buy_menu").style.display = "none";
                    });
                });
            }
        });
        
    });
}

if (lang == "sr") {
    getItemsSRLoad().then(items => {
        let html = "";
        items.forEach(item => {
            html += "<div class=\"store_item";
            if (item.stock <= 0) html += " out_of_stock";
            html += "\">";
            html += "<p class=\"item_name\">" + item.item_name + "</p>";
            html += "<img src=\"data:image/png;charset=utf-8;base64, " + item.img + "\">";
            html += "<p class=\"item_description\">" + item.item_description + "</p>";
            html += "<p class=\"stock_display\">Стање: " + item.stock + "</p>";
            html += "<button class=\"buy_now\">Купи</button>";
            if (item.stock <= 0) html += "<div class=\"out_of_stock_overlay\">НЕМА НА СТАЊУ</div>";
            html += "</div>";
    
            document.getElementById("store_items").innerHTML = html;
            let item_array = document.getElementsByClassName("store_item");
            for (let elem of item_array) {
                elem.getElementsByClassName("buy_now")[0].addEventListener("click", () => {
                    document.getElementById("buy_menu").style.display = "block";
                    let html2 = "";
                    html2 += "<div class=\"buy_display\">" +
                    "<img src=\"data:image/png;charset=utf-8;base64, " + item.img +"\">" +
                    "<button class=\"buy_close\" id=\"buy_close\">X</button>" +
                    "<div class=\"buy_float_right\">" +
                    "<p class=\"buy_item_name\">" + item.item_name + "</p>" +
                    "<p class=\"buy_item_description\">" + item.item_description + "</p>" +
                    "<p class=\"buy_item_price\">" + item.price + "$</p>" +
                    "<button class=\"buy_btn\">Купи сада</button></div></div>";
                    document.getElementById("buy_menu").innerHTML = html2;
                    console.log(document.getElementById("buy_close"));
                    document.getElementById("buy_close").addEventListener("click", () => {
                        document.getElementById("buy_menu").style.display = "none";
                    });
                });
            }
        });
        
    });
}

document.getElementById('search').addEventListener("input", () => {
    const data = {
        search: document.getElementById('search').value
    };

    const options = {
        method: "post",
        body: JSON.stringify(data),
        headers: {"Content-type":"application/json; charset=UTF-8"}
    };


    fetch("http://localhost:8008/storeItemsEN", options)
    .then(res => res.json()) //.json())
    .then(json => {
        //json => console.log(json);
        let html = "";
        json.forEach(item => {
            html += "<div class=\"store_item";
            if (item.stock <= 0) html += " out_of_stock";
            html += "\">";
            html += "<p class=\"item_name\">" + item.item_name + "</p>";
            html += "<img src=\"data:image/png;charset=utf-8;base64, " + item.img + "\">";
            html += "<p class=\"item_description\">" + item.item_description + "</p>";
            html += "<p class=\"stock_display\">Stock: " + item.stock + "</p>";
            html += "<button class=\"buy_now\">Buy now</button>";
            if (item.stock <= 0) html += "<div class=\"out_of_stock_overlay\">OUT OF STOCK</div>";
            html += "</div>";   
        });
        
        document.getElementById("store_items").innerHTML = html;
        let item_array = document.getElementsByClassName("store_item");
        for (let elem of item_array) {
            elem.getElementsByClassName("buy_now")[0].addEventListener("click", () => {
                document.getElementById("buy_menu").style.display = "block";
                let html2 = "";
                html2 += "<div class=\"buy_display\">" +
                "<img src=\"data:image/png;charset=utf-8;base64, " + item.img +"\">" +
                "<button class=\"buy_close\" id=\"buy_close\">close</button>" +
                "<div class=\"buy_float_right\">" +
                "<p class=\"buy_item_name\">" + item.item_name + "</p>" +
                "<p class=\"buy_item_description\">" + item.item_description + "</p>" +
                "<p class=\"buy_item_price\">" + item.price + "$</p>" +
                "<button class=\"buy_btn\">BUY NOW</button></div></div>";
                document.getElementById("buy_menu").innerHTML = html2;
                console.log(document.getElementById("buy_close"));
                document.getElementById("buy_close").addEventListener("click", () => {
                    document.getElementById("buy_menu").style.display = "none";
                });
            });
        }

    });
});


let item_array = document.getElementsByClassName("store_item");
for (let item of item_array) {
    console.log(item);
}
