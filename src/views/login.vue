<template>
  <div class="view login">
    <!-- 设置失败弹框提示 -->
    <ky-toast class="toast" :should-show-toast="shouldShowToast">
      <div class="tips" v-html="setResult.tips"></div>
    </ky-toast>

    <div class="content">
      <div class="triangle"></div>

      <div class="not-login shadow-box" :class="{ hide: shouldShowLogined }">
        <div class="container phone" retina="line-bottom">
          <input v-model="phone" type="tel" placeholder="请输入手机号码" maxlength="11" />
          <div class="tip" :class="{ 'visibility-hide': !shouldShowPhoneErrorTip }">
            {{ phoneErrorTip || '请输入正确的手机号' }}
          </div>
        </div>

        <div class="container captcha" retina="line-bottom" :class="{ hide: !getSmsCodeState.shouldShowCaptcha }">
          <input
            v-model="captcha"
            :disabled="getSmsCodeState.captchaVerified"
            placeholder="请输入图形验证码"
            maxlength="4"
          />
          <div class="tip" :class="{ 'visibility-hide': isValidCaptcha }">请输入正确的图形码</div>
          <div class="check-result" :class="classNameOfCaptcha"></div>
          <img class="btn icon" alt="验证码" :src="captchaUrl" @click="refreshCaptcha" />
        </div>

        <div class="container code" retina="line-bottom">
          <input v-model="code" type="tel" placeholder="请输入短信验证码" maxlength="6" />
          <div class="tip" :class="{ 'visibility-hide': !shouldShowCodeErrorTip }">
            {{ codeErrorTip || '请输入正确的验证码' }}
          </div>
          <div class="btn-container">
            <span class="btn" :class="{ hide: timeRemaining !== 0 }" @click="clickGetSmsCode">获取验证码</span>
            <span class="interval" :class="{ hide: timeRemaining === 0 }">
              <span class="left-time">{{ timeRemaining }}</span
              >s后重新获取
            </span>
          </div>
        </div>

        <div class="btn btn-primary" @click="clickLogin">设为彩铃</div>
      </div>

      <div class="logined shadow-box" :class="{ hide: !shouldShowLogined }">
        <div class="detail">点击确认即可开始设置彩铃</div>
        <div class="container">
          <div class="icon"></div>
          <div class="desc">{{ loginedUser.phone }}</div>
        </div>
        <div class="btn change-phone" @click="clickSwitchPhone">更换号码</div>
        <div class="setring btn btn-primary" @click="clickOrderRing">确认</div>
      </div>
    </div>

    <ky-rights></ky-rights>

    <div class="warm-tips">
      <div class="title">温馨提示</div>
      <div v-html="warmTips"></div>
    </div>

    <div class="place-holder"></div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex';
import KyRights from '@/components/ky-rights.vue';
import KyToast from '@/components/ky-toast.vue';
import {
  SetResultType,
  validPhone,
  qryCaptchaUrl,
  GetSmsCodeType,
  validCaptcha,
  validSmsCode,
  LoadStatus,
  throttle,
} from '@/business';

const loginModule = 'login';

