import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: () => import("../views/FrontLayout.vue"),
      children: [
        {
          path: "/",
          component: () => import("../views/HomeView.vue"),
        },

        {
          path: "products",
          component: () => import("../views/ProductsView.vue"),
        },

        {
          // 產品細節，用 :id 搜尋
          path: "product/:id",
          component: () => import("../views/ProductView.vue"),
        },
        {
          path: "cart",
          component: () => import("../views/CartView.vue"),
        },
        {
          path: "order",
          component: () => import("../views/OrderView.vue"),
        },
        {
          path: "checkorder/:orderId",
          component: () => import("../views/CheckOrderView.vue"),
        },
      ],
    },
  ],
});

export default router;
