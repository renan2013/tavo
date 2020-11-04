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
        NOMBRE: "COD_RANGO",
        VALOR1:null,
        VALOR2: "9999999999",
        CDATA: "0"
      }); 
      filas.push({
        NOMBRE: "NUM_RANGOINICIO",
        VALOR1:null,
        VALOR2: "9999999999999999",
        CDATA: "0"
      }); 
      filas.push({
        NOMBRE: "NUM_RANGOFINAL",
        VALOR1:null,
        VALOR2: "9999999999999999",
        CDATA: "0"
      }); 
      filas.push({
        NOMBRE: "DES_RANGO",
        VALOR1:null,
        VALOR2: "",
        CDATA: "0"
      }); 
      filas.push({
        NOMBRE: "IND_ESTADO",
        VALOR1:null,
        VALOR2: "",
        CDATA: "0"
      });  return filas; 
    }; 
   //addFilasDet funcion completa 
   
   
  // RegistroNuevo Gen_CAMPOS_GRID(4)
  export const filtros= [ 
     { 
                "NOMBRE_CAMPO":"Cod Rango",
                "NOMBRE_INTERNO":"COD_RANGO",
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
     COD_RANGO:0,
     NUM_RANGOINICIO:0,
     NUM_RANGOFINAL:0,
     DES_RANGO:"0",
     IND_ESTADO:"0",
}];

             
  
             
   
    export const mensajesValidacion = {
    custom: {
 COD_RANGO : {
            required: "El Cod Rango es obligatorio" 
        },NUM_RANGOINICIO : {
            required: "El Num Rangoinicio es obligatorio" 
        },NUM_RANGOFINAL : {
            required: "El Num Rangofinal es obligatorio" 
        },DES_RANGO : {
            required: "El Des Rango es obligatorio" 
        },IND_ESTADO : {
            required: "El Ind Estado es obligatorio" 
        },   }
};    
 // RegistroNuevo Gen_CAMPOS_GRID(5)
              export const columnDefs = [
  {
                                  headerName: "Cod Rango",
                                  field: "COD_RANGO",
                                  filter: true,
                                  lockPosition: true,
                                  width: 150
                                }, 
                              {
                                  headerName: "Des Rango",
                                  field: "DES_RANGO",
                                  filter: true,
                                  lockPosition: true,
                                  width: 500
                                }, 
                              ];   // De defincion de  Columnas

  
 
/// solo si lleva ALGUN DOCUMENTO MULTIMEDIA    CMS       pendiente de crear en oracle   
export const CMSDATA2523 =[{ 
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