export default {
  components: {
    KyRights,
    KyToast,
  },
  // 进入订购页之前重置vuex状态
  beforeRouteEnter(to, from, next) {
    if (to.name === 'login') {
      next(vm => {
        vm.resetLogin();
        vm.isChangingPhone = false;
      });
    } else {
      next();
    }
  },
  computed: {
    shouldShowPhoneErrorTip() {
      const { phoneErrorTip, isValidPhone } = this;
      return phoneErrorTip !== '' || !isValidPhone;
    },

    shouldShowCodeErrorTip() {
      const { codeErrorTip, isValidCode } = this;
      return codeErrorTip !== '' || !isValidCode;
    },

    ...mapState(loginModule, ['getSmsCodeState', 'loginState', 'orderState']),

    ...mapGetters(loginModule, ['setResult', 'ct', 'warmTips', 'phoneErrorTip', 'codeErrorTip']),

    ...mapState(['loginedUser', 'currentRing']),

    ...mapGetters(['config']),

    // 是否展示已登录页
    shouldShowLogined() {
      const {
        loginedUser: { phone },
        isChangingPhone,
      } = this;

      return validPhone(phone) && !isChangingPhone;
    },

    // 图形验证码检测结果
    classNameOfCaptcha() {
      const {
        getSmsCodeState: { captchaVerified },
      } = this;

      if (captchaVerified === true) {
        return 'right';
      }
      return 'hide';
    },
  },
  methods: {
    ...mapActions(loginModule, ['resetOrderState', 'updateGetSmsCodeState', 'reset']),

    // 刷新图形验证码
    refreshCaptcha() {
      qryCaptchaUrl().then(src => {
        this.captchaUrl = src;
      });
    },

    // 开启倒计时
    startCountDown() {
      const {
        config: { smsInterval = 60 },
      } = this;
      this.timeRemaining = smsInterval;

      if (this.smsCodeInterval) {
        window.clearInterval(this.smsCodeInterval);
      }

      this.smsCodeInterval = window.setInterval(() => {
        if (!--this.timeRemaining) {
          this.stopCountDown();
        }
      }, 1000);
    },

    // 停止倒计时
    stopCountDown() {
      if (this.smsCodeInterval) {
        window.clearInterval(this.smsCodeInterval);
        this.smsCodeInterval = 0;
      }

      this.timeRemaining = 0;
      this.updateGetSmsCodeState({ shouldShowCountDown: false });
    },

    ...mapActions(loginModule, ['getSmsCode', 'login', 'order']),

    // 点击获取验证码
    clickGetSmsCode() {
      const {
        phone,
        captcha,
        currentRing: { id },
      } = this;
      if (!validPhone(phone)) {
        this.isValidPhone = false;
        return;
      }
      this.isValidPhone = true;

      if (captcha !== '' && !validCaptcha(captcha)) {
        this.isValidCaptcha = false;
        return;
      }
      this.isValidCaptcha = true;

      this.getSmsCode({ phone, captcha, id });
    },

    // 点击登录
    clickLogin() {
      const {
        phone,
        code,
        currentRing: { id },
      } = this;

      if (!validPhone(phone)) {
        this.isValidPhone = false;
        return;
      }
      this.isValidPhone = true;

      if (!validSmsCode(code)) {
        this.isValidCode = false;
        return;
      }
      this.isValidCode = true;
      this.login({ phone, code, id });
    },

    // 订购
    clickOrderRing() {
      const {
        loginedUser: { phone },
        currentRing: { id },
      } = this;
      this.order({ phone, id });
    },

    resetLogin() {
      this.phone = '';
      this.captcha = '';
      this.code = '';
      this.isValidPhone = true;
      this.isValidCaptcha = true;
      this.isValidCode = true;

      this.reset();
    },

    clickSwitchPhone() {
      this.isChangingPhone = true;
      this.resetLogin();
    },
  },
  data() {
    return {
      SetResultType,
      LoadStatus,

      // 登录框
      phone: '',
      isValidPhone: true,
      captcha: '',
      isValidCaptcha: true,
      captchaUrl: '',
      code: '',
      isValidCode: true,

      // 倒计时
      timeRemaining: 0,
      smsCodeInterval: null,

      shouldShowToast: false,

      throttledResetLoginState: null,

      // 标示当前是否正在更换号码
      isChangingPhone: false,
    };
  },
  watch: {
    'getSmsCodeState.shouldShowCountDown': function(newVal) {
      if (newVal === true) {
        this.startCountDown();
      } else {
        this.stopCountDown();
      }
    },
    'getSmsCodeState.status': function(newVal) {
      if (newVal === GetSmsCodeType.RequireCaptcha || newVal === GetSmsCodeType.CaptchaError) {
        this.refreshCaptcha();
      }
      if (newVal === GetSmsCodeType.CaptchaError) {
        this.isValidCaptcha = false;
      }
    },
    // 图形验证码输入结束自动获取验证码
    captcha(newVal) {
      if (validCaptcha(newVal)) {
        this.clickGetSmsCode();
      }
    },
    'orderState.status': function() {
      if (this.setResult.type === SetResultType.CheckFail) {
        this.shouldShowToast = true;

        setTimeout(() => {
          this.shouldShowToast = false;
          // 校验失败停留当前页面，用户可能会再次点击订购，所以这里在toast消失后直接重置订购状态
          this.resetOrderState();
        }, 2000);
      }
    },
    // 号码改变相当于切换号码，这里直接重置下登录页的vuex状态
    phone() {
      if (this.throttledResetLoginState === null) {
        this.throttledResetLoginState = throttle({
          func: this.reset,
          wait: 100,
          frequency: 100,
        });
      }

      this.throttledResetLoginState();
    },
    setResult(newVal) {
      if (newVal.type === SetResultType.Success || newVal.type === SetResultType.SetFail) {
        this.$router.go(-1);
      }
    },
    // 登录成功重置正在切换号码状态
    loginState(newVal) {
      if (newVal === LoadStatus.Success) {
        this.isChangingPhone = false;
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import '~@/css/variables.less';
@import '~@/css/mixins.less';

.login {
  overflow-y: scroll;
  text-align: center;
  .place-holder {
    height: @player-height;
  }
}

.toast {
  .tips {
    font-size: @font-size-small;
  }
}

@header-height: 150px;

.content {
  position: relative;
  &::before {
    position: relative;
    z-index: -1;
    display: block;
    width: 100%;
    height: @header-height;
    content: '';
    .linear-gradient();
  }
  .triangle {
    position: relative;
    z-index: -1;
    background: transparent;
    &::before {
      position: absolute;
      top: 0;
      left: 0;
      width: 0;
      height: 0;
      border-top: 5px solid @main-color;
      border-left: 14px solid transparent;
      content: '';
    }
    &::after {
      position: absolute;
      top: 0;
      right: 0;
      width: 0;
      height: 0;
      border-top: 5px solid @main-color;
      border-right: 14px solid transparent;
      content: '';
    }
  }
}

@shadow-box-padding-top: 16px;
@shadow-box-padding-left: 24px;

.shadow-box {
  height: 100%;
  margin: 12px 13px;
  margin-top: 35px - @header-height;
  padding: @shadow-box-padding-top @shadow-box-padding-left;
  background: #fff;
  border-radius: 15px;
  box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.1);
  .btn-primary {
    margin-top: 26px;
    margin-right: 5px;
    margin-bottom: @btn-primary-margin - @shadow-box-padding-top + 4px;
    margin-left: 5px;
  }
}

.not-login {
  .container {
    height: 38px;
    margin: 0;
    margin-bottom: 18px;
    padding: 0;
    line-height: 38px;
    text-align: left;

    input {
      position: relative;
      width: 100%;
      height: 38px;
      margin-left: 4px;
      padding: 0;
      color: #313131;
      font-size: @font-size-normal - 1px;
      line-height: 38px;
      text-indent: 22px;
      background-color: transparent;
      background-repeat: no-repeat;
      background-position: 4px center;
      background-size: 11px auto;
      border: none;
    }
    @media screen and (max-width: 340px) {
      /*适配iphone5/se*/
      input {
        font-size: 12px;
      }
    }
    .tip {
      margin-top: 2px;
      margin-left: 34px;
      color: @warn-color;
      font-size: @font-size-small - 1px;
      line-height: @font-size-small;
    }
    .check-result {
      position: absolute;
      top: 0;
      right: 0;
      width: 40px;
      height: 40px;
      background-repeat: no-repeat;
      background-position: center center;
      background-size: 20px auto;
    }
    .check-result.right {
      background-image: url(~@/images/captcha-right.png);
    }
  }
  .phone {
    input {
      background-image: url(~@/images/phone.png);
    }
  }
  .captcha {
    input {
      background-image: url(~@/images/captcha.png);
    }
    .icon {
      position: absolute;
      top: 4px;
      right: 34px;
      width: 87px;
    }
  }
  .code {
    input {
      background-image: url(~@/images/code.png);
    }
    @media screen and (max-width: 340px) {
      /*适配iphone5/se*/
      .btn-container {
        font-size: 12px;
      }
    }
    .btn-container {
      position: absolute;
      top: 0;
      right: 10px;
      padding-left: 16px;
      &::before {
        position: absolute;
        bottom: 10px;
        left: 0;
        width: 1px;
        height: 18px;
        background-color: @border-color;
        content: '';
      }
      .btn {
        color: @link-color;
        font-size: @font-size-normal;
      }
      .interval {
        color: #c6c6c6;
      }
    }
  }
}

.logined {
  .detail {
    margin-top: 24px;
    margin-bottom: 11px;
    color: @detail-color;
  }
  .container {
    .icon {
      display: inline-block;
      width: 16px;
      height: 17px;
      vertical-align: middle;
      background-image: url(~@/images/logined-icon.png);
      background-repeat: no-repeat;
      background-size: 16px auto;
    }
    .desc {
      display: inline-block;
      margin-left: 5px;
      font-weight: 600;
      font-size: 20px;
      vertical-align: middle;
    }
  }

  .change-phone {
    margin-top: 11px;
    color: #666;
    text-decoration: underline;
  }

  @margin-bottom: 16px;

  .setring {
    margin-top: @margin-bottom + 6px;
    margin-bottom: @margin-bottom;
  }
}

.warm-tips {
  position: relative;
  padding: 10px 20px;
  color: @detail-color;
  font-size: 13px;
  line-height: 20px;
  text-align: left;
  &::before {
    position: absolute;
    width: 6px;
    height: 14px;
    margin-top: 8px;
    background: @main-color;
    border-radius: 3px;
    content: '';
  }
  .title {
    height: 30px;
    margin-left: 13px;
    color: #333;
    font-weight: 600;
    font-size: 14px;
    line-height: 30px;
  }
}
</style>
