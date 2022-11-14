
class RecipeFactory{

    static RECIPES;

    static init(){
        RecipeFactory.RECIPES = new Array();
        recipesList.forEach(r => RecipeFactory.RECIPES.push(new Recipe(r)));
    }
}