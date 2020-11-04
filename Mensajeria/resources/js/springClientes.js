var currentFilters = [];
var currentRows = [];
var rowsSelected = [];
var Mapeo;

$("body").css("backgroundColor","white");

function setJSEventGrid(id, input, event, pfunction) {
    //alert(id+pfunction+input+event);
    setTimeout(function() {
        //console.log($("#" + id + " tr td input[type=" + input + "]"));
        /*
        $("#" + id + " tr td input[type=" + input + "]").on("focusout", function() {
            //alert();
            console.log('El campo se esta editando moterfucker');

        });*/
        //console.log($("#" + id + " tr td input[type=" + input + "]"));
        $("#" + id + " tr td input[type=" + input + "]").off(event);
        $("#" + id + " tr td input[type=" + input + "]").on(event, function() {
            //alert(pfunction);
            //eval("postevent()");
            eval(pfunction);
        });
    }, 500);

}

 //var thisForm = $("#clearSearch").attr("href")+$("#COMPORTAMIENTO").val() /*+$("#filtrosParam").val()+$("#COMPORTAMIENTO").val()*/+ "&FILTROS="+$("#filtrosParam").val();
 //$("#clearSearch").attr("href",thisForm);
//alert(thisForm);

function chargeGrid(pagina,tipo,formMante,backMante,formDelete){
   //console.log(pagina);
   
   /*VALIDA SI EXISTE EVENTO PARA EL GRID EVENTO*/
   
   
   /*VALIDAR SI TRAE ALGÚN FITLRO POR PARAMETRO*/
   var paramFiltrostxt = $("#filtrosParam").val();
   var filtrosParam;
   if(paramFiltrostxt !== undefined && paramFiltrostxt !== "null"){
     try{ 
        filtrosParam = JSON.parse(atob(paramFiltrostxt));
       //alert(paramFiltrostxt);
       
       var i = 0;
       
       for(i in filtrosParam){
           
           var j = 0;
          if(currentFilters.length > 0){ 
           for(j in currentFilters){
               /*SI YA FUE AGREGADO NO SE AGREGA DE NUEVO*/
               //alert("current:"+currentFilters[j].NOMBRE_INTERNO+" prefiltro:"+filtrosParam[i].NOMBRE_INTERNO);
               if(currentFilters[j].NOMBRE_INTERNO === filtrosParam[i].NOMBRE_INTERNO){
                   //alert("no lleno");
                   break;
               }else{
                   //alert("lleno:"+filtrosParam[i].NOMBRE_INTERNO);
                   currentFilters.push(filtrosParam[i]);
                   alert(filtrosParam[i]);
                   break;
               }
           }
        }else
            currentFilters.push(filtrosParam[i]); 
       }
     }catch(Exception){
         //$("body").html("<p>Error en cargar filtros param get:<p class='ErrorMsg glyphicon glyphicon-warning-sign'></p>");
         console.log(Exception);
     }  
   }
   //console.log(currentFilters);
   var lastQueryJ = getLocalStorage(formMante+"JQ");
   //alert(backMante);
   if(lastQueryJ !== null && backMante === "true"){
      //alert(lastQueryJ);
       //eval(lastQueryJ);
        var executeFunction = lastQueryJ;
        //alert("eval");
        deleteCookie(lastQueryJ);
        var pastFilters = getLocalStorage(formMante+"FILTERS");
        if(pastFilters !== null /*|| pastFilters !== undefined*/){
            //console.log(pastFilters);
            currentFilters = JSON.parse(pastFilters);
            //alert('borre');
            deleteLocalStorage(formMante+"FILTERS");
            //console.log(memoryFilters);
            rearmarFiltros();
        }
        //alert("reloadfilters");
        //console.log(executeFunction);
        eval(executeFunction);
        return;
   } 
   
   if(backMante === "false"){
       deleteLocalStorage(formMante+"FILTERS");
       deleteLocalStorage(formMante+"PQ");
       deleteLocalStorage(formMante+"JQ");
   }
   
  if(pagina !== undefined){ 
    var curPage = 0;
    var filtros = "null";
   if(tipo === "J" && currentFilters.length > 0){
       filtros = JSON.stringify(currentFilters);
       setLocalStorage(formMante+"FILTERS",filtros);
   }
   
    if(tipo === "J"){
        //alert(backMante);
        var lastPage = getLocalStorage(formMante+"PQ");
        //alert(lastPage);
        if(lastPage === null ||lastPage === undefined || backMante === "false" ){
            //alert('if');
         curPage = 1;
       }else{
           //alert('else');
           curPage = lastPage;
       }
        var JQ = formMante + "JQ";
        var value = "chargeGrid('"+pagina+"','J','"+formMante+"','undefined','"+formDelete+"')";
        setLocalStorage(JQ,value);
    }else{
        curPage = $("#pagina").val();
        var JP = formMante + "PQ";
        var value = curPage;
        setLocalStorage(JP,value);
    }
    
     var lastRegxPag = getLocalStorage(formMante+"RQ");
     var RegXpag;
     //console.log("lastRegxPag",lastRegxPag,"backMante",backMante);
     if(tipo === "J" && $("#lastQuery").val() === "true"){
         RegXpag = lastRegxPag;
         $("#mostrar").val(RegXpag);
         $("#lastQuery").val("false");
     }else{
        
        RegXpag =  $("#mostrar").val();
        //alert(RegXpag);
        setLocalStorage(formMante+"RQ",RegXpag);
     }
     //alert(RegXpag);
    //console.log($("#columnas"));
    var columnasJson = JSON.parse($("#columnas").val());
    //Reviso duplicados de filtros
    //console.log(filtros);
    
    if(filtros !== "null"){
        //alert("corrección");
        temFiltros = JSON.parse(filtros);
     for(var i = 0; i < temFiltros.length; i++) {
                for(var j = i+1; j < temFiltros.length; j++) {
                if(temFiltros[i].NOMBRE_INTERNO === temFiltros[j].NOMBRE_INTERNO && temFiltros[i].Tipo === temFiltros[j].Tipo ) 
                   temFiltros.splice(j,1);
                
                    
                }
        }
        //console.log("tempFiltros:",JSON.stringify(temFiltros));
        for(var i = 0; i < temFiltros.length; i++) {
                
                if(temFiltros[i].Texto === " ") 
                   temFiltros.splice(i,1);
              
        }
        //console.log(JSON.stringify(temFiltros));
        filtros = JSON.stringify(temFiltros);
    }
  
    //console.log(filtros);
    
    if(isEmpty(RegXpag)){
       RegXpag = 5;
       $("#mostrar").val(5);
    }
    $.ajax({
			
                       type : "POST",
			url : pagina,
			data : {pagina : curPage,cantidad:RegXpag,tipo:tipo,filtros:filtros,columnas:JSON.stringify(columnasJson)},
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
                                success = data;
                                var response =JSON.parse(success); 
                                
                                //var response = JSON.parse('{"page":1, "total":100, "registros":498, "rows": [ {"ID_BITACORA_ENVIO":"108","FECHA_CORTE":"28/02/17","DATO_REFERENCIA":"Tipo Deudor 1 Deudor 109030137 Operacion 88728"}, {"ID_BITACORA_ENVIO":"109","FECHA_CORTE":"28/02/17","DATO_REFERENCIA":"Tipo Deudor 1 Deudor 303290409 Operacion 88766"}, {"ID_BITACORA_ENVIO":"110","FECHA_CORTE":"28/02/17","DATO_REFERENCIA":"Tipo Deudor 1 Deudor 601640128 Operacion 88773"}, {"ID_BITACORA_ENVIO":"111","FECHA_CORTE":"28/02/17","DATO_REFERENCIA":"Tipo Deudor 1 Deudor 109060596 Operacion 88776"}, {"ID_BITACORA_ENVIO":"112","FECHA_CORTE":"28/02/17","DATO_REFERENCIA":"Tipo Deudor 1 Deudor 104240283 Operacion 88778"}] }');
                                //console.log("response:",response);
                               if(tipo === "J"){
                                    loadPages(response.total,response.registros);
                                }
                                
                                $("#pagina").val(curPage);
                                currentRows = response.rows;
                               // console.log(response.rows);
                                printGrid(response.rows,formMante,formDelete);
                             }catch(Exception){
                                 console.log("Error Javascript:"+Exception.message,"stack:",Exception.stack);
                                $("body").html("Error grid en dsoa:<p class='ErrorMsg glyphicon glyphicon-warning-sign'>"+success+"</p>");
                             }
                               /* console.log("grid:"+data);
				display(data);*/
			},
			error : function(e) {
				console.log("ERROR: ", e);
				//display(e);
                                $("body").html("Error ajax:  <p class='ErrorMsg glyphicon glyphicon-warning-sign'>StatusError:"+e.status+"<br>StatusText:"+e.statusText
                                 +e.responseText+"</p>");
			},
			done : function(e) {
				console.log("DONE");
				enableSearchButton(true);
			}
		});
    }
}

