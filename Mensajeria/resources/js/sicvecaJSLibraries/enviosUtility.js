$("document").ready(function(){
    //$("#archivosGrid").attr("src","");
     /*Manejo envío formulario*/
     $("#dowloadcol").css("display","none");
     $("#command").submit(function(e){
         $("#loader").toggle( "slide" );
         if($("#ID_ARCHIVO").val() === ""){
             e.preventDefault();
              alertify.alert("Error","Debe Ingresar un Archivo XML");
              $("#loader").toggle( "slide" );
         }else if($("#ID_ENVIO").val() === ""){
              e.preventDefault();
              alertify.alert("Error","Debe Ingresar un Cátalogo de  Envíos");
              $("#loader").toggle( "slide" );
         }else if(!$("#CREARARCHIVOXML").is( ":checked" ) && !$("#CREARPROCESOPREVIO").is( ":checked" )){
              e.preventDefault();
              alertify.alert("Error","Debe marcar si desea crear procesos previos, el archivo o ambos");
              $("#loader").toggle( "slide" );
         }
         
     });
     
     /*Cambio prompt calendario Envíos*/
     $("#ID_ENVIO").change(function(event){
         //alert("cambio");
         var input = $(this);
         var jsonValues = [{"valor": input.val()}];
         var Id_Tipo = executeGenericQuery(input.attr("selectIDTipo"),jsonValues);
         $("#ID_TIPO").val(Id_Tipo);
         var Fecha_Corte = executeGenericQuery(input.attr("selectFECHACORTE"),jsonValues);
         $("#fechaEnvio").val(Fecha_Corte);
         
     });
     
     
     $("#formEnvio").submit(function(e){
         $("#dowloadcol").css("display","none");
         e.preventDefault();
         $("#msg").css("display","none");
         $("#loader").toggle( "slide" );
         if(!$("#CREARARCHIVOXML").is( ":checked" ) && !$("#CREARPROCESOPREVIO").is( ":checked" )){
              e.preventDefault();
              alertify.alert("Error","Debe marcar si desea crear procesos previos, el archivo o ambos");
              $("#loader").toggle( "slide" );
              return;
         }
         var checked = $('#archivosGrid').contents().find('#rowsChecked');
         var archivos = [];
         try{
          archivos = JSON.parse(checked.val());
         }catch(ex){
             alertify.alert('Advertencia','Debe seleccionar al menos un archivo xml para generar el envio');
             $("#loader").toggle( "slide" );
             return;
         }
         if(archivos.length === 0){
             alertify.alert('Advertencia','Debe seleccionar al menos un archivo xml para generar el envio');
            //$("#loader").toggle( "slide" );
             
             return;
         }
         
         var XMLarchvios ="<Archivos>\n ";
         $(archivos).each(function(i,el){
             XMLarchvios += jsonToXml("Archvio",el);
          });
         XMLarchvios +="</Archivos>";
         var form = serializeForm($("#formEnvio"));
         form.push({
                      "id":-1,
                      "item":"archivos",
                      "value":XMLarchvios
                          }
             );
         
         if(archivos.length ===1)
            form.push({
            "id":-1,
            "item":"ARCHIVOUNICO",
            "value":archivos[0].ID_ARCHIVO
           }); 
          var request = {};
          $(form).each(function(i,el){
              request[el.item] = el.value;
          });
         //console.log(request);
         //alert(this.action);
         $.ajax({
			
            type : "POST",
             url : this.action,
             data : request,
             timeout : 100000,
            
                                         'beforeSend' : function(xhr) {
                xhr.overrideMimeType('text/html; charset=iso-8859-1');
                //xhr.overrideMimeType('text/html;charset=utf-8');
                },
             success : function(data) {
                 var success;
                    try
                    {
                      $("#msg").css("display","none");
                      //$("#loader").toggle( "slide" );
                     console.log("SUCCESS: ", data.trim());
                     success = $(data);
                     var access = false;
                     success.children().each(function(i,el){
                         //console.log(el.localName,$(el).text());
                         if(el.localName === "gn_error" && $(el).text()=== "0") {
                             $("#dowloadcol").css("display","block");
                             access = true;
                             return;
                         }
                     });
                     //console.log();
                    if(access)
                     success.children().each(function(i,el){
                         if(el.localName === "secuencia" ) {
                            var tempFunction =  $("#dowloadbtn").attr("onclick");
                             $("#dowloadbtn").attr("onclick",tempFunction.replace("REPLACESCUENCIA",$(el).text()));
                         }else if(el.localName === "nombrearchivo"){
                             var tempFunction =  $("#dowloadbtn").attr("onclick");
                             $("#dowloadbtn").attr("onclick",tempFunction.replace("REPLACENOMBRE_ARCHIVO",$(el).text()));
                         }
                     });
                    else{
                        throw new Exception(data);
                        //alert("error brutal");
                    }
                     //console.log(data);
                     
                     $("#loader").toggle( "slide" );
                      
                    
                  }catch(Exception){
                      console.log("Error Javascript:"+Exception.message,"stack:",Exception.stack);
                      $("#msg").css("display","block");
                      $("#msg").html("Error en petición en dsoa:<p class='ErrorMsg glyphicon glyphicon-warning-sign'>"+data+"</p>");
                      $("#loader").toggle( "slide" );
                  }
                    /* console.log("grid:"+data);
                     display(data);*/
             },
             error : function(e) {
                     console.log("ERROR: ", e);
                     //display(e);
                     $("#msg").html("Error ajax:  <p class='ErrorMsg glyphicon glyphicon-warning-sign'>StatusError:"+e.status+"<br>StatusText:"+e.statusText
                      +e.responseText+"</p>");
                      $("#loader").toggle( "slide" );
             },
             done : function(e) {
                     console.log("DONE");
                     enableSearchButton(true);
                     $("#loader").toggle( "slide" );
             }
         });
         
     });
      
 });
 
 function buscarArchivos(){
     $("#loader").toggle( "slide" );
     var srcIframe = "grid_regpage_SIC_ARCHIVOS_XML.htm?LASTQUERY=false&MSG=null&TIPOMSG=null&COMPORTAMIENTO=C&REGXPAGE=100&FILTROS=";
     //var srcIframe = "grid_SIC_ARCHIVOS_XML.htm?LASTQUERY=false&MSG=null&TIPOMSG=null&COMPORTAMIENTO=C&REGXPAGE=100&FILTROS=";
     var Calendario = $("#ID_TIPO").val();
     var Grupo = $("#ID_GRUPO").val();
     
     if(Calendario === ""){
       alertify.alert('Advertencia','Debe ingresar un valor valido primero para Calendario Envios');
       return;
     }
     
     if(Grupo === ""){
       alertify.alert('Advertencia','Debe ingresar un valor valido primero para Grupo de Archivos');
       return;
     }
     var filtros = [];
     filtro1 = {
                  "id" : -1,
                  "NOMBRE_INTERNO" : "ID_TIPO",
                  "Tipo" : "IGUAL",
                  "Texto" : Calendario
              };
              
     filtros.push(filtro1);
     filtro2 = {
                  "id" : -1,
                  "NOMBRE_INTERNO" : "ID_GRUPO",
                  "Tipo" : "IGUAL",
                  "Texto" : Grupo
              };
     filtros.push(filtro2);
     srcIframe  += btoa(JSON.stringify(filtros));//AGREGAR atob
     $("#archivosGrid").attr("src",srcIframe);
     $("#archivosGrid").css("height","350px");
     $("#loader").toggle( "slide" );
     //height: 350px
 }
 
 
 
 
 function descargar(secuencia,nombrearchivo){
     $("#msg").css("display","none");
      $("#loader").toggle( "slide" );
    $.ajax({
			
            type : "POST",
             url : "DBarchivo.htm",
             data : {secuencia : secuencia,nombrearchivo:nombrearchivo},
             timeout : 100000,
                                         'beforeSend' : function(xhr) {
                xhr.overrideMimeType('text/html; charset=iso-8859-1');
                //xhr.overrideMimeType('text/html;charset=utf-8');
                },
             success : function(data) {
                 var success;
                    try
                    {
                     //console.log("SUCCESS: ", data.trim());
                     if(data!=="0")
                         throw new Exception(data);
                     else{
                         location.replace("Descargar.htm?name="+nombrearchivo+"");
                     }
                     
                      
                    
                  }catch(Exception){
                      console.log("Error Javascript:"+Exception.message,"stack:",Exception.stack);
                      $("#msg").css("display","block");
                      $("#msg").html("Error en petición en dsoa:<p class='ErrorMsg glyphicon glyphicon-warning-sign'>"+data+"</p>");
                  }
                    /* console.log("grid:"+data);
                     display(data);*/
                 $("#loader").toggle( "slide" );
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