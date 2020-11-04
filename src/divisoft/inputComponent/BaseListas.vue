<template>
<ul class="centerx">
    <label>{{ label }}</label>
{{ amount }} 
    <li type="button" v-for="(item, index) in jsonlista" 
    :key="index" 
    @click="clicked(item)" 
    :id="name" 
    :name="name" 
    v-model="amount"
    >

        <vs-checkbox  v-model="amount" :vs-value="item.value" v-if="tipo=='C'" :color="color">{{item.text}}</vs-checkbox>

        <vs-radio v-else v-model="amount" :vs-value="item.value">{{item.text}}</vs-radio>

    </li>
</ul>
</template>

<script>
export default {

    // CHECK BOK DEBE SER PARA 2 VALORES ACTIVO O INACTIVO
    props: {

        label: {
            type: String,
            required: true
        },
        value: {
            type: String
        },
        name: {
            type: String
        },

        tipo: {
            type: String,
            default: 'C',
            required: false
        },
        jsonlista: {
            type: Array,
            required: true
        } 
    },

    mounted() {
        console.log("Selec con VALOR ", this.value)
        // si el valor que llega difiere de del formato debe Ajustarse
        this.amount = this.value;
    },
    watch: {
        /**
         * Watch for value change from other input with same v-model.
         * @param {Number} newValue
         */
        value(newValue) {
            console.log("WATCH DEL LISTA",newValue)
            this.amount = newValue
        },
    },
    data() {
        return {
            color: "success",
            amount: '',
        }
    },
    methods: {
        clicked(item) {
            this.$emit('input', this.amount);
        },
        onFocusHandler(e) {
            this.$emit('focus', e)
            this.amount = null 
        },

    }
}
</script>
