require('dotenv').config()
import express, { Request, Response, NextFunction } from 'express'
const jwt = require('jsonwebtoken')

export function auth(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.jwt
  try {  
    if(token){
    jwt.verify(token, `${process.env.ACCESS_TOKEN_SECRET_KEY}`, (err:any, decodedToken:any)=>{
      if(!err) {
        next()
      }else{

        res.redirect("/")
      }

    }
 
    )
    }
    res.redirect("/login") 
   // res.json("invalid token")
    
  } catch (e) {
    res.status(400).send('Invalid token')
  }
}