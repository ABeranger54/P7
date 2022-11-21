var ingredientsTAG = [];

function init(){
    RecipeFactory.init();
    displayRecipes(RecipeFactory.RECIPES);

    document.getElementById("searchBar").addEventListener("keyup", function(){
        displayRecipes(getResultFromFilters());
        getDOMTagID().forEach(v => fillTagList(v));
    });

    var tagsID = getDOMTagID();

    tagsID.forEach(function(t){
        tag = document.querySelector("#" + t);

        const cover = tag.querySelector(".cover");
        cover.addEventListener("click", openTagList);
        cover.tag = tag;

        const bar = tag.querySelector(".search input");
        bar.addEventListener("keyup", function(){
            fillTagList(t);
        });
        bar.tag = tag;

        const arrow = tag.querySelector(".search img");
        arrow.addEventListener("click", closeTagList);
        arrow.tag = tag;

        fillTagList(t);
    });
    
}

function getDOMTagID(){
    return ["ingredientList"];
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
    return RecipeFactory.filterFromBar1(sbValue);
}

function openTagList(event){
    const tag = event.currentTarget.tag;
    tag.querySelector(".cover").style.display = "none";
    tag.querySelector(".content").style.display = "block";
}

function closeTagList(event){
    const tag = event.currentTarget.tag;
    tag.querySelector(".cover").style.display = "flex";
    tag.querySelector(".content").style.display = "none";
}

function getResultFromFilters(){
    var list = getResultFromBar();
    list = RecipeFactory.filterIngredients(ingredientsTAG, list);
    return list;
}

function fillTagList(tag){
    var list = [];
    var listTag;
    if(tag == "ingredientList"){
        list = RecipeFactory.getIngredientTagList(getResultFromFilters());
        listTag = ingredientsTAG;
    }
    const tagDOM = document.getElementById(tag);
    const options = tagDOM.querySelector(".options");
    options.innerHTML = "";
    const inputValue = tagDOM.querySelector("input").value;

    fList = [];
    list.forEach(function(t){
        if(t.toLowerCase().includes(inputValue.toLowerCase())){
            var found = false;
            listTag.forEach(function(i){
                if(i.toLowerCase() == t.toLowerCase()){
                    found = true;
                }
            });
            if(!found){
                fList.push(t);
            }
        }
    })

    fList.forEach(function(i){
        const p = document.createElement("p");
        p.textContent = i;
        p.list = tag;
        p.addEventListener("click", addTagToSearch);
        options.appendChild(p);
    });
}

function addTagToSearch(event){
    const listType = event.currentTarget.list;
    const div = document.createElement("div");
    var color;
    if(listType == "ingredientList"){
        color = "color-ingredient";
    }
    div.setAttribute("class", color);

    const p = document.createElement("p");
    p.textContent = event.currentTarget.textContent;
    div.appendChild(p);
    
    const img = document.createElement("img");
    img.setAttribute("src", "images/cross.png");
    img.setAttribute("alt", "Supprimer le filtre");
    img.addEventListener("click", removeTagToSearch);
    img.list = listType;
    img.tag = event.currentTarget.textContent;
    div.appendChild(img);

    document.getElementById("tagList").appendChild(div);

    ingredientsTAG.push(event.currentTarget.textContent);

    fillTagList(listType);
    displayRecipes(getResultFromFilters());
}

function removeTagToSearch(event){
    const listType = event.currentTarget.list;
    const tag = event.currentTarget.tag;
    event.currentTarget.parentNode.remove();

    if(listType == "ingredientList"){
        for(var i = 0; i < ingredientsTAG.length; i++){ 
            if (ingredientsTAG[i] == tag) { 
                ingredientsTAG.splice(i, 1); 
            }
        }
    }
    fillTagList(listType);
    displayRecipes(getResultFromFilters());
}

init();