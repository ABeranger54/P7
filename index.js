var menus = [];

function init(){
    RecipeFactory.init();
    displayRecipes(RecipeFactory.RECIPES);

    var menuContainer = document.getElementById("listContainer");
    menus.push(new Menu("ingredient", "Ingrédients", "Rechercher un ingrédient", menuContainer));
    menus.push(new Menu("appareil", "Appareils", "Rechercher un appareil", menuContainer));
    menus.push(new Menu("ustensils", "Ustensiles", "Rechercher un ustensile", menuContainer));

    document.getElementById("searchBar").addEventListener("keyup", function(){
        displayRecipes(getResultFromFilters());
        menus.forEach(m => fillTagList(m));
    });

    menus.forEach(function(menu){
        menu.addOpenListener(openMenu);
        menu.addCloseListener(closeMenu);

        const bar = menu.getDOM().querySelector(".search input");
        bar.addEventListener("keyup", function(){
            fillTagList(menu);
        });

        fillTagList(menu);
    });
    
}

function openMenu(event){
    menus.forEach(m => m.close());
    event.currentTarget.menu.open();
}

function closeMenu(event){
    event.currentTarget.menu.close();
}

function displayRecipes(recipes){
    const main = document.querySelector("main");
    main.innerHTML = "";
    const noResultMessage = document.getElementById("noResultMessage");
    if(recipes.length > 0){
        recipes.forEach(r => main.appendChild(r.getCardDOM()));
        noResultMessage.style.display = "none";
    }else{
        noResultMessage.style.display = "block";
    }
}

function getResultFromBar(){
    const sbValue = document.getElementById("searchBar").value;
    if(sbValue.length < 3){
        return RecipeFactory.RECIPES;
    }
    return RecipeFactory.filterFromBar1(sbValue);
}

function getResultFromFilters(){
    var list = getResultFromBar();
    list = RecipeFactory.filterIngredients(menus[0]._appliedTAGS, list);
    list = RecipeFactory.filterAppliance(menus[1]._appliedTAGS, list);
    list = RecipeFactory.filterUstensils(menus[2]._appliedTAGS, list);
    return list;
}

function fillTagList(menu){
    var list = [];
    if(menu == menus[0]) list = RecipeFactory.getIngredientTagList(getResultFromFilters());
    else if(menu == menus[1]) list = RecipeFactory.getApplianceTagList(getResultFromFilters());
    else if(menu == menus[2]) list = RecipeFactory.getUstensilsList(getResultFromFilters());

    menu.fill(list, addTagToSearch);
}

function addTagToSearch(event){
    const menu = event.currentTarget.menu;
    const tag = event.currentTarget.textContent;

    const tagDOM = menu.addAppliedTAG(tag, removeTagToSearch);
    document.getElementById("tagList").appendChild(tagDOM);
    
    menus.forEach(m => fillTagList(m));
    displayRecipes(getResultFromFilters());
}

function removeTagToSearch(event){
    const menu = event.currentTarget.menu;
    const tag = event.currentTarget.tag;
    event.currentTarget.parentNode.remove();
    
    menu.removeAppliedTAG(tag);

    menus.forEach(m => fillTagList(m));
    displayRecipes(getResultFromFilters());
}

init();