
class RecipeFactory{

    static RECIPES;

    static init(){
        RecipeFactory.RECIPES = new Array();
        recipesList.forEach(r => RecipeFactory.RECIPES.push(new Recipe(r)));
    }

    static filterFromBar1(input){
        const res = RecipeFactory.RECIPES.filter(function(r){
            const inName = r._name.toLowerCase().includes(input.toLowerCase());
            const inDescription = r._description.toLowerCase().includes(input.toLowerCase());
            const inIngredients = r._ingredients.filter(i => i.ingredient.toLowerCase().includes(input.toLowerCase()));
            
           return inName || inDescription || inIngredients.length > 0;
        });
        return res;
    }

    static filterFromBar2(input){
        var res = [];
        RecipeFactory.RECIPES.forEach(function(r){
            var isValid = false;
            if(r._name.toLowerCase().includes(input.toLowerCase()) || r._description.toLowerCase().includes(input.toLowerCase())){
                isValid = true;
            }
            r._ingredients.forEach(function(i){
                if(i.ingredient.toLowerCase().includes(input.toLowerCase())){
                    isValid = true;
                }
            });
            if(isValid){
                res.push(r);
            }
        });
        return res;
    }
}