<template>
  <div>
    <!--<img src="http://174.138.48.60:8080/jmc/files/21767981_1592715177418629_3628223620344681669_n.jpg" alt="">-->
    <!--<pre>{{ path }}</pre>-->
    <form enctype="multipart/form-data" novalidate v-if="isInitial || isSaving">
      <h1>Upload images</h1>
      <div class="dropbox">
        <input type="file" :multiple="multiple" :name="uploadFieldName" :disabled="isSaving"
               @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length"
                class="input-file">
        <p v-if="isInitial">
          Drag your file(s) here to begin<br> or click to browse
        </p>
        <p v-if="isSaving">
          Uploading {{ fileCount }} files...
        </p>
      </div>
    </form>

    <!--SUCCESS-->
    <div v-if="isSuccess">
      <h2>Uploaded {{ uploadedFiles.length }} file(s) successfully.</h2>
      <p>
        <a href="javascript:void(0)" @click="reset()">Upload again</a>
      </p>
      <ul class="list-unstyled">
        <li v-for="item in uploadedFiles">
          <img :src="path + '/' +item.image" class="img-responsive img-thumbnail" :alt="item.name">
        </li>
      </ul>
    </div>
    <!--FAILED-->
    <div v-if="isFailed">
      <h2>Uploaded failed.</h2>
      <p>
        <a href="javascript:void(0)" @click="reset()">Try again</a>
      </p>
      <pre>{{ uploadError }}</pre>
    </div>
    <pre>{{ item }}</pre>
  </div>
</template>

<script>
  const STATUS_INITIAL = 0
  const STATUS_SAVING = 1
  const STATUS_SUCCESS = 2
  const STATUS_FAILED = 3

  export default {
    name: 'uploadImage',
    props: ['item', 'path', 'multiple'],
    data () {
      return {
        uploadedFiles: [],
        uploadError: null,
        currentStatus: null,
        uploadFieldName: 'file',
        fileCount: ''
      }
    },
    computed: {
      isInitial () {
        return this.currentStatus === STATUS_INITIAL
      },
      isSaving () {
        return this.currentStatus === STATUS_SAVING
      },
      isSuccess () {
        return this.currentStatus === STATUS_SUCCESS
      },
      isFailed () {
        return this.currentStatus === STATUS_FAILED
      }
    },
    methods: {
      upload (formData) {
        let url = 'insurancecompanies/' + this.item.id + '/uploadimage'
        let self = this.$store.dispatch('dispatchHTTP', {type: 'INSERT', url: url, data: formData})
        return self
      },
      reset () {
        // reset form to initial state
        this.currentStatus = STATUS_INITIAL
        this.uploadedFiles = []
        this.uploadError = null
      },
      save (formData) {
        // upload data to the server
        this.currentStatus = STATUS_SAVING

        this.upload(formData)
          .then(this.wait(1500))
          .then(x => {
            if (x.status) {
              this.uploadedFiles = [].concat(x.content)
              this.currentStatus = STATUS_SUCCESS
            } else {
              this.uploadError = x.content
              this.currentStatus = STATUS_FAILED
            }
          })
          .catch(err => {
            this.uploadError = err
            this.currentStatus = STATUS_FAILED
          })
      },
      filesChange (fieldName, fileList) {
        // handle file changes
        alert('Change')
        const formData = new FormData()

        if (!fileList.length) return

        // append the files to FormData
        Array.from(Array(fileList.length).keys())
          .map(x => {
            formData.append(fieldName, fileList[x], fileList[x].name)
          })

        // save it
        this.save(formData)
      },
      wait (ms) {
        return (x) => {
          return new Promise(resolve => setTimeout(() => resolve(x), ms))
        }
      }
    },
    mounted () {
      this.reset()
    }
  }
</script>

<style lang="scss">
  .dropbox {
    outline: 2px dashed grey; /* the dash box */
    outline-offset: -10px;
    background: lightcyan;
    color: dimgray;
    padding: 10px 10px;
    min-height: 200px; /* minimum height */
    position: relative;
    cursor: pointer;
  }

  .input-file {
    opacity: 0; /* invisible but it's there! */
    width: 100%;
    height: 200px;
    position: absolute;
    cursor: pointer;
  }

  .dropbox:hover {
    background: lightblue; /* when mouse over to the drop zone, change color */
  }

  .dropbox p {
    font-size: 1.2em;
    text-align: center;
    padding: 50px 0;
  }
</style>
