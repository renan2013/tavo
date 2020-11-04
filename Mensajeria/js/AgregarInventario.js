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

//////////  MANTENIMIENTO
var vc = new Vue({
  el: '#addInventario',

  created: function () {
     if (this.getParameterByName('dist') != null) {
        var COD_BARRA = this.getParameterByName('dist');
        this.dml = "U"
        this.isReadOnly = true,
        this.buscarPorCodigo(COD_BARRA);
     }
  },

  data: {
     peticion: [],
     campos: [],
     //

     user: "Ademar",
     dml: "I",

     camposInventarios: [],

     listaInventario: {
        ROWID: "",
        COD_BARRA: "",
        DESTINO: "",
        EMPACADOR: "N",
        RECIBIDO: "N",
        DIA_SALIDA:  moment().format('YYYY-MM-DD'),
        DIA_ENTREGA:  moment().format('YYYY-MM-DD'),
        CANTIDAD: "",
        COMENTARIO: "",
        TIPO: "POr ingresar",
        ORDEN: "",
        SERVICE_TAGS: "",
     },

     isReadOnly:false,
     
      //watch
      valorBuscar: "",
      notas: "",

  },

  watch: {
      // cuando 'valorBuscar' cambie, se ejecutará esta función
      valorBuscar: function (nuevoValor) {
         this.notas = 'Ingrese el valor a buscar...'
         this.getBusquedaCodigo()
      },
   },

  methods: {

   getBusquedaCodigo: _.debounce(
      function () {

         if (this.valorBuscar == "") {
            this.listaInventario = {}
            this.isReadOnly = false;
            this.notas = ''
        
            return
         }

         if (_.size(this.valorBuscar) < 5) {
            this.notas = 'Ingrese más valores'
            return
         }

         this.buscarPorCodigo(this.valorBuscar);
      },
      // Este es el número de milisegundos que esperamos a que el usuario termine de tipear.
      500
   ),

     exeDsoa: function (datos, dml, credencial, formatoenvio, formatorecibe, tabla) {

      this.peticion.datos = "";

      var pedido = {
         "datos": datos,
         "dml": dml,
         "formato": formatoenvio,
         "credencial": credencial,
         "formatoRequest": formatorecibe
      };

      var respuesta = [];
      var url = store.state.urlDsoa;

      axios({
         method: 'POST',
         url,
         "headers": {
            "content-type": "application/json;charset=utf-8",
            "cache-control": "no-cache",
            "postman-token": "9be30243-8f01-3820-f64e-d09144a7706d",
            "processData": false,
         },
         "sync": true,
         "crossDomain": true,
         "data": pedido
      })
         .then((response) => {

            this.peticion = response.data;
            
            if (this.peticion.codigoerror.length == 0) {

               swal({
                  title: 'Alerta!',
                  text: "Error no identificado",
                  type: 'warning',
                  confirmButtonText: 'OK'
               })

            } else {

               if (Math.abs(this.peticion.codigoerror) != "0") {

                  swal({ title: 'Alerta!', text: this.peticion.deserror, type: 'warning', confirmButtonText: 'OK' })

               } else {

                  switch (tabla) {

                    //agregar registro
                     case "7001":

                        if (this.peticion.dml == "I" && this.peticion.datos == "0") {
                           swal({ type: 'success', title: "", text: "El registro fue agregado correctamente", showConfirmButton: true });
							
							window.setTimeout(function () {
                              window.location.href = "AgregarInventarioEnvios.html";
                           }, 3000);
						   
                        }else if(this.peticion.dml == "U"){
							
                            swal({ type: 'success', title: "", text: "El registro fue actualizado correctamente", showConfirmButton: true });
                        }

                        break;


                     case "7014":
                        
                        if (this.peticion.codigoerror == 0) {

                           this.camposInventarios = this.peticion.datos;
                           this.camposInventarios = JSON.parse(this.camposInventarios);


                           if (this.camposInventarios.registros == 0) {
                              this.listaInventario = {};
                              this.valorBuscar = "";
                              this.isReadOnly = false;
                              swal({ title: 'Alerta!', text: 'No se encontraron registros', type: 'warning', confirmButtonText: 'OK' })
      
                           } else {
                                this.listaInventario = this.camposInventarios.rows[0];
                                this.dml = "U";
                                this.isReadOnly = true
                           }
                        }
                        break;

                     default:
                     // code block
                  }

                 /* if (this.peticion.registros == "0") {
                     swal({ title: "Alerta!", text: "No se encontraron registros", showConfirmButton: true });
                  }*/
               }
            }
         })
         .catch(function (error) {
            console.log("SE PRODUJO ERROR " + error);
         });

   },

     buscarPorCodigo: function (cod) {

        var header = '';
        header = headerFormat("7014", 'JJ', '123', this.user, 'YYYY-MM-DD', '', 'COD_BARRA');

        var filas = '';
        filas = addColumna(filas, '*', '', 0);

        var parametros = '';
        parametros = addParametro(parametros, 'COD_BARRA', cod, '', '=', 0);

        var pet = getPeticion(header, parametros, filas);

        this.exeDsoa(pet, "JJ", "1235666", "N", "N", "7014");

     },

     getParameterByName: function (name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
           results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
     },

     agregarInventario: function () {

        var header = '';
        header = headerPaginacion("7014", this.dml, '123', 'kate', '1', '10', 'COD_BARRA');

        var filas = '';
        filas = addColumna(filas, 'COD_BARRA', this.listaInventario.COD_BARRA, 0);
        filas = addColumna(filas, 'DESTINO', this.listaInventario.DESTINO, 0);
        filas = addColumna(filas, 'EMPACADOR', this.listaInventario.EMPACADOR, 0);
        filas = addColumna(filas, 'RECIBIDO', this.listaInventario.RECIBIDO, 0);
        filas = addColumna(filas, 'DIA_SALIDA', this.listaInventario.DIA_SALIDA, 0);
        filas = addColumna(filas, 'DIA_ENTREGA', this.listaInventario.DIA_ENTREGA, 0);
        filas = addColumna(filas, 'CANTIDAD', this.listaInventario.CANTIDAD, 0);
        filas = addColumna(filas, 'TIPO', this.listaInventario.TIPO, 0);
        filas = addColumna(filas, 'COMENTARIO', this.listaInventario.COMENTARIO, 0);
        filas = addColumna(filas, 'ORDEN', this.listaInventario.ORDEN, 0);
        filas = addColumna(filas, 'SERVICE_TAGS', this.listaInventario.SERVICE_TAGS, 0);


        var parametros = '<ParamItem/>';

        var pet = getPeticion(header, parametros, filas);

        //console.log("add", pet);

        this.exeDsoa(pet, this.dml, "1235666", "N", "N", "7001");

     },


  }

});


