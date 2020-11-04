function addParametro(
           parametros, 
           parametro, 
           valor, 
           valor2, 
           operador, 
           Ndata 
          )  
 {
 
        
           xmlParm = null;

        if (operador=="" && Ndata == 0) {

            parametros =parametros+ "<ParamItem>" +  String.fromCharCode(13) +

                    "<Nombre>" + parametro + "</Nombre>" + String.fromCharCode(13)  +

                    "<Operador>IGUAL</Operador>" + String.fromCharCode(13)  +

                    "<Valor1>" + valor + "</Valor1>" + String.fromCharCode(13) ;


            if (!valor2=="")

              parametros+= "<Valor2>" + valor2 + "</Valor2>" + String.fromCharCode(13) ;


            parametros+= "</ParamItem>" + String.fromCharCode(13) ;

        } else if (Cdata == true) {

            parametros= "<ParamItem>" + String.fromCharCode(13)  +

                    "<Nombre>" + parametro + "</Nombre>" + String.fromCharCode(13)  +

                    "<Operador>" + operador + "</Operador>" + String.fromCharCode(13)  +

                    "<Valor1/>" + String.fromCharCode(13)  +

                    "<Valor2/>" + String.fromCharCode(13)  +

                    "<Cdata>" +

                    "<X>" +

                    " <![CDATA[" + valor + "]]>" +

                    "</X>" +

                    "</Cdata>" +

                    "</ParamItem>" + String.fromCharCode(13) ;

        } else {

           parametros= "<ParamItem>" + String.fromCharCode(13)  +

                    "<Nombre>" + parametro + "</Nombre>" + String.fromCharCode(13)  +

                    "<Operador>" + operador + "</Operador>" + String.fromCharCode(13)  +

                    "<Valor1>" + valor + "</Valor1>" + String.fromCharCode(13) ;


            if (!valor2.equals(""))

                xmlParm += "<Valor2>" + valor2 + "</Valor2>" + String.fromCharCode(13) ;


            xmlParm += "</ParamItem>" + String.fromCharCode(13) ;

        }


       return parametros;

    }


   function addColumna
              (
            columnas,          
            columna,  
            valor, Ndata

    )   {

          

        if (!columna.equalsIgnoreCase("*") && Cdata == false) {

            columnas =columnas+ "<FilaItem>" + String.fromCharCode(13)  +

                    "<Nombre>" + columna + "</Nombre>" + String.fromCharCode(13) ;

            if (!valor.equals(""))

               columnas += "<Valor>" + valor + "</Valor>" + String.fromCharCode(13) ;

            else

               columnas += "<Valor/>" + String.fromCharCode(13) ;


            columnas += "</FilaItem>" + String.fromCharCode(13) ;

        } else if (/*columna.equalsIgnoreCase("*") && */Cdata == true)

            columnas= "<FilaItem>" + String.fromCharCode(13)  +

                    "<Nombre>" + columna + "</Nombre>" + String.fromCharCode(13)  +

                    "<Valor/>" + String.fromCharCode(13)  +


                    "<Cdata>" +

                    "<X>" +

                    " <![CDATA[" + valor + "]]>" +

                    "</X>" +

                    "</Cdata>" +

                    "</FilaItem>" + String.fromCharCode(13) ;


        return columnas;

    } 

// agregar  una lista de campos ordenados por

    function addOrderBy(
            peticion,columna,tipo)
        {

        peticion=peticion+"  "+columna + " " + tipo;
        return peticion;
    }
    
    
