var express = require('express');
var router = express.Router();

/* GET home page. */

let products=[
  {
    name:"Iphone 11",
    category:"Mobile",
    description:" made by apple,its a good phone",
    image: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone11-green-select-2019_GEO_EMEA?wid=834&hei=1000&fmt=jpeg&qlt=95&.v=1567021766404",
  },
  {
    name:"Realme GT",
    category:"Mobile",
    description:" made by realme,its a good phone",
    image: "https://shining.my/image/shining/image/cache/data/all_product_images/product-3074/UVsHO4Wl1630489727-800x800.jpg",
  }
  ,
  {
    name:" redmi note 10 ",
    category:"Mobile",
    description:" made by xiaomi,its a good phone",
    image: "https://i01.appmifile.com/webfile/globalimg/zhouyuxin/K6-black-800.png",
  }

  ,
  {
    name:"samsung",
    category:"Mobile",
    description:" made by samsung ,its a good phone",
    image: "https://m.media-amazon.com/images/I/51rkrZ8P1+L._AC_SL1080_.jpg",
  }
  


]

router.get('/', function(req, res, next) {
  user= req.session.user
  
  

  res.render('index', {  products ,admin:false,user} );

});

router.get('/logout',function(req,res,next){
  req.session.destroy()
  res.redirect('/')

})

module.exports = router;
