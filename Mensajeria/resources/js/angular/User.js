app.factory("User", function() {


    var User = {};
    
    var interfaz = {
        limpiarUser: function() {
            User = {};
        },
        //adiciona un parametro con operador
        // para efectos de transportar sin problema se cambian los simbolos de > POR MAYOR
        getUser : function(){
           strUser = doGetSessionValue("UserJson"); 
           //console.log("user",strUser);
           return JSON.parse(strUser);
           //console.log(strUser);
        },
        getEmisor : function(){
           strUser = doGetSessionValue("UserJson"); 
           //console.log("user",strUser);
           var emisor = JSON.parse(strUser).PARAMETROS;
           if(parseInt(emisor.TIPO_IDENTIFICACION)=== 1)
               emisor.TIPOIDN = "C\u00E9dula F\u00EDsica";
           else if(parseInt(emisor.TIPO_IDENTIFICACION)=== 2)
               emisor.TIPOIDN = "C\u00E9dula Jur\u00EDdica";
           else if(parseInt(emisor.TIPO_IDENTIFICACION)=== 3) 
               emisor.TIPOIDN = "Dimex";
           else if(parseInt(emisor.TIPO_IDENTIFICACION)=== 4)
               emisor.TIPOIDN = "NITE";
           return emisor;
           //console.log(strUser);
        }

    };
    return interfaz;
});

