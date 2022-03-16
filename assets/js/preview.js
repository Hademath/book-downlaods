let bookPreview = document.getElementById('book_preview')
  async function previewBook() {
      const response = await fetch('https://express-app-crud.herokuapp.com/books');
      const result = await response.json()
      console.log(result);
  
       result.forEach(element => {
         
       });{ 
//    let boook = result[i].find(book => book.id === 2)
//    if(boook ===true){
    bookPreview.innerHTML += ` 
            <div class="col-md-4" >
            <div class="card">
                <div class="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
                  <img src="<img src="/img/${1+i}.jpeg" alt="image photo" class="img-fluid"/>
                  <a href="#">
                    <div class="mask" style="background-color: rgba(251, 251, 251, 0.15);"></div>
                  </a>
                </div>
                <div class="card-body">
                  <h5 class="card-title">${result[i]['Title']}</h5>
                  <p class="card-text">
                      <h4>Description</h4>
                      ${result[i]['Description']}
                  </p>
                </div>
              </div>
        </div>
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">Author: <span>${result[i]['Author']}</span> </div>
                <div class="card-body">
                    <h3>${result[i]['Title']}</h3>
                  <blockquote class="blockquote mb-0">
                    <p>
                        When I am not fighting dragons or chasing the bogey man out of my kids closet.
                    </p>
                    <footer class="blockquote-footer">
                      Someone famous in <cite title="Source Title">Source Title</cite>
                    </footer>
                  </blockquote>
                </div>
                <div class="card" style="width: 30rem; ">
                    <ul class="list-group list-group-flush">
                      <li class="list-group-item">Genre: </li>
                      <li class="list-group-item">Date: ${result[i]['datePublished']}</li>
                      <li class="list-group-item">Pages: ${result[i]['countPage']}</li>
                    </ul>
                  </div>
              </div>

              <div class="" style="position:relative; margin-top: 50px; left:30px;">
                <a href="edit_book.html"><button class="btn btn-primary"  type="button" data-mdb-ripple-color="dark"> Edit Book</button> </a> 
                  <button class="btn btn-danger" onclick="return confirm('Are you sure you want to delete this book?')"  type="button"   data-confirm=""  data-mdb-ripple-color="dark"> Delete Book</button>
                
              </div>
        </div>
     `
  
    }
  }
  previewBook()
