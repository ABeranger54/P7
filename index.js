function init(){
    RecipeFactory.init();
    displayRecipes(RecipeFactory.RECIPES);

    document.getElementById("searchBar").addEventListener("keyup", function(){
        displayRecipes(getResultFromBar());
    });

    document.querySelector("#ingredientList .cover").addEventListener("click", openIngredients);
    document.querySelector("#ingredientList .search img").addEventListener("click", closeIngredients);
}

function displayRecipes(recipes){
    const main = document.querySelector("main");
    main.innerHTML = "";
    recipes.forEach(r => main.appendChild(r.getCardDOM()));
}

function getResultFromBar(){
    const sbValue = document.getElementById("searchBar").value;
    if(sbValue.length < 3){
        return RecipeFactory.RECIPES;
    }
    return RecipeFactory.filterFromBar2(sbValue);
}

function openIngredients(){
    const igList = document.querySelector("#ingredientList");
    igList.querySelector(".cover").style.display = "none";
    igList.querySelector(".content").style.display = "block";
}

function closeIngredients(){
    const igList = document.querySelector("#ingredientList");
    igList.querySelector(".cover").style.display = "flex";
    igList.querySelector(".content").style.display = "none";
}

init();