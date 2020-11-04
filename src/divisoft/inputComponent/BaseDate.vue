<template>
 <div class="centerx">  
    
      <label>{{ label }}</label>  

          <flat-pickr 
                v-if="tipo=='N'" 
                class="vs-inputx vs-input--input large hasValue"
                style="border: 1px solid rgba(0, 0, 0, 0.2);"
                :config="configdateTimePicker" 
                v-model="ValorFecha" 
                :placeholder="label"  
                :label="label"
                 @focus="onFocusHandler" 
                @input="updateValue" />

           <flat-pickr 
                  v-if="tipo=='FH'" 
                  class="vs-inputx vs-input--input large hasValue"
                  style="border: 1px solid rgba(0, 0, 0, 0.2);"
                  :config="configdateTimePickerFYH" 
                
                  
                  :placeholder="label" 
                  v-model="ValorFecha"
                  :label="label"
                    @focus="onFocusHandler" 
                  @input="updateValue"/>


           <flat-pickr 
                    v-if="tipo=='H'" 
                    class="vs-inputx vs-input--input large hasValue"
                    style="border: 1px solid rgba(0, 0, 0, 0.2);"
                    :config="configdateTimePickerSoloHora" 
                    v-model="ValorFecha"
                    
                    :placeholder="label" 
                    
                    :label="label"
                      @focus="onFocusHandler" 
                    @input="updateValue"/>

  </div>
</template>

<script>

  // NO USAR SI NO HAY FECHAS
  import flatPickr from "vue-flatpickr-component";
  import "flatpickr/dist/flatpickr.min.css";
  import {
      Spanish
  } from "flatpickr/dist/l10n/es.js";
 
  export default {
      components: { 
          flatPickr 
      },
    props: {
     
      label: {
        type: String,
        required: true
      },
      value: {
        type: String
      },
      tipo: {
        type: String,
        default: 'N',  // solo fecha  N=Fecha normal FH=Fecha Y Hora y H=Solo Hora
        required: false
      }
    },
      mounted () { 
          // console.log("llego",this.value)
           // si el valor que llega difiere de del formato debe Ajustarse
           this.ValorFecha=this.value;
      },

  watch: {
    /**
     * Watch for value change from other input with same v-model.
     * @param {Number} newValue
     */
    value (newValue) {  
      this.ValorFecha =  newValue  
    }, 
  },
     data() {
          return { 
            ValorFecha: '',
            configdateTimePicker: {
                  locale: Spanish, 
                  enableTime: true,
                  dateFormat: 'd-m-Y'
            
              },
              ///////////////// FECHAS FECHAS
              configdateTimePickerSoloHora: {
                  locale: Spanish,
                  enableTime: true,
                  enableSeconds: true,
                  noCalendar: true
              },
              // NORMAL
              
              // FECHA Y HORA
              configdateTimePickerFYH: {
                  locale: Spanish,
                  enableTime: true,
                  dateFormat: 'd-m-Y H:i'
              },
 
  
          }
         },   
    methods: {

     updateValue () { 
      //console.log("Fech a Valor ",this.ValorFecha)
      this.$emit('input',this.ValorFecha)
    },
     onFocusHandler (e) {
      this.$emit('focus', e) 
       
        this.ValorFecha = null
      
    },
    }
  }
</script> 


    