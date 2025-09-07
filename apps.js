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
        div.innerHTML=`<h1><button onclick="btn('${category.id}')" class="hover:bg-green-400">${category.category_name}</button></h1>`
        getid.appendChild(div)
    }

}
categorybtnload()




const btn=(pt)=>{
    const url=`https://openapi.programming-hero.com/api/category/${pt}`
    fetch(url)
    .then(res=>res.json())
    .then(json=>plantscategory(json.plants)
    )

}

const plantscategory=(plantss)=>{
    
// btn clicked card show funtion


    const element=document.getElementById("display-auto")

    element.innerHTML=""

    for(let plant of plantss){
        const div=document.createElement("div")
        div.innerHTML=`<div class="w-full md:w-[380px] h-auto flex flex-col  bg-white rounded-4xl pb-3 ">
        <div class="h-[420px]">
        <div class="h-[400px]">
        
            <img class="h-[220px] w-full" src="${plant.image}"alt="${plant.name}"">
            <h1 class="text-lg md:text-2xl pl-2">${plant.name}</h1>
            <p class="text-xl md:text-xl pl-2">${plant.description}</p>
            </div>
               <div class="flex pl-4 pr-12 justify-between">
               <button class="w-40 h-8 border-2 rounded-3xl
               font-semibold border-green-300 text-sm md:text-base">${plant.category}</button>
               <h1 class="text-2xl">${plant.price}</h1>
               </div>
               </div>
               <div class="pl-5 pt-5">
               <div class="w-full lg:w-[280px] rounded-3xl bg-green-600 pl-6
                h-8 border-2 border-red-500">               
                <button class="pl-15 mt-auto ">add to chart</button>
              </div>
              </div>`

              element.appendChild(div)
        
    }

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
              <button class="px-4 py-1 border-2 rounded-3xl font-semibold border-green-300 text-sm md:text-base">${load.category}</button>
              <h1 class="text-xl font-bold text-green-700">$${load.price}</h1>
            </div>
          </div>
          <div class="pl-5 pt-5">
            <button class="w-full lg:w-[280px]  rounded-3xl bg-green-600 text-white py-2 hover:bg-green-700 transition">
              Add to cart
            </button>
          </div>
        </div>`;
      showcategory.appendChild(div);
   }
};

allcategoryloadbtn();
