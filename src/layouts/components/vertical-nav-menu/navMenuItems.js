/*=========================================================================================
  File Name: sidebarItems.js
  Description: Sidebar Items list. Add / Remove menu items from here.
  Strucutre:
          url     => router path
          name    => name to display in sidebar
          slug    => router path name
          icon    => Feather Icon component/icon name
          tag     => text to display on badge
          tagColor  => class to apply on badge element
          i18n    => Internationalization
          submenu   => submenu of current item (current item will become dropdown )
                NOTE: Submenu don't have any icon(you can add icon if u want to display)
          isDisabled  => disable sidebar item/group
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

export const menuVisitante = [{
        url: "/dashboard/analytics",
        name: "Principal",
        slug: "dashboard",
        icon: "HomeIcon",
    },

    {
        url: "/acercade",
        name: "Quienes Somos",
        slug: "acercade",
        icon: "UserIcon",

    },
    {
        url: "/oficinas",
        name: "Oficinas",
        slug: "oficinas",
        icon: "CodeIcon",
    },
    {
        url: "/servicios",
        name: "Servicios",
        slug: "servicios",
        icon: "CodeIcon",
    },
    {
        url: "/pages/login",
        name: "Iniciar Sesión",
        slug: "page-login",
        icon: "UserIcon",
    },
];

export const menuBasico = [{
        header: "Principal",
        icon: "HomeIcon",
        name: "Dashboard",
        items: [{
                url: "/dashboard/analytics",
                name: "Principal",
                slug: "dashboard",
                icon: "HomeIcon",
                //isDisabled: true
                rol: [{ rol: "admin" }, { rol: "general" }]
            },
            {
                url: "/apps/chat/0",
                name: "chat",
                slug: "chat",
                icon: "HomeIcon",
                i18n: "Chat"
            },

            {
                url: "/clasificaPedido",
                name: "Pedidos",
                slug: "Pedido",
                icon: "HomeIcon",
                i18n: "Clasifica"
            },
            {
                url: "/asignaTareas",
                name: "Asignar Tareas",
                slug: "asignaTareas",
                icon: "HomeIcon",
            },
            {
                url: "/consultaViajes",
                name: "Consultar Viajes",
                slug: "consultaViajes",
                icon: "HomeIcon",
            },
            {
                url: "/clientes",
                name: "Clientes Registrados",
                slug: "clientes",
                icon: "HomeIcon",
            },
        ]
    },

    {
        url: "/acercade",
        name: "Quienes Somos",
        slug: "acercade",
        icon: "UserIcon",

    },
    {
        url: "/oficinas",
        name: "Oficinas",
        slug: "oficinas",
        icon: "InfoIcon",
    },
    {
        url: "/servicios",
        name: "Servicios",
        slug: "servicios",
        icon: "SettingsIcon",
    },
    {
        url: "/pages/login",
        name: "Iniciar Sesión",
        slug: "page-login",
        icon: "UserIcon",
    },
];

export const menuMensa = [{
        header: "Principal",
        icon: "HomeIcon",
        name: "Dashboard",
        items: [{
                url: "/dashboard/analytics",
                name: "Principal",
                slug: "dashboard-analytics",
                icon: "HomeIcon",
                //isDisabled: true
                rol: [{ rol: "admin" }, { rol: "general" }]
            },
            {
                url: "/apps/chat/0",
                name: "chat",
                slug: "chat",
                icon: "HomeIcon",
                i18n: "Chat"
            },

            {
                url: "/clasificaPedido",
                name: "Pedidos",
                slug: "Pedido",
                icon: "HomeIcon",
                i18n: "Clasifica"
            },
            {
                url: "/asignaTareas",
                name: "Asignar Tareas",
                slug: "asignaTareas",
                icon: "HomeIcon",
            },
            {
                url: "/consultaViajes",
                name: "Consultar Viajes",
                slug: "consultaViajes",
                icon: "HomeIcon",
            },
            {
                url: "/clientes",
                name: "Clientes Registrados",
                slug: "clientes",
                icon: "HomeIcon",
            },
            {
                url: "/sitioMensajeria",
                name: "Mensajeria",
                slug: "Mensajeria",
                icon: "HomeIcon",
                i18n: "Mensajeria"
            },

        ]
    },

    {
        url: "/acercade",
        name: "Quienes Somos",
        slug: "acercade",
        icon: "UserIcon",

    },
    {
        url: "/oficinas",
        name: "Oficinas",
        slug: "oficinas",
        icon: "CodeIcon",
    },
    {
        url: "/servicios",
        name: "Servicios",
        slug: "servicios",
        icon: "CodeIcon",
    },
    {
        url: "/pages/login",
        name: "Iniciar Sesión",
        slug: "page-login",
        icon: "UserIcon",
    },

];