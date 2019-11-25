<template>
  <div class="header">
    <div class="header-left" @click="handleClickRecommend()">
      <span class="recommend-text">推荐</span>
      <img class="recommend-img" src="./image/recommend.png" />
    </div>
    <div class="header-right" @click="handleClickClass()">
      <span class="class-text">分类</span>
    </div>

    <div class="header-input" @click="handleClickSearch()">
      <img class="item-img" src="./image/icon-serch.png" />
      <span>搜索铃声</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'homeheader',
  methods: {
    handleClickRecommend() {
      this.$router.replace({
        name: 'home',
      });
    },
    handleClickClass() {
      this.$router.replace({
        name: 'classify',
      });
    },
    handleClickSearch() {
      this.$store.commit('search/SEARCH_ORIGIN');
      // this.$router.push({
      //   name: 'search',
      // });
      this.$router.replace({
        name: 'search',
        params: {
          from: 'home',
        },
      });
    },
  },
};
</script>

<style scoped>
.header {
  display: flex;
  box-sizing: border-box;
  width: 100%;
  height: 50px;
  margin-bottom: 10px;
  padding: 0 18px;
}
.header-left {
  position: relative;
  float: left;
  width: 40px;
  height: 100%;
  margin-right: 19px;
  font-size: 20px;
}
.recommend-text {
  position: absolute;
  bottom: 10px;
  width: 40px;
  height: 28px;
}
.recommend-img {
  position: absolute;
  top: 37px;
  left: 50%;
  width: 28px;
  height: 14px;
  transform: translateX(-50%);
}
.header-right {
  position: relative;
  float: left;
  width: 32px;
  margin-right: 19px;
  font-size: 16px;
}
.class-text {
  position: absolute;
  bottom: 11px;
  left: 50%;
  width: 32px;
  height: 22px;
  transform: translate(-50%, 0);
}
.header-input {
  flex: 1;
  width: 227px;
  height: 32px;
  margin-top: 9px;
  margin-bottom: 9px;
  color: #c4c4c4;
  font-size: 14px;
  line-height: 32px;
  text-align: center;
  background-color: #f7f7f7;
  border-radius: 15px;
}
.item-img {
  display: inline-block;
  width: 18px;
  height: 17px;
  margin-right: 7px;
  vertical-align: middle;
}
</style>
