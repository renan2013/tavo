<template>
<div>
  <br>
  <input type="file" class="btn btn-outline-secondary" @change="loadTextFromFile">

</div>
</template>

<script> 
// se encarga de Leer el documento  y dejarlo en el lector listo para que sea  indexado
import * as divilib from '@/divisoftlibs/utilDivisoftJS.js';

export default {

  data() {
    return {  
      textBase64: "",
      respuestaCMS:divilib.CMSRespuestaIN,
      
   };
  },
  methods: {

    loadTextFromFile(ev) {
      const file = ev.target.files[0]; 

      this.respuestaCMS[0].referencia=0;
      this.respuestaCMS[0].hashDoc='';
      this.respuestaCMS[0].DocumentoMimeType=file.type;
      this.respuestaCMS[0].size=file.size; 
      this.respuestaCMS[0].descripcionDoc=file.name;  

      const reader = new FileReader();  
      reader.readAsDataURL(file); 
      reader.onload = e => this.$emit("EnviaBase64", e.target.result,this.respuestaCMS);
  
    }, 
 }// de Methodos

 } //final 
</script>

<style>
.text-reader {

	position: relative;
	overflow: hidden;
	display: inline-block;
   

	/* Fancy button looking */
	border: 2px solid black;
	border-radius: 5px;
	padding: 8px 12px;
	cursor: pointer;
}
.text-reader input {
	position: absolute;
  width: 80%;
	top: 0;
	left: 0;
	z-index: -1;
	opacity: 0;
}
</style>
