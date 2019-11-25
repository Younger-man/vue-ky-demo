<template>
  <div class="wrapper">
    <div class="play" @click="play">
      <CircleProgress
        class="progress"
        v-if="isProgress"
        ref="$circle"
        key="duration-model"
        :isAnimation="false"
        :isRound="true"
        :width="width"
        :radius="radius"
        :progress="(this.currenttime / this.time) * 100"
        :barColor="barColor"
        :duration="duration"
        :delay="delay"
        :timeFunction="timeFunction"
      ></CircleProgress>
      <!-- <img
        class="icon"
        :src="
          playState !== 2
            ? playState === 1
              ? require('./image/loading.png')
              : require('./image/play.png')
            : require('./image/stop.png')
        "
      /> -->
      <img
        class="icon"
        :src="
          playState === 3 || playState === 4 || playState === -1
            ? require('./image/play.png')
            : require('./image/stop.png')
        "
      />
    </div>
    <div class="sing">
      <div class="sing-top ">
        <span>{{ currentRing.title }}</span>
      </div>
      <div class="sing-bottom">{{ currentRing.singer }}</div>
    </div>

    <div v-if="isSupportSetRing && isRings" class="setting">
      <div class="setting-left" @click="changeToSetRing">设彩铃</div>
    </div>

    <div class="setting">
      <div class="setting-right" @click="changeToSetMusic">设铃声</div>
    </div>
  </div>
</template>

<script>
import Player from '@/plugins/h5player';
import { kySetRing } from '../../plugins/extapi.js';
import { getQueryString } from '@/business';
import CircleProgress from './circle-progress.vue';
import { MSG, StatType } from '@/business/constant';

export default {
  name: 'PlayRing',
  data() {
    return {
      isShow: true,
      player: Player(),
      isRings: true,

      // id: '',
      // spaceTime: 10,
      duration: 10,
      isProgress: true,
      width: 40,
      radius: 3,
      delay: 100,
      barColor: '#fa436f',
      timeFunction: 'cubic-bezier(1, 1, 1, 1)',
      // intervalTimer: null, // 持续模式，循环计时器
      // currentTime: 0, // 当前时间
      // durationTime: this.currentRing.second, // 持续模式总时长
    };
  },
  components: {
    CircleProgress,
  },
  props: {
    currentRing: Object,
  },
  computed: {
    playState() {
      return this.player.playState;
    },
    isSupportSetRing() {
      // console.log(getQueryString('supportsetring'));
      return getQueryString('supportsetring') === '1';
    },
    // 播放总时长
    time() {
      if (this.player.smSound && this.player.smSound.duration) {
        return this.player.smSound.duration;
      }
      return 1;
    },
    // 当前播放时长
    currenttime() {
      // console.log(this.player);
      if (this.player.smSound) {
        return this.player.smSound.position;
      }
      return 0;
    },
  },

  watch: {
    length(newVal) {
      if (newVal < 0) {
        this.textMove();
      }
    },
    $route(to) {
      if (to.name === 'login') {
        this.isRings = false;
      } else {
        this.isRings = true;
      }
    },
    playState(newval) {
      // console.log(newval);
      if (newval === -1) {
        this.$promptTip('app', {
          content: MSG.PLAY_ERROR,
        });
      }
      // if (newval !== 3 && newval !== 4 && this.isEllipsis()) {
      //   this.isReset = false;
      //   this.calcTextAnimationCss();
      // } else {
      //   this.resetTextAnimationCss();
      // }
    },
    // currentRing() {
    //   this.resetTextAnimationCss();
    // },
    // currentPosition(newVal) {
    //   // console.log(newVal);
    //   this.drawProgress(this.$refs.activeProgress, newVal);
    // },
  },
  methods: {
    // 防止播放错误状态影响其他歌曲播放 增加判断条件
    play() {
      if (this.playState === -1) {
        this.$promptTip('app', {
          content: MSG.PLAY_ERROR,
        });
      } else {
        const { currentRing } = this;
        this.player.toggle({ id: currentRing.id, url: currentRing.audiourl });
      }
    },
    changeToSetRing() {
      const page = this.$route.name;
      const { SetRing } = StatType;
      const { index } = this.currentRing;
      this.$store.dispatch('statistics', { type: SetRing, page, index });

      this.$router.push({
        name: 'login',
      });
    },
    changeToSetMusic() {
      // 设铃声
      // console.log('currentRing', this.currentRing);
      kySetRing(this.currentRing.id, this.currentRing.audiourl || this.currentRing.url, this.currentRing.title);
    },
    // textMove() {
    //   if (this.$refs.text.offsetWidth > this.$refs.sing.offsetWidth) {
    //     console.log('111111111112');
    //     this.$refs.text.innerHTML += this.$refs.text.innerHTML;
    //     this.toScrollLeft();
    //   }
    // },
    // toScrollLeft() {
    //   if (this.$refs.text.offsetWidth > this.$refs.sing.scrollLeft) {
    //     this.$refs.sing.scrollLeft = 100;
    //     // setTimeout('toScrollLeft()', 18);
    //   }
    // },
    // isEllipsis() {
    //   const dom = this.$refs.text;
    //   if (!dom) {
    //     return false;
    //   }
    //   const parent = dom.parentNode;
    //   // console.log('isEllipsis', dom.offsetWidth > parent.offsetWidth);
    //   return dom.offsetWidth > parent.offsetWidth;
    // },
    // calWidth() {
    //   if (window.innerWidth < 350) {
    //     return 'small-width';
    //   }
    //   return 'common-width';
    // },
    // calcTextAnimationCss() {
    //   // 计算动画时间
    //   // eslint-disable-next-line
    //   const dom = this.$refs.text,
    //     parent = dom.parentNode;
    //   this.text = ` transform: translateX(140px);
    //                 width:auto;
    //                 text-overflow: unset;
    //                 max-width: unset;
    //                 animation-duration: ${dom.offsetWidth / (parent.offsetWidth / 7)}s `;
    // },
    // resetTextAnimationCss() {
    //   this.isReset = true;
    //   this.text = '';
    // },
  },
};
</script>

