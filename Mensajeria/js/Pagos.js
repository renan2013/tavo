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


var vp = new Vue({
    el: '#appPago',
    store: store,

    created: function () {
        // this.inicioGrid();
    },

    data: {
        a: 1,
        user: "KATE",
        COD_CLIENTE: "",
        NOM_CLIENTE: "",
        NUM_IDENTIFICACION: "",
        peticion: [],
        camposCobro: [],
        camposDet: [],
        camposCliente: [],
        campos: [],
        camposSaldo: [],
        pag: "",
        SaldoPendiente: "Sin Datos",

        MTO_PAGO: 0,
        camposPago: [],
        MTO_TOTAL: 0,
        MTO_PEN: 0,
        TIPO_PAGO: "PR",
        listaPago: {
            COD_CLIENTE: "",
        },

        //
        checkedCategories: [],

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
        numPagMov: 0,
        numPagCobro: 0
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

                                        this.COD_CLIENTE = this.camposCliente[0].COD_CLIENTE;
                                        this.NUM_IDENTIFICACION = this.camposCliente[0].NUM_IDENTIFICACION;
                                        this.NOM_CLIENTE = this.camposCliente[0].NOM_CLIENTE;
                                        this.buscarCobros(this.COD_CLIENTE);
                                        this.obtenerSaldo(this.COD_CLIENTE);
                                    }
                                    break;

                                case "7005":
                                    this.dtClr();
                                    this.camposCobro = JSON.parse(this.peticion.datos);
                                    this.numPagCobro = parseInt(this.camposCobro.total);
                                    this.camposCobro = this.camposCobro.rows;
                                    this.dtIni();
                                    break;

                                case "7006":
                                    this.dtClr();
                                    this.camposDet = JSON.parse(this.peticion.datos);
                                    this.numPagMov = parseInt(this.camposDet.total);
                                    this.camposDet = this.camposDet.rows;
                                    this.dtIni();
                                    break;

                                case "7007":

                                    if (this.peticion.dml == "I" && this.peticion.datos == "0" && this.peticion.codigoerror == "0") {
                                        //console.log("7007", this.peticion);
                                        swal({ type: 'success', title: "", text: "Pago Realizado", timer: 4000, showConfirmButton: true });

                                        window.setTimeout(function () {
                                            window.location.href = "AgregarPago.html";
                                        }, 1000);
                                    }

                                    if (this.peticion.dml == "JJ") {

                                        this.campos = JSON.parse(this.peticion.datos);
                                    }
                                    break;

                                case "7011":

                                    if (this.peticion.codigoerror == 0) {

                                        this.camposSaldo = this.peticion.datos;
                                        this.camposSaldo = parser.parse(this.camposSaldo);

                                        if (this.camposSaldo.Response.PN_MTO_DEUDA != "") {

                                            this.SaldoPendiente = this.camposSaldo.Response.PN_MTO_DEUDA;
                                            console.log("SaldoPendiente", this.SaldoPendiente);

                                        } else { this.SaldoPendiente = 0 }

                                    } else {

                                        swal({ title: "Alerta!", text: this.peticion.deserror, showConfirmButton: true });
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

                            if (this.camposDet.registros == "0" || this.camposCliente.registros == "0") {

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

                } else if (this.valorCedula != "") {

                    parametros = addParametro(parametros, 'NUM_IDENTIFICACION', this.valorCedula, '', '=', 0);

                }

                var pet = getPeticion(header, parametros, filas);

                this.exeDsoa(pet, "JJ", "1235666", "N", "N", "7001");
            }
        },

        obtenerSaldo: function (codCliente) {

            var header = '';
            header = headerPeticion("7011", 'E', '123', 'kate', '', '');

            var filas = '';
            filas = addColumna(filas, 'PN_MTO_DEUDA', '', 0);
            filas = addColumna(filas, 'PN_COD_ERROR', '', 0);
            filas = addColumna(filas, 'PV_MSG_ERROR', '', 0);

            var parametros = '';
            parametros = addParametro(parametros, 'PN_COD_CLIENTE', codCliente, '', '=', 0);
            parametros = addParametro(parametros, 'PV_COD_COMPANIA', '01', '', '=', 0);

            var pet = getPeticion(header, parametros, filas);

            this.exeDsoa(pet, "E", "1235666", "N", "N", "7011");
        },

        buscarCobros: function (codCliente) {

            var header = '';
            header = headerPaginacion("7005", 'JJ', '123', 'kate', '1', '10', 'FEC_COBRO');

            var filas = '';
            filas = addColumna(filas, 'ROWID', '', 0);
            filas = addColumna(filas, 'NUM_COBRO', '', 0);
            filas = addColumna(filas, 'COD_CLIENTE', '', 0);
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
            parametros = addParametro(parametros, 'COD_CLIENTE', codCliente, '', '=', 0);
            parametros = addParametro(parametros, 'IND_ESTADO', "'R','A'", '', 'IN', 0);

            var pet = getPeticion(header, parametros, filas);

            this.exeDsoa(pet, "JJ", "1235666", "N", "N", "7005");
        },

        buscarDetalleCobro: function (numCobro) {

            var header = '';
            header = headerPaginacion("7006", 'JJ', '123', 'kate', '1', '10', 'NUM_MOVIMIENTO');
            var filas = '';
            filas = addColumna(filas, 'ROWID', '', 0);
            filas = addColumna(filas, 'NUM_COBRO', '', 0);
            filas = addColumna(filas, 'NUM_MOVIMIENTO', '', 0);
            filas = addColumna(filas, 'MTO_TOTAL', '', 0);
            filas = addColumna(filas, 'DES_ARTICULO', '', 0);
            filas = addColumna(filas, 'FEC_CREACION', '', 0);
            filas = addColumna(filas, 'COD_COMPANIA', '01', 0);

            var parametros = '';
            parametros = addParametro(parametros, 'NUM_COBRO', numCobro, '', '=', 0);
            //agregar ind de estado

            var pet = getPeticion(header, parametros, filas);

            this.exeDsoa(pet, "JJ", "1235666", "N", "N", "7006");
        },

        pagarCobro: function () {

            var montoPago = Number(this.MTO_PAGO);
            var saldo = Number(this.MTO_PEN);
            var total = Number(this.MTO_TOTAL);

            if ((montoPago == 0) && (saldo > 0) && (total > 0)) {
                swal({ title: 'Alerta!', text: "Debe ingresar el monto a pagar", type: 'warning', confirmButtonText: 'Entiendo' })
            
            } else {

                if ((montoPago > total) && (saldo == total)) {

                    swal({ title: 'Alerta!', text: "El monto a pagar ingresado es mayor al monto total", type: 'warning', confirmButtonText: 'Entiendo' })

                } else if ((montoPago >= total) && (montoPago > saldo)) {

                    swal({ title: 'Alerta!', text: "El monto a pagar ingresado es mayor al saldo pendiente", type: 'warning', confirmButtonText: 'Entiendo' })

                } else {
                    console.log("pago válido")

                    var header = '';
                    header = headerPaginacion("7007", 'I', '123', 'kate', '1', '10', 'COD_CLIENTE');

                    var filas = '';

                    _.forEach(this.camposPago, function (pago) {

                        filas = addColumna(filas, 'FEC_PAGO', pago.FEC_PAGO, 0);
                        filas = addColumna(filas, 'NUM_COBRO', pago.fac, 0); //
                    });
                    filas = addColumna(filas, 'IND_TERMINAL', this.TIPO_PAGO, 0);
                    filas = addColumna(filas, 'MTO_PAGO', this.MTO_PAGO, 0);
                    filas = addColumna(filas, 'COD_COMPANIA', '01', 0);

                    var parametros = '<ParamItem/>';

                    var pet = getPeticion(header, parametros, filas);
                    //console.log("pet", pet);
                    this.exeDsoa(pet, "I", "1235666", "N", "N", "7007");
                }
            }
        },

        inicioGrid: function () {

            var header = '';
            header = headerPaginacion("7007", 'JJ', '123', 'kate', '1', '10', 'NUM_PAGO');

            var filas = '';

            filas = addColumna(filas, 'ROWID', '', 0);
            filas = addColumna(filas, 'COD_COMPANIA', '', 0);
            filas = addColumna(filas, 'NUM_COBRO', '', 0);
            filas = addColumna(filas, 'NUM_PAGO', '', 0);
            filas = addColumna(filas, 'IND_ESTADO', '', 0);
            filas = addColumna(filas, 'FEC_PAGO', '', 0);
            filas = addColumna(filas, 'MTO_PAGO', '', 0);

            var parametros = '';
            parametros = addParametro(parametros, 'COD_COMPANIA', '01', '', '=', 0);
            //parametros = addParametro(parametros, 'IND_ESTADO', 'I', '', '!=', 0);

            var pet = getPeticion(header, parametros, filas);

            this.exeDsoa(pet, "JJ", "1235666", "N", "N", "7007");

        },

        //busca el consecutivo de la factura
        ejecutarGenerico: function () {

            var header = '';
            header = headerPeticion("151", 'E', '123', 'kate', '', '');

            var filas = '<Filas/>';

            var parametros = '';
            parametros = addParametro(parametros, 'PV_QUERY', 'SELECT SEQ_COBROS.NEXTVAL FROM dual', '', '=', 0);

            var pet = getPeticion(header, parametros, filas);

            this.exeDsoa(pet, "E", "1235666", "N", "N", "151");
        },

        check: function (e, c, p) {

            if (e.target.checked) {

                this.camposPago.push({
                    fac: e.target.value,
                    costo: c,
                    FEC_PAGO: new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate(),
                });

                this.MTO_TOTAL = c,
                    this.MTO_PEN = p

            } else if (e.target.checked == false) {

                var indi = _.findKey(this.camposPago, function (chr) {
                    return chr.num === e.target.value;
                });

                this.$delete(this.camposPago, indi);
                this.MTO_TOTAL = 0,
                    this.MTO_PEN = 0
            }
        },

        limpiarForm: function () {
            this.valorBuscar = "";
        },

        paginacion: function (p) {

            var pagina = p.target.value;

            var header = '';
            header = headerPaginacion("7005", 'P', '123', 'kate', pagina, '200', '');

            var filas = '<Filas/>';

            var parametros = '<ParamItem/>';

            var pet = getPeticion(header, parametros, filas);

            this.exeDsoa(pet, "P", "1235666", "N", "N", "7005");
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