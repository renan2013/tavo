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
        VALOR2: "999",
        CDATA: "0"
      }); 
      filas.push({
        NOMBRE: "ID_TIPOIDENTIFICACION",
        VALOR1:null,
        VALOR2: "",
        CDATA: "0"
      }); 
      filas.push({
        NOMBRE: "ID_IDENTIFICACION",
        VALOR1:null,
        VALOR2: "",
        CDATA: "0"
      }); 
      filas.push({
        NOMBRE: "NOM_PERSONA",
        VALOR1:null,
        VALOR2: "",
        CDATA: "0"
      }); 
      filas.push({
        NOMBRE: "APELLIDO1",
        VALOR1:null,
        VALOR2: "",
        CDATA: "0"
      }); 
      filas.push({
        NOMBRE: "APELLIDO2",
        VALOR1:null,
        VALOR2: "",
        CDATA: "0"
      }); 
      filas.push({
        NOMBRE: "FEC_INGRESO",
        VALOR1:null,
        VALOR2: "YYYY-DD-MM",
        CDATA: "0"
      }); 
      filas.push({
        NOMBRE: "CTA_CORREO",
        VALOR1:null,
        VALOR2: "",
        CDATA: "0"
      }); 
      filas.push({
        NOMBRE: "NUM_TELEFONO",
        VALOR1:null,
        VALOR2: "9999999999",
        CDATA: "0"
      }); 
      filas.push({
        NOMBRE: "COD_DIRECCION",
        VALOR1:null,
        VALOR2: "99999999",
        CDATA: "0"
      }); 
      filas.push({
        NOMBRE: "IND_ESTADO",
        VALOR1:null,
        VALOR2: "",
        CDATA: "0"
      }); 
        filas.push({
        NOMBRE: "(select  Z.DES_DIRECCION from GO_DIRECCIONES Z where  Z.COD_DIRECCION= A.COD_DIRECCION)  AS  DI_DIRECCION",
        VALOR1:null,
           VALOR2: "99999999",
        CDATA: "0"
        });
 
        filas.push({
        NOMBRE: "(select  Z.NOM_CIA from GO_COMPANIA Z where  Z.COD_CIA= A.COD_CIA)  AS  DI_CIA",
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
                "NOMBRE_CAMPO":"Cod Persona",
                "NOMBRE_INTERNO":"COD_PERSONA",
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
                      },  ];   // fin de filtros

 
//////////////////////////////////////
 
             // RegistroNuevo  Gen_CAMPOS_MANTE(1)
             export const datosDefault =[{
     COD_CIA:0,
     ID_TIPOIDENTIFICACION:"0",
     ID_IDENTIFICACION:"0",
     NOM_PERSONA:"0",
     APELLIDO1:"0",
     APELLIDO2:"0",
     FEC_INGRESO:"0",
     CTA_CORREO:"0",
     NUM_TELEFONO:0,
     COD_DIRECCION:0,
     IND_ESTADO:"0",
     DI_DIRECCION:null,
     DI_CIA:null,
}];

             
  
             
   
    export const mensajesValidacion = {
    custom: {
 COD_CIA : {
            required: "El Cod Cia es obligatorio" 
        },NOM_PERSONA : {
            required: "El Nom Persona es obligatorio" 
        },APELLIDO1 : {
            required: "El Apellido1 es obligatorio" 
        },APELLIDO2 : {
            required: "El Apellido2 es obligatorio" 
        },DI_CIA : {
            required: "El Nombre es obligatorio" 
        },DI_DIRECCION : {
            required: "El Nombre es obligatorio" 
        },   }
};    
 // RegistroNuevo Gen_CAMPOS_GRID(5)
              export const columnDefs = [
  {
                                  headerName: "Cod Persona",
                                  field: "COD_PERSONA",
                                  filter: true,
                                  lockPosition: true,
                                  width: 150
                                }, 
                              {
                                  headerName: "Cod Cia",
                                  field: "COD_CIA",
                                  filter: true,
                                  lockPosition: true,
                                  width: 150
                                }, 
                              {
                                  headerName: "Cod Direccion",
                                  field: "COD_DIRECCION",
                                  filter: true,
                                  lockPosition: true,
                                  width: 150
                                }, 
                              {
                                  headerName: "Nombre",
                                  field: "DI_DIRECCION",
                                  filter: true,
                                  lockPosition: true,
                                  width: 1000
                                }, 
                              ];   // De defincion de  Columnas

  
 
/// solo si lleva ALGUN DOCUMENTO MULTIMEDIA    CMS       pendiente de crear en oracle   
export const CMSDATA2511 =[{ 
  EntidadCodigo:"26",
  LlaveExterna:"9000",
  NumNivel:1265,
  numDoc:0,
  Encriptado:"", 
  IndMultipleEntidad:"1",
  Directorio:"1",
  llavegenerica:""
}];


 export const LI_TIPIDENT= [
{ text: "Física", value: "01" },{ text: "Jurídica", value: "02" },{ text: "DIMEX", value: "03" },{ text: "NITE", value: "04" },];  export const LI_ESTADO= [
{ text: "Inactivo", value: "0" },{ text: "Activo", value: "1" },]; 