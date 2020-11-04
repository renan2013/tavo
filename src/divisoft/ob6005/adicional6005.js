
         // seccion de  PARA AGREGAR EN  ROUTER 
       
          { 

                    path: '/Modulo/ERP_PAISES',
                    name: 'ERP_PAISES',
                    component: () => import('./divisoft/ob6005/wr6005.vue'),
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/'},
                            { title: 'ERP_PAISES' },
                            { title: 'Principal', active: true },
                        ],
                        pageTitle: 'Principal',
                        rule: 'editor'
                    },
                }, 
                
                /// FIN DE ROUTER
               
        //  SECCION DEL MENU 
           {
                url: "/Modulo/ERP_PAISES" ,
                slug: "ERP_PAISES",
                name: "ERP_PAISES",
                icon: "UserIcon",
                i18n: "obj6005",
              },  
               