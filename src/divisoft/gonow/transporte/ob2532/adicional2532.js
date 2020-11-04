
         // seccion de  PARA AGREGAR EN  ROUTER 
       
          { 

                    path: '/Modulo/GO_TIPOTRANSPORTE',
                    name: 'GO_TIPOTRANSPORTE',
                    component: () => import('./divisoft/ob2532/wr2532.vue'),
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/'},
                            { title: 'GO_TIPOTRANSPORTE' },
                            { title: 'Principal', active: true },
                        ],
                        pageTitle: 'Principal',
                        rule: 'editor'
                    },
                }, 
                
                /// FIN DE ROUTER
               
        //  SECCION DEL MENU 
           {
                url: "/Modulo/GO_TIPOTRANSPORTE" ,
                slug: "GO_TIPOTRANSPORTE",
                name: "GO_TIPOTRANSPORTE",
                icon: "UserIcon",
                i18n: "obj2532",
              },  
               