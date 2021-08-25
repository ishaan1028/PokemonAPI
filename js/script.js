
function createCard(name, abilities, image, weight, moves) {
  let card = document.createElement("div");
  card.setAttribute('class', 'card');



  let imgcontainer = document.createElement("div");
  imgcontainer.setAttribute('class', 'img-container');

  let img = document.createElement("img");
  img.setAttribute('src', `${image}`);

  imgcontainer.append(img);
  card.append(imgcontainer);
  container.append(card);


  let details = document.createElement("div");
  details.setAttribute('class', 'details');

  let table = document.createElement("table");
  table.innerHTML = `<tr>
            <th>Name:</th>
            <td>${name}</td>
          </tr>
          <tr>
            <th>Abilities:</th>
            <td>${abilities.join(", ")}</td>
          </tr>
          <tr>
            <th>Weigtht:</th>
            <td>${weight} units</td>
          </tr>
          <tr>
            <th>Moves:</th>
            <td>
              ${moves.join(", ")}
            </td>
          </tr>`;

  details.append(table);
  card.append(details);
  container.append(card);
}


async function getPokemons(number) {

  try {

    let data;

    data = await fetch(`https://pokeapi.co/api/v2/pokemon/${number}/`);
    data = await data.json();

    if (data.ok === false) {
      throw new Error("Problem getting pokemon from pokemon api!");

    }


    let name = data.forms[0].name;

    let abilities = [];
    data.abilities.forEach(element => abilities.push(element.ability.name));



    let image = data.sprites.other["official-artwork"].front_default;

    let weight = data.weight;

    let moves = [];
    data.moves.forEach(data => {
      moves.push(data.move.name);

    })


    createCard(name, abilities, image, weight, moves);
  }
  catch (err) {
    alert(err);
    console.error(err);
  }




}



for (let i = 0; i < 50; i++) {
  getPokemons(i + 1);
}




let container = document.createElement("div");
container.setAttribute('class', 'container');


let header = document.createElement("div");
header.setAttribute("class", "header");

let logo = document.createElement("div");
logo.setAttribute("class", "logo");

let img = document.createElement("img");
img.setAttribute("src", "https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png");
logo.append(img);

let title = document.createElement("div");
title.setAttribute("class", "title");

title.innerHTML = `<p>The RESTful Pokémon API</p>`;

header.append(logo);
header.append(title);

document.body.append(header);
document.body.append(container);
