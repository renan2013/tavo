<template>
 <div class="centerx"  > 
    
        <label>{{ label }}</label>  
          
            <input 
                    class="vs-inputx vs-input--input large hasValue"
                    style="border: 1px solid rgba(0, 0, 0, 0.2);"
                    type="text"
                   
                    :placeholder="label"
                    :value="value" 
                    v-on:input="$emit('input', $event.target.value)"
                     /> 
           

    </div>
</template>
<script>

  
  export default {
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
        default: 'S',
        required: false
      }
     },

    methods: {
      /*updateValue: function (value) {
 
 
        this.$emit('input', value)

      }*/
    }
  }
</script> 