// category button load section

const categorybtnload=()=>{
    url=`https://openapi.programming-hero.com/api/categories`
    fetch(url)
    .then(res=>res.json())
    .then(data=>categoryupload(data.categories))
}
const categoryupload=(categoris)=>{
    const getid=document.getElementById("category-btn")

    for(let category of categoris){
        const div=document.createElement("div")
        div.innerHTML=`<h1><button class="hover:bg-green-400">${category.category_name}</button></h1>`
        getid.appendChild(div)
    }

}
categorybtnload()

// all cetegory load section

const allcategoryloadbtn=()=>
