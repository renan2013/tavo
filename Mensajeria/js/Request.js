function addParametro(
    parametros,
    parametro,
    valor,
    valor2,
    operador,
    Cdata
) {


    xmlParm = null;

    if (operador == "" && Cdata == 0) {

        parametros = parametros + "<ParamItem>" + String.fromCharCode(13) +

            "<Nombre>" + parametro + "</Nombre>" + String.fromCharCode(13) +

            "<Operador>IGUAL</Operador>" + String.fromCharCode(13) +

            "<Valor1>" + valor + "</Valor1>" + String.fromCharCode(13);


        if (valor2 != "")

            parametros += "<Valor2>" + valor2 + "</Valor2>" + String.fromCharCode(13);


        parametros += "</ParamItem>" + String.fromCharCode(13);

    } else if (Cdata == 1) {

        parametros += "<ParamItem>" + String.fromCharCode(13) +

            "<Nombre>" + parametro + "</Nombre>" + String.fromCharCode(13) +

            "<Operador>" + operador + "</Operador>" + String.fromCharCode(13) +

            "<Valor1/>" + String.fromCharCode(13) +

            "<Valor2/>" + String.fromCharCode(13) +

            "<Cdata>" +

            "<X>" +

            " <![CDATA[" + valor + "]]>" +

            "</X>" +

            "</Cdata>" +

            "</ParamItem>" + String.fromCharCode(13);

    } else {

        parametros += "<ParamItem>" + String.fromCharCode(13) +

            "<Nombre>" + parametro + "</Nombre>" + String.fromCharCode(13) +

            "<Operador>" + operador + "</Operador>" + String.fromCharCode(13) +

            "<Valor1>" + valor + "</Valor1>" + String.fromCharCode(13);

        if (valor2 != '')

            parametros += "<Valor2>" + valor2 + "</Valor2>" + String.fromCharCode(13);

        parametros += "</ParamItem>" + String.fromCharCode(13);

    }


    return parametros;

}

function addCampo
    (
        columnas,
        columna,
        valor,
        Cdata

    ) {

    if (Cdata == 0)

        columnas = columnas + "<" + columna + ">" + valor + "</" + columna + ">" + String.fromCharCode(13);

    else
        columnas = columnas + "<" + columna + ">" + "<Cdata>" +

            "<X>" +

            " <![CDATA[" + valor + "]]>" +

            "</X>" +

            "</Cdata>" +

            "</" + columna + ">" + String.fromCharCode(13);

    return columnas;

}

function addColumna
    (
        columnas,
        columna,
        valor,
        Cdata

    ) {

    if (columna != '*' && Cdata == 0) {

        columnas = columnas + "<FilaItem>" + String.fromCharCode(13) +

            "<Nombre>" + columna + "</Nombre>" + String.fromCharCode(13);

        if (!valor == (""))

            columnas += "<Valor>" + valor + "</Valor>" + String.fromCharCode(13);

        else

            columnas += "<Valor/>" + String.fromCharCode(13);


        columnas += "</FilaItem>" + String.fromCharCode(13);

    } else if (/*columna.equalsIgnoreCase("*") && */Cdata == 1) {

        columnas = "<FilaItem>" + String.fromCharCode(13) +

            "<Nombre>" + columna + "</Nombre>" + String.fromCharCode(13) +

            "<Valor/>" + String.fromCharCode(13) +


            "<Cdata>" +

            "<X>" +

            " <![CDATA[" + valor + "]]>" +

            "</X>" +

            "</Cdata>" +

            "</FilaItem>" + String.fromCharCode(13);

    } else if (columna == "*") {

        columnas = columnas + "<FilaItem>" + String.fromCharCode(13) +

            "<Nombre>*</Nombre>" + String.fromCharCode(13) +
            "</FilaItem>" + String.fromCharCode(13)

    }
    return columnas;

}

// agregar  una lista de campos ordenados por

function addOrderBy(peticion, columna, tipo) {
    peticion = peticion + "  " + columna + " " + tipo;
    return peticion;
}


