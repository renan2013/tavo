app.factory("DBparametros", function() {


    var jsonPeticionL = [];
    var blob1 = "";
    var blob2 = "";



    var interfaz = {
        limpiarPeticiones: function() {
            jsonPeticionL = [];
        },
        //adiciona un parametro con operador
        // para efectos de transportar sin problema se cambian los simbolos de > POR MAYOR
        addParamOP: function(nombreParam, valor, memoria, nomMemoria, operador) {

            if (operador == "<")
                operador = "MENOR";
            if (operador == ">")
                operador = "MAYOR";
            
            if(operador.toUpperCase() === "CDATA")
                operador = "CDATA";

            //adicona una linea de Parametro, puede contener multiples lineas
            var jsonStr = {
                "parametro": nombreParam,
                "memoria": memoria, //M=No va en Memoria es por defecto R=Si va en Memoria
                "nombreMemoria": nomMemoria,
                "valor": valor,
                "operador": operador
            };



            jsonPeticionL.push(jsonStr);

        },
        //adiciona un parametro asumiendo que el operador es =
        // para efectos de transportar sin problema se cambian los simbolos de > POR MAYOR
        addParam: function(nombreParam, valor, memoria, nomMemoria) {
            //adicona una linea de Parametro, puede contener multiples lineas
            if (nombreParam.length > 0) {
                var jsonStr = {
                    "parametro": nombreParam,
                    "memoria": memoria, //M=No va en Memoria es por defecto R=Si va en Memoria
                    "nombreMemoria": nomMemoria, //M=Se envia  el valor con un nombre en Memoria 
                    "valor": valor, // si va por memoria puede ir nulo
                    "operador": "="
                }
                jsonPeticionL.push(jsonStr);
            };






        },
        getPeticiones: function() {
            return jsonPeticionL;
        }

    };
    return interfaz;
});

