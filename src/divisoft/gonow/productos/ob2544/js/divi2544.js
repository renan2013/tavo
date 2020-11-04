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
                            NOMBRE: "COD_CATEGORIA",
                            VALOR1:"",
                            VALOR2: "999",
                            CDATA: "0"
                          }); 
                          filas.push({
                            NOMBRE: "COD_PRODUCTO",
                            VALOR1:"",
                            VALOR2: "99999999",
                            CDATA: "0"
                          }); 
                          filas.push({
                            NOMBRE: "NUM_ORDEN",
                            VALOR1:"",
                            VALOR2: "99",
                            CDATA: "0"
                          }); 
        filas.push({
        NOMBRE: "(select  Z.DES_CATEGORIA from GO_SHOPCATEGORIA Z where  Z.COD_CATEGORIA= A.COD_CATEGORIA)  AS  DI_CATEGORIA",
        VALOR1:null,
           VALOR2: "999",
        CDATA: "0"
        });
 
        filas.push({
        NOMBRE: "(select  Z.DES_PRODUCTO from GO_SHOPPRODUCTOS Z where  Z.COD_PATNER= A.COD_PATNER AND   Z.COD_PRODUCTO= A.COD_PRODUCTO)  AS  DI_PRODUCTO",
        VALOR1:null,
           VALOR2: "99999999",
        CDATA: "0"
        });
 
        filas.push({
        NOMBRE: "(select  Z.DES_PRODUCTO from GO_SHOPPRODUCTOS Z where  Z.COD_PATNER= A.COD_PATNER AND   Z.COD_PRODUCTO= A.COD_PRODUCTO)  AS  DI_PRODUCTO",
        VALOR1:null,
           VALOR2: "999999",
        CDATA: "0"
        });
  return filas; 
    }; 
   //addFilasDet funcion completa 
   
   
  // RegistroNuevo Gen_CAMPOS_GRID(4)
  export const filtros= [ 
     { 
                "NOMBRE_CAMPO":"Cod Categoria",
                "NOMBRE_INTERNO":"COD_CATEGORIA",
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
                "NOMBRE_INTERNO":"DI_PRODUCTO",
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
                "NOMBRE_CAMPO":"Cod Patner",
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
                "NOMBRE_CAMPO":"Cod Producto",
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
                      },  ];   // fin de filtros

 
//////////////////////////////////////
 
             // RegistroNuevo  Gen_CAMPOS_MANTE(1)
             export const datosDefault =[{
     COD_CATEGORIA:0,
     COD_PRODUCTO:0,
     NUM_ORDEN:0,
     DI_CATEGORIA:null,
     DI_PRODUCTO:null,
     DI_PRODUCTO:null,
}];

             
  
             
   
    export const mensajesValidacion = {
    custom: {
 COD_CATEGORIA : {
            required: "El Cod Categoria es obligatorio" 
        },COD_PRODUCTO : {
            required: "El Cod Producto es obligatorio" 
        },DI_CATEGORIA : {
            required: "El Nombre es obligatorio" 
        },DI_PRODUCTO : {
            required: "El Nombre es obligatorio" 
        },   }
};    
 // RegistroNuevo Gen_CAMPOS_GRID(5)
              export const columnDefs = [
  {
                                  headerName: "Cod Categoria",
                                  field: "COD_CATEGORIA",
                                  filter: true,
                                  lockPosition: true,
                                  width: 150
                                }, 
                              {
                                  headerName: "Nombre",
                                  field: "DI_PRODUCTO",
                                  filter: true,
                                  lockPosition: true,
                                  width: 150
                                }, 
                              {
                                  headerName: "Cod Patner",
                                  field: "COD_PATNER",
                                  filter: true,
                                  lockPosition: true,
                                  width: 150
                                }, 
                              {
                                  headerName: "Cod Producto",
                                  field: "COD_PRODUCTO",
                                  filter: true,
                                  lockPosition: true,
                                  width: 150
                                }, 
                              ];   // De defincion de  Columnas

  
 
/// solo si lleva ALGUN DOCUMENTO MULTIMEDIA    CMS       pendiente de crear en oracle   
export const CMSDATA2544 =[{ 
  EntidadCodigo:"26",
  LlaveExterna:"9000",
  NumNivel:1265,
  numDoc:0,
  Encriptado:"", 
  IndMultipleEntidad:"1",
  Directorio:"1",
  llavegenerica:""
}];


