<template id="radio-set">
   <div class="centerx"> 
   
    <ul class="centerx">
        <li  
        type="button"
        v-for="(item, index) in options"
        :key="index"
        @click="clicked(item)"
        :id="name" 
        :name="name" 
        :label="labelName" 
        >   
        
         <vs-checkbox    :vs-value="item.value" :color="color">{{item.text}}</vs-checkbox>
        </li>
    </ul>
 
 </div>
</template>
 

<script>  

export default {
       props: {
            'label-name': '',
            'name': '',
            'value': '',
            'options': '',
        },

        data() {
        return {
          color:"success"
        }
    },
     
    methods: {
         clicked(item) {  
   
      this.$emit("input", item.value);


    }
    /*,
      clicked: function(variable, key, value) {
    // none of this is right, it doesn't update the vue data model
		window[variable] = value; //assign the new value to the dynamic variable name
		selected = value;
		this.$emit("click-event", variable) //create the click event for model updating by the parent
    }*/
    }
  }
</script>  