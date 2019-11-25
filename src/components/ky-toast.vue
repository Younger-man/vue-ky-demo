<template>
  <div class="toast" :class="shouldShowToast ? 'show' : 'hide'">
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: {
    shouldShowToast: {
      types: Boolean,
      default: false,
    },
  },
};
</script>
<style lang="less" scoped>
.toast {
  position: fixed;
  bottom: 80px;
  left: 50%;
  z-index: 999;
  width: 65%;
  margin: 0 auto;
  padding: 12px 5px;
  color: #ffffff;
  font-size: 14px;
  text-align: center;
  background-color: #373737;
  border-radius: 9px;
  transform: translateX(-50%);
  -webkit-margin-bottom-collapse: 201px;
}

.hide {
  display: none;
}

.show {
  animation: fadeInOut 2s linear infinite;
}

@keyframes fadeInOut {
  0% {
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
