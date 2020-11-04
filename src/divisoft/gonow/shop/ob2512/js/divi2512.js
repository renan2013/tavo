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
        NOMBRE: "COD_CATEGORIAPATNER",
        VALOR1:null,
        VALOR2: "9",
        CDATA: "0"
      }); 
      filas.push({
        NOMBRE: "TIP_COMISIONPATNET",
        VALOR1:null,
        VALOR2: "",
        CDATA: "0"
      }); 
      filas.push({
        NOMBRE: "VALOR_COMISIONPATNER",
        VALOR1:null,
        VALOR2: "",
        CDATA: "0"
      }); 
      filas.push({
        NOMBRE: "FEC_CREACION",
        VALOR1:null,
        VALOR2: "YYYY-DD-MM",
        CDATA: "0"
      });  return filas; 
    }; 
   //addFilasDet funcion completa 
   
   
  // RegistroNuevo Gen_CAMPOS_GRID(4)
  export const filtros= [ 
     { 
                "NOMBRE_CAMPO":"Cod Categoriapatner",
                "NOMBRE_INTERNO":"COD_CATEGORIAPATNER",
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
     COD_CATEGORIAPATNER:0,
     TIP_COMISIONPATNET:"0",
     VALOR_COMISIONPATNER:0,
     FEC_CREACION:"0",
}];

             
  
             
   
    export const mensajesValidacion = {
    custom: {
 COD_CATEGORIAPATNER : {
            required: "El Cod Categoriapatner es obligatorio" 
        },TIP_COMISIONPATNET : {
            required: "El Tip Comisionpatnet es obligatorio" 
        },VALOR_COMISIONPATNER : {
            required: "El Valor Comisionpatner es obligatorio" 
        },FEC_CREACION : {
            required: "El Fec Creacion es obligatorio" 
        },   }
};    
 // RegistroNuevo Gen_CAMPOS_GRID(5)
              export const columnDefs = [
  {
                                  headerName: "Cod Categoriapatner",
                                  field: "COD_CATEGORIAPATNER",
                                  filter: true,
                                  lockPosition: true,
                                  width: 150
                                }, 
                              {
                                  headerName: "Tip Comisionpatnet",
                                  field: "TIP_COMISIONPATNET",
                                  filter: true,
                                  lockPosition: true,
                                  width: 150
                                }, 
                              {
                                  headerName: "Valor Comisionpatner",
                                  field: "VALOR_COMISIONPATNER",
                                  filter: true,
                                  lockPosition: true,
                                  width: 150
                                }, 
                              ];   // De defincion de  Columnas

  
 
/// solo si lleva ALGUN DOCUMENTO MULTIMEDIA    CMS       pendiente de crear en oracle   
export const CMSDATA2512 =[{ 
  EntidadCodigo:"26",
  LlaveExterna:"9000",
  NumNivel:1265,
  numDoc:0,
  Encriptado:"", 
  IndMultipleEntidad:"1",
  Directorio:"1",
  llavegenerica:""
}];


 export const LI_TIPCOMISION= [
{ text: "Porcentaje", value: "P" },{ text: "Monto", value: "M" },]; 