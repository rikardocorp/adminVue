<template>
  <div class="upload-file">
    <!--<img src="http://174.138.48.60:8080/jmc/files/21767981_1592715177418629_3628223620344681669_n.jpg" alt="">-->
    <!--<pre>{{ path }}</pre>-->
    <form enctype="multipart/form-data" novalidate v-if="isInitial || isSaving">
      <div class="dropbox">
        <input type="file" :multiple="multiple" :name="uploadFieldName" :disabled="isSaving"
               @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length"
               class="input-file">
        <p v-if="isInitial">
          Arrastra tu imagen aquí para comenzar<br> o haz clic para buscar la imagen <br>
          <i class="fa fa-picture-o fa-4x pt-3" aria-hidden="true"></i> <br>
          <span class="text-italic">* Se recomienda cargar una imagen cuadrada y menor a 1MB de tamaño</span>
        </p>
        <p v-if="isSaving">
          Cargando una imagen...
        </p>
      </div>
    </form>
    <!--SUCCESS-->
    <div v-if="isSuccess">
      <p class="message">Se ha cargado la imagen exitosamente.</p>
      <p class="text-center">
        <a href="javascript:void(0)" @click.prevent="reset()">Cargar otra imagen</a>
      </p>
      <!--<ul class="list-unstyled">-->
        <!--<li v-for="item in uploadedFiles">-->
          <!--<img :src="path + '/' +item.image" class="img-responsive img-thumbnail" :alt="item.name">-->
        <!--</li>-->
      <!--</ul>-->
    </div>
    <!--FAILED-->
    <div v-if="isFailed">
      <p class="message">Carga Fallida.</p>
      <p class="text-center">
        <a href="javascript:void(0)" @click="reset()">Volver a intentar</a>
      </p>
      <pre>{{ uploadError }}</pre>
    </div>
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
              this.$emit('emitCallback', x.content)
              // this.uploadedFiles = [].concat(x.content)
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
    watch: {
      item (newVal, oldVal) {
        this.reset()
      }
    },
    mounted () {
      this.reset()
    }
  }
</script>

<style lang="scss" scoped="">
  .dropbox {
    outline: 2px dashed grey; /* the dash box */
    outline-offset: -10px;
    background: lightcyan;
    color: dimgray;
    padding: 0 20px;
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
    padding: 30px 0;
    line-height: 1.4;
  }

  .upload-file{
    p.message{
      color: #4ebc75;
      text-align: center;
      font-size: 1.5em;
    }

    form {
      .text-italic {
        font-size: 0.8em;
        color: #4ebc75;
        font-style: italic;
        padding: 15px 60px 0;
        display: block;
      }
    }
  }
</style>