function deleteRow(index,springService){
    
    alertify.confirm('Confirme Borrado', 'Seguro de querer eliminar el registro?', 
     function(){ 
        var pk = JSON.parse($("#vPK").val());
        var row = currentRows[index];
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
          window.open(springService+paramPk,"_self");
     } 
     , function(){ /*NO EJECUTA BORRADO*/});


    /*var pk = JSON.parse($("#vPK").val());
    //alert(index);
    console.log(currentRows[index]);*/
}

function loadPages(cantPag,registros){
    var combo = $("#pagina");
    var options = "";
    for(i=1;i<=cantPag;i++){
        options+="<option value="+i+">"+i+"</option>";
    }
    combo.html(options);
}

function printGrid(rows,formMante,formDelete){
        //console.log(rows);
        var tableRows = "";
        var columnas = JSON.parse($("#columnas").val());
        var comportamiento = $("#COMPORTAMIENTO").val();
        var i = 0;
        if(comportamiento === "P" || comportamiento === "C"){
            var encabezados = $("#GRID");
        }
        for(i in rows){

          tableRows += "<div id='bodyGrid' class='cli_nombre'> ";
		  
          var row = rows[i];
          
          var j = 0;
          for(j in columnas){
             if (columnas[j].TIPO === undefined || columnas[j].TIPO === "text") {
                if (columnas[j].VISIBLE != undefined && columnas[j].VISIBLE == "N")
                    tableRows += "<td  style='display:none;'>" + row[columnas[j].columna] + "</td>";
    
                else
                    tableRows += "<td>" + row[columnas[j].columna] + "</td>";

            }else if(columnas[j].TIPO !== undefined && columnas[j].TIPO === "combox" ){
                 
                //var combox = "<select disabled>";
                var combox = "";
                      var opciones = columnas[j].opciones;
                      var z = 0;
                      for(z in opciones){
                          var opcion = opciones[z];
                          if(row[columnas[j].columna] ===  opcion.valor){
                           combox +=  opcion.descripcion;
                          }
                         /* else
                              combox += "<option value='"+opcion.valor+"'>"+opcion.descripcion+"</option>";*/
                      }
                /* combox += "</select>";*/
                 tableRows += "<td>"+combox+"</td>";
             }else if(columnas[j].TIPO !== undefined && columnas[j].TIPO === "checkbox" ){
                 var checkvalue = columnas[j].checkvalue;
                 var check = "";
                 var z = 0;
                 
                      for(z in checkvalue){
                          var opcion = checkvalue[z];
                          var functionParam = '"'+opcion.funcion+'"';
                          if(row[columnas[j].columna] ===  opcion.check){
                           if(opcion.funcion !== "readonly")
                           check +=  "<input type='checkbox' checked='checked' row='"+i+"' value='true' >";
                       
                           if(opcion.funcion === "readonly")
                           check +=  "<input type='checkbox' checked='checked' row='"+i+"' value='true' readonly='true'>";
                           
                          }
                         else{
                             if(opcion.funcion !== "readonly")
                              check += "<input type='checkbox' row='"+i+"' value='true' >";
                             if(opcion.funcion === "readonly")
                                 check += "<input type='checkbox' row='"+i+"' value='true' readonly='true'>";
                         }
                      }
                      tableRows += "<td>"+check+"</td>";
             }
          }
          
          var rowid = "null";
          if(row.ROWID !== undefined){
              rowid = row.ROWID;
          }
          
         try{
            var pk = JSON.parse($("#vPK").val());
              //console.log(pk);
              var paramPk = "";
              var y = 0;
              for(y in pk){
                 if(pk[y] !== undefined){ 
                  var columna = pk[y].VALOR;
                  paramPk += "&" + columna +"="+row[columna];
                 }
              }
         }catch(Exception){
             
         }
          /*comportamiento: N=Grid normal edit delete,P=Prompt, O= other igual a N solo si edit y delete*/
         if(comportamiento === "N"){
          tableRows += "<td><a href='" +formMante+"?ROWID="+rowid+paramPk+"' class='glyphicon glyphicon-pencil'></a> </td>";
          tableRows += "<td><a  onclick='deleteRow("+i+","+"\""+formDelete+"\")' class='glyphicon glyphicon-remove-circle pointer'></a> </td>";
           var columnasExtra = $("#columnasExtra");
           if(columnasExtra.length > 0){
               jsonColumanas = JSON.parse(columnasExtra.val());
               var z = 0;
               for(z in jsonColumanas){
                   tableRows += "<td><a  onclick='selectRow("+i+","+"\""+jsonColumanas[z].CALL+"\")' class='"+jsonColumanas[z].ICON+" pointer'></a> </td>";
               }
           }
          
         }else if(comportamiento === "O"){
          
           var columnasExtra = $("#columnasExtra");
           if(columnasExtra.length > 0){
               jsonColumanas = JSON.parse(columnasExtra.val());
               var z = 0;
               for(z in jsonColumanas){
                   tableRows += "<td><a  onclick='selectRow("+i+","+"\""+jsonColumanas[z].CALL+"\")' class='"+jsonColumanas[z].ICON+" pointer'></a> </td>";
               }
           }
          
         }
         
         
          tableRows += "</div>";
        }
    		
       $("#bodyGrid").html(tableRows);
       var isReady = setInterval(function(){
           if($("#bodyGrid").children().length > 0){
               clearInterval(isReady);
               $("#mainGridContainer").css("display","block");
               $(".table-responsive").css("display","block");
               $("#loader").css("display","none");
           }
       },1000);
       if($("#eventgrid").length > 0){
           eval($("#eventgrid").val());
       }
}

