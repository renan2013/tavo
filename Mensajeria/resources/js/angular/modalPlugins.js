app.factory('modalBpm', function($modal, $timeout, $window, $interval) {
    var modalTemplates = "resources/tpls/templateModal.html";
    var modalWindow;

    var modalParms = {};
    var result = null;
    var alternativa;
    var factory = {
        windowOpen: false,
        limpiarParametros: function() {
            modalParms = {};
            result = null;
            alternativa = undefined;
            modalTemplates = "resources/tpls/templateModal.html";
        },
        setRutaAlternativa : function(pAlternativa){
            alternativa =pAlternativa;
        },
        setParametros: function(param) {
            modalParms = param;
        },
        getParametros: function() {
            return modalParms;
        },
        open: function() {
            //$("#modalWrap").addClass("modal-backdropDivisoft");
            if(!isEmpty(alternativa))
                modalTemplates = alternativa + modalTemplates;
            factory.windowOpen = true;
            modalWindow = $modal.open({
                templateUrl:  modalTemplates,
                //size: undefined,
                //backdrop: typeof modal_backdrop == 'undefined' ? true : modal_backdrop
                // windowClass: 'my-dialog',
                controller: 'modalMain',
                backdrop: modalParms.backdrop,
                keyboard: modalParms.keyboard,
                resolve: {
                    items: function() {
                        /*var opciones = {
                            "template": modalParms.template,
                            "controller": modalParms.controller,
                            "botones": modalParms.botones,
                            "externalWeb": modalParms.externalWeb
                        }
                       

                        return opciones; //Envia datos a ventana modal*/
                        return modalParms;
                    }
                }

            });
       
          

            modalWindow.opened.then(function() {

                $timeout(function() {
                    var modalParms = factory.getParametros();
                    var widthNumber;
                    if (typeof modalParms.botones.ancho === 'string')
                        var widthNumber = parseInt(modalParms.botones.ancho.split("px")[0]);
                    else
                        widthNumber = modalParms.botones.ancho;
                    var heightNumber = parseInt(modalParms.botones.largo.split("px")[0]);
                    var realWidth;
                    if (typeof(modalParms.botones.ancho) === 'string')
                        realWidth = parseInt(modalParms.botones.ancho.split("px")[0]);
                    else
                        realWidth = modalParms.botones.ancho;
                    var stop = [];
                    var add = 0;
                   /* $('.modal-content').resizable({
                       
                        minWidth: widthNumber,
                        minHeight: heightNumber,
                        resize: function(event, ui) {
                            stop.push(ui.size.height);
                            add++;

                            if ($("#includeAngular").css("height")) {
                                var curHeight = $("#includeAngular").css("height").split("px")[0];


                                $("#includeAngular").css("height", parseInt(curHeight) + 1 + "px");
                            }

                            if ($("#externalFrame").css("height")) {
                                var curHeight = $("#externalFrame").css("height").split("px")[0];


                                $("#externalFrame").css("height", parseInt(curHeight) + 1 + "px");
                            }

                        },
                        stop: function(event, ui) {


                            if (stop[stop.length - 2] > ui.size.height) {

                                if ($("#includeAngular").css("height")) {
                                    var curHeight = $("#includeAngular").css("height").split("px")[0];

                                    $("#includeAngular").css("height", parseInt(curHeight) - 45 + "px");
                                }

                                if ($("#externalFrame").css("height")) {
                                    var curHeight = $("#externalFrame").css("height").split("px")[0];

                                    if (parseInt(curHeight) > heightNumber)
                                        $("#externalFrame").css("height", parseInt(curHeight) - add - 45 + "px");
                                }
                            }
                            add = 0;
                            stop = [];
                        }
                    });*/

                    $('.modal-content').draggable({
                        cursor: "move"
                    });



                    if (widthNumber > window.innerWidth && $("#divisoftModal").offset().left > 0) {
                        realWidth = window.innerWidth;
                        modalParms.botones.ancho = window.innerWidth /*+ 100*/ + "px";
                    } else if (widthNumber > window.innerWidth && $("#divisoftModal").offset().left < 0) {
                        modalParms.botones.ancho = (window.innerWidth - $("#divisoftModal").offset().left) + "px";
                        realWidth = window.innerWidth - $("#divisoftModal").offset().left;
                    }

                    $(".modal .modal-dialog .modal-content").css({
                        /* "background-color": "yellow",*/
                        "margin-top": modalParms.botones.top,
                        "margin-left": /*"-40%"*/ modalParms.botones.left,
                        "height": modalParms.botones.largo,
                        "width": modalParms.botones.ancho,
                        /*"border": "1px solid black",*/
                        /*"background-color": "black"*/

                    });
                    if (modalParms.botones.fondo) {
                        $(".modal .modal-dialog .modal-content").css({
                            /* "background-color": "yellow",*/
                            "margin-top": modalParms.botones.top,
                            "margin-left": /*"-40%"*/ modalParms.botones.left,
                            "height": modalParms.botones.largo,
                            "width": modalParms.botones.ancho,
                            "border": "1px solid black",
                            "background-color": modalParms.botones.fondo

                        });

                        if (modalParms.botones.fondo == "black") {
                            $("#modalClose").css("color", "white");
                            $(".modal .modal-dialog .modal-content").css({
                                /* "background-color": "yellow",*/
                                "margin-top": modalParms.botones.top,
                                "margin-left": /*"-40%"*/ modalParms.botones.left,
                                "height": modalParms.botones.largo,
                                "width": modalParms.botones.ancho,
                                "border": "1px solid white",
                                "background-color": modalParms.botones.fondo

                            });

                            //rgb(138, 138, 138);
                        }

                    }
                    /*alert(realWidth - 100);
                    $("#externalFrame").css("width", realWidth - 100 + "px");*/
                    $("#externalFrame").css("width", modalParms.botones.ancho_external + "px");
                    if (window.innerWidth <= 768) {
                        $(".modal .modal-dialog .modal-content").css({
                            "margin-top": "180px",
                            "margin-left": "-3%",

                        });
                    } else if (window.innerWidth <= 841) {
                        $(".modal .modal-dialog .modal-content").css({
                            "margin-left": "-30px",
                            "width": "730px"
                        });

                        if (window.innerWidth < 800)
                            $(".modal .modal-dialog .modal-content").css("margin-left", "-50px");

                        $("#externalFrame").css("width", 630 + "px");

                    } else if (window.innerWidth <= 1279) {
                        $(".modal .modal-dialog .modal-content").css({
                            "margin-left": "-20%",
                            "width": "841px"
                        });
                    }

                    $(window).resize(function() {
                        //alert(window.innerWidth);
                      /* if (widthNumber > window.innerWidth && $("#divisoftModal").offset().left > 0) {
                            modalParms.botones.ancho = window.innerWidth /*+ 100*//* + "px";
                            realWidth = window.innerWidth;
                        } else if (widthNumber > window.innerWidth && $("#divisoftModal").offset().left < 0) {
                            modalParms.botones.ancho = (window.innerWidth - $("#divisoftModal").offset().left) + "px";
                            realWidth = window.innerWidth - $("#divisoftModal").offset().left;
                        } else
                            modalParms.botones.ancho = widthNumber;

                        $("#externalFrame").css("width", realWidth - 100 + "px");

                        $(".modal .modal-dialog .modal-content").css({
                            "width": modalParms.botones.ancho
                        });

                        if (window.innerWidth <= 768) {
                            $(".modal .modal-dialog .modal-content").css({
                                "margin-top": "180px",
                                "margin-left": "-3%",

                            });
                        } else if (window.innerWidth <= 841) {
                            $(".modal .modal-dialog .modal-content").css({
                                "margin-left": "-30px",
                                "width": "730px"
                            });

                            if (window.innerWidth < 800)
                                $(".modal .modal-dialog .modal-content").css("margin-left", "-50px");

                        } else if (window.innerWidth <= 1279) {
                            $(".modal .modal-dialog .modal-content").css({
                                "margin-left": "-20%",
                                "width": "841px"
                            });

                            $("#externalFrame").css("width", 741 + "px");
                        }
                      */
                    });



                }, 10);

                $timeout(function() {

                    var modalParms = factory.getParametros();
                    var heightNumber = parseInt(modalParms.botones.largo.split("px")[0]);

                    if (modalParms.botones.aceptar || modalParms.botones.cancelar) {
                        $("#includeAngular").css({
                            "height": heightNumber - 85 + "px",
                            "overflow-y": "scroll"
                        });
                    } else {

                        $("#includeAngular").css({
                            "height": heightNumber - 50 + "px",
                            "overflow-y": "scroll"
                        });
                    }
                    $("#modalWrap").addClass("modal-backdropDivisoft");
                }, 60);


                //console.log("modal class", $("#divisoftModal").css());

                factory.windowOpen = true;
            });


            modalWindow.result.then(function(selectedItem) {
                factory.windowOpen = false;
            }, function() {
                factory.windowOpen = false;
            });
        },
        setWindowOpen : function(value){
            factory.windowOpen = value;
        },
        getModalDialog: function() {
            return modalWindow;
        },
        setModalStyle: function() {
            var modalParms = factory.getParametros();
            var widthNumber = parseInt(modalParms.botones.ancho.split("px")[0]);

        },
        setResultData: function(data) {
            result = data;
        },
        getResultData: function() {
            //console.log(result);
            return result;
        }
    }

    return factory;
});

