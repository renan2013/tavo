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
        NOMBRE: "NUM_RANGOVOLUMEN",
        VALOR1:null,
        VALOR2: "999",
        CDATA: "0"
      }); 
      filas.push({
        NOMBRE: "NUM_TRANSPORTE",
        VALOR1:null,
        VALOR2: "99",
        CDATA: "0"
      }); 
      filas.push({
        NOMBRE: "IND_ESTADO",
        VALOR1:null,
        VALOR2: "",
        CDATA: "0"
      }); 
        filas.push({
        NOMBRE: "(select  Z.DES_TRANSPORTE from GO_TIPOTRANSPORTE Z where  Z.NUM_TRANSPORTE= A.NUM_TRANSPORTE)  AS  DI_TRANSPORTE",
        VALOR1:null,
           VALOR2: "99",
        CDATA: "0"
        });
 
        filas.push({
        NOMBRE: "(select  Z.DES_RANGOVOLUMEN from GO_RANGOVOLUMEN Z where  Z.NUM_RANGOVOLUMEN= A.NUM_RANGOVOLUMEN)  AS  DI_RANGOVLUMEN",
        VALOR1:null,
           VALOR2: "999",
        CDATA: "0"
        });
  return filas; 
    }; 
   //addFilasDet funcion completa 
   
   
  // RegistroNuevo Gen_CAMPOS_GRID(4)
  export const filtros= [ 
     { 
                "NOMBRE_CAMPO":"Nombre",
                "NOMBRE_INTERNO":"DI_RANGOVLUMEN",
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
                      },     { 
                "NOMBRE_CAMPO":"Num Rangovolumen",
                "NOMBRE_INTERNO":"NUM_RANGOVOLUMEN",
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
                "NOMBRE_CAMPO":"Nombre",
                "NOMBRE_INTERNO":"DI_TRANSPORTE",
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
                      },     { 
                "NOMBRE_CAMPO":"Num Transporte",
                "NOMBRE_INTERNO":"NUM_TRANSPORTE",
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
                      },  ];   // fin de filtros

 
//////////////////////////////////////
 
             // RegistroNuevo  Gen_CAMPOS_MANTE(1)
             export const datosDefault =[{
     NUM_RANGOVOLUMEN:0,
     NUM_TRANSPORTE:0,
     IND_ESTADO:"0",
     DI_TRANSPORTE:null,
     DI_RANGOVLUMEN:null,
}];

             
  
             
   
    export const mensajesValidacion = {
    custom: {
 NUM_RANGOVOLUMEN : {
            required: "El Num Rangovolumen es obligatorio" 
        },NUM_TRANSPORTE : {
            required: "El Num Transporte es obligatorio" 
        },IND_ESTADO : {
            required: "El Ind Estado es obligatorio" 
        },DI_RANGOVLUMEN : {
            required: "El Nombre es obligatorio" 
        },DI_TRANSPORTE : {
            required: "El Nombre es obligatorio" 
        },   }
};    
 // RegistroNuevo Gen_CAMPOS_GRID(5)
              export const columnDefs = [
  {
                                  headerName: "Nombre",
                                  field: "DI_RANGOVLUMEN",
                                  filter: true,
                                  lockPosition: true,
                                  width: 1000
                                }, 
                              {
                                  headerName: "Num Rangovolumen",
                                  field: "NUM_RANGOVOLUMEN",
                                  filter: true,
                                  lockPosition: true,
                                  width: 150
                                }, 
                              {
                                  headerName: "Nombre",
                                  field: "DI_TRANSPORTE",
                                  filter: true,
                                  lockPosition: true,
                                  width: 1000
                                }, 
                              {
                                  headerName: "Num Transporte",
                                  field: "NUM_TRANSPORTE",
                                  filter: true,
                                  lockPosition: true,
                                  width: 150
                                }, 
                              ];   // De defincion de  Columnas

  
 
/// solo si lleva ALGUN DOCUMENTO MULTIMEDIA    CMS       pendiente de crear en oracle   
export const CMSDATA2533 =[{ 
  EntidadCodigo:"26",
  LlaveExterna:"9000",
  NumNivel:1265,
  numDoc:0,
  Encriptado:"", 
  IndMultipleEntidad:"1",
  Directorio:"1",
  llavegenerica:""
}];


 export const LI_ESTADO= [
{ text: "Inactivo", value: "0" },{ text: "Activo", value: "1" },]; 