<template>
  <div>
    <ol class="item-wrapper">
      <li class="item-ring" v-for="(item, index) in list" :key="index" @click="clickItem(item, index)">
        <div class="item">
          <div class="item-left" :class="currentRingid === item.id ? 'active' : ''">{{ index + 1 }}</div>
          <div class="item-center">
            <div class="item-center-top" :class="currentRingid === item.id ? 'active' : ''">{{ item.title }}</div>
            <div class="item-center-bottom" :class="currentRingid === item.id ? 'active' : ''">
              {{ item.singer }}{{ item.desc ? ` · ${item.desc}` : '' }}
            </div>
          </div>
          <div class="item-right">
            <div class="item-count">
              <img class="item-img" src="./image/icon-music.png" />
              {{ cal(item.listen || 200000) }}
            </div>
          </div>
        </div>
      </li>
    </ol>
    <div v-if="isPlayer" class="player"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Player from '@/plugins/h5player';
import { StatType } from '../../business/constant';

export default {
  name: 'ringlist',
  props: {
    list: Array,
  },
  data() {
    return {
      player: Player(),
    };
  },
  computed: {
    ...mapState('home', {
      isPlayer: state => state.isPlayer,
    }),
    playState() {
      return this.player.playState;
    },
    currentRingid() {
      return this.$store.state.currentRing.id || [];
    },
  },
  methods: {
    clickItem(item, index) {
      const page = this.$route.name;
      const { ListenRing } = StatType;
      this.$store.commit('home/ISPLAYER');
      item.index = index;
      if (item.id === this.currentRingid) {
        this.bus.$emit('play', item);
        this.player.toggle({ id: item.id, url: item.url });
      } else {
        this.bus.$emit('play', item);
        this.$store.dispatch('statistics', { type: ListenRing, page, index });
        this.player.toggle({ id: item.id, url: item.url });
      }
    },
    cal(value) {
      if (value > 10000) {
        return `${parseFloat(value / 10000).toFixed(1)}万`;
      }
      return value;
    },
  },
};
</script>

<style scoped>
.item-wrapper {
  width: 100%;
  padding-left: 0;
  list-style-position: inside;
  /* padding-bottom: 60px; */
}
.item-ring {
  display: flex;
  margin-bottom: 10px;
  overflow: hidden;
}
.item {
  display: flex;
  width: 100%;
  height: 50px;
}
.item-left {
  float: left;
  width: 6px;
  height: 20px;
  margin: 18px 21px 0 24px;
  font-size: 14px;
  text-align: left;
}
.item-center {
  flex: 1;
  height: 100%;
  overflow: hidden;
}
.item-center-top {
  height: 21px;
  margin-top: 8px;
  overflow: hidden;
  color: #373737;
  font-size: 15px;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.item-center-bottom {
  margin-bottom: 8px;
  overflow: hidden;
  color: #a8a8a8;
  font-size: 12px;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.item-right {
  position: relative;
  float: right;
  width: 80px;
  height: 100%;
}
.item-count {
  position: absolute;
  bottom: 5px;
  color: #c4c4c4;
  font-size: 11px;
}
.item-img {
  width: 11px;
  height: 10px;
}
.active {
  color: #fa436f;
}
.player {
  width: 100%;
  height: 60px;
}
</style>
