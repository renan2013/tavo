function reloadGrid(Peticion){ 
    var form = $("#formName").val();
    var query = JSON.parse($("#queryParams").val());
    var redirect = form;
    var accion = "J";
    //console.log($("#mostrar2"));
    if(Peticion !== undefined)
        accion = Peticion;
    if(query["CANT"] === $("#mostrar2").val())
      query["PAGINA"] = $("#pagina2").val();
    else
        query["PAGINA"] = "1";
    
    if(!isEmpty(base64Filters)){
        if(Peticion === undefined)
          accion = "J";
        query["FILTROS"] = base64Filters;
    }else
         query["FILTROS"] = "null";
    
    query["CANT"] = $("#mostrar2").val();
    query["PETICION"] = accion;
    
    
    
    
    var i = 0;
    for (var key in query) {
        if (query.hasOwnProperty(key)) {
            if(i == 0)
                redirect += "?";
            else
                redirect += "&";
            
            redirect += key+"="+query[key];
            
            i++;
             
        }
          
     }	
    //alert(redirect);
    setLocalStorage(form,redirect);
    window.location.href = redirect;
}

function toogleFilter(){
    //alert();
    $("#FILTROS").toggle();
}

function selectRow(index,comportamiento){
    var rows = JSON.parse($("#rowsArray").val());
    rowSelected = rows[index];
    $('#tempPrompt', window.parent.document).html(JSON.stringify(rowSelected));
}

function addFilters(){
    //alert("");
    var filterList = JSON.parse($("#rowsFiltros").val());
    var filter = {};
    var id = 0;
    
    if(Filters.length > 0)
        id = Filters[Filters.length - 1].id + 1;
    filter.id = id;
    filter.Tipo = filterList[0].Tipos[0].TIPO;
    filter.NOMBRE_INTERNO = filterList[0].NOMBRE_INTERNO;
    var html = "<tr id='filter_"+id+"'>\n";
      html +="<td><select onchange='changeFilter("+id+",\"NOMBRE_INTERNO\",this)'>";
          var i = 0;
          for(i in filterList ){
              row = filterList[i];
              html+="<option value='"+row.NOMBRE_INTERNO+"'>"+row.NOMBRE_CAMPO+"</option>";
          }
      html +="</select ></td>\n";
      html +="<td><select id='OPERADORFILTER_"+id+"' onchange='changeFilter("+id+",\"Tipo\",this)'>";
          var i = 0;
          for(i in filterList[0].Tipos ){
              row = filterList[0].Tipos[i];
              html+="<option value='"+row.TIPO+"'>"+row.LABEL+"</option>";
          }
      html+="</select></td>\n";
      html +="<td>";
        html+= "<any id='VALORFILTER_"+id+"'>";
           if(filterList[0].TIPO === "TEXTO")
             html+="<input onkeyup='changeFilter("+id+",\"Texto\",this)'>";
         
         if(filterList[0].TIPO === "CANTIDAD")
             html+="<input onkeyup='changeFilter("+id+",\"Texto\",this)'>";
         
         if(filterList[0].TIPO === "FECHA")
             html+="<input class='datepicker' onkeyup='changeFilter("+id+",\"Texto\",this)'>";
         
           if(filterList[0].TIPO === "PROMPT"){
              html+= "<div>" ;
                 html+="<input onkeyup='changeFilter("+id+",\"Texto\",this)'>";
                 html+=" <i class='glyphicon glyphicon-folder-open pointer' onclick='selectPrompt("+id+")'></i><br>";
                 html+="<input style='width:100%'>";
              html+= "</div>" ;
           }
           //Arma filtros tipo lov
           if(filterList[0].TIPO === "LOV"){
               var lov = filterList[0].Lov;
               html+="<select onchange='changeFilter("+id+",\"Texto\",this)'>\n";
                  $(lov).each(function(index,el){
                      /* if(index === 0){
                       html+="<option value='"+el.valor+"' selected='selected'>"+el.descripcion+"</option>";
                       tempChange["Texto"] = el.valor;
                       }else*/
                          html+="<option value='"+el.valor+"'>"+el.descripcion+"</option>";
                  });
               html+="</select>";
           }
           
        html+= "</any>";
      html+="<span><i class='glyphicon glyphicon-plus-sign pointer' onclick='addFilters()'></i><i class='glyphicon glyphicon-minus-sign pointer' onclick='removeFilter("+id+")'></i></span></td>\n";
    html += "</tr>\n";
    $("#bodyFilter").append(html);
    Filters.push(filter);
    setTimeout(function(){
            $('.datepicker').datepicker().on('changeDate', function(e) {
               $(e.currentTarget).trigger("keyup");
              });
        },100);
}

