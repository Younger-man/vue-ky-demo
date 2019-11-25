<template>
  <div class="wrapper">
    <classifyheader></classifyheader>
    <classifytitle v-if="classRes" :list="classRes.cols" class="classify"></classifytitle>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import classifyheader from '../components/classify/classify-head.vue';
import classifytitle from '../components/classify/classify-title.vue';

export default {
  components: {
    classifyheader,
    classifytitle,
  },
  computed: {
    ...mapState('home', {
      classRes: state => state.class,
    }),
  },
  activated() {
    if (!this.classRes || Object.keys(this.classRes).length === 0) {
      this.$store.dispatch('home/qryClass');
    }
  },
  created() {
    // //console.log()
    // if (!this.classRes || !this.classRes.cols) {
    //   this.$store.dispatch('home/qryClass');
    // }
    this.$store.dispatch('home/qryClass');
  },
};
</script>

<style scoped>
.wrapper {
  height: 100%;
}
.classify {
  height: calc(100% - 50px);
  overflow: scroll;
}
</style>
