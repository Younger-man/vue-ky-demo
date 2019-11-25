<template>
  <div class="wrapper">
    <scroll class="scroll" :cache-key="swipertarget" @scroll-bottom="reqlistRes">
      <div class="header">
        <img class="header-img" :src="swiperring.thumbnail" />
      </div>
      <div class="infotext">{{ swiperring.desc }}</div>
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
  name: 'swiperrings',
  components: {
    scroll,
    ringlist,
  },
  data() {
    return {
      id: '',
      url: '',
      ps: 20,
    };
  },
  activated() {
    this.getRes(this.swipertarget);
    this.getRouterData();
  },
  methods: {
    ...mapActions('home', ['qryswiperlistRes', 'qrySwiperRing']),
    // 获取首页轮播图下合辑
    getRes(swipertarget) {
      this.qrySwiperRing(swipertarget);
    },
    // 下滑请求资源
    reqlistRes() {
      this.px = this.px + 1;
      this.qryswiperlistRes({ id: this.swipertarget, px: this.px, ps: this.ps });
    },
    getRouterData() {
      this.px = this.$route.params.px;
    },
  },
  computed: {
    ...mapState('home', {
      swiperring: state => state.swiperring,
      swipertarget: state => state.swipertarget,
      swiperlistRes: state => state.swiperlistRes,
    }),
    concatrings() {
      const {
        swiperring: { rings = [] },
      } = this;
      return rings.concat(this.swiperlistRes.rings || []);
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
.header {
  box-sizing: border-box;
  width: 100%;
  margin: 15px 0 8px 0;
  padding: 0 16px;
}
.header-img {
  width: 100%;
  border-radius: 15px;
}
.infotext {
  box-sizing: border-box;
  width: 100%;
  padding: 0 17px;
  color: #c4c4c4;
  font-size: 14px;
}
.ring {
  width: 100%;
  margin-top: 8px;
}
.scroll {
  height: 100%;
}
</style>
