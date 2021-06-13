let pokemonList = [
  {
    name: "Venusaur",
    height: 2,
    type: [ "Grass" , "Poison" ],
    ability: [ "Chlorophyll" , "Overgrow" ]
  },
  {
    name: "Raichu",
    height: 0.8,
    type: "Electric" ,
    ability: [ "Static" , "Lightningrod" ]
  },
  {
    name: "Nidoking",
    height: 1.4,
    type: [ "Ground" , "Poison" ],
    ability: [ "Poison-point" , "Rivalry" , "Sheer-force"]
  },
  {
    name: "Rhydon",
    height: 1.9,
    type: [ "Rock" , "Ground" ],
    ability: [ "Rhydon" , "rock-head" , "Reckless" ]
  },
  {
    name: "Torkoal",
    height: 0.5,
    type: "Fire",
    ability: [ "White-smoke" , "Shell-armor" ]
  },
  {
    name: "Poliwrath",
    height: 1.3,
    type: [ "Water" , "Fighting" ],
    ability: [ "Damp" , "Water-absorb" , "Swift-swim"]
  }
];

for ( let i=0 ; pokemonList[i]; i++)
{
  //Writes Pokemon name to the DOM
  document.write (pokemonList[i].name+ " (height:" + pokemonList[i].height + ")");

  //Checks if the height is greater than 1.9
  if (pokemonList[i].height > 1.9 )
  {
    //writes "- Wow that's big!",if pokemon height is greater than 1.9
    document.write (" - Wow, that’s big!");
  }
  //Adds line breaks
  document.write("<br>");
}