function fillFilters(server){
    
    if(!server)
     addFilters();
    else{
        //alert();
       var filtersServerstr = $("#searchFilters").val();
       if(!isEmpty(filtersServerstr)){
           Filters = JSON.parse(filtersServerstr);
           base64Filters = btoa(JSON.stringify(Filters));
           //toogleFilter();
           //console.log("json",Filters);
       }else{
           addFilters();
           toogleFilter();
       }
           
    }
    $("#mainGridContainer").css("display","block");
    $("#loader").css("display","none");
    
}

function clearSearch(){
    base64Filters ="";
    reloadGrid("J");
}

function removeFilter(id){
    var indexRemove;
    $(Filters).each(function(index,el){
        if(el.id === id){
            indexRemove = index;
            return;
        }
    });
     Filters.splice(indexRemove,1);
     $("#filter_"+id).remove();
    
}

function changeFilter(id,attr,input){
    
    var filterList = JSON.parse($("#rowsFiltros").val());
    var indexChange;
    //console.log("json",Filters);
    $(Filters).each(function(index,el){
        //console.log(el.id,id);
        var idNumber = parseInt(el.id);
        if(idNumber === id){
            indexChange = index;
            return;
        }
    });
    
    var tempChange = Filters[indexChange];
    tempChange[attr] = $(input).val();
    var indexOperadores; 
        $(filterList).each(function(index,el){
            if(el.NOMBRE_INTERNO === tempChange.NOMBRE_INTERNO){
                indexOperadores = index;
                return;
            }
     });
   if(attr === "Texto" && filterList[indexOperadores].TIPO === "PROMPT" ){
       var inputValue = $("#VALORFILTER_"+id+" :input");
        tempChange["DescripPrompt"] = $(inputValue[1]).val();
    }
    
    
    if(attr === "NOMBRE_INTERNO"){
        tempChange["Texto"] = undefined;
        tempChange["Tipo"] = undefined;
        var htmlOperadores = "";
        
        var i = 0;
        var html = "";
        for(i in filterList[indexOperadores].Tipos ){
              row = filterList[indexOperadores].Tipos[i];
              if(i === "0")
                  tempChange["Tipo"] = row.TIPO; 
              html+="<option value='"+row.TIPO+"' >"+row.LABEL+"</option>";
          }
        $("#OPERADORFILTER_"+id).html(html);
        
        var tipo = filterList[indexOperadores].TIPO;
        $("#VALORFILTER_"+id).html("");
        html= "";
        if(filterList[indexOperadores].TIPO === "TEXTO")
           html="<input onkeyup='changeFilter("+id+",\"Texto\",this)'>";
       
       if(filterList[indexOperadores].TIPO === "FECHA")
           html="<input class='datepicker' onkeyup='changeFilter("+id+",\"Texto\",this)'>";
       
       if(filterList[indexOperadores].TIPO === "PROMPT"){
             
              html+= "<div>" ;
                 html+="<input onkeyup='changeFilter("+id+",\"Texto\",this)'>";
                 html+=" <i class='glyphicon glyphicon-folder-open pointer' onclick='selectPrompt("+id+")'></i><br>";
                 html+="<input style='width:100%'>";
              html+= "</div>" ;
           }
           
           //Arma filtros tipo lov
           
           if(filterList[indexOperadores].TIPO === "LOV"){
               var lov = filterList[indexOperadores].Lov;
               html+="<select onchange='changeFilter("+id+",\"Texto\",this)'>\n";
                  $(lov).each(function(index,el){
                       if(index === 0){
                       html+="<option value='"+el.valor+"' selected='selected'>"+el.descripcion+"</option>";
                       tempChange["Texto"] = el.valor;
                       }else
                          html+="<option value='"+el.valor+"'>"+el.descripcion+"</option>";
                  });
               html+="</select>";
           }
       
        $("#VALORFILTER_"+id).html(html);
        setTimeout(function(){
            $('.datepicker').datepicker().on('changeDate', function(e) {
               $(e.currentTarget).trigger("keyup");
              });
        },100);
       
    }
    Filters.splice(indexChange,1,tempChange);
    console.log(Filters);
     /*if(filterList[indexOperadores].TIPO === "LOV"){
         setTimeout(function(){
            var inputValue = $("#VALORFILTER_"+id+" :select");
            //DISPARO ENVENTO
            //changeFilter(id,"Texto",'');
         },1000);
            
       }*/
}

