const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const params = {
    host: "localhost",
    user: "root",
    password: "1234",
    database: "ghost"
}

const conn = mysql.createConnection(params);
conn.connect((err) => {
    if(err) throw err;
    console.log("Connected to database...");
});

app.get("/indexTextEN", (req, res) => {
    let query = "select div_id, content from text_en_1";
    conn.query(query, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

app.get("/indexTextSR", (req, res) => {
    let query = "select div_id, content from text_sr_1";
    conn.query(query, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

app.get("/blobs1html", (req, res) => {
    let query = "select to_base64(img) as img, media_type, html_id from media_1_html";
    conn.query(query, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

app.get("/blobs1css", (req, res) => {
    let query = "select to_base64(img) as img, media_type, html_id from media_1_css";
    conn.query(query, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

app.get("/storeItemsENLoad", (req, res) => {
    let query = "select to_base64(img) as img, item, stock, price, item_name, item_description from item_inventory join items_en on item_inventory.id = items_en.item";
    conn.query(query, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

app.post("/storeItemsEN", (req, res) => {
    let query = "select to_base64(img) as img, item, stock, price, item_name, item_description from item_inventory join items_en on item_inventory.id = items_en.item where item_name like ?";
    conn.query(query, ["%" + req.body.search + "%"], (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});

app.post("/storeItemsBuy", (req, res) => {
    let query = "insert into sales(time_sold, copies_sold, item) values (now(), 1, ?);";
    conn.query(query, [req.body.item_id], (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});

app.listen(8008, () => {
    console.log("Server running on port 8008");
});