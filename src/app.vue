<template>
  <div id="app">
    <transition :name="transitionName">
      <keep-alive>
        <router-view :key="$route.name"></router-view>
      </keep-alive>
    </transition>

    <play-ring v-show="isShowPlayer" :currentRing="currentRing"></play-ring>

    <ky-popup class="popup" :class="{ hide: !shouldShowSetResultTip }">
      <div class="container">
        <div class="title" v-html="setResult.title"></div>
        <div class="detail" v-html="setResult.tips"></div>
        <div class="btn" retina="line-top" @click="resetOrderState">知道了</div>
      </div>
    </ky-popup>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';
import { ordersdkInit, getQueryString, SetResultType, setOrderVipConfirm } from '@/business';
import PlayRing from '@/components/common/play.vue';
import Player from '@/plugins/h5player';
import KyPopup from '@/components/ky-popup.vue';

const loginModule = 'login';

export default {
  data() {
    return {
      player: Player(),
      isShowPlayer: false,
      currentRing: {},

      // 控制页面切换效果
      transitionName: '',
    };
  },
  components: {
    PlayRing,
    KyPopup,
  },
  methods: {
    ...mapActions(['initChannelConfig', 'qryCurUser', 'updateCurrentRing']),
    ...mapActions(loginModule, ['orderVipConfirm', 'resetOrderState']),

    bindEvents() {
      this.bus.$on('play', ring => {
        this.currentRing = ring;
        this.isShowPlayer = true;
        this.$store.commit('UPDATESHOWPLAYER', this.isShowPlayer);
        // 更新当前操作铃音
        this.updateCurrentRing(ring);
      });
    },
  },
  computed: {
    ...mapState({
      channelConfig: state => state.channelConfig,
    }),
    ...mapGetters(loginModule, ['setResult']),

    // 是否展示设置结果提示文案
    shouldShowSetResultTip() {
      const { setResult, $route } = this;

      return (
        $route.name !== 'login' &&
        (setResult.type === SetResultType.Success || setResult.type === SetResultType.SetFail)
      );
    },
  },
  created() {
    this.initChannelConfig();
  },
  mounted() {
    const {
      channelConfig: { channel },
    } = this;

    // 订购sdk初始化
    ordersdkInit({
      channel,
      orderConfirmCallbacks: {
        openRingConfirm: () => {},
        orderVipConfirm: () => {
          // sdk内部在调用 orderVipConfirm之后才会初始化setOrderVipConfirm方法，
          // 这里加个timeout避免方法未定义报错
          setTimeout(() => {
            // ios支付不需要vip二次确认
            setOrderVipConfirm(true);
          }, 0);
        },
        orderColorRingConfirm: () => {},
      },
    });

    // 查询用户信息
    const pnum = getQueryString('search');
    const token = pnum ? { search: pnum } : undefined;
    this.qryCurUser({ token });
    this.bindEvents();
  },
  watch: {
    $route(to, from) {
      if (to.name === 'login') {
        this.$store.commit('CACHED_PAGE', from.name);
      }
      const toDeep = to.meta.deep;
      const fromDeep = from.meta.deep;

      if (toDeep === fromDeep) {
        this.transitionName = '';
        return;
      }
      this.transitionName = toDeep < fromDeep ? 'slide-right' : 'slide-left';
    },
  },
};
</script>

<style>
html,
body,
#app {
  height: 100%;
  overflow: hidden;
}
</style>

<style lang="less" scoped>
@import '~@/css/variables.less';
@import '~@/css/animation-slide.less';

.popup {
  .container {
    width: 301px;
    height: 137px;
    font-size: @font-size-large;
    text-align: center;
    background-color: #fff;
    border-radius: 8px;
    .title {
      margin-top: 19px;
      font-weight: 600;
    }
    .detail {
      margin-top: 12px;
      color: #666;
      font-size: @font-size-small;
    }
    .btn {
      height: 49px;
      margin-top: 17px;
      color: #fa436f;
      font-weight: 600;
      line-height: 49px;
    }
  }
}
</style>
