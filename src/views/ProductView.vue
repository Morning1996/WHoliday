<script>
// 1.取得單一產品
// 2.渲染到畫面
// 3.加入購物車 (跨元件傳遞 Pinia)
import { mapActions } from "pinia";
import cartStore from "../stores/cartStore";

import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const { VITE_URL, VITE_PATH } = import.meta.env;

export default {
  data() {
    return {
      product: {},
      products: [],
      modules: [Autoplay, Navigation, Pagination],
    };
  },
  methods: {
    getproduct() {
      //  console.log(this.$route);
      const { id } = this.$route.params;
      this.$http(`${VITE_URL}v2/api/${VITE_PATH}/product/${id}`).then((res) => {
        //  console.log(res);
        this.product = res.data.product;
      });
    },
    getproducts() {
      console.log(this.$route.params.id);
      const { id } = this.$route.params;
      this.$http(`${VITE_URL}v2/api/${VITE_PATH}/products/all`).then((res) => {
        console.log(res.data.products[0].id);
        for (let i = 0; i < res.data.products.length; i++) {
          if (id !== res.data.products[i].id && this.products.length < 3) {
            this.products.push(res.data.products[i]);
          }
        }
      });
    },
    ...mapActions(cartStore, ["addToCart"]),
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  mounted() {
    this.getproduct();
    this.getproducts();
  },
};
</script>
<template>
  <div class="mb-60">
    <swiper
      :loop="true"
      :autoplay="{
        delay: 2500,
        disableOnInteraction: false,
      }"
      :modules="modules"
      :navigation="true"
      :pagination="{ clickable: true }"
      :breakpoints="{
        '1024': {
          slidesPerView: 3,
          spaceBetween: 50,
        },
      }"
    >
      <swiper-slide>
        <img :src="product.imageUrl" :alt="`${product.title}的照片`" />
      </swiper-slide>
      <swiper-slide v-for="imgs in product.imagesUrl">
        <img :src="imgs" :alt="`${product.title}的照片`" :key="imgs" />
      </swiper-slide>

      <!-- Add Pagination -->
      <div class="swiper-pagination"></div>
      <!-- Navigation -->
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </swiper>
  </div>

  <!-- 標題旁邊 -->
  <!-- <div class="container mb-80">
    <div class="row">
      <div class="col-8 mb-8">
        <h2 class="fs-40 fw-bold mb-32">{{ product.title }}</h2>
        <i class="bi bi-geo-alt-fill fs-20 me-8"></i
        ><span>{{ product.category }}</span>
      </div>
      <div
        class="col-4 bg-light pt-34 d-flex flex-column justify-content-center sticky-top"
      >
        <h2 class="text-center fw-bold fs-28">{{ product.title }}</h2>
        <h4>研修期：{{ product.origin_price }}</h4>
        <h4>研修後：{{ product.price }}</h4>
        <button
          type="button"
          class="btn btn-primary"
          @click="() => addToCart(product.id)"
        >
          加入收藏
        </button>
      </div>
    </div>

    <h4 class="fs-28 fw-bold">工作內容</h4>
    <p class="text-wrapper fs-20">{{ product.description }}</p>
    <h4 class="fs-28 fw-bold">條件要求</h4>
    <p class="text-wrapper fs-20">
      {{ product.content }}
    </p>
    <h4 class="fs-28 fw-bold">工作福利</h4>
    <p class="text-wrapper fs-20">
      {{ product.unit }}
    </p>
    <hr />
  </div> -->

  <!-- 內容旁邊 -->
  <!-- <div class="container mb-80">
    <div class="d-flex">
      <div class="mb-8 fs-20">
        <h2 class="fs-40 fw-bold mb-32">{{ product.title }}</h2>
        <i class="bi bi-geo-alt-fill me-8"></i
        ><span>{{ product.category }}</span>
      </div>
    </div>
    <hr />
    <div class="d-flex justify-content-between align-items-center">
      <div>
        <h4 class="fs-28 fw-bold">工作內容</h4>
        <p class="text-wrapper fs-20">{{ product.description }}</p>
        <h4 class="fs-28 fw-bold">條件要求</h4>
        <p class="text-wrapper fs-20">
          {{ product.content }}
        </p>
        <h4 class="fs-28 fw-bold">工作福利</h4>
        <p class="text-wrapper fs-20">
          {{ product.unit }}
        </p>
      </div>
      <div
        class="col-4 bg-light pt-34 d-flex flex-column justify-content-center sticky-top"
        style="height: 300px"
      >
        <h2 class="text-center fw-bold fs-28">{{ product.title }}</h2>
        <h4>研修期：{{ product.origin_price }}</h4>
        <h4>研修後：{{ product.price }}</h4>
        <button
          type="button"
          class="btn btn-primary"
          @click="() => addToCart(product.id)"
        >
          加入收藏
        </button>
      </div>
    </div>
    <hr />
  </div> -->

  <!-- 
    原版備份
   -->
  <div class="container mb-80">
    <div class="row">
      <div class="col-8">
        <h2 class="fs-md-40 fs-32 fw-bold mb-32">{{ product.title }}</h2>
        <div class="mb-8 fs-20">
          <i class="bi bi-geo-alt-fill me-8"></i
          ><span>{{ product.category }}</span>
        </div>
        <hr />
        <h4 class="fs-28 fw-bold">工作內容</h4>
        <p class="text-wrapper fs-20">{{ product.description }}</p>
        <h4 class="fs-28 fw-bold">條件要求</h4>
        <p class="text-wrapper fs-20">
          {{ product.content }}
        </p>
        <h4 class="fs-28 fw-bold">工作福利</h4>
        <p class="text-wrapper fs-20">
          {{ product.unit }}
        </p>
      </div>

      <div
        class="col-md-4 bg-light pt-34 d-flex flex-column justify-content-center sticky-top"
        style="height: 300px"
      >
        <h2 class="text-center fw-bold fs-28">{{ product.title }}</h2>
        <h4>研修期：JPY {{ product.origin_price }} / 時薪</h4>
        <h4>研修後：JPY {{ product.price }} / 時薪</h4>
        <button
          type="button"
          class="btn btn-primary"
          @click="() => addToCart(product.id)"
        >
          加入收藏
        </button>
      </div>
    </div>
    <hr />
  </div>

  <!-- <div class="container mb-60">
    <h2 class="fs-40 fw-bold mb-32">其他職缺</h2>
    <div class="row">
      <div class="col-4 mb-24" v-for="product in products" :key="product.id">
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
                <p class="mb-0 me-32 fs-20">
                  JPY {{ product.origin_price }}～{{ product.price }} / 時薪
                </p>
                <button
                  type="button"
                  class="btn btn-secondary rounded-pill py-8 px-24"
                >
                  查看更多
                </button>
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div> -->

  <div class="container mb-60">
    <h2 class="fs-40 fw-bold mb-32">應徵流程</h2>
    <ul
      class="d-flex flex-column flex-lg-row justify-content-evenly ps-0 fs-md-60 fs-48"
    >
      <li class="text-center">
        <i class="bi bi-bookmark-check-fill"></i>
        <h3 class="mb-0">找尋職缺</h3>
      </li>

      <li class="text-center">
        <i class="bi bi-send-fill"></i>
        <h3 class="mb-0">送出申請</h3>
      </li>
      <li class="text-center">
        <i class="bi bi-person-check-fill"></i>
        <h3 class="mb-0">安排面試</h3>
      </li>
      <li class="text-center">
        <i class="bi bi-bell-fill"></i>
        <h3 class="mb-0">錄取通知</h3>
      </li>
      <li class="text-center">
        <i class="bi bi-airplane-fill"></i>
        <h3 class="mb-0">前往日本</h3>
      </li>
    </ul>
  </div>
</template>

<style scoped>
/* .swiper {
  max-width: 100%;
  height: 450px;
}
.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
} */
.swiper {
  width: 100%;
  height: 50vh;
  padding-bottom: 50px;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.swiper-button-prev,
.swiper-button-next {
  color: #fff; /* 修改按钮颜色 */
  /* background-color: #333; 修改按钮背景色 */
  /* 添加其他样式属性 */
}
.swiper-pagination {
  color: yellow; /* 修改按钮颜色 */
  background-color: #333; /* 修改按钮背景色 */
  /* 添加其他样式属性 */
}
</style>
