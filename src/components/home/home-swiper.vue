<template>
  <div class="wrapper">
    <swiper :key="swiperKey" :options="swiperOption" ref="mySwiper" v-if="isKeep && (this.list !== null || undefined)">
      <swiper-slide v-for="item in list" :key="item.id">
        <img class="swiper-img" :src="item.thumbnail || headimg" />
      </swiper-slide>
      <div v-if="shouldShowPagination" class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <div class="none" v-if="this.list == null || undefined">
      <img class="swiper-img" src="./image/head-img.png" />
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import { ResType } from '@ring-order/lib/constant/types';
import headimg from './image/head-img.png';
// import KySwiper from '@/components/ky-swiper.vue';

let vm = null;
export default {
  name: 'homeswiper',
  // components: {
  //   KySwiper,
  // },
  props: {
    list: {
      default() {
        return [];
      },
      type: Array,
    },
  },
  data() {
    return {
      swiperOption: {
        pagination: '.swiper-pagination',
        loop: '',
        autoplay: 5000,
        preventLinksPropagation: false,
        onClick(swiper) {
          const { realIndex } = swiper; // 获取当前轮播序号
          vm.handleClickSlide(realIndex); // 通过轮播序号获得当前item
        },
      },
      // headimg,
      isKeep: true,
      swiperKey: 'swiperKey',
      px: 0,
      headimg,
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    },
    shouldShowPagination() {
      return this.list.length > 1;
    },
  },
  watch: {
    shouldShowPagination(newVal) {
      if (newVal === true) {
        // 强制刷新swiper组件
        this.swiperKey = `new-${this.swiperKey}`;
      }
    },
  },
  activated() {
    // console.log('activated');
    this.isKeep = true;
  },
  deactivated() {
    // console.log('deactivated');
    this.isKeep = false;
  },
  created() {
    // console.log('created');
    vm = this;
    this.bannersetting();
  },

  methods: {
    ...mapMutations('home', {
      emptyswiperlistRes: 'EMPTYSWIPERLISTRES',
      swipertarget: 'SWIPERTARGET',
    }),
    // 判断合辑类型跳转路由并将target传入vuex
    handleClickSlide(item) {
      this.px = 0;
      this.emptyswiperlistRes();
      if (item.type === ResType.BannerLinkToUrl) {
        window.location.href = item.linkUrl;
      } else {
        console.log('item.target', item.target);
        this.swipertarget(item.target);
        this.$router.push({
          name: `swiperrings`,
          params: { px: this.px },
        });
      }
    },
    // handleClickSlide(realIndex) {
    //   this.px = 0;
    //   this.emptyswiperlistRes();
    //   if (vm.list[realIndex].type === ResType.BannerLinkToUrl) {
    //     window.location.href = vm.list[realIndex].linkUrl;
    //   } else {
    //     this.swipertarget(vm.list[realIndex].target);
    //     // this.$store.commit('home/SWIPERTARGET', vm.list[realIndex].target);
    //     this.$router.push({
    //       name: `swiperrings`,
    //       params: { px: this.px },
    //     });
    //   }
    // },

    bannersetting() {
      const { list = [] } = this;
      if (list.length === 1) {
        this.swiperOption.loop = false;
      } else {
        this.swiperOption.loop = true;
      }
    },
  },
};
</script>

<style scoped>
.wrapper >>> .swiper-pagination-bullet-active {
  background: #ffffff;
}

.wrapper {
  box-sizing: border-box;
  width: 100%;
  height: 0;
  padding: 11px 9px 43% 9px;
  overflow: hidden;
  text-align: center;
}
.none {
  box-sizing: border-box;
  width: 100%;
  height: 0;
  padding-bottom: 43%;
  overflow: hidden;
  text-align: center;
}
.swiper-img {
  width: 95%;
  border-radius: 15px;
}
</style>
