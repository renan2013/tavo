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
        NOMBRE: "COD_CIA",
        VALOR1:null,
        VALOR2: "9999",
        CDATA: "0"
      }); 
      filas.push({
        NOMBRE: "ID_TAX",
        VALOR1:null,
        VALOR2: "99",
        CDATA: "0"
      }); 
      filas.push({
        NOMBRE: "NOM_TAX",
        VALOR1:null,
        VALOR2: "",
        CDATA: "0"
      }); 
      filas.push({
        NOMBRE: "COD_TARIFA",
        VALOR1:null,
        VALOR2: "",
        CDATA: "0"
      }); 
      filas.push({
        NOMBRE: "POR_TARIFA",
        VALOR1:null,
        VALOR2: "",
        CDATA: "0"
      }); 
      filas.push({
        NOMBRE: "IND_ESTADO",
        VALOR1:null,
        VALOR2: "",
        CDATA: "0"
      }); 
        filas.push({
        NOMBRE: "(select  Z.NOM_CIA from GO_COMPANIA Z where  Z.COD_CIA= A.COD_CIA)  AS  DI_CIA",
        VALOR1:null,
           VALOR2: "9999",
        CDATA: "0"
        });
  return filas; 
    }; 
   //addFilasDet funcion completa 
   
   
  // RegistroNuevo Gen_CAMPOS_GRID(4)
  export const filtros= [ 
     { 
                "NOMBRE_CAMPO":"Cod Cia",
                "NOMBRE_INTERNO":"COD_CIA",
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
                "NOMBRE_INTERNO":"DI_CIA",
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
                "NOMBRE_CAMPO":"Id Tax",
                "NOMBRE_INTERNO":"ID_TAX",
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
     COD_CIA:0,
     ID_TAX:0,
     NOM_TAX:"0",
     COD_TARIFA:"0",
     POR_TARIFA:0,
     IND_ESTADO:"0",
     DI_CIA:null,
}];

             
  
             
   
    export const mensajesValidacion = {
    custom: {
 COD_CIA : {
            required: "El Cod Cia es obligatorio" 
        },ID_TAX : {
            required: "El Id Tax es obligatorio" 
        },NOM_TAX : {
            required: "El Nom Tax es obligatorio" 
        },COD_TARIFA : {
            required: "El Cod Tarifa es obligatorio" 
        },POR_TARIFA : {
            required: "El Por Tarifa es obligatorio" 
        },IND_ESTADO : {
            required: "El Ind Estado es obligatorio" 
        },DI_CIA : {
            required: "El Nombre es obligatorio" 
        },   }
};    
 // RegistroNuevo Gen_CAMPOS_GRID(5)
              export const columnDefs = [
  {
                                  headerName: "Cod Cia",
                                  field: "COD_CIA",
                                  filter: true,
                                  lockPosition: true,
                                  width: 150
                                }, 
                              {
                                  headerName: "Nombre",
                                  field: "DI_CIA",
                                  filter: true,
                                  lockPosition: true,
                                  width: 1000
                                }, 
                              {
                                  headerName: "Id Tax",
                                  field: "ID_TAX",
                                  filter: true,
                                  lockPosition: true,
                                  width: 150
                                }, 
                              {
                                  headerName: "Nom Tax",
                                  field: "NOM_TAX",
                                  filter: true,
                                  lockPosition: true,
                                  width: 500
                                }, 
                              ];   // De defincion de  Columnas

  
 
/// solo si lleva ALGUN DOCUMENTO MULTIMEDIA    CMS       pendiente de crear en oracle   
export const CMSDATA2518 =[{ 
  EntidadCodigo:"26",
  LlaveExterna:"9000",
  NumNivel:1265,
  numDoc:0,
  Encriptado:"", 
  IndMultipleEntidad:"1",
  Directorio:"1",
  llavegenerica:""
}];


 export const LI_CODTARIFA= [
{ text: "1%", value: "01" },{ text: "2%", value: "04" },{ text: "13%", value: "08" },{ text: "0%", value: "10" },];  export const LI_ESTADO= [
{ text: "Inactivo", value: "0" },{ text: "Activo", value: "1" },{ text: "13%", value: "08" },{ text: "0%", value: "10" },]; 