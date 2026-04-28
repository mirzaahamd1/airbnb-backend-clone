const mongodb = require('mongodb')

const MongoClient = mongodb.MongoClient;

const url ="mongodb+srv://root:root@ahmad.cx0rky3.mongodb.net/?appName=AHMAD"

const mongoConnect = (callback)=>{
    MongoClient.connect(url).then((client)=>{
        console.log("Connected to MongoDB")
        callback(client)
    }).catch((err)=>{
        console.log("Error While Connecting",err);
        
    })
}


module.exports= mongoConnect



// const mysql = require('mysql2')

// const pool = mysql.createPool({
//     host:'localhost',
//     user:'aviator',
//     password:'aviator',
//     database:'aviator'
// })

// module.exports=pool.promise()