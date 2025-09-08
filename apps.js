
let cart={};


// category button load section

const categorybtnload=()=>{
   const url=`https://openapi.programming-hero.com/api/categories`
    fetch(url)
    .then(res=>res.json())
    .then(data=>categoryupload(data.categories))
}
const categoryupload=(categoris)=>{
    const getid=document.getElementById("category-btn")

    for(let category of categoris){
        const div=document.createElement("div")
        div.innerHTML=`<h1><button id="activeclassadd-${category.id}" onclick="btn('${category.id}')" class="hover:bg-green-200  text-xl activeclassremuve">${category.category_name}</button></h1>`
        getid.appendChild(div)
    }

}
categorybtnload()

// active button funtion

const remuve=()=>{
    const activebtn=document.querySelectorAll(".activeclassremuve")
    activebtn.forEach(btnbtn=>btnbtn.classList.remove("active"))
}

// modal load word details

const loadwordetails=(id)=>{

  const url=`https://openapi.programming-hero.com/api/plant/${id}`

  fetch(url)
  .then(res=>res.json())
  .then(card=>carddetailsshow(card.plants)
  )

}
const carddetailsshow=(infos)=>{
  const cardinfo=document.getElementById("card-info")
  cardinfo.innerHTML=""
  cardinfo.innerHTML=`<div class="w-full md:w-[450px] h-auto flex flex-col gap-y-4  bg-white rounded-4xl pb-3 ">
        <div class="h-[480px]">
        <div class="h-[440px]">
          <h1 class="text-lg md:text-2xl pl-2 font-bold">${infos.name}</h1>
            <img class="h-[280px] w-[450px]" src="${infos.image}"alt="${infos.name}"">
            
               <button class="  "> <span class="font-semibold">Category:</span> ${infos.category}</button>
               <h1 class="text-2xl"><span class="font-semibold">Price:</span><i class="fa-solid fa-bangladeshi-taka-sign"></i>${infos.price}</h1>
               
            <p class="text-xl md:text-xl pl-2"><span class="font-semibold">Discription:</span> ${infos.description}</p>
            </div>
              
               </div>
               `

  document.getElementById("my_modal_5").showModal()



}


// btn clicked card show funtion

const btn=(pt)=>{
    const url=`https://openapi.programming-hero.com/api/category/${pt}`
    fetch(url)
    .then(res=>res.json())
    .then(json=> {
      remuve()

        const btnactive=document.getElementById(`activeclassadd-${pt}`)
        btnactive.classList.add("active")

        
        
        plantscategory(json.plants)

    })
    remuve()

}

const plantscategory=(plantss)=>{

  document.getElementById("your-trees").classList.add("hidden")
    const element=document.getElementById("display-auto")

    element.innerHTML=""

    for(let plant of plantss){
        const div=document.createElement("div")
        div.innerHTML=`<div class="w-full md:w-[380px] h-auto flex flex-col  bg-white rounded-4xl pb-3 ">
        <div class="h-[480px]">
        <div class="h-[440px]">
        
            <img class="h-[260px] w-full" src="${plant.image}"alt="${plant.name}"">
             <button class="btn pt-1 text-2xl" onclick="loadwordetails('${plant.id}')">${plant.name}</button>
            <p class="text-xl md:text-xl pl-2">${plant.description}</p>
            </div>
               <div class="flex pl-4 pr-12 justify-between">
               <button class="w-40 h-8  rounded-3xl font-semibold bg-green-300 text-sm md:text-base">${plant.category}</button>
               <h1 class="text-2xl"><i class="fa-solid fa-bangladeshi-taka-sign"></i>${plant.price}</h1>
               </div>
               </div>
               <div class="pl-5 pt-5">
               <div onclick="addToChart('${plant.id}', '${plant.name}', ${plant.price})" class="w-full lg:w-[325px] rounded-3xl bg-green-600 pl-6
                h-12  hover:bg-green-700 transition">               
                <button class="text-center text-xl mt-auto pl-20 pt-2 text-white  ">add to chart</button>
              </div>
              </div>`

              element.appendChild(div)
        
    }

}


// chart show funtion

function addToChart(id, name, price) {
  alert(`${name} added to chart`);
  if(cart[id]){
    cart[id].qty +=1;
  }
  else{
    cart[id]={id, name, price, qty: 1};
  }

  renderCart();
  
}

function renderCart() {
  const cartBody=document.getElementById("card-body");
  cartBody.innerHTML=""

  let grandTotal=0
  Object.values(cart).forEach(item=>{
    const total=item.price * item.qty;
    grandTotal+=total;

    const row=document.createElement("tr");
    row.innerHTML=`
              <div class="flex justify-between w-[360px] md:w-[280px] h-18 mb-4 p-3 rounded-2xl  bg-[#E6F8EE]">
                <div>
              <h2 class="text-2xl">${item.name}</h2>
              <div class="flex space-x-5">
                <h2>${item.price}</h2>
     <h3>${item.qty}</h3>
      
      </div>
      </div>
        
       <h1 class="pt-4"><button onclick="removeFromCart('${item.id}')">❌</button></h1>
              </div>
              
    `;
    cartBody.appendChild(row)
  })
  document.getElementById("grand-total").innerHTML=`Total:${grandTotal}`
  
}

function removeFromCart(id){
  delete cart[id];
  renderCart()

}

// auto display show card funtion


const allcategoryloadbtn = () => {
   const url = `https://openapi.programming-hero.com/api/plants`;
   fetch(url) 
      .then(resp => resp.json())
      .then(all => allcategoryload(all.plants));
};

const allcategoryload = (loads) => {
   console.log(loads);
   const showcategory = document.getElementById("display-auto");
   showcategory.innerHTML = ""; 

   for (let load of loads) {
      const div = document.createElement("div");
      div.innerHTML = `
      
          <div class="w-full md:w-[380px] h-auto flex flex-col bg-white rounded-4xl shadow-md pb-3">
          <div class="h-[420px]">
            <div class="h-[400px]">
              <img class="h-[220px] w-full object-cover rounded-t-2xl" src="${load.image}" alt="${load.name}">
              <h1 class="text-lg md:text-2xl pl-2 font-bold">${load.name}</h1>
              <p class="text-base md:text-lg pl-2">${load.description}</p>
            </div>
            <div class="flex pl-4  pr-12 justify-between items-center ">
              <button class="px-4 py-1  rounded-3xl bg-green-300 font-semibold text-sm md:text-base">${load.category}</button>
              <h1 class="text-xl font-bold text-green-700">$${load.price}</h1>
            </div>
          </div>
          <div class="pl-5 pt-5">
            <button onclick="addToChart('${load.id}', '${load.name}', ${load .price})" class="w-full lg:w-[325px]  rounded-3xl bg-green-600 text-white py-2 hover:bg-green-700 transition">
              Add to cart
            </button>
          </div>
        </div>`;
      showcategory.appendChild(div);
   }
};

allcategoryloadbtn();
