var db = require("../config/connection");
var collection = require("../config/collections");
const bcrypt = require("bcrypt");
const async = require("hbs/lib/async");
module.exports = {

 signUpCheck: (email)=>{

    let response={}
 return new Promise(async(resolve,reject)=>{
     let Email=await db.get().collection(collection.USER_COLLECTION).findOne({email:email.email})
     if(Email){
         response.status=true
         resolve(response)
     }else{
         resolve({status:false})
     }
 })    
 }
,

  doSignup: (userData) => {
      
        return new Promise(async (resolve, reject) => {
            console.log("bcrypt");
            userData.password = await bcrypt.hash(userData.password, 10)
            userData.confirm_password = await bcrypt.hash(userData.confirm_password, 10)
            db.get().collection(collection.USER_COLLECTION).insertOne(userData).then((data) => {
                resolve(data)
            })

         
        })

    },

doLogin:(userData)=>{
    return new Promise(async(resolve,reject)=>{

        let loginStatus =false
       let response={
         
        }
        let user = await db.get().collection(collection.USER_COLLECTION).findOne({email:userData.email})
  
        if(user){
            bcrypt.compare(userData.password,user.password).then((status)=>{
                if(status){
                    console.log("login success")
                    response.user=user;
                    response.status = true
                    resolve(response)
                }else{
                    resolve({status:false})
                    console.log("login failed")
                }  
            })
        }else{
            console.log("Login failed");
            resolve({status:false})
        }
            

    })
},





};
