
         // seccion de  PARA AGREGAR EN  ROUTER 
       
          { 

                    path: '/Modulo/GO_COMISIONMENSAJERO',
                    name: 'GO_COMISIONMENSAJERO',
                    component: () => import('./divisoft/ob2537/wr2537.vue'),
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/'},
                            { title: 'GO_COMISIONMENSAJERO' },
                            { title: 'Principal', active: true },
                        ],
                        pageTitle: 'Principal',
                        rule: 'editor'
                    },
                }, 
                
                /// FIN DE ROUTER
               
        //  SECCION DEL MENU 
           {
                url: "/Modulo/GO_COMISIONMENSAJERO" ,
                slug: "GO_COMISIONMENSAJERO",
                name: "GO_COMISIONMENSAJERO",
                icon: "UserIcon",
                i18n: "obj2537",
              },  
               