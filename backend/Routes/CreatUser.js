
const express = require('express')
const router = express.Router()
const {body,validationResult}=require('express-validator');
const User= require('../models/User')
router.post("/creatuser",
body('Email').isEmail(),
body('Name').isLength({min:5}),
body('Password','Incorrect Password').isLength({min:5}),
body('PhoneNumber').isLength({min:10})
,async (req,res)=>{

     const errors = validationResult(req);
     if(!errors.isEmpty()){
          return res.status(400).json({errors: errors.array()});
     }
        try{
           await User.create({
                Name:req.body.Name,
               
                Email:req.body.Email,
                PhoneNumber:req.body.PhoneNumber,
                Password:req.body.Password,
              


            }).then(res.json({success:true}))
          

        }catch (error)     {
             console.log(error)
             res.json({success:false});
        }
})

module.exports = router;