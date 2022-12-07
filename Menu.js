class Menu{
    constructor(id, title, placeholder, parent){
        this._id = id + "List";
        this._classColor = "color-" + id;
        this._title = title;
        this._placeholder = placeholder;
        this._appliedTAGS = []; //Représente les tags actifs sur la recherche, provenant de ce menu

        const div = document.createElement("div");
        div.setAttribute("id", this._id);
        div.setAttribute("class", "list " + this._classColor);
    
        const cover = document.createElement("div");
        cover.setAttribute("class", "cover");
    
        const p = document.createElement("p");
        p.textContent = this._title;
        cover.appendChild(p);
    
        const arrowUp = document.createElement("img");
        arrowUp.setAttribute("src", "images/arrow-down.png");
        arrowUp.setAttribute("alt", "Ouvrir");
        cover.appendChild(arrowUp);
    
        div.appendChild(cover);
    
        const content = document.createElement("div");
        content.setAttribute("class", "content");
        const search = document.createElement("div");
        search.setAttribute("class", "search");
        const input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("placeholder", this._placeholder);
        input.setAttribute("class", this._classColor);
        search.appendChild(input);
    
        const arrowDown = document.createElement("img");
        arrowDown.setAttribute("src", "images/arrow-up.png");
        arrowDown.setAttribute("alt", "Fermer");
        search.appendChild(arrowDown);
    
        content.appendChild(search);
    
        const options = document.createElement("div");
        options.setAttribute("class", "options " + this._classColor);
        content.appendChild(options);
        div.appendChild(content);
    
        parent.appendChild(div);
    }

    //Retourne le menu sous forme d'élément DOM
    getDOM(){
        return document.getElementById(this._id);
    }

    //Ajoute un Listener d'ouverture (utilisé pour ajouter un listener dynamiquement)
    addOpenListener(func){
        const cover = this.getDOM().querySelector(".cover");
        cover.addEventListener("click", func);
        cover.menu = this;
    }

    //Ajoute un Listener de fermeture
    addCloseListener(func){
        const arrow = this.getDOM().querySelector(".search img");
        arrow.addEventListener("click", func);
        arrow.menu = this;
    }

    //Ouvre le menu
    open(){
        this.getDOM().querySelector(".cover").style.display = "none";
        this.getDOM().querySelector(".content").style.display = "block";
    }

    //Ferme le menu
    close(){
        this.getDOM().querySelector(".cover").style.display = "flex";
        this.getDOM().querySelector(".content").style.display = "none";
    }

    //Remplit le menu
    fill(list, addListener){
        const options = this.getDOM().querySelector(".options");
        options.innerHTML = "";
        const inputValue = this.getDOM().querySelector("input").value;

        //Remplissage de la liste de tags fList, contenant tous les tags sans doublon
        var fList = [];
        var menu = this;
        list.forEach(function(t){
            if(t.toLowerCase().includes(inputValue.toLowerCase())){
                var found = false;
                menu._appliedTAGS.forEach(function(i){
                    if(i.toLowerCase() == t.toLowerCase()){ //Verification de doublons
                        found = true;
                    }
                });
                if(!found){
                    fList.push(t);
                }
            }
        })

        //Ajout d'un élément DOM pour chaque tag (<option>)
        fList.forEach(function(i){
            const p = document.createElement("p");
            p.textContent = i;
            p.menu = menu;
            p.addEventListener("click", addListener);
            options.appendChild(p);
        });

        //Affichage d'un message si il n'y a aucun tag dans le menu
        if(fList.length == 0){
            const noFound = document.createElement("div");
            noFound.innerHTML = "Aucun résultat...";
            options.appendChild(noFound);
        }
    }

    //Ajout d'un tag actif sur la recherche, retourne le tag créé sous forme de DOM
    addAppliedTAG(tag, removeListener){
        const div = document.createElement("div");
        div.setAttribute("class", this._classColor);
        const p = document.createElement("p");
        p.textContent = tag;
        div.appendChild(p);
        
        const img = document.createElement("img");
        img.setAttribute("src", "images/cross.png");
        img.setAttribute("alt", "Supprimer le filtre");
        img.addEventListener("click", removeListener);
        img.menu = this;
        img.tag = tag;
        div.appendChild(img);

        this._appliedTAGS.push(tag);

        return div;
    }
    
    //Supprime un tag actif sur la recherche
    removeAppliedTAG(tag){
        for(var i = 0; i < this._appliedTAGS.length; i++){ 
            if (this._appliedTAGS[i] == tag) { 
                this._appliedTAGS.splice(i, 1); 
            }
        }
    }
}