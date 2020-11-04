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

    created: function() {
		  this.focused = true;

        this.inicioGrid();
    },

    data: {
        peticion: [],
        campos: [],
        user: "Ademar",
        
		 
        //Busqueda
        gridDestino: [
            { campo: "SANJOSE", id: "SANJOSE" },
		    { campo: "GUANACASTE", id:"GUANACASTE"},
			{ campo: "PITAL",id:"PITAL"},
			{ campo: "Heredia",id:"Heredia"},
			{ campo: "LIMON",id:"LIMON"},
			{ campo: "Puriscal", id: "PURISCAL" },
			{ campo: "Buenos aires puntarenas", id: "Buenos aires puntarenas" }
			
        ],
        selectDestino: "",
        gridEmpacador: [],
        selectEmpacador: "",
        gridRegistros: ['5', '10', '20', '50', '100','200','500','600'],
        selectRegistros: "",
        fechaEntrega: "",
        fechaSalida: "",

        //paginacion
        pag: "",
        numPag: 0,

        //watch
        valorBuscar: "",
        notas: "",

        //revisar
        clienteActivo: "",
        camposCliente: []

    },

    watch: {
        // cuando 'valorBuscar' cambie, se ejecutará esta función
        valorBuscar: function(nuevoValor) {
            this.notas = 'Ingrese el valor a buscar...'
            this.getBusquedaCodigo()
        },
    },

    methods: {

        getBusquedaCodigo: _.debounce(
            function() {

                if (this.valorBuscar == "") {
                    this.notas = ''
                    this.inicioGrid();
                    return
                }

                if (_.size(this.valorBuscar) < 5) {
                    this.notas = 'Ingrese más valores'
                    return
                }

                this.buscarInventario(5);
            },
            // Este es el número de milisegundos que esperamos a que el usuario termine de tipear.
            500
        ),

        inicioGrid: function() {
            var header = '';
            header = headerPaginacion("7014", 'JJ', '123', 'kate', '1', '50', 'COD_BARRA');

            var filas = '';
            filas = addColumna(filas, 'ROWID', '', 0);
            filas = addColumna(filas, 'COD_BARRA', '', 0);
            filas = addColumna(filas, 'DESTINO', '', 0);
            filas = addColumna(filas, "EMPACADOR", '', 0);
            filas = addColumna(filas, 'DIA_SALIDA', '', 0);
            filas = addColumna(filas, 'DIA_ENTREGA', '', 0);
            filas = addColumna(filas, 'CANTIDAD', '', 0);
			filas = addColumna(filas, 'TIPO', '', 0);
            filas = addColumna(filas, 'RECIBIDO', '', 0);
            filas = addColumna(filas, 'COMENTARIO', '', 0);

            var parametros = '<ParamItem/>';

            var pet = getPeticion(header, parametros, filas);

            this.exeDsoa(pet, "JJ", "1235666", "N", "N", "7014");
        },

        exeDsoa: function(datos, dml, credencial, formatoenvio, formatorecibe, tabla) {

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

                                case "7001":

                                    if (this.peticion.dml == "D") {
                                        this.inicioGrid();
                                        swal({ type: 'success', title: "", text: "El registro fue borrado correctamente", showConfirmButton: true });
                                    }

                                    break;

                                case "7014":

                                    this.campos = JSON.parse(this.peticion.datos);

                                    if (this.campos.registros != 0) {
                                        this.dtClr();
                                        this.numPag = parseInt(this.campos.total);
                                        this.campos = this.campos.rows;

                                        this.dtIni();
                                    } else {

                                        swal({ title: 'Alerta!', text: 'No se encontraron registros', type: 'warning', confirmButtonText: 'OK' })
                                    }
                                    break;

                                default:
                                    // code block
                            }

                            if (this.campos.registros == "0") {
                                this.valorBuscar = ""
                                swal({ title: "Alerta!", text: "No se encontraron registros", timer: 3000, showConfirmButton: true });

                            }
                        }
                    }
                    this.$refs.valorBuscar.focus();

                })

            .catch(function(error) {
                console.log("SE PRODUJO ERROR " + error);
            });

        },

        buscarInventario: function(selectRegistros) {

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
			filas = addColumna(filas, 'TIPO', '', 0);
            filas = addColumna(filas, 'RECIBIDO', '', 0);
            filas = addColumna(filas, 'COMENTARIO', '', 0);
			
			
			

            var parametros = '';

            var destino = '';
            if (this.selectDestino != "")
                parametros = addParametro(parametros, 'DESTINO', this.selectDestino, '', '=', 0);
			

            parametros = addParametro(parametros, 'EMPACADOR', this.selectEmpacador, '', '=', 0);

            if (this.valorBuscar != "") {
                //alert("buscando"+this.valorBuscar);
                parametros = addParametro(parametros, 'COD_BARRA', this.valorBuscar, '', '=', 0);
            }


            parametros = addParametro(parametros, 'DIA_ENTREGA', this.fechaEntrega, 'YYYY-MM-DD', 'IGUAL', 0);

            parametros = addParametro(parametros, 'DIA_SALIDA', this.fechaSalida, 'YYYY-MM-DD', 'IGUAL', 0);

            var pet = getPeticion(header, parametros, filas);

            this.exeDsoa(pet, "JJ", "1235666", "N", "N", "7014");
        },


        borrarCliente: function(item) {

            var header = '';
            header = headerPaginacion("7014", 'D', '123', 'kate', '1', '10', 'COD_CLIENTE');

            var filas = '';
            filas = addColumna(filas, 'COD_BARRA', item.COD_BARRA, 0);

            var parametros = '<ParamItem/>';

            var pet = getPeticion(header, parametros, filas);

          
            this.exeDsoa(pet, "D", "1235666", "N", "N", "7001");

        },
        
		paginacion: function(p) {

            var pagina = p.target.value;

            var header = '';
            header = headerPaginacion("7014", 'P', '123', 'kate', pagina, '10', 'COD_BARRA');

            var filas = '<Filas/>';
            var parametros = '<ParamItem/>';

            var pet = getPeticion(header, parametros, filas);

            this.exeDsoa(pet, "P", "1235666", "N", "N", "7014");
        },

        verDetalle: function(item) {

            window.location.href = 'AgregarInventarioEnvios.html?dist=' + encodeURIComponent(item.COD_BARRA);
            // +'&tds=' + encodeURIComponent(item.COD_CLIENTE);
        },

        dtIni: function() {
            window.setTimeout(function() {
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
                            extend: 'print',
                            text: 'Imprimir',
                            footer: true,
                            customize: function(win) {
                                $(win.document.body).find('table').addClass('display').css('font-size', '16px');
                                $(win.document.body).find('tr:nth-child(odd) td').each(function(index) {
                                    $(this).css('background-color', '#D0D0D0');
                                });
                                $(win.document.body).find('h1').css('text-align', 'center');
                            }
                        }
                    ],

                });
            }, 1000);
        },

        dtClr: function() {
            $('#dt').DataTable().destroy();
        },

        dtLim: function() {
            window.location.href = "ListaInventarioEnvios.html";
        }

    }
});