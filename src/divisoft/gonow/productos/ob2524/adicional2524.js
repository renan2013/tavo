
         // seccion de  PARA AGREGAR EN  ROUTER 
       
          { 

                    path: '/Modulo/GO_SHOPMARCA',
                    name: 'GO_SHOPMARCA',
                    component: () => import('./divisoft/ob2524/wr2524.vue'),
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/'},
                            { title: 'GO_SHOPMARCA' },
                            { title: 'Principal', active: true },
                        ],
                        pageTitle: 'Principal',
                        rule: 'editor'
                    },
                }, 
                
                /// FIN DE ROUTER
               
        //  SECCION DEL MENU 
           {
                url: "/Modulo/GO_SHOPMARCA" ,
                slug: "GO_SHOPMARCA",
                name: "GO_SHOPMARCA",
                icon: "UserIcon",
                i18n: "obj2524",
              },  
               