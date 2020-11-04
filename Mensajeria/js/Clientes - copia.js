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
   el: '#appCliente',
   store: store,
   
   created: function () {

      this.inicioGrid();
      console.log("ini vm");

   },

   data: {

      peticion: [],
      campos: [],

      gridBuscar: [
         { campo: "Cedula" },
         { campo: "Nombre" },
      ],

      listaPaginacion: [],

      selected: "",
      valorBuscar: "",
      notas: "Digite el nombre a buscar...",
      completado: 0,
      user: "Ademar",

      dml: "JJ",
      key: "",
      pag: "",
      i: 0,


   },

   watch: {
      // cuando 'question' cambie, se ejecutará esta función
      valorBuscar: function (nuevoValor) {
         this.notas = 'Digite el nombre a buscar...'
         this.getBusqueda()
      }
   },

   methods: {

      getBusqueda: _.debounce(
         function () {

            if (this.selected != "Nombre") {
               return
            }

            if (_.size(this.valorBuscar) < 4) {
               this.notas = 'Ingrese más valores'
               return
            }

            this.buscarClientes();
         },
         // Este es el número de milisegundos que esperamos a que el usuario termine de tipear.
         500
      ),

      inicioGrid: function () {

         var header = '';
         header = headerPaginacion("7001", 'JJ', '123', 'kate', '1', '10', 'COD_CLIENTE');

         var filas = '';
         filas = addColumna(filas, 'ROWID', '', 0);
         filas = addColumna(filas, 'COD_COMPANIA', '', 0);
         filas = addColumna(filas, 'IND_ESTADO', '', 0);
         filas = addColumna(filas, 'COD_CLIENTE', '', 0);
         filas = addColumna(filas, 'NOM_CLIENTE', '', 0);
         filas = addColumna(filas, 'NUM_IDENTIFICACION', '', 0);
         filas = addColumna(filas, 'NUM_TELEFONO', '', 0);
         filas = addColumna(filas, 'DIR_EMAIL', '', 0);
         filas = addColumna(filas, 'DES_OBSERVACIONES', '', 0);

         var parametros = '';
         parametros = addParametro(parametros, 'COD_COMPANIA', '01', '', '=', 0);
         //parametros = addParametro(parametros, 'IND_ESTADO', 'I', '', '!=', 0);

         var pet = getPeticion(header, parametros, filas);

         this.exeDsoa(pet, "JJ", "1235666", "N", "N");

      },

      exeDsoa: function (datos, dml, credencial, formatoenvio, formatorecibe) {


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
               "content-type": "application/json;charset=utf-8",
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
               console.log("VV", this.peticion);
               if (this.peticion.codigoerror.lenght == 0) {

                  swal({
                     title: 'Alerta!',
                     text: "Error no identificado",
                     type: 'warning',
                     confirmButtonText: 'OK'
                  })

               } else {

                  if (Math.abs(this.peticion.codigoerror) != "0") {

                     swal({ title: 'Alerta!', text: this.peticion.deserror, type: 'warning', confirmButtonText: 'OK' })

                  } else {

                     this.campos = JSON.parse(this.peticion.datos);

                     if (this.peticion.dml == "I" && this.peticion.datos == "0") {
                        console.log("C01", this.peticion);
                        swal({ type: 'success', title: "", text: "El registro fue agregado correctamente", timer: 4000, showConfirmButton: true });

                        window.setTimeout(function () {
                           window.location.href = "ListaClientes.html";
                        }, 2000);
                     }

                     if (this.campos.registros == "0") {
                        swal({ title: "Alerta!", text: "No se encontraron registros", timer: 3000, showConfirmButton: true });
                     }
                  }
               }
            })

            .catch(function (error) {
               console.log("SE PRODUJO ERROR " + error);
            });

      },

      onchangeRegistro: function () {
        
      },

      onchangePage: function () {
         this.paginacion(this.pag)
      },

      buscarClientes: function () {

         console.log("buscar", this.selected, this.valorBuscar);

         var header = '';
         header = headerPaginacion("7001", 'JJ', '123', 'kate', '1', '10', 'COD_CLIENTE');

         var filas = '';
         filas = addColumna(filas, '*', '', 0);

         var parametros = '';

         if (this.selected == "Nombre") {

            //debe ir el nombre columna en base de datos
            parametros = addParametro(parametros, 'NOM_CLIENTE', this.valorBuscar, '', 'LIKE', 0);

         } else if (this.selected == "Cedula") {

            parametros = addParametro(parametros, 'NUM_IDENTIFICACION', this.valorBuscar, '', '=', 0);
         }

         var pet = getPeticion(header, parametros, filas);

         this.exeDsoa(pet, "JJ", "1235666", "N", "N");

      },

      buscarEditarCliente: function (item) {

         console.log("edit cliente", item);

         window.location.href = "EditarCliente.html?dist=" + item.COD_CLIENTE;

      },

      editarCliente: function (index) {
         console.log("editar", index);

         var header = '';
         header = headerPaginacion("7001", 'U', '123', 'kate', '1', '10', 'COD_CLIENTE');

         var filas = '';
         filas = addColumna(filas, 'IND_ESTADO', 'I', 0);
         filas = addColumna(filas, 'COD_CLIENTE', item.COD_CLIENTE, 0);
         filas = addColumna(filas, 'COD_COMPANIA', item.COD_COMPANIA, 0);

         var parametros = '<ParamItem/>';
         //debe ir el nombre columna en base de datos
         // parametros = addParametro(parametros, 'ROWID', ROWID, '', '=', 0);

         var pet = getPeticion(header, parametros, filas);

         // this.exeDsoa(pet, "U", "1235666", "N", "N");
      },

      borrarCliente: function (item) {
         console.log("borrar", item);

         var header = '';
         header = headerPaginacion("7001", 'U', '123', 'kate', '1', '10', 'COD_CLIENTE');

         var filas = '';
         filas = addColumna(filas, 'IND_ESTADO', 'I', 0);
         filas = addColumna(filas, 'COD_CLIENTE', item.COD_CLIENTE, 0);
         filas = addColumna(filas, 'COD_COMPANIA', item.COD_COMPANIA, 0);

         var parametros = '<ParamItem/>';

         var pet = getPeticion(header, parametros, filas);

         this.exeDsoa(pet, "U", "1235666", "N", "N");

      },

      paginacion: function (pagina) {

         var header = '';
         header = headerPaginacion("7001", 'P', '123', 'kate', pagina, '10', 'COD_CLIENTE');

         var filas = '<Filas/>';

         var parametros = '<ParamItem/>';

         var pet = getPeticion(header, parametros, filas);

         console.log("pagV2", pet);

         this.exeDsoa(pet, "P", "1235666", "N", "N");
      }
   }

});

