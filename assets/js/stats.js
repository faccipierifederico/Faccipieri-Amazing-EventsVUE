let url = 'https://mindhub-xj03.onrender.com/api/amazing'

async function bringData() {
  try{
    // traigo todo de la API
    const response = await fetch(url)
    const data = await response.json()
    const dataEvents = await data.events
    console.log(dataEvents);

    // creación tabla 1
    const table1 = document.getElementById("table1")

    loadTable1(dataEvents, table1)

    // creación tabla 2
    const table2 = document.getElementById("table2")

    revenueCalculation(dataEvents.filter(element => element.assistance), "Food", table2)
    revenueCalculation(dataEvents.filter(element => element.estimate), "Food", table2)


    // creación tabla 3
    const table3 = document.getElementById("table3")

    insertTable2(dataEvents.filter(element => element.estimate), table2)
    insertTable2(dataEvents.filter(element => element.assistance), table3)

  }
  catch(error) {
    console.log(error);
  }
}

bringData();

// let urlApi = "https://mindhub-xj03.onrender.com/api/amazing"

// fetch(urlApi)
//   .then(res => res.json())
//   .then(data => {

    // const table = document.getElementById("table1")
    // // const events = data.events;
    // // console.log(dataEvents)
    // loadTable1(dataEvents, table)

    // const table2 = document.getElementById("table2")
    // const table3 = document.getElementById("table3")

  //   revenueCalculation(dataEvents.filter(element => element.assistance), "Food", table2)
  //   revenueCalculation(dataEvents.filter(element => element.estimate), "Food", table2)

  //   insertTable2(dataEvents.filter(element => element.estimate), table2)
  //   insertTable2(dataEvents.filter(element => element.assistance), table3)

  // })
  // .catch(error => console.log(error))

function loadTable1(array, container) {

  let higherCapacity = array.reduce((event1, event2) => {
    if (event1.capacity > event2.capacity) return event1
    return event2
  })
  console.log(higherCapacity)

  let higherAttendance = array.filter(element => element.assistance).reduce((event1, event2) => {
    if ((event1.assistance / event1.capacity) > (event2.assistance / event2.capacity)) return event1
    return event2
  })
  console.log(higherAttendance)

  let lowerAttendance = array.filter(element => element.assistance).reduce((event1, event2) => {
    if ((event1.assistance / event1.capacity) < (event2.assistance / event2.capacity)) return event1
    return event2
  })
  console.log(lowerAttendance)

  let trContainer = document.createElement('tr')
  trContainer.innerHTML = `
        <td>${higherAttendance.name} (${(higherAttendance.assistance / higherAttendance.capacity * 100).toFixed(2)}%)</td>
        <td>${lowerAttendance.name} (${(lowerAttendance.assistance / lowerAttendance.capacity * 100).toFixed(2)}%)</td>
        <td>${higherCapacity.name} (${higherCapacity.capacity})</td>`
        container.appendChild(trContainer)
}

function revenueCalculation(array, categoryName) {

  let arrayFilter = array.filter(element => element.category == categoryName).reduce((total, event) => {
    if (event.assistance != undefined) return total += event.price * event.assistance
    return total += event.price * event.estimate
  }, 0)
  return arrayFilter
}

function insertTable2(array, container) {
  //  arreglo de categorias unicas
  let categories = [... new Set(array.map(element => element.category))]

  let fragment = document.createDocumentFragment()

  for (category of categories) {
    let trContainer = document.createElement('tr')
    trContainer.innerHTML = `<td>${category}</td>
        <td>U$D ${revenueCalculation(array, category)}</td>
        <td>${assistanceCalculation(array, category)} %</td>`
    fragment.appendChild(trContainer)
  }
  container.appendChild(fragment)

}

function assistanceCalculation(array, categoryName) {

  let arrayFilter = array.filter(element => element.category == categoryName).reduce((total, event) => {
    if (event.assistance != undefined) return total += event.assistance / event.capacity
    return total += event.estimate / event.capacity
  }, 0)
  return (arrayFilter * 100 / array.filter(element => element.category == categoryName).length).toFixed(2)
}