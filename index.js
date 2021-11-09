const mysql = require("mysql2");
const express = require("express");
const { Router } = require("express");
var app = express();
var mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "rootbinsu",
  database: "foodschema",
  multipleStatements: true,
});
mysqlConnection.connect((err) => {
  if (!err) console.log("Connection Established Successfully");
  else console.log("Connection Failed!" + JSON.stringify(err, undefined, 2));
});

app.listen(3000, () => console.log("express server is running"));

app.get("/categories", (req, res) => {
    mysqlConnection.query(
      "select * from categories;",
      (err, rows, fields) => {
        if (!err) res.send(rows);
        else console.log(err);
      }
    );
  });

  

  app.get("/fooditems", (req, res) => {
    mysqlConnection.query(
      "select * from fooditems;",
      (err, rows, fields) => {
        if (!err) res.send(rows);
        else console.log(err);
      }
    );
  });

  app.get('/fooditems/:id' , (req, res) => {
    mysqlConnection.query('SELECT * from fooditems WHERE foodid = ?',[req.params.id], (err, rows, fields) => {
    if (!err)
    res.send(rows);
    else
    console.log(err);
    })
    } );

  
app.get("/join", (req, res) => {
  mysqlConnection.query("select categories.categoriecode,categories.categorytype,fooditems.foodid,fooditems.foodname,fooditems.unit,fooditems.price from categories join fooditems on(categories.categoriecode=fooditems.categoriecode)",
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
});



  app.post('/fooditems/add' , (req, res) => {
    mysqlConnection.query("insert into fooditems(foodid,foodname,unit,price,categoriecode)values('67356','meals','full',200,344);", (err, rows, fields) => {
    if (!err)
    res.send(rows);
    else
    console.log(err);
    })
    } ); 





    app.delete('/fooditems/:id' , (req, res) => {
        mysqlConnection.query('delete from fooditems WHERE foodid= ?',[req.params.id],(err, rows, fields) => {
        if (!err)
        res.send(rows);
        else
        console.log(err);
        })
        } );
     

    //  app.patch('/fooditems/:id' , (req, res) => {
    //         mysqlConnection.query("update fooditems(foodid,foodname,unit,price,categoriecode)values('6565','shake','1 glass',1500,344);", (err, rows, fields) => {
    //         if (!err)
    //         res.send(rows);
    //         else
    //         console.log(err);
    //         })
    //         } ); 
        