
//$("body").css("backgroundColor","white");

var Mapeo;
$( "#modalPrompt" ).dialog({
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

if($('.datepicker').length > 0){
    
   $('.datepicker').datepicker({
        format: 'dd/mm/yyyy'    
   });
}
    
function openPrompt(Prompt,Map){
    //alert();
    //alert(Map);
    var i = 0;
    Mapeo = Map;
    var title = "";
    var filtros = [];
    for(i in Mapeo){
         var MapObject = Mapeo[i];
                //console.log($("#"+MapObject.Mante),rowSelected[MapObject.Prompt]);
                //alert(MapObject.tipo);
               // console.log(MapObject.tipo);
        if(MapObject.tipo === "F"  || MapObject.tipo === "VF"){
            
             var tipo = "IGUAL";
             
             if(MapObject.operador !== undefined)
                 tipo = MapObject.operador;
            //VARCHAR
             //var Valor
              var Valor = $("#"+MapObject.Mante).val();
              
              if(Valor === "0" || Valor === ""){
                alertify.alert('Advertencia','Debe ingresar un valor valido primero para '+MapObject.Label);
                return;
              }
              filtro = {
                  "id" : -1,
                  "NOMBRE_INTERNO" : MapObject.Prompt,
                  "Tipo" : tipo,
                  "Texto" : Valor
              };
              filtros.push(filtro);
          }else if(MapObject.tipo === "C"){
             
             filtro = {
                  "id" : -1,
                  "NOMBRE_INTERNO" : MapObject.Prompt,
                  "Tipo" : "IGUAL",
                  "Texto" : MapObject.Mante
              };
              
              filtros.push(filtro);
          }else if(MapObject.tipo === "V" && title === ""){
             // alert();
              title = MapObject.Label;
          }
    }
    
    $( "#modalTitle" ).html(title); 
    //var PromptSrping = Prompt + "?LASTQUERY=false&MSG=null&TIPOMSG=null&COMPORTAMIENTO=P&FILTROS=";
    var PromptSrping = Prompt + "?LASTQUERY=false&MSG=null&TIPOMSG=null&COMPORTAMIENTO=P&FILTROSFIJOS=null&FILTROS=null&REGXPAGE=null&PAGINA=1&PETICION=J&CANT=10";
    
    //<iframe class="resp_body" src="grid2_INV_CATEGORIAS.htm?LASTQUERY=false&MSG=null&TIPOMSG=null&COMPORTAMIENTO=N&FILTROSFIJOS=null&FILTROS=null&REGXPAGE=null&PAGINA=1&PETICION=J&CANT=10" style="width: 99%;height: 750px" frameBorder="0"></iframe>  
                
    /*if(filtros.length > 0)
        PromptSrping += btoa(JSON.stringify(filtros));//AGREGAR atob
    else
        PromptSrping += "null";*/
    //alert(PromptSrping);
    $("#PROMPTWINDOW").attr("src",PromptSrping);
    $(".ui-dialog-buttonpane :input[type=button]").css("display","block");
    
    
    //alert($( "#modalPrompt" ).attr( "title"));
    $( "#modalPrompt" ).dialog( "open" );
   
    
     $( "#modalPrompt" ).dialog({
       open: function( event, ui ) {
           
       }
});

}

function closePrompt(type){
    
    if(type ==="A"){
        var i = 0;
       try
       {
            rowSelected = JSON.parse($("#tempPrompt").html());
            //console.log(rowSelected,Mapeo);
           // $("[parent='" + input.attr("selectPrompt")+ "']");
            for(i in Mapeo){
                var MapObject = Mapeo[i];
                //console.log($("#"+MapObject.Mante),rowSelected[MapObject.Prompt]);
              if(MapObject.tipo === "V" ||MapObject.tipo === "D" ){
              
              if(MapObject.tipo === "V"){
                  //BUSCO HIJOS EN CASO DE TENER PARA LIMPIAR
                 childs =  $("[parent='" +MapObject.Mante + "']");
                 
                 if(childs.length > 0){
                     //console.log($(childs));
                     
                     $.each(childs,function(index,el){
                         //console.log(index,el);
                         $(el).val("");
                         $("#DI_"+$(el).attr("id")).val("");
                         //alert("#DI_"+MapObject.Mante);
                     });
                 }
              }
              $("#"+MapObject.Mante).val(rowSelected[MapObject.Prompt]).change();
              $("#"+MapObject.Mante).attr("value",rowSelected[MapObject.Prompt]);
              }else if(MapObject.tipo === "H"){
                $("#"+MapObject.Mante).val("");
              }
              
                    /*REVISO POR EVENTOS POST MODAL*/
                 if(MapObject.tipo === "AP" && MapObject.Dispara === "A" ){
                     eval(MapObject.Procedure + "()");
                 }
            }
       }catch(Exception){
           alertify.alert('Advertencia','Debe escoger un registro de la lista');
           return;
       }finally {
           $("#tempPrompt").html();
        }
        
    }
    $( "#modalPrompt" ).dialog( "close" );
}

function mapBackSerialize(Map){
    var formParent = JSON.parse(atob($("#FormParent").val()));
    var i = 0;
    for(i in Map){
        var mapeo;
        
        var j = 0;
        for(j in formParent){
            if(formParent[j].item === Map[i].PADRE){
              mapeo = formParent[j];
              break;
            }
        }
        
        $("#"+Map[i].HIJO).val(mapeo.value);
        $("#"+Map[i].HIJO).attr("value",mapeo.value);
    }
}



$("document").ready(function(){
    //MANEJA ENTER DE INPUTS PROMPT
    $(".ID_PROMPT").on('keydown',function(e) { 
        
        
        
        var keyCode = e.keyCode || e.which; 
        //alert(keyCode);

        if (keyCode === 9 ||keyCode === 13 ) { 
          e.preventDefault(); 
          //console.log(this);
          var input = $(this);
          var jsonValues = [];
          input.change();
          //jsonValues = [{"valor":input.val()}];
          var group = $("[selectPrompt='" + input.attr("selectPrompt")+ "']");
          $.each(group,function (index,el){
              value = {
                  "valor": $(el).val()
              };
              jsonValues.push(value);
          });
          
            var row = $(input.parents(".row"));
            
            var Btnprompt = $(row.find("span"));
            
            var clickAttr = Btnprompt.attr("onclick");
            
            var jsonMapStr = "["+clickAttr.substring(clickAttr.indexOf("[")+1,clickAttr.indexOf(";")-1) +"]";
            
            var jsonMapJson = JSON.parse(jsonMapStr);
            
            //console.log(jsonMapJson);
            $.each(jsonMapJson,function(index,el){
                if(el.tipo === "F" || el.tipo === "VF" ){
                    var tempvalue = $("#"+el.Mante).val();
                            value = {
                          "valor": tempvalue
                      };
                    jsonValues.push(value);
                }
            });
          
             $.ajax({
	            
                    type : "POST",
                     url : "executeQuery.htm",
                     data : {PV_QUERY : input.attr("selectPrompt"),VALUES:JSON.stringify(jsonValues)},
                     timeout : 100000,
                                                 'beforeSend' : function(xhr) {
                        xhr.overrideMimeType('text/html; charset=iso-8859-1');
                        //xhr.overrideMimeType('text/html;charset=utf-8');
                        },
                     success : function(data) {
                         var success;
                            try
                            {
                             if(data.indexOf("Acceso denegado a este metodo") !== -1)
                                 window.location.href = "loginParent.htm";
;                             success = data;
                              $("#"+input.attr("diPrompt")).val(success);

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
      });
    
    /***********************MANEJA LOS FORMULARIOS DE PROCEDURES********************************/
    $('.formProcedure').submit(function( event ) {
        /*alert( "Handler for .submit() called." );*/
        event.preventDefault();
        //console.log(serializeForm($( this )));
        var formJson = serializeForm($( this ));
        var data = {};
        var i = 0;
        for(i in formJson){
            data[formJson[i].item] = formJson[i].value;
        }
        $.ajax({
               type : "POST",
                url : "peticionExecuteGenericSOA.htm",
                data : data,
                timeout : 100000,
                                            'beforeSend' : function(xhr) {
                   xhr.overrideMimeType('text/html; charset=iso-8859-1');
                   //xhr.overrideMimeType('text/html;charset=utf-8');
                   },
                success : function(data) {
                    var success;
                       try
                       {
                        success = $(data);
                         success.children().each(function(index,el){
                             var id = $(el)['0'].nodeName;
                             $("#"+id).val($(el).text());
                             $("#"+id).attr("value",$(el).text());
                             //console.log($(el)['0'].nodeName);
                         });
                         
                     }catch(Exception){
                         console.log("Error Javascript:"+Exception.message,"stack:",Exception.stack);
                         $("#msg").css("display","block");
                         $("#msg").html("Error en petición en dsoa:<p class='ErrorMsg glyphicon glyphicon-warning-sign'>"+data+"</p>");
                     }
                       /* console.log("grid:"+data);
                        display(data);*/
                },
                error : function(request, status, error) {
                        console.log("ERROR: ",request.status ,status,error);
                        
                },
                done : function(e) {
                        console.log("DONE");
                        enableSearchButton(true);
                }
           });
    });
    /*manejo del comportamiento de los campos*/
    if ($("#COMPORTAMIENTO")./*exists()*/length > 0) {
      var campos = $($("#COMPORTAMIENTO").val());
      //console.log(campos.find("campo"));
      campos.find("campo").each(function(index,el){
         var campo = $(el);
         var id = String(campo.find("nombre").text());
         var visible = String(campo.find("visible").text());
         var editable = String(campo.find("editable").text());
         var classCss = String(campo.find("class").text());
         //console.log(campo.find("nombre").text(),campo.find("visible").text(),campo.find("editable").text(),campo.find("class").text());
         if(visible === "N")
             $("#"+id).css("display","none");
         else{
             //alert();
             
             $("#"+id).attr("style","display:block");
             if($("#"+id).hasClass("ID_PROMPT")){
                 console.log($($("#"+id).parentsUntil()['2']));
                 $($("#"+id).parentsUntil()['2']).attr("style","display:block");
             }
         }
         if(editable === "N")
             $("#"+id).attr("readonly","true");
         
         var input = $("#"+id);
        // console.log(input.parent());
         if(input.parent().attr("data-provide") !== undefined){
             input.parent().attr("data-provide","");
             input.siblings().remove();
         }
         //console.log(input.siblings());
         if(!isEmpty(classCss))
             $("#"+id).addClass(classCss);
      });
    }
});

function goBack(form){
  var lastQuery =  getLocalStorage(form+".htm");
  //alert(lastQuery);
  window.location.href = lastQuery;
}
