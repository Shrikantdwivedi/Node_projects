var express=require('express');

//exports mongodb access
var mongojs=require('mongojs');
var config=require('../config/index');


//connect to online databse on Mlab
//var db=mongojs(config.database_mlab, ['students']);

//Connect to local database
var db=mongojs(config.database_mlab, ['students']);


var router=express.Router();


router.get('/students',function(req,res,next){
   // res.send('Student Page');
   db.students.find((err,data)=>{
       if(err)
       res.send(err);
    
       res.json(data);
   })
});

//getting single response

router.get('/students/list/:id',(req,res,next)=>{
    // res.send('Student Page');
    db.students.findOne({_id:mongojs.ObjectId(req.params.id)},function(err,data){
        if(err){
        res.send(err);
        }
        res.json(data);
    });
 });

 //create Student
 router.post('/students/add',function(req,res,next){
     var student=req.body;

     if(!student.StartDate){
         student.StartDate=new Date();
     }
      
     if(!student.FirstName || !student.LastName || !student.School){
       res.status(400);
       res.json({"Error":"Bad Data, Could not inserted into the database"});
     }else{
         db.students.save(student,function(err,data){
             if(err){
             res.send(err);
              }

              res.json(data);
         });
     }
 });

 //delete Student
 router.get('/students/delete/:id',function(req,res,next){
    // res.send('Student Page');
    db.students.remove({_id:mongojs.ObjectId(req.params.id)},function(err,data){
        if(err){
        res.send(err);
        }
        res.json({"Deleted":"The Record has been Deleted Successfully!"});
        //res.json(data);  
    });
 });

 //update the Student
 router.put('/students/update/:id',function(req,res,next){
    var student=req.body;
    var changedStudent={};

    if(student.FirstName){
       changedStudent.FirstName=student.FirstName;
    }

    if(student.LastName){
        changedStudent.LastName=student.LastName;
     }

     if(student.School){
        changedStudent.School=student.School;
     }

     if(student.StartDate){
        changedStudent.StartDate=student.StartDate;
     }
     
    if(!changedStudent){
      res.status(400);
      res.json({"Error":"Bad Data, Could not Updated into the database"});
    }else{
        db.students.update({_id:mongojs.ObjectId(req.params.id)},changedStudent,{},function(err,data){
            if(err){
            res.send(err);
             }
             res.json({"Updated":"The Student Details has been updated Successfully!"});
        });
    }
});



module.exports=router;