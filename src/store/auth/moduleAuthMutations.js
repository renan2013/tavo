/*=========================================================================================
  File Name: moduleAuthMutations.js
  Description: Auth Module Mutations
==========================================================================================*/
import CryptoJS from 'crypto-js'
import router from '@/router'

export default {

    MUTSETRESPUESTALOGIN(state, response) {
        //extrae el error
        var parser = new DOMParser();
        var error = parser.parseFromString(response.datos, "text/xml").getElementsByTagName("PV_ERROR")[0].childNodes[0].nodeValue;


        if (error == 0) {
            //extrae datos XMLRESPONSE
            var strData64 = response.datos.replace("<Response><XML_RESPONSE><![CDATA[<Sdt_profile>", "");
            var posicion = strData64.indexOf("</Sdt_profile>");
            strData64 = strData64.substring(0, posicion);


            var strData = JSON.parse(atob(strData64));
            try {

                state.profile[0] = strData.Sdt_profile;
                localStorage.setItem('profile', JSON.stringify(state.profile)); 
                //pantalla principal
 
                router.push(router.currentRoute.query.to || '/')

            } catch (e) {
                console.log("error", e);
            }
        } else
            state.errorProfile = error;

    },

    MUTSETRESPUESTACAMBIO(state, response) {
        //extrae el error
        var parser = new DOMParser();
        var error = parser.parseFromString(response.datos, "text/xml").getElementsByTagName("PV_ERROR")[0].childNodes[0].nodeValue;


        if (error == 0) {

            //extrae datos XMLRESPONSE
            var strData64 = response.datos.replace("<Response><XML_RESPONSE><![CDATA[<Sdt_profile>", "");
            var posicion = strData64.indexOf("</Sdt_profile>");
            strData64 = strData64.substring(0, posicion);
            var strData = JSON.parse(atob(strData64));

            try {
                state.profile[0] = strData.Sdt_profile;

                state.errorProfile = "0"

                router.push("/pages/procesoExitoso")




            } catch (e) {
                console.log("error", e);
            }
        } else {
            state.errorProfile = error;

        }


    },

    MUTSETRESPUESTALOGINU(state, response) {
        //extrae el error

        var parser = new DOMParser();
        var error = parser.parseFromString(response.datos, "text/xml").getElementsByTagName("PV_ERROR")[0].childNodes[0].nodeValue;

        if (error == 0) {

            //extrae datos XMLRESPONSE
            var strData64 = response.datos.replace("<Response><XML_RESPONSE><![CDATA[<Sdt_profile>", "");
            var posicion = strData64.indexOf("</Sdt_profile>");
            strData64 = strData64.substring(0, posicion);

            var strData = JSON.parse(atob(strData64));

            try {

                state.profile = strData.Sdt_profile;

            } catch (e) {
                console.log("error", e);
            }
        } else
            state.errorProfile = error;

    },
    MUTSETRESPUESTALOGINR(state, response) {
        //extrae el error
        //console.log('EN MUTACION MUTSETRESPUESTALOGINR', response)



        var parser = new DOMParser();
        var error = parser.parseFromString(response.datos, "text/xml").getElementsByTagName("PV_ERROR")[0].childNodes[0].nodeValue;

        if (error == 0) {

            //extrae datos XMLRESPONSE
            var strData64 = response.datos.replace("<Response><XML_RESPONSE><![CDATA[<Sdt_profile>", "");
            var posicion = strData64.indexOf("</Sdt_profile>");
            strData64 = strData64.substring(0, posicion);



            var strData = JSON.parse(atob(strData64));

            console.log('EN MUTACION MUTSETRESPUESTALOGINR', strData)

            try {

                state.profile = strData.Sdt_profile;



            } catch (e) {
                console.log("error", e);
            }
        } else
            state.errorProfile = error;

    },

    // para cambio de clvae

    MUTSETCLEANTOKEN(state) {
        state.tokenStore = [];
    },
    MUTSETCLAVECONTROL(state, claveControl) {
        state.claveCambioClave = claveControl;
    },
    MUTSETPUBLICIP(state, myPublicIP) {
        state.myPublicIP = myPublicIP;
    },
    MUTSETENCRIPTA(state, texto) {
        state.respuestaEncriptado = texto;
    },

    MUTSETPROFILE(state, profile) {
        console.log("llego el profile", JSON.stringify(profile));
        state.profile[0] = profile;

        console.log("CARGADO", JSON.stringify(state.profile[0]));

    },
    MUTSETTOKEN(state, token) {

        state.tokenStore = token;

        state.token = token[0].tokenCHAT;
    },

    MUTSETURL(state, indicadorUrl) {
        //ASIGNA EL URL 
        if (indicadorUrl == "O")
            state.urlDsoa = "http://201.194.194.84:8998/DsoaService2/dsoa/request";

        if (indicadorUrl == "P")
            state.urlDsoa = "http://192.168.0.28:8989/dsoaPHP/dsoaPHP/dsoa/";
    },

    MUTSETPETICIONTXT(state, pettxt) {

        // empaquete la peticion 
        state.peticion = "<SOA_Xml>";
        state.peticion += pettxt.header;
        state.peticion += pettxt.parametros;
        state.peticion += pettxt.filas;
        state.peticion += "</SOA_Xml>";
    },

    ///////////// PARA CHAT PARA CHAT PARA CHAT PARA CHAT 

    MUTSETUSER(state, data) {
        state.token = data;
        localStorage.setItem('token2', data);
    },

    MUTSETCLEARTOKEN(state) {
        state.token = "";
        localStorage.setItem('token2', "");
    },
    logout(state) {
        state.token = null;
    },
    MUTLOGOUTCHAT(state) {
        console.log("chat queda NULO")
        state.token = null;
    },



    MUTSETRESPUESTALOGINCHAT(state, response) {
        //extrae el error
        //tomo el token

        let token = response;


        const key = '82f2ceed4c503896c8a291e560bd4325' // change to your key
        const iv = 'sinasinasisinaaa' // change to your iv
            // lo encripto

        const cipher = CryptoJS.AES.encrypt(token, CryptoJS.enc.Utf8.parse(key), {
                iv: CryptoJS.enc.Utf8.parse(iv),
                mode: CryptoJS.mode.CBC
            })
            // adicion encriptado    

        let tokenStore = [{
            tokenAPIBOOT: "0",
            tokenCHAT: cipher.toString(),
            tokenCMS: "0",
            tokenCLOUD: "0",
        }]

        state.tokenStore = tokenStore;
        //state.tokenStore[0].tokenCHAT = cipher.toString();
        // guardo el token store 
        let tokens = JSON.stringify(state.tokenStore);
        localStorage.setItem('tokenStore', tokens);

        // intenta conectar  




    },


}