import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
 app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "VivekBishnoi@4321",
  database: "test1",
});

//ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'VivekBishnoi@4321';

app.get("/", (req, res) => {
  res.json("hello");
});

app.get("/books", (req, res) => {
  const q = "SELECT * FROM newdata";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});



app.listen(8800, () => {
  console.log("Connected to backend.");
});