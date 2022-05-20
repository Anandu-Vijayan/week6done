var express = require("express");
const userHelper = require("../helpers/user-helper");
var router = express.Router();

router.get("/", (req, res, next) => {

    if(req.session.loggedIn){
  res.redirect('/');
    }else{

   res.render('login/login',{ login:true, logginErr: req.session.logginErr })
   req.session.logginErr=null

 }

});

router.post("/", (req, res, next) => {
 if(req.body.email&&req.body.password){ 

   userHelper.doLogin(req.body).then((response) => {

      if (response.status) {
        req.session.loggedIn = true;
        req.session.user = response.user;

        res.redirect("/");
   
      } else{
        req.session.logginErr="Invalid credentials"
         res.redirect('/login')

        
      }

  });



}
  

  //   res.redirect('/')
});

module.exports = router;
