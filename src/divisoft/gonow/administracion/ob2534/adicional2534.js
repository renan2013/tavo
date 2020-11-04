
         // seccion de  PARA AGREGAR EN  ROUTER 
       
          { 

                    path: '/Modulo/GO_RANGOVOLUMEN',
                    name: 'GO_RANGOVOLUMEN',
                    component: () => import('./divisoft/ob2534/wr2534.vue'),
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/'},
                            { title: 'GO_RANGOVOLUMEN' },
                            { title: 'Principal', active: true },
                        ],
                        pageTitle: 'Principal',
                        rule: 'editor'
                    },
                }, 
                
                /// FIN DE ROUTER
               
        //  SECCION DEL MENU 
           {
                url: "/Modulo/GO_RANGOVOLUMEN" ,
                slug: "GO_RANGOVOLUMEN",
                name: "GO_RANGOVOLUMEN",
                icon: "UserIcon",
                i18n: "obj2534",
              },  
               