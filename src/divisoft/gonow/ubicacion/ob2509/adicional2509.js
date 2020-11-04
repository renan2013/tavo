
         // seccion de  PARA AGREGAR EN  ROUTER 
       
          { 

                    path: '/Modulo/GO_DIRECCIONES',
                    name: 'GO_DIRECCIONES',
                    component: () => import('./divisoft/ob2509/wr2509.vue'),
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/'},
                            { title: 'GO_DIRECCIONES' },
                            { title: 'Principal', active: true },
                        ],
                        pageTitle: 'Principal',
                        rule: 'editor'
                    },
                }, 
                
                /// FIN DE ROUTER
               
        //  SECCION DEL MENU 
           {
                url: "/Modulo/GO_DIRECCIONES" ,
                slug: "GO_DIRECCIONES",
                name: "GO_DIRECCIONES",
                icon: "UserIcon",
                i18n: "obj2509",
              },  
               