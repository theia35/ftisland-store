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
      file: '',
      fileList: [],
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
    async onFileChange (e, item, index) {
      this.file = e.target.files[0];
      if (!this.file) {
        this.initialUploadedFile();
        this.progressShow = false;
        return;
      } else {
        this.cloneUploadStatus = 'default';
        this.$refs[this.imgId].style.backgroundImage = '';
        this.progress = '0';
        let self = this;
        // if (this.file.size > 10*1024*1024) {
        //   alert('File upload 10MB limit');
        //   return;
        // }
        this.progressShow = true;
        this.cloneUploadStatus = 'uploading';
        let storageRef = firebaseObj.storage.ref(new Date().getTime() + this.file.name).put(this.file);
        storageRef.on('state_changed', function(snapshot){
          if (self.file) {
            let reader = new FileReader();
            reader.onload = function (e) {
              if(item !== "photo4"){
                self.$refs[item].style.backgroundImage = "url(" + e.target.result + ")";
              }
              self.cloneUploadStatus = 'uploaded';
              self.progressShow = false;
              self.progress = 0;
              self.$emit('progressShow', false);
            }
            reader.readAsDataURL(self.file);
          }
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          // switch (snapshot.state) {
          //   case firebaseObj.storage.TaskState.PAUSED: // or 'paused'
          //     console.log('Upload is paused');
          //     break;
          //   case firebaseObj.storage.TaskState.RUNNING: // or 'running'
          //     console.log('Upload is running');
          //     break;
          // }
        }, function(error) {
          // Handle unsuccessful uploads
        }, function() {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          storageRef.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            console.log('File available at', downloadURL);
          });
        });
        // storageRef.child(this.file.name).put(this.file).then(function(snapshot) {
        //   console.log('Uploaded a blob or file!');
        // });
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
