
         // seccion de  PARA AGREGAR EN  ROUTER 
       
          { 

                    path: '/Modulo/GO_CANTONES',
                    name: 'GO_CANTONES',
                    component: () => import('./divisoft/ob2504/wr2504.vue'),
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/'},
                            { title: 'GO_CANTONES' },
                            { title: 'Principal', active: true },
                        ],
                        pageTitle: 'Principal',
                        rule: 'editor'
                    },
                }, 
                
                /// FIN DE ROUTER
               
        //  SECCION DEL MENU 
           {
                url: "/Modulo/GO_CANTONES" ,
                slug: "GO_CANTONES",
                name: "GO_CANTONES",
                icon: "UserIcon",
                i18n: "obj2504",
              },  
               