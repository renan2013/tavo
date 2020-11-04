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
      user: "Ademar",

      //Busqueda
      gridDestino: [
         { campo: "Puriscal", id: "PURISCAL" },
         { campo: "San José", id: "SAN JOSE" },
         { campo: "Todos", id: "A" }
      ],
      selectDestino: "",
      gridEmpacador: [],
      selectEmpacador: "",
      gridRegistros: ['5', '10', '20', '50', '100'],
      selectRegistros: "",
      fechaEntrega: moment().format('YYYY-MM-DD'),
      fechaSalida: moment().format('YYYY-MM-DD'),

      //paginacion
      pag: "",
      numPag: 0,

      //watch
      valorBuscar: "",
      notas: "",

      //revisar
      clienteActivo :"",
      camposCliente :[]

   },

   watch: {
      // cuando 'question' cambie, se ejecutará esta función
      valorBuscar: function (nuevoValor) {
         this.notas = 'Digite el valor a buscar...'
         //this.getBusquedaNombre()
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
         header = headerPaginacion("7014", 'JJ', '123', 'kate', '1', '200', 'COD_BARRA');

         var filas = '';
         filas = addColumna(filas, 'ROWID', '', 0);
         filas = addColumna(filas, 'COD_BARRA', '', 0);
         filas = addColumna(filas, 'DESTINO', '', 0);
         filas = addColumna(filas, "EMPACADOR", '', 0);
         filas = addColumna(filas, 'DIA_SALIDA', '', 0);
         filas = addColumna(filas, 'DIA_ENTREGA', '', 0);
         filas = addColumna(filas, 'CANTIDAD', '', 0);
         filas = addColumna(filas, 'RECIBIDO', '', 0);
         filas = addColumna(filas, 'COMENTARIO', '', 0);

         var parametros = '<ParamItem/>';

         var pet = getPeticion(header, parametros, filas);

         this.exeDsoa(pet, "JJ", "1235666", "N", "N", "7014");
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
                     this.dtIni();
                     swal({ title: 'Alerta!', text: this.peticion.deserror, type: 'warning', confirmButtonText: 'OK' })

                  } else {

                     switch (tabla) {

                        case "7014":

                           this.dtClr();

                           this.campos = JSON.parse(this.peticion.datos);
                           this.numPag = parseInt(this.campos.total);
                           this.campos = this.campos.rows;

                           console.log("this.campos", this.campos);

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

      buscarInventario: function (selectRegistros) {

         var header = '';
         header = headerPaginacion("7014", 'JJ', '123', 'kate', '1', selectRegistros, 'COD_BARRA');

         var filas = '';
         filas = addColumna(filas, 'ROWID', '', 0);
         filas = addColumna(filas, 'COD_BARRA', '', 0);
         filas = addColumna(filas, 'DESTINO', '', 0);
         filas = addColumna(filas, "EMPACADOR", '', 0);
         filas = addColumna(filas, 'DIA_SALIDA', '', 0);
         filas = addColumna(filas, 'DIA_ENTREGA', '', 0);
         filas = addColumna(filas, 'CANTIDAD', '', 0);
         filas = addColumna(filas, 'RECIBIDO', '', 0);
         filas = addColumna(filas, 'COMENTARIO', '', 0);

         var parametros = '';

         var destino = '';
         (this.selectDestino == "PURISCAL") ? destino=this.selectDestino : destino="SAN JOSE";

         parametros = addParametro(parametros, 'DESTINO', destino, '', '=', 0);

         parametros = addParametro(parametros, 'EMPACADOR', this.selectEmpacador, '', '=', 0);


         //consultar fechas si son rango o individual
         parametros = addParametro(parametros, 'DIA_ENTREGA', this.fechaEntrega, 'YYYY-MM-DD', 'MAYORIGUAL', 0);

         parametros = addParametro(parametros, 'DIA_SALIDA', this.fechaSalida, 'YYYY-MM-DD', 'MENORIGUAL', 0);

         var pet = getPeticion(header, parametros, filas);

         console.log("busqueda", pet);

         //this.exeDsoa(pet, "JJ", "1235666", "N", "N", "7014");
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

      verDetalle: function (item) {

         window.location.href = 'AgregarInventarioEnvios.html?dist=' + encodeURIComponent(item.COD_BARRA);
         // +'&tds=' + encodeURIComponent(item.COD_CLIENTE);
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
         window.location.href = "ListaInventarioEnvios.html";
      }

   }
});