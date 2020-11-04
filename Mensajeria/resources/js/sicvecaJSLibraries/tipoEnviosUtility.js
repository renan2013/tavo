function genCalendario(Strow){
        var row = JSON.parse(Strow);
        callSIC_P_CREACALENDARIO(row.ID_TIPO);
        //grid_BASE_USUARIOS.htm?LASTQUERY=false&MSG=null&TIPOMSG=null&COMPORTAMIENTO=N&FILTROS=null
        //callSIC_P_CREACALENDARIO(row.);
           /*var jsonValues = [{"valor": row.ID_ENVIOS}];
             $.ajax({
	            
                type : "POST",
                 url : "executeQuery.htm",
                 data : {PV_QUERY :$("#SELECTTIPOENVIO").val(),VALUES:JSON.stringify(jsonValues)},
                 timeout : 100000,
                                             'beforeSend' : function(xhr) {
                    xhr.overrideMimeType('text/html; charset=iso-8859-1');
                    //xhr.overrideMimeType('text/html;charset=utf-8');
                    },
                 success : function(data) {
                     var success;
                        try
                        {
                         success = data;
                         //alert(success);
                         callSIC_P_CREACALENDARIO(success);
                      }catch(Exception){
                          console.log("Error Javascript:"+Exception.message,"stack:",Exception.stack);
                          $("#msg").css("display","block");
                          $("#msg").html("Error en petición en dsoa:<p class='ErrorMsg glyphicon glyphicon-warning-sign'>"+data+"</p>");
                      }
                        
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
           });*/
       
    };

function callSIC_P_CREACALENDARIO(GV_TIPO_ENVIO){
    //alert(GV_TIPO_ENVIO);
            /*VERSION: 2.6
             FECHA DE CREACIÓN:2017-05-29T16:42
            */
      alertify.confirm('Confirme','Seguro de que desea generar el calendario?',function(){
            $("#msg").css("display","none");
            $("#loader").toggle( "slide" );
            $.ajax({
               
                    type : "POST",
                     url : "CALLSIC_P_CREACALENDARIOAJAX.htm",
                     data : {GV_TIPO_ENVIO:GV_TIPO_ENVIO},
                     timeout : 100000,
                                                 'beforeSend' : function(xhr) {
                        xhr.overrideMimeType('text/html; charset=iso-8859-1');
                        
                        },
                     success : function(data) {
                         var success;
                            try
                            {
                             
                             
                             //console.log("SUCCESS: ", data.trim());
                             //
                              if($("#loader").is(":visible")){
                                $("#loader").toggle( "slide" );
                                $("#loader").css( "display","none" );
                              }
                              //console.log($(data));
                              var error = $($(data)['0'].firstChild).text();
                              if(error === '0')
                                  alertify.alert(' ',"Calendario generado correctamente");
                              else{
                                  var errorMsg = $($(data)['0'].lastChild).text();
                                  alertify.alert(' ',"Error generando el calendario:"+errorMsg);
                              }
                            
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
       },function(){/*NO EJECUTA*/});
 } 