<style scoped>
.wrapper {
  position: absolute;
  bottom: 0;
  z-index: 999;
  display: flex;
  width: 100%;
  height: 60px;
  background-color: #ffffff;
  border-radius: 15px 15px 0 0;
  box-shadow: darkgrey 0 10px 30px 5px;
}
.play {
  position: relative;
  float: left;
  width: 57px;
  height: 100%;
  /* line-height: 60px;
  text-align: center; */
}
.progress {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 999;
  width: 40px;
  height: 40px;
  transform: translate(-50%, -50%);
}
.icon {
  position: absolute;
  top: 50%;
  left: 50%;
  /* display: inline-block; */
  width: 40px;
  height: 40px;
  transform: translate(-50%, -50%);
  /* vertical-align: middle; */
}
.sing {
  flex: 1;
  float: left;
  width: 140px;
  height: 100%;
  overflow: hidden;
}
.common-width {
  width: 140px;
}
.small-width {
  width: 100px;
}
.sing-top {
  width: 100%;
  height: 50%;
  overflow: hidden;
  font-size: 15px;
  line-height: 45px;
  white-space: nowrap;
  text-overflow: ellipsis;
}
/* .text-origin {
  text-overflow: unset;
}
.text-animation-origin {
  display: inline-block;
  max-width: 101%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  animation: scroll 0s infinite linear;
}
.text {
  display: inline-block;
  min-width: 100%;
  white-space: nowrap;
  text-overflow: unset;
  transform: translateX(100%);
  animation: scroll 8s infinite linear;
  overflow: hidden;
  text-overflow: ellipsis;
} */
/* @keyframes scroll {
  0% {
    transform: translateX(260px);
  }
  97% {
    transform: translateX(-100%);
  }
  98% {
    transform: translate(-100%, -100%);
  }
  99% {
    transform: translate(100%, -100%);
  }
  100% {
    transform: translateX(0);
  }
} */
.sing-bottom {
  width: 100%;
  height: 50%;
  overflow: hidden;
  color: #a8a8a8;
  font-size: 11px;
  line-height: 25px;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.setting {
  position: relative;
  /* display: flex;
  flex: 1; */
  justify-content: space-evenly;
  float: right;
  width: 89px;
  /* min-width: 40%; */
  height: 100%;
  color: #fa436f;
  font-size: 12px;
}
.setting-left {
  position: absolute;
  top: 50%;
  left: 10px;
  width: 70px;
  height: 28px;
  line-height: 28px;
  text-align: center;
  background-color: #ffffff;
  border: 1px solid #fa436f;
  border-radius: 20px;
  /* box-shadow: 0 0 1px #fa436f; */
  transform: translateY(-50%);
}
.setting-right {
  position: absolute;
  top: 50%;
  right: 10px;
  /* left: 50%; */
  width: 70px;
  height: 28px;
  line-height: 28px;
  text-align: center;
  background-color: #ffffff;
  border: 1px solid #fa436f;
  border-radius: 20px;
  transform: translateY(-50%);
}

.progress-bar {
  position: relative;
  top: 50%;
  left: 50%;
  width: 46px;
  height: 46px;
  /* margin: 7px; */
  padding: 0;
  transform: translateX(-50%) translateY(-50%);
}
.progress-bar .progress-active {
  position: absolute;
  top: 0;
  left: 0;
  /* top: -51px; */
}
</style>
