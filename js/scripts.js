//------------- Creates Pokemon List & details------------//
let pokemonRepository = (function (){
    let pokemonList=[];
    let apiUrl= 'https://pokeapi.co/api/v2/pokemon/';
    let searchByName = document.querySelector('#search');
    function getAll (){
      return pokemonList;
    }

    function add (pokemon){
      if (
        typeof pokemon === 'object' && 'name' in pokemon
      ){
        pokemonList.push(pokemon);
      } else {
        console.log ('pokemon is not correct');
        }
    }
//----- Adds button & list item to DOM -----//
    function addListItem(pokemon){
       let pokemonList= document.querySelector ('.list-group');
       let listItem= document.createElement ('li');
       let button= document.createElement('button');
        button.innerText= pokemon.name;
        button.classList.add ('btn','btn-outline-warning', 'btn-lg', 'btn-block');
        button.setAttribute('data-target', '#pokemonModal', 'data-toggle', 'modal');
        listItem.classList.add ('group-list-item');
        listItem.appendChild(button);
        pokemonList.appendChild(listItem);
        button.addEventListener ('click',function(){
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
    item.imageUrlFront = details.sprites.front_default;
    item.imageUrlBack = details.sprites.back_default;
    item.height = details.height;
    item.weight = details.weight;
    let pokemonTypes = details.types.map(extractType);
    function extractType(subItem){
      return subItem.type.name;
    }
    item.type = pokemonTypes;

    let pokemonAbilities = details.abilities.map(extractAbility);
    function extractAbility(subItem){
      return subItem.ability.name;
    }
    item.ability = pokemonAbilities;

  }).catch(function(e){
    console.error(e);
  });
}

//----------------MODAL Container------------------------------//
     function showModal (pokemon){
        let modalBody = $ ('.modal-body');
        let modalTitle = $ ('.modal-title');

        modalTitle.empty();
        modalBody.empty();

        let pokemonName = $ ('<h3>' + pokemon.name + '</h3>');

        let pokemonPictureFront = $ ('<img class="modal-img" style="width:50%">');
        pokemonPictureFront.attr('src',pokemon.imageUrlFront );
        let pokemonPictureBack = $ ('<img class="modal-img" style="width:50%">');
        pokemonPictureBack.attr('src',pokemon.imageUrlBack );
        let pokemonWeight = $('<p>' + 'weight : ' + pokemon.weight + '</p>');
        let pokemonHeight = $('<p>' + 'Height: ' + pokemon.height + '</p>');
        let pokemonAbility = $('<p>' + 'Abilities: ' + pokemon.ability + '</p>');
        let pokemonType = $('<p>' + 'Type: ' + pokemon.type + '</p>');

        modalTitle.append(pokemonName);
        modalBody.append(pokemonPictureFront);
        modalBody.append(pokemonPictureBack);
        modalBody.append(pokemonWeight);
        modalBody.append(pokemonHeight);
        modalBody.append(pokemonAbility);
        modalBody.append(pokemonType);

        $('#myModal').modal('toggle');
}
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
     showDetails: showDetails
   }

})();

//---------------loop---------------//
pokemonRepository.loadList().then (function(){
  pokemonRepository.getAll().forEach (function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});
