function init(){
    RecipeFactory.init();
    displayRecipes(RecipeFactory.RECIPES);
}

function displayRecipes(recipes){
    const main = document.querySelector("main");
    recipes.forEach(r => main.appendChild(r.getCardDOM()));
}

init();