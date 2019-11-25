<template>
  <div class="wrapper">
    <scroll :cache-key="classid" class="scroll" @scroll-bottom="reqlistRes">
      <div class="ring">
        <ringlist :list="concatrings"></ringlist>
      </div>
    </scroll>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import ringlist from '../components/common/ringlist';
import scroll from '../components/common/scroll';

export default {
  name: 'classifyrings',
  components: {
    scroll,
    ringlist,
  },
  data() {
    return {
      id: '',
      theme: '',
      target: '',
      px: 0,
      ps: 20,
    };
  },
  activated() {
    this.getRes(this.classid);
    // this.getRouterData();
    this.px = 0;
  },
  methods: {
    ...mapActions('home', ['qryColRes', 'qryClassListRes']),
    getRes(classid) {
      this.qryColRes(classid);
    },
    // getRouterData() {
    //   this.px = this.$route.params.px;
    // },
    reqlistRes() {
      this.px = this.px + 1;
      this.qryClassListRes({ id: this.classtarget, px: this.px, ps: this.ps });
    },
  },
  computed: {
    ...mapState('home', {
      compilationRes: state => state.compilationRes,
      listRes: state => state.listRes,
      classtarget: state => state.classtarget,
      classid: state => state.classid,
      classlistRes: state => state.classlistRes,
    }),

    concatrings() {
      const { compilationRes: { rings = [] } = {} } = this;
      return rings.concat(this.classlistRes.rings || []);
    },
  },
};
</script>

<style scoped>
.wrapper {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}
.ring {
  width: 100%;
  overflow: scroll;
}
.scroll {
  height: 100%;
}
</style>
