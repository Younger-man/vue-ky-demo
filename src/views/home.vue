<template>
  <div class="home">
    <homeheader></homeheader>
    <scroll class="scroll" @scroll-bottom="reqlistRes">
      <ky-swiper v-if="isKeep && colResImg.length > 1" :list="colResImg" @selected="handleClick"></ky-swiper>
      <div class="none" v-if="colResImg.length == 1" @click="oneImgClick()">
        <img class="swiper-img" :src="colResImg[0].thumbnail" />
      </div>
      <div class="none" v-if="this.colResImg == null || undefined">
        <img class="swiper-img" src="../images/head-img.png" />
      </div>
      <div class="title">最热铃声</div>
      <ringlist :list="concatrings"></ringlist>
    </scroll>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';
import { ResType } from '@ring-order/lib/constant/types';
import homeheader from '../components/home/home-header.vue';
import ringlist from '../components/common/ringlist.vue';
import scroll from '../components/common/scroll.vue';
import KySwiper from '@/components/ky-swiper.vue';

export default {
  data() {
    return {
      px: 0,
      ps: 20,
      swiperpx: 0,
      isKeep: true,
    };
  },
  created() {
    this.qryCols();
  },
  computed: {
    ...mapGetters('home', ['colResRing', 'colResImg']),
    ...mapState('home', {
      colRes: state => state.colRes,
      listRes: state => state.listRes,
    }),
    concatrings() {
      const {
        colResRing: { rings = [] },
      } = this;
      return rings.concat(this.listRes.rings || []);
    },
  },
  activated() {
    // console.log('activated');
    this.isKeep = true;
    if (Object.keys(this.colRes).length === 0) {
      this.qryCols();
    }
  },
  deactivated() {
    // console.log('deactivated');
    this.isKeep = false;
  },
  methods: {
    ...mapMutations('home', {
      emptyswiperlistRes: 'EMPTYSWIPERLISTRES',
      swipertarget: 'SWIPERTARGET',
    }),
    ...mapActions('home', ['qryCols', 'qryListRes']),
    reqlistRes() {
      this.px = this.px + 1;
      this.qryListRes({ id: this.colResRing.target, px: this.px, ps: this.ps });
    },
    // 跳转到轮播图下合辑页面
    handleClick(item) {
      this.emptyswiperlistRes();
      if (item.type === ResType.BannerLinkToUrl) {
        window.location.href = item.linkUrl;
      } else {
        this.swipertarget(item.target);
        this.$router.push({
          name: `swiperrings`,
          params: { px: this.swiperpx },
        });
      }
    },
    // 一张图片时点击事件
    oneImgClick() {
      this.emptyswiperlistRes();
      this.swipertarget(this.colResImg[0].target);
      this.$router.push({
        name: `swiperrings`,
        params: { px: this.swiperpx },
      });
    },
  },
  components: {
    homeheader,
    ringlist,
    scroll,
    KySwiper,
  },
};
</script>
<style scoped>
.home {
  height: 100%;
}
.scroll {
  height: calc(100% - 50px);
}
.title {
  width: 80px;
  height: 25px;
  margin-top: 20px;
  margin-bottom: 7px;
  margin-left: 19px;
  color: #333333;
  font-weight: 600;
  font-size: 18px;
  font-family: '黑体';
}
.none {
  box-sizing: border-box;
  width: 100%;
  padding: 0 15px;
  overflow: hidden;
  text-align: center;
}
.swiper-img {
  width: 100%;
  border-radius: 10px;
}
</style>
