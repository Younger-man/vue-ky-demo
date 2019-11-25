<template>
  <div class="search">
    <div class="header">
      <div class="input-container">
        <form action="javascript:void(0)">
          <input ref="input" type="search" v-model="searchWords" placeholder="搜索铃声" />
          <div class="icon-wrapper" @click="search">
            <div class="icon"></div>
          </div>
        </form>
      </div>
      <div class="cancel" @click="backHome">取消</div>
    </div>
    <div class="hot-word-wrapper" v-show="!isSearch && !noSearchShow && searchSkw.length > 0">
      <div class="title">热门搜索</div>
      <div class="hot-word">
        <div class="word-item" v-for="(item, index) in searchSkw" :key="index" @click="chooseHotWord(item)">
          {{ item }}
        </div>
      </div>
    </div>
    <div
      class="search-history-wrapper"
      :class="{ 'no-hot-style': searchSkw.length === 0 }"
      v-show="!isSearch && !noSearchShow && history.length > 0"
    >
      <div class="search-header">
        <div class="search-title">搜索历史</div>
        <div class="delete-icon" @click="clearHistory"></div>
      </div>
      <div class="search-content" :class="{ 'search-content-up': isShowPlayer }">
        <div class="history-item" v-for="(item, index) in history" :key="index" @click="chooseHotWord(item)">
          {{ item }}
        </div>
      </div>
      <!-- <div class="player"></div> -->
    </div>
    <scroll class="scoll" v-if="isSearch" @scroll-bottom="reqlistSearch">
      <ring-list :list="searchRes" @play="clickRing" class="search-detail"></ring-list>
    </scroll>
    <!-- <play-ring v-if="isShow" :currentRing="currentRing"></play-ring> -->
    <div class="no-search" v-if="noSearchShow">
      <no-search-ring :list="noSearchRes" @play="clickRing" class="no-search-detail"></no-search-ring>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ringList from '../../components/common/ringlist';

import scroll from '../../components/common/scroll';
import noSearchRing from '../../components/ring-list/no-search.vue';

export default {
  computed: {
    ...mapState({
      searchSkw: state => {
        if (state.search.searchSkw.length > 12) {
          return state.search.searchSkw.slice(0, 12);
        }
        return state.search.searchSkw;
        // return [];
      },
      searchRes: state => state.search.searchRes,
      noSearchRes: state => state.search.noSearchRes,
      more: state => state.search.more,
      px: state => state.search.px,
      isSearch() {
        if (this.searchRes) {
          return this.searchRes.length > 0;
        }
        return false;
      },
      noSearchShow: state => state.search.noSearchShow,
      history: state => state.search.history,
      searchWordsCache: state => state.search.searchWords,
      isShowPlayer: state => state.isShowPlayer,
    }),
  },
  mounted() {
    this.$refs.input.addEventListener('keyup', e => {
      // eslint-disable-next-line
      // alert(e.keyCode);
      if (e.keyCode === 13) {
        this.search();
        //  this.$store.dispatch('search/SEARCH', this.searchWords);
      }
    });
  },
  components: {
    ringList,
    // PlayRing,
    noSearchRing,
    scroll,
  },
  created() {
    if (this.searchSkw.length === 0) {
      this.$store.dispatch('search/QRY_SKW');
    }
    this.$store.commit('search/SEARCH_ORIGIN');
    this.searchWords = this.searchWordsCache;
  },
  watch: {
    searchWords(newVal) {
      if (newVal === '') {
        //   let debounceSearch =  self.debounce(self.search, 300);
        //   debounceSearch(newVal);
        this.$store.commit('search/SEARCH_ORIGIN');
      }
    },
  },
  activated() {
    this.searchWords = this.searchWordsCache;
  },
  data() {
    return {
      searchWords: '',
    };
  },
  methods: {
    chooseHotWord(item) {
      // console.log(item);
      this.searchWords = item;
      this.search();
    },
    search() {
      if (!this.searchWords) {
        return;
      }
      // this.$store.commit('search/UPDATE_HISTORY', this.searchWords);
      this.$store.dispatch('search/SEARCH', this.searchWords);
    },
    clearHistory() {
      // 清空历史记录
      this.$modal({
        title: '',
        content: '是否确定清空历史记录',
        type: 0,
        btn: [
          {
            text: `取消`,
            param: null,
            callback: this.cancerClear,
          },
          {
            text: '确认',
            param: null,
            callback: this.clear,
          },
        ],
      });
    },
    cancerClear() {},
    clear() {
      this.$store.commit('search/CLEAR_HISTORY', this.searchWords);
    },
    clickRing() {},
    backHome() {
      this.$store.commit('search/SEARCH_ORIGIN');
      if (this.$route.params.from) {
        this.$router.replace({
          name: this.$route.params.from,
        });
      } else {
        this.$router.replace({
          name: 'home',
        });
      }

      // this.$router.back();
      // window.history.go(-1);
    },
    reqlistSearch() {
      // 滑动到底部
      this.$store.dispatch('search/MORE_SEARCH_RES', this.searchWords);
    },
  },
};
</script>

