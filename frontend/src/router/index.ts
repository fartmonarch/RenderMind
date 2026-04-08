import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'command-center',
      component: () => import('../pages/CommandCenter.vue'),
      meta: { title: '指令中控', icon: 'dashboard' }
    },
    {
      path: '/render-lab',
      name: 'render-lab',
      component: () => import('../pages/RenderLab.vue'),
      meta: { title: '渲染实验室', icon: 'terminal' }
    },
    {
      path: '/diagnostic',
      name: 'diagnostic',
      component: () => import('../pages/DiagnosticLab.vue'),
      meta: { title: '诊断实验室', icon: 'code' }
    },
    {
      path: '/schema-vault',
      name: 'schema-vault',
      component: () => import('../pages/SchemaVault.vue'),
      meta: { title: '架构金库', icon: 'vault' }
    }
  ]
})

router.beforeEach((to, _from, next) => {
  document.title = `RenderMind // ${to.meta.title || 'Forge'}`
  next()
})

export default router