function selectRow(index,comportamiento,item){
    var curItem = currentRows[index];
    if(comportamiento === "P"){
        $('#tempPrompt', window.parent.document).html(JSON.stringify(curItem));
        setLocalStorage("promptRow",JSON.stringify(curItem));
    }else if(comportamiento === "C"){
        //rowsSelected
        var i = 0;
        for(i in rowsSelected){
           if(curItem === rowsSelected[i]){
               rowsSelected.splice(i, 1);
               break;
           }
        }
        if($(item).is( ":checked" ))
           rowsSelected.push(curItem); 
        
        if($("#rowsChecked").length > 0)
            $("#rowsChecked").val(JSON.stringify(rowsSelected));
       
       
    }else{
       
        //llama funcion pasa x parametro de comportamiento
        eval(comportamiento+"('"+JSON.stringify(curItem)+"')");
    }
}

/*function onClickRow(index,funcion,input){
    var curItem = currentRows[index];
    
     eval(funcion+"('"+JSON.stringify(curItem)+"','"+JSON.stringify($(input))+"')");
      
    
}*/



function rearmarFiltros(){
    //alert("rearmar");
    var filtros = JSON.parse($("#vFILTROS").val());
    var i = 0;
    var tableBody = $("#FILTROSTABLE tbody");
    var rows = "";
    /*POR CADA FILTRO EN MEMORÍA TENGO QUE REARMAR LA TABLA*/
    for(i in currentFilters){
        rows += "<tr filter='" + currentFilters[i].id + "'>";
        /*CARGO TODOS LOS FILTROS EN LA SECCIÓN DE ELEGIR FILTRO */
        rows += "<td>";
        
        rows += "<select class='form-control filtersForm' style='' onchange='getTypes("+currentFilters[i].id+")'>";
        y = 0;
        var selected = 0;
       for(y in filtros){
          
          if(filtros[y].NOMBRE_INTERNO === currentFilters[i].NOMBRE_INTERNO ){
              rows += "<option value='"+filtros[y].NOMBRE_INTERNO+"' selected>"+filtros[y].NOMBRE_CAMPO+"</option>";
              selected = y;
          }else
              rows += "<option value='"+filtros[y].NOMBRE_INTERNO+"'>"+filtros[y].NOMBRE_CAMPO+"</option>";
          
       }  
      rows += "</select>"; 
      rows += "</td>";
     //REARMO TIPOS
      rows += "<td>";
      rows += "<select  onchange='changeType("+currentFilters[i].id+")'>";
      y = 0;
      
      var tipos = filtros[selected].TIPO_FILTRO;
      for(y in tipos){
          if(tipos[y].TIPO === currentFilters[i].Tipo ){
              rows += "<option value='"+tipos[y].TIPO+"' selected>"+tipos[y].LABEL+"</option>";
              selected = y;
          }else
              rows += "<option value='"+tipos[y].TIPO+"'>"+tipos[y].LABEL+"</option>";
      }
      rows += "</select>"; 
      rows += "</td>";
     //COLOCO TEXTO
      rows += "<td>";
        /*REARMAR VALIDAR AQUÍ TIPO DE FILTRO DE VUELTA COMBO Y PROMPT*/
       
        var filterStructure = JSON.parse($("#vFILTROS").val());
        y = 0;
        for(y in filterStructure ){
            structure = filterStructure[y];
            if(currentFilters[i].NOMBRE_INTERNO === structure.NOMBRE_INTERNO){
                //VALIDO SI AL REARMAR ES TEXTO
                if(structure.PROMPT === undefined && structure.METODOS_BUSQUEDA === undefined)
                    rows+="<input type='text' class='form-control filtersForm' value='"+currentFilters[i].Texto+"' onkeyup='changeTxtFilter("+currentFilters[i].id+",this)'>";
                else if(structure.METODOS_BUSQUEDA !== undefined){
                    var combox = '<select onchange="changeTxtFilter(' + currentFilters[i].id + ',this)">';
                            var z = 0;
                            var jsonCombo = structure.METODOS_BUSQUEDA.DESCRIPCION;
                            for (z in jsonCombo) {
                                combox += "<option value='" + jsonCombo[z].valor + "'>" + jsonCombo[z].descripcion + "</option>";
                            }
                            combox += "</select>";
                           rows+= combox;
                }else if (structure.PROMPT !== undefined) {
                    var promptConfig = structure.PROMPT;
                    var gridPrompt =  '"'+promptConfig.FORM+'"';
                    var idValor="";
                    var idDescripcion="";
                    var r = 0;
                    for(r in promptConfig.MAP ){
                        if(promptConfig.MAP[r].tipo === 'V')
                            idValor=promptConfig.MAP[r].Filter;

                        if(promptConfig.MAP[r].tipo === 'D')
                            idDescripcion=promptConfig.MAP[r].Filter;    //promptdescription  
                    }
                    rows+= "<input type='text' class='promptidfilter' style='width:15%' id='"+idValor+"' onchange='changeTxtFilter(" + currentFilters[i].id + ",this)'  value='"+currentFilters[i].Texto+"'/><input type='text' class='promptdescriptionfilter' id='"+idDescripcion+"' style='width:70%' value='"+currentFilters[i].promptdescription+"' readonly='true'/><br><button class='glyphicon glyphicon-folder-open' onclick='openPrompt("+gridPrompt.trim()+","+JSON.stringify(promptConfig.MAP)+")'>  Ver Lista </button>";
               }
        
            }
        }
        rows+="<span onclick='addFilter()' class='glyphicon glyphicon-plus-sign pointer'></span><span onclick='deleteFilter(" + currentFilters[i].id + ")' class='glyphicon glyphicon-minus-sign pointer'></span>";
      rows += "</td>";
    }
    rows+="</tr>";
    tableBody.html(rows);
   $("#FILTROS").toggle();
}



