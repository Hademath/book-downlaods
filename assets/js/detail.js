//show Books  carting 
// (function() {
//     const cartInfo = document.getElementById("cart-info")
//     const cart = document.getElementById('cart')
    
//     cartInfo.addEventListener('click', function(){
//         cart.classList.toggle('show-cart');
//     })
//   })()
  
  let myContent = document.getElementById('store-items')
  // let details = document.getElementById('book_details')
  async function mydataJSON() {
      const response = await fetch('https://express-app-crud.herokuapp.com/books/');
      const data = await response.json()
    //   console.log(data);
  
  let newData = data
  
  for(let i=1; i<newData.length; i++){ 
  
     myContent.innerHTML += `
  
     <div class="col-10 col-sm-6 col-lg-4 mx-auto my-3 store-item sweets" data-item="sweets">
       <div class="card " href="book_details" >
         <div class="img-container">
          <a href="book_details?${newData[i]['bookId']}"><img src="img/${1+i}.jpeg" class="card-img-top store-img" alt="book image"></a> 
           <span class="store-item-icon">
             <i class="fas fa-shopping-cart"></i>
           </span>
         </div>
         <div class="card-body">
           <div class="card-text d-flex justify-content-between text-capitalize">
             <h5 id="store-item-name">${newData[i]['Title']} </h5>
             <!-- <button class="preview" href="" type="btn btn-primary">Preview </button> -->              
           </div>
         </div>

       </div>
       <!-- end of card-->
     </div>        
    
    `
  }

  //get specific book

  // let bookId = document.getElementById("bookId");
  // bookId.addEventListener("click",(e)=>{


  // })
  
  }
  mydataJSON()
  
  
//   <div class="col">
//   <div class="card h-50">
//   <img src="${newData[i]['images'][0]}" class="card-img-top" alt="shirt">
//   <div class="card-body">
//      <p class="card-text">Price: ₦${newData[i]['price']}</p>
//      <div class="d-grid gap-0 col-12 mx-auto buybutton">
//             <a href="#" class="btn btn-success store-item-icon" type="button">Add to cart</a> 
//           </div>  
//      </div>
//      </div>  
// </div> 
  
  