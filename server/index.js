const fs = require("fs");
const express = require("express");
const app = express();
const conn = require("./db/conn.js");
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');

const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: "Gla2023",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/', (req, res)=>{
    if (req.session.username) {
        res.redirect("/home");
    }
    else {
        res.sendFile("/client/index.html", {'root': './'});
    }
    
});

app.get('/home', (req, res)=>{
    if (req.session.username) {
        res.sendFile("/client/home.html", {'root': './'});
    }
    else {
        res.redirect("/");
    }
});
app.get('/data',(req,res)=>{
    res.status(200);
    conn.run().then(results => console.log(results));
});

app.post("/register",(req,res)=>{
    let data = req.body;
    data["questions"]={};
    data["_id"]=data["email"];
    delete data["email"];
    conn.addUser(data).then(function(r){
        if(r=="success"){
            res.status(200);
            res.send(r);
        }
        else{
            res.status(400);
            res.send(r);
        }
    });
})

app.post("/login",(req,res)=>{
    let data = req.body;
    data["_id"]=data["email"];
    delete data["email"];
    conn.checkUser(data).then(function(resp){
        if(resp["status"]=="success"){
            res.status(200);
            req.session.username = data["_id"];
            res.send(resp);
        }
        else{
            res.status(400);
            res.send(resp);
        }
    });
    
})

app.get("/logout",(req,res)=>{
    req.session.destroy();
    res.redirect("/");
})
app.listen(3000, (error) =>{
    if(!error)
        console.log("Server is Successfully Running,and App is listening on port "+ 3000)
    else 
        console.log("Error occurred, server can't start", error);
    }
);

app.post("/takeexam",(req,res)=>{
    if (req.session.username) {
        resp = req.body;
        var eid = resp["eid"];
        var rand = "";
        if(eid=="CUSTOM"){
            rand = resp["randomstring"];
            if(rand==null){
                res.redirect("/");
            }
        }
        conn.sendExamData(eid,rand,req.session.username).then(function(r2){
            req.session.examid = r2;
            res.sendFile("/client/exam.html", {'root': './'});
        });
    }
    else {
        res.redirect("/");
    }
})

