var express=require('express');
var router=express.Router();


router.get("/",function(req,res,next){
    //res.send('Index Page');
    res.render('index',{title:'**Express Mongo**'});
});


module.exports=router;