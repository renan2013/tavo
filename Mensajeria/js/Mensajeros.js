var peticion = {
   "datos": "",
   "dml": "",
   "formato": "",
   "formatoRequest": "",
   "credencial": "",
   "deserror": "",
   "codigoerror": "",
   "datosJson": ""
};

var vm = new Vue({
   el: '#appMensajero',

   created: function () {
      this.inicioGrid();

   },

   data: {
      peticion: [],
      campos: [],

      user: "Ademar",

      //boton buscar
      valorBuscar: "",
      valorCedula: "",
      selected: "",
      notas: "Digite el valor a buscar...",

      //paginacion
      numPag: 0,
   },

   watch: {
      // cuando 'valorBuscar' cambie, se ejecutará esta función
      valorBuscar: function (nuevoValor) {
         this.notas = 'Digite el valor a buscar...'
         this.getBusquedaNombre()
      },

      valorCedula: function (nuevoValor) {
         this.notas = 'Digite el valor a buscar...'
         this.getBusquedaCedula()
      },
   },

   methods: {

      getBusquedaNombre: _.debounce(
         function () {

            if (this.valorBuscar == "") {
               this.notas = ''
               return
            }

            if (_.size(this.valorBuscar) < 4) {
               this.notas = 'Ingrese más valores'
               return
            }

            this.buscarMensajero();
         },
         // Este es el número de milisegundos que esperamos a que el usuario termine de tipear.
         500
      ),

      getBusquedaCedula: _.debounce(
         function () {

            if (this.valorCedula == "") {
               this.notas = ''
               return
            }

            if (_.size(this.valorCedula) < 9) {
               this.notas = 'Ingrese más valores'
               return
            }

            this.buscarMensajero();
         },
         // Este es el número de milisegundos que esperamos a que el usuario termine de tipear.
         500
      ),

      buscarMensajero: function () {

         var header = '';
         header = headerPaginacion("7001", 'JJ', '123', 'kate', '1', '10', 'COD_CLIENTE');

         var filas = '';
         filas = addColumna(filas, '*', '', 0);

         var parametros = '';

         if (this.valorBuscar == "" && this.valorCedula == "") {

            swal({ title: 'Alerta!', text: "El valor para buscar no puede estar vacio.", type: 'warning', confirmButtonText: 'OK' })

         } else {

            if (this.valorBuscar != "") {

               //debe ir el nombre columna en base de datos
               parametros = addParametro(parametros, 'NOM_CLIENTE', this.valorBuscar, '', 'LIKE', 0);
               parametros = addParametro(parametros, 'IND_TIPOCLIENTE', 'M', '', '=', 0);

            } else if (this.valorCedula != "") {

               parametros = addParametro(parametros, 'NUM_IDENTIFICACION', this.valorCedula, '', '=', 0);
               parametros = addParametro(parametros, 'IND_TIPOCLIENTE', 'M', '', '=', 0);

            }

            var pet = getPeticion(header, parametros, filas);


            this.exeDsoa(pet, "JJ", "1235666", "N", "N", "7011");
         }
      },

      inicioGrid: function () {

         this.campos = "iniciar campos";

         var header = '';
         header = headerPaginacion("7001", 'JJ', '123', 'kate', '1', '10', 'COD_CLIENTE');

         var filas = '';
         filas = addColumna(filas, 'IND_ESTADO', '', 0);
         filas = addColumna(filas, 'COD_CLIENTE', '', 0);
         filas = addColumna(filas, 'NOM_CLIENTE', '', 0);
         filas = addColumna(filas, 'NUM_IDENTIFICACION', '', 0);
         filas = addColumna(filas, 'NUM_TELEFONO', '', 0);
         filas = addColumna(filas, 'NUM_CELULAR', '', 0);
         filas = addColumna(filas, 'DIR_EMAIL', '', 0);


         var parametros = '';
         parametros = addParametro(parametros, 'COD_COMPANIA', '01', '', '=', 0);
         parametros = addParametro(parametros, 'IND_ESTADO', 'A', '', '=', 0);
         parametros = addParametro(parametros, 'IND_TIPOCLIENTE', 'M', '', '=', 0);


         var pet = getPeticion(header, parametros, filas);

         this.exeDsoa(pet, "JJ", "1235666", "N", "N", "7011");

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
               "postman-token": "9be30243-8f01-3820-f64e-d09144a7706d"
               ,
               "processData": false,
            },
            "sync": true,
            "crossDomain": true,
            "data": pedido
         })
            .then((response) => {


               this.peticion = response.data;

               if (this.peticion.codigoerror != "0") {

                  Swal.fire({
                     title: 'Alerta!',
                     text: this.peticion.deserror,
                     type: 'warning',
                     confirmButtonText: 'OK'
                  })

               } else {

                  if (Math.abs(this.peticion.codigoerror) != "0") {

                     swal({ title: 'Alerta!', text: this.peticion.deserror, type: 'warning', confirmButtonText: 'OK' })

                  } else {

                     switch (tabla) {

                        case "7001":
                           window.setTimeout(function () {
                              window.location.href = "ListaMensajeros.html";
                           }, 500);
                           break;

                        case "7011":
                           this.dtClr();

                           this.campos = JSON.parse(this.peticion.datos);
                           this.numPag = parseInt(this.campos.total);
                           console.log("pag", this.numPag);
                           this.dtIni();

                           break;
                        default:
                        // code block
                     }

                     if (this.campos.registros == "0") {

                        Swal.fire({ title: "Alerta!", text: "No se encontraron registros", timer: 3000, showConfirmButton: true });

                     }
                  }
               }
            })

            .catch(function (error) {
               console.log("SE PRODUJO ERROR " + error);
            });

      },


      editarMensajero: function (index) {
         console.log("editar", index);

      },

      borrarMensajero: function (item) {

         var header = '';
         header = headerPaginacion("7001", 'U', '123', 'kate', '1', '10', 'COD_CLIENTE');

         var filas = '';
         filas = addColumna(filas, 'IND_ESTADO', 'I', 0);
         filas = addColumna(filas, 'COD_CLIENTE', item.COD_CLIENTE, 0);
         filas = addColumna(filas, 'COD_COMPANIA', '01', 0);

         var parametros = '<ParamItem/>';

         var pet = getPeticion(header, parametros, filas);

         //this.exeDsoa(pet, "U", "1235666", "N", "N", "7001");

         //botón confirmar
         Swal.fire({
            title: '¿Desea inabilitar mensajero?',
            text: "Confirme para continuar...",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmar!'
         }).then((result) => {
            if (result.value) {
               //console.log("brr", pet);
               this.exeDsoa(pet, "U", "1235666", "N", "N","7001");
            }
         })
      },

      paginacion: function (p) {

         var pagina = p.target.value;

         var header = '';
         header = headerPaginacion("7001", 'P', '123', 'kate', pagina, '10', 'COD_CLIENTE');
         var filas = '<Filas/>';
         var parametros = '<ParamItem/>';

         var pet = getPeticion(header, parametros, filas);

         this.exeDsoa(pet, "P", "1235666", "N", "N", "7011");
      },

      dtIni: function () {
         window.setTimeout(function () {
            table = $('#dt').DataTable({
               retrieve: true,
               responsive: true,
               paging: false,
               info: false,
               searching: false
            });
         }, 1000);
      },


      dtClr: function () {
         $('#dt').DataTable().destroy();
      },
   }

});

