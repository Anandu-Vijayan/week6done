var express = require('express');
const { route } = require('./user');
var router = express.Router();


var productHelper = require('../helpers/helper');
const helper = require('../helpers/helper');
const { response } = require('../app');
/* GET users listing. */

// let products=[
//   {
//     name:"Iphone 11",
//     category:"Mobile",
//     description:" made by apple,its a good phone",
//     image: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone11-green-select-2019_GEO_EMEA?wid=834&hei=1000&fmt=jpeg&qlt=95&.v=1567021766404",
//    price: "Rs 70000",
//   },
//   {
//     name:"Realme GT",
//     category:"Mobile",
//     description:" made by realme,its a good phone",
//     image: "https://shining.my/image/shining/image/cache/data/all_product_images/product-3074/UVsHO4Wl1630489727-800x800.jpg",
  
//     price: "Rs 21000",}
//   ,
//   {
//     name:" redmi note 10 ",
//     category:"Mobile",
//     description:" made by xiaomi,its a good phone",
//     image: "https://i01.appmifile.com/webfile/globalimg/zhouyuxin/K6-black-800.png",
//     price: "Rs 11000", }

//   ,
//   {
//     name:"samsung",
//     category:"Mobile",
//     description:" made by samsung ,its a good phone",
//     image: "https://m.media-amazon.com/images/I/51rkrZ8P1+L._AC_SL1080_.jpg",
//     price: "Rs 35000", }
  
// ] 




router.get('/', function(req, res, next) {
    if(req.session.logIn){
      productHelper.getAllUser().then((users) => {




   
        res.render('admin/user-data', {  users,admin:true} );
      }) 

    }else{
      res.render('login/adminLogin',{login:true})

 
    }

});

router.get('/logoutAdmin',(req,res)=>{

  req.session.destroy()

  res.redirect('/admin')
})


adminCred ={
  email:"admin@email.com",
  password:"12345"
}

router.get('/delete-user/:id',(req,res)=>{
  let userId=req.params.id

helper.deleteUser(userId).then((response)=>{
  res.redirect('/admin/')


})

})



router.post('/',function (req,res){

 if(req.body.email==adminCred.email && req.body.password == adminCred.password){
   req.session.logIn=true
       
   res.redirect('/admin')
   
 }else if(req.body.email==''||req.body.password==''){
  res.render('login/adminLogin',{login:true,warn:"Email or Password cannot be empty"})
 }else{
  res.render('login/adminLogin',{login:true,warn:"Invalid credentials     "})
 }
 
})



router.get('/edit-user/:id', async (req, res) => {

  let user = await productHelper.getAllUser(req.params.id)
  req.session.uid=req.params.id

  res.render('admin/edit-user', { user ,admin:true , uid: req.session.uid})
})

router.post('/edit-user/:id', (req, res) => {

  productHelper.updateUser(req.session.uid, req.body).then(() => {
console.log(req.body);

    res.redirect('/admin')
    
  })

})

// router.get('/add-product',(req,res)=>{
  
  
//   res.render('admin/add-product', {  products ,admin:true} )
//   console.log(req.body);
 

// })





// router.post('/add-product',(req,res)=>{
//   console.log(req.files.Image);
//  productHelper.addProduct(req.body)
// })

module.exports = router;
