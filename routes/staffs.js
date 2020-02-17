const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

const Staff=require('../models/staff');

router.post('/signup',(req,res,next)=>{
    Staff.find({email:req.body.email})
    .exec()
    .then(staff=>{
        if(staff.length>=1){
            return res.status(409).json({
                message:'Email Already Existed'
            });
        } else{
            bcrypt.hash(req.body.password,10,(err,hash)=>{
                if(err){
                    return res.status(500).json({
                        error:err,
                        message:'hash Failed'
                    });
                }else{
                const staff=new Staff({
                    _id:new mongoose.Types.ObjectId(),
                    firstName:req.body.firstName,
                    lastName:req.body.lastName,
                    email:req.body.email,
                    password:hash
                    });
                    staff.save()
                    .then(result=>{
                        console.log(result);
                        res.status(201).json({
                            message:'staff Created'
                        });
                    })
                    .catch(err=>{
                        console.log(err);
                        res.status(500).json({
                            error:err,
                            message:'Error creating Staff'
                        });
                    });
                }
            });        
        }  
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err,
            message:'Error Total'
        });
    });
    
});


router.post('/login',(req,res,next)=>{
    Staff.findOne({ email: req.body.email })
    .then((staff) => {
        if (staff === null) {
            let err = new Error('Staff not found!');
            err.status = 401;
            return next(err);
        }
        bcrypt.compare(req.body.password, staff.password, function (err, status) {
            if (!status) {
                let err = new Error('Password does not match!');
                err.status = 401;
                return next(err);
            }
            res.json({ status: 'Login Successful!' });
        });
    }).catch(next)
});


module.exports=router;