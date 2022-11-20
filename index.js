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
        bar.addEventListener("keyup", updateTagList);
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
    const list = getResultFromBar();

    //UNDONE: check for filters

    return list;
}

function fillTagList(tag){
    var list = [];
    if(tag == "ingredientList"){
        list = RecipeFactory.getIngredientTagList(getResultFromFilters());
    }
    const options = document.querySelector("#" + tag + " .options");
    options.innerHTML = "";
    list.forEach(function(i){
        const p = document.createElement("p");
        p.textContent = i;
        p.list = tag;
        p.addEventListener("click", addTagToSearch);
        options.appendChild(p);
    });
    
}

function updateTagList(event){
    const tag = event.currentTarget.tag;
    const value = event.currentTarget.value;

    var res = [];
    const options = tag.querySelector(".options");
    const list = RecipeFactory.getIngredientTagList(getResultFromFilters());
    list.forEach(function(i){
        if(i.toLowerCase().includes(value.toLowerCase())){
            res.push(i);
        }
    });
    
    options.innerHTML = "";

    res.forEach(function(r){
        const p = document.createElement("p");
        p.textContent = r;
        options.appendChild(p);
    });
}

function addTagToSearch(event){
    // const listType = event.currentTarget.list;
    // var color;
    // if(listType == "ingredientList"){
    //     color = "#2e76e8";
    // }
    // console.log(listType);
}

init();