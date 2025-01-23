import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";

const { VITE_URL, VITE_PATH } = import.meta.env;

// 目前這個環境，不屬於 vue
const cartStore = defineStore("cart", {
  // state 概念同「data」，在此可以使用箭頭函式
  state: () => {
    return {
      carts: [],
      cartNum: 1, // 確定 Pinia 有正確運作
      cartProductId: [], // 用來存放購物車已有的產品，避免重複收藏
      loadingItem: "",
    };
  },
  // actions 概念同「methods」
  actions: {
    // 取得購物車列表
    getCart() {
      axios.get(`${VITE_URL}/v2/api/${VITE_PATH}/cart`).then((res) => {
        // console.log("購物車列表:", res.data.data);
        this.carts = res.data.data.carts;
        for (let i = 0; i < res.data.data.carts.length; i++) {
          this.cartProductId.push(res.data.data.carts[i].product_id);
        }
        // console.log("cartProductId:", this.cartProductId);
      });
    },
    addToCart(product_id, qty = 1) {
      const data = {
        data: {
          product_id,
          qty,
        },
      };
      if (this.cartProductId.includes(product_id)) {
        // console.log("已加入");
        Swal.fire({
          icon: "warning",
          title: "收藏清單已經有了！",
          showConfirmButton: false,
          timer: 3000,
        });
      } else {
        axios.post(`${VITE_URL}api/${VITE_PATH}/cart`, data).then((res) => {
          // console.log("加入購物車:", res.data);
          Swal.fire({
            icon: "success",
            title: "成功加入收藏清單！",
            showConfirmButton: false,
            timer: 3000,
          });
          this.getCart();
        });
      }
    },
    deleteCartitem(item) {
      axios
        .delete(`${VITE_URL}v2/api/${VITE_PATH}/cart/${item.id}`)
        .then((res) => {
          console.log("刪除購物車:", res.data);
          Swal.fire({
            icon: "success",
            title: "成功刪除該職缺！",
            showConfirmButton: false,
            timer: 3000,
          });
          this.getCart();
        });
    },
    deleteCarts() {
      axios.delete(`${VITE_URL}v2/api/${VITE_PATH}/carts`).then((res) => {
        console.log("刪除全部購物車:", res.data);
        Swal.fire({
          icon: "success",
          title: "成功刪除所有職缺！",
          showConfirmButton: false,
          timer: 3000,
        });
        this.getCart();
      });
    },
  },
  getters: {},
});

export default cartStore;
