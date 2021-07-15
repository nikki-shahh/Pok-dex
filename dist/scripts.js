let pokemonRepository=function(){let t=[],e="https://pokeapi.co/api/v2/pokemon/",n=document.querySelector("#search");function o(e){"object"==typeof e&&"name"in e?t.push(e):console.log("pokemon is not correct")}function i(t){let e=$(".modal-body"),n=$(".modal-title");n.empty(),e.empty();let o=$("<h3>"+t.name+"</h3>"),i=$('<img class="modal-img" style="width:50%">');i.attr("src",t.imageUrlFront);let a=$('<img class="modal-img" style="width:50%">');a.attr("src",t.imageUrlBack);let l=$("<p>weight : "+t.weight+"</p>"),r=$("<p>Height: "+t.height+"</p>"),p=$("<p>Abilities: "+t.ability+"</p>"),c=$("<p>Type: "+t.type+"</p>");n.append(o),e.append(i),e.append(a),e.append(l),e.append(r),e.append(p),e.append(c),$("#myModal").modal("toggle")}function a(t){pokemonRepository.loadDetails(t).then(function(){i(t)})}return n.addEventListener("input",function(){let t=document.querySelectorAll("li"),e=n.value.toUpperCase();t.forEach(function(t){t.innerText.toUpperCase().indexOf(e)>-1?t.style.display="":t.style.display="none"})}),{getAll:function(){return t},add:o,addListItem:function(t){let e=document.querySelector(".list-group"),n=document.createElement("li"),o=document.createElement("button");o.innerText=t.name,o.classList.add("btn","btn-outline-warning","btn-lg","btn-block"),o.setAttribute("data-target","#pokemonModal","data-toggle","modal"),n.classList.add("group-list-item"),n.appendChild(o),e.appendChild(n),o.addEventListener("click",function(){a(t)})},loadList:function(){return fetch(e).then(function(t){return t.json()}).then(function(t){t.results.forEach(function(t){o({name:t.name.toUpperCase(),detailsUrl:t.url})})}).catch(function(t){console.error(t)})},loadDetails:function(t){let e=t.detailsUrl;return fetch(e).then(function(t){return t.json()}).then(function(e){t.imageUrlFront=e.sprites.front_default,t.imageUrlBack=e.sprites.back_default,t.height=e.height,t.weight=e.weight;let n=e.types.map(function(t){return t.type.name});t.type=n;let o=e.abilities.map(function(t){return t.ability.name});t.ability=o}).catch(function(t){console.error(t)})},showModal:i,showDetails:a}}();pokemonRepository.loadList().then(function(){pokemonRepository.getAll().forEach(function(t){pokemonRepository.addListItem(t)})});
