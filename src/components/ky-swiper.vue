<template>
  <div class="swiper">
    <div class="wrap" :style="wrapperStyles" @transitionend="reset">
      <div
        v-for="(item, index) in swiperList"
        class="item"
        :key="index"
        @click="clickHandle(item, index)"
        @touchstart="touchStart"
        @touchmove="touchMove"
        @touchend="touchEnd"
      >
        <img class="inner" :src="item.thumbnail || headimg" />
      </div>
    </div>
    <div class="nav" v-if="nav">
      <div class="dot" v-for="index in list.length" :key="index" :class="{ on: curIndex === index - 1 }"></div>
    </div>
  </div>
</template>

<script>
import headimg from '../images/head-img.png';

export default {
  name: 'ky-swiper',
  props: {
    list: {
      default() {
        return [];
      },
      type: Array,
    },
    speed: {
      default: 5000,
      type: Number,
    },
    nav: {
      default: true,
      type: Boolean,
    },
  },
  data() {
    return {
      headimg,
      current: 0,
      timer: 0,
      width: 0,
      transition: false,

      // 是否已经更新本组件宽度
      hasInitWidth: false,
      delta: 0,

      // 触摸事件相关
      startX: 0,
      moveX: 0,
      endX: 0,
    };
  },
  computed: {
    swiperList() {
      const list = this.list.slice(0);
      return [list[list.length - 1]].concat(list).concat(list[0]);
    },
    position() {
      return (this.current + 1) * this.width + this.delta;
    },
    wrapperStyles() {
      return {
        transform: `translateX(-${this.position}px)`,
        transition: this.transition ? `transform ${this.speed / 4}ms` : 'none',
      };
    },
    curIndex() {
      if (this.current === -1) {
        return this.list.length - 1;
      }
      return this.current % this.list.length;
    },
  },
  methods: {
    fixCurrent() {
      if (this.current + 1 > this.list.length) {
        this.current = 0;
      }
      if (this.current < 0) {
        this.current = this.list.length - 1;
      }
    },
    reset() {
      this.fixCurrent();
      this.transition = false;
      this.delta = 0;
    },
    updateWidth() {
      this.width = this.$el.offsetWidth;
    },
    autoPlay() {
      if (this.timer) {
        window.clearInterval(this.timer);
      }
      this.timer = window.setInterval(() => {
        this.current += 1;
        this.transition = true;
      }, this.speed);
    },
    stopAutoPlay() {
      if (this.timer) {
        window.clearInterval(this.timer);
      }
    },
    clickHandle(item, index) {
      return this.$emit('selected', item, index);
    },
    touchStart(e) {
      this.fixCurrent();
      this.stopAutoPlay();
      if (e.touches.length > 0) {
        this.startX = e.touches[0].clientX;
      }
    },
    touchMove(e) {
      if (e.touches.length > 0) {
        this.moveX = e.touches[0].clientX;
      }
      this.transition = false;

      this.delta = this.startX - this.moveX;
    },
    touchEnd(e) {
      if (e.changedTouches.length > 0) {
        this.endX = e.changedTouches[0].clientX;
      }

      let currentDelta;
      if (this.startX - this.endX === 0) {
        currentDelta = 0;
      } else {
        currentDelta = this.startX - this.endX > 0 ? 1 : -1;
      }

      this.transition = true;
      this.current += currentDelta;
      this.delta = 0;

      window.setTimeout(() => {
        this.autoPlay();
      }, 0);
    },
  },
  mounted() {
    this.updateWidth();
    this.autoPlay();
    window.addEventListener('resize', this.updateWidth, false);
  },
  updated() {
    if (!this.hasInitWidth) {
      this.hasInitWidth = true;
      this.updateWidth();
    }
  },
  destroyed() {
    window.removeEventListener('resize', this.updateWidth);
  },
};
</script>

<style scoped>
.swiper {
  position: relative;
  overflow: hidden;
}
.wrap {
  display: flex;
  justify-content: flex-start;
}

.item {
  min-width: 100%;
  overflow: hidden;
  text-align: center;
}

.inner {
  display: inline-block;
  width: 99%; /* 解决上一个轮播图片溢出到下一轮播问题 */
  height: 100%;
  border-radius: 15px;
}
</style>

<style scoped src="@/css/ky-swiper.css"></style>
