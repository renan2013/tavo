


function download(datosCms,datosBD,view){
    var url = "downloadFile.htm";
    $.ajax({
        type: "POST",
        url: url,
        data: {DATOSCMS :datosCms,DATOSCMSBD :datosBD },
        timeout: 100000,
        'beforeSend': function(xhr) {
            xhr.overrideMimeType('text/html; charset=iso-8859-1');

        },
        success: function(data) {
            var success;
            try
            {

               // console.log("DOWNLOAD: ", data);
                
               
                if(view === "visor")
                    loadVisor(data);
                
                if(view === "markup")
                    loadMarkup(data);
                
                if(view === "image")
                 loadImg(data);
                $.unblockUI();
               


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

function loadVisor(data){
    $("#titulo").text($(data).find("DESCRIPCIONARCHIVO").text());
    $("#imgedit").attr("src","resources/temp/"+$(data).find("NuevoNombre").text());
    if($(data).find("REFERENCIA_PERSONALIZADA").text() !== "0"){
       $("#images").css("display","");
       $("#perso").val($(data).find("REFERENCIA_PERSONALIZADA").text());
    }

   var user = doGetSessionValue("UserJson");
   //alert(user);
   if(user !== "" && user !== undefined && user !== null){
       var link = $("#pencil").attr("onclick");


       link = link.replace("REPLACEPER",$(data).find("REFERENCIA_PERSONALIZADA").text());
       link = link.replace("REPLACEIMG","resources/temp/"+$(data).find("NuevoNombre").text());
       /*link = link.replace("REPLACECMS",datosCms);
       link = link.replace("REPLACEBD",datosBD);*/

       $("#pencil").attr("onclick",link);

         

   }
}

function loadMarkup(data){
    $("#editImage").attr("src","resources/temp/"+$(data).find("NuevoNombre").text());
    $(document).ready(function(){
       setTimeout(function(){  $('.img-container img').imageMarkup({ color: 'red', width: 4, opacity: .5 });
           //console.log("markup",global);
        markup();
       },10);
    });
    
}

function loadImg(data){
    $("#titulo").text($(data).find("DESCRIPCIONARCHIVO").text());
    $("#imge").attr("src","resources/temp/"+$(data).find("NuevoNombre").text());
    
}

function print() {
    //var newWin = window.frames["printf"];
   var win = window.open("about:blank","_blank");
   win.document.title = "Imprimir Imagen";
   win.document.write('<html><head><title>'+$("#titulo").text()+'</title></head><body onload="window.print()"><img src="'+$("#imgedit").attr("src")+'"></body></html>');
  win.document.close();

                
}
        
function sendEmail(){
    var myUrl = window.location.href.replace("&DATOSCMSBD=","DATOSCMSBD=");
    var myUrl = myUrl.replace("visorImagenes","visorImagenes1");
    window.location.href = "mailto:someone@example.com?Subject=Revisa%20esta%20imagen%20por%20favor&body=Crear%20Hipervinculo%20de:\n"+myUrl;
}

function verPersonalizada(DATOSCMS,DATOSBD){
    //alert();
    var personalizada = $("#perso").val();
    window.location.href = 'verPersonalizada.htm?DATOSCMS='+DATOSCMS+'&DATOSCMSBD='+DATOSBD+'&personalizada='+personalizada;
}

