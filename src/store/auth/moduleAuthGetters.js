/*=========================================================================================
  File Name: moduleAuthGetters.js
  Description: Auth Module Getters
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


export default {

    user(state) {
        if (!state.token) return null;
        const base64Url = state.token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    },

    buscaRolMensajeria: state => {
        if (state.profile[0])
            return state.profile[0].Roles.indexOf("TAVO_MENSAJERIA");
        else
            return -1;
    },

    buscaRolVisitante: state => {
        if (state.profile[0].Roles)
            return state.profile[0].Roles.indexOf("VISITANTE");
        else
            return -1;
    },

    buscaRol: state => rolName => {
        if (state.profile[0].Roles)
            return state.profile[0].Roles.indexOf(rolName);
        else
            return -1;
    },

    /*
        buscaRol: state => rolName => ({
            if (state.profile[0]) {
                if (state.profile[0].Roles.indexOf(rolName) != -1)
                    return 1;
                else
                    return 0;
            } else
                return 0;
        })
        */
}