function selectPrompt(id){
    var indexFilter;
    var filter;
    idPrompt = id;
    $(Filters).each(function(index,el){
        if(el.id === id){
            indexFilter = index;
            filter = el;
            return;
        }
    });
    
   var filterList = JSON.parse($("#rowsFiltros").val());
   var searchInstruc;
    $(filterList).each(function(index,el){
        if(el.NOMBRE_INTERNO === filter.NOMBRE_INTERNO){
            searchInstruc = el;
            return;
        }
    });
    
    function valor(obj){
        if(obj.tipo === "V")
            return true;
        return false;
    }
    
    function descrip(obj){
        if(obj.tipo === "D")
            return true;
        return false;
    }
   var valorMap = searchInstruc.PROMPT.MAP.filter(valor)[0];
   valorPrompt = valorMap;
   descriPrompt = searchInstruc.PROMPT.MAP.filter(descrip)[0];
   //console.log("valorMap",valorMap);
   var i = 0;
    Mapeo = Map;
    
    var filtros = [];
    /*for(i in Mapeo){
         var MapObject = Mapeo[i];
                //console.log($("#"+MapObject.Mante),rowSelected[MapObject.Prompt]);
        if(MapObject.tipo === "F"){
              var Valor = $("#"+MapObject.Mante).val();
              
              if(Valor === "0" || Valor === ""){
                alertify.alert('Advertencia','Debe ingresar un valor valido primero para '+MapObject.Label);
                return;
              }
              filtro = {
                  "id" : -1,
                  "NOMBRE_INTERNO" : MapObject.Prompt,
                  "Tipo" : "IGUAL",
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
          }
    }*/
    var PromptSrping = "grid_"+searchInstruc.PROMPT.FORM + ".htm?LASTQUERY=false&MSG=null&TIPOMSG=null&COMPORTAMIENTO=P&FILTROS=";
    if(filtros.length > 0)
        PromptSrping += btoa(JSON.stringify(filtros));//AGREGAR atob
    else
        PromptSrping += "null";
    //alert(PromptSrping);
    $("#PROMPTWINDOW").attr("src",PromptSrping);
    
       //$( "#modalPrompt" ).dialog().dialog('open');
       
       $( "#modalPrompt" ).dialog().dialog({
            height: 600,
            width: '95%',
           position: {
                my: "left top",
                at: "left top",
                of: window,
                collision: "none"
                }
       });
      
     setTimeout(function(){
         $("#ui-id-1").html(valorMap.Label);
     },100);
    
   /*  $( "#modalPrompt" ).dialog({
       open: function( event, ui ) {
           
       }
   });*/
    
}

