

var body = document.body;
var searchInputs= document.getElementById("searchInputs")
var foodCArd= document.getElementById("foodCArd")
var contactUs= document.getElementById("contactUs")

// form------------------

let nameInput = document.getElementById("name")
let email= document.getElementById("email")
let phone= document.getElementById("phone")
let age= document.getElementById("age")
let password= document.getElementById("password")
let repassword= document.getElementById("repassword")
let submit= document.getElementById("submit")


$(document).ready(function(){

    $(".spinner").fadeOut(1000,function(){
        $(".loading").fadeOut(1000)  
    })

    getSearchByName("")

    

    // $(".sideNav ul li").hide(50)

   
})

// start sideNave------------------------------------------------------------------------------------------

    $("#show").click(1000,function(){
        if($(".sideNav").css("left")=='-250px'){
        open()
    }
    
        else{
           clossNav()
           }
        }
        )


function open(){
    
    $(".sideNav").animate({left:"0px"},50);
        $(".open-close-icon").removeClass("fa-align-justify");
        $(".open-close-icon").addClass("fa-x");
         for(let i=0;i<=5;i++)
       { $(".sideLinks li").eq(i).animate({top:0},i*100)}
}
        function clossNav(){

            $(".sideNav").animate({left:"-250px"},50);
            $(".open-close-icon").removeClass("fa-x");
            $(".open-close-icon").addClass("fa-align-justify");
            $(".sideLinks li").animate({top:"100%"},100)


        }

    // end sideNave----------------------------------------------------------------------------------------------  
    
    
