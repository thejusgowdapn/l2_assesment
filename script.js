console.log('====================================');
console.log("Connected");
console.log('====================================');

function setActiveButton(button) {
    // Remove active class from all buttons
    var buttons = document.querySelectorAll('.custom-button');
    buttons.forEach(function (btn) {
      btn.classList.remove('active-button');
      
    });

    var buttons2 = document.querySelectorAll('.custom-button');
    buttons2.forEach(function (btn) {
      btn.innerHTML = ''
      
    });

    var buttons3 = document.querySelectorAll('.custom-button');
    buttons3.forEach(function (btn) {
      if(btn.id === 'men-btn'){
          btn.innerHTML+=`Men`
      }
      if(btn.id === 'women-btn'){
          btn.innerHTML+=`Women`
      }
      if(btn.id === 'kids-btn'){
          btn.innerHTML+=`Kids`
      }
      
    });

    let inn = button.innerHTML
    console.log(inn)
    button.innerHTML=''
    if(button.id === 'men-btn'){
      button.innerHTML+=`<span>🧔</span> Men`
    }
  if(button.id === 'women-btn'){
      button.innerHTML+=`<span>👧</span>Women`
   }
  if(button.id === 'kids-btn'){
      button.innerHTML+=`<span>👶</span>Kids`
    }
    


    // Add active class to the clicked button
    button.classList.add('active-button');

 
  }


  function createProduct(product){
    // let title_copy = product.title.length
    // if(title_copy >10){
    //     title_copy = title_copy.slice(0,10)+" ."
    // }
    if(product.title.length >15){
      product.title = product.title.slice(0,15)+" ."
    }
    
    if(product.badge_text!=null)
        return `
        <div class="container">
        <div class="image-container">
        <p class="overlay-text">${product.badge_text}</p>        
        <img src="${product.image}" class="image"/>
        </div>
        <div class="title-vendor">
            <p class="title">${product.title}</p>
          <p class="vendor"> * ${product.vendor}</p>
        </div>
        <div class="all-price"> 
            <p class="price">RS ${product.price}</p>
            <p class="compare-price">${product.compare_at_price} </p>
            <p class="offer"> 50% off </p>
        </div>
      
        <button class="button">Add to cart</button>
    </div>
        
        `
    else
    return `
      <div class="container">
      <div class="image-container">
        
      <img src="${product.image}" class="image"/>
      </div>
      <div class="title-vendor">
          <p class="title">${product.title}</p>
        <p class="vendor"> * ${product.vendor}</p>
      </div>
      <div class="all-price"> 
          <p class="price">RS ${product.price}</p>
          <p class="compare-price">${product.compare_at_price} </p>
          <p class="offer"> 50% off </p>
      </div>
    
      <button class="button">Add to cart</button>
  </div>
    
    `

  }


 

  async function fetchCategoryData(categoryName){
    try{
      const response = await fetch("https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json")
      const jsonResponse = await response.json()

      const category = jsonResponse.categories.find(category => category.category_name === categoryName)

      const cardContainer = document.getElementById("card-card")
      
      cardContainer.innerHTML=('')
     // console.log(category)
      category.category_products.forEach(product =>{
        //console.log(`name : ${product.title}`)
        //console.log(`product id : ${product.id}` )
        const productHtml = createProduct(product)
      //  console.log(productHtml)
        cardContainer.innerHTML +=productHtml
       

      })

    }catch(error){
      console.error("error fetching : ",error)
    }
  }


document.getElementById('men-btn').addEventListener('click',() =>fetchCategoryData('Men'));

document.getElementById('women-btn').addEventListener('click',() =>fetchCategoryData('Women'));

document.getElementById('kids-btn').addEventListener('click',() =>fetchCategoryData('Kids'));

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('men-btn').addEventListener('click', () => fetchCategoryData('Men'));

  // Trigger the click event on page load or refresh
  document.getElementById('men-btn').click();
});
