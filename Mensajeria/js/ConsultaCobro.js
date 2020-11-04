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
moment.locale('es-us');

var vm = new Vue({
   el: '#appMov',
   store: store,

   created: function () {
      this.inicioGrid();
   },

   data: {
      peticion: [],
      campos: [],
      camposMensajero: [],
      user: "Ademar",
      gridBuscar: [
         { campo: "Contado", id: "CO" },
         { campo: "Credito", id: "CR" },
         { campo: "Todos", id: "A" }
      ],
      gridEstado: [
         { campo: "Registrado", id: "R" },
         { campo: "Abonado", id: "A" },
         { campo: "Pagado", id: "P" },
         { campo: "Todos", id: "T" }
      ],
      registrosPagina: ['5', '10', '20', '50', '100'],
      reg: "",
      totalCobro: 0,
      totalSaldo: 0,
      selected: "",
      selectEstado: "",
      valorBuscar: "",
      pag: "",
      dml: "JJ",
      i: 0,
      numPag: 0,
      codCliente: 0,

      notas: "",
      clienteActivo: '',
      camposCliente: [],

      fechaInicio: moment().subtract(15, 'days').format('YYYY-MM-DD'),
      fechaFin: moment().format('YYYY-MM-DD'),
   },

   watch: {
      // cuando 'question' cambie, se ejecutará esta función
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

      inicioGrid: function () {
         var header = '';
         header = headerPaginacion("7005", 'JJ', '123', 'kate', '1', '200', 'FEC_COBRO');

         var filas = '';
         filas = addColumna(filas, 'ROWID', '', 0);
         filas = addColumna(filas, 'NUM_COBRO', '', 0);
         filas = addColumna(filas, 'COD_CLIENTE', '', 0);
         filas = addColumna(filas, 'ENC_K_UTILITY.GETCLIENTE(COD_COMPANIA,COD_CLIENTE) AS NOM_CLIENTE', '', 0);
         filas = addColumna(filas, "FEC_COBRO", '', 0);
         filas = addColumna(filas, 'MTO_TOTAL', '', 0);
         filas = addColumna(filas, 'MTO_PAGADO', '', 0);
         filas = addColumna(filas, 'MTO_SALDO', '', 0);
         filas = addColumna(filas, 'IND_ESTADO', '', 0);
         filas = addColumna(filas, 'TIP_COBRO', '', 0);
         filas = addColumna(filas, 'ENC_K_UTILITY.GETESTADO(TIP_COBRO) AS NOMBRE_TIPO', '', 0);
         filas = addColumna(filas, 'ENC_K_UTILITY.GETESTADO(IND_ESTADO) AS NOMBRE_ESTADO', '', 0);
         filas = addColumna(filas, 'COD_COMPANIA', '01', 0);

         var parametros = '';
         parametros = addParametro(parametros, 'IND_ESTADO', "'R','A'", '', 'IN', 0);
         parametros = addParametro(parametros, 'FEC_COBRO', this.fechaInicio, 'YYYY-MM-DD', 'MAYORIGUAL', 0);
         var nuevaFecha = moment(this.fechaFin).add(1, 'days').format('YYYY-MM-DD');
         parametros = addParametro(parametros, 'FEC_COBRO', nuevaFecha, 'YYYY-MM-DD', 'MENORIGUAL', 0);

         var pet = getPeticion(header, parametros, filas);

         this.exeDsoa(pet, "JJ", "1235666", "N", "N", "7005");
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

                     swal({ title: 'Alerta2!', text: this.peticion.deserror, type: 'warning', confirmButtonText: 'OK' })

                  } else {

                     switch (tabla) {
                        case "7001":

                           this.camposCliente = JSON.parse(this.peticion.datos);
                           this.camposCliente = this.camposCliente.rows;

                           this.codCliente = this.camposCliente[0].COD_CLIENTE;

                           this.clienteActivo.NOM_CLIENTE = this.camposCliente[0].NOM_CLIENTE;
                           this.clienteActivo.COD_CLIENTE = this.camposCliente[0].COD_CLIENTE;

                           this.buscarCobro('200');

                           break;

                        case "7002":
                           this.camposMensajero = JSON.parse(this.peticion.datos);
                           this.camposMensajero = this.camposMensajero.rows;
                           break;

                        case "7005":
                           this.dtClr();

                           this.campos = JSON.parse(this.peticion.datos);
                           this.numPag = parseInt(this.campos.total);
                           this.campos = this.campos.rows;

                           var sum = 0;
                           var saldo = 0;
                           _.forEach(this.campos, function (mon) {
                              sum += Number(mon.MTO_TOTAL);
                              saldo += Number(mon.MTO_SALDO);
                           });
                           this.totalCobro = sum;
                           this.totalSaldo = saldo;

                           this.dtIni();
                           break;

                        default:
                        // code block
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

      buscarCobro: function (reg) {

         var header = '';
         header = headerPaginacion("7005", 'JJ', '123', 'kate', '1', reg, 'FEC_COBRO');

         var filas = '';
         filas = addColumna(filas, 'ROWID', '', 0);
         filas = addColumna(filas, 'NUM_COBRO', '', 0);
         filas = addColumna(filas, 'COD_CLIENTE', '', 0);
         filas = addColumna(filas, 'ENC_K_UTILITY.GETCLIENTE(COD_COMPANIA,COD_CLIENTE) AS NOM_CLIENTE', '', 0);
         filas = addColumna(filas, "FEC_COBRO", '', 0);
         filas = addColumna(filas, 'MTO_TOTAL', '', 0);
         filas = addColumna(filas, 'MTO_PAGADO', '', 0);
         filas = addColumna(filas, 'MTO_SALDO', '', 0);
         filas = addColumna(filas, 'IND_ESTADO', '', 0);
         filas = addColumna(filas, 'TIP_COBRO', '', 0);
         filas = addColumna(filas, 'ENC_K_UTILITY.GETESTADO(TIP_COBRO) AS NOMBRE_TIPO', '', 0);
         filas = addColumna(filas, 'ENC_K_UTILITY.GETESTADO(IND_ESTADO) AS NOMBRE_ESTADO', '', 0);
         filas = addColumna(filas, 'COD_COMPANIA', '01', 0);

         var parametros = '';

         if (this.selected == "Credito") {

            //debe ir el nombre columna en base de datos
            parametros = addParametro(parametros, 'TIP_COBRO', "CR", '', '=', 0);


         } else if (this.selected == "Contado") {

            parametros = addParametro(parametros, 'TIP_COBRO', "CO", '', '=', 0);

         }

         if (this.selectEstado.id != 'T' && this.selectEstado.id != undefined) {
            parametros = addParametro(parametros, 'IND_ESTADO', this.selectEstado.id, '', '=', 0);
         }

         parametros = addParametro(parametros, 'FEC_COBRO', this.fechaInicio, 'YYYY-MM-DD', 'MAYORIGUAL', 0);

         parametros = addParametro(parametros, 'FEC_COBRO', this.fechaFin, 'YYYY-MM-DD', 'MENORIGUAL', 0);

         if (this.codCliente > 0) {
            parametros = addParametro(parametros, 'COD_CLIENTE', this.codCliente, '', '=', 0);
         }

         var pet = getPeticion(header, parametros, filas);

console.log("p",pet);

         this.exeDsoa(pet, "JJ", "1235666", "N", "N", "7005");
      },

      paginacion: function (p) {

         var pagina = p.target.value;

         var header = '';
         header = headerPaginacion("7005", 'P', '123', 'kate', pagina, '200', 'NUM_MOVIMIENTO');

         var filas = '<Filas/>';

         var parametros = '<ParamItem/>';

         var pet = getPeticion(header, parametros, filas);

         this.exeDsoa(pet, "P", "1235666", "N", "N", "7005");
      },

      buscarClientes: function () {

         var header = '';
         header = headerPaginacion("7001", 'JJ', '123', 'kate', '1', '200', 'COD_CLIENTE');

         var filas = '';
         filas = addColumna(filas, 'COD_CLIENTE', '', 0);
         filas = addColumna(filas, 'NOM_CLIENTE', '', 0);
         filas = addColumna(filas, 'NUM_IDENTIFICACION', '', 0);

         var parametros = '';

         if (this.valorBuscar == "") {

            swal({ title: 'Alerta!', text: "El valor para buscar no puede estar vacio.", type: 'warning', confirmButtonText: 'OK' })

         } else {

            if (this.valorBuscar != "") {

               //debe ir el nombre columna en base de datos
               parametros = addParametro(parametros, 'NOM_CLIENTE', this.valorBuscar, '', 'LIKE', 0);

            }
            var pet = getPeticion(header, parametros, filas);

            this.exeDsoa(pet, "JJ", "1235666", "N", "N", "7001");
         }
      },

      verDetalle: function (item) {
         
         window.location.href = 'ListaCobroPago.html?dist='+ encodeURIComponent(item.NUM_COBRO) 
         +'&tds=' + encodeURIComponent(item.COD_CLIENTE);
      },

      seleccionarCliente : function(){
         
         this.codCliente = this.clienteActivo.COD_CLIENTE;

         console.log("cc", this.codCliente);

         this.buscarCobro('200');
      },

      dtIni: function () {
         window.setTimeout(function () {
            table = $('#dt').DataTable({
               retrieve: true,
               responsive: true,
               paging: false,
               info: false,
               searching: false,
               dom: 'Bfrtip',
               buttons: [
                  { extend: 'excelHtml5', footer: true },
                  { extend: 'pdfHtml5', orientation: 'landscape', footer: true },
                  {
                     extend: 'print', text: 'Imprimir', footer: true,
                     customize: function (win) {
                        $(win.document.body).find('table').addClass('display').css('font-size', '16px');
                        $(win.document.body).find('tr:nth-child(odd) td').each(function (index) {
                           $(this).css('background-color', '#D0D0D0');
                        });
                        $(win.document.body).find('h1').css('text-align', 'center');
                     }
                  }
               ],

            });
         }, 1000);
      },

      dtClr: function () {
         $('#dt').DataTable().destroy();
      },

      dtLim: function () {
         window.location.href = "ListaCobros.html";
      }

   }
});