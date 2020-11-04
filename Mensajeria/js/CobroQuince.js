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
    el: '#appFactura',
    store: store,
    created: function () {

        this.ejecutarGenerico();

    },


    data: {
        a: 1,
        user: "KATE",
        peticion: [],
        COD_CLIENTE: "",
        NOM_CLIENTE: "",
        NUM_IDENTIFICACION: "",
        camposMovimientos: [],
        camposCliente: [],
        camposGen: [],
        camposImpuesto: [],


        isCheckAll: false,
        NUMFACT: 0,
        POR_IMPUESTO: 0,
        listaMov: [],
        sub: 0,
        impuesto: 0,
        total: 0,
        //
        checkedMov: 0,

        listaCobro: {
            ROWID: "",
            COD_COMPANIA: "",
            COD_CLIENTE: "",
            FEC_COBRO: moment().format('YYYY-MM-DD'),
            TIP_COBRO: "CO",
        },

        tipoMov: [
            { campo: "Servicio Mensajería", id: "E" },
            { campo: "Transferencia Bancaria", id: "T" },
        ],

        isChecked: false,

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

        fechaInicio: moment().subtract(15, 'days').format('YYYY-MM-DD'),
        fechaFin: moment().format('YYYY-MM-DD'),
        numPag: 0,
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


        //busca el consecutivo de la factura
        ejecutarGenerico: function () {

            var header = '';
            header = headerPeticion("151", 'E', '123', 'kate', '', '', '');

            var filas = '<Filas/>';

            var parametros = '';
            parametros = addParametro(parametros, 'PV_QUERY', 'SELECT SEQ_COBROS.NEXTVAL FROM dual', '', '=', 0);

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

                    //console.log("ExePeticion", this.peticion);

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

                                case "7004":
                                    this.dtClr();
                                    this.camposMovimientos = JSON.parse(this.peticion.datos);
                                    this.numPag = parseInt(this.camposMovimientos.total);
                                    this.camposMovimientos = this.camposMovimientos.rows;
                                    this.dtIni();
                                    break;

                                case "7005":
                                    if (this.peticion.dml == "I" && this.peticion.datos == "0") {
                                        swal({ type: 'success', title: "", text: "El registro fue agregado correctamente", showConfirmButton: true });
                                    }
                                    break;

                                case "7006":
                                    if (this.peticion.dml == "I" && this.peticion.datos == "0") {
                                        swal({ type: 'success', title: "", text: "El registro fue agregado correctamente", showConfirmButton: true });
                                    }

                                    break;

                                case "7009":

                                    if (this.peticion.GV_MSG_ERROR != "") {

                                        swal({ type: 'success', title: "", text: "El cobro fue registrado correctamente", timer: 3000, showConfirmButton: true });

                                        window.setTimeout(function () {
                                            window.location.href = "AgregarCobro.html";
                                        }, 1000);
                                    }
                                    break;

                                case "7010":

                                    if (this.peticion.codigoerror == 0) {

                                        this.camposImpuesto = this.peticion.datos;
                                        this.camposImpuesto = parser.parse(this.camposImpuesto);

                                        this.POR_IMPUESTO = this.camposImpuesto.Response.PN_MTO_PORCENTAJE;

                                    } else {

                                        swal({ title: "Alerta!", text: this.peticion.deserror, showConfirmButton: true });
                                    }

                                    break;

                                case "151":
                                    if (this.peticion.codigoerror == 0) {
                                        this.camposGen = this.peticion.datos;
                                        this.camposGen = parser.parse(this.camposGen);
                                        this.NUMFACT = this.camposGen.Response.PV_RETORNO;
                                        console.log("JSON", this.NUMFACT);
                                    }
                                    break;

                                default:
                                // code block
                            }

                            if (this.camposGen.registros == "0" || this.camposCliente.registros == "0" || this.camposMovimientos.registros == "0") {

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

        buscarMovimientos: function () {

            var header = '';
            header = headerPaginacion("7004", 'JJ', '123', 'kate', '1', '200', 'NUM_MOVIMIENTO');

            var filas = '';
            filas = addColumna(filas, 'ROWID', '', 0);
            filas = addColumna(filas, 'NUM_MOVIMIENTO', '', 0);
            filas = addColumna(filas, 'COD_CLIENTE', '', 0);
            filas = addColumna(filas, 'COD_MENSAJERO', '', 0);
            filas = addColumna(filas, 'FEC_DOCUMENTO', '', 0);
            filas = addColumna(filas, 'DES_OBSERVACIONES', '', 0);
            filas = addColumna(filas, 'MTO_COBRAR', '', 0);
            filas = addColumna(filas, 'TIP_MOVIMIENTO', '', 0);
            filas = addColumna(filas, 'IND_ESTADO', '', 0);
            filas = addColumna(filas, 'TIP_COBRO', '', 0);
            filas = addColumna(filas, 'ENC_K_COBROS.ENC_F_PORCTIPCOBRO(COD_COMPANIA,NUM_MOVIMIENTO) AS MTO_PORCENTAJE', '', 0);
            filas = addColumna(filas, 'ENC_K_COBROS.ENC_F_MTOCTIPCOBRO(COD_COMPANIA,NUM_MOVIMIENTO,MTO_COBRAR) AS MTO_IMPUESTO', '', 0);
            filas = addColumna(filas, 'ENC_K_UTILITY.GETESTADO(TIP_MOVIMIENTO) AS NOMBRE_TIPO', '', 0);
            filas = addColumna(filas, 'ENC_K_UTILITY.GETESTADO(IND_ESTADO) AS NOMBRE_ESTADO', '', 0);
            filas = addColumna(filas, 'COD_COMPANIA', '01', 0);

            var parametros = '';
            parametros = addParametro(parametros, 'COD_CLIENTE', this.COD_CLIENTE, '', '=', 0);
            parametros = addParametro(parametros, 'IND_ESTADO', 'R', '', '=', 0);

            parametros = addParametro(parametros, 'FEC_DOCUMENTO', this.fechaInicio, 'YYYY-MM-DD', 'MAYORIGUAL', 0);
            //var nuevaFecha = moment(this.fechaFin).add(1, 'days').format('YYYY-MM-DD');
            parametros = addParametro(parametros, 'FEC_DOCUMENTO', this.fechaFin, 'YYYY-MM-DD', 'MENORIGUAL', 0);

            var pet = getPeticion(header, parametros, filas);
            //console.log("reg", pet);
            this.exeDsoa(pet, "JJ", "1235666", "N", "N", "7004");
        },

        agregarCobro: function () {

            this.checkedMov = _.size(this.listaMov);

            if (this.checkedMov != 0) {

            var header = '';
            header = headerPeticion("7009", 'E', '123', 'kate', '', '');

            var filas = '';
            filas = addCampo(filas, 'TIP_COBRO', this.listaCobro.TIP_COBRO, 0);
            filas = addCampo(filas, 'FEC_COBRO', this.listaCobro.FEC_COBRO, 0);
            filas = addCampo(filas, 'COD_CLIENTE', this.COD_CLIENTE, 0);
            filas = addCampo(filas, 'NUM_COBRO', this.NUMFACT, 0);
            filas = addCampo(filas, 'COD_COMPANIA', '01', 0);
            var filasHija = '';
            var filasPadre = '<Fila>' + filas + '</Fila>';

            _.forEach(this.listaMov, function (mov) {

                var filas = '';
                filas = addCampo(filas, 'MTO_IMPUESTO', mov.totIVA, 0);
                filas = addCampo(filas, 'POR_IMPUESTO', mov.por, 0);
                filas = addCampo(filas, 'MTO_DESCUENTO', '0', 0);
                filas = addCampo(filas, 'MTO_SUBTOTAL', mov.costo, 0);
                filas = addCampo(filas, 'MTO_UNIDAD', mov.costo, 0);
                filas = addCampo(filas, 'DES_ARTICULO', mov.des, 0);
                filas = addCampo(filas, 'CAN_UNIDADES', '1', 0);
                filas = addCampo(filas, 'NUM_MOVIMIENTO', mov.num, 0);
                filas = addCampo(filas, 'NUM_COBRO', mov.fac, 0);
                filas = addCampo(filas, 'COD_COMPANIA', '01', 0);
                filasHija += '<Fila>' + filas + '</Fila>';
            });

            filasHija = '<Filas>' + filasHija + '</Filas>';

            var parametros = '';
            parametros = addParametro(parametros, 'GV_PADRE', filasPadre, '', '=', 1);
            parametros = addParametro(parametros, 'GV_DETALLE', filasHija, '', '=', 1);

            var filas = '<Filas/>';

            var pet = getPeticion(header, parametros, filas);

             //console.log("Add", pet);

            this.exeDsoa(pet, "E", "1235666", "N", "N", "7009");
        }else {

            swal({ title: 'Alerta!', text: "No puede agregar un cobro sin seleccionar movimientos", type: 'warning', confirmButtonText: 'OK' })
        }
        
        },

        paginacion: function (p) {

            var pagina = p.target.value;

            var header = '';
            header = headerPaginacion("7004", 'P', '123', 'kate', pagina, '200', 'NUM_MOVIMIENTO');

            var filas = '<Filas/>';

            var parametros = '<ParamItem/>';

            var pet = getPeticion(header, parametros, filas);

            this.exeDsoa(pet, "P", "1235666", "N", "N", "7004");
        },

        limpiarForm: function () {
            this.valorBuscar = "";
        },

        //
        selectAll: function (f) {
            this.checkedMov = _.size(this.listaMov);
            this.isChecked = true;

            var listaMovimientos = [];

            _.forEach(this.camposMovimientos, function (mov) {

                listaMovimientos.push({
                    num: mov.NUM_MOVIMIENTO,       //NUM_MOVIMIENTO
                    costo: mov.MTO_COBRAR,        //MTO_COBRAR
                    des: mov.DES_OBSERVACIONES,  //DES_OBSERVACIONES
                    fac: f,                                  //NUM_COBRO
                    por: mov.MTO_PORCENTAJE,   //PORCENTAJE
                    totIVA: mov.MTO_IMPUESTO, //PORCENTAJE
                });
            });

            this.listaMov = listaMovimientos;
            console.log("entro", this.listaMov);
            this.calc();
        },

        deleteAll: function () {
            this.isChecked = false;
            _.remove(this.listaMov);
            console.log("DD", this.listaMov);
            this.calc();

        },

        //
        select: function (e, i, f) {


            if (e.target.checked) {
                this.isChecked = true;
                this.listaMov.push({
                    num: i.NUM_MOVIMIENTO,        //NUM_MOVIMIENTO
                    costo: i.MTO_COBRAR,       //MTO_COBRAR
                    des: i.DES_OBSERVACIONES, //DES_OBSERVACIONES
                    fac: f,                  //NUM_COBRO
                    por: i.MTO_PORCENTAJE,  //PORCENTAJE
                    totIVA: i.MTO_IMPUESTO //PORCENTAJE
                });

                console.log("add", this.listaMov);
                this.calc();

            } else if (e.target.checked == false) {

                var indi = _.findKey(this.listaMov, function (chr) {
                    return chr.num === e.target.value;
                });

                this.POR_IMPUESTO = 0;

                this.$delete(this.listaMov, indi);

                console.log("del", this.listaMov);

                this.calc();
            }
        },

        calc: function () {

            var sum = 0;
            var por = 0;

            _.forEach(this.listaMov, function (mov) {

                sum = Number(sum) + Number(mov.costo);
                por = Number(por) + Number(mov.totIVA.replace(/,/g, '.'));
            });

            this.impuesto = por;
            this.sub = sum;
            this.total = this.sub + this.impuesto;

        },

        dtIni: function () {
            window.setTimeout(function () {
                table = $('#dt').DataTable({
                    retrieve: true,
                    responsive: true,
                    paging: false,
                    info: false,
                    searching: false,
                    ordering: false
                });
            }, 1000);
        },

        dtClr: function () {
            $('#dt').DataTable().destroy();
        },
    }
});