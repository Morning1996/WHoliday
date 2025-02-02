<script>
import { mapActions, mapState } from "pinia";
import cartStore from "../stores/cartStore";
import loadingStore from "../stores/loadingStore";
import { RouterLink } from "vue-router";

export default {
  components: { RouterLink },
  computed: {
    // mapState(store名稱, ['要取得的值'])
    ...mapState(cartStore, ["carts"]),
    ...mapState(loadingStore, ["isLoading"]),
  },
  methods: {
    ...mapActions(cartStore, ["getCart", "deleteCartitem", "deleteCarts"]),
    ...mapActions(loadingStore, ["loading"]),
  },
  mounted() {
    this.getCart();
    this.loading();
  },
};
</script>

<template>
  <VueLoading v-model:active="isLoading" />

  <div class="mb-60">
    <div
      class="banner d-flex flex-column justify-content-center align-items-center"
      style="background-image: url(../../src/assets/images/鳥居2.avif)"
    >
      <!-- <div class="text-white fs-64 fw-bold mb-24 text-center banner-text">
        <p>簡單五步驟，</p>
        <p>輕鬆找工作！</p>
      </div> -->
    </div>
  </div>
  <div class="container">
    <h2 class="fs-40 fw-bold mb-32">確認訂單</h2>
    <ul class="d-flex justify-content-center mb-24">
      <li class="d-flex flex-column align-items-center mx-md-60 mx-16">
        <div
          class="bg-primary step-circle rounded-circle text-center fs-40 fw-bold mb-8"
        >
          1
        </div>
        <p class="fs-md-28 fw-bold">確認訂單</p>
      </li>
      <li class="d-flex flex-column align-items-center mx-md-60 mx-16">
        <div
          class="bg-primary step-circle rounded-circle text-center fs-40 fw-bold mb-8"
        >
          2
        </div>
        <p class="fs-md-28 fw-bold">填寫資料</p>
      </li>
      <li class="d-flex flex-column align-items-center mx-md-60 mx-16">
        <div
          class="bg-primary step-circle rounded-circle text-center fs-40 fw-bold mb-8"
        >
          3
        </div>
        <p class="fs-md-28 fw-bold">完成訂單</p>
      </li>
    </ul>
  </div>

  <div class="container">
    <div v-if="carts.length !== 0">
      <div
        v-for="item in carts"
        class="bg-light py-md-24 px-md-16 mb-24 d-md-flex justify-content-between align-items-center text-center"
      >
        <div class="d-md-flex align-items-center">
          <button
            type="button"
            class="btn fs-28 text-gray me-8"
            @click="deleteCartitem(item)"
          >
            <i class="bi bi-trash3-fill"></i>
          </button>
          <img
            :src="item.product.imageUrl"
            alt=" `${item.product.title}的照片` "
            style="width: 250px"
            class="mx-auto"
          />
          <h3 class="ms-md-12 fs-32 fw-bold">{{ item.product.title }}</h3>
        </div>

        <div class="d-md-flex justify-content-center align-items-center fs-24">
          <p class="mb-0 me-md-24">
            研修期：時薪 {{ item.product.origin_price }}
          </p>
          <p class="mb-0">研修後：時薪 {{ item.product.price }}</p>
        </div>
      </div>

      <div class="text-center mb-80">
        <router-link :to="`/order`">
          <button
            type="button"
            class="btn btn-primary rounded-pill px-80 py-12 fw-bold"
          >
            填寫資料
          </button></router-link
        >
        <!-- <button @click="deleteCarts()" type="button" class="btn btn-primary">
          全部刪除
        </button> -->
      </div>
    </div>

    <div v-else>
      <div class="text-center">
        <h3 class="mb-24">您目前沒有收藏的職缺，快去看看吧！</h3>
        <router-link
          :to="`/products`"
          class="btn btn-primary rounded-pill px-60 py-12 fw-bold mb-80"
          >瀏覽職缺</router-link
        >
      </div>
    </div>
  </div>
</template>
