<script>
const { VITE_URL, VITE_PATH } = import.meta.env;

import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { RouterLink } from "vue-router";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default {
  data() {
    return {
      products: [],
      modules: [Autoplay, Navigation, Pagination],
    };
  },
  methods: {
    getproducts() {
      this.$http(`${VITE_URL}v2/api/${VITE_PATH}/products/all`).then((res) => {
        // console.log(res);
        for (let i = 0; i < 6; i++) {
          this.products.push(res.data.products[i]);
        }
      });
    },
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  mounted() {
    this.getproducts();
  },
};
</script>

<template>
  <!-- swiper -->
  <div class="mb-60">
    <!-- <swiper
      :slides-per-view="1"
      :space-between="100"
      :loop="true"
      :autoplay="{
        delay: 3000,
        disableOnInteraction: false,
      }"
      :modules="modules"
      :navigation="true"
      :pagination="{ clickable: true }"
    >
      <swiper-slide>
        <img src="../../src/assets/images/東京.avif" alt="" />
      </swiper-slide>
      <swiper-slide>
        <img src="../../src/assets/images/京都.avif" alt="" />
      </swiper-slide>
      <swiper-slide>
        <img src="../../src/assets/images/北海道ba.avif" alt="" />
      </swiper-slide>
    </swiper> -->
    <div
      class="banner-home d-flex flex-column justify-content-center align-items-center"
      style="background-image: url(../../src/assets/images/東京.avif)"
    >
      <div
        class="text-white fs-32 fs-md-64 fw-bold mb-24 text-center banner-home-text"
      >
        <p>簡單五步驟，</p>
        <p>輕鬆找工作！</p>
        <router-link :to="`/products`">
          <button
            type="button"
            class="btn btn-primary rounded-pill px-80 py-12 fw-bold me-32"
          >
            立即找職缺
          </button></router-link
        >
      </div>
    </div>
  </div>

  <div class="container mb-60">
    <h2 class="fs-40 fw-bold mb-32">應徵流程</h2>
    <ul>
      <li class="d-flex flex-column align-items-center mb-12">
        <div class="d-flex align-items-center">
          <i class="bi bi-bookmark-check-fill fs-60 me-16"></i>
          <h3 class="mb-0">找尋職缺</h3>
        </div>
        <p class="fs-20 text-gray text-break d-none d-md-block">
          確定想要應徵的工作後，將職缺加入收藏清單。
        </p>
      </li>
      <li class="d-flex flex-column align-items-center mb-12">
        <div class="d-flex align-items-center">
          <i class="bi bi-send-fill fs-60 me-16"></i>
          <h3 class="mb-0">送出申請</h3>
        </div>
        <p class="fs-20 text-gray d-none d-md-block">
          一次申請所有已加入收藏的職缺。
        </p>
      </li>
      <li class="d-flex flex-column align-items-center mb-12">
        <div class="d-flex align-items-center">
          <i class="bi bi-person-check-fill fs-60 me-16"></i>
          <h3 class="mb-0">安排面試</h3>
        </div>
        <p class="fs-20 text-gray d-none d-md-block">
          工作方收到申請後，會依職缺不同，可能會進行不只一次的面試。
        </p>
      </li>
      <li class="d-flex flex-column align-items-center mb-12">
        <div class="d-flex align-items-center">
          <i class="bi bi-bell-fill fs-60 me-16"></i>
          <h3 class="mb-0">錄取通知</h3>
        </div>
        <p class="fs-20 text-gray d-none d-md-block">
          面試結束後，工作方會盡快通知面試結果。
        </p>
      </li>
      <li class="d-flex flex-column align-items-center mb-12">
        <div class="d-flex align-items-center">
          <i class="bi bi-airplane-fill fs-60 me-16"></i>
          <h3 class="mb-0">前往日本</h3>
        </div>
        <p class="fs-20 text-gray d-none d-md-block">
          錄取後前往日本，展開為期一年的打工度假之旅！
        </p>
      </li>
    </ul>
  </div>

  <div class="container mb-60">
    <h2 class="fs-40 fw-bold mb-32">熱門職缺</h2>
    <div class="row">
      <div class="col-lg-6 mb-24" v-for="product in products" :key="product.id">
        <router-link :to="`product/${product.id}`">
          <div class="card shadow-sm border-0">
            <img
              :src="product.imageUrl"
              class="card-img-top"
              :alt="`${product.title}的照片`"
            />
            <div class="card-body px-32 bg-light">
              <div class="mb-8">
                <i class="bi bi-geo-alt-fill me-8"></i
                ><span>{{ product.category }}</span>
              </div>
              <h3 class="card-title mb-24">{{ product.title }}</h3>

              <div class="d-flex justify-content-end align-items-center">
                <p class="mb-0 me-md-32 me-8 fs-md-24">
                  JPY {{ product.origin_price }}～{{ product.price }} / 時薪
                </p>
                <button
                  type="button"
                  class="btn btn-secondary rounded-pill py-md-8 px-md-24"
                >
                  查看更多
                </button>
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>

  <div class="container mb-60">
    <h2 class="fs-40 fw-bold mb-32">常見問題</h2>
    <div class="accordion" id="accordionPanelsStayOpenExample">
      <div class="accordion-item mb-4 shadow-sm p-3 mb-5 bg-body rounded">
        <h2 class="accordion-header" id="panelsStayOpen-headingOne">
          <button
            class="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#panelsStayOpen-collapseOne"
            aria-expanded="true"
            aria-controls="panelsStayOpen-collapseOne"
          >
            如何應徵有興趣的工作？
          </button>
        </h2>
        <div
          id="panelsStayOpen-collapseOne"
          class="accordion-collapse collapse show"
          aria-labelledby="panelsStayOpen-headingOne"
        >
          <div class="accordion-body">
            找到喜歡的工作後，點即加入收藏，最後再一併送出即完成應徵。
          </div>
        </div>
      </div>
      <div class="accordion-item mb-4 shadow-sm p-3 mb-5 bg-body rounded">
        <h2 class="accordion-header" id="panelsStayOpen-headingTwo">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#panelsStayOpen-collapseTwo"
            aria-expanded="false"
            aria-controls="panelsStayOpen-collapseTwo"
          >
            多久會收到對方的聯繫？
          </button>
        </h2>
        <div
          id="panelsStayOpen-collapseTwo"
          class="accordion-collapse collapse"
          aria-labelledby="panelsStayOpen-headingTwo"
        >
          <div class="accordion-body">
            對方會於工作日 48 小時回復回覆，若超過時間可再次應徵，或與我們聯繫。
          </div>
        </div>
      </div>
      <div class="accordion-item mb-4 shadow-sm p-3 mb-5 bg-body rounded">
        <h2 class="accordion-header" id="panelsStayOpen-headingThree">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#panelsStayOpen-collapseThree"
            aria-expanded="false"
            aria-controls="panelsStayOpen-collapseThree"
          >
            與其他代辦的差別？
          </button>
        </h2>
        <div
          id="panelsStayOpen-collapseThree"
          class="accordion-collapse collapse"
          aria-labelledby="panelsStayOpen-headingThree"
        >
          <div class="accordion-body">
            本平台不收取任何費用，且能與工作方直接面談，減少透過仲介的時間溝通，以此提升效率。
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- 重疊樣式 -->
<!-- <div class="position-relative">
            <img :src="product.imageUrl" class="" alt="..." />
            <div
              class="bg-primary position-absolute end-0 translate-middle-y p-16"
              style="height: 150px; width: 400px"
            >
              <h3 class="text-black">{{ product.title }}</h3>
              <div class="d-flex justify-content-between align-items-center">
                <p class="text-black mb-0">JPY {{ product.origin_price }} / 時</p>
                <button type="button" class="btn btn-secondary">
                  加入收藏
                </button>
              </div>
            </div>
          </div> -->

<style scoped>
.swiper {
  max-width: 100%;
  height: 720px;
}
.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
