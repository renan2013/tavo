/*=========================================================================================
  File Name: actions.js
  Description: Vuex Store - actions
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

import axios from 'axios';

import * as divilib from '@/divisoftlibs/utilDivisoftJS.js';

const actions = {
    // /////////////////////////////////////////////
    // COMPONENTS 
    // Vertical NavMenu
    updateVerticalNavMenuWidth({ commit }, width) {
        commit('UPDATE_VERTICAL_NAV_MENU_WIDTH', width);
    },

    // VxAutoSuggest
    updateStarredPage({ commit }, payload) {
        commit('UPDATE_STARRED_PAGE', payload);
    },

    // The Navbar
    arrangeStarredPagesLimited({ commit }, list) {
        commit('ARRANGE_STARRED_PAGES_LIMITED', list);
    },
    arrangeStarredPagesMore({ commit }, list) {
        commit('ARRANGE_STARRED_PAGES_MORE', list);
    },

    // /////////////////////////////////////////////
    // UI
    // /////////////////////////////////////////////

    toggleContentOverlay({ commit }) {
        commit('TOGGLE_CONTENT_OVERLAY');
    },
    updateTheme({ commit }, val) {
        commit('UPDATE_THEME', val);
    },

    // /////////////////////////////////////////////
    // User/Account
    // /////////////////////////////////////////////

    updateUserInfo({ commit }, payload) {
        commit('UPDATE_USER_INFO', payload);
    },
    updateUserRole({ dispatch }, payload) {
        // Change client side
        payload.aclChangeRole(payload.userRole);

        // Make API call to server for changing role

        // Change userInfo in localStorage and store
        dispatch('updateUserInfo', { userRole: payload.userRole });
    },
    // ////////////////////////////////////////////

    // DIVISOFT 
    /////////////////////////////////////////////////////////////
    async acDsoaPublicaciones({ dispatch, commit }, pet) {
        // geder generico
        // alert('carga Publicaciones');

        let headertxt = "";
        let filastxt = "";
        let paramtxt = "";

        console.log("llega aPublicaciones", JSON.stringify(pet))
        let header = {
            MODO: pet.dml,
            OBJECTID: pet.ObjectId,
            CREDENCIAL: pet.Credencial,
            USERNAME: pet.Username,
            REGISTROSXPAGINA: '200',
            PAGINA: '1'
        };

        // header en texto

        let origenUrl = 'O';
        // agrego las filas
        let filas = [];
        //agrega la categoria
        let parametros = [];
        let parametro1 = {};

        if (pet.categoria == 98) {
            parametro1 = {
                NOMBRE: 'num_publicacion',
                OPERADOR: '=',
                VALOR1: pet.publicacion,
                VALOR2: '',
                CDATA: '0'
            };
        } else
            parametro1 = {
                NOMBRE: 'id_categoria',
                OPERADOR: '=',
                VALOR1: pet.categoria,
                VALOR2: '',
                CDATA: '0'
            };

        parametros.push(parametro1);
        //entrega arreglo de parametros recibe texto de parametros

        headertxt = divilib.GetHeaderString(header);
        filastxt = "<Filas/>";
        paramtxt = divilib.paramArraytoStrintg(parametros);

        let petTxt = {
            header: headertxt,
            parametros: paramtxt,
            filas: filastxt
        };


        commit('MUTSETURL', 'O');
        //grava la peticion FILAS PARAMETROS Y HEADER
        commit('MUTSETPETICIONTXT', petTxt);


        // pedito generico
        let pedido = {

            dml: pet.dml,
            Credencial: pet.Credencial,
            ObjectId: pet.ObjectId,
            formatoenvio: pet.formatoenvio,
            formatorecibe: pet.formatorecibe,
            indicador: pet.categoria, // funcion de respueta unica  un solo valor
            origenUrl: pet.origenUrl

        };

        dispatch('acDsoaPHP2', pedido);
    },

    /////////////////////////////////////////////////////////////    

    /////////////////////////////////////////////////////////////
    async acDsoaPHP2({ dispatch, commit, state }, pet) {
        const datos = state.peticion;
        const url = state.urlDsoaPHP;

        //limpia mensaje error
        var jsonError = {
            codigoError: '',
            msgError: ''
        };
        commit('MUTREGISTRAERROR', jsonError);
        if (pet.Credencial == null)
            pet.Credencial = "223232sdadfsfsdsdgdsgdgdf";


        if (pet.Credencial == null || pet.ObjectId == null) {
            alert('adentro Con Error  credencial' + pet.Credencial + '  objeto ' + pet.ObjectId);
            console.log("peticion", pet);
            if (pet.Credencial == null)
                var jsonError = {
                    codigoError: '90',
                    msgError: 'Credencial Nulo'
                };

            if (pet.ObjectId == null)
                var jsonError = {
                    codigoError: '91',
                    msgError: 'Objeto BD no identificado'
                };

            commit('MUTREGISTRAERROR', jsonError);
        } else {
            var dsoaModel = {
                datos: datos,
                manipula: '',
                bd: '',
                dml: pet.dml,
                formato: pet.formatoenvio,
                formatoRequest: pet.formatorecibe,
                credencial: pet.credencial,
                tecnologia: '',
                datosJson: '',
                objectId: pet.ObjectId
            };

            console.log('acDsoaPHP2 ruta ' + url, JSON.stringify(dsoaModel));
            commit('MUTPROCESANDOTRUE');

            try {
                // fetch data from a url web service


                let res = await axios({
                        method: 'POST',
                        url,
                        headers: {
                            'content-type': 'application/json'
                        },
                        processData: false,
                        contentType: false,
                        mimeType: 'multipart/form-data',
                        sync: false,
                        crossDomain: true,
                        data: dsoaModel
                    })
                    .then((response) => {

                        commit('MUTSETPETICIONTXT', "");


                        commit('MUTPROCESANDOFALSE');
                        // console.log('PHPPHPPHPLARGO DE RESPUESTA  acDsoa', JSON.stringify(response.data));

                        //console.log('INDICADOR', pet.indicador);

                        //evalua el indicador
                        if (pet.indicador == 1 // isImagenes
                            ||
                            pet.indicador == 2 //   catVideos: 2 
                        ) {
                            //catImagenes: 1
                            commit('MUTSETRESPUESTAGRID', response.data); //carga variable con los datos
                            //llamo a un  funcion que llena los datos con las imagenes

                        }

                        if (pet.indicador == 5)
                            commit('MUTSETRESPUESTASLIDERM', response.data); //carga variable con los datos

                        if (pet.indicador == 6)
                            commit('MUTSETRESPUESTASLIDER', response.data); //carga variable con los datos

                        if (pet.indicador == 7)
                            commit('MUTSETRESPUESTASPUBCORTA', response.data); //carga variable con los datos


                        if (pet.indicador == 8)
                            commit('MUTSETRESPUESTAGENERICO', response.data);



                        if (pet.indicador == 98) //  PUBLICACION DESARROLLADA
                            commit('MUTSETRESPUESTADESARROLLO', response.data); //carga variable con los datos


                    })
                    .catch(function(error) {
                        console.log('PHPPHPPHPPHP');
                        commit('MUTSETPETICIONTXT', "");
                        commit('MUTPROCESANDOFALSE');
                        if (error.response) {
                            // Request made and server responded
                            console.log(error.response.data);
                            console.log(error.response.status);
                            console.log(error.response.headers);
                        } else if (error.request) {
                            // The request was made but no response was received
                            console.log(error.request);
                        } else {
                            // Something happened in setting up the request that triggered an Error
                            console.log('SE PRODUJO ERROR ' + error);
                        }
                    });
            } catch (error) {
                commit('MUTSETPETICIONTXT', "");
                commit('MUTPROCESANDOFALSE');
                console.log('PHPPHPPHPPHP ERROR ');
                alert(error); // catches both errors
            }
        }
    },

    async acQueryGenerico({ dispatch, commit }, pet) {
        // geder generico
        //  console.log('LLAMANDO GENERICO ', JSON.stringify(pet));
        let header = {
            MODO: pet.dml,
            OBJECTID: pet.ObjectId,
            CREDENCIAL: pet.Credencial,
            USERNAME: pet.Username,
            REGISTROSXPAGINA: '1',
            PAGINA: '1'
        };
        // header en texto

        let origenUrl = 'O';
        // agrego las filas
        let filas = [];
        filas.push({
            NOMBRE: pet.FilaRecupera,
            VALOR1: null,
            VALOR2: pet.FormatoFila,
            CDATA: '0'
        });
        // filas en texto

        var parametros = [];
        pet.parametros.forEach(function callback(item) {
            if (item.valor.length > 0) {
                var parametro1 = {
                    NOMBRE: item.nombre,
                    OPERADOR: '=',
                    VALOR1: item.valor,
                    VALOR2: '',
                    CDATA: '0'
                };
                parametros.push(parametro1);
            }
        });

        //entrega arreglo de parametros recibe texto de parametros
        let headertxt = divilib.GetHeaderString(header);
        let filastxt = divilib.filaArraytoStrintg(filas, 'N');
        let paramtxt = divilib.paramArraytoStrintg(parametros);

        let petTxt = {
            header: headertxt,
            parametros: paramtxt,
            filas: filastxt
        };
        commit('MUTSETURL', 'O');
        commit('MUTSETPETICIONTXT', petTxt);

        // pedito generico
        var pedido = {
            dml: pet.dml,
            Credencial: pet.Credencial,
            ObjectId: pet.ObjectId,
            formatoenvio: pet.formatoenvio,
            formatorecibe: pet.formatorecibe,
            indicador: pet.indicador, // funcion de respueta unica  un solo valor
            origenUrl: pet.origenUrl
        };
        console.log('LLAMANDO GENERICO pedido FIN  ', JSON.stringify(pedido));

        dispatch('acDsoaPHP2', pedido);
    },


    /////////////////////////////////////////////////////////////     
    async CMSacDsoaLimpia({ commit, state }, pet) {
        // console.log("limpiando la Peticion ", pet)
        commit('MUTSETDATOSDEFAULTCMS', pet);
    }
};

export default actions;