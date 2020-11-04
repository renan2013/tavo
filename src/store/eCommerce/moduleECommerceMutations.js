/*=========================================================================================
  File Name: moduleEcommerceMutations.js
  Description: Ecommerce Module Mutations
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

export default {
    TOGGLE_ITEM_IN_WISH_LIST(state, item) {
        // AGREGA A LOS DESEOS  
        const index = state.wishList.findIndex(i => i.objectID === item.objectID)
        if (index < 0) {

            // lo adiciona
            state.wishList.push(item)
        } else {
            // lo borra
            state.wishList.splice(index, 1)
        }
    },

    REMOVE_ITEM_FROM_CART(state, item) {
        const index = state.cartItems.findIndex(i => i.objectID === item.objectID)
        if (index > -1) { state.cartItems.splice(index, 1) }
    },

    ADD_ITEM_IN_CART(state, item) {
        state.cartItems.push(Object.assign({}, item))
    },

    UPDATE_ITEM_QUANTITY(state, payload) {
        state.cartItems[payload.index].quantity = payload.quantity
    },
    MUTREGISTRAERROR(state, jsonError) {
        state.lastBdmsage = jsonError.msgError;
        state.lastBdmsgcode = jsonError.codigoError;

    },
    MUTPROCESANDOTRUE(state) {
        state.estadoProcesando = 1;
    },
    MUTPROCESANDOFALSE(state) {
        state.estadoProcesando = 0;
    },
    MUTCLEANSHOP(state, tipo) {
        if (tipo == 0) { // limpia todo 
            state.catalogoProducts = [];
            ////////////////////////////////////////////////////////////////////
            state.cartItems = [];

            // LISTA DE DESEOS  //////////////////////////////////////////////////////////////////////////////////////

            state.wishList = [];
        }
        if (tipo == 1)
            state.catalogoProducts = [];
        if (tipo == 2)
            state.catalogoProducts = [];
        if (tipo == 3)
            state.cartItems = [];
    },

    MUTSETPETICIONTXT(state, pettxt) {

        // CARGO Last query 
        // empaquete la peticion 
        state.peticion = "<SOA_Xml>";
        state.peticion += pettxt.header;
        state.peticion += pettxt.parametros;
        state.peticion += pettxt.filas;
        state.peticion += "</SOA_Xml>";


        //console.log(" MUTSETPETICIONTXT  petiion FINAL FINAL FINAL",state.peticion)
    },
    MUTSETURL(state, indicadorUrl) {
        //ASIGNA EL URL 
        if (indicadorUrl == "O")
            state.urlDsoa = "http://201.194.194.84:8998/DsoaService2/dsoa/request";

        if (indicadorUrl == "P")
            state.urlDsoa = "http://192.168.0.28:8989/dsoaPHP/dsoaPHP/dsoa/";

    },

    MUTSETPETICIONTXTCLEAR(state) {

        // CARGO Last query 
        // empaquete la peticion 
        state.peticion = "";

    },
    MUTSETULTIMOPRODUCTO(state, codigo) {

        // CARGO Last query 
        // empaquete la peticion 
        state.ulimoProducto = codigo

    },

    MUTSETRESPUESTAGRID(state, response) {
        state.dsoaModel = response;
        try {
            state.datosGrid = JSON.parse(response.datos);
            console.log("oracle");
        } catch (e) {
            state.datosGrid = response.datos;

        }

        //state.catalogoProducts = state.datosGrid.rows;

        if (state.datosGrid.total == 0) {
            state.lastBdmsage = "No se encontraron registros";
            state.lastBdmsgcode = "0";
        }

    },
    // Nutacion de productos
    MUTSETRESPUESTAE(state, response) {

        state.datosMsj = [];

        state.datosMsj.push({
            codigoerror: response.codigoerror,
            deserror: response.deserror,
            data: response.datos
        });

        if (state.datosMsj[0].codigoerror == "0") {
            state.lastBdmsage = "Proceso Exitoso Ejecutado Correctamente  ";
            state.lastBdmsgcode = 0;

            //            console.log("cargand1 state.procRESPUESTAXML ", state.datosMsj[0].data);
            let xmlRespuesta = state.datosMsj[0].data;
            xmlRespuesta = xmlRespuesta.replace("<Response><PC_PRODUCTOS><![CDATA[", "");
            xmlRespuesta = xmlRespuesta.replace("]]></PC_PRODUCTOS><PN_CODMENSAJE>0</PN_CODMENSAJE><PV_DESMENSAJE/></Response>", "");

            xmlRespuesta = atob(xmlRespuesta);

            //console.log("bMUTSETRESPUESTAE", xmlRespuesta);
            if (xmlRespuesta.length > 100) {
                if (response.indicador == 1) // carga lista de productos
                    state.catalogoProducts = JSON.parse(xmlRespuesta);
                if (response.indicador == 2) // carga lista de deseos
                    state.wishList = JSON.parse(xmlRespuesta);
                if (response.indicador == 3) // carrito 
                    state.cartItems = JSON.parse(xmlRespuesta);
                if (response.indicador == 9) // un solo producto 
                    state.ProductsRow = JSON.parse(xmlRespuesta);
                if (response.indicador == 10) // un solo producto 
                    state.related_items = JSON.parse(xmlRespuesta);
            } else {
                if (response.indicador == 1) // carga lista de productos
                    state.catalogoProducts = []
                if (response.indicador == 2) // carga lista de deseos
                    state.wishList = []
                if (response.indicador == 3) // carrito 
                    state.cartItems = []
                if (response.indicador == 9) // un solo producto 
                    state.ProductsRow = {}

                if (response.indicador == 10) // un solo producto 
                    state.related_items = []

            }




        } else {

            state.procRESPUESTAXML = "ERROR";
            state.lastBdmsage = "Proceso Con Errores " + state.datosMsj[0].deserror;
            state.lastBdmsgcode = state.datosMsj[0].codigoerror;

        }

    },
    //// MUT
    MUTSETRESPUESTAGENERICO(state, response) {


        try {
            state.selectQuery = JSON.parse(response.datos);
            state.selectQuery = state.selectQuery.rows;
            //console.log("oracle");
        } catch (e) {
            state.selectQuery = response.datos;
            state.selectQuery = state.selectQuery.rows;
            //console.log("php", state.datosForm.rows);
        }

        console.log(" en MUTACIONES ", JSON.stringify(state.selectQuery));


        state.datosMsj = [];

    },

    MUTSETDATOSDEFAULTCMS(state, data) {
        state.DataCMS = data;
        // console.log("datosDefault", state.datosDefault)
    }, //procedimiento almacendo
    //// MUT   
    MUTSETDATA(state, data) {
        // llena los campos que contiene la entidad para ser buscada puede ser rowid si es oracle
        //console.log( "respuesta de DATA JSON ",data);
        state.DataCMS = data;

    },
    MUTSETDATOSDEFAULTCMS(state, data) {
        state.DataCMS = data;
        // console.log("datosDefault", state.datosDefault)
    }, //procedimiento almacendo


}