app.directive('dynamicController', function($compile, $parse, $controller) {
    return {
        template: '<div></div>',
        restrict: 'A',
        link: function postLink(scope, element, attrs) {
            var name = $parse(element.attr('dynamic-controller'))(scope);
            //alert(name);
            element.attr('ng-controller', name);
            element.removeAttr('dynamic-controller');
            $compile(element)(scope);

            /*  var locals = {
                    $scope: scope,
                    $element: element,
                    $attrs: attrs
                };
                
                element.data('$Controller', $controller(scope.$eval(name), locals));*/
        }
    };
});

app.controller("modalMain", function($scope, DBparametros, DBpeticiones, 
    $modalInstance, items, modalBpm,$interval) {
    //console.log(items);
    $scope.template = items.template;
    $scope.controller = items.controller;
    $scope.botones = items.botones;
    $scope.externalWeb = items.externalWeb;
    $scope.result;
    console.log("botones",$scope.botones);
    $scope.toogleAceptar = function(){
        
        if($scope.botones.aceptar){
            $scope.botones.aceptar = false;
        }else
           $scope.botones.aceptar = true; 
       //alert($scope.botones.acpetar);
    }
    
    $scope.close = function() {
        if(items.waitForEvent)
         deleteLocalStorage(items.forma+"_"+items.event);
        modalBpm.setResultData(null);
        $modalInstance.close(null);
        //$("#mainContent").removeClass("modal-backdrop");
    }

    $scope.cancel = function() {
        if(items.waitForEvent)
         deleteLocalStorage(items.forma+"_"+items.event);
        modalBpm.setResultData(null);
        $modalInstance.dismiss('cancel');
        //$("#mainContent").removeClass("modal-backdrop");
    }

    $scope.acept = function() {
        if(items.waitForEvent)
         deleteLocalStorage(items.forma+"_"+items.event);
        $modalInstance.close(modalBpm.getResultData());
        //$("#mainContent").removeClass("modal-backdrop");
    }
    
    if(items.waitForEvent){
        deleteLocalStorage(items.forma+"_"+items.event);
       var execute = $interval(function(){
            if(getLocalStorage(items.forma+"_"+items.event) !== null){
               $interval.cancel(execute); 
               eval(getLocalStorage(items.forma+"_"+items.event));
               deleteLocalStorage(items.forma+"_"+items.event);
            }
        },100);
        
    }
});