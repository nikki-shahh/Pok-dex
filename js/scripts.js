
//------------- Creates Pokemon List------------//
let pokemonRepository = (function ()
{
    let pokemonList = [
      {
        name: " Venusaur",
        height: 2,
        type: [ " Grass" , " Poison" ],
        ability: [ " Chlorophyll" , " Overgrow" ]
      },
      {
        name: " Raichu",
        height: 0.8,
        type: " Electric" ,
        ability: [ " Static" , " Lightningrod" ]
      },
      {
        name: " Nidoking",
        height: 1.4,
        type: [ " Ground" , " Poison" ],
        ability: [ " Poison-point" , " Rivalry" , " Sheer-force"]
      },
      {
        name: " Rhydon",
        height: 1.9,
        type: [ " Rock" , " Ground" ],
        ability: [ " Rhydon" , " rock-head" , " Reckless" ]
      },
      {
        name: " Torkoal",
        height: 0.5,
        type: " Fire",
        ability: [ " White-smoke" , " Shell-armor" ]
      },
      {
        name: " Poliwrath",
        height: 1.3,
        type: [ " Water" , " Fighting" ],
        ability: [ " Damp" , " Water-absorb" , " Swift-swim"]
      }
    ];

    function getAll (){
      return pokemonList;
    }

    function add (pokemon){
      return pokemonList.push(pokemon);
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
        button.addEventListener ('click', function(){
          showDetails(pokemon);
        });
     }

     function showDetails(pokemon){
       console.log(pokemon);
     }

    return {
     getAll : getAll,
     add : add,
     addListItem : addListItem,
     showDetails: showDetails
   };

})();
//------- Adds a pokemon to list ------//
pokemonRepository.add(
  {
    name: " Nidoqueen",
    height: 1.3,
    type: [" Ground"," Poison"],
    ability: [" Poison Point", " Rivalry"]
  }
);
//---------------loop---------------//
pokemonRepository.getAll().forEach (function(pokemon)
{
  //prints the details of each Pokemon to the DOM and add line breaks
// document.write ("<p> Name: " + pokemon.name + " - Height: " + pokemon.height + " - Type: " + pokemon.type + " - Ability: " + pokemon.ability);
  pokemonRepository.addListItem(pokemon);

});
