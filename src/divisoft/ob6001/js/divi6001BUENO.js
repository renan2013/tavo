 /*=========================================================================================
                            MODELO VUE.JS  VUAX DIVISOFT  2020  
                              AUTOR: ADEMAR DIAZ 
                              MODELO DE EDICION DE TABLAS CONFIGURABLE 
                              CREADO POR  DIVISOFT DSOA 2020
                              COMPONENTE JS   
                              LIBRERIA ESPECIFICA PARA EL OBJETO 
             ========================================================================================== */


 /// CARGA LAS FILAS QUE SE VAN ENVIAR  LA BASE DATOS 
 export function addFilasToSave(data, CmsDAta) {
     var filas = [];

     filas.push({
         NOMBRE: "COD_COMPANIA",
         VALOR1: data.COD_COMPANIA,
         VALOR2: "",
         CDATA: "0"
     });
     filas.push({
         NOMBRE: "COD_CLIENTE",
         VALOR1: data.COD_CLIENTE,
         VALOR2: "",
         CDATA: "0"
     });
     filas.push({
         NOMBRE: "NOM_CLIENTE",
         VALOR1: data.NOM_CLIENTE,
         VALOR2: "",
         CDATA: "0"
     });
     filas.push({
         NOMBRE: "IND_ESTADO",
         VALOR1: data.IND_ESTADO,
         VALOR2: "",
         CDATA: "0"
     });
     filas.push({
         NOMBRE: "COD_CLASIFICACION",
         VALOR1: data.COD_CLASIFICACION,
         VALOR2: "",
         CDATA: "0"
     });
     filas.push({
         NOMBRE: "TIP_IDENTIFICACION",
         VALOR1: data.TIP_IDENTIFICACION,
         VALOR2: "",
         CDATA: "0"
     });
     filas.push({
         NOMBRE: "NUM_IDENTIFICACION",
         VALOR1: data.NUM_IDENTIFICACION,
         VALOR2: "",
         CDATA: "0"
     });
     filas.push({
         NOMBRE: "DIR_EMAIL",
         VALOR1: data.DIR_EMAIL,
         VALOR2: "",
         CDATA: "0"
     });
     filas.push({
         NOMBRE: "NOM_LUGAR_TRABAJO",
         VALOR1: data.NOM_LUGAR_TRABAJO,
         VALOR2: "",
         CDATA: "0"
     });
     filas.push({
         NOMBRE: "COD_ZONA",
         VALOR1: data.COD_ZONA,
         VALOR2: "",
         CDATA: "0"
     });
     filas.push({
         NOMBRE: "COD_RUTA",
         VALOR1: data.COD_RUTA,
         VALOR2: "",
         CDATA: "0"
     });
     filas.push({
         NOMBRE: "NUM_TELEFONO",
         VALOR1: data.NUM_TELEFONO,
         VALOR2: "",
         CDATA: "0"
     });
     filas.push({
         NOMBRE: "FEC_INGRESO",
         VALOR1: data.FEC_INGRESO,
         VALOR2: process.env.VUE_APP_FECHA_FORMAT,
         CDATA: "0"
     });
     filas.push({
         NOMBRE: "DES_OBSERVACIONES",
         VALOR1: data.DES_OBSERVACIONES,
         VALOR2: "",
         CDATA: "0"
     });
     filas.push({
         NOMBRE: "IND_TIPOSEXO",
         VALOR1: data.IND_TIPOSEXO,
         VALOR2: "",
         CDATA: "0"
     });
     filas.push({
         NOMBRE: "COD_ALTERNO",
         VALOR1: data.COD_ALTERNO,
         VALOR2: "",
         CDATA: "0"
     });
     filas.push({
         NOMBRE: "IND_ESTADOCIVIL",
         VALOR1: data.IND_ESTADOCIVIL,
         VALOR2: "",
         CDATA: "0"
     });
     filas.push({
         NOMBRE: "IND_TIPOCLIENTE",
         VALOR1: data.IND_TIPOCLIENTE,
         VALOR2: "",
         CDATA: "0"
     });

     filas.push({
         NOMBRE: "FEC_NACIMIENTO",
         VALOR1: data.FEC_NACIMIENTO,
         VALOR2: process.env.VUE_APP_FECHA_FORMAT,
         CDATA: "0"
     });
     filas.push({
         NOMBRE: "POR_DESCLI",
         VALOR1: data.POR_DESCLI,
         VALOR2: "",
         CDATA: "0"
     });
     filas.push({
         NOMBRE: "NUM_CELULAR",
         VALOR1: data.NUM_CELULAR,
         VALOR2: "",
         CDATA: "0"
     });
     filas.push({
         NOMBRE: "NUM_DOCUMENTO",
         VALOR1: data.NUM_DOCUMENTO,
         VALOR2: "",
         CDATA: "0"
     });
     filas.push({
         NOMBRE: "USR_INCLUSION",
         VALOR1: data.USR_INCLUSION,
         VALOR2: "",
         CDATA: "0"
     });
     filas.push({
         NOMBRE: "FEC_INCLUSION",
         VALOR1: data.FEC_INCLUSION,
         VALOR2: process.env.VUE_APP_FECHA_FORMAT,
         CDATA: "0"
     });
     filas.push({
         NOMBRE: "USR_MODIFICACION",
         VALOR1: data.USR_MODIFICACION,
         VALOR2: "",
         CDATA: "0"
     });
     filas.push({
         NOMBRE: "FEC_MODIFICACION",
         VALOR1: data.FEC_MODIFICACION,
         VALOR2: process.env.VUE_APP_FECHA_FORMAT,
         CDATA: "0"
     });
     filas.push({
         NOMBRE: "COD_PAIS",
         VALOR1: data.COD_PAIS,
         VALOR2: "",
         CDATA: "0"
     });
     filas.push({
         NOMBRE: "COD_PROVINCIA",
         VALOR1: data.COD_PROVINCIA,
         VALOR2: "",
         CDATA: "0"
     });
     filas.push({
         NOMBRE: "COD_CANTON",
         VALOR1: data.COD_CANTON,
         VALOR2: "",
         CDATA: "0"
     });
     filas.push({
         NOMBRE: "COD_DISTRITO",
         VALOR1: data.COD_DISTRITO,
         VALOR2: "",
         CDATA: "0"
     });
     filas.push({
         NOMBRE: "COD_CASERIO",
         VALOR1: data.COD_CASERIO,
         VALOR2: "",
         CDATA: "0"
     });
     filas.push({
         NOMBRE: "COMENTARIO",
         VALOR1: data.COMENTARIO,
         VALOR2: "",
         CDATA: "0"
     });

     if (CmsDAta.Referencia > 0)
         filas.push({
             NOMBRE: "REFERENCIA_FOTO",
             VALOR1: CmsDAta.Referencia,
             VALOR2: "",
             CDATA: "0"
         });
     else
         filas.push({
             NOMBRE: "REFERENCIA_FOTO",
             VALOR1: data.REFERENCIA_FOTO,
             VALOR2: "",
             CDATA: "0"
         });



     filas.push({
         NOMBRE: "HASH_DOC",
         VALOR1: data.HASH_DOC,
         VALOR2: "",
         CDATA: "0"
     });

     return filas;
 };


 // carga las filas que se van a soliictar a la base datos para su Edicion
 export function getMisFilas() {
     var filas = [];

     filas.push({
         NOMBRE: "COD_COMPANIA",
         VALOR1: null,
         VALOR2: "",
         CDATA: "0"
     });
     filas.push({
         NOMBRE: "COD_CLIENTE",
         VALOR1: null,
         VALOR2: "9999999999",
         CDATA: "0"
     });
     filas.push({
         NOMBRE: "NOM_CLIENTE",
         VALOR1: null,
         VALOR2: "",
         CDATA: "0"
     });
     filas.push({
         NOMBRE: "IND_ESTADO",
         VALOR1: null,
         VALOR2: "",
         CDATA: "0"
     });
     filas.push({
         NOMBRE: "COD_CLASIFICACION",
         VALOR1: null,
         VALOR2: "",
         CDATA: "0"
     });
     filas.push({
         NOMBRE: "TIP_IDENTIFICACION",
         VALOR1: null,
         VALOR2: "",
         CDATA: "0"
     });
     filas.push({
         NOMBRE: "NUM_IDENTIFICACION",
         VALOR1: null,
         VALOR2: "",
         CDATA: "0"
     });
     filas.push({
         NOMBRE: "DIR_EMAIL",
         VALOR1: null,
         VALOR2: "",
         CDATA: "0"
     });
     filas.push({
         NOMBRE: "NOM_LUGAR_TRABAJO",
         VALOR1: null,
         VALOR2: "",
         CDATA: "0"
     });
     filas.push({
         NOMBRE: "COD_ZONA",
         VALOR1: null,
         VALOR2: "99999",
         CDATA: "0"
     });
     filas.push({
         NOMBRE: "COD_RUTA",
         VALOR1: null,
         VALOR2: "99999",
         CDATA: "0"
     });
     filas.push({
         NOMBRE: "NUM_TELEFONO",
         VALOR1: null,
         VALOR2: "999999999999",
         CDATA: "0"
     });
     filas.push({
         NOMBRE: "FEC_INGRESO",
         VALOR1: null,
         VALOR2: process.env.VUE_APP_FECHA_FORMAT,
         CDATA: "0"
     });
     filas.push({
         NOMBRE: "DES_OBSERVACIONES",
         VALOR1: null,
         VALOR2: "",
         CDATA: "0"
     });
     filas.push({
         NOMBRE: "IND_TIPOSEXO",
         VALOR1: null,
         VALOR2: "",
         CDATA: "0"
     });
     filas.push({
         NOMBRE: "COD_ALTERNO",
         VALOR1: null,
         VALOR2: "",
         CDATA: "0"
     });
     filas.push({
         NOMBRE: "IND_ESTADOCIVIL",
         VALOR1: null,
         VALOR2: "",
         CDATA: "0"
     });
     filas.push({
         NOMBRE: "IND_TIPOCLIENTE",
         VALOR1: null,
         VALOR2: "",
         CDATA: "0"
     });
     filas.push({
         NOMBRE: "FEC_NACIMIENTO",
         VALOR1: null,
         VALOR2: process.env.VUE_APP_FECHA_FORMAT,
         CDATA: "0"
     });
     filas.push({
         NOMBRE: "POR_DESCLI",
         VALOR1: null,
         VALOR2: "",
         CDATA: "0"
     });
     filas.push({
         NOMBRE: "NUM_CELULAR",
         VALOR1: null,
         VALOR2: "9999999999",
         CDATA: "0"
     });
     filas.push({
         NOMBRE: "NUM_DOCUMENTO",
         VALOR1: null,
         VALOR2: "999999999999",
         CDATA: "0"
     });
     filas.push({
         NOMBRE: "USR_INCLUSION",
         VALOR1: null,
         VALOR2: "",
         CDATA: "0"
     });
     filas.push({
         NOMBRE: "FEC_INCLUSION",
         VALOR1: null,
         VALOR2: process.env.VUE_APP_FECHA_FORMAT,
         CDATA: "0"
     });
     filas.push({
         NOMBRE: "USR_MODIFICACION",
         VALOR1: null,
         VALOR2: "",
         CDATA: "0"
     });
     filas.push({
         NOMBRE: "FEC_MODIFICACION",
         VALOR1: null,
         VALOR2: process.env.VUE_APP_FECHA_FORMAT,
         CDATA: "0"
     });
     filas.push({
         NOMBRE: "COD_PAIS",
         VALOR1: null,
         VALOR2: "999",
         CDATA: "0"
     });
     filas.push({
         NOMBRE: "COD_PROVINCIA",
         VALOR1: null,
         VALOR2: "99",
         CDATA: "0"
     });
     filas.push({
         NOMBRE: "COD_CANTON",
         VALOR1: null,
         VALOR2: "999",
         CDATA: "0"
     });
     filas.push({
         NOMBRE: "COD_DISTRITO",
         VALOR1: null,
         VALOR2: "99999",
         CDATA: "0"
     });
     filas.push({
         NOMBRE: "COD_CASERIO",
         VALOR1: null,
         VALOR2: "99999",
         CDATA: "0"
     });
     filas.push({
         NOMBRE: "COMENTARIO",
         VALOR1: null,
         VALOR2: "",
         CDATA: "0"
     });
     filas.push({
         NOMBRE: "REFERENCIA_FOTO",
         VALOR1: null,
         VALOR2: "999999999999",
         CDATA: "0"
     });
     filas.push({
         NOMBRE: "HASH_DOC",
         VALOR1: null,
         VALOR2: "",
         CDATA: "0"
     });
     filas.push({
         NOMBRE: "(select  Z.NOMBRE from DEMOS.ERP_PAISES Z where  Z.CODIGO_PAIS= A.COD_PAIS)  AS  DI_PAIS",
         VALOR1: null,
         VALOR2: "",
         CDATA: "0"
     });

     filas.push({
         NOMBRE: "(select  Z.NOMBRE from DEMOS.ERP_DISTRITOS Z where  Z.CODIGO_PAIS= A.COD_PAIS AND   Z.PROVINCIA= A.COD_PROVINCIA AND   Z.CANTON= A.COD_CANTON AND   Z.DISTRITO= A.COD_DISTRITO)  AS  DI_DISTRITO",
         VALOR1: null,
         VALOR2: "",
         CDATA: "0"
     });

     filas.push({
         NOMBRE: "DBPMS.CMS_K_IMAGE_MANAGER.CRM_P_GET_CMSINFO(" +
             CMSDATA6001[0].EntidadCodigo +
             "," +
             CMSDATA6001[0].LlaveExterna +
             "," +
             CMSDATA6001[0].NumNivel +
             " ) AS CMSDATA",
         VALOR1: "",
         VALOR2: "",
         CDATA: "0"
     });

     return filas;
 };
 //addFilasDet funcion completa 


 // RegistroNuevo Gen_CAMPOS_GRID(4)
 export const filtros = [{
     "NOMBRE_CAMPO": "Cod Compania",
     "NOMBRE_INTERNO": "COD_COMPANIA",
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
         }, {
             "TIPO": "LIKE",
             "LABEL": "texto"
         },
     ]
 }, {
     "NOMBRE_CAMPO": "Cod Cliente",
     "NOMBRE_INTERNO": "COD_CLIENTE",
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
     COD_COMPANIA: "0",
     COD_CLIENTE: 0,
     NOM_CLIENTE: "0",
     IND_ESTADO: "0",
     COD_CLASIFICACION: "0",
     TIP_IDENTIFICACION: "0",
     NUM_IDENTIFICACION: "0",
     DIR_EMAIL: "0",
     NOM_LUGAR_TRABAJO: "0",
     COD_ZONA: 0,
     COD_RUTA: 0,
     NUM_TELEFONO: 0,
     FEC_INGRESO: "0",
     DES_OBSERVACIONES: "0",
     IND_TIPOSEXO: "0",
     COD_ALTERNO: "0",
     IND_ESTADOCIVIL: "0",
     IND_TIPOCLIENTE: "0",
     FEC_NACIMIENTO: "0",
     POR_DESCLI: 0,
     NUM_CELULAR: 0,
     NUM_DOCUMENTO: 0,
     USR_INCLUSION: "0",
     FEC_INCLUSION: "0",
     USR_MODIFICACION: "0",
     FEC_MODIFICACION: "0",
     COD_PAIS: 0,
     COD_PROVINCIA: 0,
     COD_CANTON: 0,
     COD_DISTRITO: 0,
     COD_CASERIO: 0,
     COMENTARIO: "0",
     REFERENCIA_FOTO: 0,
     HASH_DOC: "0",
     DI_PAIS: null,
     DI_DISTRITO: null,
 }];





 export const mensajesValidacion = {
     custom: {
         COD_COMPANIA: {
             required: "El Cod Compania es obligatorio Interno"
         },
         COD_CLIENTE: {
             required: "El Cod Cliente es obligatorio"
         },
         NOM_CLIENTE: {
             required: "El Nom Cliente es obligatorio"
         },
         IND_ESTADO: {
             required: "El Ind Estado es obligatorio"
         },
         TIP_IDENTIFICACION: {
             required: "El Tip Identificacion es obligatorio"
         },
         NUM_IDENTIFICACION: {
             required: "El Num Identificacion es obligatorio"
         },
         FEC_INCLUSION: {
             required: "El Fec Inclusion es obligatorio"
         },
         DI_PAIS: {
             required: "El Nombre Pais es obligatorio"
         },
         DI_DISTRITO: {
             required: "El Nombre Distrito es obligatorio"
         },
     }
 };
 // RegistroNuevo Gen_CAMPOS_GRID(5)
 export const columnDefs = [{
         headerName: "Cod Compania",
         field: "COD_COMPANIA",
         filter: true,
         width: 150
     },
     {
         headerName: "Cod Cliente",
         field: "COD_CLIENTE",
         filter: true,
         width: 150
     },
     {
         headerName: "Nom Cliente",
         field: "NOM_CLIENTE",
         filter: true,
         width: 500
     },
     {
         headerName: "Tip Identificacion",
         field: "TIP_IDENTIFICACION",
         filter: true,
         width: 150
     },
     {
         headerName: "Num Identificacion",
         field: "NUM_IDENTIFICACION",
         filter: true,
         width: 150
     },
 ]; // De defincion de  Columnas



 /// solo si lleva ALGUN DOCUMENTO MULTIMEDIA    CMS       pendiente de crear en oracle   
 export const CMSDATA6001 = [{
     EntidadCodigo: "26",
     LlaveExterna: "9000",
     NumNivel: 1265,
     numDoc: 0,
     Encriptado: "",
     IndMultipleEntidad: "1",
     Directorio: "1",
     llavegenerica: ""
 }];


 export const LISTA_TIPOSEXO = [
     { text: "Hombre", value: "M" },
     { text: "Mujer", value: "F" },
 ];
 export const LIST_ESTADOCIVIL = [
     { text: "CASADO", value: "1" },
     { text: "SOLTERO", value: "2" },
     { text: "DOVORCIADO", value: "3" },
     { text: "VIUDO(A)", value: "4" },
     { text: "UNION LIBRE", value: "5" },
     { text: "SEPARADO DE HECHO", value: "6" },
 ];

 export const LISTA_ESTADO = [
     { text: "CASADO", value: "1" },
     { text: "SOLTERO", value: "2" },
     { text: "DOVORCIADO", value: "3" },
     { text: "VIUDO(A)", value: "4" },
     { text: "UNION LIBRE", value: "5" },
     { text: "SEPARADO DE HECHO", value: "6" },
 ];
 export const DATAPROVINCIA = [
     { text: "SAN JOSE", value: "1" },
     { text: "ALAJUELA", value: "2" },
     { text: "HEREDIA", value: "3" },
     { text: "CARTAGO", value: "4" },
     { text: "GUANACASTE", value: "5" },
     { text: "PUNTARENAS", value: "6" },
     { text: "LIMON", value: "7" },
 ];








 // carga las filas que se van a soliictar a la base datos para su Edicion
 export function precallProc6007(data) {

     let camposProce = [{
         "NOMBRE_CAMPO": "Gvcodcompania",
         "NOMBRE_INTERNO": "GV_COD_COMPANIA",
         "VALOR": data.COD_COMPANIA,
         "TIPO": "1",
         "FORMATO": "",
         "MIN": "",
         "MAX": "",
         "PLACEHOLDER": "",
         "VALORES": []
     }, {
         "NOMBRE_CAMPO": "Gncodcliente",
         "NOMBRE_INTERNO": "GN_COD_CLIENTE",
         "VALOR": data.COD_CLIENTE,
         "TIPO": "2",
         "FORMATO": "",
         "MIN": "",
         "MAX": "",
         "PLACEHOLDER": "",
         "VALORES": []
     }, {
         "NOMBRE_CAMPO": "Gvnomcliente",
         "NOMBRE_INTERNO": "GV_NOM_CLIENTE",
         "VALOR": data.NOM_CLIENTE,
         "TIPO": "1",
         "FORMATO": "",
         "MIN": "",
         "MAX": "",
         "PLACEHOLDER": "",
         "VALORES": []
     }, {
         "NOMBRE_CAMPO": "Gvindestado",
         "NOMBRE_INTERNO": "GV_IND_ESTADO",
         "VALOR": data.IND_ESTADO,
         "TIPO": "1",
         "FORMATO": "",
         "MIN": "",
         "MAX": "",
         "PLACEHOLDER": "",
         "VALORES": []
     }, {
         "NOMBRE_CAMPO": "Gvcodclasificacion",
         "NOMBRE_INTERNO": "GV_COD_CLASIFICACION",
         "VALOR": data.COD_CLASIFICACION,
         "TIPO": "1",
         "FORMATO": "",
         "MIN": "",
         "MAX": "",
         "PLACEHOLDER": "",
         "VALORES": []
     }, {
         "NOMBRE_CAMPO": "Gvtipidentificacion",
         "NOMBRE_INTERNO": "GV_TIP_IDENTIFICACION",
         "VALOR": data.TIP_IDENTIFICACION,
         "TIPO": "1",
         "FORMATO": "",
         "MIN": "",
         "MAX": "",
         "PLACEHOLDER": "",
         "VALORES": []
     }, {
         "NOMBRE_CAMPO": "Gvnumidentificacion",
         "NOMBRE_INTERNO": "GV_NUM_IDENTIFICACION",
         "VALOR": data.NUM_IDENTIFICACION,
         "TIPO": "1",
         "FORMATO": "",
         "MIN": "",
         "MAX": "",
         "PLACEHOLDER": "",
         "VALORES": []
     }, {
         "NOMBRE_CAMPO": "Gvdiremail",
         "NOMBRE_INTERNO": "GV_DIR_EMAIL",
         "VALOR": data.DIR_EMAIL,
         "TIPO": "1",
         "FORMATO": "",
         "MIN": "",
         "MAX": "",
         "PLACEHOLDER": "",
         "VALORES": []
     }, {
         "NOMBRE_CAMPO": "Gbcomentario",
         "NOMBRE_INTERNO": "GB_COMENTARIO",
         "VALOR": data.COMENTARIO,
         "TIPO": "5",
         "FORMATO": "",
         "MIN": "",
         "MAX": "",
         "PLACEHOLDER": "",
         "VALORES": []
     }, {
         "NOMBRE_CAMPO": "Gnnumtelefono",
         "NOMBRE_INTERNO": "GN_NUM_TELEFONO",
         "VALOR": data.NUM_TELEFONO,
         "TIPO": "2",
         "FORMATO": "",
         "MIN": "",
         "MAX": "",
         "PLACEHOLDER": "",
         "VALORES": []
     }];

     return camposProce;
 };