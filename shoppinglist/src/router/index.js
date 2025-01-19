import { createRouter, createWebHistory } from 'vue-router'
import ListView from '../views/ListView.vue'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import FormView from '../views/FormView.vue'
import ShoppingView from '../views/ShoppingView.vue'
import ItemsView from '../views/ItemsView.vue'
import NewItemView from '../views/NewItemView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
        path: '/lists',
        name: 'lists',
        component: ListView
    },
    {
      path: '/items',
      name: 'items',
      component: ItemsView
    },
    {
      path: '/createlist',
      name: 'createlist',
      component: FormView
    },
    {
      path: '/ShoppingList/:id',
      name: 'ShoppingList',
      component: ShoppingView,
      props: true, // Ermöglicht das automatische Übergeben von Routen-Parametern als Props
  },
  {
    path: '/NewItemToList/:id',
    name: 'NewItemToList',
    component: NewItemView,
    props: true, // Ermöglicht das automatische Übergeben von Routen-Parametern als Props
},
  ]
})

export default router
