function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
};

function fixAlertify(){
    $("#cont_btn_help",window.parent.document).css("display","none"); setTimeout(function(){$("#cont_btn_help",window.parent.document).css("display","block");},500)
}

function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

function getCookie(cname) {
   return $.cookie(cname);
    /*var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";*/
}

function removeCdata(str){
    /*str = str.replace("<![CDATA[",""); 
    str = str.replace("]]>","");*/
    
    str = str.replace("<![CDATA","");
    str = str.replace("]>","");
    
     str = str.replace("[[","");
    
     str = str.replace("]]","");
    
    return str;
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function setLocalStorage(name,value){
    //localStorage.setItem(btoa(name),btoa(value));
    sessionStorage.setItem(btoa(name),btoa(value));
    //localStorage.setItem(name,value);
}



function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function getLocalStorage(name){
   /* var value = localStorage.getItem(btoa(name));
    //alert(value);
    if(!value || value === null){
        console.log("if",value);
        return value;
    }
   return atob(localStorage.getItem(btoa(name)));*/
    //var value = localStorage.getItem(btoa(name));
    var value = sessionStorage.getItem(btoa(name));
    
    if(value === null)
        return null;
    else 
    return atob(value);
}

function deleteCookie(cname){
    document.cookie=cname+"=;expires=Wed; 01 Jan 1970";
}

function deleteLocalStorage(name){
    //localStorage.removeItem(btoa(name));
    //localStorage.removeItem(btoa(name));
    sessionStorage.removeItem(btoa(name));
}

function clearStorage(){
   /* for (x=0; x<=localStorage.length-1; x++)  { 
         clave = localStorage.key(x); 
         if(clave !== btoa("lastPath"))
           deleteLocalStorage(clave);
    }
    var lastPath = getLocalStorage(btoa("lastPath"));
    localStorage.clear();
    setLocalStorage(btoa("lastPath"),btoa(lastPath));*/
    for (x=0; x<=sessionStorage.length-1; x++)  { 
         clave = sessionStorage.key(x); 
         if(clave !== btoa("lastPath"))
           deleteLocalStorage(clave);
    }
    var lastPath = getLocalStorage(btoa("lastPath"));
    sessionStorage.clear();
    setLocalStorage(btoa("lastPath"),btoa(lastPath));
    
}


function getParentData(id, variable) {

    $(document).ready(function() {

        eval(variable + '=$("#' + id + '", parent.document).val()');
        //alert(parentID);
    });
}

function getValue(id) {

}

function setParentData(id) {

}

function setValue(id, value) {
    $("#" + id).val(value);
    //alert('set');
}

function setText(id, text) {


    $(document).ready(function() {
        var identificacion = "#" + id;

        //$(identificacion).text(text);
        $(identificacion).html(text);
    });

}

function setValue(id, text) {
    $(document).ready(function() {
        $("#" + id).val(text);
    });
}

function postEjecutarMD(text) {

    $("#resultMD", parent.document).val(text);
    parent.$('#resultMD').trigger('change');

    //$("#resultMD", parent.document).trigger("change");
}



function msgJs() {
    $("#HEADER_MANTE").css("position", "inherit");
    $("#ACCION1").html("<p>Registro eliminado correctamente</p>");

    $.blockUI({
        message: $('#ALERTACCION'),
        css: {
            'background-color': 'rgb(170, 170, 170)',
            'width': '99%',
            'left': '0%',
            'top': '20%'
        }
    });
}




function systemMsg(msg, tipo, pexecutePost) {
    $(document).ready(function() {
        //alert(pexecutePost);
        //var executePost = JSON.parse(executePost);
        var msg1 = "";
        msg1 = "<div style='float:right; color:white;cursor:pointer'><p style='color:white' onclick='confirmButton(false,null)'>(X) Cerrar</p></div>"
        if (tipo == "success")
            msg1 += "<div class='alert alert-success'>";
        if (tipo == "danger")
            msg1 += "<div class='alert alert-danger'>";
        if (tipo == "warning")
            msg1 += "<div class='alert alert-warning'>";
        if (tipo == "confirm")
            msg1 += "<div class='alert' style='color:white; background-color: #009886;'>";

        msg1 += "<div class='row'>" + msg + "</div>";
        if (tipo == "confirm") {
            msg1 += '<div class="col-md-4"><button class="btn btn-success" onclick="confirmButton(true,\'' + pexecutePost + '\' )">Aceptar</button></div> <div class="col-md-4"></div>';
            msg1 += '<div class="col-md-4"><button class="btn btn-danger" onclick="confirmButton(false,\'' + pexecutePost + '\')">Cancelar</button></div>'
        }
        msg1 += "</div>";
        $.blockUI({
            message: msg1,
            css: {
                'background-color': 'white',
                'width': '99%',
                'left': '0%',
                'top': '20%'
            }
        });


    });
}

function confirmButton(confirm, executePost) {
    //alert(executePost);
    if (confirm) {
        $.unblockUI();
        executeGenexusEvent(executePost);

    } else
        $.unblockUI();

}


function doGetSessionValue(paramName,Mode) {

    var retorno;
    var url = "getSessionValue.htm";
    if(Mode != undefined && Mode == "BPM")
        url = "../../"+url;
    var data = {
        parametro : paramName
    };
    $.ajax({
        type: "POST",
        url: url,
        dataType: "text",
        data: data,
        cache: false,
        async: false,
        'beforeSend': function(xhr) {
            xhr.overrideMimeType('text/html; charset=iso-8859-1');

        },
        success: function(data) {
            retorno = data;

            xmlPeticioncf = data;

        },
        error: function(xhr, ajaxOptions, thrownError) {
            alert(xhr.status);
            alert(thrownError);
        }
    });
    
   
    return retorno;

}

function setSessionValue(paramName,value,Mode) {

    var retorno;
    var url = 'setSessionValue.htm';
    if(Mode != undefined && Mode == "BPM")
        url = "../../"+url;
    var data = {
        parametro : paramName,
        valor:value
    };
    $.ajax({
        type: "POST",
        url: url,
        dataType: "text",
        data: data,
        cache: false,
        async: false,
        'beforeSend': function(xhr) {
            xhr.overrideMimeType('text/html; charset=iso-8859-1');

        },
        success: function(data) {
            retorno = data;

            xmlPeticioncf = data;

        },
        error: function(xhr, ajaxOptions, thrownError) {
            alert(xhr.status);
            alert(thrownError);
        }
    });
    
   
    return retorno;

}

function callProcedure(post,pOWNER,pObjectName,pMETODO,Mapeo){
    $("#msg").css("display","none");
    var datosForm = [];
    var i = 0;
    console.log(Mapeo);
    for(i in Mapeo){
        var object = Mapeo[i];
        Value = $("#"+object.FORM).val();
        if(Value === null || Value === "" ||Value === "0" ){
           alertify.alert('Advertencia', object.Label+' es requerido para ejecutar el procedimiento');
           return;
         }
        filter = {"id": -1,"NOMBRE_INTERNO":object.NOMBRE_INTERNO,"Tipo":"IGUAL","Texto":Value};
        
        datosForm.push(filter);
    }
    $.ajax({
			
        type : "POST",
         /*headers: { 
             'Accept': 'application/json',
             'Content-Type': 'application/json' 
         },*/
         //dataType: "text",
         url : post,
         data : {OWNER : pOWNER,OBJECTNAME:pObjectName,METODO:pMETODO,filtros:JSON.stringify(datosForm)},
         timeout : 100000,
         success : function(data) {
             var success;
                try
                {
                 console.log("SUCCESS: ", data);
                 success = data;
                 if(success.indexOf('Error:') !== -1 || success.indexOf('Error de bd:') !== -1){
                      throw new UserException(success);
                 }
                 if(success === "0"){
                     alertify.alert("Notificacion","Procedimiento ejecutado con exito");
                 }else{
                     $("#msg").toggle();
                     $("#msg").html("Error grid en dsoa:<p class='ErrorMsg glyphicon glyphicon-warning-sign'>"+success+"</p>");
                 }
              }catch(Exception){
                  $("#msg").toggle();
                  $("#msg").html("Error grid en dsoa:<p class='ErrorMsg glyphicon glyphicon-warning-sign'>"+success+"</p>");
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

function executeGenericQuery(query,param){
    var success;
    $.ajax({
	            
                type : "POST",
                 url : "executeQuery.htm",
                 data : {PV_QUERY : query,VALUES:JSON.stringify(param)},
                 timeout : 100000,
                                             'beforeSend' : function(xhr) {
                    xhr.overrideMimeType('text/html; charset=iso-8859-1');
                    //xhr.overrideMimeType('text/html;charset=utf-8');
                    },
                 async: false,         
                 success : function(data) {
                     
                        try
                        {
                         success = data;
                         

                      }catch(Exception){
                          console.log("Error Javascript:"+Exception.message,"stack:",Exception.stack);
                          /*$("#msg").css("display","block");
                          $("#msg").html("Error en petición en dsoa:<p class='ErrorMsg glyphicon glyphicon-warning-sign'>"+data+"</p>");*/
                      }
                        /* console.log("grid:"+data);
                         display(data);*/
                 },
                 error : function(e) {
                         console.log("ERROR en ajax: ", e.message,"stack:",e.stack);
                         //display(e);
                         /*$("#msg").html("Error ajax:  <p class='ErrorMsg glyphicon glyphicon-warning-sign'>StatusError:"+e.status+"<br>StatusText:"+e.statusText
                          +e.responseText+"</p>");*/
                 },
                 done : function(e) {
                         console.log("DONE");
                         enableSearchButton(true);
                 }
           });
           
           return success;
}


function executeGenericRest(restfull,params){ 
    // $.blockUI({ message: '<h1><img src="resources/dbpmsAJS/assets/images/wait.gif" />Cargando' });
    
    var success;
    var sendData = {};
    if(params !== undefined && Array.isArray(params)){
        $(params).each(function(index,value){
          if(!isNaN(value.VALOR))
            sendData[value.NOMBRE] = value.VALOR;
         else
             sendData[value.NOMBRE] = '"'+value.VALOR+'"';
         
        });
    }
    //var r1 = "ajaxSearchSistemas.htm";
    
    $.ajax({
	            
                type : "POST",
                 url : restfull,
                 data : sendData,
                 timeout : 100000,
                                             'beforeSend' : function(xhr) {
                    xhr.overrideMimeType('text/html; charset=iso-8859-1');
                    //xhr.overrideMimeType('text/html;charset=utf-8');
                    },
                 async: false,         
                 success : function(data) {
                     
                        try
                        {
                         success = data;
                         

                      }catch(Exception){
                          console.log("Error Javascript:"+Exception.message,"stack:",Exception.stack);
                          /*$("#msg").css("display","block");
                          $("#msg").html("Error en petición en dsoa:<p class='ErrorMsg glyphicon glyphicon-warning-sign'>"+data+"</p>");*/
                      }
                        /* console.log("grid:"+data);
                         display(data);*/
                 },
                 error : function(e) {
                         console.log("ERROR en ajax: ", e.message,"stack:",e.stack);
                         //display(e);
                         /*$("#msg").html("Error ajax:  <p class='ErrorMsg glyphicon glyphicon-warning-sign'>StatusError:"+e.status+"<br>StatusText:"+e.statusText
                          +e.responseText+"</p>");*/
                 },
                 done : function(e) {
                         $.unblockUI();
                         console.log("DONE");
                         enableSearchButton(true);
                 }
           });
           
           return success;
}

function serializeForm(form){
    var serialize = [];
    var formElems = form.find("input,select,textarea").not(':input[type=button], :input[type=submit], :input[type=reset]');
    formElems.each(function(index,el){
            var tipo = "varchar";
            var value = $(el).val();
            var parts = value.split("/");
            if(parts.length === 3){
              var d = new Date(parts[2],parts[1] - 1,parts[0]);
              if(d !== "Invalid Date")
                  tipo = "date";
            }
            
            if(tipo !== "date" && !isNaN(value)){
                tipo = "numeric";
            }
            serialize.push({
                      "id":index,
                      "item":$(el).attr("id"),
                      "value":$(el).val(),
                      "tipo" : tipo
             });
        });
     return serialize;
}

function jsonToXml(tag,json){
   
    
    var xml = "";
   if(json !== undefined && json !== null ) 
      xml += "<"+tag+">\n ";

 for (var key in json) {
    
     //console.log(key,isJson(json[key]));
    if (json.hasOwnProperty(key) && !(typeof json[key] === 'object')) {
        try{  
            //console.log(key,json[key],isEmpty(json[key]));
          if(key !== "$$hashKey"){  
            if(!isEmpty(json[key]))  
             xml+= "  <"+key+">"+json[key]+"</"+key+">\n ";
           else
               xml+= "  <"+key+"/>\n";
         }
       }catch(Exception){
           //console.log("catch",key);
        xml+= "  <"+key+">"+json[key]+"</"+key+">\n ";
        }
    }else if(json.hasOwnProperty(key) && (typeof json[key] === 'object' &&(typeof json[key] !== null && typeof json[key] !== undefined )) && !Array.isArray(json[key]) ){
        
        xml+=jsonToXml(key,json[key]);
        
    }else if(json.hasOwnProperty(key) && Array.isArray(json[key])  ){
       // alert("array");
        //console.log("keyarray",key);
        xml+= " <"+key+">\n";
           
           var array = json[key];
           //console.log("array",array);
          $(array).each(function(index,el){
             /* console.log("row11111111",el);  
               xml+= "   <ROW>";
                for (var key in el){
                   console.log("child",el);
                   if(el.hasOwnProperty(key))
                    xml+="    "+jsonToXml(key,el[key])+"\n";
               
                 }
               xml+= "   </ROW>\n";*/
              xml+="      "+jsonToXml("ROW",el)+"\n";
           });
           
           
        xml+=" </"+key+">\n";
    }
 }
 if(json !== undefined && json !== null ) 
  xml += "</"+tag+">\n ";
 else
     xml += "<"+tag+"/>\n ";
 return xml;
}

function xmlToJson(type,key,xml){
   /* if(key == 'INV_SALIDAS_DETA'){
        console.log();
    }
    */
    var nodes = $(xml);
    
       
    var strJson ="";
    
        
    if(!isEmpty(key))
        strJson += '"'+key+'":';
    
     /*if(nodes.length === 0){
         strJson += '""';
         return strJson;
     }*/
       
    
    if(type === "json")
        strJson +="{\n";
    else if(type === "array")
        strJson +="[\n";
   
    var children = nodes.children();
    //console.log("children",children);
    //console.log("xml",xml);
    if(children.length > 0){
        $(children).each(function(index,el){
          //console.log("Mihijo",$(el));
            if(index > 0)
                strJson += ",";
            
            if($(el).children().length > 0){
                //console.log("hijos",el.nodeName,"<"+el.nodeName+">"+$(el).html()+"</"+el.nodeName+">");
               strJson += xmlToJson("json",el.nodeName,"<"+el.nodeName+">"+$(el).html()+"</"+el.nodeName+">");
               //$()
            }else{
                //console.log("NOhijos",key,el.nodeName,el.nodeName,el.innerHTML);
                strJson += xmlToJson("attribute",el.nodeName,el.innerHTML);
            }
        });
        //strJson += xmlToJson();
    }else{
        if(xml.charAt(0) === "0" && (xml.length > 1 && !isNaN(xml.charAt(1))) || isNaN(xml))
            strJson += '"'+xml+'"';
        else{
            if(!isEmpty(xml))
              strJson += xml;
            else
               strJson += '""'; 
        }
        
    }
    
    if(type === "json")
        strJson +="}";
    else if(type === "array")
        strJson +="]";
    
    return strJson;   
 }

function callExternalProcedure(Tipo,Form){
    
        var serialize = serializeForm($("form"));
        var url = Form+".htm?FormParent="+btoa(JSON.stringify(serialize)); 
        if(Tipo === "BM"){
            $("#PROMPTWINDOW").attr("src",url);
            $(".ui-dialog-buttonpane :input[type=button]").css("display","none");
            $( "#modalPrompt" ).dialog( "open" );
            return;
        }
        
        if(Tipo === "BI"){
            if($("#iframe"+Form).length > 0)
                $("#iframe"+Form).remove();
            $("body").append("<iframe id='iframe"+Form+"'></iframe>");
            $("#iframe"+Form).attr("src",url);
            
            return;
        }
        
        
        if(Tipo === "BB"){
            window.open(url,"_blank");
            return;
        }
}

function getDatatype(Value){
     var tipo = "varchar";
            var parts = Value.split("/");
            if(parts.length === 3){
              var d = new Date(parts[2],parts[1] - 1,parts[0]);
              if(d !== "Invalid Date")
                  tipo = "date";
            }
            
            if(tipo !== "date" && !isNaN(Value)){
                if(Value.indexOf(".") === -1)
                tipo = "number";
                else
                   tipo = "decimal";
            }
            
            return tipo;
}

function setSatelite(PV_COD_ITEM, PV_VAL,PTIPO,BPM) {
              if(isSessionActive(true) === 0 && BPM)
                  window.location.href = "../../loginParent.htm";
                request = {
                    PV_COD_ITEM: PV_COD_ITEM,
                    SINCRONIZO:"0"        
                };
                var tipo;
                if(!PTIPO)
                 tipo = getDatatype(PV_VAL);
                else
                    tipo = PTIPO;
              
                if(tipo === "varchar")
                  request["SATCAMPOVALORC"] = PV_VAL;
                if(tipo === "date")
                  request["SATCAMPOVALORD"] = PV_VAL;
                if(tipo === "decimal")
                  request["SATCAMPOVALORN"] = PV_VAL;
                if(tipo === "number")
                  request["SATCAMPOVALORE"] = PV_VAL;
              var url = "SOASETVALSATELITEAJAX.htm";
              
              if(BPM){
                  url = "../../"+url;
              }
              //alert(url);
                $.ajax({
                    type: "POST",
                    url: url/*"SOASETVALSATELITEAJAX.htm"*/,
                    data: request,
                    timeout: 100000,
                    async: false,
                    'beforeSend': function(xhr) {
                        xhr.overrideMimeType('text/html; charset=iso-8859-1');

                    },
                    success: function(data) {
                        var success;
                        try
                        {


                            //console.log("SUCCESS: ", data.trim());

                            if(data.trim() !== 'true')
                                alert("error agregando a satelite:"+data.trim());
                            
                            $("#loader").css("display", "none");

                        } catch (Exception) {
                            console.log("Error Javascript:" + Exception.message, "stack:", Exception.stack);
                            $("#msg").css("display", "block");
                            $("#msg").html("Error en petición en dsoa:<p class='ErrorMsg glyphicon glyphicon-warning-sign'>" + data + "</p>");
                        }
                        /* console.log("grid:"+data);
                         display(data);*/
                    },
                    error: function(e) {
                        console.log("ERROR: ", e);
                        //display(e);
                        $("#msg").html("Error ajax:  <p class='ErrorMsg glyphicon glyphicon-warning-sign'>StatusError:" + e.status + "<br>StatusText:" + e.statusText
                                + e.responseText + "</p>");
                    },
                    done: function(e) {
                        console.log("DONE");
                        enableSearchButton(true);
                    }
                });

}

function sateliteSincroUpload(BPM){
    var url = "SATSINCROUPLOAD.htm";
    if(BPM)
     url = "../../" + url;
    $.ajax({
                    type: "POST",
                    url: url/*"SOASETVALSATELITEAJAX.htm"*/,
                    data: request,
                    timeout: 100000,
                    'beforeSend': function(xhr) {
                        xhr.overrideMimeType('text/html; charset=iso-8859-1');

                    },
                    success: function(data) {
                        var success;
                        try
                        {
                            
                            console.log("SUCCESS: ", data.trim());
                            
                           if($(data.trim()).find("GN_COD").text() !== "0"){
                               alert("Error sincornizando satelite:"+$(data.trim()).find("GN_ERROR").text());
                           }


                        } catch (Exception) {
                            console.log("Error Javascript:" + Exception.message, "stack:", Exception.stack);
                            $("#msg").css("display", "block");
                            $("#msg").html("Error en petición en dsoa:<p class='ErrorMsg glyphicon glyphicon-warning-sign'>" + data + "</p>");
                        }
                        /* console.log("grid:"+data);
                         display(data);*/
                    },
                    error: function(e) {
                        console.log("ERROR: ", e);
                        //display(e);
                        $("#msg").html("Error ajax:  <p class='ErrorMsg glyphicon glyphicon-warning-sign'>StatusError:" + e.status + "<br>StatusText:" + e.statusText
                                + e.responseText + "</p>");
                    },
                    done: function(e) {
                        console.log("DONE");
                        enableSearchButton(true);
                    }
                });
}

function getSatelite(PV_COD_ITEM,Tipo,BPM) {
            if(isSessionActive(true) === 0 && BPM)
                  window.location.href = "../../loginParent.htm";
           url = "CALLSOAGETVALCAJAX.htm";  
         if(BPM){
                  url = "../../"+url;
              }
                var success;
                $.ajax({
                    type: "POST",
                    url: url,
                    data: { PV_COD_ITEM: PV_COD_ITEM,TIPO:Tipo},
                    timeout: 100000,
                    'beforeSend': function(xhr) {
                        xhr.overrideMimeType('text/html; charset=iso-8859-1');

                    },
                    async: false,
                    success: function(data) {
                        
                        try
                        {


                            success = data;


                            $("#loader").css("display", "none");

                        } catch (Exception) {
                            console.log("Error Javascript:" + Exception.message, "stack:", Exception.stack);
                            $("#msg").css("display", "block");
                            $("#msg").html("Error en petición en dsoa:<p class='ErrorMsg glyphicon glyphicon-warning-sign'>" + data + "</p>");
                        }
                        /* console.log("grid:"+data);
                         display(data);*/
                    },
                    error: function(e) {
                        console.log("ERROR: ", e);
                        //display(e);
                        $("#msg").html("Error ajax:  <p class='ErrorMsg glyphicon glyphicon-warning-sign'>StatusError:" + e.status + "<br>StatusText:" + e.statusText
                                + e.responseText + "</p>");
                    },
                    done: function(e) {
                        console.log("DONE");
                        enableSearchButton(true);
                    }
                });
     
               alert(success);
  if(success !== null && success !== "")
   return success;
  return "No data en satelite";
}

function isEmpty(str){
   // console.log(str);
    if(str === null)
        return true;
    if(str === undefined)
        return true;
    if(str === "")
        return true;
    if(str.trim() === "")
        return true;
  return false;
}

function isSessionActive(BPM){
      var url = "checkSession.htm";
      if(BPM)
          url = "../../"+url;
          var status;
                $.ajax({
                    type: "POST",
                    url: url,
                    timeout: 100000,
                    'beforeSend': function(xhr) {
                        xhr.overrideMimeType('text/html; charset=iso-8859-1');

                    },
                    async: false,
                    success: function(data) {
                        
                        try
                        {


                            status = data;


                            $("#loader").css("display", "none");

                        } catch (Exception) {
                            console.log("Error Javascript:" + Exception.message, "stack:", Exception.stack);
                            $("#msg").css("display", "block");
                            $("#msg").html("Error en petición en dsoa:<p class='ErrorMsg glyphicon glyphicon-warning-sign'>" + data + "</p>");
                        }
                        /* console.log("grid:"+data);
                         display(data);*/
                    },
                    error: function(e) {
                        //console.log("ERROR: ", e);
                        //display(e);
                        $("#msg").html("Error ajax:  <p class='ErrorMsg glyphicon glyphicon-warning-sign'>StatusError:" + e.status + "<br>StatusText:" + e.statusText
                                + e.responseText + "</p>");
                    },
                    done: function(e) {
                        //console.log("DONE");
                        //enableSearchButton(true);
                    }
                });
                
                if(status === "LoginRequired")
                    return 0;
                else if(status === "Log")
                    return 1;
}




function paginacion(pagina,regXpage,arrayData,buildPages){
    var response = {};
   
    if(buildPages){
        var pages = 0;
        response.pages = [];
        if(arrayData.length % regXpage === 0)
            pages = arrayData.length / regXpage;
        else
            pages = parseInt(arrayData.length / regXpage) + 1;
        
        for(i = 1; i <= pages; i++){
            response.pages.push(i);
        }
        
    }
    
    response.page = pagina;
      var start = (pagina - 1) * regXpage;
      var end = pagina * regXpage;
      
      if(end > arrayData.length)
        response.data = arrayData.slice(start);
      else
          response.data = arrayData.slice(start,end);
        return response;
}

