
//------------- Creates Pokemon List & details------------//
let pokemonRepository = (function (){
    let pokemonList=[];
    let apiUrl= 'https://pokeapi.co/api/v2/pokemon/';

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
        name: item.name,
        detailsUrl: item.url
      };
      add (pokemon);
      console.log(pokemon);
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
    item.types = details.types;
    item.ability = details.abilities;
  }).catch(function(e){
    console.error(e);
  });
}
//-----------//

     function showDetails(pokemon){
       pokemonRepository.loadDetails(pokemon).then (function(){
       console.log(pokemon);
      });
     }

    return {
     getAll : getAll,
     add : add,
     addListItem : addListItem,
     loadList : loadList,
     loadDetails : loadDetails,
     showDetails: showDetails
   };

})();

//---------------loop---------------//
pokemonRepository.loadList().then (function(){
  pokemonRepository.getAll().forEach (function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});
