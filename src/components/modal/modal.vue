<template>
  <div id="modal">
    <div class="bg"></div>
    <div class="container">
      <div class="title">{{ title }}</div>
      <div class="content" v-html="content"></div>
      <div class="btn-container" :style="!!type ? 'flex-direction: column' : 'flex-direction: row'">
        <div
          class="btn-row"
          :style="item.font === 'normal' ? 'font-weight:normal' : ''"
          :class="{ confirm: item.text == '确认' }"
          v-for="(item, index) in btn"
          :key="index"
          @click="optClick(item)"
        >
          {{ item.text }}
        </div>
        <!-- <div class="line" v-show="!type"></div> -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'modal',
  data() {
    return {
      // title :`账号不一致`,
      // content:`当前账号131****5566跟翻译机端账号不一致，原185****7889账号中还有AI币321枚，是否使用当前账号重新绑定翻译机？`,
      // type:0,   //0 左右排列 1 上下排列
      // btn:[
      //         {text:'切换187账号绑定',callback:""},
      //         {text:'使用当前账号绑定',callback:""}
      //     ],
    };
  },
  created() {},
  watch: {
    // eslint-disable-next-line
    $route(to, from) {
      // console.log('route change');
      this.disappear();
    },
  },
  beforeMount() {
    this.disappear();
  },
  mounted() {
    window.addEventListener('hashchange', () => {
      this.disappear();
    });
  },
  methods: {
    disappear() {
      const node = document.querySelector('#modal');
      if (node && node.parentNode) {
        node.parentNode.removeChild(node);
      }
    },
    optClick(item) {
      const func = item.callback;
      // console.log(func);
      func(item.param);
      this.disappear();
    },
  },
  beforeDestory() {
    window.removeEventListener('hashchange');
  },
};
</script>
<style scoped>
.bg {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #000;
  opacity: 0.4;
}
#modal {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  z-index: 9999;
  height: 100%;
}

.container {
  position: relative;
  top: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* max-width: 270px; */
  width: 301px;
  margin: auto;
  background-color: #fff;
  /* height: 150px; */
  border-radius: 8px;
  transform: translateY(-50%);
}

.title {
  /* margin-top: 44px;
  font-size: 17px;

  font-weight: 600; */
  width: 100%;
  color: #000;
  text-align: center;
  background-color: #fff;
}

.content {
  margin: 0 auto;
  margin-top: 34px;
  padding-right: 26px;
  padding-left: 26px;
  color: #000;
  font-size: 16px;
  line-height: 22px;

  text-align: center;
  text-align: justify;
  background-color: #fff;
}

p {
  margin-top: 15px;
  font-weight: 600;
}

.btn-container {
  display: flex;
  justify-content: center;
  margin-top: 29px;
}
.btn-row:first-child {
  border-right-color: #d5d6d8;
  border-right-width: 1px !important;
  border-right-style: solid;
}

.btn-row {
  box-sizing: border-box;
  width: 50%;
  height: 50px;
  /* color: #0081FF; */
  color: #999;
  font-weight: 400;
  font-size: 17px;
  line-height: 50px;
  text-align: center;
  border-top-color: #e6e6e6;
  border-top-width: 1px !important;
  border-top-style: solid;
}

.btn {
  box-sizing: border-box;
  height: 50px;
  color: #fa436f;
  font-weight: 400;
  font-size: 17px;
  line-height: 50px;
  text-align: center;
  border-top-color: #e6e6e6;
  border-top-width: 1px;
  border-top-style: solid;
}
.confirm {
  color: #fa436f;
}
</style>
