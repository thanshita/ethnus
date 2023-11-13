const mongoose = require('mongoose');
const mongoURI='mongodb://yumontherun:Thanshi079@ac-8wo8fbx-shard-00-00.dv14vmu.mongodb.net:27017,ac-8wo8fbx-shard-00-01.dv14vmu.mongodb.net:27017,ac-8wo8fbx-shard-00-02.dv14vmu.mongodb.net:27017/yumontherunmern?ssl=true&replicaSet=atlas-6a9z1p-shard-0&authSource=admin&retryWrites=true&w=majority'
const mongoDB =async()=>{


await mongoose.connect(mongoURI,{useNewUrlParser:true},(err,result)=>{
    if(err) console.log("---",err)
    else{
     console.log("connected");
     const fetched_data = mongoose.connection.db.collection("food-items");
     fetched_data.find({}).toArray(function( err,data){
        if(err) console.log(err);
        else console.log();
     })
    }

});
}

module.exports = mongoDB;