function closePrompt(type){
    if(type === "A"){
        var tempPrompt = JSON.parse($("#tempPrompt").text());
        var value = tempPrompt[valorPrompt.Prompt];
       
        var inputValue = $("#VALORFILTER_"+idPrompt+" :input");
        
        
        try{
         var descrip = tempPrompt[descriPrompt.Prompt];
          $(inputValue[1]).val(descrip);
        }catch(Exepcion){}
       
        setTimeout(function(){
            $(inputValue[0]).val(value);
            var e = $.Event('keyup');
            $(inputValue[0]).trigger(e);
        },100);
        //console.log(inputValue);
    }
    $( "#modalPrompt" ).dialog( "close" );
}

function doSearch(){
    
    if(Filters.length > 0 && !isEmpty(Filters[0].Texto))
        base64Filters = btoa(JSON.stringify(Filters));
    
    reloadGrid();
}


function deleteRow(index,springService){
    var currentRows = JSON.parse($("#rowsArray").val());
    alertify.confirm('Confirme Borrado', 'Seguro de querer eliminar el registro?', 
     function(){ 
        var pk = JSON.parse($("#vPK").val());
        //console.log(currentRows,index - 1);
        var row = currentRows[index - 1 ];
        var paramPk = "?";
        var y = 0;
          for(y in pk){
             if(pk[y] !== undefined){ 
              var columna = pk[y].VALOR;
              if(y == 0)
                  paramPk += columna +"="+row[columna];
              else
              paramPk += "&" + columna +"="+row[columna];
             }
          }
          //alert(springService+paramPk);
           
     //alert(redirect);
       saveLastQuery();
       window.open(springService+paramPk,"_self");
     } 
     , function(){ /*NO EJECUTA BORRADO*/});


    /*var pk = JSON.parse($("#vPK").val());
    //alert(index);
    console.log(currentRows[index]);*/
}

function addBtn(link){
    saveLastQuery();
      window.location.href = link;
    
}

function editRow(index,springService){
    var currentRows = JSON.parse($("#rowsArray").val());
     var pk = JSON.parse($("#vPK").val());
        //console.log(currentRows,index - 1);
        var row = currentRows[index - 1 ];
        var paramPk = "?ROWID=null";
        var y = 0;
          for(y in pk){
             if(pk[y] !== undefined){ 
              var columna = pk[y].VALOR;
              /*if(y == 0)
                  paramPk += columna +"="+row[columna];
              else*/
              paramPk += "&" + columna +"="+row[columna];
             }
          }
          //alert(springService+paramPk);
           
     //alert(redirect);
     
      saveLastQuery();
      window.location.href =springService+ paramPk;
      
     
}

function saveLastQuery(){
    var form = $("#formName").val();
           var query = JSON.parse($("#queryParams").val());
           var redirect = form;
           var accion = "J";
           query["CANT"] = $("#mostrar2").val();
           query["PETICION"] = accion;
           query["PAGINA"] = $("#pagina2").val();
           
           if(Filters.length > 0 && !isEmpty(Filters[0].Texto))
               base64Filters = btoa(JSON.stringify(Filters));
           
           if(!isEmpty(base64Filters)){
        
             query["FILTROS"] = base64Filters;
        }else
          query["FILTROS"] = "null";
          var i = 0;
                for (var key in query) {
                    if (query.hasOwnProperty(key)) {
                        if(i == 0)
                            redirect += "?";
                        else
                            redirect += "&";

                        redirect += key+"="+query[key];

                        i++;

                    }
          
            }	
           // console.log(form);
            setLocalStorage(form,redirect);
}

$(document).ready(function(){
    $('.datepicker').datepicker().on('changeDate', function(e) {
        $(e.currentTarget).trigger("keyup");
   });
    //$( ".calendar" ).datepicker(); 
});
fillFilters(true);
var rowSelected;

