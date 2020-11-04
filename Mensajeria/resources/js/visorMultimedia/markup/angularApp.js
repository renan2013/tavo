var app = angular.module('imageEditor', []);

app.controller("mainCtrl", function($scope, $timeout, $interval) {
    $scope.editar = false;
    $scope.cargando = true;
    $scope.personalizada = false;
    $scope.img;
    $scope.imgPersonalizada;
    var imgProperties;
    var checkReferencia = $interval(function() {

        if (referencia) {
            $scope.stopCheck();
        }
    }, 10);

    $scope.stopCheck = function() {
        $scope.cargando = true;
        //alert("stopCheck");
        $interval.cancel(checkReferencia);
        $timeout(function() {
            var opciones = JSON.parse(localStorage.getItem("parametrosCMS_" + referencia))
            if (!opciones.rutarelavita) {
                var img = $scope.llamarImg(1);
                $xml = $(img);
                $scope.img = $xml.find("rutaRelativa").text();
                $scope.imgPersonalizada = $xml.find("referenciapersonalizada").text();
                opciones.rutarelavita = $xml.find("rutaRelativa").text();
                opciones.personalizada = $xml.find("referenciapersonalizada").text();
                localStorage.setItem("parametrosCMS_" + referencia, JSON.stringify(opciones));
            } else {
                $scope.img = opciones.rutarelavita;

                if (opciones.personalizada != 0)
                    $scope.imgPersonalizada = opciones.personalizada;
            }
            $("#printablediv").css("display", "block");
            $scope.cargando = false;
        }, 10);

        /*imgProperties = JSON.parse(localStorage.getItem("imgDetalles_"+referencia));
   
    if(imgProperties.ReferenciaPersonalizada != '0'){
       $scope.personalizada = true;
    }*/

    }



    $scope.activateEdit = function() {
        //alert();
        //alert(imagen);
        //window.open("Markup.jsp?imagen="+imagen+"&referencia="+referencia,"_self");

        if ($scope.imgPersonalizada && $scope.imgPersonalizada == 0) {

            window.open("Markup.jsp?imagen=" + $scope.img + "&referencia=" + referencia, "_self");

        } else {
            $scope.cargando = true;
            $timeout(function() {
                //alert($scope.imgPersonalizada);
                var copiaPersonalizada = $scope.llamarImg(2);
                $xml = $(copiaPersonalizada);
                var path = $xml.find("rutaRelativa").text();
                var referenciaUpdate = $xml.find("referencia").text();
                window.open("Markup.jsp?imagen=../../" + path + "&referencia=" + referencia + "&referenciaUpdate=" + referenciaUpdate, '_self');
                $scope.cargando = false;
            }, 100);
        }

    }

    $scope.verCopias = function() {
        $scope.cargando = true;

        $timeout(function() {
            var copiaPersonalizada = $scope.llamarImg(2);
            $xml = $(copiaPersonalizada);
            var path = $xml.find("rutaRelativa").text();
            window.open("../../" + path, '_blank');
            $scope.cargando = false;
        }, 100);



    }

    $scope.llamarImg = function(tipo) {
        //alert("parametrosCMS_"+referencia);
        var opciones = JSON.parse(localStorage.getItem("parametrosCMS_" + referencia));
        opciones.DATOSCMS.CodigoPeticion = 6;

        if (tipo == 1)
            opciones.DATOSCMS.Referencia = referencia;

        if (tipo == 2)
            opciones.DATOSCMS.Referencia = $scope.imgPersonalizada;

        opciones.DATOSCMS.InsertarBd = "N";

        var rutaservlet = '../servlet/com.dbpmweb.';

        if (rutaservlet > "")
            var urlServer = rutaservlet + 'acmsservice'; // llama a ejecutar consultas dinamicas
        else
            var urlServer = 'acmsservice';

        /*if(opciones.DATOSCMS.FormatoImagen == 64 && FILE != null)
               opciones.DATOSCMS.RutaOrigen = FILE; */


        var data = {
            "DATOSCMS": JSON.stringify(opciones.DATOSCMS),
            "DATOSCMSBD": JSON.stringify(opciones.DATOSCMSBD)
        };

        console.log("dataCMS:", data);
        var retorno;


        $.ajax({
            type: "POST",
            url: urlServer,
            data: data,
            cache: false,
            async: false,
            success: function(data) {
                retorno = data;
                console.log("retorno de SERVICIO Archivos:", data);


            },
            error: function(xhr, ajaxOptions, thrownError) {

                alert("fallo sube archivo:" + xhr.status);
                alert(thrownError);
            }
        });

        return retorno;
    }


});