function headerPeticion(
                objeto,
                dml,
                credencial,
                userName,
                 metodo  // opcional
) {

        header = "<Header>" + String.fromCharCode(13) 

                + "<HeaderItem>" + String.fromCharCode(13) 

                + "<Nombre>MODO</Nombre>" + String.fromCharCode(13) 

                + "<Valor>" + dml + "</Valor>" + String.fromCharCode(13) 

                + "</HeaderItem>" + String.fromCharCode(13) 


                + "<HeaderItem>" + String.fromCharCode(13) 

                + "<Nombre>OBJECTID</Nombre>" + String.fromCharCode(13) ;

        if (objeto=="") {

            header += "<Valor/>";

        } else {

            header += "<Valor>" + objeto + "</Valor>" + String.fromCharCode(13) ;

        }

        header += "</HeaderItem>" + String.fromCharCode(13) ;


        header += "<HeaderItem>" + String.fromCharCode(13) 

                + "<Nombre>CREDENCIAL</Nombre>" + String.fromCharCode(13) 

                + "<Valor>" + credencial + "</Valor>" + String.fromCharCode(13) 

                + "</HeaderItem>" + String.fromCharCode(13) ;


        header += "<HeaderItem>" + String.fromCharCode(13) 

                + "<Nombre>SUPERVISOR</Nombre>" + String.fromCharCode(13) ;

        if ( supervisor=="") {

            header += "<Valor/>";

        } else {

            header += "<Valor>" + supervisor+ "</Valor>" + String.fromCharCode(13) ;

        }

        header += "</HeaderItem>" + String.fromCharCode(13) ;

  

        header += "<HeaderItem>" + String.fromCharCode(13) 

                + "<Nombre>NUM_HILO_ACTIVO</Nombre>" + String.fromCharCode(13) ;

      
            if (numHiloActivo=="") {

                header += "<Valor/>";

            } else {

                header += "<Valor>" + getNumHiloActivo() + "</Valor>" + String.fromCharCode(13) ;

            } 

        header += "</HeaderItem>" + String.fromCharCode(13) ;


        header += "<HeaderItem>" + String.fromCharCode(13) 

                + "<Nombre>NUM_HILO</Nombre>" + String.fromCharCode(13) ;

        try {

            if (this.NumHilo.equals("")) {

                header += "<Valor/>";

            } else {

                header += "<Valor>" + getNumHilo() + "</Valor>" + String.fromCharCode(13) ;

            }
          }
          catch(error) {
                    console.error(error);
                   
          }

        header += "</HeaderItem>" + String.fromCharCode(13) ; 


        header += "<HeaderItem>" + String.fromCharCode(13) 

                + "<Nombre>OBJECTMETODO</Nombre>" + String.fromCharCode(13) ;

        if ( metodo.equals("")) {

            header += "<Valor/>";

        } else {

            header += "<Valor>" +  metodo + "</Valor>" + String.fromCharCode(13) ;

        }

        header += "</HeaderItem>" + String.fromCharCode(13) ;
 
 

        if (userName != null && !userName.equals("")) {

            header += "<HeaderItem>" + String.fromCharCode(13) 

                    + "<Nombre>USERNAME</Nombre>" + String.fromCharCode(13) 

                    + "<Valor>" + this.UserName + "</Valor>" + String.fromCharCode(13) 

                    + "</HeaderItem>" + String.fromCharCode(13) ;

        }


        header += "</Header>" + String.fromCharCode(13) ;


        return header;


    }



