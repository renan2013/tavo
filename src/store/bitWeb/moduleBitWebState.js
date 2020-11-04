export default {


    raizUrl: process.env.VUE_APP_RAIZURL,

    // PUBLICACIONES
    Imagenes: [], //ID_CATEGORIA: 1,
    Videos: [], //ID_CATEGORIA: 2,
    Noticias: [], // ID_CATEGORIA: 5, 

    slider: [], //ID_CATEGORIA: 6


    publicacionesMulti: [],
    publicacionesCortas: [],


    Multidocumentos: [], //es un arreglo con todos los documentos por referencia


    // categorias
    catImagenes: 1,
    catVideos: 2,
    catNoticias: 5,
    catSlider: 6,
    catPubCorta: 7,

    // BOOLEAN DE AREA ACTIVA si se carga false no 
    isImagenes: false, //ID_CATEGORIA: 1,
    isVideos: false, //ID_CATEGORIA: 2,
    isNoticias: false, // ID_CATEGORIA: 5,
    isSlider: true, //ID_CATEGORIA: 6
    isPubCorta: true, //ID_CATEGORIA: 7


    recargar: 1,
    // /////////////////////////////////////////////inicio bitweb
    // DATOS DE PETICION DE REST 
    selectedRow: [], // la Fila que se desea  
    selectedRows: [],
    datosPublicacion: [],
    selectQuery: [], // tipo de indicador 9


    estadoProcesando: 0,

    urlDsoa: "http://201.194.194.84:8998/DsoaService2/dsoa/request",
    //urlDsoaCMS: "http://201.194.194.84:8998/DsoaService2/dsoa/CMSrequest",
    //urlDsoaCMS: "http://localhost:8089/DsoaService2/dsoa/CMSrequest",
    urlDsoaCMS: "http://201.194.194.84:8998/DsoaService2/dsoa/CMSrequest",

    urlDsoaPHP: process.env.VUE_APP_URLPHP,
    urlDsoaPHP2: process.env.VUE_APP_URLPHP2,
    urlDsoaPHP3: process.env.VUE_APP_URLPHP,


    urlDsoa: process.env.VUE_APP_DSOA,
    urlDsoaCMS: process.env.VUE_APP_CMS,

    indicadorDML: "XX",
    laststrheader: "", // ultimo encabezado
    laststrParametros: "", //ultimo parametros 
    laststrFilas: "", //ultimo pedido de filas

    lastBdmsage: "Proceso Exitoso",
    lastBdmsgcode: 0,
    respuesta: [],
    peticion: "",

    dsoaModel: {
        datos: "",
        dml: "",
        ObjectId: "",
        formato: "",
        Credencial: "",
        formatoRequest: "",
        codigoerror: "9999",
        deserror: ""
    },


    //// DIVISOFT MULTIMEDIA  MULTIMEDIA MULTIMEDIA MULTIMEDIA MULTIMEDIA MULTIMEDIA MULTIMEDIA 
    // datos  PRINCIPALES



    //ARRAY GLOBAL
    tableKey: [],
    urlOrigen: "J", //J=Java, P= PHP, M= Microsoft
    datosJ: {
        page: "0",
        total: "0",
        registros: "0",
        rows: []
    },
    datosV: "",
    datosGrid: {
        page: "0",
        total: "0",
        registros: "0",
        rows: []
    },

    datosPrompt: {
        page: "0",
        total: "0",
        registros: "0",
        rows: []
    },

    rows: [],
    datosForm: {
        page: "0",
        total: "0",
        registros: "0",
        rows: []
    },
    rowsForm: [],

    datosGridPhp: {
        page: "0",
        registros: "0",
        rows: [],
        total: "0"
    },

    datosMsj: [],
    llaveRec: [], // datos de un registro uno solo 
    //DATOS BPM

    //DATOS PROFILE USUSARIO Y DE APLICACION  /////////////////////////////////////////////
    userProfile: [],
    appProfile: [],
    //para efectos de PROCEDIMIENTOS ALMACENADOS
    procRESPUESTAXML: "",
    respuestaProc: [],

    /// BIT WEB BIT WEB BIT WE

    publicaciones: [],
    sintesis: [],

    desarrollo: {},


}