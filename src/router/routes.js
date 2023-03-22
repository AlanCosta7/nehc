

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'home', component: () => import('pages/Index.vue') },
      { path: 'surround', name: 'surround', component: () => import('pages/Inicio.vue') },
      { path: 'security', name: 'security', component: () => import('pages/Inicio.vue') },
      { path: 'utility', name: 'utility', component: () => import('pages/Inicio.vue') },
      { path: 'surround/resultado', name: 'surround-resultado', component: () => import('pages/Resultados.vue') },
      { path: 'security/resultado', name: 'security-resultado', component: () => import('pages/Resultados.vue') },
      { path: 'utility/resultado', name: 'utility-resultado', component: () => import('pages/Resultados.vue') },
      { path: 'surround/institucional', name: 'surround-institucional', component: () => import('pages/Institucional.vue') },
      { path: 'surround/produtos', name: 'surround-produtos', component: () => import('pages/Produtos.vue') },
      { path: 'surround/produto/:id', name: 'surround-produto', component: () => import('pages/Produto.vue') },

      { path: 'surround/suporte', name: 'surround-suporte', component: () => import('pages/Suporte.vue') },
      { path: 'security/institucional', name: 'security-institucional', component: () => import('pages/Institucional.vue') },
      { path: 'security/produtos', name: 'security-produtos', component: () => import('pages/Produtos.vue') },
      { path: 'security/produto/:id', name: 'security-produto', component: () => import('pages/Produto.vue') },

      { path: 'security/suporte', name: 'security-suporte', component: () => import('pages/Suporte.vue') },
      { path: 'utility/institucional', name: 'utility-institucional', component: () => import('pages/Institucional.vue') },
      { path: 'utility/produtos', name: 'utility-produtos', component: () => import('pages/Produtos.vue') },
      { path: 'utility/produto/:id', name: 'utility-produto', component: () => import('pages/Produto.vue') },

      { path: 'utility/suporte', name: 'utility-suporte', component: () => import('pages/Suporte.vue') },
    ]
  },
  {
    path: '/admin',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      { path: '', name: 'auth', component: () => import('pages/admin/Auth.vue') },
      { path: 'produtos-admin', name: 'produtos-admin', component: () => import('pages/admin/ProdutosAdmin.vue') },
      { path: 'blog-admin', name: 'blog-admin', component: () => import('pages/admin/BlogAdmin.vue') },
      { path: 'acessos', name: 'acessos', component: () => import('pages/admin/Acessos.vue') },
      { path: 'sobre-admin', name: 'sobre-admin', component: () => import('pages/admin/SobreAdmin.vue') },
      { path: 'contato-admin', name: 'contato-admin', component: () => import('pages/admin/ContatoAdmin.vue') },
      { path: 'suporte-admin', name: 'suporte-admin', component: () => import('pages/admin/SuporteAdmin.vue') },
      { path: 'pages-admin', name: 'pages-admin', component: () => import('pages/admin/PagesAdmim.vue') },
      { path: 'faixa-paralax-admin', name: 'faixa-paralax-admin', component: () => import('pages/admin/FaixaParalaxAdmin.vue') },
      { path: 'banner-home-admin', name: 'banner-home-admin', component: () => import('pages/admin/BannerHomeAdmin.vue') },
      { path: 'banner-institucional-admin', name: 'banner-institucional-admin', component: () => import('pages/admin/BannerInstitucionalAdmin.vue') },
      { path: 'banner-admin', name: 'banner-admin', component: () => import('pages/admin/Banners.vue') },
      { path: 'banner-produto', name: 'banner-produto', component: () => import('pages/admin/BannersProduto.vue') },
      { path: 'site', name: 'site', component: () => import('pages/admin/Site.vue') },
      { path: 'social', name: 'social', component: () => import('pages/admin/Social.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
