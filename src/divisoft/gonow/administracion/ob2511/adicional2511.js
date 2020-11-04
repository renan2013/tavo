
         // seccion de  PARA AGREGAR EN  ROUTER 
       
          { 

                    path: '/Modulo/GO_PERSONAS',
                    name: 'GO_PERSONAS',
                    component: () => import('./divisoft/ob2511/wr2511.vue'),
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/'},
                            { title: 'GO_PERSONAS' },
                            { title: 'Principal', active: true },
                        ],
                        pageTitle: 'Principal',
                        rule: 'editor'
                    },
                }, 
                
                /// FIN DE ROUTER
               
        //  SECCION DEL MENU 
           {
                url: "/Modulo/GO_PERSONAS" ,
                slug: "GO_PERSONAS",
                name: "GO_PERSONAS",
                icon: "UserIcon",
                i18n: "obj2511",
              },  
               