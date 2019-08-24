<template>
  <div class="AddProduct">
    <h2>新增商品</h2>
    批量上傳
      <FileUpload :uploadType="'image/jpeg,image/jpg,image/png'" :inputId="'file1'" :imgId="'photo1'" 
        :thumbId="'thumb1'" :uploadStatus.sync="uploadStatus[0].status" :fileUrlList.sync="fileUrlList" />
    <div class="add-product-form">
      <div v-if="fileUrlList" class="columns">
        <div v-for="(url, index) in fileUrlList" :key="url" class="column is-one-quarter">
          <div class="field">
            <div class="control">
              <img :src="url">
            </div>
          </div>
          <div class="field">
            <label class="label">*商品名稱：</label>
            <div class="control">
              <input class="input" type="text" :placeholder="'商品名稱'" name="productName" v-model.trim="productName[index]" />
              <!-- <span v-show="errors.has('name')" class="help is-danger">{{ errors.first('name') }}</span> -->
            </div>
          </div>
          <div class="field">
            <label class="label">養心註解：</label>
            <div class="control">
              <input class="input" type="text" :placeholder="'養心註解'" name="yxdname" v-model.trim="yxdname[index]" />
            </div>
          </div>
          <div class="field">
            <label class="label">*商品售價</label>
            <div class="control">
              <input class="input" type="text" :placeholder="'商品售價'" name="price"  v-model.trim="price[index]" />
            </div>
          </div>
          <div class="field">
            <div class="control">
              <textarea class="textarea" :placeholder="'備註'" name="note" v-model.trim="note[index]" ></textarea>
            </div>
          </div>
        </div>
      </div>
      <div v-if="fileUrlList" style="text-align: center">
        <button class="button" @click="submitFrom()">新增</button>
      </div>
    </div>
  </div>
</template>

<script>
import firebaseObj from '@/middleware/firebaseHelper.js';
import axios from 'axios';

export default {
  name: 'AddProduct',
  components: {
    FileUpload: () => import('@/components/FileUpload.vue'),
  },
  data: () => ({
    productName:[],
    yxdname:[],
    price:[],
    note:[],
    uploadStatus: [
      {status: 'default'},
      {status: 'default'},
      {status: 'default'},
      {status: 'default'},
    ],
    fileUrlList: [],
    isRequired: true
  }),
  watch: {
    fileUrlList () {
      this.productName.push('');
      this.yxdname.push('');
      this.price.push('');
      this.note.push('');
    },
  },
  mounted () {
  },
  methods: {
    async submitFrom () {
      this.productName.forEach(item => {
        if (item == '') {
          this.isRequired =false;
        }
      })
      this.price.forEach(item => {
        if (item == '') {
          this.isRequired =false;
        }
      })
      if (this.isRequired) {
        const productRef = firebaseObj.database.ref('/product/');
        this.fileUrlList.forEach((item,index) => {
          productRef.push({
            productName: this.productName[index],
            yxdname: this.yxdname[index],
            price: this.price[index],
            note: this.note[index],
            url: this.fileUrlList[index],
          })
        })
        // let photoList = document.querySelectorAll('.uploadLabel');
        // photoList.forEach((item, index) => {
        //   self.uploadStatus[index].status = 'default';
        //   item.style.backgroundImage = '';
        // })
        // this.$store.commit('openEmail', false);
        // return
      } else {
        alert('help.fillform');
      }
    },
  }
}
</script>

<style>
</style>
