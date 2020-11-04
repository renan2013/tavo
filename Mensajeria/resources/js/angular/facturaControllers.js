app.controller('facturaController', function($scope, orderByFilter, $timeout,$filter,User,
formValidator,$timeout,$interval,$http) {
   //alert(isMobileDevice());
    $scope.isMobile = isMobileDevice();
    $scope.Emisor = User.getEmisor();
      
     //console.log($scope.Emisor);
     $scope.Excento = false;
     $scope.guardado = false;
     $scope.keyFirma = undefined;
     $scope.doFirma = false;
     $scope.base64PdfBD;
     $scope.Unidades;
     var allCantones;
     $scope.Cantones;
     var allDistritos;
     var allUbicaciones;
     $scope.Distritos;
     $scope.userInteract = true;
     $scope.omitRecpetor = false;
     $scope.impIncluido = false;
     $scope.Data = {};
     var tempData;
     
     //SI ES ROL IMP INCLUIDO
     if(User.getUser().ROLES.indexOf(4) !== -1 )
         $scope.impIncluido = true;
     
     $scope.Roles = User.getUser().ROLES;
     var ua = navigator.userAgent.toLowerCase(); 
     $scope.isSafari = false;
     if(ua.indexOf("safari") !== -1 )
         $scope.isSafari = true;
     
     //QUITA LOS GUIONES DE LOS INPUTS QUE NO DEBEN LLEVAR
     $scope.quitarGuiones = function(input){
         var value = eval("$scope."+input).toString();
         var valueCorrecto = "";
          for (var i = 0; i < value.length; i++) {
             try{
                 valueCorrecto += parseInt(value.charAt(i)).toString();
             }catch(Ex){valueCorrecto +="";}
         }
         var number = parseInt(valueCorrecto);
         //console.log(number);
         eval("$scope."+input+"="+number);
     }
     
    //VERIFICA FORMATO CORRECTO DE NÚMEROS DE TELÉFONO
     $scope.validaTelefono = function(input,id){
         var value = eval("$scope."+input).toString();
         //alert(value.length);
         if(value.length !== 8 && value !== "NaN"){
          $("#"+id).addClass("errorSimple");
          var label = $($("#"+id).parent().children("p")); 
          if(label.find("any").length > 0)
                    label.find("any").remove();

           label.append("<any style='color:red'>El teléfono debe tener 8 números</any>");
         }else{
             $("#"+id).removeClass("errorSimple");
              var label = $($("#"+id).parent().children("p")); 
                if(label.find("any").length > 0)
                          label.find("any").remove();

         }
     }
     
     //ELIMINA MSG DE ERROR AL DIGITAR
     $scope.removeErrorMsg = function(id){
         var label = $($("#"+id).parent().children("p")); 
                if(label.find("any").length > 0)
                      label.find("any").remove();
     }
     
     /*console.log(ua);
     alert(ua);*/
     //console.log(User.getUser());
 $scope.omitClient = function(){
     //alert();
     if($scope.omitRecpetor){
         //$scope.omitRecpetor = false;
         $scope.Data.INV_SALIDAS.IND_RECEPTOR = "N";
         $scope.Data.GEN_CLIENTES = $scope.getData().GEN_CLIENTES;
         $scope.Data.GEN_CLIENTES.COD_CLIENT = 0;
         $scope.Data.GEN_CLIENTES.CEDULA = 0;
         $scope.inp_tipo_cedula = "1";
         $("#clientForm").toggle("slow");
         $("#labelReceptor").css("display","none");
         $("#omitBlock").css("float","left");
         //$("#datos_receptor").remove();
     }else{
         //$scope.omitRecpetor = true;
         $("#omitBlock").css("float","right");
         $scope.Data.GEN_CLIENTES = $scope.getData().GEN_CLIENTES;
         $scope.Data.INV_SALIDAS.IND_RECEPTOR = "S";
         $("#clientForm").toggle("slow");
         $("#labelReceptor").removeAttr("style");
     }
 }
 
 $scope.redondeo = function(number){
     //console.log(Number(number).toFixed(2));
     return Number(number).toFixed(2);
 }
    
$scope.agrega_producto = function(){
    
    formValidator.doValidation("Sub_container2",["required"]);    
       
       if(formValidator.getError()){
       alertify.error('Error revise el formulario por favor'); 
       return;
      }
    //alert();
    $( "#id_totales" ).removeClass("totales");
  var agrega = {};
  if(!$scope.isMobile)
    $scope.DetalleTemplate.PRECIO_UNI = $("#precioFormat").val().replace(/,/g,"");
  //console.log($scope.DetalleTemplate.PRECIO_UNI);
  angular.copy($scope.DetalleTemplate,agrega);
  //console.log($scope.DetalleTemplat,agrega);
  agrega.TIPO_VENTA = $scope.Data.INV_SALIDAS.TIPO_VENTA;
  agrega.COMPROBAN = $scope.Data.INV_SALIDAS.COMPROBAN;
  agrega.TIPO_DOCUMENTO_HACIENDA = $scope.Data.INV_SALIDAS.TIPO_DOCUMENTO_HACIENDA;
  
  agrega.TOTAL_UNI =  agrega.CANTIDAD * agrega.PRECIO_UNI;
  if($scope.impIncluido){
      agrega.TOTAL_UNI = agrega.TOTAL_UNI / (1 + (agrega.IMP_VENTAS / 100));
  }
      
  if(agrega.DESCUENTO > 0){
    descuento = (agrega.TOTAL_UNI)*(agrega.DESCUENTO/100);
    agrega.FE_SUB_TOTAL = agrega.TOTAL_UNI - descuento;
  }else
     agrega.FE_SUB_TOTAL = agrega.TOTAL_UNI;
 
 /*if(User.getUser().ROLES.indexOf(4) !== -1){
                     var montoImpuesto = parseFloat(ui.item.MAESTRO.PRECIO_VENTA) *(parseFloat(ui.item.IMP_VENTAS) / 100);
                     $("#precioFormat").val(parseFloat(ui.item.MAESTRO.PRECIO_VENTA) - parseFloat(montoImpuesto));
                 }*/
  
 if(agrega.IMP_VENTAS > 0  && User.getUser().ROLES.indexOf(4) === -1 ){
     impuesto = (agrega.FE_SUB_TOTAL)*(agrega.IMP_VENTAS/100);
     
     agrega.MONTO_CON_IVA = agrega.FE_SUB_TOTAL + impuesto;
     if(!$scope.impIncluido)
       agrega.PRECIO_VENTA = parseFloat(agrega.PRECIO_UNI) + parseFloat((agrega.PRECIO_UNI)*(agrega.IMP_VENTAS/100));
    else
        agrega.PRECIO_VENTA = parseFloat(agrega.PRECIO_UNI);
     
}else{
    agrega.MONTO_CON_IVA = agrega.FE_SUB_TOTAL;
    agrega.PRECIO_VENTA = parseFloat(agrega.PRECIO_UNI);
 }
  
  //console.log("Precio de venta",agrega.PRECIO_VENTA);
  var consecutivo = 1;
  if($scope.Data.INV_SALIDAS_DETA.length > 0)
      consecutivo = $scope.Data.INV_SALIDAS_DETA[$scope.Data.INV_SALIDAS_DETA.length - 1].CONSECUTIVO + 1; 
  agrega.CONSECUTIVO = consecutivo;
  
  if($scope.impIncluido){
      agrega.PRECIO_UNI = (agrega.PRECIO_UNI / (1 + (agrega.IMP_VENTAS/100)));
  }
  $scope.Data.INV_SALIDAS_DETA.push(agrega);
   console.log($scope.Data.INV_SALIDAS_DETA);
  $scope.DetalleTemplate = $scope.getDetalleTemplate();
  $scope.Excento = false;
  //console.log($scope.getData.INV_SALIDAS_DETA);
  
 $scope.actualiza_tabla(); 
  
};   

$scope.encabezado_factura = function(){
    //alert();
  /*var agrega = {};
  angular.copy($scope.DetalleTemplate,agrega);
  //console.log($scope.DetalleTemplat,agrega);
  $scope.Data.INV_SALIDAS.push(agrega);
  //console.log($scope.Data.INV_SALIDAS_DETA);
  $scope.DetalleTemplate = $scope.getDetalleTemplate();*/
  console.log($scope.getData.INV_SALIDAS);
  alert();
  
  
};   



$scope.buscar_emisor = function (cedula,tipo_cedula) {
   /* formValidator.doValidation("datos_receptor",["required"]);
  
   if(formValidator.getError()){
       alertify.error('Error revise el formulario por favor'); 
       return;
   }*/
    
     
    
   //console.log($("#datos_receptor .ng-invalid-required"));
  /*var emisor =  undefined;*/
  var Json = $scope.call_cedula("",cedula,"","","","")[0];
  if(!Json){
      alert("Error información del receptor inválida en consulta base de datos");
      return;
  }
  
//console.log(Json);

   
  if(!isEmpty(Json.NOMBRE)) {
       
       $scope.nombre = Json.NOMBRE;
       $scope.apellidouno = Json.APELLIDO1; 
       $scope.apellidodos = Json.APELLIDO2; 
       
       if(!isEmpty(Json.NUM_TELE))
         $scope.Data.GEN_CLIENTES.NUM_TELE = Json.NUM_TELE;
       if(!isEmpty(Json.PROVINCIA))
         $scope.Data.GEN_CLIENTES.PROVINCIA = parseInt(Json.PROVINCIA);
       else
           $scope.Data.GEN_CLIENTES.PROVINCIA = null;
       if(!isEmpty(Json.CANTON))
         $scope.Data.GEN_CLIENTES.CANTON = parseInt(Json.CANTON);
      else
          $scope.Data.GEN_CLIENTES.CANTON = null;
     
      if(!isEmpty(Json.DISTRITO))
         $scope.Data.GEN_CLIENTES.DISTRITO = parseInt(Json.DISTRITO);
      else
          $scope.Data.GEN_CLIENTES.DISTRITO = null;
       if(!isEmpty(Json.UBICACION))
         $scope.Data.GEN_CLIENTES.UBICACION = parseInt(Json.UBICACION);
      else 
          $scope.Data.GEN_CLIENTES.UBICACION = null;
       if(!isEmpty(Json.DIRECCION))
         $scope.Data.GEN_CLIENTES.DIRECCION= Json.DIRECCION;
       else
           $scope.Data.GEN_CLIENTES.DIRECCION= null;
       
        
       if(!isEmpty(Json.FAX))
         $scope.Data.GEN_CLIENTES.FAX= Json.FAX;
       else
           $scope.Data.GEN_CLIENTES.FAX= null;
       
       if(!isEmpty(Json.CORREO))
         $scope.Data.GEN_CLIENTES.CORREO= Json.CORREO;
       else
           $scope.Data.GEN_CLIENTES.CORREO= null;
     
  }else{
     
      alert("No se encontró información para la cédula "+cedula+"\n Digite la información del receptor por favor");
  }
};



$scope.call_cedula = function (PN_CODIGO_TIPO_IDENTIFICACION,PV_NUMERO_IDENTIFICACION,PV_PRIMER_APELLIDO,PV_SEGUNDO_APELLIDO,PV_NOMBRE){
            /*VERSION: 2.6
             FECHA DE CREACIÓN:2018-04-09T16:38
*/
var retorno;
            $.ajax({
                    type : "POST",
                     url : "CALLAJAX.htm",
                     data : {PN_CODIGO_TIPO_IDENTIFICACION:PN_CODIGO_TIPO_IDENTIFICACION,PV_NUMERO_IDENTIFICACION:PV_NUMERO_IDENTIFICACION,PV_PRIMER_APELLIDO:PV_PRIMER_APELLIDO,PV_SEGUNDO_APELLIDO:PV_SEGUNDO_APELLIDO,PV_NOMBRE:PV_NOMBRE},
                     timeout : 100000,
                                                 'beforeSend' : function(xhr) {
                        xhr.overrideMimeType('text/html; charset=iso-8859-1');
                        
                        },
						async: false,
						
                     success : function(data) {
                         var success;
                            try
                            {
                            // console.log("SUCCESS: ", data.trim());
                             retorno = data.trim();
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
                       var xml = retorno;
                       xml = xml.replace("<![CDATA", "");
                       xml = xml.replace("]>", "");
                       
                       /*$xml = $.parseXML(xml);
                       
                       var PV_JSON = $xml.find("PV_JSON").text();*/
                      
                       var PV_JSON = $($(xml)['0']).children("pv_json").text();
                      // console.log(PV_JSON);
                       
		 try{      
                   return JSON.parse(PV_JSON);
                 }catch(Ex){
                     console.log("Error parseo de json receptor");
                     return undefined;
                 }
 }
 
 $scope.isNota = false;

$scope.getData = function(TIPO,INFO){
    //console.log(TIPO);
    var data = 
 {
	
          "GENERICOS": {
		"COD_CIA": $scope.Emisor.COD_CIA,
		"TIPO_IDENTIFICACION":$scope.Emisor.TIPO_IDENTIFICACION,
		"CEDULA": $scope.Emisor.CEDULA,
                "IND_BUSQUEDA" : "N"
	},     
         "GEN_CLIENTES": {
		"COD_CIA": $scope.Emisor.COD_CIA,
		"COD_CLIENT": null,
		"NOMBRE": null,
		"ESTADO": "A",
		"CLASIFICACION": null,
		"CEDULA": null,
		"DIRECCION": null,
		"LUGAR_TRABAJO": null,
		"COD_ZONA": null,
		"COD_RUTA": null,
		"NUM_TELE": null,
		"NUM_TELE1": null,
		"FAX": null,
		"FECHA_ING": null,
		"USUARIO_MOD": null,
		"FECHA_MOD": null,
		"OBSERVACIONES": null,
		"IND_TIPSEX": null,
		"COD_ALTERNO": null,
		"DES_AVISO": null,
		"DE_OCUPAC": null,
		"IND_ESTCIV": null,
		"IND_TIPCLI": null,
		"FEC_NACIMI": null,
		"POR_DESCLI": null,
		"NUM_TELCEL": null,
		"TIPO_IDENTIFICACION": null,
		"CODIGO_PAIS": null,
		"PROVINCIA": null,
		"CANTON": null,
		"DISTRITO": null,
		"UBICACION": null,
		"CORREO": null,
		"RAZON_SOCIAL": null
	   },
            "INV_SALIDAS":
            {  "COD_CIA": $scope.Emisor.COD_CIA, 
            "COD_AGENCIA":User.getUser().COD_AGENCIA_ASIGNADA, 
            //"TIPO_VENTA":null, 
            "TIPO_VENTA" : null,
            "COMPROBAN":"REPLACECOMPROBANTE", 
            //"COMPROBAN":"1000078",
            "COD_CLIENT":"REPLACECLIENTE", 
            "NOMBRE":null, 
            "FECHA": $filter('date')(new Date(), 'dd-MM-yyyy HH:mm:ss'),
            "NUM_ORDEN":null, 
            "VENTA_EXENTA":null, 
            "APLICA_DESC":null, 
            "ESTADO":"G", 
            "NUM_VENDEDOR":1, 
            "OBSERVACIONES":null, 
            "MONTO_FACTURA":null, 
            "USUARIO_MOD":null, 
            "FECHA_MOD":null, 
            "TIPO_PRECIO":null, 
            "PROFORMA":null, 
            "MONTO_IMPUESTO":null, 
            "MONTO_DESCUENTO":null, 
            "MONTO_TOTAL":null, 
            "FE_CLAVE":null, 
            "FA_MEDIOPAGO":null, 
            "FA_CODIGOMONEDA":"1", 
            "FA_TIPOCAMBIO":0.0, 
            "FA_TOTALSERVGRAVADOS":null, 
            "FA_TOTALSERVEXENTOS":null, 
            "FA_TOTALMERCANCIASGRAVADAS":null, 
            "FA_TOTALMERCANCIASEXENTAS":null, 
            "FA_TOTALGRAVADO":null, 
            "FA_TOTALEXENTO":null, 
            "OTROTEXTO1":null, 
            "OTROTEXTO2":null, 
            "CODIGO_EMISOR":null, 
            "FA_TOTALVENTA":null, 
            "FA_TOTALVENTANETA":null, 
            "IND_FE":"S", 
            "TIPO_DOCUMENTO_HACIENDA":"01", 
            "FECHA_RELACIONADA":null, 
            "FE_CODIGO_SEGURIDADQR":null, 
            "FE_CONSECUTIVO":null, 
            "FE_CONSECUTIVO_RELA":null ,
            "FE_PLAZO_VENTA" : 0,
            "IND_RECEPTOR" : "S"
             },
             "INV_SALIDAS_DETA": []
 };
 
 if(!isEmpty(TIPO)){
    data.GENERICOS.IND_BUSQUEDA = "S";
    data.GENERICOS.COD_AGENCIA = User.getUser().COD_AGENCIA_ASIGNADA;
    var temp = JSON.parse(atob(INFO));
    data.INV_SALIDAS.COMPROBAN = temp.COMPROBAN;
    data.INV_SALIDAS.TIPO_VENTA = temp.TIPO_VENTA;
    data.INV_SALIDAS.TIPO_DOCUMENTO_HACIENDA = temp.TIPO_DOCUMENTO_HACIENDA;
    data.GEN_CLIENTES.COD_CLIENT = temp.COD_CLIENT;
    
    var xmlBD = jsonToXml("DATA",data);
    $scope.executeBdEncabezado(3,TIPO,xmlBD);    
    var bdFull = $interval(function(){
        if(tempData !== undefined){
            $interval.cancel(bdFull);
            //console.log("bdData",tempData);
            if(TIPO === "NC")
                tempData.INV_SALIDAS.TIPO_DOCUMENTO_HACIENDA = "03";
            else if(TIPO === "ND")
                tempData.INV_SALIDAS.TIPO_DOCUMENTO_HACIENDA = "02";
            
            if(!isEmpty(tempData.INV_SALIDAS.FA_TIPOCAMBIO))
              tempData.INV_SALIDAS.FA_TIPOCAMBIO = parseFloat(tempData.INV_SALIDAS.FA_TIPOCAMBIO);
          
            if(!isEmpty(tempData.INV_SALIDAS.FE_PLAZO_VENTA))
              tempData.INV_SALIDAS.FE_PLAZO_VENTA = parseFloat(tempData.INV_SALIDAS.FE_PLAZO_VENTA);
          
            $scope.Data = tempData;
            $scope.Data.INV_SALIDAS.FECHA = $filter('date')(new Date(), 'dd-MM-yyyy HH:mm:ss')
            if($scope.Data.INV_SALIDAS.TIPO_VENTA !== null && $scope.Data.INV_SALIDAS.TIPO_VENTA !== undefined)
                $("#TIPO_VENTA").removeClass("ng-invalid-required");
               
            $scope.Data.Error = undefined;
            $scope.Data.GENERICOS = data.GENERICOS;
            
            $scope.inp_tipo_cedula = String(parseInt(tempData.GEN_CLIENTES.TIPO_IDENTIFICACION));
            
            
            if(TIPO === "NC" || TIPO === "ND"){
                //$scope.Data.INV_SALIDAS.FE_CONSECUTIVO = null;
                $("#botoneraArribaTab").remove();
                $("#datos_receptor").css("display","none");
                $("#Sub_container").css("display","none");
                $("#datos_receptor :input").attr("disabled", true);
                $("#Sub_container :input").attr("disabled", true);
                $("#Observaciones").removeAttr("disabled");
                
                var textoTipo = "";
                if(TIPO === "NC")
                    textoTipo = "Nota de crédito";
                
                if(TIPO === "ND")
                    textoTipo = "Nota de débito";
                if($scope.Data.INV_SALIDAS.OTROTEXTO1 !== null && $scope.Data.INV_SALIDAS.OTROTEXTO1 !== "null")
                  $scope.Data.INV_SALIDAS.OTROTEXTO1 = textoTipo +" de "+ $scope.Data.INV_SALIDAS.OTROTEXTO1;
                else
                   $scope.Data.INV_SALIDAS.OTROTEXTO1 = textoTipo +" de "; 
                $("#Sub_container").css("display","block");
                $("#Observaciones").focus();
                
                //$scope.Data.INV_SALIDAS.FE_CLAVE = null;
                
            }else{
                $("#datos_receptor").css("display","block");
                $("#botoneraArribaTab").css("display","block");
                
            }
            
            
            if(tempData.INV_SALIDAS_DETA.length > 0){
                //PARCHE CORRECTO MONTO DESCUENTO A PORCENTAJE
                var tempLoop = tempData.INV_SALIDAS_DETA;
                tempData.INV_SALIDAS_DETA = [];
                $(tempLoop).each(function(index,el){
                    if(el.DESCUENTO > 0){
                        descuento = (el.DESCUENTO * 100)/el.TOTAL_UNI;
                        el.DESCUENTO = descuento;
                    } 
                    tempData.INV_SALIDAS_DETA.push(el);
                });
               $scope.Data.INV_SALIDAS_DETA = tempData.INV_SALIDAS_DETA;
               $("#DETALLEFACTURA").removeClass("accordionblock");
               $("#Sub_container2").css("display","block");
               $scope.actualiza_tabla(); 
               
             }
             $scope.Data.GENERICOS.IND_BUSQUEDA = "N";
             $scope.chargeInfoAccordion("All");
             if(TIPO === "NC"){
                 //$scope.Data.INV_SALIDAS.FE_CONSECUTIVO = undefined;
                 
                 $($scope.Data.INV_SALIDAS_DETA).each(function(index,el){
                     $scope.Data.INV_SALIDAS_DETA[index].COMPROBAN = tempData.INV_SALIDAS.COMPROBAN;
                 })
             }
                 //data.
        }
    },1000);     
 }
 
 

    return data;
};

$scope.chargeInfoAccordion = function(tipo,soloRecarga){
     $timeout(function(){
          if(tipo === "All" || tipo === "1"){
            $scope.tempInfoCliente = $("#TipoId option:selected").text() +" "+$scope.Data.GEN_CLIENTES.CEDULA+" "+$scope.nombre+" "+$scope.apellidouno+" "+$scope.apellidodos;
           if(!soloRecarga){ 
              var btnText = $("#clientebtn").text();
              $("#clientebtn").html("<strong>"+btnText+":</strong>");
             }
         } 
         if(tipo === "All" || tipo === "2")
            $scope.tempInfoGeneral = $scope.Data.INV_SALIDAS.FECHA+" "+$("#TIPO_DOCUMENTO option:selected").text() +" "+$("#FA_CODIGOMONEDA option:selected").text()+"  Tipo de Venta:"+$("#TIPO_VENTA option:selected").text();
            if(!soloRecarga){ 
              var btnText = $("#generalbtn").text();
              $("#generalbtn").html("<strong>"+btnText+":</strong>");
           }
         
      },500);
};

$scope.actualiza_tabla = function(){
     var DetalleFactura = $scope.Data.INV_SALIDAS_DETA;
        //console.log(DetalleFactura);
       /*MontoTotal  -- Se obtiene de multiplicar el campo cantidad por el campo precio unitario*/
        var monto_total = 0;
        /*SubTotal -- Se obtiene de la resta del campo monto total menos monto de descuento concedido */
        var SubTotal = 0;
        /*Se obtiene de la suma de todos los campo de monto de descuento concedido*/
        var TotalDescuentos = 0;
        var total = 0;
        var cantidad = 0.000;
        var precio = 0;
        var monto = 0;
        var monto_descuento = 0;
        var descuento = 0;
        var total = 0;
        var impuesto = 0;
        var total_impuestos = 0;
  //imp de venta incluido
 if(User.getUser().ROLES.indexOf(4) === -1 ){     
        for (var i in DetalleFactura) {
            precio = parseFloat($scope.Data.INV_SALIDAS_DETA[i].PRECIO_UNI);
            cantidad =parseFloat($scope.Data.INV_SALIDAS_DETA[i].CANTIDAD);
            monto_descuento = parseFloat($scope.Data.INV_SALIDAS_DETA[i].DESCUENTO);

            impuesto =  /*parseInt($scope.Data.INV_SALIDAS_DETA[i].IMP_VENTAS)*/parseInt($scope.Data.INV_SALIDAS_DETA[i].IMP_VENTAS);
            monto_total = parseFloat(monto_total + (parseFloat(cantidad) * parseFloat(precio)));
            monto = (parseFloat(cantidad) * parseFloat(precio));
            descuento = descuento + (monto)*(monto_descuento/100);
            /*TotalDescuentos = TotalDescuentos + descuento;*/
            SubTotal =  monto_total - descuento;
            total =   monto_total - descuento;
            if($scope.Data.INV_SALIDAS_DETA[i].IMP_VENTAS > 0)
             total_impuestos = total_impuestos + ((impuesto/100)*((cantidad * precio)-(monto)*(monto_descuento/100)));
    }

   $scope.total_factura = $scope.redondeo(total + total_impuestos) ;
   
 }else{
     for (var i in DetalleFactura) {
            //precio = parseFloat($scope.Data.INV_SALIDAS_DETA[i].PRECIO_UNI);
            precio = parseFloat($scope.Data.INV_SALIDAS_DETA[i].PRECIO_VENTA);
            
            cantidad =parseFloat($scope.Data.INV_SALIDAS_DETA[i].CANTIDAD);
            monto_descuento = parseFloat($scope.Data.INV_SALIDAS_DETA[i].DESCUENTO);

            impuesto =  /*parseInt($scope.Data.INV_SALIDAS_DETA[i].IMP_VENTAS)*/parseInt($scope.Data.INV_SALIDAS_DETA[i].IMP_VENTAS);
            monto_total = parseFloat(monto_total + (parseFloat(cantidad) * parseFloat(precio)));
            monto = (parseFloat(cantidad) * parseFloat(precio));
            descuento = descuento + (monto)*(monto_descuento/100);
            SubTotal += (monto - descuento) / (1 + ($scope.Data.INV_SALIDAS_DETA[i].IMP_VENTAS / 100));
            total_impuestos += monto -(monto - descuento) / (1 + ($scope.Data.INV_SALIDAS_DETA[i].IMP_VENTAS / 100)) ;
          
    }
    
    $scope.total_factura = $scope.redondeo(monto_total) ;
 }
 
    $scope.MontoTotal = $scope.redondeo(monto_total);
    $scope.sub_totals = $scope.redondeo(SubTotal);
    $scope.descuentos = $scope.redondeo(descuento);
    
    $scope.total_impuests = $scope.redondeo(total_impuestos);
}

$scope.changeGravado = function(){
    if($scope.Excento)
        $scope.DetalleTemplate.IMP_VENTAS = 0;
    else
     $scope.DetalleTemplate.IMP_VENTAS = 13;
}

$scope.getDetalleTemplate = function(){
    $("#precioFormat").val("0");
    return {
 		"COD_CIA": $scope.Emisor.COD_CIA,
 		"COD_AGENCIA": User.getUser().COD_AGENCIA_ASIGNADA, 
 		"TIPO_VENTA": null,
 		"COMPROBAN": null,
 		"CATEGORIA": 1,
 		"COD_PRODUCTO": 1,
 		"CANTIDAD": 1,
 		"ENTREGADO": null,
 		"FECHA_ENTREGA": null,
 		"PRECIO_UNI": null,
 		"TOTAL_UNI": 0,
 		"DESCUENTO": 0,
 		"GRAVADO": null,
 		"GRAVADO_DESC": 0,
 		"CHEK_IMP": null,
 		"BOLETA": null,
 		"CANT_ENTREGADA": null,
 		"CANT_DEVUELTA": null,
 		"POR_DESCUENTO": 0,
 		"NUM_SERIE": null,
 		"CONSECUTIVO": null,
 		"UNIDAD_MEDIDA": null,
 		"EXCENTO": 0,
 		"IMP_VENTAS": 13,
 		"IMPUESTO_LINEA": 0,
 		"MONTO_CON_IVA": 0,
 		"MONTO_LINEA": 0,
 		"PRECIO_VENTA": null,
 		"TIPO_DOCUMENTO_HACIENDA": null,
                "DESCRIPCION_PRODUCTO": null,
                "NATURALEZA_DESCUENTO" : null
 	};
}



$scope.ProductosSplit = function(index){
$scope.Data.INV_SALIDAS_DETA.splice(index,1);
console.log($scope.Data.INV_SALIDAS_DETA);
  $scope.actualiza_tabla();
};
 
$scope.encabezado_factura = function(Operacion,Tipo){
    
       var bdSave = {};
       if($scope.Data.GEN_CLIENTES.COD_CLIENT !== 0){
          formValidator.doValidation("datos_receptor",["required"]);    

            if(formValidator.getError()){
            alertify.error('Error revise el formulario por favor'); 
            return;
           }
       }
           
       formValidator.doValidation("Sub_container",["required"]);
       
       if(formValidator.getError()){
       alertify.error('Error revise el formulario por favor'); 
       return;
      }
        
      if((Tipo === 'N' && Operacion === 2) && $scope.Data.INV_SALIDAS_DETA.length === 0 ){
             alertify.warning('Debe ingresar al menos un producto o servicio'); 
             return;               
       }
        $scope.Data.GEN_CLIENTES.NOMBRE = $scope.nombre + " "+$scope.apellidouno+" "+$scope.apellidodos;
        $scope.Data.INV_SALIDAS.NOMBRE = $scope.nombre + " "+$scope.apellidouno+" "+$scope.apellidodos;
        $scope.Data.GEN_CLIENTES.TIPO_IDENTIFICACION = $scope.inp_tipo_cedula;
        //console.log("Data",JSON.stringify($scope.Data));
        var tempEnvio = [];
        angular.copy($scope.Data,tempEnvio);
       //MANEJO DE PARCHE DE EMERGENCIA CORREGUIR CAMPO DESCUENTO
       if(tempEnvio.INV_SALIDAS_DETA.length > 0){
           var tempLoop = tempEnvio.INV_SALIDAS_DETA;
           tempEnvio.INV_SALIDAS_DETA = [];
           $(tempLoop).each(function(index,el){
               if(el.DESCUENTO > 0){
                   descuento = (el.TOTAL_UNI)*(el.DESCUENTO/100);
                   el.DESCUENTO = descuento;
               } 
               tempEnvio.INV_SALIDAS_DETA.push(el);
           });
       }
       //console.log($scope.Data);
       var encabezado = jsonToXml("DATA",tempEnvio);
      
      var success;
      msgConfirm = "";
    /* if(Tipo === 'N'){
          msgConfirm = 'Seguro de que desea guardar la información de la factura?';
      
     
        var r = confirm(msgConfirm);
        if (r == true) {
            $scope.executeBdEncabezado(Operacion,Tipo,encabezado);
        } else {
            
        }
   }else if(Tipo === 'S')*/
        $scope.executeBdEncabezado(Operacion,Tipo,encabezado);
       
       return bdSave;
 };
 
 $scope.executeBdEncabezado = function(Operacion,Tipo,encabezado){
     //console.log(encabezado);
     
     var msg = "";
     var goBd = false;
     var base64pdf = "";
     var loadCommands = ["NC","ND","R"];
     if(Tipo === "N"){
         msg = "Procesando Información de Factura";
         goBd = true;
     }else if(Tipo === "S"){
         msg = "Creando Archivos de Factura";
         
     }else if(loadCommands.indexOf(Tipo) !== -1){
         msg="Cargando Información de documento...Por favor Espere";
         goBd = true;
     }
     
     $.blockUI({ message: '<h1 style="width:100%"><img src="resources/images/ajax_wait.gif" />' +msg+'</h1>' }); 
    //CREO PDF
    if(Tipo === "S"){
            deleteLocalStorage("reporter");
            deleteLocalStorage("Base64reporter");
            //console.log('base64 1',getLocalStorage('Base64reporter'));
            var reporterData = $scope.Data;
            var contacto = "";
            if($scope.Emisor.NUM_TELCEL && $scope.Emisor.NUM_TELCEL !== "null")
                contacto = $scope.Emisor.NUM_TELCEL;
            if($scope.Emisor.TELEFONOCASA && $scope.Emisor.TELEFONOCASA !== "null")
                contacto += " "+$scope.Emisor.TELEFONOCASA;
            if($scope.Emisor.TELEFONOOFICINA && $scope.Emisor.TELEFONOOFICINA !== "null")
                contacto += " "+$scope.Emisor.TELEFONOOFICINA;
            if($scope.Emisor.TELEFONCEL && $scope.Emisor.TELEFONCEL !== "null") 
                contacto += " "+$scope.Emisor.TELEFONCEL;
            if($scope.Emisor.NUMEROFAX && $scope.Emisor.NUMEROFAX !== "null")
                contacto += " "+$scope.Emisor.NUMEROFAX;
            reporterData.GENERICOS.NOMBRE = $scope.Emisor.NOMBRE;
            reporterData.GENERICOS.CONTACTO = contacto+" "+$scope.Emisor.CORREO;
            reporterData.GENERICOS.TIPOIDN = $scope.Emisor.TIPOIDN;
            reporterData.GENERICOS.DIRECCION = $scope.Emisor.DIRECCION;
            reporterData.GEN_CLIENTES.TIPOIDN = $("#TipoId option:selected").text();
            reporterData.INV_SALIDAS.TIPO_VENTAN = $("#TIPO_VENTA option:selected").text();
            reporterData.INV_SALIDAS.TIPO_PRECION = $("#MEDIO_PAGO option:selected").text();
            reporterData.INV_SALIDAS.FA_CODIGOMONEDAN = $("#FA_CODIGOMONEDA option:selected").text();
            reporterData.INV_SALIDAS.TIPO_DOCUMENTON = $("#TIPO_DOCUMENTO option:selected").text();
            if(parseInt($scope.Data.INV_SALIDAS.FA_CODIGOMONEDA) === 1)
                reporterData.INV_SALIDAS.FA_TIPOCAMBIO = undefined;
            if($scope.Data.INV_SALIDAS.TIPO_VENTA !== "C")
                reporterData.INV_SALIDAS.FE_PLAZO_VENTA = undefined;
            reporterData.INV_SALIDAS.MONTO_TOTAL = $scope.MontoTotal;
            reporterData.INV_SALIDAS.FE_SUB_TOTAL = $scope.descuentos;
            reporterData.INV_SALIDAS.MONTO_DESCUENTO = $scope.sub_totals;
            reporterData.INV_SALIDAS.MONTO_IMPUESTO = $scope.total_impuests;
            reporterData.INV_SALIDAS.FA_TOTALVENTA = $scope.total_factura;
            if(parseInt($scope.inp_tipo_cedula) !== 2){
               reporterData.GEN_CLIENTES.NOMBRE = $scope.nombre + " "+$scope.apellidouno+" "+$scope.apellidodos;
               reporterData.INV_SALIDAS.NOMBRE = $scope.nombre + " "+$scope.apellidouno+" "+$scope.apellidodos;
            }else{
                reporterData.GEN_CLIENTES.NOMBRE = $scope.nombre ;
               reporterData.INV_SALIDAS.NOMBRE = $scope.nombre ;
            }
            if(!isEmpty($scope.Emisor.BASE64_AVATAR))
                reporterData.logo = $scope.Emisor.BASE64_AVATAR;
            setLocalStorage("reporter",JSON.stringify($scope.Data));
            //console.log("reporter",JSON.stringify($scope.Data));
            $timeout(function(){
                if($scope.Emisor.REPORTER_FORM === undefined){
                  if(isEmpty($scope.Emisor.BASE64_AVATAR) || $scope.Emisor.BASE64_AVATAR === "null"){  
                     //NO IMP INCLUIDO SIN LOGO
                     if(!$scope.impIncluido)
                       $("#tempReporter").attr("src","resources/reporterHtml/index.html"); 
                     else
                         $("#tempReporter").attr("src","resources/reporterHtml/reporterImpIncluido.html"); 
                     //IMP INCLUDIO SIN LOGO
                  }else{
                      $("#tempReporter").attr("src","resources/reporterHtml/reporterLogo.html"); 
                   }
                }else{
                    //VALIDO QUE USO DE REPORTE NO SEA UN HTML FIJO
                    if($scope.Emisor.REPORTER_FORM.indexOf("F_") === -1)
                     $("#tempReporter").attr("src","resources/reporterHtml/"+$scope.Emisor.REPORTER_FORM);
                   else{
                       
                   }
                       
                 }
               if($scope.Emisor.REPORTER_FORM === undefined || $scope.Emisor.REPORTER_FORM.indexOf("F_") === -1){
                 document.getElementById('tempReporter').onload = function() {
                  var reporterFull = $interval(function(){
                         $scope.base64PdfBD = getLocalStorage('Base64reporter');
                         var getJsLocal = true;
                         /*if($scope.Emisor.REPORTER_FORM.indexOf("_F") !== -1)
                             getJsLocal = false;*/
                         if(($scope.base64PdfBD && !isEmpty($scope.base64PdfBD))){
                             $interval.cancel(reporterFull);
                             deleteLocalStorage("Base64reporter");
                            // $scope.base64PdfBD = $scope.base64PdfBD.replace("data:application/pdf;base64,","");
                             
                             base64pdf = $scope.base64PdfBD.replace("data:application/pdf;base64,","");
                             goBd = true;
                         }

                     },1000);
                  }
              }else{
                  goBd = true;
                  base64pdf = "FileFijo";
                  $scope.base64PdfBD = "";
              }
            },500);
     }
var process = $interval(function(){  
    if(goBd){
         $interval.cancel(process);
         $.ajax({

                       type : "POST",
                        url : "CALLAJAXENCABEZADOFAC.htm",
                        data : {TIPO:Tipo,GV_DATOSENCABEZADO:encabezado,Pdf:base64pdf},
                        timeout : 100000,
                                                    'beforeSend' : function(xhr) {
                           xhr.overrideMimeType('text/html; charset=iso-8859-1');

                           },
                        success : function(data) {
                            var response;
                               try
                               {
                                  //console.log("data",data);

                                try{
                                   bdSave = JSON.parse(data);
                                 // console.log(bdSave);
                                       if(bdSave.Error !== '0'){
                                           //console.log(bdSave.Error);
                                           try{
                                             alertify.alert('Error en ejecucion base de datos',bdSave.Error); 
                                             //$("#facframe",parent.document).css("margin-top","2%");
                                             //$("#facframe",parent.document).css("margin-top","1%");
                                         }catch(Ex){
                                             alert("Error:"+bdSave.Error);
                                         }
                                         $.unblockUI({ fadeOut: 200 }); 
                                            return;
                                       }

                                   if(Tipo !== 'S' && Operacion !== 3){
                                       
                                    if(!isEmpty(bdSave.INV_SALIDAS.FA_TIPOCAMBIO))
                                      bdSave.INV_SALIDAS.FA_TIPOCAMBIO = parseFloat(bdSave.INV_SALIDAS.FA_TIPOCAMBIO);

                                    if(!isEmpty(bdSave.INV_SALIDAS.FE_PLAZO_VENTA))
                                      bdSave.INV_SALIDAS.FE_PLAZO_VENTA = parseFloat(bdSave.INV_SALIDAS.FE_PLAZO_VENTA);
                                     
                                      $scope.Data.GEN_CLIENTES = bdSave.GEN_CLIENTES;
                                      $scope.Data.INV_SALIDAS = bdSave.INV_SALIDAS;
                                     // $scope.Data.INV_SALIDAS.FE_PLAZO_VENTA = 5;
                                   }
                                 if(Operacion === 1){ 
                                    $("#FA_TIPOCAMBIO").focus();
                                    $("#FA_TIPOCAMBIO").focusout();

                                    $("#datos_receptor").css("display","none");

                                    $("#Sub_container").css("display","none");
                                    // $("#DETALLEFACTURA").removeClass("accordionblock");
                                    //alertify.alert("Factura Guardada con Éxito, procesada a completar el detalle");
                                    //$("#DETALLEFACTURA").removeClass("accordionblock");
                                   alertify.success('Factura Guardada con Éxito, procesada a completar el detalle');
                                    $timeout(function(){
                                        $("#DETALLEFACTURA").removeClass("accordionblock");
                                        $("#Sub_container2").css("display","block");
                                        $("#botoneraArribaTab").css("display","none");
                                        //VALIDA SI EL USUARIO TIENE ROL CALCULADORA DIMENSIONES
                                        
                                        if(User.getUser().ROLES.indexOf(3) !== -1){
                                            $scope.showCalculadoraDimensiones = true;
                                        }
                                        
                                        
                                        $.unblockUI({ fadeOut: 200 }); 

                                    },1000);
                                  }else if(Tipo === 'N' && Operacion === 2){
                                      $scope.guardado = true;
                                      //alertify.alert("Factura y Detalle Guardada con Éxito, procesada a crear los archvios de factura");
                                      $.unblockUI({ fadeOut: 200 }); 
                                      $timeout(function(){
                                        alertify.success('Factura y Detalle Guardados con Éxito,Creando Archivos de Factura....Por favor espere');
                                      },500);

                                      $timeout(function(){
                                         $scope.encabezado_factura(2,'S');
                                      },1000);
                                  }else if(Tipo === 'S' && Operacion === 2){
                                       $.unblockUI({ fadeOut: 200 }); 
                                       $timeout(function(){
                                          if(isEmpty(bdSave.Error) || bdSave.Error === "0" ){
                                            alertify.success('Archivos Creados con Éxito,Proceda a Enviarlos a Hacienda');
                                            $scope.keyFirma = bdSave.Key;
                                            $scope.doFirma = true;
                                            if($scope.Emisor.REPORTER_FORM.indexOf("F_") !== -1){
                                                tempCliente = $(encabezado).find("GEN_CLIENTES").find("NOMBRE").text();
                                                while(true){
                                                    if(tempCliente.indexOf(" ") !== -1)
                                                    tempCliente = tempCliente.replace(" ","_");
                                                   else
                                                       break;
                                                }
                                                var clienteNombre = tempCliente;
                                                //alert(clienteNombre);
                                                var fe_cosecutivo = $(encabezado).find("FE_CONSECUTIVO").text();
                                                
                                                if($scope.Emisor.REPORTER_FORM.indexOf("Tickets") !== -1)
                                                location.replace("Descargar.htm?name="+clienteNombre+"_"+fe_cosecutivo+".pdf");
                                            }
                                          
                                            
                                         }else
                                             alertify.alert('Error', bdSave.Error);
                                           
                                        },500);

                                   }else if(Operacion === 3){
                                      $.unblockUI({ fadeOut: 200 }); 
                                       tempData = bdSave;
                                   }

                                  }catch(Ex){
                                   $.unblockUI({ fadeOut: 200 }); 
                                   bdSave = undefined;
                                   tempData = undefined;
                                   alertify.error("Error problemas de formato de respuesta"); 
                                   
                               }



                             }catch(Exception){
                                 $.unblockUI({ fadeOut: 200 }); 
                                 tempData = undefined;
                                 console.log("Error Javascript:"+Exception.message,"stack:",Exception.stack);
                                 $("#msg").css("display","block");
                                 $("#msg").html("Error en petición en dsoa:<p class='ErrorMsg glyphicon glyphicon-warning-sign'>"+data+"</p>");
                             }
                               /* console.log("grid:"+data);
                                display(data);*/
                            
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
            },1000)
 };
 
 
 
 $scope.vistaPreviaPdf = function(){
     if($scope.base64PdfBD !== ""){
        deleteLocalStorage("facTemp");
        setLocalStorage("facTemp",$scope.base64PdfBD);
        window.open("visorIframe.htm?Title="+"Factura"+"&doc=facTemp","_blank");
    }else
        window.open("resources/temp/"+$scope.Data.INV_SALIDAS.FE_CLAVE+".pdf"); 
     //window.open($scope.base64PdfBD,"_blank");
 }
 
 $scope.cargePdf = function(){
   if(!$scope.doFirma){
          alertify.warning('Debe crear los archivos de factura primero'); 
         return;
     }
     
     var r = confirm("Seguro que desea firmar y enviar,una vez realizado no podrá modificar más la factura");
   if (r == true) {
            
   
       $.blockUI({ message: '<h1 style="width:100%"><img src="resources/images/ajax_wait.gif" />Por favor espere...Procesando Factura en el Ministerio de Hacienda</h1>' }); 
       
      
          $scope.executeFirma($scope.keyFirma);
    
     } else {
            
        }
 };
 
$scope.executeFirma = function(key){
    
   
           var response;
               $.ajax({
              
                    type : "POST",
                     url : "firmarFactura.htm",
                     data : {Key:key,IpPublica:"A",Pdf:$scope.base64PdfBD},
                     timeout : 100000,
                                                 'beforeSend' : function(xhr) {
                        xhr.overrideMimeType('text/html; charset=iso-8859-1');
                        
                        },
                        async:true,
                     success : function(data) {
                        
                            try
                            {
                               //console.log("data",data);
                                
                               data = data.replace("-","_");
                              response = data;
                              bdResponse = JSON.parse(data);
                              
                              console.log(bdResponse);
                              
                              msg = "";
                              $.unblockUI({ fadeOut: 200 }); 
                               
                              if(bdResponse.Verificacion !== undefined && bdResponse.Verificacion['ind-estado'] === "aceptado"){
                                  alertify.success('Documento Procesado con éxito en el ministerio de hacienda'); 
                                 $timeout(function(){
                                     $scope.endProcess = true;
                                  $("#cantidad").focusin();
                                  $("#cantidad").focusout();
                                 },500);
                                  
                              }else if(bdResponse.Verificacion !== undefined && bdResponse.Verificacion['ind-estado'] === "rechazado"){
                                   alertify.error('Documento '+bdResponse.Verificacion['ind-estado'] +' por el ministerio de hacienda'); 
                                   $timeout(function(){
                                     $scope.endProcess = true;
                                    $("#cantidad").focusin();
                                    $("#cantidad").focusout();
                                   },500);
                               }else if(bdResponse.Verificacion !== undefined){
                                   if(bdResponse.Verificacion['ind-estado'] === "recibido")
                                     alertify.success('Documento '+bdResponse.Verificacion['ind-estado'] +' por el ministerio de hacienda'); 
                                   else
                                       alertify.success('El Documento esta siendo procesado por el ministerio de hacienda,puede continuar facturando'); 
                                   $timeout(function(){
                                     $scope.endProcess = true;
                                    $("#cantidad").focusin();
                                    $("#cantidad").focusout();
                                   },500);
                               }else{
                                   if(bdResponse.Envio !== undefined && bdResponse.Envio.Error !== undefined ){
                                       alertify.error('Error envío hacienda '+bdResponse.Envio.Error+ ' comuniquese con el administrador de sistema');
                                       return;
                                   }
                                       
                                   //alertify.error('Error '+JSON.stringify(bdResponse.Envio)+ ' comuniquese con el administrador de sistema');
                                   alertify.alert('Error', JSON.stringify(bdResponse.Envio)+ ' comuniquese con el administrador de sistema');
                                   console.log('Error '+JSON.stringify(bdResponse.Envio)+ ' comuniquese con el administrador de sistema');
                               }
                                 
                             }catch(Exception){
                              $.unblockUI({ fadeOut: 200 }); 
                              //alertify.error('Error '+response+ ' comuniquese con el administrador de sistema');
                              alertify.alert('Error', response+ ' comuniquese con el administrador de sistema');
                              console.log("Error Javascript:"+Exception.message,"stack:",Exception.stack);
                             //$("#msg").css("display","block");
                             // $("#msg").html("Error en petición en dsoa:<p class='ErrorMsg glyphicon glyphicon-warning-sign'>"+data+"</p>");
                          }
                            /* console.log("grid:"+data);
                             display(data);*/
                     },
                     error : function(e) {
                             console.log("ERROR: ", e);
                             $.unblockUI({ fadeOut: 200 }); 
                             alert("Error ajax:  StatusError:"+e.status+"StatusText:"+e.statusText
                              +e.responseText);
                     },
                     done : function(e) {
                             console.log("DONE");
                             enableSearchButton(true);
                     }
             });
     
 };
 
    
 //Cargo lista de Catones 
 $http.get("resources/json/Cantones.json")
    .then(function(response) {
        allCantones = response.data;
        
  });
 
 //Cargo lista de distritos
 $http.get("resources/json/Distritos.json")
    .then(function(response) {
        allDistritos = response.data;
  });
  
 //Cargo lista de ubicaciones
 $http.get("resources/json/Ubicaciones.json")
    .then(function(response) {
        allUbicaciones = response.data;
  });
    
 //Cargo datos de listas json
 $http.get("resources/json/Unidades.json")
    .then(function(response) {
        $scope.Unidades = response.data;
        $("#bodyMante").css("display","block");
        
        $("#loaderMain", window.parent.document).css("display","none");
        
   });
 
 
//$scope.Data = $scope.getData(); 
$scope.DetalleTemplate = $scope.getDetalleTemplate();   

//buscar_emisor Atomáticamente
$scope.$watch('Data.GEN_CLIENTES.CEDULA',function(newValue,OldValue){
   try{
       if(newValue !== null)
         $scope.quitarGuiones('Data.GEN_CLIENTES.CEDULA');
        //console.log(isEmpty(newValue),newValue.length,$scope.inp_tipo_cedula);
         if(isEmpty($("#nombre").attr("autocompletefill")) || $("#nombre").attr("autocompletefill") !== "true"){
            var tempStr = newValue.toString();
            if(!isEmpty(tempStr) && newValue.length >= 9 && parseInt($scope.inp_tipo_cedula) === 1){
               $scope.buscar_emisor(newValue,$scope.inp_tipo_cedula);
            }else if((!isEmpty(tempStr) && newValue.length >= 10) && parseInt($scope.inp_tipo_cedula) === 2){
                $scope.buscar_emisor(newValue,$scope.inp_tipo_cedula);
            }/*else if((!isEmpty(newValue) && newValue.length >= 9) && (parseInt($scope.inp_tipo_cedula) === 3 || parseInt($scope.inp_tipo_cedula) === 4)){
                $scope.buscar_emisor(newValue,$scope.inp_tipo_cedula);
            }*/

         }

         $("#nombre").attr("autocompletefill","false");
     }catch(Ex){}
});

//FILTROS DE CANTON Y DISTRITO
function filtroCanton(obj){
    if(parseInt(obj.provincia) === parseInt($scope.Data.GEN_CLIENTES.PROVINCIA))
        return true;
    return false;
}

function filtroDistrito(obj){
    if((parseInt(obj.provincia) === parseInt($scope.Data.GEN_CLIENTES.PROVINCIA))
            && 
        (parseInt(obj.canton) === parseInt($scope.Data.GEN_CLIENTES.CANTON))
      )
        return true;
    return false;
}

function filtroUbicaciones(obj){
    if((parseInt(obj.provincia) === parseInt($scope.Data.GEN_CLIENTES.PROVINCIA))
            && 
        (parseInt(obj.canton) === parseInt($scope.Data.GEN_CLIENTES.CANTON))
            && 
        (parseInt(obj.distrito) === parseInt($scope.Data.GEN_CLIENTES.DISTRITO))
      )
        return true;
    return false;
}



$scope.$watch('Data.GEN_CLIENTES.PROVINCIA',function(newValue,OldValue){
   if(newValue != null){
        //alert("no null");
        $scope.Cantones = allCantones.filter(filtroCanton);
       
        var fillProvincia =$interval(function(){
           if($("#Provincia option").length > 1){
               $interval.cancel(fillProvincia);
                $("#Provincia").val(newValue);
            }
       },100);
    }
});

$scope.$watch('Data.GEN_CLIENTES.CANTON',function(newValue,OldValue){
    
    if(newValue != null){
       $scope.Distritos = allDistritos.filter(filtroDistrito);
       var fillCanton =$interval(function(){
           if($("#canton option").length > 1){
               $interval.cancel(fillCanton);
               $("#canton").val(newValue);
            }
       },100);
    }
    
});

$scope.$watch('Data.GEN_CLIENTES.DISTRITO',function(newValue,OldValue){
    
    if(newValue != null){
       $scope.Ubicaciones = allUbicaciones.filter(filtroUbicaciones);
       var fillDistrito =$interval(function(){
           if($("#Distrito option").length > 1){
               $interval.cancel(fillDistrito);
               $("#Distrito").val(newValue);
            }
       },100);
    }
    
});

$scope.$watch('Data.GEN_CLIENTES.UBICACION',function(newValue,OldValue){
    
    if(newValue != null){
       $scope.Ubicaciones = allUbicaciones.filter(filtroUbicaciones);
       var fillUbicaciones =$interval(function(){
           if($("#Ubicacion option").length > 1){
               $interval.cancel(fillUbicaciones);
               $("#Ubicacion").val(newValue);
            }
       },100);
    }
});

//INSTANCIA CAMPOS AUTOCOMPLETE DE JQUERY UI
////$scope.FiltrosAutoComplete = function(){
  $( "#nombre" ).autocomplete({
        source: function( request, response ) {
         // Fetch data
         $.ajax({
          url: "autocompleteCliente.htm",
          type: 'post',
          dataType: "json",
          data: {
           search: request.term
          },
          success: function( data ) {
           //$scope.waitAutoCompleteCliente = false;
           //console.log(data);
            $timeout(function(){
              $scope.waitAutoCompleteCliente = false;

             },100);
          
          
           response( data );
          }
         });
        },
         //[{"label":"Jesus","value":"123","apellido" : "Rojas"},{"label":"Jose","value":"1"},{"label":"ademar","value":"3"}],
        select: function (event, ui) {
         
         //console.log(ui);
         
         $scope.waitAutoCompleteCliente = false;
         $timeout(function(){
            if(!isEmpty(ui.item.TIPO_IDENTIFICACION))
                 $scope.inp_tipo_cedula = String(parseInt(ui.item.TIPO_IDENTIFICACION));

               $scope.Data.GEN_CLIENTES.CEDULA = ui.item.CEDULA;
               if(ui.item.TIPO_IDENTIFICACION !== "02"){
                  var parts = ui.item.label.split(" ");
                  if(parts.length === 4){
                     $scope.nombre = ui.item.label.split(" ")[0];

                    if(!isEmpty(ui.item.label.split(" ")[1]))
                      $scope.nombre +=" "+ ui.item.label.split(" ")[1];

                    if(!isEmpty(ui.item.label.split(" ")[2]))
                      $scope.apellidouno = ui.item.label.split(" ")[2];

                    if(!isEmpty(ui.item.label.split(" ")[3]))
                      $scope.apellidodos = ui.item.label.split(" ")[3];
                  }else if(parts.length === 3){
                      $scope.nombre = ui.item.label.split(" ")[0];
                      
                      if(!isEmpty(ui.item.label.split(" ")[1]))
                        $scope.apellidouno =  ui.item.label.split(" ")[1];
                    
                    if(!isEmpty(ui.item.label.split(" ")[2]))
                      $scope.apellidodos = ui.item.label.split(" ")[2];
                  }
               }else
                   $scope.nombre = ui.item.label;

               if(!isEmpty(ui.item.PROVINCIA))
                 $scope.Data.GEN_CLIENTES.PROVINCIA = ui.item.PROVINCIA;
               
                if(!isEmpty(ui.item.CANTON))
                 $scope.Data.GEN_CLIENTES.CANTON = ui.item.CANTON;
             
                if(!isEmpty(ui.item.DISTRITO))
                 $scope.Data.GEN_CLIENTES.DISTRITO = ui.item.DISTRITO;
             
              if(!isEmpty(ui.item.UBICACION))
                 $scope.Data.GEN_CLIENTES.UBICACION = ui.item.UBICACION;
             
             if(!isEmpty(ui.item.NUM_TELE))
                 $scope.Data.GEN_CLIENTES.NUM_TELE = ui.item.NUM_TELE;
             
             if(!isEmpty(ui.item.CORREO))
                 $scope.Data.GEN_CLIENTES.CORREO = ui.item.CORREO;
             
             if(!isEmpty(ui.item.DIRECCION))
               $scope.Data.GEN_CLIENTES.DIRECCION =ui.item.DIRECCION;
             
           },100);
         $(this).attr("autocompletefill","true");
         return false;
        }
 });
 
 $( "#DESCRIPCION_PRODUCTO" ).autocomplete({
        source: function( request, response ) {
         // Fetch data
         $.ajax({
          url: "autocompleteProductos.htm",
          type: 'post',
          dataType: "json",
          data: {
           search: request.term
          },
          success: function( data ) {
          
            $timeout(function(){
              $scope.waitAutoCompleteProducto = false;

             },100);
           response( data );
          }
         });
        },
         //[{"label":"Jesus","value":"123","apellido" : "Rojas"},{"label":"Jose","value":"1"},{"label":"ademar","value":"3"}],
        select: function (event, ui) {
         // Set selection
         console.log(ui);
         $scope.waitAutoCompleteProducto = false;
         $timeout(function(){
           $scope.DetalleTemplate.DESCRIPCION_PRODUCTO = ui.item.label;
           function filterUnidad(obj){
               if(obj.medida === parseInt(ui.item.MEDIDA))
                   return true;
               return false;
           }
           $scope.DetalleTemplate.UNIDAD_MEDIDA = $scope.Unidades.filter(filterUnidad)[0].siglas;
            if(parseInt(ui.item.IMP_VENTAS)=== 0 ){          
                $scope.DetalleTemplate.IMP_VENTAS = 0;
                $scope.Excento = true;
                $scope.changeGravado();
            }else{
              
                $scope.DetalleTemplate.IMP_VENTAS = parseFloat(ui.item.IMP_VENTAS);
                $scope.Excento = false;
                $scope.changeGravado();
              
            }
         
             $scope.DetalleTemplate.DESCUENTO  =  parseFloat(ui.item.POR_DESCUENTO);
             if(!isEmpty(ui.item.MAESTRO.PRECIO_VENTA) && ui.item.MAESTRO.PRECIO_VENTA !== "null" ){
                 //alert($scope.isMobile);
                if(!$scope.isMobile){
                 /*if(User.getUser().ROLES.indexOf(4) !== -1){
                     var montoImpuesto = parseFloat(ui.item.MAESTRO.PRECIO_VENTA) *(parseFloat(ui.item.IMP_VENTAS) / 100);
                     $("#precioFormat").val(parseFloat(ui.item.MAESTRO.PRECIO_VENTA) - parseFloat(montoImpuesto));
                 }else */
                   $("#precioFormat").val(ui.item.MAESTRO.PRECIO_VENTA);
                }else if($scope.isMobile === true || $scope.isMobile === 'true'){
                  /*  if(User.getUser().ROLES.indexOf(4) !== -1){
                     var montoImpuesto = parseFloat(ui.item.MAESTRO.PRECIO_VENTA) *(parseFloat(ui.item.IMP_VENTAS) / 100);
                     $scope.DetalleTemplate.PRECIO_UNI = (parseFloat(ui.item.MAESTRO.PRECIO_VENTA) - parseFloat(montoImpuesto));
                   }else */
                    $scope.DetalleTemplate.PRECIO_UNI = ui.item.MAESTRO.PRECIO_VENTA;
                 }
            }
            
            $scope.DetalleTemplate.CATEGORIA = ui.item.CATEGORIA;
             
            $scope.DetalleTemplate.COD_PRODUCTO = ui.item.COD_PRODUCTO;
             
          },100);
        
          $(this).attr("autocompletefill","true");
                 //.ui-autocomplete-loading
         return false;
        }
 });
 
 $scope.modalCalculadoraDimensiones = function(){
     $scope.largo=0;
     $scope.ancho = 0;
     $( "#modalCaladoraDimensiones" ).dialog( "open" );
 }
 
  $scope.cerrarCalc1 = function(Tipo){
     if(Tipo === "A")
         $scope.DetalleTemplate.CANTIDAD = $scope.largo * $scope.ancho;
         $scope.largo=0;
         $scope.ancho = 0;
     $( "#modalCaladoraDimensiones" ).dialog( "close" );
     
 }
 
 $scope.openPrompt = function(Prompt,Map){
     //alert();
     $scope.curModal = Prompt;
     if(Prompt ==='grid2_INV_PRODUCTOS.htm')
         $scope.indexSelectedProd = Map;
   
    var PromptSrping = Prompt + "?LASTQUERY=false&MSG=null&TIPOMSG=null&COMPORTAMIENTO=P&FILTROSFIJOS=null&FILTROS=null&REGXPAGE=null&PAGINA=1&PETICION=J&CANT=10";
    
    
    $("#PROMPTWINDOW").attr("src",PromptSrping);
    $(".ui-dialog-buttonpane :input[type=button]").css("display","block");
    
    
    //alert($( "#modalPrompt" ).attr( "title"));
    $( "#modalPrompt" ).dialog( "open" );
   
    
     $( "#modalPrompt" ).dialog({
       open: function( event, ui ) {
           
       }
});

}

$scope.closePrompt = function (type){
    //alert(type);
    if(type ==="A"){
        var i = 0;
       try
       {
            rowSelected = JSON.parse($("#tempPrompt").html());
            //console.log($scope.indexSelectedProd,rowSelected);
            if($scope.curModal === "grid2_INV_PRODUCTOS.htm"){
                  $scope.DetalleTemplate.DESCRIPCION_PRODUCTO = rowSelected.DES_PRODUCTO ;
                    function filterUnidad(obj){
                        if(obj.medida === parseInt(rowSelected.MEDIDA))
                            return true;
                        return false;
                    }
                    $scope.DetalleTemplate.UNIDAD_MEDIDA = $scope.Unidades.filter(filterUnidad)[0].siglas;
                     if(parseInt(rowSelected.IMP_VENTAS)=== 0 ){          
                         $scope.DetalleTemplate.IMP_VENTAS = 0;
                         $scope.Excento = true;
                         $scope.changeGravado();
                     }else{

                         $scope.DetalleTemplate.IMP_VENTAS = parseFloat(rowSelected.IMP_VENTAS);
                         $scope.Excento = false;
                         $scope.changeGravado();

                     }

                      $scope.DetalleTemplate.DESCUENTO  =  parseFloat(rowSelected.POR_DESCUENTO);
                      if(!isEmpty(rowSelected.MAESTRO.PRECIO_VENTA) && rowSelected.MAESTRO.PRECIO_VENTA !== "null" ){
                          //alert($scope.isMobile);
                         if(!$scope.isMobile){
                          /*if(User.getUser().ROLES.indexOf(4) !== -1){
                              var montoImpuesto = parseFloat(ui.item.MAESTRO.PRECIO_VENTA) *(parseFloat(ui.item.IMP_VENTAS) / 100);
                              $("#precioFormat").val(parseFloat(ui.item.MAESTRO.PRECIO_VENTA) - parseFloat(montoImpuesto));
                          }else */
                            $("#precioFormat").val(rowSelected.MAESTRO.PRECIO_VENTA);
                         }else if($scope.isMobile === true || $scope.isMobile === 'true'){
                           /*  if(User.getUser().ROLES.indexOf(4) !== -1){
                              var montoImpuesto = parseFloat(ui.item.MAESTRO.PRECIO_VENTA) *(parseFloat(ui.item.IMP_VENTAS) / 100);
                              $scope.DetalleTemplate.PRECIO_UNI = (parseFloat(ui.item.MAESTRO.PRECIO_VENTA) - parseFloat(montoImpuesto));
                            }else */
                             $scope.DetalleTemplate.PRECIO_UNI = rowSelected.MAESTRO.PRECIO_VENTA;
                          }
                     }

                     $scope.DetalleTemplate.CATEGORIA = rowSelected.CATEGORIA;

                     $scope.DetalleTemplate.COD_PRODUCTO = rowSelected.COD_PRODUCTO;
            }
       }catch(Exception){
           //alertify.alert('Advertencia','Debe escoger un registro de la lista');
           return;
       }finally {
           $("#tempPrompt").html();
        }
        
    }
    $( "#modalPrompt" ).dialog( "close" );
}
 
 $(document).ready(function(){
   $("#precioFormat").inputmask("decimal",{
        alias: "decimal",
        radixPoint: ".",
        digits: 2,
        autoGroup: true,
        groupSeparator: ",",
        groupSize: 3,
        allowMinus: true,
        autoUnmask: true,
        onUnMask: function(maskedValue, unmaskedValue) {
        //do something with the value
        //console.log("unmaskedValue",unmaskedValue,maskedValue);
         return unmaskedValue;
      }
    });
    //$("#precioFormat").inputmask('remove');
    $("#DESCRIPCION_PRODUCTO").focusout(function() {
      
       $scope.waitAutoCompleteProducto = false;
    });
    
    $( "#modalCaladoraDimensiones" ).dialog({
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
    
});


//}

});