function getTypes(index) {
    var filtros = JSON.parse($("#vFILTROS").val());
    $("[Filter='" + index + "']").children("td").each(function(index2, td) {
        switch (index2) {
            case 0:
                //preparo ambiente para manejar el filtro seleccionado
                var comboFiltros = $($($("[Filter='" + index + "']")['0'].children['0'])['0'].children['0']);
                var selected = comboFiltros.val();
                var x = 0;
                for (x in currentFilters) {
                    if (currentFilters[x].id == index) {
                        currentFilters[x].NOMBRE_INTERNO = selected;
                    }
                }
                break;
            case 1:
                // campo2 = $(this).text();
                //Armo combox con tipo de filtro TEXTO = > 0 <
                var comboFiltros = $($($("[Filter='" + index + "']")['0'].children['0'])['0'].children['0']);
                var selected = comboFiltros.val();
                var comboHtml = "";
                var i = 0;
                var j = 0;
                for (i in filtros) {
                    if (filtros[i].NOMBRE_INTERNO == selected) {
                        //comboHtml += '<option value="' + filtros[i].NOMBRE_INTERNO + '">' + filtros[i].NOMBRE_CAMPO + '</option>';
                        var tipos = filtros[i].TIPO_FILTRO;
                        for (j in tipos) {
                            if (tipos[j].TIPO){
                                if(tipos[j].TIPO !== "IGUAL")
                                  comboHtml += '<option value="' + tipos[j].TIPO + '">' + tipos[j].LABEL + '</option>';
                                else
                                    comboHtml += '<option value="' + tipos[j].TIPO + '" selected="true">' + tipos[j].LABEL + '</option>';
                            }
                        }
                        break;
                    }
                    j = 0;
                }
                var comboTipos = $($(td)['0'].children['0']);
                //console.log("combostipo",comboTipos);
                comboTipos.html(comboHtml);
                comboTipos.attr("onchange", "changeType(" + index + ")");
                //console.log("tiposArranque:",comboHtml);
                var x = 0;
                for (x in currentFilters) {
                    if (currentFilters[x].id == index) {
                        currentFilters[x].Tipo = comboTipos.val();
                    }
                }
                break;
            case 2:
                //campo3 = $(this).text();
                //Limpia cuando cambio tipo de filtro
                var txtFiltro = $($(td)['0'].children['0']);
                txtFiltro.val(" ");
                var x = 0;
                for (x in currentFilters) {
                    if (currentFilters[x].id == index) {
                        currentFilters[x].Texto = txtFiltro.val();
                       
                        j = 0;
                        for (j in filtros) {
                            
                            if (currentFilters[x].NOMBRE_INTERNO == filtros[j].NOMBRE_INTERNO && filtros[j].METODOS_BUSQUEDA != undefined) {
                                //Pinto filtros tipo combox
                                var jsonCombo = filtros[j].METODOS_BUSQUEDA.DESCRIPCION;
                                tdValoraFiltrar = $(this);
                                //console.log(tdValoraFiltrar.children()[0]);
                                //Salvo botones
                                var bontonAdd = tdValoraFiltrar.children()[1];
                                var bontonDelete = tdValoraFiltrar.children()[2];
                                //Remuevo input todos
                                tdValoraFiltrar.children().remove();
                                //Creo combox
                                var combox = '<select onchange="changeTxtFilter(' + index + ',this)">';
                                var y = 0;
                                for (y in jsonCombo) {
                                    combox += "<option value='" + jsonCombo[y].valor + "'>" + jsonCombo[y].descripcion + "</option>";
                                }
                                combox += "</select>";
                                tdValoraFiltrar.append(combox);
                                tdValoraFiltrar.append(bontonAdd);
                                tdValoraFiltrar.append(bontonDelete);
                                var comboHtml = tdValoraFiltrar.children()[0];
                                changeTxtFilter(index,tdValoraFiltrar.children()[0]);
                                break;
                            } else if ((currentFilters[x].NOMBRE_INTERNO === filtros[j].NOMBRE_INTERNO)&& (filtros[j].PROMPT === undefined && filtros[j].METODOS_BUSQUEDA === undefined  )) {
                                //Pinto Filtros tipo texto
                                tdValoraFiltrar = $(this);
                                //console.log("no combo:", tdValoraFiltrar);
                                var filterInput = $(tdValoraFiltrar.children()[0]);
                                //console.log(tdValoraFiltrar);
                                if (filterInput.is('select')){
                                    //alert('quite');
                                    var bontonAdd = tdValoraFiltrar.children()[1];
                                    var bontonDelete = tdValoraFiltrar.children()[2];
                                    //Remuevo input todos
                                    tdValoraFiltrar.children().remove();
                                    //console.log("no combo delete childs:", tdValoraFiltrar);
                                    var row = '<input value="" class="form-control filtersForm" onkeyup="changeTxtFilter(' + index + ',this)">';
                                    tdValoraFiltrar.append(row);
                                    tdValoraFiltrar.append(bontonAdd);
                                    tdValoraFiltrar.append(bontonDelete);
                                }else if(tdValoraFiltrar.children().length > 3){
                                    //VALOR ANTERIOR PROMPT
                                    //console.log(tdValoraFiltrar.children());
                                    var bontonAdd = tdValoraFiltrar.children()[4];
                                    var bontonDelete = tdValoraFiltrar.children()[5];
                                    tdValoraFiltrar.children().remove();
                                    //console.log("no combo delete childs:", tdValoraFiltrar);
                                    var row = '<input value="" class="form-control filtersForm" onkeyup="changeTxtFilter(' + index + ',this)">';
                                    tdValoraFiltrar.append(row);
                                    tdValoraFiltrar.append(bontonAdd);
                                    tdValoraFiltrar.append(bontonDelete);
                                }
                            }else if (currentFilters[x].NOMBRE_INTERNO === filtros[j].NOMBRE_INTERNO && filtros[j].PROMPT !== undefined) {//FILTROS PROMPT DESARROLLO
                                //Pinto filtros tipo prompt
                                tdValoraFiltrar = $(this);
                                var promptConfig = filtros[j].PROMPT;
                                var bontonAdd; 
                                var bontonDelete; 
                                //console.log(tdValoraFiltrar.children());
                               if(tdValoraFiltrar.children().length === 3){
                                    bontonAdd = tdValoraFiltrar.children()[1];
                                    bontonDelete = tdValoraFiltrar.children()[2];
                                }else{
                                    var bontonAdd = tdValoraFiltrar.children()[4];
                                    var bontonDelete = tdValoraFiltrar.children()[5];
                                }
                                //Remuevo input todos
                                tdValoraFiltrar.children().remove();
                                var gridPrompt =  '"'+promptConfig.FORM+'"';
                                var idValor="";
                                var idDescripcion="";
                                var r = 0;
                                for(r in promptConfig.MAP ){
                                    if(promptConfig.MAP[r].tipo === 'V')
                                        idValor=promptConfig.MAP[r].Filter;
                                    
                                    if(promptConfig.MAP[r].tipo === 'D')
                                        idDescripcion=promptConfig.MAP[r].Filter;      
                                }
                                tdValoraFiltrar.append("<input type='text' class='promptidfilter' style='width:15%' id='"+idValor+"' onchange='changeTxtFilter(" + index + ",this)' /><input type='text' class='promptdescriptionfilter' id='"+idDescripcion+"' style='width:70%' readonly='true'/><br><button class='glyphicon glyphicon-folder-open' onclick='openPrompt("+gridPrompt.trim()+","+JSON.stringify(promptConfig.MAP)+")'>  Ver Lista</button>");
                                tdValoraFiltrar.append(bontonAdd);
                                tdValoraFiltrar.append(bontonDelete);
                                break;
                            }
                        }
                    }
                }

                break;
        }
        //$(this).css("background-color", "#ECF8E0");
    })


}



