/*=========================================================================================
  File Name: actions.js
  Description: Vuex Store - actions
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/
import axios from 'axios';
import router from '@/router';
import * as divilib from '@/divisoftlibs/utilDivisoftJS.js';

const actions = {
    // /////////////////////////////////////////////
    // COMPONENTS
    // /////////////////////////////////////////////

    // Vertical NavMenu
    pruebaContext({ rootState }, width) {
        console.log(" PRUEBA DE CONTEXT ", rootState.mainLayoutType);

    },


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

    // Para llamar datos basicos del Usuario
    async acDivisoftCloud({ dispatch, state, commit }, pet) {
        //carga los datos  de la nube
        // geder generico
        console.log('PROFILE EN NUBE ', JSON.stringify(state.dsoaLogin.profile[0]));
        let profile = state.dsoaLogin.profile[0];

        let header = {
            MODO: 'E',
            OBJECTID: '78',
            CREDENCIAL: profile.Credencial,
            USERNAME: profile.Username,
            REGISTROSXPAGINA: '1',
            PAGINA: '1'
        };
        // header en texto

        let origenUrl = 'O';
        let parametros = [];
        // agrego las filas
        let filas = [];

        let parametro1 = {
            NOMBRE: 'PV_CODUSUARIO',
            OPERADOR: '=',
            VALOR1: profile.Username,
            VALOR2: '',
            CDATA: '0'
        };
        parametros.push(parametro1);

        parametro1 = {
            NOMBRE: 'PV_CREDENCIAL',
            OPERADOR: '=',
            VALOR1: profile.Credencial,
            VALOR2: '',
            CDATA: '0'
        };
        parametros.push(parametro1);

        //entrega arreglo de parametros recibe texto de parametros
        let headertxt = divilib.GetHeaderString(header);
        let filastxt = '<Filas/>';
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
            dml: 'E',
            Credencial: profile.Credencial,
            ObjectId: '78',
            formatoenvio: 'N',
            formatorecibe: 'N',
            indicador: 9, // funcion de respueta unica  un solo valor
            origenUrl: state.urlDsoa
        };
        console.log('LLAMANDO GENERICO pedido FIN  ', JSON.stringify(pedido));

        dispatch('acDsoa', pedido);
    },

    async acQueryGenerico({ dispatch, commit }, pet) {
        // geder generico
        console.log('LLAMANDO GENERICO ', JSON.stringify(pet));
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

        dispatch('acDsoa', pedido);
    },

    // ////////////////////////////////////////////
    // DIVISOFT
    // ////////////////////////////////////////////

    /// llama a Solicitud de Datos
    async acDsoa({ commit, state }, pet) {
        const datos = state.peticion;
        const url = state.urlDsoa;
        //console.log("peticion ", JSON.stringify(pet))

        //limpia mensaje error
        var jsonError = { codigoError: '', msgError: '' };
        commit('MUTREGISTRAERROR', jsonError);

        if (pet.Credencial == null || pet.ObjectId == null) {
            alert('adentro Con Error  credencial' + pet.Credencial + '  objeto ' + pet.ObjectId);

            if (pet.Credencial == null) var jsonError = { codigoError: '90', msgError: 'Credencial Nulo' };

            if (pet.ObjectId == null) var jsonError = { codigoError: '91', msgError: 'Objeto BD no identificado' };

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



            //console.log('LLAMANDO DSOA ' + JSON.stringify(dsoaModel));
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
                        commit('MUTPROCESANDOFALSE');
                        let data = response.data;

                        try {
                            if (data)
                                console.log('LARGO DE RESPUESTA  acDsoa', data.length);

                        } catch (error) {
                            console.log("no encontro o recupero datos");
                            data = [];
                        }

                        //console.log('LARGO DE RESPUESTA  acDsoa', JSON.stringify(response.data));

                        //console.log('INDICADOR', pet.indicador);

                        //evalua el indicador
                        if (pet.indicador == 1) {
                            // llena un grid
                            if (
                                response.data.codigoerror == '2000' // No AUTORIZADO  Enviar  login
                            )
                            //router
                                router.push('/pages/login').catch(() => {});
                            else commit('MUTSETRESPUESTAGRID', data); //carga variable con los datos
                        }

                        if (
                            pet.indicador == 2 //llena un registro unico para edicion
                        )
                            commit('MUTSETRESPUESTAFORM', data);

                        if (
                            pet.indicador == 3 // respuesta de Base datos para INSERT,DELETE,UPDATE
                        )
                            commit('MUTSETRESPUESTACRUD', data);

                        if (
                            pet.indicador == 4 // respuesta de Base datos para EXECUTE
                        )
                            commit('MUTSETRESPUESTACRUD', data);

                        console.log('procesando indicador ', pet.indicador);

                        if (
                            pet.indicador == 5 // respuesta de Base datos para EXECUTE
                        )
                            commit('MUTSETRESPUESTAPROMPT', data);

                        if (pet.indicador == 7) {
                            // respuesta procedimiento Almacenado
                            // console.log("Enviando a MUTSETRESPUESTAE", JSON.stringify(response.data));
                            commit('MUTSETRESPUESTAE', data);
                        }
                        if (pet.indicador == 8) {
                            //  query de respuesta Unica
                            // console.log("Enviando a MUTSETRESPUESTAE", JSON.stringify(response.data));
                            commit('MUTSETRESPUESTAGENERICO', data);
                        }
                        if (pet.indicador == 9) {
                            //  DATOS CLOUD
                            // console.log("Enviando a MUTSETRESPUESTAE", JSON.stringify(response.data));
                            commit('MUTSETRESPUESTACLOUD', data);
                        }
                        //MUTSETRESPUESTAGENERICO
                    })
                    .catch(function(error) {
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
                commit('MUTPROCESANDOFALSE');
                alert(error); // catches both errors
            }
        }
    },

    ///  MULTIMEDIA MULTIMEDIA  MULTIMEDIA MULTIMEDIA  MULTIMEDIA MULTIMEDIA  MULTIMEDIA MULTIMEDIA  MULTIMEDIA MULTIMEDIA
    async CMSacDsoa({ commit, state }, pet) {
        if (pet.Credencial == null) {
            if (pet.Credencial == null) var jsonError = { codigoError: '90', msgError: 'Credencial Nulo CMSacDsoa' };

            alert(' fallo axios');
            commit('MUTREGISTRAERROR', jsonError);
        } else {
            commit('MUTSETDATOSDEFAULTCMS', divilib.DataCMS[0]);

            const url = state.urlDsoaCMS;
            commit('MUTPROCESANDOTRUE');
            try {
                // fetch data from a url web service

                let CMSres = await axios({
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
                        data: pet
                    })
                    .then((response) => {
                        commit('MUTPROCESANDOFALSE');

                        console.log('LARGO DE RESPUESTA  CMSacDsoa  ', JSON.stringify(response.data).length);
                        // console.log("LARGO DE RESPUESTA  CMSacDsoa  ", JSON.stringify(response.data));

                        let data = response.data.datos;
                        // console.log("imagen", data.RutaDestino)
                        if (!divilib.isObject(data)) data = JSON.parse(response.data.datos);

                        console.log('imagen Llego ');

                        commit('MUTSETDATA', data);
                    })
                    .catch(function(error) {
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
                commit('MUTPROCESANDOFALSE');
                alert(error); // catches both errors
            }
        }
    },

    async CMSacDsoaLimpia({ commit, state }, pet) {
        // console.log("limpiando la Peticion ", pet)
        commit('MUTSETDATOSDEFAULTCMS', pet);
    }
};

export default actions;