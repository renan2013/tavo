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
        NOMBRE: "COD_PAIS",
        VALOR1:null,
        VALOR2: "",
        CDATA: "0"
      }); 
      filas.push({
        NOMBRE: "COD_PROVINCIA",
        VALOR1:null,
        VALOR2: "",
        CDATA: "0"
      }); 
      filas.push({
        NOMBRE: "DES_PROVINCIA",
        VALOR1:null,
        VALOR2: "",
        CDATA: "0"
      }); 
        filas.push({
        NOMBRE: "(select  Z.NOM_PAIS from GO_PAISES Z where  Z.COD_PAIS= A.COD_PAIS)  AS  NOM_PAIS",
        VALOR1:null,
        VALOR2: "",
        CDATA: "0"
        });
  return filas; 
    }; 
   //addFilasDet funcion completa 
   
   
  // RegistroNuevo Gen_CAMPOS_GRID(4)
  export const filtros= [ 
     { 
                "NOMBRE_CAMPO":"Cod Pais",
                "NOMBRE_INTERNO":"COD_PAIS",
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
                "NOMBRE_CAMPO":"Nombre Pais",
                "NOMBRE_INTERNO":"NOM_PAIS",
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
                "NOMBRE_CAMPO":"Cod Provincia",
                "NOMBRE_INTERNO":"COD_PROVINCIA",
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
     COD_PAIS:"0",
     COD_PROVINCIA:"0",
     DES_PROVINCIA:"0",
     NOM_PAIS:null,
}];

             
  
             
   
    export const mensajesValidacion = {
    custom: {
 COD_PAIS : {
            required: "El Cod Pais es obligatorio" 
        },COD_PROVINCIA : {
            required: "El Cod Provincia es obligatorio" 
        },DES_PROVINCIA : {
            required: "El Des Provincia es obligatorio" 
        },NOM_PAIS : {
            required: "El Nombre Pais es obligatorio" 
        },   }
};    
 // RegistroNuevo Gen_CAMPOS_GRID(5)
              export const columnDefs = [
  {
                                  headerName: "Cod Pais",
                                  field: "COD_PAIS",
                                  filter: true,
                                  lockPosition: true,
                                  width: 150
                                }, 
                              {
                                  headerName: "Nombre Pais",
                                  field: "NOM_PAIS",
                                  filter: true,
                                  lockPosition: true,
                                  width: 1000
                                }, 
                              {
                                  headerName: "Cod Provincia",
                                  field: "COD_PROVINCIA",
                                  filter: true,
                                  lockPosition: true,
                                  width: 150
                                }, 
                              {
                                  headerName: "Des Provincia",
                                  field: "DES_PROVINCIA",
                                  filter: true,
                                  lockPosition: true,
                                  width: 250
                                }, 
                              ];   // De defincion de  Columnas

  
 
/// solo si lleva ALGUN DOCUMENTO MULTIMEDIA    CMS       pendiente de crear en oracle   
export const CMSDATA2503 =[{ 
  EntidadCodigo:"26",
  LlaveExterna:"9000",
  NumNivel:1265,
  numDoc:0,
  Encriptado:"", 
  IndMultipleEntidad:"1",
  Directorio:"1",
  llavegenerica:""
}];


