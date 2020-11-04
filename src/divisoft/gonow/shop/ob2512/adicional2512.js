
         // seccion de  PARA AGREGAR EN  ROUTER 
       
          { 

                    path: '/Modulo/GO_COMISIONPATNER',
                    name: 'GO_COMISIONPATNER',
                    component: () => import('./divisoft/ob2512/wr2512.vue'),
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/'},
                            { title: 'GO_COMISIONPATNER' },
                            { title: 'Principal', active: true },
                        ],
                        pageTitle: 'Principal',
                        rule: 'editor'
                    },
                }, 
                
                /// FIN DE ROUTER
               
        //  SECCION DEL MENU 
           {
                url: "/Modulo/GO_COMISIONPATNER" ,
                slug: "GO_COMISIONPATNER",
                name: "GO_COMISIONPATNER",
                icon: "UserIcon",
                i18n: "obj2512",
              },  
               