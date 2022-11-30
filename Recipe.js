class Recipe{
    constructor(data){
        this._id = data.id;
        this._name = data.name;
        this._servings = data.servings;
        this._ingredients = data.ingredients;
        this._time = data.time;
        this._description = data.description;
        this._appliance = data.appliance;
        this._ustensils = data.ustensils;
    }

    haveIngredient(ingredientName){
        return this._ingredients.find(i => i.ingredient.toLowerCase() == ingredientName.toLowerCase());
    }

    haveUstensil(ustensilName){
        return this._ustensils.find(u => u.toLowerCase() == ustensilName.toLowerCase());
    }

    getCardDOM(){
        const article = document.createElement("article");

        const thumbnail = document.createElement("div");
        thumbnail.setAttribute("class", "thumbnail");
        article.appendChild(thumbnail);

        const content = document.createElement("div");
        content.setAttribute("class", "content");
        article.appendChild(content);

        const content_main = document.createElement("div");
        content_main.setAttribute("class", "content_main");

        const name = document.createElement("h2");
        name.textContent = this._name;
        content_main.appendChild(name);

        const time = document.createElement("div");
        time.setAttribute("class", "time");
        const timeIcon = document.createElement("img");
        timeIcon.setAttribute("src", "images/clock.png");
        timeIcon.setAttribute("alt", "Time");
        time.appendChild(timeIcon);
        const timeValue = document.createElement("p");
        timeValue.textContent = this._time + " min";
        time.appendChild(timeValue);
        content_main.appendChild(time);

        content.appendChild(content_main);

        const content_second = document.createElement("div");
        content_second.setAttribute("class", "content_second");

        const ingredients = document.createElement("div");
        ingredients.setAttribute("class", "ingredients");

        this._ingredients.forEach(function(ing){
            const ingP = document.createElement("p");
            const ingName = document.createElement("b");
            ingName.textContent += ing.ingredient;
            ingP.appendChild(ingName);
            if(ing.quantity != undefined){
                ingP.appendChild(document.createTextNode(": " + ing.quantity));
            }
            if(ing.unit != undefined){
                ingP.appendChild(document.createTextNode(ing.unit));
            }
           
            ingredients.appendChild(ingP);
        });

        content_second.appendChild(ingredients);

        const description = document.createElement("p");
        description.setAttribute("class", "description");
        description.textContent = this._description;
        content_second.appendChild(description);

        content.appendChild(content_second);

        return article;
    }
}