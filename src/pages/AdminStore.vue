<template>
  <div class="adminStore">
    <router-link :to="'/add-product'">新增商品</router-link>
    <div class="product-list">
    0件商品
    <div class="product-item columns is-multiline">
      <div v-for="item in productList" :key="item.id" class="column is-one-quarter">
        <img class="product-img" :src="item.url">
        <div class="product-name">{{item.productName}}</div>
        <div class="product-yxdname">養心註解:{{item.yxdname}}</div>
        <div class="product-price">${{item.price}}</div>
        <div class="product-note">備註:{{item.note}}</div>
      </div>
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
