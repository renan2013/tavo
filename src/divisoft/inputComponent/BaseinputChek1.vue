<template id="radio-set">
   
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
        <vs-radio v-model="name"  :vs-value="item.value">{{item.text}}</vs-radio>
        </li>
    </ul>
 
 
</template>
 

<script>  

/*

 <li  :key="index"  v-for="(item, index) in LIST_ESTADOCIVIL" >
                                                      <vs-radio v-model="IND_ESTADOCIVIL" :vs-value="item.value">{{item.text}}</vs-radio>
                                               </li>

 { text: "CASADO", value: "1" },
     { text: "SOLTERO", value: "2" },
     { text: "DOVORCIADO", value: "3" },
     { text: "VIUDO(A)", value: "4" },
     { text: "UNION LIBRE", value: "5" },
     { text: "SEPARADO DE HECHO", value: "6" },
doorOptions: [
        { key: "Yes", value: 1 },
        { key: "No", value: 0 },
        { key: "Maybe", value: 5 },
        { key: "A new option", value: 25 }
      ],
 */
  export default {
       props: {
            'label-name': '',
            'name': '',
            'value': '',
            'options': '',
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