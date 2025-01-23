<script>
import { mapActions, mapState } from "pinia";
import { RouterView, RouterLink } from "vue-router";
import cartStore from "../stores/cartStore";

const { VITE_URL, VITE_PATH } = import.meta.env;

export default {
  components: { RouterView, RouterLink },
  computed: {
    // mapState(store名稱, ['要取得的值'])
    ...mapState(cartStore, ["carts"]),
  },
  methods: {
    ...mapActions(cartStore, ["getCart"]),
  },
  mounted() {
    this.getCart();
  },
};
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white sticky-top">
    <div class="container">
      <router-link :to="`/`" class="navbar-brand">WHoliday</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse flex-grow-0" id="navbarNav">
        <ul class="navbar-nav align-items-center">
          <li class="nav-item">
            <router-link :to="`/products`" class="nav-link" aria-current="page"
              >職缺推薦</router-link
            >
          </li>
          <li class="nav-item">
            <router-link :to="`/about`" class="nav-link" aria-current="page"
              >關於我們</router-link
            >
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">常見問題</a>
          </li>
          <li class="nav-item ms-8 position-relative">
            <router-link :to="`/cart`" class="nav-link" aria-current="page">
              <i class="bi bi-bookmark-check-fill"> </i>
              <span
                class="badge rounded-pill bg-danger position-absolute top-20 start-900 translate-middle"
                >{{ carts.length }}</span
              ></router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <!-- 作為內頁顯示使用 (router)-->
  <router-view></router-view>
  <div class="footer bg-primary py-24">
    <p class="text-center fs-18 mb-0">
      本網站僅作為個人練習作品，無任何商業用途。
    </p>
  </div>
</template>