function addFilter() {
    //alert('add');
    var id = currentFilters[currentFilters.length - 1].id + 1;
    var jsonFilter = {};
    jsonFilter.id = id;
    var filtros = JSON.parse($("#vFILTROS").val());
    var row = '<tr filter="' + id + '">';
    row += "<td>";
    row += '<select class="form-control filtersForm" onchange="getTypes(' + id + ')">'
    var i = 0;
    for (i in filtros) {
        if (filtros[i].NOMBRE_INTERNO) {
            row += '<option value="' + filtros[i].NOMBRE_INTERNO + '">' + filtros[i].NOMBRE_CAMPO + '</option>';
        }
    }
    jsonFilter.NOMBRE_INTERNO = filtros[0].NOMBRE_INTERNO;
    row += "</select>";
    row += "</td>";
    row += "<td>";
    row += "<select onchange='changeType(" + id + ")'>";
    var j = 0;
    var filtersType = filtros[0].TIPO_FILTRO;
    for (j in filtersType) {
        if (filtersType[j].TIPO){
            if(filtersType[j].TIPO !== "IGUAL")
             row += '<option value="' + filtersType[j].TIPO + '">' + filtersType[j].LABEL + '</option>';
            else
                row += '<option value="' + filtersType[j].TIPO + '" selected="true">' + filtersType[j].LABEL + '</option>';
        }
    }
    jsonFilter.Tipo = filtros[0].TIPO_FILTRO[0].TIPO;
    row += "</select>";
    row += "</td>";
    row += "<td>";
    row += '<input value=" " class="form-control filtersForm" onkeyup="changeTxtFilter(' + id + ',this)">';
    row += '<span onclick="addFilter()" class="glyphicon glyphicon-plus-sign pointer"></span><span onclick="deleteFilter(' + id + ')" class="glyphicon glyphicon-minus-sign pointer"></span>'
    row += "</td>";
    row += "</tr>"
    $("#FILTROSTABLE tbody").append(row);
    currentFilters.push(jsonFilter);

}

