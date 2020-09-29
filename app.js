const express = require('express')
const path = require('path')
const app = express()
const bodyParser = require('body-parser')
const ejs = require('ejs')
const port = 3000
app.listen(port);
const mysql = require('mysql')

const con = mysql.createConnection({
	host: 'myexpdb.cjcnarb9og1a.ap-northeast-1.rds.amazonaws.com',
	user: 'mkmob',
	password: 'mkmd4649',
	database: 'express_db'	
});

con.connect(function(err) {
  if (err) throw err;
	console.log('Connected');
});


/*ボディパーサ追加*/
app.use(bodyParser.urlencoded({ extended: true }));
/*ejs登録*/
app.set('view engine', 'ejs');


/*一蘭表示*/
app.get('/', (req, res) => {
	const sql = "select * from users";	
	con.query(sql, function (err, result, fields) {  
	if (err) throw err;
	res.render('index',{users : result});
	});
		
});

app.get('/create', (req, res) => {
	//res.sendFile(path.join(__dirname, 'html/form.html'))
		res.render('form');
});

app.post('/', (req, res) => {             
		const sql = "INSERT INTO users SET ?"
		con.query(sql,req.body,function(err, result, fields){
		if (err) throw err;
		console.log(result);
		res.redirect('/');
	});
});

app.get('/delete/:id',(req,res)=>{
	const sql = "DELETE FROM users WHERE id = ?";
	con.query(sql,[req.params.id],function(err,result,fields){
		if (err) throw err;
		console.log(result)
		res.redirect('/');
	})
});

app.post('/update/:id',(req,res)=>{
	const sql = "UPDATE users SET ? WHERE id = " + req.params.id;
	con.query(sql,req.body,function(err,result,fields){
		if (err) throw err;
		console.log(result)
		res.redirect('/');
	})
});

app.get('/edit/:id',(req,res)=>{
	const sql = "SELECT * FROM users WHERE id = ?";
	con.query(sql,[req.params.id],function(err,result,fields){
		if (err) throw err;
		res.render('edit',{user : result});
	})
});

/*データベース作成*/		
//	con.query('CREATE DATABASE express_db', function (err, result) {
//		if (err) throw err; 
//		console.log('database created');
//	});		
/*テーブル作成*/
//	const sql = 'CREATE TABLE users (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, name VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL)';
//	con.query(sql, function (err, result) {  
//		if (err) throw err;  
//		console.log('table created');  
//	});
/*一覧表示*/		
//	const sql = "select * from users"
//	con.query(sql, function (err, result, fields) {  
//		if (err) throw err;  
//		console.log(result)
//	});

/*DB登録*/
//const sql = "INSERT INTO users(name,email) VALUES('kevin','kevin@test.com')"
//con.query(sql,function(err, result, fields){
//	if (err) throw err;
//	console.log(result)
//})


app.get('/users', (req, res) => {
	const sql = "select * from users";
	con.query(sql, function (err, result, fields) {  
	if (err) throw err;
	res.send(result);
	});
});

//app.get('/', (req, res) => res.send('Hellooooooooooooo Worldoooooooooo!'))
//app.listen(port, () => console.log(`Example app listening on port ${port}!`))