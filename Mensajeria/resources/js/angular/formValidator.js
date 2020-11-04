app.factory("formValidator", function() {


    var error = false;
    
    var interfaz = {
        limpiarUser: function() {
            User = {};
        },
        //adiciona un parametro con operador
        // para efectos de transportar sin problema se cambian los simbolos de > POR MAYOR
        getError : function(){
           
           return error;
           //console.log(strUser);
        },
        doValidation : function(container,validation){
           $(".errorSimple").removeClass("errorSimple");
           $("p any").remove();
           var classesError = [];
           error = false;
           required = false;
           var tipoError = {};
           if(validation.indexOf("required") !== -1){
                tipoError = {};
                required = true;
               
               //classesError.push(".ng-invalid-required");
               tipoError.class = ".ng-invalid-required";
               tipoError.msg = "*";
               classesError.push(tipoError);
           }
           var firstError;
           $(classesError).each(function(index,errorObject){
               var validateCondition = $("#"+container+ " "+errorObject.class);
               
               if(validateCondition.length > 0)
                 error = true;
             
                
               
               $(validateCondition).each(function(index2,el){
                   
                   $(el).addClass("errorSimple");
                   var label = $($(el).parent().children("p")); 
                
                   if(label.find("any").length > 0)
                    label.find("any").remove();

                  label.append("<any style='color:red'>"+errorObject.msg+"</any>");
                  if(!firstError)
                      firstError = {"item":$(el),"parent":$("#"+container)};
               });
           });
           
           if(firstError !== undefined){
               if(!firstError.parent.is(":visible"))
                   firstError.parent.css("display","block");
               firstError.item.focus();
           }
               
           
        }

    };
    return interfaz;
});

