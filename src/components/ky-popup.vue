<template>
  <div class="popup flex-center btn">
    <slot></slot>
  </div>
</template>
<style scoped>
.popup {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100%;
  height: 100%;
}
</style>
<style scoped src="@/css/ky-popup.css"></style>
