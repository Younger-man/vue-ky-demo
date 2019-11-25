<template>
  <transition name="appear" tag="p">
    <div v-if="isShow" id="prompt-container">
      <div id="prompt-tips" class="prompt-tips">
        <div v-html="content"></div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'promptTip',
  beforeMount() {
    const node = document.querySelector('#prompt-container');
    if (node && node.parentNode) {
      node.parentNode.removeChild(node);
    }
  },
  mounted() {
    this.isShow = true;
    setTimeout(() => {
      this.disappear(); // 延迟执行
    }, 1000);
  },
  data() {
    return {
      isShow: false,
      content: '',
    };
  },
  methods: {
    disappear() {
      // 2秒后自动消失
      const self = this;
      // alert('disappear');
      const timeOut = setTimeout(() => {
        self.isShow = false;
        clearTimeout(timeOut);
      }, 2000);
    },
  },
};
</script>

<style scoped>
/* 过渡动画 */
.appear-enter-active,
.appear-leave-active {
  transition: opacity 1.5s;
}
.appear-enter {
  opacity: 0;
}

.appear-leave-to {
  opacity: 0;
}

#prompt-container {
  position: fixed;
  bottom: 170px;
  z-index: 9999;
  width: 100%;
  height: auto;
  margin: 0 auto;
  text-align: center;
}
#prompt-tips {
  display: inline-block;
  min-width: 150px;
  height: 50px;
  margin: 0 auto;
  padding-right: 23px;
  padding-left: 23px;
  color: #fff;
  font-size: 15px;
  line-height: 50px;
  text-align: center;
  background-color: #000;
  border-radius: 10px;
}
</style>
