 /*=========================================================================================
  MODELO VUE.JS  VUAX DIVISOFT  2020  
    AUTOR: ADEMAR DIAZ 
    MODELO DE EDICION DE TABLAS CONFIGURABLE 
    CREADO POR  DIVISOFT DSOA 2020
    COMPONENTE JS   
    LIBRERIA ESPECIFICA PARA EL OBJETO 
========================================================================================== */ 


 // carga las filas a Editar
    export function getMisFilas() {
      var filas = [];
 
                          filas.push({
                            NOMBRE: "CAN_EXISTENCIA",
                            VALOR1:"",
                            VALOR2: "999999.99",
                            CDATA: "0"
                          }); 
                          filas.push({
                            NOMBRE: "COD_PATNER",
                            VALOR1:"",
                            VALOR2: "999999",
                            CDATA: "0"
                          }); 
                          filas.push({
                            NOMBRE: "COD_CIA",
                            VALOR1:"",
                            VALOR2: "999",
                            CDATA: "0"
                          }); 
                          filas.push({
                            NOMBRE: "COD_MARCA",
                            VALOR1:"",
                            VALOR2: "9999",
                            CDATA: "0"
                          }); 
                          filas.push({
                            NOMBRE: "COD_BARRA",
                            VALOR1:"",
                            VALOR2: "",
                            CDATA: "0"
                          }); 
                          filas.push({
                            NOMBRE: "MTO_NETO",
                            VALOR1:"",
                            VALOR2: "99999999999999.99",
                            CDATA: "0"
                          }); 
                          filas.push({
                            NOMBRE: "COD_PRODUCTO",
                            VALOR1:"",
                            VALOR2: "99999999",
                            CDATA: "0"
                          }); 
                          filas.push({
                            NOMBRE: "TIP_PRODUCTO",
                            VALOR1:"",
                            VALOR2: "",
                            CDATA: "0"
                          }); 
                          filas.push({
                            NOMBRE: "COD_ALTERNO",
                            VALOR1:"",
                            VALOR2: "",
                            CDATA: "0"
                          }); 
                          filas.push({
                            NOMBRE: "MTO_TAXINCLUIDO",
                            VALOR1:"",
                            VALOR2: "99999999999999.99",
                            CDATA: "0"
                          }); 
                          filas.push({
                            NOMBRE: "DES_PRODUCTO",
                            VALOR1:"",
                            VALOR2: "",
                            CDATA: "0"
                          }); 
                          filas.push({
                            NOMBRE: "COD_RANGO",
                            VALOR1:"",
                            VALOR2: "9999999999",
                            CDATA: "0"
                          }); 
                          filas.push({
                            NOMBRE: "ID_TAX",
                            VALOR1:"",
                            VALOR2: "99",
                            CDATA: "0"
                          }); 
                          filas.push({
                            NOMBRE: "DET_PRODUCTO",
                            VALOR1:"",
                            VALOR2: "",
                            CDATA: "0"
                          }); 
                          filas.push({
                            NOMBRE: "IND_PRINCIPAL",
                            VALOR1:"",
                            VALOR2: "",
                            CDATA: "0"
                          }); 
                          filas.push({
                            NOMBRE: "NUM_ORDEN",
                            VALOR1:"",
                            VALOR2: "999999",
                            CDATA: "0"
                          }); 
                          filas.push({
                            NOMBRE: "KGS_PESO",
                            VALOR1:"",
                            VALOR2: "999999.99",
                            CDATA: "0"
                          }); 
                          filas.push({
                            NOMBRE: "TAM_ALTO",
                            VALOR1:"",
                            VALOR2: "999999.99",
                            CDATA: "0"
                          }); 
                          filas.push({
                            NOMBRE: "TAM_ANCHO",
                            VALOR1:"",
                            VALOR2: "999999.99",
                            CDATA: "0"
                          }); 
                          filas.push({
                            NOMBRE: "TAM_LARGO",
                            VALOR1:"",
                            VALOR2: "999999.99",
                            CDATA: "0"
                          }); 
                          filas.push({
                            NOMBRE: "IMG_AVATAR",
                            VALOR1:"",
                            VALOR2: "999999999999",
                            CDATA: "0"
                          }); 
                          filas.push({
                            NOMBRE: "HASH_AVATAR",
                            VALOR1:"",
                            VALOR2: "",
                            CDATA: "0"
                          }); 
                          filas.push({
                            NOMBRE: "URL_REFERENCIA",
                            VALOR1:"",
                            VALOR2: "",
                            CDATA: "0"
                          }); 
                          filas.push({
                            NOMBRE: "IND_ENVIOGRATIS",
                            VALOR1:"",
                            VALOR2: "",
                            CDATA: "0"
                          }); 
                          filas.push({
                            NOMBRE: "NUM_PROMEDIOCALIFICACION",
                            VALOR1:"",
                            VALOR2: "9999.99",
                            CDATA: "0"
                          }); 
                          filas.push({
                            NOMBRE: "CAN_CALIFICACIONES",
                            VALOR1:"",
                            VALOR2: "99999999",
                            CDATA: "0"
                          }); 
        filas.push({
        NOMBRE: "(select  Z.NOM_CIA from GO_COMPANIA Z where  Z.COD_CIA= A.COD_CIA)  AS  NOM_CIA",
        VALOR1:null,
           VALOR2: "999",
        CDATA: "0"
        });
 
        filas.push({
        NOMBRE: "(select  Z.NOM_NEGOCIO from GO_PATNER Z where  Z.COD_PATNER= A.COD_PATNER)  AS  NOM_NEGOCIO",
        VALOR1:null,
           VALOR2: "999999",
        CDATA: "0"
        });
 
        filas.push({
        NOMBRE: "(select  Z.DES_RANGO from GO_SHOPRANGOPRECIOS Z where  Z.COD_RANGO= A.COD_RANGO)  AS  DES_RANGO",
        VALOR1:null,
           VALOR2: "9999999999",
        CDATA: "0"
        });
 
        filas.push({
        NOMBRE: "(select  Z.DES_MARCA from GO_SHOPMARCA Z where  Z.COD_MARCA= A.COD_MARCA)  AS  DES_MARCA",
        VALOR1:null,
           VALOR2: "9999",
        CDATA: "0"
        });
 
        filas.push({
        NOMBRE: "(select  Z.NOM_TAX from GO_TAXES Z where  Z.COD_CIA= A.COD_CIA AND   Z.ID_TAX= A.ID_TAX)  AS  NOM_TAX",
        VALOR1:null,
           VALOR2: "99",
        CDATA: "0"
        });
  
                     filas.push({
        NOMBRE:
          "DBPMS.CMS_K_IMAGE_MANAGER.CRM_P_GET_CMSINFO(" +
          CMSDATA2521[0].EntidadCodigo +
          "," +
           CMSDATA2521[0].LlaveExterna +
          "," +
          CMSDATA2521[0].NumNivel +
          " ) AS CMSDATA",
        VALOR1: "",
        VALOR2: "",
        CDATA: "0"
      });
                      
  return filas; 
    }; 
   //addFilasDet funcion completa 
   
   
  // RegistroNuevo Gen_CAMPOS_GRID(4)
  export const filtros= [ 
     { 
                "NOMBRE_CAMPO":"Código Patner",
                "NOMBRE_INTERNO":"COD_PATNER",
                "VALOR":"",
                "TIPO_FILTRO":[ 
                   { 
                      "TIPO":"IGUAL",
                      "LABEL":"="
                  },
                  { 
                      "TIPO":"MAYOR",
                      "LABEL":">"
                  },
                  { 
                      "TIPO":"MENOR",
                      "LABEL":"<"
                  },
                  { 
                      "TIPO":"MAYORIGUAL",
                      "LABEL":"= >"
                  },
                  { 
                      "TIPO":"MENORIGUAL",
                      "LABEL":"< ="
                  },
                  { 
                      "TIPO":"IN",
                      "LABEL":"In"
                  },
                  { 
                      "TIPO":"NOTIN",
                      "LABEL":"Not In"
                  } 
     ]
                      },     { 
                "NOMBRE_CAMPO":"Código Producto",
                "NOMBRE_INTERNO":"COD_PRODUCTO",
                "VALOR":"",
                "TIPO_FILTRO":[ 
                   { 
                      "TIPO":"IGUAL",
                      "LABEL":"="
                  },
                  { 
                      "TIPO":"MAYOR",
                      "LABEL":">"
                  },
                  { 
                      "TIPO":"MENOR",
                      "LABEL":"<"
                  },
                  { 
                      "TIPO":"MAYORIGUAL",
                      "LABEL":"= >"
                  },
                  { 
                      "TIPO":"MENORIGUAL",
                      "LABEL":"< ="
                  },
                  { 
                      "TIPO":"IN",
                      "LABEL":"In"
                  },
                  { 
                      "TIPO":"NOTIN",
                      "LABEL":"Not In"
                  } 
     ]
                      },     { 
                "NOMBRE_CAMPO":"Descripción Producto",
                "NOMBRE_INTERNO":"DES_PRODUCTO",
                "VALOR":"",
                "TIPO_FILTRO":[ 
                   { 
                      "TIPO":"IGUAL",
                      "LABEL":"="
                  },
                  { 
                      "TIPO":"MAYOR",
                      "LABEL":">"
                  },
                  { 
                      "TIPO":"MENOR",
                      "LABEL":"<"
                  },
                  { 
                      "TIPO":"MAYORIGUAL",
                      "LABEL":"= >"
                  },
                  { 
                      "TIPO":"MENORIGUAL",
                      "LABEL":"< ="
                  },
                  { 
                      "TIPO":"IN",
                      "LABEL":"In"
                  },
                  { 
                      "TIPO":"NOTIN",
                      "LABEL":"Not In"
                  } 
  ,{ 
                              "TIPO":"LIKE",
                              "LABEL":"texto"
                          },
     ]
                      },  ];   // fin de filtros

 
