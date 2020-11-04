/*=========================================================================================
                                                                                 File Name: mutations.js
Description: Vuex Store - mutations
----------------------------------------------------------------------------------------
Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
Author: Pixinvent
                                                                                
==========================================================================================*/


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


    /// MUT 

    MUTSETRESPUESTASLIDER(state, response) {

        let raizUrl = process.env.VUE_APP_RAIZURL;
        let publicaciones = [];
        let publicacion = {};
        try {

            if (response.datos.rows) {
                let items = response.datos.rows;
                for (let i = 0; i < items.length; i++) {
                    try {

                        publicacion = {};

                        try {
                            publicacion = JSON.parse(decodeURIComponent(escape(window.atob(items[i].valor))));
                        } catch (error) {
                            publicacion = JSON.parse(window.atob(items[i].valor));
                        }

                        if (!(publicacion instanceof Object)) {
                            console.log("No es Objeto  ", publicacion);
                        } else {
                            console.log(" si es  Objeto  ", publicacion);
                        }

                        if (publicacion.publicacion_padre && publicacion.link)
                            if (publicacion.publicacion_padre > 0)
                                publicacion.link = publicacion.link + "/" + publicacion.publicacion_padre


                        console.log(" MUTSETRESPUESTASLIDER  Publicacion LINK ", publicacion.link);

                        try {

                            if (items[i].contenido) {

                                let contenido = items[i].contenido;
                                contenido = window.atob(contenido);

                                try {
                                    contenido = decodeURIComponent(escape(contenido));
                                } catch (error) {

                                }

                                let documentos = JSON.parse(contenido);

                                // VA EL LOTE PERO DEBE VENIR  
                                let ruta = raizUrl + "/bitweb/imagebank/" + documentos.lote + "/" + documentos.referencia + ".webp";
                                publicacion.urlImg = ruta;
                                ruta = raizUrl + "/bitweb/imagebank/" + documentos.lote + "/" + documentos.referencia + "sl.webp";
                                publicacion.urlImgsl = ruta;

                            }


                        } catch (error) {

                        }


                    } catch (error) {
                        console.log(error);
                    }

                    publicaciones.push(publicacion);


                };

            } else
                console.log("MUTSETRESPUESTASLIDER  No viene Rows ");
        } catch (error) {
            console.log(error);
        }

        // console.log("XXXXXXXX 11111     Se obtuvo  agregando Referencia", JSON.stringify(publicaciones));
        state.publicacionesMulti = publicaciones;
        // console.log("XXXXXXXX      Se obtuvo  agregando Referencia", JSON.stringify(state.publicacionesMulti));
    },

    MUTSETRESPUESTASPUBCORTA(state, response) {

        let raizUrl = process.env.VUE_APP_RAIZURL;
        let publicaciones = [];
        let publicacion = {};
        try {

            if (response.datos.rows) {
                let items = response.datos.rows;
                for (let i = 0; i < items.length; i++) {
                    try {

                        publicacion = {};

                        try {
                            publicacion = JSON.parse(decodeURIComponent(escape(window.atob(items[i].valor))));
                        } catch (error) {
                            publicacion = JSON.parse(window.atob(items[i].valor));
                        }

                        if (!(publicacion instanceof Object)) {
                            console.log("No es Objeto  ", publicacion);
                        } else {
                            console.log(" si es  Objeto  ", publicacion);
                        }

                        if (publicacion.publicacion_padre && publicacion.link)
                            if (publicacion.publicacion_padre > 0)
                                publicacion.link = publicacion.link + "/" + publicacion.publicacion_padre


                        console.log(" MUTSETRESPUESTASPUBCORTA  Publicacion LINK ", publicacion.link);

                        try {

                            if (items[i].contenido) {

                                let contenido = items[i].contenido;
                                contenido = window.atob(contenido);

                                try {
                                    contenido = decodeURIComponent(escape(contenido));
                                } catch (error) {

                                }

                                let documentos = JSON.parse(contenido);

                                // VA EL LOTE PERO DEBE VENIR  
                                let ruta = raizUrl + "/bitweb/imagebank/" + documentos.lote + "/" + documentos.referencia + ".webp";
                                publicacion.urlImg = ruta;
                                ruta = raizUrl + "/bitweb/imagebank/" + documentos.lote + "/" + documentos.referencia + "sl.webp";
                                publicacion.urlImgsl = ruta;

                            }


                        } catch (error) {

                        }


                    } catch (error) {
                        console.log(error);
                    }

                    publicaciones.push(publicacion);


                };

            } else
                console.log("MUTSETRESPUESTASPUBCORTA  No viene Rows ");
        } catch (error) {
            console.log(error);
        }

        // console.log("XXXXXXXX 11111     Se obtuvo  agregando Referencia", JSON.stringify(publicaciones));
        state.publicacionesCortas = publicaciones;
        // console.log("XXXXXXXX      Se obtuvo  agregando Referencia", JSON.stringify(state.publicacionesMulti));
    },


    MUTSETRESPUESTASLIDERM(state, response) {

        let raizUrl = process.env.VUE_APP_RAIZURL;

        alert("MUTSETRESPUESTASLIDERM" + raizUrl);

        console.log("MUTSETRESPUESTASLIDERM", response);

        let publicaciones = [];

        let publicacion = {};
        try {

            if (response.datos.rows) {
                let items = response.datos.rows;
                for (let i = 0; i < items.length; i++) {
                    try {

                        publicacion = {};
                        try {
                            publicacion = JSON.parse(decodeURIComponent(escape(window.atob(items[i].valor))));
                        } catch (error) {
                            publicacion = JSON.parse(window.atob(items[i].valor));
                        }

                        if (!(publicacion instanceof Object)) {

                            console.log("No es Objeto  ", publicacion);

                        } else {
                            console.log(" si es  Objeto  ", publicacion);
                        }

                        if (publicacion.publicacion_padre && publicacion.link)
                            if (publicacion.publicacion_padre > 0)
                                publicacion.link = publicacion.link + "/" + publicacion.publicacion_padre

                        console.log(" MUTSETRESPUESTASLIDERM  Publicacion LINK ", publicacion.link);
                        try {

                            if (items[i].contenido) {

                                let contenido = items[i].contenido;
                                contenido = window.atob(contenido);

                                try {
                                    contenido = decodeURIComponent(escape(contenido));
                                } catch (error) {

                                }
                                let documentos = JSON.parse(contenido);

                                let ruta = raizUrl + documentos.lote + "/" + documentos.referencia + ".webp";
                                // let ruta = state.raizUrl + "/bitweb/imagebank/" + documentos.lote + "/" + documentos.referencia + ".webp";
                                publicacion.urlImg = ruta;
                                //ruta = state.raizUrl + "/bitweb/imagebank/" + documentos.lote + "/" + documentos.referencia + "sl.webp";
                                ruta = raizUrl + documentos.lote + "/" + documentos.referencia + "sl.webp";
                                publicacion.urlImgsl = ruta;
                            }


                        } catch (error) {

                        }


                    } catch (error) {
                        console.log(error);
                    }

                    console.log("PUBLICACIONES ENCONTRADAS", publicacion);
                    publicaciones.push(publicacion);


                };

            } else
                console.log("MUTSETRESPUESTASLIDER  No viene Rows ");
        } catch (error) {
            console.log(error);
        }

        // console.log("XXXXXXXX 11111     Se obtuvo  agregando Referencia", JSON.stringify(publicaciones));
        state.Noticias = publicaciones;
        // console.log("XXXXXXXX      Se obtuvo  agregando Referencia", JSON.stringify(state.publicacionesMulti));
    },


    MUTSETRESPUESTADESARROLLO(state, response) {

        let pista = 'inicio';
        try {

            if (response.datos.rows) {
                let item = response.datos.rows;
                console.log("MUTSETRESPUESTADESARROLLO Registros ", item);

                state.desarrollo = {};
                let publicacion = {};

                try {
                    pista = 'p1';
                    let detalle = item[0].valor;

                    pista = 'ap1';
                    detalle = atob(detalle);
                    pista = 'ap2';
                    detalle = escape(detalle)

                    pista = 'ap3';
                    detalle = decodeURIComponent(detalle);

                    pista = 'ap4';
                    publicacion = JSON.parse(detalle);

                } catch (error) {

                    pista = 'ep1';
                    let detalle = item[0].valor;

                    pista = 'eap2';
                    detalle = atob(detalle);

                    pista = 'eap3';
                    publicacion = JSON.parse(detalle);

                }
                try {
                    if (publicacion.publicacion_padre && publicacion.link)
                        if (publicacion.publicacion_padre > 0)

                            publicacion.link = publicacion.link + "/" + publicacion.publicacion_padre


                } catch (error) {

                }

                // si trae imagenes o documentos 
                try {
                    console.log("MUTSETRESPUESTADESARROLLO CONTENIDO ", item[0].contenido);
                    if (item[0].contenido) {

                        console.log("MUTSETRESPUESTADESARROLLO CONTENIDO ", item[0].contenido);

                        pista = 'c1';
                        publicacion.documentos = [];

                        let contenidotxt = item[0].contenido;
                        console.log("contenidotxt", contenidotxt);

                        let contenido = "";
                        pista = 'c2';
                        try {
                            contenido = JSON.parse(contenidotxt);
                        } catch (error) {
                            contenido = contenidotxt;
                        }

                        pista = 'c3';

                        if (!(contenido instanceof Object)) {
                            try {
                                contenido = JSON.parse(contenido);
                            } catch (error) {

                            }

                        }

                        if (contenido instanceof Object) {


                            for (let i = 0; i < contenido.length; i++) {
                                pista = 'c4';
                                let documento = decodeURIComponent(escape(contenido[i].documento));

                                try {
                                    pista = 'c5';
                                    documento = window.atob(contenido[i].documento);
                                } catch (error) {}
                                pista = 'c6';

                                if (!(documento instanceof Object)) {
                                    try {
                                        documento = JSON.parse(documento);
                                    } catch (error) {

                                    }

                                }
                                console.log("DOCUMENTO INDIVIDUAL", documento)
                                pista = 'c7';

                                try {
                                    let ruta = "/bitweb/imagebank/" + documento.lote + "/" + documento.referencia + ".webp";

                                    if (documento.DocumentoMimeType.indexOf("image") != -1)

                                        ruta = state.raizUrl + "/bitweb/imagebank/" + documento.lote + "/" + documento.referencia + ".webp";
                                    else
                                        ruta = state.raizUrl + "/bitweb/imagebank/" + documento.lote + "/" + documento.referencia + documento.extension;

                                    documento.urlImg = ruta;


                                    if (documento.DocumentoMimeType.indexOf("image") != -1) {
                                        ruta = state.raizUrl + "/bitweb/imagebank/" + documento.lote + "/" + documento.referencia + "sl.webp";
                                        documento.urlImgsl = ruta;
                                    }


                                } catch (error) {
                                    console.log(error + "E1" + pista);
                                }

                                console.log("DOCUMENTO final", documento)
                                publicacion.documentos.push(documento);

                            }
                        } else
                            console.log(" cONTENIDO NO ES UN OJECTO", contenido);


                    } else
                        console.log("NO CONTENIDO");

                } catch (error) {
                    console.log(error + "Pista " + pista);
                }

                state.desarrollo = publicacion;

                console.log("desarrollo", publicacion);

            } else
                console.log("MUTSETRESPUESTASLIDER  No viene Rows ");
        } catch (error) {
            console.log(error + pista);
        }

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
    MUTSETRESPUESTAGENERICO(state, response) {
        try {
            state.selectQuery = JSON.parse(response)[0];

            //console.log("oracle");
        } catch (e) {
            state.selectQuery = response[0];

        }



        state.datosMsj = [];

    },

    MUTSETRESPUESTAGENERICONULL() {

        state.selectQuery = "";


    },


    MUTREGISTRAERROR(state, jsonError) {
        state.lastBdmsage = jsonError.msgError;
        state.lastBdmsgcode = jsonError.codigoError;

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
    }
}

export default mutations