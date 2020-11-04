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
        NOMBRE: "COD_ZONA",
        VALOR1:null,
        VALOR2: "99",
        CDATA: "0"
      }); 
      filas.push({
        NOMBRE: "COD_PAIS",
        VALOR1:null,
        VALOR2: "999",
        CDATA: "0"
      }); 
      filas.push({
        NOMBRE: "COD_PROVINCIA",
        VALOR1:null,
        VALOR2: "99",
        CDATA: "0"
      }); 
      filas.push({
        NOMBRE: "COD_CANTON",
        VALOR1:null,
        VALOR2: "99",
        CDATA: "0"
      }); 
      filas.push({
        NOMBRE: "COD_DISTRITO",
        VALOR1:null,
        VALOR2: "99",
        CDATA: "0"
      }); 
      filas.push({
        NOMBRE: "COD_CASERIO",
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
        NOMBRE: "(select  Z.DES_ZONA from GO_ZONAS Z where  Z.COD_ZONA= A.COD_ZONA)  AS  DI_ZONA",
        VALOR1:null,
           VALOR2: "99",
        CDATA: "0"
        });
 
        filas.push({
        NOMBRE: "(select  Z.NOM_PAIS from GO_CASERIOS Z where  Z.COD_PAIS= A.COD_PAIS)  AS  DI_PAIS",
        VALOR1:null,
           VALOR2: "999",
        CDATA: "0"
        });
 
        filas.push({
        NOMBRE: "(select  Z.DES_PROVINCIA from GO_PROVINCIAS Z where  Z.COD_PAIS= A.COD_PAIS AND   Z.COD_PROVINCIA= A.COD_PROVINCIA)  AS  DI_PROVINCIA",
        VALOR1:null,
           VALOR2: "99",
        CDATA: "0"
        });
 
        filas.push({
        NOMBRE: "(select  Z.DES_CANTON from GO_CANTONES Z where  Z.COD_PAIS= A.COD_PAIS AND   Z.COD_PROVINCIA= A.COD_PROVINCIA AND   Z.COD_CANTON= A.COD_CANTON)  AS  DI_CANTON",
        VALOR1:null,
           VALOR2: "99",
        CDATA: "0"
        });
 
        filas.push({
        NOMBRE: "(select  Z.DES_DISTRITO from GO_DISTRITOS Z where  Z.COD_PAIS= A.COD_PAIS AND   Z.COD_PROVINCIA= A.COD_PROVINCIA AND   Z.COD_CANTON= A.COD_CANTON AND   Z.COD_DISTRITO= A.COD_DISTRITO)  AS  DI_DISTRITO",
        VALOR1:null,
           VALOR2: "99",
        CDATA: "0"
        });
 
        filas.push({
        NOMBRE: "(select  Z.DES_CASERIO from GO_CASERIOS Z where  Z.COD_PAIS= A.COD_PAIS AND   Z.COD_PROVINCIA= A.COD_PROVINCIA AND   Z.COD_CANTON= A.COD_CANTON AND   Z.COD_DISTRITO= A.COD_DISTRITO AND   Z.COD_CASERIO= A.COD_CASERIO)  AS  DI_CASERIO",
        VALOR1:null,
           VALOR2: "99",
        CDATA: "0"
        });
  return filas; 
    }; 
   //addFilasDet funcion completa 
   
   
  // RegistroNuevo Gen_CAMPOS_GRID(4)
  export const filtros= [ 
     { 
                "NOMBRE_CAMPO":"Cod Zona",
                "NOMBRE_INTERNO":"COD_ZONA",
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
                "NOMBRE_INTERNO":"DI_ZONA",
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
     ]
                      },     { 
                "NOMBRE_CAMPO":"Cod Canton",
                "NOMBRE_INTERNO":"COD_CANTON",
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
                "NOMBRE_CAMPO":"Cod Distrito",
                "NOMBRE_INTERNO":"COD_DISTRITO",
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
                "NOMBRE_CAMPO":"Cod Caserio",
                "NOMBRE_INTERNO":"COD_CASERIO",
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
     COD_ZONA:0,
     COD_PAIS:0,
     COD_PROVINCIA:0,
     COD_CANTON:0,
     COD_DISTRITO:0,
     COD_CASERIO:0,
     IND_ESTADO:"0",
     DI_ZONA:null,
     DI_PAIS:null,
     DI_PROVINCIA:null,
     DI_CANTON:null,
     DI_DISTRITO:null,
     DI_CASERIO:null,
}];

             
  
             
   
    export const mensajesValidacion = {
    custom: {
 COD_ZONA : {
            required: "El Cod Zona es obligatorio" 
        },COD_PAIS : {
            required: "El Cod Pais es obligatorio" 
        },COD_PROVINCIA : {
            required: "El Cod Provincia es obligatorio" 
        },COD_CANTON : {
            required: "El Cod Canton es obligatorio" 
        },COD_DISTRITO : {
            required: "El Cod Distrito es obligatorio" 
        },COD_CASERIO : {
            required: "El Cod Caserio es obligatorio" 
        },IND_ESTADO : {
            required: "El Ind Estado es obligatorio" 
        },DI_PAIS : {
            required: "El Nombre País es obligatorio" 
        },DI_PROVINCIA : {
            required: "El Nombre es obligatorio" 
        },DI_CANTON : {
            required: "El Nombre es obligatorio" 
        },DI_DISTRITO : {
            required: "El Nombre es obligatorio" 
        },DI_CASERIO : {
            required: "El Nombre es obligatorio" 
        },DI_ZONA : {
            required: "El Nombre es obligatorio" 
        },   }
};    
 // RegistroNuevo Gen_CAMPOS_GRID(5)
              export const columnDefs = [
  {
                                  headerName: "Cod Zona",
                                  field: "COD_ZONA",
                                  filter: true,
                                  lockPosition: true,
                                  width: 150
                                }, 
                              {
                                  headerName: "Nombre",
                                  field: "DI_ZONA",
                                  filter: true,
                                  lockPosition: true,
                                  width: 1000
                                }, 
                              {
                                  headerName: "Cod Pais",
                                  field: "COD_PAIS",
                                  filter: true,
                                  lockPosition: true,
                                  width: 150
                                }, 
                              {
                                  headerName: "Cod Provincia",
                                  field: "COD_PROVINCIA",
                                  filter: true,
                                  lockPosition: true,
                                  width: 150
                                }, 
                              {
                                  headerName: "Cod Canton",
                                  field: "COD_CANTON",
                                  filter: true,
                                  lockPosition: true,
                                  width: 150
                                }, 
                              {
                                  headerName: "Cod Distrito",
                                  field: "COD_DISTRITO",
                                  filter: true,
                                  lockPosition: true,
                                  width: 150
                                }, 
                              {
                                  headerName: "Cod Caserio",
                                  field: "COD_CASERIO",
                                  filter: true,
                                  lockPosition: true,
                                  width: 150
                                }, 
                              ];   // De defincion de  Columnas

  
 
/// solo si lleva ALGUN DOCUMENTO MULTIMEDIA    CMS       pendiente de crear en oracle   
export const CMSDATA2508 =[{ 
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