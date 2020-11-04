<template>
<div class="formulario">
    <hr/>
     
    <center><h5 id="titulo">Pre Matrícula en CEFI Virtual</h5></center>   
    <br>
    <form>
  
        <div class="form-group">
            <input type="text" class="form-control"  placeholder="Nombre completo">
        </div>
        
        <div class="form-group">
            <input type="text" class="form-control"  placeholder="Teléfono celular">
        </div>


        <div class="form-group">
        <select id="inputState" class="form-control">
                <option selected>Interés</option>
                <option>Técnico en Diseño Gráfico</option>
                <option>Técnico en Desarrollo de páginas webs</option>
                <option>Técnico en Administración</option>
                <option>Técnico en Ingles</option>
        </select>
        </div>

        
  
        <button type="submit" class="btn btn-danger btn-lg btn-block">Quiero hacer una prematrícula</button>
        <hr>
    </form>
    </div>
</template>
<script>
export default {};
</script>

<style>
#titulo{
    color:white;
    padding-top: 20px;
}

hr {
  height: 10px;
  background-color:white;
}




</style>