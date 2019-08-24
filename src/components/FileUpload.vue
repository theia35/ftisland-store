<template>
  <div class="file">
    <div class="uploadLabel" :ref="imgId" @click="browseFileWindow(inputId)" :class="{ uploaded: cloneUploadStatus === 'uploaded', uploading:cloneUploadStatus === 'uploading', video: inputId === 'file4' }">
      <button class="initialFile" v-show="cloneUploadStatus === 'uploaded'" @click.stop="initialUploadedFile"></button>
      <div class="uploadContent">
        <span :ref="thumbId" v-show="cloneUploadStatus !== 'uploaded'">{{ thumbText }}</span>
        <progress class="progress is-primary" :value="progress" max="100" v-show="progressShow">{{ progress }}</progress>
      </div>
    </div>
    <input class="fileInput" style="display: none" type="file" :ref="inputId" @change="onFileChange( $event, imgId, 0)" :accept="uploadType" multiple>
  </div>
</template>

<script>
import firebaseObj from '@/middleware/firebaseHelper.js';

export default {
  name: 'FileUpload',
  props: ['uploadType', 'inputId', 'imgId', 'thumbId', 'uploadStatus'],
  data () {
    return {
      file: [],
      fileUrlList: [],
      policy: '',
      status: this.uploadStatus,
      thumbText: '',
      progress: '',
      progressShow: false
    }
  },
  computed: {
    cloneUploadStatus: {
      get () {
        return this.uploadStatus;
      },
      set (val) {
        this.$emit('update:uploadStatus', val)
      }
    }
  },
  mounted () {
    if(this.inputId === 'file4'){
      this.thumbText = '影片';
    } else {
      this.thumbText = '照片';
    }
  },
  methods: {
    browseFileWindow (item) {
      this.$refs[item].click();
    },
    initialUploadedFile () {
      this.cloneUploadStatus = 'default';
      this.$refs[this.imgId].style.backgroundImage = '';
      this.$refs[this.inputId].value = '';
    },
    putStorageFile (item){
      let self = this;
      let storageRef = firebaseObj.storage.ref(new Date().getTime() + item.name).put(item);
      
      storageRef.on('state_changed', (snapshot) => {
        self.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      }, (error) => {
        // Handle unsuccessful uploads
      }, () => {
        storageRef.snapshot.ref.getDownloadURL().then(function(downloadURL) {
          console.log('File available at', downloadURL);
          self.fileUrlList.push(downloadURL)
          self.$emit('update:fileUrlList', self.fileUrlList)
        });
      });
      return storageRef;
    },
    async onFileChange (e, item, index) {
      for(let i=0; i < e.target.files.length; i++){
        this.file.push(e.target.files[i]);
      }
      // this.file = e.target.files;
      if (!this.file) {
        this.initialUploadedFile();
        this.progressShow = false;
        return;
      } else {
        this.cloneUploadStatus = 'default';
        this.$refs[this.imgId].style.backgroundImage = '';
        this.progress = '0';
        let self = this;
        this.progressShow = true;
        this.cloneUploadStatus = 'uploading';
        Promise.all(
          // Array of "Promises"
          this.file.map(item => this.putStorageFile(item))
        )
        .then((url) => {
          console.log(`All success`)
        })
        .catch((error) => {
          console.log(`Some failed: `, error.message)
        });
      }
    }
  }
}
</script>

<style lang="sass" scoped>
  .file
    width: 24%
    display: inline-block
    margin-right: .5em
    .uploadLabel
      width: 100%
      height: 80px
      cursor: pointer
      display: flex
      justify-content: center
      align-items: flex-end
      background: url(/img/uploadpic.svg) center #ffffff no-repeat
      border: dashed 2px #c7c7c7
      .uploadContent
        position: absolute
        text-align: center
        width: 97%
        span
          color: #4a4a4a
          font-size: 12px
        progress
          height: .5em
      .initialFile
        background: url(/img/icon-no.svg) center transparent no-repeat
        width: 15px
        height: 15px
        position: absolute
        top: 5px
        right: 5px
        border: none
    .uploadLabel.video
      background: url(/img/videoupload.svg) center #ffffff no-repeat
    .uploaded
      background-size: contain
    .uploaded.video
      background: url(/img/videosuccess.svg) center
      background-size: cover
      border: none
      border-radius: 5px
    .uploading
      border-color: #dbdbdb
      opacity: 0.5
      pointer-events: none
      user-select: none
  .file:last-child
    margin-right: 0
  .networkMsg
    font-size: 12px
    color: #fd737a
  @media (max-width: 800px)
    .file
      margin-right: 1vw
      .uploadLabel
        height: 60px
        border: dashed 1px #c7c7c7
</style>
