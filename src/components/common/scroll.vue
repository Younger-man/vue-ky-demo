<template>
  <div class="scroll-view">
    <slot></slot>
  </div>
</template>

<script>
import { throttle } from '@/plugins/function';

export default {
  name: 'scroll',
  props: {
    cacheKey: {
      default: '',
      type: String,
    },
  },

  data() {
    return {
      saveScroll: true,
      scrollTop: 0,
      route: '',
      cache: Object.create({}),
    };
  },
  watch: {
    cacheKey() {
      delete this.cache[this.route];
    },
  },
  mounted() {
    const topRange = 30;
    const bottomRange = 30;
    let lastPos = 0;
    // //console.log('this.$el', this.$el);
    this.$el.addEventListener(
      'scroll',
      throttle(
        evt => {
          const pos = this.$el.scrollTop;
          this.scrollTop = pos;
          const scrollMax = this.$el.scrollHeight - this.$el.clientHeight;
          if (scrollMax > 0) {
            this.$emit('scroll', evt);
            if (pos - lastPos < 0 && pos < 0 + topRange) {
              this.$emit('scroll-top', evt);
            }
            if (pos - lastPos > 0 && pos > scrollMax - bottomRange) {
              // //console.log('scroll-bottom');
              this.$emit('scroll-bottom', evt);
            }
            lastPos = pos;
          }
        },
        100,
        500,
      ),
      false,
    );
  },
  created() {
    if (this.saveScroll) {
      this.route = window.location.pathname + window.location.hash;
    }
  },

  activated() {
    if (this.saveScroll) {
      const { cacheKey } = this;
      const { pathname, hash } = window.location;
      this.route = `${pathname + hash + cacheKey}~${this.saveScroll}`;
      this.scrollTop = this.cache[this.route];
      this.$el.scrollTop = this.scrollTop;
    }
  },

  deactivated() {
    if (this.saveScroll) {
      this.cache[this.route] = this.scrollTop;
    }
  },
};
</script>

<style scoped>
.scroll-view {
  position: relative;
  overflow: scroll;
  overflow-x: hidden;
  overflow-y: auto;
  /* 手离开屏幕后内容依然保持滚动一会儿再停下来 */
  -webkit-overflow-scrolling: touch;
}
</style>