// start search-----------------------------------------------------------------------------------------------

        function displaySearch(){
            foodCArd.innerHTML = ""
            
            search=`
            <div class="contact-area px-5 " style=>
        <div class="row gy-4 mt-3 d-flex justify-content-center ">
           <div class="col-md-5">
              <input type="text" class="input form-control bg-transparent text-white" name="first_name" placeholder="Search By Name" oninput="getSearchByName(this.value)" />
           </div>
           <div class="col-md-5">
              <input type="email" class=" input form-control bg-transparent text-white" name="email" placeholder="Search By First Letter" oninput="getSearchByFristLetter(this.value)" />
           </div>

        </div>
     </div>`
    
searchInputs.innerHTML= search


  }

  async function getSearchByName( name){
    foodCArd.innerHTML = ""
    contactUs.innerHTML=""
    let response= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
    let result =  await response.json()
    console.log(result)
    displayMeals(result.meals?.slice(0,20))
    // return result
  }

 

  async function getSearchByFristLetter( frist){
    foodCArd.innerHTML = ""
    contactUs.innerHTML=""
    let response= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${frist}`)
    let result =  await response.json()
    console.log(result)
    displayMeals(result.meals?.slice(0,20))
    // return result
  }


//   async function getRoundom(){
//     foodCArd.innerHTML = ""
//     let response= await fetch(`https://`)
//     let result =  await response.json()
//     console.log(result)
//     displayMeals(result.meals?.slice(0,20))
//     // return result
//   }
//   getRoundom

//   end search-------------------------------------------------------------------------------------------

// start catigory---------------------------------------------------------------------------------------------


  async function getCategories() {
    foodCArd.innerHTML = ""
    contactUs.innerHTML=""
    searchInputs.innerHTML = ""

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    result = await response.json()
    
console.log(result.categories)

    displayCategories(result.categories)

    
}

function displayCategories(foodArr) {
    let categories = "";

    for (let i = 0; i <foodArr.length; i++) {
        categories += `
       
        <div class="col-md-3  mb-3 mr-3">
                <div  class="foods rounded-2 position-relative  overflow-hidden cursor-pointer"onclick="filterCatigories('${foodArr[i].strCategory}')">
                    <img class="foodImg w-100 " src="${foodArr[i].strCategoryThumb}" alt="" >
                    <div class="layer  position-absolute text-center text-black p-2" style="z-index=99999">
                        <h3>${foodArr[i].strCategory}</h3>
                        <p>${foodArr[i].strCategoryDescription?.split(" ").slice(0,20).join(" ")}</p>
                    </div>
                </div>
        </div>
       
        `
    }

   foodCArd.innerHTML = categories
}


// end category---------------------------------------------------------------------------------------------------------


function displayMeals(mealArr) {
    let cartoona = "";

    for (let i = 0; i < mealArr.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div  class="meal position-relative overflow-hidden rounded-2 cursor-pointer"onclick="getMealDetails(${mealArr[i].idMeal})">
                    <img class="w-100" src="${mealArr[i].strMealThumb}" alt="" >
                    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${mealArr[i].strMeal}</h3>
                    </div>
                </div>
        </div>
        `
    }

    foodCArd.innerHTML = cartoona
}



// start filter categories-------------------------------------------------------------------------------------------
async function filterCatigories(category){

    foodCArd.innerHTML = ""
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    let result= await response.json()
    console.log(result.meals)
    displayMeals(result.meals?.slice(0,20))
}

// end filter categories-------------------------------------------------------------------------------------------

// start area----------------------------------------------------------------------------------
function displayArea(areaArr){
    let Area=""
    for(let i = 0; i <areaArr.length; i++){
        Area+=`
        <div class="col-md-3">
        <div  class="cursor-pointer text-center text-white " onclick="filterArea('${areaArr[i].strArea}')">
        <i class="fa-solid fa-house-laptop fa-4x"></i>
        <h2>${areaArr[i].strArea}</h2>
     </div>
     </div>
        `
    }

foodCArd.innerHTML=Area
}

async function getArea(){
    contactUs.innerHTML=""
    searchInputs.innerHTML = ""
    foodCArd.innerHTML = ""
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    let result= await response.json()
    console.log(result.meals)
    displayArea(result.meals)
}


async function filterArea(country){

    foodCArd.innerHTML = ""
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${country}`)
    let result= await response.json()
    console.log(result.meals)
    displayMeals(result.meals?.slice(0,20))
}


// end area----------------------------------------------------------------------------------

// start ingredient-----------------------------------------------------------------------------------
function displayIngrediant(ingredientarr){
    let ingredient="";
    for (let i = 0; i < 20; i++) {
        ingredient+=`
        <div class="col-md-3">
        <div class="cursor-pointer text-center text-white " onclick="filterIngredient('${ingredientarr[i].strIngredient}')">
            <i class="fa-solid fa-drumstick-bite fa-4x"></i>
            <h2>${ingredientarr[i].strIngredient}</h2>
            <p>${ingredientarr[i].strDescription?.split(" ").slice(0,20).join(" ")}</p>
        </div>

     </div>
        
        `
    }
    foodCArd.innerHTML=ingredient
}

async function getIngrediant(){
    contactUs.innerHTML=""
    searchInputs.innerHTML = ""
    foodCArd.innerHTML = ""
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    let result= await response.json()
    console.log(result.meals)
    displayIngrediant(result.meals)

}

async function filterIngredient(ingredient2){

    foodCArd.innerHTML = ""
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient2}`)
    let result= await response.json()
    console.log(result.meals)
    displayMeals(result.meals?.slice(0,20))
}

// end ingredient-----------------------------------------------------------------------------------

// start meal detailes-------------------------------------------------------------------------------
async function getMealDetails(id){

    foodCArd.innerHTML = ""
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    let result= await response.json()
    console.log(result.meals[0])
    // return result.meals
    displayDetails(result.meals[0])
}

function displayDetails(details){

    let Recipes =""
for(let i=1 ; i<=12 ;i++){
   
   Recipes+= `<li class="recipes ">${details[`strMeasure${i}`]} ${details[`strIngredient${i}`]}</li>`
}

let tags =details.strTags.split(",")
let tagEle=""
for(let i=0; i<tags.length ;i++){
tagEle+=`<li>${tags[i]}</li>`
}

let detailss=`
<div class="mealdetails d-flex justify-content-between flex-row text-white" >
    <div class="col-md-4">
        <img  src="${details.strMealThumb}" alt="" class="rounded-2 w-100">
        <h2>${details.strMeal}</h2>
    </div>
    <div class="col-md-4" style="width:60%">
        <h2>Instructions</h2>
        <p> ${details.strInstructions}</p>
        <h2>Area :${details.strArea} </h2>
        <h2>Category : ${details.strCategory}</h2>
        <h2>Recipes :</h2>
        <ul class="recipes">
        ${Recipes}
        </ul>
        <h2>Tags :</h2>
        <ul class="recipes tag" > ${tagEle}</ul>
        <a  href="${details.strSource}" target="_blank" class="btn btn-success">Source</a>
        <a  href="${details.strYoutube}" target="_blank" class="btn btn-danger">yotube</a>
        
    </div>
</div>
`
foodCArd.innerHTML=detailss
}

// end meal detailes-------------------------------------------------------------------------------------

// start contactus---------------------------------------------------------------------------------------------
function displaycontactUs(){
    foodCArd.innerHTML = ""
    let contact=`
    <div class="contact-area px-5 " style="">
        <div class="row gy-4 mt-5 d-flex justify-content-center align-items-center " style="position: absolute; top: 50%;transform: translate(-9%,-50%);">
           <div class="col-md-5">
              <input type="text" class="form-control  " name="first_name" id="name"  placeholder="Enter your Name"  />
              
           </div>
           <div class="col-md-5">
              <input type="email" class="form-control " name="email" id="email" placeholder="Enter your email" />
           </div>
           <div class="col-md-5">
              <input type="text" class="form-control  " name="first_name" id="phone" placeholder="Enter your phone"  />
           </div>
           <div class="col-md-5">
              <input type="email" class="form-control " name="email" id="age" placeholder="Enter your age" />
           </div>
           <div class="col-md-5">
              <input type="text" class="form-control  " name="first_name" id="password" placeholder="Enter your password" />
           </div>
           <div class="col-md-5">
              <input type="email" class="form-control " name="email" id="repassword" placeholder="Repassword" />
           </div>
           <div><button type="button" class="btn bg-transpernt border-danger text-danger" id="submit" style=" margin-left: 47%; width: auto;">Submit</button></div>
           

        </div>
     </div>
    `
    contactUs.innerHTML=contact
}


// function validaion(regex , element){
//     if( regex.test(element.value)){
//     element.classList.add("is-valid")
//     element.classList.remove("is-invalid")
//     }
//     else{
//     element.classList.add("is-invalid")
//     element.classList.remove("is-valid")
//     }
//     return regex.test(element.value)
    
//     }


// var regexName= /^\w{3,}(\s\w*)*$/
// nameInput.addEventListener("input",function(){
//     validaion(regexName,nameInput)
// })



// end contactus------------------------------------------------------------------------------------------------