//////////////////////////////////////
 
             // RegistroNuevo  Gen_CAMPOS_MANTE(1)
             export const datosDefault =[{
     CAN_EXISTENCIA:0,
     COD_PATNER:0,
     COD_CIA:0,
     COD_MARCA:0,
     COD_BARRA:"0",
     MTO_NETO:0,
     COD_PRODUCTO:0,
     TIP_PRODUCTO:"0",
     COD_ALTERNO:"0",
     MTO_TAXINCLUIDO:0,
     DES_PRODUCTO:"0",
     COD_RANGO:0,
     ID_TAX:0,
     DET_PRODUCTO:"0",
     IND_PRINCIPAL:"0",
     NUM_ORDEN:0,
     KGS_PESO:0,
     TAM_ALTO:0,
     TAM_ANCHO:0,
     TAM_LARGO:0,
     IMG_AVATAR:0,
     HASH_AVATAR:"0",
     URL_REFERENCIA:"0",
     IND_ENVIOGRATIS:"0",
     NUM_PROMEDIOCALIFICACION:0,
     CAN_CALIFICACIONES:0,
     NOM_CIA:null,
     NOM_NEGOCIO:null,
     DES_RANGO:null,
     DES_MARCA:null,
     NOM_TAX:null,
}];

             
  
             
   
    export const mensajesValidacion = {
    custom: {
 COD_CIA : {
            required: "El Código Cia es obligatorio" 
        },COD_PATNER : {
            required: "El Código Patner es obligatorio" 
        },COD_PRODUCTO : {
            required: "El Código Producto es obligatorio" 
        },COD_MARCA : {
            required: "El Código Marca es obligatorio" 
        },DES_PRODUCTO : {
            required: "El Descripción Producto es obligatorio" 
        },DET_PRODUCTO : {
            required: "El Detalle Producto es obligatorio" 
        },CAN_EXISTENCIA : {
            required: "El Cantidad Existencia es obligatorio" 
        },MTO_NETO : {
            required: "El Monto Neto es obligatorio" 
        },MTO_TAXINCLUIDO : {
            required: "El Monto Taxincluído es obligatorio" 
        },ID_TAX : {
            required: "El Indicador Tax es obligatorio" 
        },IND_PRINCIPAL : {
            required: "El Indicador Principal es obligatorio" 
        },NUM_ORDEN : {
            required: "El Número Orden es obligatorio" 
        },COD_RANGO : {
            required: "El Código Rango es obligatorio" 
        },IND_ENVIOGRATIS : {
            required: "El Indicador EnvioGratis es obligatorio" 
        },NOM_CIA : {
            required: "El Nombre es obligatorio" 
        },NOM_NEGOCIO : {
            required: "El Nombre es obligatorio" 
        },DES_MARCA : {
            required: "El Nombre es obligatorio" 
        },NOM_TAX : {
            required: "El Nombre es obligatorio" 
        },DES_RANGO : {
            required: "El Nombre es obligatorio" 
        },   }
};    
 // RegistroNuevo Gen_CAMPOS_GRID(5)
              export const columnDefs = [
  {
                                  headerName: "Código Patner",
                                  field: "COD_PATNER",
                                  filter: true,
                                  lockPosition: true,
                                  width: 150
                                }, 
                              {
                                  headerName: "Código Producto",
                                  field: "COD_PRODUCTO",
                                  filter: true,
                                  lockPosition: true,
                                  width: 150
                                }, 
                              {
                                  headerName: "Descripción Producto",
                                  field: "DES_PRODUCTO",
                                  filter: true,
                                  lockPosition: true,
                                  width: 500
                                }, 
                              ];   // De defincion de  Columnas

  
 
/// solo si lleva ALGUN DOCUMENTO MULTIMEDIA    CMS       pendiente de crear en oracle   
export const CMSDATA2521 =[{ 
  EntidadCodigo:"26",
  LlaveExterna:"9000",
  NumNivel:1265,
  numDoc:0,
  Encriptado:"", 
  IndMultipleEntidad:"1",
  Directorio:"1",
  llavegenerica:""
}];


 export const IND_ENVIO= [
{ text: "No", value: "0" },{ text: "Sí", value: "1" },]; 