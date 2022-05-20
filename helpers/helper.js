

var db=require('../config/connection')
var collection=require('../config/collections');

var objectId = require('mongodb').ObjectId

 
module.exports ={


    getAllUser:()=>{
        return new Promise(async function (resolve,reject){
            let users = await db.get().collection(collection.USER_COLLECTION).find().toArray()
            resolve(users)
        })
    },
   deleteUser:(userId)=>{
 return new Promise( (resolve,reject)=>{
     db.get().collection(collection.USER_COLLECTION).deleteOne({_id:objectId(userId)}).then(
         (response)=>{
             console.log(response);
             resolve(response)

         }
     )
 } )
   }
,

updateUser:(userId,userDetails)=>{
    return new Promise((resolve,reject)=>{
        db.get().collection(collection.USER_COLLECTION)
        .updateOne({_id:objectId(userId)},{
            $set:{
                username:userDetails.name,
           
                email:userDetails.email,
            
            }
        }).then((response)=>{
            resolve()

        })
    })
},



}