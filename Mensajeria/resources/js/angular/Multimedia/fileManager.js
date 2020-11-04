app.factory("fileManager", function(DBparametros, DBpeticiones, modalBpm,$timeout) {
    var parametrosCMS = {
            "DATOSCMS": {
                "CodigoPeticion": 0,
                "IndicadorAtiendeWs": "GX",
                "TipoGuardado": "T",
                "EntidadCodigo": 0,
                "LlaveExterna": 0,
                "FormatoImagen": "64", //64 STIRNG DEL FILE Y N RUTA NORMAL
                "RutaOrigen": "", //AQUÍ VA EL ARCHIVO 64
                "RutaDestino": "",
                "NumDoc": 0,
                "NumNivel": 0,
                "Referencia": 0,
                "ReferenciaPadre": 0,
                "DirectorioCrear": "",
                "ExtensionFinal": "",
                "DestinoFisico": "",
                "DirectorioSeparatorOrigen": "",
                "InsertarBd": "S",
                "Extension": ""
            },
            "DATOSCMSBD": {
                "TipoGuardado": "T",
                "InformacionBusqueda": "",
                "TipoRespuesta": "J"

            }

        };
        var Rutalternativa;
        var path;
    var interfaz = {
        showLoader : false,
        setPath : function(param){
            path = param;
        },
        getPath : function(){
            return path;
        },
        setLoader : function(status){
            interfaz.showLoader = status;
        },
        setRutalternativa : function(ruta){
            Rutalternativa = ruta;
        },
        getParametrosCMS : function(peticion){
            parametrosCMS.DATOSCMS.CodigoPeticion = peticion;
            return parametrosCMS;
        },
        openDocs : function(tipo) {
        //alert(tipo);
            var types = [".DOC", ".DOCX", ".PDF", ".TXT", ".XLS", ".XLSX", ".PPT", ".PPTX", ".GIF"];
            //alert(types.indexOf(tipo));
            if (types.indexOf(tipo) != -1)
                return true;
            return false;

       },
       download : function(type,parametrosRecupera,tipoDescarga){
            //alert(window.innerWidth);
            var anchoModal = Number(window.innerWidth) - 60;
            var largoModal = Number(window.innerHeight) -20;
            parametrosRecupera.DATOSCMS.RutaDestino = "temp";
            var forceOpen = false;
            
            if(tipoDescarga !== undefined && (tipoDescarga === "tab" || tipoDescarga === "path") )
                forceOpen = true;
            
            if (!this.openDocs(type.toUpperCase()) && !forceOpen) {
                    modalBpm.limpiarParametros();
                    var params = {
                        "backdrop": false,
                        "keyboard": true,
                        "template": "",
                        "controller": "",
                        "botones": {
                            "aceptar": false,
                            "cancelar": false,
                            "ancho": anchoModal+"px",//"200%",
                            //"largo": "700px",
                            "largo": largoModal +"px",
                            "ancho_external": '100%',
                            "largo_external": '600px',
                            "top": "-20px",
                            //"left": "-63%",
                            "left": "-55%",
                            "fondo": "black"
                        },
                        "object_id": undefined,

                        "externalWeb": '../visorImagenes.htm?DATOSCMS=' + btoa(JSON.stringify(parametrosRecupera.DATOSCMS)) + '&DATOSCMSBD=' + btoa(JSON.stringify(parametrosRecupera.DATOSCMSBD))
                    }
                    modalBpm.limpiarParametros();
                    modalBpm.setParametros(params);
                    if(Rutalternativa !== undefined)
                        modalBpm.setRutaAlternativa(Rutalternativa);
            
                    modalBpm.open();
            }else{
                if(Rutalternativa !== undefined)
                    DBpeticiones.setAlternativa(Rutalternativa);
                var data = DBpeticiones.getQUERYGENERALJFile(null, null, null, null, null, parametrosRecupera);
                data.success(function(response){
                        var $xml;
                        var $tile;
                        //console.log(response);
                        try {
                            $xml = $(response);
                            var infoarchivo = $xml.find("infoarchivo").text();
                            var file = JSON.parse(infoarchivo).NuevoNombre;
                            var show = "resources/temp/" + file;
                            interfaz.setLoader(false);
                            $timeout(function(){
                               if(tipoDescarga === "tab")
                                 window.open(show);
                               else if(tipoDescarga === "path")
                                   path =show;
                            },1000);
                            
                            
                            //setLocalStorage("showSuccess",false);

                        } catch (Exception) {
                            /*notificationsStore.clearAlerts();
                            notificationsStore.addAlerts({
                                type: 'danger',
                                msg: "Error guardando" + response
                            });
                            notificationsStore.showAlerts();*/
                           // alert(response);
                           if(tipoDescarga === "path")
                                   path ="NO FILE";
                            return;
                        }

                });
           }
      },
        
       findServerLocalFile : function(path,fileName,rest){
           var response;
           $.ajax({
                type: "POST",
                url: rest,
                data: {"PATH": path,"FILE" : fileName},
                cache: false,
                async: false,
                'beforeSend': function(xhr) {
                    xhr.overrideMimeType('text/html; charset=iso-8859-1');

                },
                success: function(data) {
                    //console.log("succes",data);
                    response = JSON.parse(data);
                },
                error: function(xhr, ajaxOptions, thrownError) {
                    /*alert("error de loging ");
                     alert("ENTRO ERROR: " + xhr.status);
                     alert(thrownError);*/
                    console.log("error",xhr, ajaxOptions, thrownError);
                }
            });
            
            return response;
       } 
    };
    return interfaz;
});


