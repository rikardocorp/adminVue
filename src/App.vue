<template>
  <router-view></router-view>
</template>


<script>
  export default {
    name: 'app',
    created(){
      console.log('Created')
    }
  }
</script>


<style lang="scss">
  // Import Font Awesome Icons Set
  $fa-font-path: "~font-awesome/fonts/";
  /*@import url('https://fonts.googleapis.com/css?family=Muli:200,200i,300,300i,400,700,800i,900i');*/

  @import '~bootstrap/dist/css/bootstrap.css';
  @import '~bootstrap-vue/dist/bootstrap-vue.css';
  @import "~font-awesome/css/font-awesome.min.css";
  @import "~vue-multiselect/dist/vue-multiselect.min.css";
  // Import Simple Line Icons Set
  $simple-line-font-path: "~simple-line-icons/fonts/";
  @import "~simple-line-icons/css/simple-line-icons.css";
  @import "../node_modules/animate.css/animate.min.css";
  @import "../node_modules/hover.css/css/hover-min.css";
  // Import Main styles for this application
  @import "../scss/style";
</style>

