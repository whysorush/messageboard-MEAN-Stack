var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
const cors = require('cors');
const { JsonWebTokenError } = require("jsonwebtoken");
app.use(cors())

app.use(bodyParser.json());

//---------------Declaring static message and login details

var messages =[{owner :'Rush', text:'Some1 Text' },{owner :'Rushabh', text:'Some12 Text'}];
var users = [{firstName:'a',lastName:'a',email:'a',password:'a', id:0}] ;

app.use((req,res,next) => {
    res.header("Access-Control-Allow-Origin",   "*");
    res.header("Acess-Control-Allow-Headers","Origin, X-Requested-With,Content-Type,Accept , Authorization");
    next()
})

var api = express.Router();
var auth = express.Router();

//---------------Route 

api.get('/messages',(req,res)=>{
    res.json(messages)
})


api.get('/messages/:user',(req,res)=>{
    var user = req.params.user;
    var result = messages.filter(message => message.owner == user);
    res.json(result);
})

api.post('/messages',(req,res)=>{
    // console.log(req.body);
    messages.push(req.body);
    res.json(req.body);
})  

api.get('/users/me',checkAuthenticated ,(req,res) => {
   res.json(users[req.user]);
})

api.post('/users/me',checkAuthenticated ,(req,res) => {
    var user = users[req.user];
    user.firstName=req.body.firstName;
    user.lastName =req.body.lastName;
    res.json(user);
 })
 

auth.post('/login',(req,res)=> {
    var user = users.find(user => user.email == req.body.email);
    if (!user)
        sendAuthError(res);
    
   if(user.password == req.body.password)
   {
    sendToken(user,res);
   }
   else
    sendAuthError(res);
   
})

auth.post('/register',(req,res)=>{
    console.log(req.body);
    var index = users.push(req.body) -1;

    var user=users[index];
    user.id =index;
    sendToken(user,res);
})

//--------------- Middleware Authentication function  

function sendToken(user,res){
    var token = jwt.sign(user.id,'123');
    res.json({firstName: user.firstName, token});
}
function sendAuthError(res){
   return res.json({success:false, message:'email or password incorrect'});
}
function checkAuthenticated (req,res,next){
    
    if(!req.header('authorization'))
    {
        res.status(401).send({message:'unauthorized requested. Missing authentation header'});
    }
    
    var token = req.header('authorization').split(' ')[1]   ;
    var payload = jwt.decode(token,' 123');
     

    if(!payload)
    {
        res.status(401).send({message:'unauthorized request authentation header invalid'});
    }
    req.user = payload;
    next();
}

app.use('/api',api);
app.use('/auth',auth);

app.listen(2000);