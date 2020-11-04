var peticion = {
  datos: "",
  dml: "",
  formato: "",
  formatoRequest: "",
  credencial: "",
  deserror: "",
  codigoerror: "",
  datosJson: "",
};

var vp = new Vue({
  el: "#appPago",
  store: store,

  created: function () {
    if (this.getParameterByName("dist") != null) {
      this.NUM_COBRO = this.getParameterByName("dist");
      //this.buscarPorCodigo(NUM_COBRO);
    }

    if (this.getParameterByName("tds") != null) {
      var COD_CLIENTE = this.getParameterByName("tds");

      this.buscarClientes(COD_CLIENTE);
    }
  },

  data: {
    a: 1,

    COD_CLIENTE: "",
    NUM_COBRO: "",
    NOM_CLIENTE: "",
    NUM_IDENTIFICACION: "",
    IND_FACTURA: "",

    SaldoPendiente: "Sin Datos",

    peticion: [],
    camposCobro: [],
    camposDet: [],
    camposCliente: [],
    camposSaldo: [],

    MTO_TOTAL: 0,
    MTO_PEN: 0,
    totalCobro: 0,
    numPag: 0,
  },

  methods: {
    exeDsoa: function (
      datos,
      dml,
      credencial,
      formatoenvio,
      formatorecibe,
      tabla
    ) {
      this.peticion.datos = "";

      var pedido = {
        datos: datos,
        dml: dml,
        formato: formatoenvio,
        credencial: credencial,
        formatoRequest: formatorecibe,
      };

      var respuesta = [];
      var url = store.state.urlDsoa;

      axios({
        method: "POST",
        url,
        headers: {
          "content-type": "application/json",
          "cache-control": "no-cache",
          "postman-token": "9be30243-8f01-3820-f64e-d09144a7706d",
          processData: false,
        },
        sync: true,
        crossDomain: true,
        data: pedido,
      })
        .then((response) => {
          this.peticion = response.data;

          if (this.peticion.codigoerror.lenght == 0) {
            swal({
              title: "Alerta!",
              text: "Error no identificado",
              type: "warning",
              confirmButtonText: "OK",
            });
          } else {
            if (Math.abs(this.peticion.codigoerror) != "0") {
              swal({
                title: "Alerta!",
                text: this.peticion.deserror,
                type: "warning",
                confirmButtonText: "OK",
              });
            } else {
              switch (tabla) {
                case "7001":
                  this.camposCliente = JSON.parse(this.peticion.datos);

                  if (this.camposCliente.registros == 0) {
                    swal({
                      title: "Alerta!",
                      text: "No se encontraron registros",
                      showConfirmButton: true,
                    });
                  } else {
                    this.camposCliente = this.camposCliente.rows;

                    this.COD_CLIENTE = this.camposCliente[0].COD_CLIENTE;
                    this.NUM_IDENTIFICACION = this.camposCliente[0].NUM_IDENTIFICACION;
                    this.NOM_CLIENTE = this.camposCliente[0].NOM_CLIENTE;

                    vt.user = this.NOM_CLIENTE;

                    this.obtenerSaldo(this.COD_CLIENTE);
                    this.buscarCobros(this.NUM_COBRO, this.COD_CLIENTE);
                  }
                  break;

                case "7005":
                  this.dtClr1();
                  this.camposCobro = JSON.parse(this.peticion.datos);
                  this.camposCobro = this.camposCobro.rows;

				  this.IND_FACTURA = this.camposCobro[0].IND_FACTURA;
                  this.MTO_TOTAL = this.camposCobro[0].MTO_TOTAL;
                  this.MTO_PEN = this.camposCobro[0].MTO_SALDO;

                  this.buscarDetalleCobro(this.NUM_COBRO);

                  this.dtIni1();
                  break;

                case "7006":
                  this.dtClr2();

                  this.camposDet = JSON.parse(this.peticion.datos);
                  this.numPag = parseInt(this.camposDet.total);
                  console.log("o", this.camposDet);
                  this.camposDet = this.camposDet.rows;

                  var sum = 0;
                  _.forEach(this.camposDet, function (mon) {
                    sum += Number(mon.MTO_TOTAL);
                  });

                  this.totalCobro = sum;

                  this.dtIni2();
                  break;

                case "7010":
                  this.dtClr2();

                  this.camposDet = JSON.parse(this.peticion.datos);
                  this.numPag = parseInt(this.camposDet.total);

                  this.camposDet = this.camposDet.rows;

                  this.dtIni2();

                  break;

                case "7011":
                  if (this.peticion.codigoerror == 0) {
                    this.camposSaldo = this.peticion.datos;
                    this.camposSaldo = parser.parse(this.camposSaldo);

                    if (this.camposSaldo.Response.PN_MTO_DEUDA != "") {
                      this.SaldoPendiente = this.camposSaldo.Response.PN_MTO_DEUDA;
                    } else {
                      this.SaldoPendiente = 0;
                    }
                  } else {
                    swal({
                      title: "Alerta!",
                      text: this.peticion.deserror,
                      showConfirmButton: true,
                    });
                  }
                  break;

                case "7013":
                  if (this.peticion.codigoerror == 0) {
                    var datosPet = this.peticion.datos;

                    console.log("datosPet", datosPet);

                    swal({
                      title: "Exito!",
                      text: "Factura generada correctamente",
                      showConfirmButton: true,
                    });
                  } else {
                    swal({
                      title: "Alerta!",
                      text: this.peticion.deserror,
                      showConfirmButton: true,
                    });
                  }
                  break;

                case "151":
                  if (this.peticion.codigoerror == 0) {
                    this.camposGen = this.peticion.datos;
                    this.camposGen = parser.parse(this.camposGen);
                    this.NUMFACT = this.camposGen.Response.PV_RETORNO;
                    console.log("NUMFACT", this.NUMFACT);
                  }
                  break;
                default:
                // code block
              }

              if (
                this.camposDet.registros == "0" ||
                this.camposCliente.registros == "0"
              ) {
                swal({
                  title: "Alerta!",
                  text: "No se encontraron registros",
                  timer: 3000,
                  showConfirmButton: true,
                });
              }
            }
          }
        })

        .catch(function (error) {
          console.log("SE PRODUJO ERROR " + error);
        });

      return this.respuesta;
    },

    buscarClientes: function (codCliente) {
      var header = "";
      header = headerPaginacion(
        "7001",
        "JJ",
        "123",
        "kate",
        "1",
        "10",
        "COD_CLIENTE"
      );

      var filas = "";
      filas = addColumna(filas, "COD_COMPANIA", "", 0);
      filas = addColumna(filas, "NUM_IDENTIFICACION", "", 0);
      filas = addColumna(filas, "COD_CLIENTE", "", 0);
      filas = addColumna(filas, "NOM_CLIENTE", "", 0);

      var parametros = "";
      if (codCliente == "" || codCliente == undefined) {
        swal({
          title: "Alerta!",
          text: "El valor para buscar no puede estar vacio.",
          type: "warning",
          confirmButtonText: "OK",
        });
      } else {
        //debe ir el nombre columna en base de datos
        parametros = addParametro(
          parametros,
          "COD_CLIENTE",
          codCliente,
          "",
          "LIKE",
          0
        );

        var pet = getPeticion(header, parametros, filas);

        this.exeDsoa(pet, "JJ", "1235666", "N", "N", "7001");
      }
    },

    obtenerSaldo: function (codCliente) {
      var header = "";
      header = headerPeticion("7011", "E", "123", "kate", "", "");

      var filas = "";
      filas = addColumna(filas, "PN_MTO_DEUDA", "", 0);
      filas = addColumna(filas, "PN_COD_ERROR", "", 0);
      filas = addColumna(filas, "PV_MSG_ERROR", "", 0);

      var parametros = "";
      parametros = addParametro(
        parametros,
        "PN_COD_CLIENTE",
        codCliente,
        "",
        "=",
        0
      );
      parametros = addParametro(
        parametros,
        "PV_COD_COMPANIA",
        "01",
        "",
        "=",
        0
      );

      var pet = getPeticion(header, parametros, filas);

      this.exeDsoa(pet, "E", "1235666", "N", "N", "7011");
    },

    getParameterByName: function (name, url) {
      if (!url) url = window.location.href;
      name = name.replace(/[\[\]]/g, "\\$&");
      var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return "";
      return decodeURIComponent(results[2].replace(/\+/g, " "));
    },

    generarFactura: function () {
      var header = "";
      header = headerPeticion("7013", "E", "123", "kate", "", "");

      var filas = "";
      filas = addColumna(filas, "GN_COD_ERROR", "", 0);
      filas = addColumna(filas, "GV_MSG_ERROR", "", 0);

      var parametros = '';
      parametros = addParametro(parametros, 'GV_NUM_COBRO', this.NUM_COBRO, '', '=', 0);
      parametros = addParametro(parametros, 'GV_COD_COMPANIA', '01', '', '=', 0);

      var pet = getPeticion(header, parametros, filas);

      console.log("genfactura", this.NUM_COBRO);
      console.log("pet", pet);

      this.exeDsoa(pet, "E", "1235666", "N", "N", "7013");
    },

    buscarCobros: function (numCobro, codCliente) {
      var header = "";
      header = headerPaginacion(
        "7005",
        "JJ",
        "123",
        "kate",
        "1",
        "10",
        "FEC_COBRO"
      );

      var filas = "";
      filas = addColumna(filas, "MTO_IMPUESTO", "", 0);
      filas = addColumna(filas, "NUM_COBRO", "", 0);
      filas = addColumna(filas, "COD_CLIENTE", "", 0);
      filas = addColumna(filas, "FEC_COBRO", "", 0);
      filas = addColumna(filas, "MTO_TOTAL", "", 0);
      filas = addColumna(filas, "MTO_SUBTOTAL", "", 0);
      filas = addColumna(filas, "MTO_PAGADO", "", 0);
      filas = addColumna(filas, "MTO_SALDO", "", 0);
      filas = addColumna(filas, "IND_ESTADO", "", 0);
      filas = addColumna(filas, "TIP_COBRO", "", 0);
      filas = addColumna(filas, "IND_FACTURA", "", 0);
      filas = addColumna(
        filas,
        "ENC_K_UTILITY.GETESTADO(TIP_COBRO) AS NOMBRE_TIPO",
        "",
        0
      );
      filas = addColumna(
        filas,
        "ENC_K_UTILITY.GETESTADO(IND_ESTADO) AS NOMBRE_ESTADO",
        "",
        0
      );
      filas = addColumna(filas, "COD_COMPANIA", "01", 0);

      var parametros = "";
      parametros = addParametro(
        parametros,
        "COD_CLIENTE",
        codCliente,
        "",
        "=",
        0
      );
      parametros = addParametro(parametros, "NUM_COBRO", numCobro, "", "=", 0);

      var pet = getPeticion(header, parametros, filas);

      this.exeDsoa(pet, "JJ", "1235666", "N", "N", "7005");
    },

    buscarDetalleCobro: function (numCobro) {
      var header = "";
      header = headerPaginacion(
        "7006",
        "JJ",
        "123",
        "kate",
        "1",
        "50",
        "NUM_MOVIMIENTO"
      );
      var filas = "";
      filas = addColumna(filas, "NUM_COBRO", "", 0);
      filas = addColumna(filas, "NUM_MOVIMIENTO", "", 0);
      filas = addColumna(filas, "DES_ARTICULO", "", 0);
      filas = addColumna(filas, "MTO_SUBTOTAL", "", 0);
      filas = addColumna(filas, "MTO_IMPUESTO", "", 0);
      filas = addColumna(filas, "POR_IMPUESTO", "", 0);
      filas = addColumna(filas, "MTO_TOTAL", "", 0);
      filas = addColumna(filas, "FEC_CREACION", "", 0);
      filas = addColumna(filas, "COD_COMPANIA", "01", 0);

      var parametros = "";
      parametros = addParametro(parametros, "NUM_COBRO", numCobro, "", "=", 0);
      //agregar ind de estado

      var pet = getPeticion(header, parametros, filas);

      this.exeDsoa(pet, "JJ", "1235666", "N", "N", "7006");
    },

    paginacion: function (p) {
      var pagina = p.target.value;

      var header = "";
      header = headerPaginacion(
        "7004",
        "P",
        "123",
        "kate",
        pagina,
        "200",
        "NUM_MOVIMIENTO"
      );

      var filas = "<Filas/>";
      var parametros = "<ParamItem/>";

      var pet = getPeticion(header, parametros, filas);

      this.exeDsoa(pet, "P", "1235666", "N", "N", "7010");
    },

    dtIni1: function () {
      window.setTimeout(function () {
        table = $("#dt").DataTable({
          retrieve: true,
          responsive: true,
          paging: false,
          info: false,
          searching: false,
        });
      }, 1000);
    },

    dtClr1: function () {
      $("#dt").DataTable().destroy();
    },

    dtIni2: function () {
      window.setTimeout(function () {
        table = $("#dti").DataTable({
          retrieve: true,
          responsive: true,
          paging: false,
          info: false,
          searching: false,
          dom: "Bfrtip",
          buttons: [
            { extend: "excelHtml5", footer: true },
            { extend: "pdfHtml5", orientation: "landscape", footer: true },
            {
              extend: "print",
              text: "Imprimir",
              footer: true,
              customize: function (win) {
                $(win.document.body)
                  .find("table")
                  .addClass("display")
                  .css("font-size", "16px");
                $(win.document.body)
                  .find("tr:nth-child(odd) td")
                  .each(function (index) {
                    $(this).css("background-color", "#D0D0D0");
                  });
                $(win.document.body).find("h1").css("text-align", "center");
              },
            },
          ],
        });
      }, 1000);
    },

    dtClr2: function () {
      $("#dti").DataTable().destroy();
    },
  },
});

var vt = new Vue({
  el: "#appTitle",
  store: store,

  data: {
    a: 1,
    user: "",
  },
});
