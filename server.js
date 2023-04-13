const sqlite = require('sqlite3').verbose();
let db = my_database('./gallery.db');

var express = require("express");
const { get } = require('underscore');
var app = express();

app.use(express.json());





/// 1. to retrieve the full data set (all rows currently stored in your local photo database)
app.get('/author', function(req, res) {
    // Example SQL statement to select the name of all products from a specific brand
	db.all(`SELECT * FROM gallery`, function(err, rows) {
		if (err) {
			res.status(400).send(err);
		 } 
		 else {
			return res.json(rows);
		 }
    });
});


/// 2. to add data for a new photo item (Create)
app.post("/author", function(req, res) {
    console.log(req.body);
    db.run(`INSERT INTO gallery (author, alt, tags, image, description) VALUES (?, ?, ?, ?, ?)`, [
        req.body.author,
        req.body.alt,
        req.body.tags,
        req.body.image,
        req.body.description
    ], function(err, rows){
		if (err) {
			res.status(400).send(err);
		} 
		else {
			return res.sendStatus(201).json(rows);
		}
	})
});


/// 3. to list the data of a specific item (Retrieve),
app.get("/author/:id", (req, res) => {
	let array = [];
	let select = "SELECT * from gallery WHERE id like ?";
	db.all(select, req.params.id, function(err, rows){
		if (err) {
			res.status(400).send(err);
		} 
		array.push(rows);
		if(array[0].length === 0){res.sendStatus(404);}
		array.splice(0);
	});
    db.all("SELECT * from gallery WHERE id like ?", req.params.id, function(err, rows){
			return res.json(rows);
	});
 });


/// 4. to change data of a specific item (Update)

app.put("/author/:id", function(req, res) {
	let select = "SELECT * from gallery WHERE id like ?";
	let sql = 'UPDATE gallery SET author=?, alt=?, tags=?, image=?,	description=? WHERE id=?';
	const element = req.body;
	let changes = [element.author, element.alt, element.tags, element.image, element.description, req.params.id];
	let array = [];
	db.all(select, req.params.id, function(err, rows){
		if (err) {
			res.status(400).send(err);
		} 
		array.push(rows);
		if(array[0].length === 0){res.sendStatus(404);}
		array.splice(0);
	});
	db.run(sql, changes, function(err, rows) {
			res.sendStatus(204);
	});
})

/// 5. to remove data of a specific item (Delete)
app.delete("/author/:id", (req, res) => {
	let array = [];
	let select = "SELECT * from gallery WHERE id like ?";
	db.all(select, req.params.id, function(err, rows){
		if (err) {
			res.status(400).send(err);
		} 
		array.push(rows);
		if(array[0].length === 0){res.sendStatus(404);}
		array.splice(0);
	});
    db.all("DELETE from gallery WHERE id like ?", req.params.id, function(err, rows){
			return res.sendStatus(204);
	});
        
 });


app.listen(3000);
console.log("Your Web server should be up and running, waiting for requests to come in. Try http://localhost:3000/hello");

// ###############################################################################
// Some helper functions called above
function my_database(filename) {
	// Conncect to db by opening filename, create filename if it does not exist:
	var db = new sqlite.Database(filename, (err) => {
  		if (err) {
			console.error(err.message);
  		}
  		console.log('Connected to the phones database.');
	});
	// Create our phones table if it does not exist already:
	db.serialize(() => {
		db.run(`
        	CREATE TABLE IF NOT EXISTS gallery
        	 (
                    id INTEGER PRIMARY KEY,
                    author CHAR(100) NOT NULL,
                    alt CHAR(100) NOT NULL,
                    tags CHAR(256) NOT NULL,
                    image char(2048) NOT NULL,
                    description CHAR(1024) NOT NULL
		 )
		`);
		db.all(`select count(*) as count from gallery`, function(err, result) {
			if (result[0].count == 0) {
				db.run(`INSERT INTO gallery (author, alt, tags, image, description) VALUES (?, ?, ?, ?, ?)`, [
        			"Tim Berners-Lee",
        			"Image of Berners-Lee",
        			"html,http,url,cern,mit",
        			"https://upload.wikimedia.org/wikipedia/commons/9/9d/Sir_Tim_Berners-Lee.jpg",
        			"The internet and the Web aren't the same thing."
    				]);
				db.run(`INSERT INTO gallery (author, alt, tags, image, description) VALUES (?, ?, ?, ?, ?)`, [
        			"Grace Hopper",
        			"Image of Grace Hopper at the UNIVAC I console",
        			"programming,linking,navy",
        			"https://upload.wikimedia.org/wikipedia/commons/3/37/Grace_Hopper_and_UNIVAC.jpg",
				"Grace was very curious as a child; this was a lifelong trait. At the age of seven, she decided to determine how an alarm clock worked and dismantled seven alarm clocks before her mother realized what she was doing (she was then limited to one clock)."
    				]);
				console.log('Inserted dummy photo entry into empty database');
			} else {
				console.log("Database already contains", result[0].count, " item(s) at startup.");
			}
		}); 
	});
	return db;
    
}