var vc = new Vue({
   el: '#addCliente',

   created: function () {
      console.log("ini vc");
      //this.inicioForm();


   },

   data: {
      peticion: [],
      campos: [], //{ "page": "1", "total": "1", "registros": "5", "rows": [{ "ROWID": "AAMDDaAARAAAAFNAAB", "COD_COMPANIA": "01", "COD_CLIENTE": "2", "NOM_CLIENTE": "ALEX MORALEZ VILLALOBOS", "NOM_RAZONSOCIAL": "", "IND_ESTADO": "A", "COD_CLASIFICACION": "", "TIP_IDENTIFICACION": "01", "NUM_IDENTIFICACION": "111111111", "NOM_LUGAR_TRABAJO": "", "COD_ZONA": "", "COD_RUTA": "", "NUM_TELEFONO": "88888888", "DIR_EMAIL": "AMORALEZVILLALOBOS36@gmail.com", "FEC_INGRESO": "", "DES_OBSERVACIONES": "SAN JOSE; PURISCAL; SANTIAGO", "IND_TIPOSEXO": "", "COD_ALTERNO": "", "DES_AVISO": "", "DES_OCUPACION": "", "IND_ESTADOCIVIL": "", "IND_TIPOCLIENTE": "", "FEC_NACIMIENTO": "", "POR_DESCLI": "", "NUM_CELULAR": "", "DES_CORREO": "", "NUM_DOCUMENTO": "", "USR_INCLUSION": "ADIAZ", "FEC_INCLUSION": "27/05/19", "USR_MODIFICACION": "", "FEC_MODIFICACION": "" }, { "ROWID": "AAMDDaAARAAAAFNAAE", "COD_COMPANIA": "01", "COD_CLIENTE": "5", "NOM_CLIENTE": "ALEX", "NOM_RAZONSOCIAL": "", "IND_ESTADO": "A", "COD_CLASIFICACION": "A", "TIP_IDENTIFICACION": "01", "NUM_IDENTIFICACION": "555555555", "NOM_LUGAR_TRABAJO": "POR DEFINIR", "COD_ZONA": "1", "COD_RUTA": "1", "NUM_TELEFONO": "55555555", "DIR_EMAIL": "abc@gmail.com", "FEC_INGRESO": "", "DES_OBSERVACIONES": "", "IND_TIPOSEXO": "", "COD_ALTERNO": "", "DES_AVISO": "", "DES_OCUPACION": "", "IND_ESTADOCIVIL": "", "IND_TIPOCLIENTE": "", "FEC_NACIMIENTO": "", "POR_DESCLI": "", "NUM_CELULAR": "", "DES_CORREO": "", "NUM_DOCUMENTO": "29549", "USR_INCLUSION": "ENCOMIENDAS", "FEC_INCLUSION": "30/05/19", "USR_MODIFICACION": "", "FEC_MODIFICACION": "" }] },
      camposEdit: [],
      //
      completado: 0,
      user: "Ademar",
      listaCliente: {
         ROWID: "",
         COD_COMPANIA: "",
         COD_CLIENTE: "",
         NOM_CLIENTE: "",
         NOM_RAZONSOCIAL: "",
         IND_ESTADO: "",
         COD_CLASIFICACION: "",
         TIP_IDENTIFICACION: "",
         NUM_IDENTIFICACION: "",
         COD_ZONA: "",
         COD_RUTA: "",
         NUM_TELEFONO: "",
         DIR_EMAIL: "",
         DES_OBERVACIONES: "",
         IND_TIPOSEXO: "",
         IND_ESTADOCIVIL: "",
         IND_TIPOCLIENTE: "",
         IND_ESTADO: "",
         FEC_NACIMIENTO: (new Date().getFullYear() + "-" + ("0" + (new Date().getMonth() + 1)).slice(-2) + "-" + new Date().getDate() ),
         POR_DESCLI: "",
         NUM_CELULAR: ""
      },

      listaEstadoCivil: [
         { campo: "Soltero" },
         { campo: "Casado" },
         { campo: "Divorciado" },
         { campo: "Viudo" },
      ],

      listaGenero: [
         { campo: "F" },
         { campo: "M" }
      ],

      listaTipoCliente: [
         { campo: "Fijo" },
         { campo: "Ocasional" }
      ],

      listaDireccionCliente: {
         COD_COMPANIA: "",
         COD_CLIENTE: "",
         COD_DIRECCION: "",
         COD_PROVINCIA: "",
         COD_CANTON: "",
         COD_DISTRITO: ""
      },

      provincia: { "1": "San José", "2": "Alajuela", "3": "Cartago", "4": "Heredia", "5": "Guanacaste", "6": "Puntarenas", "7": "Limón" },
      dml: "JJ",
      xml: "",


      //validacion
      errors: [],
      name: null,
      email: null,
   },

   methods: {

      inicioForm: function () {

         var COD_CLIENTE = this.getParameterByName('dist');

         var header = '';
         header = headerPaginacion("7001", 'JJ', '123', 'kate', '1', '10', 'COD_CLIENTE');

         var filas = '';
         var filas = '';
         filas = addColumna(filas, 'ROWID', '', 0);
         filas = addColumna(filas, 'COD_COMPANIA', '', 0);
         filas = addColumna(filas, 'IND_ESTADO', '', 0);
         filas = addColumna(filas, 'COD_CLIENTE', '', 0);
         filas = addColumna(filas, 'NOM_CLIENTE', '', 0);
         filas = addColumna(filas, 'NUM_IDENTIFICACION', '', 0);
         filas = addColumna(filas, 'NUM_TELEFONO', '', 0);
         filas = addColumna(filas, 'DIR_EMAIL', '', 0);
         filas = addColumna(filas, 'DES_OBSERVACIONES', '', 0);


         var parametros = '';
         parametros = addParametro(parametros, 'COD_CLIENTE', COD_CLIENTE, '', '=', 0);

         var pet = getPeticion(header, parametros, filas);

         vm.exeDsoa(pet, "JJ", "1235666", "N", "N");

      },

      getParameterByName: function (name, url) {
         if (!url) url = window.location.href;
         name = name.replace(/[\[\]]/g, '\\$&');
         var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
         if (!results) return null;
         if (!results[2]) return '';
         return decodeURIComponent(results[2].replace(/\+/g, ' '));
      },

      agregarCliente: function () {

         console.log("add", JSON.stringify(this.listaCliente));

         var header = '';
         header = headerPaginacion("7001", 'I', '123', 'kate', '1', '10', 'COD_CLIENTE');

         var filas = '';
         filas = addColumna(filas, 'NOM_CLIENTE', this.listaCliente.NOM_CLIENTE, 0);
         filas = addColumna(filas, 'NOM_RAZONSOCIAL', this.listaCliente.NOM_RAZONSOCIAL, 0);
         filas = addColumna(filas, 'IND_ESTADO', this.listaCliente.IND_ESTADO, 0);
         filas = addColumna(filas, 'COD_CLASIFICACION', this.listaCliente.COD_CLASIFICACION, 0);
         filas = addColumna(filas, 'TIP_IDENTIFICACION', this.listaCliente.TIP_IDENTIFICACION, 0);
         filas = addColumna(filas, 'NUM_IDENTIFICACION', this.listaCliente.NUM_IDENTIFICACION, 0);
         filas = addColumna(filas, 'COD_ZONA', this.listaCliente.COD_ZONA, 0);
         filas = addColumna(filas, 'COD_RUTA', this.listaCliente.COD_RUTA, 0);
         filas = addColumna(filas, 'NUM_TELEFONO', this.listaCliente.NUM_TELEFONO, 0);
         filas = addColumna(filas, 'DIR_EMAIL', this.listaCliente.DIR_EMAIL, 0);
         filas = addColumna(filas, 'DES_OBERVACIONES', this.listaCliente.DES_OBERVACIONES, 0);
         filas = addColumna(filas, 'IND_TIPOSEXO', this.listaCliente.IND_TIPOSEXO, 0);
         //filas = addColumna(filas, 'IND_ESTADOCIVIL', this.listaCliente.IND_ESTADOCIVIL, 0);
         //filas = addColumna(filas, 'IND_TIPOCLIENTE', this.listaCliente.IND_TIPOCLIENTE, 0);
         filas = addColumna(filas, 'FEC_NACIMIENTO', this.listaCliente.FEC_NACIMIENTO, 0);
         filas = addColumna(filas, 'POR_DESCLI', this.listaCliente.IND_TIPOCLIENTE, 0);
         filas = addColumna(filas, 'NUM_CELULAR', this.listaCliente.FEC_NACIMIENTO, 0);
         filas = addColumna(filas, 'COD_CLIENTE', this.listaCliente.COD_CLIENTE, 0);
         filas = addColumna(filas, 'COD_COMPANIA', '01', 0);

         var parametros = '<ParamItem/>';
         //parametros = addParametro(parametros, '','', '', '', 0);

         var pet = getPeticion(header, parametros, filas);

         vm.exeDsoa(pet, "I", "1235666", "N", "N");

      },

      agregarDireccion: function () {

         console.log("addDir", JSON.stringify(this.listaDireccionCliente));

         var header = '';
         header = headerPaginacion("7008", 'I', '123', 'kate', '1', '10', 'COD_CLIENTE');

         var filas = '';
         filas = addColumna(filas, 'COD_DISTRITO', this.listaDireccionCliente.COD_DISTRITO, 0);
         filas = addColumna(filas, 'COD_CANTON', this.listaDireccionCliente.COD_CANTON, 0);
         filas = addColumna(filas, 'COD_PROVINCIA', this.listaDireccionCliente.COD_PROVINCIA, 0);
         filas = addColumna(filas, 'COD_DIRECCION', this.listaDireccionCliente.COD_DIRECCION, 0);
         filas = addColumna(filas, 'COD_CLIENTE', this.listaDireccionCliente.COD_CLIENTE, 0);
         filas = addColumna(filas, 'COD_COMPANIA', '01', 0);

         var parametros = '<ParamItem/>';
         //parametros = addParametro(parametros, '','', '', '', 0);

         var pet = getPeticion(header, parametros, filas);

         vm.exeDsoa(pet, "I", "1235666", "N", "N");

      }



   }

});
