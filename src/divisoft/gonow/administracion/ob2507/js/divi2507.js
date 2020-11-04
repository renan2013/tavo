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
        NOMBRE: "COD_MONEDA",
        VALOR1:null,
        VALOR2: "",
        CDATA: "0"
      }); 
      filas.push({
        NOMBRE: "DES_MONEDA",
        VALOR1:null,
        VALOR2: "",
        CDATA: "0"
      }); 
      filas.push({
        NOMBRE: "DES_PAIS",
        VALOR1:null,
        VALOR2: "",
        CDATA: "0"
      });  
                     filas.push({
        NOMBRE:
          "DBPMS.CMS_K_IMAGE_MANAGER.CRM_P_GET_CMSINFO(" +
          CMSDATAREPLACECODIGOOBJECT[0].EntidadCodigo +
          "," +
           CMSDATAREPLACECODIGOOBJECT[0].LlaveExterna +
          "," +
          CMSDATAREPLACECODIGOOBJECT[0].NumNivel +
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
                "NOMBRE_CAMPO":"Cod Moneda",
                "NOMBRE_INTERNO":"COD_MONEDA",
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
     COD_MONEDA:"0",
     DES_MONEDA:"0",
     DES_PAIS:"0",
}];

             
  
             
   
    export const mensajesValidacion = {
    custom: {
 COD_MONEDA : {
            required: "El Cod Moneda es obligatorio" 
        },DES_MONEDA : {
            required: "El Des Moneda es obligatorio" 
        },DES_PAIS : {
            required: "El Des Pais es obligatorio" 
        },   }
};    
 // RegistroNuevo Gen_CAMPOS_GRID(5)
              export const columnDefs = [
  {
                                  headerName: "Cod Moneda",
                                  field: "COD_MONEDA",
                                  filter: true,
                                  lockPosition: true,
                                  width: 150
                                }, 
                              {
                                  headerName: "Des Moneda",
                                  field: "DES_MONEDA",
                                  filter: true,
                                  lockPosition: true,
                                  width: 500
                                }, 
                              {
                                  headerName: "Des Pais",
                                  field: "DES_PAIS",
                                  filter: true,
                                  lockPosition: true,
                                  width: 500
                                }, 
                              ];   // De defincion de  Columnas

  
 
/// solo si lleva ALGUN DOCUMENTO MULTIMEDIA    CMS       pendiente de crear en oracle   
export const CMSDATA2507 =[{ 
  EntidadCodigo:"26",
  LlaveExterna:"9000",
  NumNivel:1265,
  numDoc:0,
  Encriptado:"", 
  IndMultipleEntidad:"1",
  Directorio:"1",
  llavegenerica:""
}];


