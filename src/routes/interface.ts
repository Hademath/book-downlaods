export interface Books {
    Title: string,
    Author: string,
    datePublished: string,
    Description: string,
    pageCount: number,
    Genre: string,
    bookId: number,
    dateEdited?:string,
    Publisher: string
  }

  export interface Users{
    fullname : string,
    email: string,
    dateOfBirth : string,
    password:string
    userId: number
    registerDate: any
    //token:string
  }

  