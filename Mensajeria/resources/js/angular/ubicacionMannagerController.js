app.controller('ubicacionMannagerController', function($scope, orderByFilter, $timeout, $filter,
        formValidator, $timeout, $interval, $http) {

    var allCantones;
    $scope.Cantones;
    var allDistritos;
    var allUbicaciones;
    $scope.Distritos;

    $scope.PROVINCIA = $("#PROVINCIA").attr("value");
    $scope.CANTON = $("#CANTON").attr("value");
    $scope.DISTRITO = $("#DISTRITO").attr("value");
    $scope.UBICACION = $("#UBICACION").attr("value");
     
    //alert( $scope.PROVINICA);
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

    //FILTROS DE CANTON Y DISTRITO
    function filtroCanton(obj) {
        if (parseInt(obj.provincia) === parseInt($scope.PROVINCIA))
            return true;
        return false;
    }

    function filtroDistrito(obj) {
        if ((parseInt(obj.provincia) === parseInt($scope.PROVINCIA))
                &&
                (parseInt(obj.canton) === parseInt($scope.CANTON))
                )
            return true;
        return false;
    }

    function filtroUbicaciones(obj) {
        if ((parseInt(obj.provincia) === parseInt($scope.PROVINCIA))
                &&
                (parseInt(obj.canton) === parseInt($scope.CANTON))
                &&
                (parseInt(obj.distrito) === parseInt($scope.DISTRITO))
                )
            return true;
        return false;
    }

//

    $scope.$watch('PROVINCIA', function(newValue, OldValue) {
        //alert();
        //console.log('Provincia',newValue);
        if (newValue != null) {
            //alert("no null");
            $("#PROVINCIA").attr("value", newValue);

            var cantonesReady = $interval(function() {
                //alert("no if");
                if (allCantones !== undefined && allCantones.length > 0) {
                    //alert("if");
                    $interval.cancel(cantonesReady);
                    $scope.Cantones = allCantones.filter(filtroCanton);
                }
            }, 1000);


            var fillProvincia = $interval(function() {
                if ($("#Provincia option").length > 1) {
                    $interval.cancel(fillProvincia);
                    $("#Provincia").val(newValue);
                }
            }, 100);
        }
    });

    $scope.$watch('CANTON', function(newValue, OldValue) {
         //console.log('canton',newValue);
        if (newValue != null) {

            $("#CANTON").attr("value", newValue);

            var distritosReady = $interval(function() {
                if (allDistritos !== undefined && allDistritos.length > 0) {
                    $interval.cancel(distritosReady);
                    $scope.Distritos = allDistritos.filter(filtroDistrito);
                }
            }, 1000);

            var fillCanton = $interval(function() {
                if ($("#canton option").length > 1) {
                    $interval.cancel(fillCanton);
                    $("#canton").val(newValue);
                }
            }, 100);
        }

    });

    $scope.$watch('DISTRITO', function(newValue, OldValue) {
        console.log("Distrito",newValue);
        if (newValue != null) {
            $("#DISTRITO").attr("value", newValue);
            var ubicacionesReady = $interval(function() {
                if (allUbicaciones !== undefined && allUbicaciones.length > 0) {
                    $interval.cancel(ubicacionesReady);
                    $scope.Ubicaciones = allUbicaciones.filter(filtroUbicaciones);
                }
            }, 1000);

            var fillDistrito = $interval(function() {
                if ($("#Distrito option").length > 1) {
                    $interval.cancel(fillDistrito);
                    $("#Distrito").val(newValue);
                }
            }, 100);
        }

    });

    $scope.$watch('UBICACION', function(newValue, OldValue) {

        if (newValue != null) {
            /*$scope.Ubicaciones = allUbicaciones.filter(filtroUbicaciones);
             $("#UBICACION").attr("value",newValue); 
             var ubicacionesReady =  $interval(function(){
             if(allUbicaciones !== undefined && allUbicaciones.length > 0){
             $interval.cancel(ubicacionesReady);
             $scope.Ubicaciones = allUbicaciones.filter(filtroUbicaciones);
             }
             },1000);*/
            $("#UBICACION").attr("value", newValue);

            var fillUbicaciones = $interval(function() {
                if ($("#Ubicacion option").length > 1) {
                    $interval.cancel(fillUbicaciones);
                    $("#Ubicacion").val(newValue);
                }
            }, 100);
        }
    });
    
});

