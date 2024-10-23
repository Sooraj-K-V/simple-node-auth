import express from "express"
import bodyParser from "body-parser"
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { log } from "console";
import morgan from "morgan";

const app = express();
const port = 3000;

const password1 = "ILoveCoding";
var userIsAuthorised = false;

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("tiny"));

function checkPassword(req, res, next){
    if(req.body["password"] === password1){
        userIsAuthorised = true;
    }
    next();
};
app.use(checkPassword)

app.get("/", (req, res) => {
    res.sendFile(__dirname+"/public/index.html");
});

app.post("/check", (req, res) => {
    if(userIsAuthorised){
        res.sendFile(__dirname+"/public/secret.html");
    }else{
        res.send("<h3>Password incorrect</h3>");
    }
});

app.listen(port, () => {
    console.log("Server running in port : 3000");
    
});