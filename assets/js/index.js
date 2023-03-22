const { createApp } = Vue
let urlApi = "https://mindhub-xj03.onrender.com/api/amazing";

    createApp( {
            data() {                    // donde van todas las variables que necesito declarar
                return {
                eventos: [],
                eventosFiltrados: [],
                checksFilter: [],
                checked: [],
                valorBusquedad: '',
                }
            },
            created() {               // esto se ejecutará una única vez y al inicio de la página. Por eso se puede poner, por ejemplo, el fetch.
                fetch(urlApi)
                .then(response => response.json())
                .then(data => {
                    this.eventos = data.events
                    this.eventosFiltrados = this.eventos
                    // console.log(this.eventos)
                    this.checksFilter = [...new Set(this.eventos.map(category => category.category)) ]
                    // console.log(this.checksFilter)
                }).catch(error => console.log(error))
            },
            methods:{                     // donde declaramos todas nuestras funciones
              filtro() {
                  this.eventosFiltrados = this.eventos.filter( evento => {
                      return (this.checked.includes(evento.category) || this.checked.length === 0) && evento.name.toLowerCase().includes(this.valorBusquedad.toLowerCase());
                  })
              }
            }
    }).mount('#app')

    // también existe un "computed" que es muy similar a un "methods" pero se ejecuta cada vez que cambiemos una propiedad de la función. Por eso suele
    // usarse para los keyups o changes y demás. En este caso podría haberse utilizado.