function headerPaginacion(
                objeto,
                dml,
                credencial, 
                userName,
                pagina,
                registroxpagina
) {

        header = "<Header>" + String.fromCharCode(13) 

                + "<HeaderItem>" + String.fromCharCode(13) 

                + "<Nombre>MODO</Nombre>" + String.fromCharCode(13) 

                + "<Valor>" + dml + "</Valor>" + String.fromCharCode(13) 

                + "</HeaderItem>" + String.fromCharCode(13) 


                + "<HeaderItem>" + String.fromCharCode(13) 

                + "<Nombre>OBJECTID</Nombre>" + String.fromCharCode(13) ;

        if (objeto=="") {

            header += "<Valor/>";

        } else {

            header += "<Valor>" + objeto + "</Valor>" + String.fromCharCode(13) ;

        }

        header += "</HeaderItem>" + String.fromCharCode(13) ;


        header += "<HeaderItem>" + String.fromCharCode(13) 

                + "<Nombre>CREDENCIAL</Nombre>" + String.fromCharCode(13) 

                + "<Valor>" + credencial + "</Valor>" + String.fromCharCode(13) 

                + "</HeaderItem>" + String.fromCharCode(13) ;


        header += "<HeaderItem>" + String.fromCharCode(13) 

                + "<Nombre>SUPERVISOR</Nombre>" + String.fromCharCode(13) ;

        if ( supervisor=="") {

            header += "<Valor/>";

        } else {

            header += "<Valor>" + supervisor+ "</Valor>" + String.fromCharCode(13) ;

        }

        header += "</HeaderItem>" + String.fromCharCode(13) ;

  

        header += "<HeaderItem>" + String.fromCharCode(13) 

                + "<Nombre>NUM_HILO_ACTIVO</Nombre>" + String.fromCharCode(13) ;

      
            if (numHiloActivo=="") {

                header += "<Valor/>";

            } else {

                header += "<Valor>" + getNumHiloActivo() + "</Valor>" + String.fromCharCode(13) ;

            } 

        header += "</HeaderItem>" + String.fromCharCode(13) ;


        header += "<HeaderItem>" + String.fromCharCode(13) 

                + "<Nombre>NUM_HILO</Nombre>" + String.fromCharCode(13) ;

        try {

            if (this.NumHilo.equals("")) {

                header += "<Valor/>";

            } else {

                header += "<Valor>" + getNumHilo() + "</Valor>" + String.fromCharCode(13) ;

            }
          }
          catch(error) {
                    console.error(error);
                   
                  }

        header += "</HeaderItem>" + String.fromCharCode(13) ;


        header += "<HeaderItem>" + String.fromCharCode(13) 

                + "<Nombre>OBJECTNAME</Nombre>" + String.fromCharCode(13) ;

        if (this.ObjectName.equals("")) {

            header += "<Valor/>";

        } else {

            header += "<Valor>" + getObjectName() + "</Valor>" + String.fromCharCode(13) ;

        }

        header += "</HeaderItem>" + String.fromCharCode(13) ;


        header += "<HeaderItem>" + String.fromCharCode(13) 

                + "<Nombre>OBJECTMETODO</Nombre>" + String.fromCharCode(13) ;

        if (this.Metodo.equals("")) {

            header += "<Valor/>";

        } else {

            header += "<Valor>" + getMetodo() + "</Valor>" + String.fromCharCode(13) ;

        }

        header += "</HeaderItem>" + String.fromCharCode(13) ;


        header += "<HeaderItem>" + String.fromCharCode(13) 

                + "<Nombre>CANT_REGISTROS</Nombre>" + String.fromCharCode(13) 

                + "<Valor>" + getRegXPage() + "</Valor>" + String.fromCharCode(13) 

                + "</HeaderItem>" + String.fromCharCode(13) ;


        //REGISTROSXPAGINA
 
 
        header += "<HeaderItem>" + String.fromCharCode(13) 

                + "<Nombre>REGISTROSXPAGINA</Nombre>" + String.fromCharCode(13) 

                + "<Valor>" + registroxpagina + "</Valor>" + String.fromCharCode(13) 

                + "</HeaderItem>" + String.fromCharCode(13) ;


        header += "<HeaderItem>" + String.fromCharCode(13) 

                + "<Nombre>PAGINA</Nombre>" + String.fromCharCode(13) 

                + "<Valor>" + pagina + "</Valor>" + String.fromCharCode(13) 

                + "</HeaderItem>" + String.fromCharCode(13) ;


        if (orderby.length() > 0) {

            header += "<HeaderItem>" + String.fromCharCode(13) 

                    + "<Nombre>ORDERBY</Nombre>" + String.fromCharCode(13) 

                    + "<Valor>" + rderBy + "</Valor>" + String.fromCharCode(13) 

                    + "</HeaderItem>" + String.fromCharCode(13) ;

        }


        if (userName != null && !userName.equals("")) {

            header += "<HeaderItem>" + String.fromCharCode(13) 

                    + "<Nombre>USERNAME</Nombre>" + String.fromCharCode(13) 

                    + "<Valor>" +  serName + "</Valor>" + String.fromCharCode(13) 

                    + "</HeaderItem>" + String.fromCharCode(13) ;

        }


        header += "</Header>" + String.fromCharCode(13) ;


        return header;


    }
  function  getPeticion(header,columnas,filas) {


         columnas = columnas.length();

          parametros =parametros.length();


        // todos

        if (columnas > 8 && parametros > 8)

            return "<SOA_Xml>" +  header + parametros + columnas + "</SOA_Xml>";

        // solo peticion sin parametros  y sin columnas

        if (columnas == 8 && parametros == 8)

            return "<SOA_Xml>" +  header +"</SOA_Xml>";

        // peticion y columnas sin parametros

        if (columnas > 8 && parametros == 8)

            return "<SOA_Xml>" +  header + columnas + "</SOA_Xml>";


        // solo parametros sin columnas como cuando es procedimiento o funcion

        if (columnas == 8 && parametros > 8)

            return "<SOA_Xml>" + header + parametros + "</SOA_Xml>";


        return "";

    }
    
    function exeDsoa(peticion)
    
    {
    var data;
    var settings = { 
      "headers": {
    "Content-Type": "text/plain", 
	 'Access-Control-Allow-Origin': '*',
     'Access-Control-Allow-Headers': 'x-requested-with, Content-Type, origin, authorization, accept, client-security-token',
     'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE',
     'Allow': 'GET, POST, OPTIONS, PUT, DELETE', 
    "content-length": "6079",
    "Connection": "keep-alive",
 
    "cache-control": "no-cache"
  },
  "data": +peticion
};
 
    
  axios.post("http://localhost:8089/DsoaService2/dsoa/request", settings)
  .then(function (response) {
    console.log(response.data);
    data=response.data;
  })
  .catch(function (error) {
    console.log("SE PRODUJO ERROR "+error);
  });
  return  data;
};
 