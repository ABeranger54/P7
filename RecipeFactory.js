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

    static filterIngredients(tagList, recipesList = RecipeFactory.RECIPES){
        if(tagList == 0) return recipesList;
        var res = [];

        recipesList.forEach(function(r){
            var isFound = true;
            tagList.forEach(function(t){
                var found = r.haveIngredient(t);
                isFound = isFound && found;
            });
            if(isFound){
                res.push(r);
            }
        });
        return res;
    }

    static filterAppliance(tagList, recipesList = RecipeFactory.RECIPES){
        if(tagList == 0) return recipesList;
        var res = [];

        recipesList.forEach(function(r){
            tagList.forEach(function(t){
                if(t.toLowerCase() == r._appliance.toLowerCase()){
                    res.push(r);
                }
            });
        });
        return res;
    }

    static filterUstensils(tagList, recipesList = RecipeFactory.RECIPES){
        if(tagList == 0) return recipesList;
        var res = [];

        recipesList.forEach(function(r){
            var isFound = true;
            tagList.forEach(function(t){
                var found = r.haveUstensil(t);
                isFound = isFound && found;
            });
            if(isFound){
                res.push(r);
            }
        });
        return res;
    }

    static getIngredientTagList(fromList = RecipeFactory.RECIPES){
        var ret = [];
        fromList.forEach(function(r){
            r._ingredients.forEach(function(i){
                var contained = false;
                ret.forEach(function(retV){
                    if(retV.toLowerCase() == i.ingredient.toLowerCase()){
                        contained = true;
                    }
                });
                if(!contained){
                    ret.push(i.ingredient);
                }
            });
        });
        return ret;
    }

    static getApplianceTagList(fromList = RecipeFactory.RECIPES){
        var ret = [];
        fromList.forEach(function(r){
            var contained = false;
            ret.forEach(function(retV){
                if(retV.toLowerCase() == r._appliance.toLowerCase()){
                    contained = true;
                }
            });
            if(!contained){
                ret.push(r._appliance);
            }
        });
        return ret;
    }

    static getUstensilsList(fromList = RecipeFactory.RECIPES){
        var ret = [];
        fromList.forEach(function(r){
            r._ustensils.forEach(function(u){
                var contained = false;
                ret.forEach(function(retV){
                    if(retV.toLowerCase() == u.toLowerCase()){
                        contained = true;
                    }
                });
                if(!contained){
                    ret.push(u);
                }
            });
        });
        return ret;
    }
}