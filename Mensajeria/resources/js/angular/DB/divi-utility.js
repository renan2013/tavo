var xmlPeticioncf;
var xmlDoccf;
var extension = "";
var rutaservlet= '../servlet/com.dbpmweb.';  
 

 function getQUERYGENERAL(parametros,parametrosOUT)
{
  if (rutaservlet>"")  
     var urlServer = rutaservlet+'apajax_consultasdin'; // llama a ejecutar consultas dinamicas
  else
    var urlServer ='aajax_consultasdin'; // llama a ejecutar consultas dinamicas  
  
  var retorno;
  var data= {PARAMETROS:parametros,PARAMETROSOUT:parametrosOUT};
 
  $.ajax({
		type: "POST",
	 	url: urlServer,
		dataType: "xml",
		data: data,
	 	cache: false,
	 	async: false,
                'beforeSend' : function(xhr) {
xhr.overrideMimeType('text/html; charset=iso-8859-1');
 
},
	 	success: function(data) {
	 	  retorno=data; 
                 
                  xmlPeticioncf=data;
                   
                   
       
		}
      }); 
      return retorno; 
}

function getQUERYGENERALJ(header,parametros)
{
  if (rutaservlet>"")  
     var urlServer = rutaservlet+'apajax_consultadinjson'; // llama a ejecutar consultas dinamicas
  else
    var urlServer ='apajax_consultadinjson'; // llama a ejecutar consultas dinamicas  
  
  var retorno;
  if (parametros>"")
    //alert( parametros);
  var data= {REQUEST:header,PARAMETROS:parametros};
 
  $.ajax({
		type: "POST",
	 	url: urlServer,
		dataType: "xml",
		data: data,
	 	cache: false,
	 	async: false,
                'beforeSend' : function(xhr) {
xhr.overrideMimeType('text/html; charset=iso-8859-1');
 
},
	 	success: function(data) {
	 	  retorno=data; 
                 
                  xmlPeticioncf=data;
                
		},
      error: function (xhr, ajaxOptions, thrownError) {
        alert(xhr.status);
        alert(thrownError);
      }
      }); 
      return retorno; 
}
 
function AJAX_GETVALUE(variable,adicionalUrl)
{
 if (adicionalUrl=="" ||adicionalUrl==null)
    var urlServer = 'aajax_getvalue'; // llama a ejecutar consultas dinamicas
  else
    var urlServer = adicionalUrl+'aajax_getvalue'; // llama a ejecutar consultas dinamicas      
  
  
  var retorno;
  var data= {divivalmen:variable};
  $.ajax({
		type: "POST",
	 	url: urlServer,
		dataType: "xml",
		data: data,
	 	cache: false,
	 	async: false,
                 error: function(objeto, quepaso, otroobj){
      			 AJAX_GETVALUE(variable,"../servlet/")
                     },
	 	success: function(data) {
	 	  retorno=data; 
                  xmlPeticioncf=data;
                 if  ( $("ALERT_CODE", data).text()=="2001")
                        window.location = 'hlogout'
                  
		}
      }); 
      return retorno; 
}
 

 
 function getCaso()
 {
     var jsonStr = ' {"dml":"E","objectId":"808","cantParametros":"0","parametros": []} ';
     
    getQUERYGENERALJ(jsonStr,'[]' );
   
    var ok = $("success", xmlPeticioncf).text();
    if (ok=="S")
       return  $("PN_CASO",$("SDT808" , $("datos", xmlPeticioncf))).text();
    else
       return "error";
    
 }
 function getAnnosFechas(yyyy,mm)
 {
   var nown = new Date();
   var mmn = nown.getMonth();
   var yyyyn = nown.getFullYear();
   
    
    var annos=parseInt(yyyyn)-parseInt(yyyy);
    
   if(parseInt(mmn)<parseInt(mm))
        annos-=1;
   
   return annos;
 }
 
  
 
 function buscaEnPadron(tipo_id,id){
        parametrosBitacora = '<DATA><PARAMETROS  DML="E" OBJECTID="814"  PARAMETROS="7">';
        parametrosBitacora += '<PARAM MEM="N" NAME="PN_CODIGO_EMPRESA">1</PARAM>' ; // parametro accion
        parametrosBitacora += '<PARAM MEM="N" NAME="PN_CODIGO_TIPO_IDENTIFICACION">'+ tipo_id+'</PARAM>' ; // parametro accion
        parametrosBitacora += '<PARAM MEM="N" NAME="PV_NUMERO_IDENTIFICACION">'+ id+'</PARAM>' ; // parametro accion
        parametrosBitacora += '<PARAM MEM="N" NAME="PV_FORMATO"></PARAM>' ; // parametro accion
        parametrosBitacora += '<PARAM MEM="N" NAME="PV_TIPO_DOCUMENTO">N</PARAM>' ;   
        parametrosBitacora += '<PARAM MEM="N" NAME="PV_TIPO_VERIF_ID">1</PARAM>' ; // parametro accion
        parametrosBitacora += '<PARAM MEM="N" NAME="PV_PERSONA_NATURAL">S</PARAM>' ; // parametro accion
        parametrosBitacora +='</PARAMETROS></DATA>';
       
      // console.log(parametrosBitacora);
        //alert("busca padron"+parametrosBitacora);
        
       getQUERYGENERAL(parametrosBitacora,"");
      
 
}
function getFechaHoy()
{
    
    var today=new Date();
 var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();

if(dd<10) {
    dd='0'+dd
} 

if(mm<10) {
    mm='0'+mm
} 

today = dd+'-'+mm+'-'+yyyy;
return today;
}


 /*
 * 
 NUMERO_IDENTIFICACION
106030133
703570682
703570683
703570684
703570685
703570686
703570687
703570688
703570689
703570690
703570691
703570692
703570693
703570694
703570695
703570696
703570697
703570698
703570699
703570700
703570701
703570702
703570703
703570704
703570705
703570706
703570707
703570708
703570709
703570710
703570711
703570712
703570713
703570714
703570715
703570716
703570717
703570718
703570719
703570720
703570721
703570722
703570723
703570724
703570725
703570726
703570727
703570728
703570729

  */

                   