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


var vp = new Vue({
    el: '#appcontrol',

    created: function() {
        console.log("ini");
    },

    data: {
        a: 1,
        user: "KATE",
        iframe_item: "prueba1.html"
    },

    methods: {

        cargarMenu: function(option) {

            this.iframe_item = option;

        }
    }
});