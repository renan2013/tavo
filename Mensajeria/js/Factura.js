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

var vf = new Vue({
    el: '#appFactura',

    created: function () {

        this.ejecutarGenerico();

    },


    data: {
        a: 1,
        user: "KATE",
        peticion: [],
        camposMovimientos: [],
        camposCliente: [],
        camposGen: [],
        NUMFACT: 0,
        listaMov: [],
        checkedCategories: [],

        listaFactura: {
            ROWID: "",
            COD_COMPANIA: "",
            COD_CLIENTE: "",
            FEC_FACTURA: "",
        },

        tipoMov: [
            { campo: "Servicio Mensajería", id: "E" },
            { campo: "Transferencia Bancaria", id: "T" },
        ],

        //boton buscar
        valorBuscar: "",
        nomCliente: "",
        cedCliente: "",
        select: "",
        gridBuscar: [
            { campo: "Cedula" },
            { campo: "Nombre" },
        ],
    },

    methods: {

        ejecutarGenerico: function () {

            var header = '';
            header = headerPeticion("151", 'E', '123', 'kate', '', '');

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

            //var url = "http://192.168.0.28:8089/DsoaService2/dsoa/request";
            var url = "http://201.194.194.84:8998/DsoaService2/dsoa/request";

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

                    console.log("PV2", this.peticion);

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
                                    break;

                                case "7004":
                                    this.camposMovimientos = JSON.parse(this.peticion.datos);
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

                            if (this.camposGen.registros == "0" || this.camposCliente.registros == "0") {

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

            if (this.select == "Nombre") {

                //debe ir el nombre columna en base de datos
                parametros = addParametro(parametros, 'NOM_CLIENTE', this.valorBuscar, '', 'LIKE', 0);

            } else if (this.select == "Cedula") {

                parametros = addParametro(parametros, 'NUM_IDENTIFICACION', this.valorBuscar, '', '=', 0);

            }

            var pet = getPeticion(header, parametros, filas);

            this.exeDsoa(pet, "JJ", "1235666", "N", "N", "7001");

        },

        buscarMovimientos: function (codCliente) {

            var header = '';
            header = headerPaginacion("7004", 'JJ', '123', 'kate', '1', '10', 'COD_CLIENTE');

            var filas = '';
            filas = addColumna(filas, 'ROWID', '', 0);
            filas = addColumna(filas, 'NUM_MOVIMIENTO', '', 0);
            filas = addColumna(filas, 'COD_CLIENTE', '', 0);
            filas = addColumna(filas, 'COD_MENSAJERO', '', 0);
            filas = addColumna(filas, 'FEC_DOCUMENTO', '', 0);
            filas = addColumna(filas, 'DES_OBSERVACIONES', '', 0);
            filas = addColumna(filas, 'MTO_COBRAR', '', 0);
            filas = addColumna(filas, 'TIP_MOVIMIENTO', '', 0);
            filas = addColumna(filas, 'TIP_COBRO', '', 0);
            filas = addColumna(filas, 'COD_COMPANIA', '01', 0);

            var parametros = '';
            parametros = addParametro(parametros, 'COD_CLIENTE', codCliente, '', '=', 0);

            var pet = getPeticion(header, parametros, filas);

            this.exeDsoa(pet, "JJ", "1235666", "N", "N", "7004");
        },

        agregarFactura: function () {

            console.log("add", JSON.stringify(this.listaFactura));

            var header = '';
            header = headerPaginacion("7005", 'I', '123', 'kate', '1', '10', 'COD_CLIENTE');

            var filas = '';
            filas = addColumna(filas, 'COD_CLIENTE', this.listaFactura.COD_CLIENTE.id, 0);
            filas = addColumna(filas, 'FEC_DOCUMENTO', this.listaFactura.FEC_FACTURA, 0);
            filas = addColumna(filas, 'NUM_FACTURA', this.NUMFACT, 0);
            filas = addColumna(filas, 'COD_COMPANIA', '01', 0);

            var parametros = '<ParamItem/>';

            var pet = getPeticion(header, parametros, filas);

            console.log("pett", pet);
            console.log("arr", this.listaMov);
            this.buscarMovimientos(this.listaFactura.COD_CLIENTE.id);

            //this.exeDsoa(pet, "I", "1235666", "N", "N", "7005");
        },

        limpiarForm: function () {
            this.valorBuscar = "";
        },

        check: function (e, index) {

            if (e.target.checked) {

                this.listaMov.push({
                    id: e.target.value
                });

               
                console.log("arr", this.listaMov);

            } else if (e.target.checked == false) {
              
                this.$delete(this.listaMov, e.target.id);
               
                console.log("del", this.listaMov, ind);
            }
        },
    }
});