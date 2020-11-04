<template>
    <div class="demo-alignment">

      <vs-button
        @click="$vs.notify({
          title:'Primary',
          text:'Lorem ipsum dolor sit amet, consectetur',
          color:'primary'})"
        color="primary"
        type="flat">Notification Primary</vs-button>

      <vs-button
        @click="$vs.notify({
          title:'Success',
          text:'Lorem ipsum dolor sit amet, consectetur',
          color:'success'})"
        color="success"
        type="flat">Notification Success</vs-button>

      <vs-button
        @click="$vs.notify({
          title:'Danger',
          text:'Lorem ipsum dolor sit amet, consectetur',
          color:'danger'})"
        color="danger"
        type="flat">Notification Danger</vs-button>

      <vs-button
        @click="$vs.notify({
          title:'Warning',
          text:'Lorem ipsum dolor sit amet, consectetur',
          color:'warning'})"
        color="warning"
        type="flat">Notification Warning</vs-button>

      <vs-button
        @click="$vs.notify({
          title:'dark',
          text:'Lorem ipsum dolor sit amet, consectetur',
          color:'dark'})"
        color="dark"
        type="flat">Notification Dark</vs-button>
 
    </div>
</template>

<script>

 import { eventBus } from "@/main"; // para que se hablen los componentes   
export default {
   created() {

       eventBus.$on("alerta21", (jsonMensaje) => {
        
           this.$vs.notify({
          title:'Success',
          text:'Lorem ipsum dolor sit amet, consectetur',
          color:'success'});
             this.jsonDatosAlert=jsonMensaje;
              this. random();
                
         });

     this. random();
        },

    data() {
         return {
            jsonDatosAlert:[],
            title: 'Color',
            time:4000,
            text: 'Lorem ipsum dolor sit amet, consectetur', 
            color: `rgb(50,60,80)`
           } 
      },
  methods: {
    random() {  
      this.$vs.notify({
        title:  this.jsonDatosAlert.title,
         time:this.jsonDatosAlert.timer,
        text: this.jsonDatosAlert.text,
        color:this.jsonDatosAlert.color,
      })

    },
  }
}
</script>