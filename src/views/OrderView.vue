<script>
import { mapActions, mapState } from "pinia";
import cartStore from "../stores/cartStore";
import { RouterLink } from "vue-router";

const { VITE_URL, VITE_PATH } = import.meta.env;

export default {
  data() {
    return {
      order: {
        user: {},
      },
      orderId: "",
    };
  },
  components: { RouterLink },
  computed: {
    // mapState(store名稱, ['要取得的值'])
    ...mapState(cartStore, ["carts"]),
  },
  methods: {
    ...mapActions(cartStore, ["getCart"]),
    createOrder() {
      this.$http
        .post(`${VITE_URL}v2/api/${VITE_PATH}/order`, { data: this.order })
        .then((res) => {
          // console.log("建立訂單:",res.data)
          // console.log("id:",res.data.orderId);
          this.orderId = res.data.orderId;
          this.$router.push(`checkorder/${this.orderId}`);
        });
    },
  },
  mounted() {
    this.getCart();
  },
};
</script>

<template>
  <div class="mb-60">
    <div
      class="banner d-flex flex-column justify-content-center align-items-center"
      style="background-image: url(../../src/assets/images/街道.avif)"
    >
      <!-- <div class="text-white fs-64 fw-bold mb-24 text-center banner-text">
        <p>簡單五步驟，</p>
        <p>輕鬆找工作！</p>
      </div> -->
    </div>
  </div>

  <div class="container mb-32">
    <h2 class="fs-40 fw-bold mb-32">填寫資料</h2>
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

  <div class="container mb-80">
    <div class="row">
      <div class="col-md-6">
        <div
          v-for="item in carts"
          class="bg-light py-24 px-12 d-md-flex justify-content-between align-items-center mb-12"
        >
          <h3 class="ms-md-12 text-center">{{ item.product.title }}</h3>
          <div class="d-flex justify-content-center">
            <p class="mb-0 me-8">
              研修期：時薪 {{ item.product.origin_price }}
            </p>
            <p class="mb-0">研修後：時薪 {{ item.product.price }}</p>
          </div>
        </div>
      </div>

      <div class="col-md-6 bg-light py-12">
        <VForm ref="form" v-slot="{ errors }" @submit="createOrder">
          <div class="mb-16">
            <label for="email" class="form-label">Email</label>
            <VField
              id="email"
              name="email"
              type="email"
              class="form-control"
              :class="{ 'is-invalid': errors['email'] }"
              placeholder="請輸入 Email"
              rules="email|required"
              v-model="order.user.email"
            />
            <ErrorMessage name="email" class="invalid-feedback" />
          </div>
          <div class="mb-16">
            <label for="name" class="form-label">收件人姓名</label>
            <VField
              id="name"
              name="姓名"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors['姓名'] }"
              placeholder="請輸入姓名"
              rules="required"
              v-model="order.user.name"
            />
            <ErrorMessage name="姓名" class="invalid-feedback" />
          </div>

          <div class="mb-16">
            <label for="tel" class="form-label">收件人電話</label>
            <VField
              id="tel"
              name="電話"
              type="tel"
              class="form-control"
              :class="{ 'is-invalid': errors['電話'] }"
              placeholder="請輸入電話"
              rules="required|numeric|length:10"
              v-model="order.user.tel"
            />
            <ErrorMessage name="電話" class="invalid-feedback" />
          </div>

          <div class="mb-16">
            <label for="address" class="form-label">收件人地址</label>
            <VField
              id="address"
              name="地址"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors['地址'] }"
              placeholder="請輸入地址"
              rules="required"
              v-model="order.user.address"
            />
            <ErrorMessage name="地址" class="invalid-feedback" />
          </div>

          <div class="mb-16">
            <label for="message" class="form-label">留言</label>
            <textarea
              id="message"
              class="form-control"
              cols="30"
              rows="10"
              v-model="order.message"
            ></textarea>
          </div>
          <div class="text-end">
            <button type="submit" class="btn btn-dark">送出資料</button>
          </div>
        </VForm>
      </div>
    </div>
  </div>
</template>
