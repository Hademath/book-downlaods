require("dotenv").config()
import { error } from 'console';
import express, {Request, Response, NextFunction } from 'express';
import fs, { writeFile, readFile } from "fs";
import path from 'path';
import cors from 'cors'
import{ Books } from './interface'
import swal from 'sweetalert';
import { Users } from './interface';

const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
// const session = require('session');
//const flash =require('connect-flash');
const flash = require('express-flash')
const session = require('express-session');


const router = express.Router();
const Joi = require('joi'); // this need to be install and require for editing purpose
 let users = require("../../users.json");
 let books = require("../../database.json");


let filePath = path.join(__dirname, '../../users.json');

/* GET home page. */
router.get('/users', function(req:Request, res:Response, next:NextFunction) {
    res.send(users)
});

  /* get specific user by id . */
  router.get('/users/:id', function(req:Request, res:Response, next:NextFunction) {
    
    const user = users.find(( getuser:Users)=> getuser.userId === parseInt(req.params.id));
    // if (user) return res.render('book_details', {user: user})
     res.status(404).send("The book with the id  was not found"); 
     res.send(user)   
 });


router.get('/signup', function(req:Request, res:Response, next:NextFunction) {
  //res.send(users);
  res.render('signup')
});

 

let date: Date = new Date();
router.post('/signup', async function(req:Request, res:Response, next:NextFunction) {
     if(!req.body.fullname||  !req.body.email || !req.body.dateOfBirth|| !req.body.password){
      return   res.status(400).json("Invalid de ails!")
}
    
    // let  user = await users.findOne({email:req.body.email});
    // if(user) return res.status(400).json('Email Already Exists! Login or choose another email')

    const  userEmail =    users.find((emails:any) => emails.email===req.body.email)   
    const salt = await bcrypt.genSalt(10)
    console.log(salt);

    if(!userEmail){
    const newUser : Users = {
      fullname: req.body.fullname,
      email : req.body.email.toLowerCase(),// sanitize: convert email to lowercase
      registerDate: date,
      userId: users.length + 1,
      dateOfBirth: req.body.dateOfBirth,
      password: await bcrypt.hash(req.body.password, salt), 
    
    }
     users.push(newUser);
     writeToDatabase(filePath, users)
     return  res.status(200).redirect('/login')
     //req.flash("success", ` logged in successfully!`);

     //res.status(200).json(newUser)
    
}else{
      res.json("Email Already Exists! Login or choose another email")

}
     
});



// function validateUser(user:string){
//  const valUser ={
//     fullname: Joi.string().min(5).max(50).required(),
//     email: Joi.string().min(5).max(255).required().email(),
//     password: Joi.string().min(5).max(255).required()

//  };
//  return Joi.validate(user, valUser)
// }


  router.get('/login', function(req:Request, res:Response, next:NextFunction) {

    console.log("req")

    res.render('login')
    //res.send(users);
  // res.render('login', {message: req.flash('message')})
});

router.post('/login', async function(req:Request, res:Response, next:NextFunction){
    
    if(!req.body.email || !req.body.password){
       return  res.status(400).json("Please enter  Username and password")
       res.render('login', {message: "Please enter both id and password"});
    } else {
        const userEmail =  users.filter((emails:any) => emails.email===req.body.email)[0]
         if(!userEmail )  return res.status(400).json("Incorrect Password and Email")
          //generate  token
          const userPass = userEmail.password
           const isPassword = await bcrypt.compare(req.body.password, userPass)
           if(!isPassword) return res.json({msg:"Invalid credential"})

         const token = jwt.sign({ email: userEmail.email },  `${process.env.ACCESS_TOKEN_SECRET_KEY}`,{
          expiresIn: 360 * 24 * 1000
         }) 
        
         res.cookie("jwt",token, {httpOnly:true})
         res.redirect('/')
          //res.json(token)
           // res.send(books).json(books)
           //req.flash('message', 'logged in successfully')
    }
 });


 router.get('/logout', function(req:Request, res:Response, next:NextFunction){
   
   try {
    res.clearCookie("jwt");
      // console.log("Hello world");
     //  req.session.destroy(function(){
    //     console.log("user logged out.")
   //  });
      return res.redirect('/');

    } catch(e) {
      console.log(e);
      console.log("errorr !@@@@@@@");
    }


 });


// function checkSignIn(req:Request, res:Response, next:NextFunction){
//     if(req.session.user){
//        next();     //If session exists, proceed to page
//     } else {
//        var err = new Error("Not logged in!");
//        console.log(req.session.user);
//        next(err);  //Error, trying to access unauthorized page!
//     }
//  }







function writeToDatabase(data:string, content:any){
    writeFile(data, JSON.stringify(content, null, 3), (err)=>{
        if(err) return error
    })
}



export default  router;
