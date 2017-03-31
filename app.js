//install express mongoose ejs bodyparser
var express=require('express');

var bodyParser=require('body-parser');
var userController=require('./controllers/userController');
var app=express();
app.set('view engine','ejs');
app.use(express.static('static1'));
app.use(bodyParser.urlencoded({extended:false}));
userController(app);

app.listen(3000,function(){
    console.log('app working at port 3000 ');
});