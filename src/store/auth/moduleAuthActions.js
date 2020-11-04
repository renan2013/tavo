/*=========================================================================================
 File Name: moduleAuthActions.js
 Description: Auth Module Actions
==========================================================================================*/
import axios from 'axios';
import Vue from "vue";
export default {


    /// llama a Solicitud de Datos 
    async acLoginDsoa({ dispatch, commit, state }, pet) {

        const datos = state.peticion;
        const url = state.urlDsoa;

        state.errorProfile = "0";

        if (datos == null || datos == "")
            alert("Peticion va Nula");



        var dsoaModel = {
            datos: datos,
            manipula: "",
            bd: "",
            dml: pet.dml,
            formato: pet.formatoenvio,
            formatoRequest: pet.formatorecibe,
            credencial: pet.credencial,
            tecnologia: "",
            datosJson: "",
            objectId: pet.ObjectId,
        };

        //console.log('DSOAMODEL2: ' + JSON.stringify(dsoaModel));

        // LIMPIO EL TOKEN 
        commit('MUTSETCLEARTOKEN');

        try {
            // fetch data from a url web service
            let res = await axios({
                    method: 'POST',
                    url,
                    headers: { "content-type": "application/json", },
                    "processData": false,
                    "contentType": false,
                    "mimeType": "multipart/form-data",
                    "sync": false,
                    "crossDomain": true,
                    "data": dsoaModel
                })
                .then((response) => {

                    let tipoLogin = pet.tipoLogin;

                    // console.log("RESPONSE", JSON.stringify(response.data) + "    " + tipoLogin);

                    if (tipoLogin == "L") //ñpgom 
                    {
                        let pista = "";
                        commit('MUTSETRESPUESTALOGIN', response.data);
                        try {

                            pista = "DOMPARSERS "
                            var parser = new DOMParser();
                            var error = parser.parseFromString(response.data.datos, "text/xml").getElementsByTagName("PV_ERROR")[0].childNodes[0].nodeValue;
                            if (error == 0) {
                                //extrae datos XMLRESPONSE
                                var strData64 = response.data.datos.replace("<Response><XML_RESPONSE><![CDATA[<Sdt_profile>", "");
                                var posicion = strData64.indexOf("</Sdt_profile>");
                                strData64 = strData64.substring(0, posicion);
                                var strData = JSON.parse(atob(strData64));
                                try {
                                    state.profile[0] = strData.Sdt_profile;
                                    if (state.profile[0].Credencial == "" || state.profile[0].Credencial == null) {
                                        state.profile[0].Credendial = response.data.credencial;
                                    }
                                    let credencialFinal = (state.profile[0].Credencial > "") ? state.profile[0].Credencial : response.data.credencial;

                                    //llama conectar  el Chat 

                                    let peticion = {
                                        password: strData.Sdt_profile.Username,
                                        username: strData.Sdt_profile.Username,
                                        Credencial: strData.Sdt_profile.Credencial,

                                        NumUsuario: strData.Sdt_profile.num_user,

                                        NumEmpresa: strData.Sdt_profile.Empresa,

                                        frase: "frase que lo identifica2",
                                        photoURL: strData.Sdt_profile.Avatar,
                                        displayName: strData.Sdt_profile.Nombre
                                    }
                                    pista = "PASO5 "
                                    dispatch('acLoginChat', peticion);



                                } catch (e) {
                                    console.log("error", e);
                                }
                            } else
                                state.errorProfile = error;

                        } catch (error) {
                            console.log("Error CONECTANDO CHAT ", error + pista)
                        }

                        //

                    }


                    if (tipoLogin == "U")
                        commit('MUTSETRESPUESTALOGINU', response.data);

                    //  REGISTRO Y RECUPERAR    
                    if (tipoLogin == "R" || tipoLogin == "I") {

                        commit('MUTSETRESPUESTALOGINR', response.data);
                    }

                    //CAMBIAR CLAVE
                    if (tipoLogin == "C")
                        commit('MUTSETRESPUESTACAMBIO', response.data);


                    /**
                         LN_WKLOGIN            NUMBER := 1;  -- LOGIN   VAL_OBJ_LOGIN.PC_ACTION = 'L'
                             THEN
                           
                          LN_WKCPASRECUPERA             NUMBER := 2;  -- CAMBIA EL PASSWORD POR RECUPERACON   = 'R'    
                            
                          LN_WKLOGOUT           NUMBER := 3;  -- QUITA EL LOGIN  LIMPIA SESIONES  
                          
                          LN_WKCPAS             NUMBER := 4;  -- CAMBIA EL PASSWORD
                          -- Despues de que pide   recuperar clave
                          LN_WKFLOGIN           NUMBER := 5; --  =F
                          -- verifica si el pass es el del mismo o exite solo para autorizaciones
                          LN_WKVERICACLAVEYUSUARIO           NUMBER := 6;  V
                          
                          LN_RECUPERA_CLAVE NUMBER:=7; -- PARA REUPERAR CLAVE  R
                          
                          LN_WKREGISTRO      NUMBER := 8;  -- REGISTRO   I
                          
                          LN_WKVERIFICASUARIO      NUMBER := 9;  -- VERIFICA SOLO USUARIO   Y DEVUELVE DATOS BASICOS 
                          
                     * / */

                })
                .catch(function(error) {
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
                        console.log("SE PRODUJO ERROR " + error);
                    }
                });

        } catch (error) {
            alert(error); // catches both errors
        }

    },



    /// RECUPERA LA IP PUBLICA
    async acLoginGetip({ commit, state }) {
        let url = "https://api.ipify.org?format=json";
        try {
            // fetch data from a url web service
            let res = await axios({
                    method: 'GET',
                    url,
                    headers: { "content-type": "application/json", }
                })
                .then((response) => {
                    commit('MUTSETPUBLICIP', response.data.ip);
                    //commit('MUTSETRESPUESTALOGIN', response.data);

                })
                .catch(function(error) {

                    console.log("ERROR3 IP ERROR", error);
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
                        console.log("SE PRODUJO ERROR " + error);
                    }
                });

        } catch (error) {
            alert(error); // catches both errors
        }

    },

    /// llama a Solicitud de Datos 
    async acLoginEncripta({ dispatch, commit, state }, textoEncriptar) {
        let url = state.urlEncripta;

        //alert(url);

        {
            // fetch data from a url web service
            let res = await axios({
                    method: 'POST',
                    url,
                    headers: { "content-type": "text/plain", },
                    "processData": false,
                    "contentType": false,
                    "mimeType": "multipart/form-data",
                    "sync": false,
                    "crossDomain": true,
                    "data": textoEncriptar
                })
                .then((response) => {

                    commit('MUTSETENCRIPTA', response.data);

                })
                .catch(function(error) {
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
                        console.log("SE PRODUJO ERROR " + error);
                    }
                });

        }


    },

    ////////////////////////////////////////////////// CHAT CHAT CHAT CHAT CHAT 

    logout: async({ commit }) => {
        await commit('dsoaLogin/logout', null, { root: true });
        await Vue.prototype.$rootBus.$emit("routerPush", { name: "Login", params: {} });
    },


    ////   LOGIN CHAT LOGIN CHAT  LOGIN CHAT LOGIN CHAT LOGIN CHAT 

    async acLoginChat({ dispatch, commit, state }, pet) {
        ///loginDsoa

        let pista = "inicio";



        commit('MUTSETCLEARTOKEN');

        const url = state.urlApiChat + "/loginDsoa";

        pista = url;

        //alert("CONECTANDO AL CHAT" + pista);

        //alert(url)
        try {
            // fetch data from a url web service
            let res = await axios({
                    method: 'POST',
                    url,
                    headers: { "content-type": "application/json", },
                    "processData": false,
                    "contentType": false,
                    "mimeType": "multipart/form-data",
                    "sync": false,
                    "crossDomain": true,
                    "data": pet
                })
                .then((response) => {
                    pista = "respondio ";

                    console.log("Respuesta LOGIN CHAT", JSON.stringify(response.data.token))

                    pista = "MUTSETUSER Asignando token";
                    commit('MUTSETUSER', response.data.token);

                    // lo guarda en la bodega de Tokens
                    commit('MUTSETRESPUESTALOGINCHAT', response.data.token);

                })
                .catch(function(error) {
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
                        console.log("SE PRODUJO ERROR " + error + "   " + pista);
                    }
                });

        } catch (error) {
            console.log("ERROR2", error);
        }

    },




}