function headerPeticion(objeto, dml, credencial, userName, supervisor, metodo)  // opcional
{

    header = "<Header>" + String.fromCharCode(13)

        + "<HeaderItem>" + String.fromCharCode(13)

        + "<Nombre>MODO</Nombre>" + String.fromCharCode(13)

        + "<Valor>" + dml + "</Valor>" + String.fromCharCode(13)

        + "</HeaderItem>" + String.fromCharCode(13)


        + "<HeaderItem>" + String.fromCharCode(13)

        + "<Nombre>OBJECTID</Nombre>" + String.fromCharCode(13);

    if (objeto == "") {

        header += "<Valor/>";

    } else {

        header += "<Valor>" + objeto + "</Valor>" + String.fromCharCode(13);

    }

    header += "</HeaderItem>" + String.fromCharCode(13);


    header += "<HeaderItem>" + String.fromCharCode(13)

        + "<Nombre>CREDENCIAL</Nombre>" + String.fromCharCode(13)

        + "<Valor>" + credencial + "</Valor>" + String.fromCharCode(13)

        + "</HeaderItem>" + String.fromCharCode(13);


    header += "<HeaderItem>" + String.fromCharCode(13)

        + "<Nombre>SUPERVISOR</Nombre>" + String.fromCharCode(13);

    if (supervisor == "") {

        header += "<Valor/>";

    } else {

        header += "<Valor>" + supervisor + "</Valor>" + String.fromCharCode(13);

    }

    header += "</HeaderItem>" + String.fromCharCode(13);



    header += "<HeaderItem>" + String.fromCharCode(13)

        + "<Nombre>OBJECTMETODO</Nombre>" + String.fromCharCode(13);

    if (metodo == "") {

        header += "<Valor/>";

    } else {

        header += "<Valor>" + metodo + "</Valor>" + String.fromCharCode(13);

    }

    header += "</HeaderItem>" + String.fromCharCode(13);



    if (userName != null && !userName == '') {

        header += "<HeaderItem>" + String.fromCharCode(13)

            + "<Nombre>USERNAME</Nombre>" + String.fromCharCode(13)

            + "<Valor>" + userName + "</Valor>" + String.fromCharCode(13)

            + "</HeaderItem>" + String.fromCharCode(13);

    }


    header += "</Header>" + String.fromCharCode(13);


    return header;


}


function headerPaginacion(objeto, dml, credencial, userName, pagina, registroxpagina, orderby) {

    header = "<Header>" + String.fromCharCode(13)

        + "<HeaderItem>" + String.fromCharCode(13)

        + "<Nombre>MODO</Nombre>" + String.fromCharCode(13)

        + "<Valor>" + dml + "</Valor>" + String.fromCharCode(13)

        + "</HeaderItem>" + String.fromCharCode(13)


        + "<HeaderItem>" + String.fromCharCode(13)

        + "<Nombre>OBJECTID</Nombre>" + String.fromCharCode(13);

    if (objeto == "") {

        header += "<Valor/>";

    } else {

        header += "<Valor>" + objeto + "</Valor>" + String.fromCharCode(13);

    }

    header += "</HeaderItem>" + String.fromCharCode(13);


    header += "<HeaderItem>" + String.fromCharCode(13)

        + "<Nombre>CREDENCIAL</Nombre>" + String.fromCharCode(13)

        + "<Valor>" + credencial + "</Valor>" + String.fromCharCode(13)

        + "</HeaderItem>" + String.fromCharCode(13);

    header += "<HeaderItem>" + String.fromCharCode(13)

        + "<Nombre>CANT_REGISTROS</Nombre>" + String.fromCharCode(13)

        + "<Valor>" + registroxpagina + "</Valor>" + String.fromCharCode(13)

        + "</HeaderItem>" + String.fromCharCode(13);


    //REGISTROSXPAGINA


    header += "<HeaderItem>" + String.fromCharCode(13)

        + "<Nombre>REGISTROSXPAGINA</Nombre>" + String.fromCharCode(13)

        + "<Valor>" + registroxpagina + "</Valor>" + String.fromCharCode(13)

        + "</HeaderItem>" + String.fromCharCode(13);


    header += "<HeaderItem>" + String.fromCharCode(13)

        + "<Nombre>PAGINA</Nombre>" + String.fromCharCode(13)

        + "<Valor>" + pagina + "</Valor>" + String.fromCharCode(13)

        + "</HeaderItem>" + String.fromCharCode(13);

        //ORDERBY
    header += "<HeaderItem>" + String.fromCharCode(13)

        + "<Nombre>ORDERBY</Nombre>" + String.fromCharCode(13)

        + "<Valor>" + orderby + "</Valor>" + String.fromCharCode(13)

        + "</HeaderItem>" + String.fromCharCode(13);




    if (userName != null && !userName == '') {

        header += "<HeaderItem>" + String.fromCharCode(13)

            + "<Nombre>USERNAME</Nombre>" + String.fromCharCode(13)

            + "<Valor>" + userName + "</Valor>" + String.fromCharCode(13)

            + "</HeaderItem>" + String.fromCharCode(13);

    }


    header += "</Header>" + String.fromCharCode(13);


    return header;


}

