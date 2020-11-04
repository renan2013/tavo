app.controller('baseConocimientoMainControllers', function($scope, DBparametros, DBpeticiones, 
  orderByFilter, $timeout,fileManager,modalBpm) {
    /*CurrentUser.setAlternativa('../'); 
    $scope.User = CurrentUser.getCurrentUser();*/
    /*CurrentUser.setAlternativa('');
    $scope.User = CurrentUser.getCurrentUser();*/
    $scope.searchMode = "T";
     $scope.bc = [];
    $scope.buscar ;
    $scope.getParametrosCMS = function(peticion) {
        return {
            "DATOSCMS": {
                "CodigoPeticion": peticion,
                "IndicadorAtiendeWs": "GX",
                "TipoGuardado": "T",
                "EntidadCodigo": /*$scope.atiende.ID_ENTIDAD*/"",
                "LlaveExterna": /*$scope.atiende.ID*/"",
                "FormatoImagen": "64", //64 STIRNG DEL FILE Y N RUTA NORMAL
                "RutaOrigen": "", //AQUÍ VA EL ARCHIVO 64
                "RutaDestino": "",
                "NumDoc": /*$scope.etapa_proceso.NUM_DOCETAPA*/"",
                "NumNivel": 50,
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
    }
    
    $scope.openDocs = function(tipo) {
        //alert(tipo);
        var types = [".DOC", ".DOCX", ".PDF", ".TXT", ".XLS", ".XLSX", ".PPT", ".PPTX", ".GIF"];
        //alert(types.indexOf(tipo));
        if (types.indexOf(tipo) != -1)
            return true;
        return false;

    }
    
    
    $scope.doSearch = function(){
        //alert();
        if(!isEmpty($scope.buscar)){
            DBparametros.limpiarPeticiones();
            DBparametros.addParam("GV_CREDENCIAL","", "N", "");
            DBparametros.addParam("GV_Entidad","", "N", "");
            DBparametros.addParam("GV_llave","", "N", "");
            DBparametros.addParam("Gv_frases_Clave",$scope.buscar, "N", "");
            DBparametros.addParam("Gv_tipollamado",$scope.searchMode, "N", "");//FIJO E -- SI VIENE DESDE WEB E=EXTERNO I=INTERNO
            DBparametros.addParam("Pv_indicadorConsulta","N", "N", "");
            DBpeticiones.setAlternativa('');
            $scope.bc = DBpeticiones.bdRequest(DBparametros.getPeticiones(), 249, 'E');
           // console.log($scope.bc );
        }
    }
    
    $scope.changeSearch = function(tipo){
        $scope.searchMode = tipo;
        $scope.doSearch();
    }
    
    $scope.openLink = function(conocimiento){
        if(conocimiento.TIPO === "P"){
         //window.open('http://192.168.0.3:8081/DbpmsWebSpring/resources/dbpmsAJS/index.html#/app/dbpms-atiendePendiente');
            var atiende = {};
            atiende.NUM_HILO = conocimiento.ID;
            atiende.DESCRIPCION = conocimiento.DETALLE;
            atiende.ID = conocimiento.HILO_ACTIVO;
            atiende.ID_ENTIDAD = conocimiento.ID_ENTIDAD;
            setLocalStorage('atiendeConocimiento',JSON.stringify(atiende)); 
            window.open('resources/dbpmsAJS/index.html#/app/dbpms-atiendePendiente');
           
        }else if(conocimiento.TIPO === "I"){
           $scope.visorDoc(conocimiento.ID,conocimiento.ID_ENTIDAD,conocimiento.NUM_DOC,conocimiento.EXTENSION);
        }else if(conocimiento.TIPO === "C"){
            
                window.location.href = "visorTexto.htm?Titulo="+conocimiento.NOMBRE+"&Texto="+conocimiento.DETALLE+
                   "&InfoCampo="+JSON.stringify(conocimiento) ;
        }
   }
    
    
    
    $scope.visorDoc = function(Referencia,Entidad,NumDoc,Extension) {
        //console.log($scope.selectedNode);
        //if(!win || win.closed){
        var parametrosRecupera = $scope.getParametrosCMS(6);
        parametrosRecupera.DATOSCMS.Referencia = Referencia;
        parametrosRecupera.DATOSCMS.InsertarBd = "N";
        parametrosRecupera.DATOSCMS.EntidadCodigo = Entidad;
        parametrosRecupera.DATOSCMS.NumDoc = NumDoc;
        
        if (!$scope.openDocs(Extension)) {

            parametrosRecupera.DATOSCMS.RutaDestino = "temp";

            modalBpm.limpiarParametros();
            var params = {
                "backdrop": false,
                "keyboard": true,
                "template": "",
                "controller": "",
                "botones": {
                    "aceptar": false,
                    "cancelar": false,
                    "ancho": "220%",
                    "largo": "700px",
                    "ancho_external": '100%',
                    "largo_external": '600px',
                    "top": "1px",
                    "left": "-63%",
                    "fondo": "black"
                },
                "object_id": undefined,

                "externalWeb": 'visorImagenes.htm?DATOSCMS=' + btoa(JSON.stringify(parametrosRecupera.DATOSCMS)) + '&DATOSCMSBD=' + btoa(JSON.stringify(parametrosRecupera.DATOSCMSBD))
            }
            modalBpm.setParametros(params);
            modalBpm.open();


        } else {

            parametrosRecupera.DATOSCMS.RutaDestino = "temp";
            DBpeticiones.setAlternativa('');
            var response = DBpeticiones.getQUERYGENERALJFile(null, null, null, null, null, parametrosRecupera);
            var $xml;
            var $tile;
            console.log(response);
            try {
                $xml = $(response);
                var infoarchivo = $xml.find("infoarchivo").text();
                $scope.file = JSON.parse(infoarchivo).NuevoNombre;
                var show = "resources/temp/" + $scope.file;

                window.open(show);

            } catch (Exception) {
                notificationsStore.clearAlerts();
                notificationsStore.addAlerts({
                    type: 'danger',
                    msg: "Error guardando" + response
                });
                notificationsStore.showAlerts();
                return;
            }





        }


        // win =  window.open( show,'imgVisor');
        //window.open(show);


        $scope.cargandoDoc = false;
    }
    
    $("#buscar").keypress(function(e) {
        var keyCode = e.keyCode || e.which;
        //alert(keyCode);

        if (keyCode === 13) {
            e.preventDefault(); //> input[type='button']
            $scope.doSearch();

            //console.log(btnDoSearch);
            //alert();
        }
    });
});