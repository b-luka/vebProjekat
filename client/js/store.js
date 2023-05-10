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
            html += "<button class=\"buy_now\" id=\"buy_now_btn_" + item.id + "\">Buy now</button>";
            if (item.stock <= 0) html += "<div class=\"out_of_stock_overlay\">OUT OF STOCK</div>";

            // test
            if (item.stock > 0) {
                html += "<div class=\"buy_menu\" id=\"buy_menu_" + item.id + "\">";
                html += "<div class=\"buy_display\" id=\"buy_display_" + item.id + "\">";
                html += "<img src=\"data:image/png;charset=utf-8;base64, " + item.img +"\">";
                html += "<button class=\"buy_close\" id=\"buy_close\">X</button>";
                html += "<div class=\"buy_float_right\">";
                html += "<p class=\"buy_item_name\">" + item.item_name + "</p>";
                html += "<p class=\"buy_item_description\">" + item.item_description + "</p>";
                html += "<p class=\"buy_item_price\">" + item.price + "$</p>";
                html += "<button class=\"buy_btn\" id=\"buy_btn_" + item.id + "\">BUY NOW</button></div></div></div>";
            }

            html += "</div>";
            document.getElementById("store_items").innerHTML = html;
        });

        items.forEach(item => {
            document.getElementById("buy_now_btn_" + item.id).addEventListener("click", () => {
                console.log(document.getElementById("buy_menu_" + item.id));
                document.getElementById("buy_menu_" + item.id).style.display = "block";
            });
        });

        items.forEach(item => {
            let btnArray = document.getElementsByClassName("buy_close");
            let divArray = document.getElementsByClassName("buy_menu");
            for (let i = 0; i < btnArray.length; i++) {
                for (let j = 0; j < divArray.length; j++) {
                    btnArray[i].addEventListener("click", () => {
                        divArray[j].style.display = "none";
                    });
                }
            }
        });

        items.forEach(item => {
            if (item.stock > 0) {
                document.getElementById("buy_btn_" + item.id).addEventListener("click", () => {
                    console.log(item.id);

                    const data = {
                        item_id: item.id
                    };
                
                    const options = {
                        method: "post",
                        body: JSON.stringify(data),
                        headers: {"Content-type":"application/json; charset=UTF-8"}
                    };

                    fetch("http://localhost:8008/storeItemsBuy", options)
                    .then(res => res.json)
                    .then(json => {
                        console.log("bought item");
                        console.log(json);
                    })
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
            html += "<p class=\"stock_display\">Stock: " + item.stock + "</p>";
            html += "<button class=\"buy_now\" id=\"buy_now_btn_" + item.id + "\">Buy now</button>";
            if (item.stock <= 0) html += "<div class=\"out_of_stock_overlay\">OUT OF STOCK</div>";

            // test
            if (item.stock > 0) {
                html += "<div class=\"buy_menu\" id=\"buy_menu_" + item.id + "\">";
                html += "<div class=\"buy_display\" id=\"buy_display_" + item.id + "\">";
                html += "<img src=\"data:image/png;charset=utf-8;base64, " + item.img +"\">";
                html += "<button class=\"buy_close\" id=\"buy_close\">X</button>";
                html += "<div class=\"buy_float_right\">";
                html += "<p class=\"buy_item_name\">" + item.item_name + "</p>";
                html += "<p class=\"buy_item_description\">" + item.item_description + "</p>";
                html += "<p class=\"buy_item_price\">" + item.price + "$</p>";
                html += "<button class=\"buy_btn\" id=\"buy_btn_" + item.id + "\">BUY NOW</button></div></div></div>";
            }

            html += "</div>";
            document.getElementById("store_items").innerHTML = html;
        });

        items.forEach(item => {
            document.getElementById("buy_now_btn_" + item.id).addEventListener("click", () => {
                console.log(document.getElementById("buy_menu_" + item.id));
                document.getElementById("buy_menu_" + item.id).style.display = "block";
            });
        });

        items.forEach(item => {
            let btnArray = document.getElementsByClassName("buy_close");
            let divArray = document.getElementsByClassName("buy_menu");
            for (let i = 0; i < btnArray.length; i++) {
                for (let j = 0; j < divArray.length; j++) {
                    btnArray[i].addEventListener("click", () => {
                        divArray[j].style.display = "none";
                    });
                }
            }
        });

        items.forEach(item => {
            if (item.stock > 0) {
                document.getElementById("buy_btn_" + item.id).addEventListener("click", () => {
                    console.log(item.id);

                    const data = {
                        item_id: item.id
                    };
                
                    const options = {
                        method: "post",
                        body: JSON.stringify(data),
                        headers: {"Content-type":"application/json; charset=UTF-8"}
                    };

                    fetch("http://localhost:8008/storeItemsBuy", options)
                    .then(res => res.json)
                    .then(json => {
                        console.log("bought item");
                        console.log(json);
                    })
                });
            }
        });
        
    });
}

