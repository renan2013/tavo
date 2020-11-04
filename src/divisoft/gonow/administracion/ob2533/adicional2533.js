
         // seccion de  PARA AGREGAR EN  ROUTER 
       
          { 

                    path: '/Modulo/GO_TRANSPORTEVOLUMEN',
                    name: 'GO_TRANSPORTEVOLUMEN',
                    component: () => import('./divisoft/ob2533/wr2533.vue'),
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/'},
                            { title: 'GO_TRANSPORTEVOLUMEN' },
                            { title: 'Principal', active: true },
                        ],
                        pageTitle: 'Principal',
                        rule: 'editor'
                    },
                }, 
                
                /// FIN DE ROUTER
               
        //  SECCION DEL MENU 
           {
                url: "/Modulo/GO_TRANSPORTEVOLUMEN" ,
                slug: "GO_TRANSPORTEVOLUMEN",
                name: "GO_TRANSPORTEVOLUMEN",
                icon: "UserIcon",
                i18n: "obj2533",
              },  
               