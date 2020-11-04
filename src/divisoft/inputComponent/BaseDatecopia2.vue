<template>
 <div class="centerx">  
    
      <label>{{ label }}</label>  

          <flat-pickr 
           v-if="tipo=='N'" 
           class="vs-inputx vs-input--input large hasValue"
           style="border: 1px solid rgba(0, 0, 0, 0.2);"
          :config="configdateTimePicker" 
         
         
          :placeholder="label" 
          v-model="amount"
           :label="label" 
           @input="updateValue" 
            />

              <flat-pickr 
           v-if="tipo=='FH'" 
           class="vs-inputx vs-input--input large hasValue"
           style="border: 1px solid rgba(0, 0, 0, 0.2);"
          :config="configdateTimePickerFYH" 
         
          
          :placeholder="label" 
           v-model="amount"
           :label="label"
           v-on:vs-input-number="updateValue($event.target.value)"/>


           <flat-pickr 
           v-if="tipo=='H'" 
           class="vs-inputx vs-input--input large hasValue"
           style="border: 1px solid rgba(0, 0, 0, 0.2);"
          :config="configdateTimePickerSoloHora" 
         
          
          :placeholder="label" 
            v-model="amount"
           :label="label"
           v-on:vs-input-number="updateValue($event.target.value)"/>
 

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
     data() {
          return { 
             amount: '',
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
         
         mounted () {

           console.log("llego",this.value)
           this.amount=this.value;
    // Set default value props when label undefined.
    if (!this.label) {
      this.process(this.valueNumber)
      this.amount = this.format(this.valueNumber)
      // In case of delayed props value.
      setTimeout(() => {
        this.process(this.valueNumber)
        this.amount = this.format(this.valueNumber)
      }, 500)
    }
    // Set read-only span element's class
    if (this.readOnly) this.$refs.readOnly.className = this.readOnlyClass
  },
    methods: {
   updateValue () { 
      console.log("Fecha Valor ",this.amount)
      this.$emit('input',this.amount)
    },
       
    }
  }
</script> 

 