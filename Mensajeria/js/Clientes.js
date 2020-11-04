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
      //this.dtIni();
   },

   data: {

      peticion: [],
      campos: [],
      camposNombre: [],
      NOMBRE: "",

      //boton buscar
      valorBuscar: "",
      valorCedula: "",
      selected: "",
      notas: "",

      user: "Ademar",

      dml: "JJ",
      numPag: 0,

      notas: "",
      clienteActivo: '',
      camposCliente: [],

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

            this.buscarClientes();
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

            this.buscarClientes();
         },
         // Este es el número de milisegundos que esperamos a que el usuario termine de tipear.
         500
      ),

      buscarClientes: function () {

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
               parametros = addParametro(parametros, 'IND_TIPOCLIENTE', 'M', '', '!=', 0);

            } else if (this.valorCedula != "") {

               parametros = addParametro(parametros, 'NUM_IDENTIFICACION', this.valorCedula, '', '=', 0);
               parametros = addParametro(parametros, 'IND_TIPOCLIENTE', 'M', '', '!=', 0);

            }

            var pet = getPeticion(header, parametros, filas);



            this.exeDsoa(pet, "JJ", "1235666", "N", "N", "7011");
         }
      },


      inicioGrid: function () {

         var header = '';
         header = headerPaginacion("7001", 'JJ', '123', 'kate', '1', '10', 'NOM_CLIENTE');

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
         parametros = addParametro(parametros, 'IND_TIPOCLIENTE', 'M', '', '!=', 0);

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

               //console.log("response", this.peticion);

               if (this.peticion.codigoerror.length == 0) {

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

                     switch (tabla) {

                        case "7001":

                           if (this.peticion.dml == "I" && this.peticion.datos == "0") {
                              swal({ type: 'success', title: "", text: "El registro fue agregado correctamente", showConfirmButton: true });

                              window.setTimeout(function () {
                                 window.location.href = "AgregarCliente.html";
                              }, 4000);
                           }
                           break;

                        case "7011":
                           this.dtClr();
                           
                           this.campos = JSON.parse(this.peticion.datos);
                           this.numPag = parseInt(this.campos.total);

                           this.dtIni();

                           break;

                        case "754":

                           if (this.peticion.codigoerror == 0) {

                              this.camposNombre = this.peticion.datos;
                              this.camposNombre = parser.parse(this.camposNombre); //CONVIERTE XML TO JSON

                              this.camposNombre = JSON.parse(this.camposNombre.Response.PV_JSON);//CONVIERTE CAMPO A JSON

                              if (this.camposNombre.CODIGO_TIPO_IDENTIFICACION == "01") {
                                 vc.listaCliente.NOM_CLIENTE = this.camposNombre.NOMBRE + " " + this.camposNombre.APELLIDO1 + " " + this.camposNombre.APELLIDO2;
                              }

                              if (this.camposNombre.CODIGO_TIPO_IDENTIFICACION == "02") {
                                 vc.listaCliente.NOM_CLIENTE = this.camposNombre.NOMBRE;
                              }
                           }

                           break;

                        case "701":

                           if (this.peticion.codigoerror == 0) {

                              vc.clienteLista = this.peticion.datos;
                              vc.clienteLista = JSON.parse(vc.clienteLista);



                              if (vc.clienteLista.registros == 0) {
                                 vc.dml = "I";

                                 vc.listaCliente.COD_CLIENTE = "",
                                    vc.listaCliente.NUM_TELEFONO = "",
                                    vc.listaCliente.NUM_CELULAR = "",
                                    vc.listaCliente.DIR_EMAIL = "",
                                    vc.listaCliente.IND_TIPOSEXO = "",
                                    vc.listaCliente.IND_ESTADOCIVIL = "",
                                    vc.listaCliente.IND_TIPOCLIENTE = "",
                                    vc.listaCliente.IND_ESTADO = "",
                                    vc.listaCliente.COD_PROVINCIA = "",
                                    vc.listaCliente.COD_CANTON = "",
                                    vc.listaCliente.COD_DISTRITO = "",
                                    vc.listaCliente.COD_CASERIO = "",
                                    vc.listaCliente.DES_OBSERVACIONES = "",
                                    vc.listaCliente.FEC_NACIMIENTO = (new Date().getFullYear() + "-" + ("0" + (new Date().getMonth() + 1)).slice(-2) + "-" + new Date().getDate()),

                                    vc.padronNombre();

                              } else {
                                 vc.listaCliente = JSON.parse(this.peticion.datos);
                                 vc.listaCliente = vc.listaCliente.rows[0];
                                 vc.tipoCedula = vc.listaCliente.TIP_IDENTIFICACION;
                                 vc.numCedula = vc.listaCliente.NUM_IDENTIFICACION;
                                 vc.dml = "U";
                              }
                           }
                           break;

                        default:
                        // code block
                     }

                     if (this.campos.registros == "0") {
                        swal({ title: "Alerta!", text: "No se encontraron registros", showConfirmButton: true });
                     }
                  }
               }
            })

            .catch(function (error) {
               console.log("SE PRODUJO ERROR " + error);
            });

      },

      editarCliente: function (item) {

         window.location.href = "AgregarCliente.html?dist=" + item.COD_CLIENTE;

      },

      borrarCliente: function (item) {

         var header = '';
         header = headerPaginacion("7001", 'U', '123', 'kate', '1', '10', 'COD_CLIENTE');

         var filas = '';
         filas = addColumna(filas, 'IND_ESTADO', 'I', 0);
         filas = addColumna(filas, 'COD_CLIENTE', item.COD_CLIENTE, 0);
         filas = addColumna(filas, 'COD_COMPANIA', item.COD_COMPANIA, 0);

         var parametros = '<ParamItem/>';

         var pet = getPeticion(header, parametros, filas);

         this.exeDsoa(pet, "U", "1235666", "N", "N", "7001");

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

//////////  MANTENIMIENTO
var vc = new Vue({
   el: '#addCliente',

   created: function () {
      this.getCantones();
      this.getDistritos();
      this.getUbicaciones();

      if (this.getParameterByName('dist') != null) {
         var COD_CLIENTE = this.getParameterByName('dist');
         this.buscarPorCodigo(COD_CLIENTE);
      }
   },

   data: {
      peticion: [],
      campos: [],
      camposEdit: [],
      //

      user: "Ademar",
      provincias: [
         { "provincia": "1", "nombre": "SAN JOSE" },
         { "provincia": "2", "nombre": "ALAJUELA" },
         { "provincia": "3", "nombre": "CARTAGO" },
         { "provincia": "4", "nombre": "HEREDIA" },
         { "provincia": "5", "nombre": "GUANACASTE" },
         { "provincia": "6", "nombre": "PUNTARENAS" },
         { "provincia": "7", "nombre": "LIMON" }
      ],

      cantones: [],
      distritos: [],
      ubicaciones: [],

      clienteLista: [],
      nombreC: "",
      listaCliente: {
         ROWID: "",
         COD_COMPANIA: "",
         COD_CLIENTE: "",
         NOM_CLIENTE: "",
         NUM_IDENTIFICACION: "",
         NUM_TELEFONO: "",
         NUM_CELULAR: "",
         DIR_EMAIL: "",
         IND_TIPOSEXO: "",
         IND_ESTADOCIVIL: "",
         IND_TIPOCLIENTE: "",
         IND_ESTADO: "",
         COD_PROVINCIA: "",
         COD_CANTON: "",
         COD_DISTRITO: "",
         COD_CASERIO: "",
         DES_OBSERVACIONES: "",
         FEC_NACIMIENTO: (new Date().getFullYear() + "-" + ("0" + (new Date().getMonth() + 1)).slice(-2) + "-" + new Date().getDate()),
      },

      //cargar Nombre
      tipoCedula: "",
      numCedula: "",

      dml: "JJ",
      xml: "",
      notas: "",

      //validacion
      errors: [],
      name: null,
      email: null,
   },

   watch: {

      tipoCedula: function (nuevoValor) {
         this.notas = 'Seleccione una opcion'
         this.getBusquedaCedula()
      },

      numCedula: function (nuevoValor) {
         this.notas = 'Seleccione una opcion'

         this.getBusquedaCedula()
      },
   },

   computed: {
      cantonesFilter: function () {
         return this.cantones.filter((itemcanton) => itemcanton.provincia == this.listaCliente.COD_PROVINCIA);
      },

      distritosFilter: function () {
         return this.distritos.filter((itemdistrito) => itemdistrito.provincia == this.listaCliente.COD_PROVINCIA && itemdistrito.canton == this.listaCliente.COD_CANTON);
      },

      ubicacionesFilter: function () {
         return this.ubicaciones.filter((itemubicacion) => itemubicacion.provincia == this.listaCliente.COD_PROVINCIA && itemubicacion.canton == this.listaCliente.COD_CANTON && itemubicacion.distrito == this.listaCliente.COD_DISTRITO);
      },
   },

   methods: {

      getBusquedaCedula: _.debounce(
         function () {

            if (this.tipoCedula == "03" || this.tipoCedula == "04" || this.tipoCedula == "") {
               return

            } else {

               if (this.numCedula == "") {
                  this.notas = 'Datos Incompletos'
                  return
               }

               if (_.size(this.numCedula) < 9) {
                  this.notas = 'Cédula no es válida'

                  return
               }

               this.getClientes();

            }
         },
         // Este es el número de milisegundos que esperamos a que el usuario termine de tipear.
         500
      ),

      getClientes: function () {

         var header = '';
         header = headerFormat("7001", 'JJ', '123', 'kate', 'YYYY-MM-DD', '', 'COD_CLIENTE');

         var filas = '';
         filas = addColumna(filas, '*', '', 0);

         var parametros = '';
         parametros = addParametro(parametros, 'TIP_IDENTIFICACION', this.tipoCedula, '', '=', 0);
         parametros = addParametro(parametros, 'NUM_IDENTIFICACION', this.numCedula, '', '=', 0);

         var pet = getPeticion(header, parametros, filas);

         vm.exeDsoa(pet, "JJ", "1235666", "N", "N", "701");
      },

      padronNombre: function () {
         var header = '';
         header = headerPeticion("754", 'E', '123', 'kate', '', '');

         var filas = '<Filas/>';

         var parametros = '';
         parametros = addParametro(parametros, 'PV_CODIGO_TIPO_IDENTIFICACION', this.tipoCedula, '', '=', 0);
         parametros = addParametro(parametros, 'PV_NUMERO_IDENTIFICACION', this.numCedula, '', '=', 0);

         var pet = getPeticion(header, parametros, filas);

         vm.exeDsoa(pet, "E", "1235666", "N", "N", "754");
      },

      buscarPorCodigo: function (cod) {

         var header = '';
         header = headerFormat("7001", 'JJ', '123', 'kate', 'YYYY-MM-DD', '', 'COD_CLIENTE');

         var filas = '';
         filas = addColumna(filas, '*', '', 0);

         var parametros = '';
         parametros = addParametro(parametros, 'COD_CLIENTE', cod, '', '=', 0);

         var pet = getPeticion(header, parametros, filas);

         vm.exeDsoa(pet, "JJ", "1235666", "N", "N", "701");

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

         var header = '';
         header = headerPaginacion("7001", this.dml, '123', 'kate', '1', '10', 'COD_CLIENTE');

         var filas = '';
         filas = addColumna(filas, 'COD_CLIENTE', this.listaCliente.COD_CLIENTE, 0);
         filas = addColumna(filas, 'NOM_CLIENTE', this.listaCliente.NOM_CLIENTE, 0);
         filas = addColumna(filas, 'IND_ESTADO', this.listaCliente.IND_ESTADO, 0);
         filas = addColumna(filas, 'TIP_IDENTIFICACION', this.tipoCedula, 0);
         filas = addColumna(filas, 'NUM_IDENTIFICACION', this.numCedula, 0);
         filas = addColumna(filas, 'NUM_TELEFONO', this.listaCliente.NUM_TELEFONO, 0);
         filas = addColumna(filas, 'DIR_EMAIL', this.listaCliente.DIR_EMAIL, 0);
         filas = addColumna(filas, 'IND_TIPOSEXO', this.listaCliente.IND_TIPOSEXO, 0);
         filas = addColumna(filas, 'IND_ESTADOCIVIL', this.listaCliente.IND_ESTADOCIVIL, 0);
         filas = addColumna(filas, 'IND_TIPOCLIENTE', this.listaCliente.IND_TIPOCLIENTE, 0);
         filas = addColumna(filas, 'FEC_NACIMIENTO', this.listaCliente.FEC_NACIMIENTO, 0);
         filas = addColumna(filas, 'NUM_CELULAR', this.listaCliente.NUM_CELULAR, 0);
         //direcciones
         filas = addColumna(filas, 'COD_PROVINCIA', this.listaCliente.COD_PROVINCIA, 0);
         filas = addColumna(filas, 'COD_CANTON', this.listaCliente.COD_CANTON, 0);
         filas = addColumna(filas, 'COD_DISTRITO', this.listaCliente.COD_DISTRITO, 0);
         filas = addColumna(filas, 'COD_CASERIO', this.listaCliente.COD_CASERIO, 0);
         filas = addColumna(filas, 'DES_OBSERVACIONES', this.listaCliente.DES_OBSERVACIONES, 0);
         filas = addColumna(filas, 'COD_PAIS', '506', 0);
         filas = addColumna(filas, 'COD_COMPANIA', '01', 0);

         var parametros = '<ParamItem/>';

         var pet = getPeticion(header, parametros, filas);

         //console.log("add", pet);

         vm.exeDsoa(pet, "I", "1235666", "N", "N", "7001");

      },

      getCantones: function () {

         axios.get('./recursos/Json/Cantones.json').then((response) => {

            this.cantones = response.data;
         })
            .catch((err) => {
               //Error al cargar cantones
            })


      },

      getDistritos: function () {

         axios.get('./recursos/Json/Distritos.json').then((response) => {

            this.distritos = response.data;

         })
            .catch((err) => {
               //Error al cargar distros
            })

      },

      getUbicaciones: function () {


         axios.get('./recursos/Json/Ubicaciones.json').then((response) => {

            this.ubicaciones = response.data;

         })
            .catch((err) => {
               //Error al cargar ubicaciones
            })
      }

   }

});


