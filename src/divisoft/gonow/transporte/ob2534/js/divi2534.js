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
        NOMBRE: "MAX_ALTURA",
        VALOR1:null,
        VALOR2: "",
        CDATA: "0"
      }); 
      filas.push({
        NOMBRE: "MAX_ANCHO",
        VALOR1:null,
        VALOR2: "",
        CDATA: "0"
      }); 
      filas.push({
        NOMBRE: "MAX_LARGO",
        VALOR1:null,
        VALOR2: "",
        CDATA: "0"
      }); 
      filas.push({
        NOMBRE: "DES_RANGOVOLUMEN",
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
                      },  ];   // fin de filtros

 
//////////////////////////////////////
 
             // RegistroNuevo  Gen_CAMPOS_MANTE(1)
             export const datosDefault =[{
     NUM_RANGOVOLUMEN:0,
     MAX_ALTURA:0,
     MAX_ANCHO:0,
     MAX_LARGO:0,
     DES_RANGOVOLUMEN:"0",
     IND_ESTADO:"0",
}];

             
  
             
   
    export const mensajesValidacion = {
    custom: {
 NUM_RANGOVOLUMEN : {
            required: "El Num Rangovolumen es obligatorio" 
        },MAX_ALTURA : {
            required: "El Max Altura es obligatorio" 
        },MAX_ANCHO : {
            required: "El Max Ancho es obligatorio" 
        },MAX_LARGO : {
            required: "El Max Largo es obligatorio" 
        },DES_RANGOVOLUMEN : {
            required: "El Des Rangovolumen es obligatorio" 
        },IND_ESTADO : {
            required: "El Ind Estado es obligatorio" 
        },   }
};    
 // RegistroNuevo Gen_CAMPOS_GRID(5)
              export const columnDefs = [
  {
                                  headerName: "Num Rangovolumen",
                                  field: "NUM_RANGOVOLUMEN",
                                  filter: true,
                                  lockPosition: true,
                                  width: 150
                                }, 
                              {
                                  headerName: "Des Rangovolumen",
                                  field: "DES_RANGOVOLUMEN",
                                  filter: true,
                                  lockPosition: true,
                                  width: 250
                                }, 
                              ];   // De defincion de  Columnas

  
 
/// solo si lleva ALGUN DOCUMENTO MULTIMEDIA    CMS       pendiente de crear en oracle   
export const CMSDATA2534 =[{ 
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