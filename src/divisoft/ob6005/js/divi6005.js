 /*=========================================================================================
      MODELO VUE.JS  VUAX DIVISOFT  2020  
        AUTOR: ADEMAR DIAZ 
        MODELO DE EDICION DE TABLAS CONFIGURABLE 
        CREADO POR  DIVISOFT DSOA 2020
        COMPONENTE JS   
        LIBRERIA ESPECIFICA PARA EL OBJETO 
    ========================================================================================== */

 // carga las filas a Actualizar 
 export function addFilasToSave(data, CmsDAta) {
     var filas = [];

     filas.push({
         NOMBRE: "CODIGO_PAIS",
         VALOR1: data.CODIGO_PAIS,
         VALOR2: "999",
         CDATA: "0"
     });
     filas.push({
         NOMBRE: "NOMBRE",
         VALOR1: data.NOMBRE,
         VALOR2: "",
         CDATA: "0"
     });
     filas.push({
         NOMBRE: "NACIONALIDAD",
         VALOR1: data.NACIONALIDAD,
         VALOR2: "",
         CDATA: "0"
     });
     filas.push({
         NOMBRE: "COD_MONEDA",
         VALOR1: data.COD_MONEDA,
         VALOR2: "99999",
         CDATA: "0"
     });
     filas.push({
         NOMBRE: "CODIGO_INTERNACIONAL",
         VALOR1: data.CODIGO_INTERNACIONAL,
         VALOR2: "",
         CDATA: "0"
     });
     return filas;
 };
 //addFilasDet funcion completa 


 // carga las filas a Editar
 export function getMisFilas() {
     var filas = [];

     filas.push({
         NOMBRE: "CODIGO_PAIS",
         VALOR1: "",
         VALOR2: "999",
         CDATA: "0"
     });
     filas.push({
         NOMBRE: "NOMBRE",
         VALOR1: "",
         VALOR2: "",
         CDATA: "0"
     });
     filas.push({
         NOMBRE: "NACIONALIDAD",
         VALOR1: "",
         VALOR2: "",
         CDATA: "0"
     });
     filas.push({
         NOMBRE: "COD_MONEDA",
         VALOR1: "",
         VALOR2: "99999",
         CDATA: "0"
     });
     filas.push({
         NOMBRE: "CODIGO_INTERNACIONAL",
         VALOR1: "",
         VALOR2: "",
         CDATA: "0"
     });
     return filas;
 };
 //addFilasDet funcion completa 


 // RegistroNuevo Gen_CAMPOS_GRID(4)
 export const filtros = [{
     "NOMBRE_CAMPO": "Codigo Pais",
     "NOMBRE_INTERNO": "CODIGO_PAIS",
     "VALOR": "",
     "TIPO_FILTRO": [{
             "TIPO": "IGUAL",
             "LABEL": "="
         },
         {
             "TIPO": "MAYOR",
             "LABEL": ">"
         },
         {
             "TIPO": "MENOR",
             "LABEL": "<"
         },
         {
             "TIPO": "MAYORIGUAL",
             "LABEL": "= >"
         },
         {
             "TIPO": "MENORIGUAL",
             "LABEL": "< ="
         },
         {
             "TIPO": "IN",
             "LABEL": "In"
         },
         {
             "TIPO": "NOTIN",
             "LABEL": "Not In"
         }
     ]
 }, ]; // fin de filtros


 //////////////////////////////////////

 // RegistroNuevo  Gen_CAMPOS_MANTE(1)
 export const datosDefault = [{
     CODIGO_PAIS: 0,
     NOMBRE: "0",
     NACIONALIDAD: "0",
     COD_MONEDA: 0,
     CODIGO_INTERNACIONAL: "0",
 }];





 export const mensajesValidacion = {
     custom: {
         CODIGO_PAIS: {
             required: "El Codigo Pais es obligatorio"
         },
         NOMBRE: {
             required: "El Nombre es obligatorio"
         },
         NACIONALIDAD: {
             required: "El Nacionalidad es obligatorio"
         },
     }
 };
 // RegistroNuevo Gen_CAMPOS_GRID(5)

 export const columnDefs = [{
         headerName: "Codigo Pais",
         field: "CODIGO_PAIS",
         filter: true,
         lockPosition: true,
         width: 150
     },
     {
         headerName: "Nombre",
         field: "NOMBRE",
         filter: true,
         width: 200,
         lockPosition: true,
         pinned: "left" // lo pone a la izquierda como pivot
     },
     {
         headerName: "Nacionalidad",
         field: "NACIONALIDAD",
         filter: true,

         width: 150
     },
 ]; // De defincion de  Columnas


 export const columnDefsPrompt = [{
         headerName: "Codigo Pais",
         field: "CODIGO_PAIS",
         filter: true,
         checkboxSelection: true,
         headerCheckboxSelectionFilteredOnly: true,
         headerCheckboxSelection: true,
         lockPosition: true,
         width: 150,
         pinned: "left"
     },
     {
         headerName: "Nombre",
         field: "NOMBRE",
         filter: true,
         width: 200,

         pinned: "left" // lo pone a la izquierda como pivot
     },
     {
         headerName: "Nacionalidad",
         field: "NACIONALIDAD",
         filter: true,

         width: 150
     },
 ]; // De defincion de  Columnas
 /// solo si lleva ALGUN DOCUMENTO MULTIMEDIA    CMS       pendiente de crear en oracle   
 export const CMSDATA6005 = [{
     EntidadCodigo: "26",
     LlaveExterna: "9000",
     NumNivel: 1265,
     numDoc: 0,
     Encriptado: "",
     IndMultipleEntidad: "1",
     Directorio: "1",
     llavegenerica: ""
 }];