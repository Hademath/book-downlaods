import { error } from 'console';
import express, {Request, Response, NextFunction } from 'express';
// var express = require('express');
import fs, { writeFile, readFile } from "fs";
import path from 'path';
import{ Books } from './interface'
import cors from 'cors'
const jwt = require("jsonwebtoken");
import {auth} from "./authenticationMiddleware"
const flash = require('express-flash')
const session = require('express-session')



const router = express.Router();
const Joi = require('joi'); // this need to be install and require for editing purpose
let books = require("../../database.json");


router.use(session({
  secret:'secret',
  cookies:{message:6000},
  resave:false,
  saveUninitialized:false
}))
router.use(flash())

let filePath = path.join(__dirname, '../../database.json');

//const Writable = fs.appendFile(join.path(__dirname) 'database.json',  {encoding : 'utf8'})
//const Readable = fs.readFileSync('database.json', {encoding : 'utf8'});


// const headers ={
//   'Access-Control_Allow-Origin': '*',
//   'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
//   'Access-Control-Max-Age' : 2592000,
//   'Content-type':'application/json'x
// }

/* GET home page. */
router.get('/', function(req:Request, res:Response, next:NextFunction) {
  res.render('index', {books: books})
   // res.send(books)
});

  /* get specific book by id . */
  router.get('/books/:id', auth, function(req:Request, res:Response, next:NextFunction) {
    const getabook = books.find(( getbook:Books)=> getbook.bookId === parseInt(req.params.id));
    if (getabook) return res.render('book_details', {getabook: getabook})

     res.status(404).send("The book with the id  was not found"); 
    //res.send(getabook)   
 });

/* post books page. */
router.get('/postbook', function(req:Request, res:Response, next:NextFunction) {
  res.render("post_book");
})
router.post('/postbook', auth, function(req:Request, res:Response, next:NextFunction) {
     const newBook: Books = {
       Title: req.body.Title,
       Author: req.body.Author,
       datePublished: req.body.datePublished,
       Description: req.body.Description,
       pageCount: req.body.pageCount,
       Genre: req.body.Genre,
       bookId: books.lenght+1,
       Publisher: req.body.Publisher,
     };
     books.push(newBook);
     
     writeToDatabase(filePath, books)
    res.redirect('/')
  
  });


  /*  Edit  book page.  */
// router.put('/editbook/:id', function(req:Request, res:Response, next:NextFunction) {
//     const book = books.find((getabook: Books)=> getabook.bookId === parseInt(req.params.id));
//     if (!book) return res.status(404).send('The book with the given ID was not found.');    
//       let body = req.body;
//       let output = updateBook(book, body);
//       writeToDatabase(filePath, books)
//       res.status(201).json(output);
//       res.render('/')
//  });


router.get('/editbook/:id', auth, function(req:Request, res:Response, next:NextFunction) {
  const book2Edit  = books.filter((book:Books)=>book.bookId=== parseInt(req.params.id));
  if(book2Edit){
      res.render("edit_book",{ bookDetails:book2Edit});
   }
})

 router.put('/editbook/:id', auth, function(req:Request, res:Response, next:NextFunction) {
  const EditBook = books.find((getabook: Books)=> getabook.bookId === parseInt(req.params.id));

  if(!EditBook) return console.log("book not found");

  let {Title, Author, dateEdited, Description, pageCount, Genre, Publisher} = req.body
       
  EditBook.Title = Title? Title: EditBook.Title,
  EditBook.Author= Author? Author: EditBook.Author,
  EditBook.dateEdited = dateEdited? dateEdited:EditBook.dateEdited,
  EditBook.Description = Description? Description: EditBook.Description,
  EditBook.Genre = Genre? Genre: EditBook.Genre,
  EditBook.pageCount= pageCount? pageCount:EditBook.pageCount,
  EditBook.Publisher = Publisher ? Publisher:EditBook.publisher

  writeToDatabase(filePath, books)
   res.redirect("/");
    //return res.json('book updated succesfullly')
})

 
//DELETE FROM from end using this method
let key: number [] = []
router.get('/delete/:id', auth, function(req:Request, res:Response, next:NextFunction) {
  const file = fs.readFileSync(filePath, {encoding:'utf8', flag:'r'});
  const readData = JSON.parse(file);
  // console.log(readData);
  
  const book = readData.find((getabook: Books)=> getabook.bookId === parseInt(req.params.id));
  // console.log(book)
  if(!book) return res.status(404).send('The book with the given ID was not found.');  
  const index = readData.indexOf(book)
  readData.splice(index, 1) 
  fs.writeFileSync(filePath, JSON.stringify(readData, null, 4));
  res.status(200) 
  res.redirect('/')  
  key.push(1)


  //   let body = req.body;
  //   let output = updateBook(book, body);
  //   writeToDatabase(filePath, books)
  //  res.status(201).json(output);

});
 
/* Validation books home page. */
// router.post('/editbooks', function(req:Request, res:Response, next:NextFunction) {
//     const schema = {
//         title: Joi.string().min(3).require();
//     }
//     const result = Joi.validate(req.body, schema)
//   if(!req.body.title || req.body.name.length <3){
//       //404 bad error
//       res.status(400).send("the book you request to edit is not available")
//       return
//   }

//     res.send(path.join(database.json, 'utf8'));
  
//   });

function writeToDatabase(data:string, content:any){
    writeFile(data, JSON.stringify(content, null, 3), (err)=>{
        if(err) return error
    })
}

function updateBook(book: Books, updatedBook: Books) {
    book.Title = updatedBook.Title ? updatedBook.Title : book.Title
    book.Author = updatedBook.Author ? updatedBook.Author : book.Author
    book.datePublished = updatedBook.datePublished? updatedBook.datePublished: book.datePublished
    book.Description = updatedBook.Description? updatedBook.Description: book.Description
    book.pageCount = updatedBook.pageCount? updatedBook.pageCount   : book.pageCount
    book.Genre = updatedBook.Genre ? updatedBook.Genre : book.Genre
    book.Publisher = updatedBook.Publisher ? updatedBook.Publisher : book.Publisher
    book.dateEdited = Date.now().toString()
    return book
  }

export default  router;