if (lang == "en") {
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
            let html = "";
            json.forEach(item => {
                html += "<div class=\"store_item";
                if (item.stock <= 0) html += " out_of_stock";
                html += "\">";
                html += "<p class=\"item_name\">" + item.item_name + "</p>";
                html += "<img src=\"data:image/png;charset=utf-8;base64, " + item.img + "\">";
                html += "<p class=\"item_description\">" + item.item_description + "</p>";
                html += "<p class=\"stock_display\">Stock: " + item.stock + "</p>";
                html += "<button class=\"buy_now\" id=\"buy_now_btn_" + item.item + "\">Buy now</button>";
                if (item.stock <= 0) html += "<div class=\"out_of_stock_overlay\">OUT OF STOCK</div>";

                if (item.stock > 0) {
                    html += "<div class=\"buy_menu\" id=\"buy_menu_" + item.item + "\">";
                    html += "<div class=\"buy_display\" id=\"buy_display_" + item.id + "\">";
                    html += "<img src=\"data:image/png;charset=utf-8;base64, " + item.img +"\">";
                    html += "<button class=\"buy_close\" id=\"buy_close\">X</button>";
                    html += "<div class=\"buy_float_right\">";
                    html += "<p class=\"buy_item_name\">" + item.item_name + "</p>";
                    html += "<p class=\"buy_item_description\">" + item.item_description + "</p>";
                    html += "<p class=\"buy_item_price\">" + item.price + "$</p>";
                    html += "<button class=\"buy_btn\" id=\"buy_btn_" + item.item + "\">BUY NOW</button></div></div></div>";
                }

                html += "</div>";
                document.getElementById("store_items").innerHTML = html;
            });

            json.forEach(item => {
                document.getElementById("buy_now_btn_" + item.item).addEventListener("click", () => {
                    console.log(document.getElementById("buy_menu_" + item.item));
                    document.getElementById("buy_menu_" + item.item).style.display = "block";
                });
            });

            let btnArray = document.getElementsByClassName("buy_close");
            let divArray = document.getElementsByClassName("buy_menu");
            for (let i = 0; i < btnArray.length; i++) {
                for (let j = 0; j < divArray.length; j++) {
                    btnArray[i].addEventListener("click", () => {
                        divArray[j].style.display = "none";
                    });
                }
            }

            json.forEach(item => {
                if (item.stock > 0) {
                    document.getElementById("buy_btn_" + item.item).addEventListener("click", () => {
                        console.log(item.id);

                        const data = {
                            item_id: item.item
                        };
                    
                        const options = {
                            method: "post",
                            body: JSON.stringify(data),
                            headers: {"Content-type":"application/json; charset=UTF-8"}
                        };

                        fetch("http://localhost:8008/storeItemsBuy", options)
                        .then(res => res.json)
                        .then(json => {
                            console.log("bought item");
                            console.log(json);
                        })
                    });
                }
            });

        });
    });
}

if (lang == "sr") {
    document.getElementById('search').addEventListener("input", () => {
        const data = {
            search: document.getElementById('search').value
        };
    
        const options = {
            method: "post",
            body: JSON.stringify(data),
            headers: {"Content-type":"application/json; charset=UTF-8"}
        };
    
    
        fetch("http://localhost:8008/storeItemsSR", options)
        .then(res => res.json()) //.json())
        .then(json => {
            let html = "";
            json.forEach(item => {
                html += "<div class=\"store_item";
                if (item.stock <= 0) html += " out_of_stock";
                html += "\">";
                html += "<p class=\"item_name\">" + item.item_name + "</p>";
                html += "<img src=\"data:image/png;charset=utf-8;base64, " + item.img + "\">";
                html += "<p class=\"item_description\">" + item.item_description + "</p>";
                html += "<p class=\"stock_display\">Stock: " + item.stock + "</p>";
                html += "<button class=\"buy_now\" id=\"buy_now_btn_" + item.item + "\">Buy now</button>";
                if (item.stock <= 0) html += "<div class=\"out_of_stock_overlay\">OUT OF STOCK</div>";
    
                if (item.stock > 0) {
                    html += "<div class=\"buy_menu\" id=\"buy_menu_" + item.item + "\">";
                    html += "<div class=\"buy_display\" id=\"buy_display_" + item.id + "\">";
                    html += "<img src=\"data:image/png;charset=utf-8;base64, " + item.img +"\">";
                    html += "<button class=\"buy_close\" id=\"buy_close\">X</button>";
                    html += "<div class=\"buy_float_right\">";
                    html += "<p class=\"buy_item_name\">" + item.item_name + "</p>";
                    html += "<p class=\"buy_item_description\">" + item.item_description + "</p>";
                    html += "<p class=\"buy_item_price\">" + item.price + "$</p>";
                    html += "<button class=\"buy_btn\" id=\"buy_btn_" + item.item + "\">BUY NOW</button></div></div></div>";
                }
    
                html += "</div>";
                document.getElementById("store_items").innerHTML = html;
            });
    
            json.forEach(item => {
                document.getElementById("buy_now_btn_" + item.item).addEventListener("click", () => {
                    console.log(document.getElementById("buy_menu_" + item.item));
                    document.getElementById("buy_menu_" + item.item).style.display = "block";
                });
            });
    
            let btnArray = document.getElementsByClassName("buy_close");
            let divArray = document.getElementsByClassName("buy_menu");
            for (let i = 0; i < btnArray.length; i++) {
                for (let j = 0; j < divArray.length; j++) {
                    btnArray[i].addEventListener("click", () => {
                        divArray[j].style.display = "none";
                    });
                }
            }
    
            json.forEach(item => {
                if (item.stock > 0) {
                    document.getElementById("buy_btn_" + item.item).addEventListener("click", () => {
                        console.log(item.id);
    
                        const data = {
                            item_id: item.item
                        };
                    
                        const options = {
                            method: "post",
                            body: JSON.stringify(data),
                            headers: {"Content-type":"application/json; charset=UTF-8"}
                        };
    
                        fetch("http://localhost:8008/storeItemsBuy", options)
                        .then(res => res.json)
                        .then(json => {
                            console.log("bought item");
                            console.log(json);
                        })
                    });
                }
            });
    
        });
    });
    
}