function deleteFilter(id) {
    //alert(id);
    var x = 0;
    for (x in currentFilters) {
        if (currentFilters[x].id == id) {
            currentFilters.splice(x, 1);
        }
    }
    console.log($($("[Filter='" + id + "']")['0']));
    $($("[Filter='" + id + "']")['0']).remove();
}

function setFilters() {
    
    setTimeout(function() {
        document.getElementById("GETFILTERS").innerText = JSON.stringify(currentFilters);
        setTimeout(function() {
            executeEvent("RUNSEARCH")

        }, 300)
    }, 100)

}

function changeType(index) {
    $("[Filter='" + index + "']").children("td").each(function(index2, td) {
        switch (index2) {
            case 0:

                /*Cuando onchange este se le envía el valor del atributo filter y $
                 hago el case 1 y case 3 sobre la tr del fitler con $($($("[Filter='" + atributo_filter + "']") en vez de index
                cuando agrego cuento le agrego filter=last+1 */
                break;
            case 1:
                // campo2 = $(this).text();

                var comboTipos = $($(td)['0'].children['0']);

                var x = 0;
                for (x in currentFilters) {
                    if (currentFilters[x].id == index) {
                        currentFilters[x].Tipo = comboTipos.val();
                    }
                }
                break;
            case 2:
                //campo3 = $(this).text();
                var txtFiltro = $($(td)['0'].children['0']);
                txtFiltro.val(" ");
                var x = 0;
                for (x in currentFilters) {
                    if (currentFilters[x].id == index) {
                        currentFilters[x].Texto = txtFiltro.val();
                    }
                }
                break;
        }
        //Crear onkeypress en txtfiltros es igual a este pero recoge  el textFIltro.val()
    })
}

