const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
// const bcrypt = require("bcrypt");

const app = express();
app.use(express.json());
app.use(cors());

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
/*
app.post("/createUser", async (req, res) => {
	const user = req.body.username;
	const hashedPassword = await bcrypt.hash(req.body.psswrd, 10);

	mysql.getConnection(async (err, connection) => {
		if (err) throw err;
		const sqlSearch = "select * from accounts where user = ?";
		const searchQuery = mysql.format(sqlSearch, [user]);

		const sqlInsert = "insert into accounts(username, psswrd) values (?, ?)";
		const isnertQuery = mysql.format(sqlInsert, [user, hashedPassword]);

		await connection.query(searchQuery, async (err, res) => {
			if (err) throw err;
			console.log("-------> Search Results");

			if (res.length != 0) {
				console.log("-------> User already exists!");
				res.sendStatus(409);
			} else {
				await connection.query(isnertQuery, (err, res) => {
					if (err) throw err;
					console.log("-------> Created new user");
					console.log(result.insertId);
					res.sendStatus(201);
				});
			}
		});
	});
});
app.post("/login", (req, res) => {
	const user = req.body.username;
	const password = req.body.psswrd;

	mysql.getConnection(async (err, connection) => {
		if (err) throw err;
		const sqlSearch = "select * from accounts where user = ?";
		const searchQuery = mysql.format(sqlSearch, [user]);
		
		await connection.query(searchQuery, async (err, result) => {
			connection.release();
			if (err) throw err;

			if (result.length == 0) {
				console.log("-------> User does not exist!");
				res.sendStatus(404);
			} else {
				const hashedPassword = result[0].psswrd;

				if (await bcrypt.compare(password, hashedPassword)) {
					console.log("-------> Login successful!");
					res.send(`${user} is logged in!`);
				} else {
					console.log("------> Password incorrect!");
				}
			}
		});
	});
});
*/
app.listen(8008, () => {
    console.log("Server running on port 8008");
});