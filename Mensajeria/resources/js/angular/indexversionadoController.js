app.controller('arbolController', function($scope,$timeout){
       $scope.showModule = false; 
       $scope.selectedSystem = -1;
       $scope.selectedModule = -1;
        $scope.callHLP_P_GET_DOC_TREE = function(GN_SISTEMA,GN_APLICACION,GV_PATRONAPP){
          var response;
            $.ajax({
              
                    type : "POST",
                     url : "CALLHLP_P_GET_DOC_TREEAJAX.htm",
                     data : {GN_SISTEMA:GN_SISTEMA,GN_APLICACION:GN_APLICACION,GV_PATRONAPP:GV_PATRONAPP},
                     timeout : 100000,
                                                 'beforeSend' : function(xhr) {
                        xhr.overrideMimeType('text/html; charset=iso-8859-1');
                        
                        },
                     async: false,
                     success : function(data) {
                         
                            try
                            {
                            
                              response = data.trim();
                              $("#loader").css( "display","none" );
                            
                          }catch(Exception){
                              console.log("Error Javascript:"+Exception.message,"stack:",Exception.stack);
                              $("#msg").css("display","block");
                              $("#msg").html("Error en petición en dsoa:<p class='ErrorMsg glyphicon glyphicon-warning-sign'>"+data+"</p>");
                          }
                            /* console.log("grid:"+data);
                             display(data);*/
                     },
                     error : function(e) {
                             console.log("ERROR: ", e);
                             //display(e);
                             $("#msg").html("Error ajax:  <p class='ErrorMsg glyphicon glyphicon-warning-sign'>StatusError:"+e.status+"<br>StatusText:"+e.statusText
                              +e.responseText+"</p>");
                     },
                     done : function(e) {
                             console.log("DONE");
                             enableSearchButton(true);
                     }
             });
             
             return response;
      
       }
       
       $scope.nodeCheck = function(node,index,type,html){
        // console.log(node,index,type,html);
         if(type === 'system'){
             $scope.showModule = false;
            if($scope.selectedSystem === index){
                $scope.selectedSystem = -1;
                return;
            }
            $scope.selectedSystem = index;
         }
         
         if(type === 'module'){
            if(!$scope.showModule)
              $scope.showModule = true;
            else
                $scope.showModule = false;
            
            $scope.selectedModule = index;
         }
         
       }
       
       
   $scope.callHLP_P_GET_DOC_APPAJAX = function (GN_SISTEMA,GV_MODULO,GN_REGISTROS,GV_PATRONAPP){
        //console.log(GN_SISTEMA,GV_MODULO,GN_REGISTROS,GV_PATRONAPP);
            /*VERSION: 2.6
             FECHA DE CREACIÓN:2017-12-05T23:42
            */
     
            $.ajax({
              
                    type : "POST",
                     url : "CALLHLP_P_GET_DOC_APPAJAX.htm",
                     async: false,
                     data : {GN_SISTEMA:GN_SISTEMA,GV_MODULO:GV_MODULO,GN_REGISTROS:GN_REGISTROS,GV_PATRONAPP:GV_PATRONAPP},
                     timeout : 100000,
                                                 'beforeSend' : function(xhr) {
                        xhr.overrideMimeType('text/html; charset=iso-8859-1');
                        
                        },
                     success : function(data) {
                         var success;
                            try
                            {
                             
                             
                             //console.log("SUCCESS: ", data.trim());
                             
                              var formStr = removeCdata(data.trim());
                              try{
                                $scope.forms = JSON.parse($(formStr).find("GV_RETORNO").text())[0].aplicaciones;
                                //console.log($scope.forms);
                              }catch(Exception){
                                  console.log("Exeption: ", formStr);
                              }
                              $("#loader").css( "display","none" );
                            
                          }catch(Exception){
                              console.log("Error Javascript:"+Exception.message,"stack:",Exception.stack);
                              $("#msg").css("display","block");
                              $("#msg").html("Error en petición en dsoa:<p class='ErrorMsg glyphicon glyphicon-warning-sign'>"+data+"</p>");
                          }
                            /* console.log("grid:"+data);
                             display(data);*/
                     },
                     error : function(e) {
                             console.log("ERROR: ", e);
                             //display(e);
                             $("#msg").html("Error ajax:  <p class='ErrorMsg glyphicon glyphicon-warning-sign'>StatusError:"+e.status+"<br>StatusText:"+e.statusText
                              +e.responseText+"</p>");
                     },
                     done : function(e) {
                             console.log("DONE");
                             enableSearchButton(true);
                     }
             });
       
     }
     
    $scope.callCALLHLP_P_GET_DOC_SUBTREEIMG =  function (forma,GN_NIVEL,GN_SISTEMA,GV_MODULO,GN_APLICACION){
            /*VERSION: 2.6
             FECHA DE CREACIÓN:2017-12-06T18:15
            */
            $scope.formaSelected = forma;
            $("#msg").css("display","none");
            $("#loader").toggle( "slide" );
            $.ajax({
              
                    type : "POST",
                     url : "CALLHLP_P_GET_DOC_SUBTREEIMGAJAX.htm",
                     async: false,
                     data : {GN_NIVEL:GN_NIVEL,GN_SISTEMA:GN_SISTEMA,GV_MODULO:GV_MODULO,GN_APLICACION:GN_APLICACION},
                     timeout : 100000,
                                                 'beforeSend' : function(xhr) {
                        xhr.overrideMimeType('text/html; charset=iso-8859-1');
                        
                        },
                     success : function(data) {
                         var success;
                            try
                            {
                             
                             
                              var filesForm = removeCdata(data.trim());
                             console.log(filesForm);
                             try{
                                 $scope.versions = JSON.parse($(filesForm).find("GCB_TREE").text());
                             }catch(Exception){
                                 console.log("Exception",data.trim());
                             }
                              $("#loader").css( "display","none" );
                            
                          }catch(Exception){
                              console.log("Error Javascript:"+Exception.message,"stack:",Exception.stack);
                              $("#msg").css("display","block");
                              $("#msg").html("Error en petición en dsoa:<p class='ErrorMsg glyphicon glyphicon-warning-sign'>"+data+"</p>");
                          }
                            /* console.log("grid:"+data);
                             display(data);*/
                     },
                     error : function(e) {
                             console.log("ERROR: ", e);
                             //display(e);
                             $("#msg").html("Error ajax:  <p class='ErrorMsg glyphicon glyphicon-warning-sign'>StatusError:"+e.status+"<br>StatusText:"+e.statusText
                              +e.responseText+"</p>");
                     },
                     done : function(e) {
                             console.log("DONE");
                             enableSearchButton(true);
                     }
             });
       
 }


       
      $scope.strTree = $scope.callHLP_P_GET_DOC_TREE("","","");
      
      $scope.strTree = $scope.strTree.replace("<![CDATA[","");
      
      $scope.strTree = $scope.strTree.replace("]]>","");
      
     //console.log("tree",$scope.strTree/*$($scope.strTree).find("GV_TREE").text()*/);
      try{
        $scope.treeSystems = JSON.parse($($scope.strTree).find("GV_JTREE").text());
        $("#loader_temp").css("display","none");
        $("#bodyVersionado").css("display","block");
        
     
       
      }catch(Exeption){
          console.log("exeption",$scope.strTree);
      }
      console.log($scope.treeSystems);
        
});