function headerFormat(objeto, dml, credencial, userName, formatoFecha, formatoNumber, orderby) {

    header = "<Header>" + String.fromCharCode(13)

        + "<HeaderItem>" + String.fromCharCode(13)

        + "<Nombre>MODO</Nombre>" + String.fromCharCode(13)

        + "<Valor>" + dml + "</Valor>" + String.fromCharCode(13)

        + "</HeaderItem>" + String.fromCharCode(13)


        + "<HeaderItem>" + String.fromCharCode(13)

        + "<Nombre>OBJECTID</Nombre>" + String.fromCharCode(13);

    if (objeto == "") {

        header += "<Valor/>";

    } else {

        header += "<Valor>" + objeto + "</Valor>" + String.fromCharCode(13);

    }

    header += "</HeaderItem>" + String.fromCharCode(13);


    header += "<HeaderItem>" + String.fromCharCode(13)

        + "<Nombre>CREDENCIAL</Nombre>" + String.fromCharCode(13)

        + "<Valor>" + credencial + "</Valor>" + String.fromCharCode(13)

        + "</HeaderItem>" + String.fromCharCode(13);


    //formatoFecha
    if (formatoFecha.length > 0)
        header += "<HeaderItem>" + String.fromCharCode(13)

            + "<Nombre>DATEFORMAT</Nombre>" + String.fromCharCode(13)

            + "<Valor>" + formatoFecha + "</Valor>" + String.fromCharCode(13)

            + "</HeaderItem>" + String.fromCharCode(13);

    //formatoNumber 
    if (formatoNumber.length > 0)
        header += "<HeaderItem>" + String.fromCharCode(13)

            + "<Nombre>NUMBERFORMAT</Nombre>" + String.fromCharCode(13)

            + "<Valor>" + formatoNumber + "</Valor>" + String.fromCharCode(13)

            + "</HeaderItem>" + String.fromCharCode(13);


    if (userName != null && !userName == '') {

        header += "<HeaderItem>" + String.fromCharCode(13)

            + "<Nombre>USERNAME</Nombre>" + String.fromCharCode(13)

            + "<Valor>" + userName + "</Valor>" + String.fromCharCode(13)

            + "</HeaderItem>" + String.fromCharCode(13);

    }

    header += "<HeaderItem>" + String.fromCharCode(13)

        + "<Nombre>CANT_REGISTROS</Nombre>" + String.fromCharCode(13)

        + "<Valor>1</Valor>" + String.fromCharCode(13)

        + "</HeaderItem>" + String.fromCharCode(13);


    //REGISTROSXPAGINA


    header += "<HeaderItem>" + String.fromCharCode(13)

        + "<Nombre>REGISTROSXPAGINA</Nombre>" + String.fromCharCode(13)

        + "<Valor>1</Valor>" + String.fromCharCode(13)

        + "</HeaderItem>" + String.fromCharCode(13);


    header += "<HeaderItem>" + String.fromCharCode(13)

        + "<Nombre>PAGINA</Nombre>" + String.fromCharCode(13)

        + "<Valor>1</Valor>" + String.fromCharCode(13)

        + "</HeaderItem>" + String.fromCharCode(13);


    header += "</Header>" + String.fromCharCode(13);


    return header;


}

function getPeticion(header, parametros, filas) { //,filas

    var nfilas = 0;
    nparametros = 0

    if (filas == null || filas == "")

        nfilas = 0;

    else
        nfilas = filas.length;

    if (parametros == null || parametros == "")

        nparametros = 0
    else

        nparametros = parametros.length;

    // todos

    if (nparametros > 8 && nfilas > 8)

        return "<SOA_Xml>" + header + "<Param>" + parametros + "</Param>" + " <Filas>" + filas + " </Filas>" + "</SOA_Xml>";

    // solo peticion sin parametros  y sin  parametros

    if (nparametros == 8 && nfilas == 8)

        return "<SOA_Xml>" + header + "</SOA_Xml>";

    // peticion y  parametros sin parametros

    if (nparametros > 8 && nfilas == 8)

        return "<SOA_Xml>" + header + "<Param>" + parametros + "</Param>" + "</SOA_Xml>";


    // solo parametros sin  parametros como cuando es procedimiento o funcion

    if (nparametros == 8 && nfilas > 8)

        return "<SOA_Xml>" + header + " <Filas>" + filas + " </Filas>" + "</SOA_Xml>";


    return "";

}

function exeDsoa(
    datos,
    dml,
    credencial,
    formatoenvio,
    formatorecibe
) {


    this.peticion.datos = "";


    var pedido = {
        "datos": datos,
        "dml": "JJ",
        "formato": formatoenvio,
        "credencial": "1234",
        "formatoRequest": formatorecibe
    };
    var respuesta = [];



    var url = store.state.urlDsoa;

    axios({
        method: 'POST',
        url,
        "headers": {
            "content-type": "application/json",
            "cache-control": "no-cache",
            "postman-token": "9be30243-8f01-3820-f64e-d09144a7706d"
            ,
            "processData": false,
        },
        "sync": true,
        "crossDomain": true,
        "data": pedido
    })
        .then((response) => {

            this.peticion = response.data;

            this.completado = 1;


        })

        .catch(function (error) {
            console.log("SE PRODUJO ERROR " + error);
        });

};


