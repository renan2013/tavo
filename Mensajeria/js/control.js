
Vue.use(Vuetable)
//document.addEventListener('DOMContentLoaded', function () {
var urlUsers = 'https://jsonplaceholder.typicode.com/users'
new Vue({
    el: '#appcontrol',

    components:{
        'vuetable-pagination': Vuetable.VuetablePagination
       },
       
    created: function () {
        this.getUsers();
    },

    data: {
        a: 1,
        fields: ['name', 'email','birthdate','nickname','gender','__slot:actions'],
        // Lista de facturas
        lists: [],

        fechaHoy: (new Date().getDate() + "/" + (new Date().getMonth() + 1) + "/" + new Date().getFullYear())
    },

    methods: {

        getUsers: function () {

            this.$http.get('https://jsonplaceholder.typicode.com/users')
                .then(function (response) {
                    this.lists = response.data;
                });
        },

        onPaginationData (paginationData) {
            this.$refs.pagination.setPaginationData(paginationData)
          },
        onChangePage (page) {
            this.$refs.vuetable.changePage(page)
          },
         
        editRow(rowData){
            alert("You clicked edit on"+ JSON.stringify(rowData))
          },
        
        deleteRow(rowData){
            alert("You clicked delete on"+ JSON.stringify(rowData))
          }

    }
});
//});
