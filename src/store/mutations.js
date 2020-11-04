/*=========================================================================================
  File Name: mutations.js
  Description: Vuex Store - mutations
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/
import {set } from '../utils/vuex'
import Vue from 'vue'


const mutations = {

    // /////////////////////////////////////////////
    // COMPONENTS
    // /////////////////////////////////////////////

    // Vertical NavMenu


    MUT_RECARGAR(state, val) {
        state.recargar = val
    },

    TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE(state, value) {
        state.isVerticalNavMenuActive = value
    },
    TOGGLE_REDUCE_BUTTON(state, val) {
        state.reduceButton = val
    },
    UPDATE_MAIN_LAYOUT_TYPE(state, val) {
        state.mainLayoutType = val
    },
    UPDATE_VERTICAL_NAV_MENU_ITEMS_MIN(state, val) {
        state.verticalNavMenuItemsMin = val
    },
    UPDATE_VERTICAL_NAV_MENU_WIDTH(state, width) {
        state.verticalNavMenuWidth = width
    },


    // VxAutoSuggest

    UPDATE_STARRED_PAGE(state, payload) {

        // find item index in search list state
        const index = state.navbarSearchAndPinList['pages'].data.findIndex((item) => item.url === payload.url)

        // update the main list
        state.navbarSearchAndPinList['pages'].data[index].is_bookmarked = payload.val

        // if val is true add it to starred else remove
        if (payload.val) {
            state.starredPages.push(state.navbarSearchAndPinList['pages'].data[index])
        } else {
            // find item index from starred pages
            const index = state.starredPages.findIndex((item) => item.url === payload.url)

            // remove item using index
            state.starredPages.splice(index, 1)
        }
    },

    // Navbar-Vertical

    ARRANGE_STARRED_PAGES_LIMITED(state, list) {
        const starredPagesMore = state.starredPages.slice(10)
        state.starredPages = list.concat(starredPagesMore)
    },
    ARRANGE_STARRED_PAGES_MORE(state, list) {
        let downToUp = false
        const lastItemInStarredLimited = state.starredPages[10]
        const starredPagesLimited = state.starredPages.slice(0, 10)
        state.starredPages = starredPagesLimited.concat(list)

        state.starredPages.slice(0, 10).map((i) => {
            if (list.indexOf(i) > -1) downToUp = true
        })

        if (!downToUp) {
            state.starredPages.splice(10, 0, lastItemInStarredLimited)
        }
    },


    // ////////////////////////////////////////////
    // UI
    // ////////////////////////////////////////////

    TOGGLE_CONTENT_OVERLAY(state, val) { state.bodyOverlay = val },
    UPDATE_PRIMARY_COLOR(state, val) { state.themePrimaryColor = val },
    UPDATE_THEME(state, val) { state.theme = val },
    UPDATE_WINDOW_WIDTH(state, width) { state.windowWidth = width },
    UPDATE_WINDOW_SCROLL_Y(state, val) { state.scrollY = val },


    // /////////////////////////////////////////////
    // User/Account
    // /////////////////////////////////////////////

    // Updates user info in state and localstorage
    UPDATE_USER_INFO(state, payload) {

        // Get Data localStorage
        const userInfo = JSON.parse(localStorage.getItem('userInfo')) || state.AppActiveUser

        for (const property of Object.keys(payload)) {

            if (payload[property] !== null) {
                // If some of user property is null - user default property defined in state.AppActiveUser
                state.AppActiveUser[property] = payload[property]

                // Update key in localStorage
                userInfo[property] = payload[property]
            }


        }
        // Store data in localStorage
        localStorage.setItem('userInfo', JSON.stringify(userInfo))
    },

    //////////////////////////////////////////////////
    /// DIVISOFT DIVISOFT DIVISOFT DIVISOFT DIVISOFT //
    //////////////////////////////////////////////////

    //// MUT
    MUTSETSELECTED(state, FilaSelected) {
        //  console.log('Mut - fila seleccionada ', FilaSelected)
        state.selectedRow = [];
        state.selectedRow.push(FilaSelected)
    },
    //// MUT
    MUTSETDESELECTED(state) {
        state.selectedRow = [];
    },
    //// MUT
    MUTSETTABLEKEY(state, tableKey) {
        state.tableKey.push(tableKey);

    },

    /// DIVISOFT  DIVISOFT  DIVISOFT  DIVISOFT DIVISOFT  DIVISOFT DIVISOFT  DIVISOFT DIVISOFT  DIVISOFT  
    //// MUT
    MUTSETURL(state, indicadorUrl) {
        //ASIGNA EL URL 
        if (indicadorUrl == "O")
            state.urlDsoa = "http://201.194.194.84:8998/DsoaService2/dsoa/request";

        if (indicadorUrl == "P")
            state.urlDsoa = "http://192.168.0.28:8989/dsoaPHP/dsoaPHP/dsoa/";

    },
    //// MUT
    MUTCLEARTABLEKEY(state) {
        state.tableKey = [];
    },
    MUTPROCESANDOTRUE(state) {
        state.estadoProcesando = 1;
    },

    MUTPROCESANDOFALSE(state) {
        state.estadoProcesando = 0;
    },

    ////  carga la peticion a partir de texto xml ya preparado
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

    MUTSETPETICIONTXTCLEAR(state) {

        // CARGO Last query 
        // empaquete la peticion 
        state.peticion = "";

    },



    //// MUT
    MUTSETINDICADORDML(state, indicadorDML) {
        state.indicadorDML = indicadorDML;
        // console.log("indicadorDML", state.indicadorDML)
    },

    //// MUT
    MUTSETDATOSDEFAULT(state, datosDefault) {
        state.rowsForm = datosDefault;
        // console.log("datosDefault", state.datosDefault)
    },

    //// MUT
    MUTSETRESPUESTAFORM(state, response) {

        //console.log("MUTSETRESPUESTAFORM", JSON.stringify(response))

        state.dsoaModel = response;

        try {
            state.datosForm = JSON.parse(response.datos);
            //console.log("oracle");
        } catch (e) {
            state.datosForm = response.datos;
            //console.log("php", state.datosForm.rows);
        }

        state.rowsForm = state.datosForm.rows;
        //console.log("ROWSFORM 1", state.rowsForm);
    },

    /// MUT
    /// MUT
    MUTSETRESPUESTAGRID(state, response) {
        state.dsoaModel = response;

        try {
            state.datosGrid = JSON.parse(response.datos);
            console.log("oracle");
        } catch (e) {
            state.datosGrid = response.datos;

        }
        state.rows = state.datosGrid.rows;

        if (state.datosGrid.total == 0) {
            state.lastBdmsage = "No se encontraron registros";
            state.lastBdmsgcode = "0";
        }
    },

    /// MUT
    MUTSETRESPUESTAPROMPT(state, response) {

        state.dsoaModel = response;

        try {
            state.datosPrompt = JSON.parse(response.datos);
            // console.log("oracle",state.datosPrompt.rows);
        } catch (e) {
            state.datosPrompt = response.datos;
            console.log("php");
        }
        state.rows = state.datosPrompt.rows;
    },

    /// MUT
    MUTSETPROMPTDEFAULT(state, response) {


        try {
            state.datosPrompt = response;
        } catch (e) {
            state.datosPrompt = response;
        }
    },

    //// MUT
    MUTSETRESPUESTACRUD(state, response) {

        //se debe obtener el mensaje de respuesta de la peticion
        state.dsoaModel = response;
        state.datosMsj = [];

        state.datosMsj.push({
            codigoerror: response.codigoerror,
            deserror: response.deserror,
            data: response.datos
        });


        if (state.datosMsj[0].codigoerror == "0") {
            state.lastBdmsage = "Proceso Exitoso !! ";
            state.lastBdmsgcode = 0;


            this.$vs.notify({
                title: "Actualizacion, Borrado o Insercion de Datos",
                time: 6000,
                text: "Proceso Exitoso",
                color: "success"
            });

        } else {
            state.lastBdmsage = "Proceso Con Errores " + state.datosMsj[0].deserror;
            state.lastBdmsgcode = state.datosMsj[0].codigoerror;


            this.$vs.notify({
                title: "Actualizacion, Borrado o Insercion de Datos",
                time: 6000,
                text: state.lastBdmsage,
                color: "warning"
            });


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
        /*
                state.datosMsj.push({
                    codigoerror: response.codigoerror,
                    deserror: response.deserror,
                    data: response.datos
                });


                if (state.datosMsj[0].codigoerror == "0") {
                    state.lastBdmsage = "Proceso Exitoso !! ";
                    state.lastBdmsgcode = 0;

                } else {
                    state.lastBdmsage = "Proceso Con Errores " + state.datosMsj[0].deserror;
                    state.lastBdmsgcode = state.datosMsj[0].codigoerror;

                }
        */
    },

    MUTSETRESPUESTACLOUD(state, response) {

        //se debe obtener el mensaje de respuesta de la peticion
        if (response.length < 5)
            state.cloudData = response;
        else {
            let datos = response.datos;

            datos = datos.replace("<Response><PC_DATOS><![CDATA[", "");
            datos = datos.substr(0, datos.indexOf("]>") - 1)

            console.log("datos sin procesaar ", datos);


            datos = JSON.parse(datos);

            console.log("credencial ", datos[0].Satcredencial);

            state.cloudData = datos;

            console.log("credencial ", datos[0].Satcredencial);
            state.datosMsj = [];

            state.datosMsj.push({
                codigoerror: response.codigoerror,
                deserror: response.deserror,
                data: response.datos
            });


            if (state.datosMsj[0].codigoerror == "0") {
                // state.lastBdmsage = "Proceso Exitoso !! ";
                state.lastBdmsgcode = 0;

            } else {
                state.lastBdmsage = "Proceso Con Errores " + state.datosMsj[0].deserror;
                state.lastBdmsgcode = state.datosMsj[0].codigoerror;

            }
        }

    },
    MUTREGISTRAERROR(state, jsonError) {
        state.lastBdmsage = jsonError.msgError;
        state.lastBdmsgcode = jsonError.codigoError;

    },
    //// MUT   
    MUTSETLLLAVE(state, varLlave) {
        // llena los campos que contiene la entidad para ser buscada puede ser rowid si es oracle
        state.llaveRec.push(varLlave);
    },

    ///  MUTACIONES MUTACIONES  MULTIMEDIA MULTIMEDIA  MULTIMEDIA MULTIMEDIA  MULTIMEDIA MULTIMEDIA  MULTIMEDIA MULTIMEDIA  MULTIMEDIA MULTIMEDIA 


    //// MUT   
    MUTSETDATA(state, data) {
        // llena los campos que contiene la entidad para ser buscada puede ser rowid si es oracle
        //console.log( "respuesta de DATA JSON ",data);
        state.DataCMS = data;

    },
    //// MUT   
    MUTSETBD(state, bd) {
        // llena los campos que contiene la entidad para ser buscada puede ser rowid si es oracle
        state.Bd = bd;
    },
    //// MUT   
    MUTSETMANIPULACION(state, manipulacion) {
        // llena los campos que contiene la entidad para ser buscada puede ser rowid si es oracle
        state.Manipulacion = manipulacion;
    },
    //// MUT
    MUTSETDATOSDEFAULTCMS(state, data) {
        state.DataCMS = data;
        // console.log("datosDefault", state.datosDefault)
    }, //procedimiento almacendo

    MUTSETOBJETOJSONPROC(state, respuestaProc) {
        state.respuestaProc = respuestaProc;

    },
    MUTSETDINAMICKEYOB(state, dinamicKeyOb) {
        state.dinamicKeyOb = dinamicKeyOb;
    },

    //procedimiento almacendoD
    // RESPUESTA EN  XML
    MUTSETRESPUESTAProc(state, respuestaXML) {
        state.procRESPUESTAXML = respuestaXML;
        state.respuestaProc = [];
    },

    /// MUT PARA Asignar las respuestas de un procedimiento almacenado.
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
            //console.log("cargand1 state.procRESPUESTAXML ", state.datosMsj[0].data);
            state.procRESPUESTAXML = state.datosMsj[0].data;
        } else {

            state.procRESPUESTAXML = "ERROR";
            state.lastBdmsage = "Proceso Con Errores " + state.datosMsj[0].deserror;
            state.lastBdmsgcode = state.datosMsj[0].codigoerror;

        }
    },
    /// CHATA CHAT CHAT CHAT CHAT 


    setProcessing: set('processing'),
    setNotification: set('notification'),
    setPrivateNotification: set('privateNotification'),
    SOCKET_MUTATION_USER_JOINED(state, data) {
        state.notification = {
            show: true,
            message: data.message,
            color: "info"
        }
    },
    SOCKET_MUTATION_USER_LEAVE_ROOM(state, data) {
        state.notification = {
            show: true,
            message: data.message,
            color: "warning"
        }
    },
    SOCKET_MUTATION_NEW_ROOM_CREATED(state, data) {
        const room = data.room;
        state.notification = {
            show: true,
            message: `El usuario ${room.owner.username} ha creado la sala ${room.name}`,
            color: "success"
        }
    },

    SOCKET_MUTATION_SEND_INVITATION_TO_PRIVATE_ROOM(state, payload2) {
        // alert(2);
        let payload = payload2.data;
        console.log("DATOS SOCKET QUE LLEGO ", JSON.stringify(payload));

        payload.chatData = state.chat.chats[Object.keys(state.chat.chats).find(key => Number(key) === payload.id)]

        if (payload.chatData) {
            // If there's already chat. Push msg to existing chat
            console.log("EntroSOCKET  aqui  ", JSON.stringify(payload.chatData));
            state.chat.chats[Object.keys(state.chat.chats).find(key => Number(key) === payload.id)].msg.push(payload.msg)

            console.log("Agrego aqui SOCKET  aqui  ", JSON.stringify(payload.chatData));
            state.chat.chats = payload.chatData;

        } else {

            // Create New chat and add msg
            const chatId = payload.id
            console.log("Entro aqui AL ELSE   ", chatId);

            Vue.set(state.chat.chats, [chatId], {
                isPinned: payload.isPinned,
                msg: [payload.msg]
            })
        }

    },
    SOCKET_MUTATION_USER_JOINED_TO_PRIVATE_ROOM(state, message) {

        console.log("lado del Cliente destinoo", message)
        state.notification = {
            show: true,
            message,
            color: "success"
        }
    }



}

export default mutations