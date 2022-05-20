var express = require("express");
const { response } = require("../app");
var router = express.Router();
const MongoClient=require('mongodb').MongoClient;
const userHelper =require('../helpers/user-helper')

router.get("/", (req, res, next) => {
  



  if(req.session.loggedIn){

    res.redirect('/')
  

}else{
  res.render("signUp/signUp", { login: true ,signupError:req.session.signupError });
  req.session.signupError=false
}

});


router.post("/", (req, res, next) => {


userHelper.signUpCheck(req.body).then((response)=>{
if(response.status){
  req.session.signupError="Can't use same Email address"
      console.log('sign up error');
      res.redirect('/signup')

}else{ 

  userHelper.doSignup(req.body).then((response)=>{

    res.redirect('/login')
  })
}

})



  //   console.log(req.body);
  //   res.redirect('/')
});

module.exports = router;
