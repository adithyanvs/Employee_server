const express = require("express")
const router = express.Router()
const users = require("../models/userSchema")



// router.get("/",(req,res) =>{
//     console.log("connect");
// })

//1.Register user data
router.post("/register",async(req,res) =>{
    // console.log(req.body);
    const {name,age,profession} = req.body

    if(!name || !age || !profession){
        res.status(404).json("Please fill the data")
    }

    try {
        
      const preuser = await users.findOne({name:name})
      console.log(preuser);

      if(preuser){
        res.status(404).json("This Employee is already present")
      }else{
        const adduser = new users({
            name,age,profession

        })

        await adduser.save()
        res.status(201).json(adduser)
        console.log(adduser);
      }

    } catch (error) {
        res.status(404).json(error)
    }
})

//2.Get user data

module.exports = router