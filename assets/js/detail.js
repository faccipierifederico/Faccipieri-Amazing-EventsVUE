let url = 'https://mindhub-xj03.onrender.com/api/amazing'

async function bringData() {
  try{
    // traigo todo de la API
    const response = await fetch(url)
    const data = await response.json()
    const dataEvents = await data.events
    console.log(dataEvents);

    const queryString = location.search;
    
    const params = new URLSearchParams(queryString);
    
    const id = params.get("_id");

    const happening = data.events.find(happen => happen._id == id);

    details(happening, "details-card")
  }
  catch(error){
    console.log(error);
  }
}

bringData();

// const queryString = location.search;

// const params = new URLSearchParams(queryString);

// const id = params.get("_id");

// const happening = data.events.find(happen => happen._id == id);


// ORIGINAL DEL DETAILS
function details(array, idContainer) {
    const div = document.getElementById(idContainer)
    div.innerHTML = `<div class="img-details">
                    <img class="card-img-top h-50" src="${array.image}">
                    <div class="card-body d-flex flex-column details-div">
                    <h5 class="h2-details">${array.name}</h5>
                    <p class="p-details"> Description: ${array.description} </p>
                    <ul class="ul-details">
                        <li class="ul-details">Date: ${array.date}</li>
                        <li class="ul-details">Category: ${array.category}</li>
                        <li class="ul-details">Place: ${array.place}</li>
                        <li class="ul-details">Capacity: ${array.capacity} people</li>
                        <li class="ul-details">Assistance: ${array.estimate}</li>
                        <li class="ul-details">Price: ${array.price} USD</li>
                    </ul>
                    </div>
                    </div>`
}

// details(happening, "details-card")