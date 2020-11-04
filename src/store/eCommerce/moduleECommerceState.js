/* eslint-disable */
export default {

    // DATOS DE PETICION DE REST 
    selectedRow: [], // la Fila que se desea  
    selectedRows: [],
    selectQuery: [], // tipo de indicador 9
    estadoProcesando: 0,

    //urlDsoa: process.env.VUE_APP_DSOA,
    //urlDsoaCMS: process.env.VUE_APP_CMS, 


    urlDsoa: "http://201.194.194.84:8998/DsoaService2/dsoa/request", //process.env.VUE_APP_DSOA,
    urlDsoaCMS: "http://201.194.194.84:8998/DsoaService2/dsoa/CMSrequest", // process.env.VUE_APP_CMS,



    indicadorDML: "JJ",
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
    DataCMS: {
        CodCia: '',
        CodigoPeticion: '',
        Repositorio: '',
        GuardaArchivo: '',
        RutaOrigen: '',
        ExtensionFinal: '',
        RutaDestino: '',
        EntidadCodigo: '',
        LlaveExterna: '',
        NumNivel: '',
        NumDoc: '',
        ReferenciaPadre: '',
        Referencia: '0',
        hashDoc: '',
        ReferenciaPersonalizada: '',
        IndicadorAtiendeWs: '',
        FormatoImagen: '',
        DirectorioCrear: '',
        DestinoFisico: '',
        DirectorioSeparatorOrigen: '',
        InsertarBd: '',
        DocumentoMimeType: '',
        NombreObjeto: '',
        Descripcion: '',
        Extension: '',
        NuevoNombre: '',
        Thumb: '',
        Lote: '',
        FormatoArchivoDestino: '',
        Credencial: ""
    },
    // PARA MANIPULAR LA IMAGEN 
    ManipulacionCMS: [{
        PaginaInicio: '',
        PaginaFinal: '',
        directoriocrear: '',
        FormatoImagenAgua: '',
        TextoImagenAgua: '',
        ImagenAgua: '',
        FondoFrente: '',
        ColorTexto: '',
        TamanoLetra: '',
        CantidadMarcas: '',
        XimagenAgua: '',
        YimagenAgua: '',
        FondoFrente: '',
        Timestamp: ''
    }],
    /// INDICACIONES DE BASE DATOS
    BdCMS: [{
        Encriptado: '',

        TipoGuardado: '',
        EntidadCodigo: '',
        InformacionBusqueda: '',
        TipoRespuesta: '',
        DirectorioSeparadorOrigen: '',
        GuardarImagenDestino: '',
        Directorio: '',
        IndMultipleEntidad: '',
        Size: ''
    }],

    //ARRAY GLOBAL
    tableKey: [],
    urlOrigen: "J", //J=Java, P= PHP, M= Microsoft
    datosJ: { page: "0", total: "0", registros: "0", rows: [] },
    datosGrid: { page: "0", total: "0", registros: "0", rows: [] },
    datosPrompt: { page: "0", total: "0", registros: "0", rows: [] },
    rows: [],
    datosMsj: [],
    //DATOS BPM
    numHilo: 0,
    numHiloActivo: 0,
    etapaBPM: "",

    procRESPUESTAXML: "",
    respuestaProc: [],



    wishList: [],
    cartItems: [],
    catalogoProducts: [],
    ProductsRow: {},
    ulimoProducto: 0,
    related_items: [],
    ////////////////////////////////////////////////////////////////////


    // LISTA DE DESEOS  //////////////////////////////////////////////////////////////////////////////////////

}