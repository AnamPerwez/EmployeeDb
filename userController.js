// var bodyParser=require('body-parser');
// var mongoose=require('mongoose');
// var urlencodedParser=bodyParser.urlencoded({extended:false});
// mongoose.Connection('mongodb://127.0.0.1/employee_db');
// var employeeSchema=new mongoose.Schema({
//     name:String,salary:String,adress:String,department:String,age:String
// });
// var employees=mongoose.model('employees',employeeSchema);


// var bodyParser=require('body-parser');
var mongoose=require('mongoose');
// var urlencodedParser=bodyParser.urlencoded({extended:false});
var expressValidator=require('express-validator');
// var expressSession=require('express-session');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://anam:anam@ds147070.mlab.com:47070/employeedb');
var employeeSchema=new mongoose.Schema({
    // name:{
    //     type:String,
    //     required:true},age:String
    name:String,age:String
});
var userSchema=new mongoose.Schema({
 email:String,password:String
});
var Employee=mongoose.model('Employee',employeeSchema);
var User=mongoose.model('User',userSchema);
module.exports=function(app){
// app.use(expressValidator);    
// // app.use(expressSession({secret:'max',saveUninitialized:false,resave:false}));
app.use(expressValidator());
// app.use(function(req,res,next){
// var errors=req.validationErrors();
//  var messages=[];
// if(errors){
   
//     errors.forEach(function(error){
//         messages.push(error.msg);
//     })
// }
// // var errormessages=messages;
// next();
// });
app.get('/',function(req,res){
    var errors=req.validationErrors();
 var messages=[];
// if(errors){
   
//     errors.forEach(function(error){
//         messages.push(error.msg);
//     })
// }
    res.render('frontpage',{messages:messages}) //,{success:false,errors:req.session.errors}
    // req.session.errors=null;
});
app.get('/viewall',function(req,res){
    Employee.find({},function(err,data){
        if(err) throw err;
         res.render('viewall',{data:data})
    });
       
});
app.get('/add',function(req,res){
    res.render('add');
});
app.post('/add',function(req,res){ //,urlencodedParser
    var employee=Employee(req.body).save(function(err,data){
        if(err) throw err;
        console.log('successfully added');
        res.redirect('/viewall');
    })
  
});
app.get('/delete',function(req,res){
res.render('delete');
});
app.post('/delete',function(req,res){ //,urlencodedParser
    //delete by name
    // Employee.find({name:req.body.name}).remove(function(err,data){
    //     if(err) throw err;
    //     console.log('successfully removed');
    //     res.redirect('/');
    // });
    

    //delete by id
    //var id=req.body.is
   Employee.findByIdAndRemove(req.body.id).exec();
   res.redirect('/viewall');
});
app.get('/update',function(req,res){
res.render('update');
});
app.post('/update',function(req,res){ //,urlencodedParser
 var id = req.body.id;
  Employee.findById(id,function(err,data){
      if(err) throw err;
      data.name=req.body.name;
      data.age=req.body.age;
      data.save();
        res.redirect('/viewall');
  });
//   UserData.findById(id, function(err, doc) {
//     if (err) {
//       console.error('error, no entry found');
//     }
//     doc.title = req.body.title;
//     doc.content = req.body.content;
//     doc.author = req.body.author;
//     doc.save();
//   })
//   res.redirect('/');
// res.redirect('/');
});

app.post('/signup',function(req,res){
req.checkBody('email','Email field is empty').notEmpty();  
req.checkBody('email','Invalid email').isEmail();
req.checkBody('password','Password must be not less than 4 chars').isLength({min:4});
req.checkBody('password','Passowrd field is empty').notEmpty();
req.checkBody('password','Passowrd do not match').matches(req.body.confirm_password);
// var errors=req.validationErrors();
// if(errors){
//     var messages=[];
//     errors.forEach(function(error){
//         messages.push(error.msg);
//     })
// }
var errors=req.validationErrors();
 var messages=[];
if(errors){
   
    errors.forEach(function(error){
        messages.push(error.msg);
    });
    res.render('frontpage',{messages:messages});
}else{
var user=User(req.body).save(function(err,data){
    if (err)throw err;
    console.log('user created');
    res.redirect('/viewall');
})
}
});

app.post('/login',function(req,res){
    // var EMAIL=REQ.BODY.EMAIL //agar var use krny hn tu
    User.findOne({email:req.body.email,password:req.body.password},function(err,data){  //left p schema wala right p  body wla
        if(err) throw err;
        else 
        res.redirect('/viewall');
    }) 
});
}    

