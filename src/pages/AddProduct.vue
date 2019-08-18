<template>
  <div class="AddProduct">
    <h2>新增商品</h2>
    批量上傳
      <FileUpload :uploadType="'image/jpeg,image/jpg,image/png'" :inputId="'file1'" :imgId="'photo1'" 
        :thumbId="'thumb1'" :uploadStatus.sync="uploadStatus[0].status" />
    <div class="add-product-form">
      <div class="columns">
        <div class="column">
          <div class="field">
            <label class="label">*商品名稱：</label>
            <div class="control">
              <input class="input" type="text" :placeholder="'商品名稱'" name="name" v-model.trim="name" />
              <!-- <span v-show="errors.has('name')" class="help is-danger">{{ errors.first('name') }}</span> -->
            </div>
          </div>
          <div class="field">
            <label class="label">養心註解：</label>
            <div class="control">
              <input class="input" type="text" :placeholder="'養心註解：'" name="yxdname" v-model.trim="name" />
            </div>
          </div>
          <div class="field">
            <label class="label">*商品售價</label>
            <div class="control">
              <input class="input" type="text" :placeholder="'商品售價'" name="price"  v-model.trim="price" />
            </div>
          </div>

          <div class="field">
            <label class="label">*新增圖片</label>
            <div class="control">
              <img src="">
            </div>
          </div>
          <div class="field">
            <div class="control">
              <textarea class="textarea" :placeholder="'備註'" name="message" v-model.trim="message" ></textarea>
            </div>
          </div>
          <div class="field">
            <div class="control" style="text-align: center">
              <button class="button">新增</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AddProduct',
  components: {
    FileUpload: () => import('@/components/FileUpload.vue'),
  },
  data: () => ({
    name:'',
    price:'',
    uploadStatus:'',
    message:'',
    uploadStatus: [
      {status: 'default'},
      {status: 'default'},
      {status: 'default'},
      {status: 'default'},
    ],
  }),
  mounted () {
  },
  methods: {
    oauthSignIn () {
      // Google's OAuth 2.0 endpoint for requesting an access token
      var oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

      // Create <form> element to submit parameters to OAuth 2.0 endpoint.
      var form = document.createElement('form');
      form.setAttribute('method', 'GET'); // Send as a GET request.
      form.setAttribute('action', oauth2Endpoint);

      // Parameters to pass to OAuth 2.0 endpoint.
      var params = {'client_id': '265443846719-nrchkclafkqtdu83fuhlfm87qgm8jfuu.apps.googleusercontent.com',
                    'redirect_uri': 'https://ftisland-web.web.app',
                    'response_type': 'token',
                    'scope': 'https://www.googleapis.com/auth/devstorage.full_control',
                    'include_granted_scopes': 'true',
                    'state': 'pass-through value'};

      // Add form parameters as hidden input values.
      for (var p in params) {
        var input = document.createElement('input');
        input.setAttribute('type', 'hidden');
        input.setAttribute('name', p);
        input.setAttribute('value', params[p]);
        form.appendChild(input);
      }

      // Add form to page and submit it to open the OAuth 2.0 endpoint.
      document.body.appendChild(form);
      form.submit();
    }
  }
}
</script>

<style>
</style>
