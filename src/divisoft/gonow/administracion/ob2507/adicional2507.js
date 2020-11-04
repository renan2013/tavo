
         // seccion de  PARA AGREGAR EN  ROUTER 
       
          { 

                    path: '/Modulo/GO_MONEDAS',
                    name: 'GO_MONEDAS',
                    component: () => import('./divisoft/ob2507/wr2507.vue'),
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/'},
                            { title: 'GO_MONEDAS' },
                            { title: 'Principal', active: true },
                        ],
                        pageTitle: 'Principal',
                        rule: 'editor'
                    },
                }, 
                
                /// FIN DE ROUTER
               
        //  SECCION DEL MENU 
           {
                url: "/Modulo/GO_MONEDAS" ,
                slug: "GO_MONEDAS",
                name: "GO_MONEDAS",
                icon: "UserIcon",
                i18n: "obj2507",
              },  
               