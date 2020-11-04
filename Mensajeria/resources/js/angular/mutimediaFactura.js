app.controller('facturaMultimediaController', function($scope, DBparametros, DBpeticiones,User,
  orderByFilter, $timeout,fileManager,$filter,$interval) {
      $scope.showDownloadFile = false;
      $scope.indexDownload = -1;
      $scope.columnIndex = -1;
      $scope.direccion = "E"; 
      $scope.path;
      $scope.Emisor = User.getEmisor();
      $scope.Data = {};
      $scope.rowsContestar = [];
      $scope.procesando = false;
      $scope.pendientesFitler = false;
      $scope.labelDocReport = "";
      
      $scope.filtrosDoc = [
          {"Tipo" : "01","label" : "Factura","status": true},
          {"Tipo" : "03","label" : "Nota de Crédito","status": false},
          {"Tipo" : "02","label" : "Nota de Debito","status": false},
          {"Tipo" : "04","label" : "Tiquetes","status": false}
      ]
      
      $scope.filtrosReport = [
          {"Tipo" : "01","label" : "Factura","status": true},
          {"Tipo" : "03","label" : "Nota de Crédito","status": false},
          {"Tipo" : "02","label" : "Nota de Debito","status": false},
          {"Tipo" : "04","label" : "Tiquetes","status": true}
      ]
      
      //$scope.filtrosReport = 
      $scope.reportDireccion = "E" ;
      $scope.AgenciasReport = "";
      
      $scope.statusCheckMasive = true;
      
      $scope.filterArrow = "down";
      
      $scope.showDirreccionSelected = function(){
          $timeout(function(){
              //alert($scope.direccion);
              if($scope.direccion === "E")
               document.getElementById("checkVentas").checked = true;
             else if($scope.direccion === "R")
                 document.getElementById("checkCompras").checked = true;
          },1000);
        
      }
      
      
      
      $scope.getFile= function(referencia,extension,tipodoc,numdoc,index,column,typeOpen){
          fileManager.setPath(undefined);
          $scope.indexDownload =index;
          $scope.showDownloadFile = true;
          if(referencia.indexOf('file_') === -1){
              $scope.columnIndex = column;
              //No es file system busco en bd
                var parametrosRecupera = fileManager.getParametrosCMS(6); 
                    parametrosRecupera.DATOSCMS.Referencia = referencia;
                    parametrosRecupera.DATOSCMS.InsertarBd = "N";  
                    parametrosRecupera.DATOSCMS.Entidad = 24;
                    parametrosRecupera.DATOSCMS.LlaveExterna = "";
                    parametrosRecupera.DATOSCMS.NumDoc = numdoc;
                    var nivel = 0;
                    
                    if(tipodoc === '01')
                        nivel = 1244;
                    if(tipodoc === '02')
                        nivel = 1246;
                    if(tipodoc === '03')
                        nivel = 1245;
                    parametrosRecupera.DATOSCMS.NumNivel = nivel;
                    parametrosRecupera.DATOSCMS.RutaDestino = "temp";
                    fileManager.setLoader(true);
                    fileManager.setRutalternativa('');
                    if(!typeOpen)
                     fileManager.download(extension,parametrosRecupera,"tab");
                    else{
                        fileManager.download(extension,parametrosRecupera,typeOpen);
                        var pathFull = $interval(function(){
                            if(fileManager.getPath() !== undefined){
                                $interval.cancel(pathFull);
                                $scope.path = fileManager.getPath();
                            }
                        },500);
                        
                    }
                    $scope.$watch(function() {
                            return fileManager.showLoader
                        }, function(NewValue, OldValue) {
                            // console.log(NewValue);
                             if(NewValue === false)
                                 $scope.showDownloadFile = false;
                                  //
                       });
                   }else{
                       //ES FILE SYSTEM
                       $scope.columnIndex = column;
                       var indexRow = parseInt(referencia.split("_")[1]);
                       var row = JSON.parse($("#rowsArray").val())[indexRow];
                       var file = row.FE_CLAVE;
                       if(column === 1)
                           file+="_signed.xml";
                       else if(column === 2)
                         file+=".pdf";
                      var response = fileManager.findServerLocalFile(row.PATH,file,"getFacDocFileSystem.htm");
                      //console.log(response);
                      if(response.error.codigo === 0){
                          window.open("resources/temp/" +file);
                      }else{
                          alert(response.error.msg);
                      }
                      
                      $scope.showDownloadFile = false;
                   }
             };
             
             $scope.chargeFactura = function(index,tipo){
                 var msgConfirm;
                 if(tipo === "NC")
                     msgConfirm = "Seguro que desea generar una nota de credito para esta factura?";
                 if(tipo === "NC" || tipo === "ND" ){
                    var r = confirm(msgConfirm);
                       if (r == true) {
                           $scope.loadFacturaTab(index,tipo);                           
                     } else 
                           return;
                      
                   }else{
                       $scope.loadFacturaTab(index,tipo);
                   }
            };
            
        $scope.loadFacturaTab = function(index,tipo){
                $('#facframe', window.parent.document).css("display","none");
                $('#gridFac', window.parent.document).css("display","none");
                $('#loaderMain', window.parent.document).css("display","block");
                $(".setActive",window.parent.document).removeClass("setActive");
                if(tipo !== undefined){
                    //console.log($("rowsArray"));
                    var tempJson = JSON.parse($("#rowsArray").val());
                    var data = JSON.stringify(tempJson[index]);
                  $('#facframe', window.parent.document).attr("src","facturaMaker.htm?LOAD="+btoa(data)+"&TIPO="+tipo);
               }
               $timeout(function(){
                   $("#tabCreate",window.parent.document).addClass("setActive");
                   $('#facframe', window.parent.document).css("display","block");

                },500);
           };
           
   $scope.callFAC_P_BORRAFACTURA = function (index){
            /*VERSION: 2.6
             FECHA DE CREACIÓN:2018-05-28T12:46
            */
           var GV_CIA;
           var GN_AGENCIA;
           var GV_TIPODOCUMENTO;
           var GV_TERMINAL;
           var GN_COMPROBAN;
           var r = confirm("Esta seguro que desea eliminar este documento");
          if (r == true) {
            var row = JSON.parse($("#rowsArray").val())[index];
            $scope.columnIndex = -1;
            $scope.indexDownload =index;
            $scope.showDownloadFile = true;
            $.ajax({
              
                    type : "POST",
                     url : "CALLFAC_P_BORRAFACTURAAJAX.htm",
                     data : {GV_CIA:row.COD_CIA,GN_AGENCIA:row.COD_AGENCIA,GV_TIPODOCUMENTO:row.TIPO_DOCUMENTO_HACIENDA,GV_TERMINAL:0,GN_COMPROBAN:row.COMPROBAN},
                     timeout : 100000,
                                                 'beforeSend' : function(xhr) {
                        xhr.overrideMimeType('text/html; charset=iso-8859-1');
                        
                        },
                     success : function(data) {
                         var success;
                            try
                            {
                             
                             $scope.showDownloadFile = false;
                             console.log("SUCCESS: ", data.trim());
                             
                             var xml = $(data);
                             if(xml.find("GN_ERROR").text() !== "0"){
                                 alertify.alert('Error', xml.find("GN_ERROR").text() + ":"+xml.find("GV_ERROR").text());
                                 return;
                             }else{
                                 alertify.success("Documento eliminado con \u00E9xito");
                                 $("#tablerow_"+index).remove();
                                 
                                 
                             }
                             // $("#loader").css( "display","none" );
                            
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
 }
         
        $scope.formatNumber = function(index,value,id){
			var idToReplace = "#"+String(id)+String(index);
           //console.log("#"+id+index,idToReplace,$filter('number')(value));
           $("#"+id+index).append($filter('number')(value));
        } 
        
        $scope.loadNotas = function(index){
            var row = JSON.parse($("#rowsArray").val())[index];
            query["FILTROSFIJOS"] =  btoa(JSON.stringify(row));
            var filtros = [
                            {
                              "id":-1,
                              "Tipo" : "IGUAL",
                              "NOMBRE_INTERNO": "FE_CONSECUTIVO_RELA",
                              "Texto" : row.FE_CLAVE
                            }
                          ];
            //query["FILTROS"] =  btoa(JSON.stringify(filtros));
            base64Filters = btoa(JSON.stringify(filtros));
            $("#queryParams").val(JSON.stringify(query));
            //console.log(query);
            reloadGrid();
        }
        
        $scope.setPendientes = function(PENDIENTES){
            if(PENDIENTES !== "null")
            $scope.pendientesFitler = true;
        }
         
        $scope.changeDireccion = function(){
            //alert($scope.direccion);
            if($scope.direccion === "R")
                query["PENDIENTE"] =  "true";
            query["DIRECCION"] =  $scope.direccion;
            $("#queryParams").val(JSON.stringify(query));
            $("#pagina2").val(1);
            
            $("#loadLegend").css("display","block"); 
            $("#mainContainer").css("display","none"); 
            $timeout(function(){
                 reloadGrid();
             },100);
        }
$scope.pendientesParser = function(param){
    if(param === "true")
     $scope.filtrosRecepcion = "P";
    else if(param ===  "CONTESTADAS")
        $scope.filtrosRecepcion = "C";
    else
        $scope.filtrosRecepcion = "T";
    
}     
//FILTRA POR FACTURAS PENDIENTES DE RESPONDER
$scope.mannagePendientes = function(){
    if($scope.filtrosRecepcion === "P"){
        query["PENDIENTE"] =  "true";
       
        
    }else if($scope.filtrosRecepcion === "C")
         query["PENDIENTE"] =  "CONTESTADAS";
      else
        query["PENDIENTE"] =  "null";
        
   //alert($scope.filtrosRecepcion+"_"+query["PENDIENTE"]);
  $("#queryParams").val(JSON.stringify(query));
  $("#pagina2").val(1);
  reloadGrid();
    
        
}
        
       
        
 $scope.filterDoc = function(tipo){
           var filter = "";
           $.each($scope.filtrosDoc,function(index,el){
               if(el.status){
                   if(index > 0)
                       filter+=",";
                   filter+=el.Tipo;
               }
           });
           if(filter.charAt(0) === ",")
               filter = filter.substring(1);
           
            query["TIPO_DOC"] =  filter;
            
            $("#queryParams").val(JSON.stringify(query));
            
            /*$("#loadLegend").css("display","block"); 
            $("#mainContainer").css("display","none"); */
            $timeout(function(){
                 //reloadGrid();
             },100);
}

$scope.executeSearch = function(){
    reloadGrid();
}

$scope.doSearch = function(){
    //console.log(Filters);
    if(Filters.length > 0 && !isEmpty(Filters[0].Texto))
        base64Filters = btoa(JSON.stringify(Filters));
    
    reloadGrid();
}

$scope.toogleFilters = function(){
    //<any ng-init="direccion == 'null' ? direccion = 'E':direccion = '${DIRECCION}'"></any>
    $scope.filterArrow === "down" ? $scope.filterArrow = 'up':$scope.filterArrow = "down";
   $("#FILTROS").toggle();
}
         
         $('#loaderMain', window.parent.document).css("display","none");
         
         var query = JSON.parse($("#queryParams").val());
         if(query["DIRECCION"] === "null")
             $scope.direccion = "E";
         else
           $scope.direccion = query["DIRECCION"];
       
       if(query["TIPO_DOC"] !== "null"){
           $scope.filtrosDoc[0].status = false;
           var split = query["TIPO_DOC"].split(",");
           var tempLoop = $scope.filtrosDoc;
           $.each(split,function(index , el){
                if(el === '01')
                   $scope.filtrosDoc[0].status = true;
               else if(el === '02')
                   $scope.filtrosDoc[2].status = true;
               else if(el === '03')
                   $scope.filtrosDoc[1].status = true;
               else if(el === '04')
                   $scope.filtrosDoc[3].status = true;
           });
       }
        $scope.indexToAnswer = -1;   
       $scope.contestarDocumento = function(index,tipoDoc){
           $scope.indexToAnswer =  index;
           //alert();
           //$("#iframePreviewRecepcion").toggle("slow");
           $("#contestaRecep").css("display","block");
           $scope.errorRecpecion = undefined;
           $scope.resp = undefined;
           $scope.respText = undefined;
           $( "#modalRespuesta" ).dialog( "open" );
           var row = JSON.parse($("#rowsArray").val())[index];
           $scope.rowResponse = row;
           $("#loaderPdf").css("display","block");
           $("#iframePreviewRecepcion").css("display","none");
           $("#msgPdf").css("display","none");
           
           //console.log($("#iframePreviewRecepcion").is(":hidden"));
           $scope.getFile(row.REFERENCIA_PDF, 'pdf', row.TIPO_DOCUMENTO_HACIENDA,row.NUMDOC,null, null,"path");
           $scope.$watch("path",function(newValue,OldValue){
               if(newValue !== undefined){
                   $("#loaderPdf").css("display","none");
                   if($scope.path !== "NO FILE")
                    $("#iframePreviewRecepcion").css("display","block");
                   else
                       $("#msgPdf").css("display","block");
                       
                   //console.log("path pdf",newValue);
               }
           });
       }
       
$scope.selectInitAgencia = function(Agencia){
  var fillAgencias = $interval(function(){
       var options =  $("#AgenciasCombo").children();
       //console.log("o",options);
       if(options.length > 0){
           $interval.cancel(fillAgencias);
           $scope.AgenciaSelected = Agencia;
           
       }
    },50);
}

$scope.selectInitAgenciaReport = function(Agencia){
    $scope.AgenciasReport = Agencia;
}


$scope.changeAgencia = function(){
    var query = JSON.parse($("#queryParams").val());
    query.AGENCIA = $scope.AgenciaSelected;
    $("#queryParams").val(JSON.stringify(query));
            //console.log(query);
       $("#pagina2").val(1);
    $("#loadLegend").css("display","block"); 
    $("#mainContainer").css("display","none"); 
    $timeout(function(){
         reloadGrid();
     },100);
     
}
       
$scope.reportModal = function(direccion){
    var reportType = "";
    if(direccion === "null" ||direccion === "E" )
        reportType = "ventas";
    else
        reportType = "compras";
    
    $scope.reportTitle = "Generar reporte de "+reportType;
    
    $( "#modalReportes" ).dialog( "open" );
}
       
$scope.getData = function(){
    //console.log(TIPO);
    var data = 
   {
	
          "GENERICOS": {
		"COD_CIA": $scope.Emisor.COD_CIA,
		"TIPO_IDENTIFICACION":$scope.Emisor.TIPO_IDENTIFICACION,
		"CEDULA": $scope.Emisor.CEDULA,
                "IND_BUSQUEDA" : "N",
                
	}
 };
 
   return data;
};

$scope.changeDirReport = function(){
    if($scope.reportDireccion === "E")
        $scope.labelDocReport = "Salidas";
    else
        $scope.labelDocReport = "Entradas";
}
 
 
$scope.cleanRespuesta = function(tipo){
    $scope.errorRecpecion = undefined;
    $("#radioRespuesta").css("border","none");
    
}


$scope.cerrarModal = function(type){
          if(type === "A"){
             if($scope.resp !== undefined){
                $scope.procesando = true;
                var respData = $scope.getData();
                respData.GENERICOS.COD_AGENCIA = 1;
                respData.GENERICOS.CLAVE = $scope.rowResponse.FE_CLAVE;
                respData.GENERICOS.TIPO_DOCUMENTO_HACIENDA = $scope.resp;
                if(!isEmpty($scope.respText))
                    respData.GENERICOS.MENSAJERESPUESTA  = $scope.respText;
                $timeout(function(){
                    $scope.processRecepcion(respData);
                },35)
            }else{
                $scope.errorRecpecion = "Debe escoger una respuesta válida para el comprobante";
                $("#radioRespuesta").css("border","1px solid red");
            }
          }
          
          if(type === "C")
            $( "#modalRespuesta" ).dialog( "close" );
            fixAlertify();
       }
       
    $scope.marcarDesMasivo = function(){
		//alert($scope.statusCheckMasive);
		
			if($scope.statusCheckMasive){
				//Si ya marque alguno limpio para llenarlo todo 
				if($scope.rowsContestar.length > 0)
					$scope.rowsContestar =[];
				$scope.statusCheckMasive = false;
				 var rows = JSON.parse($("#rowsArray").val());
				 $('.checkRowRegister').prop('checked', true);
				 $(rows).each(function(index,el){
					$scope.checkRecepcion(index);
				});
			}else{
				$scope.rowsContestar = [];
				$scope.statusCheckMasive = true;
				$('.checkRowRegister').prop('checked', false);
				
			}
		
    }
       
   $scope.checkRecepcion = function(index){
       
       function existe(obj){
           if(obj.index === index)
               return true;
           return false;
       }
	   
	   function indexToDelete(obj) {
		  return obj.index === index;
		}
       var result =  $scope.rowsContestar.filter(existe);
       //console.log(result);
       //Si ya existe lo quito
       if(result.length > 0){
		   $scope.rowsContestar.splice($scope.rowsContestar.findIndex(indexToDelete),1);
		 }else{
		   var row = JSON.parse($("#rowsArray").val())[index];
		   row.index = index;
		   $scope.rowsContestar.push(row);
	   }
       
       
   }
   
   
   
   $scope.contestMasivo = function(){
       //alert("Temporalmente en desarrollo");
       var respData = $scope.getData();
       respData.GENERICOS.COD_AGENCIA = 1;
       respData.GENERICOS.TIPO_DOCUMENTO_HACIENDA = $scope.resp;
       $($scope.rowsContestar).each(function(i,el){
           $("#loadRecepRow_"+el.index).css("display","block");
       });
       $timeout(function(){
          $($scope.rowsContestar).each(function(i,el){
            var data = respData;
            data.GENERICOS.CLAVE = el.FE_CLAVE;
            $scope.processRecepcionRow(data,el.index);
          });
       },500);
       
   }
   
 $scope.processRecepcionRow = function(respData,index){
       var xmlBD = jsonToXml("DATA",respData);
       $.ajax({  
            type : "POST",
            url : "CALLRECEPCIONRESPONSE.htm",
            data : {GV_DATOSENCABEZADO:xmlBD},
            timeout : 100000,
             'beforeSend' : function(xhr) {
                  xhr.overrideMimeType('text/html; charset=iso-8859-1');

              },
	    success : function(data) {
                var response;
                try{
                    $timeout(function(){
                        
                        try{
                          response = JSON.parse(data);
                          if(response.Error === "0"){
                             var msg = "";
                              $scope.procesando = false;
                              if(response.apiresponse.Envio.ENVIO !== undefined){
                                  $("#tablerow_"+index).remove();
								  //console.log( $("#bodyGrid tr"));
								  $("#pagina2").attr("onchange","reloadGrid('J')");
                              }else{
                                  var error;
                                 try{
                                     if(response.apiresponse.Envio.error === "invalid_grant")
                                         error = "Error usuario y contraseña de hacienda inválidos o modo_plataforma de la compañía incorrecto";
                                     else
                                         error = "Error "+response.apiresponse.Envio.error_description;
                                 }catch(Ex){
                                     try{
                                       error = JSON.stringify(response.apiresponse.Envio);
                                   }catch(Ex2){
                                     error =  "Error general en envío hacienda";
                                    }
                                 }
                                 
                                 alert("Error recepcion registro:"+index+" "+error);
                             }
                              
                          }else{
                             alert("Error recepcion registro:"+index+" "+response.Error);
                           }
                          
                        }catch(Exception){
                            
                            alert("Error recepcion registro:"+index+" "+data);
                        }
                        
                    },500);
                    
                    


                 }catch(Exception){
                    $.unblockUI({ fadeOut: 200 }); 
                    tempData = undefined;
                    console.log("Error Javascript:"+Exception.message,"stack:",Exception.stack);
                    $("#msg").css("display","block");
                    $("#msg").html("Error en petición en dsoa:<p class='ErrorMsg glyphicon glyphicon-warning-sign'>"+data+"</p>");
                   }
                                                           
                },
                error : function(e) {
                    $.unblockUI({ fadeOut: 200 }); 
                         console.log("ERROR: ", e);
                         //display(e);
                     alert("Error ajax:  StatusError:"+e.status+"StatusText:"+e.statusText
                          +e.responseText);
	          },
                   done : function(e) {
                    $.unblockUI({ fadeOut: 200 }); 
                                       console.log("DONE");
                                       enableSearchButton(true);
                           }
     });
}  
       
$scope.processRecepcion = function(respData){
           var xmlBD = jsonToXml("DATA",respData);
       $.ajax({  
            type : "POST",
            url : "CALLRECEPCIONRESPONSE.htm",
            data : {GV_DATOSENCABEZADO:xmlBD},
            timeout : 100000,
             'beforeSend' : function(xhr) {
                  xhr.overrideMimeType('text/html; charset=iso-8859-1');

              },
	    success : function(data) {
                var response;
                try{
                    $timeout(function(){
                        //console.log(data);
                        try{
                          response = JSON.parse(data);
                          //console.log(response);
                          if(response.Error === "0"){
                              $("#contestaRecep").css("display","none");
                              var msg = "";
                              $scope.procesando = false;
                              if(response.apiresponse.Envio.ENVIO !== undefined){
                                if(response.apiresponse.Envio.ENVIO !== "Accepted"){
                                  $scope.errorRecpecion = "Documento de respuesta "+response.apiresponse.Envio.ENVIO+" en hacienda";
                                  $("#tablerow_"+$scope.indexToAnswer).remove();
								  	$("#pagina2").attr("onchange","reloadGrid('J')");
                                   return;
                                 }else{
                                     $scope.errorRecpecion = "Documento de respuesta " +response.apiresponse.Verificacion['ind-estado']+" por hacienda";
                                     $("#tablerow_"+$scope.indexToAnswer).remove();
                                 }
                             }else{
                                 try{
                                     if(response.apiresponse.Envio.error === "invalid_grant")
                                         $scope.errorRecpecion = "Error usuario y contraseña de hacienda inválidos o modo_plataforma de la compañía incorrecto";
                                     else
                                         $scope.errorRecpecion = "Error "+response.apiresponse.Envio.error_description;
                                 }catch(Ex){
                                     try{
                                       $scope.errorRecpecion = JSON.stringify(response.apiresponse.Envio);
                                   }catch(Ex2){
                                     $scope.errorRecpecion =  "Error general en envío hacienda";
                                    }
                                 }
                             }
                              
                          }else
                              $scope.errorRecpecion = "Problemas de base de datos:"+response.Error;
                          
                        }catch(Exception){
                            $scope.errorRecpecion = data;
                        }
                        
                    },500);
                    
                    


                 }catch(Exception){
                    $.unblockUI({ fadeOut: 200 }); 
                    tempData = undefined;
                    console.log("Error Javascript:"+Exception.message,"stack:",Exception.stack);
                    $("#msg").css("display","block");
                    $("#msg").html("Error en petición en dsoa:<p class='ErrorMsg glyphicon glyphicon-warning-sign'>"+data+"</p>");
                   }
                                                           
                },
                error : function(e) {
                    $.unblockUI({ fadeOut: 200 }); 
                         console.log("ERROR: ", e);
                         //display(e);
                     alert("Error ajax:  StatusError:"+e.status+"StatusText:"+e.statusText
                          +e.responseText);
	          },
                   done : function(e) {
                    $.unblockUI({ fadeOut: 200 }); 
                                       console.log("DONE");
                                       enableSearchButton(true);
                           }
     });
}

$scope.showDocsReport = function(){
    $timeout(function(){
        //alert($scope.docsReport);
              if($scope.docsReport === "01,04")
               document.getElementById("radioVentasCompras").checked = true;
             else if($scope.direccion === "03")
                 document.getElementById("radioNCReport").checked = true;
          },1000);
}
   
$scope.generarReporte = function(direccion){
    
    if(isEmpty($scope.fechaInicioReporte)){
        alertify.error('Error debe especificar una fecha inicial para el reporte'); 
        return;
    }
    //alert(direccion);
     $("#msgReport").text("");
    $("#loaderReport").css("display","block");
    $("#msgReport").css("color","black");
    /*var docs= "";
    $($scope.filtrosReport).each(function(index,el){
        if(el.status){
           if(index !== 0)
               docs += ",";
           docs+= el.Tipo;
        }
            
    });*/
    
    var agencia = "1";
    if(!isEmpty($scope.AgenciasReport))
        agencia = $scope.AgenciasReport;
  $timeout(function(){ 
    $.ajax({  
            type : "POST",
            url : "generateBasicReport.htm",
            data : {FechaInicio:$scope.fechaInicioReporte,FechaFinal:$scope.fechaFinalReporte,
              Persona:"null", Monto:'0',FilterMonto:'0'
             ,TIPO_VENTA: 'C',TIPO_DOCUMENTO_HACIENDA:$scope.docsReport,AGENCIA:agencia,DIRECCION_DOCUMENTO:$scope.reportDireccion},
            timeout : 100000,
             'beforeSend' : function(xhr) {
                  xhr.overrideMimeType('text/html; charset=iso-8859-1');

              },
	    success : function(data) {
               //console.log(data);
                var response = JSON.parse(data);
                //console.log(response);
                if(response.error.codigo === 0){
                  location.replace("Descargar.htm?name="+response.reportFile+"");
                  $("#msgReport").text("Reporte generado con éxito");
                }else{ 
                   if(response.error.codigo !== -2)
                       $("#msgReport").css("color","red");
                   $("#msgReport").text(response.error.msg.replace("java.lang.Exception:",""));
               }
                $("#loaderReport").css("display","none");                                           
                },
                error : function(e) {
                    $.unblockUI({ fadeOut: 200 }); 
                         console.log("ERROR: ", e);
                         //display(e);
                     alert("Error ajax:  StatusError:"+e.status+"StatusText:"+e.statusText
                          +e.responseText);
                  $("#loaderReport").css("display","none");   
	          },
                   done : function(e) {
                    $.unblockUI({ fadeOut: 200 }); 
                                       console.log("DONE");
                                       enableSearchButton(true);
                           }
     });
  },500);
} 
      
$scope.callMSG_P_REENVIO_CORREO = function (accion,nombre,index,GV_COD_CIA,GV_CLAVE,GV_CORRREO){
            /*VERSION: 2.6
             FECHA DE CREACIÓN:2018-10-05T12:25
            */
  if(accion === "reenviar"){       
    alertify.confirm('Confirme','Seguro de que desea '+accion+ ' el correo electrónico a '+nombre+'?',function(){
        fixAlertify();
        $("#mail_"+index).removeAttr("style");
        $("#mail_"+index).attr("style","width:15%");

        $timeout(function(){   
                $scope.processMailRequest(index,GV_COD_CIA,GV_CLAVE,GV_CORRREO);
          },500);
        },function(){$("#cont_btn_help",window.parent.document).css("display","none"); $timeout(function(){$("#cont_btn_help",window.parent.document).css("display","block");},500)});
  }else if(accion === "copia" || accion === "nuevo"){
      var msg = alertify.prompt("Enviar "+accion+" correo electrónico","Digite el correo electrónico", "",
            function(evt, value ){
                //alert()
              $scope.processMailRequest(index,GV_COD_CIA,GV_CLAVE,value);
              fixAlertify();
            },
            function(){
                fixAlertify();
              //NO EJECUTA
              //alertify.error('Cancel');
         });
         
        // msg.callback = function () {fixAlertify();}
       
  }
};
 
 $scope.processMailRequest = function(index,GV_COD_CIA,GV_CLAVE,GV_CORRREO){
   $.ajax({
       type : "POST",
       url : "CALLAJAXERP_P_RECREACORREO.htm",
       data : {GV_CODCIA:GV_COD_CIA,GV_CLAVE:GV_CLAVE,GV_CORREOS:GV_CORRREO},
        timeout : 100000,
                                    'beforeSend' : function(xhr) {
           xhr.overrideMimeType('text/html; charset=iso-8859-1');

           },
           success : function(data) {
                    var success;
                       try
                       {
                        $("#mail_"+index).css("display","none");
                        try{

                          success = JSON.parse(data.trim());
                          console.log(success);
                          if(success.ERROR === 0){
                              var msg = alertify.alert('', 'Correo electrónico colocado en la bandeja de salida con exito,'+
                                      ' en breve será enviado');
                              msg.callback = function () {fixAlertify();}

                          }else
                              alert("Error:"+success.ERROR+" "+success.MGS);
                        }catch(Exception){
                            alert("Error de formato de datos");
                           console.log(data.trim());
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
      
      
    
    $(document).ready(function(){
         $( "#modalRespuesta" ).dialog({
               autoOpen: false,
                width: "85%",
                position: { my: 'top', at: 'top+10' },
                show: {
                  effect: "blind",
                  duration: 1000
                },
                hide: {
                  effect: "blind",
                  duration: 200
                },
                close: function( event, ui ) {fixAlertify();}
           });
           
           
           
           $( "#modalReportes" ).dialog({
               autoOpen: false,
                width: "85%",
                position: { my: 'top', at: 'top+10' },
                show: {
                  effect: "blind",
                  duration: 1000
                },
                hide: {
                  effect: "blind",
                  duration: 200
                }
           });
    });
       
  });


