
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
  el: '#appcontrol',
  store: store,

  created: function () {
    this.ejecutarGenerico();
    this.getMensajeros();
    this.getTipoCobro();
  },

  data: {
    a: 1,

    peticion: [],
    NUM_MOV: 0,
    COD_CLIENTE: "",
    NOM_CLIENTE: "",
    NUM_IDENTIFICACION: "",
    campos: [],
    camposCliente: [],
    camposCobro: [],
    listaMovimientos: {
      ROWID: "",
      COD_COMPANIA: "",
      COD_CLIENTE: this.COD_CLIENTE,
      COD_MENSAJERO: "",
      FEC_DOCUMENTO: moment().format('YYYY-MM-DD'),
      DES_OBSERVACIONES: "",
      MTO_COBRAR: "",
      TIP_MOVIMIENTO: "",
      TIP_COBRO: ""
    },

    tipoMov: [
      { campo: "Servicio Mensajería", id: "E" },
      { campo: "Transferencia Bancaria", id: "T" },
    ],

    //boton buscar
    valorBuscar: "",
    valorCedula: "",
    nomCliente: "",
    cedCliente: "",
    selected: "",
    notas: "",
    gridBuscar: [
      { campo: "Cedula" },
      { campo: "Nombre" },
    ],

    notas: "",
    clienteActivo: '',
    camposCliente: [],

    fechaHoy: moment().format('YYYY-MM-DD'),
  },

  watch: {
    // cuando 'valorBuscar' cambie, se ejecutará esta función
    valorBuscar: function (nuevoValor) {
      this.notas = 'Digite el valor a buscar...'
      this.getBusquedaNombre()
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

    //busca el consecutivo del movimiento
    ejecutarGenerico: function () {

      var header = '';
      header = headerPeticion("151", 'E', '123', 'kate', '', '', '');

      var filas = '<Filas/>';

      var parametros = '';
      parametros = addParametro(parametros, 'PV_QUERY', 'SELECT SEQ_MOVIMIENTOS.NEXTVAL FROM dual', '', '=', 0);

      var pet = getPeticion(header, parametros, filas);

      this.exeDsoa(pet, "E", "1235666", "N", "N", "151");
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

              switch (tabla) {
                case "7001":
                  this.camposCliente = JSON.parse(this.peticion.datos);
                  if (this.camposCliente.registros == 0) {

                    swal({ title: "Alerta!", text: "No se encontraron registros", showConfirmButton: true });

                  } else {

                    this.camposCliente = this.camposCliente.rows;

                    this.clienteActivo.NOM_CLIENTE = this.camposCliente[0].NOM_CLIENTE;
                    this.clienteActivo.COD_CLIENTE = this.camposCliente[0].COD_CLIENTE;
                    this.clienteActivo.NUM_IDENTIFICACION = this.camposCliente[0].NUM_IDENTIFICACION;

                    //
                    this.COD_CLIENTE = this.clienteActivo.COD_CLIENTE;
                    this.NOM_CLIENTE = this.clienteActivo.NOM_CLIENTE;
                    this.NUM_IDENTIFICACION = this.clienteActivo.NUM_IDENTIFICACION;
                  }

                  break;

                case "151":
                  if (this.peticion.codigoerror == 0) {
                    this.camposGen = this.peticion.datos;
                    this.camposGen = parser.parse(this.camposGen);
                    this.NUM_MOV = this.camposGen.Response.PV_RETORNO;
                    console.log("CAMPOS", this.camposGen);
                    console.log("NUM_MOV", this.NUM_MOV);
                  }
                  break;

                case "7002":
                  this.campos = JSON.parse(this.peticion.datos);
                  this.campos = this.campos.rows;
                  break;

                case "7003":
                  this.camposCobro = JSON.parse(this.peticion.datos);
                  break;

                case "7004":

                  if (this.peticion.dml == "I" && this.peticion.datos == "0") {
                    swal({ type: 'success', title: "", text: "El registro fue agregado correctamente", timer: 4000, showConfirmButton: true });

                    window.setTimeout(function () {
                      window.location.href = "AgregarMovimientos.html";
                    }, 3000);
                  }
                  break;
                default:
                // code block
              }

              if (this.campos.registros == "0" || this.camposCliente.registros == "0") {

                swal({ title: "Alerta!", text: "No se encontraron registros", timer: 3000, showConfirmButton: true });

              }
            }
          }
        })

        .catch(function (error) {
          console.log("SE PRODUJO ERROR " + error);
        });

      return this.respuesta;

    },

    getMensajeros: function () {

      var header = '';
      header = headerPaginacion("7001", 'JJ', '123', 'kate', '1', '10', 'COD_CLIENTE');

      var filas = '';
      filas = addColumna(filas, 'ROWID', '', 0);
      filas = addColumna(filas, 'COD_COMPANIA', '', 0);
      filas = addColumna(filas, 'COD_CLIENTE', '', 0);
      filas = addColumna(filas, 'NOM_CLIENTE', '', 0);

      var parametros = '';
      parametros = addParametro(parametros, 'COD_COMPANIA', '01', '', '=', 0);
      parametros = addParametro(parametros, 'IND_TIPOCLIENTE', 'M', '', '=', 0);
      parametros = addParametro(parametros, 'IND_ESTADO', 'I', '', '!=', 0);

      var pet = getPeticion(header, parametros, filas);

      this.exeDsoa(pet, "JJ", "1235666", "N", "N", "7002");

    },

    getTipoCobro: function () {

      var header = '';
      header = headerPaginacion("7003", 'JJ', '123', 'kate', '1', '10', 'TIP_COBRO');

      var filas = '';
      filas = addColumna(filas, 'ROWID', '', 0);
      filas = addColumna(filas, 'TIP_COBRO', '', 0);
      filas = addColumna(filas, 'DES_COBRO', '', 0);
      filas = addColumna(filas, 'MTO_PORCENTAJE', '', 0);

      var parametros = '<ParamItem/>';

      var pet = getPeticion(header, parametros, filas);

      this.exeDsoa(pet, "JJ", "1235666", "N", "N", "7003");

    },

    buscarClientes: function () {

      var header = '';
      header = headerPaginacion("7001", 'JJ', '123', 'kate', '1', '10', 'COD_CLIENTE');

      var filas = '';
      filas = addColumna(filas, 'ROWID', '', 0);
      filas = addColumna(filas, 'COD_COMPANIA', '', 0);
      filas = addColumna(filas, 'NUM_IDENTIFICACION', '', 0);
      filas = addColumna(filas, 'COD_CLIENTE', '', 0);
      filas = addColumna(filas, 'NOM_CLIENTE', '', 0);

      var parametros = '';

      if (this.valorBuscar == "" && this.valorCedula == "") {

        swal({ title: 'Alerta!', text: "El valor para buscar no puede estar vacio.", type: 'warning', confirmButtonText: 'OK' })

      } else {

        if (this.valorBuscar != "") {

          //debe ir el nombre columna en base de datos
          parametros = addParametro(parametros, 'NOM_CLIENTE', this.valorBuscar, '', 'LIKE', 0);
          parametros = addParametro(parametros, 'IND_TIPOCLIENTE', 'M', '', '!=', 0);

        }

        var pet = getPeticion(header, parametros, filas);

        this.exeDsoa(pet, "JJ", "1235666", "N", "N", "7001");
      }
    },

    seleccionarCliente: function () {

      this.COD_CLIENTE = this.clienteActivo.COD_CLIENTE;
      this.NOM_CLIENTE = this.clienteActivo.NOM_CLIENTE;
      this.NUM_IDENTIFICACION = this.clienteActivo.NUM_IDENTIFICACION;
    },

    agregarMovimiento: function () {

      var header = '';
      header = headerPaginacion("7004", 'I', '123', 'kate', '1', '10', 'COD_CLIENTE');

      var filas = '';

      filas = addColumna(filas, 'NUM_MOVIMIENTO', this.NUM_MOV, 0);
      filas = addColumna(filas, 'COD_CLIENTE', this.COD_CLIENTE, 0);
      filas = addColumna(filas, 'COD_MENSAJERO', this.listaMovimientos.COD_MENSAJERO.id, 0);
      filas = addColumna(filas, 'FEC_DOCUMENTO', this.listaMovimientos.FEC_DOCUMENTO, 0);
      filas = addColumna(filas, 'DES_OBSERVACIONES', this.listaMovimientos.DES_OBSERVACIONES, 0);
      filas = addColumna(filas, 'MTO_COBRAR', this.listaMovimientos.MTO_COBRAR, 0);
      filas = addColumna(filas, 'TIP_MOVIMIENTO', this.listaMovimientos.TIP_MOVIMIENTO.id, 0);
      filas = addColumna(filas, 'TIP_COBRO', this.listaMovimientos.TIP_COBRO.id, 0);
      filas = addColumna(filas, 'COD_COMPANIA', '01', 0);

      var parametros = '<ParamItem/>';

      var pet = getPeticion(header, parametros, filas);
      //console.log("this", pet);
      this.exeDsoa(pet, "I", "1235666", "N", "N", "7004");
    },

    limpiarForm: function () {
      if (this.valorBuscar == "") { this.valorCedula = ""; }
      else { this.valorBuscar = "" }

      this.COD_CLIENTE = "";
      this.NUM_IDENTIFICACION = "";
      this.NOM_CLIENTE = "";
    },

    disableButton: function (event) {

      event.target.disabled = true;

      this.agregarMovimiento();

    }

  }
});
