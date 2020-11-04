app.controller('autoayudaRegistroIncControllers', function($scope, DBparametros, DBpeticiones, 
  orderByFilter, $timeout,fileManager) {
   $scope.showDownloadFile = false;
    DBparametros.limpiarPeticiones();
        

        DBparametros.addParam("GV_ENTIDAD",22, "N", "");
        //console.log(DBparametros.getPeticiones());
        DBpeticiones.setAlternativa('../');
        $scope.treedata = DBpeticiones.bdRequest(DBparametros.getPeticiones(), 309, 'E');
        console.log($scope.treedata);
        $("#autoayudaBody").css("display","block");
        $("#loader_temp").css("display","none");
        
        $scope.showSelected = function(sel) {
            //alert();
            $scope.selectedNode = sel;

            //console.log("SEL:", sel); //este es el que se usa
            if (sel.TIPO_NIVEL == 'F' && sel.children.length == 0) {
               /* if (tipo == "etapa")
                    nodo = $scope.selectedNode.id;*/

                    //console.log(sel);
                $scope.cargarNodoArchivos(sel.id);
            }


            if (sel.TIPO_NIVEL != 'F' && sel.TIPO_NIVEL != 'N') {
                console.log(sel);
                $scope.showDownloadFile = true;
                
                
                    var parametrosRecupera = fileManager.getParametrosCMS(6); 

                    /*Parametrización según sea necesario*/
                    parametrosRecupera.DATOSCMS.Referencia = sel.id;
                    parametrosRecupera.DATOSCMS.InsertarBd = "N";  
                    parametrosRecupera.DATOSCMS.Entidad = 22;
                    parametrosRecupera.DATOSCMS.LlaveExterna = "";
                    parametrosRecupera.DATOSCMS.NumDoc = 16637;
                    parametrosRecupera.DATOSCMS.NumNivel = 50;
                    parametrosRecupera.DATOSCMS.RutaDestino = "temp";
                    fileManager.setLoader(true);
                   /* fileManager.setRutalternativa('');
                    fileManager.setRutalternativa('../');*/
                    fileManager.download(sel.EXTENSION,parametrosRecupera,"tab");
                    $scope.$watch(function() {
                            return fileManager.showLoader
                        }, function(NewValue, OldValue) {
                            // console.log(NewValue);
                             if(NewValue === false)
                                 $scope.showDownloadFile = false;
                                  //
                       });
                    
                
                    }

        };
        
      $scope.cargarNodoArchivos = function(nodo) {
        DBparametros.limpiarPeticiones();
        DBparametros.addParamOP("PARAM1", 22, "N", "", "DINAMICA");
        DBparametros.addParamOP("PARAM2", 1, "N", "", "DINAMICA");

        //ademar, debe de filtrar por linea, y se toma el  Nivel que ajusta el filtro
        DBparametros.addParamOP("PARAM3", nodo, "N", "", "DINAMICA");
        /*if ($scope.atiende.NUM_HILO > 0)
            DBparametros.addParamOP("PARAM4", $scope.atiende.NUM_HILO, "N", "", "DINAMICA");
        DBparametros.addParamOP("PARAM5", $scope.etapa_proceso.NUM_DPTO, "N", "", "DINAMICA");*/
        var children = DBpeticiones.bdRequest(DBparametros.getPeticiones(), 520, 'SJM');
        //console.log("hijos:",children);
        //sel.children.push({label: "New Childx", id:"1", children: []},{label: "New Child", id:"2", children: []},{label: "New Child", id:"3", children: []});
        $scope.selectedNode.children = [];
        for (i in children) {
            $scope.selectedNode.children.push(children[i]);
        }
        
        console.log( $scope.selectedNode.children);
    }
    
    $scope.visorDoc = function(Referencia,Entidad,NumDoc,Extension) {
        //console.log($scope.selectedNode);
        //if(!win || win.closed){
        var parametrosRecupera = $scope.getParametrosCMS(6);
        parametrosRecupera.DATOSCMS.Referencia = Referencia;
        parametrosRecupera.DATOSCMS.InsertarBd = "N";
        parametrosRecupera.DATOSCMS.EntidadCodigo = Entidad;
        parametrosRecupera.DATOSCMS.NumDoc = NumDoc;
        
       /* if (!$scope.openDocs(Extension)) {

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


        } else {*/

            parametrosRecupera.DATOSCMS.RutaDestino = "temp";
            DBpeticiones.setAlternativa('../');
            var response = DBpeticiones.getQUERYGENERALJFile(null, null, null, null, null, parametrosRecupera);
            var $xml;
            var $tile;
            console.log(response);
            try {
                $xml = $(response);
                var infoarchivo = $xml.find("infoarchivo").text();
                $scope.file = JSON.parse(infoarchivo).NuevoNombre;
                var show = "../resources/temp/" + $scope.file;

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





       // }


        // win =  window.open( show,'imgVisor');
        //window.open(show);


        $scope.cargandoDoc = false;
    }
        
});