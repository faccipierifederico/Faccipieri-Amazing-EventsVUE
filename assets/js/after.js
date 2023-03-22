let url = 'https://mindhub-xj03.onrender.com/api/amazing'

async function bringData() {
  try{
    // traigo todo de la API
    const response = await fetch(url)
    const data = await response.json()
    console.log(data)
    const dataEvents = await data.events
    console.log(dataEvents);

    // creo un array para filtrar los "after"
    const indexDate = Date.parse(data.currentDate);

    for (let event of dataEvents) {
      if (Date.parse(event.date) > indexDate) {
        after.push(event);
      }
    }
    
    // llamo a la función que me imprime las tarjetas
    cardsCreate(after, "div-index");

    // traigo los checkboxes
    checkboxCreate(dataEvents, "filter-category");

    // hago funcional los checkboxes (filtro 1)
    let checkboxes = document.querySelectorAll("input[type=checkbox]");

    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", filterCheckbox);
    });

    function filterCheckbox() {
      inputChecks = Array.from(checkboxes)
        .filter((checkbox) => checkbox.checked)
        .map((value) => value.value);
      doubleFilter(after);
    }

    // hago funcional el search (filtro 2)
    let searchNav = document.getElementById("searchNav");

    searchNav.addEventListener("keyup", (e) => {
      inputText = e.target.value;
      doubleFilter(after);
    });

    // hago funcional el filtro cruzado (filtro cruzado)
    function doubleFilter(array) {
      let cardsChecked = filterArray(inputChecks, array);
      let finalFilter = filterSearch(inputText, cardsChecked);
      cardsCreate(finalFilter, "div-index");
    }
  }
  catch(error){
    console.log(error);
  }
}
bringData();


// const indexDate = Date.parse(data.currentDate);

// TRAIGO LAS TARJETAS POSTERIORES A LA FECHA
// NOTA: intentar traer todo esto por una función

let after = [];

// for (let event of data.events) {
//   if (Date.parse(event.date) > indexDate) {
//     after.push(event);
//   }
// }

// FUNCIÓN QUE ME TRAE LAS CARDS
function cardsCreate(array, idContainer) {
  let container = document.getElementById(idContainer);
  container.innerHTML = "";
  let fragment = document.createDocumentFragment();
  if (array == '') {
    container.innerHTML = `<h2 class="text-center3">Are you sure? The name of the event does not exist! Try again</h2>`;
  } else {
  for (let event of array) {
    let div = document.createElement("div");
    div.classList.add("new-div", "new-div2", "d-flex", "flex-column", "col-10", "col-sm-10", "col-md-4", "col-lg-3");
    div.innerHTML = `<h2 class="text-center h2-radius">${event.name}</h2>
                        <img class="h-75 img-cards" src="${event.image}" width="100%"></img>
                        <p class="new-div">Summary of the event: ${event.description}</p>
                        <div class="d-flex flex-column align-items-center"> 
                        <p class="new-div">Event price: ${event.price} dollars</p>
                        <a href="./details.html?_id=${event._id}" class="btn btn-outline-warning w-75 btn-details">Go to details ➔</a>
                        </div>`;
    fragment.appendChild(div);
  }
  container.appendChild(fragment);
}
}

// cardsCreate(after, "div-index");

// FIN DE TRAER TARJETAS POSTERIORES A LA FECHA

// COMIENZO DEL CHECKBOXES

function checkboxCreate(array, idContainer) {
  const container2 = document.getElementById(idContainer);
  container2.innerHTML = "";
  let fragment = document.createDocumentFragment();
  let mapping = array.map((element) => element.category);
  let categories = [...new Set(mapping)]; // TE PASA EL SET A UN ARRAY
  categories.forEach((category) => {
    let div = document.createElement("div");
    div.className = "form-check";
    div.innerHTML = `
                      <label class="form-check-label"> ${category}
                      <input class="form-check-input" type="checkbox" value=${category} id=""/>
                      </label>`;
    fragment.appendChild(div);
  });
  container2.appendChild(fragment);
}

// checkboxCreate(data.events, "filter-category");

// FIN DEL CHECKBOXES

// TASK 3

let inputChecks = [];
let inputText = "";

// FILTRADO DE LAS CARDS POR CATEGORYS (CHECKBOXES)

// let checkboxes = document.querySelectorAll("input[type=checkbox]");

// checkboxes.forEach((checkbox) => {
//   checkbox.addEventListener("change", filterCheckbox);
// });

// function filterCheckbox() {
//   inputChecks = Array.from(checkboxes)
//     .filter((checkbox) => checkbox.checked)
//     .map((value) => value.value);
//   doubleFilter(after);
// }

function filterArray(arrayS, arrayCards) {
  if (arrayS.length > 0) {
    return arrayCards.filter((objeto) =>
      arrayS.includes(objeto.category.split(" ").join("_"))
    );
  } else {
    return arrayCards;
  }
}

// FIN DEL FILTRADO [categories]
// ----------------------------------------------------------------------------------
// FILTRADO PERO POR EL BUSCADOR SEARCH

// let searchNav = document.getElementById("searchNav");

// searchNav.addEventListener("keyup", (e) => {
//   inputText = e.target.value;
//   doubleFilter(after);
// });

function filterSearch(value, arrayObject) {
  if (value == "") return arrayObject;
  let newArray = arrayObject.filter((elemento) =>
    elemento.name.toLowerCase().includes(value.toLowerCase().trim())
  );
  return newArray;
}
// FIN FILTRADO PERO POR EL BUSCADOR SEARCH
// ----------------------------------------------------------------------------------
// FILTRADO DOBLE

// function doubleFilter(array) {
//   let cardsChecked = filterArray(inputChecks, array);
//   let finalFilter = filterSearch(inputText, cardsChecked);
//   cardsCreate(finalFilter, "div-index");
// }