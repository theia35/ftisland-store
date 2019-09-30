<template>
  <div class="GetMAilStatus">
    <h2>取得包裹狀態</h2>
    
    <div class="add-product-form">
      <div class="field">
        <div class="control">
          <textarea class="textarea" :placeholder="'郵件單號'" name="note" v-model.trim="mailNo"></textarea>
        </div>
      </div>
      <div style="text-align: center">
        <button class="button" @click="submitFrom()">送出</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'GetMailStatus',
  data: () => ({
    mailNo: null
  }),
  methods: {
    async submitFrom () {
      
        var data = {
          "header":{ 
            "InputVOClass":"com.systex.jbranch.app.server.post.vo.EB500100InputVO",
            "TxnCode":"EB500100",
            "BizCode":"query2",
            "StampTime":true,
            "SupvPwd":"",
            "TXN_DATA":{},
            "SupvID":"",
            "CustID":"",
            "REQUEST_ID":"",
            "ClientTransaction":true,
            "DevMode":false,
            "SectionID":"esoaf"
          },
          "body":{ 
            "MAILNO": this.mailNo,
            "pageCount":10
          }
        };
        let url = 'http://postserv.post.gov.tw/pstmail/EsoafDispatcher';
        let config = {
          headers: {
            'Content-Type': 'application/json'
          }
        }
        await axios.post(url, {data}, config).then((res) => {
          console.log(res[0].body.host_rs.ITEM[0].STATUS);
        }).catch(err => {
          alert(err.message);
        })
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
