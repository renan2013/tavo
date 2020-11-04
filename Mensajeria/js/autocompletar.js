// TODO: collision detection, autoscroll
// new: tab and highlighting, textareas, follow caret

/*peticion = {
  "datos": "",
  "dml": "",
  "formato": "",
  "formatoRequest": "",
  "credencial": "",
  "deserror": "",
  "codigoerror": "",
  "datosJson": ""
};
*/
const Autocomplete = Vue.component("autocomplete", {
  template: `<div class="autocomplete">
                <label :for="id">{{label}}</label>
                <input :id="id" class="autocomplete-input" :placeholder="placeholder" @focusout="focusout" 
                @focus="focus" @keydown.13="chooseItem" @keydown.tab="chooseItem" @keydown.40="moveDown" 
                @keydown.38="moveUp" v-model="inputValue" type="text">

                <ul :class="{ 'autocomplete-list': true, [id+'-list']: true }" v-if="searchMatch.length > 0">
                  <li :class="{active: selectedIndex === index}" v-for="(result, index) in searchMatch" 
                  @click="selectItem(index), chooseItem()" v-html="highlightWord(result)" ></li>
                </ul>
            </div>`,

  props: ["items", "placeholder", "label", "textarea", "rows", "cols"],

  data() {
    return {
      id: 'input-' + parseInt(Math.random() * 1000),
      inputValue: "",
      searchMatch: [],
      camposCliente: [],
      selectedIndex: 0,
      clickedChooseItem: false,
      wordIndex: 0,
      peticion: {
        "datos": "",
        "dml": "",
        "formato": "",
        "formatoRequest": "",
        "credencial": "",
        "deserror": "",
        "codigoerror": "",
        "datosJson": ""
      }
    };
  },

  created() {
    this.getClientes();
  },

  computed: {
    //carga la lista de datos para buscar

    listToSearch() {
      if (typeof this.items !== "undefined" && this.items.length > 0) {
        return this.items;
      };

      if (_.size(this.inputValue) < 4) {
        console.log('Ingrese más valores');
        return
      } else {
        return this.camposCliente.map(a => a.NOM_CLIENTE); //cantones.map(a => a.nombre); filtra la propiedad del array
      }
    },

    //toma la palabra actual ingresada
    currentWord() {
      return this.inputValue.replace(/(\r\n|\n|\r)/gm, ' ').split(' ')[this.wordIndex];
    },

    //crea un array con las palabras ingresadas, un espacio es un index nuevo en el array
    inputSplitted() {
      return this.inputValue.replace(/(\r\n|\n|\r)/gm, ' ').split(" ");
    }
  },

  watch: {
    //cuando el valor del input cambie...
    inputValue() {
      this.focus();

      this.selectedIndex = 0;

      //guarda el index de la palabra ingresada
      this.wordIndex = this.inputSplitted.length - 1;
    }
  },

  methods: {

    getClientes: function () {
      var header = '';
      header = headerPaginacion("7001", 'JJ', '123', 'kate', '1', '200', 'COD_CLIENTE');

      var filas = '';
      filas = addColumna(filas, 'COD_CLIENTE', '', 0);
      filas = addColumna(filas, 'NOM_CLIENTE', '', 0);

      var parametros = '<ParamItem/>';

      var pet = getPeticion(header, parametros, filas);

      this.exeDsoa(pet, "JJ", "1235666", "N", "N", "7001");
    },

    exeDsoa: function (datos, dml, credencial, formatoenvio, formatorecibe, tabla) {

      this.peticion.datos = "";

      var pedido = {
        "datos": datos,
        "dml": dml,
        "formato": formatoenvio,
        "credencial": credencial,
        "formatoRequest": formatorecibe
      };

      var respuesta = [];
      var url = store.state.urlDsoa;

      axios({
        method: 'POST',
        url,
        "headers": {
          "content-type": "application/json",
          "cache-control": "no-cache",
          "postman-token": "9be30243-8f01-3820-f64e-d09144a7706d",
          "processData": false,
        },
        "sync": true,
        "crossDomain": true,
        "data": pedido
      })
        .then((response) => {

          this.peticion = response.data;
          this.camposCliente = JSON.parse(this.peticion.datos);
          this.camposCliente = this.camposCliente.rows;
          console.log("pp", this.camposCliente);
        })

        .catch(function (error) {
          console.log("SE PRODUJO ERROR " + error);
        });

    },

    focus() {
      this.searchMatch = [];

      if (this.currentWord !== "") {

        if (_.size(this.inputValue) < 4) {
          return
        } else {
          //crea un filtro para buscar la palabra actual ingresada en la lista de datos para buscar
          this.searchMatch = this.listToSearch.filter(el => el.indexOf(this.currentWord) >= 0);
        }
      }

      if (_.size(this.searchMatch) === 1 && this.currentWord === this.searchMatch[0]) {
        this.searchMatch = [];
      }
    },

    //subraya en amarillo cuando se encuentren coincidencias
    highlightWord(word) {
      const regex = new RegExp("(" + this.currentWord + ")", "g");
      return word.replace(regex, '<mark>$1</mark>');
    },

    chooseItem(e) {
      this.clickedChooseItem = true;

      if (this.selectedIndex !== -1 && this.searchMatch.length > 0) {
        if (e) {
          e.preventDefault();
        }
        this.setWord(this.searchMatch[this.selectedIndex]);
        this.selectedIndex = -1;
      }
    },

    setWord(word) {
      let currentWords = this.inputValue.replace(/(\r\n|\n|\r)/gm, '__br__ ').split(' ');
      currentWords[this.wordIndex] = currentWords[this.wordIndex].replace(this.currentWord, word + ' ');
      this.wordIndex += 1;
      this.inputValue = currentWords.join(' ').replace(/__br__\s/g, '\n');
      console.log(this.inputValue);
    },

    moveDown() {
      if (this.selectedIndex < this.searchMatch.length - 1) {
        this.selectedIndex++;
      }
    },

    moveUp() {
      if (this.selectedIndex !== -1) {
        this.selectedIndex--;
      }
    },

    selectItem(index) {
      this.selectedIndex = index;
      this.chooseItem();
    },

    focusout: _.debounce(
      function (e) {
        
        if (!this.clickedChooseItem) {
          this.searchMatch = [];
          this.selectedIndex = -1;
        }

        this.clickedChooseItem = false;
      },
      // Este es el número de milisegundos que esperamos 
      100
   ),
  }
});


new Vue({
  el: "#app"
});
