
         // seccion de  PARA AGREGAR EN  ROUTER 
       
          { 

                    path: '/Modulo/GO_HASHTAG',
                    name: 'GO_HASHTAG',
                    component: () => import('./divisoft/ob2542/wr2542.vue'),
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/'},
                            { title: 'GO_HASHTAG' },
                            { title: 'Principal', active: true },
                        ],
                        pageTitle: 'Principal',
                        rule: 'editor'
                    },
                }, 
                
                /// FIN DE ROUTER
               
        //  SECCION DEL MENU 
           {
                url: "/Modulo/GO_HASHTAG" ,
                slug: "GO_HASHTAG",
                name: "GO_HASHTAG",
                icon: "UserIcon",
                i18n: "obj2542",
              },  
               