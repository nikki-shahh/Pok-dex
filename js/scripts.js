
//------------- Creates Pokemon List & details------------//
let pokemonRepository = (function (){
    let pokemonList=[];
    let apiUrl= 'https://pokeapi.co/api/v2/pokemon/';
    let modalContainer= document.querySelector ("#modal-container")
    let searchByName = document.querySelector("#search");
    function getAll (){
      return pokemonList;
    }

    function add (pokemon){
      if (
        typeof pokemon === "object" && "name" in pokemon
      ){
        pokemonList.push(pokemon);
      } else {
        console.log ("pokemon is not correct");
        }
    }
//----- Adds button & list item to DOM -----//
    function addListItem(pokemon){
       let pokemonList= document.querySelector (".pokemon-list");
       let listItem= document.createElement ("li");
       let button= document.createElement("button");
        button.innerText= pokemon.name;
        button.classList.add ("button-class");
        listItem.appendChild(button);
        pokemonList.appendChild(listItem);
        button.addEventListener ("click",function(){
          showDetails(pokemon);
        });
     }

//-----loads list ---------//

function loadList(){
  return fetch (apiUrl).then (function(response){
    return response.json();
  }).then (function(json){
    json.results.forEach(function(item){
      let pokemon = {
        name: item.name.toUpperCase(),
        detailsUrl: item.url
      };
      add (pokemon);
    });
  }). catch(function (e){
    console.error(e);
    });
  }
//---------- loads details-------//
function loadDetails(item){
  let url = item.detailsUrl;
  return fetch(url).then (function(response){
    return response.json();
  }).then (function(details){
    item.imageUrl = details.sprites.front_default;
    item.height = details.height;

    let pokemonTypes = details.types.map(extractt);
    function extractt(subItem){
      return subItem.type.name;
    }
    item.type = pokemonTypes;

    let pokemonAbilities = details.abilities.map(extracta);
    function extracta(subItem){
      return subItem.ability.name;
    }
    item.ability = pokemonAbilities;

  }).catch(function(e){
    console.error(e);
  });
}

//----------MODALLLLL------MODAL Container------------------------------//

     function showModal (pokemon){
         modalContainer.innerText = " ";
         let modal = document.createElement ("div");
         modal.classList.add ("modal");

       //----------- Close Button-------//
         let closeButtonElement = document.createElement ("button");
         closeButtonElement.classList.add("close-button");
         closeButtonElement.innerText = "X" ;
         closeButtonElement.addEventListener ("click", hideModal);

        //---------- pokemon details ---------//
        let pokemonName = document.createElement ("h1");
        pokemonName.innerText = "Name: " + pokemon.name;

        let pokemonHeight = document.createElement ("p");
        pokemonHeight.innerText= "Height: " + pokemon.height;
        let pokemonAbility = document.createElement ("p");
        pokemonAbility.innerText= "Ability: " + pokemon.ability;
        let pokemonType = document.createElement ("p");
        pokemonType.innerText= "Type: " + pokemon.type;

        let pokemonPicture = document.createElement ("img");
        pokemonPicture.classList.add("pokemon-picture")
        pokemonPicture.src = pokemon.imageUrl;

        modal.appendChild(closeButtonElement);
        modal.appendChild(pokemonName);
        modal.appendChild(pokemonHeight);
        modal.appendChild(pokemonAbility);
        modal.appendChild(pokemonType);
        modal.appendChild(pokemonPicture);
        modalContainer.appendChild(modal);
        //------------------------//
        modalContainer.classList.add ("is-visible");
    }
    //-------------close modal-------//
    function hideModal(){
      modalContainer.classList.remove ("is-visible");
    }
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
        hideModal();
      }
    });
    modalContainer.addEventListener('click', (e) => {
      let target = e.target;
      if (target === modalContainer) {
        hideModal();
      }
    });
//--------------------searchByName-----------------//

searchByName.addEventListener('input', function(){
   let pokemonList = document.querySelectorAll('li');
   let value = searchByName.value.toUpperCase();

   pokemonList.forEach(function(pokemon){
       if(pokemon.innerText.toUpperCase().indexOf(value) > -1){
           pokemon.style.display = '';
       }else{
           pokemon.style.display = 'none';
       }
   })
 });
//----------------show details----------//
function showDetails(pokemon){
  pokemonRepository.loadDetails(pokemon).then (function(){
  showModal(pokemon);
 });
}
//--------------------------------------//
    return {
     getAll : getAll,
     add : add,
     addListItem : addListItem,
     loadList : loadList,
     loadDetails : loadDetails,
     showModal: showModal,
     hideModal:hideModal,
     showDetails: showDetails
   }

})();

//---------------loop---------------//
pokemonRepository.loadList().then (function(){
  pokemonRepository.getAll().forEach (function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});
