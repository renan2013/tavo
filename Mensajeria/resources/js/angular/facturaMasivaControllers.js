app.controller('facturaMasivaController', function($scope, orderByFilter, $timeout,$filter,User,
formValidator,$timeout,$interval,$http) {
   
     //alert(isMobileDevice());
    $scope.isMobile = isMobileDevice();
    $scope.Emisor = User.getEmisor();
    $scope.codBarraBdComplete = false;
    $scope.searchIndex = -1;
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
    
     
 $scope.omitClient = function(){
     //alert();
     if($scope.omitRecpetor){
         //$scope.omitRecpetor = false;
         $scope.Data.INV_SALIDAS.IND_RECEPTOR = "N";
         $scope.Data.GEN_CLIENTES = $scope.getData().GEN_CLIENTES;
         $scope.Data.GEN_CLIENTES.COD_CLIENT = 1;
         
         //$("#datos_receptor").remove();
     }else{
         //$scope.omitRecpetor = true;
         $scope.Data.GEN_CLIENTES = $scope.getData().GEN_CLIENTES;
         $scope.Data.INV_SALIDAS.IND_RECEPTOR = "S";
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

$scope.getData = function(TIPO,INFO){
   // alert();
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
		"TIPO_IDENTIFICACION": "1",
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
            "COD_AGENCIA":"1", 
            //"TIPO_VENTA":null, 
            "TIPO_VENTA" : "E",
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
            "TIPO_PRECIO":"01", 
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
    data.GENERICOS.COD_AGENCIA = 1;
    var temp = JSON.parse(atob(INFO));
    data.INV_SALIDAS.COMPROBAN = temp.COMPROBAN;
    data.INV_SALIDAS.TIPO_VENTA = temp.TIPO_VENTA;
    data.INV_SALIDAS.TIPO_DOCUMENTO_HACIENDA = temp.TIPO_DOCUMENTO_HACIENDA;
    data.GEN_CLIENTES.COD_CLIENT = temp.COD_CLIENT;
    
    //COMPROBANT, TIPO_VENTA,TIPO_DOC
    //console.log("data",data);
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
                $("#datos_receptor :input").attr("disabled", true);
                $("#Sub_container :input").attr("disabled", true);
            }else{
                $("#datos_receptor").css("display","block");
                $("#botoneraArribaTab").css("display","block");
                $("#Sub_container").css("display","block");
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
 		"COD_AGENCIA": "1", 
 		"TIPO_VENTA": null,
 		"COMPROBAN": null,
 		"CATEGORIA": 1,
 		"COD_PRODUCTO": null,
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

function fillProductos(obj){
             try{ 
              if((obj.CANTIDAD !== null && parseFloat(obj.CANTIDAD)>0 ) && (obj.COD_PRODUCTO !== null && parseFloat(obj.COD_PRODUCTO) )){
                  return true;
              }
              return false;
            }catch(Ex){
              return false;
            }
}
 
$scope.encabezado_factura = function(Operacion,Tipo){
    
       var bdSave = {};
       
       formValidator.doValidation("datos_receptor",["required"]);    
       
       if(formValidator.getError()){
       alertify.error('Error revise el formulario por favor'); 
       return;
      }
           
       formValidator.doValidation("Sub_container",["required"]);
       
       if(formValidator.getError()){
       alertify.error('Error revise el formulario por favor'); 
       return;
      }
        
      if((Tipo === 'N' && Operacion === 2) && $scope.Data.INV_SALIDAS_DETA.length === 0 ){
             alertify.warning('Debe ingresar al menos un detalle de factura'); 
             return;               
       }
        $scope.Data.GEN_CLIENTES.NOMBRE = $scope.nombre + " "+$scope.apellidouno+" "+$scope.apellidodos;
        $scope.Data.INV_SALIDAS.NOMBRE = $scope.nombre + " "+$scope.apellidouno+" "+$scope.apellidodos;
        $scope.Data.GEN_CLIENTES.TIPO_IDENTIFICACION = $scope.inp_tipo_cedula;
        //console.log("Data",JSON.stringify($scope.Data));
        var tempEnvio = {};
        
        angular.copy($scope.Data,tempEnvio);
        
        console.log("temp",tempEnvio,$scope.Data);
        
     //MANEJO DE PARCHE DE EMERGENCIA CORREGUIR CAMPO DESCUENTO
      /* if(tempEnvio.INV_SALIDAS_DETA.length > 0){
           var tempLoop = tempEnvio.INV_SALIDAS_DETA;
           tempEnvio.INV_SALIDAS_DETA = [];
           $(tempLoop).each(function(index,el){
               if(el.DESCUENTO > 0){
                   descuento = (el.TOTAL_UNI)*(el.DESCUENTO/100);
                   el.DESCUENTO = descuento;
               } 
               tempEnvio.INV_SALIDAS_DETA.push(el);
           });
       }*/
       
       
       if(Operacion === 1){
          tempEnvio.INV_SALIDAS_DETA = [];
      }else{
          var bdDetalleArray = [];
           bdDetalleArray = tempEnvio.INV_SALIDAS_DETA.filter(fillProductos);
          $(bdDetalleArray).each(function(index,el){
              delete bdDetalleArray[index]["VENTAORI"];
              delete bdDetalleArray[index]["COD_BARRA"];
              delete bdDetalleArray[index]["DES_PRODUCTO"];
              console.log("loopdelete",bdDetalleArray[index]);
          });
          tempEnvio.INV_SALIDAS_DETA = bdDetalleArray;
      }
       
         var encabezado = jsonToXml("DATA",tempEnvio);
       
       console.log("ENCABEZADO:",encabezado);
      // console.log("DATA",JSON.stringify($scope.Data));
      // console.log("Encabezado:",encabezado);
      var success;
      msgConfirm = "";
     if(Tipo === 'N'){
       /*   msgConfirm = 'Seguro de que desea guardar la información de la factura?';
      
     
        var r = confirm(msgConfirm);
        if (r == true) {*/
            $scope.executeBdEncabezado(Operacion,Tipo,encabezado);
        /*} else {
            
        }*/
   }else if(Tipo === 'S')
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
            var reporterData = {};
            var bdDetalleArray = [];
            //reporterData = $scope.Data;
            angular.copy($scope.Data,reporterData);
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
            if(parseInt($scope.Data.INV_SALIDAS.FA_CODIGOMONEDA) === 1)
                reporterData.INV_SALIDAS.FA_TIPOCAMBIO = undefined;
            if($scope.Data.INV_SALIDAS.TIPO_VENTA !== "C")
                reporterData.INV_SALIDAS.FE_PLAZO_VENTA = undefined;
            reporterData.INV_SALIDAS.MONTO_TOTAL = $scope.MontoTotal;
            reporterData.INV_SALIDAS.FE_SUB_TOTAL = $scope.descuentos;
            //reporterData.INV_SALIDAS.MONTO_DESCUENTO = $scope.sub_totals;
            reporterData.INV_SALIDAS.MONTO_DESCUENTO = $scope.totalSubComp
            reporterData.INV_SALIDAS.MONTO_IMPUESTO = $scope.total_impuests;
            reporterData.INV_SALIDAS.FA_TOTALVENTA = $scope.total_factura;
            reporterData.GEN_CLIENTES.NOMBRE = $scope.nombre + " "+$scope.apellidouno+" "+$scope.apellidodos;
            reporterData.INV_SALIDAS.NOMBRE = $scope.nombre + " "+$scope.apellidouno+" "+$scope.apellidodos;
            if(!isEmpty($scope.Emisor.BASE64_AVATAR))
                reporterData.logo = $scope.Emisor.BASE64_AVATAR;
            //FIX DETALLE PARA LINEA LINEA
                bdDetalleArray = reporterData.INV_SALIDAS_DETA.filter(fillProductos);

                $(bdDetalleArray).each(function(index,el){
                  bdDetalleArray[index]["DESCRIPCION_PRODUCTO"] = bdDetalleArray[index]["DES_PRODUCTO"];
                  var precioUni = el.PRECIO_UNI *(1 + (el.IMP_VENTAS / 100))
                   bdDetalleArray[index]["PRECIO_UNI"] = precioUni;
              });
              reporterData.INV_SALIDAS_DETA = bdDetalleArray;
              reporterData.FAC_LINEA = true;
            console.log("reporter:",reporterData);
            setLocalStorage("reporter",JSON.stringify(reporterData));
            
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
                    $("#tempReporter").attr("src","resources/reporterHtml/"+$scope.Emisor.REPORTER_FORM);
                 }
                 document.getElementById('tempReporter').onload = function() {
                    var reporterFull = $interval(function(){
                         $scope.base64PdfBD = getLocalStorage('Base64reporter');
                         if($scope.base64PdfBD && !isEmpty($scope.base64PdfBD)){
                             $interval.cancel(reporterFull);
                             deleteLocalStorage("Base64reporter");
                            // $scope.base64PdfBD = $scope.base64PdfBD.replace("data:application/pdf;base64,","");
                             
                             base64pdf = $scope.base64PdfBD.replace("data:application/pdf;base64,","");
                             goBd = true;
                         }

                     },1000);
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
                                     console.log(bdSave);
                                       if(bdSave.Error !== '0'){
                                           console.log(bdSave.Error);
                                           try{
                                             alertify.alert('Error en ejecucion base de datos',bdSave.Error); 
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
                                    
                                   alertify.success('Factura Guardada con Éxito');
                                   $scope.Data.GEN_CLIENTES = bdSave.GEN_CLIENTES;
                                   $scope.Data.INV_SALIDAS = bdSave.INV_SALIDAS;
                                   var loopDeta = $scope.Data.INV_SALIDAS_DETA;
                                   $(loopDeta).each(function(index,el){
                                       $scope.Data.INV_SALIDAS_DETA[index].COMPROBAN = bdSave.INV_SALIDAS.COMPROBAN;
                                       $scope.Data.INV_SALIDAS_DETA[index].CONSECUTIVO = (index + 1);
                                   });
                                   //agrega.CONSECUTIVO = consecutivo;
                                   $scope.encabezado_factura(2, 'N');
                                    
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
        deleteLocalStorage("facTemp");
        setLocalStorage("facTemp",$scope.base64PdfBD);
        window.open("visorIframe.htm?Title="+"Factura"+"&doc=facTemp","_blank");
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
                                  alertify.success('Factura Procesada con éxito en el ministerio de hacienda'); 
                                 $timeout(function(){
                                     $scope.endProcess = true;
                                  $("#cantidad").focusin();
                                  $("#cantidad").focusout();
                                 },500);
                                  
                              }else if(bdResponse.Verificacion !== undefined){
                                   alertify.error('Factura '+bdResponse.Verificacion['ind-estado'] +' por hacienda'); 
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
    //console.log(isEmpty(newValue),newValue.length,$scope.inp_tipo_cedula);
     if(isEmpty($("#nombre").attr("autocompletefill")) || $("#nombre").attr("autocompletefill") !== "true"){
        if(!isEmpty(newValue) && newValue.length >= 9 && parseInt($scope.inp_tipo_cedula) === 1){
           $scope.buscar_emisor(newValue,$scope.inp_tipo_cedula);
        }else if((!isEmpty(newValue) && newValue.length >= 10) && parseInt($scope.inp_tipo_cedula) === 2){
            $scope.buscar_emisor(newValue,$scope.inp_tipo_cedula);
        }
        
     }
     
     $("#nombre").attr("autocompletefill","false");
    
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
 
 //$scope.initProcess = function(TIPO,INFO){
   $scope.Data = $scope.getData('','');
// }
$scope.initDetalle = function(){
    for(i = 0 ; i < 10; i++){
     
     $scope.Data.INV_SALIDAS_DETA.push($scope.getDetalleTemplate());
    }
}

//BUSQUEDA POR CODIGO DE BARRA 
$scope.codigoBarraLoad = function(index){
     //console.log($scope.Data.INV_SALIDAS_DETA[index].COD_PRODUCTO);
     if($scope.Data.INV_SALIDAS_DETA[index].COD_PRODUCTO === null){
        //console.log($scope.Data.INV_SALIDAS_DETA[index].COD_BARRA);
         $scope.Data.INV_SALIDAS_DETA[index].COD_PRODUCTO = "Cargando";
         $scope.codBarraBdComplete = false;
         $scope.searchIndex = index;
         //console.log(index);
         $timeout(function(){
             //ESPERA A QUE EL CODIGO DE BARRAS ESTE COMPLETO
                $.ajax({
               type : "POST",
                url : "searchProductos.htm",
                async: false,
                data : {COD_BARRA:$scope.Data.INV_SALIDAS_DETA[index].COD_BARRA},
                timeout : 100000,
                'beforeSend' : function(xhr) {
                   xhr.overrideMimeType('text/html; charset=iso-8859-1');

                   },
                  success : function(data) {
                    var success;
                       try
                       {
                         var dataProducto = JSON.parse(data.trim())[0];
                          if(dataProducto !== undefined){
                            
                            $scope.codBarraBdComplete = true;

                            /*$scope.Data.INV_SALIDAS_DETA[index].COD_PRODUCTO = dataProducto.COD_PRODUCTO;
                            $scope.Data.INV_SALIDAS_DETA[index].CANTIDAD = 1;
                            $scope.Data.INV_SALIDAS_DETA[index].DES_PRODUCTO = dataProducto.DES_PRODUCTO;
                            //$scope.Data.INV_SALIDAS_DETA[index].PRECIO_UNI = dataProducto.MAESTRO.PRECIO_VENTA / (1 + (dataProducto.IMP_VENTAS/100));
                            $scope.Data.INV_SALIDAS_DETA[index].PRECIO_UNI =dataProducto.MAESTRO.PRECIO_VENTA;
                            eval("$scope.Data.INV_SALIDAS_DETA["+index+"].VENTAORI = dataProducto.MAESTRO.PRECIO_VENTA;");
                            $scope.Data.INV_SALIDAS_DETA[index].IMP_VENTAS = dataProducto.IMP_VENTAS;
                            $scope.calculoRow(index);

                            $("#codBarra_"+(index + 1)).focus();*/
                              $scope.despliegueLinea(index,dataProducto);
                          }else{
                              $scope.codBarraBdComplete = true;
                              $scope.Data.INV_SALIDAS_DETA[index].COD_PRODUCTO = "No encontrado";
                              
                          }

                     }catch(Exception){
                         alert("Producto no encontrado");
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
                }
             });
         },500);
         
     }
 }
 
 $scope.despliegueLinea = function(index ,dataProducto){
   try{
        $scope.Data.INV_SALIDAS_DETA[index].COD_PRODUCTO = dataProducto.COD_PRODUCTO;
        $scope.Data.INV_SALIDAS_DETA[index].CANTIDAD = 1;
        $scope.Data.INV_SALIDAS_DETA[index].DES_PRODUCTO = dataProducto.DES_PRODUCTO;
        //$scope.Data.INV_SALIDAS_DETA[index].PRECIO_UNI = dataProducto.MAESTRO.PRECIO_VENTA / (1 + (dataProducto.IMP_VENTAS/100));
        $scope.Data.INV_SALIDAS_DETA[index].PRECIO_UNI =dataProducto.MAESTRO.PRECIO_VENTA;
        eval("$scope.Data.INV_SALIDAS_DETA["+index+"].VENTAORI = dataProducto.MAESTRO.PRECIO_VENTA;");
        $scope.Data.INV_SALIDAS_DETA[index].IMP_VENTAS = parseFloat(dataProducto.IMP_VENTAS);
        $scope.Data.INV_SALIDAS_DETA[index].UNIDAD_MEDIDA = parseInt(dataProducto.MEDIDA);
        console.log($scope.Data.INV_SALIDAS_DETA[index]);
        $scope.calculoRow(index);
        $("#codBarra_"+(index + 1)).focus();
        
     }catch(Exeption){
         console.log(Exeption);
         console.trace();
     }
     
 }
 
 $scope.calculoRow = function(index,precioUniFijo){
     //alert();
     var tempCalc = $scope.Data.INV_SALIDAS_DETA[index];
     tempCalc.VENTAORI = parseFloat(tempCalc.VENTAORI);
     console.log(tempCalc);
     
      $scope.Data.INV_SALIDAS_DETA[index].TIPO_VENTA = $scope.Data.INV_SALIDAS.TIPO_VENTA;
      $scope.Data.INV_SALIDAS_DETA[index].COMPROBAN = $scope.Data.INV_SALIDAS.COMPROBAN;
      $scope.Data.INV_SALIDAS_DETA[index].TIPO_DOCUMENTO_HACIENDA = $scope.Data.INV_SALIDAS.TIPO_DOCUMENTO_HACIENDA;
      
      $scope.Data.INV_SALIDAS_DETA[index].TOTAL_UNI = $scope.Data.INV_SALIDAS_DETA[index].CANTIDAD * tempCalc.VENTAORI;
      
      $scope.Data.INV_SALIDAS_DETA[index].PRECIO_VENTA = parseFloat(tempCalc.VENTAORI);
      $scope.Data.INV_SALIDAS_DETA[index].FE_SUB_TOTAL =  $scope.redondeo(tempCalc.TOTAL_UNI / (1 + (tempCalc.IMP_VENTAS / 100)));
      $scope.Data.INV_SALIDAS_DETA[index].MONTO_CON_IVA = $scope.Data.INV_SALIDAS_DETA[index].FE_SUB_TOTAL;
      $scope.Data.INV_SALIDAS_DETA[index].PRECIO_UNI = tempCalc.VENTAORI / (1 + (tempCalc.IMP_VENTAS/100));
      if(tempCalc.CONSECUTIVO === undefined){
          var consecutivo = 0;
          try{
            consecutivo =  $scope.Data.INV_SALIDAS_DETA[index - 1 ].CONSECUTIVO + 1;
          }catch(Exception){
              consecutivo = index;
          }
          
          $scope.Data.INV_SALIDAS_DETA[index].CONSECUTIVO = consecutivo;
      }
     
             
     //$scope.Data.INV_SALIDAS_DETA[index].FE_SUB_TOTAL = producto.TOTAL_UNI
     $scope.actualiza_tabla(); 
     $scope.calcTotales();
 }
 
 $scope.calcTotales = function(){
     $scope.SumTable("precioUniColumn","MontoTotal");
     $scope.SumTable("subTotalColumn","totalSubComp");
     $scope.SumTable("ImpColumn","total_impuests");
     $scope.SumTable("TotalColumn","total_factura");
 }
 
$scope.SumTable = function(column,scopeValue){
 $timeout(function(){ 
        var sum = 0 ;
       $("."+column).each(function() {

        var value = $(this).text();
        
        // add only if the value is number
        value = value.replace(",","");
            if(!isNaN(value) && !isEmpty(value)) {
                var temp = parseFloat(value);
                sum += temp;
                
            }
       });
       sum = $scope.redondeo(sum);
       eval("$scope."+scopeValue+"="+sum);
   },1000);
}
 
 
 //MODAL
 $scope.curModal = "";
 $scope.indexSelectedProd = -1;
 $scope.openPrompt = function(Prompt,Map){
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
    
    if(type ==="A"){
        var i = 0;
       try
       {
            rowSelected = JSON.parse($("#tempPrompt").html());
            console.log($scope.indexSelectedProd,rowSelected);
            if($scope.curModal === "grid2_INV_PRODUCTOS.htm"){
                $scope.despliegueLinea($scope.indexSelectedProd,rowSelected);
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
});


