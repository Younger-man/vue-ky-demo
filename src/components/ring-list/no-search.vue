<template>
  <div class="wrapper">
    <div class="no-search-header">
      <div class="icon"></div>
      <div class="text">没有找到匹配的结果</div>
    </div>
    <div class="recommand">－ 为您推荐 －</div>
    <ring-list class="item-wrapper" :list="list"></ring-list>
    <!-- <ol class="item-wrapper">
      <li class="item-ring" v-for="(item, index) in list" :key="index" @click="clickItem(item)">
        <div class="item">
          <div class="item-left" :class="{ active: currentRingId === item.id }">{{ index + 1 }}</div>
          <div class="item-right">
            <div class="item-right-top" :class="{ active: currentRingId === item.id }">{{ item.title }}</div>
            <div class="item-right-bottom">
              <div class="item-desc" :class="{ active: currentRingId === item.id }">
                {{ item.singer }} · {{ item.desc }}
              </div>
              <div class="item-count">
                <img class="item-img" src="./image/icon-music.png" />
                <span class="listen">{{ cal(item.listen) }}</span>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ol>-->
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ringList from '../common/ringlist';
import Player from '@/plugins/h5player';

export default {
  name: 'HomeRing',
  props: {
    list: Array,
  },
  components: {
    ringList,
  },
  computed: {
    playState() {
      return this.player.playState;
    },
    itemClass() {
      return '';
    },
    ...mapState({
      currentRingId: state => {
        if (Object.keys(state.currentRing).length === 0) {
          return '-1';
        }
        return state.currentRing.id;
      },
    }),
  },
  data() {
    return {
      player: Player(),
    };
  },
  methods: {
    clickItem(item, index) {
      item.index = index;
      this.bus.$emit('play', item);
      this.player.toggle({ id: item.id, url: item.url });
    },
    cal(value) {
      // console.log('value', value);
      if (!value) {
        return '20万';
      }
      return `${parseFloat(value / 10000).toFixed(1)}万`;
    },
  },
};
</script>

<style scoped>
html {
  position: relative;
  width: 100%;
  height: 100%;
}
.no-search-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 146px;
  background-image: linear-gradient(#fff, #fcfdff);
}
.icon {
  width: 86px;
  height: 68px;
  margin-top: 23px;
  background-image: url('./image/search-no-result.png');
  background-size: cover;
}
.text {
  color: #333;
  font-size: 14px;
  text-align: center;
}
.wrapper {
  position: absolute;
  top: 0;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 60px 0 0 0;
  overflow: scroll;
}
.recommand {
  margin: 23px 0 18px;
  color: #8a91b5;
  font-weight: 600;
  font-size: 14px;
  text-align: center;
}
.title {
  margin-bottom: 15px;
  color: #333333;
  font-size: 20px;
  font-family: 黑体;
}
.item-wrapper {
  width: 100%;
  padding-left: 0;
  list-style-position: inside;
  /* padding-bottom: 60px; */
}
</style>
