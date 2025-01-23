<script>
const { VITE_URL, VITE_PATH } = import.meta.env;

export default {
  data() {
    return {
      orders: {},
      productsDetail: [],
    };
  },
  methods: {
    getOrder() {
      //  console.log(this.$route);
      const { orderId } = this.$route.params;

      this.$http(`${VITE_URL}v2/api/${VITE_PATH}/order/${orderId}`).then(
        (res) => {
          this.orders = res.data.order;
          const productsLength = Object.values(this.orders.products).length;
          // console.log(Object.values(res.data.order.products))
          for (let i = 0; i < productsLength; i++) {
            this.productsDetail.push(Object.values(this.orders.products)[i]);
          }
          console.log(this.productsDetail);
        }
      );
    },
  },
  mounted() {
    this.getOrder();
  },
};
</script>
<!-- Object.values(orders.products)[0].product.title   -->
<template>
  <div class="mb-60">
    <div
      class="banner d-flex flex-column justify-content-center align-items-center"
      style="background-image: url(../../src/assets/images/街道.avif)"
    >
      <!-- ㄐㄨㄟ -->
    </div>
  </div>

  <div class="container mb-32">
    <h2 class="fs-40 fw-bold mb-32">完成訂單</h2>
    <ul class="d-flex justify-content-center ps-0">
      <li class="d-flex flex-column align-items-center mx-md-60 mx-16">
        <div
          class="bg-primary step-circle rounded-circle text-center fs-40 fw-bold mb-8"
        >
          1
        </div>
        <p class="fs-md-28 fw-bold">確認收藏</p>
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
    <h3 class="text-center">感謝您的投遞，工作方會盡速回應您！</h3>
    <div
      v-for="item in productsDetail"
      class="bg-light py-24 px-12 d-flex justify-content-between align-items-center mb-24"
    >
      <div class="d-flex align-items-center">
        <!-- <img
          :src="item.product.imageUrl"    
          alt=" `${item.product.title}的照片` "
          style="width: 200px"
        /> -->
        <h3 class="ms-12">{{ item.product.title }}</h3>
      </div>
      <div class="d-flex">
        <p class="mb-0 me-24">研修期：時薪{{ item.product.origin_price }}</p>
        <p class="mb-0">研修後：時薪{{ item.product.price }}</p>
      </div>
    </div>
  </div>
</template>
