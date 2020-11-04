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
                            NOMBRE: "COD_CHOFER",
                            VALOR1:"",
                            VALOR2: "9999999999",
                            CDATA: "0"
                          }); 
                          filas.push({
                            NOMBRE: "COD_CATEGORIA_TAXI",
                            VALOR1:"",
                            VALOR2: "9",
                            CDATA: "0"
                          }); 
                          filas.push({
                            NOMBRE: "COD_PERSONA",
                            VALOR1:"",
                            VALOR2: "99999999",
                            CDATA: "0"
                          }); 
                          filas.push({
                            NOMBRE: "COD_CIA",
                            VALOR1:"",
                            VALOR2: "999",
                            CDATA: "0"
                          }); 
                          filas.push({
                            NOMBRE: "COD_ZONA",
                            VALOR1:"",
                            VALOR2: "",
                            CDATA: "0"
                          }); 
                          filas.push({
                            NOMBRE: "TIPO_CHOFER",
                            VALOR1:"",
                            VALOR2: "",
                            CDATA: "0"
                          }); 
                          filas.push({
                            NOMBRE: "LONGITUD",
                            VALOR1:"",
                            VALOR2: "",
                            CDATA: "0"
                          }); 
                          filas.push({
                            NOMBRE: "LATITUD",
                            VALOR1:"",
                            VALOR2: "",
                            CDATA: "0"
                          }); 
                          filas.push({
                            NOMBRE: "NUM_CALIFICACION",
                            VALOR1:"",
                            VALOR2: "",
                            CDATA: "0"
                          }); 
                          filas.push({
                            NOMBRE: "NUM_PLACA",
                            VALOR1:"",
                            VALOR2: "",
                            CDATA: "0"
                          }); 
                          filas.push({
                            NOMBRE: "DES_MARCA",
                            VALOR1:"",
                            VALOR2: "",
                            CDATA: "0"
                          }); 
                          filas.push({
                            NOMBRE: "DES_MODELO",
                            VALOR1:"",
                            VALOR2: "",
                            CDATA: "0"
                          }); 
                          filas.push({
                            NOMBRE: "NUM_ANNO",
                            VALOR1:"",
                            VALOR2: "9999",
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
                            NOMBRE: "NUM_CONTRATO",
                            VALOR1:"",
                            VALOR2: "999999999999",
                            CDATA: "0"
                          }); 
                          filas.push({
                            NOMBRE: "HASH_CONTRATO",
                            VALOR1:"",
                            VALOR2: "",
                            CDATA: "0"
                          }); 
                          filas.push({
                            NOMBRE: "IND_ESTADO",
                            VALOR1:"",
                            VALOR2: "",
                            CDATA: "0"
                          }); 
        filas.push({
        NOMBRE: "(select  Z.TIP_COMISIONTAXI from GO_COMISIONTAXI Z where  Z.COD_CATEGORIA_TAXI= A.COD_CATEGORIA_TAXI)  AS  TIP_COMISIONTAXI",
        VALOR1:null,
           VALOR2: "9",
        CDATA: "0"
        });
 
        filas.push({
        NOMBRE: "(select  Z.NOM_PERSONA from GO_PERSONAS Z where  Z.COD_PERSONA= A.COD_PERSONA AND   Z.COD_CIA= A.COD_CIA)  AS  NOM_PERSONA",
        VALOR1:null,
           VALOR2: "999",
        CDATA: "0"
        });
 
        filas.push({
        NOMBRE: "(select  Z.NOM_PERSONA from GO_PERSONAS Z where  Z.COD_PERSONA= A.COD_PERSONA AND   Z.COD_CIA= A.COD_CIA)  AS  NOM_PERSONA",
        VALOR1:null,
           VALOR2: "99999999",
        CDATA: "0"
        });
  
                     filas.push({
        NOMBRE:
          "DBPMS.CMS_K_IMAGE_MANAGER.CRM_P_GET_CMSINFO(" +
          CMSDATA2535[0].EntidadCodigo +
          "," +
           CMSDATA2535[0].LlaveExterna +
          "," +
          CMSDATA2535[0].NumNivel +
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
                "NOMBRE_CAMPO":"Cod Chofer",
                "NOMBRE_INTERNO":"COD_CHOFER",
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
     COD_CHOFER:0,
     COD_CATEGORIA_TAXI:0,
     COD_PERSONA:0,
     COD_CIA:0,
     COD_ZONA:"0",
     TIPO_CHOFER:"0",
     LONGITUD:0,
     LATITUD:0,
     NUM_CALIFICACION:0,
     NUM_PLACA:"0",
     DES_MARCA:"0",
     DES_MODELO:"0",
     NUM_ANNO:0,
     IMG_AVATAR:0,
     HASH_AVATAR:"0",
     NUM_CONTRATO:0,
     HASH_CONTRATO:"0",
     IND_ESTADO:"0",
     TIP_COMISIONTAXI:null,
     NOM_PERSONA:null,
     NOM_PERSONA:null,
}];

             
  
             
   
    export const mensajesValidacion = {
    custom: {
 COD_CHOFER : {
            required: "El Cod Chofer es obligatorio" 
        },COD_PERSONA : {
            required: "El Cod Persona es obligatorio" 
        },COD_CIA : {
            required: "El Cod Cia es obligatorio" 
        },COD_ZONA : {
            required: "El Cod Zona es obligatorio" 
        },NUM_CALIFICACION : {
            required: "El Num Calificacion es obligatorio" 
        },IND_ESTADO : {
            required: "El Ind Estado es obligatorio" 
        },TIP_COMISIONTAXI : {
            required: "El Tipo Comision es obligatorio" 
        },NOM_PERSONA : {
            required: "El Nombre es obligatorio" 
        },   }
};    
 // RegistroNuevo Gen_CAMPOS_GRID(5)
              export const columnDefs = [
  {
                                  headerName: "Cod Chofer",
                                  field: "COD_CHOFER",
                                  filter: true,
                                  lockPosition: true,
                                  width: 150
                                }, 
                              {
                                  headerName: "Nombre",
                                  field: "NOM_PERSONA",
                                  filter: true,
                                  lockPosition: true,
                                  width: 150
                                }, 
                              {
                                  headerName: "Cod Persona",
                                  field: "COD_PERSONA",
                                  filter: true,
                                  lockPosition: true,
                                  width: 150
                                }, 
                              ];   // De defincion de  Columnas

  
 
/// solo si lleva ALGUN DOCUMENTO MULTIMEDIA    CMS       pendiente de crear en oracle   
export const CMSDATA2535 =[{ 
  EntidadCodigo:"26",
  LlaveExterna:"9000",
  NumNivel:1265,
  numDoc:0,
  Encriptado:"", 
  IndMultipleEntidad:"1",
  Directorio:"1",
  llavegenerica:""
}];


