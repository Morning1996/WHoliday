<script>
import { mapActions, mapState } from "pinia";
import { RouterLink } from "vue-router";
import pagination from "../components/pagination.vue";
import loadingStore from "../stores/loadingStore";

const { VITE_URL, VITE_PATH } = import.meta.env;

export default {
  data() {
    return {
      products: [],
      page: {},
    };
  },
  methods: {
    getProducts(page = 1) {
      this.$http(`${VITE_URL}v2/api/${VITE_PATH}/products/?page=${page}`)
        .then((res) => {
          console.log(res);
          this.products = res.data.products;
          this.page = res.data.pagination;
          console.log("this.page", this.page);
          console.log("res.data", res.data);
        })
        .catch((err) => console.log(err));
    },
    ...mapActions(loadingStore, ["loading"]),
  },
  components: {
    RouterLink,
    pagination,
  },
  computed: {
    ...mapState(loadingStore, ["isLoading"]),
  },
  mounted() {
    this.getProducts();
    this.loading();
  },
};
</script>
<template>
  <VueLoading v-model:active="isLoading" />

  <div class="mb-60">
    <div
      class="banner d-flex flex-column justify-content-center align-items-center"
      style="background-image: url(../../src/assets/images/京都.avif)"
    >
      <!-- <div class="text-white fs-64 fw-bold mb-24 text-center banner-text">
        <p>簡單五步驟，</p>
        <p>輕鬆找工作！</p>
      </div> -->
    </div>
  </div>

  <div class="container mb-60">
    <h2 class="fs-40 fw-bold mb-32">職缺推薦</h2>
    <div class="row">
      <div class="col-lg-4 mb-24" v-for="product in products" :key="product.id">
        <router-link :to="`product/${product.id}`">
          <div class="card shadow-sm border-0">
            <img
              :src="product.imageUrl"
              class="card-img-top"
              :alt="`${product.title}的照片`"
            />
            <div class="card-body px-24 bg-light">
              <div class="mb-8">
                <i class="bi bi-geo-alt-fill me-8"></i
                ><span>{{ product.category }}</span>
              </div>
              <h3 class="card-title mb-24">{{ product.title }}</h3>
              <div class="d-flex justify-content-end align-items-center">
                <p class="mb-0 me-md-32 me-8 fs-md-20">
                  JPY {{ product.origin_price }}～{{ product.price }} / 時薪
                </p>
                <button
                  type="button"
                  class="btn btn-secondary rounded-pill py-md-8 px-md-24s"
                >
                  查看更多
                </button>
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
    <!-- props -->
    <pagination :pages="page" :get-products="getProducts"></pagination>
  </div>
</template>