function changeTxtFilter(index, txt) {
  //alert(txt.value);
    var x = 0;
    for (x in currentFilters) {
        if (currentFilters[x].id == index) {
            currentFilters[x].Texto = txt.value.trim();
            var hermanos = $(txt).siblings();
            //console.log($(hermanos[0]).attr("class"));
            if($(hermanos[0]).attr("class") === "promptdescriptionfilter"){
                setTimeout(function(){
                    //alert($(hermanos[0]).val());
                    currentFilters[x].promptdescription = $(hermanos[0]).val();
                },100);
                
                 //console.log($(hermanos[0].val()));
                 //
            }
            //console.log($(txt).siblings());
        }
    }
   // console.log(currentFilters);
}



function changeValue(campo, valor) {

    $("#" + campo).val(valor);
}

function changePageButton(value) {
    var combox = $($("#s2id_vCURRENTPAGE a")['0'].children['0']);
    combox.text(value);
}

function fillFilters() {
        //alert("fill");
        var filtros = JSON.parse($("#vFILTROS").val());
        //console.log(filtros);
        $("#FILTROSTABLE tbody tr").each(function(index) {
            var filterJson = {};
            filterJson.id = index;
            $(this).attr("Filter", index);
            $(this).children("td").each(function(index2, td) {
                switch (index2) {
                    case 0:
                        var comboFiltros = $($(td)['0'].children['0']);
                        comboFiltros.attr('onchange', 'getTypes(' + index + ')');
                        var comboHtml = "";
                        var i = 0;
                        for (i in filtros) {
                            if (filtros[i].NOMBRE_INTERNO)
                                comboHtml += '<option value="' + filtros[i].NOMBRE_INTERNO + '">' + filtros[i].NOMBRE_CAMPO + '</option>';
                        }

                        comboFiltros.html(comboHtml);
                        filterJson.NOMBRE_INTERNO = comboFiltros.val();
                        currentFilters.push(filterJson);
                        /*Cuando onchange este se le envía el valor del atributo filter y $
                         hago el case 1 y case 3 sobre la tr del fitler con $($($("[Filter='" + atributo_filter + "']") en vez de index
                        cuando agrego cuento le agrego filter=last+1 */
                        break;
                    case 2:
                        var txtFiltro = $($(td)['0'].children['0']);
                        txtFiltro.val();
                        //console.log($(td));
                        txtFiltro.attr("onkeyup", "changeTxtFilter(" + index + ",this)");
                        //row += '<span onclick="addFilter()" class="glyphicon glyphicon-plus-sign pointer"></span><span onclick="deleteFilter(' + id + ')" class="glyphicon glyphicon-minus-sign pointer"></span>'
                        $(td).append('<span onclick="addFilter()" class="glyphicon glyphicon-plus-sign pointer"></span><span onclick="deleteFilter(0)" class="glyphicon glyphicon-minus-sign pointer"></span>');
                        break;

                }
                //$(this).css("background-color", "#ECF8E0");
            })
  
        });
    }
    
  function openPrompt(Prompt,Map){
    //alert(Map);
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
    var PromptSrping = "grid_"+Prompt + ".htm?LASTQUERY=false&MSG=null&TIPOMSG=null&COMPORTAMIENTO=P&FILTROS=";
    if(filtros.length > 0)
        PromptSrping += btoa(JSON.stringify(filtros));//AGREGAR atob
    else
        PromptSrping += "null";
    //alert(PromptSrping);
    $("#PROMPTWINDOW").attr("src",PromptSrping);
    $( "#modalPrompt" ).dialog( "open" );
    
     $( "#modalPrompt" ).dialog({
       open: function( event, ui ) {
           
       }
});

}