<style scoped>
.search {
  width: 100%;
  height: 100%;
  /* position: relative; */
  overflow: auto;

  /* overflow: hidden; */
}

.header {
  position: absolute;
  z-index: 10;
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  width: 100%;
  padding: 12px 0px 0px 16px;
  background-color: #fff;
}
.cancel {
  float: left;
  margin-right: 15px;
  margin-left: 12px;
  color: #7b85a3;
  font-size: 14px;
  line-height: 32px;
  white-space: nowrap;
}
.hot-word-wrapper {
  margin: 70px 16px 0px;
}
.input-container {
  position: relative;
  /* width: 310px */
  width: 100%;
  height: 32px;
  /* border-radius: 16px; */
}
form {
  position: relative;
  height: 100%;
}
input {
  float: left;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  margin-right: 60px;
  padding-right: 48px;
  padding-left: 23px;
  font-size: 14px;
  background-color: #f7f7f7;
  /* background-color: transparent; */
  /* background-color: rgba(18, 60, 202, 0.1); */
  border-color: transparent;
  border-radius: 16px;
  outline: none;
  -moz-appearance: none;
  -webkit-appearance: none;
}
input::-webkit-input-placeholder {
  color: #c4c4c4;
  font-size: 14px;
}
input::-webkit-search-decoration,
input::-webkit-search-cancel-button {
  display: none;
}
.title,
.search-title {
  color: #333;
  font-weight: 600;
  font-size: 16px;
}
.icon-wrapper {
  position: absolute;
  right: 0;
  width: 50px;
  height: 100%;
}
.icon {
  position: absolute;
  top: 50%;
  right: 28px;
  width: 17px;
  height: 17px;
  background-image: url('./img/icon-serch@2x.png');
  background-size: cover;
  transform: translateY(-50%);
}
.hot-word,
.search-content {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  /* justify-content: space-between; */
  justify-content: flex-start;
  /* -webkit-line-clamp: 2; */
}
.search-content-up {
  padding-bottom: 70px;
}
.word-item,
.history-item {
  height: 30px;
  margin: 16px 5px 0 0;
  padding: 0 12px;
  color: #323232;
  font-size: 14px;
  line-height: 30px;
  background-color: #f8f8f8;
  border-radius: 15px;
}

.search-history-wrapper {
  margin: 30px 16px 0px;
}
.no-hot-style {
  margin: 70px 16px 0px;
}

.search-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.delete-icon {
  width: 17px;
  height: 17px;
  background-image: url('./img/icon-dele@2x.png');
  background-size: cover;
}

.scoll {
  box-sizing: border-box;
  height: 100%;
  padding: 60px 0 0 0;
}
.player {
  width: 100%;
  height: 70px;
}
</style>
