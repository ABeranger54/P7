var menus = [];

//Initialise les menus déroulants et affiche toutes les recettes
function init(){
    RecipeFactory.init();
    displayRecipes(RecipeFactory.RECIPES);

    //Création des menus déroulants
    var menuContainer = document.getElementById("listContainer");
    menus.push(new Menu("ingredient", "Ingrédients", "Rechercher un ingrédient", menuContainer));
    menus.push(new Menu("appareil", "Appareils", "Rechercher un appareil", menuContainer));
    menus.push(new Menu("ustensils", "Ustensiles", "Rechercher un ustensile", menuContainer));

    //Ajout d'un EventListener sur la barre de recherche
    document.getElementById("searchBar").addEventListener("keyup", function(){
        displayRecipes(getResultFromFilters());
        menus.forEach(m => fillTagList(m));
    });

    //Remplissage des données des menus et ajout d'EventListeners
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

//Ouvre le menu selectionné et ferme tous les autres
function openMenu(event){
    menus.forEach(m => m.close());
    event.currentTarget.menu.open();
}

//Ferme le menu selectionné
function closeMenu(event){
    event.currentTarget.menu.close();
}

//Affiche la liste de recettes
function displayRecipes(recipes){
    const main = document.querySelector("main");
    main.innerHTML = "";
    const noResultMessage = document.getElementById("noResultMessage");
    if(recipes.length > 0){
        recipes.forEach(r => main.appendChild(r.getCardDOM()));
        noResultMessage.style.display = "none";
    }else{
        //Affiche un message si aucune recette n'est affichée
        noResultMessage.style.display = "block";
    }
}

//Retourne la liste de recettes filtrée par la barre de recherche
function getResultFromBar(){
    const sbValue = document.getElementById("searchBar").value;
    //La liste de recettes complète est retournée si la barre de recherche contient moins de 3 caractères
    if(sbValue.length < 3){
        return RecipeFactory.RECIPES;
    }
    return RecipeFactory.filterFromBar1(sbValue);
}

//Retourne la liste de recettes filtrée par tous les critères (tags et barre de recherche)
function getResultFromFilters(){
    var list = getResultFromBar();
    list = RecipeFactory.filterIngredients(menus[0]._appliedTAGS, list);
    list = RecipeFactory.filterAppliance(menus[1]._appliedTAGS, list);
    list = RecipeFactory.filterUstensils(menus[2]._appliedTAGS, list);
    return list;
}

//Remplit le menu déroulant en fonction des filtres actifs
function fillTagList(menu){
    var list = [];
    if(menu == menus[0]) list = RecipeFactory.getIngredientTagList(getResultFromFilters());
    else if(menu == menus[1]) list = RecipeFactory.getApplianceTagList(getResultFromFilters());
    else if(menu == menus[2]) list = RecipeFactory.getUstensilsList(getResultFromFilters());

    menu.fill(list, addTagToSearch);
}

//Ajoute un tag actif à la recherche
function addTagToSearch(event){
    const menu = event.currentTarget.menu;
    const tag = event.currentTarget.textContent;

    const tagDOM = menu.addAppliedTAG(tag, removeTagToSearch);
    document.getElementById("tagList").appendChild(tagDOM);
    
    menus.forEach(m => fillTagList(m));
    displayRecipes(getResultFromFilters());
}

//Supprime un tag de la recherche
function removeTagToSearch(event){
    const menu = event.currentTarget.menu;
    const tag = event.currentTarget.tag;
    event.currentTarget.parentNode.remove();
    
    menu.removeAppliedTAG(tag);

    menus.forEach(m => fillTagList(m));
    displayRecipes(getResultFromFilters());
}

init();