function closePrompt(type){
    //alert(type);
    if(type ==="A"){
        var i = 0;
       try
       {
            rowSelected = JSON.parse($("#tempPrompt").html());
            //console.log(rowSelected,Mapeo);
            for(i in Mapeo){
                var MapObject = Mapeo[i];
                //console.log($("#"+MapObject.Mante),rowSelected[MapObject.Prompt]);
              if(MapObject.tipo === "V" ||MapObject.tipo === "D" ){ 
              $("#"+MapObject.Filter).val(rowSelected[MapObject.Prompt]).change();
              $("#"+MapObject.Filter).attr("value",rowSelected[MapObject.Prompt]);
              
              }else if(MapObject.tipo === "H"){
                $("#"+MapObject.Mante).val("");
              }
            }
       }catch(Exception){
           //console.log(Exception.name + ': ' + Exception.message);
           alertify.alert('Advertencia','Debe escoger un registro de la lista');
           return;
       }finally {
           $("#tempPrompt").html();
        }
        
    }
    $( "#modalPrompt" ).dialog( "close" );
}

$(document).ready(function() {
    //toggle reactivar x aquello
   // $("#FILTROS").toggle();

    $(".gridBrowser").tablesorter();

    $("#showFilters").click(function(event) {
        event.preventDefault();
        $("#FILTROS").toggle();
    });

    $("#doSearch").click(function(event) {
        event.preventDefault();

    });

    $("#addNew").click(function(event) {
        event.preventDefault();

    });
   
    


    
    if ($("#vCURRENTPAGE").length > 0)
        $("#vCURRENTPAGE").select2();

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
   
   /*MANEJA ENTER DE LOS FILTROS*/
   $("body").keypress(function(e){
        var keyCode = e.keyCode || e.which; 
        //alert(keyCode);

        if (keyCode === 13 ) { 
          e.preventDefault(); //> input[type='button']
          var btnDoSearch =  $($("#FILTROS >> input[type='button']")[0]);
          var exeBuscar = btnDoSearch.attr('onclick');
          eval(exeBuscar);
          //console.log(btnDoSearch);
          //alert();
        }
   });

  //Arranca la app
  if(currentFilters.length === 0){
    fillFilters();
    getTypes(0);
  }else if($("#filtrosParam").val() !== undefined && ($("#filtrosParam").val() !== "" && $("#filtrosParam").val() !== "null")){
      fillFilters();
      getTypes(0);
  }
    
});


