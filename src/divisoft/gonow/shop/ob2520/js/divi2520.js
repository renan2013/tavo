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
        VALOR2: "",
        CDATA: "0"
      }); 
      filas.push({
        NOMBRE: "COD_CIA",
        VALOR1:null,
        VALOR2: "9999",
        CDATA: "0"
      }); 
      filas.push({
        NOMBRE: "COD_PERSONA",
        VALOR1:null,
        VALOR2: "99999999",
        CDATA: "0"
      }); 
      filas.push({
        NOMBRE: "NOM_NEGOCIO",
        VALOR1:null,
        VALOR2: "",
        CDATA: "0"
      }); 
      filas.push({
        NOMBRE: "COD_DIRECCION",
        VALOR1:null,
        VALOR2: "9999999",
        CDATA: "0"
      }); 
      filas.push({
        NOMBRE: "NUM_TELEFONO1",
        VALOR1:null,
        VALOR2: "99999999",
        CDATA: "0"
      }); 
      filas.push({
        NOMBRE: "NUM_TEFEFONO2",
        VALOR1:null,
        VALOR2: "99999999",
        CDATA: "0"
      }); 
      filas.push({
        NOMBRE: "TIP_PATNER",
        VALOR1:null,
        VALOR2: "",
        CDATA: "0"
      }); 
      filas.push({
        NOMBRE: "NUM_CALIFICACION",
        VALOR1:null,
        VALOR2: "",
        CDATA: "0"
      }); 
      filas.push({
        NOMBRE: "IMG_AVATAR",
        VALOR1:null,
        VALOR2: "999999999999",
        CDATA: "0"
      }); 
      filas.push({
        NOMBRE: "HASH_AVATAR",
        VALOR1:null,
        VALOR2: "",
        CDATA: "0"
      }); 
      filas.push({
        NOMBRE: "NUM_CONTRATO",
        VALOR1:null,
        VALOR2: "999999999999",
        CDATA: "0"
      }); 
      filas.push({
        NOMBRE: "HASH_CONTRATO",
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
 
        filas.push({
        NOMBRE: "(select  Z.VALOR_COMISIONPATNER from GO_COMISIONPATNER Z where  Z.COD_CATEGORIAPATNER= A.COD_CATEGORIAPATNER)  AS  DI_VALOR",
        VALOR1:null,
        VALOR2: "",
        CDATA: "0"
        });
 
        filas.push({
        NOMBRE: "(select  Z.DES_DIRECCION from GO_DIRECCIONES Z where  Z.COD_DIRECCION= A.COD_DIRECCION)  AS  DI_DIRECCION",
        VALOR1:null,
           VALOR2: "9999999",
        CDATA: "0"
        });
 
        filas.push({
        NOMBRE: "()  AS  DI_NOMBRE",
        VALOR1:null,
           VALOR2: "99999999",
        CDATA: "0"
        });
  return filas; 
    }; 
   //addFilasDet funcion completa 
   
   
  // RegistroNuevo Gen_CAMPOS_GRID(4)
  export const filtros= [ 
     { 
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
  ,{ 
                              "TIPO":"LIKE",
                              "LABEL":"texto"
                          },
     ]
                      },  ];   // fin de filtros

 
//////////////////////////////////////
 
             // RegistroNuevo  Gen_CAMPOS_MANTE(1)
             export const datosDefault =[{
     COD_CATEGORIAPATNER:"0",
     COD_CIA:0,
     COD_PERSONA:0,
     NOM_NEGOCIO:"0",
     COD_DIRECCION:0,
     NUM_TELEFONO1:0,
     NUM_TEFEFONO2:0,
     TIP_PATNER:"0",
     NUM_CALIFICACION:0,
     IMG_AVATAR:0,
     HASH_AVATAR:"0",
     NUM_CONTRATO:0,
     HASH_CONTRATO:"0",
     IND_ESTADO:"0",
     DI_CIA:null,
     DI_VALOR:null,
     DI_DIRECCION:null,
     DI_NOMBRE:null,
}];

             
  
             
   
    export const mensajesValidacion = {
    custom: {
 COD_CIA : {
            required: "El Cod Cia es obligatorio" 
        },COD_PERSONA : {
            required: "El Cod Persona es obligatorio" 
        },NOM_NEGOCIO : {
            required: "El Nom Negocio es obligatorio" 
        },NUM_TELEFONO1 : {
            required: "El Num Telefono1 es obligatorio" 
        },NUM_CALIFICACION : {
            required: "El Num Calificacion es obligatorio" 
        },IND_ESTADO : {
            required: "El Ind Estado es obligatorio" 
        },DI_PERSONA : {
            required: "El Nombre es obligatorio" 
        },DI_APELLIDO1 : {
            required: "El Apellido 1 es obligatorio" 
        },DI_APELLIDO2 : {
            required: "El Apellido 2 es obligatorio" 
        },DI_DIRECCION : {
            required: "El Dirección es obligatorio" 
        },DI_CIA : {
            required: "El Nombre es obligatorio" 
        },DI_NOMBRE : {
            required: "El Nombre es obligatorio" 
        },DI_VALOR : {
            required: "El Valor es obligatorio" 
        },   }
};    
 // RegistroNuevo Gen_CAMPOS_GRID(5)
              export const columnDefs = [
  {
                                  headerName: "Cod Patner",
                                  field: "COD_PATNER",
                                  filter: true,
                                  lockPosition: true,
                                  width: 150
                                }, 
                              {
                                  headerName: "Nom Negocio",
                                  field: "NOM_NEGOCIO",
                                  filter: true,
                                  lockPosition: true,
                                  width: 500
                                }, 
                              {
                                  headerName: "Num Calificacion",
                                  field: "NUM_CALIFICACION",
                                  filter: true,
                                  lockPosition: true,
                                  width: 150
                                }, 
                              ];   // De defincion de  Columnas

  
 
/// solo si lleva ALGUN DOCUMENTO MULTIMEDIA    CMS       pendiente de crear en oracle   
export const CMSDATA2520 =[{ 
  EntidadCodigo:"26",
  LlaveExterna:"9000",
  NumNivel:1265,
  numDoc:0,
  Encriptado:"", 
  IndMultipleEntidad:"1",
  Directorio:"1",
  llavegenerica:""
}];


 export const LI_TIPOPATNER= [
{ text: "Malo", value: "M" },{ text: "Regular", value: "R" },{ text: "Bueno", value: "B" },{ text: "VIP", value: "V" },];  export const LI_ESTADO= [
{ text: "Inactivo", value: "0" },{ text: "Activo", value: "1" },]; 