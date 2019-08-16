<template>
  <div class="adminStore">
    <router-link :to="'/add-product'">新增商品</router-link>
    <div class="product-list">
    0件商品
    <div class="product-item">
      <div class="product-name">{{productList[0].name}}</div>
      <img class="product-img" :src="productList[0].img" alt="">
      <div class="product-price">${{productList[0].price}}</div>
    </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import firebaseObj from '@/middleware/firebaseHelper.js';

export default {
  name: 'AdminStore',
  data: () => ({
    productList: [],
  }),
  mounted () {
    this.updateProduct()
  },
  methods: {
    async updateProduct () {
      let vm = this;
      const productRef = firebaseObj.database.ref('/product/');
      await productRef.on('value', function(data) {
        const val = data.val()
        vm.productList = val;
      });
    },
  }
}
</script>

<style>
</style>