app.factory("DBpeticiones", function($location) {

    var xmlPeticioncf;
    var rutaservlet = '../../';
    var rutaservletAlternativa;
    var interfaz = {
        setAlternativa : function(param){
            rutaservletAlternativa = param;
        },
        addHeader: function(dml, objectId, cantParametros) {
            var jsonStr = '  {"dml":"' + dml + '","objectId":"' + objectId + '","cantParametros":"' + cantParametros + /* '","parametros": []*/ '"} ';

            return jsonStr;
        },

        bdRequestGen: function(jsonPeticionL, ObjectID, actionDml, ObjectName, Owner, Metodo) {
            var NumParametros = 0;
            //recorre para contar parametros
            angular.forEach(jsonPeticionL, function(todo, i) {
                NumParametros += 1;

            });
            var header;

            if (actionDml != "J" && actionDml != "P") {
                var jsonHeader = JSON.parse(this.addHeader(actionDml, ObjectID, NumParametros));
                jsonHeader.RegXPage = "0";
                jsonHeader.PaginaNumero = "0";
                jsonHeader.CampoOrden = "0";
                jsonHeader.DireccionOrden = "0";
                jsonHeader.ObjectName = ObjectName;
                jsonHeader.Owner = Owner;
                jsonHeader.Metodo = Metodo;
                jsonHeader.RutaLlamdo = 'G';
            } else {

                var split = ObjectID.split("_");
                var jsonHeader = JSON.parse(this.addHeader(actionDml, split[0], NumParametros));
                jsonHeader.RegXPage = split[1];
                jsonHeader.PaginaNumero = split[2];
                jsonHeader.CampoOrden = " ";
                jsonHeader.DireccionOrden = " ";
                jsonHeader.ObjectName = ObjectName;
                jsonHeader.Owner = Owner;
                jsonHeader.Metodo = Metodo;
                jsonHeader.RutaLlamdo = 'G';
            }
            jsonHeader.parametros = [];
            header = JSON.stringify(jsonHeader);
            // console.log("header:", header);
            parametrosBitacora = JSON.stringify(jsonPeticionL);
            response = this.getQUERYGENERALJ(header, parametrosBitacora);
            //console.log("J:", response);
            //console.log("objectId:",ObjectID,"response:",response);
            obj = [];
            var rows = null;
            var ok = $("success", response).text();
            if(ObjectID == "239"){
                responseStatus = $("GN_CODIGO_ERROR", response).text();
                //console.log("extract",responseStatus);
                if(responseStatus === '0')
                    ok = "S";
                else
                    ok = "N";
            }
            
            //console.log(ok,response);
            if (ok == "S") {
                if (actionDml == "E") {
                    if (ObjectID == "833")
                        rows = $("PV_JSON", $("SDT833", $("datos", response))).text();
                    if (ObjectID == "309") {
                        //rows=    $("GV_JTREE",$("SDT309", $("datos", response))).text();

                        xmlDoc = $.parseXML(response),
                            $xml = $(xmlDoc),
                            $title = $xml.find("GV_JTREE");
                        rows = $title.text();
                        //console.log("rows 309:",rows);
                    }
                    if (ObjectID == "313") {
                        xmlDoc = $.parseXML(response),
                            $xml = $(xmlDoc),
                            $title = $xml.find("GV_JTREE");
                        rows = $title.text();
                    }
                    if (ObjectID == "33") {
                        rows = {
                            "GV_RUTA_DESTINO": $("GV_RUTA_DESTINO", $("SDT33", $("datos", response))).text()
                        };
                        //console.log( rows);
                    }
                    if (ObjectID == "138") {
                        rows = {
                            "ERROR": $("GN_CODIGOERROR", $("SDT138", $("datos", response))).text()
                        };

                    }
                    
                    if(ObjectID === "249"){
                        console.log("bc",response);
                    }
                       //alert(ObjectID);
                    if(ObjectID === 239){
                        //alert("if");
                        rows = response;
                        //console.log("blog",response);
                    }


                } else {
                    if (ObjectID == "290") {
                        //console.log("if 290:",response);
                        var noCdata = response.replace("<![CDATA[", " ");
                        var noCdata2 = noCdata.replace("]]>", " ");
                        rows = $("rows", $("datos", noCdata2)).text();
                        //console.log("no cdata:",noCdata2);
                        // console.log("rows 290:",rows);
                    }
                    //rows=  $("rows",$("datos", response)).text();
                    //console.log('object ID',ObjectID);
                    else {
                        xmlDoc = $.parseXML(response),
                            $xml = $(xmlDoc);
                        rows = $xml.find("rows").text();
                        //console.log("response: ",response,'rows: ',rows);
                    }


                }
                //console.log(rows);
                if (actionDml == "I" || actionDml == "U" || actionDml == "D")
                    return 0;
                if (ObjectID == "138" ||ObjectID == 239 )
                    return rows;
                if (ObjectID != "33") {
                    //console.log("PRE JSON:", rows);
                    obj = JSON.parse(rows);
                } else
                    obj = rows;

                if (actionDml == "J" || actionDml == "P") {
                    xmlDoc = $.parseXML(response),
                        $xml = $(xmlDoc);
                    obj.page = $xml.find("page").text();
                    obj.total = $xml.find("total").text();
                    obj.registros = $xml.find("registros").text();
                }
                return obj;
            } else
                return response;
        },

        bdRequest: function(jsonPeticionL, ObjectID, actionDml) {
            $("#msgReport").css("display", "none");
            var NumParametros = 0;
            //recorre para contar parametros
            angular.forEach(jsonPeticionL, function(todo, i) {
                NumParametros += 1;

            });
            var header;

            if (actionDml != "J") {
                var jsonHeader = JSON.parse(this.addHeader(actionDml, ObjectID, NumParametros));
                jsonHeader.RegXPage = "0";
                jsonHeader.PaginaNumero = "0";
                jsonHeader.CampoOrden = "0";
                jsonHeader.DireccionOrden = "0";
                jsonHeader.ObjectName = "";
                jsonHeader.Owner = "";
                jsonHeader.Metodo = "";
                jsonHeader.RutaLlamdo = "";
            } else {
                var split = ObjectID.split("_");
                var jsonHeader = JSON.parse(this.addHeader(actionDml, split[0], NumParametros));
                jsonHeader.RegXPage = split[1];
                jsonHeader.PaginaNumero = split[2];
                jsonHeader.CampoOrden = " ";
                jsonHeader.DireccionOrden = " ";
                jsonHeader.ObjectName = "";
                jsonHeader.Owner = "";
                jsonHeader.Metodo = "";
                jsonHeader.RutaLlamdo = "";
            }
            jsonHeader.parametros = [];
            header = JSON.stringify(jsonHeader);
            //console.log("header:", header);
            parametrosBitacora = JSON.stringify(jsonPeticionL);
            response = this.getQUERYGENERALJ(header, parametrosBitacora);
            //console.log("objectId:",ObjectID,"response:",response);
            obj = [];
            var rows = null;

            if (actionDml == "E") {
                //console.log("E");
                if (ObjectID == "833")
                    rows = $("PV_JSON", $("SDT833", $("datos", response))).text();
                if (ObjectID == "309") {
                    //rows=    $("GV_JTREE",$("SDT309", $("datos", response))).text();

                    xmlDoc = $.parseXML(response),
                        $xml = $(xmlDoc),
                        $title = $xml.find("GV_JTREE");
                    rows = $title.text();
                    //console.log("rows 309:",rows);
                }
                if (ObjectID == "313") {
                    xmlDoc = $.parseXML(response),
                        $xml = $(xmlDoc),
                        $title = $xml.find("GV_JTREE");
                    rows = $title.text();
                }
                if (ObjectID == "33") {
                    rows = {
                        "GV_RUTA_DESTINO": $("GV_RUTA_DESTINO", $("SDT33", $("datos", response))).text()
                    };
                    //console.log( rows);
                }
                if (ObjectID == "138") {
                    rows = {
                        "ERROR": $("GN_CODIGOERROR", $("SDT138", $("datos", response))).text()
                    };

                }

                if (ObjectID == "301") {

                    response = response.replace("<![CDATA[", " ");
                    response = response.replace("]]>", " ");
                    var respuesta = $("SDT301", response)['0'].childNodes['0'];
                    var datos = $($(respuesta)['0'].children['0']);
                    rows = $(datos['0'].children['0']).text();
                }

                if (ObjectID === "319" || ObjectID === 3022 ) {

                    //console.log("response iniciadora", response);
                    rows = '{"GN_CODIGO_ERROR" :"' + $(response).find("GN_CODIGO_ERROR").text() + '", "GV_MENSAJE" : "' + $(response).find("GV_MENSAJE").text() + '"}'
                }
                //console.log(ObjectID);
                 if(ObjectID === 249){
                        //console.log("bc",response);
                        response = response.replace("<![CDATA[","");
                        response = response.replace("]]>","");
                        //console.log("bc",$(response).find("GLC_CLOB2"));
                       rows = $(response).find("GLC_CLOB2").text();
                       //console.log(rows);
                  }
                  
                  if(ObjectID === 3023){
                   try{  
                      response = response.replace("<![CDATA","");
                      response = response.replace("]>","");
                      //console.log("campos:",$(response).find("GV_CAMPOS").text());
                      var campos = $(response).find("GV_CAMPOS").text();
                      
                      if(campos.indexOf('"CSS_CLASS":"[') !== -1){
                          //reaplceText = '"CSS_CLASS":"[';
                          while(campos.indexOf('"CSS_CLASS":"[') !== -1){
                              //console.log("substr",campos.substring(campos.indexOf('"CSS_CLASS":"[')+13));
                              corte = campos.substring(campos.indexOf('"CSS_CLASS":"[')/*+13*/);
                              var temp = "";
                              var cssArray = "";
                              for (var i = 0, len = corte.length; i < len; i++) {
                                  
                                  temp+=corte.charAt(i);
                                  if(corte.charAt(i) === '"' &&  corte.charAt(i + 1) === '['){
                                      
                                  }else if(corte.charAt(i)=== '"' &&  corte.charAt(i -1) === ']'){
                                      
                                  }else
                                      cssArray+=corte.charAt(i);
                                  if(corte.charAt(i)=== '"' &&  corte.charAt(i -1) === ']'){
                                      //PARA SACA BLOQUE A REMPLAZAR
                                      break;
                                  }
                              }
                              
                              campos = campos.replace(temp,cssArray);
                          }
                          
                      }
                      //console.log(campos);
                      rows = {};
                      rows.campos = JSON.parse(campos);
                  }catch(Exception){
                      rows = response;
                      console.log("error encuensta:"+response);
                  }  
               }
               
               

            } else {
                //console.log("response:" + response);
                rows = $(response).find("rows").text();
                if (rows == "") {
                    response = response.replace("<![CDATA[", "");
                    response = response.replace("]]>", "");
                    rows = $(response).find("rows").text();
                }
            }
            //console.log(rows);
            if (actionDml == "I" || actionDml == "U" || actionDml == "D" || actionDml == "IU")
                return 0;
            if (ObjectID == "138" || ObjectID === 3023)
                return rows;
            if (ObjectID != "33") {
                //console.log("PRE JSON:", rows);
                try {
                    obj = JSON.parse(rows);
                } catch (Exception) {

                    if (response !== "SESSIONTIMEOUT") {
                        console.log("Error Javascript:" + Exception.message, "stack:", Exception.stack);
                        notificationsStore.clearAlerts();
                        notificationsStore.addAlerts({
                            type: 'danger',
                            msg: "Error parsejson en dsoa:" + response
                        });
                        notificationsStore.showAlerts();
                    } else
                        $location.path("/login-light");
                }
            } else
                obj = rows;
            return obj;
            /*} else
                return "error revisar request en db";*/
        },
        //Ademar, para atender peticiones de Ejecucion
        bdRequestE: function(jsonPeticionL, ObjectID, actionDml, campoExtrae) {
            var NumParametros = 0;
            //recorre para contar parametros
            angular.forEach(jsonPeticionL, function(todo, i) {
                NumParametros += 1;

            });

            header = this.addHeader(actionDml, ObjectID, NumParametros);
            parametrosBitacora = JSON.stringify(jsonPeticionL);
            response = this.getQUERYGENERALJ(header, parametrosBitacora);
            obj = [];
            var rows = null;
            var ok = $("success", response).text();
            var encabezado = "SDT" + ObjectID;

            /*
             *  ObjectID "833 PV_JSON 
                      309 GV_JTREE 
                      33") GV_RUTA_DESTINO 
                      */

            if (ok == "S") {
                rows = $(campoExtrae, $(encabezado, $("datos", response))).text();

                return obj;
            } else
                return "error revisar request en db";
        },
        //Ademar, para atender peticiones de Ejecucion Con el Con valores  LONG en Memoria MAXIMO 2 CAMPOS
        bdRequestEM: function(jsonPeticionL, ObjectID, actionDml, campoExtrae, valorLong1) {

            this.blob1 = valorLong1;


            var NumParametros = 0;
            //recorre para contar parametros
            var cuentaCamposLong = 0;
            var jsonStr = "";

            console.log(jsonPeticionL);
            var i = 0;



            jsonPeticionL.push(jsonStr);

            header = this.addHeader(actionDml, ObjectID, NumParametros);
            parametrosBitacora = JSON.stringify(jsonPeticionL);

            response = this.getQUERYGENERALJEM(header, parametrosBitacora);
            obj = [];
            var rows = null;
            var ok = $("success", response).text();
            var encabezado = "SDT" + ObjectID;



            if (ok == "S") {
                rows = $(campoExtrae, $(encabezado, $("datos", response))).text();
                return obj;
            } else
                return "error revisar request en db";
        },
        getQUERYGENERALJ: function(header, parametros) {
            /*var User = CurrentUser.getCurrentUser();
            if (!User)
                $location.path("/login-light");*/
            if (rutaservlet > "")
                var urlServer = rutaservlet + 'apajax_consultadinjson.htm'; // llama a ejecutar consultas dinamicas
            else
                var urlServer = 'apajax_consultadinjson.htm'; // llama a ejecutar consultas dinamicas
            //alert(urlServer);
            if(rutaservletAlternativa !== undefined)
                var urlServer = rutaservletAlternativa+'apajax_consultadinjson.htm';
            var retorno;
            var type = "text";
            //var type = "xml";
            //console.log(detectBrowser());
            //console.log(header);
            if (parametros > "")
            //alert( parametros);
                var data = {
                REQUEST: header,
                PARAMETROS: parametros,
                USUARIOWEB: 'DBPMS'
            };
            $.ajax({
                type: "POST",
                url: urlServer,
                dataType: type,
                data: data,
                cache: false,
                async: false,
                'beforeSend': function(xhr) {
                    xhr.overrideMimeType('text/html; charset=iso-8859-1');

                },
                success: function(data) {
                    retorno = data;

                    /*jsonHeader = JSON.parse(header);
                    if (jsonHeader.objectId == "301") {
                        console.log("succes", header, data);
                    }*/
                    xmlPeticioncf = data;

                },
                error: function(xhr, ajaxOptions, thrownError) {
                    //CurrentUser.getCurrentUser();
                    alert(xhr.status + " en: " + urlServer);
                    alert(thrownError);
                    var win = window.open("about:blank", "_blank");
                    win.document.title = "Eror del servidor";
                    win.document.write(xhr.responseText);
                    /*  if (xhr.status == '0') {
                          $location.path("/login-light");
                          return;
                      }
                      var connect = this.doGetSessionValue('RESPONSEPROFILEJSON');
                      if ($("success", sessionActive).text() == 'S') {
                          alert(xhr.status+" en: "+urlServer);
                          alert(thrownError);
                      } else
                          $location.path("/login-light");*/
                }
            });
            return retorno;
        },
        getQUERYGENERALJM: function(header, parametros, metodo) {
            /*var User = CurrentUser.getCurrentUser();
            if (!User)
                $location.path("/login-light");*/

            if (rutaservlet > "")
                var urlServer = rutaservlet + metodo; // llama a ejecutar consultas dinamicas
            else
                var urlServer = metodo; // llama a ejecutar consultas dinamicas

            var retorno;
            if (parametros > "")
            //alert( parametros);
                var data = {
                REQUEST: header,
                PARAMETROS: parametros,
                USUARIOWEB: 'DBPMS'
            };
            $.ajax({
                type: "POST",
                url: urlServer,
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
                    alert(xhr.status + " en: " + urlServer);
                    var win = window.open("about:blank", "_blank");
                    win.document.title = "Eror del servidor";
                    win.document.write(xhr.responseText);
                    alert(thrownError);
                }
            });
            return retorno;
        },

        getQUERYGENERALJEM: function(header, parametros) {

            /*var User = CurrentUser.getCurrentUser();
            if (!User)
                $location.path("/login-light");*/

            if (rutaservlet > "")
                var urlServer = rutaservlet + 'apajax_consultadinjson'; // llama a ejecutar consultas dinamicas
            else
                var urlServer = 'apajax_consultadinjson'; // llama a ejecutar consultas dinamicas


            var retorno;
            var valorblob = this.blob1;


            if (parametros > "")
            //alert( parametros);
                var data = {
                REQUEST: header,
                PARAMETROS: parametros,
                USUARIOWEB: 'DBPMS',
                "DATOS1": valorblob
            };
            console.log("parar ", parametros);
            console.log("JEM", data);
            $.ajax({
                type: "POST",
                url: urlServer,
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
                    alert(xhr.status + " en: " + urlServer);
                    var win = window.open("about:blank", "_blank");
                    win.document.title = "Eror del servidor";
                    win.document.write(xhr.responseText);
                    alert(thrownError);
                }
            });
            return retorno;
        },
        getQUERYGENERALJFile: function(FILE, file_name, detalleDocumento, fileSize, tipoDocumento, opciones,filejs) {

            /*var User = CurrentUser.getCurrentUser();
            if (!User)
                $location.path("/login-light");*/

            if (rutaservlet > "")
                var urlServer = rutaservlet + 'acmsservice.htm'; // llama a ejecutar consultas dinamicas
            else
                var urlServer = 'acmsservice.htm'; // llama a ejecutar consultas dinamicas  

             if(rutaservletAlternativa !== undefined)
                 var urlServer =rutaservletAlternativa + 'acmsservice.htm';

           
            if (opciones.DATOSCMS.FormatoImagen == 64 && FILE != null)
                opciones.DATOSCMS.RutaOrigen = FILE;
            if (tipoDocumento != null)
                opciones.DATOSCMSBD.DocumentoMimeType = tipoDocumento;
            if (file_name != null)
                opciones.DATOSCMSBD.NombreObjeto = file_name;
            if (detalleDocumento != null)
                opciones.DATOSCMSBD.Descripcion = detalleDocumento;
            if (fileSize != null)
                opciones.DATOSCMSBD.Size = fileSize;
            
            
            //opciones.DATOSCMS.RutaOrigen = "";
            
           /* var data = {
                "DATOSCMS": JSON.stringify(opciones.DATOSCMS),
                "DATOSCMSBD": JSON.stringify(opciones.DATOSCMSBD),
                "file" : filejs
            };*/
             if(filejs !== undefined && filejs.size >= 200000)
                 opciones.DATOSCMS.RutaOrigen = "";
             
             var data = new FormData();
             data.append("DATOSCMS",JSON.stringify(opciones.DATOSCMS));
             data.append("DATOSCMSBD",JSON.stringify(opciones.DATOSCMSBD));
             if(filejs !== undefined)
              data.append("file",filejs);
              
            //console.log("url:", urlServer);
            //console.log("data:",data);

            var retorno;


        retorno = $.ajax({
                type: "POST",
                url: urlServer,
                data: data,
                //dataType:"text",
                contentType: false,
                processData: false,
               /* cache: false,
                async: false,*/
                xhr: function () {
                        var xhr = new window.XMLHttpRequest();
                        xhr.upload.addEventListener("progress", function (evt) {
                            if (evt.lengthComputable) {
                                var percentComplete = evt.loaded / evt.total;
                                //console.log(percentComplete);
                                $('#Dprogress_'+opciones.id).css({
                                    width: percentComplete * 100 + '%'
                                });
                                $("#DprogressAvance_"+opciones.id).html(percentComplete * 100 + '%');
                                if (percentComplete === 1) {
                                  //  $('.progress').addClass('hide');
                                }
                            }
                        }, false);
                        xhr.addEventListener("progress", function (evt) {
                            if (evt.lengthComputable) {
                                var percentComplete = evt.loaded / evt.total;
                                //console.log(percentComplete);
                                $('#Dprogress').css({
                                    width: percentComplete * 100 + '%'
                                });
                            }
                        }, false);
                      return xhr;
                 },
                success: function(data) {
                   // retorno = data;
                    


                },
                error: function(xhr, ajaxOptions, thrownError) {

                    alert("fallo manejador de archivo:" + xhr.status + " en:" + urlServer);
                    $('#Dprogress').removeClass("progress-bar-success");
                     $('#Dprogress').addClass("progress-bar-danger");
                    $('#Dprogress').css({
                                    width: 15 + '%'
                     });
                    //console.log(xhr);
                    var win = window.open("about:blank", "_blank");
                    win.document.title = "Eror del servidor";
                    win.document.write(xhr.responseText);

                    alert(thrownError);
                }
            });

            return retorno;
        },
        RecuperaDoc: function(referencia, tipo) {
            /*var User = CurrentUser.getCurrentUser();
            if (!User)
                $location.path("/login-light");*/

            var rutaservlet = '../servlet/com.dbpmweb.';

            if (rutaservlet > "")
                var urlServer = rutaservlet + 'aatienedocumento'; // llama a ejecutar consultas dinamicas
            else
                var urlServer = 'aatienedocumento'; // llama a ejecutar consultas dinamicas  


            var data = {
                "REFERENCIA": referencia,
                "TIPODOCUMENTO": tipo
            };


            $.ajax({
                type: "POST",
                url: urlServer,
                dataType: "text",
                data: data,
                cache: false,
                async: false,
                'beforeSend': function(xhr) {
                    xhr.overrideMimeType('text/html; charset=iso-8859-1');

                },
                success: function(data) {
                    retorno = data;
                    console.log("retorno de Recupera imagen", data);


                },
                error: function(xhr, ajaxOptions, thrownError) {
                    alert(xhr.status + " en: " + urlServer);
                    var win = window.open("about:blank", "_blank");
                    win.document.title = "Eror del servidor";
                    win.document.write(xhr.responseText);
                    //alert(xhr.responseText);
                }
            });

            return retorno;
        },
        doLogin: function(user, pass, firma) {
            //alert(user);
            if (rutaservlet > "")
                var urlServer = rutaservlet + 'apwraplogin.htm'; // llama a ejecutar consultas dinamicas
            else
                var urlServer = 'apwraplogin.htm'; // llama a ejecutar consultas dinamicas

            //alert(urlServer);
            var retorno;
            var data = {};
           if(user !== "VERIFICA")
                data = {
                    PASS: pass,
                    USUARIOWEB: user,
                    FIRMA: firma
                };
           else
              data = {
                    PASS: pass,
                    VERIFICA : "true"
                }; 
            $.ajax({
                type: "POST",
                url: urlServer,
                dataType: "text",
                data: data,
                cache: false,
                async: false,
                'beforeSend': function(xhr) {
                    xhr.overrideMimeType('text/html; charset=iso-8859-1');

                },
                success: function(data) {
                    //console.log("response", data);
                    /*var correccion = data.replace("<![CDATA[", " ");
                    var nocdata = correccion.replace("]]>", " ");
                    console.log(nocdata.split("<Firma>"));
                    var response = JSON.parse(nocdata.split("<Firma>")[1].split("</Firma>")[0]).Header;

                    console.log("response convertido ",response.Error);*/
                    //console.log($("result", data).text());
                  if(user !== "VERIFICA"){ 
                    if (data == 0)
                        retorno = "S";
                    else
                        retorno = data;
                  }else
                      retorno = data;
                },
                error: function(xhr, ajaxOptions, thrownError) {
                    /*alert("error de loging ");
                     alert("ENTRO ERROR: " + xhr.status);
                     alert(thrownError);*/
                    location.reload();
                }
            });
            //console.log(retorno);
            return retorno;
        },
        setSessionValue: function(nombre, valor) {
            var retorno;
            var type = "text";
            if (rutaservlet > "")
                var urlServer = rutaservlet + 'apajax_setvalue'; // llama a ejecutar consultas dinamicas
            else
                var urlServer = 'apajax_setvalue'; // llama a ejecutar consultas dinamicas

            var data = {
                "variable": nombre,
                "valor": valor
            }

            $.ajax({
                type: "POST",
                url: urlServer,
                dataType: type,
                data: data,
                cache: false,
                async: false,
                'beforeSend': function(xhr) {
                    xhr.overrideMimeType('text/html; charset=iso-8859-1');

                },
                success: function(data) {
                    retorno = data;
                    console.log("succesSession:", data);
                    xmlPeticioncf = data;

                },
                error: function(xhr, ajaxOptions, thrownError) {
                    alert(xhr.status + " en: " + urlServer);
                    var win = window.open("about:blank", "_blank");
                    win.document.title = "Eror del servidor";
                    win.document.write(xhr.responseText);
                    alert(thrownError);
                }
            });

            return retorno;

        },
        doGetSessionValue: function(paramName) {

            if (rutaservlet > "")
                var urlServer = rutaservlet + 'apajax_getvalue.htm'; // llama a ejecutar consultas dinamicas
            else
                var urlServer = 'apajax_getvalue.htm'; // llama a ejecutar consultas dinamicas

            var retorno;

            var data = {
                "SESSIONVAR": paramName
            };
            $.ajax({
                type: "POST",
                url: urlServer,
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
                    alert(xhr.status + " en: " + urlServer);
                    var win = window.open("about:blank", "_blank");
                    win.document.title = "Eror del servidor";
                    win.document.write(xhr.responseText);
                    alert(thrownError);
                }
            });
            return retorno;

        },

        doLogout: function() {

            if (rutaservlet > "")
                var urlServer = rutaservlet + 'aplogout.htm'; // llama a ejecutar consultas dinamicas
            else
                var urlServer = 'aplogout.htm'; // llama a ejecutar consultas dinamicas

            var retorno;

            //var data= {PASS:pass,USUARIOWEB:user};
            $.ajax({
                type: "POST",
                url: urlServer,
                dataType: "text",
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
                    var win = window.open("about:blank", "_blank");
                    win.document.title = "Eror del servidor";
                    win.document.write(xhr.responseText);
                    alert(xhr.status + " en: " + urlServer);
                    alert(thrownError);
                }
            });

            var ok = $("success", retorno).text();

            return ok;
        }
    };



    return interfaz;
});