/*=========================================================================================
  File Name: moduleEcommerceActions.js
  Description: Ecommerce Module Actions
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/
import axios from 'axios';
import router from '@/router';
import * as divilib from '@/divisoftlibs/utilDivisoftJS.js';

export default {
    // agrega a mis deseos 
    // cuarda local y bd  wish
    toggleItemInWishList({ dispatch, state, commit }, item) {

        let profile = item.profile;
        delete item.profile;
        const index = state.wishList.findIndex(i => i.objectID === item.objectID)



        // lo agrega a deseos 
        commit('TOGGLE_ITEM_IN_WISH_LIST', item)
            // guarda en base datos el deseo 
        let headertxt = "";
        let dml = "I";
        if (index == 0)
            dml = "D";

        if (index == -1)
            dml = "I";

        // alert(" esta " + item.objectID + " " + index + " accion " + dml);

        let origenUrl = "O";
        let header = {
            MODO: dml,
            OBJECTID: "2545",
            CREDENCIAL: profile.Credencial,
            USERNAME: profile.Username,
            REGISTROSXPAGINA: "0",
            PAGINA: "0",
            ORDERBY: ""
        };
        headertxt = divilib.GetHeaderString(header);
        //console.log("heder CARRITO", headertxt);

        // AGREGO LAS FILAS 


        let filastxt = "<Filas>"
        filastxt += "<FilaItem><Nombre>COD_CLIENTE</Nombre><Valor>" + profile.num_user + "</Valor></FilaItem>";
        filastxt += " <FilaItem><Nombre>COD_PATNER</Nombre><Valor>5069</Valor></FilaItem>";
        filastxt += " <FilaItem><Nombre>COD_PRODUCTO</Nombre><Valor>" + item.objectID + "</Valor></FilaItem>";

        filastxt += "</Filas>";
        let paramtxt = "<Param/>";

        //console.log("Filas carrito CARRITO", filastxt);

        // cargo la peticion texto
        var petTxt = {
            header: headertxt,
            parametros: paramtxt,
            filas: filastxt
        };

        commit("MUTSETURL", "O");
        commit("MUTSETPETICIONTXT", petTxt);

        console.log("Filas carrito CARRITO", petTxt);


        var pedido = {
            dml: "I", // LLAMA A BUSCAR PRODUCTOS
            Credencial: profile.Credencial,
            ObjectId: "2545",
            formatoenvio: "N",
            formatorecibe: "N",
            indicador: 4, // wish
            origenUrl: origenUrl
        };

        //llamo a insertar 
        dispatch('acDsoa', pedido);




    },

    toggleItemInCart({ getters, commit, dispatch }, item) {


        let profile = item.profile;


        if (getters.isInCart(item.objectID)) {
            delete item.profile;

            commit("eCommerce/MUTSETPETICIONTXT", "");
            let headertxt = "";

            let origenUrl = "O";
            let header = {
                MODO: "D",
                OBJECTID: "2546",
                CREDENCIAL: profile.Credencial,
                USERNAME: profile.Username,
                REGISTROSXPAGINA: "0",
            };
            headertxt = divilib.GetHeaderString(header);
            // AGREGO LAS FILAS 
            let filastxt = "<Filas>"
            filastxt += "<FilaItem><Nombre>COD_CLIENTE</Nombre><Valor>" + profile.num_user + "</Valor></FilaItem>";
            filastxt += " <FilaItem><Nombre>COD_PATNER</Nombre><Valor>5069</Valor></FilaItem>";
            filastxt += " <FilaItem><Nombre>COD_PRODUCTO</Nombre><Valor>" + item.objectID + "</Valor></FilaItem>";

            filastxt += "</Filas>";
            let paramtxt = "<Param/>";
            // cargo la peticion texto
            var petTxt = {
                header: headertxt,
                parametros: paramtxt,
                filas: filastxt
            };
            commit("MUTSETPETICIONTXT", petTxt);

            var pedido = {
                dml: "D", // LLAMA A BUSCAR PRODUCTOS
                Credencial: profile.Credencial,
                ObjectId: "2546",
                formatoenvio: "N",
                formatorecibe: "N",
                indicador: 5, //AGREGA A CARRITO
                origenUrl: origenUrl
            };

            //llamo a BORRAR
            dispatch('acDsoa', pedido);

        } else {

            dispatch('additemInCart', item);
        }

        getters.isInCart(item.objectID) ? commit('REMOVE_ITEM_FROM_CART', item) : dispatch('additemInCart', item)
    },

    additemInCart({ dispatch, state, commit }, item) {
        let profile = item.profile;
        delete item.profile;


        commit("eCommerce/MUTSETPETICIONTXT", "");
        let headertxt = "";

        // Below properties should be added as per requirement from back-end
        // This is added just for demo purpose
        item['quantity'] = 1
        item['discount_in_percentage'] = 5
        item['offers_count'] = 2
        item['delivery_date'] = new Date(new Date().getTime()).toDateString()
            // agrega el carrito a la variable de carrito de la STATE
        commit('ADD_ITEM_IN_CART', item)

        let adicionalCar = '"quantity": 1,"discount_in_percentage":5,"offers_count":2,"delivery_date":"' + new Date(new Date().getTime()).toDateString() + '"';

        let origenUrl = "O";
        let header = {
            MODO: "I",
            OBJECTID: "2546",
            CREDENCIAL: profile.Credencial,
            USERNAME: profile.Username,
            REGISTROSXPAGINA: "0",
            PAGINA: "0",
            ORDERBY: ""
        };
        headertxt = divilib.GetHeaderString(header);

        console.log("heder CARRITO", headertxt);

        // AGREGO LAS FILAS 


        let filastxt = "<Filas>"
        filastxt += "<FilaItem><Nombre>COD_CLIENTE</Nombre><Valor>" + profile.num_user + "</Valor></FilaItem>";
        filastxt += " <FilaItem><Nombre>COD_PATNER</Nombre><Valor>5069</Valor></FilaItem>";
        filastxt += " <FilaItem><Nombre>COD_PRODUCTO</Nombre><Valor>" + item.objectID + "</Valor></FilaItem>";

        filastxt += "<FilaItem><Nombre>CAN_ITEM</Nombre><Valor>" + 1 + "</Valor></FilaItem>";
        filastxt += " <FilaItem><Nombre>POR_DESCUENTO</Nombre><Valor>5069</Valor></FilaItem>";
        filastxt += " <FilaItem><Nombre>CAN_OFERTA</Nombre><Valor>" + 1 + "</Valor></FilaItem>";
        //filastxt += " <FilaItem><Nombre>FEC_ENTREGA</Nombre><Valor>" + adicionalCar.delivery_date + "</Valor></FilaItem>";

        filastxt += " <FilaItem><Nombre>PRODUCTO_JSON</Nombre><Valor>" + adicionalCar + "</Valor></FilaItem>";

        filastxt += "</Filas>";
        let paramtxt = "<Param/>";

        console.log("Filas carrito CARRITO", filastxt);

        // cargo la peticion texto
        var petTxt = {
            header: headertxt,
            parametros: paramtxt,
            filas: filastxt
        };

        commit("MUTSETURL", "O");
        commit("MUTSETPETICIONTXT", petTxt);

        console.log("Filas carrito CARRITO", petTxt);


        var pedido = {
            dml: "I", // LLAMA A BUSCAR PRODUCTOS
            Credencial: profile.Credencial,
            ObjectId: "2546",
            formatoenvio: "N",
            formatorecibe: "N",
            indicador: 5, //AGREGA A CARRITO
            origenUrl: origenUrl
        };

        //llamo a insertar 
        dispatch('acDsoa', pedido);


    },
    updateItemQuantity({ commit }, payload) {
        commit('UPDATE_ITEM_QUANTITY', payload)
    },


    //  DIVISOFT  DIVISOFT  DIVISOFT  DIVISOFT  DIVISOFT  DIVISOFT  DIVISOFT  DIVISOFT  DIVISOFT 
    /// llama a Solicitud de Datos
    async acDsoa({ commit, state }, pet) {

        //alert("ecomerce DESOA");

        const datos = state.peticion;
        const url = state.urlDsoa;
        //console.log("peticion ", JSON.stringify(pet))
        //alert("ecomerce DESOA" + url);
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


            commit('MUTPROCESANDOTRUE');

            try {

                // fetch data from a url web service
                //alert("ecomerce DESOA222 " + url);
                //console.log("pidiendo ", JSON.stringify(dsoaModel))

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


                        if (pet.indicador == 1 || pet.indicador == 2 || pet.indicador == 3 ||
                            pet.indicador == 9 ||
                            pet.indicador == 10) {

                            if (
                                response.data.codigoerror == '2000' // No AUTORIZADO  Enviar  login
                            )

                            //router
                                router.push('/pages/login').catch(() => {});
                            else {
                                console.log('INDICADOR', pet.indicador);
                                response.data['indicador'] = pet.indicador

                                //console.log('LARGO DE RESPUESTA  acDsoa', response.data.datos);

                                commit('MUTSETRESPUESTAE', response.data); //carga variable con los datos
                            }

                        }


                        //Inserta carrito
                        if (pet.indicador == 5) {
                            // llena un grid
                            if (
                                response.data.codigoerror == '2000' // No AUTORIZADO  Enviar  login
                            )

                            //router
                                router.push('/pages/login').catch(() => {});
                            else {
                                console.log('INDICADOR', pet.indicador);
                                //console.log('LARGO DE RESPUESTA  acDsoa', response.data.datos);
                                commit('MUTSETRESPUESTAGRID', response.data); //carga variable con los datos
                            }
                        }

                        //Inserta lista de deseos
                        if (pet.indicador == 4) {
                            // llena un grid
                            if (
                                response.data.codigoerror == '2000' // No AUTORIZADO  Enviar  login
                            )

                            //router
                                router.push('/pages/login').catch(() => {});
                            else {
                                console.log('INDICADOR', pet.indicador);
                                //console.log('LARGO DE RESPUESTA  acDsoa', response.data.datos);
                                commit('MUTSETRESPUESTAGRID', response.data); //carga variable con los datos
                            }
                        }

                        //evalua el indicador
                        if (pet.indicador == 2) {
                            // llena un grid
                            if (
                                response.data.codigoerror == '2000' // No AUTORIZADO  Enviar  login
                            )

                            //router
                                router.push('/pages/login').catch(() => {});
                            else {
                                console.log('INDICADOR', pet.indicador);
                                //console.log('LARGO DE RESPUESTA  acDsoa', response.data.datos);
                                commit('MUTSETRESPUESTAGRID', response.data); //carga variable con los datos
                            }
                        }



                        if (pet.indicador == 8) {
                            //  query de respuesta Unica
                            // console.log("Enviando a MUTSETRESPUESTAE", JSON.stringify(response.data));
                            commit('MUTSETRESPUESTAGENERICO', response.data);
                        }

                        //MUTSETRESPUESTAGENERICO
                    })
                    .catch(function(error) {
                        alert("error1");
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
                alert("error2" + error);
                commit('MUTPROCESANDOFALSE');

            }
        }
    },


    ///  MULTIMEDIA MULTIMEDIA  MULTIMEDIA MULTIMEDIA  MULTIMEDIA MULTIMEDIA  MULTIMEDIA MULTIMEDIA  MULTIMEDIA MULTIMEDIA
    async CMSacDsoa({ commit, state }, pet) {
        if (pet.Credencial == null) {
            if (pet.Credencial == null) var jsonError = { codigoError: '90', msgError: 'Credencial Nulo CMSacDsoa' };


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

                        console.log('imagen', data.RutaDestino);

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
                console.log("ERROR 3", error)
            }
        }
    },

    async CMSacDsoaLimpia({ commit, state }, pet) {
        // console.log("limpiando la Peticion ", pet)
        commit('MUTSETDATOSDEFAULTCMS', pet);
    }
}