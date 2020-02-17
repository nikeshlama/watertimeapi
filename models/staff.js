const mongoose=require('mongoose');

const staffSchema=mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
   email:{
       type:String,
       required:true,
       unique:true,
   },
   password:{
       type:String,
       required:true
   },
   firstName:{
       type:String,
       required:true
   }, 
   lastName:{
    type:String,
    required:true
}
});

module.exports=mongoose.model('Staff',staffSchema);
